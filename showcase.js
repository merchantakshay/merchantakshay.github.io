const showcaseArrow='<span class="showcase-arrow" aria-hidden="true">↗</span>';
const researchThemes=[
 ['AI infrastructure','<rect x="7" y="7" width="18" height="18" rx="3"/><path d="M11 2v5m10-5v5M11 25v5m10-5v5M2 11h5m-5 10h5m18-10h5m-5 10h5"/>'],
 ['Digital payments','<rect x="3" y="7" width="26" height="19" rx="3"/><path d="M3 13h26M8 21h7"/>'],
 ['Clean energy','<path d="M16 14v16M16 14 12 3h6l-2 11 12 4-3 5-9-9-9 10-4-5 13-5Z"/>'],
 ['Cybersecurity','<path d="M16 3 27 8v9c-1 6-6 10-11 13C11 27 6 23 5 17V8Z"/><path d="m11 16 4 4 7-9"/>'],
 ['Robotics','<rect x="5" y="9" width="22" height="17" rx="4"/><path d="M16 9V3M1 14v8m30-8v8m-20 0h10"/><circle cx="11" cy="15" r="1"/><circle cx="21" cy="15" r="1"/>'],
 ['Space','<path d="M10 23C5 14 9 5 16 2c7 3 11 12 6 21ZM9 17l-6 7h8m12-7 6 7h-8M13 26l3 5 3-5"/><circle cx="16" cy="12" r="3"/>']
];
const showcaseIntro=(n,name,title,copy)=>`<div class="page-intro"><p class="kicker"><span class="section-num">${n}</span> / ${name}</p><h2>${title}</h2><p>${copy}</p></div>`;
class ProjectsStudio extends HTMLElement {
 connectedCallback(){
  if(this.dataset.ready)return;this.dataset.ready='true';
  this.innerHTML=`<section class="page projects-studio">${showcaseIntro('04','Projects','Ideas, built<br/>out.','Things I became curious enough about to turn into something real.')}<article class="research-feature"><div class="research-art-panel"><div class="research-art-heading"><span>Investment research</span><span>01</span></div><img src="/showcase-art/research.svg" alt="" width="600" height="360"/><div class="research-paper-label">Thesis Stack / An ongoing curiosity</div></div><div class="research-feature-copy"><p class="showcase-kicker">Featured project</p><h3>Thesis<br/><em>Stack.</em></h3><p class="research-description">Thesis Stack is where my investing rabbit holes become structured research. It follows six ideas I keep returning to—from the infrastructure behind AI and the future of payments to clean energy, cybersecurity, robotics and space—and asks which companies may be best placed to benefit.</p><a class="showcase-primary-link" href="https://merchantakshay.github.io/thesis-stack/" target="_blank" rel="noopener noreferrer">See what I found ${showcaseArrow}</a></div></article><div class="research-themes" aria-label="Six research themes">${researchThemes.map(([name,icon],i)=>`<div class="research-theme"><span class="research-theme-number">${String(i+1).padStart(2,'0')}</span><svg viewBox="0 0 32 32" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round">${icon}</svg><h4>${name}</h4></div>`).join('')}</div></section>`;
 }
}
const connectionCards=[
 {name:'LinkedIn',art:'linkedin',note:'Work, writing & professional updates',href:'https://linkedin.com/in/akshaymerchant'},
 {name:'GitHub',art:'github',note:'Code, projects & experiments',href:'https://github.com/merchantakshay'},
 {name:'Download CV',art:'cv',note:'Experience, education & expertise',href:'https://github.com/merchantakshay/merchantakshay.github.io/blob/main/AkshayMerchantResume(DE_2).pdf'},
 {name:'Instagram',art:'instagram',note:'Life outside the résumé',href:'https://www.instagram.com/akshaymerchant/'}
];
class SocialStationery extends HTMLElement {
 connectedCallback(){
  if(this.dataset.ready)return;this.dataset.ready='true';
  this.innerHTML=`<section class="page socials-stationery">${showcaseIntro('06','Socials','Find me<br/>elsewhere.','A few places to find my work, follow along or say hello.')}<div class="connections-layout"><article class="email-postcard"><div class="email-postcard-heading"><span>Say hello</span><svg viewBox="0 0 40 40" aria-hidden="true" fill="none" stroke="currentColor" stroke-width=".8"><circle cx="20" cy="20" r="17" stroke-dasharray="1 3"/><path d="M10 14h20v14H10Zm0 0 10 9 10-9"/></svg></div><img src="/showcase-art/email.svg" alt="" width="600" height="360"/><div class="email-postcard-copy"><h3>The internet is better with good conversations.</h3><a class="showcase-primary-link" href="mailto:merchantakshay94@gmail.com">Email me ${showcaseArrow}</a></div></article><div class="illustrated-connections">${connectionCards.map((card,i)=>`<a class="connection-card connection-${card.art}" href="${card.href}" target="_blank" rel="noopener noreferrer"><div class="connection-card-top"><span>${String(i+1).padStart(2,'0')}</span>${showcaseArrow}</div><img src="/showcase-art/${card.art}.svg" alt="" width="600" height="360" loading="lazy"/><h3>${card.name}</h3><p>${card.note}</p></a>`).join('')}</div></div></section>`;
 }
}
customElements.define('projects-studio',ProjectsStudio);
customElements.define('social-stationery',SocialStationery);
