
"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Menu,
  X,
  Instagram,
  Facebook,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const LOGO_URL = "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Logos%2FLogo%20naxde.png?alt=media&token=1df1f19b-978a-4f23-8f2f-d0d9efb42764";

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevenir scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Servicios", href: "/servicios" },
    { name: "Neocard", href: "/tarjetas-neocard" },
    { name: "Proyectos", href: "/proyectos" },
    { name: "Contacto", href: "/contacto" }
  ];

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-8 h-24 flex items-center",
          isScrolled 
            ? "bg-transparent" 
            : "bg-transparent"
        )}
      >
        <div className="max-w-screen-2xl mx-auto w-full flex justify-between items-center">
          
          {/* Logo */}
          <Link href="/" className="relative h-10 w-[160px] z-[110]">
            <Image 
              src={LOGO_URL} 
              alt="Naxde Logo" 
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Action Buttons & Hamburger */}
          <div className="flex items-center gap-8 z-[110]">
            <Link href="/admin" className="hidden md:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.3em] text-white/40 hover:text-primary transition-all">
              <ShieldCheck className="w-4 h-4" />
              Acceso Staff
            </Link>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group flex items-center gap-4 focus:outline-none"
            >
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60 group-hover:text-white transition-colors hidden sm:block">
                {isMenuOpen ? 'Cerrar' : 'Menú'}
              </span>
              <div className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 group-hover:bg-primary group-hover:border-primary transition-all duration-500">
                {isMenuOpen ? (
                  <X className="w-5 h-5 text-white" />
                ) : (
                  <Menu className="w-5 h-5 text-white" />
                )}
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Futuristic Glass Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-[90] transition-all duration-700 ease-in-out",
        isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        {/* Deep Blur Background */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[45px]" />
        
        <div className="relative h-full w-full flex flex-col justify-center px-10 md:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-20">
            
            {/* Main Links */}
            <nav className="flex flex-col space-y-6 md:space-y-10">
              {navLinks.map((link, idx) => (
                <Link 
                  key={idx} 
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="group inline-flex items-center gap-6"
                >
                  <span className="text-[12px] font-bold text-primary/40 group-hover:text-primary transition-colors">0{idx + 1}</span>
                  <h2 className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold text-white uppercase tracking-tighter transition-all duration-500 group-hover:italic group-hover:translate-x-4">
                    {link.name}
                  </h2>
                  <ArrowRight className="w-10 h-10 text-primary opacity-0 -translate-x-10 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500" />
                </Link>
              ))}
            </nav>

            {/* Extra Info & Socials */}
            <div className="hidden lg:flex flex-col justify-center space-y-12 border-l border-white/10 pl-20">
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-primary uppercase tracking-[0.5em]">El Futuro Hoy</h4>
                <p className="text-xl text-white/50 max-w-sm leading-relaxed">
                  Construimos plataformas digitales que transforman negocios en toda Latinoamérica.
                </p>
              </div>

              <div className="space-y-6">
                <h4 className="text-xs font-bold text-white/40 uppercase tracking-[0.5em]">Síguenos</h4>
                <div className="flex gap-6">
                  <Link href="https://instagram.com" target="_blank" className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary transition-all group">
                    <Instagram className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  </Link>
                  <Link href="https://facebook.com" target="_blank" className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-all group">
                    <Facebook className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                  </Link>
                </div>
              </div>

              <div className="pt-10">
                <Link href="/contacto" onClick={() => setIsMenuOpen(false)}>
                  <Button className="h-16 px-10 bg-primary hover:bg-primary/90 text-white rounded-full text-lg font-bold neon-accent">
                    Cotizar Proyecto
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Footer of Menu (Mobile) */}
          <div className="absolute bottom-12 left-10 right-10 flex lg:hidden justify-between items-center border-t border-white/10 pt-8">
            <div className="flex gap-6">
              <Instagram className="w-5 h-5 text-white/40" />
              <Facebook className="w-5 h-5 text-white/40" />
            </div>
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em]">Naxde Digital Hub</span>
          </div>
        </div>
      </div>
    </>
  );
};
