
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
  Zap, 
  MapPin, 
  Clock, 
  Calendar as CalendarIcon, 
  Trophy, 
  Home,
  X,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

const LOGO_URL = "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Logos%2FLogo%20naxde.png?alt=media&token=1df1f19b-978a-4f23-8f2f-d0d9efb42764";
const OSCAR_PROFILE_URL = "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Tarjetas%20digitales%2FNaxde%2FPerfil%20oscar.jpeg?alt=media&token=1b57f085-d1fd-4435-8693-1be5d9bdd2b1";
const MAPS_URL = "https://maps.app.goo.gl/tvQx2QB3CXvPcGEX6";

interface DigitalCardPageProps {
  params: Promise<{ slug: string }>;
}

type SectionType = 'inicio' | 'ubicacion' | 'calendario' | 'horario' | 'logros';

const SpaceBackground = ({ isOscar }: { isOscar: boolean }) => {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; duration: string }[]>([]);
  const [shootingStars, setShootingStars] = useState<{ id: number; top: string; left: string; duration: string; delay: string }[]>([]);

  useEffect(() => {
    const starCount = 120;
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 0.5}px`,
      duration: `${Math.random() * 3 + 2}s`
    }));
    setStars(newStars);

    const shootingCount = 8;
    const newShootingStars = Array.from({ length: shootingCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 50}%`,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 3 + 4}s`,
      delay: `${Math.random() * 15}s`
    }));
    setShootingStars(newShootingStars);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#00001D]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#00001D] via-[#00002D] to-[#00001D]" />
      
      {isOscar && (
        <div className="absolute inset-0">
          <div className="absolute top-[-20%] right-[-10%] w-[140%] h-[80%] bg-[#F80037]/15 blur-[160px] rounded-full animate-pulse duration-[12000ms]" />
          <div className="absolute bottom-[-30%] left-[-20%] w-[120%] h-[90%] bg-[#5200F8]/10 blur-[160px] rounded-full animate-pulse duration-[15000ms]" />
          <div className="absolute top-[20%] left-[5%] w-[80%] h-[60%] bg-cyan-500/10 blur-[140px] rounded-full" />
        </div>
      )}
      
      {stars.map((star) => (
        <div
          key={star.id}
          className="star absolute bg-white rounded-full opacity-30"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animation: `twinkle ${star.duration} infinite ease-in-out`,
          } as any}
        />
      ))}

      {shootingStars.map((ss) => (
        <div
          key={ss.id}
          className="shooting-star absolute h-[1px] bg-gradient-to-r from-white to-transparent opacity-0"
          style={{
            top: ss.top,
            left: ss.left,
            width: '200px',
            animation: `shooting ${ss.duration} linear infinite`,
            animationDelay: ss.delay
          } as any}
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
          role: 'CEO & Founder Naxde',
          slug: 'oscar-rivera',
          profileImageUrl: OSCAR_PROFILE_URL,
          bio: 'Liderando la transformación digital en Latinoamérica a través de tecnología NFC e Inteligencia Artificial.',
          phone: '+57 318 425 4198',
          email: 'naxdeadmon@gmail.com',
          whatsapp: '573184254198',
          address: 'Bogotá, Colombia'
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
URL:${window.location.href}
END:VCARD`;
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.body.appendChild(document.createElement('a'));
    link.href = url;
    link.download = `${member.slug}.vcf`;
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
      <SpaceBackground isOscar={slug === 'oscar-rivera'} />
      
      <div className={cn(
        "w-full max-w-lg flex flex-col items-center px-6 pt-10 pb-40 space-y-10 transition-all duration-700",
        activeSection !== 'inicio' ? "blur-xl opacity-30 scale-[0.95]" : "blur-0 opacity-100 scale-100"
      )}>
        <header className="w-full flex justify-center py-4">
          <Link href="/">
            <div className="relative h-10 w-32">
              <Image src={LOGO_URL} alt="Naxde Logo" fill className="object-contain" priority />
            </div>
          </Link>
        </header>

        <section className="flex flex-col items-center text-center space-y-6 pt-4">
          <div className="relative group">
            <div className="absolute -inset-1.5 bg-gradient-to-br from-primary via-secondary to-primary rounded-full blur-lg opacity-75 animate-pulse"></div>
            <Avatar className="w-36 h-36 border-4 border-[#00001D] relative shadow-[0_0_35px_rgba(248,0,55,0.4)]">
              <AvatarImage src={member.profileImageUrl} alt={member.name} className="object-cover" />
              <AvatarFallback className="bg-white/5 text-4xl font-headline">{member.name[0]}</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-2 right-2 w-7 h-7 bg-green-500 rounded-full border-2 border-[#00001D] flex items-center justify-center shadow-lg">
              <div className="w-3.5 h-1.5 border-l-2 border-b-2 border-white -rotate-45 mb-1" />
            </div>
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-headline font-bold tracking-tight text-white leading-tight">{member.name}</h1>
            <p className="text-primary text-sm font-bold uppercase tracking-[0.4em]">{member.role}</p>
          </div>
        </section>

        <section className="w-full space-y-4 px-4">
          {member.phone && (
            <div className="flex items-center gap-4 text-white/70 bg-white/[0.03] p-4 rounded-3xl border border-white/5 hover:bg-white/[0.08] transition-all cursor-pointer" onClick={() => window.open(`tel:${member.phone?.replace(/\s/g, '')}`, '_self')}>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium">{member.phone}</span>
            </div>
          )}
          {member.email && (
            <div className="flex items-center gap-4 text-white/70 bg-white/[0.03] p-4 rounded-3xl border border-white/5 hover:bg-white/[0.08] transition-all cursor-pointer" onClick={() => window.open(`mailto:${member.email}`, '_self')}>
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-medium truncate">{member.email}</span>
            </div>
          )}
        </section>

        <section className="w-full grid grid-cols-2 gap-4 px-2">
          <Button variant="outline" className="h-16 bg-white/[0.05] border-white/10 text-white rounded-[2rem] gap-3 hover:bg-white/10" onClick={() => window.open(`tel:${member.phone?.replace(/\s/g, '')}`, '_self')}>
            <Phone className="w-5 h-5 text-white/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Llamar</span>
          </Button>
          <Button className="h-16 bg-primary hover:bg-primary/90 text-white rounded-[2rem] gap-3 neon-accent" onClick={() => window.open(`https://wa.me/${member.whatsapp}`, '_blank')}>
            <MessageCircle className="w-5 h-5" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">WhatsApp</span>
          </Button>
          <Button variant="outline" className="h-16 bg-white/[0.05] border-white/10 text-white rounded-[2rem] gap-3 hover:bg-white/10" onClick={() => window.open(`mailto:${member.email}`, '_self')}>
            <Mail className="w-5 h-5 text-white/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Email</span>
          </Button>
          <Button variant="outline" className="h-16 bg-white/[0.05] border-white/10 text-white rounded-[2rem] gap-3 hover:bg-white/10" onClick={handleSaveContact}>
            <UserPlus className="w-5 h-5 text-white/40" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Guardar</span>
          </Button>
        </section>

        <footer className="pt-20 flex flex-col items-center space-y-4 opacity-40 pb-20">
          <div className="relative h-6 w-24">
            <Image src={LOGO_URL} alt="Naxde Logo" fill className="object-contain grayscale" />
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-primary" />
            <p className="text-[10px] font-bold uppercase tracking-[0.5em]">Futuro Digital Naxde</p>
          </div>
        </footer>
      </div>

      {/* Paneles Inmersivos Glass Blur */}
      {['ubicacion', 'calendario', 'horario', 'logros'].map((section) => (
        <div key={section} className={cn(
          "fixed inset-x-0 bottom-0 z-[100] bg-black/40 backdrop-blur-[45px] border-t border-white/10 rounded-t-[3.5rem] transition-all duration-700 ease-in-out transform flex flex-col shadow-[0_-25px_60px_rgba(0,0,0,0.6)]",
          activeSection === section ? "h-[75vh] translate-y-0" : "h-0 translate-y-full"
        )}>
          <div className="w-full h-14 flex items-center justify-center cursor-pointer" onClick={() => setActiveSection('inicio')}>
            <div className="w-16 h-1.5 bg-white/20 rounded-full" />
          </div>
          <header className="h-20 flex items-center justify-between px-10">
            <div className="flex items-center gap-4">
              <Zap className="w-5 h-5 text-primary" />
              <span className="font-headline font-bold text-xl uppercase tracking-[0.3em] text-white">
                {section === 'ubicacion' ? 'Ubicación' : section === 'calendario' ? 'Agenda' : section === 'horario' ? 'Horario' : 'Logros'}
              </span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setActiveSection('inicio')} className="w-12 h-12 rounded-full text-white/30 hover:text-white"><X className="w-6 h-6" /></Button>
          </header>
          <div className="flex-1 overflow-y-auto px-10 pb-32 space-y-8 no-scrollbar">
            {section === 'ubicacion' && (
              <div className="text-center space-y-10 pt-16">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-primary/30 blur-[60px] rounded-full" />
                  <MapPin className="w-24 h-24 text-primary mx-auto relative z-10 animate-bounce" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-3xl font-bold">Nuestra Sede</h3>
                  <p className="text-white/50 text-base max-w-xs mx-auto leading-relaxed">Te esperamos en Bogotá para cocrear tu próxima plataforma digital.</p>
                </div>
                <Button className="w-full h-20 bg-primary text-white rounded-[2.5rem] text-lg font-bold neon-accent gap-3" onClick={() => window.open(MAPS_URL, '_blank')}>
                  Abrir Google Maps
                  <ExternalLink className="w-5 h-5" />
                </Button>
              </div>
            )}
            {section === 'calendario' && (
              <div className="text-center space-y-10 pt-16">
                <CalendarIcon className="w-24 h-24 text-primary mx-auto" />
                <h3 className="text-3xl font-bold">Agenda tu Cita</h3>
                <p className="text-white/50 text-base max-w-xs mx-auto">Reserva una consultoría técnica o comercial con nuestro equipo experto.</p>
                <Button className="w-full h-20 bg-primary text-white rounded-[2.5rem] text-lg font-bold neon-accent">Consultar Horarios</Button>
              </div>
            )}
            {section === 'horario' && (
              <div className="space-y-4 pt-4">
                {[
                  { d: 'Lunes - Viernes', t: '8:00 AM - 6:00 PM', a: true },
                  { d: 'Sábados', t: '9:00 AM - 1:00 PM', a: true },
                  { d: 'Domingos', t: 'Cerrado', a: false }
                ].map((item, i) => (
                  <div key={i} className={cn("flex justify-between p-8 rounded-[2rem] border transition-all", item.a ? "bg-white/[0.04] border-white/10" : "opacity-30 border-white/5")}>
                    <span className="font-bold text-base">{item.d}</span>
                    <span className="text-sm text-primary font-bold uppercase tracking-widest">{item.t}</span>
                  </div>
                ))}
              </div>
            )}
            {section === 'logros' && (
              <div className="grid gap-6 pt-4">
                {[
                  { t: '250+ Proyectos LATAM', d: 'Liderazgo en transformación digital regional.' },
                  { t: 'Pionero NFC Hub', d: 'Innovación en sistemas de identidad inteligente.' },
                  { t: 'Partner Estratégico AI', d: 'Implementación de modelos LLM en negocios.' }
                ].map((l, i) => (
                  <div key={i} className="p-8 rounded-[2.5rem] bg-white/[0.04] border border-white/10 flex gap-6 group hover:bg-white/[0.08] transition-all">
                    <Trophy className="w-10 h-10 text-primary group-hover:scale-110 transition-transform" />
                    <div className="space-y-1">
                      <h4 className="font-bold text-lg">{l.t}</h4>
                      <p className="text-sm text-white/50">{l.d}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}

      {/* Navegación Inferior Inmersiva */}
      <nav className="fixed bottom-10 left-6 right-6 z-[110] h-24 bg-black/40 backdrop-blur-[40px] border border-white/10 rounded-[3rem] flex items-center justify-around px-4 shadow-2xl">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button 
              key={item.id} 
              onClick={() => setActiveSection(item.id as any)} 
              className={cn(
                "flex flex-col items-center justify-center flex-1 transition-all h-full relative group",
                isActive ? "text-primary" : "text-white/30 hover:text-white/60"
              )}
            >
              <div className={cn(
                "p-3 rounded-[1.5rem] transition-all duration-300",
                isActive ? "bg-primary/20 shadow-glow-accent scale-110" : "group-hover:bg-white/5"
              )}>
                <item.icon className="w-7 h-7" />
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] mt-2 transition-all">{item.label}</span>
              {isActive && (
                <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary shadow-glow-accent animate-pulse" />
              )}
            </button>
          );
        })}
      </nav>
    </main>
  );
}
