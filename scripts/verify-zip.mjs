#!/usr/bin/env node
/** Extracts the deploy zip into a temp dir and checks every critical route. */
import { createServer } from 'node:http';
import { readFile, stat, mkdtemp, rm, readdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';

const zip = process.argv[2];
const root = await mkdtemp(path.join(tmpdir(), 'jpdf-'));
execFileSync('unzip', ['-q', zip, '-d', root]);

const count = async (dir) => {
  let n = 0;
  for (const e of await readdir(dir, { withFileTypes: true })) {
    n += e.isDirectory() ? await count(path.join(dir, e.name)) : 1;
  }
  return n;
};
console.log(`extraído: ${await count(root)} ficheiros`);

/* Cloudflare applies _redirects even when a real asset matches the request,
   so model that here — it is the failure mode that breaks a whole site. */
const rules = (await readFile(path.join(root, '_redirects'), 'utf8'))
  .split('\n').map((l) => l.trim())
  .filter((l) => l && !l.startsWith('#'))
  .map((l) => { const [from, to, status] = l.split(/\s+/); return { from, to, status: Number(status) || 302 }; });

const redirectFor = (url) => {
  for (const r of rules) {
    if (r.from.endsWith('/*')) {
      const prefix = r.from.slice(0, -1);
      if (url.startsWith(prefix)) return r;
    } else if (r.from === url) return r;
  }
  return null;
};

const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.jpg': 'image/jpeg', '.png': 'image/png', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json', '.svg': 'image/svg+xml' };
const server = createServer(async (req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  const hit = redirectFor(url);
  if (hit) {
    res.writeHead(hit.status, { Location: hit.to });
    return res.end();
  }
  let f = path.join(root, url);
  let code = 200;
  try {
    if ((await stat(f)).isDirectory()) f = path.join(f, 'index.html');
  } catch {
    f = path.join(root, '404.html');
    code = 404;
  }
  try {
    const body = await readFile(f);
    res.writeHead(code, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end('nf');
  }
});
await new Promise((r) => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}`;

const routes = ['/', '/comprimir-pdf/', '/unir-pdf/', '/guias/', '/ferramentas/',
  '/assets/tool.js', '/assets/core.js', '/vendor/pdf.min.mjs', '/vendor/pdf.worker.min.mjs',
  '/vendor/pdf-lib.min.js', '/og/home.jpg', '/icons/icon-512.png', '/favicon.svg',
  '/sitemap.xml', '/robots.txt', '/manifest.webmanifest', '/sw.js', '/_headers', '/_redirects'];

let bad = 0;
for (const u of routes) {
  const r = await fetch(base + u);
  const size = (await r.arrayBuffer()).byteLength;
  if (r.status !== 200 || size === 0) bad++;
  console.log(`  ${u.padEnd(28)} ${r.status}  ${String(size).padStart(8)} bytes`);
}
const nf = await fetch(base + '/nao-existe/');
console.log(`  ${'/nao-existe/'.padEnd(28)} ${nf.status}  (404 esperado)`);

// Every canonical URL in the sitemap must answer 200 with the redirects applied.
const sitemap = await (await fetch(base + '/sitemap.xml')).text();
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/^https?:\/\/[^/]+/, ''));
let shadowed = 0;
for (const loc of locs) {
  const r = await fetch(base + loc, { redirect: 'manual' });
  if (r.status !== 200) { shadowed++; console.log(`  ✗ ${loc} -> ${r.status} (devia ser 200)`); }
}
console.log(`\n  ${locs.length} URLs do sitemap verificadas com os _redirects aplicados: ${locs.length - shadowed} OK`);

// And the redirect rules themselves must actually redirect.
for (const u of ['/index.html', '/juntar-pdf', '/blog/qualquer-coisa']) {
  const r = await fetch(base + u, { redirect: 'manual' });
  console.log(`  ${u.padEnd(28)} ${r.status} -> ${r.headers.get('location')}`);
}
bad += shadowed;

server.close();
await rm(root, { recursive: true, force: true });
if (bad || nf.status !== 404) { console.log(`\n✗ ${bad} rota(s) com problema`); process.exit(1); }
console.log('\n✓ O zip serve corretamente como site estático.');
