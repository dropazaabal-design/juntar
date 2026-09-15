import { createServer } from 'node:http';
import { readFile, stat, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { chromium } from 'playwright';
const dist=path.resolve('dist'); const out=process.argv[2]||'.tmp/shots';
const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.mjs':'text/javascript','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.webmanifest':'application/manifest+json'};
const server=createServer(async(req,res)=>{let f=path.join(dist,decodeURIComponent(req.url.split('?')[0]));
try{if((await stat(f)).isDirectory())f=path.join(f,'index.html')}catch{f=path.join(dist,'404.html')}
try{res.writeHead(200,{'Content-Type':T[path.extname(f)]||'application/octet-stream'}).end(await readFile(f))}catch{res.writeHead(404).end()}});
await new Promise(r=>server.listen(0,r)); const base=`http://127.0.0.1:${server.address().port}`;
await mkdir(out,{recursive:true});
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const shots=[
  ['/', 'home-desktop', 1440, 3000, false],
  ['/', 'home-mobile', 390, 1400, true],
  ['/ferramentas/', 'ferramentas', 1440, 1900, false],
  ['/comprimir-pdf/', 'comprimir', 1440, 1500, false],
];
for (const [url,name,w,h,mobile] of shots) {
  const c=await b.newContext({viewport:{width:w,height:h},isMobile:mobile,hasTouch:mobile,deviceScaleFactor:mobile?2:1});
  const p=await c.newPage(); await p.goto(base+url,{waitUntil:'load'});
  await p.evaluate(()=>window.scrollTo(0,0)); await p.waitForTimeout(400);
  await p.screenshot({path:path.join(out,name+'.png')});
  await c.close();
  console.log('shot',name);
}
await b.close(); server.close();
