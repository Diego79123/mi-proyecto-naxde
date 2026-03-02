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
    <section className="py-32 relative overflow-hidden">
      {/* Black Hole Transition Overlay */}
      {isTransitioning && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
          <div className="absolute inset-0 bg-black animate-in fade-in duration-1000" />
          <div className="relative w-full h-full flex items-center justify-center">
            <div className="absolute w-[50vh] h-[50vh] rounded-full bg-black shadow-[0_0_150px_#F80037,0_0_300px_#5200F8,inset_0_0_100px_rgba(0,0,0,1)] animate-black-hole flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent_0%,#F80037_50%,transparent_100%)] opacity-30 animate-spin duration-[3s]" />
            </div>
            <div className="absolute w-[60vh] h-[60vh] rounded-full border-[30px] border-white/5 backdrop-blur-[40px] animate-black-hole" style={{ animationDelay: '0.1s' }} />
          </div>
        </div>
      )}

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-7xl bg-primary/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="relative order-2 lg:order-1 group">
          <div className="relative aspect-[4/5] max-w-md mx-auto">
            <div className="absolute -inset-10 bg-gradient-to-tr from-primary/20 to-transparent blur-[100px] opacity-50 group-hover:opacity-80 transition-opacity duration-1000" />
            <img 
              src={PlaceHolderImages.find(i => i.id === 'nfc-demo')?.imageUrl} 
              alt="Neocard Smart Card Demo" 
              className="w-full h-full object-cover rounded-[3.5rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)] group-hover:scale-[1.02] transition-transform duration-1000"
              data-ai-hint="nfc card use"
            />
            {/* Interactive Card Floats */}
            <div className="absolute -top-10 -right-10 glass-panel p-6 rounded-[2rem] border border-primary/30 animate-bounce delay-100 backdrop-blur-2xl shadow-2xl">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center">
                  <Smartphone className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <div className="text-white text-sm font-black uppercase tracking-widest">Lectura Pro</div>
                  <div className="text-white/40 text-[10px] uppercase font-bold tracking-widest">Tecnología Instantánea</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-12 order-1 lg:order-2">
          <div className="space-y-6">
            <h2 className="text-primary font-bold uppercase tracking-[0.4em] text-xs">Producto Estrella</h2>
            <h3 className="text-6xl md:text-[8rem] font-headline font-black text-white leading-[0.8] tracking-tighter">
              TU <span className="text-primary italic">NEOCARD</span> <br />
              <span className="text-outline opacity-40">UN TOQUE.</span>
            </h3>
            <p className="text-xl text-white/50 leading-relaxed font-medium">
              Elimina las barreras físicas. Con Neocard, compartes tu ecosistema digital al instante, capturando leads y oportunidades con tecnología de contacto ultra-rápida.
            </p>
          </div>

          <ul className="space-y-6">
            {[
              "Ecosistema de información gestionable 24/7",
              "Sin contacto, 100% digital y ecológico",
              "Métricas de conversión y analítica avanzada",
              "Diseño premium con acabados de alta gama"
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-4 group">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all duration-500">
                  <Check className="w-5 h-5 text-primary group-hover:text-white" />
                </div>
                <span className="text-white/70 font-bold text-lg group-hover:text-white transition-colors">{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-6 pt-8">
            <Button 
              onClick={handleNavigate}
              size="lg" 
              className="h-20 px-12 bg-primary hover:bg-primary/90 text-white rounded-full neon-accent text-2xl font-black w-full sm:w-auto transition-all hover:scale-105 active:scale-95"
            >
              Ver Modelos
              <Target className="w-8 h-8 ml-3" />
            </Button>
            <a href="https://wa.me/57315001001" target="_blank" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="h-20 px-12 border-white/20 hover:bg-white/10 text-white rounded-full text-2xl font-black w-full backdrop-blur-md">
                Hablar con Pro
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
