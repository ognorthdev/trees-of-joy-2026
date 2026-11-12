window.__m = async function(){
const HP='(potter|hogwarts|gryffindor|hedwig|snitch|dobby|hallows|hermione|ravenclaw|slytherin|hufflepuff|weasley|dumbledore|wizarding)';
const S = {
 snake:[['snake plush','snake toy','stuffed snake','rubber snake'],[/snake/i],/(book|novel|ladders|guide|facts)/i],
 hpkey:[['harry potter keychain','harry potter keyring','harry potter bag clip','hogwarts keychain'],[new RegExp(HP,'i'),/(key ?chain|keyring|key ring|clip|charm)/i]],
 hporn:[['harry potter ornament','harry potter christmas','hogwarts ornament','golden snitch'],[new RegExp(HP,'i'),/(ornament|bauble|decoration|snow globe|tree)/i],/(lego|book)/i],
 pizza:[['pizza ornament','pizza toy','pizza play food','pizza'],[/pizza/i],/(cookbook|book|stone|cutter|oven mitt)/i],
 ggarland:[['harry potter banner','harry potter decoration','gryffindor','hogwarts pennant','harry potter garland'],[new RegExp(HP,'i'),/(banner|garland|pennant|bunting|flag|decor)/i]],
 squishkey:[['squishmallow clip','squishmallows 3.5','squishmallow keychain','squishmallows mini'],[/squish/i,/(clip|key|3\.5|mini|micro)/i]],
 animorn:[['axolotl ornament','dachshund ornament','dog ornament','axolotl christmas'],[/(axolotl|dachshund|wiener|sugar glider)/i,/(ornament|bauble|decoration)/i]],
 hpsquish:[['harry potter squishmallow','harry potter plush','hedwig plush','squishmallows harry potter'],[new RegExp(HP,'i'),/(squish|plush|stuffed|soft)/i],/(book)/i],
 funko:[['funko harry potter','funko pop harry potter','bitty pop harry potter'],[/(funko|pop!|bitty)/i,new RegExp(HP+'|ron |hagrid|snape|voldemort|luna|draco','i')]],
 pyramid:[['rubiks','rubik pyramid','pyraminx','speed cube','pyramid puzzle'],[/(rubik|pyramid|pyraminx|speed cube|puzzle cube|magic cube)/i],/(book|lego|egypt|1000|500 ?pc|jigsaw)/i],
 cards:[['hockey cards','baseball cards','topps','upper deck','football cards'],[/(topps|upper deck|panini|o-pee-chee|hockey card|baseball card|football card|trading card|blaster|hobby)/i],/(pokemon|lorcana|magic|yu-gi|book|binder|sleeve|squishmallow|disney|marvel|star wars)/i],
 mabel:[['box set kids','boxed set','book set','early reader box set','graphic novel box set'],[/(box(ed)? set|collection|book set)/i],/(adult|cookbook|romance|bible|journal)/i],
 animplush:[['axolotl plush','dachshund plush','sugar glider plush','axolotl','dachshund','sausage dog'],[/(axolotl|dachshund|wiener|sausage dog|sugar glider)/i,/(plush|stuffed|squish|soft|warmies|pal|toy|cuddl)/i],/(book|ornament|kit|painting|diamond)/i],
 hpbook:[['harry potter illustrated edition','harry potter minalima','harry potter interactive illustrated'],[/harry potter/i,/(illustrated|minalima)/i]],
 hpstick:[['harry potter stickers','harry potter sticker book','harry potter sticker'],[new RegExp(HP,'i'),/sticker/i]],
 mariostick:[['mario stickers','super mario sticker book','mario sticker','super mario activity book'],[/(mario|luigi|nintendo)/i,/(sticker)/i]],
 wand:[['harry potter wand','wand harry potter','ollivanders wand','light up wand'],[/wand/i,new RegExp(HP+'|ollivander|noble|wizard','i')],/(book|lego)/i],
 backpack:[['harry potter backpack','super mario backpack','kids backpack','blue jays backpack'],[/backpack/i],/(book|clip|charm|stationery|explorer)/i],
 playdoh:[['play-doh','playdoh','play doh set'],[/play-?\s?doh/i]],
 games:[['sequence for kids','sleeping queens','sorry game','super mario game','uno super mario','mario kart game'],[/(sequence|sleeping queens|\bsorry\b|mario.*(game|uno|monopoly|labyrinth|jenga|life|chess|guess|lucky|piranha|pirahna|route)|uno.*mario|super mario.*(game))/i],/(book|cheat|guide|switch|nintendo switch|wii|coding|encyclopedia)/i],
 robes:[['harry potter costume','harry potter robe','gryffindor scarf','harry potter cape','harry potter scarf','gryffindor robe'],[/(robe|scarf|cape|cloak|costume)/i,new RegExp(HP+'|wizard','i')],/(book|dog|pet|baby|toddler|lego)/i]
};
const call = async q => { try { const r = await fetch('/api/ucp/mcp',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json, text/event-stream'},body:JSON.stringify({jsonrpc:'2.0',method:'tools/call',id:1,params:{name:'search_catalog',arguments:{meta:{'ucp-agent':{profile:'https://shopify.dev/ucp/agent-profiles/examples/2026-08-25/valid-with-capabilities.json'}},catalog:{query:q}}}})}); const j = await r.json(); return (j.result&&j.result.structuredContent&&j.result.structuredContent.products)||[]; } catch(e){ return []; } };
const out={}; const jobs=[]; for (const [sec,[qs]] of Object.entries(S)) for (const q of qs) jobs.push([sec,q]);
let i=0; const w=async()=>{ while(i<jobs.length){ const [sec,q]=jobs[i++]; const ps=await call(q); const [,res,ex]=S[sec];
  for(const p of ps){ if(!res.every(re=>re.test(p.title))) continue; if(ex && ex.test(p.title)) continue;
    const v=(p.variants||[])[0]||{}; if(v.availability && v.availability.available===false) continue;
    out[sec]=out[sec]||[]; if(out[sec].some(x=>x.h===p.handle)) continue;
    out[sec].push({t:p.title,p:(v.price&&v.price.amount!=null)?v.price.amount/100:(p.price_range?p.price_range.min.amount/100:null),c:(v.price&&v.price.currency)||'CAD',h:p.handle,i:((((p.media||[])[0])||((v.media||[])[0])||{}).url||'').split('?')[0]}); } } };
await Promise.all([w(),w(),w(),w()]);
localStorage.setItem('__m', JSON.stringify(out)); window.__mo=out;
document.body.innerHTML='<pre id=o></pre>';
document.getElementById('o').textContent=Object.keys(S).map(s=>'## '+s+'\n'+(out[s]||[]).slice(0,12).map((x,k)=>k+'|'+x.t.slice(0,70)+'|'+x.p).join('\n')).join('\n');
return Object.keys(S).map(s=>s+':'+((out[s]||[]).length)).join(' ');
};
window.__mx = function(picks){ const o=JSON.parse(localStorage.getItem('__m')||'{}'); const host=location.hostname.replace(/^www\./,'');
 return picks.map(([s,k,title])=>{ const it=(o[s]||[])[k]; return it?[s,title||it.t,it.p,it.c,it.h,it.i.replace('https://cdn.shopify.com/s/files/1/','~')].join('|'):s+'|MISSING '+k; }).join('\n'); };
