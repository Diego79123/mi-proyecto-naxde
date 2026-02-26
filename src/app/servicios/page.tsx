"use client"

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { Smartphone, Globe, Zap, Cpu, Code, Database, ShieldCheck, BarChart, ShoppingBag, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const allServices = [
  { id: 1, title: "Desarrollo Web & Mobile", desc: "Aplicaciones nativas e híbridas con foco en rendimiento extremo y UX futurista.", icon: Smartphone },
  { id: 2, title: "Páginas Interactivas", desc: "Sitios web que no solo informan, sino que cautivan mediante animaciones y experiencias inmersivas.", icon: Globe },
  { id: 3, title: "Tecnología NFC", desc: "La evolución del networking y control de acceso. Identidad digital en un solo toque.", icon: Zap },
  { id: 4, title: "Automatización CRM", desc: "Optimizamos tus flujos de venta y atención al cliente mediante integraciones inteligentes.", icon: Database },
  { id: 5, title: "Plataformas SaaS", desc: "Construimos tu modelo de negocio escalable basado en suscripciones y multi-tenancy.", icon: Code },
  { id: 6, title: "Fidelización Digital", desc: "Sistemas de puntos, cupones y dashboards para retener a tus clientes con tecnología QR/NFC.", icon: BarChart },
  { id: 7, title: "IA para Negocios", desc: "Implementación de LLMs y automatización generativa para transformar procesos operativos.", icon: Cpu },
  { id: 8, title: "Arquitectura Cloud", desc: "Infraestructura robusta sobre Firebase y GCP, enfocada en seguridad y alta disponibilidad.", icon: ShieldCheck },
  { id: 9, title: "Diseño UI/UX Premium", desc: "Sistemas de diseño escalables que reflejan el ADN futurista y profesional de tu marca.", icon: Palette },
  { id: 10, title: "Ecommerce & Marketplaces", desc: "Venta digital sin fricciones con pasarelas de pago locales e internacionales.", icon: ShoppingBag }
];

export default function ServiciosPage() {
  return (
    <main className="min-h-screen bg-background text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto text-center space-y-6">
          <h1 className="text-5xl md:text-8xl font-headline font-bold tracking-tighter leading-none">
            SOLUCIONES <span className="text-primary italic">SIN LÍMITES</span>.
          </h1>
          <p className="text-xl text-white/50 max-w-3xl mx-auto leading-relaxed">
            Desde Bogotá para toda Latinoamérica, construimos el software que definirá el éxito de tu empresa en la próxima década.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {allServices.map((service) => (
            <div key={service.id} className="glass-card p-10 rounded-[2.5rem] border border-white/5 hover:border-primary/30 transition-all group">
              <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-500">
                <service.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-2xl font-headline font-bold mb-4">{service.title}</h3>
              <p className="text-white/50 leading-relaxed mb-8">{service.desc}</p>
              <Button variant="link" className="text-primary p-0 group-hover:gap-4 transition-all">
                Saber más <Zap className="w-4 h-4 ml-2" />
              </Button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA final */}
      <section className="py-24 px-6 bg-primary/5">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-4xl md:text-5xl font-headline font-bold">¿TIENES UN PROYECTO EN MENTE?</h2>
          <p className="text-white/60 text-lg">Hablemos hoy mismo y descubre cómo la tecnología de Naxde puede escalar tu negocio.</p>
          <div className="flex justify-center gap-4">
            <Link href="/contacto">
              <Button className="h-14 px-10 bg-primary hover:bg-primary/90 text-white rounded-full neon-accent text-lg font-bold">
                Agendar Consultoría Gratis
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </main>
  );
}