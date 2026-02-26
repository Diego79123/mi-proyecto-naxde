
"use client"

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { Mail, Phone, MapPin, Send, MessageCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';

export default function ContactoPage() {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const db = useFirestore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
      source: 'web_contact_form',
      status: 'new',
      createdAt: serverTimestamp()
    };

    try {
      const leadsRef = collection(db, 'leads');
      addDocumentNonBlocking(leadsRef, data);
      
      toast({
        title: "Mensaje Enviado",
        description: "Tu solicitud ha sido recibida. Un consultor experto te contactará pronto.",
      });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "No se pudo enviar el mensaje. Por favor, intenta vía WhatsApp.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-white">
      <Header />

      <section className="pt-40 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h1 className="text-5xl md:text-8xl font-headline font-bold tracking-tighter leading-none">
              HABLEMOS DEL <span className="text-primary italic">FUTURO</span>.
            </h1>
            <p className="text-white/50 text-xl max-w-2xl mx-auto leading-relaxed">
              Estamos listos para transformar tu negocio. Encuéntranos en Bogotá o escríbenos directamente desde cualquier lugar de LATAM.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            <div className="glass-card p-10 rounded-[2.5rem] space-y-6 text-center border border-white/5">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-headline font-bold text-2xl">Ubicación</h3>
              <p className="text-white/60">Calle 154 # 103B - 76<br />Bogotá, Colombia</p>
              <Button variant="outline" className="w-full rounded-full border-white/10 hover:bg-white/5" asChild>
                <a href="https://maps.app.goo.gl/cy8VBTKF9QKhdb27A" target="_blank">Ver en Maps</a>
              </Button>
            </div>

            <div className="glass-card p-10 rounded-[2.5rem] space-y-6 text-center border border-white/5">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <MessageCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-headline font-bold text-2xl">WhatsApp</h3>
              <p className="text-white/60">Asesoría técnica inmediata<br />Disponible para toda la región</p>
              <Button className="w-full bg-primary hover:bg-primary/90 text-white rounded-full neon-accent" asChild>
                <a href="https://wa.me/57315001001" target="_blank">Chat Directo</a>
              </Button>
            </div>

            <div className="glass-card p-10 rounded-[2.5rem] space-y-6 text-center border border-white/5">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-headline font-bold text-2xl">Email</h3>
              <p className="text-white/60">Consultas técnicas y ventas<br />Respuesta en menos de 24h</p>
              <Button variant="outline" className="w-full rounded-full border-white/10 hover:bg-white/5" asChild>
                <a href="mailto:desarrollonaxde@gmail.com">Enviar Correo</a>
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="glass-card p-12 rounded-[3rem] border border-white/10">
              <h2 className="text-3xl font-headline font-bold mb-8">Cuéntanos tu visión</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 px-1">Nombre Completo</label>
                    <Input name="name" required placeholder="Ej: Juan Pérez" className="bg-white/5 border-white/10 rounded-xl h-14 focus:border-primary/50" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 px-1">Email Corporativo</label>
                    <Input name="email" type="email" required placeholder="nombre@empresa.com" className="bg-white/5 border-white/10 rounded-xl h-14 focus:border-primary/50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 px-1">Teléfono / WhatsApp</label>
                  <Input name="phone" placeholder="+57 300 000 0000" className="bg-white/5 border-white/10 rounded-xl h-14 focus:border-primary/50" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-[0.2em] text-white/40 px-1">Tu Mensaje</label>
                  <Textarea name="message" required placeholder="Describe brevemente tu proyecto o necesidad..." className="bg-white/5 border-white/10 rounded-xl min-h-[180px] focus:border-primary/50 text-lg" />
                </div>
                <Button type="submit" disabled={loading} className="w-full h-16 bg-primary hover:bg-primary/90 text-white rounded-full neon-accent text-xl font-bold transition-all">
                  {loading ? "Procesando..." : "Enviar Propuesta"}
                  {!loading && <Send className="w-6 h-6 ml-2" />}
                </Button>
              </form>
            </div>

            <div className="h-[600px] lg:h-auto glass-card rounded-[3rem] border border-white/10 overflow-hidden relative">
              <iframe 
                src="https://www.google.com/maps?q=Calle+154+103B-76+Bogota&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }} 
                allowFullScreen={true} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-8 left-8 glass-panel px-6 py-3 rounded-full border border-primary/30 flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-primary animate-pulse shadow-[0_0_12px_#F80037]" />
                <span className="text-sm font-bold text-white tracking-widest uppercase">Sede Central Bogotá</span>
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
