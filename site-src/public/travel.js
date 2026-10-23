const countries=[{"name":"France","region":"Europe","slug":"france","caption":"Café tables and grand boulevards."},{"name":"Germany","region":"Europe","slug":"germany","caption":"Timber frames and city streets."},{"name":"Czech Republic","region":"Europe","slug":"czech-republic","caption":"Spired skylines and cobbled lanes."},{"name":"Italy","region":"Europe","slug":"italy","caption":"Ancient arches and espresso pauses."},{"name":"Spain","region":"Europe","slug":"spain","caption":"Sunlit squares and late evenings."},{"name":"Portugal","region":"Europe","slug":"portugal","caption":"Blue tiles and Atlantic light."},{"name":"United Kingdom","region":"Europe","slug":"united-kingdom","caption":"Red buses and centuries of stories."},{"name":"Luxembourg","region":"Europe","slug":"luxembourg","caption":"Old fortifications and green valleys."},{"name":"Belgium","region":"Europe","slug":"belgium","caption":"Gabled squares and chocolate shops."},{"name":"Netherlands","region":"Europe","slug":"netherlands","caption":"Canal houses and bicycle bells."},{"name":"Mauritius","region":"Africa","slug":"mauritius","caption":"Lagoon blues and swaying palms."},{"name":"Seychelles","region":"Africa","slug":"seychelles","caption":"Granite shores and Indian Ocean light."},{"name":"India","region":"Asia","slug":"india","caption":"Family ties and a world of colour."},{"name":"Singapore","region":"Asia","slug":"singapore","caption":"Garden canopies and a city in bloom."},{"name":"United Arab Emirates","region":"Asia","slug":"united-arab-emirates","caption":"Desert sands and soaring skylines."},{"name":"United States","region":"North America","slug":"united-states","caption":"Big skylines and wide-open horizons."}];
class TravelAtlas extends HTMLElement {
 connectedCallback(){
  if(this.dataset.ready)return;this.dataset.ready='true';
  const regions=['All','Europe','Africa','Asia','North America'];
  this.innerHTML=`<section class="page travel-page"><div class="page-intro"><p class="kicker"><span class="section-num">05</span> / Travel</p><h2>A little more<br/>of the world.</h2><p>A few corners of the world that have become a part of mine.</p></div><div class="travel-map-frame"><div class="travel-map-meta"><span class="travel-eyebrow">THE JOURNEY SO FAR</span><span class="travel-legend"><i></i> Visited countries</span></div><div class="travel-flat-map" aria-busy="true"><p class="travel-loading">Loading the atlas…</p></div><div class="travel-map-footer"><span>16 COUNTRIES · 4 REGIONS</span><span class="travel-selected" aria-live="polite">16 places, countless perspectives.</span></div></div><div class="travel-index"><div class="travel-index-heading"><p class="kicker">The collection</p><span>Across borders,<br/><em>one place at a time.</em></span></div><div class="travel-collection"><div class="travel-region-filters" role="group" aria-label="Filter countries by region">${regions.map(region=>`<button type="button" data-region="${region}" aria-pressed="${region==='All'}">${region}<span>${region==='All'?countries.length:countries.filter(c=>c.region===region).length}</span></button>`).join('')}</div><div class="travel-country-gallery" aria-label="Country illustrations">${countries.map(c=>`<article class="travel-country-card" data-in-region="${c.region}"><div class="travel-badge-art"><img src="/travel-badges/${c.slug}.svg" alt="" loading="lazy" width="240" height="190"/></div><h3>${c.name}</h3><p>${c.caption}</p></article>`).join('')}</div></div></div></section>`;
  const setCountry=name=>{
    this.querySelectorAll('[data-country]').forEach(p=>p.classList.toggle('is-selected',p.dataset.country===name));
    this.querySelector('.travel-selected').textContent=name||'16 places, countless perspectives.';
  };
  this.querySelectorAll('[data-region]').forEach(button=>button.addEventListener('click',()=>{
    const region=button.dataset.region;
    this.querySelectorAll('[data-region]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
    this.querySelectorAll('.travel-country-card').forEach(card=>card.hidden=region!=='All'&&card.dataset.inRegion!==region);
  }));
  fetch('/travel-map-postcard.svg?v=atlas-uae-4').then(r=>{if(!r.ok)throw Error('Atlas unavailable');return r.text()}).then(svg=>{
    if(!this.isConnected)return;
    const holder=this.querySelector('.travel-flat-map');holder.innerHTML=svg;holder.setAttribute('aria-busy','false');
    holder.querySelectorAll('[data-country]').forEach(p=>p.addEventListener('click',()=>setCountry(p.dataset.country)));
  }).catch(()=>{
    if(!this.isConnected)return;const h=this.querySelector('.travel-flat-map');h.setAttribute('aria-busy','false');h.innerHTML='<p class="travel-loading">The map could not load. Explore the countries below.</p>';
  });
 }
}
customElements.define('travel-atlas',TravelAtlas);
