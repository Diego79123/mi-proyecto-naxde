"use client"

import React from 'react';
import Link from 'next/link';
import { Smartphone, Check, ArrowRight, Zap, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export const NFCSection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-5xl bg-primary/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/5] max-w-md mx-auto">
            <div className="absolute -inset-10 bg-gradient-to-tr from-primary/20 to-transparent blur-3xl opacity-50" />
            <img 
              src={PlaceHolderImages.find(i => i.id === 'nfc-demo')?.imageUrl} 
              alt="NFC Smart Card Demo" 
              className="w-full h-full object-cover rounded-[2.5rem] border border-white/10 shadow-2xl"
              data-ai-hint="nfc card use"
            />
            {/* Interactive Card Floats */}
            <div className="absolute top-10 -right-10 glass-panel p-4 rounded-2xl border border-primary/20 animate-bounce delay-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Smartphone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-white text-xs font-bold">Lectura Instantánea</div>
                  <div className="text-white/40 text-[10px]">Sin aplicaciones extra</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8 order-1 lg:order-2">
          <div className="space-y-4">
            <h2 className="text-primary font-bold uppercase tracking-[0.2em] text-sm">Producto Estrella</h2>
            <h3 className="text-4xl md:text-6xl font-headline font-bold text-white leading-tight">
              TU TARJETA DIGITAL CON <span className="text-primary italic">UN SOLO</span> TOQUE.
            </h3>
            <p className="text-lg text-white/60 leading-relaxed">
              Olvídate de las tarjetas de papel. Con la tecnología NFC de Naxde, compartes tu contacto, redes y portafolio al acercar tu tarjeta a cualquier smartphone.
            </p>
          </div>

          <ul className="space-y-4">
            {[
              "Actualización remota de información 24/7",
              "Sin contacto físico, 100% digital e higiénico",
              "Métricas de escaneo y geolocalización",
              "Diseño premium personalizado con tu marca"
            ].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 group">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Check className="w-4 h-4 text-primary" />
                </div>
                <span className="text-white/70 font-medium">{item}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Link href="/tarjetas-nfc">
              <Button size="lg" className="h-14 px-8 bg-primary hover:bg-primary/90 text-white rounded-full neon-accent w-full sm:w-auto">
                Ver Modelos y Planes
                <Target className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="https://wa.me/57315001001" target="_blank">
              <Button size="lg" variant="outline" className="h-14 px-8 border-white/20 hover:bg-white/10 text-white rounded-full w-full sm:w-auto">
                Consultar con Asesor
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};