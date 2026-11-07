window.__scan = async function(){
const Q = {
 snake:['snake plush','sequin snake'], hpkey:['harry potter keychain','gryffindor keychain'], hporn:['harry potter ornament','hogwarts ornament'],
 pizza:['pizza ornament','pizza tree topper'], rgb:['blue tinsel garland','tinsel garland'], gcolor:['gold tinsel garland','red garland'],
 ggarland:['harry potter banner','gryffindor garland'], squishkey:['squishmallow clip on','squishmallows keychain'], candy:['kit kat','aero','sour keys'],
 animorn:['axolotl ornament','dachshund ornament','sugar glider ornament'], hpsquish:['harry potter squishmallow'], funko:['funko pop harry potter'],
 pyramid:['rubiks pyramid','pyraminx'], cards:['baseball cards','hockey cards'], mabel:['box set kids books'],
 animplush:['axolotl plush','sugar glider plush','dachshund plush'], hpbook:['harry potter illustrated edition'], hpstick:['harry potter stickers'],
 mariostick:['mario stickers'], wand:['harry potter wand'], backpack:['harry potter backpack','mario backpack','kids backpack'], playdoh:['play-doh'],
 games:['sequence for kids','sleeping queens','sorry board game','super mario game'], robes:['gryffindor robe','harry potter robe','gryffindor scarf']
};
const HP='(potter|hogwarts|gryffindor|hedwig|snitch|dobby|hallows|hermione|ravenclaw|slytherin|hufflepuff)';
const R = {
 snake:[/snake/i], hpkey:[new RegExp(HP,'i'),/(key ?chain|keyring|key ring|bag clip)/i], hporn:[new RegExp(HP,'i'),/(ornament|bauble|tree decoration)/i],
 pizza:[/pizza/i,/(ornament|topper)/i], rgb:[/(tinsel|garland)/i,/(blue|green|red|multi|rainbow|assorted)/i], gcolor:[/(tinsel|garland)/i,/(gold|red|burgundy)/i],
 ggarland:[new RegExp(HP,'i'),/(banner|garland|bunting|pennant)/i], squishkey:[/squish/i,/(clip|key|3\.5)/i], candy:[/(kit ?kat|aero|sour key)/i],
 animorn:[/(axolotl|dachshund|wiener|sugar glider)/i,/ornament/i], hpsquish:[/squish/i,new RegExp(HP+'|ron weasley|luna','i')],
 funko:[/(funko|pop!)/i,new RegExp(HP+'|ron |dumbledore|hagrid|snape|voldemort|luna|draco','i')], pyramid:[/(pyramid|pyraminx)/i],
 cards:[/(topps|upper deck|panini|o-pee-chee|trading cards?|hockey cards?|baseball cards?)/i], mabel:[/(box(ed)? set|book set|collection)/i,/book|books|set/i],
 animplush:[/(axolotl|dachshund|wiener|sugar glider)/i,/(plush|stuffed|squishmallow|soft|warmies|toy)/i], hpbook:[/harry potter/i,/(illustrated|minalima)/i],
 hpstick:[new RegExp(HP,'i'),/sticker/i], mariostick:[/(mario|luigi)/i,/sticker/i], wand:[/wand/i,new RegExp(HP+'|ollivander|noble|dumbledore','i')],
 backpack:[/backpack/i], playdoh:[/play-?doh/i], games:[/(sequence|sleeping queens|\bsorry\b|mario.*(game|uno|monopoly|labyrinth|jenga|life|chess|guess)|uno.*mario)/i],
 robes:[/(robe|scarf)/i,new RegExp(HP+'|wizard','i')]
};
const host = location.hostname.replace(/^www\./,'');
const call = async q => { try {
  const r = await fetch('/api/ucp/mcp',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json, text/event-stream'},body:JSON.stringify({jsonrpc:'2.0',method:'tools/call',id:1,params:{name:'search_catalog',arguments:{meta:{'ucp-agent':{profile:'https://shopify.dev/ucp/agent-profiles/examples/2026-08-25/valid-with-capabilities.json'}},catalog:{query:q}}}})});
  const j = await r.json(); return (j.result&&j.result.structuredContent&&j.result.structuredContent.products)||[]; } catch(e){ return []; } };
const out = {}; const jobs=[];
for (const [sec,qs] of Object.entries(Q)) for (const q of qs) jobs.push([sec,q]);
let i=0; const worker = async()=>{ while(i<jobs.length){ const [sec,q]=jobs[i++]; const ps = await call(q);
  for (const p of ps) { if (!R[sec].every(re=>re.test(p.title))) continue;
    const v=(p.variants||[])[0]||{}; const pr = (v.price&&v.price.amount!=null)? v.price.amount/100 : (p.price_range? p.price_range.min.amount/100 : null);
    const avail = v.availability? v.availability.available : true; if (avail===false) continue;
    const img = (((p.media||[])[0]||(v.media||[])[0]||{}).url||'').split('?')[0];
    out[sec] = out[sec]||[]; if (out[sec].some(x=>x.h===p.handle)) continue;
    out[sec].push({t:p.title, p:pr, c:(v.price&&v.price.currency)||'CAD', h:p.handle, i:img}); } } };
await Promise.all([worker(),worker(),worker(),worker()]);
window.__out = out;
const secs = Object.keys(out);
document.body.innerHTML = '<pre id=o></pre>';
document.getElementById('o').textContent = '### '+host+'\n' + secs.map(s=>'## '+s+'\n'+out[s].slice(0,6).map((x,k)=>k+'|'+x.t.slice(0,75)+'|'+x.p+(x.c!=='CAD'?x.c:'')).join('\n')).join('\n');
return host+' secs='+secs.length+' '+secs.map(s=>s+':'+out[s].length).join(' ');
};
