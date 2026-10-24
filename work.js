class WorkEditorial extends HTMLElement {
 connectedCallback(){
  if(this.dataset.ready)return;this.dataset.ready='true';
  this.innerHTML='<section class="page work-editorial"><p class="work-loading">Loading professional profile…</p></section>';
  fetch('/work-data.json').then(r=>{if(!r.ok)throw Error('Profile unavailable');return r.json()}).then(({experienceHighlights,capabilities})=>{
   if(!this.isConnected)return;
const intro='I work at the intersection of data, technology and business—building useful systems that make complex decisions simpler.';
const stats=[['75+','interviews conducted'],['$10.3M','annual savings delivered'],['11.5K+','annual hours repurposed'],['99%','data quality improvement']];
const metrics=()=>`<div class="metrics">${stats.map(([value,label])=>`<div><strong>${value}</strong><span>${label}</span></div>`).join('')}</div>`;
const header=(showLinks=false)=>`<header class="profile-heading"><p class="eyebrow kicker"><span class="section-num">01</span> / Professional profile</p><h1>Data. Insights.<br><em>Impact.</em></h1><p class="intro">${intro}</p></header>`;
const company=(amazon=true)=>`<div class="company-title"><div class="work-company-identity"><img class="work-company-logo" src="${amazon?'/logo-amazon.png':'/logo-pwc.png'}" alt="${amazon?'Amazon':'PwC'}" width="96" height="64"><div><span class="date">${amazon?'2019—Present':'2018—2019'}</span><h3>${amazon?'Amazon':'PricewaterhouseCoopers'}</h3></div></div><div class="role">${amazon?'Business Intelligence Engineer 2':'Experienced Associate'}<span>${amazon?'USA · Luxembourg':'Risk & Compliance · USA'}</span></div></div>`;
const highlights=()=>`<div class="highlights">${experienceHighlights.map(x=>`<article><span class="index">${x.n}</span><h4>${x.title}</h4><p>${x.copy}</p><strong>${x.impact}</strong></article>`).join('')}</div>`;
const pwc=()=>`<div class="highlights pwc-highlights"><article><span class="index">04</span><h4>Protect</h4><p class="pwc-copy">Built a transaction-monitoring framework that translated complex risk patterns into clear compliance decisions.</p><strong>$10M annual exposure reduction</strong></article></div>`;
const education=()=>`<section class="work-academics section" aria-labelledby="work-education-title"><h2 id="work-education-title">Education</h2><div class="academic-grid">${[['2026—Present','AI Leadership','London School of Economics','UK','lse-uniform'],['2016—2018','MS Business Analytics','University of Illinois Chicago','USA','uic-uniform'],['2012—2016','BE Information Technology','University of Mumbai','India','mumbai-uniform']].map(([date,title,school,place,logo])=>`<article class="academic-entry"><div class="academic-top"><img class="work-education-logo" src="/logo-${logo}.png" alt="${school}" width="96" height="64" loading="lazy"><span class="academic-date">${date}</span></div><div class="academic-program"><h3>${title}</h3><p class="academic-school">${school}</p></div><span class="academic-country">${place}</span></article>`).join('')}</div></section>`;
const expertise=()=>`<section class="expertise section"><h2>Expertise</h2><div class="expertise-list">${capabilities.map(x=>`<article><span class="index">${x.n}</span><div><h3>${x.title}</h3><p>${x.copy}</p></div></article>`).join('')}</div></section>`;
const experience=()=>`<section class="experience section"><h2>Experience</h2><article class="employer">${company()}${highlights()}</article><article class="employer secondary">${company(false)}${pwc()}</article></section>`;

   this.innerHTML=`<section class="page work-editorial"><div class="design editorial">${header()}${metrics()}${experience()}${education()}${expertise()}</div></section>`;
  }).catch(()=>{if(this.isConnected)this.innerHTML='<section class="page work-editorial"><p>Could not load the profile. Please refresh to try again.</p></section>'});
 }
}
customElements.define('work-editorial',WorkEditorial);
