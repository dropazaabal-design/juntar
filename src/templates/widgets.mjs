import { icon } from './icons.mjs';
import { esc } from './layout.mjs';

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

  split: () => `<div class="opts">
${field('Modo de divisão', seg('mode', [{ v: 'ranges', l: 'Intervalo' }, { v: 'each', l: 'Cada página' }, { v: 'every', l: 'A cada N' }], 'ranges'))}
${pagesField('Páginas (modo intervalo)', 'Use vírgula e hífen. <code>5-</code> vai da 5 até o fim.')}
${field('Blocos de quantas páginas', '<input type="number" name="every" min="1" max="500" value="10">', 'Usado no modo “a cada N páginas”.')}
</div>`,

  compress: () => `<div class="opts">
${field('Nível de compressão', seg('level', [{ v: 'light', l: 'Leve' }, { v: 'rec', l: 'Recomendado' }, { v: 'max', l: 'Máximo' }], 'rec'), 'O nível máximo gera o menor arquivo; o leve preserva mais qualidade de impressão.')}
</div>`,

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

  img2pdf: () => `<div class="opts">
${field('Tamanho da folha', `<select name="pageSize"><option value="a4">A4 (210 × 297 mm)</option><option value="letter">Carta (Letter)</option><option value="fit">Igual à imagem</option></select>`)}
${field('Orientação', `<select name="orientation"><option value="auto">Automática</option><option value="portrait">Retrato</option><option value="landscape">Paisagem</option></select>`)}
${field('Margem (pt)', '<input type="number" name="margin" min="0" max="120" value="0">', '0 = imagem ocupando a folha inteira.')}
</div>`,

  pdf2img: () => `<div class="opts">
${field('Resolução', seg('dpi', [{ v: '72', l: '72 DPI — tela' }, { v: '150', l: '150 DPI — padrão' }, { v: '300', l: '300 DPI — impressão' }], '150'))}
</div>`,

  pdf2txt: () => `<div data-output-wrap hidden style="margin-top:18px">
<div class="opt"><label>Texto extraído</label>
<textarea data-output rows="12" readonly style="width:100%;font:inherit;font-size:.88rem;line-height:1.55;padding:12px;border:1px solid var(--line);border-radius:10px;background:var(--surface);color:var(--ink);resize:vertical"></textarea>
</div></div>`,

  pdf2docx: () => '',
  docx2pdf: () => '',
};

/** The interactive card at the top of every tool page. */
export function toolWidget(tool) {
  const ui = tool.ui || {};
  const id = `f-${tool.slug || 'home'}`;
  const opts = (OPTIONS[tool.engine] || (() => ''))(tool);
  const isPng = tool.slug === 'pdf-para-png';
  return `<div class="tool">
<div class="tool-card" data-tool="${tool.engine}"${ui.multiple ? ' data-multiple="1"' : ''}${isPng ? ' data-format="png"' : ''}>
<div class="drop" data-drop tabindex="0" role="button" aria-label="${esc(ui.dropTitle || 'Escolher arquivos')}">
<span class="drop-icon">${icon('upload', 46)}</span>
<span class="drop-h">${esc(ui.dropTitle || 'Arraste os arquivos aqui')}</span>
<p>${esc(ui.dropHint || 'ou toque para escolher')}</p>
<input type="file" id="${id}" accept="${esc(ui.accept || '')}"${ui.multiple ? ' multiple' : ''}>
</div>
<ul class="filelist" data-list></ul>
${opts}
<div class="bar" data-bar aria-hidden="true"><i></i></div>
<p class="status" data-status role="status" aria-live="polite"></p>
<div class="tool-actions">
<button class="btn btn-primary grow" type="button" data-run disabled>${esc(ui.cta || 'Processar')}</button>
</div>
<noscript><p class="noscript-warn" style="margin-top:14px">Esta ferramenta precisa de JavaScript. Ative-o no navegador — nenhum arquivo é enviado para servidores; o processamento acontece no seu aparelho.</p></noscript>
</div>
</div>`;
}

export { OPTIONS };
