
"use client"

import React, { use, useState, useEffect } from 'react';
import { useDoc, useFirestore, useMemoFirebase } from '@/firebase';
import { doc, collection, query, where, limit, getDocs } from 'firebase/firestore';
import { 
  Smartphone, 
  Mail, 
  Phone, 
  Linkedin, 
  MessageCircle, 
  UserPlus, 
  Globe, 
  Zap, 
  MapPin, 
  Clock, 
  Calendar as CalendarIcon, 
  Trophy, 
  User, 
  Home,
  X,
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

const LOGO_URL = "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Logos%2FLogo%20naxde.png?alt=media&token=1df1f19b-978a-4f23-8f2f-d0d9efb42764";

interface DigitalCardPageProps {
  params: Promise<{ slug: string }>;
}

type SectionType = 'inicio' | 'perfil' | 'calendario' | 'horario' | 'logros';

export default function DigitalCardPage({ params }: DigitalCardPageProps) {
  const { slug } = use(params);
  const db = useFirestore();
  const [activeSection, setActiveSection] = useState<SectionType>('inicio');
  const [member, setMember] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMember() {
      if (!db) return;
      setIsLoading(true);
      const q = query(collection(db, 'team_members'), where('slug', '==', slug), where('isActive', '==', true), limit(1));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        setMember({ ...snapshot.docs[0].data(), id: snapshot.docs[0].id });
      } else if (slug === 'oscar-rivera') {
        // Fallback for Oscar Rivera if DB is empty for initial demo
        setMember({
          name: 'Oscar Rivera',
          role: 'Director de Estrategia e IA',
          slug: 'oscar-rivera',
          profileImageUrl: 'https://picsum.photos/seed/oscar/400/400',
          bio: 'Liderando la transformación digital en Latinoamérica a través de tecnología NFC e Inteligencia Artificial.',
          phone: '+57 318 425 4198',
          email: 'naxdeadmon@gmail.com',
          whatsapp: '573184254198',
          linkedinUrl: 'https://linkedin.com',
          address: 'Calle 153 #103B-76, Oficina 103, Bogotá'
        });
      }
      setIsLoading(false);
    }
    fetchMember();
  }, [db, slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#00001D] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-[#00001D] flex flex-col items-center justify-center p-6 text-center space-y-6">
        <Zap className="w-16 h-16 text-primary animate-pulse" />
        <h1 className="text-3xl font-headline font-bold text-white uppercase tracking-tighter">Perfil no encontrado</h1>
        <p className="text-white/50">Esta tarjeta digital no existe o ha sido desactivada.</p>
        <Link href="/">
          <Button className="bg-primary text-white rounded-full px-8 neon-accent">Volver al Inicio</Button>
        </Link>
      </div>
    );
  }

  const handleSaveContact = () => {
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${member.name}
ORG:Naxde Digital Hub
TITLE:${member.role}
TEL;TYPE=CELL:${member.phone || member.whatsapp}
EMAIL:${member.email}
ADR;TYPE=WORK:;;${member.address || ''};Bogotá;;;Colombia
URL:${window.location.href}
END:VCARD`;
    
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${member.slug}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const navItems = [
    { id: 'inicio', icon: Home, label: 'Inicio' },
    { id: 'perfil', icon: User, label: 'Perfil' },
    { id: 'calendario', icon: CalendarIcon, label: 'Calendario' },
    { id: 'horario', icon: Clock, label: 'Horario' },
    { id: 'logros', icon: Trophy, label: 'Logros' },
  ];

  return (
    <main className="min-h-screen bg-[#00001D] text-white flex flex-col items-center overflow-x-hidden relative font-body selection:bg-primary/30">
      
      {/* Star Field Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#00001D]">
        <div className="absolute top-[-10%] left-[-20%] w-[100%] h-[50%] bg-primary/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-20%] w-[100%] h-[50%] bg-secondary/10 blur-[150px] rounded-full" />
        {/* Animated stars mock */}
        {[...Array(50)].map((_, i) => (
          <div 
            key={i} 
            className="absolute bg-white rounded-full opacity-30 animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 2}px`,
              height: `${Math.random() * 2}px`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* Main Container */}
      <div className="w-full max-w-lg flex flex-col items-center px-6 pt-20 pb-40 space-y-10">
        
        {/* Profile Card Header */}
        <section className="flex flex-col items-center text-center space-y-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-primary to-secondary rounded-full blur opacity-75 animate-pulse"></div>
            <Avatar className="w-32 h-32 border-4 border-[#00001D] relative shadow-[0_0_20px_rgba(248,0,55,0.3)]">
              <AvatarImage src={member.profileImageUrl} alt={member.name} className="object-cover" />
              <AvatarFallback className="bg-white/5 text-3xl font-headline">{member.name[0]}</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-[#00001D] flex items-center justify-center">
              <div className="w-3 h-1.5 border-l-2 border-b-2 border-white -rotate-45 mb-0.5" />
            </div>
          </div>
          
          <div className="space-y-1">
            <h1 className="text-3xl font-headline font-bold tracking-tight text-white">{member.name}</h1>
            <p className="text-primary text-sm font-bold uppercase tracking-widest">{member.role}</p>
          </div>
        </section>

        {/* Contact Details List */}
        <section className="w-full space-y-3 px-2">
          {member.phone && (
            <div className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group">
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-white/40 group-hover:text-primary" />
              </div>
              <span className="text-sm font-medium">{member.phone}</span>
            </div>
          )}
          {member.email && (
            <div className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group">
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-white/40 group-hover:text-primary" />
              </div>
              <span className="text-sm font-medium">{member.email}</span>
            </div>
          )}
          {member.address && (
            <div className="flex items-center gap-4 text-white/60 hover:text-white transition-colors group">
              <div className="w-5 h-5 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-white/40 group-hover:text-primary" />
              </div>
              <span className="text-sm font-medium leading-tight">{member.address}</span>
            </div>
          )}
        </section>

        {/* Action Buttons Grid */}
        <section className="w-full grid grid-cols-2 gap-4">
          <Button 
            variant="outline"
            className="h-12 bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl flex items-center justify-center gap-2 group"
            onClick={() => window.open(`tel:${member.phone?.replace(/\s/g, '')}`, '_self')}
          >
            <Phone className="w-4 h-4 text-white/40 group-hover:text-primary transition-transform group-hover:scale-110" />
            <span className="text-xs font-bold uppercase tracking-widest">Llamar</span>
          </Button>

          <Button 
            className="h-12 bg-primary hover:bg-primary/90 text-white rounded-xl flex items-center justify-center gap-2 neon-accent"
            onClick={() => window.open(`https://wa.me/${member.whatsapp}`, '_blank')}
          >
            <MessageCircle className="w-4 h-4" />
            <span className="text-xs font-bold uppercase tracking-widest">WhatsApp</span>
          </Button>

          <Button 
            variant="outline"
            className="h-12 bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl flex items-center justify-center gap-2 group"
            onClick={() => window.open(`mailto:${member.email}`, '_self')}
          >
            <Mail className="w-4 h-4 text-white/40 group-hover:text-primary transition-transform group-hover:scale-110" />
            <span className="text-xs font-bold uppercase tracking-widest">Email</span>
          </Button>

          <Button 
            variant="outline"
            className="h-12 bg-white/5 border-white/10 hover:bg-white/10 text-white rounded-xl flex items-center justify-center gap-2 group"
            onClick={handleSaveContact}
          >
            <UserPlus className="w-4 h-4 text-white/40 group-hover:text-primary transition-transform group-hover:scale-110" />
            <span className="text-xs font-bold uppercase tracking-widest">Guardar Contacto</span>
          </Button>
        </section>

        {/* Brand Footer */}
        <footer className="pt-10 flex flex-col items-center space-y-2 opacity-30">
          <Image src={LOGO_URL} alt="Naxde Logo" width={60} height={18} className="h-4 w-auto object-contain grayscale" />
          <p className="text-[8px] font-bold uppercase tracking-[0.4em]">Propulsado por Naxde</p>
        </footer>
      </div>

      {/* Slide-up Panels (Inmersive Experience) */}
      {['perfil', 'calendario', 'horario', 'logros'].map((section) => (
        <div 
          key={section}
          className={cn(
            "fixed inset-0 z-[60] bg-[#00001D]/95 backdrop-blur-2xl transition-transform duration-500 ease-in-out transform flex flex-col",
            activeSection === section ? "translate-y-0" : "translate-y-full"
          )}
        >
          <header className="h-16 flex items-center justify-between px-6 border-b border-white/5">
            <span className="font-headline font-bold text-lg uppercase tracking-widest text-primary">{section}</span>
            <Button variant="ghost" size="icon" onClick={() => setActiveSection('inicio')} className="text-white/40 hover:text-white">
              <X className="w-6 h-6" />
            </Button>
          </header>
          <div className="flex-1 overflow-y-auto p-8 space-y-6">
            {section === 'perfil' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Sobre Mí</h3>
                <p className="text-white/60 leading-relaxed">{member.bio}</p>
                <div className="pt-6 grid grid-cols-1 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="text-primary text-xs font-bold uppercase mb-2">Especialidad</h4>
                    <p className="text-sm">Estrategia Digital & IA Aplicada</p>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <h4 className="text-primary text-xs font-bold uppercase mb-2">Experiencia</h4>
                    <p className="text-sm">+8 años construyendo ecosistemas tecnológicos.</p>
                  </div>
                </div>
              </div>
            )}
            {section === 'calendario' && (
              <div className="text-center space-y-6 pt-10">
                <CalendarIcon className="w-16 h-16 text-primary mx-auto opacity-20" />
                <h3 className="text-2xl font-bold">Agenda Digital</h3>
                <p className="text-white/50">Agenda una consultoría técnica o de estrategia directamente.</p>
                <Button className="bg-primary text-white rounded-full px-10 h-14 neon-accent">Reservar Espacio</Button>
              </div>
            )}
            {section === 'horario' && (
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Disponibilidad</h3>
                <div className="space-y-3">
                  {[
                    { day: 'Lunes - Viernes', time: '8:00 AM - 6:00 PM' },
                    { day: 'Sábados', time: '9:00 AM - 1:00 PM' },
                    { day: 'Domingos', time: 'Cerrado' }
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5">
                      <span className="font-bold text-sm">{item.day}</span>
                      <span className="text-white/40 text-sm">{item.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {section === 'logros' && (
              <div className="grid grid-cols-1 gap-4">
                {[
                  { title: "250+ Proyectos", desc: "Liderando despliegues de software en toda la región." },
                  { title: "Premio Innovación", desc: "Reconocimiento a la mejor integración NFC 2023." },
                  { title: "Certificación IA", desc: "Especialista certificado en soluciones generativas." }
                ].map((logro, i) => (
                  <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/5 flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Trophy className="w-6 h-6 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold">{logro.title}</h4>
                      <p className="text-xs text-white/40">{logro.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Bottom Inmersive Navigation Bar */}
      <nav className="fixed bottom-6 left-6 right-6 z-[70] h-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-full flex items-center justify-around px-2 shadow-2xl overflow-hidden">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as SectionType)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 transition-all relative h-full",
                isActive ? "text-primary scale-110" : "text-white/40 hover:text-white/60"
              )}
            >
              <item.icon className={cn("w-6 h-6", isActive && "drop-shadow-[0_0_8px_rgba(248,0,55,0.6)]")} />
              <span className="text-[8px] font-bold uppercase tracking-widest mt-1">{item.label}</span>
              {isActive && (
                <div className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_10px_#F80037]" />
              )}
            </button>
          );
        })}
      </nav>

    </main>
  );
}

