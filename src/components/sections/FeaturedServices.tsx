"use client"

import React from 'react';
import Link from 'next/link';
import { Smartphone, Globe, BarChart3, ShieldCheck, Zap, Cpu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    title: "Apps Móviles & Web",
    desc: "Plataformas nativas y progresivas con foco en UI/UX futurista.",
    icon: Smartphone,
    accent: "from-[#F80037]/20"
  },
  {
    title: "Páginas Interactivas",
    desc: "Desarrollo web de alta conversión y animaciones premium.",
    icon: Globe,
    accent: "from-[#5200F8]/20"
  },
  {
    title: "Tarjetas NFC",
    desc: "Networking inteligente. Tu información en un toque.",
    icon: Zap,
    accent: "from-yellow-500/10"
  },
  {
    title: "IA Aplicada",
    desc: "Integración de modelos GPT para automatizar tu negocio.",
    icon: Cpu,
    accent: "from-cyan-500/10"
  }
];

export const FeaturedServices = () => {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="space-y-4">
            <h2 className="text-primary font-bold uppercase tracking-[0.2em] text-sm">Servicios Core</h2>
            <h3 className="text-4xl md:text-5xl font-headline font-bold text-white max-w-2xl leading-tight">
              SOLUCIONES QUE <span className="italic">IMPULSAN</span> TU ESCALABILIDAD.
            </h3>
          </div>
          <Link href="/servicios">
            <Button variant="link" className="text-primary hover:text-primary/80 text-lg group p-0">
              Ver todos los servicios
              <Zap className="w-5 h-5 ml-2 group-hover:fill-primary transition-all" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, idx) => (
            <div key={idx} className={`glass-card p-8 rounded-3xl space-y-6 group hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden`}>
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${service.accent} to-transparent blur-2xl opacity-0 group-hover:opacity-100 transition-opacity`} />
              
              <div className="w-14 h-14 rounded-2xl glass-panel flex items-center justify-center relative z-10">
                <service.icon className="w-7 h-7 text-primary" />
              </div>
              
              <div className="space-y-3 relative z-10">
                <h4 className="text-xl font-headline font-bold text-white">{service.title}</h4>
                <p className="text-white/50 text-sm leading-relaxed">{service.desc}</p>
              </div>

              <div className="pt-4 relative z-10">
                <Link href="/servicios" className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest hover:gap-4 transition-all">
                  Saber más
                  <Zap className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};