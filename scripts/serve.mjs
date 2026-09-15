#!/usr/bin/env node
/** Local preview server for dist/ — mirrors how a static host resolves paths. */
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const dist = path.resolve('dist');
const PORT = Number(process.env.PORT) || 4173;
const TYPES = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8',
  '.json': 'application/json', '.webmanifest': 'application/manifest+json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml',
  '.xml': 'application/xml', '.txt': 'text/plain; charset=utf-8',
};

createServer(async (req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  let file = path.join(dist, url);
  if (!file.startsWith(dist)) return res.writeHead(403).end();
  try {
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
  } catch {
    file = path.join(dist, '404.html');
  }
  try {
    const body = await readFile(file);
    res.writeHead(file.endsWith('404.html') ? 404 : 200, {
      'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream',
    });
    res.end(body);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' }).end('404');
  }
}).listen(PORT, () => console.log(`→ http://localhost:${PORT}`));
