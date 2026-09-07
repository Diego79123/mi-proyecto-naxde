'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Code2, Layers, ChartNoAxesCombined, Cloud, ShieldCheck, Zap, MousePointer2 } from 'lucide-react';
import s from './UniverseDetails.module.css';

export function UniverseShowcase({ kind = 'web' }: { kind?: 'web' | 'app' }) {
  const [interactive, setInteractive] = useState(false);
  const web = kind === 'web';
  const screen = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!screen.current) return;
    const el = screen.current;
    const resize = () => el.style.setProperty('--screen-scale', String(el.clientWidth / (web ? 1000 : 650)));
    const observer = new ResizeObserver(resize); observer.observe(el); resize();
    return () => observer.disconnect();
  }, [web]);
  const points = web ? [
    { icon: MousePointer2, title: 'Conversión con intención', text: 'Cada interacción acerca a tus clientes a lo que buscan.' },
    { icon: Layers, title: 'Experiencias inmersivas', text: 'Movimiento, profundidad e interfaces que invitan a explorar.' },
    { icon: Code2, title: 'Código que responde', text: 'Estructura cuidada para rendimiento, accesibilidad y SEO.' },
    { icon: ChartNoAxesCombined, title: 'Decisiones con datos', text: 'Analítica para comprender y mejorar la experiencia.' },
  ] : [
    { icon: Cloud, title: 'Preparada para crecer', text: 'Infraestructura cloud que evoluciona con tu operación.' },
    { icon: Zap, title: 'Todo fluye', text: 'Procesos conectados en una interfaz clara y ágil.' },
    { icon: ShieldCheck, title: 'Datos bajo control', text: 'Permisos y acceso diseñados alrededor de tu negocio.' },
  ];
  return <section data-flight="drift" className={`${s.showcase} ${web ? s.web : s.app}`}>
    <div className={s.showcaseHeading}><p>{web ? '02 / TU MARCA, EN OTRA DIMENSIÓN' : '03 / EL MOTOR DETRÁS DE TU NEGOCIO'}</p><h2>{web ? <>QUE TE VEAN.<br /><em>QUE TE RECUERDEN.</em></> : <>LA COMPLEJIDAD,<br /><em>RESUELTA.</em></>}</h2><span>{web ? 'De una primera impresión a una experiencia que conecta.' : 'Aplicaciones que convierten procesos dispersos en un mismo sistema.'}</span></div>
    <div className={s.exhibit}>
      <div className={`${s.device} ${interactive ? s.interactive : ''}`}><div className={s.deviceBar}><i /><i /><i /><span>{web ? 'NAXDE / WEB EXPERIENCE' : 'NAXDE / BUSINESS APPLICATION'}</span></div><div ref={screen} className={s.screen}><iframe src={`/preview/${web ? 'web' : 'app'}-design?mode=mockup`} title={web ? 'Demostración de experiencia web Naxde' : 'Demostración de aplicación de gestión Naxde'} loading="lazy" tabIndex={interactive ? 0 : -1} style={{ pointerEvents: interactive ? 'auto' : 'none' }} /></div></div>
      <div className={s.annotations}>{points.map(({ icon: Icon, title, text }, i) => <article key={title}><span className={s.annotationNumber}>0{i + 1}</span><Icon size={22} /><h3>{title}</h3><p>{text}</p></article>)}</div>
    </div>
    <div className={s.showcaseActions}><button onClick={() => setInteractive(!interactive)} aria-pressed={interactive}>{interactive ? 'Salir de la demostración' : 'Interactuar con la demostración'} <MousePointer2 size={16} /></button><Link href={web ? '/sitios-web' : '/servicios'}>{web ? 'Explorar diseño web' : 'Explorar aplicaciones'} <ArrowUpRight size={17} /></Link></div>
  </section>;
}

export function NaxdeDNA() {
  return <section className={s.dna} data-flight="drift"><p>01 / EL ORIGEN DE LO QUE HACEMOS</p><h2>ADN <span>NAXDE.</span></h2><div className={s.dnaBody}><div className={s.signal} aria-hidden="true"><span>CREA</span><span>CONECTA</span><span>AVANZA</span><i /><i /><i /></div><div><h3>Creatividad que se siente.<br />Tecnología que resuelve.</h3><p>Somos un ecosistema de producción digital que da vida a tus ideas con diseño, software y experiencias inmersivas.</p><p>Reunimos creativos, estrategas y tecnólogos para resolver problemas complejos con soluciones a medida. De Latinoamérica a Europa, construimos junto a las personas que quieren llevar su negocio más lejos.</p><Link href="/sobre-nosotros">Conoce al equipo detrás de la idea <ArrowUpRight size={18} /></Link></div></div></section>;
}
