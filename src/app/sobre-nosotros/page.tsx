"use client"

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { Target, Eye, Users, ShieldCheck, Globe, Rocket, Zap } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function SobreNosotrosPage() {
  return (
    <main className="min-h-screen bg-background text-white">
      <Header />

      <section className="pt-40 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-8xl font-headline font-bold tracking-tighter">
            SOMOS <span className="text-primary italic">NAXDE</span>.
          </h1>
          <p className="text-xl text-white/50 leading-relaxed">
            Un equipo de ingenieros, diseñadores y estrategas digitales unidos por una misión: construir el futuro de los negocios en Latinoamérica a través de tecnología disruptiva.
          </p>
        </div>
      </section>

      <section className="px-6 mb-24">
        <div className="max-w-7xl mx-auto h-[500px] rounded-[3rem] overflow-hidden relative">
          <div className="absolute inset-0 bg-primary/20 blur-[150px] -z-10" />
          <img 
            src={PlaceHolderImages.find(i => i.id === 'team-collab')?.imageUrl} 
            alt="Naxde Team Collaboration" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 border border-white/10"
            data-ai-hint="tech team collaboration"
          />
        </div>
      </section>

      <section className="py-24 bg-white/[0.02] border-y border-white/5 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Rocket className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl font-headline font-bold">Nuestra Misión</h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Democratizar el acceso a tecnologías de alta gama para empresas de todos los tamaños en Colombia y la región, impulsando su competitividad mediante plataformas digitales de clase mundial.
            </p>
          </div>
          <div className="space-y-8">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Eye className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-4xl font-headline font-bold">Nuestra Visión</h2>
            <p className="text-white/60 text-lg leading-relaxed">
              Ser el socio tecnológico #1 en Latinoamérica para 2030, reconocidos por nuestra capacidad de innovación en software, NFC e Inteligencia Artificial aplicada.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-headline font-bold text-center mb-16 uppercase tracking-[0.3em] text-primary">Nuestros Valores</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Innovación Radical", desc: "No seguimos tendencias, las creamos.", icon: Zap },
              { title: "Calidad Premium", desc: "Cada pixel y cada línea de código cuenta.", icon: ShieldCheck },
              { title: "Transparencia", desc: "Comunicación clara y honesta en cada paso.", icon: Users },
              { title: "Impacto Social", desc: "Tecnología que mejora vidas y negocios.", icon: Globe }
            ].map((v, i) => (
              <div key={i} className="glass-card p-10 rounded-[2.5rem] border border-white/5 text-center space-y-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mx-auto">
                  <v.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">{v.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </main>
  );
}