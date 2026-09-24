import { site } from '../data/site.mjs';
import { locales, localeOf } from '../data/locales.mjs';
import { icon } from './icons.mjs';

export const esc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const abs = (p) => (/^https?:/.test(p) ? p : site.origin + p);

/* ------------------------------------------------------------------ head */

function analytics() {
  if (!site.gaId) return '';
  return `<script async src="https://www.googletagmanager.com/gtag/js?id=${site.gaId}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${site.gaId}',{anonymize_ip:true});</script>`;
}

/**
 * Builds the schema.org @graph. Every page gets WebSite + Organization +
 * WebPage + BreadcrumbList; tool/guide pages add their own entities on top.
 * WebSite/Organization stay pinned to the pt-BR root ids: they describe the
 * one business behind all three language trees, not a per-locale entity.
 */
function jsonLd(page, L) {
  const pageUrl = abs(page.url);
  const graph = [
    {
      '@type': 'WebSite',
      '@id': `${site.origin}/#website`,
      url: `${site.origin}/`,
      name: site.name,
      description: site.description,
      inLanguage: locales.pt.code,
      publisher: { '@id': `${site.origin}/#org` },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${site.origin}/ferramentas/?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'Organization',
      '@id': `${site.origin}/#org`,
      name: site.name,
      url: `${site.origin}/`,
      logo: { '@type': 'ImageObject', url: `${site.origin}/icons/icon-512.png`, width: 512, height: 512 },
      email: site.email,
      foundingDate: String(site.foundingYear),
      areaServed: L.areaServed,
      knowsLanguage: Object.values(locales).flatMap((l) => l.knowsLanguage),
    },
    {
      '@type': page.schema?.article ? 'Article' : 'WebPage',
      '@id': `${pageUrl}#page`,
      url: pageUrl,
      name: page.title,
      description: page.description,
      inLanguage: L.code,
      isPartOf: { '@id': `${site.origin}/#website` },
      ...(page.schema?.article
        ? {
            headline: page.schema.article.headline || page.h1,
            datePublished: page.schema.article.datePublished,
            dateModified: page.schema.article.dateModified || page.schema.article.datePublished,
            author: { '@id': `${site.origin}/#org` },
            publisher: { '@id': `${site.origin}/#org` },
            image: abs(page.ogImage || '/og/default.jpg'),
          }
        : { datePublished: `${site.foundingYear}-01-01`, dateModified: page.updated || new Date().toISOString().slice(0, 10) }),
      breadcrumb: { '@id': `${pageUrl}#crumbs` },
    },
  ];

  const crumbs = [{ name: L.crumbsHome, url: L.home }, ...(page.breadcrumbs || [])];
  graph.push({
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl}#crumbs`,
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.name,
      item: abs(c.url),
    })),
  });

  if (page.schema?.software) {
    const sw = page.schema.software;
    graph.push({
      '@type': ['SoftwareApplication', 'WebApplication'],
      '@id': `${pageUrl}#app`,
      name: sw.name,
      url: pageUrl,
      description: sw.description,
      applicationCategory: 'UtilitiesApplication',
      applicationSubCategory: 'PDF',
      operatingSystem: 'Android, iOS, Windows, macOS, Linux, ChromeOS',
      browserRequirements: L.jsRequired,
      inLanguage: L.code,
      isAccessibleForFree: true,
      permissions: L.permissionsText,
      offers: { '@type': 'Offer', price: '0', priceCurrency: L.currency, availability: 'https://schema.org/InStock' },
      featureList: sw.features,
      publisher: { '@id': `${site.origin}/#org` },
    });
  }

  if (page.schema?.howto) {
    const h = page.schema.howto;
    graph.push({
      '@type': 'HowTo',
      '@id': `${pageUrl}#howto`,
      name: h.name,
      description: h.description,
      totalTime: h.totalTime || 'PT1M',
      estimatedCost: { '@type': 'MonetaryAmount', currency: L.currency, value: '0' },
      supply: { '@type': 'HowToSupply', name: L.supplyText },
      tool: { '@type': 'HowToTool', name: L.toolText },
      step: h.steps.map((st, i) => ({
        '@type': 'HowToStep',
        position: i + 1,
        name: st.name,
        text: st.text,
        url: `${pageUrl}#passo-${i + 1}`,
      })),
    });
  }

  if (page.schema?.faq?.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${pageUrl}#faq`,
      mainEntity: page.schema.faq.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/<[^>]+>/g, '') },
      })),
    });
  }

  return `<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })
    .replace(/</g, '\\u003c')}</script>`;
}

/**
 * hreflang alternates. `page.altLangs` (set by build.mjs from
 * locales.crossLinks for the handful of pages that exist in more than one
 * language) lists every sibling URL; absent that, a page only has itself,
 * exactly as before multi-language support existed. x-default points at the
 * Portuguese URL since that is the primary market this domain serves.
 */
function hreflangTags(page) {
  const pageUrl = abs(page.url);
  if (!page.altLangs) {
    return `<link rel="alternate" hreflang="pt-BR" href="${pageUrl}">
<link rel="alternate" hreflang="pt-PT" href="${pageUrl}">
<link rel="alternate" hreflang="pt" href="${pageUrl}">
<link rel="alternate" hreflang="x-default" href="${pageUrl}">`;
  }
  const tags = [];
  if (page.altLangs.pt) {
    const u = abs(page.altLangs.pt);
    tags.push(`<link rel="alternate" hreflang="pt-BR" href="${u}">`, `<link rel="alternate" hreflang="pt-PT" href="${u}">`, `<link rel="alternate" hreflang="pt" href="${u}">`);
  }
  if (page.altLangs.en) tags.push(`<link rel="alternate" hreflang="en" href="${abs(page.altLangs.en)}">`);
  if (page.altLangs.es) tags.push(`<link rel="alternate" hreflang="es" href="${abs(page.altLangs.es)}">`);
  tags.push(`<link rel="alternate" hreflang="x-default" href="${abs(page.altLangs.pt || page.url)}">`);
  return tags.join('\n');
}

function head(page, css, L) {
  const pageUrl = abs(page.url);
  const og = abs(page.ogImage || '/og/default.jpg');
  return `<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.description)}">
${page.keywords ? `<meta name="keywords" content="${esc(page.keywords.join(', '))}">` : ''}
<link rel="canonical" href="${pageUrl}">
<meta name="robots" content="${page.noindex ? 'noindex,follow' : 'index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1'}">
<meta name="theme-color" content="${site.themeColor}">
<meta name="color-scheme" content="light dark">
<meta name="author" content="${site.name}">
<meta name="format-detection" content="telephone=no">
${hreflangTags(page)}
<meta property="og:type" content="${page.schema?.article ? 'article' : 'website'}">
<meta property="og:site_name" content="${site.name}">
<meta property="og:title" content="${esc(page.ogTitle || page.title)}">
<meta property="og:description" content="${esc(page.description)}">
<meta property="og:url" content="${pageUrl}">
<meta property="og:locale" content="${L.ogLocale}">
<meta property="og:image" content="${og}">
<meta property="og:image:type" content="image/jpeg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${esc(page.h1 || page.title)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.ogTitle || page.title)}">
<meta name="twitter:description" content="${esc(page.description)}">
<meta name="twitter:image" content="${og}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/icons/favicon-32.png" sizes="32x32" type="image/png">
<link rel="apple-touch-icon" href="/icons/apple-touch-icon.png">
<link rel="manifest" href="/manifest.webmanifest">
<style>${css}</style>
${jsonLd(page, L)}
${analytics()}`;
}

/* --------------------------------------------------------------- chrome */

const logoFor = (L) => `<a class="logo" href="${L.home}" aria-label="${site.name} \u2014 ${L.crumbsHome}">
<span class="logo-badge" aria-hidden="true">PDF</span>
<span style="color:var(--ink)">${site.brandMark}<b>${site.brandAccent}</b><span>${site.brandTld}</span></span>
</a>`;

function header(page, L) {
  const links = L.nav
    .map((l) => `<a href="${l.href}"${l.href === page.url ? ' aria-current="page"' : ''}>${l.label}</a>`)
    .join('');
  const allToolsHref = L.home === '/' ? '/ferramentas/' : L.home;
  const guidesHref = L.home === '/' ? '/guias/' : L.home;
  const mobileExtra = L.home === '/' ? [{ href: allToolsHref, label: L.navAllLabel }, { href: guidesHref, label: L.navGuidesLabel }] : [];
  const mobile = [...L.nav, ...mobileExtra].map((l) => `<a href="${l.href}">${l.label}</a>`).join('');
  return `<header class="hdr">
<div class="wrap hdr-in">
${logoFor(L)}
<nav class="nav" aria-label="${L.navPrimaryAria}">${links}${L.home === '/' ? `<a class="nav-all" href="${allToolsHref}">${L.navAllLabel} ${icon('chev')}</a>` : ''}</nav>
<button class="menu-btn" type="button" aria-expanded="false" aria-controls="m-nav" data-menu>${icon('menu')} ${L.menuLabel}</button>
</div>
<div class="menu-panel" id="m-nav"><div class="wrap">${mobile}</div></div>
</header>`;
}

function trustRow(L) {
  return `<div class="wrap"><div class="trust">${L.trustBadges
    .map((b) => `<span>${icon(b.icon, 17)} ${b.label}</span>`)
    .join('')}</div></div>`;
}

function footer(L) {
  const cols = L.footer
    .map(
      (c) => `<div><h4>${c.title}</h4><ul>${c.links
        .map((l) => `<li><a href="${l.href}">${l.label}</a></li>`)
        .join('')}</ul></div>`
    )
    .join('');
  return `<footer class="ftr">
<div class="wrap">
<div class="ftr-grid">${cols}</div>
<div class="ftr-btm">
<p style="margin:0">\u00a9 ${site.foundingYear}\u2013<span data-year>${new Date().getFullYear()}</span> ${site.name} \u2014 ${L.tagline}</p>
<p style="margin:0"><a href="/aquisicao/" rel="nofollow">${L.domainNoteLabel}</a></p>
</div>
</div>
</footer>`;
}

function crumbsHtml(page, L) {
  if (!page.breadcrumbs?.length) return '';
  const items = [{ name: L.crumbsHome, url: L.home }, ...page.breadcrumbs];
  return `<div class="wrap"><nav class="crumbs" aria-label="${L.crumbsAria}"><ol>${items
    .map((c, i) =>
      i === items.length - 1
        ? `<li><span aria-current="page">${esc(c.name)}</span></li>`
        : `<li><a href="${c.url}">${esc(c.name)}</a></li>`
    )
    .join('')}</ol></nav></div>`;
}

/* --------------------------------------------------------------- render */

export function renderPage(page, { css, inlineJs = '' }) {
  const L = localeOf(page.locale);
  return `<!DOCTYPE html>
<html lang="${L.code}" dir="${L.dir}">
<head>
${head(page, css, L)}
</head>
<body>
<a class="skip" href="#conteudo">${L.skipLabel}</a>
${header(page, L)}
${crumbsHtml(page, L)}
<main id="conteudo">
${page.bodyHtml}
</main>
${trustRow(L)}
${footer(L)}
<script>
document.querySelectorAll('[data-year]').forEach(function(e){e.textContent=new Date().getFullYear()});
(function(){var b=document.querySelector('[data-menu]'),p=document.getElementById('m-nav');
if(b&&p)b.addEventListener('click',function(){var o=p.classList.toggle('open');b.setAttribute('aria-expanded',o)})})();
if('serviceWorker' in navigator)addEventListener('load',function(){navigator.serviceWorker.register('/sw.js').catch(function(){})});
</script>
${inlineJs}
</body>
</html>`;
}

export { icon, abs };
