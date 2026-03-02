"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Smartphone, Check, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';

export const NFCSection = () => {
  const router = useRouter();
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleNavigate = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      router.push('/tarjetas-neocard');
    }, 1200);
  };

  return (
    <section className="py-24 md:py-32 relative overflow-hidden">
      {isTransitioning && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-black animate-in fade-in duration-1000" />
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute w-[40vh] h-[40vh] md:w-[50vh] md:h-[50vh] rounded-full bg-black shadow-[0_0_150px_#F80037,0_0_300px_#5200F8,inset_0_0_100px_rgba(0,0,0,1)] animate-black-hole flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0%,#F80037_50%,transparent_100%)] opacity-30 animate-spin duration-[3s]" />
            </div>
            <div className="absolute w-[50vh] h-[50vh] md:w-[60vh] md:h-[60vh] rounded-full border-[20px] md:border-[30px] border-white/5 backdrop-blur-[40px] animate-black-hole" style={{ animationDelay: '0.1s' }} />
          </div>
        </div>
      )}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl bg-primary/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        <div className="relative order-2 lg:order-1 group">
          <div className="relative aspect-[4/5] max-w-[320px] md:max-w-md mx-auto">
            <div className="absolute -inset-10 bg-gradient-to-tr from-primary/20 to-transparent blur-[100px] opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />
            <img 
              src={PlaceHolderImages.find(i => i.id === 'nfc-demo')?.imageUrl} 
              alt="Neocard Smart Card Demo" 
              className="w-full h-full object-cover rounded-[2.5rem] md:rounded-[3.5rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group-hover:scale-[1.02] transition-transform duration-1000"
              data-ai-hint="nfc card use"
            />
            <div className="absolute -top-6 -right-6 md:-top-10 md:-right-10 glass-panel p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-primary/30 animate-bounce backdrop-blur-2xl shadow-2xl">
              <div className="flex items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-xl md:rounded-2xl bg-primary/20 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 md:w-7 md:h-7 text-primary" />
                </div>
                <div>
                  <div className="text-white text-xs md:text-sm font-black uppercase tracking-widest">Lectura Pro</div>
                  <div className="text-white/40 text-[8px] md:text-[10px] uppercase font-bold tracking-widest">Instantánea</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8 md:space-y-12 order-1 lg:order-2">
          <div className="space-y-4 md:space-y-6">
            <h2 className="text-primary font-bold uppercase tracking-[0.4em] text-[10px] md:text-xs">Producto Estrella</h2>
            <h3 className="text-5xl sm:text-6xl md:text-[7rem] lg:text-[8rem] font-headline font-black text-white leading-[0.9] md:leading-[0.8] tracking-tighter">
              TU <span className="text-primary italic">NEOCARD</span> <br />
              <span className="text-outline opacity-40">UN TOQUE.</span>
            </h3>
            <p className="text-lg md:text-xl text-white/50 leading-relaxed font-medium">
              Elimina las barreras físicas. Con Neocard, compartes tu ecosistema digital al instante, capturando leads y oportunidades con tecnología de contacto ultra-rápida.
            </p>
          </div>

          <ul className="space-y-4 md:space-y-6">
            {[
              "Ecosistema gestionable 24/7",
              "Sin contacto, 100% digital",
              "Métricas de conversión avanzadas",
              "Diseño premium de alta gama"
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 md:gap-4 group">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-all duration-500">
                  <Check className="w-4 h-4 md:w-5 md:h-5 text-primary group-hover:text-white" />
                </div>
                <span className="text-white/70 font-bold text-base md:text-lg group-hover:text-white transition-colors">{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 md:gap-6 pt-4 md:pt-8">
            <Button 
              onClick={handleNavigate}
              size="lg" 
              className="h-16 md:h-20 px-10 md:px-12 bg-primary hover:bg-primary/90 text-white rounded-full neon-accent text-xl md:text-2xl font-black w-full sm:w-auto transition-all hover:scale-105"
            >
              Ver Modelos
              <Target className="w-6 h-6 md:w-8 md:h-8 ml-3" />
            </Button>
            <a href="https://wa.me/57315001001" target="_blank" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="h-16 md:h-20 px-10 md:px-12 border-white/20 hover:bg-white/10 text-white rounded-full text-xl md:text-2xl font-black w-full backdrop-blur-md">
                Hablar con Pro
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
