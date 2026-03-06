
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
    { name: "SITIOS WEB", href: "/sitios-web" },
    { name: "SOCIAL AI", href: "/asistente" },
    { name: "PROYECTOS", href: "/proyectos" },
    { name: "CONTACTO", href: "/contacto" }
  ];

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 right-0 z-[130] transition-all duration-500 h-16 md:h-24",
          isMenuOpen ? "pointer-events-none" : "pointer-events-auto"
        )}
      >
        <div 
          className={cn(
            "absolute inset-0 bg-[#0A0520]/90 backdrop-blur-xl border-b border-white/5 transition-all duration-500",
            isScrolled ? "opacity-100" : "opacity-95"
          )}
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 70%, 58% 70%, 56% 100%, 44% 100%, 42% 70%, 0 70%)'
          }}
        />

        <div className="max-w-screen-2xl mx-auto h-full px-6 md:px-8 relative flex items-center justify-between">
          <div className="w-10 h-10 hidden md:block" />

          {/* Logo */}
          <Link href="/" className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 z-[140] flex flex-col items-center">
            <div className="relative h-6 w-20 md:h-10 md:w-36 transition-transform hover:scale-105">
              <Image 
                src={LOGO_URL} 
                alt="Naxde Logo" 
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Menú Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="relative z-[150] w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none group pointer-events-auto mt-[-10px] md:mt-[-20px]"
          >
            <div className={cn(
              "h-[2px] bg-white transition-all duration-300 rounded-full",
              isMenuOpen ? "w-6 md:w-8 rotate-45 translate-y-[7px] md:translate-y-[8px]" : "w-6 md:w-8 group-hover:w-10"
            )} />
            <div className={cn(
              "h-[2px] bg-white transition-all duration-300 rounded-full",
              isMenuOpen ? "w-0 opacity-0" : "w-4 md:w-5 group-hover:w-8"
            )} />
            <div className={cn(
              "h-[2px] bg-white transition-all duration-300 rounded-full",
              isMenuOpen ? "w-6 md:w-8 -rotate-45 -translate-y-[7px] md:-translate-y-[8px]" : "w-6 md:w-8 group-hover:w-10"
            )} />
          </button>
        </div>
      </header>

      {/* Pantalla de Menú */}
      <div className={cn(
        "fixed inset-0 z-[120] transition-all duration-700 ease-in-out",
        isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        <div className="absolute inset-0 bg-[#0A0520]/80 backdrop-blur-[60px]" />
        <div className="relative h-full w-full flex flex-col justify-center md:justify-end px-8 md:px-24 pb-16 md:pb-24 overflow-hidden">
          <nav className="flex flex-col space-y-4 md:space-y-0 text-left">
            {navLinks.map((link, idx) => (
              <Link 
                key={idx} 
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="group block"
              >
                <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-[5.5rem] font-black text-white uppercase tracking-tighter leading-tight transition-all duration-500 group-hover:text-primary group-hover:translate-x-4 md:group-hover:translate-x-6 group-hover:italic">
                  {link.name}
                </h2>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};
