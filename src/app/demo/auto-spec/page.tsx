
"use client"

import React, { useState, useEffect } from 'react';
import { 
  Car, 
  Fuel, 
  Gauge, 
  Users, 
  Zap, 
  ShieldCheck, 
  Settings2, 
  ArrowLeft, 
  MessageCircle, 
  Phone,
  CheckCircle2,
  Calendar,
  Box,
  MapPin,
  Share2,
  X,
  Sparkles,
  Info,
  Shield,
  Activity,
  ChevronLeft,
  ChevronRight,
  Sofa,
  Cpu,
  ShieldAlert,
  Timer,
  Globe,
  Smartphone,
  ImageIcon,
  Heart,
  Facebook,
  Instagram,
  Palette,
  Handshake,
  DoorOpen,
  Radio,
  CircleDollarSign,
  Layers,
  Wind,
  Star,
  Music,
  Mail,
  Play,
  Settings,
  UserCheck,
  Lightbulb,
  HelpCircle,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  type CarouselApi 
} from "@/components/ui/carousel";

// Datos del vehículo actualizados
const carData = {
  brand: "Porsche",
  model: "911 Carrera",
  year: 2024,
  price: "210.000.000",
  mileage: "35.000 KM",
  owners: "1",
  reference: "992 Generation",
  color: "Blanco",
  fuel: "Gasolina",
  engine: "3.8",
  transmission: "Automática",
  permuta: "No",
  doors: 2,
  sensors: "Sí",
  negotiable: "Sí",
  description: "El Porsche 911 Carrera redefine la ingeniería automotriz. Una obra maestra de precisión alemana diseñada para quienes no aceptan compromisos. Su motor bóxer biturbo entrega una respuesta inmediata, mientras que su silueta icónica corta el viento con una eficiencia inigualable.",
  videoUrl: "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Aplicaciones%2FAplicacion%20automotriz%2Fgrabacion-de-pantalla-2026-03-12-a-la-s-12444-pm_SUVPvkRo.mp4?alt=media&token=7e63d879-c8f7-4337-9f7e-e6e2f72f0d56",
  images: [
    "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Aplicaciones%2FAplicacion%20automotriz%2FD_NQ_NP_2X_602061-MCO105977916300_022026-F.webp?alt=media&token=6cd8d7a7-0860-4d6a-801b-a75f03e17db2",
    "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Aplicaciones%2FAplicacion%20automotriz%2FD_NQ_NP_2X_682747-MCO106592118399_022026-F.webp?alt=media&token=e12f6558-b495-4462-a637-30f12e1b527b",
    "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Aplicaciones%2FAplicacion%20automotriz%2FD_NQ_NP_2X_685030-MCO105977855834_022026-F.webp?alt=media&token=863dec48-7ab9-433f-866a-2aefcd45a01c",
    "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Aplicaciones%2FAplicacion%20automotriz%2FD_NQ_NP_2X_685595-MCO105977856028_022026-F.webp?alt=media&token=1d777a07-2eb5-472a-bc77-f5e249d2769e",
    "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Aplicaciones%2FAplicacion%20automotriz%2FD_NQ_NP_2X_700914-MCO105977826090_022026-F.webp?alt=media&token=e0ef2f37-0c45-4f80-80cc-84bdd3e92ecb",
    "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Aplicaciones%2FAplicacion%20automotriz%2FD_NQ_NP_2X_713820-MCO106594285901_022026-F.webp?alt=media&token=4d020de2-906f-41de-82c2-4dd00a023147",
    "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Aplicaciones%2FAplicacion%20automotriz%2FD_NQ_NP_2X_768432-MCO106591998853_022026-F.webp?alt=media&token=a8b201a4-75d0-4c4d-b970-c586e5a7dd12",
    "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Aplicaciones%2FAplicacion%20automotriz%2FD_NQ_NP_2X_783906-MCO106856009737_022026-F.webp?alt=media&token=e8da9f59-99f7-4cc7-8213-e750ac8b1209",
    "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Aplicaciones%2FAplicacion%20automotriz%2FD_NQ_NP_2X_945370-MCO105977885654_022026-F.webp?alt=media&token=77b05907-7998-4443-bad2-dfa262d84033",
    "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Aplicaciones%2FAplicacion%20automotriz%2FD_NQ_NP_2X_976463-MCO106591908669_022026-F.webp?alt=media&token=3d788ff7-baca-462a-9600-b4e55aa4ba1a",
    "https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Aplicaciones%2FAplicacion%20automotriz%2FD_NQ_NP_2X_996114-MCO105979518408_022026-F.webp?alt=media&token=2236d7b3-1a79-436e-a060-8998d1d2bbe7"
  ]
};

type PopupType = 'specs' | 'features' | 'confort' | 'performance' | 'general' | 'exterior' | 'safety' | 'entertainment' | 'interior' | 'whatsapp' | 'location' | 'history' | 'sales' | 'email' | 'tips' | 'faq' | null;

export default function AutoSpecPage() {
  const [activePopup, setActivePopup] = useState<PopupType>(null);
  const [activeMedia, setActiveMedia] = useState<'video' | number>('video');
  const [api, setApi] = useState<CarouselApi>();
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  const closePopup = () => setActivePopup(null);

  // Sync Carousel with activeMedia state
  useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      const index = api.selectedScrollSnap();
      if (index === 0) {
        setActiveMedia('video');
      } else {
        setActiveMedia(index - 1);
      }
    };

    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Scroll to carousel item when activeMedia changes
  useEffect(() => {
    if (!api) return;
    const targetIndex = activeMedia === 'video' ? 0 : (activeMedia as number) + 1;
    if (api.selectedScrollSnap() !== targetIndex) {
      api.scrollTo(targetIndex);
    }
  }, [activeMedia, api]);

  // Menú Izquierdo: Características Técnicas
  const leftMenuItems = [
    { id: 'specs', label: 'Ficha Técnica', icon: Info },
    { id: 'features', label: 'Características', icon: Settings },
    { id: 'confort', label: 'Confort', icon: Wind },
    { id: 'performance', label: 'Rendimiento', icon: Timer },
    { id: 'general', label: 'Info General', icon: Layers },
    { id: 'exterior', label: 'Exterior', icon: Car },
    { id: 'safety', label: 'Seguridad', icon: ShieldAlert },
    { id: 'entertainment', label: 'Entretenimiento', icon: Radio },
    { id: 'interior', label: 'Interior', icon: Sofa },
  ];

  // Menú Inferior: Contacto y Utilidades
  const bottomNavItems = [
    { id: 'whatsapp', label: 'WhatsApp', icon: MessageCircle },
    { id: 'location', label: 'Ubicación', icon: MapPin },
    { id: 'history', label: 'Historia', icon: Activity },
    { id: 'sales', label: 'Ventas', icon: Users },
    { id: 'email', label: 'Email', icon: Mail },
  ];

  return (
    <div className="fixed inset-0 bg-white text-zinc-900 font-body overflow-hidden selection:bg-primary/30">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-zinc-50">
        <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[60%] bg-zinc-200/30 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[50%] bg-zinc-200/30 blur-[120px] rounded-full" />
        
        {/* Massive Background Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none">
          <h1 className="text-[100vw] font-black tracking-tighter leading-none italic text-zinc-900">911</h1>
        </div>
      </div>

      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 h-24 flex items-center justify-between px-10">
        <Link href="/proyectos">
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-900 rounded-full bg-white/50 border border-zinc-100">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex flex-col items-center">
          <div className="relative h-24 w-[500px]">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Aplicaciones%2FAplicacion%20automotriz%2FLogo%20porsche.webp?alt=media&token=f6939b56-7d69-457c-9ad4-8861c8d0561f" 
              alt="Porsche Logo" 
              className="h-full w-full object-contain" 
            />
          </div>
        </div>
        <div className="w-10" />
      </header>

      {/* Sidebar Táctico Izquierdo Colapsable */}
      <nav 
        className={cn(
          "absolute left-6 md:left-10 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-3 transition-all duration-500 ease-in-out",
          isSidebarExpanded ? "items-start" : "items-center"
        )}
      >
        {/* Botón de Expansión (Sidebar Toggle) */}
        <button
          onClick={() => setIsSidebarExpanded(!isSidebarExpanded)}
          className="w-12 h-12 rounded-2xl bg-zinc-900 text-white shadow-xl flex items-center justify-center mb-2 hover:scale-105 transition-transform"
        >
          {isSidebarExpanded ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {leftMenuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePopup(item.id as PopupType)}
            className={cn(
              "group flex items-center p-2.5 rounded-2xl transition-all duration-500 overflow-hidden",
              activePopup === item.id 
                ? "bg-zinc-900 text-white shadow-xl" 
                : "bg-white/80 backdrop-blur-md border border-zinc-200 text-zinc-500 hover:border-zinc-400 hover:text-zinc-900",
              isSidebarExpanded ? "gap-4 w-full pr-6" : "gap-0 w-12"
            )}
          >
            <div className={cn(
              "w-7 h-7 rounded-xl flex items-center justify-center shrink-0 transition-transform",
              activePopup === item.id ? "bg-white/10" : "bg-zinc-50"
            )}>
              <item.icon className="w-3.5 h-3.5" />
            </div>
            
            <AnimatePresence mode="wait">
              {isSidebarExpanded && (
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="text-[9px] font-black uppercase tracking-widest whitespace-nowrap"
                >
                  {item.label}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </nav>

      {/* Botones Flotantes Derecha (Consejos y FAQ) */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
        <button
          onClick={() => setActivePopup('tips')}
          className={cn(
            "group flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-xl border border-zinc-200 shadow-lg hover:border-primary transition-all",
            activePopup === 'tips' ? "bg-primary text-white" : "text-zinc-500 hover:text-primary"
          )}
        >
          <Lightbulb className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
          <span className="text-[8px] font-black uppercase tracking-widest">Consejos</span>
        </button>
        
        <button
          onClick={() => setActivePopup('faq')}
          className={cn(
            "group flex flex-col items-center justify-center w-16 h-16 rounded-2xl bg-white/80 backdrop-blur-xl border border-zinc-200 shadow-lg hover:border-primary transition-all",
            activePopup === 'faq' ? "bg-primary text-white" : "text-zinc-500 hover:text-primary"
          )}
        >
          <HelpCircle className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
          <span className="text-[8px] font-black uppercase tracking-widest">FAQ</span>
        </button>
      </div>

      {/* Redes Sociales Inferior Izquierda */}
      <div className="absolute bottom-10 left-10 z-40 flex flex-col gap-4">
        <button className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-xl border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-all shadow-lg group">
          <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
        <button className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-xl border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-all shadow-lg group">
          <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Menú Inferior (Contacto) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-4">
        <nav className="flex items-center gap-2 p-2 bg-primary border border-white/10 rounded-3xl">
          {bottomNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePopup(item.id as PopupType)}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-500 group",
                activePopup === item.id ? "bg-white text-primary" : "text-white hover:bg-white/10"
              )}
            >
              <item.icon className={cn(
                "w-4 h-4 transition-transform group-hover:scale-110",
                activePopup === item.id ? "text-primary" : "text-white"
              )} />
              <span className="text-[9px] font-black uppercase tracking-widest hidden lg:inline">
                {item.label}
              </span>
            </button>
          ))}
        </nav>
        
        {/* Créditos */}
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
          <span className="hidden md:inline">Desarrollada con</span>
          <Heart className="w-3.5 h-3.5 text-primary fill-primary animate-heartbeat" />
          <span>por Naxde Studio</span>
        </div>
      </div>

      {/* Media Central */}
      <main className="relative z-10 w-full h-full flex flex-col items-center justify-center pt-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: -30 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full max-w-5xl px-10 flex flex-col items-center"
        >
          {/* Título y Precio */}
          <div className="mb-8 text-center space-y-2">
            <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none text-zinc-900">{carData.model}</h2>
            <div className="flex items-center justify-center gap-4">
              <span className="text-2xl font-black text-zinc-900">{carData.price}</span>
              <div className="w-1 h-1 rounded-full bg-zinc-200" />
              <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">{carData.negotiable ? 'Precio Negociable' : ''}</span>
            </div>
          </div>

          {/* Main Display */}
          <div className="relative w-full aspect-video rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.1)] border-[12px] border-white/5 bg-zinc-100 mb-8 group">
            {activeMedia === 'video' ? (
              <video 
                src={carData.videoUrl} 
                autoPlay 
                loop 
                muted 
                playsInline 
                className="w-full h-full object-cover"
              />
            ) : (
              <img 
                src={carData.images[activeMedia as number]} 
                alt="Porsche Detail" 
                className="w-full h-full object-cover animate-in fade-in duration-500"
              />
            )}
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            
            <div className="absolute top-8 left-8 flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {activeMedia === 'video' ? 'Live Presentation' : 'HD Image View'}
            </div>
          </div>

          {/* Miniatures with Swipe & Dots */}
          <div className="w-full max-w-3xl flex flex-col items-center gap-4">
            <div className="w-full px-10 relative">
              <Carousel
                setApi={setApi}
                opts={{
                  align: "start",
                  containScroll: "trimSnaps"
                }}
                className="w-full"
              >
                <CarouselContent className="-ml-3">
                  <CarouselItem className="pl-3 basis-auto">
                    <button 
                      onClick={() => setActiveMedia('video')}
                      className={cn(
                        "relative flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300",
                        activeMedia === 'video' ? "border-primary scale-110 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"
                      )}
                    >
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center z-10">
                        <Play className="w-4 h-4 text-white fill-white" />
                      </div>
                      <video src={carData.videoUrl} muted className="w-full h-full object-cover" />
                    </button>
                  </CarouselItem>

                  {carData.images.map((img, idx) => (
                    <CarouselItem key={idx} className="pl-3 basis-auto">
                      <button 
                        key={idx}
                        onClick={() => setActiveMedia(idx)}
                        className={cn(
                          "flex-shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300",
                          activeMedia === idx ? "border-primary scale-110 shadow-lg" : "border-transparent opacity-60 hover:opacity-100"
                        )}
                      >
                        <img src={img} className="w-full h-full object-cover" alt="Porsche thumbnail" />
                      </button>
                    </CarouselItem>
                  ))}
                </CarouselContent>
              </Carousel>
            </div>

            {/* Bubble Indicators */}
            <div className="flex justify-center items-center gap-2">
              <button
                onClick={() => setActiveMedia('video')}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  activeMedia === 'video' ? "w-6 bg-primary" : "w-1.5 bg-zinc-300"
                )}
              />
              {carData.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMedia(idx)}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    activeMedia === idx ? "w-6 bg-primary" : "w-1.5 bg-zinc-300"
                  )}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </main>

      {/* Popups */}
      <AnimatePresence>
        {activePopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePopup}
              className="absolute inset-0 bg-white/80 backdrop-blur-md"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-white border border-zinc-200 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.05)] overflow-hidden"
            >
              <header className="p-8 border-b border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-100 flex items-center justify-center">
                    {(() => {
                      const item = [...leftMenuItems, ...bottomNavItems, 
                        { id: 'tips', icon: Lightbulb, label: 'Consejos' },
                        { id: 'faq', icon: HelpCircle, label: 'Preguntas Frecuentes' }
                      ].find(i => i.id === activePopup);
                      return item?.icon && React.createElement(item.icon, { className: "w-6 h-6 text-zinc-900" });
                    })()}
                  </div>
                  <h3 className="text-2xl font-headline font-bold uppercase tracking-tight text-zinc-900">
                    {[...leftMenuItems, ...bottomNavItems, 
                      { id: 'tips', label: 'Consejos de Experto' },
                      { id: 'faq', label: 'Preguntas Frecuentes' }
                    ].find(i => i.id === activePopup)?.label}
                  </h3>
                </div>
                <button 
                  onClick={closePopup}
                  className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center hover:bg-zinc-200 transition-colors"
                >
                  <X className="w-6 h-6 text-zinc-400" />
                </button>
              </header>

              <div className="p-8 md:p-12 max-h-[60vh] overflow-y-auto no-scrollbar">
                {activePopup === 'specs' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {[
                      { icon: Zap, label: "Motor", val: carData.engine },
                      { icon: Settings2, label: "Transmisión", val: carData.transmission },
                      { icon: Fuel, label: "Combustible", val: carData.fuel },
                      { icon: Box, label: "Referencia", val: carData.reference },
                      { icon: Palette, label: "Color", val: carData.color },
                      { icon: Handshake, label: "Permuta", val: carData.permuta },
                    ].map((item, i) => (
                      <div key={i} className="flex flex-col gap-1 p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                        <item.icon className="w-4 h-4 text-zinc-900 mb-2" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{item.label}</span>
                        <span className="text-lg font-bold text-zinc-900">{item.val}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activePopup === 'features' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                    {[
                      { icon: Palette, label: "Color", val: carData.color },
                      { icon: DoorOpen, label: "Puertas", val: carData.doors },
                      { icon: Fuel, label: "Tipo de combustible", val: carData.fuel },
                      { icon: Activity, label: "Sensor de parqueo", val: carData.sensors },
                      { icon: Cpu, label: "Motor", val: carData.engine },
                      { icon: Settings2, label: "Transmisión", val: carData.transmission },
                      { icon: Handshake, label: "Venpermuta", val: carData.permuta },
                      { icon: CircleDollarSign, label: "Con precio negociable", val: carData.negotiable },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-full bg-zinc-100 flex items-center justify-center shrink-0 shadow-sm">
                          <item.icon className="w-6 h-6 text-zinc-900" />
                        </div>
                        <div className="flex gap-2 items-baseline text-zinc-600">
                          <span className="text-base font-medium whitespace-nowrap">{item.label}:</span>
                          <span className="text-base font-black text-zinc-900">{item.val}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activePopup === 'confort' && (
                  <div className="space-y-1">
                    {[
                      { label: "Piloto automático", val: "No" },
                      { label: "Aire acondicionado", val: "Sí" },
                      { label: "Alarma de luces encendidas", val: "Sí" },
                      { label: "Computadora de abordo", val: "Sí" },
                      { label: "Vidrios eléctricos", val: "Sí" },
                      { label: "Sensor de lluvia", val: "Sí" },
                      { label: "Apertura remota de baúl", val: "Sí" },
                      { label: "Comando remoto para radio en el volante", val: "Sí" },
                      { label: "Porta vasos", val: "Sí" },
                      { label: "Climatizador", val: "Sí" },
                      { label: "Cierre automático de vidrios", val: "Sí" },
                    ].map((item, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "flex justify-between items-center p-4 rounded-xl transition-colors",
                          i % 2 === 0 ? "bg-zinc-50" : "bg-white"
                        )}
                      >
                        <span className="text-sm font-bold text-zinc-600 uppercase tracking-tight">{item.label}</span>
                        <span className={cn(
                          "text-sm font-black uppercase tracking-widest",
                          item.val === 'Sí' ? "text-green-600" : "text-red-500"
                        )}>
                          {item.val}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activePopup === 'performance' && (
                  <div className="space-y-1">
                    {[
                      { label: "Control de tracción", val: "Delantera" },
                      { label: "Capacidad de personas", val: "2" },
                      { label: "Potencia", val: "400 hp" },
                      { label: "Válvulas por cilindro", val: "4" },
                    ].map((item, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "flex justify-between items-center p-4 rounded-xl transition-colors",
                          i % 2 === 0 ? "bg-zinc-50" : "bg-white"
                        )}
                      >
                        <span className="text-sm font-bold text-zinc-600 uppercase tracking-tight">{item.label}</span>
                        <span className="text-sm font-black uppercase tracking-widest text-zinc-900">
                          {item.val}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activePopup === 'general' && (
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { l: "Año Modelo", v: carData.year },
                      { l: "Kilometraje", v: carData.mileage },
                      { l: "Dueños", v: carData.owners },
                      { l: "Puertas", v: carData.doors }
                    ].map((item, i) => (
                      <div key={i} className="p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">{item.l}</p>
                        <p className="text-xl font-bold">{item.v}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activePopup === 'exterior' && (
                  <div className="space-y-1">
                    {[
                      { label: "Llantas de aleación", val: "Sí" },
                      { label: "Techo corredizo", val: "No" },
                      { label: "Soporte para llanta de repuesto", val: "Sí" },
                      { label: "Limpia/lava luneta", val: "Sí" },
                      { label: "Porta equipaje en techo", val: "No" },
                    ].map((item, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "flex justify-between items-center p-4 rounded-xl transition-colors",
                          i % 2 === 0 ? "bg-zinc-50" : "bg-white"
                        )}
                      >
                        <span className="text-sm font-bold text-zinc-600 uppercase tracking-tight">{item.label}</span>
                        <span className={cn(
                          "text-sm font-black uppercase tracking-widest",
                          item.val === 'Sí' ? "text-green-600" : "text-red-500"
                        )}>
                          {item.val}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activePopup === 'safety' && (
                  <div className="space-y-1">
                    {[
                      { label: "Frenos ABS", val: "Sí" },
                      { label: "Defensa delantera", val: "Sí" },
                      { label: "Airbag conductor", val: "Sí" },
                      { label: "Luces con regulación automática", val: "Sí" },
                      { label: "Sensor de parqueo", val: "Sí" },
                      { label: "Airbag para conductor y pasajero", val: "Sí" },
                      { label: "Faros antinieblas traseros", val: "Sí" },
                      { label: "Desempañador trasero", val: "Sí" },
                      { label: "Control de estabilidad", val: "Sí" },
                      { label: "Tercera luz de freno led", val: "Sí" },
                      { label: "Cierre centralizado de puertas", val: "Sí" },
                      { label: "Blindado", val: "No" },
                    ].map((item, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "flex justify-between items-center p-4 rounded-xl transition-colors",
                          i % 2 === 0 ? "bg-zinc-50" : "bg-white"
                        )}
                      >
                        <span className="text-sm font-bold text-zinc-600 uppercase tracking-tight">{item.label}</span>
                        <span className={cn(
                          "text-sm font-black uppercase tracking-widest",
                          item.val === 'Sí' ? "text-green-600" : "text-red-500"
                        )}>
                          {item.val}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activePopup === 'entertainment' && (
                  <div className="space-y-1">
                    {[
                      { label: "AM/FM", val: "Sí" },
                      { label: "Bluetooth", val: "Sí" },
                      { label: "Reproductor de MP3", val: "Sí" },
                      { label: "Entrada USB", val: "Sí" },
                      { label: "Android Auto", val: "Sí" },
                      { label: "Apple CarPlay", val: "Sí" },
                      { label: "Control de audio al volante", val: "Sí" },
                    ].map((item, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "flex justify-between items-center p-4 rounded-xl transition-colors",
                          i % 2 === 0 ? "bg-zinc-50" : "bg-white"
                        )}
                      >
                        <span className="text-sm font-bold text-zinc-600 uppercase tracking-tight">{item.label}</span>
                        <span className={cn(
                          "text-sm font-black uppercase tracking-widest",
                          item.val === 'Sí' ? "text-green-600" : "text-red-500"
                        )}>
                          {item.val}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activePopup === 'interior' && (
                  <div className="space-y-1">
                    {[
                      { label: "Tapizado de cuero", val: "Sí" },
                      { label: "Computadora de abordo", val: "Sí" },
                      { label: "Aire acondicionado", val: "Sí" },
                      { label: "Cristales eléctricos", val: "Sí" },
                      { label: "Comando remoto para radio en el volante", val: "Sí" },
                      { label: "Porta vasos", val: "Sí" },
                      { label: "Asientos eléctricos", val: "Sí" },
                    ].map((item, i) => (
                      <div 
                        key={i} 
                        className={cn(
                          "flex justify-between items-center p-4 rounded-xl transition-colors",
                          i % 2 === 0 ? "bg-zinc-50" : "bg-white"
                        )}
                      >
                        <span className="text-sm font-bold text-zinc-600 uppercase tracking-tight">{item.label}</span>
                        <span className={cn(
                          "text-sm font-black uppercase tracking-widest",
                          item.val === 'Sí' ? "text-green-600" : "text-red-500"
                        )}>
                          {item.val}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activePopup === 'tips' && (
                  <div className="space-y-8">
                    {[
                      { t: "Mantenimiento Preventivo", d: "Realiza el cambio de aceite y filtros cada 10,000 km o una vez al año para mantener la eficiencia del motor bóxer biturbo." },
                      { t: "Cuidado de Pintura", d: "El color blanco brillante requiere encerado semestral para proteger la laca contra los rayos UV y contaminantes ambientales." },
                      { t: "Optimización de Conducción", d: "Usa el modo Sport solo en carreteras abiertas; para ciudad, el modo Normal optimiza el consumo de gasolina y suaviza la suspensión." },
                      { t: "Neumáticos de Alto Rendimiento", d: "Verifica la presión en frío semanalmente. Una presión incorrecta afecta drásticamente la estabilidad y el agarre en curvas." }
                    ].map((tip, i) => (
                      <div key={i} className="p-6 rounded-[2rem] bg-zinc-50 border border-zinc-100 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                          <Lightbulb className="w-12 h-12 text-primary" />
                        </div>
                        <h4 className="text-xl font-bold mb-2 uppercase tracking-tight text-zinc-900">{tip.t}</h4>
                        <p className="text-zinc-500 font-medium leading-relaxed">{tip.d}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activePopup === 'faq' && (
                  <div className="space-y-4">
                    {[
                      { q: "¿El vehículo cuenta con garantía vigente?", a: "Sí, cuenta con garantía de fábrica extendida hasta finales de 2025 o 50,000 km, lo que ocurra primero." },
                      { q: "¿Se aceptan peritajes externos?", a: "Absolutamente. Invitamos a los compradores a realizar peritajes en centros autorizados Porsche o de su confianza." },
                      { q: "¿Cómo es el proceso de traspaso?", a: "El vehículo está libre de gravámenes. El traspaso se realiza de forma inmediata tras el acuerdo comercial, con gestión documental incluida." },
                      { q: "¿Dónde puedo ver el carro físicamente?", a: "Se encuentra disponible en nuestro Showroom Principal en la Zona Norte de Bogotá, bajo cita previa." }
                    ].map((faq, i) => (
                      <div key={i} className="p-6 rounded-2xl border border-zinc-100 hover:bg-zinc-50 transition-colors">
                        <h4 className="text-lg font-bold text-zinc-900 mb-2">Q: {faq.q}</h4>
                        <p className="text-zinc-500 font-medium">A: {faq.a}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activePopup === 'whatsapp' && (
                  <div className="text-center space-y-8">
                    <p className="text-zinc-500 font-medium text-lg">Inicia una conversación directa con un asesor certificado.</p>
                    <button className="w-full h-20 bg-[#25D366] hover:bg-[#128C7E] text-white rounded-[2rem] text-xl font-black flex items-center justify-center gap-4 shadow-xl transition-all">
                      <MessageCircle className="w-8 h-8 fill-white" />
                      WHATSAPP ASESOR
                    </button>
                  </div>
                )}

                {activePopup === 'location' && (
                  <div className="space-y-8">
                    <div className="aspect-video rounded-[2.5rem] bg-zinc-100 overflow-hidden border border-zinc-200">
                      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15904.4848412314!2d-74.05!3d4.7!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwNDInMDAuMCJOIDc0wrAwMycwMC4wIlc!5e0!3m2!1ses!2sco!4v1620000000000!5m2!1ses!2sco" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy"></iframe>
                    </div>
                    <div className="flex items-center gap-6 p-6 bg-zinc-50 rounded-3xl border border-zinc-100">
                      <MapPin className="w-10 h-10 text-zinc-900" />
                      <div>
                        <h4 className="font-bold text-lg">Showroom Principal</h4>
                        <p className="text-zinc-500">Bogotá, Colombia • Zona Norte</p>
                      </div>
                    </div>
                  </div>
                )}

                {activePopup === 'history' && (
                  <div className="space-y-6">
                    <p className="text-lg text-zinc-600 leading-relaxed font-medium">
                      {carData.description}
                    </p>
                    <div className="p-6 rounded-3xl bg-zinc-50 border border-zinc-100 italic text-zinc-400">
                      "El 911 es el único coche que puedes conducir en un safari por África, en Le Mans, ir al teatro y circular por las calles de Nueva York."
                    </div>
                  </div>
                )}

                {activePopup === 'sales' && (
                  <div className="space-y-8">
                    {/* Perfil de Muestra Detallado */}
                    <div className="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 shadow-sm">
                      <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="relative">
                          <div className="w-24 h-24 rounded-full bg-zinc-200 overflow-hidden border-4 border-white shadow-md">
                            <img 
                              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200" 
                              alt="Andrés Mendoza" 
                              className="w-full h-full object-cover" 
                            />
                          </div>
                          <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full border-4 border-white flex items-center justify-center text-white">
                            <UserCheck className="w-4 h-4" />
                          </div>
                        </div>
                        
                        <div className="text-center md:text-left space-y-2">
                          <h4 className="text-2xl font-black uppercase tracking-tight text-zinc-900">Andrés Mendoza</h4>
                          <div className="flex items-center justify-center md:justify-start gap-2">
                            <Badge className="bg-primary/10 text-primary border-none text-[10px] font-black uppercase px-3">Asesor Certificado</Badge>
                            <span className="text-xs text-zinc-400 font-bold uppercase tracking-widest">• Executive Sales Manager</span>
                          </div>
                          <p className="text-sm text-zinc-500 leading-relaxed max-w-sm">
                            Especialista en vehículos de alta gama con más de 10 años de experiencia en la marca Porsche.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <button className="h-16 bg-zinc-900 text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-black transition-all shadow-lg group">
                        <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                        LLAMAR AHORA
                      </button>
                      <button className="h-16 bg-[#25D366] text-white rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-[#128C7E] transition-all shadow-lg group">
                        <MessageCircle className="w-5 h-5 fill-white group-hover:scale-110 transition-transform" />
                        WHATSAPP DIRECTO
                      </button>
                    </div>
                    
                    <div className="pt-4 border-t border-zinc-100 flex items-center justify-center gap-4 opacity-40">
                      <Star className="w-4 h-4 text-zinc-400 fill-zinc-400" />
                      <Star className="w-4 h-4 text-zinc-400 fill-zinc-400" />
                      <Star className="w-4 h-4 text-zinc-400 fill-zinc-400" />
                      <Star className="w-4 h-4 text-zinc-400 fill-zinc-400" />
                      <Star className="w-4 h-4 text-zinc-400 fill-zinc-400" />
                    </div>
                  </div>
                )}

                {activePopup === 'email' && (
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-zinc-400 px-2">Tu Correo Electrónico</label>
                      <input type="email" placeholder="ejemplo@correo.com" className="w-full h-14 px-6 rounded-2xl bg-zinc-50 border border-zinc-200 focus:border-zinc-900 outline-none transition-all" />
                    </div>
                    <button className="w-full h-16 bg-zinc-900 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-black transition-all">
                      ENVIAR DOSSIER COMPLETO
                    </button>
                  </div>
                )}
              </div>

              <footer className="p-8 bg-zinc-50 border-t border-zinc-100 text-center">
                <p className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.5em]">Naxde Auto Hub • ID: 911-C24</p>
              </footer>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.3); }
        }
        .animate-heartbeat {
          animation: heartbeat 1.2s infinite ease-in-out;
          display: inline-block;
        }
      `}</style>
    </div>
  );
}
