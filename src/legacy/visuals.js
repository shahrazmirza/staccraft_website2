/* eslint-disable */
// Example-screen mock-ups and diagrams, ported from the original static site
// (index.html on the Azure feature/design branch). These functions return HTML/SVG
// strings; src/styles/visuals.css restyles them in this site's palette.
// Everything interpolated here is either fixed demo data or escaped content.json text.
import content from '../../content.json';

const S = { content };
const esc = s => String(s==null?"":s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const tx = s => esc(s).replace(/\[([^\]]+)\]/g,'<mark class="ph">[$1]</mark>');
function ERP(){ const n=String((S.content.brand&&S.content.brand.erpName)||"").trim(); return n||"Your ERP"; }
function erpIn(){ const n=String((S.content.brand&&S.content.brand.erpName)||"").trim(); return n||"your ERP"; }
function blobUrl(id){ id=String(id||""); return /^https?:/i.test(id)?id:"/"+id.replace(/^\/+/,"").split("/").map(encodeURIComponent).join("/"); }
function look(){ return "tpl"; }
function isNordic(){ return false; }

// '#page' and '#page.anchor' links from content.json become site paths: '/page', '/page#anchor', '/' for home.
function toPath(h){ h=String(h||""); if(/^(https?:|mailto:|tel:)/i.test(h)) return h; h=h.replace(/^[#/]+/,""); const [id,anchor]=h.split("."); const base=(!id||id==="home")?"/":"/"+id; return anchor?base+"#"+anchor:base; }
function slugify(s){ return String(s||"").toLowerCase().replace(/&/g," and ").replace(/<[^>]*>/g,"").replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,60)||"section"; }
// Inline formatting: [text](link), **bold**, [placeholder]. Text is escaped first.
function mdInline(s){
  let h=esc(s);
  h=h.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g,(m,t,u)=>{ const ext=/^https?:\/\//i.test(u); if(!ext&&!/^#/.test(u)&&!/^mailto:/i.test(u)) return t; return '<a href="'+(/^#/.test(u)?toPath(u):u)+'"'+(ext?' target="_blank" rel="noopener"':'')+'>'+t+'</a>'; });
  h=h.replace(/\*\*([^*]+)\*\*/g,"<strong>$1</strong>");
  h=h.replace(/\[([^\]]+)\](?!\()/g,'<mark class="ph">[$1]</mark>');
  return h;
}
// Article markup: ## heading, ### subheading, - bullet, 1. numbered, > callout, blank line between paragraphs.
function md(src){
  const lines=String(src||"").replace(/\r\n?/g,"\n").split("\n"); const out=[]; const toc=[]; const used={}; let para=[]; let list=null; let words=0;
  const count=t=>{ words+=String(t).split(/\s+/).filter(Boolean).length; };
  const flushP=()=>{ if(para.length){ const t=para.join(" "); count(t); out.push("<p>"+mdInline(t)+"</p>"); para=[]; } };
  const flushL=()=>{ if(list){ out.push("<"+list.tag+">"+list.items.map(x=>"<li>"+mdInline(x)+"</li>").join("")+"</"+list.tag+">"); list=null; } };
  lines.forEach(raw=>{ const l=raw.trim(); let m;
    if(!l){ flushP(); flushL(); return; }
    if((m=l.match(/^(#{2,3})\s+(.+)$/))){ flushP(); flushL(); const lvl=m[1].length; let id=slugify(m[2]); if(used[id]) id+="-"+(++used[id]); else used[id]=1; count(m[2]);
      out.push("<h"+lvl+' id="'+id+'">'+mdInline(m[2])+"</h"+lvl+">"); if(lvl===2) toc.push({id,text:m[2]}); return; }
    if((m=l.match(/^>\s?(.*)$/))){ flushP(); flushL(); count(m[1]); out.push('<p class="callout">'+mdInline(m[1])+"</p>"); return; }
    if((m=l.match(/^[-*]\s+(.+)$/))||(m=l.match(/^\d+[.)]\s+(.+)$/))){ flushP(); const tag=/^\d/.test(l)?"ol":"ul"; if(list&&list.tag!==tag) flushL(); if(!list) list={tag,items:[]}; list.items.push(m[1]); count(m[1]); return; }
    flushL(); para.push(l); });
  flushP(); flushL();
  return {html:out.join(""),toc,words};
}
function readMinutes(words){ return Math.max(1,Math.round((+words||0)/220)); }
function fmtDate(iso){ const d=new Date(String(iso||"")+"T00:00:00"); return isNaN(d)?"":d.toLocaleDateString("en-AU",{day:"numeric",month:"long",year:"numeric"}); }
function articlePages(){ return S.content.pages.filter(p=>p.article&&(p.sections||[]).some(s=>s.type==="article")).slice().sort((a,b)=>String(b.article.date||"").localeCompare(String(a.article.date||""))); }

const ARROW = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';

const ICON={
  store:'<path d="M4 9h16l-1.2-4.2A1 1 0 0 0 17.8 4H6.2a1 1 0 0 0-1 .8Z"/><path d="M4 9v10a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V9"/><path d="M4 9a2.7 2.7 0 0 0 5.3 0 2.7 2.7 0 0 0 5.4 0 2.7 2.7 0 0 0 5.3 0"/><path d="M10 20v-5h4v5"/>',
  b2b:'<rect x="3" y="11" width="8" height="9" rx="1"/><rect x="13" y="11" width="8" height="9" rx="1"/><rect x="8" y="3" width="8" height="8" rx="1"/><path d="M7 11v3M17 11v3M12 3v3"/>',
  jersey:'<path d="M8 3 4 5 2 10l3 1.5L6 10v11h12V10l1 1.5 3-1.5-2-5-4-2c-.6 1.4-2 2.2-4 2.2S8.6 4.4 8 3Z"/><path d="M10 13h4M12 13v5"/>',
  po:'<rect x="5" y="4" width="14" height="17" rx="1.5"/><path d="M9 4V3h6v1"/><path d="M8.5 10h7M8.5 13.5h7M8.5 17h4"/>',
  chart:'<path d="M4 20V4"/><path d="M4 20h16"/><rect x="7" y="12" width="3" height="5"/><rect x="12" y="8" width="3" height="9"/><rect x="17" y="5" width="3" height="12"/>',
  carton:'<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9Z"/><path d="m4 7.5 8 4.5 8-4.5M12 12v9"/><path d="m8 5.3 8 4.5"/>',
  settings:'<path d="M4 7h10M18 7h2M4 17h4M12 17h8"/><circle cx="16" cy="7" r="2"/><circle cx="10" cy="17" r="2"/>',
  card:'<rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18M7 15h4"/>',
  factory:'<path d="M3 20V10l5 3V10l5 3V6h3l1 3h3v11Z"/><path d="M7 17h2M12 17h2M17 17h1"/>',
  link:'<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
  brush:'<path d="M14 4 20 10l-8 8-6-6Z"/><path d="M6 12l-2 6 6-2"/>',
  plus:'<path d="M12 5v14M5 12h14"/>',
  locker:'<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M12 3v18M9.5 11v2M14.5 11v2M6.5 6h3M14.5 6h3M6.5 8h3M14.5 8h3"/>',
  monitor:'<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4M9 13v-3h6v3M8 13h8M11 10V8.5h2V10"/>',
  warehouse:'<path d="M3 10 12 4l9 6v10H3Z"/><path d="M7 20v-7h10v7M7 16h10"/><path d="M10 18.5h1.5"/>',
  calc:'<rect x="5" y="3" width="14" height="18" rx="2"/><rect x="8" y="6" width="8" height="3"/><path d="M8.5 12.5h.5M11.75 12.5h.5M15 12.5h.5M8.5 15.5h.5M11.75 15.5h.5M15 15.5h.5M8.5 18.5h.5M11.75 18.5h.5M15 18.5h.5"/>',
  truck:'<path d="M3 7h11v9H3zM14 10h4l3 3v3h-7z"/><circle cx="7" cy="17.5" r="1.7"/><circle cx="17" cy="17.5" r="1.7"/>',
  cricket:'<path d="M14.5 3.5l3 3-8.5 8.5-3-3z"/><path d="M6 12l-2.5 2.5a1.5 1.5 0 0 0 0 2L5.5 18.5a1.5 1.5 0 0 0 2 0L10 16"/><circle cx="18" cy="17" r="2.5"/>',
  hockey:'<path d="M15 3 8.5 16.5a3 3 0 0 1-2.7 1.7H4"/><path d="M4 20.5h2.5"/><circle cx="18" cy="18" r="2"/>',
  footy:'<ellipse cx="12" cy="12" rx="9" ry="5.5" transform="rotate(-35 12 12)"/><path d="M9.5 9.5l5 5M10.5 12.5l1-1M12.5 14.5l1-1M11.5 13.5l1-1"/>',
  sheet:'<rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M4 8h16M4 13h16M4 18h16M10 3v18"/>',
  mail:'<rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="m3 7 9 6 9-6"/>',
  phone:'<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a1 1 0 0 1-1 1A16 16 0 0 1 4 5a1 1 0 0 1 1-1Z"/>',
  dam:'<rect x="3" y="5" width="14" height="11" rx="1.5"/><path d="m3 14 4-4 3 3 2-2 5 5"/><circle cx="13" cy="8.5" r="1.2"/><path d="M7 19h12a2 2 0 0 0 2-2V8"/>',
  api:'<rect x="5" y="7" width="14" height="10" rx="1.5"/><path d="M5 9.5H3M5 12H3M5 14.5H3M19 9.5h2M19 12h2M19 14.5h2M10.5 10 8.5 12l2 2M13.5 10l2 2-2 2"/>',
  star:'<path d="m12 3.5 2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8-4.3-4.1 5.9-.9Z"/>',
  search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m20 20-4.9-4.9"/>',
  hanger:'<path d="M10 6a2 2 0 1 1 2 2v1.6l8.4 5.6a1 1 0 0 1-.6 1.8H4.2a1 1 0 0 1-.6-1.8L12 9.6"/>',
  megaphone:'<path d="M4 10v4h3l7 4V6l-7 4Z"/><path d="M17.5 9.5a3.5 3.5 0 0 1 0 5M7 14l1.5 5h2.5l-1-4.4"/>'
};
function icon(k,cls){ return ICON[k]?'<svg class="'+(cls||"ic")+'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'+ICON[k]+'</svg>':''; }

const tag='<span class="mock-label">Example data</span>';
function mock(kind){
  switch(kind){
  case "platform": return '<div class="mock-wrap">'+tag+'<div class="stack">'+
    '<div class="ui c-store"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>hawks.club/store</div><div class="ui-body">'+
      '<div class="small">Northside Hawks FC · Club store</div>'+
      '<div class="jersey" style="margin-top:10px">'+jersey("LEE","11")+'</div>'+
      '<div class="row-b" style="margin-top:12px"><strong>Home playing shirt</strong><span class="mono">$64.95</span></div>'+
      '<div class="sizes"><span>XS</span><span>S</span><span class="on">M</span><span>L</span><span>XL</span><span>2XL</span></div>'+
      '<div class="small" style="margin-top:10px">Saved in Locker Room · name LEE · no. 11</div>'+
      '<div class="btn btn-primary btn-sm" style="width:100%;margin-top:12px">Add to kit bag</div>'+
    '</div></div>'+
    '<div class="ui"><div class="ui-body"><div class="row-b"><span class="mono" style="font-weight:500">PO-24-0183</span><span class="pill p-info">In Production</span></div>'+
      '<div class="chainmini" aria-hidden="true"><i class="on"></i><i class="on"></i><i></i><i></i><i></i><i></i></div>'+
      '<div class="small">Home playing shirt · 77 units</div><div class="sizeline"><span>S 12</span><span>M 30</span><span>L 26</span><span>XL 9</span></div></div></div>'+
    '<div class="ui"><div class="ui-body"><div class="row-b" style="margin-bottom:6px"><strong>'+esc(ERP())+'</strong><span class="pill p-ok">Synced</span></div>'+
      '<div class="okline"><span>09:42</span><span>SO-58211</span><b>200 OK</b></div><div class="okline"><span>09:42</span><span>PO-24-0183</span><b>200 OK</b></div><div class="okline"><span>09:40</span><span>SO-58207</span><b>200 OK</b></div></div></div>'+
  '</div></div>';
  case "locker": return '<div class="mock-wrap">'+tag+'<div class="ui"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>Locker Room</div><div class="ui-body">'+
    '<div class="locker"><div class="avatar">JL</div><div><strong style="font-size:1.1rem">Jordan Lee</strong><div class="small">Northside Hawks FC · U14 Girls</div></div></div>'+
    '<dl class="kv"><div><dt>Jersey name</dt><dd class="big">LEE</dd></div><div><dt>Number</dt><dd class="big">11</dd></div>'+
    '<div><dt>Shirt</dt><dd>Youth M</dd></div><div><dt>Shorts</dt><dd>Youth S</dd></div><div><dt>Socks</dt><dd>2–8</dd></div><div><dt>Training top</dt><dd>Youth M</dd></div></dl>'+
    '<div class="row-b" style="margin-top:16px"><span class="small">Joined with club code</span><span class="code-chip">HAWKS-24</span></div>'+
  '</div></div></div>';
  case "matrix": {
    const sizes=["XS","S","M","L","XL","2XL"]; const rows=[["Navy","#1F2A44",[0,8,24,30,16,6]],["White","#F4F4F2",[0,6,18,20,10,4]],["Gold","#D9A21F",[2,4,10,12,6,0]]];
    const tot=sizes.map((_,i)=>rows.reduce((a,r)=>a+r[2][i],0));
    return '<div class="mock-wrap">'+tag+'<div class="ui"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>B2B · Size matrix order</div><div class="ui-body">'+
    '<div class="cways">'+rows.map((r,i)=>'<figure class="'+(i===0?'on':'')+'">'+polo(r[1])+'<figcaption>'+r[0]+'</figcaption></figure>').join("")+'</div>'+
    '<div class="row-b" style="margin-bottom:10px"><strong>Training polo · TP-2210</strong><span class="small mono">Dealer price $21.40</span></div>'+
    '<div class="tbl-wrap"><table class="t mx"><thead><tr><th>Colour</th>'+sizes.map(s=>'<th style="text-align:center">'+s+'</th>').join("")+'<th class="num">Total</th></tr></thead><tbody>'+
    rows.map(r=>'<tr><td><span class="swatch" style="background:'+r[1]+'"></span>'+r[0]+'</td>'+r[2].map(q=>'<td class="q"><span class="'+(q?'':'z')+'">'+(q||"–")+'</span></td>').join("")+'<td class="num mono">'+r[2].reduce((a,b)=>a+b,0)+'</td></tr>').join("")+
    '<tr><td><strong>Total</strong></td>'+tot.map(t=>'<td class="q mono"><strong>'+t+'</strong></td>').join("")+'<td class="num mono"><strong>'+tot.reduce((a,b)=>a+b,0)+'</strong></td></tr></tbody></table></div>'+
    '<div class="row-b" style="margin-top:12px"><span class="small">Credit available $18,200</span><span class="btn btn-primary btn-sm">Submit for approval</span></div>'+
    '</div></div></div>';
  }
  case "po": {
    const rows=[["PO-24-0183","Home playing shirt","77","In Production","p-info"],["PO-24-0184","Training polo","164","Ready to Ship","p-warn"],["PO-24-0179","Club hoodie","58","Dispatched","p-info"],["PO-24-0171","Playing socks","240","Delivered","p-ok"],["PO-24-0186","Away shorts","92","Awaiting Production","p-mute"]];
    return '<div class="mock-wrap">'+tag+'<div class="ui"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>Purchase orders · generated from sales</div><div class="ui-body" style="padding:6px 8px 8px">'+
    '<div class="tbl-wrap"><table class="t"><thead><tr><th>PO</th><th>Product</th><th class="num">Units</th><th>Status</th></tr></thead><tbody>'+
    rows.map(r=>'<tr><td class="mono">'+r[0]+'</td><td>'+r[1]+'</td><td class="num mono">'+r[2]+'</td><td><span class="pill '+r[4]+'">'+r[3]+'</span></td></tr>').join("")+
    '</tbody></table></div></div></div></div>';
  }
  case "shipment": return '<div class="mock-wrap">'+tag+'<div class="ui"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>Shipment SH-1042</div><div class="ui-body">'+
    '<div class="row-b" style="margin-bottom:14px"><div><strong>PO-24-0179 · Club hoodie</strong><div class="small">6 cartons · Sea freight</div></div><span class="pill p-info">In Transit</span></div>'+
    '<ol class="tl"><li class="done"><span>Acknowledged by supplier</span><span class="small mono">02 Sep</span></li><li class="done"><span>Production complete</span><span class="small mono">19 Sep</span></li><li class="done"><span>Dispatched · invoice INV-7781 attached</span><span class="small mono">21 Sep</span></li><li class="now"><span><strong>In transit</strong></span><span class="small mono">ETA 04 Oct</span></li><li><span>Delivered</span><span class="small mono">–</span></li></ol>'+
    '<div class="small" style="margin:6px 0 6px">Fulfilment · 58 units</div><div class="fill"><i style="width:89.7%;background:var(--accent)"></i><i style="width:10.3%;background:color-mix(in oklab,var(--accent) 35%,var(--surface))"></i></div>'+
    '<div class="legend"><span><i style="background:color-mix(in oklab,var(--accent) 35%,var(--surface))"></i>Prepared 58</span><span><i style="background:var(--accent)"></i>Shipped 52</span><span><i style="background:var(--line)"></i>Received 0</span></div>'+
  '</div></div></div>';
  case "erp": {
    const rows=[["09:42:18","Sales order","SO-58211","200 OK","p-ok"],["09:42:11","Purchase order","PO-24-0183","200 OK","p-ok"],["09:40:03","Sales order","SO-58207","200 OK","p-ok"],["09:38:55","Sales order","SO-58204","Retrying","p-warn"],["09:30:00","Purchase order","PO-24-0182","200 OK","p-ok"]];
    return '<div class="mock-wrap">'+tag+'<div class="ui"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>Integration log · '+esc(ERP())+'</div><div class="ui-body" style="padding:6px 8px 8px">'+
    '<div class="tbl-wrap"><table class="t"><thead><tr><th>Time</th><th>Type</th><th>Reference</th><th>Result</th></tr></thead><tbody>'+
    rows.map(r=>'<tr><td class="mono">'+r[0]+'</td><td>'+r[1]+'</td><td class="mono">'+r[2]+'</td><td><span class="pill '+r[4]+'">'+r[3]+'</span></td></tr>').join("")+
    '</tbody></table></div></div></div></div>';
  }
  case "dashboard": {
    const b=[42,55,48,63,58,71,66,80,74,88,83,96]; const m=["J","F","M","A","M","J","J","A","S","O","N","D"];
    return '<div class="mock-wrap">'+tag+'<div class="ui"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>Admin · Dashboard</div><div class="ui-body">'+
    '<div class="kpis"><div class="kpi"><div class="l">Revenue</div><div class="v">$412k</div><div class="d">+8.4%</div></div><div class="kpi"><div class="l">Orders</div><div class="v">3,184</div><div class="d">+5.1%</div></div><div class="kpi"><div class="l">Avg order</div><div class="v">$129</div><div class="d">+3.2%</div></div></div>'+
    '<div class="bars" aria-hidden="true">'+b.map(v=>'<i style="height:'+v+'%"></i>').join("")+'</div><div class="bars-x">'+m.map(x=>'<span>'+x+'</span>').join("")+'</div>'+
    '</div></div></div>';
  }
  case "locker-kit": return '<div class="mock-wrap kitstage">'+tag+'<div class="jersey-big">'+jersey("LEE","11")+'</div>'+mock("locker").replace('<div class="mock-wrap"><span class="mock-label">Example data</span>','').replace(/<\/div>$/,'')+'</div>';
  case "catalogue": {
    const items=[["bat","Match cricket bat","$349","$241"],["ball","Match ball · 156 g","$42","$27"],["stick","Composite hockey stick","$289","$198"],["bag","Team kit bag","$129","$84"]];
    return '<div class="mock-wrap">'+tag+'<div class="ui"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>Catalogue · one range, two channels</div><div class="ui-body">'+
    '<div class="cat">'+items.map(x=>'<div class="tile"><div class="art">'+ART[x[0]]+'</div><div class="nm">'+x[1]+'</div><div class="pr"><span>RRP <b>'+x[2]+'</b></span><span>Dealer <b>'+x[3]+'</b></span></div></div>').join("")+'</div>'+
    '<div class="chan"><span class="pill p-info">B2C storefront</span><span class="pill p-ok">B2B dealer portal</span><span class="small" style="margin-left:auto">Same stock</span></div>'+
    '</div></div></div>';
  }
  case "config": return '<div class="mock-wrap">'+tag+'<div class="ui"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>Settings · Purchase order generation</div><div class="ui-body cfg">'+
    '<div><div class="grp-l">Group purchase orders by</div><div style="display:grid;gap:6px"><div class="opt on"><span class="rd"></span>Supplier and product type</div><div class="opt"><span class="rd"></span>Supplier only</div></div></div>'+
    '<div><div class="grp-l">B2B orders</div><div class="opt">Keep each B2B sales order on its own PO<span class="tog" aria-hidden="true"></span></div></div>'+
    '<div><div class="grp-l">Default freight mode</div><div class="opt">Sea freight<span class="small" style="margin-left:auto">Change per PO</span></div></div>'+
    '<div class="preview-line"><span>Preview: <strong>212 sales lines → 6 POs</strong></span><span class="btn btn-primary btn-sm">Generate</span></div>'+
  '</div></div></div>';
  case "brands": {
    const b=[["N","Northside Teamwear","Club stores · 140 clubs","#0B7A4B"],["C","Coastline Apparel","Retail · B2B","#1F4FA8"],["S","Summit Sports","Wholesale · 3 warehouses","#8A3B12"]];
    return '<div class="mock-wrap">'+tag+'<div class="ui"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>Businesses on the platform</div><div class="ui-body brands">'+
    b.map(x=>'<div class="brand-t"><span class="sw" style="background:'+x[3]+'">'+x[0]+'</span><div><strong>'+x[1]+'</strong><div class="small">'+x[2]+'</div></div><span class="pill p-mute">Own database</span></div>').join("")+
    '</div></div></div>';
  }
  case "quickorder": {
    const r=[["CB-1180","Match cricket bat, SH","12"],["BL-156R","Match ball, red, 156 g","60"],["HS-3690","Composite hockey stick, 36.5\"","8"],["KB-220","Team kit bag","10"]];
    return '<div class="mock-wrap">'+tag+'<div class="ui"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>Dealer portal · Quick order</div><div class="ui-body">'+
    '<div class="row-b" style="margin-bottom:10px"><strong>Saturday restock</strong><span class="btn btn-ghost btn-sm">Upload CSV</span></div>'+
    '<div class="tbl-wrap"><table class="t"><thead><tr><th>SKU</th><th>Product</th><th class="num">Qty</th></tr></thead><tbody>'+
    r.map(x=>'<tr><td class="mono">'+x[0]+'</td><td>'+x[1]+'</td><td class="num mono">'+x[2]+'</td></tr>').join("")+'</tbody></table></div>'+
    '<div class="row-b" style="margin-top:12px"><span class="small">Contract pricing applied · credit OK</span><span class="btn btn-primary btn-sm">Place order</span></div>'+
    '</div></div></div>';
  }
  case "modules": {
    const m=[["store","Storefront","B2C"],["b2b","Dealer portal","B2B"],["jersey","Club stores","Teamwear"],["po","Procurement","POs from sales"],["factory","Supplier portal","Production"],["chart","Reporting","Insight"]];
    return '<div class="mods" aria-label="Platform modules with your own workflow added">'+m.map(x=>'<div class="mod">'+icon(x[0])+'<b>'+x[1]+'</b><span>'+x[2]+'</span></div>').join("")+
      '<div class="mod yours" style="grid-column:2 / span 2">'+icon("plus")+'<b>Your workflow</b><span>Built to your rules, on the same data</span></div></div>';
  }
  case "clubsales": {
    const r=[["Northside Hawks FC","Home playing shirt",[4,12,30,26,9]],["Eastlake United","Home playing shirt",[2,8,19,21,6]],["Northside Hawks FC","Club hoodie",[0,6,14,12,5]],["Riverside Juniors","Training polo",[6,14,18,10,2]]];
    return '<div class="mock-wrap">'+tag+'<div class="ui"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>Sales ready for purchase orders</div><div class="ui-body" style="padding:6px 8px 8px">'+
    '<div class="tbl-wrap"><table class="t"><thead><tr><th></th><th>Club</th><th>Product</th><th class="num">XS</th><th class="num">S</th><th class="num">M</th><th class="num">L</th><th class="num">XL</th></tr></thead><tbody>'+
    r.map((x,i)=>'<tr><td><span class="chk'+(i<3?' on':'')+'"></span></td><td>'+x[0]+'</td><td>'+x[1]+'</td>'+x[2].map(q=>'<td class="num mono">'+(q||"–")+'</td>').join("")+'</tr>').join("")+
    '</tbody></table></div><div class="row-b" style="padding:10px 8px 4px"><span class="small">3 selected · 169 units</span><span class="btn btn-primary btn-sm">Create purchase orders</span></div></div></div></div>';
  }
  case "workbench": {
    const z=["S","M","L","XL"], o=[12,30,26,9], pr=[12,30,18,0];
    return '<div class="mock-wrap">'+tag+'<div class="ui"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>Supplier portal · Production workbench</div><div class="ui-body">'+
    '<div class="row-b" style="margin-bottom:10px"><div><strong>PO-24-0183 · Home playing shirt</strong><div class="small">Due 26 Sep · 77 units</div></div><span class="pill p-info">In Production</span></div>'+
    '<div class="tbl-wrap"><table class="t"><thead><tr><th></th>'+z.map(x=>'<th class="num">'+x+'</th>').join("")+'<th class="num">Total</th></tr></thead><tbody>'+
    '<tr><td>Ordered</td>'+o.map(x=>'<td class="num mono">'+x+'</td>').join("")+'<td class="num mono">77</td></tr>'+
    '<tr><td><strong>Prepared</strong></td>'+pr.map(x=>'<td class="num in"><span>'+x+'</span></td>').join("")+'<td class="num mono"><strong>60</strong></td></tr></tbody></table></div>'+
    '<div class="fill" style="margin-top:12px"><i style="width:78%;background:var(--accent)"></i></div>'+
    '<div class="row-b" style="margin-top:12px"><span class="small">78% prepared</span><span style="display:flex;gap:6px"><span class="btn btn-ghost btn-sm">Export to Excel</span><span class="btn btn-ghost btn-sm">Import</span></span></div>'+
    '</div></div></div>';
  }
  case "supplier": {
    const r=[["PO-24-0186","Away shorts","92","03 Oct"],["PO-24-0187","Training polo","164","05 Oct"],["PO-24-0188","Club hoodie","58","05 Oct"]];
    return '<div class="mock-wrap">'+tag+'<div class="ui"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>Supplier portal · New purchase orders</div><div class="ui-body">'+
    '<div class="tbl-wrap"><table class="t"><thead><tr><th></th><th>PO</th><th>Product</th><th class="num">Units</th><th>Needed by</th></tr></thead><tbody>'+
    r.map(x=>'<tr><td><span class="chk on"></span></td><td class="mono">'+x[0]+'</td><td>'+x[1]+'</td><td class="num mono">'+x[2]+'</td><td class="mono">'+x[3]+'</td></tr>').join("")+
    '</tbody></table></div><div class="row-b" style="margin-top:12px"><span class="small">3 selected</span><span class="btn btn-primary btn-sm">Acknowledge 3 POs</span></div>'+
    '<div class="notif">'+icon("po")+'<span>You\'ll be notified by email and in the portal as each PO moves to production.</span></div>'+
    '</div></div></div>';
  }
  case "variants": {
    const o=[["Size",["YXS","YS","YM","YL","XS","S","M","L","XL","2XL","3XL"]],["Colour",["Green/Gold","Navy","White","Black"]],["Fit",["Men's","Women's","Youth"]]];
    return '<div class="mock-wrap">'+tag+'<div class="ui"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>Admin · Product variants</div><div class="ui-body">'+
    '<div class="row-b" style="margin-bottom:12px"><strong>Club playing shirt</strong><span class="pill p-ok">Active</span></div><div class="opts">'+
    o.map(x=>'<div class="optrow"><span class="k">'+x[0]+'</span><div class="chips">'+x[1].map(v=>'<span>'+v+'</span>').join("")+'</div></div>').join("")+'</div>'+
    '<div class="bigcount"><span class="small">Variants on this product</span><b>132</b></div>'+
    '<div class="row-b" style="margin-top:12px"><span class="small">Catalogue: 18,420 products · 412,960 variants</span><span class="pill p-mute">No cap</span></div>'+
    '</div></div></div>';
  }
  case "vouchers": return '<div class="mock-wrap">'+tag+'<div class="ui"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>Admin · Gift vouchers</div><div class="ui-body">'+
    '<div class="row-b"><div><strong>Club season vouchers</strong><div class="small">500 codes · $50 each · Northside Hawks FC range only</div></div><span class="pill p-ok">Active</span></div>'+
    '<ul class="log">'+
    '<li><span class="t">10:02</span><span><strong>GV-8K2P</strong> redeemed $50.00 on SO-58230<span class="why">Paid with voucher + card</span></span></li>'+
    '<li><span class="t">09:58</span><span><strong>GV-8K2P</strong> <span class="pill p-warn">Attempt failed</span><span class="why">Customer tried it on a product outside the club range</span></span></li>'+
    '<li><span class="t">09:40</span><span><strong>GV-31QZ</strong> <span class="pill p-warn">Attempt failed</span><span class="why">Code expired on 30 Sep</span></span></li>'+
    '<li><span class="t">Mon</span><span>Batch approved by a second administrator<span class="why">Over the $10,000 approval threshold</span></span></li>'+
    '</ul></div></div></div>';
  case "promos": {
    const r=[["WELCOME10","10% off first order","New customers","Active","p-ok"],["SHIPFREE","Free shipping","Orders over $150","Active","p-ok"],["CLUB20","20% off","Club range category","Scheduled","p-info"],["SAVE15","$15 off","Registered customers","Active","p-ok"],["EOFY25","25% off most expensive item","Everyone","Expired","p-mute"]];
    return '<div class="mock-wrap">'+tag+'<div class="ui"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>Admin · Promo codes</div><div class="ui-body" style="padding:6px 8px 8px">'+
    '<div class="tbl-wrap"><table class="t"><thead><tr><th>Code</th><th>Discount</th><th>Who</th><th>Status</th></tr></thead><tbody>'+
    r.map(x=>'<tr><td class="mono">'+x[0]+'</td><td>'+x[1]+'</td><td>'+x[2]+'</td><td><span class="pill '+x[4]+'">'+x[3]+'</span></td></tr>').join("")+'</tbody></table></div></div></div></div>';
  }
  case "bundle": return '<div class="mock-wrap">'+tag+'<div class="ui"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>Admin · Bundle</div><div class="ui-body">'+
    '<div class="row-b" style="margin-bottom:8px"><strong>Junior starter kit</strong><span class="pill p-ok">Live</span></div>'+
    '<div class="bline"><span>1 × Playing shirt</span><span>$64.95</span></div><div class="bline"><span>1 × Playing shorts</span><span>$39.95</span></div><div class="bline"><span>2 × Playing socks</span><span>$29.90</span></div>'+
    '<div class="cfg" style="margin-top:12px"><div class="grp-l">Pricing</div><div style="display:grid;gap:6px"><div class="opt"><span class="rd"></span>Fixed bundle price</div><div class="opt on"><span class="rd"></span>Items total less 15%</div><div class="opt"><span class="rd"></span>Items total less a dollar amount</div></div></div>'+
    '<div class="btotal"><span class="small">Customer pays</span><span><s>$134.80</s><b>$114.58</b></span></div>'+
    '</div></div></div>';
  case "schedule": {
    const rows=[["Carousel · slide 1","Winter kit launch",0,13,""],["Carousel · slide 2","Hoodie pre-order",4,26,"m"],["Carousel · slide 3","Grand final sale",19,26,"g"],["Campaign","Grand final sale",19,26,"g"],["Banner","Free shipping week",7,13,"m"]];
    return '<div class="mock-wrap">'+tag+'<div class="ui"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>CMS · Schedule · October</div><div class="ui-body"><div class="gantt">'+
    rows.map(x=>'<div class="row"><span><strong>'+x[0]+'</strong><br><span class="small">'+x[1]+'</span></span><div class="lane"><span class="bar '+x[4]+'" style="left:'+(x[2]/31*100).toFixed(2)+'%;width:'+((x[3]-x[2]+1)/31*100).toFixed(2)+'%">'+(x[2]+1)+'–'+(x[3]+1)+' Oct</span>'+(x===rows[0]?'':'')+'</div></div>').join("")+
    '<div class="axis"><span></span><div><span>1</span><span>8</span><span>15</span><span>22</span><span>31</span></div></div>'+
    '</div><div class="notif" style="margin-top:14px">'+icon("settings")+'<span>Each slide, section and campaign turns on and off by itself at its start and end time.</span></div></div></div></div>';
  }
  case "kitcheck": {
    const tabs=["Team Kit","My Sizes","Jersey","Complete Kit","My Orders","Season History","Club Locker","My Reviews"];
    const items=[["Home playing shirt","LEE · 11 · Youth M",1],["Playing shorts","Youth S",1],["Playing socks","2–8",1],["Training top","Youth M",1],["Club hoodie","Youth M",0],["Kit bag","One size",0]];
    return '<div class="mock-wrap">'+tag+'<div class="ui"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>Locker Room · Northside Hawks FC</div><div class="ui-body">'+
    '<div class="ltabs">'+tabs.map(t=>'<span class="'+(t==="Complete Kit"?'on':'')+'">'+t+'</span>').join("")+'</div>'+
    '<div class="row-b" style="margin-bottom:8px"><strong>U14 Girls · required kit</strong><span class="small mono">Season 2026–27</span></div>'+
    '<div class="progress"><div class="fill"><i style="width:66.7%;background:var(--accent)"></i></div><span class="small mono">4 of 6</span></div>'+
    items.map(x=>'<div class="kitrow"><span class="st '+(x[2]?'ok':'no')+'">'+(x[2]?'✓':'')+'</span><span><strong>'+x[0]+'</strong><span class="small" style="display:block">'+x[1]+'</span></span>'+(x[2]?'<span class="small">Owned</span>':'<span class="pill p-info">Missing</span>')+'</div>').join("")+
    '<div class="row-b" style="margin-top:12px"><span class="small">Sizes and jersey details filled in for you</span><span class="btn btn-primary btn-sm">Add 2 missing items</span></div>'+
    '</div></div></div>';
  }
  case "components": {
    const r=[["Contrast collar","+$4.00","320",""],["Embroidered club crest","+$6.50","1,140",""],["Sponsor patch","+$3.00","85","low"],["Sleeve trim, gold","+$2.50","610",""]];
    return '<div class="mock-wrap">'+tag+'<div class="ui"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>Admin · Product components</div><div class="ui-body">'+
    '<div class="basebox"><span><span class="small" style="display:block">Base product</span><strong>Performance polo, blank</strong></span><span class="mono">$32.00 · 2,400 in stock</span></div>'+
    '<div class="comp"><span class="h">Component</span><span class="h" style="text-align:right">Price</span><span class="h" style="text-align:right">In stock</span>'+
    r.map(x=>'<span class="c">'+x[0]+'</span><span class="c n">'+x[1]+'</span><span class="c n">'+(x[3]?'<span class="pill p-warn">'+x[2]+' low</span>':x[2])+'</span>').join("")+'</div>'+
    '<div class="finalbox"><span><span class="small" style="display:block">Final product</span><strong>Club polo, collar + crest + trim</strong></span><b>$45.00</b></div>'+
    '<div class="small" style="margin-top:10px">Components are reserved when the order is placed, and reordered through purchasing when stock runs low.</div>'+
    '</div></div></div>';
  }
  case "podetail": {
    const st=[["Draft","d"],["Approved","d"],["Sent","d"],["Acknowledged","d"],["In production","n"],["Shipped",""],["Received",""],["Invoiced",""]];
    const feed=[["Tue 09:14","Approved by Sam Taylor","Checked against sales order SO-58230","p-ok","Approved"],
                ["Tue 09:15","Sent to Apex Sportswear","Email and portal notification sent","p-info","Sent"],
                ["Tue 16:40","Supplier requested a change","Delivery date 12 Oct → 19 Oct, fabric delay","p-warn","Change"],
                ["Wed 08:05","Change accepted","Supplier notified, PO updated","p-ok","Reviewed"],
                ["Wed 08:30","Acknowledged by supplier","Production planned for 3 weeks","p-ok","Ack"]];
    return '<div class="mock-wrap">'+tag+'<div class="ui"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>Purchase order PO-24-0188</div><div class="ui-body">'+
    '<div class="row-b"><div><strong>Club hoodie · 58 units</strong><div class="small">Apex Sportswear · Sea freight · from SO-58230</div></div><span class="pill p-info">In Production</span></div>'+
    '<div class="stepper">'+st.map(x=>'<span class="'+x[1]+'">'+x[0]+'</span>').join("")+'</div>'+
    '<ul class="log">'+feed.map(x=>'<li><span class="t">'+x[0]+'</span><span><strong>'+x[1]+'</strong><span class="why">'+x[2]+'</span></span></li>').join("")+'</ul>'+
    '</div></div></div>';
  }
  case "invoicematch": {
    const r=[["PO-24-0179","Club hoodie · M","24","24","$21.40","$513.60"],["PO-24-0179","Club hoodie · L","20","20","$21.40","$428.00"],["PO-24-0181","Training polo · M","8","8","$14.90","$119.20"]];
    return '<div class="mock-wrap">'+tag+'<div class="ui"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>Admin · Supplier invoice</div><div class="ui-body">'+
    '<div class="inv-head"><div><strong>INV-2610-00012</strong><div class="small">Apex Sportswear · for shipment SH-1042 · 2 POs</div></div><span class="pill p-info">Submitted</span></div>'+
    '<div class="tbl-wrap"><table class="t"><thead><tr><th>PO</th><th>Item</th><th class="num">Shipped</th><th class="num">Invoiced</th><th class="num">Unit</th><th class="num">Total</th></tr></thead><tbody>'+
    r.map(x=>'<tr><td class="mono">'+x[0]+'</td><td>'+x[1]+'</td><td class="num mono">'+x[2]+'</td><td class="num ok">'+x[3]+'</td><td class="num mono">'+x[4]+'</td><td class="num mono">'+x[5]+'</td></tr>').join("")+'</tbody></table></div>'+
    '<div class="match"><span>Quantities match the shipment</span><span>Unit costs match the POs</span></div>'+
    '<div class="inv-tot"><span>Lines</span><span>$1,060.80</span><span>Freight surcharge</span><span>$120.00</span><span class="g">Total</span><span class="g">$1,180.80</span></div>'+
    '<div class="inv-act"><span class="btn btn-ghost btn-sm">Dispute</span><span class="btn btn-primary btn-sm">Approve for payment</span></div>'+
    '</div></div></div>';
  }
  case "procdash": return '<div class="mock-wrap">'+tag+'<div class="ui"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>Admin · Procurement dashboard</div><div class="ui-body">'+
    '<div class="kpis"><div class="kpi"><div class="l">PO cycle time</div><div class="v">23 d</div><div class="d">order to delivery</div></div><div class="kpi"><div class="l">In transit</div><div class="v">14</div><div class="d">shipments</div></div><div class="kpi"><div class="l">Disputed</div><div class="v">3%</div><div class="d">of invoices</div></div></div>'+
    '<div class="small" style="margin-top:14px">Invoice ageing · approved, not yet paid</div>'+
    '<div class="aging"><div><i style="height:76px"></i><span>0–30 d</span></div><div><i style="height:43px"></i><span>31–60 d</span></div><div><i style="height:21px"></i><span>61–90 d</span></div><div><i style="height:9px"></i><span>90+ d</span></div></div>'+
    '</div></div></div>';
  case "dam": {
    const r=[["#1f5c3a","home-shirt-front.jpg","Home playing shirt · Green/Gold","Live","p-ok"],["#23324f","home-shirt-back.jpg","Home playing shirt · Green/Gold","Live","p-ok"],["#6b6b68","club-hoodie-navy.jpg","Club hoodie · Navy","Activated","p-info"],["#b4d234","training-polo-lime.jpg","Training polo · Lime","Needs review","p-warn"],["#8a3b12","kit-bag-lifestyle.jpg","Team kit bag","Synced","p-mute"]];
    return '<div class="mock-wrap">'+tag+'<div class="ui"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>Admin · Media from HIVO</div><div class="ui-body">'+
    '<div class="row-b" style="margin-bottom:10px"><span class="small">Last sync 09:42 · 1,284 assets</span><span class="pill p-ok">Connected</span></div>'+
    r.map(x=>'<div class="asset"><span class="thumb-sw" style="background:'+x[0]+'">'+icon("dam")+'</span><span><strong class="mono" style="font-weight:500;font-size:.78rem">'+x[1]+'</strong><span class="small" style="display:block">'+x[2]+'</span></span><span class="pill '+x[4]+'">'+x[3]+'</span></div>').join("")+
    '<div class="row-b" style="margin-top:12px"><span class="small">Activated assets go live on every store that sells the product</span><span class="btn btn-primary btn-sm">Activate 1</span></div>'+
    '</div></div></div>';
  }
  case "proof": return '<figure class="proof" aria-label="Two live stores on StacCraft: the Hockey Australia brand store and the Kookaburra Teamwear club portal">'+
    '<div class="browser p1"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>hockeyau.kookaburrasport.com.au</div><img src="'+blobUrl("live/ha-home.jpg")+'" alt="Hockey Australia official store"><span class="ptag">Brand store · Hockey Australia<b>Live</b></span></div>'+
    '<div class="browser p2"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>teamwear.kookaburrasport.com.au</div><img src="'+blobUrl("live/tw-clubs.jpg")+'" alt="Kookaburra Teamwear club portal with club crests"><span class="ptag">Club portal · Kookaburra Teamwear<b>Live</b></span></div>'+
    '<div class="pphone"><img src="'+blobUrl("live/ha-mobile.jpg")+'" alt="The Hockey Australia store on a phone"></div>'+
    '<figcaption>Same platform. Two very different businesses.</figcaption></figure>';
  case "bankchange": return '<div class="mock-wrap">'+tag+'<div class="ui"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>Admin · Supplier bank details</div><div class="ui-body">'+
    '<div class="row-b" style="margin-bottom:12px"><div><strong>Apex Sportswear</strong><div class="small">Change requested in the supplier portal · 28 Sep, 14:02</div></div><span class="pill p-warn">Awaiting approval</span></div>'+
    '<div class="bank"><div><span class="k">Current</span><span class="mono">BSB 063-***</span><span class="mono">Acct ••••4521</span></div><span class="arr" aria-hidden="true">→</span><div class="new"><span class="k">Requested</span><span class="mono">BSB 082-***</span><span class="mono">Acct ••••9917</span></div></div>'+
    '<ul class="log" style="margin-top:12px"><li><span class="t">14:02</span><span>Requested by J. Chen<span class="why">Supplier portal user</span></span></li><li><span class="t">14:03</span><span>Sent to your team for approval<span class="why">Nothing changes in '+esc(erpIn())+' until it is approved</span></span></li></ul>'+
    '<div class="inv-act"><span class="btn btn-ghost btn-sm">Reject</span><span class="btn btn-primary btn-sm">Approve and send to '+esc(erpIn())+'</span></div>'+
    '</div></div></div>';
  case "reports": {
    const wk=[28,31,29,35,33,38,36,42,40,45,44,49], X=i=>34+i*(276/11), Y=v=>128-(v-20)/30*108;
    const pts=wk.map((v,i)=>X(i).toFixed(1)+','+Y(v).toFixed(1)).join(' ');
    const grid=[20,30,40,50].map(v=>'<line class="rp-grid" x1="34" x2="310" y1="'+Y(v).toFixed(1)+'" y2="'+Y(v).toFixed(1)+'"/><text class="rp-ax" x="28" y="'+(Y(v)+3).toFixed(1)+'" text-anchor="end">$'+v+'k</text>').join("");
    const xl=[[0,"W1"],[3,"W4"],[7,"W8"],[11,"W12"]].map(a=>'<text class="rp-ax" x="'+X(a[0]).toFixed(1)+'" y="146" text-anchor="middle">'+a[1]+'</text>').join("");
    const chart='<svg class="rp-chart" viewBox="0 0 320 150" role="img" aria-label="Weekly revenue rising from 28 thousand to 49 thousand dollars over 12 weeks">'+grid+
      '<polygon class="rp-area" points="'+X(0)+','+Y(20)+' '+pts+' '+X(11)+','+Y(20)+'"/><polyline class="rp-line" points="'+pts+'"/>'+
      '<circle class="rp-end" cx="'+X(11).toFixed(1)+'" cy="'+Y(49).toFixed(1)+'" r="4"/><text class="rp-endt" x="'+(X(11)-6).toFixed(1)+'" y="'+(Y(49)-9).toFixed(1)+'" text-anchor="end">$49k</text>'+xl+'</svg>';
    const clubs=[["Northside Hawks FC",156.7],["Eastlake United",107.2],["Riverside Juniors",74.2],["Harbour City HC",45.4],["Other clubs",28.9]];
    const bars=clubs.map(c=>'<div class="rp-bar"><span class="rp-bn">'+c[0]+'</span><span class="rp-bt"><i style="width:'+(c[1]/156.7*100).toFixed(1)+'%"></i></span><span class="rp-bv">$'+c[1].toFixed(1)+'k</span></div>').join("");
    const prod=[["Home playing shirt","1,284","$83.4k"],["Training polo","962","$41.2k"],["Club hoodie","611","$39.7k"],["Playing socks","2,410","$24.1k"]];
    const low=[["Away shorts · M","6 left"],["Club hoodie · XL","4 left"],["Team kit bag","9 left"]];
    return '<div class="mock-wrap">'+tag+'<div class="ui rp"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>Admin portal · Reports · Last 30 days</div><div class="ui-body">'+
      '<div class="rp-kpis">'+[["Net revenue","$412,380","+8.4%"],["Orders","3,184","+5.1%"],["Avg order","$129.50","+3.2%"],["Returns","1.8%","−0.4 pts"]].map(k=>'<div class="rp-k"><span class="l">'+k[0]+'</span><span class="v">'+k[1]+'</span><span class="d">'+k[2]+'</span></div>').join("")+'</div>'+
      '<div class="rp-row"><div class="rp-card"><div class="rp-h">Revenue by week</div>'+chart+'</div><div class="rp-card"><div class="rp-h">Revenue by club</div>'+bars+'</div></div>'+
      '<div class="rp-row"><div class="rp-card"><div class="rp-h">Top products</div><table class="t rp-t"><tbody>'+prod.map(r=>'<tr><td>'+r[0]+'</td><td class="num mono">'+r[1]+'</td><td class="num mono">'+r[2]+'</td></tr>').join("")+'</tbody></table></div>'+
      '<div class="rp-card"><div class="rp-h">Low stock</div>'+low.map(l=>'<div class="rp-low"><span>'+l[0]+'</span><span class="pill p-warn">'+l[1]+'</span></div>').join("")+'<div class="rp-exp"><span>Export</span><b>Excel</b><b>PDF</b></div></div></div>'+
      '</div></div></div>';
  }
  case "admin": {
    const wk=[31,33,32,36,35,39,38,42,41,45,44,48], X=i=>38+i*(272/11), Y=v=>116-(v-25)/25*100;
    const pts=wk.map((v,i)=>X(i).toFixed(1)+','+Y(v).toFixed(1)).join(' ');
    const grid=[30,40,50].map(v=>'<line class="rp-grid" x1="38" x2="310" y1="'+Y(v).toFixed(1)+'" y2="'+Y(v).toFixed(1)+'"/><text class="rp-ax" x="32" y="'+(Y(v)+3).toFixed(1)+'" text-anchor="end">$'+v+'k</text>').join("");
    const xl=[[0,"W1"],[5,"W6"],[11,"W12"]].map(a=>'<text class="rp-ax" x="'+X(a[0]).toFixed(1)+'" y="134" text-anchor="middle">'+a[1]+'</text>').join("");
    const hits=wk.map((v,i)=>'<rect class="rp-hit" x="'+(X(i)-11).toFixed(1)+'" y="10" width="22" height="108" rx="3"><title>Week '+(i+1)+': $'+v+'k</title></rect>').join("");
    const chart='<svg class="rp-chart" viewBox="0 0 320 140" role="img" aria-label="Weekly revenue rising from 31 thousand to 48 thousand dollars over 12 weeks">'+grid+
      '<polygon class="rp-area" points="'+X(0)+','+Y(25)+' '+pts+' '+X(11)+','+Y(25)+'"/><polyline class="rp-line" points="'+pts+'"/>'+hits+
      '<circle class="rp-end" cx="'+X(11).toFixed(1)+'" cy="'+Y(48).toFixed(1)+'" r="4"/><text class="rp-endt" x="'+(X(11)-7).toFixed(1)+'" y="'+(Y(48)-8).toFixed(1)+'" text-anchor="end">$48k</text>'+xl+'</svg>';
    const ch=[["Web store",186.2],["Club stores",141.9],["Dealer portal",84.3]];
    const bars=ch.map(c=>'<div class="adm-bar" title="'+c[0]+': $'+c[1]+'k"><span>'+c[0]+'</span><span class="adm-bt"><i style="width:'+(c[1]/186.2*100).toFixed(1)+'%"></i></span><span class="adm-bv">$'+c[1].toFixed(1)+'k</span></div>').join("");
    const po=[["Awaiting acknowledgement",12,"p-warn","Waiting"],["In production",21,"p-info","Active"],["Shipped",9,"p-info","In transit"],["Delivered this month",31,"p-ok","Done"]];
    const warn='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3 2 20h20Z"/><path d="M12 10v4M12 17h.01"/></svg>';
    const att=[["Supplier change requests","2"],["Disputed supplier invoice","1"],["Variants below reorder level","3"]];
    return '<div class="mock-wrap">'+tag+'<div class="ui adm"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>Admin portal · Overview · Last 30 days</div><div class="ui-body">'+
      '<div class="adm-k">'+[["Net revenue","$412,380","+8.4%","vs last period"],["Orders","3,184","+5.1%","all channels"],["Open purchase orders","42","","12 awaiting supplier"]].map(k=>'<div class="adm-c"><span class="l">'+k[0]+'</span><span class="v">'+k[1]+'</span><span class="d">'+(k[2]?'<b>'+k[2]+'</b> ':'')+k[3]+'</span></div>').join("")+'</div>'+
      '<div class="adm-row"><div class="adm-c"><div class="adm-h">Revenue by week<span>12 weeks</span></div>'+chart+'</div><div class="adm-c"><div class="adm-h">Revenue by channel<span>30 days</span></div>'+bars+'<div class="adm-sub">Same stock and customers across all three</div></div></div>'+
      '<div class="adm-row"><div class="adm-c"><div class="adm-h">Purchase orders<span>by status</span></div>'+po.map(p=>'<div class="adm-po"><span>'+p[0]+'</span><span style="display:flex;gap:8px;align-items:center"><b>'+p[1]+'</b><span class="pill '+p[2]+'">'+p[3]+'</span></span></div>').join("")+'</div>'+
      '<div class="adm-c"><div class="adm-h">Needs attention<span>today</span></div>'+att.map(a=>'<div class="adm-att">'+warn+'<span>'+a[0]+'</span><b>'+a[1]+'</b></div>').join("")+'</div></div>'+
      '</div></div></div>';
  }
  case "seam": return '<div class="seam" aria-hidden="true"><svg viewBox="0 0 420 420"><circle cx="210" cy="210" r="190" fill="none" stroke="var(--line)" stroke-width="2"/><circle cx="210" cy="210" r="170" fill="color-mix(in oklab,var(--accent) 10%,transparent)"/>'+
    '<path d="M110 50c70 90 70 230 0 320M310 50c-70 90-70 230 0 320" fill="none" stroke="var(--gold)" stroke-width="5" stroke-linecap="round"/>'+
    '<path d="M122 50c70 90 70 230 0 320M298 50c-70 90-70 230 0 320" fill="none" stroke="var(--gold)" stroke-width="3" stroke-dasharray="2 10" stroke-linecap="round" opacity=".8"/></svg></div>';
  case "insights": {
    const ps=articlePages().slice(0,3); if(!ps.length) return "";
    const topics=articlePages().map(p=>p.article.category).filter((c,i,a)=>c&&a.indexOf(c)===i).length;
    return '<div class="ins-stack">'+ps.map((p,i)=>{ const t=catTheme(p.article.category);
      return '<a class="ins-card c'+i+'" href="/'+esc(p.id)+'" style="--hue:'+t.hue+'"><span class="ins-cv cover-bg">'+coverArt(p.article.category)+'</span><span class="ins-b"><span class="post-k"><i></i>'+esc(p.article.category||"Insights")+'</span><b>'+tx(p.title)+'</b><span class="post-m">'+esc(fmtDate(p.article.date))+' · '+articleMins(p)+' min read</span></span></a>'; }).join("")+
      '<div class="ins-badge"><b>'+articlePages().length+'</b><span>guides across '+topics+' topics</span></div></div>';
  }
  case "ecosystem": return '<div class="eco-wrap"><div class="eco-scroll">'+ecoSvg()+'</div></div>';
  default: return "";
  }
}
let jid=0;
function jersey(name,num,opts){
  opts=opts||{}; const g="jsh"+(++jid);
  const body="M62 12 L30 26 L6 70 L34 86 L46 66 L46 182 L154 182 L154 66 L166 86 L194 70 L170 26 L138 12 C128 20 114 23 100 23 C86 23 72 20 62 12 Z";
  return '<svg viewBox="0 0 200 190" role="img" aria-label="Back of a playing shirt with name '+name+' and number '+num+'">'+
    '<defs><linearGradient id="'+g+'" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".16"/><stop offset=".22" stop-color="#000" stop-opacity="0"/><stop offset=".78" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".16"/></linearGradient></defs>'+
    '<path d="'+body+'" fill="'+(opts.fill||"var(--jersey)")+'"/><path d="'+body+'" fill="url(#'+g+')"/>'+
    '<path d="M62 12 C72 20 86 23 100 23 C114 23 128 20 138 12 L130 9 C122 15 112 17 100 17 C88 17 78 15 70 9 Z" fill="var(--gold)"/>'+
    '<path d="M6 70 L34 86 L37.4 79.8 L9.4 63.8 Z M194 70 L166 86 L162.6 79.8 L190.6 63.8 Z" fill="var(--gold)"/>'+
    '<rect x="46" y="164" width="108" height="6" fill="var(--gold)"/><rect x="46" y="172" width="108" height="3" fill="#0F1915" opacity=".45"/>'+
    '<text x="100" y="64" text-anchor="middle" font-family="Big Shoulders Display, Impact, sans-serif" font-weight="800" font-size="22" letter-spacing="3" fill="#fff">'+name+'</text>'+
    '<text x="100" y="136" text-anchor="middle" font-family="Big Shoulders Display, Impact, sans-serif" font-weight="900" font-size="64" fill="#fff">'+num+'</text></svg>';
}
function polo(fill,label){
  return '<svg viewBox="0 0 100 92" aria-hidden="true"><path d="M32 6 16 13 3 36l14 8 6-10v54h54V34l6 10 14-8-13-23-16-7c-3 7-9 10-18 10S35 13 32 6Z" fill="'+fill+'" stroke="rgba(15,25,21,.35)" stroke-width="1.2"/><path d="M40 8l10 14 10-14" fill="none" stroke="rgba(15,25,21,.45)" stroke-width="1.6"/><path d="M50 22v14" stroke="rgba(15,25,21,.45)" stroke-width="1.4"/></svg>';
}
const ART={
  bat:'<svg viewBox="0 0 60 120" aria-hidden="true"><rect x="26" y="4" width="8" height="40" rx="3" fill="#0F1915" opacity=".8"/><path d="M18 44h24l-2 70a4 4 0 0 1-4 4H24a4 4 0 0 1-4-4Z" fill="#E9CF9B" stroke="rgba(15,25,21,.35)"/><rect x="18" y="52" width="24" height="10" fill="var(--accent)"/></svg>',
  ball:'<svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="40" fill="#B3261E"/><path d="M26 18c14 18 14 46 0 64M74 18c-14 18-14 46 0 64" fill="none" stroke="#F3E3C0" stroke-width="2.4" stroke-dasharray="3 3"/></svg>',
  stick:'<svg viewBox="0 0 60 120" aria-hidden="true"><path d="M30 4v88c0 14 16 22 22 12" fill="none" stroke="#0F1915" stroke-width="8" stroke-linecap="round" opacity=".85"/><path d="M30 20v24" stroke="var(--accent)" stroke-width="9"/></svg>',
  bag:'<svg viewBox="0 0 120 90" aria-hidden="true"><path d="M40 22c0-10 40-10 40 0" fill="none" stroke="#0F1915" stroke-width="5" opacity=".8"/><rect x="8" y="24" width="104" height="58" rx="12" fill="var(--accent)"/><rect x="8" y="48" width="104" height="7" fill="var(--gold)"/><rect x="50" y="30" width="20" height="10" rx="2" fill="#fff" opacity=".85"/></svg>'
};
const MOCK_LABEL={"admin":"admin dashboard with revenue, orders, purchase orders and items needing attention","reports":"reports dashboard with revenue, orders, revenue by club, top products and low stock","bankchange":"supplier bank detail change awaiting approval","dam":"asset library synced from a DAM","invoicematch":"supplier invoice matched to its shipment","procdash":"procurement dashboard","podetail":"purchase order with approval and supplier activity","components":"base product with components and their stock","kitcheck":"Locker Room complete-kit tracker","variants":"product with 132 variants","vouchers":"gift voucher batch with audit log","promos":"promo code list","bundle":"bundle pricing","schedule":"CMS schedule timeline","platform": "club store, purchase order and ERP sync", "locker": "Locker Room player profile", "matrix": "B2B size-matrix order", "po": "purchase order list", "shipment": "shipment tracker", "erp": "ERP integration log", "dashboard": "admin dashboard", "catalogue": "product catalogue with retail and dealer prices", "config": "purchase order generation settings", "brands": "several businesses on one platform", "quickorder": "dealer quick order", "clubsales": "club sales ready for purchase orders", "workbench": "supplier production workbench", "supplier": "supplier portal purchase order inbox"};
function visual(s){
  if(s.visual==="image") return s.image?(s.imageSite?'<figure class="browser"><div class="ui-bar"><span class="dots"><i></i><i></i><i></i></span>'+esc(s.imageSite)+'</div><img src="'+blobUrl(s.image)+'" alt="'+esc(s.imageAlt||"")+'" loading="lazy"></figure>':'<img class="hero-img" src="'+blobUrl(s.image)+'" alt="'+esc(s.imageAlt||"")+'">'):'';
  const m=mock(s.visual);
  return m&&MOCK_LABEL[s.visual]?'<div role="img" aria-label="Example screen: '+MOCK_LABEL[s.visual]+'">'+m+'</div>':m;
}


/* End-to-end flow: B2B sale -> back-to-back PO -> supplier -> warehouse/3PL -> customer, with ERP postings */
function flowSvg(M){
  const LX=152, PITCH=120, NW=104, NH=54, LANE=[20,120,220,320,420], LH=90;
  const N=M.nodes;
  const box=id=>{ const n=N[id]; const x=LX+n[0]*PITCH, cy=LANE[n[1]]+LH/2; return {x, y:cy-NH/2, r:x+NW, b:cy+NH/2, cx:x+NW/2, cy, lane:n[1]}; };
  let o='<svg class="e2e" viewBox="0 0 1230 530" role="img" aria-label="'+esc(M.aria.split("{ERP}").join(erpIn()))+'">';
  o+='<defs>'+['','acc','gold'].map(k=>'<marker id="ah'+k+'" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="ah '+k+'" d="M0 0 L10 5 L0 10 z"/></marker>').join("")+'</defs>';
  M.lanes.forEach((l,i)=>{ o+='<rect class="band'+(i===M.us?' us':'')+'" x="0" y="'+LANE[i]+'" width="1230" height="'+LH+'" rx="10"/>'+
    '<text class="lane-l" x="14" y="'+(LANE[i]+40)+'">'+esc(l[0].split("{ERP}").join(ERP()))+'</text><text class="lane-s" x="14" y="'+(LANE[i]+58)+'">'+esc(l[1])+'</text>'; });
  const edge=(d,cls,label,lx,ly,anchor)=>{ const k=cls.includes('acc')?'acc':cls.includes('gold')?'gold':''; o+='<path class="edge '+cls+'" d="'+d+'" marker-end="url(#ah'+k+')"/>';
    if(label) o+='<text class="el'+(k==='acc'?' acc':'')+'" x="'+lx+'" y="'+ly+'" text-anchor="'+(anchor||'start')+'">'+esc(label)+'</text>'; };
  M.edges.forEach(e=>{ const A=box(e.f), B=box(e.t), c=e.c||'', off=e.off||0;
    if(e.k==='flat') edge('M'+A.r+' '+A.cy+' H'+(B.x-2),c,e.l,(A.r+B.x)/2,A.y-6,'middle');
    else if(e.k==='elbow'){ const xm=(A.r+B.x)/2; edge('M'+A.r+' '+A.cy+' H'+xm+' V'+B.cy+' H'+(B.x-2),c,e.l,xm+6,(A.cy+B.cy)/2+4+off); }
    else if(e.k==='vert'){ const up=B.cy<A.cy, y1=up?A.y:A.b, y2=up?B.b+2:B.y-2; edge('M'+A.cx+' '+y1+' V'+y2,c,e.l,e.side==='left'?A.cx-7:A.cx+7,(y1+y2)/2+4+off,e.side==='left'?'end':'start'); }
    else if(e.k==='downright'){ const vx=A.cx+26; edge('M'+vx+' '+A.b+' V'+B.cy+' H'+(B.x-2),c,e.l,vx+6,(A.b+B.y)/2+8+off); }
    else if(e.k==='upleft'){ edge('M'+B.cx+' '+B.y+' V'+A.cy+' H'+(A.r+3),c,'',0,0); if(e.l) o+='<text class="el" x="'+(B.cx+6)+'" y="'+((B.y+A.cy)/2+10)+'">'+esc(e.l)+'</text>'; }
    else if(e.k==='under'){ const yb=LANE[A.lane]+LH-7; edge('M'+A.cx+' '+A.b+' V'+yb+' H'+B.cx+' V'+(B.b+2),c,e.l,(A.cx+B.cx)/2,yb-5,'middle'); }
  });
  Object.keys(N).forEach(id=>{ const n=N[id], B=box(id); const cls=n[1]===M.us?' us':n[5]==='erp'?' erp':'';
    o+='<rect class="node'+cls+'" x="'+B.x+'" y="'+B.y+'" width="'+NW+'" height="'+NH+'" rx="9"/>'+
      '<text class="nt" x="'+B.cx+'" y="'+(B.cy-3)+'" text-anchor="middle">'+esc(n[3])+'</text><text class="ns" x="'+B.cx+'" y="'+(B.cy+13)+'" text-anchor="middle">'+esc(n[4])+'</text>';
    if(n[2]) o+='<circle class="num" cx="'+(B.x+4)+'" cy="'+(B.y+4)+'" r="9"/><text class="numt" x="'+(B.x+4)+'" y="'+(B.y+7.5)+'" text-anchor="middle">'+n[2]+'</text>'; });
  return o+'</svg>';
}
const FLOWS={
 b2b:{us:1,gold:"Supplier change request",aria:"B2B end-to-end flow: a B2B order becomes a sales order and a back-to-back purchase order that is approved and sent to the supplier; the supplier acknowledges, produces, ships part or all and invoices; the warehouse or 3PL receives it, picks and dispatches to the customer; sales and purchase orders post to {ERP}.",
  lanes:[["B2B customer","Dealer portal"],["Your team","StacCraft"],["Supplier","Supplier portal"],["Warehouse","3PL or in-house WMS"],["{ERP}","ERP"]],
  nodes:{a:[0,0,1,"B2B order","Dealer portal"],b:[1,1,2,"Sales order","Confirmed"],c:[2,1,3,"Back-to-back PO","From the order"],d:[3,1,4,"PO approval","Approve, then send"],
   e:[4,2,5,"Acknowledge","One or in bulk"],f:[5,2,6,"Produce","Workbench, per size"],g:[6,2,7,"Ship","Part or full"],h:[6,1,8,"Invoice","Approve or dispute"],
   i:[7,3,9,"Receive","Against the PO"],j:[8,3,10,"Pick & dispatch","To the customer"],k:[8,0,11,"Delivered","Tracked"],
   x:[1,4,0,"Sales order","Posted","erp"],y:[3,4,0,"Purchase order","Posted","erp"]},
  edges:[{f:"a",t:"b",k:"elbow",l:"places order"},{f:"b",t:"c",k:"flat"},{f:"c",t:"d",k:"flat"},{f:"d",t:"e",k:"downright",c:"acc",l:"sent · notified"},
   {f:"d",t:"e",k:"upleft",c:"gold",l:"change request"},{f:"e",t:"f",k:"flat"},{f:"f",t:"g",k:"flat"},{f:"g",t:"h",k:"vert",c:"acc",l:"invoice"},
   {f:"g",t:"i",k:"elbow",l:"ships"},{f:"i",t:"j",k:"flat"},{f:"j",t:"k",k:"vert",c:"acc",l:"delivers",off:-40},
   {f:"b",t:"x",k:"vert",c:"dash",l:"posts",off:60},{f:"d",t:"y",k:"vert",c:"dash",l:"posts",off:60}]},
 b2c:{us:1,gold:"Return request",aria:"B2C end-to-end flow: a shopper buys on the web or club store, checks out with promo codes and vouchers and pays; the order is confirmed and posted to {ERP}; stocked items are picked and packed straight away, while pre-order items are pooled into a purchase order when the window closes, produced by the supplier and received; the order is dispatched and delivered; returns are approved and refunded or issued as a voucher.",
  lanes:[["Shopper","Web or club store"],["Your team","StacCraft"],["Supplier","Supplier portal"],["Warehouse","3PL or in-house WMS"],["Payments · {ERP}","Card, PayPal, voucher"]],
  nodes:{a:[0,0,1,"Browse & buy","Web or club store"],b:[1,1,2,"Checkout","Promos, vouchers"],c:[2,4,3,"Payment","Card, PayPal, voucher"],d:[3,1,4,"Order confirmed","Shopper notified"],
   x:[3,4,0,"Sales order","Posted","erp"],e:[4,3,5,"Pick & pack","In stock"],f:[4,1,6,"Window closes","Pre-orders pooled"],g:[5,2,7,"Produce","Per size, personalised"],
   h:[6,3,8,"Receive","Against the PO"],i:[7,3,9,"Dispatch","Tracked"],j:[7,0,10,"Delivered","In order history"],k:[8,0,11,"Return","If needed"],
   l:[8,1,12,"Return approved","In the admin"],m:[8,4,13,"Refund or voucher","Back to the shopper","erp"]},
  edges:[{f:"a",t:"b",k:"elbow",l:"checks out"},{f:"b",t:"c",k:"elbow",l:"pays"},{f:"c",t:"d",k:"elbow",c:"acc",l:"confirmed"},{f:"d",t:"x",k:"vert",c:"dash",l:"posts",off:70,side:"left"},
   {f:"d",t:"e",k:"downright",c:"acc",l:"in stock"},{f:"d",t:"f",k:"flat",l:"pre-order"},{f:"f",t:"g",k:"elbow",c:"acc",l:"PO sent"},{f:"g",t:"h",k:"elbow",l:"ships"},
   {f:"e",t:"i",k:"under",l:"ships now"},{f:"h",t:"i",k:"flat"},{f:"i",t:"j",k:"vert",c:"acc",l:"delivers",off:-40},{f:"j",t:"k",k:"flat"},
   {f:"k",t:"l",k:"vert",c:"gold",l:"requests"},{f:"l",t:"m",k:"vert",c:"acc",l:"refunds",off:40}]}
};
function e2eSvg(){ return flowSvg(FLOWS.b2b); }
/* Ecosystem hub: StacCraft at the centre, every module around it (after the Apparel21-style map) */
function ecoSvg(){
  const C={x:550,y:322};
  const N={
    web:[130,92,["Web store &","eCommerce"],"store","c",0], rep:[340,92,["Reporting &","insights"],"chart","c",0], dam:[550,92,["Digital assets","DAM, e.g. HIVO"],"dam","c",0],
    des:[760,92,["Design &","kit builder"],"brush","c",0], pur:[970,92,["Purchasing &","production"],"po","c",0],
    lock:[92,322,["Locker Room"],"locker","team",1], team:[300,322,["Teamwear &","club stores"],"jersey","c",1],
    b2b:[800,322,["Wholesale","(B2B)"],"b2b","c",1], deal:[1008,322,["Dealer","portal"],"monitor","b2b",1],
    sup:[200,580,["Supplier","portal"],"factory","c",2], wh:[375,580,["Warehousing","3PL or WMS"],"warehouse","c",2],
    acc:[550,580,["Accounting & ERP","Connected to yours"],"calc","c",2], dist:[725,580,["Distribution","& delivery"],"truck","c",2],
    api:[900,580,["API &","integrations"],"api","c",2]};
  const anchor=(n)=>{ const [x,y,,, ,row]=n; return row===0?{x,y:y+92}:row===2?{x,y:y-48}:{x:x+(x<C.x?46:-46),y}; };
  let o='<svg class="eco" viewBox="0 0 1100 680" role="img" aria-label="The StacCraft ecosystem: one platform at the centre connected to web store and eCommerce, reporting and insights, design and kit builder, purchasing and production, teamwear and club stores with the Locker Room, wholesale B2B with the dealer portal, supplier portal, warehousing, accounting and ERP, digital asset management such as HIVO, distribution and delivery, and API integrations.">';
  o+='<defs><marker id="ecoh" viewBox="0 0 12 12" refX="10" refY="6" markerWidth="11" markerHeight="11" orient="auto-start-reverse"><path class="eco-ah" d="M1 1 L10 6 L1 11"/></marker></defs>';
  let k=0;
  const arrow=(a,b)=>{ const dx=b.x-a.x, dy=b.y-a.y, L=Math.hypot(dx,dy), px=-dy/L, py=dx/L, bend=(k++%2?1:-1)*12;
    const cx=(a.x+b.x)/2+px*bend, cy=(a.y+b.y)/2+py*bend; o+='<path class="eco-arrow" d="M'+a.x.toFixed(1)+' '+a.y.toFixed(1)+' Q'+cx.toFixed(1)+' '+cy.toFixed(1)+' '+b.x.toFixed(1)+' '+b.y.toFixed(1)+'" marker-end="url(#ecoh)"/>'; };
  Object.keys(N).forEach(id=>{ const n=N[id]; const t=anchor(n);
    if(n[4]==="c"){ const dx=t.x-C.x, dy=t.y-C.y, ang=Math.atan2(dy,dx), rx=150, ry=62; const st={x:C.x+rx*Math.cos(ang), y:C.y+ry*Math.sin(ang)}; arrow(st,t); }
    else { const P=N[n[4]]; const dir=n[0]<P[0]?-1:1; arrow({x:P[0]+dir*46,y:P[1]},{x:n[0]-dir*46,y:n[1]}); } });
  const logo=(isNordic()&&!S.content.brand.useLogo)?"":S.content.brand.logo;
  o+=logo?'<image href="'+blobUrl(logo)+'" x="'+(C.x-130)+'" y="'+(C.y-34)+'" width="260" height="68" preserveAspectRatio="xMidYMid meet"/>':'<text class="eco-brand" x="'+C.x+'" y="'+(C.y+14)+'" text-anchor="middle">'+esc(S.content.brand.name)+'</text>';
  Object.keys(N).forEach(id=>{ const n=N[id];
    o+='<g transform="translate('+(n[0]-32)+' '+(n[1]-32)+') scale(2.6667)"><g class="eco-ic" fill="none" stroke-linecap="round" stroke-linejoin="round">'+ICON[n[3]]+'</g></g>';
    n[2].forEach((line,i)=>{ o+='<text class="eco-l" x="'+n[0]+'" y="'+(n[1]+58+i*19)+'" text-anchor="middle">'+esc(line)+'</text>'; }); });
  return o+'</svg>';
}


/* Data-sync map: StacCraft on the left, an external system on the right, one labelled arrow per data flow */
function syncSvg(s){
  const rows=s.rows||[]; const W=1100, LX=30, LW=220, RX=W-30-LW, x1=LX+LW+14, x2=RX-14, RH=44, GH=30, GAP=10;
  // group consecutive rows; a row without a group joins the previous one
  const groups=[]; rows.forEach(r=>{ const g=r.group||(groups.length?groups[groups.length-1].name:""); if(!groups.length||groups[groups.length-1].name!==g) groups.push({name:g,rows:[]}); groups[groups.length-1].rows.push(r); });
  let y=20; const layout=groups.map((g,gi)=>{ const top=y; y+=(g.name?GH:6)+g.rows.length*RH+8; const bottom=y; y+=GAP; return {g,gi,top,bottom}; });
  const H=Math.max(y+10,300);
  let o='<svg class="sync" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+esc((s.heading||"Data flows")+": "+rows.map(r=>r.label).join(", "))+'">';
  o+='<defs><marker id="sah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse"><path class="sync-ah" d="M0 0 L10 5 L0 10 z"/></marker></defs>';
  const box=(x,title,sub,items,cls)=>{ o+='<rect class="sync-box '+cls+'" x="'+x+'" y="12" width="'+LW+'" height="'+(H-24)+'" rx="16"/>';
    const blockH=46+(items.length?items.length*30+16:0); let ty=(H-blockH)/2+22;
    o+='<text class="sync-t '+cls+'" x="'+(x+LW/2)+'" y="'+ty+'" text-anchor="middle">'+esc(title)+'</text><text class="sync-s '+cls+'" x="'+(x+LW/2)+'" y="'+(ty+22)+'" text-anchor="middle">'+esc(sub)+'</text>';
    items.forEach((it,k)=>{ const yy=ty+52+k*30; o+='<rect class="sync-chip '+cls+'" x="'+(x+22)+'" y="'+(yy-17)+'" width="'+(LW-44)+'" height="24" rx="12"/><text class="sync-ci '+cls+'" x="'+(x+LW/2)+'" y="'+(yy)+'" text-anchor="middle">'+esc(it)+'</text>'; }); };
  box(LX,"StacCraft",s.usSub||"Stores, portals & admin",s.usItems||[],"us"); box(RX,s.system||"Your ERP",s.systemSub||"",s.systemItems||[],"them");
  layout.forEach(L=>{ o+='<rect class="sync-band g'+(L.gi%3)+'" x="'+x1+'" y="'+L.top+'" width="'+(x2-x1)+'" height="'+(L.bottom-L.top)+'" rx="12"/>';
    if(L.g.name) o+='<text class="sync-gl g'+(L.gi%3)+'" x="'+(x1+16)+'" y="'+(L.top+20)+'">'+esc(L.g.name)+'</text>';
    L.g.rows.forEach((r,k)=>{ const yy=L.top+(L.g.name?GH:6)+k*RH+RH/2; const d=r.dir||"to";
      o+='<line class="sync-line g'+(L.gi%3)+'" x1="'+(x1+8)+'" y1="'+yy+'" x2="'+(x2-8)+'" y2="'+yy+'"'+(d!=="from"?' marker-end="url(#sah)"':'')+(d!=="to"?' marker-start="url(#sah)"':'')+'/>'+
        '<rect class="sync-pill" x="'+(W/2-140)+'" y="'+(yy-14)+'" width="280" height="28" rx="14"/>'+
        '<text class="sync-l" x="'+(W/2)+'" y="'+(yy+5)+'" text-anchor="middle">'+esc(r.label)+'</text>'; }); });
  return o+'</svg>';
}


/* Before/after: the same business today (disconnected tools, re-keyed hand-offs) and on StacCraft (one hub) */
function baSvg(){
  const nodeT=(x,y,ic,label,rot,cls)=>'<g transform="translate('+x+' '+y+') rotate('+(rot||0)+')"><rect class="ba-n '+(cls||'')+'" x="-62" y="-30" width="124" height="60" rx="10"/>'+
    '<g transform="translate(-50 -12) scale(1)"><g class="ba-ic" fill="none" stroke-linecap="round" stroke-linejoin="round">'+ICON[ic]+'</g></g><text class="ba-t" x="-20" y="5">'+esc(label)+'</text></g>';
  let o='<svg class="ba" viewBox="0 0 1100 470" role="img" aria-label="Today: an order moves from the web store to a spreadsheet, an email, a phone call, the supplier and the ERP, copied, chased and typed in again at each step. With StacCraft: the web store, dealer portal, supplier portal, warehouse and ERP all connect to one platform, so nothing is typed in twice.">';
  o+='<defs><marker id="bah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="ba-ah" d="M0 0 L10 5 L0 10 z"/></marker><marker id="bag" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path class="ba-ahg" d="M0 0 L10 5 L0 10 z"/></marker></defs>';
  // panels
  o+='<rect class="ba-p bad" x="10" y="10" width="525" height="450" rx="18"/><rect class="ba-p good" x="565" y="10" width="525" height="450" rx="18"/>';
  o+='<text class="ba-h bad" x="36" y="48">Today</text><text class="ba-sub" x="36" y="70">Six tools, and the order is typed in again at every hand-off</text>';
  o+='<text class="ba-h good" x="591" y="48">With StacCraft</text><text class="ba-sub" x="591" y="70">One platform. Every system connected. Nothing typed twice.</text>';
  // today: messy path
  const T={web:[110,140],sheet:[300,125],mail:[440,215],phone:[285,300],sup:[440,390],erp:[110,380]};
  const bad=(a,b,label,lx,ly)=>{ o+='<path class="ba-e bad" d="M'+a[0]+' '+a[1]+' L'+b[0]+' '+b[1]+'" marker-end="url(#bah)"/><text class="ba-l bad" x="'+lx+'" y="'+ly+'" text-anchor="middle">'+label+'</text>'; };
  bad([172,138],[236,128],"copied",204,118);
  bad([350,152],[405,188],"emailed",408,160);
  bad([395,240],[335,278],"chased",350,244);
  bad([318,328],[395,368],"called",330,366);
  bad([378,392],[176,385],"typed in again",278,410);
  bad([110,172],[110,346],"typed in again",150,262);
  o+=nodeT(T.web[0],T.web[1],"store","Web store",-3)+nodeT(T.sheet[0],T.sheet[1],"sheet","Spreadsheet",4)+nodeT(T.mail[0],T.mail[1],"mail","Email",-5)+
     nodeT(T.phone[0],T.phone[1],"phone","Phone",3)+nodeT(T.sup[0],T.sup[1],"factory","Supplier",-2)+nodeT(T.erp[0],T.erp[1],"calc","ERP",2);
  o+='<text class="ba-foot bad" x="36" y="445">3 re-keys · 3 chases · 0 shared view</text>';
  // with StacCraft: hub
  const C=[827,262]; const G={web:[660,150],deal:[994,150],sup:[660,362],erp:[994,362],wh:[827,388]};
  const good=(b)=>{ const dx=b[0]-C[0], dy=b[1]-C[1], L=Math.hypot(dx,dy); const a=[C[0]+dx/L*70,C[1]+dy/L*34], e=[b[0]-dx/L*66,b[1]-dy/L*32];
    o+='<path class="ba-e good" d="M'+a[0].toFixed(1)+' '+a[1].toFixed(1)+' L'+e[0].toFixed(1)+' '+e[1].toFixed(1)+'" marker-end="url(#bag)" marker-start="url(#bag)"/>'; };
  Object.values(G).forEach(good);
  o+='<rect class="ba-hub" x="'+(C[0]-78)+'" y="'+(C[1]-30)+'" width="156" height="60" rx="30"/><text class="ba-hubt" x="'+C[0]+'" y="'+(C[1]+6)+'" text-anchor="middle">'+esc(S.content.brand.name)+'</text>';
  o+=nodeT(G.web[0],G.web[1],"store","Web store",0,"ok")+nodeT(G.deal[0],G.deal[1],"monitor","Dealers",0,"ok")+nodeT(G.sup[0],G.sup[1],"factory","Suppliers",0,"ok")+
     nodeT(G.erp[0],G.erp[1],"calc",ERP(),0,"ok")+nodeT(G.wh[0],G.wh[1],"warehouse","Warehouse",0,"ok");
  o+='<text class="ba-foot good" x="591" y="445">0 re-keys · every update visible to everyone</text>';
  return o+'</svg>';
}


const CALC_FIELDS=[
  {k:"pos",l:"Purchase orders a month",d:40},
  {k:"poMin",l:"Minutes per PO",h:"Building it from sales, sending it, chasing updates",d:45},
  {k:"inv",l:"Supplier invoices a month",d:40},
  {k:"invMin",l:"Minutes per invoice",h:"Checking it against what actually arrived",d:20},
  {k:"ord",l:"Orders keyed into your ERP by hand, a month",d:200},
  {k:"ordMin",l:"Minutes per order",d:6},
  {k:"rate",l:"Hourly cost of staff time ($)",d:45}];
function calcOut(v){
  const n=k=>Math.max(0,+v[k]||0);
  const hrs=(n("pos")*n("poMin")+n("inv")*n("invMin")+n("ord")*n("ordMin"))/60;
  const cost=hrs*n("rate"); const fmt=x=>Math.round(x).toLocaleString("en-AU");
  return '<div><div class="k">Manual work today</div><div class="v">'+fmt(hrs)+' hrs</div><p>a month, on steps the platform handles for you</p></div>'+
    '<div class="split2"><div><div class="k">Per month</div><div class="v">$'+fmt(cost)+'</div></div><div><div class="k">Per year</div><div class="v">$'+fmt(cost*12)+'</div></div></div>'+
    '<p>Your numbers, your estimate. We\'ll go through them with you and show which steps disappear.</p><a class="btn btn-primary" href="/contact">Talk it through with us'+ARROW+'</a>';
}


/* One platform, many businesses: shared platform layer at the bottom, separate businesses on top */
function tenantsSvg(s){
  const T=(s.businesses&&s.businesses.length?s.businesses:[]); const W=1100, n=Math.max(1,T.length), gap=20, cw=(W-60-gap*(n-1))/n, top=24, ch=232, baseY=340;
  let o='<svg class="ten" viewBox="0 0 '+W+' 540" role="img" aria-label="'+esc("One StacCraft platform running several businesses: "+T.map(t=>t.name).join(", ")+". Each has its own brand, data and rules, on shared platform services.")+'">';
  T.forEach((t,i)=>{ const x=30+i*(cw+gap), cx=x+cw/2, next=!!t.next;
    o+='<line class="ten-link'+(next?' next':'')+'" x1="'+cx+'" y1="'+(top+ch)+'" x2="'+cx+'" y2="'+baseY+'"/>';
    o+='<rect class="ten-card'+(next?' next':'')+'" x="'+x+'" y="'+top+'" width="'+cw+'" height="'+ch+'" rx="16"/>';
    o+='<text class="ten-kind" x="'+(x+18)+'" y="'+(top+30)+'">'+esc(t.kind||"")+'</text>';
    o+='<text class="ten-name" x="'+(x+18)+'" y="'+(top+60)+'">'+esc(t.name||"")+'</text>';
    (t.lines||[]).slice(0,3).forEach((l,k)=>{ o+='<text class="ten-line" x="'+(x+18)+'" y="'+(top+90+k*20)+'">'+esc(l)+'</text>'; });
    const sp=t.sports||[]; let px=x+18, py=top+ch-46;
    sp.forEach(sport=>{ const ic={"Cricket":"cricket","Hockey":"hockey","Australian rules":"footy"}[sport]||"jersey"; const label=sport==="Australian rules"?"Aussie rules":sport; const w=40+label.length*7.2;
      if(px+w>x+cw-14){ px=x+18; py-=36; }
      o+='<g transform="translate('+px.toFixed(1)+' '+py+')"><rect class="ten-chip" x="0" y="0" width="'+w.toFixed(1)+'" height="30" rx="15"/><g transform="translate(9 5) scale(.8333)"><g class="ten-ic" fill="none" stroke-linecap="round" stroke-linejoin="round">'+ICON[ic]+'</g></g><text class="ten-chipt" x="32" y="20">'+esc(label)+'</text></g>'; px+=w+8; }); });
  o+='<rect class="ten-base" x="30" y="'+baseY+'" width="'+(W-60)+'" height="170" rx="20"/>';
  o+='<text class="ten-bt" x="'+(W/2)+'" y="'+(baseY+40)+'" text-anchor="middle">'+esc((S.content.brand.name||"StacCraft")+" platform")+'</text>';
  o+='<text class="ten-bs" x="'+(W/2)+'" y="'+(baseY+62)+'" text-anchor="middle">Shared by every business · each with its own database, branding and rules</text>';
  const svc=s.services||[]; const sw=(W-60-40-(svc.length-1)*12)/Math.max(1,svc.length);
  svc.forEach((v,i)=>{ const x=50+i*(sw+12); o+='<rect class="ten-svc" x="'+x+'" y="'+(baseY+86)+'" width="'+sw+'" height="56" rx="12"/><text class="ten-svct" x="'+(x+sw/2)+'" y="'+(baseY+119)+'" text-anchor="middle">'+esc(v)+'</text>'; });
  return o+'</svg>';
}

const CAT_THEME={
  "Teamwear & clubs":{hue:"#15803d",icon:"jersey",chips:[["Club code","HAWKS-24"],["Locker Room","Sizes saved"]]},
  "Apparel":{hue:"#0f766e",icon:"hanger",chips:[["XS to 3XL","11 sizes"],["4 colourways","132 variants"]]},
  "Supply chain":{hue:"#c2410c",icon:"po",chips:[["Window closed","212 order lines"],["6 POs","Sent to suppliers"]]},
  "Integrations":{hue:"#1d4ed8",icon:"link",chips:[["ERP","Sales order posted"],["Stock","Synced 09:42"]]},
  "Marketing & SEO":{hue:"#7c3aed",icon:"search",chips:[["Product page","Indexed"],["AI search","Cited as a source"]]},
  "Reviews":{hue:"#be123c",icon:"star",chips:[["\u2605\u2605\u2605\u2605\u2605","Verified buyer"],["Moderated","Shown in full"]]}
};
const STORY=[["Teamwear & clubs","Sell"],["Apparel","Range"],["Supply chain","Buy"],["Integrations","Sync"],["Marketing & SEO","Get found"],["Reviews","Earn trust"]];
// Atelier keeps to its muted navy, sand and olive palette.
const CAT_HUE_ATELIER={"Teamwear & clubs":"#4A5840","Apparel":"#3E6766","Supply chain":"#9C6638","Integrations":"#355A7A","Marketing & SEO":"#6A4C66","Reviews":"#8E3F3A"};
// Every topic uses this site's charcoal, so blog art stays on palette.
function catTheme(c){ const t=CAT_THEME[c]||{icon:"chart",chips:[["Insights","New guide"],["Practical","Step by step"]]}; return Object.assign({},t,{hue:"#231F20"}); }
function articleMins(p){ return readMinutes(md((p.sections.find(s=>s.type==="article")||{}).body).words); }
function initials(n){ n=String(n||""); const c=n.match(/[A-Z]/g); return (c&&c.length>1?c.slice(0,2).join(""):n.slice(0,2)).toUpperCase(); }
function storyPages(){ const all=articlePages(); return STORY.map(([c,stage])=>{ const p=all.find(x=>x.article.category===c); return p?{p,stage}:null; }).filter(Boolean); }
function coverArt(cat){
  const t=catTheme(cat); const ch=t.chips;
  const card=(x,y,w,c)=>'<g transform="translate('+x+' '+y+')"><rect class="sc-card" width="'+w+'" height="50" rx="11"/><circle class="sc-dot" cx="16" cy="18" r="4"/><text class="sc-t" x="28" y="22">'+esc(c[0])+'</text><text class="sc-s" x="16" y="38">'+esc(c[1])+'</text></g>';
  return '<svg class="scene" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">'+
    '<circle class="sc-ring" cx="312" cy="58" r="92"/><circle class="sc-ring2" cx="200" cy="120" r="104"/>'+
    '<path class="sc-band" d="M-30 222 C 90 170 250 250 430 168"/><path class="sc-band2" d="M-30 238 C 90 186 250 266 430 184"/>'+
    '<rect class="sc-bar" x="250" y="196" width="10" height="26" rx="3"/><rect class="sc-bar" x="266" y="184" width="10" height="38" rx="3"/><rect class="sc-bar" x="282" y="170" width="10" height="52" rx="3"/>'+
    '<g transform="translate(150 66)"><rect class="sc-tile" width="100" height="100" rx="24"/><g transform="translate(20 20) scale(2.5)"><g class="sc-ic">'+(ICON[t.icon]||ICON.chart)+'</g></g></g>'+
    card(26,34,136,ch[0])+card(250,120,128,ch[1])+'</svg>';
}

export { toPath, md, mdInline, readMinutes, fmtDate, articlePages, articleMins, initials, storyPages, esc, tx, ICON, icon, mock, visual, MOCK_LABEL, flowSvg, FLOWS, ecoSvg, syncSvg, baSvg, tenantsSvg, CALC_FIELDS, CAT_THEME, STORY, catTheme, coverArt };
