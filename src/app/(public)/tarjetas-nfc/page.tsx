"use client"

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { Smartphone, Zap, Share2, ShieldCheck, CreditCard, ChevronRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function TarjetasNFCPage() {
  return (
    <main className="min-h-screen bg-background text-white">
      <Header />

      {/* Landing Hero */}
      <section className="pt-32 pb-20 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20">
              <span className="text-xs font-bold text-primary tracking-widest uppercase">Tecnología de Contacto</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-headline font-bold leading-none tracking-tighter">
              TU IDENTIDAD EN UN <span className="text-primary">SOLO TOQUE</span>.
            </h1>
            <p className="text-xl text-white/60 leading-relaxed max-w-xl">
              Cambia la forma en que haces networking. Una tarjeta física premium vinculada a tu perfil digital inteligente. Sin apps, sin fricción.
            </p>
            <div className="flex gap-4">
              <Button size="lg" className="h-16 px-10 bg-primary hover:bg-primary/90 text-white rounded-full neon-accent text-lg font-bold">
                Pedir mi Tarjeta
                <CreditCard className="w-5 h-5 ml-2" />
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full" />
            <img 
              src={PlaceHolderImages.find(i => i.id === 'nfc-demo')?.imageUrl} 
              alt="NFC Card Interaction" 
              className="relative z-10 w-full rounded-[3rem] border border-white/10 shadow-3xl transform hover:scale-[1.02] transition-transform duration-500"
              data-ai-hint="nfc contact"
            />
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-24 bg-white/[0.02] border-y border-white/5 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-3xl md:text-5xl font-headline font-bold">¿POR QUÉ ELEGIR <span className="text-primary">NAXDE NFC</span>?</h2>
            <p className="text-white/50 max-w-2xl mx-auto">La tarjeta más avanzada tecnológicamente de Latinoamérica.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Actualizable", desc: "Cambia tu información en segundos desde tu panel privado sin costo adicional.", icon: Zap },
              { title: "Universal", desc: "Funciona con el 99% de los smartphones modernos (iPhone y Android).", icon: Smartphone },
              { title: "Premium", desc: "Materiales de alta durabilidad con acabados en negro mate, metal o PVC ecológico.", icon: Share2 }
            ].map((item, idx) => (
              <div key={idx} className="glass-card p-10 rounded-[2rem] space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-2xl font-headline font-bold">{item.title}</h3>
                <p className="text-white/50 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-headline font-bold text-center mb-16">¿CÓMO FUNCIONA?</h2>
          <div className="space-y-12">
            {[
              { step: "01", title: "Diseña y Ordena", desc: "Eliges tu modelo de tarjeta y personalizas con tu logo o nombre." },
              { step: "02", title: "Configura tu Perfil", desc: "Sube tu contacto, enlaces a redes sociales, portafolios y videos." },
              { step: "03", title: "¡Toca y Comparte!", desc: "Acerca tu tarjeta al celular de tu cliente y observa la magia." }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-8 group">
                <div className="text-5xl font-headline font-bold text-primary/20 group-hover:text-primary transition-colors">{item.step}</div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-headline font-bold">{item.title}</h3>
                  <p className="text-white/60 text-lg">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 px-6 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              { name: "Eco PVC", price: "$120.000", features: ["PVC Reciclado", "QR Trasero", "Perfil Digital Base"] },
              { name: "Premium Matte", price: "$180.000", features: ["Acabado Soft-Touch", "QR Personalizado", "Perfil Digital Pro", "Métricas Básicas"], popular: true },
              { name: "Metal Edition", price: "$350.000", features: ["Acero Inoxidable", "Grabado Láser", "Perfil Digital Ultra", "Métricas Avanzadas", "Soporte VIP"] }
            ].map((plan, idx) => (
              <div key={idx} className={cn(
                "glass-card p-10 rounded-[2.5rem] space-y-8 relative overflow-hidden",
                plan.popular && "border-primary/50 neon-accent bg-primary/5 scale-105"
              )}>
                {plan.popular && <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Más Vendido</div>}
                <div className="space-y-2">
                  <h3 className="text-2xl font-headline font-bold">{plan.name}</h3>
                  <div className="text-4xl font-headline font-bold text-primary">{plan.price}</div>
                  <div className="text-xs text-white/40 uppercase font-bold tracking-widest">Pago Único</div>
                </div>
                <ul className="space-y-4">
                  {plan.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                      <Check className="w-4 h-4 text-primary" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button className={cn(
                  "w-full h-14 rounded-full font-bold",
                  plan.popular ? "bg-primary text-white" : "bg-white/5 hover:bg-white/10 text-white"
                )}>Pedir Ahora</Button>
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