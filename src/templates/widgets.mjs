import { icon } from './icons.mjs';
import { esc } from './layout.mjs';

/**
 * Labels for the four shipped-in-3-languages engines (split, compress,
 * img2pdf, pdf2img) plus the widget chrome (noscript notice, fallback drop
 * text). Every other engine is Portuguese-only — its tool never ships under
 * /en/ or /es/, so it keeps writing plain strings as before.
 */
const W = {
  pt: {
    chooseFiles: 'Escolher arquivos', dropDefault: 'Arraste os arquivos aqui', dropHintDefault: 'ou toque para escolher', processDefault: 'Processar',
    noscript: 'Esta ferramenta precisa de JavaScript. Ative-o no navegador — nenhum arquivo é enviado para servidores; o processamento acontece no seu aparelho.',
    splitMode: 'Modo de divisão', splitRanges: 'Intervalo', splitEach: 'Cada página', splitEvery: 'A cada N',
    splitPagesLabel: 'Páginas (modo intervalo)', splitPagesHint: 'Use vírgula e hífen. <code>5-</code> vai da 5 até o fim.',
    splitEveryLabel: 'Blocos de quantas páginas', splitEveryHint: 'Usado no modo “a cada N páginas”.',
    compLevel: 'Nível de compressão', compLight: 'Leve', compRec: 'Recomendado', compMax: 'Máximo',
    compHint: 'O nível máximo gera o menor arquivo; o leve preserva mais qualidade de impressão.',
    pageSize: 'Tamanho da folha', sizeA4: 'A4 (210 × 297 mm)', sizeLetter: 'Carta (Letter)', sizeFit: 'Igual à imagem',
    orientation: 'Orientação', orientAuto: 'Automática', orientPortrait: 'Retrato', orientLandscape: 'Paisagem',
    margin: 'Margem (pt)', marginHint: '0 = imagem ocupando a folha inteira.',
    resolution: 'Resolução', dpi72: '72 DPI — tela', dpi150: '150 DPI — padrão', dpi300: '300 DPI — impressão',
  },
  en: {
    chooseFiles: 'Choose files', dropDefault: 'Drop your files here', dropHintDefault: 'or tap to choose', processDefault: 'Process',
    noscript: 'This tool needs JavaScript. Enable it in your browser — no file is sent to any server; processing happens on your own device.',
    splitMode: 'Split mode', splitRanges: 'Range', splitEach: 'Each page', splitEvery: 'Every N',
    splitPagesLabel: 'Pages (range mode)', splitPagesHint: 'Use commas and dashes. <code>5-</code> goes from 5 to the end.',
    splitEveryLabel: 'Pages per block', splitEveryHint: 'Used in “every N pages” mode.',
    compLevel: 'Compression level', compLight: 'Light', compRec: 'Recommended', compMax: 'Maximum',
    compHint: 'Maximum gives the smallest file; light keeps more print quality.',
    pageSize: 'Page size', sizeA4: 'A4 (210 × 297 mm)', sizeLetter: 'Letter', sizeFit: 'Same as image',
    orientation: 'Orientation', orientAuto: 'Automatic', orientPortrait: 'Portrait', orientLandscape: 'Landscape',
    margin: 'Margin (pt)', marginHint: '0 = image fills the whole page.',
    resolution: 'Resolution', dpi72: '72 DPI — screen', dpi150: '150 DPI — default', dpi300: '300 DPI — print',
  },
  es: {
    chooseFiles: 'Elegir archivos', dropDefault: 'Arrastra tus archivos aquí', dropHintDefault: 'o toca para elegir', processDefault: 'Procesar',
    noscript: 'Esta herramienta necesita JavaScript. Actívalo en tu navegador — ningún archivo se envía a servidores; el procesamiento ocurre en tu dispositivo.',
    splitMode: 'Modo de división', splitRanges: 'Rango', splitEach: 'Cada página', splitEvery: 'Cada N',
    splitPagesLabel: 'Páginas (modo rango)', splitPagesHint: 'Usa coma y guión. <code>5-</code> va de la 5 al final.',
    splitEveryLabel: 'Bloques de cuántas páginas', splitEveryHint: 'Se usa en el modo “cada N páginas”.',
    compLevel: 'Nivel de compresión', compLight: 'Ligero', compRec: 'Recomendado', compMax: 'Máximo',
    compHint: 'El nivel máximo genera el archivo más pequeño; el ligero conserva más calidad de impresión.',
    pageSize: 'Tamaño de página', sizeA4: 'A4 (210 × 297 mm)', sizeLetter: 'Carta', sizeFit: 'Igual a la imagen',
    orientation: 'Orientación', orientAuto: 'Automática', orientPortrait: 'Vertical', orientLandscape: 'Horizontal',
    margin: 'Margen (pt)', marginHint: '0 = la imagen ocupa toda la página.',
    resolution: 'Resolución', dpi72: '72 DPI — pantalla', dpi150: '150 DPI — por defecto', dpi300: '300 DPI — impresión',
  },
};

const seg = (name, items, checked) =>
  `<div class="seg" role="radiogroup">${items
    .map(
      (it, i) =>
        `<input type="radio" name="${name}" id="${name}-${i}" value="${it.v}"${it.v === checked ? ' checked' : ''}><label for="${name}-${i}">${it.l}</label>`
    )
    .join('')}</div>`;

const field = (label, inner, hint) =>
  `<div class="opt"><label>${label}</label>${inner}${hint ? `<span class="hint">${hint}</span>` : ''}</div>`;

const pagesField = (label, hint, placeholder = 'Ex.: 1-3, 7, 10-12') =>
  field(label, `<input type="text" name="pages" inputmode="numeric" placeholder="${placeholder}" autocomplete="off">`, hint);

/** Per-engine option controls rendered inside the tool card. */
const OPTIONS = {
  merge: () => '',

  split: (locale = 'pt') => { const t = W[locale] || W.pt; return `<div class="opts">
${field(t.splitMode, seg('mode', [{ v: 'ranges', l: t.splitRanges }, { v: 'each', l: t.splitEach }, { v: 'every', l: t.splitEvery }], 'ranges'))}
${pagesField(t.splitPagesLabel, t.splitPagesHint)}
${field(t.splitEveryLabel, '<input type="number" name="every" min="1" max="500" value="10">', t.splitEveryHint)}
</div>`; },

  compress: (locale = 'pt') => { const t = W[locale] || W.pt; return `<div class="opts">
${field(t.compLevel, seg('level', [{ v: 'light', l: t.compLight }, { v: 'rec', l: t.compRec }, { v: 'max', l: t.compMax }], 'rec'), t.compHint)}
</div>`; },

  rotate: () => `<div class="opts">
${field('Ângulo', seg('angle', [{ v: '90', l: '90° direita' }, { v: '270', l: '90° esquerda' }, { v: '180', l: '180°' }], '90'))}
${field('Aplicar em', seg('scope', [{ v: 'all', l: 'Todas' }, { v: 'odd', l: 'Ímpares' }, { v: 'even', l: 'Pares' }, { v: 'range', l: 'Intervalo' }], 'all'))}
${pagesField('Páginas (modo intervalo)', 'Preencha apenas se escolheu “intervalo”.')}
</div>`,

  organize: () => `<div data-organize-actions hidden style="margin-top:16px;display:flex;gap:8px;flex-wrap:wrap">
<button class="btn btn-ghost btn-sm" type="button" data-bulk="reverse">Inverter ordem</button>
<button class="btn btn-ghost btn-sm" type="button" data-bulk="reset">Restaurar original</button>
</div>
<div class="thumbs" data-thumbs></div>`,

  removepages: () => `<div class="opts">
${pagesField('Páginas a remover', 'As demais permanecem intactas.', 'Ex.: 2, 5, 9-11')}
</div>`,

  extractpages: () => `<div class="opts">
${pagesField('Páginas a manter', 'A ordem digitada é a ordem do arquivo final.', 'Ex.: 1-3, 8')}
</div>`,

  pagenumbers: () => `<div class="opts">
${field('Posição', `<select name="position">
<option value="bottom-center">Rodapé — centro</option>
<option value="bottom-right">Rodapé — direita</option>
<option value="bottom-left">Rodapé — esquerda</option>
<option value="top-right">Cabeçalho — direita</option>
<option value="top-center">Cabeçalho — centro</option>
<option value="top-left">Cabeçalho — esquerda</option>
</select>`)}
${field('Formato', `<select name="format">
<option value="n">1, 2, 3…</option>
<option value="total">1 de 20</option>
<option value="dash">- 1 -</option>
<option value="prefix">Prefixo + número</option>
</select>`)}
${field('Prefixo', '<input type="text" name="prefix" value="Fls. " maxlength="24">', 'Usado no formato “prefixo + número”.')}
${field('Começar na página', '<input type="number" name="startPage" min="1" value="1">', 'Páginas anteriores ficam sem número.')}
${field('Primeiro número', '<input type="number" name="startNum" min="0" value="1">')}
${field('Tamanho da fonte', '<input type="number" name="size" min="6" max="36" value="11">')}
${field('Margem (pt)', '<input type="number" name="margin" min="8" max="90" value="28">')}
</div>`,

  watermark: () => `<div class="opts">
${field('Texto da marca d’água', '<input type="text" name="text" value="CONFIDENCIAL" maxlength="60">')}
${field('Transparência (%)', '<input type="number" name="opacity" min="3" max="100" value="18">', 'Entre 10% e 25% costuma ficar legível sem atrapalhar.')}
${field('Ângulo', seg('angle', [{ v: '45', l: 'Diagonal' }, { v: '0', l: 'Horizontal' }], '45'))}
${field('Tamanho', '<input type="number" name="size" min="8" max="200" value="54">')}
${field('Cor', `<select name="color"><option value="gray">Cinza</option><option value="red">Vermelho</option><option value="blue">Azul</option></select>`)}
${field('Repetir em mosaico', '<label style="display:flex;gap:8px;align-items:center;font-weight:600;color:var(--ink)"><input type="checkbox" name="tile" style="width:18px;height:18px;min-height:0"> Preencher a página inteira</label>')}
</div>`,

  sign: () => `<div data-sign-stage hidden style="margin-top:18px">
<div class="opts" style="grid-template-columns:1fr">
<div class="opt">
<label>1. Desenhe sua assinatura</label>
<canvas data-pad style="width:100%;height:170px;border:1px dashed var(--line);border-radius:10px;background:#fff;touch-action:none;cursor:crosshair"></canvas>
<div style="display:flex;gap:8px;margin-top:8px;align-items:center;flex-wrap:wrap">
<button class="btn btn-ghost btn-sm" type="button" data-pad-clear>Limpar</button>
<span class="hint" style="margin:0">Use o dedo, a caneta ou o mouse.</span>
</div>
</div>
</div>
<div class="opts">
${field('2. Página', '<select data-page-select name="page"></select>')}
${field('3. Tamanho da assinatura (% da largura)', '<input type="number" name="sigSize" min="8" max="70" value="28">')}
</div>
<p class="hint" style="margin:14px 0 8px">4. Toque na pré-visualização abaixo para escolher onde a assinatura vai ficar.</p>
<div style="position:relative;display:inline-block;max-width:100%;border:1px solid var(--line);border-radius:10px;overflow:hidden">
<canvas data-preview style="max-width:100%;cursor:crosshair;display:block"></canvas>
<img data-marker hidden alt="" style="position:absolute;transform:translate(-50%,-50%);pointer-events:none">
</div>
</div>`,

  img2pdf: (locale = 'pt') => { const t = W[locale] || W.pt; return `<div class="opts">
${field(t.pageSize, `<select name="pageSize"><option value="a4">${t.sizeA4}</option><option value="letter">${t.sizeLetter}</option><option value="fit">${t.sizeFit}</option></select>`)}
${field(t.orientation, `<select name="orientation"><option value="auto">${t.orientAuto}</option><option value="portrait">${t.orientPortrait}</option><option value="landscape">${t.orientLandscape}</option></select>`)}
${field(t.margin, '<input type="number" name="margin" min="0" max="120" value="0">', t.marginHint)}
</div>`; },

  pdf2img: (locale = 'pt') => { const t = W[locale] || W.pt; return `<div class="opts">
${field(t.resolution, seg('dpi', [{ v: '72', l: t.dpi72 }, { v: '150', l: t.dpi150 }, { v: '300', l: t.dpi300 }], '150'))}
</div>`; },

  pdf2txt: () => `<div data-output-wrap hidden style="margin-top:18px">
<div class="opt"><label>Texto extraído</label>
<textarea data-output rows="12" readonly style="width:100%;font:inherit;font-size:.88rem;line-height:1.55;padding:12px;border:1px solid var(--line);border-radius:10px;background:var(--surface);color:var(--ink);resize:vertical"></textarea>
</div></div>`,

  pdf2docx: () => '',
  docx2pdf: () => '',
};

/** The interactive card at the top of every tool page. `locale` only
 *  matters for the four engines whose OPTIONS block takes it (split,
 *  compress, img2pdf, pdf2img); every other engine ignores the extra arg. */
export function toolWidget(tool, locale = 'pt') {
  const ui = tool.ui || {};
  const t = W[locale] || W.pt;
  const id = `f-${tool.slug || 'home'}`;
  const opts = (OPTIONS[tool.engine] || (() => ''))(locale);
  const isPng = tool.slug === 'pdf-para-png';
  return `<div class="tool">
<div class="tool-card" data-tool="${tool.engine}"${ui.multiple ? ' data-multiple="1"' : ''}${isPng ? ' data-format="png"' : ''}>
<div class="drop" data-drop tabindex="0" role="button" aria-label="${esc(ui.dropTitle || t.chooseFiles)}">
<span class="drop-icon">${icon('upload', 46)}</span>
<span class="drop-h">${esc(ui.dropTitle || t.dropDefault)}</span>
<p>${esc(ui.dropHint || t.dropHintDefault)}</p>
<input type="file" id="${id}" accept="${esc(ui.accept || '')}"${ui.multiple ? ' multiple' : ''}>
</div>
<ul class="filelist" data-list></ul>
${opts}
<div class="bar" data-bar aria-hidden="true"><i></i></div>
<p class="status" data-status role="status" aria-live="polite"></p>
<div class="tool-actions">
<button class="btn btn-primary grow" type="button" data-run disabled>${esc(ui.cta || t.processDefault)}</button>
</div>
<noscript><p class="noscript-warn" style="margin-top:14px">${t.noscript}</p></noscript>
</div>
</div>`;
}

export { OPTIONS };
