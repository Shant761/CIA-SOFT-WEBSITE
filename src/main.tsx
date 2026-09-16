import React from 'react';
import ReactDOM from 'react-dom/client';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {App} from './App';
import {ClientsSection} from './ClientsSection';
import {ServicesDetail,ContactForm} from './CommercialSections';
import './styles.css';
import './commercial.css';

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App/></React.StrictMode>);

let layoutRefreshScheduled=false;
function refreshScrollLayout(){
  if(layoutRefreshScheduled)return;
  layoutRefreshScheduled=true;
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    layoutRefreshScheduled=false;
    // The commercial sections are mounted after App. Their height moves CIA FLOW
    // down the page, so its cached ScrollTrigger start/end must be recalculated.
    ScrollTrigger.refresh(true);
  }));
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
  if(changed){
    // React roots paint asynchronously. Refresh after the first paint and once
    // more after fonts/images/layout have had time to settle on slower phones.
    refreshScrollLayout();
    setTimeout(refreshScrollLayout,160);
    setTimeout(refreshScrollLayout,700);
  }
  return !!document.getElementById('clients-root')&&!!document.getElementById('contact-form-root');
}
if(!mountCommercial()){
  const observer=new MutationObserver(()=>{if(mountCommercial())observer.disconnect()});
  observer.observe(document.getElementById('root')!,{childList:true,subtree:true});
}

// Mobile browser chrome changes viewport height during normal scrolling. Do not
// refresh for those height-only changes: that would make the drop jump ahead.
let stableWidth=window.innerWidth;
window.addEventListener('orientationchange',()=>setTimeout(refreshScrollLayout,220),{passive:true});
window.addEventListener('resize',()=>{
  const nextWidth=window.innerWidth;
  if(Math.abs(nextWidth-stableWidth)>40){stableWidth=nextWidth;setTimeout(refreshScrollLayout,100)}
},{passive:true});
