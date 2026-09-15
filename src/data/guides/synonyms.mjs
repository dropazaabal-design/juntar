/**
 * Synonym landing pages. Portuguese uses four different verbs for the same
 * action, and each carries a different search intent — so each page answers a
 * genuinely different question instead of repeating the merge page.
 */

const D = '2026-02-18';

export const synonymGuides = [
  /* ------------------------------------------------------------------- */
  {
    slug: 'unir-pdf',
    tool: '',
    date: D,
    updated: '2026-09-01',
    title: 'Unir PDF Online Grátis — Sem Cadastro e Sem Marca d’Água',
    description:
      'Una arquivos PDF em um único documento, grátis e direto no navegador. Sem cadastro, sem marca d’água e sem enviar os arquivos para servidores.',
    keywords: ['unir pdf', 'unir pdf online', 'unir pdf grátis', 'unir arquivos pdf', 'unir pdf sem marca d’água'],
    h1: 'Unir PDF online grátis',
    lede: 'A mesma tarefa, o nome que você usa. Una quantos arquivos quiser, sem limite e sem cadastro.',
    body: `
<p><strong>Unir PDF</strong> e <strong>juntar PDF</strong> são exatamente a mesma operação: pegar dois ou mais documentos e produzir um só. "Unir" é a forma mais usada em Portugal e em textos mais formais; "juntar" predomina no dia a dia brasileiro. A ferramenta acima faz as duas coisas, porque são uma coisa só.</p>

<h2>Sem cadastro, sem limite diário, sem marca d'água</h2>
<p>Essas três restrições são o modelo de negócio da maioria dos sites de PDF: três arquivos por dia, cadastro para o quarto, assinatura mensal para tirar a marca d'água. Elas existem porque cada operação consome servidor, e servidor custa dinheiro.</p>
<p>Aqui o processamento acontece no seu navegador, usando o processador do seu próprio aparelho. Não há custo por operação, então não há motivo para limitar. Você pode unir dez arquivos agora e mais cinquenta em cinco minutos, sem contador nenhum.</p>

<h2>O que "unir" preserva</h2>
<p>Ao unir, as páginas são copiadas do documento original para o novo arquivo sem serem reprocessadas. Isso significa que continuam intactos:</p>
<ul>
<li><strong>Texto selecionável e pesquisável</strong> — o documento final continua permitindo Ctrl+F.</li>
<li><strong>Resolução das imagens</strong> — nada é recomprimido.</li>
<li><strong>Links internos e externos</strong> das páginas originais.</li>
<li><strong>Formatação, fontes e cores</strong> exatamente como estavam.</li>
<li><strong>Orientação de cada página</strong>, inclusive quando há mistura de retrato e paisagem.</li>
</ul>
<p>O que <em>não</em> sobrevive à união: assinaturas digitais com certificado. Qualquer alteração no arquivo — inclusive unir — invalida a assinatura, porque ela certifica aquele arquivo específico. Una primeiro, assine depois.</p>

<h2>Unir PDF em Portugal e no Brasil</h2>
<p>A ferramenta funciona igual nos dois lados do Atlântico e aceita documentos gerados por qualquer sistema: Portal das Finanças, Segurança Social, Gov.br, sistemas de tribunais, faturas eletrónicas e recibos verdes. Como nada é enviado, não há questão de transferência internacional de dados — o ficheiro nunca sai do seu computador, o que resolve de forma simples a exigência do RGPD na Europa e da LGPD no Brasil.</p>

<h2>Perguntas que aparecem depois de unir</h2>
<table><thead><tr><th>Situação</th><th>Ferramenta</th></tr></thead><tbody>
<tr><td>O ficheiro ficou grande demais</td><td><a href="/comprimir-pdf/">Comprimir PDF</a></td></tr>
<tr><td>Preciso de páginas numeradas</td><td><a href="/numerar-paginas-pdf/">Numerar páginas</a></td></tr>
<tr><td>Uni na ordem errada</td><td><a href="/organizar-pdf/">Organizar PDF</a></td></tr>
<tr><td>Uma página ficou deitada</td><td><a href="/girar-pdf/">Girar PDF</a></td></tr>
<tr><td>Entrou uma página a mais</td><td><a href="/remover-paginas-pdf/">Remover páginas</a></td></tr>
</tbody></table>`,
    faq: [
      { q: 'Unir PDF e juntar PDF são a mesma coisa?', a: 'Sim, são termos diferentes para a mesma operação: combinar vários arquivos PDF em um único documento. "Unir" é mais comum em Portugal, "juntar" no Brasil.' },
      { q: 'Existe limite de arquivos ou de usos por dia?', a: 'Não. Como o processamento acontece no seu aparelho e não em um servidor, não há custo por operação e, portanto, nenhum limite.' },
      { q: 'O arquivo final fica com marca d’água?', a: 'Não. O PDF gerado é limpo, sem marcas, logotipos ou páginas adicionais.' },
      { q: 'Unir PDF invalida uma assinatura digital?', a: 'Sim. Qualquer alteração no arquivo invalida assinaturas com certificado digital, porque elas certificam aquele arquivo específico. Una antes de assinar.' },
    ],
    related: ['', 'mesclar-pdf', 'combinar-pdf', 'comprimir-pdf'],
  },

  /* ------------------------------------------------------------------- */
  {
    slug: 'mesclar-pdf',
    tool: '',
    date: D,
    updated: '2026-09-01',
    title: 'Mesclar PDF Grátis — Online, no Acrobat e no Word',
    description:
      'Mescle arquivos PDF online de graça, ou veja como fazer no Adobe Acrobat e a partir de documentos do Word. Comparação honesta entre os caminhos.',
    keywords: ['mesclar pdf', 'mesclar arquivos pdf', 'mesclar pdf adobe', 'mesclar pdf acrobat', 'mesclar documentos pdf'],
    h1: 'Mesclar PDF: online, no Acrobat ou pelo Word',
    lede: '“Mesclar” é o termo que a Adobe e a Microsoft usam. Veja os três caminhos e o que cada um custa.',
    body: `
<p>Se você chegou procurando por <strong>mesclar PDF</strong>, provavelmente viu esse verbo em algum menu da Adobe ou da Microsoft — são as empresas que consagraram o termo em português. A operação é a mesma de juntar ou unir: transformar vários arquivos em um só.</p>

<h2>1. Mesclar online (grátis, sem instalar)</h2>
<p>A ferramenta no topo desta página faz a mesclagem dentro do navegador. Você seleciona os arquivos, ordena e baixa. Sem cadastro, sem limite e sem que os documentos sejam enviados para nenhum servidor.</p>
<p>É o caminho mais rápido, e o único dos três que funciona igual no celular.</p>

<h2>2. Mesclar no Adobe Acrobat</h2>
<p>No <strong>Acrobat Pro</strong> (versão paga), o recurso fica em <em>Ferramentas → Combinar arquivos</em>. Você arrasta os documentos, reordena as miniaturas e clica em Combinar. É a implementação mais completa que existe: mescla PDF com Word, Excel, PowerPoint e imagens na mesma operação, e permite escolher páginas específicas de cada arquivo.</p>
<p>O <strong>Acrobat Reader</strong> gratuito <em>não</em> mescla — ele apenas lê. O botão aparece, mas leva para o serviço online da Adobe, que é pago após algumas utilizações e envia o arquivo para os servidores da empresa.</p>
<p>Vale a pena se você já tem a assinatura ou precisa mesclar formatos diferentes com controle fino. Para juntar PDFs, é uma solução cara para um problema simples.</p>

<h2>3. "Mesclar" pelo Word</h2>
<p>O Word não mescla PDFs — essa é a confusão mais comum. O que ele faz é <strong>inserir texto de outro documento Word</strong> (<em>Inserir → Objeto → Texto de arquivo</em>). Se os seus PDFs vieram de arquivos .docx que você ainda tem, esse caminho produz um resultado melhor: formatação consistente, sumário funcionando e um único PDF exportado no fim.</p>
<p>Se você só tem os PDFs, inserir no Word transforma cada um em imagem ou tenta reconvertê-lo, e o resultado costuma sair deformado. Nesse caso, mescle os PDFs diretamente.</p>

<h2>Comparação</h2>
<table><thead><tr><th></th><th>Online (aqui)</th><th>Acrobat Pro</th><th>Word</th></tr></thead><tbody>
<tr><td>Custo</td><td>Grátis</td><td>Assinatura mensal</td><td>Licença do Office</td></tr>
<tr><td>Instalação</td><td>Nenhuma</td><td>Necessária</td><td>Necessária</td></tr>
<tr><td>Funciona no celular</td><td>Sim</td><td>Parcial</td><td>Limitado</td></tr>
<tr><td>Arquivo sai do aparelho</td><td>Não</td><td>Não (versão desktop)</td><td>Não</td></tr>
<tr><td>Mescla formatos diferentes</td><td>PDF e imagens</td><td>Praticamente tudo</td><td>Documentos Word</td></tr>
<tr><td>Escolher páginas de cada arquivo</td><td>Separadamente</td><td>Na mesma tela</td><td>Não</td></tr>
</tbody></table>

<h2>Mesclar apenas algumas páginas de cada arquivo</h2>
<p>Se você não quer os documentos inteiros, o caminho aqui é em duas etapas: primeiro use <a href="/extrair-paginas-pdf/">extrair páginas</a> em cada arquivo para ficar só com o que interessa, depois mescle os resultados. Dá o mesmo resultado da tela única do Acrobat, com dois cliques a mais e sem custo.</p>`,
    faq: [
      { q: 'Mesclar PDF é o mesmo que juntar?', a: 'Sim. "Mesclar" é o termo usado pela Adobe e pela Microsoft em português; juntar, unir e combinar descrevem a mesma operação.' },
      { q: 'O Adobe Reader gratuito mescla PDF?', a: 'Não. O Reader apenas lê documentos. O botão de combinar leva ao serviço online pago da Adobe, que envia o arquivo para os servidores da empresa.' },
      { q: 'O Word consegue mesclar arquivos PDF?', a: 'Não diretamente. Ele insere texto de outros documentos Word. Se você ainda tem os .docx originais, esse caminho dá um resultado melhor; se só tem os PDFs, mescle os PDFs.' },
      { q: 'Como mesclar só algumas páginas de cada PDF?', a: 'Use a ferramenta de extrair páginas em cada arquivo para separar o que interessa e depois mescle os resultados.' },
    ],
    related: ['', 'unir-pdf', 'extrair-paginas-pdf', 'pdf-para-word'],
  },

  /* ------------------------------------------------------------------- */
  {
    slug: 'combinar-pdf',
    tool: '',
    date: D,
    updated: '2026-09-01',
    title: 'Combinar PDF, Imagens e Word em Um Único Arquivo',
    description:
      'Como combinar arquivos de formatos diferentes — PDF, fotos JPG, PNG e documentos Word — em um único PDF organizado, sem instalar programas.',
    keywords: ['combinar pdf', 'combinar arquivos pdf', 'juntar pdf e imagem', 'juntar pdf e word', 'combinar documentos diferentes pdf'],
    h1: 'Combinar PDF, imagens e Word em um arquivo só',
    lede: 'O caso real quase nunca é só PDF: tem foto do RG, um .docx e três anexos digitalizados.',
    body: `
<p>Editais e sistemas de protocolo pedem "um único arquivo em PDF". Mas o que você tem na mão raramente é só PDF: é a foto do RG tirada com o celular, o currículo em .docx, o comprovante que chegou por e-mail e três páginas digitalizadas. <strong>Combinar</strong> é resolver essa mistura.</p>

<h2>A regra: converta tudo para PDF primeiro</h2>
<p>Não existe como juntar formatos diferentes diretamente. O caminho é padronizar e depois unir — três etapas:</p>
<ol>
<li><strong>Converta as imagens.</strong> Fotos e capturas de tela viram PDF em <a href="/jpg-para-pdf/">JPG para PDF</a>. Dá para converter todas de uma vez, já na ordem certa.</li>
<li><strong>Converta os documentos Word.</strong> Arquivos .docx viram PDF em <a href="/word-para-pdf/">Word para PDF</a>. Se você tem o Word instalado, "Salvar como PDF" por lá é ainda mais fiel.</li>
<li><strong>Junte tudo.</strong> Com todos os arquivos em PDF, use a ferramenta no topo desta página e defina a ordem final.</li>
</ol>

<h2>Ordem importa mais do que parece</h2>
<p>Editais costumam definir a sequência exata dos documentos, e a banca rejeita por isso. Antes de combinar, escreva a lista na ordem do edital e renomeie os arquivos com prefixo numérico (<code>01-</code>, <code>02-</code>, <code>03-</code>). Depois é só conferir a lista da ferramenta contra a do edital.</p>

<h2>Cuidados com fotos de documentos</h2>
<p>A parte mais frágil do processo costuma ser a foto do documento pessoal. Antes de converter:</p>
<ul>
<li>Fotografe de cima, com a folha apoiada em superfície plana e iluminação difusa.</li>
<li>Enquadre o documento inteiro, com uma margem pequena — cortar a borda costuma invalidar.</li>
<li>Confira se o número e a foto estão legíveis ampliando a imagem antes de converter.</li>
<li>Evite flash: o brilho apaga justamente os campos impressos.</li>
</ul>

<h2>Se o arquivo final estourar o limite</h2>
<p>Combinações com muitas fotos passam facilmente de 30 MB. Depois de juntar tudo, passe o resultado por <a href="/comprimir-pdf/">comprimir PDF</a>. Se o limite for rígido e a compressão máxima não bastar, verifique se o sistema aceita anexos múltiplos e use <a href="/dividir-pdf/">dividir PDF</a> em dois volumes.</p>

<h2>Checklist final</h2>
<ul>
<li>Todos os documentos exigidos estão presentes?</li>
<li>A ordem bate com a lista do edital?</li>
<li>Nenhuma página está de lado? Corrija com <a href="/girar-pdf/">girar PDF</a>.</li>
<li>As fotos estão legíveis em tela cheia?</li>
<li>O tamanho está dentro do limite do sistema?</li>
<li>Precisa de numeração de folhas? Use <a href="/numerar-paginas-pdf/">numerar páginas</a> no arquivo já combinado.</li>
</ul>`,
    faq: [
      { q: 'Como juntar uma foto com um PDF?', a: 'Converta a foto em PDF na ferramenta JPG para PDF e depois junte os dois arquivos. Não é possível combinar formatos diferentes diretamente.' },
      { q: 'Dá para combinar Word e PDF em um arquivo só?', a: 'Sim, em duas etapas: converta o .docx em PDF e depois junte com os demais arquivos.' },
      { q: 'Qual a ordem certa dos documentos?', a: 'A que o edital ou o sistema definir. Renomeie os arquivos com prefixo numérico antes de selecionar para não errar a sequência.' },
      { q: 'E se o arquivo combinado ficar muito grande?', a: 'Comprima o resultado final. Se ainda assim não couber, divida em dois volumes e envie separadamente, quando o sistema aceitar anexos múltiplos.' },
    ],
    related: ['', 'jpg-para-pdf', 'word-para-pdf', 'comprimir-pdf'],
  },

  /* ------------------------------------------------------------------- */
  {
    slug: 'juntar-pdf-sem-perder-qualidade',
    tool: '',
    date: D,
    updated: '2026-09-01',
    title: 'Juntar PDF Sem Perder Qualidade — O Que Realmente Muda',
    description:
      'Entenda o que acontece com texto, imagens e formatação ao juntar PDFs, quando há perda de qualidade e como evitá-la.',
    keywords: ['juntar pdf sem perder qualidade', 'juntar pdf alta qualidade', 'unir pdf sem perder resolução', 'juntar pdf qualidade original'],
    h1: 'Juntar PDF sem perder qualidade',
    lede: 'Unir corretamente não degrada nada. Entenda onde a perda aparece — e por que ela quase sempre vem de outro lugar.',
    body: `
<p>A dúvida é legítima: você junta cinco documentos nítidos e o resultado sai borrado. Mas a perda quase nunca vem da união em si. Vem de <em>como</em> a ferramenta faz a união.</p>

<h2>Como uma união correta funciona</h2>
<p>Um PDF é um conjunto de objetos: fluxos de texto com suas fontes, imagens com sua resolução, vetores com suas coordenadas. Uma ferramenta bem-feita <strong>copia esses objetos</strong> do arquivo de origem para o de destino, sem interpretá-los. Nada é redesenhado, nada é recomprimido.</p>
<p>O resultado é bit a bit equivalente ao original em termos de conteúdo: texto continua selecionável, imagens mantêm a resolução, fontes continuam incorporadas e a impressão sai idêntica. É assim que a ferramenta desta página opera.</p>

<h2>De onde vem a perda, então</h2>
<h3>Ferramentas que imprimem em vez de copiar</h3>
<p>Alguns métodos — principalmente os baseados em impressora virtual, como "Microsoft Print to PDF" — <strong>rasterizam</strong> as páginas: cada uma vira uma imagem. O texto deixa de ser selecionável, a nitidez cai para a resolução da impressão e o arquivo incha. Visualmente, é a perda mais perceptível.</p>
<h3>Compressão aplicada automaticamente</h3>
<p>Vários serviços online comprimem o resultado por padrão, para economizar banda no download. Nem sempre avisam. Se o seu arquivo sempre sai menor e mais borrado, é provavelmente isso.</p>
<h3>Recompressão de imagens</h3>
<p>Ferramentas que reprocessam imagens JPEG aplicam uma segunda compressão sobre uma imagem já comprimida. O efeito é cumulativo: cada passagem degrada um pouco mais, e não há como reverter.</p>

<h2>Como verificar se houve perda</h2>
<ul>
<li><strong>Selecione um parágrafo</strong> no arquivo final. Se não der para selecionar o texto, ele foi rasterizado.</li>
<li><strong>Compare os tamanhos.</strong> A soma dos originais e o arquivo final devem ser próximos — o final costuma ser ligeiramente menor pela deduplicação de fontes e metadados, não pela metade.</li>
<li><strong>Amplie para 400%</strong> em um trecho com letra pequena. Texto vetorial continua nítido em qualquer zoom; texto rasterizado fica serrilhado.</li>
</ul>

<h2>E quando eu preciso mesmo reduzir o tamanho?</h2>
<p>Aí a perda é intencional e controlada, e deve ser o último passo. Junte primeiro preservando tudo, confira o resultado e só então use <a href="/comprimir-pdf/">comprimir PDF</a> escolhendo o nível. Assim você sabe exatamente o que foi trocado por quantos megabytes — e mantém o original intacto para o arquivo definitivo.</p>

<blockquote><p><strong>Regra prática:</strong> una preservando, comprima depois, e guarde sempre o arquivo unido sem compressão como versão de arquivo.</p></blockquote>`,
    faq: [
      { q: 'Juntar PDF diminui a qualidade?', a: 'Não, quando a ferramenta copia as páginas sem reprocessá-las — que é o caso desta. A perda aparece em métodos que rasterizam as páginas ou aplicam compressão automática.' },
      { q: 'Como saber se o PDF foi rasterizado?', a: 'Tente selecionar um trecho de texto no arquivo final. Se não for possível selecionar, as páginas viraram imagem.' },
      { q: 'Por que o arquivo final ficou menor que a soma dos originais?', a: 'Uma pequena redução é normal: fontes e metadados repetidos são unificados. Uma redução grande indica que houve compressão.' },
      { q: 'Devo comprimir antes ou depois de juntar?', a: 'Depois, sempre. Junte preservando a qualidade, confira, e só então comprima se precisar caber em um limite.' },
    ],
    related: ['', 'comprimir-pdf', 'juntar-varios-pdf', 'pdf-para-jpg'],
  },
];
