
"use client"

import React, { useState, useEffect } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";

const reviews = [
  {
    id: 1,
    name: "Carolina Méndez",
    role: "Directora Comercial | Global Logistics",
    content: "Naxde transformó nuestra operación con el sistema de seguimiento por IA. La eficiencia aumentó un 30% en los primeros dos meses. Son ingenieros que realmente entienden el negocio.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200",
    rating: 5
  },
  {
    id: 2,
    name: "Ricardo Salcedo",
    role: "CEO | Startup Innovations",
    content: "La NeoCard ha sido un cambio total en mi networking. La elegancia y la velocidad con la que comparto mi ecosistema digital siempre deja a los inversores impresionados.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
    rating: 5
  },
  {
    id: 3,
    name: "Elena Petrova",
    role: "CTO | Visionary Hub",
    content: "El desarrollo web inmersivo que construyeron para nuestra marca elevó nuestra conversión a niveles que no habíamos visto antes. Ingeniería de clase mundial.",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200",
    rating: 5
  }
];

export const TestimonialsSection = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <section className="py-24 md:py-40 bg-[#00001D] relative overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle,rgba(82,0,248,0.03)_0%,transparent_70%)] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-md">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Confianza Global</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-headline font-black text-white uppercase tracking-tighter leading-none">
            VOCES DEL <br />
            <span className="text-primary italic">FUTURO</span>.
          </h2>
          <p className="text-white/40 font-medium text-lg">Lo que dicen los líderes que ya operan con tecnología Naxde.</p>
        </div>

        <Carousel 
          setApi={setApi}
          opts={{ align: "center", loop: true }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {reviews.map((review, idx) => (
              <CarouselItem key={review.id} className="pl-4 basis-full md:basis-1/2 lg:basis-1/3">
                <div className={cn(
                  "h-full p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 transition-all duration-500 flex flex-col justify-between group",
                  current === idx && "bg-white/[0.04] border-primary/20 scale-[1.02]"
                )}>
                  <div className="space-y-8">
                    <div className="flex justify-between items-start">
                      <div className="flex gap-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        ))}
                      </div>
                      <Quote className="w-10 h-10 text-primary opacity-20 group-hover:opacity-40 transition-opacity" />
                    </div>
                    
                    <p className="text-lg md:text-xl font-medium text-white/80 leading-relaxed italic">
                      "{review.content}"
                    </p>
                  </div>

                  <div className="pt-10 flex items-center gap-4 border-t border-white/5 mt-10">
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 group-hover:border-primary/30 transition-all">
                      <img src={review.avatar} alt={review.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white uppercase tracking-tight">{review.name}</h4>
                      <p className="text-[10px] text-white/40 font-bold uppercase tracking-widest">{review.role}</p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex justify-center gap-4 mt-12">
          <button 
            onClick={() => api?.scrollPrev()} 
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-white/5 hover:text-white transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            {reviews.map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "h-1.5 rounded-full transition-all duration-500",
                  current === i ? "w-8 bg-primary" : "w-2 bg-white/10"
                )} 
              />
            ))}
          </div>
          <button 
            onClick={() => api?.scrollNext()} 
            className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/40 hover:bg-white/5 hover:text-white transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
};
