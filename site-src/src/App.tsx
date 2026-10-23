"use client";
import { createElement, useState } from "react";

type Page = "home" | "work" | "places" | "travel" | "interests" | "projects" | "socials";
const pages: Page[] = ["home", "work", "places", "interests", "projects", "travel", "socials"];
const socialLinks = [
  { name:"LinkedIn", icon:"linkedin", note:"Work, writing & professional updates", href:"https://linkedin.com/in/akshaymerchant" },
  { name:"GitHub", icon:"github", note:"Code, projects & experiments", href:"https://github.com/merchantakshay" },
  { name:"Download CV", icon:"document", note:"Experience, education & expertise", href:"https://github.com/merchantakshay/merchantakshay.github.io/blob/main/AkshayMerchantResume(DE_2).pdf" },
  { name:"Instagram", icon:"instagram", note:"Life outside the résumé", href:"https://www.instagram.com/akshaymerchant/" },
];
const cityMarks: Record<string,string> = {mumbai:"☀",chicago:"≋",newyork:"▥",dc:"★",seattle:"▲",luxembourg:"♜"};
const experienceHighlights = [
  { n:"01", title:"Build", copy:"Designed cloud data platforms, automated pipelines and delivery-health systems across Engineering Services and Alexa.", impact:"$120K saved · 10K+ hours returned" },
  { n:"02", title:"Scale", copy:"Turned analytics and data quality into shared capabilities used across global, cross-functional teams.", impact:"3× adoption · 99% fewer defects" },
  { n:"03", title:"Lead", copy:"Shaped roadmaps, architecture decisions and technical standards while partnering directly with senior leaders.", impact:"20+ teams · 75+ interviews" },
];
const places = [
  { id:"mumbai", city:"Mumbai", years:"Chapter 01", x:67, y:61, blurb:"I grew up in Bandra, often called the “Queen of the Suburbs.” It is a neighbourhood where heritage and modern life sit comfortably side by side—from Portuguese-era churches and colonial bungalows to lively streets and seafront promenades overlooking the Arabian Sea. Much of my childhood was spent playing sports. I learned swimming, skating and table tennis, played countless games of football and cricket with friends, and represented my school in cricket. When I wasn’t playing, I was usually reading. I loved visiting bookstores and rarely missed an opportunity to pick up a new book. Bandra gave me a childhood filled with curiosity, competition and community—and it remains the place that feels most like home." },
  { id:"chicago", city:"Chicago", years:"Chapter 02", x:24, y:35, blurb:"Chicago, often called the “Windy City,” was where I moved for graduate school—and where I quickly discovered that the name was very well earned. Between classes, I made new friends and explored the city one neighbourhood at a time. I loved walking along the Magnificent Mile, wondering when I would finally be able to afford a proper shopping spree, cycling by Navy Pier, going on Costco runs with friends and eating more deep-dish pizza than was probably necessary. There were fun moments, strange moments and a few slightly scary ones, but never a shortage of stories. I arrived knowing very few people and left with great friends, plenty of memories and a degree earned somewhere between classes, deep-dish pizza and Costco runs." },
  { id:"newyork", city:"New York", years:"Chapter 03", x:30.5, y:39, blurb:"New York, famously known as the “City That Never Sleeps,” was where I moved while job hunting, convinced that finding a job there would be easier if I actually lived there. I spent just two months in the city—or, more specifically, in Bay Ridge—but they remain some of my favourite months. I loved walking along the pier at night with the Manhattan skyline in the distance, taking the ferry, cycling through Central Park and, like every proper tourist, petting the Charging Bull on Wall Street. I also made it my mission to find the perfect New York slice, with Artichoke becoming the clear favourite. It was a short stay, but one packed with memorable views, excellent pizza and plenty of reasons to keep exploring." },
  { id:"dc", city:"Washington DC", years:"Chapter 04", x:29, y:43, blurb:"Washington, DC—best known as the nation’s capital—has always been my favourite city, although I have never been able to pinpoint exactly why. Maybe it was the allure of the capital, the excitement of starting my first job or simply how much of the city I managed to explore. I played football and kickball on the National Mall, made some great friends and then became even better friends over drinks afterwards. DC was also where I first discovered Lime scooters, and riding through the streets while taking in the monuments and views remains one of my favourite ways to experience a city. I loved visiting Georgetown for its streets, its famous cupcakes and, of course, a trip down the Exorcist Steps. I spent plenty of time exploring the museums too, with the International Spy Museum easily taking first place. I took visiting friends there whenever I could—and I still have a few trinkets from the gift shop to prove it." },
  { id:"seattle", city:"Seattle", years:"Chapter 05", x:15, y:32, blurb:"Seattle, famously known as the “Emerald City,” became home just before COVID arrived—which was not exactly ideal timing for exploring a new place. Still, I managed to collect plenty of good memories. I joined my first sports club, learned to play squash and went running along the Seattle waterfront. I bought my first phone entirely with my own savings, which felt like a major milestone at the time. When COVID cancelled every flight back, my mom found herself unexpectedly stuck with me, so we made the best of it with regular Indian-food runs around the city. I also took a seaplane ride, tried glassblowing and went on some of the most beautiful hikes I had ever seen. Seattle may have begun with unfortunate timing, but between the mountains, water, new hobbies and an unexpectedly extended visit from my mom, it became a chapter with no shortage of memorable moments." },
  { id:"luxembourg", city:"Luxembourg", years:"Chapter 06", x:50, y:35, blurb:"Luxembourg, one of Europe’s smallest countries, was where I moved to experience life on the continent—and it has turned into a much bigger adventure than I expected. The beginning was challenging but certainly eventful: registering at the commune, finding an apartment and navigating a new country in a language I did not yet speak. Once the paperwork settled, the fun really began. Over the years, I have made new friends, travelled widely across Europe and become fitter than ever, all while enjoying Luxembourg’s wonderfully varied calendar. There have been evenings at the Schueberfouer, cheering at the Duck Race, free concerts during Duke's Day celebrations and plenty of Christmas markets. I have explored lakes, castles and picturesque towns—often without paying a cent to get there, thanks to the country’s free public transport. Luxembourg may be small, but it has given me an impressively long list of places to visit, traditions to enjoy and stories to tell." },
];
const capabilities = [
  { n:"01", over:"Build", title:"Data systems", copy:"Python · SQL · Airflow · ETL / ELT · Data modeling · Automation" },
  { n:"02", over:"Operate", title:"Cloud platforms", copy:"AWS · S3 · RDS · Redshift · DMS · CloudWatch · CI/CD" },
  { n:"03", over:"Understand", title:"Analytics", copy:"Power BI · Tableau · QuickSight · Metabase · Reporting" },
  { n:"04", over:"Trust", title:"Quality & governance", copy:"Validation · Observability · Ownership · SLA monitoring" },
  { n:"05", over:"Shape", title:"Data strategy", copy:"Architecture · Roadmaps · Readiness · Platform adoption" },
  { n:"06", over:"Lead", title:"Technical leadership", copy:"Discovery · Stakeholders · Standards · Training" },
];
const Arrow = () => <span aria-hidden="true">↗</span>;
const KpiIcon = ({name}:{name:"people"|"savings"|"time"|"quality"}) => {
  if(name==="people") return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3.5 19c.3-3.5 2.2-5 5.5-5s5.2 1.5 5.5 5M16 6.5a2.5 2.5 0 0 1 0 5M17 14c2.2.4 3.3 2 3.5 4.5"/></svg>;
  if(name==="savings") return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5c-.7-.7-1.8-1-3-1-1.7 0-3 .8-3 2s1 1.8 3 2.3 3 1 3 2.3-1.2 2.2-3.2 2.2c-1.2 0-2.4-.4-3.2-1.2M12 5.5v13"/></svg>;
  if(name==="time") return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3.5 2"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3 19 6v5.5c0 4.2-2.7 7.5-7 9.5-4.3-2-7-5.3-7-9.5V6z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></svg>;
};
const SocialIcon = ({name}:{name:string}) => {
  if(name==="email") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1"/><path d="m4 7 8 6 8-6"/></svg>;
  if(name==="linkedin") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M8 10v7M8 7.5v.01M12 17v-7m0 3c.6-2 4-2.2 4 1v3"/></svg>;
  if(name==="github") return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 21v-4a4 4 0 0 0-1-3c3 0 6-1.5 6-6a5 5 0 0 0-1.5-3.5A5 5 0 0 0 18.4 1S17.2.6 15 2.5a13 13 0 0 0-6 0C6.8.6 5.6 1 5.6 1a5 5 0 0 0-.1 3.5A5 5 0 0 0 4 8c0 4.5 3 6 6 6a4 4 0 0 0-1 3v4M9 18c-3 .9-3-1.5-4-2"/></svg>;
  if(name==="instagram") return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".7" className="icon-fill"/></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h8l4 4v16H6zM14 2v5h5M9 12h6M9 16h6"/></svg>;
};

export default function Home() {
  const [page,setPage] = useState<Page>("home");
  const [place,setPlace] = useState("luxembourg");
  const goTo = (next:Page) => { setPage(next); window.scrollTo({top:0,behavior:"auto"}); };
  const selected = places.find(p=>p.id===place)!;
  return <main className="site editorial-v2">
    <div className="canvas">
      <header className="topbar"><button className="monogram" onClick={()=>goTo("home")}>AM<span>.</span></button><nav>{pages.map(p=><button key={p} className={page===p?"active":""} onClick={()=>goTo(p)}>{p}</button>)}</nav><a className="say-hello" href="mailto:merchantakshay94@gmail.com">Say hello <Arrow/></a></header>
      {page==="home"&&createElement("div",{onClick:(event:React.MouseEvent<HTMLDivElement>)=>{const target=event.target instanceof Element?event.target.closest<HTMLElement>("[data-home-page]"):null;const next=target?.dataset.homePage as Page;if(pages.includes(next))goTo(next)}},createElement("home-illustrated"))}
      {page==="work"&&createElement("work-editorial")}
      {page==="places"&&createElement("places-chapters")}
      {page==="interests"&&createElement("interest-cabinet")}
      {page==="projects"&&createElement("projects-studio")}
      {page==="travel"&&createElement("travel-atlas")}
      {page==="socials"&&createElement("social-stationery")}
    </div>
  </main>;
}
function Intro({num,name,title,copy}:{num:string,name:string,title:React.ReactNode,copy?:string}){return <div className="page-intro"><p className="kicker"><span className="section-num">{num}</span> / {name}</p><h2>{title}</h2>{copy&&<p>{copy}</p>}</div>}
function Interest({big,over,title,copy,n}:{big?:boolean,over:string,title:string,copy:string|string[],n:string}){return <article className={`${big?"interest-feature ":""}${Array.isArray(copy)?"interest-copy-long":""}`}><span>{over}</span><h3>{title}</h3>{Array.isArray(copy)?copy.map((paragraph,index)=><p key={index}>{paragraph}</p>):<p>{copy}</p>}<b>{n}</b></article>}
function ProjectStackIcon(){return <svg viewBox="0 0 80 80" fill="none"><path d="M40 10 69 25 40 40 11 25 40 10Z"/><path d="m16 37 24 13 24-13"/><path d="m16 50 24 13 24-13"/></svg>}
