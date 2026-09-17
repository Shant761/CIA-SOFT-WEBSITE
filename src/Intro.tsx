import {useCallback,useEffect,useState} from 'react';
import './intro.css';

const particles=Array.from({length:14},(_,i)=>i);
const INTRO_MAX_MS=6200;

export function Intro(){
  const [done,setDone]=useState(false);
  const finish=useCallback(()=>{
    setDone(true);
    document.documentElement.classList.remove('intro-active');
  },[]);

  useEffect(()=>{
    document.documentElement.classList.add('intro-active');

    // JS is the primary exit path. animationend is an additional guard so the
    // visual overlay cannot remain mounted after its CSS exit animation.
    const timer=window.setTimeout(finish,INTRO_MAX_MS);
    const emergencyTimer=window.setTimeout(finish,INTRO_MAX_MS+1200);

    return()=>{
      window.clearTimeout(timer);
      window.clearTimeout(emergencyTimer);
      document.documentElement.classList.remove('intro-active');
    };
  },[finish]);

  if(done)return null;
  return <div
    className="site-intro seed-intro"
    aria-hidden="true"
    onAnimationEnd={event=>{
      if(event.animationName==='introOut')finish();
    }}
    onClick={finish}
  >
    <div className="seed-fall"><span className="seed-core"/></div>
    <div className="seed-impact"/>
    <div className="seed-particles">{particles.map(i=><i key={i} style={{'--i':i} as React.CSSProperties}/>)}</div>
    <div className="intro-tree">
      <i className="tree-trunk"/>
      <i className="tree-branch b1"/><i className="tree-branch b2"/><i className="tree-branch b3"/><i className="tree-branch b4"/>
      <i className="tree-leaf l1"/><i className="tree-leaf l2"/><i className="tree-leaf l3"/><i className="tree-leaf l4"/><i className="tree-leaf l5"/><i className="tree-leaf l6"/>
    </div>
    <div className="welcome-copy"><span>WELCOME</span><strong>CIA SOFT</strong><small>PEOPLE · IDEAS · SOLUTIONS</small></div>
  </div>
}
