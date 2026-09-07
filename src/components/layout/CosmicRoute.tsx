'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Pause, Play } from 'lucide-react';
import { SpaceAtmosphere } from '@/components/sections/SpaceAtmosphere';
import s from './CosmicRoute.module.css';

const destinations = {
  about: { number: '01', label: 'NOSOTROS / LA TRIPULACIÓN', lines: ['DISTINTAS MENTES.', 'UNA MISMA', 'ÓRBITA.'], text: 'Ingenieros, diseñadores y estrategas. Conectamos nuestra experiencia con tu visión para construir lo que viene.', next: '/servicios', cta: 'Descubre lo que hacemos', coordinates: 'CREATIVIDAD · ESTRATEGIA · TECNOLOGÍA' },
  services: { number: '02', label: 'SERVICIOS / LAS POSIBILIDADES', lines: ['TU RETO.', 'NUESTRO', 'PUNTO DE PARTIDA.'], text: 'Software, diseño, automatización e inteligencia artificial. Un ecosistema de soluciones alrededor de tu negocio.', next: '/contacto', cta: 'Cuéntanos tu reto', coordinates: 'DISEÑAR · CONECTAR · CONSTRUIR' },
  web: { number: '03', label: 'WEB / TU VENTANA AL MUNDO', lines: ['NO PASES', 'DESAPERCIBIDO.'], text: 'Experiencias web que expresan quién eres y hacen sencillo elegirte. Desde tu sitio corporativo hasta tu tienda online.', next: '/contacto', cta: 'Diseñemos tu próxima web', coordinates: 'EXPERIENCIA · RENDIMIENTO · CONVERSIÓN' },
  neo: { number: '04', label: 'NEOCARD / CONEXIONES REALES', lines: ['EL PRIMER TOQUE.', 'EL COMIENZO', 'DE ALGO GRANDE.'], text: 'Tu identidad profesional, lista para conectar. Comparte tu marca y tus canales en una experiencia digital que puedes llevar contigo.', next: '/tarjetas-neocard/oscar-rivera', cta: 'Probar una NeoCard', coordinates: 'IDENTIDAD · NFC · CONEXIÓN' },
  projects: { number: '06', label: 'PROYECTOS / UNIVERSOS CONSTRUIDOS', lines: ['LAS IDEAS', 'SE DEMUESTRAN.'], text: 'Explora las aplicaciones, los sitios web y las identidades digitales que hemos convertido en experiencias.', next: '/contacto', cta: 'Construyamos el próximo', coordinates: 'EXPLORA · INTERACTÚA · IMAGINA' },
  contact: { number: '07', label: 'CONTACTO / ABRAMOS LA COMUNICACIÓN', lines: ['LA DISTANCIA', 'ES SOLO', 'UNA COORDENADA.'], text: 'Desde Latinoamérica y Europa, estamos listos para escucharte. Cuéntanos tu idea, el reto que tienes o lo que quieres transformar.', next: 'mailto:desarrollonaxde@gmail.com', cta: 'Escríbenos directamente', coordinates: 'LATINOAMÉRICA ↔ EUROPA' },
};
export type Destination = keyof typeof destinations;

export function CosmicBackdrop() {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(media.matches); sync(); media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('[data-cosmic-route]');
    if (!root) return;
    root.dataset.motion = reduced || paused ? 'off' : 'on';
    const items = Array.from(root.querySelectorAll<HTMLElement>(':scope > section:not([data-route-hero])'));
    const flights = Array.from(root.querySelectorAll<HTMLElement>('[data-flight]'));
    if (reduced || paused) { items.forEach(el => el.classList.remove(s.reveal, s.visible)); flights.forEach(el => el.style.setProperty('--p', '.5')); return; }
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add(s.visible); observer.unobserve(entry.target); } }), { threshold: .04 });
    items.forEach(el => { el.classList.add(s.reveal); observer.observe(el); });
    let frame = 0;
    const drift = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => {
      flights.forEach(el => { const rect = el.getBoundingClientRect(); el.style.setProperty('--p', String(Math.min(1, Math.max(0, (innerHeight - rect.top) / (innerHeight + rect.height))))); });
    }); };
    window.addEventListener('scroll', drift, { passive: true }); drift();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); window.removeEventListener('scroll', drift); };
  }, [reduced, paused]);
  return <><SpaceAtmosphere paused={reduced || paused} /><button className={s.motion} disabled={reduced} aria-label={paused ? 'Activar movimiento' : 'Pausar animaciones'} aria-pressed={paused || reduced} onClick={() => setPaused(!paused)}>{paused || reduced ? <Play size={13} /> : <Pause size={13} />}<span>{reduced ? 'Movimiento reducido' : paused ? 'Activar movimiento' : 'Pausar movimiento'}</span></button></>;
}

export function CosmicHero({ destination }: { destination: Destination }) {
  const data = destinations[destination];
  const hero = useRef<HTMLElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => { cancelAnimationFrame(frame); frame = requestAnimationFrame(() => {
      const el = hero.current; if (!el) return;
      const off = el.closest<HTMLElement>('[data-cosmic-route]')?.dataset.motion === 'off';
      el.style.setProperty('--drift', off ? '0' : String(Math.min(1, Math.max(0, -el.getBoundingClientRect().top / el.offsetHeight))));
    }); };
    window.addEventListener('scroll', update, { passive: true }); update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', update); };
  }, []);
  return <section ref={hero} data-route-hero className={`${s.hero} ${s[destination]}`}><div className={s.geometry} aria-hidden="true"><i /><i /><i /><i /><span>{data.number}</span></div><div className={s.heroContent}><p className={s.eyebrow}>{data.label}</p><h1>{data.lines.map((line, i) => <span key={line} className={i === data.lines.length - 1 ? s.accent : ''}>{line}</span>)}</h1><div className={s.heroBottom}><p>{data.text}</p><Link href={data.next}>{data.cta}<ArrowUpRight size={23} /></Link></div></div><div className={s.metadata}><span><ArrowDown size={15} /> SIGUE EXPLORANDO</span><span>{data.coordinates}</span></div></section>;
}
