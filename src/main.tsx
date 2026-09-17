import React from 'react';
import ReactDOM from 'react-dom/client';
import {ScrollTrigger} from 'gsap/ScrollTrigger';
import {App} from './App';
import {Intro} from './Intro';
import {ClientsSection} from './ClientsSection';
import {ServicesDetail,ContactForm} from './CommercialSections';
import './styles.css';
import './commercial.css';
import './clients-images.css';

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
if(!mountCommercial()){
  const observer=new MutationObserver(()=>{if(mountCommercial())observer.disconnect()});
  observer.observe(document.getElementById('root')!,{childList:true,subtree:true});
}
let stableWidth=window.innerWidth;
window.addEventListener('orientationchange',()=>setTimeout(refreshScrollLayout,220),{passive:true});
window.addEventListener('resize',()=>{
  const nextWidth=window.innerWidth;
  if(Math.abs(nextWidth-stableWidth)>40){stableWidth=nextWidth;setTimeout(refreshScrollLayout,100)}
},{passive:true});
