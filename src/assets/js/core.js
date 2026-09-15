/* =========================================================================
   JuntarPDF — shared runtime for every tool page.
   No framework, no third-party requests: pdf-lib and pdf.js are self-hosted
   and loaded lazily, only when the visitor actually picks a file.
   ========================================================================= */

export const $ = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

export const fmtBytes = (n) => {
  if (!n && n !== 0) return '';
  if (n < 1024) return n + ' B';
  if (n < 1048576) return (n / 1024).toFixed(0) + ' KB';
  return (n / 1048576).toFixed(n < 10485760 ? 1 : 0) + ' MB';
};

export function download(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 4000);
}

export const baseName = (name = 'documento') => name.replace(/\.[^.]+$/, '') || 'documento';

/* ----------------------------------------------------- lazy library load */

let pdflibPromise, pdfjsPromise;

export function loadPdfLib() {
  if (!pdflibPromise) {
    pdflibPromise = new Promise((resolve, reject) => {
      if (window.PDFLib) return resolve(window.PDFLib);
      const s = document.createElement('script');
      s.src = '/vendor/pdf-lib.min.js';
      s.onload = () => (window.PDFLib ? resolve(window.PDFLib) : reject(new Error('pdf-lib indisponível')));
      s.onerror = () => reject(new Error('Não foi possível carregar o motor de PDF.'));
      document.head.appendChild(s);
    });
  }
  return pdflibPromise;
}

export function loadPdfJs() {
  if (!pdfjsPromise) {
    pdfjsPromise = import('/vendor/pdf.min.mjs').then((m) => {
      m.GlobalWorkerOptions.workerSrc = '/vendor/pdf.worker.min.mjs';
      return m;
    });
  }
  return pdfjsPromise;
}

/* --------------------------------------------------------- page numbers */

/**
 * Parses "1-3, 7, 15-20" (and "5-" for "until the end") into zero-based
 * indices, preserving the order the user typed — 9,3,5 really means 9,3,5.
 */
export function parseRanges(input, total) {
  const out = [];
  const push = (n) => {
    if (n >= 1 && n <= total) out.push(n - 1);
  };
  String(input || '')
    .split(/[,;\n]/)
    .map((s) => s.trim())
    .filter(Boolean)
    .forEach((part) => {
      const m = part.match(/^(\d+)\s*-\s*(\d*)$/);
      if (m) {
        const a = parseInt(m[1], 10);
        const b = m[2] === '' ? total : parseInt(m[2], 10);
        if (a <= b) for (let i = a; i <= b; i++) push(i);
        else for (let i = a; i >= b; i--) push(i);
      } else if (/^\d+$/.test(part)) {
        push(parseInt(part, 10));
      }
    });
  return out;
}

/* ------------------------------------------------------------- ZIP (store) */

const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();

function crc32(bytes) {
  let c = 0xffffffff;
  for (let i = 0; i < bytes.length; i++) c = crcTable[(c ^ bytes[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

/**
 * Minimal store-only ZIP writer. Entries are already-compressed data
 * (JPEG/PNG) or small XML, so skipping DEFLATE costs almost nothing and
 * keeps this dependency-free.
 */
export function makeZip(entries) {
  const enc = new TextEncoder();
  const chunks = [];
  const central = [];
  let offset = 0;

  const u32 = (n) => new Uint8Array([n & 255, (n >>> 8) & 255, (n >>> 16) & 255, (n >>> 24) & 255]);
  const u16 = (n) => new Uint8Array([n & 255, (n >>> 8) & 255]);

  for (const { name, data } of entries) {
    const nameBytes = enc.encode(name);
    const body = data instanceof Uint8Array ? data : new Uint8Array(data);
    const crc = crc32(body);
    const local = [
      u32(0x04034b50), u16(20), u16(0x0800), u16(0), u16(0), u16(0),
      u32(crc), u32(body.length), u32(body.length), u16(nameBytes.length), u16(0),
      nameBytes, body,
    ];
    local.forEach((c) => chunks.push(c));
    const localSize = local.reduce((s, c) => s + c.length, 0);
    central.push([
      u32(0x02014b50), u16(20), u16(20), u16(0x0800), u16(0), u16(0), u16(0),
      u32(crc), u32(body.length), u32(body.length), u16(nameBytes.length),
      u16(0), u16(0), u16(0), u16(0), u32(0), u32(offset), nameBytes,
    ]);
    offset += localSize;
  }

  const cdStart = offset;
  let cdSize = 0;
  central.forEach((rec) => {
    rec.forEach((c) => chunks.push(c));
    cdSize += rec.reduce((s, c) => s + c.length, 0);
  });
  chunks.push(u32(0x06054b50), u16(0), u16(0), u16(central.length), u16(central.length), u32(cdSize), u32(cdStart), u16(0));

  return new Blob(chunks, { type: 'application/zip' });
}

/* ----------------------------------------------------------- tool shell */

/**
 * Wires the drop zone, the reorderable file list, progress and error
 * reporting for a tool page, then hands the collected files to `run`.
 */
export function createTool({ root, multiple, accept, onRun, onFiles, validate }) {
  const drop = $('[data-drop]', root);
  const input = $('input[type=file]', root);
  const list = $('[data-list]', root);
  const runBtn = $('[data-run]', root);
  const status = $('[data-status]', root);
  const bar = $('[data-bar]', root);
  const barFill = bar ? $('i', bar) : null;
  let files = [];

  const say = (msg, kind = '') => {
    if (!status) return;
    status.textContent = msg;
    status.dataset.kind = kind;
  };
  const progress = (p) => {
    if (!bar) return;
    bar.classList.toggle('on', p >= 0 && p < 1);
    if (barFill) barFill.style.width = Math.round(Math.max(0, Math.min(1, p)) * 100) + '%';
  };

  const ctx = { say, progress, get files() { return files; } };

  function render() {
    if (!list) return;
    list.innerHTML = files
      .map(
        (f, i) => `<li class="fileitem" draggable="true" data-i="${i}">
<span class="grab" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><circle cx="9" cy="6" r="1.4"/><circle cx="15" cy="6" r="1.4"/><circle cx="9" cy="12" r="1.4"/><circle cx="15" cy="12" r="1.4"/><circle cx="9" cy="18" r="1.4"/><circle cx="15" cy="18" r="1.4"/></svg></span>
<span class="fname">${i + 1}. ${f.name.replace(/[<>&]/g, '')}</span>
<span class="fmeta">${fmtBytes(f.size)}</span>
<button class="iconbtn" type="button" data-up="${i}" title="Mover para cima" aria-label="Mover ${f.name} para cima"${i === 0 ? ' disabled' : ''}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 15 6-6 6 6"/></svg></button>
<button class="iconbtn" type="button" data-down="${i}" title="Mover para baixo" aria-label="Mover ${f.name} para baixo"${i === files.length - 1 ? ' disabled' : ''}><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg></button>
<button class="iconbtn" type="button" data-del="${i}" title="Remover" aria-label="Remover ${f.name}"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>
</li>`
      )
      .join('');
    if (runBtn) runBtn.disabled = files.length === 0;
    if (onFiles) onFiles(files, ctx);
  }

  function add(newFiles) {
    const arr = Array.from(newFiles).filter((f) => f && f.size > 0);
    if (!arr.length) return;
    files = multiple ? files.concat(arr) : [arr[0]];
    if (validate) {
      const err = validate(files);
      if (err) {
        files = [];
        say(err, 'err');
        render();
        return;
      }
    }
    say('');
    render();
  }

  if (drop) {
    drop.addEventListener('click', () => input && input.click());
    drop.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        input && input.click();
      }
    });
    ['dragenter', 'dragover'].forEach((ev) =>
      drop.addEventListener(ev, (e) => {
        e.preventDefault();
        drop.classList.add('over');
      })
    );
    ['dragleave', 'drop'].forEach((ev) =>
      drop.addEventListener(ev, (e) => {
        e.preventDefault();
        drop.classList.remove('over');
      })
    );
    drop.addEventListener('drop', (e) => e.dataTransfer && add(e.dataTransfer.files));
  }
  if (input) {
    input.addEventListener('change', () => {
      add(input.files);
      input.value = '';
    });
  }

  if (list) {
    list.addEventListener('click', (e) => {
      const b = e.target.closest('button');
      if (!b) return;
      const move = (from, to) => {
        if (to < 0 || to >= files.length) return;
        files.splice(to, 0, files.splice(from, 1)[0]);
        render();
      };
      if (b.dataset.up !== undefined) move(+b.dataset.up, +b.dataset.up - 1);
      else if (b.dataset.down !== undefined) move(+b.dataset.down, +b.dataset.down + 1);
      else if (b.dataset.del !== undefined) {
        files.splice(+b.dataset.del, 1);
        render();
      }
    });

    let dragIdx = null;
    list.addEventListener('dragstart', (e) => {
      const li = e.target.closest('.fileitem');
      if (!li) return;
      dragIdx = +li.dataset.i;
      li.classList.add('dragging');
      e.dataTransfer.effectAllowed = 'move';
    });
    list.addEventListener('dragend', (e) => {
      const li = e.target.closest('.fileitem');
      if (li) li.classList.remove('dragging');
      dragIdx = null;
    });
    list.addEventListener('dragover', (e) => e.preventDefault());
    list.addEventListener('drop', (e) => {
      e.preventDefault();
      const li = e.target.closest('.fileitem');
      if (!li || dragIdx === null) return;
      const to = +li.dataset.i;
      if (to === dragIdx) return;
      files.splice(to, 0, files.splice(dragIdx, 1)[0]);
      render();
    });
  }

  if (runBtn) {
    runBtn.disabled = true;
    runBtn.addEventListener('click', async () => {
      if (!files.length) return;
      const label = runBtn.textContent;
      runBtn.disabled = true;
      runBtn.textContent = 'Processando…';
      say('');
      progress(0.02);
      try {
        await onRun(files, ctx);
      } catch (err) {
        console.error(err);
        say(err && err.message ? err.message : 'Não foi possível processar este arquivo.', 'err');
      } finally {
        progress(-1);
        runBtn.disabled = files.length === 0;
        runBtn.textContent = label;
      }
    });
  }

  return ctx;
}

/** Friendlier errors for the two failures people actually hit. */
export async function readPdf(PDFLib, file, opts = {}) {
  const bytes = new Uint8Array(await file.arrayBuffer());
  try {
    return await PDFLib.PDFDocument.load(bytes, { ignoreEncryption: true, ...opts });
  } catch (err) {
    const msg = String((err && err.message) || '');
    if (/encrypt|password/i.test(msg)) {
      throw new Error(`“${file.name}” está protegido por senha. Remova a proteção antes de continuar.`);
    }
    throw new Error(`“${file.name}” não parece ser um PDF válido ou está corrompido.`);
  }
}
