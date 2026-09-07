'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ArrowUpRight, Check, Code2, Globe2, Menu, Workflow, Sparkles, Smartphone, ShoppingBag, Megaphone, Layers3, ShieldCheck } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import s from './NarrativeHome.module.css';

const logo = 'https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Logos%2FLogo%20naxde.png?alt=media&token=1df1f19b-978a-4f23-8f2f-d0d9efb42764';
const chapters = [{ id: 'vision', label: 'La visión' }, { id: 'soluciones', label: 'Las soluciones' }, { id: 'metodo', label: 'El método' }, { id: 'neocard', label: 'La experiencia' }, { id: 'conversemos', label: 'Tu siguiente paso' }];
const solutions = [
  { id: 'software', label: 'Software a medida', icon: Code2, headline: 'Tu operación merece una solución propia.', text: 'Aplicaciones web y móviles diseñadas alrededor de tus procesos. Conectamos personas, datos y herramientas para que tu empresa trabaje mejor.', features: ['Aplicaciones web y móviles', 'Sistemas internos y plataformas cloud', 'Integración con APIs y herramientas de negocio'], href: '/servicios', cta: 'Explorar desarrollo de software', nodes: ['Tu equipo', 'Aplicación a medida', 'Datos + integraciones'], tag: 'CONSTRUYE' },
  { id: 'web', label: 'Web & e-commerce', icon: ShoppingBag, headline: 'Cada visita puede ser el inicio de una relación.', text: 'Creamos sitios corporativos y tiendas online que comunican el valor de tu marca y hacen más fácil descubrir, elegir y comprar.', features: ['Diseño adaptado a tu marca', 'Experiencia móvil, velocidad y SEO', 'Tiendas online fáciles de administrar'], href: '/sitios-web', cta: 'Conocer nuestras experiencias web', nodes: ['Tu marca', 'Experiencia digital', 'Clientes + ventas'], tag: 'CONECTA' },
  { id: 'ia', label: 'IA & automatización', icon: Sparkles, headline: 'Más tiempo para lo que hace crecer tu negocio.', text: 'Agentes inteligentes y flujos que conectan tus sistemas, atienden consultas y simplifican las tareas repetitivas de tu operación.', features: ['Asistentes de atención y ventas', 'Automatización de procesos y reportes', 'Conexión con CRM, plataformas y APIs'], href: '/asistente', cta: 'Explorar nuestro asistente', nodes: ['Una solicitud', 'IA + automatización', 'Una tarea resuelta'], tag: 'OPTIMIZA' },
  { id: 'marketing', label: 'Marketing digital', icon: Megaphone, headline: 'Una gran solución también necesita ser descubierta.', text: 'Combinamos creatividad, diseño y estrategia digital para conectar tu marca con las personas a las que quieres llegar.', features: ['Estrategia alineada con tu negocio', 'Contenido y experiencias de marca', 'Conexión entre marketing y tecnología'], href: '/contacto', cta: 'Hablemos de tu marca', nodes: ['Tu propuesta', 'Estrategia + contenido', 'Tu audiencia'], tag: 'CRECE' },
];
const steps = [
  { title: 'Primero, entendemos tu negocio.', subtitle: 'Descubrimiento + estrategia', text: 'Escuchamos tus objetivos, tus usuarios y los obstáculos de tu operación. Así definimos qué construir y qué debe resolver.', output: 'Una dirección compartida.' },
  { title: 'Damos forma a una solución clara.', subtitle: 'Diseño + arquitectura', text: 'Traducimos las necesidades en una experiencia de uso y una arquitectura. Conectamos el diseño con la manera en que tu empresa trabaja.', output: 'Una experiencia pensada para las personas.' },
  { title: 'Construimos. Probamos. Afinamos.', subtitle: 'Desarrollo + validación', text: 'Desarrollamos la solución y revisamos su calidad, seguridad y rendimiento antes de implementarla. Cada detalle tiene un propósito.', output: 'Tecnología preparada para operar.' },
  { title: 'El lanzamiento es un nuevo comienzo.', subtitle: 'Implementación + evolución', text: 'Acompañamos la puesta en marcha, damos soporte y mejoramos la solución para responder a las nuevas necesidades de tu negocio.', output: 'Un aliado para seguir creciendo.' },
];

export function NarrativeHome() {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState('vision');
  const [step, setStep] = useState(0);
  const [interactive, setInteractive] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add(s.visible);
      });
    }, { rootMargin: '-20% 0px -30% 0px', threshold: 0 });
    root.current?.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));
    const chapterElements = Array.from(root.current?.querySelectorAll<HTMLElement>('[data-chapter]') ?? []);
    const stepElements = Array.from(root.current?.querySelectorAll<HTMLElement>('[data-step]') ?? []);
    const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const originalScroll = document.documentElement.style.scrollBehavior;
    const configureScroll = () => { document.documentElement.style.scrollBehavior = motionPreference.matches ? 'auto' : 'smooth'; };
    configureScroll();
    motionPreference.addEventListener('change', configureScroll);
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        if (progress.current) progress.current.style.transform = `scaleX(${total > 0 ? Math.min(1, window.scrollY / total) : 0})`;
        const readingLine = window.innerHeight * 0.45;
        let activeChapter = 'vision';
        chapterElements.forEach(el => { if (el.getBoundingClientRect().top <= readingLine) activeChapter = el.id; });
        setChapter(activeChapter);
        let activeStep = 0;
        stepElements.forEach((el, i) => { if (el.getBoundingClientRect().top <= readingLine) activeStep = i; });
        setStep(activeStep);
      });
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
      motionPreference.removeEventListener('change', configureScroll);
      document.documentElement.style.scrollBehavior = originalScroll;
      cancelAnimationFrame(frame);
    };
  }, []);
  return <div ref={root} className={s.home}>
    <a href="#contenido" className={s.skip}>Saltar al contenido</a>
    <header className={s.header}>
      <Link href="/" aria-label="Naxde, inicio"><img className={s.logo} src={logo} alt="Naxde" width="128" height="36" /></Link>
      <nav className={s.desktopNav} aria-label="Navegación principal"><a href="#soluciones">Soluciones</a><a href="#metodo">Cómo trabajamos</a><a href="#neocard">NeoCard</a><Link href="/proyectos">Proyectos</Link></nav>
      <Link className={s.headerCta} href="/contacto">Hablemos de tu proyecto <ArrowUpRight size={17} /></Link>
      <Sheet><SheetTrigger asChild><button className={s.menuButton} aria-label="Abrir menú"><Menu /></button></SheetTrigger><SheetContent><SheetTitle>Explora Naxde</SheetTitle><nav className={s.mobileNav}>{[...chapters.map(c => ({ href: `/#${c.id}`, label: c.label })), { href: '/proyectos', label: 'Proyectos' }, { href: '/sobre-nosotros', label: 'Sobre nosotros' }, { href: '/servicios', label: 'Todos los servicios' }, { href: '/asistente', label: 'Social AI' }, { href: '/contacto', label: 'Contacto' }].map(item => <SheetClose key={item.href} asChild><Link href={item.href}>{item.label}<ArrowUpRight size={18} /></Link></SheetClose>)}</nav></SheetContent></Sheet>
      <div ref={progress} className={s.progress} />
    </header>
    <main id="contenido">
      <section id="vision" data-chapter className={s.hero}>
        <div className={s.heroCopy}><p className={s.eyebrow}><span /> SOFTWARE, DISEÑO & ESTRATEGIA</p><h1>Tu siguiente<br />gran paso.<br /><em>Lo construimos.</em></h1><p className={s.lead}>Transformamos los retos de tu empresa en software, experiencias digitales e inteligencia que hacen avanzar tu negocio.</p><div className={s.actions}><Link className={s.primary} href="/contacto">Construyamos tu proyecto <ArrowUpRight size={19} /></Link><a className={s.textLink} href="#soluciones">Descubre cómo <ArrowDown size={17} /></a></div><p className={s.location}><Globe2 size={16} /> Latinoamérica & Europa <span>Una visión. Sin fronteras.</span></p></div>
        <div className={s.heroVisual}><div className={s.visualLabel}><span>DE LA IDEA AL PRODUCTO</span><ArrowUpRight size={18} /></div><div className={s.artWindow}><img src="/portfolio/applications.webp" alt="Aplicaciones web y móviles conectadas con APIs, datos y servicios cloud, del portafolio Naxde" width="1500" height="1910" fetchPriority="high" /></div><div className={s.visualCaption}><Code2 size={24} /><div><strong>Diseñado para tu negocio.</strong><span>Preparado para su siguiente etapa.</span></div><span className={s.visualIndex}>01 / 05</span></div></div>
        <div className={s.heroBottom}><a href="#soluciones"><ArrowDown size={17} /> Una idea es solo el comienzo. Sigue la historia.</a><span>CREA. CONECTA. AVANZA.</span></div>
      </section>
      <nav className={s.chapterNav} aria-label="Capítulos del portafolio">{chapters.map((c, i) => <a key={c.id} href={`#${c.id}`} aria-current={chapter === c.id ? 'location' : undefined}><span>0{i + 1}</span>{c.label}</a>)}</nav>
      <section id="soluciones" data-chapter className={s.section}>
        <div className={s.sectionHead} data-reveal><p className={s.eyebrow}>01 — DE UN RETO A UNA POSIBILIDAD</p><div className={s.headingRow}><h2>La tecnología correcta.<br /><span>Para lo que viene.</span></h2><p>Tu negocio tiene su propia historia. Creamos las herramientas para escribir su siguiente capítulo.</p></div></div>
        <Tabs defaultValue="software" className={s.solutions}><TabsList className={s.tabList} aria-label="Áreas de servicio">{solutions.map(item => <TabsTrigger className={s.tab} key={item.id} value={item.id}><item.icon size={18} />{item.label}</TabsTrigger>)}</TabsList>{solutions.map(item => <TabsContent className={s.solutionPanel} key={item.id} value={item.id}><div className={s.solutionCopy}><p className={s.eyebrow}>{item.tag}</p><h3>{item.headline}</h3><p>{item.text}</p><ul>{item.features.map(f => <li key={f}><Check size={17} />{f}</li>)}</ul><Link className={s.textLink} href={item.href}>{item.cta}<ArrowUpRight size={18} /></Link></div><div className={s.systemDiagram} aria-label={`Conectamos ${item.nodes.join(', ')}`}><span className={s.diagramLabel}>ASÍ CONECTAMOS TU NEGOCIO</span>{item.nodes.map((node, i) => <div key={node} className={s.node}><span>0{i + 1}</span>{i === 1 && <item.icon size={25} />}<strong>{node}</strong>{i < 2 && <div className={s.connector}><ArrowDown size={17} /></div>}</div>)}<p>Personas + tecnología + propósito</p></div></TabsContent>)}</Tabs>
        <div className={s.techLine}><span>TECNOLOGÍAS DE NUESTRO PORTAFOLIO</span><div>Next.js <i> / </i> React <i> / </i> Shopify <i> / </i> WordPress <i> / </i> n8n <i> / </i> Make <i> / </i> APIs</div></div>
      </section>
      <section id="metodo" data-chapter className={`${s.section} ${s.method}`}><div className={s.methodIntro}><p className={s.eyebrow}>02 — LA CONFIANZA SE CONSTRUYE</p><h2>Una visión compartida.<br /><span>Un camino claro.</span></h2><p>Somos un equipo de creativos, estrategas y tecnólogos. Escuchamos, entendemos y construimos contigo.</p><div className={s.methodCounter} aria-hidden="true"><span>0{step + 1}</span><small>/ 04</small></div><div className={s.stepTrack} aria-hidden="true">{steps.map((_, i) => <span key={i} className={i <= step ? s.activeStep : ''} />)}</div><Link className={s.textLink} href="/sobre-nosotros">Conoce a Naxde <ArrowUpRight size={17} /></Link></div><div className={s.steps}>{steps.map((item, i) => <article key={item.title} data-step={i} className={`${s.step} ${i === step ? s.currentStep : ''}`}><span className={s.stepNumber}>0{i + 1}</span><p className={s.eyebrow}>{item.subtitle}</p><h3>{item.title}</h3><p>{item.text}</p><div className={s.deliverable}><Check size={17} />{item.output}</div></article>)}</div></section>
      <section id="neocard" data-chapter className={`${s.section} ${s.neo}`}><div className={s.neoCopy} data-reveal><p className={s.eyebrow}>03 — NO SOLO TE LO CONTAMOS</p><h2>La conexión empieza<br /><span>con un toque.</span></h2><p className={s.lead}>Esto es NeoCard. Tu identidad profesional, tus enlaces y tu mundo digital en una experiencia que puedes compartir al instante.</p><div className={s.neoBenefits}><div><Smartphone /><h3>Tu perfil, siempre contigo</h3><p>Una presentación digital accesible desde el móvil.</p></div><div><Layers3 /><h3>Tu información, conectada</h3><p>Reúne los puntos de contacto de tu marca en un solo lugar.</p></div></div><div className={s.actions}><Link href="/tarjetas-neocard" className={s.primary}>Explorar NeoCards <ArrowUpRight size={18} /></Link><Link href="/tarjetas-neocard/oscar-rivera" className={s.textLink}>Abrir demostración <ArrowUpRight size={17} /></Link></div></div><div className={s.neoDemo}><div className={s.demoHeading}><span>NEOCARD / DEMOSTRACIÓN REAL</span><span className={s.demoDot} /></div><div className={s.phone}><iframe src="/tarjetas-neocard/oscar-rivera?mode=mockup" loading="lazy" title="Demostración de la NeoCard de Oscar Rivera" tabIndex={interactive ? 0 : -1} style={{ pointerEvents: interactive ? 'auto' : 'none' }} />{!interactive && <button className={s.activateDemo} onClick={() => setInteractive(true)}><Smartphone size={22} />Probar experiencia<ArrowUpRight size={17} /></button>}</div><button className={s.demoControl} onClick={() => setInteractive(v => !v)}>{interactive ? 'Pausar interacción y seguir explorando' : 'Activar la demostración interactiva'} <ArrowRight size={15} /></button></div></section>
      <section className={`${s.section} ${s.trust}`}><p className={s.eyebrow}>04 — LO QUE HACE LA DIFERENCIA</p><h2>Buen diseño. Buena ingeniería.<br /><span>Un mismo compromiso.</span></h2><div className={s.trustGrid}>{[{ icon: Layers3, title: 'Pensamos en el conjunto', text: 'Diseño, desarrollo y estrategia conectados con los objetivos de tu empresa.' }, { icon: ShieldCheck, title: 'Cuidamos lo esencial', text: 'Calidad, seguridad y rendimiento como parte de nuestro proceso de desarrollo.' }, { icon: Workflow, title: 'Seguimos a tu lado', text: 'Soporte y evolución para que la solución acompañe el crecimiento de tu negocio.' }].map(item => <article key={item.title} data-reveal><item.icon size={25} /><h3>{item.title}</h3><p>{item.text}</p></article>)}</div><Link className={s.textLink} href="/proyectos">Explora nuestros proyectos y experiencias <ArrowUpRight size={18} /></Link></section>
      <section id="conversemos" data-chapter className={`${s.section} ${s.contact}`}><p className={s.eyebrow}>05 — EL SIGUIENTE CAPÍTULO ES TUYO</p><h2>Las grandes ideas<br />merecen <em>hacerse realidad.</em></h2><p>Cuéntanos qué quieres transformar.<br />Empecemos por una buena conversación.</p><Link href="/contacto" className={s.primary}>Hablemos de tu proyecto <ArrowUpRight size={20} /></Link><div className={s.contactDetails}><a href="mailto:desarrollonaxde@gmail.com">desarrollonaxde@gmail.com <ArrowUpRight size={16} /></a><a href="tel:+34667904826">Europa · +34 667 90 48 26</a><a href="https://wa.me/573194254196" target="_blank" rel="noopener noreferrer">Latinoamérica · +57 319 425 4196 <ArrowUpRight size={16} /></a></div></section>
    </main>
    <footer className={s.footer}><div><Link href="/" aria-label="Naxde, inicio"><img src={logo} alt="Naxde" width="115" height="34" /></Link><p>Crea. Conecta. Avanza.</p></div><nav aria-label="Enlaces del pie de página"><Link href="/sobre-nosotros">Nosotros</Link><Link href="/servicios">Servicios</Link><Link href="/sitios-web">Sitios web</Link><Link href="/tarjetas-neocard">NeoCard</Link><Link href="/asistente">Social AI</Link><Link href="/proyectos">Proyectos</Link><Link href="/contacto">Contacto</Link></nav><div className={s.footerBottom}><span>© {new Date().getFullYear()} Naxde</span><span>Latinoamérica & Europa</span><a href="#vision">Volver al inicio ↑</a></div></footer>
  </div>;
}
