"use client"

import React from 'react';
import Link from 'next/link';
import { Smartphone, Globe, Zap, Cpu, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    title: "Apps Móviles & Web",
    desc: "Plataformas nativas y progresivas con foco en UI/UX futurista y escalabilidad cloud.",
    icon: Smartphone,
    accent: "from-[#F80037]/20"
  },
  {
    title: "Páginas Interactivas",
    desc: "Desarrollo web de alta conversión con animaciones premium y experiencias inmersivas.",
    icon: Globe,
    accent: "from-[#5200F8]/20"
  },
  {
    title: "Tarjetas NFC",
    desc: "Networking inteligente. Tu identidad digital en un toque, sin aplicaciones adicionales.",
    icon: Zap,
    accent: "from-yellow-500/10"
  },
  {
    title: "IA Aplicada",
    desc: "Integración de modelos LLM para automatizar procesos y transformar la atención al cliente.",
    icon: Cpu,
    accent: "from-cyan-500/10"
  }
];

export const FeaturedServices = () => {
  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col gap-8 mb-16 md:mb-24">
          <div className="space-y-4">
            <h2 className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs">Ecosistema Naxde</h2>
            <h3 className="text-5xl sm:text-6xl md:text-[8rem] lg:text-[10rem] font-headline font-black text-white leading-[0.9] md:leading-[0.8] tracking-tighter">
              SOLUCIONES <br />
              <span className="text-outline italic opacity-40">SIN LÍMITES.</span>
            </h3>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <p className="text-lg md:text-xl text-white/40 max-w-xl leading-relaxed font-medium">
              Combinamos ingeniería de alto nivel con diseño vanguardista para crear productos que dominan el mercado digital.
            </p>
            <Link href="/servicios">
              <Button variant="link" className="text-primary hover:text-primary/80 text-lg md:text-xl font-bold group p-0 gap-3">
                Ver todos los servicios
                <Zap className="w-5 h-5 md:w-6 md:h-6 group-hover:fill-primary transition-all" />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, idx) => (
            <div key={idx} className={`glass-card p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] space-y-6 md:space-y-8 group hover:-translate-y-2 md:hover:-translate-y-4 transition-all duration-700 relative overflow-hidden border border-white/5`}>
              <div className={`absolute top-0 right-0 w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br ${service.accent} to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl glass-panel flex items-center justify-center relative z-10 group-hover:bg-primary/10 transition-colors">
                <service.icon className="w-6 h-6 md:w-8 md:h-8 text-primary group-hover:scale-110 transition-transform" />
              </div>
              
              <div className="space-y-3 md:space-y-4 relative z-10">
                <h4 className="text-xl md:text-2xl font-headline font-bold text-white group-hover:text-primary transition-colors">{service.title}</h4>
                <p className="text-white/50 text-xs md:text-sm leading-relaxed font-medium">{service.desc}</p>
              </div>

              <div className="pt-2 md:pt-4 relative z-10">
                <Link href="/servicios" className="inline-flex items-center gap-3 text-primary font-bold text-[10px] md:text-xs uppercase tracking-[0.2em] hover:gap-5 transition-all group/link">
                  Explorar servicio
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
