import {useEffect,useState} from 'react';
import './intro.css';

const nodes=['POS','HDM','QR','PRINT','MOBILE','MENU'];
export function Intro(){
  const [done,setDone]=useState(false);
  useEffect(()=>{
    document.documentElement.classList.add('intro-active');
    const timer=window.setTimeout(()=>{
      setDone(true);
      document.documentElement.classList.remove('intro-active');
    },2100);
    return()=>{window.clearTimeout(timer);document.documentElement.classList.remove('intro-active')};
  },[]);
  if(done)return null;
  return <div className="site-intro boot-intro" aria-hidden="true">
    <div className="boot-network">
      <div className="boot-rail"/>
      {nodes.map((n,i)=><div className={`boot-node boot-node-${i+1}`} key={n}><i/><span>{n}</span></div>)}
      <div className="boot-pulse"/>
    </div>
    <div className="intro-brand boot-brand"><strong>CIA SOFT</strong><span>PEOPLE · IDEAS · SOLUTIONS</span></div>
    <div className="intro-status"><i/> SYSTEM CONNECTED</div>
  </div>
}
