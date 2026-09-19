import {useEffect,useRef,useState} from 'react';
import {MonitorSmartphone,ReceiptText,QrCode,UtensilsCrossed,ScanLine,Sparkles} from 'lucide-react';
import './showcase-v2.css';

const scenes=[
 {k:'POS',n:'01',title:'Продажа начинается здесь.',text:'Простая касса для магазина или ресторана. Быстро, понятно и без лишнего интерфейса.',Icon:MonitorSmartphone},
 {k:'HDM',n:'02',title:'Продажа становится чеком.',text:'Фискализация встроена в рабочий процесс и не требует отдельного сценария.',Icon:ReceiptText},
 {k:'QR',n:'03',title:'Оплата подключается.',text:'QR-оплата становится естественной частью продажи и связывается с заказом.',Icon:QrCode},
 {k:'RESTAURANT',n:'04',title:'Ресторан работает вместе.',text:'Зал, кухня, официант, касса и печать работают как одна система.',Icon:UtensilsCrossed},
 {k:'SMART MENU',n:'05',title:'Меню понимает гостя.',text:'Аллергены, калории и удобное цифровое меню дополняют основной процесс.',Icon:ScanLine},
];

export default function ShowcaseV2(){
 const root=useRef<HTMLElement>(null);const [active,setActive]=useState(0);const [progress,setProgress]=useState(0);
 useEffect(()=>{let raf=0;const update=()=>{raf=0;if(!root.current)return;const r=root.current.getBoundingClientRect();const travel=Math.max(1,root.current.offsetHeight-innerHeight);const p=Math.max(0,Math.min(1,-r.top/travel));setProgress(p);setActive(Math.min(scenes.length-1,Math.floor(p*scenes.length+.12)))};const onScroll=()=>{if(!raf)raf=requestAnimationFrame(update)};update();addEventListener('scroll',onScroll,{passive:true});addEventListener('resize',onScroll);return()=>{removeEventListener('scroll',onScroll);removeEventListener('resize',onScroll);if(raf)cancelAnimationFrame(raf)}},[]);
 const scene=scenes[active],Icon=scene.Icon;
 return <section className="showcase-v2" ref={root} id="story"><div className="showcase-sticky">
  <div className="showcase-top"><span>CIA SYSTEM · 01—05</span><strong>Одна система. Пять процессов.</strong><span>{String(active+1).padStart(2,'0')} / 05</span></div>
  <div className="showcase-canvas">
   <div className="showcase-copy" key={'copy'+active}><span>{scene.n} · {scene.k}</span><h2>{scene.title}</h2><p>{scene.text}</p></div>
   <div className="showcase-object" key={'object'+active}><div className="object-halo"/><div className="object-card"><Icon/><small>{scene.k}</small></div><i className="orbit o1"/><i className="orbit o2"/><i className="orbit o3"/></div>
   <div className="showcase-side"><span>CONNECTED</span><b>CIA<br/>SOFT</b><Sparkles/></div>
  </div>
  <div className="showcase-nav">{scenes.map((s,i)=><button key={s.k} className={i===active?'active':''} onClick={()=>{if(!root.current)return;const y=root.current.offsetTop+(i/(scenes.length-1))*(root.current.offsetHeight-innerHeight);scrollTo({top:y,behavior:'smooth'})}}><span>{s.n}</span>{s.k}</button>)}</div>
  <div className="showcase-progress"><i style={{transform:`scaleX(${progress})`}}/></div>
 </div></section>
}
