'use client';
import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowUp, Orbit } from 'lucide-react';
import { useFirestore } from '@/firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import s from './UniverseFooter.module.css';
const columns = [
  { title: 'ECOSISTEMA', links: [['Software a medida', '/servicios'], ['Web & e-commerce', '/sitios-web'], ['NeoCard · identidad NFC', '/tarjetas-neocard'], ['Social AI', '/asistente']] },
  { title: 'NAXDE', links: [['Nuestro equipo', '/sobre-nosotros'], ['Proyectos', '/proyectos'], ['Cómo trabajamos', '/#metodo'], ['Iniciar un proyecto', '/contacto']] },
  { title: 'EXPLORA', links: [['Experiencia web', '/preview/web-design'], ['Aplicaciones', '/preview/app-design'], ['Probar una NeoCard', '/tarjetas-neocard/oscar-rivera'], ['Ayuda y consultas', '/contacto']] },
];
export function Footer() {
  const db = useFirestore();
  const [state, setState] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  async function subscribe(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (state === 'sending') return;
    const form = event.currentTarget;
    const email = String(new FormData(form).get('email') || '').trim();
    setState('sending');
    try {
      await addDoc(collection(db, 'leads'), { name: 'Solicitud de boletín', email, message: 'Deseo recibir novedades de Naxde por correo.', source: 'newsletter', status: 'new', consent: true, createdAt: serverTimestamp() });
      setState('success'); form.reset();
    } catch { setState('error'); }
  }
  return <footer className={s.footer}>
    <div className={s.top}><div className={s.brand}><Link href="/" aria-label="Naxde, inicio"><img src="https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Logos%2FLogo%20naxde.png?alt=media&token=1df1f19b-978a-4f23-8f2f-d0d9efb42764" alt="Naxde" width="170" height="48" /></Link><p>Ideas que conectan.<br />Tecnología que transforma.<br />Un equipo que avanza contigo.</p><span>LATINOAMÉRICA ↔ EUROPA</span></div>
    <div className={s.newsletter}><Orbit size={32} /><p className={s.eyebrow}>MANTENTE EN ÓRBITA</p><h3>Únete al pulso<br />tecnológico.</h3><p>Ideas, proyectos y novedades de nuestro universo digital.</p><form onSubmit={subscribe}><label htmlFor="newsletter-email" className="sr-only">Correo electrónico</label><div className={s.inputRow}><input id="newsletter-email" name="email" type="email" placeholder="tu@empresa.com" required maxLength={254} autoComplete="email" disabled={state === 'sending'} /><button disabled={state === 'sending'} type="submit">{state === 'sending' ? 'Enviando…' : 'Suscribirme'}<ArrowUpRight size={20} /></button></div><label className={s.consent}><input type="checkbox" required />Quiero recibir novedades de Naxde por correo. Puedo solicitar la baja escribiendo al equipo.</label></form><p role="status" className={s.status}>{state === 'success' ? 'Hemos registrado tu solicitud. Gracias por conectar con Naxde.' : state === 'error' ? 'No pudimos registrar tu correo. Inténtalo de nuevo o escríbenos.' : ''}</p></div></div>
    <div className={s.columns}>{columns.map(column => <nav key={column.title} aria-label={column.title}><h4>{column.title}</h4>{column.links.map(([name, href]) => <Link href={href} key={name}>{name}</Link>)}</nav>)}<div><h4>CONECTEMOS</h4><a href="mailto:desarrollonaxde@gmail.com">desarrollonaxde@gmail.com</a><a href="tel:+34667904826">Europa · +34 667 90 48 26</a><a href="https://wa.me/573194254196" target="_blank" rel="noopener noreferrer">LATAM · +57 319 425 4196 ↗</a><details><summary>Sobre tus datos</summary><p>Usamos los datos que envías para responder tu consulta o registrar tu interés en nuestras novedades. Para consultar tus datos o solicitar su eliminación, escribe a desarrollonaxde@gmail.com.</p></details></div></div>
    <div className={s.bottom}><span>© {new Date().getFullYear()} NAXDE</span><span>CREA. CONECTA. AVANZA.</span><button onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })}>Volver al inicio <ArrowUp size={15} /></button></div>
  </footer>;
}
