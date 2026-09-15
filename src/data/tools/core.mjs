/**
 * Tool registry — the single source of truth for pages, navigation, the tool
 * grid, internal links, the sitemap and every piece of structured data.
 *
 * Field guide
 *   slug      URL path (without leading/trailing slash); '' is the homepage
 *   engine    id of the client-side module in src/assets/js/tools/<engine>.js
 *   ui        options passed to the engine (accepted types, extra controls)
 *   sections  unique long-form body copy — this is what actually ranks
 */

export const coreTools = [
  /* ============================== 1. JUNTAR (home) ======================= */
  {
    slug: '',
    engine: 'merge',
    category: 'organizar',
    icon: 'merge',
    name: 'Juntar PDF',
    cardText: 'Una vários PDFs em um único documento, na ordem que você quiser.',
    cardKw: 'juntar pdf online grátis',
    home: true,
    title: 'Juntar PDF Online Grátis — Unir Vários PDF em Um Só Arquivo',
    description:
      'Junte vários arquivos PDF em um só, grátis e sem cadastro. Funciona no celular e no computador, sem marca d’água — e seus documentos nunca saem do seu aparelho.',
    keywords: ['juntar pdf', 'juntar pdf online', 'juntar pdf grátis', 'unir pdf', 'combinar pdf', 'mesclar pdf', 'juntar arquivos pdf', 'juntar vários pdf em um só'],
    h1: 'Juntar PDF online grátis',
    eyebrow: 'Sem upload · Sem cadastro · Sem marca d’água',
    lede: 'Una quantos arquivos PDF quiser em um único documento, direto no navegador. Os arquivos são processados no seu próprio aparelho — nada é enviado para nenhum servidor.',
    ui: { accept: '.pdf,application/pdf', multiple: true, cta: 'Juntar e baixar PDF', dropTitle: 'Arraste seus PDFs aqui', dropHint: 'ou toque para escolher os arquivos · até 100 PDFs' },
    intro:
      '<p><strong>Juntar PDF</strong> é a tarefa mais comum de quem lida com documentos no dia a dia: um contrato dividido em partes, as páginas de um processo, os comprovantes de uma prestação de contas, o currículo com os certificados anexados. O JuntarPDF resolve isso em segundos, direto no navegador do celular ou do computador.</p><p>A diferença para os outros sites é onde a conta é feita: aqui o arquivo unido é montado <strong>dentro do seu próprio navegador</strong>. Ele não é enviado, não é copiado para um servidor e não fica guardado em lugar nenhum — nem por alguns minutos.</p>',
    sections: [
      {
        h2: 'Como juntar vários PDF em um só arquivo',
        html: '<p>São três passos e nenhum cadastro:</p><ol><li><strong>Selecione os arquivos.</strong> Arraste os PDFs para a área acima ou toque nela para abrir o gerenciador de arquivos do seu aparelho. Você pode escolher todos de uma vez.</li><li><strong>Coloque na ordem certa.</strong> Arraste os itens da lista, ou use as setas, até a sequência ficar exatamente como você quer. É essa ordem que vai definir a numeração das páginas do documento final.</li><li><strong>Clique em “Juntar e baixar PDF”.</strong> O arquivo unido é gerado na hora e o download começa automaticamente.</li></ol><p>O PDF final preserva o conteúdo original de cada documento: texto selecionável, imagens, tabelas, links e formatação continuam iguais. Nada é convertido em imagem e nada perde qualidade.</p>',
      },
      {
        h2: 'Por que juntar PDF aqui e não em outro site',
        html: '<p>Quase todos os sites de PDF funcionam da mesma forma: você envia o arquivo, um servidor faz o trabalho e devolve o resultado. Isso significa que o seu contrato, o seu laudo médico ou o seu documento com CPF passou pela máquina de outra pessoa.</p><p>O JuntarPDF usa outra abordagem. Todo o processamento roda em JavaScript no seu navegador, com a mesma tecnologia usada por editores de PDF profissionais. Na prática:</p><ul><li><strong>Nenhum upload acontece.</strong> Você pode conferir: abra as ferramentas do desenvolvedor, aba “Rede”, e junte um PDF. Nenhuma requisição sai com o seu arquivo.</li><li><strong>Funciona sem internet.</strong> Depois da primeira visita, a página fica salva no aparelho e a ferramenta continua funcionando no modo avião.</li><li><strong>É mais rápido.</strong> Não existe tempo de subida nem de descida — só o tempo de montar o arquivo, que costuma ser menos de um segundo.</li><li><strong>Não há limite de tamanho de servidor.</strong> O limite é a memória do seu aparelho, o que na prática permite arquivos bem maiores do que os 10–20 MB que os serviços gratuitos costumam aceitar.</li></ul>',
      },
      {
        h2: 'Juntar PDF pelo celular (Android e iPhone)',
        html: '<p>A ferramenta foi desenhada para funcionar bem no celular, que é onde a maior parte das pessoas precisa dela. Abra o JuntarPDF.com no Chrome, Samsung Internet ou Safari, toque na área de seleção e escolha os PDFs pelo aplicativo Arquivos (iPhone) ou pelo gerenciador de arquivos / Google Drive (Android).</p><p>No iPhone, os arquivos podem vir do iCloud Drive, do WhatsApp (“Salvar em Arquivos”) ou do e-mail. No Android, funciona com arquivos do Download, do Google Drive e de aplicativos de digitalização. O PDF unido cai direto na pasta de downloads do aparelho, pronto para anexar de volta no WhatsApp, no e-mail ou no sistema de protocolo.</p><p>Se você usa a ferramenta com frequência, toque em “Adicionar à tela de início” no menu do navegador: o JuntarPDF vira um ícone como um aplicativo normal, abre em tela cheia e funciona offline.</p>',
      },
      {
        h2: 'Para que as pessoas usam',
        html: '<table><thead><tr><th>Situação</th><th>O que costuma ser unido</th></tr></thead><tbody><tr><td>Processos e petições</td><td>Petição inicial + procuração + documentos pessoais + comprovantes, em um único arquivo para protocolo eletrônico</td></tr><tr><td>Concursos e inscrições</td><td>Diploma, histórico, certidões e comprovantes que o edital exige em “arquivo único em PDF”</td></tr><tr><td>Contabilidade e RH</td><td>Notas fiscais do mês, holerites, recibos e relatórios reunidos por período</td></tr><tr><td>Faculdade</td><td>Capa, trabalho, anexos e ficha catalográfica em um só documento para envio</td></tr><tr><td>Imobiliário e bancos</td><td>Contrato assinado + RG + CPF + comprovante de renda e de residência</td></tr></tbody></table>',
      },
    ],
    howto: {
      name: 'Como juntar arquivos PDF online grátis',
      description: 'Una vários arquivos PDF em um único documento usando apenas o navegador, sem instalar programas e sem enviar os arquivos para um servidor.',
      totalTime: 'PT1M',
      steps: [
        { name: 'Selecione os arquivos PDF', text: 'Arraste os PDFs para a área de seleção ou toque nela para escolher os arquivos no seu celular ou computador.' },
        { name: 'Organize a ordem das páginas', text: 'Arraste os itens da lista para definir em que sequência os documentos vão aparecer no arquivo final.' },
        { name: 'Junte e baixe o PDF', text: 'Clique em “Juntar e baixar PDF”. O documento unido é gerado no próprio navegador e baixado imediatamente.' },
      ],
    },
    faq: [
      { q: 'Como juntar dois ou mais PDF em um só arquivo?', a: 'Arraste os arquivos para a ferramenta no topo desta página, coloque-os na ordem desejada e clique em “Juntar e baixar PDF”. O documento unido é gerado em segundos, sem cadastro.' },
      { q: 'Juntar PDF aqui é realmente grátis?', a: 'Sim. Não há cobrança, cadastro, limite diário de uso nem marca d’água no arquivo final.' },
      { q: 'Meus documentos são enviados para algum servidor?', a: 'Não. Todo o processamento acontece dentro do seu navegador, no seu próprio aparelho. Os arquivos nunca são transmitidos pela internet, o que atende plenamente à LGPD mesmo com documentos sigilosos.' },
      { q: 'Quantos arquivos PDF posso juntar de uma vez?', a: 'Não impomos limite de quantidade. O limite prático é a memória do seu aparelho — em celulares comuns, dezenas de arquivos são unidos sem problema.' },
      { q: 'Existe limite de tamanho por arquivo?', a: 'Não existe um limite fixo como nos serviços que dependem de upload. Arquivos de centenas de megabytes costumam funcionar; o que pesa é a memória disponível no navegador.' },
      { q: 'Funciona no celular?', a: 'Sim, no Android e no iPhone. Basta abrir o site no navegador e selecionar os arquivos pelo gerenciador de arquivos, pelo Google Drive ou pelo iCloud.' },
      { q: 'O arquivo final fica com marca d’água?', a: 'Não. O PDF gerado é limpo, sem nenhuma marca, logotipo ou página extra adicionada.' },
      { q: 'A ordem dos documentos é mantida?', a: 'Sim, exatamente na sequência que você definir na lista. Arraste os itens antes de gerar o arquivo para ajustar a ordem.' },
      { q: 'A qualidade do PDF diminui ao juntar?', a: 'Não. As páginas são copiadas como estão, sem recompressão. Texto continua selecionável e as imagens mantêm a resolução original.' },
      { q: 'Preciso instalar algum programa?', a: 'Não. Funciona direto no navegador, em qualquer sistema — Windows, macOS, Linux, Android ou iOS.' },
    ],
    related: ['dividir-pdf', 'comprimir-pdf', 'organizar-pdf', 'jpg-para-pdf', 'pdf-para-word', 'girar-pdf'],
  },

  /* ============================== 2. DIVIDIR ============================= */
  {
    slug: 'dividir-pdf',
    engine: 'split',
    category: 'organizar',
    icon: 'split',
    name: 'Dividir PDF',
    cardText: 'Separe um PDF em vários arquivos ou extraia um intervalo de páginas.',
    cardKw: 'dividir pdf sem cadastro',
    title: 'Dividir PDF Online Grátis — Separar Páginas de um PDF',
    description:
      'Divida um arquivo PDF em vários documentos ou separe apenas as páginas que você precisa. Grátis, sem cadastro e sem enviar o arquivo para servidores.',
    keywords: ['dividir pdf', 'dividir pdf online', 'separar páginas pdf', 'dividir pdf grátis', 'separar pdf', 'cortar pdf', 'dividir arquivo pdf'],
    h1: 'Dividir PDF online grátis',
    eyebrow: 'Por intervalo, por página ou a cada N páginas',
    lede: 'Separe um documento grande em arquivos menores ou extraia só as páginas que interessam — tudo processado no seu próprio navegador.',
    ui: { accept: '.pdf,application/pdf', multiple: false, cta: 'Dividir e baixar', dropTitle: 'Arraste o PDF que você quer dividir', dropHint: 'ou toque para escolher o arquivo' },
    intro:
      '<p>Documentos escaneados costumam sair como um PDF único e enorme: o contrato inteiro, o prontuário completo, o livro digitalizado. Quando você só precisa de um pedaço — ou precisa entregar cada capítulo separado — a solução é <strong>dividir o PDF</strong>.</p><p>Esta ferramenta faz isso de três formas diferentes, sem enviar o arquivo para lugar nenhum.</p>',
    sections: [
      {
        h2: 'Três modos de dividir um PDF',
        html: '<h3>1. Por intervalo de páginas</h3><p>Digite algo como <code>1-5, 12, 20-30</code> e receba um PDF só com essas páginas, na ordem em que você escreveu. É o modo mais usado para extrair um anexo específico de um processo ou tirar o capítulo que interessa de uma apostila.</p><h3>2. Uma página por arquivo</h3><p>Um PDF de 40 páginas vira 40 arquivos separados, numerados. Útil quando cada página é um documento independente — notas fiscais digitalizadas em lote, certidões ou fichas de cadastro.</p><h3>3. A cada N páginas</h3><p>Quebra o documento em blocos de tamanho fixo: a cada 10 páginas, a cada 50, o número que você definir. É a forma prática de partir um arquivo grande demais em pedaços que cabem no limite de anexo de um sistema ou de um e-mail.</p><p>Quando o resultado tem mais de um arquivo, tudo é entregue em um único <strong>.zip</strong> montado no próprio navegador.</p>',
      },
      {
        h2: 'Como escrever os intervalos de páginas',
        html: '<table><thead><tr><th>O que você digita</th><th>O que você recebe</th></tr></thead><tbody><tr><td><code>3</code></td><td>Apenas a página 3</td></tr><tr><td><code>1-10</code></td><td>Da página 1 até a 10</td></tr><tr><td><code>1-3, 7, 15-20</code></td><td>Páginas 1, 2, 3, 7 e de 15 a 20, nessa ordem</td></tr><tr><td><code>5-</code></td><td>Da página 5 até o fim do documento</td></tr><tr><td><code>10-1</code></td><td>Da 10 até a 1, em ordem invertida</td></tr></tbody></table><p>Espaços são ignorados e você pode usar ponto e vírgula no lugar da vírgula. Se um número for maior que o total de páginas, ele é simplesmente descartado.</p>',
      },
      {
        h2: 'Dividir não é o mesmo que apagar páginas',
        html: '<p>Vale a distinção, porque muita gente procura uma coisa querendo a outra:</p><ul><li><strong>Dividir</strong> gera novos arquivos a partir do original — o documento de origem continua intacto.</li><li><strong>Remover páginas</strong> devolve o mesmo documento, só que sem as páginas indicadas. Para isso use a ferramenta <a href="/remover-paginas-pdf/">remover páginas do PDF</a>.</li><li><strong>Extrair páginas</strong> devolve um arquivo só com as páginas escolhidas, sem quebrar em vários. Veja <a href="/extrair-paginas-pdf/">extrair páginas do PDF</a>.</li></ul><p>Se o que você quer é reordenar, girar ou apagar páginas olhando as miniaturas, a ferramenta certa é <a href="/organizar-pdf/">organizar PDF</a>.</p>',
      },
    ],
    howto: {
      name: 'Como dividir um arquivo PDF',
      description: 'Separe um PDF em vários arquivos ou extraia apenas as páginas desejadas, direto no navegador.',
      steps: [
        { name: 'Escolha o PDF', text: 'Arraste o arquivo para a ferramenta ou toque para selecioná-lo no seu aparelho.' },
        { name: 'Escolha o modo de divisão', text: 'Selecione entre intervalo de páginas, uma página por arquivo ou blocos de N páginas.' },
        { name: 'Baixe o resultado', text: 'Clique em dividir. Se houver mais de um arquivo, tudo é entregue em um .zip gerado no próprio navegador.' },
      ],
    },
    faq: [
      { q: 'Como dividir um PDF em vários arquivos?', a: 'Envie o arquivo para a ferramenta, escolha “uma página por arquivo” ou “a cada N páginas” e clique em dividir. Os arquivos resultantes vêm em um .zip.' },
      { q: 'Como separar apenas algumas páginas de um PDF?', a: 'Use o modo “intervalo de páginas” e digite os números, por exemplo 1-3, 8, 12-15. Você recebe um único PDF só com essas páginas.' },
      { q: 'O arquivo original é alterado?', a: 'Não. O PDF original permanece intacto no seu aparelho; a ferramenta apenas gera novos arquivos a partir dele.' },
      { q: 'Dá para dividir um PDF protegido por senha?', a: 'Só se você abrir a proteção antes. PDFs com senha de abertura não podem ser lidos pela ferramenta sem a senha.' },
      { q: 'Existe limite de páginas?', a: 'Não impomos limite. Documentos com milhares de páginas funcionam, respeitando a memória disponível no aparelho.' },
      { q: 'Meu arquivo é enviado para algum servidor?', a: 'Não. A divisão acontece inteiramente dentro do navegador, sem upload.' },
    ],
    related: ['', 'extrair-paginas-pdf', 'remover-paginas-pdf', 'organizar-pdf', 'comprimir-pdf'],
  },

  /* ============================== 3. COMPRIMIR ========================== */
  {
    slug: 'comprimir-pdf',
    engine: 'compress',
    category: 'otimizar',
    icon: 'compress',
    name: 'Comprimir PDF',
    cardText: 'Reduza o tamanho do arquivo mantendo a melhor qualidade possível.',
    cardKw: 'comprimir pdf para enviar por e-mail',
    title: 'Comprimir PDF Online Grátis — Reduzir Tamanho de PDF',
    description:
      'Reduza o tamanho de arquivos PDF pesados para enviar por e-mail ou anexar em sistemas. Grátis, sem marca d’água e sem enviar o documento para servidores.',
    keywords: ['comprimir pdf', 'reduzir tamanho pdf', 'diminuir pdf', 'comprimir pdf online', 'compactar pdf', 'pdf menor', 'reduzir pdf mb'],
    h1: 'Comprimir PDF online grátis',
    eyebrow: 'Três níveis de compressão · Prévia do resultado',
    lede: 'Diminua o peso de PDFs escaneados e cheios de imagens para caber no limite de anexo do e-mail ou do sistema — sem que o arquivo saia do seu aparelho.',
    ui: { accept: '.pdf,application/pdf', multiple: false, cta: 'Comprimir PDF', dropTitle: 'Arraste o PDF pesado aqui', dropHint: 'ou toque para escolher o arquivo' },
    intro:
      '<p>PDFs ficam grandes quase sempre pelo mesmo motivo: <strong>imagens</strong>. Um documento digitalizado guarda uma foto de alta resolução por página, e 15 páginas viram 40 MB com facilidade — enquanto o sistema do tribunal aceita 10 MB e o e-mail corporativo, 25 MB.</p><p>Esta ferramenta recompõe cada página em uma resolução e qualidade adequadas para leitura e impressão comum, tipicamente derrubando o arquivo para uma fração do tamanho original.</p>',
    sections: [
      {
        h2: 'Como funciona a compressão',
        html: '<p>Cada página do PDF é redesenhada em alta fidelidade e regravada como imagem JPEG otimizada, com resolução e qualidade controladas pelo nível escolhido. Depois, as páginas são remontadas em um novo PDF com os metadados enxutos.</p><table><thead><tr><th>Nível</th><th>Resolução</th><th>Indicado para</th></tr></thead><tbody><tr><td><strong>Leve</strong></td><td>~150 DPI</td><td>Documentos que ainda serão impressos; menor redução, qualidade quase idêntica</td></tr><tr><td><strong>Recomendado</strong></td><td>~110 DPI</td><td>Envio por e-mail e upload em sistemas; melhor equilíbrio entre peso e leitura</td></tr><tr><td><strong>Máximo</strong></td><td>~72 DPI</td><td>Quando o limite é rígido e o documento é só para leitura em tela</td></tr></tbody></table><p>A ferramenta mostra o tamanho antes e depois antes de você baixar. Se a redução não compensar, é só escolher outro nível e comprimir de novo — nada foi enviado para lugar nenhum.</p>',
      },
      {
        h2: 'Quando comprimir não vai ajudar muito',
        html: '<p>Um PDF que contém apenas texto vetorial — gerado pelo Word, por um sistema ou exportado de um editor — já costuma ser pequeno e não tem imagens para otimizar. Nesses casos a compressão rende pouco, e em documentos muito leves o resultado pode até ficar maior, porque texto vira imagem.</p><p>Se o seu arquivo pesa muito e é puro texto, o problema quase sempre é outro: fontes incorporadas em excesso ou páginas demais. Nesse caso, <a href="/dividir-pdf/">dividir o PDF</a> em partes costuma resolver melhor do que comprimir.</p><blockquote><p><strong>Atenção com documentos que serão assinados digitalmente.</strong> A compressão gera um arquivo novo, o que invalida assinaturas digitais já existentes. Comprima antes de assinar, nunca depois.</p></blockquote>',
      },
      {
        h2: 'Reduzir PDF para 2 MB, 5 MB ou 10 MB',
        html: '<p>Muitos editais e sistemas exigem um teto exato. O caminho prático é: comece no nível <strong>Recomendado</strong>, confira o tamanho exibido no resultado e, se ainda estiver acima do limite, refaça no nível <strong>Máximo</strong>. Como tudo roda localmente, testar de novo custa segundos e nenhum upload.</p><p>Se mesmo no máximo o arquivo não couber, divida o documento em duas partes com a ferramenta de <a href="/dividir-pdf/">dividir PDF</a> e envie separadamente — quase todos os sistemas aceitam anexos múltiplos.</p>',
      },
    ],
    howto: {
      name: 'Como comprimir um PDF e reduzir o tamanho',
      description: 'Diminua o peso de um arquivo PDF direto no navegador, escolhendo o nível de compressão.',
      steps: [
        { name: 'Escolha o PDF', text: 'Arraste o arquivo pesado para a ferramenta ou toque para selecioná-lo.' },
        { name: 'Escolha o nível de compressão', text: 'Selecione entre leve, recomendado ou máximo, conforme o limite de tamanho que você precisa atingir.' },
        { name: 'Baixe o PDF comprimido', text: 'Confira o tamanho final exibido na tela e baixe o arquivo já otimizado.' },
      ],
    },
    faq: [
      { q: 'Quanto um PDF pode diminuir?', a: 'Depende do conteúdo. Documentos escaneados costumam cair entre 60% e 90%. PDFs que só têm texto reduzem pouco, porque não há imagens pesadas para otimizar.' },
      { q: 'A qualidade do documento piora?', a: 'Há perda controlada. No nível recomendado o texto continua nítido em tela e em impressão comum. Para arquivos de arquivo morto ou impressão gráfica, use o nível leve.' },
      { q: 'Comprimir PDF apaga o texto selecionável?', a: 'Sim. As páginas são regravadas como imagem, então o texto deixa de ser selecionável e pesquisável. Guarde o original se precisar dessa característica.' },
      { q: 'Como reduzir um PDF para menos de 2 MB?', a: 'Use o nível máximo e confira o tamanho exibido. Se ainda ficar acima, divida o documento em partes menores com a ferramenta de dividir PDF.' },
      { q: 'A compressão adiciona marca d’água?', a: 'Não. O arquivo final é limpo, sem nenhuma marca ou página extra.' },
      { q: 'Meu arquivo é enviado para algum servidor?', a: 'Não. Toda a compressão acontece no seu navegador; o documento não sai do aparelho.' },
    ],
    related: ['', 'dividir-pdf', 'pdf-para-jpg', 'jpg-para-pdf', 'organizar-pdf'],
  },
];
