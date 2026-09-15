/** Generates sample files used by the browser test. */
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import { writeFile, mkdir } from 'node:fs/promises';

const out = process.argv[2];
await mkdir(out, { recursive: true });

async function makePdf(pages, label) {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  for (let i = 0; i < pages; i++) {
    const p = doc.addPage([595, 842]);
    p.drawText(`${label} — pagina ${i + 1}`, { x: 60, y: 760, size: 24, font, color: rgb(0.1, 0.1, 0.1) });
    p.drawText('Documento de teste do JuntarPDF com acentuacao: cao, area, voce.', { x: 60, y: 700, size: 12, font });
  }
  return doc.save();
}

await writeFile(`${out}/a.pdf`, await makePdf(2, 'Arquivo A'));
await writeFile(`${out}/b.pdf`, await makePdf(3, 'Arquivo B'));

// 1x1-ish JPEG built by hand is fragile; use a tiny real PNG instead.
const png = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAIAAAD/gAIDAAAAT0lEQVR4nO3QMQEAAAjAILV/51nBzwci0CmXkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKS0mcLXk8AAV3Rr7AAAAAASUVORK5CYII=',
  'base64'
);
await writeFile(`${out}/foto.png`, png);

// Minimal but valid .docx (stored entries, no compression).
const { createWriteStream } = await import('node:fs');
const crcTable = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
const crc32 = (b) => { let c = 0xffffffff; for (let i = 0; i < b.length; i++) c = crcTable[(c ^ b[i]) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
function zip(entries) {
  const parts = [], central = []; let offset = 0;
  const u32 = (n) => Buffer.from([n & 255, (n >>> 8) & 255, (n >>> 16) & 255, (n >>> 24) & 255]);
  const u16 = (n) => Buffer.from([n & 255, (n >>> 8) & 255]);
  for (const { name, data } of entries) {
    const nb = Buffer.from(name, 'utf8'), body = Buffer.from(data), crc = crc32(body);
    const local = [u32(0x04034b50), u16(20), u16(0x0800), u16(0), u16(0), u16(0), u32(crc), u32(body.length), u32(body.length), u16(nb.length), u16(0), nb, body];
    parts.push(...local);
    const size = local.reduce((s, c) => s + c.length, 0);
    central.push([u32(0x02014b50), u16(20), u16(20), u16(0x0800), u16(0), u16(0), u16(0), u32(crc), u32(body.length), u32(body.length), u16(nb.length), u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset), nb]);
    offset += size;
  }
  const cdStart = offset; let cdSize = 0;
  central.forEach((r) => { parts.push(...r); cdSize += r.reduce((s, c) => s + c.length, 0); });
  parts.push(u32(0x06054b50), u16(0), u16(0), u16(central.length), u16(central.length), u32(cdSize), u32(cdStart), u16(0));
  return Buffer.concat(parts);
}
const W = 'http://schemas.openxmlformats.org/wordprocessingml/2006/main';
const docx = zip([
  { name: '[Content_Types].xml', data: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/></Types>' },
  { name: '_rels/.rels', data: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/></Relationships>' },
  { name: 'word/document.xml', data: `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><w:document xmlns:w="${W}"><w:body><w:p><w:pPr><w:pStyle w:val="Heading1"/></w:pPr><w:r><w:t>Relatório de teste</w:t></w:r></w:p><w:p><w:r><w:t xml:space="preserve">Parágrafo normal com acentuação: coração, ação, você. </w:t></w:r><w:r><w:rPr><w:b/></w:rPr><w:t>Trecho em negrito.</w:t></w:r></w:p><w:p><w:pPr><w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr></w:pPr><w:r><w:t>Primeiro item da lista</w:t></w:r></w:p><w:p><w:pPr><w:numPr><w:ilvl w:val="0"/><w:numId w:val="1"/></w:numPr></w:pPr><w:r><w:t>Segundo item da lista</w:t></w:r></w:p><w:p><w:r><w:br w:type="page"/></w:r></w:p><w:p><w:r><w:t>Texto na segunda página do documento.</w:t></w:r></w:p></w:body></w:document>` },
]);
await writeFile(`${out}/doc.docx`, docx);
void createWriteStream;
console.log('fixtures em', out);
