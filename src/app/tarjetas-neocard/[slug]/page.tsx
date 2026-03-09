
"use client"

import React, { use, useState, useEffect, useRef, Suspense } from 'react';
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
  Users,
  Instagram,
  Facebook
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
import { Header } from '@/components/layout/Header';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';

const LOGO_URL = "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Tarjetas%20digitales%2FTaller%20de%20Tagua%2FLogos%2FLogo%20Tagua.png?alt=media&token=3293b33d-d3d3-4329-983b-7590eb20086b";
const OSCAR_PROFILE_URL = "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Tarjetas%20digitales%2FNaxde%2FPerfil%20oscar.jpeg?alt=media&token=1b57f085-d1fd-4435-8693-1be5d9bdd2b1";
const MAPS_URL = "https://maps.app.goo.gl/ii7bAyev7ZioPuuj9";
const TAGUA_FACHADA_URL = "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Tarjetas%20digitales%2FTaller%20de%20Tagua%2FPersonas%2FFACHADA%20EMPRESA.png?alt=media&token=52527034-259c-459c-828b-710c3418a618";

interface DigitalCardPageProps {
  params: Promise<{ slug: string }>;
}

type SectionType = 'inicio' | 'ubicacion' | 'logros';

const SpaceBackground = ({ isOscar, isMockup }: { isOscar: boolean; isMockup: boolean }) => {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; duration: string }[]>([]);
  const [shootingStars, setShootingStars] = useState<{ id: number; top: string; left: string; duration: string; delay: string }[]>([]);
  const [gyro, setGyro] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (isMockup) return;

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
  }, [isMockup]);

  if (isMockup) {
    return <div className="fixed inset-0 bg-[#00001D] -z-10" />;
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10 bg-[#00001D]">
      <div
        className="absolute inset-0 overflow-hidden transition-transform duration-[500ms] ease-out"
        style={{ transform: `translate(${gyro.x * 10}px, ${gyro.y * 10}px)` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(0,0,0,1)_0%,rgba(88,28,135,0.2)_40%,rgba(0,0,0,1)_70%)] blur-[180px] rounded-full opacity-90" />
      </div>

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
    </div>
  );
};

const TaguaTheme = ({ member }: { member: any }) => {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);

  const galleryImages = [
    "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Tarjetas%20digitales%2FTaller%20de%20Tagua%2FPersonas%2FDON%20C%C3%89SAR%20Y%20ESPOSA%20(2).png?alt=media&token=21c53301-cd1a-4042-b771-2ad1bb81c1f4",
    "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Tarjetas%20digitales%2FTaller%20de%20Tagua%2FPersonas%2FDON%20C%C3%89SAR%20Y%20ESPOSA_2.png?alt=media&token=c314317b-e914-49e5-9d29-451498f201ae",
    "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Tarjetas%20digitales%2FTaller%20de%20Tagua%2FPersonas%2FCHICO%20TAGUA.png?alt=media&token=48f48944-e08b-47b5-b44e-f301b4874445",
    "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Tarjetas%20digitales%2FTaller%20de%20Tagua%2FProductos%2FAJEDREZ%20DE%20TAGUA.png?alt=media&token=d42858bc-efb0-46ca-924b-ef78fa28c5b1",
    "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Tarjetas%20digitales%2FTaller%20de%20Tagua%2FProductos%2FESFERAS%20DE%20TAGUA.png?alt=media&token=1d503748-e0a8-49dc-8344-2115339a1ac2",
    "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Tarjetas%20digitales%2FTaller%20de%20Tagua%2FProductos%2FJARRONES%20DE%20TAGUA.png?alt=media&token=1e6c09fc-1db8-4b15-9b3c-77d1c424b2f4",
    "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Tarjetas%20digitales%2FTaller%20de%20Tagua%2FProductos%2FLUPA.png?alt=media&token=cdc238ad-38b6-41db-a287-425fe468ea6f",
    "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Tarjetas%20digitales%2FTaller%20de%20Tagua%2FProductos%2FMANOS%20TRABAJADORAS.png?alt=media&token=5078b00d-ab44-4c83-92c6-4751c4404b25",
    "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Tarjetas%20digitales%2FTaller%20de%20Tagua%2FProductos%2FMANOS%20TRABAJADORAS_2.png?alt=media&token=8b9e79bf-ddf1-489d-a7fc-50ae029f0520",
    "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Tarjetas%20digitales%2FTaller%20de%20Tagua%2FProductos%2FMU%C3%91EQUITOS%20DE%20TAGUA.png?alt=media&token=3f8cc768-7aeb-4a1a-8520-d9c135f82b89",
    "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Tarjetas%20digitales%2FTaller%20de%20Tagua%2FProductos%2FTROMPOS%20DE%20TAGUA.png?alt=media&token=9f654502-c60c-4bcc-8b31-be585fd787e1"
  ];

  const closeModals = () => {
    setIsGalleryOpen(false);
    setIsContactOpen(false);
    setIsLocationOpen(false);
  };

  return (
    <main className="h-screen w-full bg-[#F5F1E6] text-[#4A3728] flex flex-col items-center relative overflow-hidden font-serif no-scrollbar">
      {/* Botón de identificación opcional en la parte superior */}
      <div className="absolute top-6 left-6 w-10 h-10 rounded-full bg-[#222] flex items-center justify-center text-white text-xs font-bold border border-white/10 z-20 font-sans">
        N
      </div>

      {/* Contenedor Principal: Sin scroll, centrado */}
      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-lg px-6 gap-6 pb-28">
        {/* Logotipo */}
        <div className="relative">
          <div className="w-28 h-28 rounded-full bg-white border-4 border-white shadow-xl overflow-hidden flex items-center justify-center p-2">
            <img
              src={LOGO_URL}
              alt="Logo Tagua"
              className="w-full h-full object-contain rounded-full"
            />
          </div>
        </div>

        {/* Nombre de la Empresa + Social Sidebar Wrapper */}
        <div className="w-full relative py-2">
          {/* Social Sidebar pegado a la izquierda a la altura del nombre - Tamaño reducido */}
          <div className="absolute left-[-1.5rem] top-1/2 -translate-y-1/2 flex flex-col gap-2 p-2 bg-[#E8E2D2]/60 backdrop-blur-md border-y border-r border-white/20 rounded-r-xl shadow-xl z-40">
            <a href="#" className="w-8 h-8 rounded-lg flex items-center justify-center text-[#4A3728] hover:bg-white/40 transition-all group">
              <Facebook className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
            <a href="#" className="w-8 h-8 rounded-lg flex items-center justify-center text-[#4A3728] hover:bg-white/40 transition-all group">
              <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
            </a>
          </div>

          <div className="text-center space-y-2">
            <p className="text-[10px] font-sans font-black uppercase tracking-[0.5em] opacity-60">Taller de Tagua</p>
            <h1 className="text-4xl font-black tracking-tight leading-none">Bonilla & Vergara</h1>
          </div>
        </div>

        {/* Imagen Principal */}
        <div className="w-full max-w-[80%] relative">
          <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white group">
            <img
              src={TAGUA_FACHADA_URL}
              alt="Fachada Taller de Tagua"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/5" />
          </div>
        </div>
      </div>

      {/* Modales Interactivos */}
      <AnimatePresence>
        {/* Galería Modal */}
        {isGalleryOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsGalleryOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-[#F5F1E6] rounded-[3rem] shadow-2xl overflow-y-auto no-scrollbar p-8 md:p-12 border border-white/20"
            >
              <header className="flex flex-col items-center mb-6 relative">
                <button
                  onClick={() => setIsGalleryOpen(false)}
                  className="absolute right-0 top-0 w-10 h-10 rounded-full bg-[#E8E2D2] flex items-center justify-center hover:bg-white transition-colors shadow-lg z-10"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="space-y-4 text-center px-12">
                  <h2 className="text-4xl md:text-5xl font-black tracking-tight">Nuestra Galería</h2>
                  <p className="text-xl opacity-70 leading-relaxed font-sans font-medium max-w-xl mx-auto text-center">
                    Explora la belleza y el detalle de nuestras piezas talladas a mano en tagua.
                  </p>
                </div>
              </header>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {galleryImages.map((src, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    className="aspect-square rounded-[2rem] bg-white border-4 border-white shadow-xl overflow-hidden group"
                  >
                    <img src={src} alt={`Pieza ${i + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {/* Contacto Modal */}
        {isContactOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-[#F5F1E6] rounded-[3rem] shadow-2xl overflow-y-auto no-scrollbar p-8 md:p-12 border border-white/20"
            >
              <header className="flex flex-col items-center mb-8 relative">
                <button
                  onClick={() => setIsContactOpen(false)}
                  className="absolute right-0 top-0 w-10 h-10 rounded-full bg-[#E8E2D2] flex items-center justify-center hover:bg-white transition-colors shadow-lg z-10"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="space-y-4 text-center">
                  <h2 className="text-4xl font-black tracking-tight">Canales Directos</h2>
                </div>
              </header>

              <div className="bg-white/40 backdrop-blur-sm p-8 rounded-[3rem] shadow-xl border border-white/20 space-y-8 flex flex-col">
                <div className="space-y-6 flex-1">
                  {[
                    { label: "LLAMAR AHORA", val: "310 242 3116", icon: Phone },
                    { label: "LLAMAR AHORA", val: "310 885 0757", icon: Phone },
                    { label: "EMAIL", val: "bonillavergaratagua@hotmail.com", icon: Mail },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-6 group cursor-pointer" onClick={() => {
                      if(item.icon === Phone) window.open(`tel:${item.val.replace(/\s/g, '')}`, '_self');
                      else window.open(`mailto:${item.val}`, '_self');
                    }}>
                      <div className="w-12 h-12 rounded-xl bg-[#E8E2D2] flex items-center justify-center shrink-0 group-hover:bg-[#B8860B] group-hover:text-white transition-colors">
                        <item.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-[10px] font-sans font-black uppercase tracking-[0.2em] opacity-40">{item.label}</p>
                        <p className="text-base md:text-lg font-sans font-bold group-hover:text-[#B8860B] transition-colors break-all leading-tight">{item.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* Ubicación Modal */}
        {isLocationOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLocationOpen(false)}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-lg bg-[#F5F1E6] rounded-[3rem] shadow-2xl overflow-y-auto no-scrollbar p-8 md:p-12 border border-white/20"
            >
              <header className="flex flex-col items-center mb-8 relative">
                <button
                  onClick={() => setIsLocationOpen(false)}
                  className="absolute right-0 top-0 w-10 h-10 rounded-full bg-[#E8E2D2] flex items-center justify-center hover:bg-white transition-colors shadow-lg z-10"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="space-y-4 text-center">
                  <h2 className="text-4xl font-black tracking-tight">Nuestra Ubicación</h2>
                </div>
              </header>

              <div className="bg-white/40 backdrop-blur-sm p-8 rounded-[3rem] shadow-xl border border-white/20 flex flex-col">
                <div className="flex items-start gap-6 mb-12">
                  <div className="w-14 h-14 rounded-2xl bg-[#E8E2D2] flex items-center justify-center shrink-0 shadow-sm">
                    <MapPin className="w-7 h-7 text-[#4A3728]" />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-black">Visítanos</h3>
                    <p className="text-lg opacity-70 leading-relaxed font-sans font-medium">Vereda Funza, Tinjacá, Boyacá</p>
                  </div>
                </div>

                <button
                  onClick={() => window.open(MAPS_URL, '_blank')}
                  className="w-full h-16 bg-[#B8860B] hover:bg-[#966F06] text-white rounded-2xl font-sans font-black text-lg transition-all shadow-lg flex items-center justify-center gap-3 group"
                >
                  Ver en Maps
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Barra de Navegación Inferior */}
      <nav className="fixed bottom-0 left-0 right-0 h-24 bg-[#E8E2D2]/80 backdrop-blur-xl border-t border-[#DED8C8] flex items-center justify-around px-8 z-50">
        <button
          onClick={() => { closeModals(); setIsGalleryOpen(true); }}
          className="flex flex-col items-center gap-1.5 transition-all opacity-60 hover:opacity-100 group"
        >
          <div className="p-2 rounded-full group-hover:bg-white/20 transition-colors">
            <Smartphone className="w-6 h-6" />
          </div>
          <span className="text-[9px] font-sans font-bold uppercase tracking-widest">Galería</span>
        </button>
        <button
          onClick={() => { closeModals(); setIsContactOpen(true); }}
          className="flex flex-col items-center gap-1.5 transition-all opacity-60 hover:opacity-100 group"
        >
          <div className="p-2 rounded-full group-hover:bg-white/20 transition-colors">
            <Mail className="w-6 h-6" />
          </div>
          <span className="text-[9px] font-sans font-bold uppercase tracking-widest">Contacto</span>
        </button>
        <button
          onClick={() => { closeModals(); setIsLocationOpen(true); }}
          className="flex flex-col items-center gap-1.5 transition-all opacity-60 hover:opacity-100 group"
        >
          <div className="p-2 rounded-full group-hover:bg-white/20 transition-colors">
            <MapPin className="w-6 h-6" />
          </div>
          <span className="text-[9px] font-sans font-bold uppercase tracking-widest">Ubicación</span>
        </button>
      </nav>
    </main>
  );
};

export default function DigitalCardPage({ params }: DigitalCardPageProps) {
  const { slug } = use(params);

  return (
    <Suspense fallback={<div className="min-h-screen bg-[#00001D]" />}>
      <DigitalCardContent slug={slug} />
    </Suspense>
  );
}

function DigitalCardContent({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const isMockup = searchParams?.get('mode') === 'mockup';

  const db = useFirestore();
  const [activeSection, setActiveSection] = useState<SectionType>('inicio');
  const [member, setMember] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

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
          address: 'Cra. 103b #152c-10, Bogotá'
        });
      } else if (slug === 'bonilla-vergara' || slug === 'elena-petrova') {
        setMember({
          name: 'Bonilla & Vergara',
          role: 'Taller de Tagua',
          slug: 'bonilla-vergara',
          profileImageUrl: TAGUA_FACHADA_URL,
          bio: 'Arte y tradición transformados en piezas únicas de tagua.',
          phone: '3102423116',
          email: 'bonillavergaratagua@hotmail.com',
          whatsapp: '3102423116'
        });
      }
      setIsLoading(false);
    }
    fetchMember();
  }, [db, slug]);

  const isTagua = slug === 'bonilla-vergara' || slug === 'elena-petrova';

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  useEffect(() => {
    if (!api || isHovered) return;
    const interval = setInterval(() => api.scrollNext(), 5000);
    return () => clearInterval(interval);
  }, [api, isHovered]);

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

  if (isTagua) {
    return <TaguaTheme member={member} />;
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
    { title: "Neocard", desc: "Identidad inteligente con tecnología naxde", icon: Smartphone },
    { title: "Aplicaciones", desc: "Software nativo y plataformas escalables.", icon: Code },
    { title: "Chatbot & Automatización", desc: "Flujos inteligentes para tu negocio.", icon: MessageCircle },
    { title: "Soluciones de IA", desc: "Transformación con Inteligencia Artificial.", icon: Cpu }
  ];

  const handleNavClick = (id: string) => {
    if (id === 'llamar') window.open(`tel:${member.phone?.replace(/\s/g, '')}`, '_self');
    else if (id === 'ubicacion') setActiveSection('ubicacion');
    else if (id === 'guardar') handleSaveContact();
    else if (id === 'email') window.open(`mailto:${member.email}`, '_self');
    else if (id === 'logros') setActiveSection('logros');
  };

  const navItems = [
    { id: 'llamar', icon: Phone, label: 'Llamar' },
    { id: 'ubicacion', icon: MapPin, label: 'Ubicación' },
    { id: 'guardar', icon: UserPlus, label: 'Guardar' },
    { id: 'email', icon: Mail, label: 'Email' },
    { id: 'logros', icon: Trophy, label: 'Logros' },
  ];

  return (
    <main className={cn(
      "w-full bg-transparent text-white flex flex-col items-center relative font-body selection:bg-primary/30 no-scrollbar",
      isMockup ? "h-full overflow-hidden" : "h-[100dvh] overflow-hidden"
    )}>
      <SpaceBackground isOscar={slug === 'oscar-rivera'} isMockup={isMockup} />
      {!isMockup && <Header />}

      <div className={cn(
        "w-full max-w-lg flex flex-col items-center px-6 pb-32 space-y-6 transition-all duration-[700ms]",
        isMockup ? "pt-20 justify-start" : "pt-24 justify-center h-full",
        activeSection !== 'inicio' ? "blur-xl opacity-20 scale-[0.9] pointer-events-none" : "blur-0 opacity-100 scale-100"
      )}>
        <section className="flex flex-col items-center text-center space-y-4">
          <div className="relative group">
            <div className="absolute -inset-4 bg-purple-600/20 rounded-full blur-2xl opacity-60"></div>
            <Avatar className="w-28 h-28 border-4 border-[#00001D] relative shadow-[0_0_50px_rgba(168,85,247,0.3)]">
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
          <Button className="h-12 bg-primary hover:bg-primary/90 text-white rounded-[1.5rem] gap-2 neon-accent shadow-[0_0_15px_rgba(248,0,55,0.4)]" onClick={() => window.open(`https://wa.me/${member.whatsapp?.replace(/\D/g, '')}`, '_blank')}>
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

          <div className="relative w-full" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)', WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }} onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
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
              <div key={i} className={cn("h-1 rounded-full transition-all duration-[300ms]", current === i ? "w-4 bg-primary" : "w-1 bg-white/20")} />
            ))}
          </div>
        </section>
      </div>

      {['ubicacion', 'logros'].map((section) => (
        <div key={section}
          className={cn("fixed inset-x-0 bottom-0 z-[100] bg-black/40 backdrop-blur-[45px] border-t border-white/10 rounded-t-[3.5rem] flex flex-col shadow-[0_-25px_60px_rgba(0,0,0,0.7)] transition-all duration-500 ease-out", activeSection === section ? "h-[75vh]" : "h-0 translate-y-full")}
        >
          <div className="w-full h-14 flex items-center justify-center cursor-pointer" onClick={() => setActiveSection('inicio')}>
            <div className="w-16 h-1.5 bg-white/30 rounded-full" />
          </div>

          <header className="h-20 flex items-center justify-between px-10">
            <div className="flex items-center gap-4">
              <Zap className="w-5 h-5 text-primary" />
              <span className="font-headline font-bold text-xl uppercase tracking-[0.4em] text-white">{section === 'ubicacion' ? 'Ubicación' : 'Logros'}</span>
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
                  <p className="text-white/50 text-lg max-w-xs mx-auto leading-relaxed">Bogotá, Colombia. Cra. 103b #152c-10.</p>
                </div>
                <Button className="w-full h-20 bg-primary text-white rounded-[2.5rem] text-xl font-bold neon-accent gap-4 hover:scale-[1.02] transition-transform" onClick={() => window.open(MAPS_URL, '_blank')}>
                  Ir con Google Maps <ExternalLink className="w-6 h-6" />
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
              </div>
            )}
          </div>
        </div>
      ))}

      <nav className="fixed bottom-6 left-6 right-6 z-[110] h-20 bg-black/40 backdrop-blur-[45px] border border-white/10 rounded-[2.5rem] flex items-center justify-around px-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button key={item.id} onClick={() => handleNavClick(item.id)} className={cn("flex flex-col items-center justify-center flex-1 transition-all h-full relative group", isActive ? "text-primary" : "text-white/30 hover:text-white/60")}>
              <div className={cn("p-2.5 rounded-[1.5rem] transition-all duration-500", isActive ? "bg-primary/20 shadow-glow-accent scale-110" : "group-hover:bg-white/5")}>
                <item.icon className="w-6 h-6" />
              </div>
              <span className="text-[8px] font-bold uppercase tracking-[0.3em] mt-1.5 transition-all opacity-80">{item.label}</span>
              {isActive && <div className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-primary shadow-glow-accent" />}
            </button>
          );
        })}
      </nav>
    </main>
  );
}
