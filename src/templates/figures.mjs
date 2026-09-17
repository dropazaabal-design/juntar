/**
 * Inline SVG figures for the articles.
 *
 * Each one exists to show a mechanism the prose would need a paragraph to
 * assemble — where the weight in a PDF actually sits, what a signature binds
 * itself to, why a converted layout drifts. Structure is drawn in
 * `currentColor` so it themes with the page; a single accent hue marks the
 * element the surrounding text is arguing about.
 */
import { esc } from './layout.mjs';

const ACCENT = 'var(--accent)';
const MUTED = 'var(--muted-2)';

const fig = (w, h, aria, caption, body) => `<figure class="fig">
<svg viewBox="0 0 ${w} ${h}" role="img" aria-label="${esc(aria)}" xmlns="http://www.w3.org/2000/svg">
<defs>
<marker id="ar" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
<path d="M0 0 10 5 0 10z" fill="currentColor"/>
</marker>
<marker id="ar-a" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
<path d="M0 0 10 5 0 10z" fill="${ACCENT}"/>
</marker>
</defs>
${body}
</svg>
<figcaption>${caption}</figcaption>
</figure>`;

const box = (x, y, w, h, label, opts = {}) => `
<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="7" fill="none"
 stroke="${opts.accent ? ACCENT : 'currentColor'}" stroke-width="${opts.accent ? 1.8 : 1.2}"
 ${opts.dash ? 'stroke-dasharray="4 3"' : ''} opacity="${opts.faint ? 0.45 : 1}"/>
<text x="${x + w / 2}" y="${y + h / 2 + 4}" text-anchor="middle" font-size="12"
 fill="${opts.accent ? ACCENT : 'currentColor'}" font-weight="${opts.accent ? 700 : 500}">${label}</text>`;

const arrow = (x1, y1, x2, y2, label, opts = {}) => `
<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${opts.accent ? ACCENT : 'currentColor'}"
 stroke-width="1.4" marker-end="url(#${opts.accent ? 'ar-a' : 'ar'})" ${opts.dash ? 'stroke-dasharray="4 3"' : ''}/>
${label
  ? x1 === x2
    // vertical: sit the label beside the line, not across it
    ? `<text x="${x1 + 9}" y="${(y1 + y2) / 2 + 3}" text-anchor="start" font-size="11" fill="${MUTED}">${label}</text>`
    : `<text x="${(x1 + x2) / 2}" y="${y1 - 8}" text-anchor="middle" font-size="11" fill="${MUTED}">${label}</text>`
  : ''}`;

const caption = (x, y, text, anchor = 'middle') =>
  `<text x="${x}" y="${y}" text-anchor="${anchor}" font-size="11" fill="${MUTED}">${text}</text>`;

/* ---------------------------------------------------------------------- */

/** Why a scanned PDF shrinks 90% and a text PDF barely moves. */
export const figWeight = () => {
  const bar = (y, label, parts) => {
    let x = 132;
    const seg = parts
      .map((p) => {
        const w = p.pct * 3.9;
        const r = `<rect x="${x}" y="${y}" width="${w}" height="30" fill="${p.accent ? ACCENT : 'currentColor'}"
        opacity="${p.accent ? 0.9 : 0.16}" stroke="currentColor" stroke-width="0.6"/>
        ${p.pct > 12 ? `<text x="${x + w / 2}" y="${y + 20}" text-anchor="middle" font-size="11" fill="${p.accent ? '#fff' : 'currentColor'}" font-weight="600">${p.pct}%</text>` : ''}`;
        x += w;
        return r;
      })
      .join('');
    return `<text x="122" y="${y + 20}" text-anchor="end" font-size="12" fill="currentColor" font-weight="600">${label}</text>${seg}`;
  };
  return fig(
    620, 190,
    'Comparação da composição de um PDF digitalizado e de um PDF de texto: no digitalizado as imagens ocupam 94% do arquivo, no de texto apenas 6%.',
    'Comprimir um PDF age quase só sobre as imagens (em vermelho). Por isso um documento digitalizado encolhe muito e um PDF gerado pelo Word quase não muda.',
    `${caption(376, 22, 'Do que é feito o peso do arquivo')}
${bar(40, 'Digitalizado', [{ pct: 94, accent: true }, { pct: 4 }, { pct: 2 }])}
${bar(92, 'Só texto', [{ pct: 6, accent: true }, { pct: 62 }, { pct: 32 }])}
<rect x="132" y="140" width="14" height="12" fill="${ACCENT}" opacity="0.9"/>
${caption(152, 150, 'imagens das páginas', 'start')}
<rect x="290" y="140" width="14" height="12" fill="currentColor" opacity="0.16" stroke="currentColor" stroke-width="0.6"/>
${caption(310, 150, 'texto e vetores', 'start')}
<rect x="420" y="140" width="14" height="12" fill="currentColor" opacity="0.16" stroke="currentColor" stroke-width="0.6"/>
${caption(440, 150, 'fontes e metadados', 'start')}
${caption(376, 175, 'Proporção típica — varia conforme o documento')}`
  );
};

/** The Ctrl+F test: a scanned page has no text to find. */
export const figTextLayer = () => {
  const page = (x, title, inner, note) => `
${box(x, 46, 190, 150, '')}
<text x="${x + 95}" y="36" text-anchor="middle" font-size="12" fill="currentColor" font-weight="700">${title}</text>
${inner}
${caption(x + 95, 216, note)}`;

  const pixels = Array.from({ length: 7 }, (_, r) =>
    Array.from({ length: 13 }, (_, c) =>
      (r * 13 + c * 5) % 7 < 3
        ? `<rect x="${72 + c * 11}" y="${72 + r * 11}" width="9" height="9" fill="currentColor" opacity="0.3"/>`
        : ''
    ).join('')
  ).join('');

  const glyphs = Array.from({ length: 5 }, (_, r) =>
    `<rect x="312" y="${74 + r * 22}" width="${[150, 128, 146, 96, 138][r]}" height="9" rx="2" fill="currentColor" opacity="0.28"/>`
  ).join('');

  return fig(
    620, 240,
    'Um PDF digitalizado guarda apenas pixels; um PDF de texto guarda caracteres pesquisáveis.',
    'O teste leva um segundo: se você não consegue selecionar uma palavra com o mouse, o arquivo é uma imagem — e nenhuma ferramenta de extração vai encontrar texto que não existe.',
    `${page(62, 'PDF digitalizado', pixels, 'pixels — o Ctrl+F não encontra nada')}
${page(302, 'PDF com texto', glyphs + `<rect x="312" y="118" width="146" height="9" rx="2" fill="${ACCENT}" opacity="0.95"/>`, 'caracteres — dá para selecionar e buscar')}`
  );
};

/** What each class of signature is actually bound to. */
export const figSignature = () => {
  const col = (x, title, sub, inner, proof, strong) => `
<text x="${x + 85}" y="26" text-anchor="middle" font-size="12.5" font-weight="700" fill="${strong ? ACCENT : 'currentColor'}">${title}</text>
${caption(x + 85, 42, sub)}
${box(x, 56, 170, 104, '', { accent: strong })}
${inner}
${caption(x + 85, 182, proof)}`;

  const doc = (x) => `<rect x="${x + 18}" y="72" width="60" height="74" rx="4" fill="none" stroke="currentColor" stroke-width="1.1"/>
${[0, 1, 2, 3].map((i) => `<rect x="${x + 26}" y="${82 + i * 13}" width="${[44, 36, 42, 28][i]}" height="5" rx="1.5" fill="currentColor" opacity="0.28"/>`).join('')}`;

  return fig(
    620, 210,
    'Comparação entre assinatura eletrónica simples, avançada e qualificada, e o que cada uma consegue provar.',
    'A imagem da assinatura fica sobre a página; o certificado prende-se ao conteúdo. Só o segundo detecta se alguém alterou o documento depois.',
    `${col(20, 'Simples', 'imagem desenhada', `${doc(20)}
<path d="M106 112c8-14 14 12 22-2s12 8 18 0" fill="none" stroke="${ACCENT}" stroke-width="2" stroke-linecap="round"/>
${caption(128, 136, 'sobre a página')}`, 'prova: acordo entre as partes', false)}
${col(225, 'Avançada', 'certificado vinculado', `${doc(225)}
<rect x="311" y="88" width="66" height="42" rx="5" fill="none" stroke="currentColor" stroke-width="1.2"/>
${caption(344, 106, 'hash do')}${caption(344, 119, 'documento')}
${arrow(303, 109, 309, 109, '')}`, 'prova: autoria + integridade', false)}
${col(430, 'Qualificada', 'ICP-Brasil / Gov.br', `${doc(430)}
<rect x="516" y="76" width="66" height="32" rx="5" fill="none" stroke="${ACCENT}" stroke-width="1.6"/>
${caption(549, 96, 'certificado')}
<rect x="516" y="118" width="66" height="30" rx="5" fill="none" stroke="${ACCENT}" stroke-width="1.6"/>
${caption(549, 137, 'autoridade')}
${arrow(508, 92, 514, 92, '', { accent: true })}
${arrow(549, 108, 549, 116, '', { accent: true })}`, 'prova: valor legal pleno', true)}`
  );
};

/** Why a converted layout drifts: two different storage models. */
export const figPdfVsDocx = () => {
  const glyph = (x, y, ch) => `<text x="${x}" y="${y}" font-size="13" fill="currentColor">${ch}</text>`;
  return fig(
    620, 226,
    'O PDF guarda cada caractere numa coordenada fixa; o DOCX guarda parágrafos que fluem. A conversão precisa adivinhar onde um termina.',
    'Nenhum conversor lê parágrafos de um PDF — eles não estão lá. Ele recebe caracteres com coordenadas e precisa deduzir onde uma linha acaba e um parágrafo começa.',
    `<text x="140" y="26" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">PDF — posições fixas</text>
${box(40, 40, 200, 130, '')}
${[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => glyph(60 + c * 42, 72 + r * 34, ['Con', 'tra', 'to', 'de'][c])).join('')).join('')}
${[0, 1, 2].map((r) => [0, 1, 2, 3].map((c) => caption(70 + c * 42, 86 + r * 34, `x${60 + c * 42}`)).join('')).join('')}
${caption(140, 190, 'cada glifo tem x, y — não há parágrafo')}

${arrow(258, 105, 352, 105, 'reconstrução por inferência', { accent: true })}

<text x="480" y="26" text-anchor="middle" font-size="12.5" font-weight="700" fill="${ACCENT}">DOCX — fluxo</text>
${box(380, 40, 200, 130, '', { accent: true })}
${[0, 1, 2, 3].map((i) => `<rect x="398" y="${62 + i * 22}" width="${[164, 148, 120, 88][i]}" height="8" rx="2" fill="currentColor" opacity="0.26"/>`).join('')}
<path d="M398 152h164" stroke="${ACCENT}" stroke-width="1.6" stroke-dasharray="4 3"/>
${caption(480, 190, 'parágrafos que reflowam ao editar')}`
  );
};

/** The order of operations when a file is too big to send. */
export const figTooBig = () => {
  const node = (x, y, w, label, accent) => box(x, y, w, 38, label, { accent });
  return fig(
    620, 268,
    'Fluxo de decisão para enviar um arquivo grande: comprimir, depois dividir, e só então recorrer a um link.',
    'A ordem importa. Comprimir primeiro resolve a maioria dos casos sem quebrar o documento em partes.',
    `${node(215, 14, 190, 'Arquivo acima do limite', true)}
${arrow(310, 52, 310, 76, '')}
${node(215, 76, 190, 'Comprimir o PDF')}
${arrow(310, 114, 310, 138, 'ainda grande?')}
${node(215, 152, 190, 'Dividir em partes')}
${arrow(405, 95, 500, 95, 'coube')}
${node(500, 76, 104, 'Enviar', true)}
${arrow(405, 171, 500, 171, 'coube')}
${node(500, 152, 104, 'Enviar', true)}
${arrow(310, 190, 310, 214, 'não coube')}
${node(180, 214, 260, 'Link (Drive, WeTransfer)')}
${caption(310, 136, '')}`
  );
};

/** Camera geometry: why the phone has to be flat. */
export const figScan = () => fig(
  620, 200,
  'Fotografar o documento de cima produz uma página retangular; fotografar de lado produz distorção em trapézio.',
  'A câmara inclinada deforma a página num trapézio — e nenhum ajuste posterior devolve o que ficou fora de foco na borda distante.',
  `<text x="160" y="24" text-anchor="middle" font-size="12.5" font-weight="700" fill="${ACCENT}">De cima — correto</text>
<rect x="100" y="44" width="120" height="96" rx="3" fill="none" stroke="${ACCENT}" stroke-width="1.8"/>
${[0, 1, 2, 3].map((i) => `<rect x="112" y="${58 + i * 20}" width="${[96, 82, 90, 56][i]}" height="6" rx="2" fill="currentColor" opacity="0.26"/>`).join('')}
<path d="M160 168v-14" stroke="currentColor" stroke-width="1.3" marker-end="url(#ar)"/>
${caption(160, 184, 'câmara perpendicular à folha')}

<text x="460" y="24" text-anchor="middle" font-size="12.5" font-weight="700" fill="currentColor">Inclinado — deformado</text>
<path d="M412 48 528 62 512 138 400 128z" fill="none" stroke="currentColor" stroke-width="1.5"/>
${[0, 1, 2, 3].map((i) => `<path d="M${410 + i * 2} ${64 + i * 19}L${520 - i * 3} ${76 + i * 18}" stroke="currentColor" stroke-width="5" opacity="0.2" stroke-linecap="round"/>`).join('')}
<path d="M470 168 448 150" stroke="currentColor" stroke-width="1.3" marker-end="url(#ar)"/>
${caption(470, 184, 'bordas em trapézio, texto fora de foco')}`
);

export const figures = {
  weight: figWeight,
  textLayer: figTextLayer,
  signature: figSignature,
  pdfVsDocx: figPdfVsDocx,
  tooBig: figTooBig,
  scan: figScan,
};
