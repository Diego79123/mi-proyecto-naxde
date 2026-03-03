
"use client"

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const DisruptiveVisionBanner = () => {
  return (
    <section className="pb-24 md:pb-40 bg-[#00001D] px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="p-12 md:p-20 rounded-[3.5rem] bg-gradient-to-r from-primary/10 via-secondary/10 to-transparent border border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-primary/20 rounded-full blur-[80px] md:blur-[120px] -z-10 transition-transform duration-[2s] -mr-20 -mt-20 group-hover:scale-150" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-3xl md:text-5xl font-headline font-black text-white leading-tight uppercase tracking-tighter">
                ¿TIENES UNA VISIÓN <br />
                <span className="text-primary">DISRUPTIVA?</span>
              </h3>
              <p className="text-lg text-white/50 leading-relaxed max-w-md">
                Nuestra ingeniería y creatividad están a tu servicio para construir el próximo gran hito digital de tu industria.
              </p>
            </div>
            <div className="flex justify-start lg:justify-end">
              <Link href="/contacto">
                <Button size="lg" className="h-16 md:h-20 px-10 md:px-12 bg-primary hover:bg-primary/90 text-white rounded-full text-xl md:text-2xl font-black neon-accent shadow-glow-accent transition-all hover:scale-105 active:scale-95 group">
                  Cotizar Proyecto
                  <ArrowRight className="w-6 h-6 md:w-8 md:h-8 ml-3 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
