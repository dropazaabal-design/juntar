import { site, categories } from '../data/site.mjs';
import { tools, upcomingTools, toolUrl, bySlug } from '../data/tools.mjs';
import { icon } from './icons.mjs';
import { esc } from './layout.mjs';
import { toolWidget } from './widgets.mjs';

/* ------------------------------------------------------------ fragments */

export const faqSection = (faq, title = 'Perguntas frequentes') => {
  if (!faq?.length) return '';
  return `<section class="sec sec-alt" id="perguntas">
<div class="wrap">
<div class="sec-head"><span class="kicker">Dúvidas</span><h2>${title}</h2></div>
<div class="faq">${faq
    .map(
      (f) => `<details><summary>${esc(f.q)}</summary><div class="ans"><p>${f.a}</p></div></details>`
    )
    .join('')}</div>
</div>
</section>`;
};

export const howtoSection = (howto) => {
  if (!howto) return '';
  return `<section class="sec" id="como-fazer">
<div class="wrap">
<div class="sec-head"><span class="kicker">Passo a passo</span><h2>${esc(howto.name)}</h2><p>${esc(howto.description)}</p></div>
<div class="steps">${howto.steps
    .map(
      (s, i) => `<div class="step" id="passo-${i + 1}"><h3>${esc(s.name)}</h3><p>${esc(s.text)}</p></div>`
    )
    .join('')}</div>
</div>
</section>`;
};

export const privacySection = () => `<section class="sec sec-alt" id="privacidade">
<div class="wrap">
<div class="sec-head"><span class="kicker">A diferença que importa</span><h2>Seus documentos não saem do seu aparelho</h2><p>A maioria dos sites de PDF processa o arquivo em um servidor. O nosso não precisa.</p></div>
<div class="split2">
<div class="vs bad"><h3>${icon('x')} Sites que processam no servidor</h3><ul>
<li>${icon('x')} <span>O arquivo é enviado pela internet para uma máquina de terceiros.</span></li>
<li>${icon('x')} <span>Você depende da promessa de que ele será apagado depois.</span></li>
<li>${icon('x')} <span>Upload e download somam minutos em arquivos grandes.</span></li>
<li>${icon('x')} <span>Limite de tamanho e de usos por dia no plano gratuito.</span></li>
<li>${icon('x')} <span>Sem internet, nada funciona.</span></li>
</ul></div>
<div class="vs good"><h3>${icon('check')} Com o ${site.name}</h3><ul>
<li>${icon('check')} <span>O arquivo é lido direto do disco pelo navegador e nunca é transmitido.</span></li>
<li>${icon('check')} <span>Não existe cópia em servidor nenhum — nem por um segundo.</span></li>
<li>${icon('check')} <span>Sem espera de upload: o resultado sai quase instantaneamente.</span></li>
<li>${icon('check')} <span>Sem limite artificial de tamanho, de usos ou de cadastro.</span></li>
<li>${icon('check')} <span>Funciona offline depois da primeira visita.</span></li>
</ul></div>
</div>
<p class="center" style="margin:26px auto 0;max-width:640px;color:var(--muted);font-size:.93rem">Dá para conferir: abra as ferramentas de desenvolvedor do navegador, vá até a aba <strong>Rede</strong> e use qualquer ferramenta desta página. Nenhuma requisição sai com o seu arquivo.</p>
</div>
</section>`;

export function toolsGrid({ activeSlug = null, showUpcoming = true, filter = true } = {}) {
  const pills = filter
    ? `<div class="pills" data-filter><button class="pill" type="button" data-cat="" aria-pressed="true">Todas</button>${categories
        .map((c) => `<button class="pill" type="button" data-cat="${c.id}" aria-pressed="false">${c.label}</button>`)
        .join('')}</div>`
    : '';
  const cards = tools
    .filter((t) => t.slug !== activeSlug)
    .map(
      (t) => `<a class="card" href="${toolUrl(t.slug)}" data-cat="${t.category}">
<span class="ci">${icon(t.icon, 20)}</span>
<h3>${esc(t.name)}</h3>
<p>${esc(t.cardText)}</p>
<span class="kw">${esc(t.cardKw)}</span>
</a>`
    )
    .join('');
  const soon = showUpcoming
    ? upcomingTools
        .map(
          (t) => `<div class="card soon" data-cat="${t.category}"><span class="soon-tag">EM BREVE</span>
<span class="ci">${icon(t.icon, 20)}</span><h3>${esc(t.name)}</h3><p>${esc(t.cardText)}</p></div>`
        )
        .join('')
    : '';
  return `${pills}<div class="grid">${cards}${soon}</div>`;
}

export const relatedSection = (tool) => {
  const links = (tool.related || [])
    .map(resolveRef)
    .filter(Boolean)
    .map((t) => `<a href="${t.url}">${icon('arrow')} ${esc(t.name)}</a>`)
    .join('');
  if (!links) return '';
  return `<section class="sec">
<div class="wrap">
<div class="sec-head"><span class="kicker">Continue</span><h2>Ferramentas relacionadas</h2></div>
<div class="related">${links}</div>
</div>
</section>`;
};

export const ctaSection = (title, text, href = '/ferramentas/', label = 'Ver todas as ferramentas') =>
  `<section class="sec"><div class="wrap"><div class="cta">
<h2>${esc(title)}</h2><p>${esc(text)}</p>
<p style="margin:22px 0 0"><a class="btn btn-primary" href="${href}">${esc(label)}</a></p>
</div></div></section>`;

const proseSections = (sections = []) =>
  sections.length
    ? `<section class="sec"><div class="wrap"><div class="prose">${sections
        .map((s) => `<h2>${esc(s.h2)}</h2>${s.html}`)
        .join('')}</div></div></section>`
    : '';

/* ---------------------------------------------------------- page bodies */

export function toolPageBody(tool) {
  const isHome = !!tool.home;
  return `<section class="hero">
<div class="wrap">
${tool.eyebrow ? `<span class="eyebrow">${icon('shield', 15)} ${esc(tool.eyebrow)}</span>` : ''}
<h1>${esc(tool.h1)}</h1>
<p class="lede">${esc(tool.lede)}</p>
</div>
</section>
<div class="wrap" style="max-width:820px">${toolWidget(tool)}</div>
${tool.intro ? `<section class="sec" style="padding-top:34px"><div class="wrap"><div class="prose">${tool.intro}</div></div></section>` : ''}
${howtoSection(tool.howto)}
${proseSections(tool.sections)}
${isHome ? `<section class="sec sec-alt"><div class="wrap"><div class="sec-head"><span class="kicker">17 ferramentas</span><h2>Tudo o que você precisa para trabalhar com PDF</h2><p>Grátis, sem cadastro e processado no seu próprio navegador.</p></div>${toolsGrid({ activeSlug: tool.slug })}</div></section>` : ''}
${isHome ? privacySection() : ''}
${faqSection(tool.faq)}
${relatedSection(tool)}
${!isHome ? ctaSection('Precisa de outra coisa com PDF?', 'São 17 ferramentas gratuitas que rodam inteiramente no seu navegador — sem cadastro e sem upload.') : ''}`;
}

export function toolsIndexBody() {
  return `<section class="hero">
<div class="wrap">
<span class="eyebrow">${icon('shield', 15)} Tudo grátis · Nada sai do seu aparelho</span>
<h1>Ferramentas PDF online e gratuitas</h1>
<p class="lede">Junte, divida, comprima, converta, assine e organize arquivos PDF direto no navegador. Sem cadastro, sem instalar nada e sem enviar documentos para servidores.</p>
</div>
</section>
<section class="sec" style="padding-top:18px"><div class="wrap">${toolsGrid({})}</div></section>
${privacySection()}
<section class="sec"><div class="wrap"><div class="prose">
<h2>Como escolher a ferramenta certa</h2>
<p>As tarefas com PDF se repetem bastante, e os nomes confundem. Este é o mapa rápido:</p>
<table><thead><tr><th>Você quer…</th><th>Use</th></tr></thead><tbody>
<tr><td>Reunir vários arquivos em um só</td><td><a href="/">Juntar PDF</a></td></tr>
<tr><td>Quebrar um arquivo em partes</td><td><a href="/dividir-pdf/">Dividir PDF</a></td></tr>
<tr><td>Salvar só algumas páginas</td><td><a href="/extrair-paginas-pdf/">Extrair páginas</a></td></tr>
<tr><td>Apagar páginas indesejadas</td><td><a href="/remover-paginas-pdf/">Remover páginas</a></td></tr>
<tr><td>Mudar a ordem das páginas</td><td><a href="/organizar-pdf/">Organizar PDF</a></td></tr>
<tr><td>Deixar o arquivo mais leve</td><td><a href="/comprimir-pdf/">Comprimir PDF</a></td></tr>
<tr><td>Corrigir páginas deitadas</td><td><a href="/girar-pdf/">Girar PDF</a></td></tr>
<tr><td>Numerar folhas para protocolo</td><td><a href="/numerar-paginas-pdf/">Numerar páginas</a></td></tr>
<tr><td>Marcar como cópia ou confidencial</td><td><a href="/marca-dagua-pdf/">Marca d’água</a></td></tr>
<tr><td>Assinar sem imprimir</td><td><a href="/assinar-pdf/">Assinar PDF</a></td></tr>
<tr><td>Transformar fotos em PDF</td><td><a href="/jpg-para-pdf/">JPG para PDF</a></td></tr>
<tr><td>Transformar páginas em imagem</td><td><a href="/pdf-para-jpg/">PDF para JPG</a></td></tr>
<tr><td>Editar o texto de novo</td><td><a href="/pdf-para-word/">PDF para Word</a></td></tr>
<tr><td>Entregar um .docx como PDF</td><td><a href="/word-para-pdf/">Word para PDF</a></td></tr>
</tbody></table>
<h2>Funciona no celular?</h2>
<p>Sim, em todas as ferramentas. O site foi construído para telas pequenas primeiro: os botões são grandes, a seleção de arquivos abre o gerenciador nativo do Android ou do iPhone e o resultado cai direto na pasta de downloads. Como o processamento é local, também funciona com internet ruim — e, depois da primeira visita, funciona sem internet nenhuma.</p>
<h2>Precisa pagar alguma coisa?</h2>
<p>Não. Todas as ferramentas desta página são gratuitas, sem limite diário, sem cadastro e sem marca d’água nos arquivos gerados.</p>
</div></div></section>
${ctaSection('Comece pela mais usada', 'Juntar vários PDF em um único arquivo leva menos de um minuto.', '/', 'Juntar PDF agora')}`;
}

/* ------------------------------------------------------------- guides */

/** Low-key acquisition note. Articles only; tool pages stay clean. */
export const projectNote = () => `<aside class="project-note">
<p><strong>Sobre o ${site.name}</strong> — este é um projeto independente. As ferramentas rodam inteiramente no navegador de quem as usa: não há servidor recebendo documentos, e por isso não há limite de uso nem cadastro.</p>
<p>O domínio e o projeto estão abertos a propostas. Se isso interessar a você, os detalhes estão na <a href="/aquisicao/" rel="nofollow">página do projeto</a>.</p>
</aside>`;

export function guideBody(guide) {
  const tool = guide.tool !== undefined && guide.tool !== null ? bySlug.get(guide.tool) : null;
  return `<section class="hero">
<div class="wrap">
<span class="eyebrow">${icon('book', 15)} ${guide.article ? 'Artigo' : 'Guia'}</span>
<h1>${esc(guide.h1)}</h1>
<p class="lede">${esc(guide.lede)}</p>
<p style="font-size:.82rem;color:var(--muted-2);margin-top:14px">Publicado em <time datetime="${guide.date}">${fmtDate(guide.date)}</time>${guide.updated && guide.updated !== guide.date ? ` · Atualizado em <time datetime="${guide.updated}">${fmtDate(guide.updated)}</time>` : ''}</p>
</div>
</section>
${tool ? `<div class="wrap" style="max-width:820px">${toolWidget(tool)}</div>` : ''}
<section class="sec"><div class="wrap"><div class="prose">${guide.body}${guide.article ? projectNote() : ''}</div></div></section>
${faqSection(guide.faq)}
${relatedGuideSection(guide)}
${ctaSection('Todas as ferramentas em um lugar', '17 ferramentas de PDF gratuitas que rodam no seu navegador, sem cadastro e sem upload.')}`;
}

export function relatedGuideSection(guide) {
  const links = (guide.related || [])
    .map(resolveRef)
    .filter(Boolean)
    .map((t) => `<a href="${t.url}">${icon('arrow')} ${esc(t.name)}</a>`)
    .join('');
  if (!links) return '';
  return `<section class="sec"><div class="wrap">
<div class="sec-head"><span class="kicker">Leia também</span><h2>Relacionados</h2></div>
<div class="related">${links}</div>
</div></section>`;
}

/** Guides and tools share one link namespace, so related[] can mix both. */
let guideIndex = new Map();
export const registerGuides = (list) => {
  guideIndex = new Map(list.map((g) => [g.slug, g]));
};

function resolveRef(slug) {
  const tool = bySlug.get(slug);
  if (tool) return { url: toolUrl(tool.slug), name: tool.name };
  const guide = guideIndex.get(slug);
  return guide ? { url: `/${guide.slug}/`, name: guide.h1 } : null;
}

export const fmtDate = (iso) =>
  new Date(iso + 'T12:00:00Z').toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });

const postCard = (g) =>
  `<a href="/${g.slug}/"><h3>${esc(g.h1)}</h3><p>${esc(g.lede)}</p><time datetime="${g.updated || g.date}">Atualizado em ${fmtDate(g.updated || g.date)}</time></a>`;

export function guidesIndexBody(list) {
  const articles = list.filter((g) => g.article);
  const howtos = list.filter((g) => !g.article);
  const group = (title, sub, items) =>
    items.length
      ? `<h2 style="margin-top:2.2em">${esc(title)}</h2><p class="lede" style="margin-bottom:1.4em">${esc(sub)}</p>
<div class="postlist">${items.map(postCard).join('')}</div>`
      : '';
  return `<section class="hero"><div class="wrap">
<span class="eyebrow">${icon('book', 15)} Guias e artigos</span>
<h1>Guias de PDF</h1>
<p class="lede">Como os arquivos PDF funcionam por dentro e o que fazer quando eles não colaboram — no computador e no celular.</p>
</div></section>
<section class="sec" style="padding-top:8px"><div class="wrap" style="max-width:820px">
${group('Artigos', 'O mecanismo por trás dos problemas mais comuns, com diagramas.', articles)}
${group('Como fazer', 'Passo a passo direto para cada tarefa.', howtos)}
</div></section>
${ctaSection('Precisa resolver agora?', 'Todas as ferramentas são gratuitas e rodam no seu navegador.')}`;
}

/* -------------------------------------------------------- static pages */

export const staticBody = ({ h1, lede, html, eyebrow }) => `<section class="hero"><div class="wrap">
${eyebrow ? `<span class="eyebrow">${esc(eyebrow)}</span>` : ''}
<h1>${esc(h1)}</h1>
${lede ? `<p class="lede">${esc(lede)}</p>` : ''}
</div></section>
<section class="sec" style="padding-top:20px"><div class="wrap"><div class="prose">${html}</div></div></section>`;
