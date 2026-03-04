
"use client"

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { Mail, Phone, MapPin, Send, MessageCircle, Sparkles, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useFirestore } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';
import { addDocumentNonBlocking } from '@/firebase/non-blocking-updates';
import { cn } from '@/lib/utils';

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
        title: "MISIÓN RECIBIDA",
        description: "Tu visión está siendo procesada por nuestros arquitectos digitales.",
      });
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      toast({
        variant: "destructive",
        title: "ERROR DE CONEXIÓN",
        description: "El canal de comunicación ha fallado. Por favor, usa WhatsApp.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#00001D] text-white font-body selection:bg-primary/30">
      <Header />

      <section className="pt-40 pb-24 px-6 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] -z-10" />
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Canal de Enlace</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-headline font-black tracking-tighter leading-[0.9] uppercase">
            HABLEMOS DEL <br /> <span className="text-primary italic">FUTURO</span>.
          </h1>
          <p className="text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-medium">
            Tu visión merece una ingeniería que no conozca límites. Estamos listos para aterrizar tu próximo gran proyecto digital.
          </p>
        </div>
      </section>

      <section className="pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
            {[
              { title: "Ubicación", content: "CRA 103 B # 152 C - 10\nBogotá, Colombia", icon: MapPin, action: "VER EN MAPS", href: "https://maps.app.goo.gl/ii7bAyev7ZioPuuj9" },
              { title: "WhatsApp Pro", content: "Asesoría técnica inmediata\nCanal prioritario", icon: MessageCircle, action: "CHAT DIRECTO", href: "https://wa.me/57315001001", highlight: true },
              { title: "Email", content: "Ventas y Consultas\ndesarrollonaxde@gmail.com", icon: Mail, action: "ENVIAR CORREO", href: "mailto:desarrollonaxde@gmail.com" }
            ].map((item, idx) => (
              <div key={idx} className={cn(
                "glass-card p-12 rounded-[3rem] space-y-8 text-center border border-white/5 transition-all duration-500",
                item.highlight && "border-primary/20 shadow-glow-accent"
              )}>
                <div className="w-20 h-20 rounded-[2rem] bg-white/5 flex items-center justify-center mx-auto border border-white/5 group-hover:scale-110 transition-transform">
                  <item.icon className="w-10 h-10 text-primary" />
                </div>
                <div className="space-y-4">
                  <h3 className="font-headline font-black text-2xl uppercase tracking-tight">{item.title}</h3>
                  <p className="text-white/50 font-medium whitespace-pre-line leading-relaxed">{item.content}</p>
                </div>
                <Button variant={item.highlight ? "default" : "outline"} className={cn(
                  "w-full h-14 rounded-full font-black uppercase tracking-widest text-xs transition-all",
                  item.highlight ? "bg-primary hover:bg-primary/90 text-white neon-accent" : "border-white/10 hover:bg-white/5"
                )} asChild>
                  <a href={item.href} target="_blank">{item.action}</a>
                </Button>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="glass-card p-12 md:p-16 rounded-[4rem] border border-white/5">
              <h2 className="text-4xl font-headline font-black mb-10 uppercase tracking-tighter">CUÉNTANOS TU <span className="text-primary italic">VISIÓN</span></h2>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 px-1">Nombre Completo</label>
                    <Input name="name" required placeholder="Ej: Juan Pérez" className="bg-white/5 border-white/10 rounded-2xl h-16 focus:border-primary/50 text-lg font-medium" />
                  </div>
                  <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 px-1">Email Corporativo</label>
                    <Input name="email" type="email" required placeholder="nombre@empresa.com" className="bg-white/5 border-white/10 rounded-2xl h-16 focus:border-primary/50 text-lg font-medium" />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 px-1">WhatsApp / Teléfono</label>
                  <Input name="phone" placeholder="+57 300 000 0000" className="bg-white/5 border-white/10 rounded-2xl h-16 focus:border-primary/50 text-lg font-medium" />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 px-1">Tu Proyecto</label>
                  <Textarea name="message" required placeholder="Describe tu necesidad o reto tecnológico..." className="bg-white/5 border-white/10 rounded-[2rem] min-h-[200px] focus:border-primary/50 text-lg font-medium leading-relaxed" />
                </div>
                <Button type="submit" disabled={loading} className="w-full h-20 bg-primary hover:bg-primary/90 text-white rounded-full neon-accent text-xl font-black uppercase tracking-widest transition-all hover:scale-[1.02] shadow-glow-accent group">
                  {loading ? "PROCESANDO..." : "INICIAR ATERRIZAJE"}
                  {!loading && <Send className="w-6 h-6 ml-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />}
                </Button>
              </form>
            </div>

            <div className="h-[600px] lg:h-auto glass-card rounded-[4rem] border border-white/5 overflow-hidden relative shadow-2xl">
              <iframe 
                src="https://www.google.com/maps?q=Cra+103B+%23+152C+-+10+Bogota&output=embed" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.8) contrast(1.2)' }} 
                allowFullScreen={true} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-10 left-10 glass-panel px-8 py-4 rounded-full border border-primary/30 flex items-center gap-4">
                <div className="w-4 h-4 rounded-full bg-primary animate-pulse shadow-glow-accent" />
                <span className="text-[10px] font-black text-white tracking-[0.4em] uppercase">Sede Central Bogotá</span>
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
