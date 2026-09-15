/**
 * Long-form guide pages. These target informational long-tail queries that
 * the tool pages themselves cannot rank for, and funnel back into the tools.
 * `tool` embeds a working widget so the page also serves transactional intent.
 */

const D = '2026-02-10';

export const howtoGuides = [
  /* ------------------------------------------------------------------- */
  {
    slug: 'como-juntar-pdf',
    tool: '',
    date: D,
    updated: '2026-09-01',
    title: 'Como Juntar PDF: 5 Formas de Unir Arquivos (2026)',
    description:
      'Guia completo para juntar arquivos PDF: no navegador, no celular, no Windows, no Mac e no Word. Com o passo a passo de cada método e quando usar cada um.',
    keywords: ['como juntar pdf', 'como unir pdf', 'como juntar arquivos pdf', 'como juntar dois pdf', 'juntar pdf passo a passo'],
    h1: 'Como juntar PDF: 5 formas de unir arquivos',
    lede: 'Do jeito mais rápido ao mais completo — e qual escolher conforme o seu caso.',
    body: `
<p>Juntar PDF parece simples até a hora em que o documento precisa sair com as páginas na ordem certa, sem marca d'água, dentro do limite de tamanho do sistema e sem que o contrato passe pelo servidor de um site desconhecido. Este guia cobre as cinco formas que realmente funcionam, com o passo a passo de cada uma.</p>

<h2>1. No navegador (mais rápido, funciona em qualquer aparelho)</h2>
<p>É o método que resolve a maioria dos casos, e é o que a ferramenta no topo desta página faz. Você seleciona os arquivos, define a ordem e baixa o resultado. Não há instalação, cadastro nem limite de uso.</p>
<p>O ponto que diferencia uma ferramenta de navegador da outra é <strong>onde a conta é feita</strong>. Sites como iLovePDF, Smallpdf e PDF24 enviam o seu arquivo para um servidor. Aqui, a união acontece dentro do próprio navegador: o documento é lido do disco, montado na memória e devolvido, sem sair do aparelho. Para contratos, laudos e documentos com dados pessoais, essa diferença é o que importa.</p>
<h3>Passo a passo</h3>
<ol>
<li>Arraste os PDFs para a área de seleção, ou toque nela e escolha os arquivos.</li>
<li>Arraste os itens da lista até a ordem ficar correta — é ela que define a paginação final.</li>
<li>Clique em <strong>Juntar e baixar PDF</strong>. O download começa na hora.</li>
</ol>

<h2>2. No celular, sem instalar aplicativo</h2>
<p>Abra o site no Chrome (Android) ou no Safari (iPhone) e use exatamente os mesmos três passos. Os arquivos vêm do gerenciador de arquivos, do Google Drive, do iCloud ou da pasta onde o WhatsApp salva os documentos.</p>
<p>No iPhone há ainda um caminho nativo: o aplicativo <strong>Atalhos</strong> permite montar uma automação que combina PDFs selecionados. Funciona bem, mas exige configurar o atalho uma vez e que os arquivos estejam em uma pasta acessível. Detalhamos os dois caminhos no guia <a href="/juntar-pdf-no-celular/">juntar PDF no celular</a>.</p>

<h2>3. No Windows, sem programa extra</h2>
<p>O Windows não traz um recurso de juntar PDF pronto, mas traz a impressora virtual <strong>Microsoft Print to PDF</strong>, que resolve de forma indireta:</p>
<ol>
<li>Selecione os arquivos no Explorador, clique com o botão direito e escolha <strong>Imprimir</strong> — isso funciona bem com imagens, e com PDFs depende do leitor instalado.</li>
<li>Em muitos casos é mais prático abrir cada PDF, imprimir em "Microsoft Print to PDF" e depois unir os resultados.</li>
</ol>
<p>Na prática, o caminho do navegador é mais rápido e mantém o texto selecionável, enquanto a impressão virtual pode rasterizar o conteúdo. Use a impressora virtual apenas quando não houver alternativa.</p>

<h2>4. No Mac, com o Pré-Visualização</h2>
<p>O macOS tem a melhor solução nativa entre todos os sistemas:</p>
<ol>
<li>Abra o primeiro PDF no <strong>Pré-Visualização</strong>.</li>
<li>Menu <strong>Visualizar → Miniaturas</strong> para mostrar a barra lateral.</li>
<li>Arraste os outros arquivos PDF para dentro da barra de miniaturas, na posição desejada.</li>
<li>Menu <strong>Arquivo → Exportar como PDF</strong> para salvar o documento unido.</li>
</ol>
<p>Importante: use <em>Exportar como PDF</em>, não apenas <em>Salvar</em>. Salvar sobrescreve o primeiro arquivo.</p>

<h2>5. No Word (quando os originais ainda existem)</h2>
<p>Se os PDFs vieram de documentos do Word que você ainda tem, unir no Word e exportar uma vez só costuma dar um resultado melhor do que juntar os PDFs: a formatação fica consistente e o sumário continua funcionando.</p>
<ol>
<li>Abra o primeiro documento.</li>
<li>Posicione o cursor onde o próximo deve entrar e vá em <strong>Inserir → Objeto → Texto de arquivo</strong>.</li>
<li>Repita para cada documento e salve o resultado como PDF.</li>
</ol>
<p>O Word <strong>não</strong> junta PDFs diretamente. Inserir um PDF no Word o transforma em imagem ou tenta reconvertê-lo, e o resultado costuma sair deformado.</p>

<h2>Comparativo rápido</h2>
<table><thead><tr><th>Método</th><th>Velocidade</th><th>Privacidade</th><th>Funciona no celular</th></tr></thead><tbody>
<tr><td>Navegador (processamento local)</td><td>Alta</td><td>Total — nada é enviado</td><td>Sim</td></tr>
<tr><td>Sites com upload</td><td>Média</td><td>O arquivo vai para um servidor</td><td>Sim</td></tr>
<tr><td>Pré-Visualização (Mac)</td><td>Alta</td><td>Total</td><td>Não</td></tr>
<tr><td>Impressora virtual (Windows)</td><td>Baixa</td><td>Total</td><td>Não</td></tr>
<tr><td>Word</td><td>Baixa</td><td>Total</td><td>Parcial</td></tr>
</tbody></table>

<h2>Erros comuns ao juntar PDF</h2>
<ul>
<li><strong>Ordem errada.</strong> Confira a lista antes de gerar. Renomear os arquivos com 01-, 02-, 03- antes de selecionar ajuda quando são muitos.</li>
<li><strong>Arquivo final grande demais.</strong> Junte primeiro e depois use <a href="/comprimir-pdf/">comprimir PDF</a> — comprimir cada parte antes costuma render menos.</li>
<li><strong>Numeração faltando.</strong> Se o documento vai a protocolo, numere <em>depois</em> de unir, com a ferramenta de <a href="/numerar-paginas-pdf/">numerar páginas</a>.</li>
<li><strong>Páginas de lado.</strong> Corrija com <a href="/girar-pdf/">girar PDF</a> antes de enviar.</li>
<li><strong>PDF protegido por senha.</strong> Nenhuma ferramenta une um arquivo cuja senha de abertura você não tem. Abra a proteção primeiro.</li>
</ul>`,
    faq: [
      { q: 'Como juntar dois arquivos PDF em um só?', a: 'Use a ferramenta no topo desta página: selecione os dois arquivos, coloque na ordem desejada e clique em juntar. Leva menos de um minuto e não exige cadastro.' },
      { q: 'Dá para juntar PDF sem internet?', a: 'Sim. Depois da primeira visita, a página fica salva no seu aparelho e a ferramenta continua funcionando offline, porque o processamento é local.' },
      { q: 'O Word junta arquivos PDF?', a: 'Não diretamente. O Word insere PDFs como objeto ou tenta reconvertê-los, o que deforma o resultado. Junte os PDFs em uma ferramenta própria.' },
      { q: 'Como juntar PDF mantendo a qualidade?', a: 'Use uma ferramenta que copie as páginas sem recompressão, como esta. Métodos baseados em impressão virtual costumam transformar texto em imagem.' },
    ],
    related: ['', 'juntar-pdf-no-celular', 'juntar-varios-pdf', 'comprimir-pdf'],
  },

  /* ------------------------------------------------------------------- */
  {
    slug: 'juntar-pdf-no-celular',
    tool: '',
    date: D,
    updated: '2026-09-01',
    title: 'Como Juntar PDF no Celular (Android e iPhone) Grátis',
    description:
      'Passo a passo para juntar arquivos PDF no celular sem instalar aplicativo, no Android e no iPhone — incluindo arquivos vindos do WhatsApp e do Google Drive.',
    keywords: ['juntar pdf no celular', 'unir pdf celular', 'juntar pdf android', 'juntar pdf iphone', 'juntar pdf whatsapp'],
    h1: 'Como juntar PDF no celular',
    lede: 'Sem instalar aplicativo, sem cadastro e sem mandar seus documentos para servidor nenhum.',
    body: `
<p>A maior parte das pessoas precisa juntar PDF exatamente onde não tem computador: na fila do cartório, na hora de responder um e-mail do trabalho, durante uma inscrição que fecha hoje. A boa notícia é que o navegador do celular dá conta sozinho — desde que a ferramenta processe localmente, porque plano de dados e upload de 30 MB não combinam.</p>

<h2>No Android</h2>
<ol>
<li>Abra o <strong>Chrome</strong> (ou Samsung Internet) e acesse <strong>juntarpdf.com</strong>.</li>
<li>Toque na área "Arraste seus PDFs aqui". O seletor de arquivos do Android abre.</li>
<li>Escolha os PDFs. Você pode trocar de origem no menu lateral: <em>Downloads</em>, <em>Documentos</em>, <em>Google Drive</em> ou o cartão de memória.</li>
<li>Para selecionar vários de uma vez, toque e segure no primeiro e marque os demais.</li>
<li>Arraste os itens da lista para acertar a ordem e toque em <strong>Juntar e baixar PDF</strong>.</li>
<li>O arquivo cai em <em>Downloads</em>. A notificação leva direto a ele.</li>
</ol>

<h2>No iPhone e iPad</h2>
<ol>
<li>Abra o <strong>Safari</strong> e acesse <strong>juntarpdf.com</strong>.</li>
<li>Toque na área de seleção e escolha <strong>Escolher arquivos</strong>.</li>
<li>O app <em>Arquivos</em> abre. Navegue até <em>No meu iPhone</em>, <em>iCloud Drive</em> ou a pasta onde o documento está.</li>
<li>Toque em <strong>Selecionar</strong> no canto superior, marque os PDFs e confirme.</li>
<li>Ajuste a ordem e toque em <strong>Juntar e baixar PDF</strong>.</li>
<li>O arquivo vai para <em>Downloads</em> dentro do app Arquivos.</li>
</ol>

<h2>Juntar PDFs que chegaram pelo WhatsApp</h2>
<p>Documentos recebidos no WhatsApp não ficam visíveis no seletor de arquivos até serem salvos. Antes de juntar:</p>
<ul>
<li><strong>Android:</strong> abra o documento na conversa, toque nos três pontos e escolha <em>Salvar como</em> ou <em>Compartilhar → Salvar em Arquivos</em>. Ele costuma ir para <em>WhatsApp/Media/WhatsApp Documents</em>.</li>
<li><strong>iPhone:</strong> abra o documento, toque no ícone de compartilhar e escolha <strong>Salvar em Arquivos</strong>.</li>
</ul>
<p>Depois disso eles aparecem normalmente no seletor.</p>

<h2>Transforme o site em um ícone na tela</h2>
<p>Se você usa com frequência, vale instalar como aplicativo — ele abre em tela cheia, sem barra de navegador, e funciona offline:</p>
<ul>
<li><strong>Android:</strong> menu ⋮ do Chrome → <em>Adicionar à tela inicial</em>.</li>
<li><strong>iPhone:</strong> botão de compartilhar do Safari → <em>Adicionar à Tela de Início</em>.</li>
</ul>
<p>Não ocupa espaço como um aplicativo tradicional, não pede permissões e não acessa a sua galeria nem seus contatos.</p>

<h2>Por que evitar aplicativos de PDF na loja</h2>
<p>Buscar "juntar pdf" na Play Store ou na App Store devolve dezenas de aplicativos gratuitos. Boa parte deles pede permissão de acesso a todos os arquivos do aparelho, exibe anúncios em tela cheia entre cada etapa, coloca marca d'água no resultado ou libera só três usos antes da assinatura mensal. E vários enviam o documento para um servidor mesmo assim.</p>
<p>Um site que processa localmente resolve o mesmo problema sem instalar nada, sem pedir permissão nenhuma e sem ocupar armazenamento.</p>

<h2>Dicas para arquivos grandes no celular</h2>
<ul>
<li>Feche outras abas antes de juntar arquivos muito grandes — o navegador do celular tem menos memória disponível.</li>
<li>Se o resultado precisa ser enviado por e-mail, passe depois em <a href="/comprimir-pdf/">comprimir PDF</a>.</li>
<li>Fotografou documentos em vez de escanear? Converta primeiro com <a href="/jpg-para-pdf/">JPG para PDF</a> e depois junte tudo.</li>
</ul>`,
    faq: [
      { q: 'Como juntar PDF no celular sem aplicativo?', a: 'Abra juntarpdf.com no Chrome ou no Safari, toque para selecionar os arquivos, ajuste a ordem e toque em juntar. Tudo acontece no navegador, sem instalar nada.' },
      { q: 'Como juntar PDFs recebidos no WhatsApp?', a: 'Salve cada documento primeiro: abra na conversa e use Salvar em Arquivos (iPhone) ou Salvar como (Android). Depois eles aparecem no seletor de arquivos e podem ser juntados normalmente.' },
      { q: 'Consome internet para juntar PDF no celular?', a: 'Praticamente nada. Só a página é baixada; o arquivo em si não é enviado nem baixado, porque é processado dentro do aparelho.' },
      { q: 'Funciona no iPhone sem baixar app?', a: 'Sim. O Safari abre o seletor do app Arquivos e o PDF final é salvo na pasta Downloads do próprio iPhone.' },
    ],
    related: ['', 'juntar-pdf-no-iphone', 'jpg-para-pdf', 'comprimir-pdf'],
  },

  /* ------------------------------------------------------------------- */
  {
    slug: 'juntar-pdf-no-iphone',
    tool: '',
    date: D,
    updated: '2026-09-01',
    title: 'Como Juntar PDF no iPhone: 3 Formas (Arquivos, Atalhos e Safari)',
    description:
      'Três maneiras de juntar arquivos PDF no iPhone e iPad: pelo app Arquivos, com um atalho do app Atalhos ou direto no Safari, sem instalar nada.',
    keywords: ['juntar pdf no iphone', 'unir pdf iphone', 'juntar pdf ios', 'combinar pdf iphone', 'juntar pdf ipad'],
    h1: 'Como juntar PDF no iPhone',
    lede: 'Pelo app Arquivos, por um atalho ou direto no navegador — com as limitações de cada caminho.',
    body: `
<p>O iOS tem recursos de PDF melhores do que a maioria das pessoas imagina, mas eles ficam escondidos e mudam de lugar entre versões. Aqui estão os três caminhos que funcionam, do mais simples ao mais automatizável.</p>

<h2>1. Pelo Safari (funciona sempre, em qualquer versão)</h2>
<p>É o caminho que não depende da versão do iOS nem de configuração prévia:</p>
<ol>
<li>Abra o Safari e acesse <strong>juntarpdf.com</strong>.</li>
<li>Toque na área de seleção e escolha <strong>Escolher arquivos</strong>.</li>
<li>No app Arquivos, toque em <strong>Selecionar</strong>, marque os PDFs e confirme.</li>
<li>Arraste para ordenar e toque em <strong>Juntar e baixar PDF</strong>.</li>
<li>O arquivo é salvo em <em>Downloads</em>, dentro do app Arquivos.</li>
</ol>
<p>Vantagem: nada é enviado para servidor, funciona com arquivos de qualquer origem e não exige configuração. É também o único caminho aqui que roda igual no iPad e no Mac.</p>

<h2>2. Pelo app Arquivos (recurso nativo do iOS)</h2>
<p>O app Arquivos tem uma opção nativa de criar PDF a partir de vários itens, útil principalmente para <strong>imagens</strong>:</p>
<ol>
<li>Abra o app <strong>Arquivos</strong> e vá até a pasta com os documentos.</li>
<li>Toque em <strong>Selecionar</strong> e marque os arquivos.</li>
<li>Toque nos três pontos (⋯) no canto inferior e escolha <strong>Criar PDF</strong>.</li>
</ol>
<p>Limitação importante: esse recurso é feito para imagens. Com PDFs já existentes, o comportamento varia entre versões do iOS e nem sempre combina os arquivos na ordem esperada. Para fotos de documentos, funciona muito bem.</p>

<h2>3. Pelo app Atalhos (para quem repete a tarefa toda semana)</h2>
<p>Se juntar PDF é rotina no seu trabalho, vale montar o atalho uma vez:</p>
<ol>
<li>Abra o app <strong>Atalhos</strong> e toque em <strong>+</strong>.</li>
<li>Adicione a ação <strong>Selecionar Arquivos</strong> e ative "Selecionar Vários".</li>
<li>Adicione <strong>Combinar Arquivos</strong> (ou "Criar PDF", dependendo da versão).</li>
<li>Adicione <strong>Salvar Arquivo</strong> e escolha a pasta de destino.</li>
<li>Dê um nome ao atalho e, se quiser, adicione à tela de início.</li>
</ol>
<p>Depois disso, juntar PDFs vira um toque. A contrapartida é que montar o atalho leva alguns minutos e a nomenclatura das ações muda a cada versão do iOS, o que costuma confundir.</p>

<h2>Qual escolher</h2>
<table><thead><tr><th>Situação</th><th>Melhor caminho</th></tr></thead><tbody>
<tr><td>Preciso agora, uma vez só</td><td>Safari</td></tr>
<tr><td>São fotos de documentos, não PDFs</td><td>App Arquivos → Criar PDF</td></tr>
<tr><td>Faço isso toda semana</td><td>Atalho personalizado</td></tr>
<tr><td>Documento confidencial</td><td>Safari (processamento local) ou Atalhos</td></tr>
<tr><td>Preciso reordenar com precisão</td><td>Safari</td></tr>
</tbody></table>

<h2>Depois de juntar</h2>
<p>Se o arquivo final ficou pesado demais para o e-mail, use <a href="/comprimir-pdf/">comprimir PDF</a>. Se o documento vai para protocolo e precisa de folhas numeradas, use <a href="/numerar-paginas-pdf/">numerar páginas</a>. E se alguma página saiu deitada, <a href="/girar-pdf/">girar PDF</a> resolve.</p>`,
    faq: [
      { q: 'O iPhone junta PDF nativamente?', a: 'Parcialmente. O app Arquivos tem a opção Criar PDF, feita principalmente para imagens; com PDFs já existentes o comportamento varia entre versões do iOS.' },
      { q: 'Como juntar PDF no iPhone sem baixar aplicativo?', a: 'Abra juntarpdf.com no Safari, selecione os arquivos pelo app Arquivos, ordene e toque em juntar. O PDF final é salvo em Downloads.' },
      { q: 'Dá para juntar PDF no iPad do mesmo jeito?', a: 'Sim. Os três caminhos funcionam igual no iPadOS, e a tela maior facilita reordenar os arquivos.' },
      { q: 'Onde o PDF juntado é salvo no iPhone?', a: 'Na pasta Downloads do app Arquivos, que fica em “No meu iPhone” ou no iCloud Drive, conforme a sua configuração do Safari.' },
    ],
    related: ['', 'juntar-pdf-no-celular', 'numerar-paginas-pdf', 'comprimir-pdf'],
  },

  /* ------------------------------------------------------------------- */
  {
    slug: 'juntar-varios-pdf',
    tool: '',
    date: D,
    updated: '2026-09-01',
    title: 'Juntar Vários PDF em Um Só Arquivo — Guia Prático',
    description:
      'Como juntar muitos arquivos PDF de uma vez em um único documento, controlando a ordem, o tamanho final e a numeração das páginas.',
    keywords: ['juntar varios pdf', 'juntar vários pdf em um só', 'juntar muitos pdf', 'unir vários pdf', 'juntar pdf em massa'],
    h1: 'Juntar vários PDF em um só arquivo',
    lede: 'Quando não são dois arquivos, e sim trinta — o que muda e como não errar a ordem.',
    body: `
<p>Juntar dois PDFs é trivial. Juntar trinta é outro problema: a ordem precisa estar certa, o arquivo final não pode estourar o limite do sistema e conferir o resultado página por página deixa de ser viável. Este guia trata desse caso.</p>

<h2>1. Resolva a ordem antes de selecionar</h2>
<p>O erro mais caro é descobrir a ordem errada depois de protocolar. A forma mais segura de evitar isso é <strong>renomear os arquivos com prefixo numérico</strong> antes de começar:</p>
<blockquote><p><code>01-peticao.pdf</code>, <code>02-procuracao.pdf</code>, <code>03-rg.pdf</code>, <code>04-comprovante.pdf</code></p></blockquote>
<p>Use dois dígitos (01, 02… 10) — com um dígito só, o computador ordena 1, 10, 11, 2, 3. Com os arquivos nomeados assim, a seleção múltipla já entra na sequência correta e você só confere.</p>

<h2>2. Selecione todos de uma vez</h2>
<ul>
<li><strong>Windows/Linux:</strong> clique no primeiro, segure <kbd>Shift</kbd> e clique no último para pegar o intervalo inteiro; <kbd>Ctrl</kbd> + clique adiciona arquivos avulsos.</li>
<li><strong>Mac:</strong> mesma lógica com <kbd>Shift</kbd> e <kbd>Cmd</kbd>.</li>
<li><strong>Celular:</strong> toque e segure no primeiro arquivo e marque os demais.</li>
</ul>
<p>Você também pode arrastar a seleção inteira direto para a área da ferramenta, o que costuma preservar melhor a ordem de exibição da pasta.</p>

<h2>3. Confira pela lista, não pelo resultado</h2>
<p>A lista numerada que aparece depois da seleção é a ordem final. Confira ali — é muito mais rápido do que abrir o PDF de 200 páginas e procurar. Arraste os itens ou use as setas para corrigir o que estiver fora de lugar.</p>

<h2>4. Cuide do tamanho final</h2>
<p>Trinta PDFs escaneados somam com facilidade mais de 100 MB, e a maioria dos sistemas de protocolo aceita entre 10 e 25 MB. A sequência que funciona é:</p>
<ol>
<li>Junte tudo primeiro, para ter o documento completo e na ordem.</li>
<li>Passe o resultado por <a href="/comprimir-pdf/">comprimir PDF</a> no nível recomendado.</li>
<li>Se ainda estiver acima do limite, refaça no nível máximo.</li>
<li>Se mesmo assim não couber, use <a href="/dividir-pdf/">dividir PDF</a> em dois volumes e envie separadamente.</li>
</ol>
<p>Comprimir cada arquivo antes de juntar costuma render menos e demora muito mais.</p>

<h2>5. Numere depois de juntar</h2>
<p>Documentos que vão a protocolo quase sempre exigem folhas numeradas em sequência contínua. Numerar antes de unir produz cinco documentos começando em 1 cada um. Use <a href="/numerar-paginas-pdf/">numerar páginas</a> no arquivo já unido, com o formato exigido pelo órgão — em processos, costuma ser <code>Fls. 1</code> no canto superior direito.</p>

<h2>6. Quantos arquivos dá para juntar de uma vez?</h2>
<p>Não impomos limite de quantidade. O limite real é a memória disponível no navegador: em um computador comum, centenas de arquivos funcionam; em celulares mais antigos, feche outras abas antes de processar lotes muito grandes.</p>
<p>Se o lote for realmente enorme, uma estratégia prática é juntar em blocos — por exemplo, cinco grupos de vinte — e depois juntar os cinco resultados. Também facilita conferir.</p>

<h2>Checklist antes de enviar</h2>
<ul>
<li>A ordem confere com o índice ou o sumário exigido?</li>
<li>Tem página em branco sobrando? Remova com <a href="/remover-paginas-pdf/">remover páginas</a>.</li>
<li>Alguma página saiu deitada? Corrija com <a href="/girar-pdf/">girar PDF</a>.</li>
<li>O tamanho está dentro do limite do sistema?</li>
<li>A numeração está contínua do começo ao fim?</li>
</ul>`,
    faq: [
      { q: 'Quantos PDFs posso juntar de uma vez?', a: 'Não há limite imposto pela ferramenta. O limite prático é a memória do aparelho — em computadores, centenas de arquivos funcionam sem problema.' },
      { q: 'Como garantir que a ordem fique certa?', a: 'Renomeie os arquivos com prefixo de dois dígitos (01-, 02-, 03-) antes de selecionar e confira a lista numerada antes de gerar o documento.' },
      { q: 'Devo comprimir antes ou depois de juntar?', a: 'Depois. Comprimir o arquivo já unido rende mais e é muito mais rápido do que comprimir cada parte separadamente.' },
      { q: 'Como numerar as páginas do documento unido?', a: 'Use a ferramenta de numerar páginas no arquivo já juntado, para que a contagem corra de forma contínua do começo ao fim.' },
    ],
    related: ['', 'comprimir-pdf', 'numerar-paginas-pdf', 'dividir-pdf'],
  },
];
