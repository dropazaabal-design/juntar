/** Conversion tools: images <-> PDF, PDF -> text/Word, Word -> PDF. */

export const convertTools = [
  /* ============================== JPG → PDF ============================= */
  {
    slug: 'jpg-para-pdf',
    engine: 'img2pdf',
    category: 'converter-em',
    icon: 'image',
    name: 'JPG para PDF',
    cardText: 'Transforme fotos e imagens JPG, PNG ou WEBP em um PDF único.',
    cardKw: 'converter imagem em pdf',
    title: 'JPG para PDF Online Grátis — Converter Imagens em PDF',
    description:
      'Transforme fotos JPG, PNG ou WEBP em um arquivo PDF único, com ordem, margem e orientação à sua escolha. Grátis e sem enviar as imagens para servidores.',
    keywords: ['jpg para pdf', 'imagem para pdf', 'converter foto em pdf', 'jpeg para pdf', 'transformar imagem em pdf', 'foto para pdf celular'],
    h1: 'Converter JPG para PDF',
    eyebrow: 'Várias fotos · Um PDF só',
    lede: 'Junte fotos de documentos, recibos ou páginas de caderno em um PDF organizado, direto do celular e sem instalar aplicativo.',
    ui: { accept: 'image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp', multiple: true, cta: 'Converter e baixar PDF', dropTitle: 'Arraste suas imagens aqui', dropHint: 'JPG, PNG ou WEBP · várias de uma vez' },
    intro:
      '<p>Fotografar documentos com o celular resolve na hora, mas quem recebe quase nunca quer dez arquivos JPG soltos no e-mail. <strong>Converter as fotos em um PDF único</strong> resolve os dois lados: um anexo só, na ordem certa, com cara de documento.</p>',
    sections: [
      {
        h2: 'Como converter fotos em PDF pelo celular',
        html: '<p>Abra esta página no navegador do celular, toque na área de seleção e escolha as fotos direto da galeria — você pode selecionar várias de uma vez. Arraste os itens da lista para ajustar a ordem e toque em converter. O PDF cai na pasta de downloads, pronto para anexar no WhatsApp, no e-mail ou no sistema.</p><p>Como o processamento é local, a resolução original das fotos é preservada e não há o corte de qualidade que aplicativos de digitalização costumam aplicar.</p>',
      },
      {
        h2: 'Opções de página',
        html: '<ul><li><strong>Ajuste:</strong> a imagem pode ocupar a página inteira (sem margem) ou ser centralizada dentro de uma folha A4 com margem.</li><li><strong>Tamanho da folha:</strong> A4, Carta ou o tamanho exato da própria imagem.</li><li><strong>Orientação:</strong> automática — cada página fica em retrato ou paisagem conforme a foto — ou fixa para o documento inteiro.</li><li><strong>Uma imagem por página</strong> é o padrão; a ordem é a que aparece na lista.</li></ul><p>Fotos muito pesadas geram PDFs grandes. Se o resultado passar do limite de anexo, passe o arquivo pela ferramenta de <a href="/comprimir-pdf/">comprimir PDF</a>.</p>',
      },
      {
        h2: 'Dicas para a foto ficar legível',
        html: '<ul><li>Fotografe de cima, com o documento apoiado em superfície plana e sem sombra da própria mão.</li><li>Prefira luz natural difusa; a luz direta cria brilho que apaga trechos do texto.</li><li>Enquadre a folha inteira, deixando uma margem pequena — cortar a borda costuma invalidar o documento em protocolos.</li><li>Confira a nitidez antes de converter: o PDF preserva a foto como ela está, inclusive o desfoque.</li></ul>',
      },
    ],
    howto: {
      name: 'Como converter JPG em PDF',
      description: 'Transforme uma ou várias imagens JPG, PNG ou WEBP em um arquivo PDF, direto no navegador.',
      steps: [
        { name: 'Selecione as imagens', text: 'Arraste as fotos para a ferramenta ou toque para escolhê-las na galeria do celular.' },
        { name: 'Ajuste ordem e formato', text: 'Arraste os itens para definir a sequência e escolha tamanho da folha, margem e orientação.' },
        { name: 'Baixe o PDF', text: 'Clique em converter e baixe o arquivo PDF com todas as imagens.' },
      ],
    },
    faq: [
      { q: 'Como transformar várias fotos em um PDF só?', a: 'Selecione todas as imagens de uma vez na ferramenta, ajuste a ordem arrastando os itens e clique em converter. Você recebe um único PDF.' },
      { q: 'Funciona com PNG e WEBP?', a: 'Sim. A ferramenta aceita JPG, JPEG, PNG e WEBP na mesma conversão.' },
      { q: 'As imagens perdem qualidade?', a: 'Não. As fotos são inseridas na resolução original. Se o arquivo ficar pesado, use depois a ferramenta de comprimir PDF.' },
      { q: 'Minhas fotos são enviadas para algum servidor?', a: 'Não. As imagens são lidas e convertidas dentro do próprio navegador.' },
      { q: 'Dá para fazer pelo celular?', a: 'Sim. Abra o site no Chrome ou no Safari e escolha as fotos direto da galeria.' },
    ],
    related: ['', 'pdf-para-jpg', 'png-para-pdf', 'comprimir-pdf', 'word-para-pdf'],
  },

  /* ============================== PNG → PDF ============================= */
  {
    slug: 'png-para-pdf',
    engine: 'img2pdf',
    category: 'converter-em',
    icon: 'image',
    name: 'PNG para PDF',
    cardText: 'Converta capturas de tela e imagens PNG em PDF sem perder nitidez.',
    cardKw: 'png para pdf sem perder qualidade',
    title: 'PNG para PDF Online Grátis — Converter PNG em PDF',
    description:
      'Converta imagens PNG e capturas de tela em PDF mantendo a nitidez, com fundo branco aplicado à transparência. Grátis e sem upload.',
    keywords: ['png para pdf', 'converter png em pdf', 'print para pdf', 'captura de tela para pdf', 'screenshot para pdf'],
    h1: 'Converter PNG para PDF',
    eyebrow: 'Ideal para capturas de tela e imagens com texto',
    lede: 'PNG guarda texto e linhas com bordas exatas. A conversão preserva essa nitidez — o que faz diferença em prints de sistemas e comprovantes.',
    ui: { accept: 'image/png,image/jpeg,image/webp,.png,.jpg,.jpeg,.webp', multiple: true, cta: 'Converter e baixar PDF', dropTitle: 'Arraste seus PNG aqui', dropHint: 'também aceita JPG e WEBP' },
    intro:
      '<p>Captura de tela de comprovante bancário, print de protocolo, recorte de sistema, gráfico exportado: tudo isso normalmente sai em <strong>PNG</strong>. Quando é preciso anexar em um processo ou enviar formalmente, o formato esperado é PDF.</p>',
    sections: [
      {
        h2: 'Por que PNG e JPG se comportam diferente',
        html: '<p>O PNG usa compressão sem perdas: cada pixel é guardado exatamente como foi gerado. Por isso texto de tela, linhas finas e bordas de tabela ficam nítidos, enquanto o mesmo print salvo em JPG mostra pequenos borrões ao redor das letras.</p><p>Na conversão para PDF isso é mantido — a imagem entra na página sem recompressão agressiva. A contrapartida é o tamanho: PNGs de tela cheia geram PDFs maiores que fotos equivalentes. Se o peso incomodar, passe o resultado pela ferramenta de <a href="/comprimir-pdf/">comprimir PDF</a>.</p>',
      },
      {
        h2: 'Transparência vira fundo branco',
        html: '<p>PNG aceita fundo transparente; PDF impresso, não. Imagens com transparência recebem automaticamente um fundo branco, que é o comportamento esperado para documentos — sem isso, a área transparente sairia preta em muitos leitores e impressoras.</p><p>Se você precisa manter a transparência por algum motivo específico, o caminho não é o PDF de documento e sim manter o arquivo em PNG.</p>',
      },
    ],
    howto: {
      name: 'Como converter PNG em PDF',
      description: 'Transforme imagens PNG e capturas de tela em um arquivo PDF, direto no navegador.',
      steps: [
        { name: 'Selecione os arquivos PNG', text: 'Arraste as imagens para a ferramenta ou toque para escolhê-las no seu aparelho.' },
        { name: 'Ajuste ordem e página', text: 'Defina a sequência e escolha tamanho da folha, margem e orientação.' },
        { name: 'Baixe o PDF', text: 'Clique em converter e baixe o arquivo com todas as imagens.' },
      ],
    },
    faq: [
      { q: 'PNG para PDF perde qualidade?', a: 'Não. A imagem é inserida na resolução original, mantendo a nitidez típica do PNG.' },
      { q: 'O que acontece com o fundo transparente?', a: 'Ele é convertido em fundo branco, que é o comportamento correto para documentos impressos e para leitura em qualquer visualizador.' },
      { q: 'Posso misturar PNG e JPG na mesma conversão?', a: 'Sim. A ferramenta aceita PNG, JPG e WEBP juntos no mesmo PDF.' },
      { q: 'As imagens são enviadas para servidores?', a: 'Não. Tudo é convertido dentro do seu navegador.' },
    ],
    related: ['jpg-para-pdf', '', 'pdf-para-png', 'comprimir-pdf'],
  },

  /* ============================== PDF → JPG ============================= */
  {
    slug: 'pdf-para-jpg',
    engine: 'pdf2img',
    category: 'converter-de',
    icon: 'image',
    name: 'PDF para JPG',
    cardText: 'Extraia cada página do PDF como imagem JPG em alta resolução.',
    cardKw: 'pdf para imagem online',
    title: 'PDF para JPG Online Grátis — Converter Páginas em Imagem',
    description:
      'Converta cada página de um PDF em imagem JPG na resolução que você escolher. Grátis, sem marca d’água e sem enviar o arquivo para servidores.',
    keywords: ['pdf para jpg', 'pdf para imagem', 'converter pdf em jpg', 'pdf em foto', 'transformar pdf em imagem', 'pdf para jpeg'],
    h1: 'Converter PDF para JPG',
    eyebrow: 'Uma imagem por página · Resolução ajustável',
    lede: 'Transforme páginas de PDF em imagens para postar, imprimir em gráfica rápida, anexar onde só se aceita foto ou usar em apresentações.',
    ui: { accept: '.pdf,application/pdf', multiple: false, cta: 'Converter e baixar', dropTitle: 'Arraste o PDF aqui', dropHint: 'ou toque para escolher o arquivo' },
    intro:
      '<p>Nem todo lugar aceita PDF. Formulários que pedem “foto do documento”, postagens em redes sociais, slides, grupos de WhatsApp e sistemas antigos muitas vezes só trabalham com imagem. Converter o PDF em JPG resolve.</p>',
    sections: [
      {
        h2: 'Escolhendo a resolução certa',
        html: '<table><thead><tr><th>Resolução</th><th>Para que serve</th></tr></thead><tbody><tr><td><strong>72 DPI</strong></td><td>Visualização em tela, redes sociais, prévia rápida. Arquivos bem leves.</td></tr><tr><td><strong>150 DPI</strong></td><td>Padrão recomendado: texto legível ao ampliar e impressão doméstica aceitável.</td></tr><tr><td><strong>300 DPI</strong></td><td>Impressão de qualidade e leitura de letras miúdas. Gera imagens grandes.</td></tr></tbody></table><p>Se o PDF tiver mais de uma página, todas as imagens são entregues juntas em um <strong>.zip</strong> montado no próprio navegador. Uma página única baixa direto como JPG.</p>',
      },
      {
        h2: 'JPG ou PNG para esse caso?',
        html: '<p>Depende do conteúdo da página. Se ela for basicamente <strong>texto, tabelas ou linhas</strong>, o <a href="/pdf-para-png/">PDF para PNG</a> entrega bordas mais limpas. Se a página for <strong>fotografia ou digitalização colorida</strong>, o JPG desta ferramenta gera arquivos bem menores com qualidade visual praticamente igual.</p><p>Vale lembrar que, em ambos os casos, o texto deixa de ser selecionável — vira desenho. Se você precisa do texto, use <a href="/pdf-para-texto/">PDF para texto</a> ou <a href="/pdf-para-word/">PDF para Word</a>.</p>',
      },
    ],
    howto: {
      name: 'Como converter PDF em JPG',
      description: 'Transforme cada página de um PDF em uma imagem JPG, direto no navegador.',
      steps: [
        { name: 'Escolha o PDF', text: 'Arraste o arquivo para a ferramenta ou toque para selecioná-lo.' },
        { name: 'Escolha a resolução', text: 'Selecione 72, 150 ou 300 DPI conforme o uso pretendido da imagem.' },
        { name: 'Baixe as imagens', text: 'Clique em converter. Páginas múltiplas vêm em um .zip; página única baixa direto como JPG.' },
      ],
    },
    faq: [
      { q: 'Como transformar um PDF em imagem?', a: 'Envie o arquivo para a ferramenta, escolha a resolução e clique em converter. Cada página vira uma imagem JPG.' },
      { q: 'Dá para converter só uma página?', a: 'Sim. Use antes a ferramenta de extrair páginas para separar a página desejada e depois converta.' },
      { q: 'As imagens têm marca d’água?', a: 'Não. Os arquivos gerados são limpos, sem nenhuma marca.' },
      { q: 'Qual resolução escolher para imprimir?', a: 'Use 300 DPI para impressão de qualidade. Para visualizar em tela, 150 DPI já é suficiente e gera arquivos bem menores.' },
      { q: 'O PDF é enviado para algum servidor?', a: 'Não. A conversão acontece inteiramente no seu navegador.' },
    ],
    related: ['pdf-para-png', 'jpg-para-pdf', 'comprimir-pdf', 'pdf-para-texto', ''],
  },

  /* ============================== PDF → PNG ============================= */
  {
    slug: 'pdf-para-png',
    engine: 'pdf2img',
    category: 'converter-de',
    icon: 'image',
    name: 'PDF para PNG',
    cardText: 'Converta páginas em PNG sem perdas, ideal para texto e gráficos.',
    cardKw: 'pdf para png alta qualidade',
    title: 'PDF para PNG Online Grátis — Converter PDF em Imagem PNG',
    description:
      'Converta páginas de PDF em imagens PNG sem perdas, com bordas nítidas em texto e gráficos. Grátis, sem marca d’água e sem upload.',
    keywords: ['pdf para png', 'converter pdf em png', 'pdf em png alta qualidade', 'página pdf em png'],
    h1: 'Converter PDF para PNG',
    eyebrow: 'Compressão sem perdas · Texto com borda limpa',
    lede: 'Quando a página tem texto, tabelas ou gráficos vetoriais, o PNG entrega um resultado visivelmente mais limpo que o JPG.',
    ui: { accept: '.pdf,application/pdf', multiple: false, cta: 'Converter e baixar', dropTitle: 'Arraste o PDF aqui', dropHint: 'ou toque para escolher o arquivo' },
    intro:
      '<p>O JPG comprime jogando fora detalhe que o olho quase não percebe em fotos — mas percebe muito em letras. Ao redor de cada caractere surgem manchinhas cinza. O <strong>PNG não faz isso</strong>: cada pixel é preservado, e a página convertida fica igual ao que se vê na tela.</p>',
    sections: [
      {
        h2: 'Quando o PNG é a escolha certa',
        html: '<ul><li><strong>Documentos de texto</strong> que serão ampliados, recortados ou reaproveitados em slides.</li><li><strong>Gráficos, plantas e diagramas</strong> com linhas finas, onde o JPG cria ruído.</li><li><strong>Materiais para edição</strong> em programas de design, que trabalham melhor com imagem sem perdas.</li><li><strong>Comprovantes e prints</strong> que precisam permanecer legíveis depois de várias reenvios.</li></ul><p>Para páginas que são essencialmente fotografia, o <a href="/pdf-para-jpg/">PDF para JPG</a> continua sendo a opção mais prática: arquivos muito menores com diferença visual mínima.</p>',
      },
      {
        h2: 'Tamanho dos arquivos',
        html: '<p>PNG costuma gerar arquivos de 3 a 10 vezes maiores que JPG na mesma resolução. Uma página A4 a 300 DPI pode passar de 5 MB. Se você só precisa visualizar, baixe a 150 DPI; se precisa enviar por e-mail, considere converter em JPG ou reunir tudo de volta em um PDF e usar a ferramenta de <a href="/comprimir-pdf/">comprimir PDF</a>.</p><p>Documentos com mais de uma página são entregues em um <strong>.zip</strong> gerado localmente.</p>',
      },
    ],
    howto: {
      name: 'Como converter PDF em PNG',
      description: 'Transforme páginas de um PDF em imagens PNG sem perdas, direto no navegador.',
      steps: [
        { name: 'Escolha o PDF', text: 'Arraste o arquivo para a ferramenta ou toque para selecioná-lo.' },
        { name: 'Escolha a resolução', text: 'Selecione 72, 150 ou 300 DPI conforme a necessidade de nitidez.' },
        { name: 'Baixe as imagens PNG', text: 'Clique em converter e baixe o PNG único ou o .zip com todas as páginas.' },
      ],
    },
    faq: [
      { q: 'PNG é melhor que JPG para converter PDF?', a: 'Para páginas com texto, tabelas e gráficos, sim — as bordas ficam mais limpas. Para páginas que são fotografia, o JPG gera arquivos muito menores com qualidade equivalente.' },
      { q: 'O PNG gerado tem fundo transparente?', a: 'Não. As páginas são renderizadas sobre fundo branco, como aparecem em um leitor de PDF.' },
      { q: 'Por que os arquivos ficam grandes?', a: 'Porque o PNG usa compressão sem perdas. Reduza a resolução para 150 ou 72 DPI se o tamanho for um problema.' },
      { q: 'O arquivo é enviado para algum servidor?', a: 'Não. A conversão é feita no seu navegador.' },
    ],
    related: ['pdf-para-jpg', 'png-para-pdf', 'comprimir-pdf', ''],
  },

  /* ============================== PDF → TEXTO =========================== */
  {
    slug: 'pdf-para-texto',
    engine: 'pdf2txt',
    category: 'converter-de',
    icon: 'text',
    name: 'PDF para texto',
    cardText: 'Extraia todo o texto do documento em um arquivo .txt limpo.',
    cardKw: 'extrair texto de pdf',
    title: 'PDF para Texto Online Grátis — Extrair Texto de um PDF',
    description:
      'Extraia todo o texto de um arquivo PDF e baixe em .txt para copiar, pesquisar ou reutilizar. Grátis, sem cadastro e sem upload.',
    keywords: ['pdf para texto', 'extrair texto pdf', 'copiar texto de pdf', 'pdf para txt', 'tirar texto de pdf'],
    h1: 'Extrair texto de um PDF',
    eyebrow: 'Texto limpo, pronto para copiar',
    lede: 'Recupere o conteúdo escrito de um PDF em um arquivo .txt, sem formatação e sem quebras estranhas.',
    ui: { accept: '.pdf,application/pdf', multiple: false, cta: 'Extrair texto', dropTitle: 'Arraste o PDF aqui', dropHint: 'ou toque para escolher o arquivo' },
    intro:
      '<p>Copiar texto direto do leitor de PDF costuma dar errado: vem com quebra de linha no meio da frase, número de página no meio do parágrafo e cabeçalho repetido. Esta ferramenta lê a camada de texto do documento e entrega o conteúdo organizado por página, pronto para colar.</p>',
    sections: [
      {
        h2: 'O que sai e o que não sai',
        html: '<p>Sai todo o texto que existe como texto dentro do PDF, na ordem de leitura, separado por páginas. Não sai formatação — negrito, tamanho de fonte, cores e layout são descartados de propósito, porque o objetivo é o conteúdo puro.</p><p>Imagens, carimbos e assinaturas escaneadas também não saem: são desenhos, não texto.</p>',
      },
      {
        h2: 'Se o PDF for digitalizado, não há texto para extrair',
        html: '<p>Esse é o caso mais comum de frustração. Um PDF gerado por scanner ou por foto de celular contém apenas <strong>imagens de páginas</strong> — para o computador, não existe uma única letra ali. Nenhuma ferramenta de extração vai encontrar texto, porque não há.</p><p>O teste é simples: abra o PDF em qualquer leitor e tente selecionar uma palavra com o mouse. Se não der para selecionar, o documento é digitalizado.</p><p>Nesses casos o que se precisa é <strong>OCR</strong> (reconhecimento óptico de caracteres), uma tecnologia diferente, que interpreta o desenho das letras. Ainda não oferecemos OCR — quando o documento for digitalizado, a ferramenta avisa em vez de entregar um arquivo vazio.</p>',
      },
    ],
    howto: {
      name: 'Como extrair o texto de um PDF',
      description: 'Recupere o conteúdo escrito de um PDF em um arquivo de texto, direto no navegador.',
      steps: [
        { name: 'Escolha o PDF', text: 'Arraste o arquivo para a ferramenta ou toque para selecioná-lo.' },
        { name: 'Extraia o texto', text: 'Clique em extrair. O conteúdo aparece na tela, organizado por página.' },
        { name: 'Copie ou baixe', text: 'Copie o texto direto da tela ou baixe o arquivo .txt gerado.' },
      ],
    },
    faq: [
      { q: 'Como copiar o texto de um PDF sem bagunçar?', a: 'Use esta ferramenta: ela lê a camada de texto do documento e entrega o conteúdo organizado por página, sem as quebras estranhas do copiar e colar comum.' },
      { q: 'Funciona com PDF digitalizado?', a: 'Não. Documentos escaneados são imagens e não contêm texto. Seria preciso OCR, que ainda não oferecemos — a ferramenta avisa quando detecta esse caso.' },
      { q: 'A formatação é mantida?', a: 'Não. A saída é texto puro, sem negrito, fonte ou layout. Para manter formatação, use PDF para Word.' },
      { q: 'O arquivo é enviado para algum servidor?', a: 'Não. A extração acontece no seu navegador.' },
    ],
    related: ['pdf-para-word', 'pdf-para-jpg', '', 'dividir-pdf'],
  },

  /* ============================== PDF → WORD ============================ */
  {
    slug: 'pdf-para-word',
    engine: 'pdf2docx',
    category: 'converter-de',
    icon: 'word',
    name: 'PDF para Word',
    cardText: 'Gere um .docx editável a partir do texto do documento.',
    cardKw: 'converter pdf em word grátis',
    title: 'PDF para Word Online Grátis — Converter PDF em DOCX Editável',
    description:
      'Converta o texto de um PDF em um documento Word (.docx) editável, direto no navegador. Grátis, sem cadastro e sem enviar o arquivo para servidores.',
    keywords: ['pdf para word', 'converter pdf em word', 'pdf para docx', 'pdf editável word', 'transformar pdf em word grátis'],
    h1: 'Converter PDF para Word',
    eyebrow: 'Gera um .docx que abre no Word, Google Docs e LibreOffice',
    lede: 'Recupere o texto de um PDF em um arquivo Word editável — sem enviar o documento para nenhum servidor, o que muda tudo quando o conteúdo é sigiloso.',
    ui: { accept: '.pdf,application/pdf', multiple: false, cta: 'Converter para Word', dropTitle: 'Arraste o PDF aqui', dropHint: 'ou toque para escolher o arquivo' },
    intro:
      '<p>Você recebeu um contrato em PDF e precisa alterar duas cláusulas. Ou tem um relatório antigo cujo arquivo original se perdeu. <strong>Converter PDF para Word</strong> devolve o texto em um documento que você consegue editar de novo.</p><p>Praticamente todos os conversores de PDF para Word gratuitos enviam o seu documento para um servidor. Este não: o <code>.docx</code> é montado dentro do navegador.</p>',
    sections: [
      {
        h2: 'O que esperar da conversão',
        html: '<p>Seja franco com a expectativa, porque nenhum conversor entrega milagre — nem os pagos. O PDF não guarda parágrafos, estilos e tabelas como o Word guarda; ele guarda posições de caracteres em uma página. Converter é, na prática, <strong>reconstruir</strong> um documento a partir disso.</p><p>Nossa conversão prioriza o que mais importa na prática: <strong>o texto correto, na ordem certa, editável</strong>, com a separação de parágrafos e a quebra de página preservadas. Você recebe um .docx limpo, onde pode reformatar o que precisar.</p><p>O que <strong>não</strong> é reproduzido: colunas, tabelas com bordas, posicionamento exato de imagens e fontes originais. Se o seu objetivo é manter o layout idêntico, o formato certo continua sendo o próprio PDF.</p>',
      },
      {
        h2: 'PDF digitalizado não converte',
        html: '<p>Vale o mesmo alerta da ferramenta de <a href="/pdf-para-texto/">extrair texto</a>: se o PDF veio de um scanner ou de uma foto, ele contém imagens, não texto. Não há o que converter, e qualquer serviço que prometa o contrário está usando OCR — com a taxa de erro que o OCR tem.</p><p>Teste rápido: se você não consegue selecionar uma palavra com o mouse dentro do PDF, ele é digitalizado. Nesse caso a ferramenta avisa em vez de gerar um documento vazio.</p>',
      },
      {
        h2: 'Como editar depois',
        html: '<p>O arquivo gerado é um <code>.docx</code> padrão, compatível com Microsoft Word, Google Docs, LibreOffice Writer, Pages e WPS Office. No celular, abre no Word do Android/iOS ou no Google Docs sem conversão adicional.</p><p>Depois de editar, se precisar voltar para PDF, use a ferramenta <a href="/word-para-pdf/">Word para PDF</a>.</p>',
      },
    ],
    howto: {
      name: 'Como converter PDF em Word',
      description: 'Transforme o texto de um PDF em um documento Word editável, direto no navegador.',
      steps: [
        { name: 'Escolha o PDF', text: 'Arraste o arquivo para a ferramenta ou toque para selecioná-lo.' },
        { name: 'Converta', text: 'Clique em converter. O texto é lido e um documento .docx é montado no seu navegador.' },
        { name: 'Baixe e edite', text: 'Baixe o arquivo e abra no Word, no Google Docs ou no LibreOffice para editar.' },
      ],
    },
    faq: [
      { q: 'Como converter PDF em Word gratuitamente?', a: 'Abra o PDF nesta página e clique em converter. Um arquivo .docx editável é gerado no seu navegador, sem cadastro e sem custo.' },
      { q: 'A formatação original é mantida?', a: 'O texto, a ordem e a divisão em parágrafos e páginas são preservados. Colunas, tabelas com bordas e posicionamento de imagens não são reproduzidos — isso vale para qualquer conversor, inclusive os pagos.' },
      { q: 'Funciona com PDF digitalizado?', a: 'Não. Documentos escaneados são imagens e não contêm texto para converter. A ferramenta avisa quando detecta esse caso.' },
      { q: 'O arquivo abre no Google Docs?', a: 'Sim. O .docx gerado é padrão e abre no Word, Google Docs, LibreOffice, Pages e WPS.' },
      { q: 'Meu documento é enviado para algum servidor?', a: 'Não. Diferente da maioria dos conversores, a leitura e a montagem do .docx acontecem inteiramente no seu navegador.' },
    ],
    related: ['word-para-pdf', 'pdf-para-texto', '', 'comprimir-pdf'],
  },

  /* ============================== WORD → PDF ============================ */
  {
    slug: 'word-para-pdf',
    engine: 'docx2pdf',
    category: 'converter-em',
    icon: 'word',
    name: 'Word para PDF',
    cardText: 'Converta documentos .docx em PDF pronto para enviar.',
    cardKw: 'word para pdf sem perder formatação',
    title: 'Word para PDF Online Grátis — Converter DOCX em PDF',
    description:
      'Converta documentos Word (.docx) em PDF direto no navegador, sem cadastro e sem enviar o arquivo para servidores. Grátis e sem marca d’água.',
    keywords: ['word para pdf', 'converter word em pdf', 'docx para pdf', 'transformar word em pdf', 'salvar word como pdf'],
    h1: 'Converter Word para PDF',
    eyebrow: 'Sem instalar Office · Funciona no celular',
    lede: 'Transforme um .docx em PDF para enviar, protocolar ou imprimir — sem depender do Word instalado nem subir o arquivo para lugar nenhum.',
    ui: { accept: '.docx,application/vnd.openxmlformats-officedocument.wordprocessingml.document', multiple: false, cta: 'Converter para PDF', dropTitle: 'Arraste o arquivo .docx aqui', dropHint: 'ou toque para escolher o arquivo' },
    intro:
      '<p>Mandar um documento em Word é arriscado: a formatação muda conforme a versão do programa, quem recebe pode editar sem querer e no celular alheio a fonte simplesmente não existe. Por isso o padrão de entrega é o PDF.</p><p>Se você tem o Word instalado, o caminho mais fiel continua sendo “Salvar como PDF” por lá. Esta ferramenta existe para quando isso não é possível — no celular, em um computador sem Office, ou quando você não quer enviar o documento para um conversor online.</p>',
    sections: [
      {
        h2: 'O que é convertido',
        html: '<p>A ferramenta lê o conteúdo do <code>.docx</code> e reconstrói o documento em PDF preservando: parágrafos e sua sequência, títulos e subtítulos, <strong>negrito</strong> e <em>itálico</em>, listas com marcador e numeradas, alinhamento e quebras de página.</p><p>Layouts complexos — tabelas com muitas colunas, caixas de texto posicionadas, cabeçalho e rodapé elaborados, fontes incomuns — são simplificados. Para documentos de texto corrido, que é a maioria esmagadora dos casos, o resultado sai fiel.</p><blockquote><p>O formato antigo <code>.doc</code> (anterior ao Office 2007) não é suportado. Abra o arquivo no Word ou no Google Docs e salve como <code>.docx</code> antes de converter.</p></blockquote>',
      },
      {
        h2: 'Alternativas quando a fidelidade é crítica',
        html: '<p>Se o documento tem diagramação complexa e precisa sair exatamente igual:</p><ul><li><strong>Microsoft Word:</strong> Arquivo → Salvar como → PDF. É a conversão mais fiel possível.</li><li><strong>Google Docs:</strong> envie o .docx para o Drive, abra e use Arquivo → Fazer download → PDF. Gratuito e bem fiel.</li><li><strong>LibreOffice:</strong> Arquivo → Exportar como PDF. Gratuito, funciona offline em qualquer sistema.</li></ul><p>Dizemos isso abertamente porque preferimos que você resolva o problema a que use uma ferramenta inadequada para o seu caso. Para texto corrido — contratos, cartas, relatórios, trabalhos — a conversão daqui atende bem e não expõe o seu arquivo.</p>',
      },
    ],
    howto: {
      name: 'Como converter Word em PDF',
      description: 'Transforme um documento .docx em PDF direto no navegador, sem instalar programas.',
      steps: [
        { name: 'Escolha o arquivo .docx', text: 'Arraste o documento Word para a ferramenta ou toque para selecioná-lo.' },
        { name: 'Converta', text: 'Clique em converter. O conteúdo é lido e o PDF é montado no seu navegador.' },
        { name: 'Baixe o PDF', text: 'Baixe o arquivo pronto para enviar, protocolar ou imprimir.' },
      ],
    },
    faq: [
      { q: 'Como transformar Word em PDF sem instalar nada?', a: 'Abra o .docx nesta página e clique em converter. O PDF é gerado no próprio navegador e baixado na hora.' },
      { q: 'A formatação é mantida?', a: 'Parágrafos, títulos, negrito, itálico, listas e quebras de página são preservados. Layouts com tabelas complexas e caixas de texto são simplificados.' },
      { q: 'Funciona com arquivos .doc antigos?', a: 'Não. Abra o arquivo no Word ou no Google Docs e salve como .docx antes de converter.' },
      { q: 'Dá para converter pelo celular?', a: 'Sim. Abra o site no navegador e escolha o .docx pelo gerenciador de arquivos ou pelo Google Drive.' },
      { q: 'O documento é enviado para algum servidor?', a: 'Não. A leitura do .docx e a geração do PDF acontecem no seu navegador.' },
    ],
    related: ['pdf-para-word', '', 'jpg-para-pdf', 'comprimir-pdf'],
  },
];

/** Announced but not yet shipped — rendered as disabled cards, never linked or indexed. */
export const upcomingTools = [
  { name: 'Proteger PDF', icon: 'lock', category: 'seguranca', cardText: 'Adicionar senha de abertura ao documento.' },
  { name: 'Desbloquear PDF', icon: 'unlock', category: 'seguranca', cardText: 'Remover a senha de um PDF que você possui.' },
  { name: 'PDF para Excel', icon: 'pages', category: 'converter-de', cardText: 'Converter tabelas de PDF em planilhas.' },
  { name: 'OCR — PDF pesquisável', icon: 'text', category: 'converter-de', cardText: 'Reconhecer texto em documentos digitalizados.' },
];
