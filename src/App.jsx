import React, {useEffect, useState} from 'react';
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
import ServiceIllustration from './components/ServiceIllustration.jsx';
import HeroIllustration from './components/HeroIllustration.jsx';


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
 electrical: import.meta.glob('../images/electrical/*/*.{jpg,jpeg,png,webp}',{eager:true,query:'?url',import:'default'})
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
 useEffect(()=>{
  const refreshClock=()=>setNow(new Date());
  refreshClock();
  const timer=window.setInterval(refreshClock,1000);
  window.addEventListener('focus',refreshClock);
  document.addEventListener('visibilitychange',refreshClock);
  return ()=>{
   window.clearInterval(timer);
   window.removeEventListener('focus',refreshClock);
   document.removeEventListener('visibilitychange',refreshClock);
  };
 },[]);
 return <header className="header"><div className="nav-wrap">
  <Link to="/" className="brand"><img src={brandLogo} alt="BHLISS Enterprises logo"/></Link>
  <time className="header-clock" dateTime={now.toISOString()} aria-label="Current date and time in India Standard Time">{istDateFormatter.format(now)}, {istTimeFormatter.format(now).replace(/am|pm/i,period=>period.toUpperCase())} IST</time>
  <button className="menu-btn" onClick={()=>setOpen(!open)} aria-label="Toggle navigation">{open?<X/>:<Menu/>}</button>
  <nav className={open?'nav open':'nav'}>
   <NavLink to="/" end>Home</NavLink><NavLink to="/lifts">Lifts</NavLink><NavLink to="/electrical">Electrical</NavLink><NavLink to="/aggregates">Aggregates</NavLink><NavLink to="/about">About</NavLink><NavLink to="/contact" className="nav-contact">Contact <ArrowUpRight size={15}/></NavLink>
  </nav>
 </div></header>
}
function Eyebrow({children,light=false}){return <span className={'eyebrow '+(light?'light':'')}><i/>{children}</span>}
function Button({to='#contact',children,light=false}){return <Link className={'button '+(light?'button-light':'')} to={to}>{children}<ArrowUpRight size={17}/></Link>}
function SectionTitle({kicker,title,copy}){return <div className="section-title"><Eyebrow>{kicker}</Eyebrow><h2>{title}</h2>{copy&&<p>{copy}</p>}</div>}
function ServiceCard({item}){const variant=item.path.slice(1);return <Link to={item.path} className="service-card"><div className="service-image"><span>{item.id}</span><ServiceIllustration variant={variant}/><div className="service-symbol">{variant==='lifts'?'↕':variant==='electrical'?'⚡':'◆'}</div></div><div className="service-card-body"><Eyebrow>{item.tag}</Eyebrow><h3>{item.title}</h3><p>{item.desc}</p><b>Explore sector <ArrowUpRight size={16}/></b></div></Link>}
function SectorGallery(){return <section className="sector-gallery cartoon-marquee" aria-label="Illustrated BHLISS services"><div className="container"><div className="cartoon-marquee-grid"><ServiceIllustration variant="lifts"/><ServiceIllustration variant="electrical"/><ServiceIllustration variant="aggregates"/></div></div></section>}
function DetailGallery(){return null}
function categorySlug(name){return name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')}
function getCategoryImages(type,slug){
 return Object.entries(categoryGalleryImages[type]||{}).filter(([path])=>path.split('/').at(-2).replace(/([a-z])([A-Z])/g,'$1-$2').toLowerCase()===slug).sort(([a],[b])=>a.localeCompare(b,undefined,{numeric:true})).map(([,src])=>src);
}
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
function ContactStrip(){return <section className="contact-strip gsap-reveal"><div className="container strip-grid"><div><Eyebrow light>LET'S TALK ABOUT YOUR PROJECT</Eyebrow><h2>Ready to move<br/><span>things forward?</span></h2><p>Share your requirement with BHLISS Enterprises. We’ll help you identify the right next step.</p><div className="quick-contact"><a href={`tel:${company.phone}`}><Phone/> {company.phone}</a><a href={`mailto:${company.email}`}><Mail/> {company.email}</a></div></div><div className="form-card"><EnquiryForm/></div></div></section>}
function Footer(){return <footer className="footer"><div className="container footer-grid"><div><img src={brandLogo} alt="BHLISS Enterprises" className="footer-logo"/><p>Dependable solutions across lifts, electrical works and construction materials.</p></div><div><b>Explore</b><Link to="/lifts">Lifts</Link><Link to="/electrical">Electrical</Link><Link to="/aggregates">Aggregates</Link><Link to="/about">About BHLISS</Link></div><div><b>Contact</b><span><Phone/> {company.phone}</span><span><Mail/> {company.email}</span><span><MapPin className="map-pin-icon"/> {company.address}</span><a className="footer-map" href={company.mapsUrl} target="_blank" rel="noreferrer">View location <ArrowUpRight/></a></div></div><div className="container copyright"><span>© {new Date().getFullYear()} BHLISS Enterprises. All rights reserved.</span><span>Built on trust. Driven by possibility.</span></div></footer>}
function ScrollStory(){
 const stories=[
  {number:'01',kicker:'ANCHOR 3G LIFT SOLUTIONS',title:'Move people and possibilities.',copy:'Lift solutions for residential, commercial, healthcare, institutional and industrial environments.',variant:'lifts',tag:'VERTICAL MOVEMENT'},
  {number:'02',kicker:'ELECTRICAL SYSTEMS',title:'Power the places we live and work.',copy:'Electrical installation and infrastructure for homes, commercial spaces and industrial operations.',variant:'electrical',tag:'CONNECTED SYSTEMS'},
  {number:'03',kicker:'CONSTRUCTION AGGREGATES',title:'Build from a stronger foundation.',copy:'M-Sand and graded aggregate materials for construction, concrete and infrastructure requirements.',variant:'aggregates',tag:'MATERIAL FOUNDATIONS'}
 ];
 return <section className="story-section" aria-label="BHLISS capabilities story">
  <div className="story-stage">
   <div className="story-topline"><Eyebrow light>THREE CAPABILITIES. ONE COMMITTED PARTNER.</Eyebrow><span>SCROLL TO EXPLORE <i/></span></div>
   {stories.map((story,index)=><article className={`story-panel story-panel-${index+1}`} key={story.number}>
    <div className="story-panel-image"><ServiceIllustration variant={story.variant}/></div>
    <div className="story-panel-copy">
     <span className="story-number">{story.number} / 03</span>
     <Eyebrow light>{story.kicker}</Eyebrow>
     <h2>{story.title}</h2>
     <p>{story.copy}</p>
     <span className="story-tag">{story.tag}</span>
    </div>
    <div className="story-side-mark" aria-hidden="true"><span>{story.number}</span><i/></div>
   </article>)}
   <div className="story-scroll-note">BHLISS ENTERPRISES <span>HOSUR · TAMIL NADU</span></div>
  </div>
 </section>
}
function Home(){
 return <main>
  <section className="hero cartoon-hero"><div className="hero-photo"/><div className="container hero-content"><motion.div initial="hidden" animate="show" variants={fadeUp} className="hero-copy"><Eyebrow light>ENGINEERING • INFRASTRUCTURE • MATERIALS</Eyebrow><h1>Building what<br/>moves us <em>forward.</em></h1><p>From smart Anchor 3G lifts to electrical solutions and construction aggregates, BHLISS Enterprises supports the essential elements of modern projects.</p><div className="hero-actions"><Button to="/contact">Discuss your project</Button><Link className="hero-text-link" to="/about">Get to know us <ArrowRight/></Link></div><div className="hero-stats"><div><b>03</b><span>Business sectors</span></div><div><b>360°</b><span>Project perspective</span></div><div><b>01</b><span>Committed partner</span></div></div></motion.div><div className="hero-side"><HeroIllustration/><div className="hero-badge"><span>BE</span><small>BUILT FOR<br/>WHAT'S NEXT</small></div></div></div><div className="hero-scroll">SCROLL TO DISCOVER <i/></div></section>
  <section className="intro-section section-pad gsap-reveal"><div className="container intro-grid"><div><Eyebrow>WHO WE ARE</Eyebrow><h2>One trusted name.<br/><span>Three essential</span><br/>sectors.</h2></div><div className="intro-text"><p className="large">BHLISS Enterprises brings together specialist lift solutions, electrical works and construction materials under one dependable name.</p><p>We believe good projects begin with clear communication, practical solutions and a partner who understands what matters. Our focus is to make sourcing and service coordination more straightforward for our customers.</p><Button to="/about">Discover BHLISS</Button></div></div></section>
  <section className="sectors-section section-pad gsap-reveal" id="sectors"><div className="container"><SectionTitle kicker="OUR BUSINESS VERTICALS" title="Essential services. Thoughtfully connected." copy="Choose a sector to explore our capabilities, service categories and product range."/><div className="service-grid">{sectors.map(s=><ServiceCard item={s} key={s.path}/>)}</div></div></section>
  <ScrollStory/><section className="partner-section gsap-reveal"><div className="container partner-grid"><div className="partner-image"><img src={anchorLogo} alt="Anchor 3G lift logo"/></div><div><Eyebrow>OUR LIFT BRAND</Eyebrow><h2>A better way to move<br/><span>with Anchor 3G.</span></h2><p>Our lift solutions focus specifically on Anchor 3G lifts, with options for commercial, residential, hospital, institutional and industrial settings.</p><Button to="/lifts">Explore Anchor 3G lifts</Button></div></div></section>
  <section className="why-section section-pad gsap-reveal"><div className="container"><SectionTitle kicker="THE BHLISS APPROACH" title="A practical partner for important work."/><div className="why-grid"><article><ShieldCheck/><h3>Dependable approach</h3><p>Clear expectations, responsive communication and a focus on reliable execution.</p></article><article><Layers3/><h3>Connected capabilities</h3><p>Three complementary sectors that support a wide range of building and project needs.</p></article><article><Sparkles/><h3>Customer-first service</h3><p>We listen to your requirement and help you navigate the right service category.</p></article></div></div></section>
  <SectorGallery/>
  <ContactStrip/>
 </main>
}
function Detail({type}){
 const item=sectors.find(x=>x.path===`/${type}`);
 if(type==='aggregates')return <AggregatesPage item={item}/>;
 const isLift=type==='lifts',isElec=type==='electrical';
 const list=isLift?liftItems:isElec?elecItems:aggregateItems;
 const banner=isLift?liftsImage:isElec?electricalImage:aggregatesImage;
 const Icon=item.icon;
 const description=isLift?'Lift options for different building types and movement needs, with Anchor 3G as our dedicated lift brand.':isElec?'Electrical service categories for homes, businesses and industrial facilities, shaped around practical project requirements.':'Construction materials to support concrete, building and infrastructure works, with key aggregate sizes and manufactured sand.';
 return <main className="detail-page"><section className="detail-hero cartoon-detail-hero"><div className="detail-hero-art"><ServiceIllustration variant={type}/></div><div className="container detail-hero-content"><Link to="/" className="back-link">← Back to Home</Link><Eyebrow light>{item.tag}</Eyebrow><h1>{item.title}<br/><span>by BHLISS.</span></h1><p>{description}</p><Button to="/contact">Enquire about this sector</Button></div></section>
 
 <section className="detail-overview section-pad gsap-reveal"><div className="container detail-overview-grid"><div className={isLift?'detail-overview-copy has-brand':'detail-overview-copy'}><Eyebrow>WHAT WE OFFER</Eyebrow><h2>{isLift?'Solutions for every vertical journey.':'Powering spaces with purpose.'}</h2><p>{item.desc}</p>{isLift&&<div className="brand-lockup"><img src={anchorLogo} alt="Anchor 3G lift logo"/></div>}</div><div className="detail-categories"><div className="detail-category-grid">{list.map(([name,desc,CategoryIcon],i)=><Link className="detail-category-card" key={name} to={`/${type}/${categorySlug(name)}`} aria-label={`View ${name} images`}><span className="detail-category-number">0{i+1}</span><CategoryIcon aria-hidden="true"/><h3>{name}</h3><p>{desc}</p><span className="detail-category-link">View images <ArrowUpRight size={15}/></span></Link>)}</div></div></div></section>
 <section className="detail-image-section gsap-reveal"><div className="container image-feature cartoon-feature"><ServiceIllustration variant={type}/><div><Eyebrow>BUILT AROUND YOUR REQUIREMENT</Eyebrow><h2>Let's find the right fit for your project.</h2><p>Tell us about the site, building type, quantity or service scope. Our team can help direct your enquiry to the right business vertical.</p><Button to="/contact">Talk to our team</Button></div></div></section><ContactStrip/></main>
}
function AggregatesPage({item}){
 return <main className="detail-page aggregate-page"><section className="detail-hero cartoon-detail-hero"><div className="detail-hero-art"><ServiceIllustration variant="aggregates"/></div><div className="container detail-hero-content"><Link to="/" className="back-link">← Back to Home</Link><Eyebrow light>{item.tag}</Eyebrow><h1>{item.title}<br/><span>by BHLISS.</span></h1><p>Construction materials to support concrete, building and infrastructure works, with key aggregate sizes and manufactured sand.</p><Button to="/contact">Enquire about aggregates</Button></div></section><section className="aggregate-content section-pad gsap-reveal"><div className="container"><div className="aggregate-categories"><div className="aggregate-range-heading"><Eyebrow>AVAILABLE CATEGORIES</Eyebrow><h2>Aggregate Range</h2></div><ol>{aggregateItems.map(([name,,Icon],i)=><li key={name}><span className="aggregate-category-number">0{i+1}</span><Icon aria-hidden="true"/><b>{name}</b></li>)}</ol></div><div className="cartoon-product-grid">{aggregateItems.map(([name,desc])=><article key={name}><ServiceIllustration variant="aggregates"/><b>{name}</b><p>{desc}</p></article>)}</div></div></section><ContactStrip/></main>
}
function CategoryPage(){
 const {type,category}=useParams();
 const sector=sectors.find(item=>item.path===`/${type}`);
 const entries=type==='lifts'?liftItems:type==='electrical'?elecItems:type==='aggregates'?aggregateItems:[];
 const item=entries.find(([name])=>categorySlug(name)===category);
 const [activeCategory,setActiveCategory]=useState(category);
 useEffect(()=>setActiveCategory(category),[category]);
 if(!sector||!item)return <main className="section-pad"><div className="container"><h1>Category not found</h1><Link to="/">Return home</Link></div></main>;
 const [name,description]=item;
 return <main className="category-page"><section className="detail-hero cartoon-detail-hero"><div className="detail-hero-art"><ServiceIllustration variant={type}/></div><div className="container detail-hero-content"><Link to={sector.path} className="back-link">← Back to {sector.title}</Link><Eyebrow light>{sector.tag}</Eyebrow><h1>{name}<br/><span>by BHLISS.</span></h1><p>{description}</p><Button to="/contact">Enquire about {name}</Button></div></section><section className="category-switcher gsap-reveal"><div className="container"><Eyebrow>EXPLORE {sector.title.toUpperCase()} CATEGORIES</Eyebrow><nav aria-label={`${sector.title} categories`}>{entries.map(([categoryName],i)=><button key={categoryName} type="button" className={categorySlug(categoryName)===activeCategory?'active':''} aria-pressed={categorySlug(categoryName)===activeCategory} onClick={()=>setActiveCategory(categorySlug(categoryName))}><span>0{i+1}</span>{categoryName}</button>)}</nav></div></section><section className="category-images section-pad gsap-reveal"><div className="container cartoon-category-feature"><ServiceIllustration variant={type}/><div><Eyebrow>MADE FOR YOUR PROJECT</Eyebrow><h2>{name}</h2><p>{description}</p><Button to="/contact">Discuss this requirement</Button></div></div></section><ContactStrip/></main>
}
function About(){return <main><section className="inner-hero cartoon-inner-hero"><div className="inner-hero-art"><HeroIllustration/></div><div className="container"><Link to="/" className="back-link">← Back to Home</Link><Eyebrow light>ABOUT BHLISS ENTERPRISES</Eyebrow><h1>Built on trust.<br/><span>Focused on progress.</span></h1><p>A multi-sector enterprise bringing together lift solutions, electrical works and construction aggregates.</p></div></section><section className="section-pad about-story gsap-reveal"><div className="container about-grid"><div><Eyebrow>OUR STORY & APPROACH</Eyebrow><h2>Three sectors.<br/>One committed partner.</h2></div><div><p className="large">BHLISS Enterprises is built around a simple idea: make essential project solutions easier to access through clear communication and a dependable approach.</p><p>Our business spans Anchor 3G lifts, electrical services for residential, commercial and industrial requirements, and construction aggregates including M-Sand and graded stone products. Each vertical serves a different need, connected by our commitment to service.</p></div></div></section><section className="about-values gsap-reveal"><div className="container"><SectionTitle kicker="WHAT GUIDES US" title="The principles behind the name."/><div className="values-grid"><article><CheckCircle2/><h3>Integrity</h3><p>Transparent conversations and honest expectations at every stage.</p></article><article><ShieldCheck/><h3>Reliability</h3><p>A consistent, responsive approach to customer requirements.</p></article><article><Wrench/><h3>Practicality</h3><p>Solutions shaped around the real needs of buildings and projects.</p></article></div></div></section><section className="about-sectors section-pad gsap-reveal"><div className="container"><SectionTitle kicker="OUR BUSINESS" title="What we bring together."/><div className="service-grid">{sectors.map(s=><ServiceCard item={s} key={s.path}/>)}</div></div></section><ContactStrip/></main>}
function Contact(){return <main><section className="inner-hero contact-hero cartoon-inner-hero"><div className="inner-hero-art"><ServiceIllustration variant="electrical"/></div><div className="container"><Link to="/" className="back-link">← Back to Home</Link><Eyebrow light>CONTACT BHLISS ENTERPRISES</Eyebrow><h1>Let's start a<br/><span>conversation.</span></h1><p>Tell us what you're planning. We’ll help you connect with the right team.</p></div></section><section className="section-pad contact-page gsap-reveal"><div className="container contact-page-grid"><div><Eyebrow>CONTACT INFORMATION</Eyebrow><h2>We'd be glad<br/>to hear from you.</h2><div className="contact-info"><a href={`tel:${company.phone}`}><Phone/><span><small>CALL US</small><b>{company.phone}</b></span></a><a href={`mailto:${company.email}`}><Mail/><span><small>EMAIL US</small><b>{company.email}</b></span></a><a href={company.mapsUrl} target="_blank" rel="noreferrer"><MapPin className="map-pin-icon"/><span><small>FIND US</small><b>{company.address}</b></span></a></div><a className="map-card" href={company.mapsUrl} target="_blank" rel="noreferrer"><div><MapPin className="map-pin-icon"/><b>View our location</b><span>Open directions in Google Maps</span></div><ArrowUpRight/></a></div><div className="contact-form-wrap"><Eyebrow>Enquiry Form</Eyebrow><h3>How Can We Help?</h3><p>Share a few details and our team can follow up.</p><EnquiryForm/></div></div></section></main>}
function ScrollManager(){const loc=useLocation();useEffect(()=>{if(loc.hash){setTimeout(()=>document.querySelector(loc.hash)?.scrollIntoView({behavior:'smooth'}),100)}else window.scrollTo({top:0,behavior:'smooth'})},[loc]);return null}
export default function App(){useGsapReveals();return <><ScrollManager/><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/lifts" element={<Detail type="lifts"/>}/><Route path="/electrical" element={<Detail type="electrical"/>}/><Route path="/aggregates" element={<Detail type="aggregates"/>}/><Route path="/:type/:category" element={<CategoryPage/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<Home/>}/></Routes><Footer/><button className="to-top" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} aria-label="Back to top"><MoveUp/></button></>}
