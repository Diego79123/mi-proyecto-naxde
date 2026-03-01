
"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Menu,
  X,
  ShieldCheck
} from 'lucide-react';
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

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMenuOpen]);

  const navLinks = [
    { name: "Sobre Nosotros", href: "/sobre-nosotros" },
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
          isScrolled ? "bg-transparent" : "bg-transparent"
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

      {/* Full-Screen Menu Overlay */}
      <div className={cn(
        "fixed inset-0 z-[120] transition-all duration-700 ease-in-out",
        isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        {/* Glass Background - More transparent to see the background better */}
        <div className="absolute inset-0 bg-[#0A0520]/40 backdrop-blur-[40px]" />
        
        <div className="relative h-full w-full flex flex-col justify-end px-8 pb-16 md:px-24 md:pb-24 overflow-hidden">
          
          {/* Close Button Top Right */}
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-10 right-10 p-4 text-white/40 hover:text-white transition-all hover:scale-110 active:scale-90"
          >
            <X className="w-12 h-12" />
          </button>

          <div className="flex flex-col md:flex-row justify-between items-end w-full gap-12">
            
            {/* Main Links - Stacked on the bottom-left */}
            <nav className="flex flex-col space-y-1 md:space-y-2 text-left">
              {navLinks.map((link, idx) => (
                <Link 
                  key={idx} 
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="group block"
                >
                  <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-headline font-black text-white uppercase tracking-tighter leading-tight transition-all duration-500 group-hover:text-primary group-hover:translate-x-6 group-hover:italic">
                    {link.name}
                  </h2>
                </Link>
              ))}
            </nav>

            {/* Social Links - Bottom Right */}
            <div className="flex flex-wrap gap-6 md:gap-10 pb-4">
              <Link href="https://facebook.com" target="_blank" className="text-xs md:text-sm font-bold text-white/40 hover:text-white uppercase tracking-[0.2em] transition-colors">
                Facebook
              </Link>
              <Link href="https://instagram.com" target="_blank" className="text-xs md:text-sm font-bold text-white/40 hover:text-white uppercase tracking-[0.2em] transition-colors">
                Instagram
              </Link>
              <Link href="https://youtube.com" target="_blank" className="text-xs md:text-sm font-bold text-white/40 hover:text-white uppercase tracking-[0.2em] transition-colors">
                YouTube
              </Link>
            </div>

          </div>

          {/* Branding Background Mark (Subtle) */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none opacity-[0.03]">
            <span className="text-[20vw] font-black text-white uppercase tracking-tighter whitespace-nowrap">NAXDE HUB</span>
          </div>
        </div>
      </div>
    </>
  );
};
