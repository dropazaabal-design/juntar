/**
 * Page bodies for the English and Spanish flagship tools. A deliberately
 * lean sibling of pages.mjs's toolPageBody: it doesn't pull in the 37-page
 * Portuguese ecosystem (toolsGrid, privacySection, the guides index) because
 * none of that exists in en/es yet. It reuses toolWidget (now locale-aware)
 * and faqSection (which already takes a title) rather than duplicating them.
 */
import { icon } from './icons.mjs';
import { esc, abs } from './layout.mjs';
import { toolWidget } from './widgets.mjs';
import { faqSection } from './pages.mjs';

const UI = {
  en: {
    faqTitle: 'Frequently asked questions', faqKicker: 'Questions',
    howtoKicker: 'Step by step', relatedKicker: 'Continue', relatedTitle: 'Related tools',
    ctaTitle: 'Need something else with PDF?', ctaText: 'Free tools that run entirely in your browser — no sign-up, no upload.',
    ctaLabel: 'See all tools', trustKicker: 'Why it’s different', trustTitle: 'Your files never leave your device',
    trustSub: 'Most PDF sites process your file on a server. This one doesn’t need to.',
  },
  es: {
    faqTitle: 'Preguntas frecuentes', faqKicker: 'Dudas',
    howtoKicker: 'Paso a paso', relatedKicker: 'Continúa', relatedTitle: 'Herramientas relacionadas',
    ctaTitle: '¿Necesitas algo más con PDF?', ctaText: 'Herramientas gratis que funcionan por completo en tu navegador — sin registro, sin subir nada.',
    ctaLabel: 'Ver todas las herramientas', trustKicker: 'Por qué es diferente', trustTitle: 'Tus archivos nunca salen de tu dispositivo',
    trustSub: 'La mayoría de los sitios de PDF procesan tu archivo en un servidor. Este no lo necesita.',
  },
};

const howtoSectionI18n = (howto, L) => {
  if (!howto) return '';
  return `<section class="sec" id="how-to">
<div class="wrap">
<div class="sec-head"><span class="kicker">${L.howtoKicker}</span><h2>${esc(howto.name)}</h2><p>${esc(howto.description)}</p></div>
<div class="steps">${howto.steps
    .map((s, i) => `<div class="step" id="step-${i + 1}"><h3>${esc(s.name)}</h3><p>${esc(s.text)}</p></div>`)
    .join('')}</div>
</div>
</section>`;
};

/** Trimmed version of pages.mjs's privacySection, in the page's own language. */
const trustSection = (L) => `<section class="sec sec-alt" id="privacy">
<div class="wrap">
<div class="sec-head"><span class="kicker">${L.trustKicker}</span><h2>${L.trustTitle}</h2><p>${L.trustSub}</p></div>
<div class="split2">
<div class="vs bad"><h3>${icon('x')} ${L.other || 'Other converters'}</h3><ul>
<li>${icon('x')} <span>${L.badUpload}</span></li>
<li>${icon('x')} <span>${L.badTrust}</span></li>
<li>${icon('x')} <span>${L.badWait}</span></li>
</ul></div>
<div class="vs good"><h3>${icon('check')} ${L.us || 'With this tool'}</h3><ul>
<li>${icon('check')} <span>${L.goodNoUpload}</span></li>
<li>${icon('check')} <span>${L.goodVerify}</span></li>
<li>${icon('check')} <span>${L.goodFast}</span></li>
</ul></div>
</div>
</div>
</section>`;

const TRUST_EXTRA = {
  en: {
    other: 'Sites that process on a server', us: 'With this tool',
    badUpload: 'Your file travels over the internet to a third party’s machine.',
    badTrust: 'You rely on a promise that it gets deleted afterward.',
    badWait: 'Upload and download add real time on large files.',
    goodNoUpload: 'Read straight from disk by the browser — never transmitted.',
    goodVerify: 'Verifiable in 30 seconds: DevTools → Network, no request carries your file.',
    goodFast: 'No upload wait — the result appears almost instantly.',
  },
  es: {
    other: 'Sitios que procesan en un servidor', us: 'Con esta herramienta',
    badUpload: 'Tu archivo viaja por internet hasta la máquina de otra empresa.',
    badTrust: 'Dependes de una promesa de que se borrará después.',
    badWait: 'Subir y descargar añaden tiempo real en archivos grandes.',
    goodNoUpload: 'Se lee directamente del disco por el navegador — nunca se transmite.',
    goodVerify: 'Verificable en 30 segundos: DevTools → Red, ninguna solicitud lleva tu archivo.',
    goodFast: 'Sin espera de subida — el resultado aparece casi al instante.',
  },
};

export function flagshipToolBody(tool, locale, siblings) {
  const L = { ...UI[locale], ...TRUST_EXTRA[locale] };
  const related = (siblings || []).filter((s) => s.slug !== tool.slug).slice(0, 4);
  return `<section class="hero">
<div class="wrap">
${tool.eyebrow ? `<span class="eyebrow">${icon('shield', 15)} ${esc(tool.eyebrow)}</span>` : ''}
<h1>${esc(tool.h1)}</h1>
<p class="lede">${esc(tool.lede)}</p>
</div>
</section>
<div class="wrap" style="max-width:820px">${toolWidget(tool, locale)}</div>
${tool.intro ? `<section class="sec" style="padding-top:34px"><div class="wrap"><div class="prose">${tool.intro}</div></div></section>` : ''}
${howtoSectionI18n(tool.howto, L)}
${(tool.sections || []).map((s) => `<section class="sec"><div class="wrap"><div class="prose"><h2>${esc(s.h2)}</h2>${s.html}</div></div></section>`).join('')}
${tool.home ? trustSection(L) : ''}
${faqSection(tool.faq, L.faqTitle)}
${related.length ? `<section class="sec"><div class="wrap">
<div class="sec-head"><span class="kicker">${L.relatedKicker}</span><h2>${L.relatedTitle}</h2></div>
<div class="related">${related.map((t) => `<a href="${t.url}">${icon('arrow')} ${esc(t.name)}</a>`).join('')}</div>
</div></section>` : ''}`;
}

export { abs };
