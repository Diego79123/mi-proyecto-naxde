
"use client"

import React, { use, useState, useEffect } from 'react';
import { useFirestore } from '@/firebase';
import { collection, query, where, limit, getDocs } from 'firebase/firestore';
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

type SectionType = 'inicio' | 'ubicacion' | 'calendario' | 'horario' | 'logros';

const SpaceBackground = () => {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; duration: string }[]>([]);
  const [shootingStars, setShootingStars] = useState<{ id: number; top: string; left: string; duration: string; delay: string }[]>([]);

  useEffect(() => {
    const starCount = 100;
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 0.5}px`,
      duration: `${Math.random() * 3 + 2}s`
    }));
    setStars(newStars);

    const shootingCount = 5;
    const newShootingStars = Array.from({ length: shootingCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 60}%`,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 3 + 2}s`,
      delay: `${Math.random() * 20}s`
    }));
    setShootingStars(newShootingStars);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#00001D]">
      {/* Deep Space Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00001D] via-[#00002D] to-[#00001D]" />
      
      {/* Nebula Effects */}
      <div className="absolute top-[-10%] right-[-10%] w-[120%] h-[70%] bg-primary/20 blur-[150px] rounded-full animate-pulse duration-[8000ms] mix-blend-screen" />
      <div className="absolute bottom-[-20%] left-[-20%] w-[100%] h-[80%] bg-secondary/15 blur-[150px] rounded-full animate-pulse duration-[10000ms] mix-blend-screen" />
      <div className="absolute top-[30%] left-[20%] w-[60%] h-[40%] bg-accent/10 blur-[130px] rounded-full animate-pulse duration-[6000ms]" />
      
      {/* Stars */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="star absolute bg-white rounded-full opacity-30 animate-pulse"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDuration: star.duration,
          }}
        />
      ))}

      {/* Shooting Stars with smooth transitions */}
      {shootingStars.map((ss) => (
        <div
          key={ss.id}
          className="shooting-star absolute h-[1.5px] bg-gradient-to-r from-white via-white/50 to-transparent opacity-0"
          style={{
            top: ss.top,
            left: ss.left,
            width: '200px',
            animation: `shooting ${ss.duration} linear infinite`,
            animationDelay: ss.delay
          }}
        />
      ))}
    </div>
  );
};

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
        setMember({
          name: 'Oscar Rivera',
          role: 'Director de Estrategia e IA',
          slug: 'oscar-rivera',
          profileImageUrl: 'https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Tarjetas%20digitales%2FNaxde%2FPerfil%20oscar.jpeg?alt=media&token=1b57f085-d1fd-4435-8693-1be5d9bdd2b1',
          bio: 'Liderando la transformación digital en Latinoamérica a través de tecnología NFC e Inteligencia Artificial. Apasionado por crear productos que cambian el status quo de las industrias.',
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
    { id: 'ubicacion', icon: MapPin, label: 'Ubicación' },
    { id: 'calendario', icon: CalendarIcon, label: 'Agenda' },
    { id: 'horario', icon: Clock, label: 'Horario' },
    { id: 'logros', icon: Trophy, label: 'Logros' },
  ];

  return (
    <main className="min-h-screen bg-[#00001D] text-white flex flex-col items-center overflow-x-hidden relative font-body selection:bg-primary/30">
      <SpaceBackground />
      
      {/* Container Principal con Blur cuando el popup está activo */}
      <div className={cn(
        "w-full max-w-lg flex flex-col items-center px-6 pt-10 pb-40 space-y-10 transition-all duration-500",
        activeSection !== 'inicio' ? "blur-sm opacity-40 scale-[0.98]" : "blur-0 opacity-100 scale-100"
      )}>
        
        {/* Logo Header */}
        <header className="w-full flex justify-center py-4">
          <Link href="/">
            <Image 
              src={LOGO_URL} 
              alt="Naxde Logo" 
              width={150} 
              height={45} 
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>
        </header>

        {/* Profile Card Header */}
        <section className="flex flex-col items-center text-center space-y-4 pt-4">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-br from-primary to-secondary rounded-full blur opacity-75 animate-pulse"></div>
            <Avatar className="w-32 h-32 border-4 border-[#00001D] relative shadow-[0_0_25px_rgba(248,0,55,0.4)]">
              <AvatarImage src={member.profileImageUrl} alt={member.name} className="object-cover" />
              <AvatarFallback className="bg-white/5 text-3xl font-headline">{member.name[0]}</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-[#00001D] flex items-center justify-center shadow-lg">
              <div className="w-3 h-1.5 border-l-2 border-b-2 border-white -rotate-45 mb-0.5" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl font-headline font-bold tracking-tight text-white leading-tight">{member.name}</h1>
            <p className="text-primary text-xs font-bold uppercase tracking-[0.3em]">{member.role}</p>
          </div>
        </section>

        {/* Contact Details List */}
        <section className="w-full space-y-4 px-4">
          {member.phone && (
            <div className="flex items-center gap-4 text-white/50 hover:text-white transition-all group bg-white/[0.03] p-3 rounded-2xl border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-sm font-medium">{member.phone}</span>
            </div>
          )}
          {member.email && (
            <div className="flex items-center gap-4 text-white/50 hover:text-white transition-all group bg-white/[0.03] p-3 rounded-2xl border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-sm font-medium truncate">{member.email}</span>
            </div>
          )}
          {member.address && (
            <div className="flex items-center gap-4 text-white/50 hover:text-white transition-all group bg-white/[0.03] p-3 rounded-2xl border border-white/5">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center shrink-0">
                <MapPin className="w-4 h-4 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <span className="text-sm font-medium leading-tight">{member.address}</span>
            </div>
          )}
        </section>

        {/* Action Buttons Grid */}
        <section className="w-full grid grid-cols-2 gap-4 px-2">
          <Button 
            variant="outline"
            className="h-14 bg-white/[0.05] border-white/10 hover:bg-white/10 text-white rounded-2xl flex items-center justify-center gap-3 group transition-all"
            onClick={() => window.open(`tel:${member.phone?.replace(/\s/g, '')}`, '_self')}
          >
            <Phone className="w-4 h-4 text-white/40 group-hover:text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Llamar</span>
          </Button>

          <Button 
            className="h-14 bg-primary hover:bg-primary/90 text-white rounded-2xl flex items-center justify-center gap-3 neon-accent group"
            onClick={() => window.open(`https://wa.me/${member.whatsapp}`, '_blank')}
          >
            <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">WhatsApp</span>
          </Button>

          <Button 
            variant="outline"
            className="h-14 bg-white/[0.05] border-white/10 hover:bg-white/10 text-white rounded-2xl flex items-center justify-center gap-3 group transition-all"
            onClick={() => window.open(`mailto:${member.email}`, '_self')}
          >
            <Mail className="w-4 h-4 text-white/40 group-hover:text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Email</span>
          </Button>

          <Button 
            variant="outline"
            className="h-14 bg-white/[0.05] border-white/10 hover:bg-white/10 text-white rounded-2xl flex items-center justify-center gap-3 group transition-all"
            onClick={handleSaveContact}
          >
            <UserPlus className="w-4 h-4 text-white/40 group-hover:text-primary" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Guardar</span>
          </Button>
        </section>

        {/* Brand Footer */}
        <footer className="pt-10 flex flex-col items-center space-y-3 opacity-30 pb-10">
          <Image src={LOGO_URL} alt="Naxde Logo" width={60} height={18} className="h-4 w-auto object-contain grayscale" />
          <div className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-primary" />
            <p className="text-[8px] font-bold uppercase tracking-[0.4em]">Propulsado por Naxde</p>
          </div>
        </footer>
      </div>

      {/* Panels (Slide-up Glass Panels) */}
      {['ubicacion', 'calendario', 'horario', 'logros'].map((section) => (
        <div 
          key={section}
          className={cn(
            "fixed inset-x-0 bottom-0 z-[80] bg-white/[0.03] backdrop-blur-[40px] border-t border-white/10 rounded-t-[3rem] transition-all duration-700 ease-in-out transform flex flex-col shadow-[0_-20px_50px_rgba(0,0,0,0.5)]",
            activeSection === section ? "h-[85vh] translate-y-0" : "h-0 translate-y-full"
          )}
        >
          {/* Handle de cierre arriba */}
          <div 
            className="w-full h-12 flex items-center justify-center cursor-pointer"
            onClick={() => setActiveSection('inicio')}
          >
            <div className="w-12 h-1.5 bg-white/20 rounded-full" />
          </div>

          <header className="h-16 flex items-center justify-between px-8 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                <Zap className="w-4 h-4 text-primary" />
              </div>
              <span className="font-headline font-bold text-lg uppercase tracking-[0.2em] text-white">
                {section === 'ubicacion' ? 'Ubicación' : 
                 section === 'calendario' ? 'Agenda' : 
                 section === 'horario' ? 'Horario' : 'Logros'}
              </span>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setActiveSection('inicio')} 
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 text-white/40 hover:text-white"
            >
              <X className="w-5 h-5" />
            </Button>
          </header>

          <div className="flex-1 overflow-y-auto px-8 pb-32 space-y-8 no-scrollbar">
            {section === 'ubicacion' && (
              <div className="text-center space-y-8 pt-12 animate-in fade-in scale-95 duration-700">
                <div className="relative inline-block">
                   <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                   <MapPin className="w-20 h-20 text-primary relative z-10 mx-auto" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">Nuestra Ubicación</h3>
                  <p className="text-white/40 text-sm max-w-xs mx-auto">Visítanos en nuestra sede central de Bogotá. Estamos listos para recibirte.</p>
                </div>
                <Button 
                  className="w-full max-w-xs h-16 bg-primary text-white rounded-full text-lg font-bold neon-accent hover:scale-105 transition-transform"
                  onClick={() => window.open('https://maps.app.goo.gl/tvQx2QB3CXvPcGEX6', '_blank')}
                >
                  Abrir en Google Maps
                </Button>
              </div>
            )}
            
            {section === 'calendario' && (
              <div className="text-center space-y-8 pt-12 animate-in fade-in scale-95 duration-700">
                <div className="relative inline-block">
                   <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full" />
                   <CalendarIcon className="w-20 h-20 text-primary relative z-10 mx-auto" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold">Reserva una Cita</h3>
                  <p className="text-white/40 text-sm max-w-xs mx-auto">Conecta conmigo para discutir nuevas oportunidades, consultoría o alianzas estratégicas.</p>
                </div>
                <Button className="w-full max-w-xs h-16 bg-primary text-white rounded-full text-lg font-bold neon-accent hover:scale-105 transition-transform">
                  Agendar por Calendly
                </Button>
              </div>
            )}

            {section === 'horario' && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-700">
                <div className="space-y-4">
                  {[
                    { day: 'Lunes - Viernes', time: '8:00 AM - 6:00 PM', active: true },
                    { day: 'Sábados', time: '9:00 AM - 1:00 PM', active: true },
                    { day: 'Domingos', time: 'Cerrado', active: false }
                  ].map((item, i) => (
                    <div key={i} className={cn(
                      "flex justify-between items-center p-6 rounded-[2rem] border transition-all",
                      item.active ? "bg-white/[0.03] border-white/10" : "bg-transparent border-white/5 opacity-40"
                    )}>
                      <span className="font-bold text-sm tracking-wide">{item.day}</span>
                      <span className={cn("text-xs font-bold px-3 py-1 rounded-full", item.active ? "bg-primary/10 text-primary" : "text-white/30")}>
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {section === 'logros' && (
              <div className="grid grid-cols-1 gap-6 animate-in zoom-in-95 duration-700">
                {[
                  { title: "250+ Proyectos", desc: "Despliegue exitoso de plataformas SaaS y Web3." },
                  { title: "Socio Estratégico", desc: "Consultor certificado para multinacionales de tecnología." },
                  { title: "Pionero NFC", desc: "Lanzamiento del primer ecosistema de tarjetas inteligentes en el país." }
                ].map((logro, i) => (
                  <div key={i} className="p-6 rounded-[2.5rem] bg-white/[0.03] border border-white/10 flex gap-6 group hover:bg-white/5 transition-colors">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 shadow-glow-accent">
                      <Trophy className="w-7 h-7 text-primary" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="font-bold text-lg text-white group-hover:text-primary transition-colors">{logro.title}</h4>
                      <p className="text-xs text-white/40 leading-relaxed font-medium">{logro.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Bottom Menu Navigation */}
      <nav className="fixed bottom-8 left-6 right-6 z-[90] h-20 bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] flex items-center justify-around px-2 shadow-2xl overflow-hidden">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id as SectionType)}
              className={cn(
                "flex flex-col items-center justify-center flex-1 transition-all relative h-full group",
                isActive ? "text-primary" : "text-white/30 hover:text-white/60"
              )}
            >
              <div className={cn(
                "p-2.5 rounded-2xl transition-all duration-500",
                isActive ? "bg-primary/10 shadow-glow-accent scale-110" : "group-hover:bg-white/5"
              )}>
                <item.icon className={cn("w-6 h-6", isActive && "drop-shadow-[0_0_8px_rgba(248,0,55,0.6)]")} />
              </div>
              <span className="text-[8px] font-bold uppercase tracking-[0.2em] mt-1.5">{item.label}</span>
              {isActive && (
                <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_12px_#F80037]" />
              )}
            </button>
          );
        })}
      </nav>

    </main>
  );
}
