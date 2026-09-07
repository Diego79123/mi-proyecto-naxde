'use client';

import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import s from './SpaceHeader.module.css';

const logo = 'https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Logos%2FLogo%20naxde.png?alt=media&token=1df1f19b-978a-4f23-8f2f-d0d9efb42764';
const links = [
  { title: 'Inicio', href: '/' },
  { title: 'Nosotros', href: '/sobre-nosotros' },
  { title: 'Servicios', href: '/servicios' },
  { title: 'NeoCard', href: '/tarjetas-neocard' },
  { title: 'Sitios web', href: '/sitios-web' },
  { title: 'Social AI', href: '/asistente' },
  { title: 'Proyectos', href: '/proyectos' },
  { title: 'Contacto', href: '/contacto' },
];

export function Header() {
  return <header className={s.header}>
    <span className={s.caption}>CREA. CONECTA. AVANZA.</span>
    <Link className={s.brand} href="/" aria-label="Naxde, inicio"><img src={logo} alt="Naxde" width="143" height="40" /></Link>
    <Sheet>
      <SheetTrigger asChild><button className={s.trigger} aria-label="Abrir menú principal"><span>MENÚ</span><span className={s.bars} aria-hidden="true"><i /><i /></span></button></SheetTrigger>
      <SheetContent side="top" className={s.menu} aria-describedby={undefined}>
        <SheetTitle className="sr-only">Explora el universo Naxde</SheetTitle>
        <div className={s.menuTop}><span>EXPLORA NUESTRO UNIVERSO</span><SheetClose asChild><Link href="/" aria-label="Naxde, inicio"><img src={logo} alt="Naxde" width="143" height="40" /></Link></SheetClose></div>
        <div className={s.menuBody}>
          <nav className={s.links} aria-label="Navegación principal">{links.map((link, i) => <SheetClose asChild key={link.href}><Link className={s.link} href={link.href}><span>0{i + 1}</span><strong>{link.title}</strong><ArrowUpRight aria-hidden="true" /></Link></SheetClose>)}</nav>
          <div className={s.aside}><p>HAGAMOS QUE SUCEDA</p><h3>Tu próxima gran idea<br />empieza con una<br />conversación.</h3><SheetClose asChild><Link href="/contacto">Iniciar un proyecto ↗</Link></SheetClose><a href="mailto:desarrollonaxde@gmail.com">desarrollonaxde@gmail.com</a><p className={s.menuNote}>LATINOAMÉRICA · EUROPA<br />UN MISMO UNIVERSO.</p></div>
        </div>
      </SheetContent>
    </Sheet>
  </header>;
}
