import React from 'react';
import ReactDOM from 'react-dom/client';
import {App} from './App';
import {ClientsSection} from './ClientsSection';
import './styles.css';
import './mobile-story.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode><App/></React.StrictMode>
);

function mountClients(){
  if(document.getElementById('clients-root')) return true;
  const solutions=document.querySelector('.solutions');
  if(!solutions) return false;
  const host=document.createElement('div');
  host.id='clients-root';
  solutions.insertAdjacentElement('afterend',host);
  ReactDOM.createRoot(host).render(<React.StrictMode><ClientsSection/></React.StrictMode>);
  return true;
}

if(!mountClients()){
  const observer=new MutationObserver(()=>{
    if(mountClients()) observer.disconnect();
  });
  observer.observe(document.getElementById('root')!,{childList:true,subtree:true});
}
