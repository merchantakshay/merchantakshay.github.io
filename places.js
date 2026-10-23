const escapePlace=value=>String(value).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
class PlacesChapters extends HTMLElement {
 connectedCallback(){
  if(this.dataset.ready)return;this.dataset.ready='true';
  this.innerHTML='<section class="page places-chapters"><div class="page-intro"><p class="kicker"><span class="section-num">02</span> / Places</p><h2>A life in<br/>six coordinates.</h2><p>Six cities, three continents and plenty of stories along the way.</p></div><div class="places-chapter-picker" role="tablist" aria-label="Chapters by city"></div><div class="places-spread-slot" aria-busy="true"><p class="places-loading">Opening the next chapter…</p></div></section>';
  fetch('/places-data.json').then(r=>{if(!r.ok)throw Error('Places unavailable');return r.json()}).then(items=>{
   if(!this.isConnected)return;
   let selected=items.length-1;
   const picker=this.querySelector('.places-chapter-picker'),slot=this.querySelector('.places-spread-slot');
   picker.innerHTML=items.map((item,i)=>`<button type="button" role="tab" id="place-tab-${item.id}" aria-controls="place-chapter-panel" aria-selected="${i===selected}" tabindex="${i===selected?'0':'-1'}" data-place-index="${i}"><span class="places-tab-top"><span>${String(i+1).padStart(2,'0')}</span><span aria-hidden="true">↗</span></span><img src="/places-art/${item.id}.svg" alt="" width="600" height="360"/><span class="places-tab-name">${escapePlace(item.city)}</span><span class="places-tab-country">${escapePlace(item.country)}</span></button>`).join('');
   const render=()=>{
    const item=items[selected];
    picker.querySelectorAll('[role=tab]').forEach((b,i)=>{b.setAttribute('aria-selected',String(i===selected));b.tabIndex=i===selected?0:-1});
    slot.innerHTML=`<section class="city-spread city-${item.id}" role="tabpanel" id="place-chapter-panel" aria-labelledby="place-tab-${item.id}"><div class="city-visual"><div class="city-visual-inner"><div class="city-postmark"><span>${escapePlace(item.country)}</span><span>${escapePlace(item.years)}</span></div><img class="city-scene" src="/places-art/${item.id}.svg" alt="Illustrated ${escapePlace(item.city)} cityscape" width="600" height="360"/><p class="city-caption">${escapePlace(item.caption)}</p><div class="city-keepsakes">${item.notes.split(' · ').map(note=>`<span>${escapePlace(note)}</span>`).join('')}</div></div></div><div class="city-story"><p class="city-chapter-number">${escapePlace(item.years)} / 06</p><h3>${escapePlace(item.city)}</h3><div class="city-story-paragraphs">${item.paragraphs.map(text=>`<p>${escapePlace(text)}</p>`).join('')}</div></div></section><nav class="city-chapter-controls" aria-label="Move between city chapters"><span>${String(selected+1).padStart(2,'0')} / 06</span><div><button type="button" data-step="-1" ${selected===0?'disabled':''}>← Previous chapter</button><button type="button" data-step="1" ${selected===items.length-1?'disabled':''}>Next chapter →</button></div></nav>`;
    slot.setAttribute('aria-busy','false');
    slot.querySelectorAll('[data-step]').forEach(b=>b.addEventListener('click',()=>{selected=Math.max(0,Math.min(items.length-1,selected+Number(b.dataset.step)));render()}));
   };
   picker.querySelectorAll('[role=tab]').forEach((button,i)=>{
    button.addEventListener('click',()=>{selected=i;render()});
    button.addEventListener('keydown',event=>{let next=i;if(event.key==='ArrowRight')next=(i+1)%items.length;else if(event.key==='ArrowLeft')next=(i-1+items.length)%items.length;else if(event.key==='Home')next=0;else if(event.key==='End')next=items.length-1;else return;event.preventDefault();selected=next;render();picker.querySelectorAll('[role=tab]')[next].focus()});
   });
   render();
  }).catch(()=>{if(!this.isConnected)return;const slot=this.querySelector('.places-spread-slot');slot.setAttribute('aria-busy','false');slot.innerHTML='<p class="places-loading">The chapters couldn’t load. Please refresh to try again.</p>'});
 }
}
customElements.define('places-chapters',PlacesChapters);
