import React, {useEffect, useRef, useState} from 'react';
import {Routes, Route, Link, NavLink, useLocation, useParams} from 'react-router-dom';
import {motion} from 'framer-motion';
import { useGsapReveals } from './hooks/useGsapReveals';
import {ArrowRight, ArrowUpRight, Menu, X, Phone, Mail, MapPin, Building2, Zap, Mountain, ShieldCheck, CheckCircle2, Clock3, Layers3, Send, ChevronRight, MoveUp, Cable, Camera, HardHat, Home as HomeIcon, Factory, HeartPulse, Landmark, Wrench, Sparkles} from 'lucide-react';
import brandLogo from './assets/bhliss-logo.png';
import anchorLogo from './assets/anchor-3g-logo-enhanced.png';
import liftsImage from './assets/lifts-category.jpg';
import electricalImage from './assets/electrical-category.jpg';
import aggregatesImage from './assets/aggregates-category.jpg';
import {company} from './config';


const sectors = [
 {path:'/lifts',id:'01',title:'Lifts',tag:'ANCHOR 3G',desc:'Smart lift solutions for buildings of every scale — from private residences to busy commercial and industrial environments.',img:liftsImage,icon:Building2},
 {path:'/electrical',id:'02',title:'Electrical Solutions',tag:'POWER & SYSTEMS',desc:'Electrical works for residential, commercial and industrial spaces, with a focus on safety, planning and dependable delivery.',img:electricalImage,icon:Zap},
 {path:'/aggregates',id:'03',title:'Construction Aggregates',tag:'MATERIAL SUPPLY',desc:'Essential construction materials for concrete, infrastructure and building projects, supplied to match project requirements.',img:aggregatesImage,icon:Mountain}
];
const galleryImages=[];
const detailGalleryImages={
 lifts: import.meta.glob('../images/lifts/*.{jpg,jpeg,png,webp}',{eager:true,query:'?url',import:'default'}),
 electrical: import.meta.glob('../images/electrical/*.{jpg,jpeg,png,webp}',{eager:true,query:'?url',import:'default'}),
 aggregates: import.meta.glob('../images/aggregates/*.{jpg,jpeg,png,webp}',{eager:true,query:'?url',import:'default'})
};
const categoryGalleryImages={
 lifts: import.meta.glob('../images/lifts/*/*.{jpg,jpeg,png,webp}',{eager:true,query:'?url',import:'default'}),
 electrical: import.meta.glob('../images/electrical/*/*.{jpg,jpeg,png,webp}',{eager:true,query:'?url',import:'default'}),
 aggregates: import.meta.glob('../images/aggregates/*/*.{jpg,jpeg,png,webp}',{eager:true,query:'?url',import:'default'})
};
const liftItems=[
 ['Commercial Lifts','Efficient passenger movement for offices, retail, hotels and mixed-use developments.',Building2],
 ['Residential Lifts','Convenient home lift options for villas, apartments and private residences.',HomeIcon],
 ['Hospital Lifts','Lift solutions designed around patient movement, accessibility and operational flow.',HeartPulse],
 ['Institutional Lifts','Lift options for schools, colleges, public buildings and institutions.',Landmark],
 ['Industrial Lifts','Solutions for industrial facilities and applications with demanding movement needs.',Factory]
];
const elecItems=[
 ['Commercial Electrical','Electrical installations and fit-outs for offices, retail, hospitality and commercial properties.',Building2],
 ['Residential Electrical','Electrical work for homes and apartments, planned around usability, safety and everyday comfort.',HomeIcon],
 ['Industrial Electrical','Electrical infrastructure and installation support for industrial facilities and operations.',Factory]
];
const aggregateItems=[
 ['Manufactured Sand (M-Sand)','A manufactured sand option for construction and concrete applications.',Mountain],
 ['10 mm Aggregate','Smaller graded aggregate for suitable concrete and construction applications.',Layers3],
 ['20 mm Aggregate','Commonly used graded aggregate for a wide range of concrete works.',Layers3],
 ['40 mm Aggregate','Coarser aggregate for selected structural, foundation and infrastructure applications.',Layers3],
 ['Crushed Stone / Chippings','Crushed stone products for construction, surfacing and other project requirements.',HardHat]
];
const istDateFormatter=new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',weekday:'long',day:'2-digit',month:'short',year:'numeric'});
const istTimeFormatter=new Intl.DateTimeFormat('en-IN',{timeZone:'Asia/Kolkata',hour:'2-digit',minute:'2-digit',hourCycle:'h12'});
const fadeUp={hidden:{opacity:0,y:26},show:{opacity:1,y:0,transition:{duration:.65,ease:[.2,.8,.2,1]}}};

function Header(){
 const [open,setOpen]=useState(false),loc=useLocation();
 const [now,setNow]=useState(()=>new Date());
 useEffect(()=>setOpen(false),[loc]);
 useEffect(()=>{const refresh=()=>setNow(new Date());refresh();const timer=window.setInterval(refresh,1000);window.addEventListener('focus',refresh);return()=>{window.clearInterval(timer);window.removeEventListener('focus',refresh)}},[]);
 return <header className="header"><div className="nav-wrap">
  <Link to="/" className="brand"><img src={brandLogo} alt="BHLISS Enterprises logo"/></Link>
  <div className="header-meta"><span>INDEPENDENT ENGINEERING & SUPPLY</span><time dateTime={now.toISOString()}>{istDateFormatter.format(now)} · {istTimeFormatter.format(now).replace(/am|pm/i,p=>p.toUpperCase())} IST</time></div>
  <button className="menu-btn" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button>
  <nav className={open?'nav open':'nav'}><span className="nav-index">MENU / 06</span>
   <NavLink to="/" end><span>01</span> Home</NavLink><NavLink to="/lifts"><span>02</span> Lifts</NavLink><NavLink to="/electrical"><span>03</span> Electrical</NavLink><NavLink to="/aggregates"><span>04</span> Aggregates</NavLink><NavLink to="/about"><span>05</span> About</NavLink><NavLink to="/contact" className="nav-contact">Start a project <ArrowUpRight size={15}/></NavLink>
  </nav>
 </div></header>
}
function Eyebrow({children,light=false}){return <span className={'eyebrow '+(light?'light':'')}><i/>{children}</span>}
function Button({to='#contact',children,light=false}){return <Link className={'button '+(light?'button-light':'')} to={to}>{children}<ArrowUpRight size={17}/></Link>}
function SectionTitle({kicker,title,copy}){return <div className="section-title"><Eyebrow>{kicker}</Eyebrow><h2>{title}</h2>{copy&&<p>{copy}</p>}</div>}
function ServiceCard({item}){return <Link to={item.path} className="service-card"><div className="service-image"><img src={item.img} alt={item.title} loading="lazy"/><span className="service-number">{item.id} / 03</span><span className="service-arrow"><ArrowUpRight/></span></div><div className="service-card-body"><Eyebrow>{item.tag}</Eyebrow><h3>{item.title}</h3><p>{item.desc}</p><b>Explore capability <ArrowRight size={15}/></b></div></Link>}
function SectorGallery(){return <section className="sector-gallery"><div className="container"><div className="sector-gallery-heading"><Eyebrow>THE BHLISS PORTFOLIO</Eyebrow><span>THREE CORE CAPABILITIES / 2026</span></div><div className="sector-gallery-grid">{sectors.map(item=><Link to={item.path} key={item.path}><img src={item.img} alt={item.title} loading="lazy"/><span><small>{item.id}</small>{item.title}<ArrowUpRight size={17}/></span></Link>)}</div></div></section>}
function DetailGallery(){return null}
function categorySlug(name){return name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function getCategoryImages(type,slug){const grouped=Object.entries(categoryGalleryImages[type]||{}).filter(([path])=>path.split('/').at(-2).replace(/([a-z])([A-Z])/g,'$1-$2').toLowerCase()===slug).sort(([a],[b])=>a.localeCompare(b,undefined,{numeric:true})).map(([,src])=>src);if(grouped.length)return grouped;return Object.entries(detailGalleryImages[type]||{}).sort(([a],[b])=>a.localeCompare(b,undefined,{numeric:true})).map(([,src])=>src)}
function EnquiryForm({selected='General Enquiry'}){
 const [data,setData]=useState({name:'',phone:'',location:'',email:'',sector:selected,message:''});
 const [validationError,setValidationError]=useState('');
 const change=e=>{setData({...data,[e.target.name]:e.target.value});setValidationError('')};
 const submit=e=>{
  e.preventDefault();
 const requiredFields=[['name','Full Name'],['phone','Mobile Number'],['location','Location'],['email','Email Address'],['message','Project Details']];
  const missingField=requiredFields.find(([field])=>!data[field].trim());
  if(missingField){setValidationError(`${missingField[1]} is required.`);e.currentTarget.elements.namedItem(missingField[0]).focus();return;}
  if(!/^(?:\+?91[\s-]?)?[6-9][0-9]{9}$/.test(data.phone.trim())){setValidationError('Enter a valid 10-digit mobile number, optionally with +91.');e.currentTarget.elements.namedItem('phone').focus();return;}
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())){setValidationError('Enter a valid email address.');e.currentTarget.elements.namedItem('email').focus();return;}
  const body=[
   'BHLISS ENTERPRISES',
   'Website Enquiry',
   '────────────────────────',
   '',
   'CONTACT DETAILS',
   `Name:    ${data.name}`,
   `Phone:   ${data.phone}`,
   `Location: ${data.location}`,
   `Email:   ${data.email}`,
   '',
   'SERVICE',
   data.sector,
   '',
   'Project Details',
   data.message,
   '',
   '────────────────────────',
   'Sent from the BHLISS Enterprises website'
  ].join('\n');
  window.location.href=`mailto:${company.enquiryEmail}?subject=${encodeURIComponent('BHLISS Enterprises website enquiry')}&body=${encodeURIComponent(body)}`;
 };
 return <form className="enquiry-form" onSubmit={submit} noValidate>
  <div className="form-grid"><label><span>Full Name <span className="required-mark" aria-hidden="true">*</span></span><input name="name" value={data.name} onChange={change} required pattern=".*\S.*" title="Please enter your full name." autoComplete="name" placeholder="Your name"/></label><label><span>Mobile Number <span className="required-mark" aria-hidden="true">*</span></span><input name="phone" value={data.phone} onChange={change} required type="tel" inputMode="tel" pattern="(?:\+?91[\s-]?)?[6-9][0-9]{9}" title="Enter a valid 10-digit Indian mobile number, optionally with +91." autoComplete="tel" placeholder="xxxxxxxxxx"/></label></div>
  <div className="form-grid"><label><span>Location <span className="required-mark" aria-hidden="true">*</span></span><input name="location" value={data.location} onChange={change} required pattern=".*\S.*" title="Please enter your location." autoComplete="address-level2" placeholder="Area"/></label><label><span>Email Address <span className="required-mark" aria-hidden="true">*</span></span><input name="email" value={data.email} onChange={change} required type="email" autoComplete="email" placeholder="name@example.com"/></label></div>
  <label>Service Required<select name="sector" value={data.sector} onChange={change}><option>General Enquiry</option><option>Anchor 3G Lifts</option><option>Electrical Solutions</option><option>Construction Aggregates</option></select></label>
  <label><span>Project Details <span className="required-mark" aria-hidden="true">*</span></span><textarea name="message" rows="4" value={data.message} onChange={change} required placeholder="Tell us about your requirement..."/></label>
  {validationError&&<p className="form-error" role="alert">{validationError}</p>}
  <button className="button" type="submit">Send Enquiry <Send size={16}/></button><small>Submitting opens your email application with the enquiry details.</small>
 </form>
}
function ContactStrip(){return <section className="contact-strip gsap-reveal"><div className="container strip-grid"><div className="strip-copy"><Eyebrow light>HAVE A PROJECT IN MIND?</Eyebrow><h2>Let's make<br/><em>it happen.</em></h2><p>Share your requirement with BHLISS Enterprises. We’ll help you identify the right next step.</p><div className="quick-contact"><a href={`tel:${company.phone}`}><Phone/> {company.phone}</a><a href={`mailto:${company.email}`}><Mail/> {company.email}</a></div><span className="strip-coordinate">12.7409° N / 77.8253° E · HOSUR</span></div><div className="form-card"><div className="form-heading"><span>PROJECT ENQUIRY</span><span>01 — 04</span></div><EnquiryForm/></div></div></section>}
function Footer(){return <footer className="footer"><div className="container footer-grid"><div className="footer-brand"><img src={brandLogo} alt="BHLISS Enterprises" className="footer-logo"/><p>Dependable solutions across lifts, electrical works and construction materials.</p><span className="footer-motto">BUILT ON TRUST. DRIVEN BY POSSIBILITY.</span></div><div className="footer-links"><b>EXPLORE</b><Link to="/lifts">Lifts</Link><Link to="/electrical">Electrical solutions</Link><Link to="/aggregates">Construction aggregates</Link><Link to="/about">About BHLISS</Link></div><div className="footer-contact"><b>GET IN TOUCH</b><a href={`tel:${company.phone}`}><Phone/> {company.phone}</a><a href={`mailto:${company.email}`}><Mail/> {company.email}</a><a href={company.mapsUrl} target="_blank" rel="noreferrer"><MapPin/> {company.address}</a><a className="footer-map" href={company.mapsUrl} target="_blank" rel="noreferrer">View location <ArrowUpRight/></a></div></div><div className="container copyright"><span>© {new Date().getFullYear()} BHLISS Enterprises. All rights reserved.</span><span>HOSUR · TAMIL NADU · INDIA</span></div></footer>}
function ScrollStory(){
 const stories=[
  {number:'01',kicker:'ANCHOR 3G LIFT SOLUTIONS',title:'Move people and possibilities.',copy:'Lift solutions for residential, commercial, healthcare, institutional and industrial environments.',image:liftsImage,tag:'VERTICAL MOVEMENT'},
  {number:'02',kicker:'ELECTRICAL SYSTEMS',title:'Power the places we live and work.',copy:'Electrical installation and infrastructure for homes, commercial spaces and industrial operations.',image:electricalImage,tag:'CONNECTED SYSTEMS'},
  {number:'03',kicker:'CONSTRUCTION AGGREGATES',title:'Build from a stronger foundation.',copy:'M-Sand and graded aggregate materials for construction, concrete and infrastructure requirements.',image:aggregatesImage,tag:'MATERIAL FOUNDATIONS'}
 ];
 return <section className="story-section" aria-label="BHLISS capabilities story"><div className="story-stage">
  <div className="story-topline"><Eyebrow light>ONE PARTNER. THREE SPECIALISMS.</Eyebrow><span>SCROLL TO EXPLORE <i/></span></div>
  {stories.map(story=><article className="story-panel" key={story.number}><div className="story-panel-image"><img src={story.image} alt="" loading="lazy"/></div><div className="story-panel-copy"><span className="story-number">{story.number} <i/> 03</span><Eyebrow light>{story.kicker}</Eyebrow><h2>{story.title}</h2><p>{story.copy}</p><span className="story-tag">{story.tag}</span></div><div className="story-side-mark" aria-hidden="true"><span>{story.number}</span><i/></div></article>)}
  <div className="story-scroll-note">BHLISS ENTERPRISES <span>HOSUR · TAMIL NADU</span></div>
 </div></section>
}
function Home(){return <main>
 <section className="hero hero-home"><div className="hero-image"><img src={liftsImage} alt="Modern lift installation by BHLISS" fetchPriority="high"/></div><div className="hero-shade"/><div className="hero-topline"><span>HOSUR, TAMIL NADU</span><span>ENGINEERING / INFRASTRUCTURE / MATERIALS</span><span>EST. FOR WHAT'S NEXT</span></div>
  <div className="container hero-content"><motion.div initial="hidden" animate="show" variants={{hidden:{opacity:0},show:{opacity:1,transition:{staggerChildren:.14,delayChildren:.12}}}} className="hero-copy"><motion.div variants={fadeUp}><Eyebrow light>BUILT AROUND WHAT MATTERS</Eyebrow></motion.div><motion.h1 variants={fadeUp}>Essential<br/>systems.<br/><em>Built to move.</em></motion.h1><motion.p variants={fadeUp}>From smart Anchor 3G lifts to electrical solutions and construction aggregates, BHLISS Enterprises supports the essential elements of modern projects.</motion.p><motion.div variants={fadeUp} className="hero-actions"><Button to="/contact">Discuss your project</Button><Link className="hero-text-link" to="/about">Discover BHLISS <ArrowUpRight/></Link></motion.div></motion.div>
  <div className="hero-side"><div className="hero-side-note"><span>01</span><i/> VERTICAL MOVEMENT</div><div className="hero-image-frame"><span className="image-frame-label">ANCHOR 3G / LIFT SOLUTIONS</span><span className="image-frame-count">01 — 03</span></div><div className="hero-side-bottom"><span>ENGINEERED FOR DAILY LIFE</span><span>SCROLL TO EXPLORE ↓</span></div></div></div>
  <div className="hero-footerline"><span>01 / 04</span><span>DEPENDABLE SOLUTIONS. PRACTICAL PARTNERSHIP.</span><span>SCROLL DOWN ↓</span></div>
 </section>
 <section className="intro-section section-pad gsap-reveal"><div className="container intro-grid"><div className="intro-index"><Eyebrow>01 / WHO WE ARE</Eyebrow><h2>One trusted name.<br/><span>Three essential</span><br/>sectors.</h2></div><div className="intro-text"><p className="large">BHLISS Enterprises brings together specialist lift solutions, electrical works and construction materials under one dependable name.</p><p>We believe good projects begin with clear communication, practical solutions and a partner who understands what matters. Our focus is to make sourcing and service coordination more straightforward for our customers.</p><Button to="/about">Discover BHLISS</Button></div></div></section>
 <section className="sectors-section section-pad gsap-reveal" id="sectors"><div className="container"><div className="section-headline"><SectionTitle kicker="02 / OUR BUSINESS VERTICALS" title="Essential services.<br/>Thoughtfully connected." copy="Choose a sector to explore our capabilities, service categories and product range."/></div><div className="service-grid">{sectors.map(s=><ServiceCard item={s} key={s.path}/>)}</div></div></section>
 <ScrollStory/>
 <section className="partner-section gsap-reveal"><div className="container partner-grid"><div className="partner-image"><span className="partner-index">OUR LIFT BRAND / 01</span><img src={anchorLogo} alt="Anchor 3G lift logo"/></div><div><Eyebrow>03 / OUR LIFT BRAND</Eyebrow><h2>A better way to move<br/><span>with Anchor 3G.</span></h2><p>Our lift solutions focus specifically on Anchor 3G lifts, with options for commercial, residential, hospital, institutional and industrial settings.</p><Button to="/lifts">Explore Anchor 3G lifts</Button></div></div></section>
 <section className="why-section section-pad gsap-reveal"><div className="container"><SectionTitle kicker="04 / THE BHLISS APPROACH" title="A practical partner<br/>for important work."/><div className="why-grid"><article><span>01</span><ShieldCheck/><div><h3>Dependable approach</h3><p>Clear expectations, responsive communication and a focus on reliable execution.</p></div></article><article><span>02</span><Layers3/><div><h3>Connected capabilities</h3><p>Three complementary sectors that support a wide range of building and project needs.</p></div></article><article><span>03</span><Sparkles/><div><h3>Customer-first service</h3><p>We listen to your requirement and help you navigate the right service category.</p></div></article></div></div></section>
 <SectorGallery/><ContactStrip/>
 </main>}
function Detail({type}){
 const item=sectors.find(x=>x.path===`/${type}`);
 if(type==='aggregates')return <AggregatesPage item={item}/>;
 const isLift=type==='lifts',isElec=type==='electrical';
 const list=isLift?liftItems:isElec?elecItems:aggregateItems;
 const banner=isLift?liftsImage:electricalImage;
 const description=isLift?'Lift options for different building types and movement needs, with Anchor 3G as our dedicated lift brand.':'Electrical service categories for homes, businesses and industrial facilities, shaped around practical project requirements.';
 return <main className="detail-page"><section className="detail-hero"><div className="detail-hero-art"><img src={banner} alt={item.title}/></div><div className="detail-hero-overlay"/><div className="container detail-hero-content"><Link to="/" className="back-link">← ALL SECTORS</Link><Eyebrow light>{item.tag} / BHLISS ENTERPRISES</Eyebrow><h1>{item.title}<br/><span>by BHLISS.</span></h1><p>{description}</p><Button to="/contact">Enquire about this sector</Button><span className="detail-hero-index">{item.id} / 03</span></div></section>
 <section className="detail-overview section-pad gsap-reveal"><div className="container detail-overview-grid"><div className={isLift?'detail-overview-copy has-brand':'detail-overview-copy'}><Eyebrow>WHAT WE OFFER / 01</Eyebrow><h2>{isLift?'Solutions for every vertical journey.':'Powering spaces with purpose.'}</h2><p>{item.desc}</p>{isLift&&<div className="brand-lockup"><span>OUR LIFT BRAND</span><img src={anchorLogo} alt="Anchor 3G lift logo"/></div>}</div><div className="detail-categories"><div className="category-list-heading"><span>SELECT A CATEGORY</span><span>{String(list.length).padStart(2,'0')} OPTIONS</span></div><div className="detail-category-grid">{list.map(([name,desc,CategoryIcon],i)=><Link className="detail-category-card" key={name} to={`/${type}/${categorySlug(name)}`} aria-label={`View ${name} images`}><span className="detail-category-number">0{i+1}</span><div><h3>{name}</h3><p>{desc}</p></div><span className="detail-category-link"><ArrowUpRight/></span></Link>)}</div></div></div></section>
 <section className="detail-image-section gsap-reveal"><div className="detail-image-backdrop"><img src={banner} alt="" loading="lazy"/></div><div className="container image-feature"><div><Eyebrow>BUILT AROUND YOUR REQUIREMENT</Eyebrow><h2>Let's find the right fit for your project.</h2><p>Tell us about the site, building type, quantity or service scope. Our team can help direct your enquiry to the right business vertical.</p><Button to="/contact">Talk to our team</Button></div><div className="image-feature-note"><span>02 / 02</span><span>PROJECT-LED SERVICE</span></div></div></section><ContactStrip/></main>
}
function AggregatesPage({item}){
 return <main className="detail-page aggregate-page"><section className="detail-hero"><div className="detail-hero-art"><img src={aggregatesImage} alt={item.title}/></div><div className="detail-hero-overlay"/><div className="container detail-hero-content"><Link to="/" className="back-link">← ALL SECTORS</Link><Eyebrow light>{item.tag} / BHLISS ENTERPRISES</Eyebrow><h1>{item.title}<br/><span>by BHLISS.</span></h1><p>Construction materials to support concrete, building and infrastructure works, with key aggregate sizes and manufactured sand.</p><Button to="/contact">Enquire about aggregates</Button><span className="detail-hero-index">03 / 03</span></div></section>
 <section className="aggregate-content section-pad gsap-reveal"><div className="container"><div className="aggregate-intro"><div><Eyebrow>PRODUCT RANGE / 01</Eyebrow><h2>Material for<br/>the next stage.</h2></div><p>Construction materials to support concrete, building and infrastructure works, with key aggregate sizes and manufactured sand.</p></div><div className="aggregate-product-grid">{aggregateItems.map(([name,desc],i)=><article key={name}><div className="aggregate-product-image"><img src={Object.values(detailGalleryImages.aggregates)[i%Math.max(1,Object.values(detailGalleryImages.aggregates).length)]||aggregatesImage} alt={name} loading="lazy"/><span>0{i+1}</span></div><div><b>{name}</b><p>{desc}</p></div></article>)}</div></div></section><ContactStrip/></main>
}
function CategoryPage(){
 const {type,category}=useParams();
 const sector=sectors.find(item=>item.path===`/${type}`);
 const entries=type==='lifts'?liftItems:type==='electrical'?elecItems:type==='aggregates'?aggregateItems:[];
 const routeItem=entries.find(([name])=>categorySlug(name)===category);
 const [activeCategory,setActiveCategory]=useState(category);
 useEffect(()=>setActiveCategory(category),[category]);
 if(!sector||!routeItem)return <main className="section-pad"><div className="container"><h1>Category not found</h1><Link to="/">Return home</Link></div></main>;
 const activeItem=entries.find(([name])=>categorySlug(name)===activeCategory)||routeItem;
 const [name,description]=activeItem;
 const images=getCategoryImages(type,activeCategory);
 return <main className="category-page"><section className="detail-hero category-detail-hero"><div className="detail-hero-art"><img src={images[0]||sector.img} alt={name}/></div><div className="detail-hero-overlay"/><div className="container detail-hero-content"><Link to={sector.path} className="back-link">← BACK TO {sector.title.toUpperCase()}</Link><Eyebrow light>{sector.tag} / CATEGORY {String(entries.findIndex(([entryName])=>categorySlug(entryName)===activeCategory)+1).padStart(2,'0')}</Eyebrow><h1>{name}</h1><p>{description}</p><Button to="/contact">Enquire about {name}</Button></div></section>
 <section className="category-switcher"><div className="container"><div className="category-switcher-heading"><div><Eyebrow>EXPLORE {sector.title.toUpperCase()}</Eyebrow><h2>Choose a category</h2></div><span>{String(entries.findIndex(([entryName])=>categorySlug(entryName)===activeCategory)+1).padStart(2,'0')} / {String(entries.length).padStart(2,'0')}</span></div><nav aria-label={`${sector.title} categories`}>{entries.map(([categoryName],i)=><button key={categoryName} type="button" className={categorySlug(categoryName)===activeCategory?'active':''} aria-pressed={categorySlug(categoryName)===activeCategory} onClick={()=>setActiveCategory(categorySlug(categoryName))}><span>0{i+1}</span>{categoryName}</button>)}</nav></div></section>
 <section className="category-images section-pad"><div className="container"><div className="category-gallery-heading"><div><Eyebrow>PROJECT & PRODUCT GALLERY</Eyebrow><h2>{name}</h2><p>{description}</p></div><span>{images.length} IMAGES</span></div>{images.length?<div className="category-image-grid">{images.map((src,i)=><figure key={src}><img src={src} alt={`${name} — view ${i+1}`} loading="lazy"/><figcaption>{name} <span>{String(i+1).padStart(2,'0')}</span></figcaption></figure>)}</div>:<div className="category-empty">Images for this category will be added shortly.</div>}</div></section><ContactStrip/></main>
}
function About(){return <main><section className="inner-hero"><div className="inner-hero-art"><img src={liftsImage} alt="BHLISS lift solutions"/></div><div className="detail-hero-overlay"/><div className="container"><Link to="/" className="back-link">← HOME</Link><Eyebrow light>ABOUT BHLISS ENTERPRISES</Eyebrow><h1>Built on trust.<br/><span>Focused on progress.</span></h1><p>A multi-sector enterprise bringing together lift solutions, electrical works and construction aggregates.</p></div><span className="inner-hero-index">HOSUR / INDIA</span></section><section className="section-pad about-story gsap-reveal"><div className="container about-grid"><div><Eyebrow>OUR STORY & APPROACH</Eyebrow><h2>Three sectors.<br/>One committed partner.</h2></div><div><p className="large">BHLISS Enterprises is built around a simple idea: make essential project solutions easier to access through clear communication and a dependable approach.</p><p>Our business spans Anchor 3G lifts, electrical services for residential, commercial and industrial requirements, and construction aggregates including M-Sand and graded stone products. Each vertical serves a different need, connected by our commitment to service.</p></div></div></section><section className="about-values gsap-reveal"><div className="container"><SectionTitle kicker="WHAT GUIDES US" title="The principles behind the name."/><div className="values-grid"><article><span>01</span><CheckCircle2/><div><h3>Integrity</h3><p>Transparent conversations and honest expectations at every stage.</p></div></article><article><span>02</span><ShieldCheck/><div><h3>Reliability</h3><p>A consistent, responsive approach to customer requirements.</p></div></article><article><span>03</span><Wrench/><div><h3>Practicality</h3><p>Solutions shaped around the real needs of buildings and projects.</p></div></article></div></div></section><section className="about-sectors section-pad gsap-reveal"><div className="container"><SectionTitle kicker="OUR BUSINESS" title="What we bring together."/><div className="service-grid">{sectors.map(s=><ServiceCard item={s} key={s.path}/>)}</div></div></section><ContactStrip/></main>}
function Contact(){return <main><section className="inner-hero contact-hero"><div className="inner-hero-art"><img src={electricalImage} alt="Electrical solutions"/></div><div className="detail-hero-overlay"/><div className="container"><Link to="/" className="back-link">← HOME</Link><Eyebrow light>CONTACT BHLISS ENTERPRISES</Eyebrow><h1>Let's start a<br/><span>conversation.</span></h1><p>Tell us what you're planning. We’ll help you connect with the right team.</p></div><span className="inner-hero-index">WE'RE LISTENING</span></section><section className="section-pad contact-page gsap-reveal"><div className="container contact-page-grid"><div><Eyebrow>CONTACT INFORMATION</Eyebrow><h2>We'd be glad<br/>to hear from you.</h2><div className="contact-info"><a href={`tel:${company.phone}`}><Phone/><span><small>CALL US</small><b>{company.phone}</b></span></a><a href={`mailto:${company.email}`}><Mail/><span><small>EMAIL US</small><b>{company.email}</b></span></a><a href={company.mapsUrl} target="_blank" rel="noreferrer"><MapPin/><span><small>FIND US</small><b>{company.address}</b></span></a></div><a className="map-card" href={company.mapsUrl} target="_blank" rel="noreferrer"><div><MapPin/><b>View our location</b><span>Open directions in Google Maps</span></div><ArrowUpRight/></a></div><div className="contact-form-wrap"><div className="form-heading"><span>PROJECT ENQUIRY</span><span>01 — 04</span></div><Eyebrow>Enquiry Form</Eyebrow><h3>How Can We Help?</h3><p>Share a few details and our team can follow up.</p><EnquiryForm/></div></div></section></main>}
function ScrollManager(){
 const {pathname}=useLocation();
 const previousPath=useRef(pathname);
 useEffect(()=>{
  const previous=previousPath.current;
  const parts=path=>path.split('/').filter(Boolean);
  const from=parts(previous),to=parts(pathname);
  const categoryDrilldown=from.length===1&&to.length===2&&from[0]===to[0]&&['lifts','electrical','aggregates'].includes(from[0]);
  if(!categoryDrilldown)window.scrollTo(0,0);
  previousPath.current=pathname;
 },[pathname]);
 return null;
}
export default function App(){useGsapReveals();return <><ScrollManager/><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/lifts" element={<Detail type="lifts"/>}/><Route path="/electrical" element={<Detail type="electrical"/>}/><Route path="/aggregates" element={<Detail type="aggregates"/>}/><Route path="/:type/:category" element={<CategoryPage/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<Home/>}/></Routes><Footer/><button className="to-top" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} aria-label="Back to top"><MoveUp/></button></>}
