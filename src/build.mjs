#!/usr/bin/env node
/**
 * Static site generator for JuntarPDF.
 * Reads the tool/guide registries and emits a fully static `dist/` that can be
 * dropped on any host: no server runtime, no build-time network access.
 */
import { mkdir, writeFile, readFile, cp, rm, readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { site } from './data/site.mjs';
import { tools, toolUrl } from './data/tools.mjs';
import { guides } from './data/guides.mjs';
import { staticPages } from './data/static-pages.mjs';
import { crossLinks } from './data/locales.mjs';
import { toolsEn, toolUrlEn } from './data/i18n/tools-en.mjs';
import { toolsEs, toolUrlEs } from './data/i18n/tools-es.mjs';
import { renderPage } from './templates/layout.mjs';
import * as P from './templates/pages.mjs';
import { flagshipToolBody } from './templates/pages-i18n.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const BUILD_DATE = new Date().toISOString().slice(0, 10);

P.registerGuides(guides);

/**
 * Reciprocal hreflang: a page whose URL appears in any locales.crossLinks
 * entry gets the full {pt,en,es} alternate set; everything else (31 of the
 * 37 Portuguese pages, all of the guides) keeps the self+x-default tags it
 * always had. This is what makes the alternates symmetric — Google
 * documents that a one-directional hreflang (A points to B but B doesn't
 * point back to A) can be ignored entirely.
 */
function altLangsFor(url) {
  for (const entry of Object.values(crossLinks)) {
    if (entry.pt === url || entry.en === url || entry.es === url) return entry;
  }
  return undefined;
}

/* ------------------------------------------------------------- helpers */

/** Conservative CSS minifier: skips quoted strings so `content` survives. */
function minifyCss(css) {
  let out = '';
  let i = 0;
  while (i < css.length) {
    const c = css[i];
    if (c === '"' || c === "'") {
      const end = css.indexOf(c, i + 1);
      const stop = end === -1 ? css.length : end + 1;
      out += css.slice(i, stop);
      i = stop;
      continue;
    }
    if (c === '/' && css[i + 1] === '*') {
      const end = css.indexOf('*/', i + 2);
      i = end === -1 ? css.length : end + 2;
      continue;
    }
    out += c;
    i++;
  }
  return out
    .replace(/\s+/g, ' ')
    .replace(/\s*([{}:;,>~])\s*/g, '$1')
    .replace(/;}/g, '}')
    .replace(/\breturn\b/g, 'return')
    .trim();
}

async function emit(routePath, html) {
  const rel = routePath === '/' ? 'index.html' : path.join(routePath.replace(/^\/|\/$/g, ''), 'index.html');
  const file = path.join(dist, rel);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, html, 'utf8');
  return { url: routePath, bytes: Buffer.byteLength(html) };
}

/* ---------------------------------------------------------------- build */

async function build() {
  await rm(dist, { recursive: true, force: true });
  await mkdir(dist, { recursive: true });

  const css = minifyCss(await readFile(path.join(root, 'src/assets/css/main.css'), 'utf8'));
  const toolScript = '<script type="module" src="/assets/tool.js"></script>';
  const emitted = [];
  const sitemap = [];

  /* ---- tool pages -------------------------------------------------- */
  for (const tool of tools) {
    const url = toolUrl(tool.slug);
    const page = {
      url,
      title: tool.title,
      description: tool.description,
      keywords: tool.keywords,
      h1: tool.h1,
      ogImage: `/og/${tool.slug || 'home'}.jpg`,
      updated: BUILD_DATE,
      breadcrumbs: tool.home
        ? []
        : [{ name: 'Ferramentas', url: '/ferramentas/' }, { name: tool.name, url }],
      altLangs: altLangsFor(url),
      schema: {
        software: {
          name: `${tool.name} — ${site.name}`,
          description: tool.description,
          features: (tool.howto?.steps || []).map((s) => s.name),
        },
        howto: tool.howto,
        faq: tool.faq,
      },
      bodyHtml: P.toolPageBody(tool),
    };
    emitted.push(await emit(url, renderPage(page, { css, inlineJs: toolScript })));
    sitemap.push({ loc: url, priority: tool.home ? '1.0' : '0.9', changefreq: 'weekly' });
  }

  /* ---- en/es flagship tools ----------------------------------------
     Six pages each, not the full Portuguese footprint — see tools-en.mjs
     for why. Every page here has a crossLinks entry, so altLangsFor always
     resolves and the pt/en/es triangle stays reciprocal. */
  const i18nTrees = [
    { locale: 'en', list: toolsEn, urlFor: toolUrlEn },
    { locale: 'es', list: toolsEs, urlFor: toolUrlEs },
  ];
  for (const { locale, list, urlFor } of i18nTrees) {
    const siblings = list.map((t) => ({ slug: t.slug, url: urlFor(t.slug), name: t.name }));
    for (const tool of list) {
      const url = urlFor(tool.slug);
      const page = {
        url,
        locale,
        title: tool.title,
        description: tool.description,
        keywords: tool.keywords,
        h1: tool.h1,
        ogImage: `/og/${locale}-${tool.slug || 'home'}.jpg`,
        updated: BUILD_DATE,
        breadcrumbs: tool.home ? [] : [{ name: tool.name, url }],
        altLangs: altLangsFor(url),
        schema: {
          software: {
            name: `${tool.name} — ${site.name}`,
            description: tool.description,
            features: (tool.howto?.steps || []).map((s) => s.name),
          },
          howto: tool.howto,
          faq: tool.faq,
        },
        bodyHtml: flagshipToolBody(tool, locale, siblings),
      };
      emitted.push(await emit(url, renderPage(page, { css, inlineJs: toolScript })));
      sitemap.push({ loc: url, priority: tool.home ? '0.9' : '0.7', changefreq: 'weekly' });
    }
  }

  /* ---- guides ------------------------------------------------------ */
  for (const guide of guides) {
    const url = `/${guide.slug}/`;
    const page = {
      url,
      title: guide.title,
      description: guide.description,
      keywords: guide.keywords,
      h1: guide.h1,
      ogImage: `/og/${guide.slug}.jpg`,
      updated: guide.updated || guide.date,
      breadcrumbs: [{ name: 'Guias', url: '/guias/' }, { name: guide.h1, url }],
      schema: {
        article: { headline: guide.h1, datePublished: guide.date, dateModified: guide.updated || guide.date },
        faq: guide.faq,
      },
      bodyHtml: P.guideBody(guide),
    };
    const needsTool = guide.tool !== undefined && guide.tool !== null;
    emitted.push(await emit(url, renderPage(page, { css, inlineJs: needsTool ? toolScript : '' })));
    sitemap.push({ loc: url, priority: '0.7', changefreq: 'monthly' });
  }

  /* ---- index pages ------------------------------------------------- */
  emitted.push(
    await emit(
      '/ferramentas/',
      renderPage(
        {
          url: '/ferramentas/',
          title: `Todas as Ferramentas PDF Grátis — ${site.name}`,
          description:
            'Lista completa das ferramentas de PDF do JuntarPDF: juntar, dividir, comprimir, converter, assinar e organizar. Todas grátis e processadas no seu navegador.',
          keywords: ['ferramentas pdf', 'ferramentas pdf online grátis', 'editor pdf online', 'programa pdf grátis'],
          h1: 'Ferramentas PDF online e gratuitas',
          ogImage: '/og/ferramentas.jpg',
          updated: BUILD_DATE,
          breadcrumbs: [{ name: 'Ferramentas', url: '/ferramentas/' }],
          schema: {
            faq: [
              { q: 'As ferramentas são realmente gratuitas?', a: 'Sim. Todas são gratuitas, sem cadastro, sem limite diário e sem marca d’água nos arquivos gerados.' },
              { q: 'Meus arquivos são enviados para servidores?', a: 'Não. Todo o processamento acontece dentro do seu navegador, no seu próprio aparelho.' },
              { q: 'Funciona no celular?', a: 'Sim, em todas as ferramentas, no Android e no iPhone, direto pelo navegador.' },
            ],
          },
          bodyHtml: P.toolsIndexBody(),
        },
        { css, inlineJs: toolScript }
      )
    )
  );
  sitemap.push({ loc: '/ferramentas/', priority: '0.9', changefreq: 'weekly' });

  emitted.push(
    await emit(
      '/guias/',
      renderPage(
        {
          url: '/guias/',
          title: `Guias de PDF — Tutoriais Práticos | ${site.name}`,
          description:
            'Tutoriais sobre juntar, converter e organizar PDF no computador e no celular, com passo a passo e comparação entre métodos.',
          keywords: ['guias pdf', 'tutorial pdf', 'como usar pdf'],
          h1: 'Guias de PDF',
          ogImage: '/og/guias.jpg',
          updated: BUILD_DATE,
          breadcrumbs: [{ name: 'Guias', url: '/guias/' }],
          bodyHtml: P.guidesIndexBody(guides),
        },
        { css }
      )
    )
  );
  sitemap.push({ loc: '/guias/', priority: '0.6', changefreq: 'weekly' });

  /* ---- static pages ------------------------------------------------ */
  for (const sp of staticPages) {
    const url = `/${sp.slug}/`;
    emitted.push(
      await emit(
        url,
        renderPage(
          {
            url,
            title: sp.title,
            description: sp.description,
            keywords: sp.keywords,
            h1: sp.h1,
            noindex: !!sp.noindex,
            ogImage: '/og/default.jpg',
            updated: BUILD_DATE,
            breadcrumbs: sp.breadcrumbs,
            bodyHtml: P.staticBody(sp),
          },
          { css }
        )
      )
    );
    if (!sp.noindex) sitemap.push({ loc: url, priority: '0.4', changefreq: 'yearly' });
  }

  /* ---- 404 + offline ----------------------------------------------- */
  const shell = (title, h1, html) =>
    renderPage(
      {
        url: '/',
        title,
        description: html.replace(/<[^>]+>/g, ' ').slice(0, 150),
        h1,
        noindex: true,
        bodyHtml: P.staticBody({ h1, lede: '', html }),
      },
      { css }
    );
  await writeFile(
    path.join(dist, '404.html'),
    shell(
      'Página não encontrada — ' + site.name,
      'Página não encontrada',
      `<p>O endereço que você abriu não existe ou foi movido.</p>
<p><a class="btn btn-primary" href="/" style="margin-top:8px">Ir para Juntar PDF</a></p>
<h2>Talvez você procure</h2>
<ul>${tools.slice(0, 8).map((t) => `<li><a href="${toolUrl(t.slug)}">${t.name}</a></li>`).join('')}
<li><a href="/ferramentas/">Ver todas as ferramentas</a></li></ul>`
    ),
    'utf8'
  );
  await writeFile(
    path.join(dist, 'offline.html'),
    shell(
      'Sem conexão — ' + site.name,
      'Você está sem internet',
      `<p>Esta página ainda não foi salva no seu aparelho. Abra-a uma vez com internet e ela passa a funcionar offline.</p>
<p>As ferramentas que você já visitou continuam funcionando normalmente — elas não precisam de conexão.</p>
<p><a class="btn btn-primary" href="/" style="margin-top:8px">Tentar Juntar PDF</a></p>`
    ),
    'utf8'
  );

  /* ---- assets ------------------------------------------------------ */
  await mkdir(path.join(dist, 'assets'), { recursive: true });
  for (const f of await readdir(path.join(root, 'src/assets/js'))) {
    await cp(path.join(root, 'src/assets/js', f), path.join(dist, 'assets', f));
  }
  await mkdir(path.join(dist, 'vendor'), { recursive: true });
  const vendor = [
    ['node_modules/pdf-lib/dist/pdf-lib.min.js', 'pdf-lib.min.js'],
    ['node_modules/pdfjs-dist/build/pdf.min.mjs', 'pdf.min.mjs'],
    ['node_modules/pdfjs-dist/build/pdf.worker.min.mjs', 'pdf.worker.min.mjs'],
  ];
  for (const [from, to] of vendor) {
    const src = path.join(root, from);
    if (!existsSync(src)) throw new Error(`Dependência ausente: ${from} (rode npm install)`);
    await cp(src, path.join(dist, 'vendor', to));
  }
  if (existsSync(path.join(root, 'public'))) {
    await cp(path.join(root, 'public'), dist, { recursive: true });
  }

  /* ---- sitemap / robots / feed / manifest / sw --------------------- */
  const abs = (u) => site.origin + u;
  await writeFile(
    path.join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${sitemap
      .map(
        (u) => `  <url>
    <loc>${abs(u.loc)}</loc>
    <lastmod>${BUILD_DATE}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
    <xhtml:link rel="alternate" hreflang="pt-BR" href="${abs(u.loc)}"/>
    <xhtml:link rel="alternate" hreflang="pt-PT" href="${abs(u.loc)}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(u.loc)}"/>
  </url>`
      )
      .join('\n')}
</urlset>
`,
    'utf8'
  );

  await writeFile(
    path.join(dist, 'robots.txt'),
    `# ${site.domain}
User-agent: *
Allow: /
Disallow: /aquisicao/
Disallow: /*?*utm_
Disallow: /*?*fbclid=

# Answer engines are welcome to cite us.
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /

# Keep SEO crawlers from eating the crawl budget.
User-agent: AhrefsBot
Crawl-delay: 10
User-agent: SemrushBot
Crawl-delay: 10
User-agent: MJ12bot
Crawl-delay: 10
User-agent: DotBot
Crawl-delay: 10

Sitemap: ${abs('/sitemap.xml')}
`,
    'utf8'
  );

  const rssDate = (d) => new Date(d + 'T12:00:00Z').toUTCString();
  await writeFile(
    path.join(dist, 'feed.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${site.name} — Guias de PDF</title>
  <link>${abs('/guias/')}</link>
  <atom:link href="${abs('/feed.xml')}" rel="self" type="application/rss+xml"/>
  <description>${site.description}</description>
  <language>pt-br</language>
  <lastBuildDate>${rssDate(BUILD_DATE)}</lastBuildDate>
${guides
      .map(
        (g) => `  <item>
    <title>${g.h1.replace(/&/g, '&amp;')}</title>
    <link>${abs('/' + g.slug + '/')}</link>
    <guid isPermaLink="true">${abs('/' + g.slug + '/')}</guid>
    <description>${g.description.replace(/&/g, '&amp;')}</description>
    <pubDate>${rssDate(g.date)}</pubDate>
  </item>`
      )
      .join('\n')}
</channel>
</rss>
`,
    'utf8'
  );

  await writeFile(
    path.join(dist, 'manifest.webmanifest'),
    JSON.stringify(
      {
        name: `${site.name} — Ferramentas PDF`,
        short_name: site.name,
        description: site.description,
        start_url: '/?utm_source=pwa',
        scope: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: site.themeColor,
        lang: site.lang,
        dir: 'ltr',
        categories: ['productivity', 'utilities'],
        icons: [
          { src: '/icons/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
          { src: '/icons/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
          { src: '/icons/maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
        shortcuts: tools.slice(0, 4).map((t) => ({ name: t.name, url: toolUrl(t.slug) })),
      },
      null,
      2
    ),
    'utf8'
  );

  const swAssets = ['/', '/offline.html', '/manifest.webmanifest', '/assets/core.js', '/assets/tool.js'];
  await writeFile(
    path.join(dist, 'sw.js'),
    `/* ${site.name} service worker — generated by the build. */
const VERSION = 'jpdf-${BUILD_DATE}-${emitted.length}';
const CORE = VERSION + '-core';
const RUNTIME = VERSION + '-rt';
const CORE_ASSETS = ${JSON.stringify(swAssets)};

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CORE).then((c) => c.addAll(CORE_ASSETS)).then(() => self.skipWaiting()).catch(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((keys) => Promise.all(
    keys.filter((k) => k.startsWith('jpdf-') && k.indexOf(VERSION) === -1).map((k) => caches.delete(k))
  )).then(() => self.clients.claim()));
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(RUNTIME).then((c) => c.put(req, copy)).catch(() => {});
        return res;
      }).catch(() => caches.match(req).then((c) => c || caches.match('/offline.html')))
    );
    return;
  }

  // Static assets and the PDF engines: cache-first keeps the tools usable offline.
  e.respondWith(
    caches.match(req).then((cached) => cached || fetch(req).then((res) => {
      if (res && res.status === 200 && res.type === 'basic') {
        const copy = res.clone();
        caches.open(RUNTIME).then((c) => c.put(req, copy)).catch(() => {});
      }
      return res;
    }))
  );
});

self.addEventListener('message', (e) => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });
`,
    'utf8'
  );

  /* ---- host configuration ----------------------------------------- */
  await writeFile(
    path.join(dist, '_headers'),
    `/*
  X-Content-Type-Options: nosniff
  X-Frame-Options: SAMEORIGIN
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=(), interest-cohort=()
  Cross-Origin-Opener-Policy: same-origin
  Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https://www.google-analytics.com; font-src 'self'; connect-src 'self' https://www.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com; worker-src 'self' blob:; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'self'

/assets/*
  Cache-Control: public, max-age=31536000, immutable

/vendor/*
  Cache-Control: public, max-age=31536000, immutable

/icons/*
  Cache-Control: public, max-age=31536000, immutable

/og/*
  Cache-Control: public, max-age=604800

/sw.js
  Cache-Control: no-cache
`,
    'utf8'
  );

  await writeFile(
    path.join(dist, '_redirects'),
    `# Canonical shapes. The merge tool lives at / because the exact-match domain
# is the strongest signal we have for "juntar pdf".
#
# No catch-all rule here on purpose: Cloudflare follows a redirect even when a
# real asset matches the request, so "/*  /404.html  404" would 404 the whole
# site. Both Cloudflare (not_found_handling: 404-page) and Netlify already
# serve /404.html for unmatched paths on their own.
#
# Trailing slashes are left to the host's HTML handling, which serves
# folder/index.html at /folder/ and redirects /folder to it.
/index.html            /                       301
/juntar-pdf            /                       301
/juntar-pdf/           /                       301
/juntar                /                       301
/unir_pdf              /unir-pdf/              301
/blog                  /guias/                 301
/blog/*                /guias/                 301
`,
    'utf8'
  );

  const totalBytes = emitted.reduce((s, e) => s + e.bytes, 0);
  console.log(`✓ ${emitted.length} páginas · ${(totalBytes / 1024).toFixed(0)} KB de HTML · CSS inline ${(css.length / 1024).toFixed(1)} KB`);
  console.log(`✓ sitemap com ${sitemap.length} URLs`);
  const biggest = emitted.sort((a, b) => b.bytes - a.bytes).slice(0, 3);
  console.log('  maiores: ' + biggest.map((e) => `${e.url} ${(e.bytes / 1024).toFixed(0)}KB`).join(', '));
}

build().catch((err) => {
  console.error('✗ build falhou:', err);
  process.exit(1);
});
