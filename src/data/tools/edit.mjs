/** Page-level editing tools: rotate, organise, remove, extract, number, watermark, sign. */

export const editTools = [
  /* ============================== GIRAR ================================= */
  {
    slug: 'girar-pdf',
    engine: 'rotate',
    category: 'organizar',
    icon: 'rotate',
    name: 'Girar PDF',
    cardText: 'Corrija a orientação de páginas digitalizadas de lado ou de cabeça para baixo.',
    cardKw: 'girar pdf e salvar',
    title: 'Girar PDF Online Grátis — Virar Páginas e Salvar',
    description:
      'Gire as páginas de um PDF em 90°, 180° ou 270° e salve o arquivo já corrigido. Grátis, sem cadastro e sem enviar o documento para servidores.',
    keywords: ['girar pdf', 'girar pdf e salvar', 'virar pdf', 'rotacionar pdf', 'pdf de lado', 'endireitar pdf'],
    h1: 'Girar PDF online grátis',
    eyebrow: 'Gira e salva de verdade — não é só a visualização',
    lede: 'Corrija páginas escaneadas de lado ou de cabeça para baixo e baixe o PDF já com a orientação certa, gravada no arquivo.',
    ui: { accept: '.pdf,application/pdf', multiple: false, cta: 'Girar e baixar PDF', dropTitle: 'Arraste o PDF para girar', dropHint: 'ou toque para escolher o arquivo' },
    intro:
      '<p>Quase todo scanner de mesa e aplicativo de digitalização erra a orientação em algum momento: metade das páginas sai deitada, outra de cabeça para baixo. Girar no leitor de PDF resolve só na tela — ao reabrir ou imprimir, o documento volta torto.</p><p>Esta ferramenta <strong>grava a rotação dentro do arquivo</strong>. O PDF baixado abre correto em qualquer leitor, em qualquer aparelho, e imprime na orientação certa.</p>',
    sections: [
      {
        h2: 'Girar todas as páginas ou só algumas',
        html: '<p>Você escolhe o ângulo — 90° à direita, 90° à esquerda ou 180° — e decide onde aplicar:</p><ul><li><strong>Todas as páginas</strong>, quando o documento inteiro saiu deitado.</li><li><strong>Apenas as páginas ímpares ou pares</strong>, o caso clássico de digitalização frente e verso em que um dos lados sai invertido.</li><li><strong>Um intervalo específico</strong>, como <code>3-7, 12</code>, quando só algumas folhas ficaram tortas.</li></ul><p>As miniaturas mostram o resultado antes de você baixar, então dá para conferir sem gerar o arquivo várias vezes.</p>',
      },
      {
        h2: 'Por que girar no leitor não resolve',
        html: '<p>Leitores como o Adobe Reader, o Chrome e o Pré-Visualização do Mac têm um botão de girar que muda apenas a forma como a página aparece naquela sessão. A informação não é salva no arquivo, a não ser que você use “Salvar como” em um editor completo.</p><p>Um PDF guarda a orientação de cada página em uma propriedade chamada <code>/Rotate</code>. É exatamente ela que esta ferramenta altera — por isso o resultado é permanente e viaja junto com o arquivo quando você envia por e-mail ou anexa em um sistema.</p>',
      },
    ],
    howto: {
      name: 'Como girar um PDF e salvar',
      description: 'Corrija a orientação das páginas de um PDF e baixe o arquivo já com a rotação gravada.',
      steps: [
        { name: 'Escolha o PDF', text: 'Arraste o arquivo para a ferramenta ou toque para selecioná-lo.' },
        { name: 'Escolha o ângulo e as páginas', text: 'Selecione 90°, 180° ou 270° e indique se a rotação vale para todas as páginas, para ímpares/pares ou para um intervalo.' },
        { name: 'Baixe o PDF girado', text: 'Confira as miniaturas e baixe o arquivo já com a orientação correta gravada.' },
      ],
    },
    faq: [
      { q: 'Como girar um PDF e salvar permanentemente?', a: 'Envie o arquivo, escolha o ângulo e baixe o resultado. A rotação é gravada dentro do PDF, então vale em qualquer leitor e também na impressão.' },
      { q: 'Dá para girar só algumas páginas?', a: 'Sim. Você pode aplicar a todas, só nas ímpares, só nas pares ou em um intervalo como 3-7, 12.' },
      { q: 'Girar o PDF piora a qualidade?', a: 'Não. Apenas a propriedade de orientação da página é alterada; o conteúdo não é reprocessado.' },
      { q: 'Meu arquivo é enviado para algum servidor?', a: 'Não. A rotação acontece inteiramente no seu navegador.' },
    ],
    related: ['organizar-pdf', '', 'dividir-pdf', 'comprimir-pdf'],
  },

  /* ============================== ORGANIZAR ============================= */
  {
    slug: 'organizar-pdf',
    engine: 'organize',
    category: 'organizar',
    icon: 'pages',
    name: 'Organizar PDF',
    cardText: 'Reordene, gire e apague páginas olhando as miniaturas do documento.',
    cardKw: 'reordenar páginas pdf',
    title: 'Organizar PDF Online — Reordenar e Apagar Páginas',
    description:
      'Veja as miniaturas do seu PDF e reorganize, gire ou apague páginas arrastando. Grátis, sem cadastro e sem enviar o arquivo para servidores.',
    keywords: ['organizar pdf', 'reordenar páginas pdf', 'mudar ordem páginas pdf', 'inverter páginas pdf', 'editar páginas pdf'],
    h1: 'Organizar páginas do PDF',
    eyebrow: 'Visual · Arraste para reordenar',
    lede: 'Uma miniatura por página: arraste para mudar a ordem, gire as tortas, apague as que sobram e baixe o documento reorganizado.',
    ui: { accept: '.pdf,application/pdf', multiple: false, cta: 'Salvar e baixar PDF', dropTitle: 'Arraste o PDF para organizar', dropHint: 'ou toque para escolher o arquivo' },
    intro:
      '<p>Quando o problema não é o conteúdo e sim a <strong>ordem</strong> das páginas, editar o documento inteiro é desperdício. Esta ferramenta mostra o PDF como um painel de miniaturas e deixa você mexer nele como quem organiza fotos.</p>',
    sections: [
      {
        h2: 'O que dá para fazer aqui',
        html: '<ul><li><strong>Reordenar</strong> páginas arrastando as miniaturas — no celular funciona com o toque longo.</li><li><strong>Girar</strong> páginas individualmente, sem afetar as outras.</li><li><strong>Apagar</strong> páginas em branco, duplicadas ou que não fazem parte do documento final.</li><li><strong>Inverter</strong> a ordem de todas as páginas de uma vez, útil em documentos digitalizados de trás para frente.</li></ul><p>Nada é aplicado no arquivo original: ao clicar em salvar, um novo PDF é montado com as páginas na configuração que você deixou na tela.</p>',
      },
      {
        h2: 'Casos em que essa é a ferramenta certa',
        html: '<p>Digitalizações em alimentador automático são a origem mais comum: o aparelho puxa as folhas de trás para frente, duplica uma página ou escaneia a folha em branco do verso. Em vez de refazer a digitalização, você resolve tudo aqui em um minuto.</p><p>Também é o caminho quando um documento foi montado com a ordem errada — anexos antes da petição, capa no fim — e você precisa só reposicionar sem mexer no conteúdo.</p>',
      },
    ],
    howto: {
      name: 'Como reorganizar as páginas de um PDF',
      description: 'Reordene, gire e apague páginas de um PDF usando miniaturas, direto no navegador.',
      steps: [
        { name: 'Abra o PDF na ferramenta', text: 'Arraste o arquivo para a área de seleção e aguarde as miniaturas aparecerem.' },
        { name: 'Ajuste as páginas', text: 'Arraste para reordenar, use os botões para girar e clique no X para apagar as páginas indesejadas.' },
        { name: 'Salve o documento', text: 'Clique em salvar para gerar o novo PDF com as páginas na ordem definida.' },
      ],
    },
    faq: [
      { q: 'Como mudar a ordem das páginas de um PDF?', a: 'Abra o arquivo na ferramenta e arraste as miniaturas para a posição desejada. Ao salvar, o novo PDF sai na ordem que ficou na tela.' },
      { q: 'Dá para inverter todas as páginas de uma vez?', a: 'Sim, há um botão que inverte a ordem completa do documento — útil em digitalizações feitas de trás para frente.' },
      { q: 'As miniaturas demoram para carregar em arquivos grandes?', a: 'Elas são geradas no seu aparelho, então documentos com centenas de páginas levam alguns segundos. O carregamento é progressivo e você já pode mexer nas primeiras.' },
      { q: 'O arquivo é enviado para algum servidor?', a: 'Não. A leitura das páginas e a montagem do novo PDF acontecem no navegador.' },
    ],
    related: ['', 'remover-paginas-pdf', 'girar-pdf', 'dividir-pdf', 'extrair-paginas-pdf'],
  },

  /* ============================== REMOVER =============================== */
  {
    slug: 'remover-paginas-pdf',
    engine: 'removepages',
    category: 'organizar',
    icon: 'trash',
    name: 'Remover páginas',
    cardText: 'Apague páginas específicas e baixe o documento sem elas.',
    cardKw: 'apagar página de pdf',
    title: 'Remover Páginas de PDF Online Grátis — Apagar Páginas',
    description:
      'Apague páginas indesejadas de um PDF e baixe o arquivo sem elas. Grátis, sem cadastro e sem enviar o documento para servidores.',
    keywords: ['remover páginas pdf', 'apagar página pdf', 'excluir páginas pdf', 'deletar página pdf', 'tirar página do pdf'],
    h1: 'Remover páginas de um PDF',
    eyebrow: 'Digite os números e pronto',
    lede: 'Apague páginas em branco, duplicadas ou que não devem ir junto — o resto do documento continua exatamente igual.',
    ui: { accept: '.pdf,application/pdf', multiple: false, cta: 'Remover e baixar PDF', dropTitle: 'Arraste o PDF aqui', dropHint: 'ou toque para escolher o arquivo' },
    intro:
      '<p>Digitalizou o documento inteiro e agora precisa tirar a folha em branco do verso, a página de rosto do scanner ou o anexo que não pode ser enviado. Digite os números das páginas e baixe o PDF sem elas — o conteúdo restante fica idêntico ao original.</p>',
    sections: [
      {
        h2: 'Como indicar as páginas a remover',
        html: '<p>Aceita número solto, lista e intervalo, na mesma caixa: <code>2</code>, <code>2, 5, 9</code> ou <code>10-14</code> — e também tudo junto, como <code>1, 4-6, 20</code>. As miniaturas marcam em vermelho o que será apagado, para você conferir antes de gerar o arquivo.</p><p>Quer o contrário — ficar só com algumas páginas e descartar o resto? Use <a href="/extrair-paginas-pdf/">extrair páginas do PDF</a>, que é mais direto quando as páginas a manter são poucas.</p>',
      },
      {
        h2: 'Remover páginas não é o mesmo que ocultar informação',
        html: '<p>Vale um alerta importante para documentos sensíveis: remover a página tira o conteúdo daquela folha, mas <strong>tarjar uma informação no meio de uma página é outra coisa</strong>. Desenhar um retângulo preto por cima em um editor comum não apaga o texto — ele continua selecionável embaixo da tarja.</p><p>Se a sua necessidade é suprimir dados pessoais de dentro de uma página, o caminho seguro é remover a página inteira ou converter o documento em imagem com a ferramenta de <a href="/comprimir-pdf/">comprimir PDF</a>, que regrava as páginas e elimina a camada de texto.</p>',
      },
    ],
    howto: {
      name: 'Como apagar páginas de um PDF',
      description: 'Remova páginas específicas de um arquivo PDF direto no navegador.',
      steps: [
        { name: 'Escolha o PDF', text: 'Arraste o arquivo para a ferramenta ou toque para selecioná-lo.' },
        { name: 'Digite as páginas a remover', text: 'Informe os números, como 2, 5 ou 10-14. As miniaturas mostram em vermelho o que será apagado.' },
        { name: 'Baixe o PDF sem as páginas', text: 'Clique em remover e baixe o documento já sem as páginas indicadas.' },
      ],
    },
    faq: [
      { q: 'Como apagar uma página de um PDF?', a: 'Abra o arquivo na ferramenta, digite o número da página no campo indicado e clique em remover. O PDF baixado sai sem ela.' },
      { q: 'Posso remover várias páginas de uma vez?', a: 'Sim. Use vírgula e hífen na mesma caixa, por exemplo 1, 4-6, 20.' },
      { q: 'O restante do documento muda?', a: 'Não. As páginas mantidas são copiadas sem recompressão — texto, imagens e formatação continuam idênticos.' },
      { q: 'O arquivo é enviado para algum servidor?', a: 'Não. A remoção acontece no seu próprio navegador.' },
    ],
    related: ['organizar-pdf', 'extrair-paginas-pdf', 'dividir-pdf', ''],
  },

  /* ============================== EXTRAIR =============================== */
  {
    slug: 'extrair-paginas-pdf',
    engine: 'extractpages',
    category: 'organizar',
    icon: 'extract',
    name: 'Extrair páginas',
    cardText: 'Guarde só as páginas que interessam em um novo arquivo.',
    cardKw: 'extrair página de pdf',
    title: 'Extrair Páginas de PDF Online Grátis — Salvar Só o que Precisa',
    description:
      'Separe apenas as páginas que você precisa de um PDF e salve em um novo arquivo. Grátis, sem cadastro e sem upload para servidores.',
    keywords: ['extrair páginas pdf', 'extrair página de pdf', 'salvar página pdf separada', 'copiar página pdf', 'tirar páginas de um pdf'],
    h1: 'Extrair páginas de um PDF',
    eyebrow: 'Um novo PDF só com o que você escolher',
    lede: 'Informe as páginas que interessam e receba um documento novo apenas com elas, na ordem que você definir.',
    ui: { accept: '.pdf,application/pdf', multiple: false, cta: 'Extrair e baixar', dropTitle: 'Arraste o PDF aqui', dropHint: 'ou toque para escolher o arquivo' },
    intro:
      '<p>De um processo de 300 páginas você precisa só das cinco do laudo. De um contrato inteiro, só da página com a assinatura. <strong>Extrair páginas</strong> devolve um PDF novo apenas com o que você indicou, mantendo a qualidade original.</p>',
    sections: [
      {
        h2: 'Extrair, dividir ou remover?',
        html: '<p>As três ferramentas fazem coisas parecidas e vale escolher a certa:</p><table><thead><tr><th>Você quer</th><th>Use</th></tr></thead><tbody><tr><td>Um arquivo só com as páginas 8, 9 e 10</td><td><strong>Extrair páginas</strong> (esta página)</td></tr><tr><td>O documento inteiro, menos a página 3</td><td><a href="/remover-paginas-pdf/">Remover páginas</a></td></tr><tr><td>Quebrar um PDF em vários arquivos</td><td><a href="/dividir-pdf/">Dividir PDF</a></td></tr><tr><td>Reordenar e apagar vendo as miniaturas</td><td><a href="/organizar-pdf/">Organizar PDF</a></td></tr></tbody></table>',
      },
      {
        h2: 'A ordem que você digita é a ordem do resultado',
        html: '<p>Se você escrever <code>9, 3, 5</code>, o PDF final terá a página 9 primeiro, depois a 3 e depois a 5. Isso permite extrair e reordenar em uma única operação — prático para montar um resumo com as páginas relevantes de um documento longo na sequência que faz sentido para quem vai ler.</p><p>Também aceita intervalos invertidos, como <code>10-1</code>, que devolve essas dez páginas em ordem decrescente.</p>',
      },
    ],
    howto: {
      name: 'Como extrair páginas de um PDF',
      description: 'Salve apenas as páginas escolhidas de um PDF em um novo arquivo, direto no navegador.',
      steps: [
        { name: 'Escolha o PDF', text: 'Arraste o arquivo para a ferramenta ou toque para selecioná-lo.' },
        { name: 'Digite as páginas que quer manter', text: 'Informe os números ou intervalos, como 8-10 ou 3, 7, 15. A ordem digitada é a ordem do resultado.' },
        { name: 'Baixe o novo PDF', text: 'Clique em extrair e baixe o arquivo contendo apenas as páginas escolhidas.' },
      ],
    },
    faq: [
      { q: 'Como salvar só uma página de um PDF?', a: 'Abra o arquivo, digite o número dessa página e clique em extrair. Você recebe um PDF com uma única página.' },
      { q: 'Posso mudar a ordem ao extrair?', a: 'Sim. A sequência que você digitar é a sequência do arquivo final — digite 9, 3, 5 para obter exatamente essa ordem.' },
      { q: 'A qualidade é mantida?', a: 'Sim. As páginas são copiadas do original sem recompressão.' },
      { q: 'O arquivo é enviado para algum servidor?', a: 'Não. A extração acontece dentro do seu navegador.' },
    ],
    related: ['dividir-pdf', 'remover-paginas-pdf', 'organizar-pdf', ''],
  },

  /* ============================== NUMERAR =============================== */
  {
    slug: 'numerar-paginas-pdf',
    engine: 'pagenumbers',
    category: 'editar',
    icon: 'number',
    name: 'Numerar páginas',
    cardText: 'Insira numeração em qualquer posição, com o formato que precisar.',
    cardKw: 'numerar páginas de pdf',
    title: 'Numerar Páginas de PDF Online Grátis — Inserir Numeração',
    description:
      'Adicione numeração às páginas de um PDF escolhendo posição, formato e página inicial. Grátis, sem cadastro e sem enviar o arquivo para servidores.',
    keywords: ['numerar páginas pdf', 'inserir numeração pdf', 'numeração de páginas pdf', 'paginar pdf', 'colocar número de página pdf'],
    h1: 'Numerar páginas de um PDF',
    eyebrow: 'Posição, formato e página inicial configuráveis',
    lede: 'Insira numeração em documentos que serão protocolados, encadernados ou entregues — com o formato exigido pela norma ou pelo edital.',
    ui: { accept: '.pdf,application/pdf', multiple: false, cta: 'Numerar e baixar PDF', dropTitle: 'Arraste o PDF para numerar', dropHint: 'ou toque para escolher o arquivo' },
    intro:
      '<p>Petições, trabalhos acadêmicos, processos administrativos e prestações de contas quase sempre exigem páginas numeradas. Quando o PDF foi montado a partir de vários arquivos, essa numeração simplesmente não existe — e refazer tudo no Word não é opção.</p><p>Aqui você adiciona a numeração por cima do documento pronto, em segundos.</p>',
    sections: [
      {
        h2: 'O que dá para configurar',
        html: '<ul><li><strong>Posição:</strong> rodapé ou cabeçalho, alinhado à esquerda, ao centro ou à direita.</li><li><strong>Formato:</strong> apenas o número (<code>7</code>), com o total (<code>7 de 32</code>), entre barras (<code>— 7 —</code>) ou com prefixo personalizado, como <code>Fls. 7</code>.</li><li><strong>Página inicial:</strong> comece a contar da página que quiser, para pular capa e folha de rosto.</li><li><strong>Primeiro número:</strong> se a numeração precisa começar em 15 porque é a continuação de outro volume, basta informar.</li><li><strong>Tamanho e margem</strong> do texto, para respeitar a área útil do documento.</li></ul>',
      },
      {
        h2: 'Numeração de folhas em processos',
        html: '<p>Em processos judiciais e administrativos o padrão costuma ser <code>Fls. 1</code>, <code>Fls. 2</code> e assim por diante, no canto superior direito. Use o formato com prefixo, posição “cabeçalho à direita” e comece a contar na primeira folha após a capa, conforme a orientação do órgão.</p><p>Se o documento foi montado com a ferramenta de <a href="/">juntar PDF</a>, numere <strong>depois</strong> de unir tudo — assim a contagem corre corretamente do começo ao fim.</p>',
      },
    ],
    howto: {
      name: 'Como numerar as páginas de um PDF',
      description: 'Adicione numeração às páginas de um PDF escolhendo posição, formato e página inicial.',
      steps: [
        { name: 'Escolha o PDF', text: 'Arraste o arquivo para a ferramenta ou toque para selecioná-lo.' },
        { name: 'Configure a numeração', text: 'Defina a posição, o formato do número, a partir de qual página começar e o número inicial.' },
        { name: 'Baixe o PDF numerado', text: 'Clique em numerar e baixe o documento já com a numeração aplicada.' },
      ],
    },
    faq: [
      { q: 'Como inserir numeração em um PDF pronto?', a: 'Abra o arquivo nesta ferramenta, escolha posição e formato e clique em numerar. A numeração é desenhada por cima das páginas e gravada no arquivo baixado.' },
      { q: 'Dá para começar a numerar a partir da página 3?', a: 'Sim. Informe em “começar na página” o número da primeira folha que deve receber numeração — as anteriores ficam sem número.' },
      { q: 'Posso usar o formato “Fls. 1”?', a: 'Sim. Escolha o formato com prefixo e escreva o texto que quiser antes do número.' },
      { q: 'A numeração cobre o conteúdo da página?', a: 'Ela é posicionada na margem. Se o documento tiver pouca margem, reduza o tamanho da fonte ou aumente o afastamento nas opções.' },
    ],
    related: ['', 'marca-dagua-pdf', 'organizar-pdf', 'dividir-pdf'],
  },

  /* ============================== MARCA D'ÁGUA ========================== */
  {
    slug: 'marca-dagua-pdf',
    engine: 'watermark',
    category: 'editar',
    icon: 'water',
    name: 'Marca d’água',
    cardText: 'Escreva CONFIDENCIAL, CÓPIA ou o texto que precisar sobre as páginas.',
    cardKw: 'marca d’água em pdf',
    title: 'Marca d’Água em PDF Online Grátis — Inserir Texto nas Páginas',
    description:
      'Adicione marca d’água de texto em todas as páginas de um PDF, com controle de transparência, ângulo e tamanho. Grátis e sem upload.',
    keywords: ['marca d’água pdf', 'marca dagua pdf', 'inserir marca d’água pdf', 'pdf confidencial', 'carimbo em pdf'],
    h1: 'Colocar marca d’água em PDF',
    eyebrow: 'Texto, transparência e ângulo à sua escolha',
    lede: 'Marque documentos como CONFIDENCIAL, CÓPIA, RASCUNHO ou com o nome da sua empresa em todas as páginas de uma vez.',
    ui: { accept: '.pdf,application/pdf', multiple: false, cta: 'Aplicar e baixar PDF', dropTitle: 'Arraste o PDF aqui', dropHint: 'ou toque para escolher o arquivo' },
    intro:
      '<p>Marca d’água serve para dizer, em cima do próprio documento, o que ele é: uma cópia, um rascunho, um material confidencial ou uma versão que não deve circular. Esta ferramenta escreve o texto sobre todas as páginas com transparência ajustável, sem alterar o conteúdo abaixo.</p>',
    sections: [
      {
        h2: 'Opções disponíveis',
        html: '<ul><li><strong>Texto livre</strong> — de <code>CONFIDENCIAL</code> ao nome do seu escritório e a data.</li><li><strong>Transparência</strong> de 5% a 100%, para a marca não atrapalhar a leitura.</li><li><strong>Ângulo</strong> na diagonal (o padrão, 45°) ou na horizontal.</li><li><strong>Tamanho</strong> da fonte e <strong>cor</strong> (cinza, vermelho ou azul).</li><li><strong>Posição</strong> centralizada ou repetida em mosaico por toda a página.</li></ul><p>A marca é gravada como conteúdo real do PDF, então aparece na impressão e continua lá quando o arquivo é aberto em outro aparelho.</p>',
      },
      {
        h2: 'Marca d’água não é proteção',
        html: '<p>É importante não confundir as duas coisas. A marca d’água <strong>comunica</strong> uma condição — que aquilo é cópia, rascunho ou material restrito — e desestimula o uso indevido. Ela não impede que alguém abra, copie, imprima ou edite o arquivo.</p><p>Se a necessidade é impedir o acesso, o que se usa é senha de abertura, e isso depende de criptografia do próprio PDF. Se a necessidade é evitar que o texto seja copiado, o caminho é transformar as páginas em imagem — o que a ferramenta de <a href="/comprimir-pdf/">comprimir PDF</a> faz como efeito colateral.</p>',
      },
    ],
    howto: {
      name: 'Como colocar marca d’água em um PDF',
      description: 'Adicione um texto de marca d’água sobre todas as páginas de um PDF, direto no navegador.',
      steps: [
        { name: 'Escolha o PDF', text: 'Arraste o arquivo para a ferramenta ou toque para selecioná-lo.' },
        { name: 'Escreva o texto e ajuste', text: 'Digite a marca d’água e ajuste transparência, ângulo, cor e tamanho conforme o documento.' },
        { name: 'Baixe o PDF marcado', text: 'Clique em aplicar e baixe o arquivo com a marca d’água gravada em todas as páginas.' },
      ],
    },
    faq: [
      { q: 'Como colocar CONFIDENCIAL em um PDF?', a: 'Abra o arquivo, digite CONFIDENCIAL no campo de texto, ajuste a transparência e clique em aplicar. A marca é inserida em todas as páginas.' },
      { q: 'A marca d’água atrapalha a leitura?', a: 'Depende da transparência. Entre 10% e 25% costuma ficar visível sem prejudicar o texto do documento.' },
      { q: 'Dá para remover a marca d’água depois?', a: 'Não por esta ferramenta. Guarde sempre o arquivo original antes de aplicar.' },
      { q: 'Posso usar imagem ou logotipo como marca?', a: 'No momento a marca é de texto. Para inserir um logotipo, converta-o em PDF e use a ferramenta de juntar como página de rosto.' },
    ],
    related: ['numerar-paginas-pdf', '', 'comprimir-pdf', 'organizar-pdf'],
  },

  /* ============================== ASSINAR =============================== */
  {
    slug: 'assinar-pdf',
    engine: 'sign',
    category: 'editar',
    icon: 'sign',
    name: 'Assinar PDF',
    cardText: 'Desenhe ou digite sua assinatura e posicione na página.',
    cardKw: 'assinar pdf sem imprimir',
    title: 'Assinar PDF Online Grátis — Sem Imprimir e Sem Escanear',
    description:
      'Assine um PDF desenhando com o dedo ou o mouse e posicione a assinatura onde quiser. Grátis, sem cadastro e sem enviar o documento para servidores.',
    keywords: ['assinar pdf', 'assinar pdf online', 'assinatura em pdf', 'assinar pdf sem imprimir', 'assinar documento pdf celular'],
    h1: 'Assinar PDF online grátis',
    eyebrow: 'Desenhe com o dedo · Sem imprimir, sem escanear',
    lede: 'Coloque sua assinatura em um documento sem sair do navegador — nem o PDF nem a assinatura são enviados para lugar nenhum.',
    ui: { accept: '.pdf,application/pdf', multiple: false, cta: 'Assinar e baixar PDF', dropTitle: 'Arraste o PDF para assinar', dropHint: 'ou toque para escolher o arquivo' },
    intro:
      '<p>O ciclo de imprimir, assinar, escanear e reenviar consome tempo e degrada o documento. Aqui você desenha a assinatura com o dedo no celular ou com o mouse no computador, arrasta até o lugar certo da página e baixa o PDF assinado.</p>',
    sections: [
      {
        h2: 'Como assinar',
        html: '<p>Depois de abrir o PDF, escolha a página, desenhe a assinatura no quadro (ou digite seu nome e escolha um estilo de caligrafia) e arraste a assinatura até a posição desejada sobre a miniatura da página. Dá para redimensionar antes de gravar.</p><p>A assinatura é inserida como imagem transparente sobre a página, exatamente onde você posicionou, e o arquivo final é montado no seu aparelho.</p>',
      },
      {
        h2: 'Assinatura desenhada × assinatura digital com certificado',
        html: '<p>Esta é uma <strong>assinatura eletrônica simples</strong>: a imagem da sua assinatura aplicada ao documento. É aceita em uma enorme quantidade de situações do dia a dia — contratos entre particulares, autorizações, formulários escolares, propostas comerciais — e tem validade jurídica quando as partes concordam com o meio, conforme a legislação brasileira sobre assinaturas eletrônicas.</p><p>Ela <strong>não substitui</strong> a assinatura digital com certificado ICP-Brasil (e-CPF, e-CNPJ) nem o Gov.br, que usam criptografia para provar autoria e detectar alteração posterior. Quando o órgão ou o contrato exigir certificado digital, use as plataformas oficiais — nenhuma ferramenta de navegador pode fazer isso por você.</p>',
      },
    ],
    howto: {
      name: 'Como assinar um PDF sem imprimir',
      description: 'Insira sua assinatura em um documento PDF usando o dedo ou o mouse, direto no navegador.',
      steps: [
        { name: 'Abra o PDF', text: 'Arraste o documento para a ferramenta ou toque para selecioná-lo.' },
        { name: 'Desenhe sua assinatura', text: 'Assine no quadro com o dedo, a caneta ou o mouse — ou digite seu nome e escolha um estilo.' },
        { name: 'Posicione e baixe', text: 'Arraste a assinatura até o local certo da página e baixe o PDF assinado.' },
      ],
    },
    faq: [
      { q: 'Como assinar um PDF pelo celular?', a: 'Abra o documento nesta página, desenhe a assinatura com o dedo no quadro, arraste até a posição na página e baixe o arquivo assinado.' },
      { q: 'A assinatura tem validade jurídica?', a: 'É uma assinatura eletrônica simples, válida em muitas situações quando as partes aceitam o meio. Para exigências de certificado digital ICP-Brasil ou Gov.br, use as plataformas oficiais.' },
      { q: 'Minha assinatura fica guardada em algum lugar?', a: 'Não. O desenho existe apenas na memória do navegador enquanto a página está aberta e é descartado ao fechar.' },
      { q: 'Posso assinar mais de uma página?', a: 'Sim. Aplique a assinatura, escolha outra página e repita antes de baixar.' },
    ],
    related: ['', 'marca-dagua-pdf', 'numerar-paginas-pdf', 'comprimir-pdf'],
  },
];
