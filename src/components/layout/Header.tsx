
"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  X
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
    { name: "SOBRE NOSOTROS", href: "/sobre-nosotros" },
    { name: "SERVICIOS", href: "/servicios" },
    { name: "NEOCARD", href: "/tarjetas-neocard" },
    { name: "PROYECTOS", href: "/proyectos" },
    { name: "TESTIMONIOS", href: "/admin" },
    { name: "CONTACTO", href: "/contacto" }
  ];

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 px-8 h-24 flex items-center border-b border-white/5",
          isScrolled ? "bg-black/20 backdrop-blur-xl" : "bg-transparent backdrop-blur-sm"
        )}
      >
        <div className="max-w-screen-2xl mx-auto w-full relative flex items-center justify-center">
          
          {/* Logo Centrado */}
          <Link href="/" className="relative h-12 w-[180px] z-[110]">
            <Image 
              src={LOGO_URL} 
              alt="Naxde Logo" 
              fill
              className="object-contain"
              priority
            />
          </Link>

          {/* Menú Hamburguesa Animado a la derecha */}
          <div className="absolute right-0 flex items-center gap-8 z-[110]">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="group flex items-center gap-4 focus:outline-none"
            >
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 group-hover:text-white transition-colors hidden sm:block">
                {isMenuOpen ? 'Cerrar' : 'Menú'}
              </span>
              
              {/* Custom Animated Hamburger Icon (3 Lines style) */}
              <div className="relative w-12 h-12 flex flex-col items-center justify-center gap-2 transition-all duration-500">
                <div className={cn(
                  "h-[2px] bg-white transition-all duration-500 ease-in-out rounded-full",
                  isMenuOpen ? "w-10 rotate-45 translate-y-[5px]" : "w-10"
                )} />
                <div className={cn(
                  "h-[2px] bg-white transition-all duration-500 ease-in-out self-end rounded-full",
                  isMenuOpen ? "w-0 opacity-0 scale-0" : "w-6"
                )} />
                <div className={cn(
                  "h-[2px] bg-white transition-all duration-500 ease-in-out rounded-full",
                  isMenuOpen ? "w-10 -rotate-45 -translate-y-[5px]" : "w-10"
                )} />
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
        {/* Glass Background - High transparency to see background elements */}
        <div className="absolute inset-0 bg-[#0A0520]/40 backdrop-blur-[40px]" />
        
        <div className="relative h-full w-full flex flex-col justify-end px-8 pb-16 md:px-24 md:pb-24 overflow-hidden">
          
          {/* Close Action Trigger */}
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-8 p-4 z-[130] flex items-center gap-4 group"
          >
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 group-hover:text-white transition-colors hidden sm:block">
                Cerrar
              </span>
              {/* Simplified X for the menu panel */}
              <div className="relative w-12 h-12 flex flex-col items-center justify-center gap-2">
                <div className="absolute h-[2px] w-10 bg-white rotate-45" />
                <div className="absolute h-[2px] w-10 bg-white -rotate-45" />
              </div>
          </button>

          <div className="flex flex-col md:flex-row justify-between items-end w-full gap-12">
            
            {/* Main Links */}
            <nav className="flex flex-col space-y-0 md:space-y-0 text-left">
              {navLinks.map((link, idx) => (
                <Link 
                  key={idx} 
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="group block"
                >
                  <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white uppercase tracking-tighter leading-tight transition-all duration-500 group-hover:text-primary group-hover:translate-x-6 group-hover:italic">
                    {link.name}
                  </h2>
                </Link>
              ))}
            </nav>

            {/* Social Links */}
            <div className="flex flex-wrap gap-6 md:gap-10 pb-4">
              <Link href="https://facebook.com" target="_blank" className="text-xs md:text-sm font-black text-white/40 hover:text-white uppercase tracking-[0.2em] transition-colors">
                Facebook
              </Link>
              <Link href="https://instagram.com" target="_blank" className="text-xs md:text-sm font-black text-white/40 hover:text-white uppercase tracking-[0.2em] transition-colors">
                Instagram
              </Link>
              <Link href="https://youtube.com" target="_blank" className="text-xs md:text-sm font-black text-white/40 hover:text-white uppercase tracking-[0.2em] transition-colors">
                YouTube
              </Link>
            </div>

          </div>

          {/* Branding Background Mark */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none opacity-[0.03]">
            <span className="text-[20vw] font-black text-white uppercase tracking-tighter whitespace-nowrap">NAXDE HUB</span>
          </div>
        </div>
      </div>
    </>
  );
};
