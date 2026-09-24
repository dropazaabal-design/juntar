/**
 * Spanish flagship tools — six pages, mirroring the English scope. "unir"
 * is the term Spain and most of LATAM search for (Portugal's own site
 * already showed the same unir/juntar split), with "juntar" covered as a
 * synonym since it's a valid Spanish verb too and this domain contains it.
 */

export const toolsEs = [
  {
    slug: '',
    engine: 'merge',
    icon: 'merge',
    name: 'Unir PDF',
    home: true,
    title: 'Unir PDF Online Gratis — Sin Subir Archivos',
    description:
      'Une archivos PDF en tu navegador. No se sube nada — puedes comprobarlo en las herramientas de desarrollador. Sin registro, sin marca de agua.',
    keywords: ['unir pdf', 'juntar pdf', 'combinar pdf', 'unir pdf online', 'unir pdf gratis', 'unir pdf sin subir'],
    h1: 'Unir archivos PDF online',
    eyebrow: 'Se procesa en tu navegador — nada se sube',
    lede: 'Combina cualquier cantidad de PDF en un solo documento. La unión ocurre en tu propio dispositivo, así que tus archivos nunca pasan por un servidor.',
    ui: { accept: '.pdf,application/pdf', multiple: true, cta: 'Unir y descargar PDF', dropTitle: 'Arrastra tus PDF aquí', dropHint: 'o toca para elegir los archivos' },
    intro:
      '<p>Casi todos los sitios gratuitos de PDF funcionan igual: subes el archivo, un servidor lo procesa y confías en una política de privacidad que promete borrarlo. Esta herramienta hace la unión de otra forma: por completo dentro de tu navegador, con la misma librería de código abierto (<a href="https://github.com/Hopding/pdf-lib" rel="nofollow">pdf-lib</a>) que usan editores de PDF profesionales.</p>',
    sections: [
      {
        h2: 'Por qué no se sube nada, y cómo comprobarlo',
        html: '<p>Abre las herramientas de desarrollador de tu navegador (F12), ve a la pestaña <strong>Red</strong>, y une dos PDF. Verás que la página y sus scripts se cargan una vez — y nada más. Ninguna solicitud lleva tu archivo, porque pdf-lib y pdf.js están alojados en este mismo dominio y el trabajo ocurre en memoria, dentro de la pestaña.</p><p>El efecto práctico: no hay coste por operación, así que no hay límite diario, no hay registro obligatorio y no se añade marca de agua para forzar una actualización. La herramienta también sigue funcionando sin conexión tras la primera visita.</p>',
      },
      {
        h2: 'Qué se conserva al unir',
        html: '<p>Las páginas se copian de los archivos originales, sin volver a renderizarlas, así que el resultado mantiene: texto seleccionable y buscable, la resolución original de las imágenes, enlaces internos y externos, y la orientación de cada página. Nada se convierte en imagen, así que nada pierde calidad.</p><p>Lo único que no sobrevive a una unión —en esta herramienta o en cualquier otra— es una firma digital con certificado: cualquier cambio la invalida, porque la firma certifica ese archivo exacto. Une primero, firma al final.</p>',
      },
    ],
    howto: {
      name: 'Cómo unir archivos PDF online',
      description: 'Combina varios archivos PDF en un solo documento usando solo tu navegador.',
      totalTime: 'PT1M',
      steps: [
        { name: 'Elige tus archivos', text: 'Arrastra tus PDF a la zona de selección, o tócala para elegir archivos desde tu dispositivo.' },
        { name: 'Define el orden', text: 'Arrastra los elementos de la lista hasta que la secuencia sea correcta — esto define el orden final de las páginas.' },
        { name: 'Une y descarga', text: 'Haz clic en "Unir y descargar PDF". El archivo combinado se genera al instante y la descarga comienza.' },
      ],
    },
    faq: [
      { q: '¿Es realmente gratis?', a: 'Sí — sin registro, sin límite diario, sin marca de agua en el resultado.' },
      { q: '¿Mis archivos se suben a algún servidor?', a: 'No. La unión ocurre completamente en tu navegador. Puedes comprobarlo tú mismo en las herramientas de desarrollador → Red: ninguna solicitud lleva tu archivo.' },
      { q: '¿Hay límite de tamaño o de páginas?', a: 'No hay un límite fijo como en las herramientas basadas en subida de archivos. El límite práctico es la memoria de tu dispositivo, que suele ser mucho más generosa.' },
      { q: '¿Unir reduce la calidad?', a: 'No. Las páginas se copian tal cual, sin recomprimir. El texto sigue siendo seleccionable y las imágenes mantienen su resolución original.' },
      { q: '¿Funciona en el móvil?', a: 'Sí, tanto en Android como en iPhone, directamente en el navegador — sin instalar ninguna app.' },
      { q: '¿Es lo mismo que "juntar PDF" o "combinar PDF"?', a: 'Sí, son distintas formas de nombrar la misma operación: combinar varios archivos en un solo documento.' },
    ],
    related: ['comprimir-pdf', 'dividir-pdf', 'jpg-a-pdf', 'pdf-a-word'],
  },

  {
    slug: 'comprimir-pdf',
    engine: 'compress',
    icon: 'compress',
    name: 'Comprimir PDF',
    title: 'Comprimir PDF Online Gratis — Sin Subir Archivos',
    description:
      'Reduce el tamaño de un PDF en tu navegador, con tres niveles de compresión. Nada se sube a un servidor.',
    keywords: ['comprimir pdf', 'reducir tamaño pdf', 'comprimir pdf online', 'comprimir pdf gratis', 'comprimir pdf sin subir'],
    h1: 'Comprimir PDF online',
    eyebrow: 'Tres niveles — previsualiza el resultado antes de descargar',
    lede: 'Reduce PDF escaneados o con muchas imágenes a una fracción de su tamaño, sin enviar el archivo a ningún lado.',
    ui: { accept: '.pdf,application/pdf', multiple: false, cta: 'Comprimir PDF', dropTitle: 'Arrastra tu PDF aquí', dropHint: 'o toca para elegir un archivo' },
    intro:
      '<p>Los PDF pesan casi siempre por el mismo motivo: las imágenes. Una página escaneada a 300 DPI es, para un ordenador, una fotografía grande. Esta herramienta redibuja cada página a menor resolución y la recodifica, que es de donde viene casi toda la reducción de tamaño.</p>',
    sections: [
      {
        h2: 'Elegir un nivel',
        html: '<table><thead><tr><th>Nivel</th><th>Resolución</th><th>Recomendado para</th></tr></thead><tbody><tr><td>Ligero</td><td>~150 DPI</td><td>Documentos que aún se imprimirán; menor pérdida de calidad</td></tr><tr><td>Recomendado</td><td>~110 DPI</td><td>Adjuntos de correo y la mayoría de formularios</td></tr><tr><td>Máximo</td><td>~72 DPI</td><td>Un límite de tamaño estricto y lectura solo en pantalla</td></tr></tbody></table><p>La herramienta muestra el tamaño antes y después para que compares antes de descargar. Como todo ocurre en local, probar otro nivel cuesta segundos y ninguna subida adicional.</p>',
      },
      {
        h2: 'Cuándo la compresión no ayuda mucho',
        html: '<p>Un PDF que ya es solo texto —exportado desde Word, o generado por un sistema— tiene poco que comprimir, porque no hay imágenes pesadas que recodificar. Si un archivo de solo texto sigue pesando demasiado, la solución suele ser <a href="/es/dividir-pdf/">dividirlo</a>, no comprimirlo.</p><p>Algo a tener en cuenta: comprimir invalida una firma digital con certificado, porque genera un archivo nuevo. Comprime antes de firmar, nunca después.</p>',
      },
    ],
    howto: {
      name: 'Cómo comprimir un PDF',
      description: 'Reduce el tamaño de un archivo PDF directamente en tu navegador.',
      steps: [
        { name: 'Elige tu PDF', text: 'Arrastra el archivo a la zona de selección o toca para elegir un archivo.' },
        { name: 'Elige un nivel de compresión', text: 'Elige ligero, recomendado o máximo según el tamaño que necesites alcanzar.' },
        { name: 'Descarga el resultado', text: 'Comprueba el tamaño antes y después mostrado en pantalla, y descarga el archivo comprimido.' },
      ],
    },
    faq: [
      { q: '¿Cuánto puede reducirse un PDF?', a: 'Los documentos escaneados suelen bajar entre un 70% y un 90%. Los PDF de solo texto se reducen muy poco.' },
      { q: '¿Comprimir elimina el texto seleccionable?', a: 'Sí — las páginas se recodifican como imagen, así que el texto deja de ser seleccionable. Conserva el original si lo necesitas.' },
      { q: '¿Se sube mi archivo?', a: 'No, la compresión ocurre completamente en tu navegador.' },
      { q: '¿Añade marca de agua?', a: 'No, el resultado es limpio.' },
    ],
    related: ['', 'dividir-pdf', 'pdf-a-jpg', 'jpg-a-pdf'],
  },

  {
    slug: 'dividir-pdf',
    engine: 'split',
    icon: 'split',
    name: 'Dividir PDF',
    title: 'Dividir PDF Online Gratis — Sin Subir Archivos',
    description:
      'Divide un PDF por rango de páginas, en páginas individuales, o cada N páginas — todo en tu navegador.',
    keywords: ['dividir pdf', 'dividir pdf online', 'separar pdf', 'extraer páginas pdf', 'dividir pdf gratis'],
    h1: 'Dividir PDF online',
    eyebrow: 'Por rango, por página, o cada N páginas',
    lede: 'Separa un PDF grande en archivos más pequeños, o extrae solo las páginas que necesitas.',
    ui: { accept: '.pdf,application/pdf', multiple: false, cta: 'Dividir y descargar', dropTitle: 'Arrastra el PDF que quieres dividir', dropHint: 'o toca para elegir un archivo' },
    intro:
      '<p>Los documentos escaneados suelen salir como un único PDF enorme. Esta herramienta lo divide de tres formas: por un rango exacto de páginas, en un archivo por página, o en bloques de tamaño fijo.</p>',
    sections: [
      {
        h2: 'Tres formas de dividir',
        html: '<h3>Por rango de páginas</h3><p>Escribe algo como <code>1-5, 12, 20-30</code> y obtén un solo PDF con esas páginas, en ese orden.</p><h3>Una página por archivo</h3><p>Un PDF de 40 páginas se convierte en 40 archivos separados y numerados.</p><h3>Cada N páginas</h3><p>Divide el archivo en bloques de tamaño fijo. Cuando el resultado es más de un archivo, todo se entrega en un único <strong>.zip</strong> creado en tu navegador.</p>',
      },
    ],
    howto: {
      name: 'Cómo dividir un archivo PDF',
      description: 'Divide un PDF en varios archivos o extrae páginas específicas, directamente en tu navegador.',
      steps: [
        { name: 'Elige el PDF', text: 'Arrastra el archivo a la zona de selección o toca para elegirlo.' },
        { name: 'Elige un modo de división', text: 'Elige entre rango de páginas, una página por archivo, o bloques de N páginas.' },
        { name: 'Descarga el resultado', text: 'Haz clic en dividir. Varios archivos se entregan juntos en un .zip creado en tu navegador.' },
      ],
    },
    faq: [
      { q: '¿Puedo extraer solo algunas páginas?', a: 'Sí, usa el modo de rango de páginas y escribe los números, por ejemplo 1-3, 8, 12-15.' },
      { q: '¿Se modifica el archivo original?', a: 'No, el PDF original permanece intacto en tu dispositivo.' },
      { q: '¿Se suben mis archivos?', a: 'No, la división ocurre completamente en el navegador.' },
    ],
    related: ['', 'comprimir-pdf', 'jpg-a-pdf', 'pdf-a-word'],
  },

  {
    slug: 'pdf-a-word',
    engine: 'pdf2docx',
    icon: 'word',
    name: 'PDF a Word',
    title: 'PDF a Word Online Gratis — Sin Subir Archivos',
    description:
      'Convierte el texto de un PDF en un archivo .docx editable, completamente en tu navegador.',
    keywords: ['pdf a word', 'convertir pdf a word', 'pdf a docx', 'pdf a word gratis', 'pdf a word sin subir'],
    h1: 'Convertir PDF a Word',
    eyebrow: 'Genera un .docx real — se abre en Word, Google Docs, LibreOffice',
    lede: 'Recupera el texto de un PDF en un documento editable, sin enviar el archivo a un servidor.',
    ui: { accept: '.pdf,application/pdf', multiple: false, cta: 'Convertir a Word', dropTitle: 'Arrastra el PDF aquí', dropHint: 'o toca para elegir un archivo' },
    intro:
      '<p>Un PDF no guarda párrafos ni tablas como lo hace Word — guarda posiciones de caracteres en una página. Convertirlo de vuelta significa reconstruir la estructura por inferencia, algo que hace cualquier conversor, incluidos los de pago. Esta herramienta prioriza lo que más importa en la práctica: texto correcto, en el orden correcto, dividido en párrafos y páginas, editable en un <code>.docx</code> real.</p>',
    sections: [
      {
        h2: 'Qué sobrevive a la conversión',
        html: '<p>Se conserva de forma fiable: el texto en orden de lectura, la división en párrafos, los saltos de página. Se reconstruye con riesgo: columnas múltiples, tablas con bordes, y la posición exacta de las imágenes.</p><p>Si el PDF es un documento escaneado, no hay capa de texto que convertir — es una imagen. La herramienta te avisará en lugar de devolver un archivo vacío.</p>',
      },
    ],
    howto: {
      name: 'Cómo convertir PDF a Word',
      description: 'Convierte el texto de un PDF en un documento Word editable, directamente en tu navegador.',
      steps: [
        { name: 'Elige el PDF', text: 'Arrastra el archivo a la zona de selección o toca para elegirlo.' },
        { name: 'Convierte', text: 'Haz clic en convertir. El texto se lee y se genera un archivo .docx en tu navegador.' },
        { name: 'Descarga y edita', text: 'Abre el archivo en Word, Google Docs o LibreOffice para editarlo.' },
      ],
    },
    faq: [
      { q: '¿Se mantiene el formato exacto?', a: 'Se preservan el texto, el orden y los saltos de párrafo y página. Las columnas múltiples y las tablas con bordes no — es una limitación del propio formato PDF.' },
      { q: '¿Funciona con PDF escaneados?', a: 'No — los documentos escaneados son imágenes sin capa de texto. La herramienta te avisará cuando detecte esto.' },
      { q: '¿Se sube mi documento?', a: 'No, la conversión ocurre completamente en tu navegador.' },
    ],
    related: ['', 'jpg-a-pdf', 'comprimir-pdf', 'dividir-pdf'],
  },

  {
    slug: 'jpg-a-pdf',
    engine: 'img2pdf',
    icon: 'image',
    name: 'JPG a PDF',
    title: 'JPG a PDF Online Gratis — Sin Subir Archivos',
    description:
      'Convierte imágenes JPG, PNG o WEBP en un solo PDF, en tu navegador. Nada se sube.',
    keywords: ['jpg a pdf', 'imagen a pdf', 'convertir jpg a pdf', 'jpg a pdf gratis', 'foto a pdf'],
    h1: 'Convertir JPG a PDF',
    eyebrow: 'Varias imágenes → un solo PDF',
    lede: 'Combina fotos de documentos, recibos o páginas escaneadas en un PDF organizado, desde el móvil.',
    ui: { accept: 'image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp', multiple: true, cta: 'Convertir y descargar PDF', dropTitle: 'Arrastra tus imágenes aquí', dropHint: 'JPG, PNG o WEBP — varias a la vez' },
    intro:
      '<p>Fotografiar un documento con el móvil es rápido, pero nadie quiere diez archivos JPG sueltos en un correo. Convertirlos en un solo PDF resuelve ambos lados: un solo adjunto, en el orden correcto.</p>',
    sections: [
      {
        h2: 'Opciones de página',
        html: '<ul><li><strong>Ajuste:</strong> la imagen puede ocupar toda la página o quedar centrada con márgenes.</li><li><strong>Tamaño de página:</strong> A4, Carta, o el tamaño propio de la imagen.</li><li><strong>Orientación:</strong> automática por imagen, o fija para todo el documento.</li></ul><p>El orden sigue el de la lista. Si el resultado pesa demasiado para enviarlo, pásalo después por <a href="/es/comprimir-pdf/">Comprimir PDF</a>.</p>',
      },
    ],
    howto: {
      name: 'Cómo convertir JPG a PDF',
      description: 'Convierte una o varias imágenes JPG, PNG o WEBP en un archivo PDF, directamente en tu navegador.',
      steps: [
        { name: 'Selecciona tus imágenes', text: 'Arrastra las fotos a la zona de selección o toca para elegirlas desde tu galería.' },
        { name: 'Define orden y formato', text: 'Arrastra los elementos para definir el orden, y elige tamaño de página, margen y orientación.' },
        { name: 'Descarga el PDF', text: 'Haz clic en convertir y descarga el PDF con todas tus imágenes.' },
      ],
    },
    faq: [
      { q: '¿Puedo combinar varias fotos en un solo PDF?', a: 'Sí, selecciónalas todas a la vez, ordena arrastrando, y convierte — obtienes un único PDF.' },
      { q: '¿Soporta PNG y WEBP?', a: 'Sí, junto con JPG, en la misma conversión.' },
      { q: '¿Se suben mis fotos?', a: 'No, la conversión ocurre por completo en tu dispositivo.' },
    ],
    related: ['', 'pdf-a-jpg', 'comprimir-pdf', 'pdf-a-word'],
  },

  {
    slug: 'pdf-a-jpg',
    engine: 'pdf2img',
    icon: 'image',
    name: 'PDF a JPG',
    title: 'PDF a JPG Online Gratis — Sin Subir Archivos',
    description:
      'Convierte cada página de un PDF en una imagen JPG, con la resolución que elijas. Nada se sube.',
    keywords: ['pdf a jpg', 'pdf a imagen', 'convertir pdf a jpg', 'pdf a jpg gratis', 'pdf a jpg sin subir'],
    h1: 'Convertir PDF a JPG',
    eyebrow: 'Una imagen por página — resolución ajustable',
    lede: 'Convierte páginas de PDF en imágenes para publicar, presentar, o donde solo se acepte una foto.',
    ui: { accept: '.pdf,application/pdf', multiple: false, cta: 'Convertir y descargar', dropTitle: 'Arrastra el PDF aquí', dropHint: 'o toca para elegir un archivo' },
    intro:
      '<p>No todos los formularios aceptan un PDF. Los que piden "foto del documento", publicaciones en redes, presentaciones, y algunos sistemas antiguos solo funcionan con imágenes. Esta herramienta convierte cada página en un JPG.</p>',
    sections: [
      {
        h2: 'Elegir una resolución',
        html: '<table><thead><tr><th>Resolución</th><th>Úsala para</th></tr></thead><tbody><tr><td>72 DPI</td><td>Ver en pantalla, previsualizaciones — archivos más ligeros</td></tr><tr><td>150 DPI</td><td>Buen valor por defecto: legible al ampliar, válido para impresión doméstica</td></tr><tr><td>300 DPI</td><td>Calidad de impresión y texto pequeño</td></tr></tbody></table><p>Un PDF de varias páginas se entrega como <strong>.zip</strong>; una sola página se descarga directamente como JPG.</p>',
      },
    ],
    howto: {
      name: 'Cómo convertir PDF a JPG',
      description: 'Convierte cada página de un PDF en una imagen JPG, directamente en tu navegador.',
      steps: [
        { name: 'Elige el PDF', text: 'Arrastra el archivo a la zona de selección o toca para elegirlo.' },
        { name: 'Elige una resolución', text: 'Elige 72, 150 o 300 DPI según el uso de la imagen.' },
        { name: 'Descarga las imágenes', text: 'Haz clic en convertir — varias páginas llegan en un .zip, una sola se descarga directamente.' },
      ],
    },
    faq: [
      { q: '¿Puedo convertir solo una página?', a: 'Extrae primero la página con Dividir PDF, y luego convierte el resultado.' },
      { q: '¿Las imágenes llevan marca de agua?', a: 'No, el resultado es limpio.' },
      { q: '¿Qué resolución uso para imprimir?', a: 'Usa 300 DPI para impresión de calidad; 150 DPI es suficiente para pantalla.' },
    ],
    related: ['jpg-a-pdf', '', 'comprimir-pdf', 'pdf-a-word'],
  },
];

export const toolUrlEs = (slug) => (slug === '' ? '/es/' : `/es/${slug}/`);
export const homeToolEs = toolsEs.find((t) => t.home);
export const bySlugEs = new Map(toolsEs.map((t) => [t.slug, t]));
