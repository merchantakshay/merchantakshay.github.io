const homeChapters=[
 {page:'work',n:'01',name:'Work',art:'/interest-art/learning.svg',copy:'I work at the intersection of data, technology and business—building useful systems that make complex decisions simpler.'},
 {page:'places',n:'02',name:'Places',art:'/places-art/luxembourg.svg',copy:'Six cities, three continents and plenty of stories along the way.'},
 {page:'interests',n:'03',name:'Interests',art:'/interest-art/adventure.svg',copy:'The things I enjoy learning, playing and getting slightly obsessed with.'},
 {page:'projects',n:'04',name:'Projects',art:'/showcase-art/research.svg',copy:'Ideas I became curious enough about to actually build.'},
 {page:'travel',n:'05',name:'Travel',art:'/home-art/travel.svg',copy:'A few corners of the world that have become a part of mine.'},
 {page:'socials',n:'06',name:'Socials',art:'/showcase-art/email.svg',copy:'A few places to find my work, follow along or say hello.'}
];
class HomeIllustrated extends HTMLElement {
 connectedCallback(){
  if(this.dataset.ready)return;this.dataset.ready='true';
  this.innerHTML=`<section class="page illustrated-home"><div class="frontpage-hero"><div class="frontpage-introduction"><h1>Akshay<br/>Merchant<span>.</span></h1><p class="frontpage-description">I build useful things with data, disappear into investing rabbit holes and regularly convince myself that I need another hobby. This is a collection of my work, projects, interests and stories from the places I’ve called home.</p></div><div class="frontpage-illustration frontpage-portrait"><img src="/akshay-luxembourg.webp" alt="Akshay Merchant in Luxembourg" width="1086" height="1448" fetchpriority="high"/></div></div><div class="frontpage-chapters" aria-label="Explore the website">${homeChapters.map(chapter=>`<button type="button" class="frontpage-chapter frontpage-${chapter.page}" data-home-page="${chapter.page}"><span class="frontpage-chapter-top"><span>${chapter.n}</span><span aria-hidden="true">↗</span></span><span class="frontpage-chapter-art"><img src="${chapter.art}" alt="" loading="lazy"/></span><span class="frontpage-chapter-name">${chapter.name}</span><span class="frontpage-chapter-description">${chapter.copy}</span></button>`).join('')}</div><footer class="frontpage-footer"><span>Luxembourg</span><span>2026</span></footer></section>`;
 }
}
customElements.define('home-illustrated',HomeIllustrated);
