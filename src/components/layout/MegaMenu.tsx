
"use client"

import React from 'react';
import Link from 'next/link';
import { X, Smartphone, Code, Globe, Zap, ShieldCheck, Cpu, ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const categories = [
  {
    title: "Servicios Core",
    icon: Code,
    links: [
      { name: "Software a Medida", href: "/servicios", desc: "Apps y plataformas cloud", icon: Zap },
      { name: "Web Inmersiva", href: "/servicios", desc: "Diseño futurista 3D", icon: Globe },
      { name: "IA Aplicada", href: "/servicios", desc: "Automatización con LLMs", icon: Cpu }
    ]
  },
  {
    title: "Productos Estrella",
    icon: Star,
    links: [
      { name: "Neocard NFC", href: "/tarjetas-neocard", desc: "Identidad inteligente", icon: Smartphone },
      { name: "Sistemas CRM", href: "/servicios", desc: "Control total de leads", icon: ShieldCheck }
    ]
  }
];

export const MegaMenu = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center px-6">
      {/* Backdrop con desenfoque extremo */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-[20px] animate-in fade-in duration-500" 
        onClick={onClose} 
      />

      {/* Contenedor del Menú (Glass Blue) */}
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-[#0A0A30]/80 to-[#050515]/95 border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.8)] animate-in zoom-in-95 slide-in-from-bottom-10 duration-500 overflow-hidden group">
        
        {/* Glow Blue sutil en el fondo */}
        <div className="absolute top-[-20%] left-[-10%] w-[120%] h-[120%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <header className="flex justify-between items-center mb-10 relative z-10">
          <div>
            <h3 className="text-3xl font-headline font-bold text-white tracking-tight uppercase italic">
              Explora <span className="text-primary not-italic">Naxde</span>
            </h3>
            <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em] mt-1">Ecosistema Digital Pro</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full bg-white/5 hover:bg-white/10 text-white h-12 w-12 border border-white/10 transition-transform hover:rotate-90">
            <X className="w-6 h-6" />
          </Button>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {categories.map((cat, idx) => (
            <div key={idx} className="space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                  <cat.icon className="w-4 h-4 text-primary" />
                </div>
                <h4 className="font-bold text-sm text-white/60 uppercase tracking-widest">{cat.title}</h4>
              </div>
              
              <ul className="space-y-3">
                {cat.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link 
                      href={link.href} 
                      onClick={onClose}
                      className="group flex items-center gap-4 p-4 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/30 hover:bg-white/[0.08] transition-all"
                    >
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <link.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="font-bold text-white text-sm group-hover:text-primary transition-colors flex items-center gap-2">
                          {link.name}
                        </div>
                        <div className="text-[10px] text-white/30 font-medium">{link.desc}</div>
                      </div>
                      <ArrowRight className="w-4 h-4 text-white/20 opacity-0 group-hover:opacity-100 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <footer className="mt-10 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6 relative z-10">
          <div className="text-center sm:text-left">
            <p className="text-xs text-white/40 font-medium">¿Listo para el siguiente nivel?</p>
            <p className="text-white/80 font-bold">Hablemos de tu proyecto hoy.</p>
          </div>
          <Link href="/contacto" onClick={onClose}>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 neon-accent font-bold group">
              Empezar Ahora
              <Zap className="w-4 h-4 ml-2 group-hover:fill-white transition-all" />
            </Button>
          </Link>
        </footer>
      </div>
    </div>
  );
};
