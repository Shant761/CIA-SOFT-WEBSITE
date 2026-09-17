import {useEffect,useState} from 'react';
import './intro.css';

const particles=Array.from({length:14},(_,i)=>i);
export function Intro(){
  const [done,setDone]=useState(false);
  useEffect(()=>{
    document.documentElement.classList.add('intro-active');
    const timer=window.setTimeout(()=>{
      setDone(true);
      document.documentElement.classList.remove('intro-active');
    },5200);
    return()=>{window.clearTimeout(timer);document.documentElement.classList.remove('intro-active')};
  },[]);
  if(done)return null;
  return <div className="site-intro seed-intro" aria-hidden="true">
    <div className="seed-fall"><span className="seed-core"/></div>
    <div className="seed-impact"/>
    <div className="seed-particles">{particles.map(i=><i key={i} style={{'--i':i} as React.CSSProperties}/>)}</div>
    <div className="welcome-copy"><span>WELCOME</span><strong>CIA SOFT</strong><small>PEOPLE · IDEAS · SOLUTIONS</small></div>
  </div>
}
