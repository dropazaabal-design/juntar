#!/usr/bin/env node
/** End-to-end check: drives the real tools in Chromium and inspects the output. */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
import { PDFDocument } from 'pdf-lib';

const dist = path.resolve('dist');
const FX = process.argv[2];
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain', '.webmanifest': 'application/manifest+json' };

const server = createServer(async (req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  let file = path.join(dist, p);
  try {
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
  } catch {
    file = path.join(dist, '404.html');
  }
  try {
    const body = await readFile(file);
    res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    res.writeHead(404).end('nope');
  }
});
await new Promise((r) => server.listen(0, r));
const base = `http://127.0.0.1:${server.address().port}`;

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium-1194/chrome-linux/chrome' });
const results = [];
const consoleErrors = [];
let uploadSeen = false;

async function run(name, url, steps, verify) {
  const ctx = await browser.newContext({ acceptDownloads: true });
  const page = await ctx.newPage();
  page.on('console', (m) => { if (m.type() === 'error') consoleErrors.push(`${name}: ${m.text()}`); });
  page.on('pageerror', (e) => consoleErrors.push(`${name}: ${e.message}`));
  // Any request carrying a file body would mean the promise is broken.
  page.on('request', (r) => {
    if (r.method() === 'POST' && (r.postDataBuffer()?.length || 0) > 500) uploadSeen = true;
  });
  try {
    await page.goto(base + url, { waitUntil: 'load' });
    const dl = page.waitForEvent('download', { timeout: 45000 });
    dl.catch(() => {}); // avoid an unhandled rejection if `steps` throws first
    await steps(page);
    const d = await dl;
    const tmp = path.join('/tmp', 'e2e-' + Math.random().toString(36).slice(2) + '-' + d.suggestedFilename());
    await d.saveAs(tmp);
    const status = await page.locator('[data-status]').innerText();
    const detail = await verify(tmp, page);
    results.push({ name, ok: true, detail, status: status.trim().slice(0, 78) });
  } catch (err) {
    const status = await page.locator('[data-status]').innerText().catch(() => '');
    results.push({ name, ok: false, detail: err.message.split('\n')[0], status: status.trim().slice(0, 78) });
  }
  await ctx.close();
}

const pdfPages = async (f) => (await PDFDocument.load(await readFile(f), { ignoreEncryption: true })).getPageCount();
const pick = (page, sel, files) => page.setInputFiles(sel, files);
const go = (page) => page.click('[data-run]');

await run('Juntar PDF', '/', async (p) => {
  await pick(p, 'input[type=file]', [`${FX}/a.pdf`, `${FX}/b.pdf`]);
  await go(p);
}, async (f) => `${await pdfPages(f)} páginas (esperado 5)`);

await run('Dividir PDF (intervalo)', '/dividir-pdf/', async (p) => {
  await pick(p, 'input[type=file]', [`${FX}/b.pdf`]);
  await p.fill('input[name=pages]', '1,3');
  await go(p);
}, async (f) => `${await pdfPages(f)} páginas (esperado 2)`);

await run('Dividir PDF (cada página → zip)', '/dividir-pdf/', async (p) => {
  await pick(p, 'input[type=file]', [`${FX}/b.pdf`]);
  await p.click('.seg label[for="mode-1"]');
  await go(p);
}, async (f) => `zip de ${(await stat(f)).size} bytes`);

await run('Comprimir PDF', '/comprimir-pdf/', async (p) => {
  await pick(p, 'input[type=file]', [`${FX}/a.pdf`]);
  await go(p);
}, async (f) => `${await pdfPages(f)} páginas, ${(await stat(f)).size} bytes`);

await run('Girar PDF', '/girar-pdf/', async (p) => {
  await pick(p, 'input[type=file]', [`${FX}/a.pdf`]);
  await go(p);
}, async (f) => {
  const d = await PDFDocument.load(await readFile(f));
  return `rotação da pág. 1 = ${d.getPage(0).getRotation().angle}° (esperado 90)`;
});

await run('Organizar PDF', '/organizar-pdf/', async (p) => {
  await pick(p, 'input[type=file]', [`${FX}/b.pdf`]);
  await p.waitForSelector('.thumb canvas', { timeout: 20000 });
  await p.click('.thumb[data-p="0"] button[data-act=del]');
  await go(p);
}, async (f) => `${await pdfPages(f)} páginas após remover 1 (esperado 2)`);

await run('Remover páginas', '/remover-paginas-pdf/', async (p) => {
  await pick(p, 'input[type=file]', [`${FX}/b.pdf`]);
  await p.fill('input[name=pages]', '2');
  await go(p);
}, async (f) => `${await pdfPages(f)} páginas (esperado 2)`);

await run('Extrair páginas', '/extrair-paginas-pdf/', async (p) => {
  await pick(p, 'input[type=file]', [`${FX}/b.pdf`]);
  await p.fill('input[name=pages]', '3,1');
  await go(p);
}, async (f) => `${await pdfPages(f)} páginas (esperado 2)`);

await run('Numerar páginas', '/numerar-paginas-pdf/', async (p) => {
  await pick(p, 'input[type=file]', [`${FX}/b.pdf`]);
  await p.selectOption('select[name=format]', 'prefix');
  await go(p);
}, async (f) => `${await pdfPages(f)} páginas numeradas`);

await run('Marca d’água', '/marca-dagua-pdf/', async (p) => {
  await pick(p, 'input[type=file]', [`${FX}/a.pdf`]);
  await p.fill('input[name=text]', 'CÓPIA CONFIDENCIAL');
  await p.check('input[name=tile]');
  await go(p);
}, async (f) => `${await pdfPages(f)} páginas com marca`);

await run('JPG/PNG para PDF', '/jpg-para-pdf/', async (p) => {
  await pick(p, 'input[type=file]', [`${FX}/foto.png`, `${FX}/foto.png`]);
  await go(p);
}, async (f) => `${await pdfPages(f)} páginas (esperado 2)`);

await run('PDF para JPG', '/pdf-para-jpg/', async (p) => {
  await pick(p, 'input[type=file]', [`${FX}/b.pdf`]);
  await go(p);
}, async (f) => `zip de ${(await stat(f)).size} bytes`);

await run('PDF para texto', '/pdf-para-texto/', async (p) => {
  await pick(p, 'input[type=file]', [`${FX}/a.pdf`]);
  await go(p);
}, async (f) => {
  const t = await readFile(f, 'utf8');
  return `${t.length} caracteres; contém "Arquivo A": ${t.includes('Arquivo A')}`;
});

await run('PDF para Word', '/pdf-para-word/', async (p) => {
  await pick(p, 'input[type=file]', [`${FX}/a.pdf`]);
  await go(p);
}, async (f) => {
  const b = await readFile(f);
  return `docx de ${b.length} bytes; assinatura ZIP: ${b[0] === 0x50 && b[1] === 0x4b}`;
});

await run('Word para PDF', '/word-para-pdf/', async (p) => {
  await pick(p, 'input[type=file]', [`${FX}/doc.docx`]);
  await go(p);
}, async (f) => `${await pdfPages(f)} páginas (esperado 2)`);

await run('Assinar PDF', '/assinar-pdf/', async (p) => {
  await pick(p, 'input[type=file]', [`${FX}/a.pdf`]);
  await p.waitForSelector('[data-preview]', { state: 'visible', timeout: 20000 });
  await p.locator('[data-pad]').scrollIntoViewIfNeeded();
  const pad = await p.locator('[data-pad]').boundingBox();
  await p.mouse.move(pad.x + 25, pad.y + 90);
  await p.mouse.down();
  await p.mouse.move(pad.x + 90, pad.y + 40, { steps: 8 });
  await p.mouse.move(pad.x + 160, pad.y + 100, { steps: 8 });
  await p.mouse.up();
  await p.waitForTimeout(350);
  await p.locator('[data-preview]').scrollIntoViewIfNeeded();
  const prev = await p.locator('[data-preview]').boundingBox();
  await p.mouse.click(prev.x + prev.width * 0.6, prev.y + prev.height * 0.8);
  await go(p);
}, async (f) => `${await pdfPages(f)} páginas assinadas`);

/* Mobile viewport smoke test on the busiest page. */
const m = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
const mp = await m.newPage();
await mp.goto(base + '/', { waitUntil: 'load' });
const overflow = await mp.evaluate(() => {
  document.documentElement.style.scrollBehavior = 'auto';
  window.scrollTo({ left: 2000, top: 0, behavior: 'instant' });
  const x = window.scrollX;
  window.scrollTo({ left: 0, top: 0, behavior: 'instant' });
  return x; // px the user can actually drag the page sideways
});
const menuWorks = await mp.evaluate(() => {
  document.querySelector('[data-menu]').click();
  return document.getElementById('m-nav').classList.contains('open');
});
await m.close();
await browser.close();
server.close();

const pad = (s, n) => String(s).padEnd(n);
console.log('\n' + pad('FERRAMENTA', 30) + pad('OK', 5) + 'RESULTADO');
console.log('-'.repeat(96));
for (const r of results) console.log(pad(r.name, 30) + pad(r.ok ? '✓' : '✗', 5) + r.detail);
console.log('-'.repeat(96));
console.log(`Mobile 390px — scroll horizontal possível: ${overflow}px · menu abre: ${menuWorks}`);
console.log(`Upload de arquivo detectado: ${uploadSeen ? 'SIM (problema!)' : 'NÃO — nada sai do navegador'}`);
if (consoleErrors.length) { console.log(`\n⚠ erros de console (${consoleErrors.length}):`); [...new Set(consoleErrors)].slice(0, 12).forEach((e) => console.log('  ' + e)); }
const failed = results.filter((r) => !r.ok);
if (failed.length || uploadSeen || overflow > 1) { console.log(`\n✗ ${failed.length} falha(s)`); process.exit(1); }
console.log('\n✓ Todas as ferramentas funcionaram.');
