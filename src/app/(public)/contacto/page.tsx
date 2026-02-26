"use client"

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { Mail, Phone, MapPin, Send, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';

export default function ContactoPage() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        toast({
          title: "Mensaje enviado",
          description: "Nos pondremos en contacto contigo pronto.",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error();
      }
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo enviar el mensaje. Inténtalo más tarde.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-white">
      <Header />

      <section className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h1 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter">HABLEMOS DEL <span className="text-primary">FUTURO</span>.</h1>
            <p className="text-white/50 text-xl max-w-2xl mx-auto">Estamos listos para transformar tu negocio. Encuéntranos o escríbenos directamente.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <div className="glass-card p-8 rounded-3xl space-y-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-headline font-bold text-2xl">Ubicación</h3>
              <p className="text-white/60">Calle 154 # 103B - 76<br />Bogotá, Colombia</p>
              <Button variant="outline" className="w-full rounded-full border-white/10 hover:bg-white/5" asChild>
                <a href="https://maps.app.goo.gl/cy8VBTKF9QKhdb27A" target="_blank">Ver en Google Maps</a>
              </Button>
            </div>

            <div className="glass-card p-8 rounded-3xl space-y-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-headline font-bold text-2xl">WhatsApp</h3>
              <p className="text-white/60">Chat directo con asesor<br />Disponible 24/7</p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-full neon-accent" asChild>
                <a href="https://wa.me/57315001001" target="_blank">Chat Directo</a>
              </Button>
            </div>

            <div className="glass-card p-8 rounded-3xl space-y-6 text-center">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-headline font-bold text-2xl">Email</h3>
              <p className="text-white/60">Consultas técnicas y ventas<br />Respuesta en 24h</p>
              <Button variant="outline" className="w-full rounded-full border-white/10 hover:bg-white/5" asChild>
                <a href="mailto:desarrollonaxde@gmail.com">Enviar Correo</a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="glass-card p-10 rounded-[2.5rem] border border-white/10">
              <h2 className="text-3xl font-headline font-bold mb-8">Envíanos un mensaje</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/50 px-1">Nombre</label>
                    <Input name="name" required placeholder="Tu nombre completo" className="bg-white/5 border-white/10 rounded-xl h-12 focus:border-primary/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/50 px-1">Email</label>
                    <Input name="email" type="email" required placeholder="tu@empresa.com" className="bg-white/5 border-white/10 rounded-xl h-12 focus:border-primary/50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/50 px-1">Mensaje</label>
                  <Textarea name="message" required placeholder="¿En qué podemos ayudarte?" className="bg-white/5 border-white/10 rounded-xl min-h-[150px] focus:border-primary/50" />
                </div>
                <Button type="submit" disabled={loading} className="w-full h-14 bg-primary hover:bg-primary/90 text-white rounded-full neon-accent text-lg font-bold">
                  {loading ? "Enviando..." : "Enviar Propuesta"}
                  {!loading && <Send className="w-5 h-5 ml-2" />}
                </Button>
              </form>
            </div>

            <div className="h-[500px] lg:h-auto glass-card rounded-[2.5rem] border border-white/10 overflow-hidden relative">
              <iframe 
                src="https://www.google.com/maps?q=Calle+154+103B-76&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }} 
                allowFullScreen={true} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-6 left-6 glass-panel px-4 py-2 rounded-full border border-primary/30 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-bold text-white">Sede Central Bogotá</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </main>
  );
}