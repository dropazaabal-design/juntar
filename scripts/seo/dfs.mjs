#!/usr/bin/env node
/**
 * Minimal DataForSEO client — the parts that matter for link building.
 *
 * Run it on your own machine (this repo's cloud container blocks the API).
 * No subscription, no MCP server, no database: it queries, ranks the results
 * by how reachable each site actually is, and writes a target list.
 *
 *   export DATAFORSEO_LOGIN=you@example.com
 *   export DATAFORSEO_PASSWORD=xxxxxxxx
 *
 *   node scripts/seo/dfs.mjs summary  juntarpdf.net
 *   node scripts/seo/dfs.mjs domains  juntarpdf.net   # → alvos.md + alvos.csv
 *   node scripts/seo/dfs.mjs keywords "juntar pdf" "unir pdf"
 */
import { writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';

const OUT = process.env.DFS_OUT || 'seo-out';

const USAGE = `uso:
  node scripts/seo/dfs.mjs summary  <dominio>          visão geral de backlinks
  node scripts/seo/dfs.mjs domains  <dominio>          lista de alvos (md + csv)
  node scripts/seo/dfs.mjs keywords <palavra> [...]    volume e CPC no Brasil

antes:
  export DATAFORSEO_LOGIN=voce@exemplo.com
  export DATAFORSEO_PASSWORD=xxxxxxxx`;

function credentials() {
  const login = process.env.DATAFORSEO_LOGIN;
  const password = process.env.DATAFORSEO_PASSWORD;
  if (!login || !password) {
    console.error('Defina DATAFORSEO_LOGIN e DATAFORSEO_PASSWORD no ambiente.\n');
    console.error(USAGE);
    process.exit(1);
  }
  return 'Basic ' + Buffer.from(`${login}:${password}`).toString('base64');
}

async function call(endpoint, body) {
  let res;
  try {
    res = await fetch(`https://api.dataforseo.com/v3/${endpoint}`, {
      method: 'POST',
      headers: { Authorization: credentials(), 'Content-Type': 'application/json' },
      body: JSON.stringify([body]),
    });
  } catch (e) {
    throw new Error(`Rede indisponível ao chamar a API: ${e.message}`);
  }

  const text = await res.text();
  if (res.status === 401) throw new Error('Credenciais recusadas — confira DATAFORSEO_LOGIN e DATAFORSEO_PASSWORD.');

  let json;
  try {
    json = JSON.parse(text);
  } catch {
    // A proxy or captive network answers with HTML, not JSON.
    throw new Error(
      `Resposta não-JSON (HTTP ${res.status}). Normalmente é um proxy bloqueando api.dataforseo.com.\n` +
      `      Início da resposta: ${text.slice(0, 80).replace(/\s+/g, ' ')}`
    );
  }

  if (json.status_code !== 20000) {
    throw new Error(`API ${json.status_code}: ${json.status_message}`);
  }
  const task = json.tasks?.[0];
  if (task?.status_code !== 20000) {
    throw new Error(`Task ${task?.status_code}: ${task?.status_message}`);
  }
  console.error(`  custo desta chamada: $${(json.cost ?? 0).toFixed(4)}`);
  return task.result?.[0];
}

/* ---------------------------------------------------------------- summary */

async function summary(target) {
  const r = await call('backlinks/summary/live', { target, internal_list_limit: 1 });
  const rows = [
    ['Rank do domínio', r.rank],
    ['Backlinks totais', r.backlinks],
    ['Domínios referentes', r.referring_domains],
    ['IPs referentes', r.referring_ips],
    ['Links dofollow', r.referring_links_types?.anchor ?? '—'],
    ['Primeiro backlink visto', r.first_seen],
    ['Backlinks perdidos', r.broken_backlinks],
  ];
  console.log(`\n### ${target}\n`);
  for (const [k, v] of rows) console.log(`  ${String(k).padEnd(26)} ${v}`);
  return r;
}

/* --------------------------------------------------- referring domains */

/** A target is worth an email only if a human can plausibly act on it. */
function classify(d) {
  const host = d.domain || '';
  if (/\.(gov|edu)(\.|$)/.test(host)) return { tier: 'A', why: 'domínio institucional' };
  if (d.rank >= 300) return { tier: 'A', why: 'autoridade alta' };
  if (/blog|news|noticia|tecno|canaltech|olhardigital|tecmundo/i.test(host))
    return { tier: 'A', why: 'editorial — vale um pitch' };
  if (d.backlinks > 50 && d.rank < 50) return { tier: 'C', why: 'provável diretório/spam' };
  if (d.rank >= 100) return { tier: 'B', why: 'autoridade média' };
  return { tier: 'C', why: 'baixa prioridade' };
}

async function domains(target) {
  const r = await call('backlinks/referring_domains/live', {
    target,
    limit: 1000,
    order_by: ['rank,desc'],
    filters: [['backlinks', '>', 0]],
  });
  const items = (r.items || []).map((d) => ({ ...d, ...classify(d) }));
  const rank = { A: 0, B: 1, C: 2 };
  items.sort((a, b) => rank[a.tier] - rank[b.tier] || (b.rank || 0) - (a.rank || 0));

  await mkdir(OUT, { recursive: true });
  const csv = [
    'tier,dominio,rank,backlinks,dofollow,primeiro_visto,motivo',
    ...items.map((d) =>
      [d.tier, d.domain, d.rank ?? '', d.backlinks ?? '', d.is_lost ? 'perdido' : 'ativo', d.first_seen ?? '', `"${d.why}"`].join(',')
    ),
  ].join('\n');
  await writeFile(path.join(OUT, `alvos-${target}.csv`), csv, 'utf8');

  const group = (t) => items.filter((d) => d.tier === t);
  const md = `# Alvos de link building — a partir de ${target}

Gerado em ${new Date().toISOString().slice(0, 10)} · ${items.length} domínios referentes.

Cada site abaixo já linka para o seu concorrente direto. Não é uma lista fria:
é a prova de que aquele site publica sobre ferramentas de PDF.

${['A', 'B', 'C'].map((t) => {
    const g = group(t);
    const titles = { A: 'Prioridade alta — escreva primeiro', B: 'Prioridade média', C: 'Baixa / provável diretório' };
    return `## ${titles[t]} (${g.length})\n\n${
      g.length
        ? '| domínio | rank | backlinks | por quê |\n|---|---|---|---|\n' +
          g.slice(0, 60).map((d) => `| ${d.domain} | ${d.rank ?? '—'} | ${d.backlinks ?? '—'} | ${d.why} |`).join('\n')
        : '_nenhum_'
    }`;
  }).join('\n\n')}
`;
  await writeFile(path.join(OUT, `alvos-${target}.md`), md, 'utf8');
  console.log(`\n✓ ${items.length} domínios · A:${group('A').length} B:${group('B').length} C:${group('C').length}`);
  console.log(`✓ ${OUT}/alvos-${target}.md`);
  console.log(`✓ ${OUT}/alvos-${target}.csv`);
}

/* -------------------------------------------------------------- keywords */

async function keywords(kws) {
  const r = await call('keywords_data/google_ads/search_volume/live', {
    keywords: kws,
    location_code: 2076,   // Brasil
    language_code: 'pt',
  });
  const items = (r?.items || r || []).filter(Boolean);
  console.log(`\n${'palavra'.padEnd(34)}${'volume'.padStart(9)}${'CPC'.padStart(8)}  concorrência`);
  console.log('-'.repeat(66));
  for (const k of items.sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0))) {
    console.log(
      `${(k.keyword || '').slice(0, 33).padEnd(34)}${String(k.search_volume ?? '—').padStart(9)}${('$' + (k.cpc ?? 0).toFixed(2)).padStart(8)}  ${k.competition ?? '—'}`
    );
  }
}

/* ------------------------------------------------------------------ cli */

const [cmd, ...args] = process.argv.slice(2);
const run = { summary: () => summary(args[0]), domains: () => domains(args[0]), keywords: () => keywords(args) }[cmd];

if (!run || !args.length) {
  console.error(USAGE);
  process.exit(1);
}
run().catch((e) => { console.error('✗', e.message); process.exit(1); });
