
"use client"

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
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
          "fixed top-0 left-0 right-0 z-[130] transition-all duration-500 h-20 md:h-24",
          isMenuOpen ? "pointer-events-none" : "pointer-events-auto"
        )}
      >
        {/* Estructura Principal del Header Estilo Nave */}
        <div 
          className={cn(
            "absolute inset-0 bg-[#0A0520]/80 backdrop-blur-xl border-b border-white/5 transition-all duration-500",
            isScrolled ? "opacity-100" : "opacity-90"
          )}
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 75%, 60% 75%, 58% 100%, 42% 100%, 40% 75%, 0 75%)'
          }}
        />

        <div className="max-w-screen-2xl mx-auto h-full px-8 relative flex items-center justify-between">
          
          {/* Espaciador izquierdo para balancear el layout */}
          <div className="w-12 h-12 hidden md:block" />

          {/* Logo Centrado en el Notch */}
          <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[140] flex flex-col items-center">
            <div className="relative h-10 w-32 md:h-12 md:w-40 transition-transform hover:scale-105">
              <Image 
                src={LOGO_URL} 
                alt="Naxde Logo" 
                fill
                className="object-contain"
                priority
              />
            </div>
            {/* Subtítulo del Logo (Opcional, similar a la imagen) */}
            <span className="text-[6px] md:text-[8px] font-bold text-white/40 tracking-[0.4em] uppercase mt-1">
              Crea · Conecta · Avanza
            </span>
          </Link>

          {/* Botón de Menú a la Derecha */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-[150] w-12 h-12 flex flex-col items-center justify-center gap-1.5 focus:outline-none group pointer-events-auto"
          >
            <div className={cn(
              "h-[2px] bg-white transition-all duration-300 rounded-full",
              isMenuOpen ? "w-8 rotate-45 translate-y-[8px]" : "w-8 group-hover:w-10"
            )} />
            <div className={cn(
              "h-[2px] bg-white transition-all duration-300 rounded-full",
              isMenuOpen ? "w-0 opacity-0" : "w-5 group-hover:w-8"
            )} />
            <div className={cn(
              "h-[2px] bg-white transition-all duration-300 rounded-full",
              isMenuOpen ? "w-8 -rotate-45 -translate-y-[8px]" : "w-8 group-hover:w-10"
            )} />
          </button>

        </div>
      </header>

      {/* Menú a Pantalla Completa */}
      <div className={cn(
        "fixed inset-0 z-[120] transition-all duration-700 ease-in-out",
        isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <div className="absolute inset-0 bg-[#0A0520]/60 backdrop-blur-[60px]" />
        
        <div className="relative h-full w-full flex flex-col justify-end px-8 pb-16 md:px-24 md:pb-24 overflow-hidden">
          
          <div className="flex flex-col md:flex-row justify-between items-end w-full gap-12">
            
            <nav className="flex flex-col space-y-0 text-left">
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

          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 pointer-events-none opacity-[0.03]">
            <span className="text-[20vw] font-black text-white uppercase tracking-tighter whitespace-nowrap">NAXDE HUB</span>
          </div>
        </div>
      </div>
    </>
  );
};
