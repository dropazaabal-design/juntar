/* =========================================================================
   JuntarPDF — tool engines. Every engine runs entirely in the browser;
   no file ever leaves the visitor's device.
   ========================================================================= */

import {
  $, $$, createTool, download, baseName, fmtBytes,
  loadPdfLib, loadPdfJs, parseRanges, makeZip, readPdf,
} from './core.js';
import { t } from './i18n.js';

/** pdf-lib's standard fonts speak WinAnsi; map the typography that isn't in it. */
const winAnsi = (s = '') =>
  String(s)
    .replace(/[‘’‛]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[–—−]/g, '-')
    .replace(/…/g, '...')
    .replace(/ /g, ' ')
    .replace(/[​-‍﻿]/g, '')
    .replace(/[^\x09\x0A\x0D\x20-\x7E\xA0-\xFF]/g, '');

const engines = {};
const el = (root, name) => root.querySelector(`[name="${name}"]`);
const val = (root, name, dflt = '') => {
  const n = el(root, name);
  if (!n) return dflt;
  if (n.type === 'checkbox') return n.checked;
  return n.value;
};
const radio = (root, name, dflt) => {
  const n = root.querySelector(`input[name="${name}"]:checked`);
  return n ? n.value : dflt;
};

/* ============================ 1. JUNTAR ================================= */

engines.merge = async (files, ctx) => {
  if (files.length < 2) throw new Error(t('mergeNeedTwo'));
  const PDFLib = await loadPdfLib();
  const out = await PDFLib.PDFDocument.create();
  let total = 0;
  for (let i = 0; i < files.length; i++) {
    const src = await readPdf(PDFLib, files[i]);
    const pages = await out.copyPages(src, src.getPageIndices());
    pages.forEach((p) => out.addPage(p));
    total += pages.length;
    ctx.progress((i + 1) / (files.length + 1));
  }
  out.setProducer('JuntarPDF.com');
  out.setCreator('JuntarPDF.com');
  const bytes = await out.save({ useObjectStreams: true });
  download(new Blob([bytes], { type: 'application/pdf' }), 'juntado.pdf');
  ctx.say(t('mergeDone', files.length, total, fmtBytes(bytes.length)), 'ok');
};

/* ============================ 2. DIVIDIR ================================ */

engines.split = async (files, ctx, root) => {
  const PDFLib = await loadPdfLib();
  const file = files[0];
  const src = await readPdf(PDFLib, file);
  const total = src.getPageCount();
  const mode = radio(root, 'mode', 'ranges');
  const name = baseName(file.name);

  const build = async (indices) => {
    const doc = await PDFLib.PDFDocument.create();
    const pages = await doc.copyPages(src, indices);
    pages.forEach((p) => doc.addPage(p));
    doc.setProducer('JuntarPDF.com');
    return doc.save({ useObjectStreams: true });
  };

  if (mode === 'ranges') {
    const idx = parseRanges(val(root, 'pages'), total);
    if (!idx.length) throw new Error(t('splitBadRange', total));
    const bytes = await build(idx);
    download(new Blob([bytes], { type: 'application/pdf' }), `${name}-paginas.pdf`);
    ctx.say(t('splitRangeDone', idx.length, total), 'ok');
    return;
  }

  const step = mode === 'each' ? 1 : Math.max(1, parseInt(val(root, 'every'), 10) || 10);
  const entries = [];
  for (let start = 0; start < total; start += step) {
    const idx = [];
    for (let p = start; p < Math.min(start + step, total); p++) idx.push(p);
    const bytes = await build(idx);
    const label = step === 1 ? String(start + 1).padStart(3, '0') : `${start + 1}-${Math.min(start + step, total)}`;
    entries.push({ name: `${name}-${label}.pdf`, data: bytes });
    ctx.progress((start + step) / total);
  }
  if (entries.length === 1) {
    download(new Blob([entries[0].data], { type: 'application/pdf' }), entries[0].name);
  } else {
    download(makeZip(entries), `${name}-dividido.zip`);
  }
  ctx.say(t('splitDone', entries.length, total), 'ok');
};

/* ============================ 3. COMPRIMIR ============================== */

const COMPRESS = { light: { scale: 2.08, q: 0.86 }, rec: { scale: 1.53, q: 0.72 }, max: { scale: 1.0, q: 0.58 } };

engines.compress = async (files, ctx, root) => {
  const [PDFLib, pdfjs] = await Promise.all([loadPdfLib(), loadPdfJs()]);
  const file = files[0];
  const preset = COMPRESS[radio(root, 'level', 'rec')] || COMPRESS.rec;
  const data = new Uint8Array(await file.arrayBuffer());
  const doc = await pdfjs.getDocument({ data, isEvalSupported: false }).promise;
  const out = await PDFLib.PDFDocument.create();
  const canvas = document.createElement('canvas');
  const c = canvas.getContext('2d', { alpha: false });

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const vp = page.getViewport({ scale: preset.scale });
    canvas.width = Math.max(1, Math.round(vp.width));
    canvas.height = Math.max(1, Math.round(vp.height));
    c.fillStyle = '#fff';
    c.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: c, viewport: vp }).promise;
    const blob = await new Promise((r) => canvas.toBlob(r, 'image/jpeg', preset.q));
    const img = await out.embedJpg(new Uint8Array(await blob.arrayBuffer()));
    const base = page.getViewport({ scale: 1 });
    const p = out.addPage([base.width, base.height]);
    p.drawImage(img, { x: 0, y: 0, width: base.width, height: base.height });
    page.cleanup();
    ctx.progress(i / doc.numPages);
  }
  out.setProducer('JuntarPDF.com');
  const bytes = await out.save({ useObjectStreams: true });
  const saved = 1 - bytes.length / file.size;
  download(new Blob([bytes], { type: 'application/pdf' }), `${baseName(file.name)}-comprimido.pdf`);
  ctx.say(
    saved > 0.02
      ? t('compressDone', fmtBytes(file.size), fmtBytes(bytes.length), Math.round(saved * 100))
      : t('compressFlat', fmtBytes(bytes.length)),
    saved > 0.02 ? 'ok' : ''
  );
};

/* ============================ 4. GIRAR ================================== */

engines.rotate = async (files, ctx, root) => {
  const PDFLib = await loadPdfLib();
  const file = files[0];
  const doc = await readPdf(PDFLib, file);
  const pages = doc.getPages();
  const angle = parseInt(radio(root, 'angle', '90'), 10);
  const scope = radio(root, 'scope', 'all');
  const custom = scope === 'range' ? new Set(parseRanges(val(root, 'pages'), pages.length)) : null;

  let n = 0;
  pages.forEach((p, i) => {
    const hit =
      scope === 'all' ||
      (scope === 'odd' && i % 2 === 0) ||
      (scope === 'even' && i % 2 === 1) ||
      (scope === 'range' && custom.has(i));
    if (!hit) return;
    p.setRotation(PDFLib.degrees(((p.getRotation().angle + angle) % 360 + 360) % 360));
    n++;
  });
  if (!n) throw new Error(t('rotateNone'));
  doc.setProducer('JuntarPDF.com');
  const bytes = await doc.save({ useObjectStreams: true });
  download(new Blob([bytes], { type: 'application/pdf' }), `${baseName(file.name)}-girado.pdf`);
  ctx.say(t('rotateDone', n, angle), 'ok');
};

/* ==================== 5/6/7. REMOVER + EXTRAIR ========================== */

const copySelected = async (PDFLib, file, pick) => {
  const src = await readPdf(PDFLib, file);
  const total = src.getPageCount();
  const indices = pick(total);
  if (!indices.length) throw new Error(t('noValidPages', total));
  const out = await PDFLib.PDFDocument.create();
  const pages = await out.copyPages(src, indices);
  pages.forEach((p) => out.addPage(p));
  out.setProducer('JuntarPDF.com');
  return { bytes: await out.save({ useObjectStreams: true }), kept: indices.length, total };
};

engines.removepages = async (files, ctx, root) => {
  const PDFLib = await loadPdfLib();
  const file = files[0];
  const raw = val(root, 'pages');
  if (!raw.trim()) throw new Error(t('removeAsk'));
  const { bytes, kept, total } = await copySelected(PDFLib, file, (pageCount) => {
    const drop = new Set(parseRanges(raw, pageCount));
    if (drop.size >= pageCount) throw new Error(t('removeAll'));
    return Array.from({ length: pageCount }, (_, i) => i).filter((i) => !drop.has(i));
  });
  download(new Blob([bytes], { type: 'application/pdf' }), `${baseName(file.name)}-sem-paginas.pdf`);
  ctx.say(t('removeDone', total - kept, kept), 'ok');
};

engines.extractpages = async (files, ctx, root) => {
  const PDFLib = await loadPdfLib();
  const file = files[0];
  const raw = val(root, 'pages');
  if (!raw.trim()) throw new Error(t('extractAsk'));
  const { bytes, kept } = await copySelected(PDFLib, file, (pageCount) => parseRanges(raw, pageCount));
  download(new Blob([bytes], { type: 'application/pdf' }), `${baseName(file.name)}-extraido.pdf`);
  ctx.say(t('extractDone', kept), 'ok');
};

/* ============================ 8. NUMERAR ================================ */

engines.pagenumbers = async (files, ctx, root) => {
  const PDFLib = await loadPdfLib();
  const file = files[0];
  const doc = await readPdf(PDFLib, file);
  const font = await doc.embedFont(PDFLib.StandardFonts.Helvetica);
  const pages = doc.getPages();
  const pos = val(root, 'position', 'bottom-center');
  const format = val(root, 'format', 'n');
  const prefix = winAnsi(val(root, 'prefix', ''));
  const size = Math.max(6, Math.min(36, parseInt(val(root, 'size'), 10) || 11));
  const margin = Math.max(8, Math.min(90, parseInt(val(root, 'margin'), 10) || 28));
  const startPage = Math.max(1, parseInt(val(root, 'startPage'), 10) || 1);
  const startNum = parseInt(val(root, 'startNum'), 10) || 1;
  const countable = pages.length - startPage + 1;

  let n = 0;
  pages.forEach((page, i) => {
    if (i + 1 < startPage) return;
    const num = startNum + (i + 1 - startPage);
    const text = winAnsi(
      format === 'total' ? `${num} de ${startNum + countable - 1}`
      : format === 'dash' ? `- ${num} -`
      : format === 'prefix' ? `${prefix}${num}`
      : String(num)
    );
    const { width, height } = page.getSize();
    const w = font.widthOfTextAtSize(text, size);
    const x = pos.endsWith('left') ? margin : pos.endsWith('right') ? width - margin - w : (width - w) / 2;
    const y = pos.startsWith('top') ? height - margin - size * 0.8 : margin;
    page.drawText(text, { x, y, size, font, color: PDFLib.rgb(0.12, 0.14, 0.18) });
    n++;
  });
  if (!n) throw new Error(t('numbersNone'));
  doc.setProducer('JuntarPDF.com');
  const bytes = await doc.save({ useObjectStreams: true });
  download(new Blob([bytes], { type: 'application/pdf' }), `${baseName(file.name)}-numerado.pdf`);
  ctx.say(t('numbersDone', n), 'ok');
};

/* ============================ 9. MARCA D'ÁGUA =========================== */

engines.watermark = async (files, ctx, root) => {
  const PDFLib = await loadPdfLib();
  const file = files[0];
  const text = winAnsi(val(root, 'text', 'CONFIDENCIAL').trim() || 'CONFIDENCIAL');
  const doc = await readPdf(PDFLib, file);
  const font = await doc.embedFont(PDFLib.StandardFonts.HelveticaBold);
  const opacity = Math.max(0.03, Math.min(1, (parseInt(val(root, 'opacity'), 10) || 18) / 100));
  const deg = radio(root, 'angle', '45') === '0' ? 0 : 45;
  const size = Math.max(8, Math.min(200, parseInt(val(root, 'size'), 10) || 54));
  const tile = val(root, 'tile') === true || val(root, 'tile') === 'on';
  const colors = {
    gray: PDFLib.rgb(0.45, 0.47, 0.52),
    red: PDFLib.rgb(0.85, 0.15, 0.24),
    blue: PDFLib.rgb(0.16, 0.35, 0.68),
  };
  const color = colors[val(root, 'color', 'gray')] || colors.gray;

  doc.getPages().forEach((page) => {
    const { width, height } = page.getSize();
    const w = font.widthOfTextAtSize(text, size);
    const opts = { size, font, color, opacity, rotate: PDFLib.degrees(deg) };
    if (tile) {
      const stepX = Math.max(w + 70, 180);
      const stepY = Math.max(size * 3.4, 130);
      for (let y = -stepY; y < height + stepY; y += stepY) {
        for (let x = -stepX; x < width + stepX; x += stepX) {
          page.drawText(text, { ...opts, x, y });
        }
      }
    } else {
      const rad = (deg * Math.PI) / 180;
      page.drawText(text, {
        ...opts,
        x: width / 2 - (w / 2) * Math.cos(rad),
        y: height / 2 - (w / 2) * Math.sin(rad) - size * 0.35,
      });
    }
  });
  doc.setProducer('JuntarPDF.com');
  const bytes = await doc.save({ useObjectStreams: true });
  download(new Blob([bytes], { type: 'application/pdf' }), `${baseName(file.name)}-marca-dagua.pdf`);
  ctx.say(t('watermarkDone', doc.getPageCount()), 'ok');
};

/* ============================ 10. IMAGENS → PDF ========================= */

const PAGE_SIZES = { a4: [595.28, 841.89], letter: [612, 792] };

engines.img2pdf = async (files, ctx, root) => {
  const PDFLib = await loadPdfLib();
  const out = await PDFLib.PDFDocument.create();
  const sizeKey = val(root, 'pageSize', 'a4');
  const margin = Math.max(0, Math.min(120, parseInt(val(root, 'margin'), 10) || 0));
  const orientation = val(root, 'orientation', 'auto');

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    let bytes = new Uint8Array(await file.arrayBuffer());
    let img;
    const isPng = /png$/i.test(file.type) || /\.png$/i.test(file.name);
    const isJpg = /jpe?g$/i.test(file.type) || /\.jpe?g$/i.test(file.name);

    if (!isPng && !isJpg) {
      // WEBP (and anything else the browser can decode) → flatten to JPEG.
      const bmp = await createImageBitmap(new Blob([bytes]));
      const cv = document.createElement('canvas');
      cv.width = bmp.width;
      cv.height = bmp.height;
      const c = cv.getContext('2d');
      c.fillStyle = '#fff';
      c.fillRect(0, 0, cv.width, cv.height);
      c.drawImage(bmp, 0, 0);
      const blob = await new Promise((r) => cv.toBlob(r, 'image/jpeg', 0.92));
      bytes = new Uint8Array(await blob.arrayBuffer());
      img = await out.embedJpg(bytes);
    } else {
      try {
        img = isPng ? await out.embedPng(bytes) : await out.embedJpg(bytes);
      } catch {
        throw new Error(t('imageReadFail', file.name));
      }
    }

    let pw, ph;
    if (sizeKey === 'fit') {
      pw = img.width + margin * 2;
      ph = img.height + margin * 2;
    } else {
      const [a, b] = PAGE_SIZES[sizeKey] || PAGE_SIZES.a4;
      const landscape = orientation === 'landscape' || (orientation === 'auto' && img.width > img.height);
      pw = landscape ? b : a;
      ph = landscape ? a : b;
    }
    const page = out.addPage([pw, ph]);
    if (isPng) page.drawRectangle({ x: 0, y: 0, width: pw, height: ph, color: PDFLib.rgb(1, 1, 1) });
    const maxW = pw - margin * 2;
    const maxH = ph - margin * 2;
    const scale = Math.min(maxW / img.width, maxH / img.height);
    const w = img.width * scale;
    const h = img.height * scale;
    page.drawImage(img, { x: (pw - w) / 2, y: (ph - h) / 2, width: w, height: h });
    ctx.progress((i + 1) / files.length);
  }
  out.setProducer('JuntarPDF.com');
  const bytes = await out.save({ useObjectStreams: true });
  download(new Blob([bytes], { type: 'application/pdf' }), 'imagens.pdf');
  ctx.say(t('imgToPdfDone', files.length, fmtBytes(bytes.length)), 'ok');
};

/* ============================ 11. PDF → IMAGENS ========================= */

engines.pdf2img = async (files, ctx, root) => {
  const pdfjs = await loadPdfJs();
  const file = files[0];
  const format = root.dataset.format === 'png' ? 'png' : 'jpg';
  const mime = format === 'png' ? 'image/png' : 'image/jpeg';
  const dpi = Math.max(48, Math.min(300, parseInt(radio(root, 'dpi', '150'), 10) || 150));
  const scale = dpi / 72;

  const data = new Uint8Array(await file.arrayBuffer());
  const doc = await pdfjs.getDocument({ data, isEvalSupported: false }).promise;
  const name = baseName(file.name);
  const canvas = document.createElement('canvas');
  const c = canvas.getContext('2d', { alpha: false });
  const entries = [];

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const vp = page.getViewport({ scale });
    canvas.width = Math.max(1, Math.round(vp.width));
    canvas.height = Math.max(1, Math.round(vp.height));
    c.fillStyle = '#fff';
    c.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: c, viewport: vp }).promise;
    const blob = await new Promise((r) => canvas.toBlob(r, mime, 0.92));
    entries.push({ name: `${name}-${String(i).padStart(3, '0')}.${format}`, data: new Uint8Array(await blob.arrayBuffer()) });
    page.cleanup();
    ctx.progress(i / doc.numPages);
  }

  if (entries.length === 1) {
    download(new Blob([entries[0].data], { type: mime }), entries[0].name);
  } else {
    download(makeZip(entries), `${name}-${format}.zip`);
  }
  ctx.say(t('pdfToImgDone', entries.length, dpi, format.toUpperCase()), 'ok');
};

/* ============================ 12. PDF → TEXTO =========================== */

async function extractText(file, ctx) {
  const pdfjs = await loadPdfJs();
  const data = new Uint8Array(await file.arrayBuffer());
  const doc = await pdfjs.getDocument({ data, isEvalSupported: false }).promise;
  const pages = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    let text = '';
    let lastY = null;
    for (const item of content.items) {
      if (!('str' in item)) continue;
      const y = item.transform[5];
      if (lastY !== null && Math.abs(y - lastY) > 2) text += '\n';
      else if (text && !/\s$/.test(text) && item.str && !/^\s/.test(item.str)) text += ' ';
      text += item.str;
      lastY = y;
    }
    pages.push(text.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim());
    page.cleanup();
    if (ctx) ctx.progress(i / doc.numPages);
  }
  const chars = pages.join('').replace(/\s/g, '').length;
  if (chars < 12) {
    throw new Error(t('noTextLayer'));
  }
  return pages;
}

engines.pdf2txt = async (files, ctx, root) => {
  const file = files[0];
  const pages = await extractText(file, ctx);
  const text = pages.map((p, i) => `${t('pagePrefix', i + 1)}\n${p}`).join('\n\n');
  const box = $('[data-output]', root);
  if (box) {
    box.value = text;
    box.closest('[data-output-wrap]')?.removeAttribute('hidden');
  }
  download(new Blob([text], { type: 'text/plain;charset=utf-8' }), `${baseName(file.name)}.txt`);
  ctx.say(t('textDone', pages.length, t('numFmt', text.length)), 'ok');
};

/* ============================ 13. PDF → WORD ============================ */

const xmlEsc = (s = '') =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function buildDocx(paragraphs) {
  const enc = new TextEncoder();
  const body = paragraphs
    .map((p) => {
      if (p.pageBreak) return '<w:p><w:r><w:br w:type="page"/></w:r></w:p>';
      const runs = xmlEsc(p.text)
        .split('\n')
        .map((line, i) => (i ? '<w:r><w:br/></w:r>' : '') + `<w:r><w:t xml:space="preserve">${line}</w:t></w:r>`)
        .join('');
      return `<w:p><w:pPr><w:spacing w:after="160" w:line="276" w:lineRule="auto"/></w:pPr>${runs}</w:p>`;
    })
    .join('');

  const files = [
    {
      name: '[Content_Types].xml',
      data: enc.encode(
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>'
      ),
    },
    {
      name: '_rels/.rels',
      data: enc.encode(
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>'
      ),
    },
    {
      name: 'word/document.xml',
      data: enc.encode(
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main"><w:body>' +
          body +
          '<w:sectPr><w:pgSz w:w="11906" w:h="16838"/><w:pgMar w:top="1134" w:right="1134" w:bottom="1134" w:left="1134"/></w:sectPr></w:body></w:document>'
      ),
    },
  ];
  return makeZip(files);
}

engines.pdf2docx = async (files, ctx, root) => {
  const file = files[0];
  const pages = await extractText(file, ctx);
  const paras = [];
  pages.forEach((page, pi) => {
    if (pi) paras.push({ pageBreak: true });
    page
      .split(/\n{2,}/)
      .map((s) => s.trim())
      .filter(Boolean)
      .forEach((text) => paras.push({ text }));
  });
  const blob = buildDocx(paras);
  download(blob, `${baseName(file.name)}.docx`);
  ctx.say(t('docxDone', pages.length, fmtBytes(blob.size)), 'ok');
};

/* ============================ 14. WORD → PDF ============================ */

/** Minimal ZIP reader — enough to open a .docx package in the browser. */
async function unzip(buffer) {
  const view = new DataView(buffer);
  const bytes = new Uint8Array(buffer);
  let eocd = -1;
  for (let i = bytes.length - 22; i >= Math.max(0, bytes.length - 66000); i--) {
    if (view.getUint32(i, true) === 0x06054b50) { eocd = i; break; }
  }
  if (eocd < 0) throw new Error(t('zipInvalid'));
  const count = view.getUint16(eocd + 10, true);
  let p = view.getUint32(eocd + 16, true);
  const out = new Map();
  const dec = new TextDecoder();

  for (let i = 0; i < count; i++) {
    if (view.getUint32(p, true) !== 0x02014b50) break;
    const method = view.getUint16(p + 10, true);
    const compSize = view.getUint32(p + 20, true);
    const nameLen = view.getUint16(p + 28, true);
    const extraLen = view.getUint16(p + 30, true);
    const commentLen = view.getUint16(p + 32, true);
    const localOff = view.getUint32(p + 42, true);
    const name = dec.decode(bytes.subarray(p + 46, p + 46 + nameLen));
    const lNameLen = view.getUint16(localOff + 26, true);
    const lExtraLen = view.getUint16(localOff + 28, true);
    const start = localOff + 30 + lNameLen + lExtraLen;
    const raw = bytes.subarray(start, start + compSize);
    if (method === 0) {
      out.set(name, raw);
    } else if (method === 8) {
      if (typeof DecompressionStream === 'undefined') {
        throw new Error(t('browserTooOld'));
      }
      const ds = new DecompressionStream('deflate-raw');
      const buf = await new Response(new Blob([raw]).stream().pipeThrough(ds)).arrayBuffer();
      out.set(name, new Uint8Array(buf));
    }
    p += 46 + nameLen + extraLen + commentLen;
  }
  return out;
}

const W_NS = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';

function docxBlocks(xmlText) {
  const doc = new DOMParser().parseFromString(xmlText, 'application/xml');
  const body = doc.getElementsByTagNameNS(W_NS, 'body')[0];
  if (!body) throw new Error(t('docxUnreadable'));
  const blocks = [];

  const readParagraph = (p, indent = 0) => {
    const style = p.getElementsByTagNameNS(W_NS, 'pStyle')[0]?.getAttributeNS(W_NS, 'val') || '';
    const heading = /^(Heading|Ttulo|Titulo|Título)\s*([1-6])/i.exec(style);
    const bullet = p.getElementsByTagNameNS(W_NS, 'numPr').length > 0;
    const align = p.getElementsByTagNameNS(W_NS, 'jc')[0]?.getAttributeNS(W_NS, 'val') || 'left';
    const runs = [];
    let hasPageBreak = false;

    Array.from(p.getElementsByTagNameNS(W_NS, 'r')).forEach((r) => {
      const rPr = r.getElementsByTagNameNS(W_NS, 'rPr')[0];
      const bold = !!rPr?.getElementsByTagNameNS(W_NS, 'b').length;
      const italic = !!rPr?.getElementsByTagNameNS(W_NS, 'i').length;
      Array.from(r.childNodes).forEach((node) => {
        if (node.localName === 't') runs.push({ text: node.textContent || '', bold, italic });
        else if (node.localName === 'tab') runs.push({ text: '    ', bold, italic });
        else if (node.localName === 'br') {
          if (node.getAttributeNS(W_NS, 'type') === 'page') hasPageBreak = true;
          else runs.push({ text: '\n', bold, italic });
        }
      });
    });

    const text = runs.map((r) => r.text).join('').trim();
    if (text) blocks.push({ type: heading ? 'h' + heading[2] : 'p', runs, text, bullet, align, indent });
    if (hasPageBreak) blocks.push({ type: 'pagebreak' });
  };

  const walk = (parent, indent = 0) => {
    Array.from(parent.childNodes).forEach((node) => {
      if (node.namespaceURI !== W_NS) return;
      if (node.localName === 'p') readParagraph(node, indent);
      else if (node.localName === 'tbl') {
        Array.from(node.getElementsByTagNameNS(W_NS, 'tr')).forEach((tr) => {
          const cells = Array.from(tr.getElementsByTagNameNS(W_NS, 'tc')).map((tc) =>
            Array.from(tc.getElementsByTagNameNS(W_NS, 't')).map((t) => t.textContent).join('').trim()
          );
          const text = cells.filter(Boolean).join('  •  ');
          if (text) blocks.push({ type: 'p', runs: [{ text }], text, bullet: false, align: 'left', indent: indent + 1 });
        });
      }
    });
  };

  walk(body);
  if (!blocks.length) throw new Error('O documento parece estar vazio.');
  return blocks;
}

engines.docx2pdf = async (files, ctx, root) => {
  const file = files[0];
  if (/\.doc$/i.test(file.name)) {
    throw new Error(t('docFormatUnsupported'));
  }
  const PDFLib = await loadPdfLib();
  ctx.progress(0.15);
  const zip = await unzip(await file.arrayBuffer());
  const docXml = zip.get('word/document.xml');
  if (!docXml) throw new Error(t('notDocx'));
  const blocks = docxBlocks(new TextDecoder().decode(docXml));
  ctx.progress(0.4);

  const pdf = await PDFLib.PDFDocument.create();
  const regular = await pdf.embedFont(PDFLib.StandardFonts.Helvetica);
  const bold = await pdf.embedFont(PDFLib.StandardFonts.HelveticaBold);
  const italic = await pdf.embedFont(PDFLib.StandardFonts.HelveticaOblique);
  const boldItalic = await pdf.embedFont(PDFLib.StandardFonts.HelveticaBoldOblique);
  const pick = (b, i) => (b && i ? boldItalic : b ? bold : i ? italic : regular);

  const [PW, PH] = PAGE_SIZES.a4;
  const M = 56;
  let page = pdf.addPage([PW, PH]);
  let y = PH - M;

  const newPage = () => {
    page = pdf.addPage([PW, PH]);
    y = PH - M;
  };
  const need = (h) => {
    if (y - h < M) newPage();
  };

  const SIZES = { h1: 20, h2: 16, h3: 13.5, h4: 12.5, h5: 12, h6: 12, p: 11 };

  for (const block of blocks) {
    if (block.type === 'pagebreak') { newPage(); continue; }
    const size = SIZES[block.type] || SIZES.p;
    const isHeading = block.type[0] === 'h';
    const lead = size * 1.42;
    const indent = (block.indent || 0) * 18 + (block.bullet ? 16 : 0);
    const maxW = PW - M * 2 - indent;

    // Split runs into words while remembering each word's style.
    const words = [];
    (block.runs.length ? block.runs : [{ text: block.text }]).forEach((run) => {
      winAnsi(run.text).split(/(\s+)/).forEach((w) => {
        if (w === '') return;
        words.push({ w, bold: isHeading || run.bold, italic: run.italic });
      });
    });

    let line = [];
    let lineW = 0;
    const flush = (isFirst) => {
      if (!line.length) return;
      need(lead);
      let x = M + indent;
      if (block.align === 'center' || block.align === 'right') {
        const total = line.reduce((s, t) => s + pick(t.bold, t.italic).widthOfTextAtSize(t.w, size), 0);
        x = block.align === 'center' ? (PW - total) / 2 : PW - M - total;
      }
      if (isFirst && block.bullet) {
        page.drawText('•', { x: M + indent - 14, y: y - size, size, font: regular, color: PDFLib.rgb(0.2, 0.22, 0.28) });
      }
      line.forEach((t) => {
        const f = pick(t.bold, t.italic);
        page.drawText(t.w, { x, y: y - size, size, font: f, color: PDFLib.rgb(0.07, 0.09, 0.13) });
        x += f.widthOfTextAtSize(t.w, size);
      });
      y -= lead;
      line = [];
      lineW = 0;
    };

    if (isHeading) { need(lead + 10); y -= 8; }
    let first = true;
    for (const t of words) {
      const w = pick(t.bold, t.italic).widthOfTextAtSize(t.w, size);
      if (lineW + w > maxW && line.length) { flush(first); first = false; }
      if (/^\s+$/.test(t.w) && !line.length) continue;
      line.push(t);
      lineW += w;
    }
    flush(first);
    y -= isHeading ? 6 : 5;
  }

  pdf.setProducer('JuntarPDF.com');
  const bytes = await pdf.save({ useObjectStreams: true });
  download(new Blob([bytes], { type: 'application/pdf' }), `${baseName(file.name)}.pdf`);
  ctx.say(t('docx2pdfDone', pdf.getPageCount(), fmtBytes(bytes.length)), 'ok');
};

/* ============================ 15. ORGANIZAR ============================= */

const THUMB_CAP = 400;

engines.organize = async (files, ctx, root) => {
  const PDFLib = await loadPdfLib();
  const state = root._pages || [];
  const keep = state.filter((p) => !p.removed);
  if (!keep.length) throw new Error(t('organizeEmpty'));

  const src = await readPdf(PDFLib, files[0]);
  const out = await PDFLib.PDFDocument.create();
  const copied = await out.copyPages(src, keep.map((p) => p.index));
  copied.forEach((page, i) => {
    const rot = ((keep[i].rotate % 360) + 360) % 360;
    if (rot) page.setRotation(PDFLib.degrees((page.getRotation().angle + rot) % 360));
    out.addPage(page);
  });
  out.setProducer('JuntarPDF.com');
  const bytes = await out.save({ useObjectStreams: true });
  download(new Blob([bytes], { type: 'application/pdf' }), `${baseName(files[0].name)}-organizado.pdf`);
  ctx.say(t('organizeDone', keep.length), 'ok');
};

engines.organize.onFiles = async (files, ctx, root) => {
  const wrap = $('[data-thumbs]', root);
  const panel = $('[data-organize-actions]', root);
  if (!wrap) return;
  if (!files.length) {
    wrap.innerHTML = '';
    root._pages = [];
    if (panel) panel.hidden = true;
    return;
  }

  const pdfjs = await loadPdfJs();
  const data = new Uint8Array(await files[0].arrayBuffer());
  const doc = await pdfjs.getDocument({ data, isEvalSupported: false }).promise;
  const n = Math.min(doc.numPages, THUMB_CAP);
  root._pages = Array.from({ length: doc.numPages }, (_, i) => ({ index: i, rotate: 0, removed: false }));
  if (panel) panel.hidden = false;
  ctx.say(t('loadingPages', doc.numPages));

  const paint = () => {
    wrap.innerHTML = root._pages
      .map(
        (p, i) => `<div class="thumb${p.removed ? ' off' : ''}" data-p="${i}">
<canvas data-c="${p.index}" style="transform:rotate(${p.rotate}deg)"></canvas>
<span class="tn">${i + 1}</span>
<button class="tx" type="button" data-act="del" data-i="${i}" aria-label="${t('removePageAria', i + 1)}">${p.removed ? '+' : '×'}</button>
<div style="display:flex;gap:2px;padding:4px;background:var(--surface-2)">
<button class="iconbtn" type="button" data-act="left" data-i="${i}" aria-label="${t('movePageLeftAria', i + 1)}" style="width:auto;flex:1;height:26px">‹</button>
<button class="iconbtn" type="button" data-act="rot" data-i="${i}" aria-label="${t('rotatePageAria', i + 1)}" style="width:auto;flex:1;height:26px">↻</button>
<button class="iconbtn" type="button" data-act="right" data-i="${i}" aria-label="${t('movePageRightAria', i + 1)}" style="width:auto;flex:1;height:26px">›</button>
</div></div>`
      )
      .join('');
    wrap.querySelectorAll('canvas[data-c]').forEach((cv) => {
      const cached = renders.get(+cv.dataset.c);
      if (cached) { cv.width = cached.width; cv.height = cached.height; cv.getContext('2d').drawImage(cached, 0, 0); }
    });
  };

  const renders = new Map();
  paint();

  for (let i = 1; i <= n; i++) {
    const page = await doc.getPage(i);
    const vp = page.getViewport({ scale: 1 });
    const scale = Math.min(150 / vp.width, 200 / vp.height);
    const v = page.getViewport({ scale });
    const cv = document.createElement('canvas');
    cv.width = Math.round(v.width);
    cv.height = Math.round(v.height);
    const c = cv.getContext('2d', { alpha: false });
    c.fillStyle = '#fff';
    c.fillRect(0, 0, cv.width, cv.height);
    await page.render({ canvasContext: c, viewport: v }).promise;
    renders.set(i - 1, cv);
    const target = wrap.querySelector(`canvas[data-c="${i - 1}"]`);
    if (target) { target.width = cv.width; target.height = cv.height; target.getContext('2d').drawImage(cv, 0, 0); }
    page.cleanup();
    ctx.progress(i / n);
  }
  ctx.progress(-1);
  ctx.say(doc.numPages > THUMB_CAP
    ? t('pagesLoadedCapped', doc.numPages, THUMB_CAP)
    : t('pagesReady', doc.numPages));

  if (!wrap._wired) {
    wrap._wired = true;
    wrap.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-act]');
      if (!b) return;
      const i = +b.dataset.i;
      const pages = root._pages;
      const act = b.dataset.act;
      if (act === 'del') pages[i].removed = !pages[i].removed;
      else if (act === 'rot') pages[i].rotate = (pages[i].rotate + 90) % 360;
      else if (act === 'left' && i > 0) pages.splice(i - 1, 0, pages.splice(i, 1)[0]);
      else if (act === 'right' && i < pages.length - 1) pages.splice(i + 1, 0, pages.splice(i, 1)[0]);
      paint();
    });
  }
  if (panel && !panel._wired) {
    panel._wired = true;
    panel.addEventListener('click', (e) => {
      const b = e.target.closest('button[data-bulk]');
      if (!b) return;
      if (b.dataset.bulk === 'reverse') root._pages.reverse();
      else if (b.dataset.bulk === 'reset') root._pages = root._pages
        .map((p) => ({ ...p, rotate: 0, removed: false }))
        .sort((a, z) => a.index - z.index);
      paint();
    });
  }
};

/* ============================ 16. ASSINAR =============================== */

engines.sign = async (files, ctx, root) => {
  const sig = root._sigData;
  const place = root._place;
  if (!sig) throw new Error(t('signNoDraw'));
  if (!place) throw new Error(t('signNoPlace'));

  const PDFLib = await loadPdfLib();
  const doc = await readPdf(PDFLib, files[0]);
  const pages = doc.getPages();
  const page = pages[place.page] || pages[0];
  const { width, height } = page.getSize();
  const png = await doc.embedPng(sig);
  const w = width * place.scale;
  const h = (png.height / png.width) * w;
  page.drawImage(png, {
    x: Math.max(0, Math.min(width - w, width * place.x - w / 2)),
    y: Math.max(0, Math.min(height - h, height * (1 - place.y) - h / 2)),
    width: w,
    height: h,
  });
  doc.setProducer('JuntarPDF.com');
  const bytes = await doc.save({ useObjectStreams: true });
  download(new Blob([bytes], { type: 'application/pdf' }), `${baseName(files[0].name)}-assinado.pdf`);
  ctx.say(t('signDone', place.page + 1), 'ok');
};

engines.sign.onFiles = async (files, ctx, root) => {
  const stage = $('[data-sign-stage]', root);
  if (!stage) return;
  stage.hidden = files.length === 0;
  if (!files.length) return;
  initSignaturePad(root);

  const pdfjs = await loadPdfJs();
  const data = new Uint8Array(await files[0].arrayBuffer());
  const doc = await pdfjs.getDocument({ data, isEvalSupported: false }).promise;
  const select = $('[data-page-select]', root);
  const preview = $('[data-preview]', root);
  const marker = $('[data-marker]', root);
  const sizeInput = el(root, 'sigSize');
  root._place = null;

  if (select) {
    select.innerHTML = Array.from({ length: doc.numPages }, (_, i) => `<option value="${i}">${t('pageOption', i + 1)}</option>`).join('');
    select.value = '0';
  }

  const renderPreview = async () => {
    const idx = select ? +select.value : 0;
    const page = await doc.getPage(idx + 1);
    const vp = page.getViewport({ scale: 1 });
    const scale = Math.min(520 / vp.width, 700 / vp.height);
    const v = page.getViewport({ scale });
    preview.width = Math.round(v.width);
    preview.height = Math.round(v.height);
    const c = preview.getContext('2d', { alpha: false });
    c.fillStyle = '#fff';
    c.fillRect(0, 0, preview.width, preview.height);
    await page.render({ canvasContext: c, viewport: v }).promise;
    page.cleanup();
    if (marker) marker.hidden = true;
    root._place = null;
  };
  await renderPreview();
  if (select && !select._wired) { select._wired = true; select.addEventListener('change', renderPreview); }

  if (!preview._wired) {
    preview._wired = true;
    preview.addEventListener('click', (e) => {
      const r = preview.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      const scale = (parseInt(sizeInput?.value, 10) || 28) / 100;
      root._place = { page: select ? +select.value : 0, x, y, scale };
      if (marker && root._sigUrl) {
        marker.hidden = false;
        marker.style.left = x * 100 + '%';
        marker.style.top = y * 100 + '%';
        marker.style.width = scale * 100 + '%';
        marker.src = root._sigUrl;
      }
      ctx.say(t('signPlaced'));
    });
  }
};

/** Signature pad — pointer based so it works with finger, stylus and mouse. */
function initSignaturePad(root) {
  const pad = $('[data-pad]', root);
  if (!pad || pad._wired) return;
  pad._wired = true;
  const c = pad.getContext('2d');
  const resize = () => {
    const r = pad.getBoundingClientRect();
    if (!r.width || !r.height) return; // still inside the hidden stage
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(r.width * dpr);
    const h = Math.round(r.height * dpr);
    if (pad.width === w && pad.height === h) return;
    const img = pad.width && pad.height ? c.getImageData(0, 0, pad.width, pad.height) : null;
    pad.width = w;
    pad.height = h;
    c.setTransform(1, 0, 0, 1, 0, 0);
    c.scale(dpr, dpr);
    c.lineWidth = 2.6;
    c.lineCap = 'round';
    c.lineJoin = 'round';
    c.strokeStyle = '#111';
    if (img) c.putImageData(img, 0, 0);
  };
  resize();
  addEventListener('resize', resize);
  if (typeof ResizeObserver !== 'undefined') new ResizeObserver(resize).observe(pad);

  let drawing = false;
  let dirty = false;
  const pt = (e) => {
    const r = pad.getBoundingClientRect();
    return [e.clientX - r.left, e.clientY - r.top];
  };
  pad.addEventListener('pointerdown', (e) => {
    drawing = true;
    dirty = true;
    pad.setPointerCapture(e.pointerId);
    const [x, y] = pt(e);
    c.beginPath();
    c.moveTo(x, y);
  });
  pad.addEventListener('pointermove', (e) => {
    if (!drawing) return;
    e.preventDefault();
    const [x, y] = pt(e);
    c.lineTo(x, y);
    c.stroke();
  });
  const end = async () => {
    if (!drawing) return;
    drawing = false;
    if (!dirty) return;
    const blob = await new Promise((r) => pad.toBlob(r, 'image/png'));
    if (!blob) return;
    root._sigData = new Uint8Array(await blob.arrayBuffer());
    if (root._sigUrl) URL.revokeObjectURL(root._sigUrl);
    root._sigUrl = URL.createObjectURL(blob);
    const marker = $('[data-marker]', root);
    if (marker && !marker.hidden) marker.src = root._sigUrl;
  };
  pad.addEventListener('pointerup', end);
  pad.addEventListener('pointerleave', end);
  pad.addEventListener('pointercancel', end);

  const clear = $('[data-pad-clear]', root);
  if (clear) {
    clear.addEventListener('click', () => {
      c.clearRect(0, 0, pad.width, pad.height);
      dirty = false;
      root._sigData = null;
      const marker = $('[data-marker]', root);
      if (marker) marker.hidden = true;
    });
  }
}

/* ============================== bootstrap =============================== */

const IMAGE_RE = /\.(jpe?g|png|webp)$/i;

function validatorFor(engine) {
  if (engine === 'img2pdf') {
    return (files) => (files.every((f) => IMAGE_RE.test(f.name) || /^image\//.test(f.type))
      ? null
      : t('onlyImages'));
  }
  if (engine === 'docx2pdf') {
    return (files) => (/\.docx$/i.test(files[0]?.name || '')
      ? null
      : t('onlyDocx'));
  }
  return (files) => (files.every((f) => /\.pdf$/i.test(f.name) || f.type === 'application/pdf')
    ? null
    : t('onlyPdf'));
}

$$('[data-tool]').forEach((root) => {
  const name = root.dataset.tool;
  const run = engines[name];
  if (!run) return;
  if (name === 'sign') initSignaturePad(root);
  createTool({
    root,
    multiple: root.dataset.multiple === '1',
    validate: validatorFor(name),
    onRun: (files, ctx) => run(files, ctx, root),
    onFiles: run.onFiles ? (files, ctx) => Promise.resolve(run.onFiles(files, ctx, root)).catch((e) => ctx.say(e.message, 'err')) : null,
  });
});

/* Category filter on the tool grid. */
$$('[data-filter]').forEach((bar) => {
  const cards = $$('[data-cat]', document);
  bar.addEventListener('click', (e) => {
    const b = e.target.closest('.pill');
    if (!b) return;
    const cat = b.dataset.cat;
    $$('.pill', bar).forEach((p) => p.setAttribute('aria-pressed', String(p === b)));
    cards.forEach((c) => { c.style.display = !cat || c.dataset.cat === cat ? '' : 'none'; });
  });
});

export { engines };
