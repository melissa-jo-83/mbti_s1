import fs from 'node:fs';import path from 'node:path';import {Resvg} from '@resvg/resvg-js';
const raw=fs.readFileSync('src/data/characters.ts','utf8');const chars=JSON.parse(raw.slice(raw.indexOf('=')+1).trim().replace(/;$/,''));
const base=process.env.VITE_BASE_PATH||'/';const origin=(process.env.VITE_SITE_URL||'https://useless-power-lab-k9m.risenkrill4.chatgpt.site').replace(/\/$/,'');
const order=['INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP','ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP'];
const atlas=fs.readFileSync('public/characters/researchers.png').toString('base64');
const index=fs.readFileSync('dist/index.html','utf8');fs.mkdirSync('dist/og',{recursive:true});
for(const c of Object.values(chars)){
 const cell=order.indexOf(c.mbti);const col=cell%4,row=Math.floor(cell/4);
 const art=`<svg xmlns="http://www.w3.org/2000/svg" width="420" height="420" viewBox="${col*320} ${row*320} 320 320"><image href="data:image/png;base64,${atlas}" width="1280" height="1280"/></svg>`;const artPng=new Resvg(art).render().asPng();
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630"><rect width="1200" height="630" fill="#f8f6ff"/><rect x="40" y="40" width="1120" height="550" rx="32" fill="#eee6ff"/><image href="data:image/png;base64,${artPng.toString('base64')}" x="65" y="75" width="420" height="460"/><g font-family="Noto Sans CJK KR"><text x="520" y="170" font-size="21" fill="#7c4dff">USELESS POWER LAB · ${c.mbti}</text><text x="520" y="265" font-size="43" font-weight="bold" fill="#26223d">${c.name}</text><text x="520" y="335" font-size="24" fill="#7d6896">${c.power}</text><rect x="520" y="400" width="340" height="55" rx="12" fill="#c8ff57"/><text x="550" y="438" font-size="25" fill="#443652">나의 초능력도 발견하기 ↗</text><text x="520" y="524" font-size="23" fill="#7c4dff">쓸데없는 초능력 연구소</text></g></svg>`;
 fs.writeFileSync(`dist/og/${c.mbti}.png`,new Resvg(svg).render().asPng());
 const url=`${origin}${base}share/${c.mbti}/`;
 const page=index.replace(/<title>.*?<\/title>/,`<title>${c.name} | 쓸데없는 초능력 연구소</title>`).replace(/<meta property="og:title"[^>]*\/>/,'').replace('</head>',`<meta property="og:title" content="${c.name} · ${c.mbti}"/><meta property="og:description" content="${c.power}"/><meta property="og:image" content="${origin}${base}og/${c.mbti}.png"/><meta property="og:url" content="${url}"/><meta property="og:type" content="website"/><script>location.replace(${JSON.stringify(base+'?result='+c.mbti)})</script></head>`);
 const dir=`dist/share/${c.mbti}`;fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,'index.html'),page);
}
fs.writeFileSync('dist/robots.txt',`User-agent: *\nAllow: /\n`);
console.log('Generated 16 static share pages and 16 OG PNG images.');
