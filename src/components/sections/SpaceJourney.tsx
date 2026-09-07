'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Check, Pause, Play, Plus, Smartphone } from 'lucide-react';
import { Footer } from '@/components/layout/Footer';
import { TechnologyLogos } from './TechnologyLogos';
import { UniverseShowcase, NaxdeDNA } from './UniverseShowcase';
import { Header } from '@/components/layout/Header';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { SpaceAtmosphere } from './SpaceAtmosphere';
import { chapterOpacity, clampProgress, pinnedProgress } from '@/lib/space-motion';
import s from './SpaceJourney.module.css';

const chapters = [
  { id: 'despegue', label: 'El comienzo' },
  { id: 'orbita', label: 'Por qué Naxde' },
  { id: 'soluciones', label: 'Lo que creamos' },
  { id: 'neocard', label: 'NeoCard' },
  { id: 'metodo', label: 'Cómo lo hacemos' },
  { id: 'contacto', label: 'Tu próximo paso' },
];
const story = [
  { label: '01 / ENTENDEMOS TU VISIÓN', lines: ['TU IDEA.', 'NUESTRO', 'UNIVERSO.'], text: 'Una gran solución empieza por entenderte. Escuchamos tu negocio, tus retos y a las personas para las que vamos a construir.', note: 'Estrategia antes de escribir la primera línea.' },
  { label: '02 / CONECTAMOS LO QUE IMPORTA', lines: ['TODO', 'CONECTA.', 'TODO AVANZA.'], text: 'Diseño, software e inteligencia trabajando juntos. Conectamos tus herramientas y procesos para que tu empresa funcione como un mismo ecosistema.', note: 'Menos tareas aisladas. Más posibilidades.' },
  { label: '03 / CRECEMOS CONTIGO', lines: ['ROMPE', 'TU TECHO.', 'NO TU VISIÓN.'], text: 'La puesta en marcha es el comienzo. Acompañamos tu solución con soporte y evolución para responder a lo que tu negocio necesita después.', note: 'Un equipo que sigue a tu lado.' },
];
const services = [
  { name: 'Software a medida', number: '01', text: 'Aplicaciones web y móviles que responden a tu operación. Diseñamos sistemas internos, plataformas cloud e integraciones alrededor de tus necesidades.', tags: ['Aplicaciones web', 'Apps móviles', 'APIs & cloud'], href: '/servicios', cta: 'Explorar soluciones' },
  { name: 'Web & e-commerce', number: '02', text: 'Experiencias digitales que dan vida a tu marca y convierten el interés en una relación. Sitios corporativos y tiendas online pensados para las personas.', tags: ['Diseño web', 'Comercio electrónico', 'Experiencia móvil'], href: '/sitios-web', cta: 'Ver experiencias web' },
  { name: 'Inteligencia artificial', number: '03', text: 'Asistentes y agentes personalizados para atender consultas, acompañar tus ventas y ayudarte a trabajar con la información de tu negocio.', tags: ['Agentes IA', 'Atención inteligente', 'Análisis de datos'], href: '/asistente', cta: 'Conocer Social AI' },
  { name: 'Automatización', number: '04', text: 'Conectamos herramientas y eliminamos tareas repetitivas. Flujos para la gestión de clientes, pedidos, reportes y operaciones.', tags: ['n8n & Make', 'CRM', 'Flujos de trabajo'], href: '/contacto', cta: 'Hablemos de tus procesos' },
  { name: 'Marketing digital', number: '05', text: 'Tecnología, creatividad y estrategia para conectar tu propuesta con las personas adecuadas. Una presencia digital alineada con tu negocio.', tags: ['Estrategia', 'Contenido', 'Experiencias de marca'], href: '/contacto', cta: 'Impulsar mi marca' },
];
const method = [
  { title: 'Descubrimos.', text: 'Escuchamos, definimos objetivos y entendemos lo que tu empresa necesita resolver.', label: 'NEGOCIO + ESTRATEGIA' },
  { title: 'Diseñamos.', text: 'Damos forma a la experiencia y a la arquitectura que hará posible tu visión.', label: 'EXPERIENCIA + ARQUITECTURA' },
  { title: 'Construimos.', text: 'Desarrollamos y probamos la solución, cuidando calidad, seguridad y rendimiento.', label: 'DESARROLLO + VALIDACIÓN' },
  { title: 'Evolucionamos.', text: 'Acompañamos el lanzamiento, damos soporte y mejoramos contigo.', label: 'IMPLEMENTACIÓN + SOPORTE' },
];

export function SpaceJourney() {
  const root = useRef<HTMLDivElement>(null);
  const voyage = useRef<HTMLDivElement>(null);
  const progressBar = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  const [active, setActive] = useState('despegue');
  const [interactive, setInteractive] = useState(false);
  const motionOff = reduced || paused;

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduced(preference.matches);
    sync(); setReady(true);
    preference.addEventListener('change', sync);
    return () => preference.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (!ready) return;
    const sections = Array.from(root.current?.querySelectorAll<HTMLElement>('[data-chapter]') ?? []);
    const flights = Array.from(root.current?.querySelectorAll<HTMLElement>('[data-flight]') ?? []);
    const phases = Array.from(root.current?.querySelectorAll<HTMLElement>('[data-phase]') ?? []);
    const orbit = root.current?.querySelector<HTMLElement>('#orbita');
    const reveals = Array.from(root.current?.querySelectorAll<HTMLElement>('[data-reveal]') ?? []);
    let frame = 0;
    const originalScroll = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = motionOff ? 'auto' : 'smooth';
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const vh = window.innerHeight;
        const rects = flights.map(el => el.getBoundingClientRect());
        const orbitRect = orbit?.getBoundingClientRect();
        if (voyage.current && orbitRect) {
          const travel = clampProgress(window.scrollY / Math.max(1, orbitRect.top + window.scrollY + orbitRect.height - vh));
          voyage.current.style.setProperty('--voyage', motionOff ? '0' : String(travel));
          voyage.current.style.opacity = motionOff ? '.3' : String(.65 * (1 - clampProgress((travel - .55) / .45)));
        }
        let chapter = 'despegue';
        sections.forEach(el => { if (el.getBoundingClientRect().top < vh * .5) chapter = el.id; });
        setActive(chapter);
        const docHeight = document.documentElement.scrollHeight - vh;
        if (progressBar.current) progressBar.current.style.transform = `scaleX(${clampProgress(window.scrollY / Math.max(1, docHeight))})`;
        flights.forEach((el, i) => {
          const rect = rects[i];
          const p = el.dataset.flight === 'pinned' ? pinnedProgress(rect.top, rect.height, vh) : clampProgress((vh - rect.top) / (vh + rect.height));
          el.style.setProperty('--p', motionOff ? '0' : String(p));
        });
        if (orbitRect) {
          const p = pinnedProgress(orbitRect.top, orbitRect.height, vh);
          const opacityValues = phases.map((_, i) => motionOff ? 1 : chapterOpacity(p, i, phases.length));
          const readableChapter = opacityValues.indexOf(Math.max(...opacityValues));
          phases.forEach((el, i) => {
            const opacity = opacityValues[i];
            el.style.opacity = String(opacity);
            el.style.visibility = opacity < .01 ? 'hidden' : 'visible';
            el.style.transform = motionOff ? 'none' : `translate3d(0, ${(0.45 - (p * phases.length - i)) * 60}px, 0)`;
            if (!motionOff && i !== readableChapter) el.setAttribute('aria-hidden', 'true'); else el.removeAttribute('aria-hidden');
          });
        }
      });
    };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add(s.revealed); observer.unobserve(entry.target); } });
    }, { threshold: .12 });
    reveals.forEach(el => observer.observe(el));
    const resizeObserver = new ResizeObserver(update);
    if (root.current) resizeObserver.observe(root.current);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => {
      cancelAnimationFrame(frame); observer.disconnect(); resizeObserver.disconnect();
      window.removeEventListener('scroll', update); window.removeEventListener('resize', update);
      document.documentElement.style.scrollBehavior = originalScroll;
    };
  }, [motionOff, ready]);

  return <div ref={root} className={`${s.universe} ${ready && !motionOff ? s.enhanced : s.still}`}>
    <a className={s.skip} href="#despegue">Saltar al contenido</a>
    <SpaceAtmosphere paused={!ready || motionOff} />
    <Header />
    <div ref={voyage} className={s.voyageBackdrop} aria-hidden="true"><img src="/space/planet.webp" width="1536" height="1024" alt="" fetchPriority="high" /></div>
    <div ref={progressBar} className={s.progress} aria-hidden="true" />
    <nav className={s.coordinates} aria-label="Capítulos del viaje">{chapters.map((chapter, i) => <a key={chapter.id} href={`#${chapter.id}`} aria-label={chapter.label} aria-current={active === chapter.id ? 'location' : undefined}><span>{chapter.label}</span><i /><small>0{i + 1}</small></a>)}</nav>
    <button className={s.motionControl} onClick={() => setPaused(v => !v)} aria-pressed={motionOff} disabled={reduced} aria-label={motionOff ? 'Activar animaciones' : 'Pausar animaciones'}>{motionOff ? <Play size={13} /> : <Pause size={13} />}<span>{reduced ? 'Movimiento reducido' : paused ? 'Activar movimiento' : 'Pausar movimiento'}</span></button>

    <main>
      <section id="despegue" data-chapter data-flight="pinned" className={s.hero}>
        <div className={s.heroStage}>
          <img className={s.heroRock} src="/space/asteroid.webp" alt="" width="1254" height="1254" aria-hidden="true" />
          <div className={s.heroText}>
            <p className={s.eyebrow}><span /> NAXDE · TECNOLOGÍA CON PROPÓSITO</p>
            <h1><span>EL FUTURO</span><span className={s.outline}>NO SE ESPERA.</span><span>SE <em>CONSTRUYE.</em></span></h1>
            <div className={s.heroFoot}><p>Software, diseño e inteligencia.<br />Un universo de posibilidades para tu negocio.</p><Link href="/contacto" className={s.circleLink}><span>INICIAR<br />UN PROYECTO</span><ArrowUpRight size={24} /></Link></div>
          </div>
          <div className={s.heroMeta}><a href="#orbita"><ArrowDown size={18} /> DESLIZA PARA EXPLORAR</a><span>LATINOAMÉRICA ↔ EUROPA</span><span>CREA. CONECTA. AVANZA.</span></div>
        </div>
      </section>

      <section id="orbita" data-chapter data-flight="pinned" className={s.story}>
        <div className={s.storyStage}>
          <img className={s.rockOne} src="/space/asteroid.webp" alt="" width="1254" height="1254" loading="lazy" aria-hidden="true" />
          <img className={s.rockTwo} src="/space/asteroid.webp" alt="" width="1254" height="1254" loading="lazy" aria-hidden="true" />
          <p className={s.sceneLabel}>POR QUÉ ELEGIRNOS / NUESTRO UNIVERSO</p>
          <div className={s.phases}>{story.map((chapter, i) => <article key={chapter.label} data-phase={i} className={s.phase}><p className={s.eyebrow}>{chapter.label}</p><h2>{chapter.lines.map((line, j) => <span key={line} className={j === 1 ? s.outline : ''}>{line}</span>)}</h2><div className={s.phaseCopy}><p>{chapter.text}</p><span><Plus size={14} />{chapter.note}</span></div></article>)}</div>
          <a href="#soluciones" className={s.sceneNext}>DESCUBRE LO QUE PODEMOS CREAR <ArrowDown size={16} /></a>
        </div>
      </section>

      <NaxdeDNA />

      <section id="soluciones" data-chapter data-flight="drift" className={s.services}>
        <div className={s.serviceIntro} data-reveal><p className={s.eyebrow}>DE LA VISIÓN A LA REALIDAD</p><h2>NO HAY DOS<br />IDEAS <em>IGUALES.</em></h2><p>Por eso construimos alrededor de la tuya.<br />Explora lo que podemos hacer por tu negocio.</p></div>
        <div className={s.servicesContent}>
          <span className={s.serviceVertical} aria-hidden="true">POSIBILIDADES INFINITAS</span>
          <Accordion type="single" defaultValue="01" collapsible className={s.serviceList}>{services.map(service => <AccordionItem key={service.number} value={service.number} className={s.serviceItem}><AccordionTrigger className={s.serviceTrigger}><span className={s.serviceNumber}>{service.number}</span><span>{service.name}</span></AccordionTrigger><AccordionContent className={s.serviceDetail}><p>{service.text}</p><div className={s.tags}>{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div><Link className={s.lineLink} href={service.href}>{service.cta}<ArrowUpRight size={18} /></Link></AccordionContent></AccordionItem>)}</Accordion>
        </div>
        <div className={s.technology}><span>TECNOLOGÍA PARA HACERLO POSIBLE</span><TechnologyLogos /></div>
      </section>

      <UniverseShowcase kind="web" />
      <UniverseShowcase kind="app" />

      <section id="neocard" data-chapter data-flight="pinned" className={`${s.neo} ${interactive ? s.interacting : ''}`}>
        <div className={s.neoStage}>
          <div className={s.neoWord} aria-hidden="true">CONECTA.</div>
          <div className={s.neoCopy}><p className={s.eyebrow}>NUESTRO UNIVERSO, EN TUS MANOS</p><h2>UN TOQUE.<br /><em>OTRO NIVEL.</em></h2><p>NeoCard convierte tu presentación profesional en una experiencia digital. Tu perfil, tus enlaces y tu marca, conectados en un solo lugar.</p><ul><li><Check size={16} />Identidad digital con tecnología NFC</li><li><Check size={16} />Tu información y canales de contacto</li><li><Check size={16} />Una experiencia que puedes probar</li></ul><Link href="/tarjetas-neocard" className={s.pillLink}>Explorar NeoCards <ArrowUpRight size={20} /></Link><Link href="/tarjetas-neocard/oscar-rivera" className={s.lineLink}>Abrir la demostración completa <ArrowUpRight size={17} /></Link></div>
          <div className={s.phoneScene}><div className={s.phone}><iframe src="/tarjetas-neocard/oscar-rivera?mode=mockup" title="NeoCard de Oscar Rivera, demostración interactiva" loading="lazy" tabIndex={interactive ? 0 : -1} style={{ pointerEvents: interactive ? 'auto' : 'none' }} />{!interactive && <button className={s.activate} onClick={() => setInteractive(true)}><Smartphone size={18} /> Probar NeoCard <ArrowUpRight size={17} /></button>}</div><button className={s.demoControl} onClick={() => setInteractive(v => !v)}>{interactive ? 'Pausar interacción' : 'Activar experiencia'}<ArrowUpRight size={15} /></button><span className={s.demoLabel}>NEOCARD / EXPERIENCIA REAL</span></div>
          <div className={s.neoOrbit} aria-hidden="true" />
        </div>
      </section>

      <section id="metodo" data-chapter data-flight="drift" className={s.method}>
        <div className={s.methodHeading}><p className={s.eyebrow}>UNA MISMA VISIÓN. UN CAMINO CLARO.</p><h2>NO VIAJAS<br /><em>SOLO.</em></h2><p>Creativos, estrategas y tecnólogos.<br />Un equipo que construye contigo.</p><Link className={s.lineLink} href="/sobre-nosotros">Conoce a Naxde <ArrowUpRight size={18} /></Link><span className={s.methodCross} aria-hidden="true">✳</span></div>
        <div className={s.methodSteps}>{method.map((step, i) => <article key={step.title} data-reveal><span className={s.stepNo}>0{i + 1}</span><div><p className={s.eyebrow}>{step.label}</p><h3>{step.title}</h3><p>{step.text}</p></div></article>)}</div>
      </section>

      <section className={s.work} data-flight="drift"><p className={s.eyebrow}>IDEAS QUE YA ESTÁN EN MOVIMIENTO</p><Link href="/proyectos" className={s.workLink}><span>EXPLORA<br />LO QUE <em>CREAMOS.</em></span><ArrowUpRight /></Link><p>Conoce nuestros proyectos, aplicaciones y experiencias digitales.</p></section>

      <section id="contacto" data-chapter data-flight="drift" className={s.contact}><div className={s.finalSignal} aria-hidden="true"><i /><i /><i /></div><div className={s.contactContent}><p className={s.eyebrow}>LA PRÓXIMA GRAN HISTORIA PUEDE SER LA TUYA</p><h2>HAGAMOS<br /><em>HISTORIA.</em></h2><p>Cuéntanos qué quieres transformar.<br />Nosotros te ayudamos a construirlo.</p><Link href="/contacto" className={s.pillLink}>Hablemos de tu proyecto <ArrowUpRight size={22} /></Link></div><div className={s.contactLinks}><a href="mailto:desarrollonaxde@gmail.com">desarrollonaxde@gmail.com ↗</a><a href="tel:+34667904826">EUROPA / +34 667 90 48 26</a><a href="https://wa.me/573194254196" target="_blank" rel="noopener noreferrer">LATINOAMÉRICA / +57 319 425 4196 ↗</a></div></section>
    </main>
    <Footer />
  </div>;
}
