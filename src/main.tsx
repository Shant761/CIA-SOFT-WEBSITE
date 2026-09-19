import React from 'react';
import ReactDOM from 'react-dom/client';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {App} from './App';
import {Intro} from './Intro';
import {ClientsSection} from './ClientsSection';
import {ServicesDetail,ContactForm} from './CommercialSections';
import ShowcaseV2 from './ShowcaseV2';
import './styles.css';
import './commercial.css';
import './clients-images.css';
import './flow-fix.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><><Intro/><App/></></React.StrictMode>);

let layoutRefreshScheduled=false;
function refreshScrollLayout(){
  if(layoutRefreshScheduled)return;
  layoutRefreshScheduled=true;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    layoutRefreshScheduled=false;
    ScrollTrigger.refresh(true);
  }));
}

function mountShowcaseV2(){
  const oldIntro=document.querySelector<HTMLElement>('.story-intro');
  const oldFlow=document.querySelector<HTMLElement>('.growth-story');
  const trust=document.querySelector<HTMLElement>('.trust');
  if(!trust)return false;
  oldIntro?.setAttribute('data-v2-hidden','true');
  oldFlow?.setAttribute('data-v2-hidden','true');
  if(!document.getElementById('showcase-v2-root')){
    const host=document.createElement('div');
    host.id='showcase-v2-root';
    trust.parentElement?.insertBefore(host,trust);
    ReactDOM.createRoot(host).render(<React.StrictMode><ShowcaseV2/></React.StrictMode>);
    refreshScrollLayout();
    setTimeout(refreshScrollLayout,250);
  }
  return true;
}

function refreshAfterIntro(){
  refreshScrollLayout();
  const hash=window.location.hash;
  if(hash){
    const target=document.querySelector(hash);
    if(target) requestAnimationFrame(()=>target.scrollIntoView({block:'start'}));
  }
}

function mountCommercial(){
  const solutions=document.querySelector('.solutions');
  if(!solutions)return false;
  let changed=false;
  if(!document.getElementById('services-detail-root')){
    const host=document.createElement('div');host.id='services-detail-root';solutions.insertAdjacentElement('afterend',host);
    ReactDOM.createRoot(host).render(<React.StrictMode><ServicesDetail/></React.StrictMode>);changed=true;
  }
  const servicesHost=document.getElementById('services-detail-root');
  if(servicesHost&&!document.getElementById('clients-root')){
    const host=document.createElement('div');host.id='clients-root';servicesHost.insertAdjacentElement('afterend',host);
    ReactDOM.createRoot(host).render(<React.StrictMode><ClientsSection/></React.StrictMode>);changed=true;
  }
  const contactBox=document.querySelector('.contact-box');
  if(contactBox&&!document.getElementById('contact-form-root')){
    contactBox.innerHTML='';const host=document.createElement('div');host.id='contact-form-root';contactBox.appendChild(host);
    ReactDOM.createRoot(host).render(<React.StrictMode><ContactForm/></React.StrictMode>);changed=true;
  }
  if(changed){refreshScrollLayout();setTimeout(refreshScrollLayout,160);setTimeout(refreshScrollLayout,700)}
  return !!document.getElementById('clients-root')&&!!document.getElementById('contact-form-root');
}

function mountPreviewEnhancements(){
  const commercialReady=mountCommercial();
  const showcaseReady=mountShowcaseV2();
  return commercialReady&&showcaseReady;
}
if(!mountPreviewEnhancements()){
  const observer=new MutationObserver(()=>{if(mountPreviewEnhancements())observer.disconnect()});
  observer.observe(document.getElementById('root')!,{childList:true,subtree:true});
}

setTimeout(refreshAfterIntro,6350);
window.addEventListener('load',()=>{setTimeout(refreshScrollLayout,120);setTimeout(refreshScrollLayout,900)},{once:true});

document.addEventListener('click',event=>{
  const link=(event.target as HTMLElement).closest<HTMLAnchorElement>('a[href^="#"]');
  if(!link)return;
  const target=document.querySelector(link.getAttribute('href')!);
  if(!target)return;
  event.preventDefault();
  target.scrollIntoView({behavior:'smooth',block:'start'});
});

let stableWidth=window.innerWidth;
let stableHeight=window.innerHeight;
window.addEventListener('orientationchange',()=>setTimeout(refreshScrollLayout,260),{passive:true});
window.addEventListener('resize',()=>{
  const nextWidth=window.innerWidth,nextHeight=window.innerHeight;
  const desktop=nextWidth>=768;
  const widthChanged=Math.abs(nextWidth-stableWidth)>24;
  const heightChanged=Math.abs(nextHeight-stableHeight)>80;
  if(widthChanged||(desktop&&heightChanged)){
    stableWidth=nextWidth;stableHeight=nextHeight;
    setTimeout(refreshScrollLayout,120);
  }
},{passive:true});
