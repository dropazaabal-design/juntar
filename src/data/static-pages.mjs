import { site } from './site.mjs';

const today = '2026-09-01';

export const staticPages = [
  {
    slug: 'sobre',
    title: `Sobre o ${site.name} — Ferramentas PDF que Não Enviam Seus Arquivos`,
    description:
      'Quem somos, por que processamos tudo no navegador e como o JuntarPDF se sustenta sem cobrar, sem cadastro e sem marca d’água.',
    keywords: ['sobre juntarpdf', 'quem somos juntarpdf', 'ferramenta pdf brasileira'],
    h1: `Sobre o ${site.name}`,
    eyebrow: 'Quem somos',
    lede: 'Ferramentas de PDF que resolvem o problema sem pedir o seu documento em troca.',
    breadcrumbs: [{ name: 'Sobre', url: '/sobre/' }],
    html: `
<h2>O problema que queríamos resolver</h2>
<p>Todo site gratuito de PDF funciona igual: você envia o arquivo, um servidor faz o trabalho e devolve o resultado. É um modelo que funciona, mas tem um custo escondido — o seu contrato, o seu laudo médico, a sua declaração de imposto de renda passou pela máquina de outra pessoa.</p>
<p>As páginas de privacidade prometem exclusão em uma hora, e provavelmente essa promessa é cumprida. Mas a promessa é o único mecanismo: não há como verificar, e um vazamento no servidor alcança arquivos que você nem lembra ter enviado.</p>
<p>O ${site.name} foi construído sobre uma ideia simples: <strong>o navegador já é capaz de fazer esse trabalho sozinho</strong>. Se a conta pode ser feita no seu aparelho, não há motivo para o arquivo sair dele.</p>

<h2>Como funciona na prática</h2>
<p>Todas as ferramentas do site rodam em JavaScript dentro do seu navegador, usando bibliotecas de manipulação de PDF que servimos a partir do nosso próprio domínio. Quando você seleciona um arquivo, ele é lido do disco para a memória da aba, processado ali e devolvido como download. Nenhuma requisição de rede carrega o seu conteúdo.</p>
<p>Isso é verificável, e incentivamos que você verifique: abra as ferramentas de desenvolvedor do navegador (F12), vá à aba <strong>Rede</strong> e use qualquer ferramenta. Você verá o carregamento da página e das bibliotecas — e nada mais.</p>
<p>Um efeito colateral agradável: depois da primeira visita, o site fica salvo no aparelho e continua funcionando <strong>sem internet</strong>.</p>

<h2>O que isso nos permite oferecer</h2>
<ul>
<li><strong>Sem limite de uso.</strong> Não há custo por operação, então não há contador de arquivos por dia.</li>
<li><strong>Sem cadastro.</strong> Não temos o que fazer com o seu e-mail.</li>
<li><strong>Sem marca d’água.</strong> Os arquivos gerados são limpos.</li>
<li><strong>Sem limite de tamanho artificial.</strong> O limite é a memória do seu aparelho, que costuma ser bem maior do que o teto de upload dos serviços gratuitos.</li>
</ul>

<h2>E o que isso nos impede de oferecer</h2>
<p>Preferimos ser diretos sobre os limites da abordagem:</p>
<ul>
<li><strong>OCR</strong> (reconhecer texto em documentos digitalizados) exige modelos pesados. Estamos avaliando uma implementação local viável.</li>
<li><strong>Senha em PDF</strong> depende de criptografia que a biblioteca que usamos ainda não escreve.</li>
<li><strong>Conversões de layout complexo</strong> — PDF para Excel, ou Word para PDF com diagramação elaborada — saem melhor em ferramentas de servidor. Quando esse for o seu caso, dizemos isso na própria página da ferramenta em vez de entregar um resultado ruim.</li>
</ul>

<h2>Como o projeto se sustenta</h2>
<p>Com publicidade discreta nas páginas e sem qualquer acesso ao conteúdo dos seus documentos — o que seria impossível, já que eles não chegam até nós. Não vendemos dados, não temos o que vender.</p>

<h2>Contato</h2>
<p>Sugestões de ferramentas, relatos de erro e dúvidas: <a href="/contato/">página de contato</a>.</p>`,
  },

  {
    slug: 'privacidade',
    title: 'Política de Privacidade — JuntarPDF',
    description:
      'Como o JuntarPDF trata dados: os arquivos nunca são enviados para servidores. Detalhes sobre cookies, analytics e seus direitos sob a LGPD.',
    keywords: ['política de privacidade juntarpdf', 'lgpd pdf online'],
    h1: 'Política de Privacidade',
    eyebrow: 'Atualizada em 1 de setembro de 2026',
    lede: 'O ponto principal cabe em uma frase: os seus arquivos não são enviados para lugar nenhum.',
    breadcrumbs: [{ name: 'Privacidade', url: '/privacidade/' }],
    html: `
<h2>1. Os seus documentos</h2>
<p>Todas as ferramentas deste site processam arquivos <strong>inteiramente dentro do seu navegador</strong>. Quando você seleciona um PDF, uma imagem ou um documento Word, ele é lido do armazenamento do seu aparelho para a memória temporária da aba, processado ali e devolvido como download.</p>
<p>Em nenhum momento o conteúdo do arquivo é transmitido pela internet, gravado em servidor, copiado ou analisado por nós. Não temos acesso a ele, não podemos recuperá-lo e não sabemos sequer que tipo de documento você processou. Ao fechar ou recarregar a aba, tudo é descartado da memória.</p>

<h2>2. Dados que realmente coletamos</h2>
<p>Usamos o Google Analytics para entender de forma agregada quais ferramentas são mais usadas e em quais aparelhos, com anonimização de IP ativada. Os dados coletados são estatísticos: páginas visitadas, tipo de dispositivo, navegador, país e origem do acesso.</p>
<p>Nenhum dado sobre o conteúdo dos seus arquivos é — ou pode ser — coletado, porque ele nunca chega até nós.</p>

<h2>3. Cookies</h2>
<table><thead><tr><th>Tipo</th><th>Finalidade</th></tr></thead><tbody>
<tr><td>Analytics</td><td>Medir visitas de forma agregada e anônima (Google Analytics)</td></tr>
<tr><td>Publicidade</td><td>Exibir anúncios, quando habilitados, por meio de parceiros</td></tr>
<tr><td>Técnicos</td><td>Armazenamento local do navegador para permitir o funcionamento offline</td></tr>
</tbody></table>
<p>Você pode bloquear cookies nas configurações do navegador. As ferramentas continuam funcionando normalmente — elas não dependem de cookies.</p>

<h2>4. Serviços de terceiros</h2>
<p>As bibliotecas de manipulação de PDF são servidas pelo nosso próprio domínio, e não por redes de distribuição externas. Isso significa que usar as ferramentas não gera requisição para terceiros. Os únicos serviços externos envolvidos são os de medição e publicidade descritos acima, que atuam sobre a página, nunca sobre os arquivos.</p>

<h2>5. Seus direitos (LGPD)</h2>
<p>A Lei Geral de Proteção de Dados assegura o direito de confirmar a existência de tratamento, acessar, corrigir, anonimizar, portar ou eliminar dados pessoais. Como não coletamos dados pessoais identificáveis e não recebemos os seus arquivos, na prática não há um conjunto de dados seus sob nossa guarda.</p>
<p>Para exercer qualquer direito ou esclarecer dúvidas, escreva para <a href="mailto:${site.email}">${site.email}</a>.</p>

<h2>6. Menores de idade</h2>
<p>O serviço não é direcionado a menores de 13 anos e não coleta conscientemente dados dessa faixa etária.</p>

<h2>7. Alterações</h2>
<p>Mudanças nesta política são publicadas nesta página com a data de atualização revisada no topo.</p>`,
  },

  {
    slug: 'termos',
    title: 'Termos de Uso — JuntarPDF',
    description: 'Condições de uso das ferramentas gratuitas de PDF do JuntarPDF.',
    keywords: ['termos de uso juntarpdf'],
    h1: 'Termos de Uso',
    eyebrow: 'Atualizados em 1 de setembro de 2026',
    lede: 'As condições para usar as ferramentas deste site.',
    breadcrumbs: [{ name: 'Termos', url: '/termos/' }],
    html: `
<h2>1. Aceitação</h2>
<p>Ao usar o ${site.name}, você concorda com estes termos. Se não concordar, não utilize o serviço.</p>

<h2>2. O serviço</h2>
<p>O ${site.name} oferece ferramentas gratuitas de manipulação de arquivos PDF que funcionam integralmente no navegador do usuário. O serviço é fornecido "como está", sem garantias de disponibilidade ininterrupta.</p>

<h2>3. Uso aceitável</h2>
<p>Você se compromete a utilizar as ferramentas apenas com arquivos sobre os quais tenha direito legítimo, e a não empregá-las para violar direitos autorais, falsificar documentos, remover proteções legais ou praticar qualquer ato ilícito.</p>

<h2>4. Responsabilidade sobre os arquivos</h2>
<p>Como o processamento acontece no seu aparelho, você mantém controle e responsabilidade integrais sobre os seus arquivos em todas as etapas. Recomendamos <strong>sempre manter uma cópia do arquivo original</strong> antes de qualquer operação: uma vez que um arquivo modificado é salvo, não temos como recuperar a versão anterior.</p>

<h2>5. Limitação de responsabilidade</h2>
<p>O ${site.name} não se responsabiliza por perda de dados, prejuízos decorrentes do uso das ferramentas, incompatibilidades de navegador ou resultados de conversão que não atendam a uma expectativa específica. As conversões entre formatos são aproximações técnicas e podem simplificar elementos de layout, conforme descrito nas páginas de cada ferramenta.</p>

<h2>6. Assinaturas eletrônicas</h2>
<p>A ferramenta de assinar PDF aplica uma <strong>assinatura eletrônica simples</strong> (imagem de assinatura). Ela não constitui assinatura digital com certificado ICP-Brasil e pode não ser aceita onde a lei ou o contrato exigir certificação. Avalie a adequação ao seu caso.</p>

<h2>7. Propriedade intelectual</h2>
<p>O nome, a identidade visual, os textos e o código deste site pertencem ao ${site.name}. Os arquivos que você processa continuam integralmente seus — não adquirimos nenhum direito sobre eles.</p>

<h2>8. Alterações</h2>
<p>Estes termos podem ser atualizados a qualquer momento, com publicação nesta página.</p>

<h2>9. Foro</h2>
<p>Aplica-se a legislação brasileira.</p>`,
  },

  {
    slug: 'contato',
    title: 'Contato — JuntarPDF',
    description: 'Fale com a equipe do JuntarPDF: sugestões de ferramentas, relatos de erro e parcerias.',
    keywords: ['contato juntarpdf'],
    h1: 'Contato',
    eyebrow: 'Fale com a gente',
    lede: 'Sugestões de ferramentas, relatos de erro e propostas comerciais.',
    breadcrumbs: [{ name: 'Contato', url: '/contato/' }],
    html: `
<p>Escreva para <a href="mailto:${site.email}"><strong>${site.email}</strong></a>. Lemos todas as mensagens.</p>

<h2>Encontrou um erro em alguma ferramenta?</h2>
<p>Como tudo roda no seu navegador, alguns detalhes ajudam muito a reproduzir o problema:</p>
<ul>
<li>Qual ferramenta e o que você esperava que acontecesse.</li>
<li>Navegador e versão (ex.: Chrome 131, Safari 18).</li>
<li>Sistema: Windows, macOS, Android, iPhone.</li>
<li>A mensagem de erro exibida na tela, se houver.</li>
<li>Se possível, se o problema acontece também com outro arquivo.</li>
</ul>
<p><strong>Não envie o seu documento por e-mail.</strong> Não precisamos dele e preferimos não recebê-lo — a descrição do problema costuma ser suficiente.</p>

<h2>Sugestão de ferramenta</h2>
<p>Conte qual tarefa você precisa resolver e com que frequência. Priorizamos o que aparece mais vezes e o que é possível fazer inteiramente no navegador.</p>

<h2>Imprensa e parcerias</h2>
<p>Use o mesmo endereço, com o assunto indicando o tipo de contato.</p>`,
  },

  {
    slug: 'aquisicao',
    noindex: true,
    title: `Domínio e projeto ${site.domain}`,
    description: 'Informações sobre a aquisição do domínio e do projeto JuntarPDF.',
    h1: 'Domínio e projeto',
    eyebrow: 'Informações comerciais',
    lede: `O domínio ${site.domain} e o projeto construído sobre ele.`,
    breadcrumbs: [{ name: 'Domínio e projeto', url: '/aquisicao/' }],
    html: `
<p><strong>${site.domain}</strong> é um domínio de correspondência exata (EMD) para o termo mais buscado do mercado de PDF em língua portuguesa, operado como um produto real: ${''}17 ferramentas funcionais, conteúdo próprio e arquitetura otimizada para busca orgânica.</p>
<h2>Sobre o projeto</h2>
<ul>
<li>Site estático, sem custo de servidor por operação — todo o processamento roda no navegador do visitante.</li>
<li>Cobertura de palavras-chave transacionais e informacionais em português.</li>
<li>Dados estruturados completos (SoftwareApplication, HowTo, FAQPage, BreadcrumbList).</li>
<li>Instalável como aplicativo (PWA) e funcional offline.</li>
</ul>
<h2>Consultas</h2>
<p>Propostas e informações: <a href="mailto:${site.email}">${site.email}</a>.</p>
<p style="font-size:.88rem;color:var(--muted)">Esta página não é indexada e não interfere no uso das ferramentas, que permanecem gratuitas.</p>`,
  },
];

export const legalUpdated = today;
