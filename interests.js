const escapeInterest=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
class InterestCabinet extends HTMLElement {
 connectedCallback(){
  if(this.dataset.ready)return;this.dataset.ready='true';
  this.innerHTML='<section class="page interests-cabinet"><div class="page-intro"><p class="kicker"><span class="section-num">03</span> / Interests</p><h2>Things that keep<br/>me curious.</h2><p>The things I enjoy learning, playing and getting slightly obsessed with.</p></div><div class="curiosity-grid" aria-busy="true"><p class="cabinet-loading">Opening the curiosity cabinet…</p></div></section>';
  fetch('/interests-data.json').then(r=>{if(!r.ok)throw Error('Interests unavailable');return r.json()}).then(items=>{
   if(!this.isConnected)return;
   const grid=this.querySelector('.curiosity-grid');
   grid.innerHTML=items.map(item=>`<article class="curiosity-card curiosity-${item.slug}" id="interest-${item.slug}"><header class="curiosity-card-header"><span>${escapeInterest(item.over)}</span><span class="curiosity-number">${item.n}</span></header><div class="curiosity-scene"><img src="/interest-art/${item.slug}.svg?v=editorial-20261024" alt="" width="410" height="240" loading="lazy"/></div><div class="curiosity-copy"><h3>${escapeInterest(item.heading||item.title)}</h3><p class="curiosity-lead">${escapeInterest(item.lead)}</p><details class="curiosity-story"><summary><span>The longer story</span><b aria-hidden="true">+</b></summary><div class="curiosity-paragraphs">${item.copy.map(text=>`<p>${escapeInterest(text)}</p>`).join('')}</div></details></div></article>`).join('');
   grid.setAttribute('aria-busy','false');
  }).catch(()=>{if(!this.isConnected)return;const grid=this.querySelector('.curiosity-grid');grid.setAttribute('aria-busy','false');grid.innerHTML='<p class="cabinet-loading">The stories couldn’t load. Please refresh to try again.</p>'});
 }
}
customElements.define('interest-cabinet',InterestCabinet);
