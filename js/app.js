(function(){
const D=window.GUIA,$=s=>document.querySelector(s),main=$('#main'),nav=$('#nav'),q=$('#q'),menu=$('#menu');
const COR={1:'#D7263D',2:'#F2A900',3:'#2F6BFF',4:'#7B4BD8',5:'#1B998B',6:'#E56B9A',7:'#6CBF3F',8:'#FF7A1A',9:'#4A6670'};
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nz=s=>s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'');
const on=h=>{const n=parseInt(h.slice(1),16);return .299*(n>>16)+.587*(n>>8&255)+.114*(n&255)>150?'#181A20':'#fff'};
const nivel=s=>{const m=/(\d)\/5/.exec(s||'');return m?+m[1]:0};
const meter=(n,c)=>`<span class="meter" role="img" aria-label="Dificuldade ${n} de 5">${[1,2,3,4,5].map(i=>`<i style="${i<=n?'background:'+c:''}"></i>`).join('')}</span>`;
const lista=(t,a,cls='')=>a.length?`<section class="blk ${cls}"><h2>${t}</h2><ul>${a.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></section>`:'';
const todos=D.flatMap(c=>c.itens.map(s=>({c,s})));

nav.innerHTML=`<ul>${D.map(c=>`<li><a class="nc" href="#/c/${c.slug}"><i style="background:${COR[c.id]}"></i>${esc(c.nome)}</a><ul>${c.itens.map(s=>`<li><a class="ni" href="#/s/${s.slug}">${esc(s.nome)}</a></li>`).join('')}</ul></li>`).join('')}</ul>`;

function home(){return `<div class="wrap"><h1>Guia de softwares de design</h1><p class="lede">Funções, vantagens, limitações, preços e um primeiro tutorial sugerido para cada ferramenta. Escolha uma área para começar.</p><div class="chips">${D.map(c=>`<a class="chip" href="#/c/${c.slug}"><span class="ct" style="background:${COR[c.id]};color:${on(COR[c.id])}">${esc(c.nome)}</span><span class="cb">${esc(c.itens.map(i=>i.nome).join(', '))}</span></a>`).join('')}</div></div>`}

function row(c,s){const k=COR[c.id];return `<a class="row" href="#/s/${s.slug}" style="--k:${k}"><span class="rt"><b>${esc(s.nome)}</b>${s.selo?`<span class="tag">${esc(s.selo)}</span>`:''}${s.ano?`<span class="yr">Lançado em ${esc(s.ano)}</span>`:''}</span><span class="rs">${esc(s.resumo||s.extra.uso||'')}</span>${s.extra.dificuldade?meter(nivel(s.extra.dificuldade),k):''}</a>`}

function cat(c){return `<div class="wrap" style="--k:${COR[c.id]}"><p class="crumb"><a href="#/">Início</a></p><h1 class="k">${esc(c.nome)}</h1><p class="lede">${esc(c.intro)}</p><div class="rows">${c.itens.map(s=>row(c,s)).join('')}</div></div>`}

function det(c,s){const k=COR[c.id],e=s.extra,i=c.itens.indexOf(s),p=c.itens[i-1],n=c.itens[i+1];
const f=[['Dificuldade',e.dificuldade?meter(nivel(e.dificuldade),k)+esc(e.dificuldade):''],['Preço',esc(e.preco||'')],['Indicado para',esc(e.indicado||'')],['Melhor uso',esc(e.uso||'')],['Alternativa',esc(e.alternativa||'')]].filter(x=>x[1]);
return `<article class="wrap det" style="--k:${k};--on:${on(k)}"><p class="crumb"><a href="#/">Início</a> / <a href="#/c/${c.slug}">${esc(c.nome)}</a></p><h1>${esc(s.nome)}</h1><p class="meta">${s.selo?`<span class="tag">${esc(s.selo)}</span>`:''}${s.ano?`Lançado em ${esc(s.ano)}`:''}</p><p class="lede">${esc(s.resumo)}</p><dl class="facts">${f.map(x=>`<dt>${x[0]}</dt><dd>${x[1]}</dd>`).join('')}</dl>${lista('Principais funções',s.funcoes)}<div class="two">${lista('Vantagens',s.vantagens,'pro')}${lista('Desvantagens',s.desvantagens,'con')}</div>${e.limitacoes?`<section class="blk"><h2>Limitações</h2><p>${esc(e.limitacoes)}</p></section>`:''}${e.tutorial?`<aside class="tut"><h2>Primeiro tutorial sugerido</h2><p>${esc(e.tutorial)}</p></aside>`:''}<nav class="pn" aria-label="Outros softwares da área">${p?`<a href="#/s/${p.slug}">Anterior: ${esc(p.nome)}</a>`:'<span></span>'}${n?`<a href="#/s/${n.slug}">Próximo: ${esc(n.nome)}</a>`:''}</nav></article>`}

function busca(t){const x=nz(t),r=todos.filter(({c,s})=>nz([s.nome,c.nome,s.resumo,s.funcoes.join(' '),s.vantagens.join(' '),s.extra.indicado||''].join(' ')).includes(x));
return `<div class="wrap"><h1>Resultados para “${esc(t)}”</h1>${r.length?`<div class="rows">${r.map(o=>row(o.c,o.s)).join('')}</div>`:'<p class="lede">Nada encontrado. Tente o nome de um software, uma área ou uma função, como “vetorial” ou “render”.</p>'}</div>`}

function render(reset){
  const [,t,id]=(location.hash.slice(1)||'/').split('/'),term=q.value.trim();
  let out,title='Guia de softwares de design';
  const c=t==='c'&&D.find(x=>x.slug===id),o=t==='s'&&todos.find(x=>x.s.slug===id);
  if(term){out=busca(term)}
  else if(c){out=cat(c);title=c.nome}
  else if(o){out=det(o.c,o.s);title=o.s.nome}
  else out=home();
  main.innerHTML=out;
  document.title=title===('Guia de softwares de design')?title:title+' · Guia de softwares';
  nav.querySelectorAll('a').forEach(a=>a.getAttribute('href')==='#'+(location.hash.slice(1)||'/')?a.setAttribute('aria-current','page'):a.removeAttribute('aria-current'));
  if(reset){window.scrollTo(0,0);main.focus({preventScroll:true})}
}
function fechar(){document.body.classList.remove('open');menu.setAttribute('aria-expanded','false')}
addEventListener('hashchange',()=>{q.value='';fechar();render(true)});
q.addEventListener('input',()=>render(false));
menu.addEventListener('click',()=>{const a=document.body.classList.toggle('open');menu.setAttribute('aria-expanded',a)});
addEventListener('keydown',e=>{if(e.key==='Escape')fechar()});
render(false);
})();
