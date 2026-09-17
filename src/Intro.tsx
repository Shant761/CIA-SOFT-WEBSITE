import {useEffect,useState} from 'react';
import './intro.css';

export function Intro(){
  const [done,setDone]=useState(false);
  useEffect(()=>{
    document.documentElement.classList.add('intro-active');
    const timer=window.setTimeout(()=>{
      setDone(true);
      document.documentElement.classList.remove('intro-active');
    },2200);
    return()=>{window.clearTimeout(timer);document.documentElement.classList.remove('intro-active')};
  },[]);
  if(done)return null;
  return <div className="site-intro" aria-hidden="true">
    <div className="intro-line"/>
    <div className="intro-brand">
      <strong>CIA SOFT</strong>
      <span>PEOPLE · IDEAS · SOLUTIONS</span>
    </div>
    <div className="intro-status"><i/> SYSTEM READY</div>
  </div>
}
