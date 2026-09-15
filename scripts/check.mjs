#!/usr/bin/env node
/** Post-build sanity checks: internal links, meta uniqueness, structured data. */
import { readdir, readFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';

const dist = path.resolve('dist');
const pages = [];

async function walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) await walk(full);
    else if (entry.name.endsWith('.html')) pages.push(full);
  }
}
await walk(dist);

const urlOf = (file) => {
  const rel = path.relative(dist, file).replace(/\\/g, '/');
  if (rel === 'index.html') return '/';
  if (rel.endsWith('/index.html')) return '/' + rel.slice(0, -'index.html'.length);
  return '/' + rel;
};

const known = new Set(pages.map(urlOf));
const errors = [];
const warns = [];
const titles = new Map();
const descs = new Map();
let ldCount = 0;

for (const file of pages) {
  const url = urlOf(file);
  const html = await readFile(file, 'utf8');

  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const desc = (html.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const h1s = html.match(/<h1[^>]*>/g) || [];
  const canonical = (html.match(/<link rel="canonical" href="([^"]*)"/) || [])[1] || '';

  if (!title) errors.push(`${url}: sem <title>`);
  else if (title.length > 65) warns.push(`${url}: title com ${title.length} caracteres — "${title}"`);
  if (!desc) errors.push(`${url}: sem meta description`);
  else if (desc.length > 168) warns.push(`${url}: description com ${desc.length} caracteres`);
  if (h1s.length !== 1) errors.push(`${url}: ${h1s.length} tags <h1>`);
  if (!canonical) errors.push(`${url}: sem canonical`);

  const isNoindex = /name="robots" content="noindex/.test(html);
  if (!isNoindex) {
    if (titles.has(title)) errors.push(`title duplicado: ${url} e ${titles.get(title)}`);
    else titles.set(title, url);
    if (descs.has(desc)) errors.push(`description duplicada: ${url} e ${descs.get(desc)}`);
    else descs.set(desc, url);
  }

  for (const m of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      const parsed = JSON.parse(m[1].replace(/\\u003c/g, '<'));
      ldCount += (parsed['@graph'] || [parsed]).length;
    } catch (e) {
      errors.push(`${url}: JSON-LD inválido — ${e.message}`);
    }
  }

  // Every referenced asset must actually exist in dist.
  for (const m of html.matchAll(/(?:og:image" content|src)="(?:https:\/\/[^/"]+)?(\/[^"?]+\.(?:jpg|png|svg|js|mjs|webmanifest))"/g)) {
    if (!existsSync(path.join(dist, m[1]))) errors.push(`${url}: asset ausente -> ${m[1]}`);
  }

  for (const m of html.matchAll(/href="(\/[^"#?]*)"/g)) {
    const href = m[1];
    if (/\.(xml|txt|webmanifest|png|svg|js|css|html)$/.test(href)) continue;
    const target = href.endsWith('/') ? href : href + '/';
    if (!known.has(target) && !known.has(href)) errors.push(`${url}: link quebrado -> ${href}`);
  }
}

console.log(`Páginas analisadas: ${pages.length}`);
console.log(`Entidades JSON-LD:  ${ldCount}`);
console.log(`Títulos únicos:     ${titles.size}`);
if (warns.length) { console.log(`\n⚠ ${warns.length} avisos:`); warns.forEach((w) => console.log('  ' + w)); }
if (errors.length) {
  console.log(`\n✗ ${errors.length} erros:`);
  [...new Set(errors)].forEach((e) => console.log('  ' + e));
  process.exit(1);
}
console.log('\n✓ Nenhum erro estrutural.');
