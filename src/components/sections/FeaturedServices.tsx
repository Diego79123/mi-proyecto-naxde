
"use client"

import React from 'react';
import Link from 'next/link';
import { Smartphone, Globe, Zap, Cpu, ArrowRight } from 'lucide-react';

const services = [
  {
    title: "Móvil & Web",
    desc: "Plataformas nativas y progresivas con foco en UI/UX futurista y escalabilidad cloud.",
    icon: Smartphone,
  },
  {
    title: "Interactivas",
    desc: "Desarrollo web de alta conversión con animaciones premium y experiencias inmersivas.",
    icon: Globe,
  },
  {
    title: "Ecosistema NFC",
    desc: "Identidad digital inteligente en un solo toque, sin aplicaciones adicionales.",
    icon: Zap,
  },
  {
    title: "IA Aplicada",
    desc: "Integración de modelos LLM para automatizar procesos y transformar la atención.",
    icon: Cpu,
  }
];

export const FeaturedServices = () => {
  return (
    <section className="py-24 md:py-40 bg-white text-black relative overflow-hidden">
      {/* Decorative Arc similar to the user reference */}
      <div className="absolute -left-[15%] top-1/2 -translate-y-1/2 w-[70vw] h-[70vw] border-[30px] md:border-[60px] border-[#5200F8]/5 rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col gap-12 mb-24 md:mb-32">
          <div className="space-y-6">
            <span className="inline-block px-4 py-1.5 rounded-full border border-black/10 text-[10px] font-black uppercase tracking-[0.3em] text-[#5200F8]">
              Ecosistema Naxde
            </span>
            <h2 className="text-[12vw] md:text-[9vw] font-black leading-[0.85] tracking-tighter uppercase">
              MÁS ALLÁ<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '1.5px black' }}>DE LAS VISIONES</span><br />
              AL ALCANCE
            </h2>
          </div>
          
          <div className="max-w-3xl">
            <p className="text-xl md:text-3xl font-medium leading-tight text-black/70">
              Combinamos ingeniería de alto nivel con diseño vanguardista para crear productos que dominan el mercado digital.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-16 border-t border-black/5 pt-16">
          {services.map((service, idx) => (
            <div key={idx} className="group space-y-6">
              <div className="w-14 h-14 rounded-full border border-black/10 flex items-center justify-center group-hover:bg-black group-hover:text-white transition-all duration-500">
                <service.icon className="w-6 h-6" />
              </div>
              
              <div className="space-y-3">
                <h4 className="text-2xl font-black uppercase tracking-tight leading-none">{service.title}</h4>
                <p className="text-black/50 text-sm font-medium leading-relaxed">{service.desc}</p>
              </div>

              <div className="pt-4">
                <Link href="/servicios" className="inline-flex items-center gap-3 text-black font-black text-xs uppercase tracking-[0.2em] hover:gap-5 transition-all group/link">
                  Explorar
                  <ArrowRight className="w-4 h-4 text-[#5200F8]" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
