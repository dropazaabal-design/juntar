/**
 * Long-form articles about working with PDFs.
 *
 * These target informational queries rather than the tool keywords — the space
 * where a small site can out-write iLovePDF, whose blog is thin. Each carries
 * one diagram that shows a mechanism the prose would otherwise have to build
 * sentence by sentence, and ends with the quiet project note.
 */
import { figures } from '../../templates/figures.mjs';

const D = '2026-09-17';

export const articleGuides = [
  /* ------------------------------------------------------------------- */
  {
    slug: 'como-reduzir-tamanho-pdf',
    tool: null,
    article: true,
    date: D,
    updated: D,
    title: 'Como Reduzir o Tamanho de um PDF (e Quando Não Adianta)',
    description:
      'Por que um PDF fica pesado, quanto dá para reduzir em cada caso e o que fazer quando a compressão não é suficiente para caber no limite do sistema.',
    keywords: ['reduzir tamanho pdf', 'diminuir pdf', 'pdf muito grande', 'comprimir pdf', 'pdf pesado', 'reduzir pdf para 2mb'],
    h1: 'Como reduzir o tamanho de um PDF',
    lede: 'Onde o peso realmente está, quanto dá para ganhar — e por que alguns arquivos simplesmente não encolhem.',
    body: `
<p>O aviso é sempre o mesmo: <em>"o arquivo excede o tamanho máximo permitido"</em>. O sistema aceita 10 MB, o seu PDF tem 38 MB, e o prazo fecha hoje. Antes de sair testando ferramentas, vale entender de onde vem esse peso — porque isso determina quanto você consegue ganhar.</p>

<h2>Onde o peso está</h2>
<p>Um PDF guarda três tipos de coisa: <strong>texto vetorial</strong> (as letras, descritas como formas matemáticas), <strong>fontes incorporadas</strong> e <strong>imagens</strong>. As duas primeiras são leves. A terceira não.</p>
${figures.weight()}
<p>Uma página digitalizada é, para o computador, uma fotografia. Uma folha A4 capturada a 300 DPI tem cerca de 8,7 milhões de pixels. Quinze páginas assim chegam a 40 MB sem esforço. Já um relatório de quinze páginas exportado do Word raramente passa de 400 KB — porque ali não há fotografia nenhuma, só instruções de desenho.</p>

<h2>O que a compressão faz</h2>
<p>Comprimir um PDF significa, na prática, <strong>redesenhar cada página numa resolução menor e regravá-la como JPEG</strong>. O ganho vem quase todo da imagem; o resto do arquivo muda pouco.</p>
<table><thead><tr><th>Nível</th><th>Resolução</th><th>Redução típica num digitalizado</th></tr></thead><tbody>
<tr><td>Leve</td><td>~150 DPI</td><td>40–60%</td></tr>
<tr><td>Recomendado</td><td>~110 DPI</td><td>70–85%</td></tr>
<tr><td>Máximo</td><td>~72 DPI</td><td>85–93%</td></tr>
</tbody></table>
<p>Use a ferramenta de <a href="/comprimir-pdf/">comprimir PDF</a> e confira o tamanho exibido antes de baixar. Como o processamento acontece no seu próprio navegador, testar outro nível custa segundos e nenhum upload.</p>

<h2>Quando não vai adiantar</h2>
<p>Se o seu PDF é só texto e já está com 800 KB, não há imagem para otimizar. Insistir na compressão vai transformar texto nítido em imagem borrada e, em documentos muito leves, o arquivo pode até <strong>crescer</strong>.</p>
<p>Nesse caso o peso vem de outro lugar: número de páginas, fontes incorporadas em excesso, ou anexos embutidos. A solução é <a href="/dividir-pdf/">dividir o PDF</a> em partes, não comprimir.</p>

<blockquote><p><strong>Cuidado com documentos assinados.</strong> Comprimir gera um arquivo novo e invalida qualquer assinatura digital com certificado. Comprima antes de assinar — nunca depois.</p></blockquote>

<h2>Para caber em 2 MB, 5 MB ou 10 MB</h2>
<p>Editais e sistemas de protocolo costumam impor um teto exato. O caminho prático:</p>
<ol>
<li>Comece no nível <strong>Recomendado</strong> e veja o tamanho resultante.</li>
<li>Ainda acima? Refaça no <strong>Máximo</strong>.</li>
<li>Ainda acima? Verifique se há páginas que não precisam ir — <a href="/remover-paginas-pdf/">remova-as</a>.</li>
<li>Se mesmo assim não couber, <a href="/dividir-pdf/">divida em dois volumes</a>. Quase todos os sistemas aceitam anexos múltiplos.</li>
</ol>

<h2>Evitar o problema na origem</h2>
<p>Metade dos PDFs pesados nasce de uma configuração de digitalização alta demais. Para documentos que serão lidos em tela e arquivados:</p>
<ul>
<li><strong>200 DPI em tons de cinza</strong> resolve quase tudo. 600 DPI colorido é para fotografia, não para contrato.</li>
<li>No aplicativo de digitalização do celular, escolha o modo <em>documento</em> em vez de <em>foto</em>.</li>
<li>Se o original é digital — um contrato que chegou por e-mail — não imprima para digitalizar de volta. Você troca 300 KB de texto nítido por 12 MB de imagem.</li>
</ul>`,
    faq: [
      { q: 'Quanto um PDF pode diminuir?', a: 'Documentos digitalizados costumam cair entre 70% e 90%. PDFs que só têm texto reduzem pouco, porque não há imagens pesadas para otimizar.' },
      { q: 'Por que meu PDF não diminui?', a: 'Provavelmente ele não tem imagens. Um arquivo gerado pelo Word ou por um sistema já é essencialmente texto, que ocupa muito pouco espaço. Nesse caso divida o documento em vez de comprimir.' },
      { q: 'Comprimir apaga o texto selecionável?', a: 'Sim. As páginas são regravadas como imagem, então o texto deixa de ser pesquisável. Guarde o original se precisar dessa característica.' },
      { q: 'Qual resolução usar ao digitalizar?', a: '200 DPI em tons de cinza atende quase todos os documentos de texto. Reserve 300 DPI ou mais para fotografias e materiais que serão impressos em gráfica.' },
    ],
    related: ['comprimir-pdf', 'dividir-pdf', 'enviar-arquivos-grandes-por-email', 'pdf-digitalizado-ou-texto'],
  },

  /* ------------------------------------------------------------------- */
  {
    slug: 'pdf-digitalizado-ou-texto',
    tool: null,
    article: true,
    date: D,
    updated: D,
    title: 'PDF Digitalizado ou PDF de Texto? Como Saber em 1 Segundo',
    description:
      'A diferença entre um PDF que contém texto e um que contém apenas imagens explica quase todos os problemas de cópia, conversão e tamanho de arquivo.',
    keywords: ['pdf digitalizado', 'pdf pesquisável', 'pdf editável', 'não consigo copiar texto pdf', 'ocr pdf', 'pdf imagem ou texto'],
    h1: 'PDF digitalizado ou PDF de texto?',
    lede: 'Uma distinção que explica quase todo problema que as pessoas têm com PDF — e um teste que leva um segundo.',
    body: `
<p>"Não consigo copiar o texto." "O conversor devolveu um arquivo vazio." "Por que este PDF tem 40 MB?" As três reclamações têm a mesma causa, e quem conhece a distinção abaixo resolve as três sozinho.</p>

<h2>Dois arquivos que parecem iguais</h2>
<p>Abra dois PDFs lado a lado. Ambos mostram um contrato. Visualmente, idênticos. Mas por dentro:</p>
${figures.textLayer()}
<p>O primeiro veio de um scanner ou de uma foto: é uma <strong>imagem de uma página</strong>. Para o computador, não existe uma única letra ali — existem pixels claros e escuros que o seu olho interpreta como texto.</p>
<p>O segundo foi gerado digitalmente, por um editor ou por um sistema: contém os <strong>caracteres de verdade</strong>, cada um com sua fonte e posição.</p>

<h2>O teste de um segundo</h2>
<p>Abra o PDF em qualquer leitor e <strong>tente selecionar uma palavra com o mouse</strong>. Conseguiu? É um PDF de texto. Não conseguiu — o cursor só desenha um retângulo sobre a página — é um PDF digitalizado.</p>
<p>Alternativa igualmente rápida: <kbd>Ctrl</kbd>+<kbd>F</kbd> e procure uma palavra que você está vendo na tela. Se o leitor diz que não encontrou, ela não está lá como texto.</p>

<h2>O que isso explica</h2>
<table><thead><tr><th>Sintoma</th><th>Causa</th></tr></thead><tbody>
<tr><td>Não dá para copiar o texto</td><td>Não há texto — só imagem</td></tr>
<tr><td><a href="/pdf-para-word/">Converter para Word</a> devolve página em branco</td><td>Não há o que converter</td></tr>
<tr><td><a href="/pdf-para-texto/">Extrair texto</a> não retorna nada</td><td>Mesma razão</td></tr>
<tr><td>O arquivo tem dezenas de megabytes</td><td>Cada página é uma fotografia</td></tr>
<tr><td>O texto fica serrilhado ao ampliar</td><td>Imagem tem resolução fixa; texto vetorial não</td></tr>
<tr><td>A busca do sistema não acha o documento</td><td>Não há texto para indexar</td></tr>
</tbody></table>

<h2>OCR: transformar imagem em texto</h2>
<p>A tecnologia que resolve isso chama-se <strong>OCR</strong> — reconhecimento óptico de caracteres. Ela analisa o desenho de cada mancha escura e tenta adivinhar qual letra é.</p>
<p>Funciona bem em documentos impressos, limpos e retos. Erra com frequência em letra manuscrita, carimbos, tabelas com linhas finas, páginas tortas e digitalizações de baixa resolução. E o erro é traiçoeiro: um CPF com um dígito trocado parece perfeitamente válido.</p>
<p>Por isso, quando o documento é digitalizado, as nossas ferramentas de extração <strong>avisam em vez de devolver um arquivo vazio</strong> — preferimos dizer que não há texto a entregar um resultado que parece certo e não é.</p>

<h2>Como não produzir PDFs digitalizados sem necessidade</h2>
<ul>
<li><strong>Nunca imprima para digitalizar de volta.</strong> Se o documento chegou por e-mail em PDF, ele já é de texto. Imprimir e escanear destrói essa propriedade e multiplica o tamanho.</li>
<li><strong>Exporte, não fotografe.</strong> No Word, use "Salvar como PDF"; no navegador, "Imprimir → Salvar como PDF". O resultado mantém o texto.</li>
<li><strong>Quando só houver papel</strong>, digitalize em 200–300 DPI e mantenha a página reta — é o que dá ao OCR a melhor chance, caso você precise dele depois.</li>
</ul>
<p>Operações que <em>não</em> dependem dessa distinção: <a href="/">juntar</a>, <a href="/dividir-pdf/">dividir</a>, <a href="/girar-pdf/">girar</a> e <a href="/organizar-pdf/">organizar</a> páginas funcionam igual nos dois tipos, porque mexem na estrutura do documento e não no conteúdo.</p>`,
    faq: [
      { q: 'Como saber se um PDF é digitalizado?', a: 'Tente selecionar uma palavra com o mouse. Se não for possível selecionar nenhum texto, o arquivo é uma imagem da página.' },
      { q: 'Por que não consigo copiar o texto do meu PDF?', a: 'Porque provavelmente não há texto no arquivo — só uma imagem. Seria necessário OCR para reconhecer os caracteres.' },
      { q: 'O que é OCR?', a: 'Reconhecimento óptico de caracteres: a tecnologia que analisa a imagem de uma página e tenta identificar quais letras estão desenhadas ali. Funciona bem em impressos limpos e erra com frequência em manuscritos e digitalizações ruins.' },
      { q: 'Dá para juntar um PDF digitalizado com um PDF de texto?', a: 'Sim. Juntar, dividir, girar e organizar páginas funcionam igual nos dois tipos, porque essas operações mexem na estrutura do documento e não no conteúdo das páginas.' },
    ],
    related: ['pdf-para-texto', 'pdf-para-word', 'como-reduzir-tamanho-pdf', 'digitalizar-documentos-com-celular'],
  },

  /* ------------------------------------------------------------------- */
  {
    slug: 'como-assinar-pdf-digitalmente',
    tool: null,
    article: true,
    date: '2026-09-17',
    updated: '2026-09-17',
    title: 'Como Assinar um PDF: Simples, Certificado Digital e Gov.br',
    description:
      'As três formas de assinar um PDF no Brasil, o que cada uma prova juridicamente e quando cada uma é aceita — com o passo a passo do Gov.br.',
    keywords: ['assinar pdf', 'assinatura digital pdf', 'assinar pdf gov.br', 'certificado digital pdf', 'assinatura eletrônica válida'],
    h1: 'Como assinar um PDF',
    lede: 'Desenhar a assinatura, usar certificado digital ou assinar pelo Gov.br — o que muda juridicamente entre as três.',
    body: `
<p>"Assinar um PDF" descreve três coisas bem diferentes, e escolher a errada custa tempo: o contrato volta recusado, a petição não é aceita, o cartório pede outra coisa. A diferença não está na aparência do documento — está no que a assinatura consegue <strong>provar</strong>.</p>

<h2>O que cada tipo prende ao documento</h2>
${figures.signature()}
<p>Na assinatura simples, a imagem fica <em>sobre</em> a página, como um carimbo. Se alguém alterar um valor no contrato depois, a assinatura continua lá, intacta e inútil como prova.</p>
<p>Nas assinaturas com certificado, um cálculo criptográfico do conteúdo inteiro é gravado junto. Mudou uma vírgula, a conta não fecha e o leitor de PDF exibe o aviso de documento alterado.</p>

<h2>1. Assinatura eletrônica simples</h2>
<p>É a imagem da sua assinatura aplicada ao documento — o que a nossa ferramenta de <a href="/assinar-pdf/">assinar PDF</a> faz. Você desenha com o dedo ou o mouse, posiciona na página e baixa o arquivo.</p>
<p><strong>Onde é aceita:</strong> contratos entre particulares, autorizações escolares, propostas comerciais, formulários internos, recibos. A Lei 14.063/2020 reconhece a assinatura eletrônica simples quando as partes concordam com o meio — e é assim que a maior parte do comércio funciona no dia a dia.</p>
<p><strong>Onde não é aceita:</strong> onde a lei, o edital ou o contrato exigirem certificado digital.</p>

<h2>2. Assinatura com certificado digital (ICP-Brasil)</h2>
<p>Usa um certificado emitido por uma autoridade certificadora credenciada — o e-CPF ou o e-CNPJ, em cartão, token ou nuvem. O certificado vincula matematicamente a sua identidade ao conteúdo exato do arquivo.</p>
<p><strong>Onde é exigida:</strong> peticionamento eletrônico em tribunais, notas fiscais eletrônicas, e-Social, declarações à Receita, procurações eletrônicas, licitações.</p>
<p>Custa algo entre R$ 150 e R$ 400 por ano e exige validação presencial ou por vídeo. Nenhuma ferramenta de navegador pode emitir ou usar esse certificado por você — é uma limitação de segurança, não de tecnologia.</p>

<h2>3. Gov.br — o meio-termo gratuito</h2>
<p>O governo oferece assinatura com validade jurídica sem custo, para quem tem conta <strong>nível prata ou ouro</strong>:</p>
<ol>
<li>Acesse <strong>gov.br/assinaturaeletronica</strong> e entre com a sua conta.</li>
<li>Envie o PDF (limite de 100 MB).</li>
<li>Posicione a assinatura na página.</li>
<li>Confirme com o código enviado ao aplicativo Gov.br.</li>
<li>Baixe o arquivo assinado.</li>
</ol>
<p>Aceita em boa parte dos serviços públicos e em contratos particulares. Para subir de nível bronze para prata, valide a conta pelo aplicativo do seu banco ou pelo reconhecimento facial da CNH.</p>

<h2>A ordem que evita retrabalho</h2>
<p>Este é o erro que mais faz gente refazer tudo: <strong>qualquer alteração no arquivo invalida uma assinatura com certificado</strong>. Comprimir, juntar, girar, numerar — tudo gera um arquivo novo, e a assinatura passa a acusar violação.</p>
<blockquote><p>Monte o documento primeiro, assine por último. <a href="/">Junte</a> as partes, <a href="/organizar-pdf/">organize</a> as páginas, <a href="/numerar-paginas-pdf/">numere</a> as folhas, <a href="/comprimir-pdf/">comprima</a> se precisar — e só então assine.</p></blockquote>

<h2>Como verificar uma assinatura recebida</h2>
<p>Recebeu um documento assinado e quer conferir? Abra em <strong>validar.iti.gov.br</strong>, o validador oficial. Ele informa quem assinou, quando, com qual certificado e se o arquivo foi alterado depois. É gratuito e não exige cadastro.</p>`,
    faq: [
      { q: 'Assinatura desenhada no PDF tem validade jurídica?', a: 'Sim, como assinatura eletrônica simples, quando as partes aceitam esse meio — situação prevista na Lei 14.063/2020. Não substitui certificado digital onde a lei ou o edital exigirem.' },
      { q: 'Como assinar um PDF de graça com validade?', a: 'Pelo Gov.br, em gov.br/assinaturaeletronica, com conta nível prata ou ouro. É gratuito e aceito em boa parte dos serviços públicos.' },
      { q: 'Posso comprimir um PDF depois de assinar?', a: 'Não. Qualquer alteração gera um arquivo novo e invalida assinaturas com certificado. Comprima, junte e numere antes de assinar.' },
      { q: 'Como verificar se um PDF assinado foi alterado?', a: 'Use o validador oficial em validar.iti.gov.br. Ele mostra quem assinou, quando e se o arquivo sofreu alteração posterior.' },
    ],
    related: ['assinar-pdf', 'comprimir-pdf', '', 'marca-dagua-pdf'],
  },

  /* ------------------------------------------------------------------- */
  {
    slug: 'converter-pdf-para-word-sem-perder-formatacao',
    tool: null,
    article: true,
    date: '2026-09-17',
    updated: '2026-09-17',
    title: 'Converter PDF para Word Sem Perder a Formatação: O Que É Possível',
    description:
      'Por que nenhum conversor devolve o layout idêntico, o que realmente sobrevive à conversão e qual caminho dá o melhor resultado em cada caso.',
    keywords: ['pdf para word sem perder formatação', 'converter pdf em word', 'pdf editável', 'pdf para docx', 'editar pdf no word'],
    h1: 'Converter PDF para Word sem perder a formatação',
    lede: 'A promessa que todo conversor faz e nenhum cumpre inteiramente — e o motivo é estrutural, não falta de capricho.',
    body: `
<p>Você precisa mudar duas cláusulas de um contrato que só existe em PDF. Converte para Word e o resultado chega com as colunas embaralhadas, tabelas viradas em texto solto e quebras de linha no meio das frases. Não é má vontade do conversor — é a natureza dos dois formatos.</p>

<h2>Por que o layout se perde</h2>
${figures.pdfVsDocx()}
<p>O PDF foi desenhado para <strong>imprimir igual em qualquer lugar</strong>. Ele guarda cada caractere numa coordenada exata: "o glifo C fica em x=72, y=640; o o em x=79,4". Não existe o conceito de parágrafo, de coluna ou de célula de tabela — só posições.</p>
<p>O DOCX foi desenhado para <strong>ser editado</strong>. Ele guarda parágrafos, estilos e tabelas como estruturas, e o texto reflui quando você digita.</p>
<p>Converter significa olhar para uma nuvem de caracteres posicionados e <em>inferir</em> a estrutura: estas letras próximas formam uma palavra; estas linhas com o mesmo recuo são um parágrafo; este alinhamento vertical talvez seja uma tabela — ou talvez sejam duas colunas de texto. É adivinhação informada, e às vezes a adivinhação erra.</p>

<h2>O que sobrevive e o que não</h2>
<table><thead><tr><th>Preservado com confiança</th><th>Reconstruído com risco</th></tr></thead><tbody>
<tr><td>O texto, na ordem de leitura</td><td>Tabelas com bordas</td></tr>
<tr><td>Divisão em parágrafos</td><td>Layout em duas ou mais colunas</td></tr>
<tr><td>Quebras de página</td><td>Posicionamento exato de imagens</td></tr>
<tr><td>Negrito e itálico</td><td>Cabeçalhos e rodapés</td></tr>
<tr><td>Listas simples</td><td>Fontes originais, se não forem comuns</td></tr>
</tbody></table>
<p>A nossa ferramenta de <a href="/pdf-para-word/">PDF para Word</a> prioriza deliberadamente a primeira coluna: texto correto, na ordem certa, editável, com parágrafos e páginas separados. Você recebe um <code>.docx</code> limpo para reformatar — o que costuma ser mais rápido do que consertar uma reconstrução malfeita de tabelas.</p>
<p>E, diferente da maioria dos conversores, o arquivo não é enviado para servidor nenhum: a leitura e a montagem do <code>.docx</code> acontecem no seu navegador.</p>

<h2>Se o PDF for digitalizado, não há conversão</h2>
<p>Um documento que veio de scanner contém imagens, não texto. Não há caracteres para reposicionar. Qualquer serviço que prometa converter esse arquivo está aplicando OCR, com a taxa de erro que o OCR tem — e um número trocado num contrato passa despercebido.</p>
<p>O teste está em <a href="/pdf-digitalizado-ou-texto/">PDF digitalizado ou PDF de texto</a>: se você não consegue selecionar uma palavra, não há o que converter.</p>

<h2>Escolhendo o caminho certo</h2>
<table><thead><tr><th>Seu objetivo</th><th>Melhor caminho</th></tr></thead><tbody>
<tr><td>Editar o texto</td><td><a href="/pdf-para-word/">PDF para Word</a></td></tr>
<tr><td>Só copiar o conteúdo</td><td><a href="/pdf-para-texto/">PDF para texto</a> — mais limpo, sem formatação para atrapalhar</td></tr>
<tr><td>Manter o layout intacto</td><td>Não converta. Edite o PDF ou peça o arquivo original</td></tr>
<tr><td>Trocar poucas palavras</td><td>Um editor de PDF preserva o layout melhor que a ida e volta ao Word</td></tr>
<tr><td>Reaproveitar uma tabela</td><td>Copie a tabela e recrie-a — sai mais rápido que corrigir a conversão</td></tr>
</tbody></table>

<h2>O atalho que quase ninguém tenta</h2>
<p>Antes de converter, <strong>peça o arquivo original</strong>. Contratos, relatórios e propostas quase sempre nasceram num editor de texto, e quem enviou o PDF costuma ter o <code>.docx</code> guardado. Trinta segundos de mensagem poupam uma hora de reformatação.</p>
<p>Depois de editar, para voltar ao formato de entrega, use <a href="/word-para-pdf/">Word para PDF</a>.</p>`,
    faq: [
      { q: 'Existe conversor de PDF para Word que mantenha a formatação perfeita?', a: 'Não. O PDF guarda posições de caracteres, não parágrafos e tabelas, então toda conversão é uma reconstrução por inferência. Isso vale inclusive para as ferramentas pagas.' },
      { q: 'O que é preservado na conversão?', a: 'O texto na ordem de leitura, a divisão em parágrafos, as quebras de página, negrito e itálico. Tabelas com bordas, colunas e posicionamento de imagens são os pontos frágeis.' },
      { q: 'Funciona com PDF digitalizado?', a: 'Não. Documentos escaneados são imagens e não contêm texto para converter. Seria preciso OCR, com a margem de erro que o OCR tem.' },
      { q: 'Qual a alternativa quando o layout precisa ficar idêntico?', a: 'Não converter. Edite o próprio PDF num editor de PDF ou peça o arquivo original a quem o enviou.' },
    ],
    related: ['pdf-para-word', 'pdf-para-texto', 'word-para-pdf', 'pdf-digitalizado-ou-texto'],
  },

  /* ------------------------------------------------------------------- */
  {
    slug: 'enviar-arquivos-grandes-por-email',
    tool: null,
    article: true,
    date: '2026-09-17',
    updated: '2026-09-17',
    title: 'Como Enviar Arquivos Grandes por E-mail: Limites e Saídas',
    description:
      'Os limites reais de anexo do Gmail, Outlook e sistemas de protocolo, e a ordem de tentativas que resolve sem quebrar o documento.',
    keywords: ['enviar arquivo grande por email', 'limite anexo gmail', 'arquivo muito grande para enviar', 'anexo excede tamanho'],
    h1: 'Como enviar arquivos grandes por e-mail',
    lede: 'Os limites que você realmente enfrenta e a ordem de tentativas que resolve sem quebrar o documento em pedaços.',
    body: `
<p>O e-mail nasceu para texto. Anexos foram um acréscimo, e todos os serviços impõem um teto — quase sempre menor do que você precisa. Pior: o limite do <strong>destinatário</strong> também conta, e você não o conhece.</p>

<h2>Os limites que importam</h2>
<table><thead><tr><th>Serviço</th><th>Limite de anexo</th></tr></thead><tbody>
<tr><td>Gmail</td><td>25 MB (acima disso, oferece link do Drive)</td></tr>
<tr><td>Outlook / Hotmail</td><td>20 MB no webmail</td></tr>
<tr><td>Yahoo Mail</td><td>25 MB</td></tr>
<tr><td>E-mail corporativo</td><td>10–25 MB, definido pelo administrador</td></tr>
<tr><td>Sistemas de protocolo e tribunais</td><td>Frequentemente 10 MB por arquivo</td></tr>
<tr><td>WhatsApp (documento)</td><td>100 MB</td></tr>
</tbody></table>
<p>Há ainda um detalhe técnico que surpreende: anexos são codificados em Base64 para trafegar, o que <strong>aumenta o tamanho em cerca de 33%</strong>. Um arquivo de 19 MB chega perto de 25 MB na transmissão — e é por isso que um anexo "dentro do limite" às vezes é recusado.</p>

<h2>A ordem que resolve</h2>
${figures.tooBig()}
<p>Comece sempre pela compressão. Ela resolve a maioria dos casos sem fragmentar o documento, e um arquivo único é muito mais fácil de arquivar para quem recebe.</p>
<ol>
<li><strong><a href="/comprimir-pdf/">Comprimir o PDF</a></strong> — em documentos digitalizados, a redução costuma ficar entre 70% e 90%.</li>
<li><strong><a href="/remover-paginas-pdf/">Remover o que não precisa ir</a></strong> — páginas em branco do verso, folhas de rosto do scanner, anexos repetidos.</li>
<li><strong><a href="/dividir-pdf/">Dividir em partes</a></strong> — quando o limite é rígido. Nomeie os arquivos <code>Parte 1 de 3</code>, <code>Parte 2 de 3</code> para quem recebe não se perder.</li>
<li><strong>Enviar um link</strong> — Google Drive, OneDrive ou WeTransfer, quando nada mais couber.</li>
</ol>

<h2>Cuidados com o link</h2>
<p>É a saída mais fácil e a que mais causa problema depois:</p>
<ul>
<li><strong>Confira a permissão.</strong> "Qualquer pessoa com o link" é diferente de "pessoas específicas". O erro mais comum é enviar um link que o destinatário não consegue abrir.</li>
<li><strong>Atenção ao prazo.</strong> O WeTransfer gratuito apaga os arquivos em 7 dias. Para um processo que será consultado meses depois, isso é inaceitável.</li>
<li><strong>Verifique se o sistema aceita.</strong> Muitos protocolos eletrônicos exigem o arquivo anexado, não um link — um link não é documento juntado aos autos.</li>
<li><strong>Documentos sigilosos</strong> num link público circulam indefinidamente. Prefira compartilhamento restrito por e-mail.</li>
</ul>

<h2>Não use ZIP dividido em partes</h2>
<p>Alguns tutoriais sugerem compactar em volumes de 10 MB. Evite: o destinatário precisa de todas as partes e de um programa capaz de remontá-las, muitos servidores bloqueiam <code>.zip</code> por segurança, e uma parte perdida inutiliza o conjunto. <a href="/dividir-pdf/">Dividir o próprio PDF</a> é melhor — cada parte abre sozinha, em qualquer aparelho.</p>

<h2>Evitar o problema antes dele acontecer</h2>
<ul>
<li>Digitalize em <strong>200 DPI em tons de cinza</strong> para documentos de texto. Colorido a 600 DPI multiplica o tamanho por seis sem ganho de legibilidade.</li>
<li>Não imprima um PDF para digitalizá-lo de volta — você troca um arquivo leve de texto por um pesado de imagem.</li>
<li>Comprima <strong>depois</strong> de <a href="/">juntar</a> tudo. Comprimir cada parte separadamente rende menos e demora mais.</li>
</ul>`,
    faq: [
      { q: 'Qual o limite de anexo do Gmail?', a: '25 MB. Acima disso o Gmail oferece automaticamente enviar por link do Google Drive.' },
      { q: 'Por que meu anexo de 22 MB foi recusado num limite de 25 MB?', a: 'Anexos são codificados em Base64 para trafegar, o que aumenta o tamanho em cerca de 33%. O limite se aplica ao tamanho codificado.' },
      { q: 'É melhor dividir o PDF ou compactar em ZIP?', a: 'Dividir o PDF. Cada parte abre sozinha em qualquer aparelho, enquanto um ZIP em volumes exige todas as partes e um programa para remontá-las — e muitos servidores bloqueiam .zip.' },
      { q: 'Posso enviar um link em vez do arquivo em processos judiciais?', a: 'Em geral não. Sistemas de protocolo costumam exigir o arquivo anexado, porque um link não é documento juntado aos autos.' },
    ],
    related: ['comprimir-pdf', 'dividir-pdf', 'como-reduzir-tamanho-pdf', ''],
  },

  /* ------------------------------------------------------------------- */
  {
    slug: 'digitalizar-documentos-com-celular',
    tool: null,
    article: true,
    date: '2026-09-17',
    updated: '2026-09-17',
    title: 'Como Digitalizar Documentos com o Celular (Sem Instalar App)',
    description:
      'O scanner nativo do iPhone e do Android, como enquadrar para o documento não ser recusado e como transformar as fotos em um PDF único.',
    keywords: ['digitalizar documento celular', 'escanear documento celular', 'scanner celular', 'foto de documento em pdf', 'digitalizar sem app'],
    h1: 'Como digitalizar documentos com o celular',
    lede: 'Recursos nativos que quase ninguém usa, e os erros de enquadramento que fazem um documento ser recusado.',
    body: `
<p>Boa parte dos documentos recusados em inscrições e protocolos não tem problema de conteúdo: tem problema de <strong>captura</strong>. Borda cortada, brilho sobre o número, página em trapézio. O celular resolve tudo isso sem instalar nada — os recursos já estão ali.</p>

<h2>A geometria que decide tudo</h2>
${figures.scan()}
<p>Fotografar de lado deforma a página num trapézio e joga a borda distante para fora do plano de foco. Nenhum ajuste posterior recupera detalhe que não foi capturado nítido.</p>
<p>Apoie o documento numa superfície plana e segure o celular <strong>paralelo à folha</strong>, centralizado. Se precisar, aproxime-se em vez de inclinar.</p>

<h2>O scanner nativo do iPhone</h2>
<p>O iOS tem um digitalizador completo escondido em dois lugares:</p>
<ol>
<li>Abra o app <strong>Arquivos</strong>, toque nos três pontos (⋯) e escolha <strong>Digitalizar Documentos</strong>.</li>
<li>Ou, no app <strong>Notas</strong>, crie uma nota, toque na câmera e escolha <strong>Digitalizar Documentos</strong>.</li>
</ol>
<p>Ele detecta as bordas sozinho, corrige a perspectiva, ajusta o contraste e captura várias páginas em sequência. O resultado já sai como PDF.</p>

<h2>No Android</h2>
<p>O <strong>Google Drive</strong> traz o scanner embutido: toque no <strong>+</strong> e escolha <strong>Digitalizar</strong>. O arquivo vai direto para o Drive em PDF, e dá para adicionar páginas antes de salvar.</p>
<p>Celulares Samsung, Xiaomi e Motorola costumam ter detecção de documento no próprio aplicativo de câmera — procure por "digitalizar documento" ou por um ícone de folha quando a câmera aponta para um papel.</p>

<h2>Iluminação: o erro mais comum</h2>
<ul>
<li><strong>Nunca use flash.</strong> Ele cria um ponto branco que apaga exatamente os campos impressos.</li>
<li><strong>Prefira luz natural difusa</strong> — perto de uma janela, sem sol direto.</li>
<li><strong>Evite a sua própria sombra.</strong> Posicione-se de lado à fonte de luz, não de costas.</li>
<li><strong>Documentos plastificados</strong> (RG, CNH) refletem muito. Incline levemente a <em>folha</em>, não a câmera, até o reflexo sair do campo.</li>
</ul>

<h2>Enquadramento que não é recusado</h2>
<ul>
<li>Capture o documento <strong>inteiro</strong>, com uma margem pequena em volta. Borda cortada costuma invalidar.</li>
<li>Fundo escuro e liso ajuda a detecção automática de bordas.</li>
<li>Alise o papel. Vincos criam sombras que o processamento interpreta como sujeira.</li>
<li>Confira ampliando a imagem antes de enviar: número do documento, data e assinatura precisam estar legíveis em 100%.</li>
</ul>

<h2>Das fotos ao PDF único</h2>
<p>Se você fotografou com a câmera comum em vez do scanner, as imagens ficam soltas na galeria — e quem recebe não quer oito JPGs num e-mail.</p>
<p>Use <a href="/jpg-para-pdf/">JPG para PDF</a>: selecione todas as fotos de uma vez, arraste para colocar na ordem correta e baixe um PDF único. Funciona no próprio celular, e as imagens não são enviadas para servidor nenhum.</p>
<p>Se o resultado ficar pesado demais para o limite do sistema, passe por <a href="/comprimir-pdf/">comprimir PDF</a>. Já digitalizou em partes? <a href="/">Junte os PDFs</a> num arquivo só.</p>

<blockquote><p><strong>Atenção:</strong> um documento digitalizado é uma imagem — não contém texto pesquisável. Se você vai precisar copiar o conteúdo depois, veja <a href="/pdf-digitalizado-ou-texto/">PDF digitalizado ou PDF de texto</a>.</p></blockquote>`,
    faq: [
      { q: 'Como digitalizar um documento no iPhone sem baixar aplicativo?', a: 'No app Arquivos, toque nos três pontos e escolha Digitalizar Documentos. O mesmo recurso está no app Notas, pelo ícone da câmera.' },
      { q: 'Como escanear com o Android?', a: 'Pelo Google Drive: toque no botão + e escolha Digitalizar. O resultado é salvo diretamente em PDF.' },
      { q: 'Posso usar flash para fotografar documentos?', a: 'Não. O flash cria um ponto de brilho que apaga trechos impressos. Prefira luz natural difusa, de lado.' },
      { q: 'Como transformar várias fotos de documento em um PDF?', a: 'Use a ferramenta JPG para PDF: selecione todas as imagens, ajuste a ordem e baixe um arquivo único.' },
    ],
    related: ['jpg-para-pdf', 'comprimir-pdf', '', 'pdf-digitalizado-ou-texto'],
  },
];
