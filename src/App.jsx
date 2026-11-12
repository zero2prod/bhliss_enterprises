import React, {useEffect, useState} from 'react';
import {Routes, Route, Link, NavLink, useLocation} from 'react-router-dom';
import {motion, useScroll, useTransform} from 'framer-motion';
import {ArrowRight, ArrowUpRight, Menu, X, Phone, Mail, MapPin, Building2, Zap, Mountain, ShieldCheck, CheckCircle2, Clock3, Layers3, Send, ChevronRight, MoveUp, Cable, Camera, HardHat, Home as HomeIcon, Factory, HeartPulse, Landmark, Wrench, Sparkles} from 'lucide-react';
import brandLogo from './assets/bhliss-logo.png';
import anchorLogo from './assets/anchor-3g-logo-enhanced.png';
import liftsImage from './assets/lifts-category.jpg';
import liftDetailImage from './assets/lifts-detail.jpg';
import liftInteriorImage from './assets/lifts-interior.jpg';
import electricalImage from './assets/electrical-category.jpg';
import electricalPanelImage from './assets/electrical-panel.jpg';
import electricalMetersImage from './assets/electrical-meters.jpg';
import aggregatesImage from './assets/aggregates-category.jpg';
import aggregateShovelImage from './assets/aggregate-shovel.jpg';
import aggregateStonesImage from './assets/aggregate-stones.jpg';
import {company} from './config';

const sectors = [
 {path:'/lifts',id:'01',title:'Lifts',tag:'ANCHOR 3G',desc:'Smart lift solutions for buildings of every scale — from private residences to busy commercial and industrial environments.',img:liftsImage,icon:Building2},
 {path:'/electrical',id:'02',title:'Electrical Solutions',tag:'POWER & SYSTEMS',desc:'Electrical works for residential, commercial and industrial spaces, with a focus on safety, planning and dependable delivery.',img:electricalImage,icon:Zap},
 {path:'/aggregates',id:'03',title:'Construction Aggregates',tag:'MATERIAL SUPPLY',desc:'Essential construction materials for concrete, infrastructure and building projects, supplied to match project requirements.',img:aggregatesImage,icon:Mountain}
];
const galleryImages=[liftsImage,electricalPanelImage,aggregateShovelImage,liftInteriorImage,aggregatesImage,electricalMetersImage,liftDetailImage,electricalImage,aggregateStonesImage];
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
const photo=(id,w=1400)=>`https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`;
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
function ServiceCard({item}){let Icon=item.icon;return <Link to={item.path} className="service-card"><div className="service-image" style={{backgroundImage:`linear-gradient(0deg,#111518c9,transparent 65%),url(${item.img})`}}><span>{item.id}</span><div className="service-symbol"><Icon/></div></div><div className="service-card-body"><Eyebrow>{item.tag}</Eyebrow><h3>{item.title}</h3><p>{item.desc}</p><b>Explore sector <ArrowUpRight size={16}/></b></div></Link>}
function SectorGallery(){return <section className="sector-gallery" aria-label="Lifts, electrical work, and aggregates"><div className="sector-gallery-track" aria-hidden="true">{[0,1].map(copy=><div className="sector-gallery-group" key={copy}>{galleryImages.map(image=><div className="sector-gallery-item" key={image}><img src={image} alt=""/></div>)}</div>)}</div></section>}
function EnquiryForm({selected='General enquiry'}){
 const [data,setData]=useState({name:'',phone:'',location:'',email:'',sector:selected,message:''});
 const [validationError,setValidationError]=useState('');
 const change=e=>{setData({...data,[e.target.name]:e.target.value});setValidationError('')};
 const submit=e=>{
  e.preventDefault();
  const requiredFields=[['name','Full name'],['phone','Mobile number'],['location','Location'],['email','Email address'],['message','Project details']];
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
   'PROJECT DETAILS',
   data.message,
   '',
   '────────────────────────',
   'Sent from the BHLISS Enterprises website'
  ].join('\n');
  window.location.href=`mailto:${company.enquiryEmail}?subject=${encodeURIComponent('BHLISS Enterprises website enquiry')}&body=${encodeURIComponent(body)}`;
 };
 return <form className="enquiry-form" onSubmit={submit} noValidate>
  <div className="form-grid"><label><span>Full name <span className="required-mark" aria-hidden="true">*</span></span><input name="name" value={data.name} onChange={change} required pattern=".*\S.*" title="Please enter your full name." autoComplete="name" placeholder="Your name"/></label><label><span>Mobile number <span className="required-mark" aria-hidden="true">*</span></span><input name="phone" value={data.phone} onChange={change} required type="tel" inputMode="tel" pattern="(?:\+?91[\s-]?)?[6-9][0-9]{9}" title="Enter a valid 10-digit Indian mobile number, optionally with +91." autoComplete="tel" placeholder="xxxxxxxxxx"/></label></div>
  <div className="form-grid"><label><span>Location <span className="required-mark" aria-hidden="true">*</span></span><input name="location" value={data.location} onChange={change} required pattern=".*\S.*" title="Please enter your location." autoComplete="address-level2" placeholder="Area"/></label><label><span>Email address <span className="required-mark" aria-hidden="true">*</span></span><input name="email" value={data.email} onChange={change} required type="email" autoComplete="email" placeholder="name@example.com"/></label></div>
  <label>Service required<select name="sector" value={data.sector} onChange={change}><option>General enquiry</option><option>Anchor 3G Lifts</option><option>Electrical solutions</option><option>Construction aggregates</option></select></label>
  <label><span>Project details <span className="required-mark" aria-hidden="true">*</span></span><textarea name="message" rows="4" value={data.message} onChange={change} required placeholder="Tell us about your requirement..."/></label>
  {validationError&&<p className="form-error" role="alert">{validationError}</p>}
  <button className="button" type="submit">Send enquiry <Send size={16}/></button><small>Submitting opens your email application with the enquiry details.</small>
 </form>
}
function ContactStrip(){return <section className="contact-strip"><div className="container strip-grid"><div><Eyebrow light>LET'S TALK ABOUT YOUR PROJECT</Eyebrow><h2>Ready to move<br/><span>things forward?</span></h2><p>Share your requirement with BHLISS Enterprises. We’ll help you identify the right next step.</p><div className="quick-contact"><a href={`tel:${company.phone}`}><Phone/> {company.phones[0]} / {company.phones[1]}</a><a href={`mailto:${company.email}`}><Mail/> {company.email}</a></div></div><div className="form-card"><EnquiryForm/></div></div></section>}
function Footer(){return <footer className="footer"><div className="container footer-grid"><div><img src={brandLogo} alt="BHLISS Enterprises" className="footer-logo"/><p>Dependable solutions across lifts, electrical works and construction materials.</p></div><div><b>Explore</b><Link to="/lifts">Lifts</Link><Link to="/electrical">Electrical</Link><Link to="/aggregates">Aggregates</Link><Link to="/about">About BHLISS</Link></div><div><b>Contact</b><span><Phone/> {company.phones[0]} / {company.phones[1]}</span><span><Mail/> {company.email}</span><span><MapPin/> {company.address}</span><a className="footer-map" href={company.mapsUrl} target="_blank" rel="noreferrer">View location <ArrowUpRight/></a></div></div><div className="container copyright"><span>© {new Date().getFullYear()} BHLISS Enterprises. All rights reserved.</span><span>Built on trust. Driven by possibility.</span></div></footer>}
function Home(){
 const {scrollY}=useScroll();const parallax=useTransform(scrollY,[0,700],[0,95]);
 return <main>
  <section className="hero"><div className="hero-photo" style={{backgroundImage:`linear-gradient(90deg,#171a1df2 0%,#171a1ddc 48%,#171a1d55 100%),url(${photo('photo-1486406146926-c627a92ad1ab',2200)})`}}/><motion.div className="hero-decor" style={{y:parallax}}/><div className="container hero-content"><motion.div initial="hidden" animate="show" variants={fadeUp} className="hero-copy"><Eyebrow light>ENGINEERING • INFRASTRUCTURE • MATERIALS</Eyebrow><h1>Building what<br/>moves us <em>forward.</em></h1><p>From smart Anchor 3G lifts to electrical solutions and construction aggregates, BHLISS Enterprises supports the essential elements of modern projects.</p><div className="hero-actions"><Button to="/contact">Discuss your project</Button><Link className="hero-text-link" to="/about">Get to know us <ArrowRight/></Link></div><div className="hero-stats"><div><b>03</b><span>Business sectors</span></div><div><b>360°</b><span>Project perspective</span></div><div><b>01</b><span>Committed partner</span></div></div></motion.div><div className="hero-badge"><span>BE</span><small>BUILT FOR<br/>WHAT'S NEXT</small></div></div><div className="hero-scroll">SCROLL TO DISCOVER <i/></div></section>
  <section className="intro-section section-pad"><div className="container intro-grid"><div><Eyebrow>WHO WE ARE</Eyebrow><h2>One trusted name.<br/><span>Three essential</span><br/>sectors.</h2></div><div className="intro-text"><p className="large">BHLISS Enterprises brings together specialist lift solutions, electrical works and construction materials under one dependable name.</p><p>We believe good projects begin with clear communication, practical solutions and a partner who understands what matters. Our focus is to make sourcing and service coordination more straightforward for our customers.</p><Button to="/about">Discover BHLISS</Button></div></div></section>
  <section className="sectors-section section-pad" id="sectors"><div className="container"><SectionTitle kicker="OUR BUSINESS VERTICALS" title="Essential services. Thoughtfully connected." copy="Choose a sector to explore our capabilities, service categories and product range."/><div className="service-grid">{sectors.map(s=><ServiceCard item={s} key={s.path}/>)}</div></div></section>
  <section className="partner-section"><div className="container partner-grid"><div className="partner-image"><img src={anchorLogo} alt="Anchor 3G lift logo"/></div><div><Eyebrow>OUR LIFT BRAND</Eyebrow><h2>A better way to move<br/><span>with Anchor 3G.</span></h2><p>Our lift solutions focus specifically on Anchor 3G lifts, with options for commercial, residential, hospital, institutional and industrial settings.</p><Button to="/lifts">Explore Anchor 3G lifts</Button></div></div></section>
  <section className="why-section section-pad"><div className="container"><SectionTitle kicker="THE BHLISS APPROACH" title="A practical partner for important work."/><div className="why-grid"><article><ShieldCheck/><h3>Dependable approach</h3><p>Clear expectations, responsive communication and a focus on reliable execution.</p></article><article><Layers3/><h3>Connected capabilities</h3><p>Three complementary sectors that support a wide range of building and project needs.</p></article><article><Sparkles/><h3>Customer-first service</h3><p>We listen to your requirement and help you navigate the right service category.</p></article></div></div></section>
  <SectorGallery/>
  <ContactStrip/>
 </main>
}
function Detail({type}){
 const item=sectors.find(x=>x.path===`/${type}`);
 const isLift=type==='lifts',isElec=type==='electrical';
 const list=isLift?liftItems:isElec?elecItems:aggregateItems;
 const banner=isLift?liftsImage:isElec?electricalImage:aggregatesImage;
 const Icon=item.icon;
 const description=isLift?'Lift options for different building types and movement needs, with Anchor 3G as our dedicated lift brand.':isElec?'Electrical service categories for homes, businesses and industrial facilities, shaped around practical project requirements.':'Construction materials to support concrete, building and infrastructure works, with key aggregate sizes and manufactured sand.';
 return <main className="detail-page"><section className="detail-hero" style={{backgroundImage:`linear-gradient(90deg,#171a1df0 0%,#171a1ddc 55%,#171a1d50 100%),url(${banner})`}}><div className="container detail-hero-content"><Link to="/" className="back-link">← Back to home</Link><Eyebrow light>{item.tag}</Eyebrow><h1>{item.title}<br/><span>by BHLISS.</span></h1><p>{description}</p><Button to="/contact">Enquire about this sector</Button></div></section>
 <section className="detail-overview section-pad"><div className="container detail-overview-grid"><div><Eyebrow>WHAT WE OFFER</Eyebrow><h2>{isLift?'Solutions for every vertical journey.':isElec?'Powering spaces with purpose.':'The materials behind stronger builds.'}</h2><p>{item.desc}</p>{isLift&&<div className="brand-lockup"><img src={anchorLogo} alt="Anchor 3G lift logo"/></div>}</div><div className="detail-list"><div className="list-head"><span>OUR RANGE</span><span>{String(list.length).padStart(2,'0')} CATEGORIES</span></div>{list.map(([name,desc,Icon],i)=><article className="range-row" key={name}><span className="range-num">0{i+1}</span><div className="range-icon"><Icon/></div><div className="range-copy"><h3>{name}</h3><p>{desc}</p></div><ChevronRight/></article>)}</div></div></section>
 <section className="detail-image-section"><div className="container image-feature"><img src={banner} alt={`${item.title} project visual`}/><div><Eyebrow>BUILT AROUND YOUR REQUIREMENT</Eyebrow><h2>Let's find the right fit for your project.</h2><p>Tell us about the site, building type, quantity or service scope. Our team can help direct your enquiry to the right business vertical.</p><Button to="/contact">Talk to our team</Button></div></div></section><ContactStrip/></main>
}
function About(){return <main><section className="inner-hero" style={{backgroundImage:`linear-gradient(90deg,#171a1df0,#171a1d75),url(${photo('photo-1487958449943-2429e8be8625',1800)})`}}><div className="container"><Eyebrow light>ABOUT BHLISS ENTERPRISES</Eyebrow><h1>Built on trust.<br/><span>Focused on progress.</span></h1><p>A multi-sector enterprise bringing together lift solutions, electrical works and construction aggregates.</p></div></section><section className="section-pad about-story"><div className="container about-grid"><div><Eyebrow>OUR STORY & APPROACH</Eyebrow><h2>Three sectors.<br/>One committed partner.</h2></div><div><p className="large">BHLISS Enterprises is built around a simple idea: make essential project solutions easier to access through clear communication and a dependable approach.</p><p>Our business spans Anchor 3G lifts, electrical services for residential, commercial and industrial requirements, and construction aggregates including M-Sand and graded stone products. Each vertical serves a different need, connected by our commitment to service.</p></div></div></section><section className="about-values"><div className="container"><SectionTitle kicker="WHAT GUIDES US" title="The principles behind the name."/><div className="values-grid"><article><CheckCircle2/><h3>Integrity</h3><p>Transparent conversations and honest expectations at every stage.</p></article><article><ShieldCheck/><h3>Reliability</h3><p>A consistent, responsive approach to customer requirements.</p></article><article><Wrench/><h3>Practicality</h3><p>Solutions shaped around the real needs of buildings and projects.</p></article></div></div></section><section className="about-sectors section-pad"><div className="container"><SectionTitle kicker="OUR BUSINESS" title="What we bring together."/><div className="service-grid">{sectors.map(s=><ServiceCard item={s} key={s.path}/>)}</div></div></section><ContactStrip/></main>}
function Contact(){return <main><section className="inner-hero contact-hero" style={{backgroundImage:`linear-gradient(90deg,#171a1df0,#171a1d65),url(${photo('photo-1497366811353-6870744d04b2',1800)})`}}><div className="container"><Eyebrow light>CONTACT BHLISS ENTERPRISES</Eyebrow><h1>Let's start a<br/><span>conversation.</span></h1><p>Tell us what you're planning. We’ll help you connect with the right team.</p></div></section><section className="section-pad contact-page"><div className="container contact-page-grid"><div><Eyebrow>CONTACT INFORMATION</Eyebrow><h2>We'd be glad<br/>to hear from you.</h2><div className="contact-info"><a href={`tel:${company.phone}`}><Phone/><span><small>CALL US</small><b>{company.phones[0]} / {company.phones[1]}</b></span></a><a href={`mailto:${company.email}`}><Mail/><span><small>EMAIL US</small><b>{company.email}</b></span></a><a href={company.mapsUrl} target="_blank" rel="noreferrer"><MapPin/><span><small>FIND US</small><b>{company.address}</b></span></a></div><a className="map-card" href={company.mapsUrl} target="_blank" rel="noreferrer"><div><MapPin/><b>View our location</b><span>Open directions in Google Maps</span></div><ArrowUpRight/></a></div><div className="contact-form-wrap"><Eyebrow>ENQUIRY FORM</Eyebrow><h3>How can we help?</h3><p>Share a few details and our team can follow up.</p><EnquiryForm/></div></div></section></main>}
function ScrollManager(){const loc=useLocation();useEffect(()=>{if(loc.hash){setTimeout(()=>document.querySelector(loc.hash)?.scrollIntoView({behavior:'smooth'}),100)}else window.scrollTo({top:0,behavior:'smooth'})},[loc]);return null}
export default function App(){return <><ScrollManager/><Header/><Routes><Route path="/" element={<Home/>}/><Route path="/lifts" element={<Detail type="lifts"/>}/><Route path="/electrical" element={<Detail type="electrical"/>}/><Route path="/aggregates" element={<Detail type="aggregates"/>}/><Route path="/about" element={<About/>}/><Route path="/contact" element={<Contact/>}/><Route path="*" element={<Home/>}/></Routes><Footer/><button className="to-top" onClick={()=>window.scrollTo({top:0,behavior:'smooth'})} aria-label="Back to top"><MoveUp/></button></>}
