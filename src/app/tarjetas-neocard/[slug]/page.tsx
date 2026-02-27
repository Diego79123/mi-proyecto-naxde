
"use client"

import React, { use, useState, useEffect, useRef } from 'react';
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
  ExternalLink,
  Star as StarIcon,
  ShieldCheck,
  Cpu,
  Globe,
  Code,
  Users
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem,
  type CarouselApi
} from "@/components/ui/carousel";
import { cn } from '@/lib/utils';
import Link from 'next/link';
import Image from 'next/image';

const LOGO_URL = "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Logos%2FLogo%20naxde.png?alt=media&token=1df1f19b-978a-4f23-8f2f-d0d9efb42764";
const OSCAR_PROFILE_URL = "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Tarjetas%20digitales%2FNaxde%2FPerfil%20oscar.jpeg?alt=media&token=1b57f085-d1fd-4435-8693-1be5d9bdd2b1";
const MAPS_URL = "https://maps.app.goo.gl/tvQx2QB3CXvPcGEX6";

interface DigitalCardPageProps {
  params: Promise<{ slug: string }>;
}

type SectionType = 'inicio' | 'ubicacion' | 'logros';

const SpaceBackground = ({ isOscar }: { isOscar: boolean }) => {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; duration: string }[]>([]);
  const [shootingStars, setShootingStars] = useState<{ id: number; top: string; left: string; duration: string; delay: string }[]>([]);
  const [gyro, setGyro] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const starCount = 160;
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 0.5}px`,
      duration: `${Math.random() * 3 + 2}s`
    }));
    setStars(newStars);

    const shootingCount = 4;
    const newShootingStars = Array.from({ length: shootingCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 60}%`,
      left: `${Math.random() * 100}%`,
      duration: `${Math.random() * 2 + 3}s`,
      delay: `${Math.random() * 15}s`
    }));
    setShootingStars(newShootingStars);

    const handleOrientation = (e: DeviceOrientationEvent) => {
      const { beta, gamma } = e;
      if (beta !== null && gamma !== null) {
        setGyro({
          x: (gamma / 20),
          y: (beta - 45) / 20
        });
      }
    };

    if (typeof window !== 'undefined' && window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', handleOrientation);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('deviceorientation', handleOrientation);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#00001D]">
      {isOscar && (
        <div 
          className="absolute inset-0 overflow-hidden transition-transform duration-[500ms] ease-out"
          style={{ transform: `translate(${gyro.x * 10}px, ${gyro.y * 10}px)` }}
        >
          {/* Black Hole Glow Effect */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-black blur-[180px] rounded-full opacity-90 shadow-[0_0_200px_rgba(0,0,0,1)]" />
          <div className="absolute top-[-10%] right-[-10%] w-[120%] h-[70%] bg-black/40 blur-[150px] rounded-full opacity-60" />
          <div className="absolute bottom-[-20%] left-[-10%] w-[100%] h-[80%] bg-black/40 blur-[150px] rounded-full opacity-60" />
        </div>
      )}
      
      <div 
        className="absolute inset-0 transition-transform duration-[700ms] ease-out"
        style={{ transform: `translate(${gyro.x * 20}px, ${gyro.y * 20}px)` }}
      >
        {stars.map((star) => (
          <div
            key={star.id}
            className="star absolute bg-white rounded-full opacity-40 shadow-[0_0_8px_rgba(255,255,255,0.6)]"
            style={{
              top: star.top,
              left: star.left,
              width: star.size,
              height: star.size,
              animation: `twinkle ${star.duration} infinite ease-in-out`,
            } as any}
          />
        ))}
      </div>

      {shootingStars.map((ss) => (
        <div
          key={ss.id}
          className="shooting-star absolute h-[1.5px] bg-gradient-to-r from-white/80 to-transparent opacity-0"
          style={{
            top: ss.top,
            left: ss.left,
            width: '280px',
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
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // States for swipe-to-close interaction
  const [dragY, setDragY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const startY = useRef(0);

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
          role: 'Project Manager',
          slug: 'oscar-rivera',
          profileImageUrl: OSCAR_PROFILE_URL,
          bio: 'Project Manager experto en ecosistemas Neocard, diseño web de alta conversión, aplicaciones escalables y soluciones de Inteligencia Artificial.',
          phone: '3194254196',
          email: 'naxdeadmon@gmail.com',
          whatsapp: '3194254196',
          address: 'Bogotá, Colombia'
        });
      }
      setIsLoading(false);
    }
    fetchMember();
  }, [db, slug]);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (!api || isHovered) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api, isHovered]);

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startY.current = e.clientY;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaY = e.clientY - startY.current;
    if (deltaY > 0) {
      setDragY(deltaY);
    }
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragY > 150) {
      setActiveSection('inicio');
    }
    setDragY(0);
  };

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

  const advisorServices = [
    { title: "Diseño Web", desc: "Experiencias de alto impacto y conversión.", icon: Globe },
    { title: "Neocard", desc: "Identidad inteligente con tecnologia naxde", icon: Smartphone },
    { title: "Aplicaciones", desc: "Software nativo y plataformas escalables.", icon: Code },
    { title: "Chatbot & Automatización", desc: "Flujos inteligentes para tu negocio.", icon: MessageCircle },
    { title: "Soluciones de IA", desc: "Transformación con Inteligencia Artificial.", icon: Cpu }
  ];

  const handleNavClick = (id: string) => {
    if (id === 'llamar') {
      window.open(`tel:${member.phone?.replace(/\s/g, '')}`, '_self');
    } else if (id === 'ubicacion') {
      setActiveSection('ubicacion');
    } else if (id === 'guardar') {
      handleSaveContact();
    } else if (id === 'email') {
      window.open(`mailto:${member.email}`, '_self');
    } else if (id === 'logros') {
      setActiveSection('logros');
    }
  };

  const navItems = [
    { id: 'llamar', icon: Phone, label: 'Llamar' },
    { id: 'ubicacion', icon: MapPin, label: 'Ubicación' },
    { id: 'guardar', icon: UserPlus, label: 'Guardar' },
    { id: 'email', icon: Mail, label: 'Email' },
    { id: 'logros', icon: Trophy, label: 'Logros' },
  ];

  return (
    <main className="h-[100dvh] w-full bg-transparent text-white flex flex-col items-center overflow-hidden relative font-body selection:bg-primary/30">
      <SpaceBackground isOscar={slug === 'oscar-rivera'} />
      
      <div className={cn(
        "w-full max-w-lg flex flex-col items-center px-6 pt-4 pb-20 space-y-6 transition-all duration-[700ms] h-full justify-center",
        activeSection !== 'inicio' ? "blur-xl opacity-20 scale-[0.9] pointer-events-none" : "blur-0 opacity-100 scale-100"
      )}>
        <header className="w-full flex justify-center py-2">
          <Link href="/">
            <div className="relative h-8 w-28">
              <Image src={LOGO_URL} alt="Naxde Logo" fill className="object-contain" priority />
            </div>
          </Link>
        </header>

        <section className="flex flex-col items-center text-center space-y-4">
          <div className="relative group">
            {/* Black Hole Avatar Resplandor */}
            <div className="absolute -inset-4 bg-black rounded-full blur-2xl opacity-80 group-hover:scale-110 transition-transform duration-700"></div>
            <Avatar className="w-28 h-28 border-4 border-[#00001D] relative shadow-[0_0_60px_rgba(0,0,0,1)]">
              <AvatarImage src={member.profileImageUrl} alt={member.name} className="object-cover" />
              <AvatarFallback className="bg-white/5 text-5xl font-headline">{member.name[0]}</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-2 right-4 w-6 h-6 bg-green-500 rounded-full border-2 border-[#00001D] flex items-center justify-center shadow-lg">
              <div className="w-3 h-1.5 border-l-2 border-b-2 border-white -rotate-45 mb-1" />
            </div>
          </div>
          <div className="space-y-1">
            <h1 className="text-2xl font-headline font-bold tracking-tight text-white leading-tight">{member.name}</h1>
            <p className="text-primary text-[10px] font-bold uppercase tracking-[0.5em]">{member.role}</p>
          </div>
          <p className="text-white/60 text-[11px] max-w-xs leading-relaxed font-medium">
            {member.bio}
          </p>
        </section>

        <section className="w-full grid grid-cols-2 gap-3 px-2 relative z-10">
          <Button variant="outline" className="h-12 bg-white/[0.05] border-white/10 text-white rounded-[1.5rem] gap-2 hover:bg-white/10 group" onClick={() => window.open(`tel:${member.phone?.replace(/\s/g, '')}`, '_self')}>
            <Phone className="w-4 h-4 text-white/40 group-hover:text-primary transition-colors" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Llamar</span>
          </Button>
          <Button className="h-12 bg-primary hover:bg-primary/90 text-white rounded-[1.5rem] gap-2 neon-accent" onClick={() => window.open(`https://wa.me/573194254196`, '_blank')}>
            <MessageCircle className="w-4 h-4" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em]">WhatsApp</span>
          </Button>
          <Button variant="outline" className="h-12 bg-white/[0.05] border-white/10 text-white rounded-[1.5rem] gap-2 hover:bg-white/10 group" onClick={() => window.open('/', '_self')}>
            <Globe className="w-4 h-4 text-white/40 group-hover:text-primary transition-colors" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Sitio Web</span>
          </Button>
          <Button variant="outline" className="h-12 bg-white/[0.05] border-white/10 text-white rounded-[1.5rem] gap-2 hover:bg-white/10 group" onClick={handleSaveContact}>
            <UserPlus className="w-4 h-4 text-white/40 group-hover:text-primary transition-colors" />
            <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Guardar</span>
          </Button>
        </section>

        <section className="w-full pt-2 space-y-4">
          <div className="flex flex-col items-center gap-2">
            <div className="h-px w-16 bg-primary/30" />
            <span className="text-[9px] font-bold uppercase tracking-[0.5em] text-primary">Nuestros Servicios</span>
          </div>
          
          <div 
            className="relative w-full"
            style={{ 
              maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <Carousel setApi={setApi} className="w-full" opts={{ loop: true, align: "center" }}>
              <CarouselContent className="-ml-4">
                {advisorServices.map((service, idx) => (
                  <CarouselItem key={idx} className="pl-4 basis-[72%]">
                    <div className="p-6 rounded-[2rem] bg-white/[0.03] border border-white/5 backdrop-blur-xl flex flex-col items-center text-center space-y-3 group hover:bg-white/[0.08] transition-all duration-[500ms] h-full">
                      <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-[500ms]">
                        <service.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="text-base font-headline font-bold text-white tracking-tight">{service.title}</h3>
                        <p className="text-white/40 text-[10px] font-medium leading-relaxed line-clamp-2">{service.desc}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>

          <div className="flex justify-center items-center gap-1.5">
            {Array.from({ length: count }).map((_, i) => (
              <div 
                key={i} 
                className={cn(
                  "h-1 rounded-full transition-all duration-[300ms]",
                  current === i ? "w-4 bg-primary" : "w-1 bg-white/20"
                )}
              />
            ))}
          </div>
        </section>
      </div>

      {['ubicacion', 'logros'].map((section) => (
        <div key={section} 
          style={{ 
            transform: activeSection === section 
              ? `translateY(${dragY}px)` 
              : 'translateY(100%)',
            transition: isDragging ? 'none' : 'transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)'
          }}
          className={cn(
            "fixed inset-x-0 bottom-0 z-[100] bg-black/40 backdrop-blur-[45px] border-t border-white/10 rounded-t-[3.5rem] flex flex-col shadow-[0_-25px_60px_rgba(0,0,0,0.7)] touch-none",
            activeSection === section ? "h-[75vh]" : "h-0"
          )}
        >
          <div 
            className="w-full h-14 flex items-center justify-center cursor-grab active:cursor-grabbing"
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
          >
            <div className="w-16 h-1.5 bg-white/30 rounded-full" />
          </div>

          <header className="h-20 flex items-center justify-between px-10">
            <div className="flex items-center gap-4">
              <Zap className="w-5 h-5 text-primary" />
              <span className="font-headline font-bold text-xl uppercase tracking-[0.4em] text-white">
                {section === 'ubicacion' ? 'Ubicación' : 'Logros'}
              </span>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setActiveSection('inicio')} className="w-12 h-12 rounded-full text-white/30 hover:text-white transition-colors">
              <X className="w-7 h-7" />
            </Button>
          </header>

          <div className="flex-1 overflow-y-auto px-10 pb-32 space-y-8 no-scrollbar touch-auto">
            {section === 'ubicacion' && (
              <div className="text-center space-y-12 pt-16">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-primary/20 blur-[70px] rounded-full" />
                  <MapPin className="w-28 h-28 text-primary mx-auto relative z-10 animate-bounce" />
                </div>
                <div className="space-y-4">
                  <h3 className="text-4xl font-bold font-headline">Nuestra Sede</h3>
                  <p className="text-white/50 text-lg max-w-xs mx-auto leading-relaxed">Bogotá, Colombia. Calle 154 # 103B - 76.</p>
                </div>
                <Button className="w-full h-20 bg-primary text-white rounded-[2.5rem] text-xl font-bold neon-accent gap-4 hover:scale-[1.02] transition-transform" onClick={() => window.open(MAPS_URL, '_blank')}>
                  Ir con Google Maps
                  <ExternalLink className="w-6 h-6" />
                </Button>
              </div>
            )}
            
            {section === 'logros' && (
              <div className="grid gap-6 pt-4">
                <div className="p-8 rounded-[3rem] bg-white/[0.05] border border-white/10 flex flex-col gap-4 group hover:bg-white/[0.1] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Zap className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <h4 className="font-bold text-xl">Gestión con ADN de Ingeniería 🚀</h4>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed font-medium">Transformando la complejidad en soluciones empresariales escalables mediante visión técnica y estratégica.</p>
                </div>

                <div className="p-8 rounded-[3rem] bg-white/[0.05] border border-white/10 flex flex-col gap-4 group hover:bg-white/[0.1] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Trophy className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <h4 className="font-bold text-xl">Trayectoria Académica</h4>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-white/50 leading-relaxed font-medium">• Graduado en Administración de Empresas en la universidad Uniminuto.</p>
                    <p className="text-sm text-white/50 leading-relaxed font-medium">• Ingeniería en Gestión Empresarial | Universidad de Chihuahua, Mexico.</p>
                  </div>
                </div>

                <div className="p-8 rounded-[3rem] bg-white/[0.05] border border-white/10 flex flex-col gap-4 group hover:bg-white/[0.1] transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Users className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <h4 className="font-bold text-xl">Liderazgo de Equipos</h4>
                  </div>
                  <p className="text-sm text-white/50 leading-relaxed font-medium">Experto apasionado por la eficiencia operativa y el liderazgo inspirador para el cumplimiento de objetivos.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}

      <nav className="fixed bottom-6 left-6 right-6 z-[110] h-20 bg-black/40 backdrop-blur-[45px] border border-white/10 rounded-[2.5rem] flex items-center justify-around px-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button 
              key={item.id} 
              onClick={() => handleNavClick(item.id)} 
              className={cn(
                "flex flex-col items-center justify-center flex-1 transition-all h-full relative group",
                isActive ? "text-primary" : "text-white/30 hover:text-white/60"
              )}
            >
              <div className={cn(
                "p-2.5 rounded-[1.5rem] transition-all duration-[500ms]",
                isActive ? "bg-primary/20 shadow-glow-accent scale-110" : "group-hover:bg-white/5"
              )}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className="text-[8px] font-bold uppercase tracking-[0.3em] mt-1.5 transition-all opacity-80">{item.label}</span>
              {isActive && (
                <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary shadow-glow-accent" />
              )}
            </button>
          );
        })}
      </nav>
    </main>
  );
}
