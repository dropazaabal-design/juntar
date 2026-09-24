/**
 * Per-locale chrome: navigation, footer, trust badges, breadcrumb/skip-link
 * copy, and the small schema.org strings that differ by language. Tool and
 * guide *content* stays in its own per-locale data file — this module is
 * only the frame around it, so adding a locale never touches page copy.
 *
 * `home` is the locale's URL prefix. pt is unprefixed because those 37 pages
 * are already indexed — moving them under /pt/ would 301 away real rankings
 * for no benefit. en/es are new trees, so a prefix costs nothing and keeps
 * the three languages cleanly separated for crawlers and analytics alike.
 */
import { site } from './site.mjs';

export const locales = {
  pt: {
    code: 'pt-BR',
    dir: 'ltr',
    ogLocale: 'pt_BR',
    home: '/',
    currency: 'BRL',
    skipLabel: 'Ir para o conteúdo',
    menuLabel: 'Menu',
    navPrimaryAria: 'Principal',
    navAllLabel: 'Todas as ferramentas',
    navGuidesLabel: 'Guias',
    crumbsHome: 'Início',
    crumbsAria: 'Trilha de navegação',
    domainNoteLabel: 'Domínio \u0026amp; projeto',
    jsRequired: 'JavaScript habilitado',
    permissionsText: 'Nenhuma. O arquivo é lido apenas na memória do navegador.',
    supplyText: 'Arquivo PDF',
    toolText: 'Navegador de internet',
    areaServed: ['BR', 'PT', 'AO', 'MZ'],
    knowsLanguage: ['pt-BR', 'pt-PT'],
    tagline: site.tagline,
    nav: [
      { href: '/', label: 'Juntar PDF' },
      { href: '/comprimir-pdf/', label: 'Comprimir PDF' },
      { href: '/dividir-pdf/', label: 'Dividir PDF' },
      { href: '/pdf-para-word/', label: 'PDF para Word' },
      { href: '/jpg-para-pdf/', label: 'JPG para PDF' },
    ],
    footer: [
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
    ],
    trustBadges: [
      { icon: 'shield', label: 'Arquivos nunca saem do seu aparelho' },
      { icon: 'bolt', label: 'Processa offline, sem upload' },
      { icon: 'free', label: '100% grátis, sem marca d’água' },
      { icon: 'nouser', label: 'Sem cadastro e sem limites' },
      { icon: 'flag', label: 'Feito para o Brasil' },
    ],
  },

  en: {
    code: 'en',
    dir: 'ltr',
    ogLocale: 'en_US',
    home: '/en/',
    currency: 'USD',
    skipLabel: 'Skip to content',
    menuLabel: 'Menu',
    navPrimaryAria: 'Primary',
    navAllLabel: 'All tools',
    navGuidesLabel: 'Guides',
    crumbsHome: 'Home',
    crumbsAria: 'Breadcrumb',
    domainNoteLabel: 'Domain \u0026amp; project',
    jsRequired: 'JavaScript enabled',
    permissionsText: 'None. The file is only read into the browser’s memory.',
    supplyText: 'A PDF file',
    toolText: 'A web browser',
    areaServed: ['US', 'GB', 'CA', 'AU', 'IE'],
    knowsLanguage: ['en'],
    tagline: 'Free PDF tools, 100% in your browser.',
    nav: [
      { href: '/en/', label: 'Merge PDF' },
      { href: '/en/compress-pdf/', label: 'Compress PDF' },
      { href: '/en/split-pdf/', label: 'Split PDF' },
      { href: '/en/pdf-to-word/', label: 'PDF to Word' },
      { href: '/en/jpg-to-pdf/', label: 'JPG to PDF' },
    ],
    footer: [
      {
        title: 'Most used',
        links: [
          { href: '/en/', label: 'Merge PDF' },
          { href: '/en/compress-pdf/', label: 'Compress PDF' },
          { href: '/en/split-pdf/', label: 'Split PDF' },
        ],
      },
      {
        title: 'Convert',
        links: [
          { href: '/en/pdf-to-word/', label: 'PDF to Word' },
          { href: '/en/pdf-to-jpg/', label: 'PDF to JPG' },
          { href: '/en/jpg-to-pdf/', label: 'JPG to PDF' },
        ],
      },
      {
        title: 'Other languages',
        links: [
          { href: '/', label: 'Português (Brasil)' },
          { href: '/es/', label: 'Español' },
        ],
      },
      {
        title: 'JuntarPDF',
        links: [
          { href: '/sobre/', label: 'About' },
          { href: '/privacidade/', label: 'Privacy' },
          { href: '/termos/', label: 'Terms' },
          { href: '/contato/', label: 'Contact' },
        ],
      },
    ],
    trustBadges: [
      { icon: 'shield', label: 'Your files never leave your device' },
      { icon: 'bolt', label: 'Works offline, no upload' },
      { icon: 'free', label: '100% free, no watermark' },
      { icon: 'nouser', label: 'No sign-up, no limits' },
      { icon: 'flag', label: 'Open source' },
    ],
  },

  es: {
    code: 'es',
    dir: 'ltr',
    ogLocale: 'es_ES',
    home: '/es/',
    currency: 'EUR',
    skipLabel: 'Ir al contenido',
    menuLabel: 'Menú',
    navPrimaryAria: 'Principal',
    navAllLabel: 'Todas las herramientas',
    navGuidesLabel: 'Guías',
    crumbsHome: 'Inicio',
    crumbsAria: 'Ruta de navegación',
    domainNoteLabel: 'Dominio y proyecto',
    jsRequired: 'JavaScript habilitado',
    permissionsText: 'Ninguno. El archivo solo se lee en la memoria del navegador.',
    supplyText: 'Un archivo PDF',
    toolText: 'Un navegador web',
    areaServed: ['ES', 'MX', 'AR', 'CO', 'CL', 'PE'],
    knowsLanguage: ['es'],
    tagline: 'Herramientas PDF gratis, 100% en tu navegador.',
    nav: [
      { href: '/es/', label: 'Unir PDF' },
      { href: '/es/comprimir-pdf/', label: 'Comprimir PDF' },
      { href: '/es/dividir-pdf/', label: 'Dividir PDF' },
      { href: '/es/pdf-a-word/', label: 'PDF a Word' },
      { href: '/es/jpg-a-pdf/', label: 'JPG a PDF' },
    ],
    footer: [
      {
        title: 'Más usadas',
        links: [
          { href: '/es/', label: 'Unir PDF' },
          { href: '/es/comprimir-pdf/', label: 'Comprimir PDF' },
          { href: '/es/dividir-pdf/', label: 'Dividir PDF' },
        ],
      },
      {
        title: 'Convertir',
        links: [
          { href: '/es/pdf-a-word/', label: 'PDF a Word' },
          { href: '/es/pdf-a-jpg/', label: 'PDF a JPG' },
          { href: '/es/jpg-a-pdf/', label: 'JPG a PDF' },
        ],
      },
      {
        title: 'Otros idiomas',
        links: [
          { href: '/', label: 'Português (Brasil)' },
          { href: '/en/', label: 'English' },
        ],
      },
      {
        title: 'JuntarPDF',
        links: [
          { href: '/sobre/', label: 'Sobre' },
          { href: '/privacidade/', label: 'Privacidad' },
          { href: '/termos/', label: 'Términos' },
          { href: '/contato/', label: 'Contacto' },
        ],
      },
    ],
    trustBadges: [
      { icon: 'shield', label: 'Tus archivos nunca salen de tu dispositivo' },
      { icon: 'bolt', label: 'Funciona sin conexión, sin subir nada' },
      { icon: 'free', label: '100% gratis, sin marca de agua' },
      { icon: 'nouser', label: 'Sin registro y sin límites' },
      { icon: 'flag', label: 'Código abierto' },
    ],
  },
};

/**
 * Cross-language equivalents for the handful of flagship tools that ship in
 * all three languages. Keyed by a locale-independent concept id so
 * build.mjs can hand each page its sibling URLs without the data files
 * needing to know about each other.
 */
export const crossLinks = {
  merge: { pt: '/', en: '/en/', es: '/es/' },
  compress: { pt: '/comprimir-pdf/', en: '/en/compress-pdf/', es: '/es/comprimir-pdf/' },
  split: { pt: '/dividir-pdf/', en: '/en/split-pdf/', es: '/es/dividir-pdf/' },
  'pdf-to-word': { pt: '/pdf-para-word/', en: '/en/pdf-to-word/', es: '/es/pdf-a-word/' },
  'jpg-to-pdf': { pt: '/jpg-para-pdf/', en: '/en/jpg-to-pdf/', es: '/es/jpg-a-pdf/' },
  'pdf-to-jpg': { pt: '/pdf-para-jpg/', en: '/en/pdf-to-jpg/', es: '/es/pdf-a-jpg/' },
};

export const localeOf = (code) => locales[code] || locales.pt;
