
"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ArrowUp, Plus, Minus } from 'lucide-react';
import { Button } from '@/components/ui/button';

const LOGO_URL = "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Logos%2FLogo%20naxde.png?alt=media&token=1df1f19b-978a-4f23-8f2f-d0d9efb42764";

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-black pt-12 pb-16 md:pb-12 px-6 md:px-12 border-t border-black/5 relative">
      {/* Top Header of Footer */}
      <div className="max-w-[1600px] mx-auto flex justify-between items-center mb-24 md:mb-40">
        <Link href="/" className="flex items-center">
          <h2 className="text-2xl font-black tracking-tighter uppercase italic">NAXDE</h2>
        </Link>
        
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-[#F0F4FF] flex items-center justify-center text-black">
            <Minus className="w-4 h-4" />
          </div>
          <Link href="/contacto">
            <button className="px-6 md:px-8 h-12 rounded-full bg-[#0A0520] text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-primary transition-all">
              VAMOS A HABLAR
            </button>
          </Link>
          <button className="px-6 h-12 rounded-full bg-[#F0F4FF] text-black text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
            MENÚ <div className="flex gap-0.5"><div className="w-1 h-1 bg-black rounded-full"/><div className="w-1 h-1 bg-black rounded-full"/></div>
          </button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20 mb-32">
        {/* Col 1: Address */}
        <div className="md:col-span-3 space-y-1">
          <p className="text-sm font-medium text-black/80">Calle 154 # 103B - 76</p>
          <p className="text-sm font-medium text-black/80">Bogotá, Colombia</p>
          <p className="text-sm font-medium text-black/80">Región LATAM</p>
        </div>

        {/* Col 2: Socials & Emails */}
        <div className="md:col-span-3 space-y-12">
          <div className="flex flex-col gap-1">
            <Link href="#" className="text-sm font-medium text-black/80 hover:text-primary transition-colors">Twitter / X</Link>
            <Link href="#" className="text-sm font-medium text-black/80 hover:text-primary transition-colors">Instagram</Link>
            <Link href="#" className="text-sm font-medium text-black/80 hover:text-primary transition-colors">Linkedin</Link>
          </div>

          <div className="space-y-6">
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-black/40">Consultas generales</p>
              <Link href="mailto:hola@naxde.com" className="text-sm font-bold hover:text-primary transition-colors">hola@naxde.co</Link>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] font-black uppercase tracking-widest text-black/40">Nuevos negocios</p>
              <Link href="mailto:negocios@naxde.com" className="text-sm font-bold hover:text-primary transition-colors">negocios@naxde.co</Link>
            </div>
          </div>
        </div>

        {/* Col 3: Subscription */}
        <div className="md:col-span-6 space-y-10">
          <h3 className="text-4xl md:text-[4.5rem] font-medium tracking-tight leading-[1.1] max-w-lg">
            Suscríbete a nuestro boletín informativo
          </h3>
          
          <div className="relative group max-w-md">
            <input 
              type="email" 
              placeholder="Tu correo electrónico" 
              className="w-full h-16 md:h-20 bg-[#F0F4FF] rounded-2xl md:rounded-3xl px-8 text-sm md:text-base outline-none focus:ring-1 focus:ring-primary/20 transition-all"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center hover:translate-x-1 transition-transform">
              <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-[1600px] mx-auto pt-12 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">
          © {new Date().getFullYear()} NAXDE Digital Hub
        </p>
        
        <Link href="#" className="text-[10px] font-bold uppercase tracking-widest text-black/40 hover:text-black transition-colors">
          I+D: laboratorios.naxde.co
        </Link>

        <p className="text-[10px] font-bold uppercase tracking-widest text-black/40">
          Creado por Naxde Studio ❤️
        </p>
      </div>

      {/* Back to top button */}
      <button 
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 md:bottom-12 md:right-12 w-14 h-14 md:w-16 md:h-16 rounded-full bg-black text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform z-[150] group"
      >
        <ArrowUp className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
      </button>
    </footer>
  );
};
