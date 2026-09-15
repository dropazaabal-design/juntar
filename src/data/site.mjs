/**
 * Global site configuration.
 * Everything that appears in <head>, structured data or navigation is derived
 * from here so a single edit propagates to every generated page.
 */

export const site = {
  domain: 'juntarpdf.com',
  origin: 'https://juntarpdf.com',
  name: 'JuntarPDF',
  brandMark: 'juntar',
  brandAccent: 'PDF',
  brandTld: '.com',
  lang: 'pt-BR',
  locale: 'pt_BR',
  themeColor: '#0B1F3A',
  email: 'contato@juntarpdf.com',
  // Google Analytics / AdSense: leave empty to omit the tag entirely.
  gaId: 'G-TRQ306ZZPQ',
  adsenseClient: '',
  foundingYear: 2026,
  tagline: 'Ferramentas PDF online, grátis e 100% no seu navegador.',
  description:
    'Junte, divida, comprima e converta arquivos PDF de graça. Tudo acontece dentro do seu navegador — seus documentos nunca são enviados para nenhum servidor.',
  social: {
    twitter: '',
  },
};

/** Tool categories — drive the filter pills on the homepage and /ferramentas/. */
export const categories = [
  { id: 'organizar', label: 'Organizar PDF' },
  { id: 'otimizar', label: 'Otimizar PDF' },
  { id: 'converter-de', label: 'Converter de PDF' },
  { id: 'converter-em', label: 'Converter em PDF' },
  { id: 'editar', label: 'Editar PDF' },
];

/** Primary navigation (slug refers to a tool or a static page). */
export const primaryNav = [
  { href: '/', label: 'Juntar PDF' },
  { href: '/comprimir-pdf/', label: 'Comprimir PDF' },
  { href: '/dividir-pdf/', label: 'Dividir PDF' },
  { href: '/pdf-para-word/', label: 'PDF para Word' },
  { href: '/jpg-para-pdf/', label: 'JPG para PDF' },
];

export const footerNav = [
  {
    title: 'Mais usadas',
    links: [
      { href: '/', label: 'Juntar PDF' },
      { href: '/comprimir-pdf/', label: 'Comprimir PDF' },
      { href: '/dividir-pdf/', label: 'Dividir PDF' },
      { href: '/girar-pdf/', label: 'Girar PDF' },
      { href: '/organizar-pdf/', label: 'Organizar PDF' },
    ],
  },
  {
    title: 'Converter',
    links: [
      { href: '/pdf-para-word/', label: 'PDF para Word' },
      { href: '/pdf-para-jpg/', label: 'PDF para JPG' },
      { href: '/jpg-para-pdf/', label: 'JPG para PDF' },
      { href: '/word-para-pdf/', label: 'Word para PDF' },
      { href: '/pdf-para-texto/', label: 'PDF para texto' },
    ],
  },
  {
    title: 'Guias',
    links: [
      { href: '/como-juntar-pdf/', label: 'Como juntar PDF' },
      { href: '/juntar-pdf-no-celular/', label: 'Juntar PDF no celular' },
      { href: '/juntar-pdf-no-iphone/', label: 'Juntar PDF no iPhone' },
      { href: '/juntar-varios-pdf/', label: 'Juntar vários PDF' },
      { href: '/guias/', label: 'Todos os guias' },
    ],
  },
  {
    title: 'JuntarPDF',
    links: [
      { href: '/ferramentas/', label: 'Todas as ferramentas' },
      { href: '/sobre/', label: 'Sobre nós' },
      { href: '/privacidade/', label: 'Privacidade' },
      { href: '/termos/', label: 'Termos de uso' },
      { href: '/contato/', label: 'Contato' },
    ],
  },
];

/** Trust badges shown above the footer on every page. */
export const trustBadges = [
  { icon: 'shield', label: 'Arquivos nunca saem do seu aparelho' },
  { icon: 'bolt', label: 'Processa offline, sem upload' },
  { icon: 'free', label: '100% grátis, sem marca d’água' },
  { icon: 'nouser', label: 'Sem cadastro e sem limites' },
  { icon: 'flag', label: 'Feito para o Brasil' },
];
