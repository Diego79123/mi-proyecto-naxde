
"use client"

import React from 'react';
import { ArrowRight, Zap, ExternalLink, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const featuredCases = [
  {
    id: 1,
    title: "Vortex Experience",
    client: "Oscar Rivera",
    category: "Neocard Ecosystem",
    desc: "Transformación de la identidad digital tradicional a un ecosistema inmersivo con tecnología NFC y animaciones premium.",
    image: "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Tarjetas%20digitales%2FNaxde%2FPerfil%20oscar.jpeg?alt=media&token=1b57f085-d1fd-4435-8693-1be5d9bdd2b1",
    tags: ["NFC", "WebGL", "UX Strategy"]
  },
  {
    id: 2,
    title: "Smart Logistics AI",
    client: "TechCorp Latam",
    category: "Custom Software",
    desc: "Automatización de flujos logísticos mediante agentes de IA que optimizaron los tiempos de entrega en un 40%.",
    image: "https://images.unsplash.com/photo-1512364615838-8088a04a778b?q=80&w=1000",
    tags: ["Artificial Intelligence", "Cloud Architecture", "RPA"]
  }
];

export const SuccessStoriesSection = () => {
  return (
    <section className="py-24 md:py-40 bg-[#00001D] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Zap className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Impacto Real</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-headline font-black text-white uppercase tracking-tighter leading-none">
            CASOS DE <br />
            <span className="text-primary italic">ÉXITO</span>.
          </h2>
          <p className="text-white/40 font-medium text-lg max-w-2xl mx-auto">Ingeniería que trasciende los límites del código para transformar industrias.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {featuredCases.map((item) => (
            <div key={item.id} className="group relative rounded-[3rem] overflow-hidden bg-white/[0.02] border border-white/5 hover:border-primary/30 transition-all duration-700 shadow-2xl">
              <div className="relative aspect-video overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00001D] via-transparent to-transparent opacity-80" />
                <div className="absolute top-8 right-8">
                  <div className="px-4 py-1.5 rounded-full bg-primary/20 backdrop-blur-md border border-primary/30 text-primary text-[10px] font-black uppercase tracking-widest">
                    {item.category}
                  </div>
                </div>
              </div>

              <div className="p-10 md:p-12 space-y-6">
                <div className="space-y-2">
                  <p className="text-primary font-bold text-xs uppercase tracking-[0.3em]">{item.client}</p>
                  <h3 className="text-3xl font-headline font-black text-white uppercase tracking-tight group-hover:text-primary transition-colors">{item.title}</h3>
                </div>
                <p className="text-white/50 leading-relaxed font-medium line-clamp-3">
                  {item.desc}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, i) => (
                    <span key={i} className="text-[9px] font-black uppercase tracking-widest text-white/30 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                  <Link href="/proyectos">
                    <Button variant="link" className="p-0 text-white group-hover:text-primary transition-colors font-black uppercase tracking-widest text-[10px] gap-3">
                      VER PORTAFOLIO <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </Button>
                  </Link>
                  <Button size="icon" variant="ghost" className="h-12 w-12 rounded-2xl bg-white/5 border border-white/5 text-white/40 hover:text-white">
                    <ExternalLink className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
