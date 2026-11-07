window.__q = async function(queries){
  const call = async q => { try { const r = await fetch('/api/ucp/mcp',{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json, text/event-stream'},body:JSON.stringify({jsonrpc:'2.0',method:'tools/call',id:1,params:{name:'search_catalog',arguments:{meta:{'ucp-agent':{profile:'https://shopify.dev/ucp/agent-profiles/examples/2026-08-25/valid-with-capabilities.json'}},catalog:{query:q}}}})}); const j = await r.json(); return (j.result&&j.result.structuredContent&&j.result.structuredContent.products)||[]; } catch(e){ return []; } };
  const out = JSON.parse(localStorage.getItem('__qout')||'{}'); let i=0;
  const w = async()=>{ while(i<queries.length){ const q=queries[i++]; const ps=await call(q);
    out[q] = ps.slice(0,8).map(p=>{const v=(p.variants||[])[0]||{}; return {t:p.title, p:(v.price&&v.price.amount!=null)?v.price.amount/100:(p.price_range?p.price_range.min.amount/100:null), c:(v.price&&v.price.currency)||'CAD', h:p.handle, i:((((p.media||[])[0])||((v.media||[])[0])||{}).url||'').split('?')[0], a:v.availability?v.availability.available:true};}); } };
  await Promise.all([w(),w(),w(),w()]);
  localStorage.setItem('__qout', JSON.stringify(out)); window.__qo = out;
  window.__txt = queries.map(q=>'#'+q+' '+(out[q]||[]).slice(0,5).map((x,k)=>k+')'+x.t.slice(0,40)+'|'+x.p+(x.a===false?'(OOS)':'')).join(' ; ')).join('\n');
  return 'done '+window.__txt.length;
};
window.__x = function(picks){
  const o = JSON.parse(localStorage.getItem('__out')||'{}'), qo = JSON.parse(localStorage.getItem('__qout')||'{}');
  const pool = [].concat(...Object.values(o), ...Object.values(qo));
  const host = location.hostname.replace(/^www\./,'');
  const lines = picks.map(([sec,sub])=>{ const it = pool.find(x=>x.t.toLowerCase().includes(sub.toLowerCase()));
    return it ? [sec,it.t,it.p,it.c,host+'/products/'+it.h,(it.i||'').replace('https://cdn.shopify.com/s/files/1/','~')].join('|') : sec+'|MISSING '+sub; });
  window.__exp = lines.join('\n'); return window.__exp.length;
};
