"use client"

import React from 'react';
import Link from 'next/link';
import { Smartphone, ArrowRight, Play, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-secondary/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
        <div className="space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-primary/20">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Liderazgo Digital en LATAM</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-headline font-bold leading-[0.9] text-white tracking-tighter">
            PLATAFORMAS <span className="text-primary italic">DIGITALES</span> QUE TRANSFORMAN.
          </h1>
          
          <p className="text-lg md:text-xl text-white/60 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            En Naxde construimos el futuro de los negocios en Colombia y Latinoamérica. Software premium, tarjetas NFC y escalabilidad sin límites.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <Link href="/contacto">
              <Button size="lg" className="h-14 px-8 bg-primary hover:bg-primary/90 text-white rounded-full neon-accent text-lg">
                Agendar Demo
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/proyectos">
              <Button size="lg" variant="outline" className="h-14 px-8 border-white/20 hover:bg-white/10 text-white rounded-full text-lg">
                Ver Proyectos
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 pt-6">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="text-sm text-white/70 font-medium">Conversión Garantizada</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <span className="text-sm text-white/70 font-medium">Arquitectura Cloud</span>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-[2.5rem] blur-2xl opacity-50 group-hover:opacity-100 transition-opacity" />
          <div className="relative glass-card p-4 rounded-[2rem] border border-white/10 overflow-hidden">
            <img 
              src={PlaceHolderImages.find(i => i.id === 'hero-tech')?.imageUrl} 
              alt="Naxde Futuristic Tech" 
              className="w-full h-auto rounded-[1.5rem] object-cover"
              data-ai-hint="futuristic tech"
            />
            
            {/* Overlay UI elements */}
            <div className="absolute bottom-8 left-8 right-8 glass-panel p-6 rounded-2xl border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Play className="w-5 h-5 text-primary fill-primary" />
                </div>
                <div>
                  <div className="text-white font-bold">Naxde Reel 2024</div>
                  <div className="text-white/50 text-xs">Transformación Digital</div>
                </div>
              </div>
              <div className="text-xs font-bold text-primary px-3 py-1 rounded-full bg-primary/10">EN VIVO</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};