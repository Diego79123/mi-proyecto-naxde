
"use client"

import React from 'react';
import { ShieldCheck, Zap, Star, Globe, MessageCircle, ArrowRight, Bot, Smartphone, Cpu } from 'lucide-react';
import { cn } from '@/lib/utils';

const trustBadges = [
  { icon: ShieldCheck, text: "Seguridad bancaria en la nube" },
  { icon: Zap, text: "Optimización Core Web" },
  { icon: Star, text: "Calificación 4.9 estrellas" },
  { icon: Globe, text: "+250 Proyectos en LATAM" },
  { icon: MessageCircle, text: "Soporte táctico 24/7" },
];

const impactCards = [
  {
    number: "+10",
    label: "módulos",
    title: "Naxde Ecosystem",
    desc: "Arquitecturas escalables desde software base hasta soluciones de alta gama.",
    gradient: "from-primary/20 to-transparent",
    icon: Cpu
  },
  {
    number: "NFC",
    label: "activa",
    title: "Tecnología de Contacto",
    desc: "Identidad inteligente y networking sin fricciones en un solo toque.",
    gradient: "from-blue-500/20 to-transparent",
    icon: Smartphone
  },
  {
    number: "AI",
    label: "integrada",
    title: "Candy Assistant",
    desc: "Asistente inteligente cognitivo diseñado para automatizar tu negocio.",
    gradient: "from-[#5200F8]/20 to-transparent",
    icon: Bot
  }
];

export const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-[#00001D] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top Badges Row */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-24 opacity-60">
          {trustBadges.map((badge, idx) => (
            <div key={idx} className="flex items-center gap-4 group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-white/10 group-hover:border-primary/30 transition-all duration-500">
                <badge.icon className="w-6 h-6 text-white/40 group-hover:text-primary transition-colors" />
              </div>
              <div className="space-y-0.5">
                <span className="block text-[10px] font-black text-white/40 uppercase tracking-[0.2em] group-hover:text-white/60 transition-colors leading-tight max-w-[100px]">
                  {badge.text}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {impactCards.map((card, idx) => (
            <div 
              key={idx} 
              className={cn(
                "group relative p-10 md:p-12 rounded-[3.5rem] bg-white/[0.02] border border-white/5 overflow-hidden transition-all duration-700",
                "hover:border-primary/30 hover:bg-white/[0.04] hover:shadow-[0_30px_80px_rgba(0,0,0,0.6)]"
              )}
            >
              {/* Interactive Gradient Background */}
              <div className={cn(
                "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none", 
                card.gradient
              )} />
              
              <div className="relative z-10 space-y-10">
                <div className="flex justify-between items-start">
                  <div className="flex flex-col">
                    <span className="text-6xl md:text-8xl font-headline font-black text-white tracking-tighter italic leading-none">
                      {card.number}
                    </span>
                    <span className="text-primary font-black uppercase text-[10px] tracking-[0.4em] mt-2 ml-1">
                      {card.label}
                    </span>
                  </div>
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                    <card.icon className="w-7 h-7 text-white/20 group-hover:text-primary transition-colors" />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-headline font-black text-white group-hover:text-primary transition-colors uppercase tracking-tight italic">
                    {card.title}
                  </h3>
                  <p className="text-white/40 text-sm md:text-base leading-relaxed font-medium group-hover:text-white/60 transition-colors">
                    {card.desc}
                  </p>
                </div>

                <div className="pt-6">
                  <div className="w-12 h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="w-0 h-full bg-primary group-hover:w-full transition-all duration-1000" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(82,0,248,0.02)_0%,transparent_70%)] pointer-events-none" />
    </section>
  );
};
