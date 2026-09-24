#!/usr/bin/env node
/**
 * Renders the favicon, PWA icons and per-page Open Graph cards with Chromium.
 * Output lands in public/ and is committed, so a deploy never needs a browser.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
import { site } from '../src/data/site.mjs';
import { tools, toolUrl } from '../src/data/tools.mjs';
import { guides } from '../src/data/guides.mjs';
import { toolsEn } from '../src/data/i18n/tools-en.mjs';
import { toolsEs } from '../src/data/i18n/tools-es.mjs';

const pub = path.resolve('public');
const CHROME = process.env.CHROME_PATH || '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const FONT = `-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif`;

const mark = (size, radius, pad) => `
<div style="width:${size}px;height:${size}px;border-radius:${radius}px;background:linear-gradient(140deg,#e11d48 0%,#9f1239 100%);
display:flex;align-items:center;justify-content:center;box-sizing:border-box;padding:${pad}px">
  <svg viewBox="0 0 24 24" width="${size - pad * 2}" height="${size - pad * 2}" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M7 3v6a4 4 0 0 0 4 4h6"/><path d="M7 21v-6a4 4 0 0 1 4-4h6"/><path d="m17 9 3 4-3 4"/>
  </svg>
</div>`;

const ogCard = (kicker, title, sub) => `<!doctype html><html><body style="margin:0">
<div style="width:1200px;height:630px;box-sizing:border-box;padding:76px 84px;font-family:${FONT};
background:linear-gradient(145deg,#0b1f3a 0%,#16325a 62%,#1d3b68 100%);color:#fff;display:flex;flex-direction:column;justify-content:space-between;position:relative;overflow:hidden">
  <div style="position:absolute;right:-140px;top:-160px;width:620px;height:620px;border-radius:50%;background:radial-gradient(circle,rgba(225,29,72,.42),transparent 66%)"></div>
  <div style="display:flex;align-items:center;gap:16px;position:relative">
    ${mark(52, 14, 11)}
    <span style="font-size:30px;font-weight:800;letter-spacing:-.02em">juntar<span style="color:#fb7185">PDF</span><span style="color:#8fa3c4">.com</span></span>
  </div>
  <div style="position:relative">
    <div style="font-size:21px;font-weight:800;letter-spacing:.14em;text-transform:uppercase;color:#fb7185;margin-bottom:20px">${kicker}</div>
    <div style="font-size:${title.length > 34 ? 62 : 74}px;font-weight:800;letter-spacing:-.035em;line-height:1.06;max-width:960px">${title}</div>
    <div style="font-size:27px;color:#b9c8de;margin-top:24px;max-width:900px;line-height:1.4">${sub}</div>
  </div>
  <div style="display:flex;gap:34px;font-size:21px;font-weight:600;color:#93a7c6;position:relative">
    <span>✓ Grátis e sem cadastro</span><span>✓ Nada sai do seu aparelho</span><span>✓ Funciona no celular</span>
  </div>
</div></body></html>`;

const browser = await chromium.launch({ executablePath: CHROME });

async function shot(html, width, height, out) {
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
  await page.setContent(html, { waitUntil: 'load' });
  await mkdir(path.dirname(out), { recursive: true });
  const jpeg = out.endsWith('.jpg');
  await page.screenshot({ path: out, type: jpeg ? 'jpeg' : 'png', ...(jpeg ? { quality: 82 } : {}) });
  await page.close();
}

const iconPage = (size, radius, pad, bg = 'transparent') =>
  `<!doctype html><html><body style="margin:0;background:${bg}">${mark(size, radius, pad)}</body></html>`;

/* --- icons --- */
await shot(iconPage(512, 112, 108), 512, 512, path.join(pub, 'icons/icon-512.png'));
await shot(iconPage(192, 42, 40), 192, 192, path.join(pub, 'icons/icon-192.png'));
await shot(iconPage(180, 0, 36, '#0b1f3a'), 180, 180, path.join(pub, 'icons/apple-touch-icon.png'));
await shot(iconPage(32, 7, 6), 32, 32, path.join(pub, 'icons/favicon-32.png'));
// Maskable needs the glyph inside the safe zone (80% of the canvas).
await shot(
  `<!doctype html><html><body style="margin:0;background:#e11d48;display:flex;align-items:center;justify-content:center;width:512px;height:512px">
<svg viewBox="0 0 24 24" width="256" height="256" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
<path d="M7 3v6a4 4 0 0 0 4 4h6"/><path d="M7 21v-6a4 4 0 0 1 4-4h6"/><path d="m17 9 3 4-3 4"/></svg></body></html>`,
  512, 512, path.join(pub, 'icons/maskable-512.png')
);

await writeFile(
  path.join(pub, 'favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect width="32" height="32" rx="7" fill="#e11d48"/><g fill="none" stroke="#fff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" transform="translate(4 4) scale(1)"><path d="M6.5 2.5v5a3.2 3.2 0 0 0 3.2 3.2h5"/><path d="M6.5 21.5v-5a3.2 3.2 0 0 1 3.2-3.2h5"/><path d="m14.5 7.5 2.6 3.5-2.6 3.5"/></g></svg>`,
  'utf8'
);

/* --- Open Graph cards --- */
let n = 0;
for (const t of tools) {
  await shot(ogCard(t.slug ? 'Ferramenta grátis' : 'A ferramenta principal', t.h1, t.lede.slice(0, 118)), 1200, 630,
    path.join(pub, 'og', `${t.slug || 'home'}.jpg`));
  n++;
}
for (const g of guides) {
  await shot(ogCard('Guia', g.h1, g.lede.slice(0, 118)), 1200, 630, path.join(pub, 'og', `${g.slug}.jpg`));
  n++;
}
await shot(ogCard('17 ferramentas', 'Ferramentas PDF online e gratuitas', 'Juntar, dividir, comprimir, converter e assinar — tudo no seu navegador.'), 1200, 630, path.join(pub, 'og/ferramentas.jpg'));
await shot(ogCard('Guias', 'Guias de PDF', 'Tutoriais diretos ao ponto, no computador e no celular.'), 1200, 630, path.join(pub, 'og/guias.jpg'));
await shot(ogCard('Ferramentas PDF', site.name, site.description.slice(0, 118)), 1200, 630, path.join(pub, 'og/default.jpg'));
n += 3;

/* --- en/es flagship cards --- */
const I18N_KICKER = { en: 'Free tool', es: 'Herramienta gratis' };
for (const [locale, list] of [['en', toolsEn], ['es', toolsEs]]) {
  for (const t of list) {
    await shot(ogCard(t.home ? I18N_KICKER[locale] : I18N_KICKER[locale], t.h1, t.lede.slice(0, 118)), 1200, 630,
      path.join(pub, 'og', `${locale}-${t.slug || 'home'}.jpg`));
    n++;
  }
}

await browser.close();
console.log(`✓ 6 ícones + ${n} cartões Open Graph gerados em public/`);
void toolUrl;
