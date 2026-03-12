
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
  Image as ImageIcon,
  Heart,
  Facebook,
  Instagram,
  Palette,
  Handshake,
  DoorOpen,
  Radio,
  CircleDollarSign,
  Layers
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

// Datos del vehículo actualizados con video y especificaciones finales
const carData = {
  brand: "Porsche",
  model: "911 Carrera",
  year: 2024,
  price: "210.000.000",
  mileage: "0 KM",
  owners: "1 (Nuevo)",
  reference: "992 Generation",
  color: "Crayon Gray",
  fuel: "Gasolina Extra",
  engine: "3.0L Flat-6 Twin-Turbo",
  transmission: "PDK 8 Velocidades",
  permuta: "Se acepta permuta",
  doors: 2,
  sensors: "360° Vision Pro",
  negotiable: "Precio Negociable",
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

type PopupType = 'specs' | 'features' | 'engine' | 'equipment' | 'gallery' | 'contact' | 'description' | 'interior' | 'safety' | 'tech' | 'performance' | null;

export default function AutoSpecPage() {
  const [activePopup, setActivePopup] = useState<PopupType>(null);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const closePopup = () => setActivePopup(null);

  const menuItems = [
    { id: 'specs', label: 'Ficha Técnica', icon: Info },
    { id: 'features', label: 'Características', icon: Layers },
    { id: 'engine', label: 'Motor y Potencia', icon: Zap },
    { id: 'equipment', label: 'Equipamiento', icon: Settings2 },
    { id: 'gallery', label: 'Imágenes', icon: ImageIcon },
    { id: 'description', label: 'Historia', icon: Activity },
    { id: 'contact', label: 'Ventas', icon: MessageCircle },
  ];

  const bottomNavItems = [
    { id: 'interior', label: 'Interior', icon: Sofa },
    { id: 'safety', label: 'Seguridad', icon: ShieldAlert },
    { id: 'tech', label: 'Tecnología', icon: Cpu },
    { id: 'performance', label: 'Performance', icon: Timer },
  ];

  return (
    <div className="fixed inset-0 bg-white text-zinc-900 font-body overflow-hidden selection:bg-primary/30">
      {/* Background Decor - Minimalista Gris y Blanco */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-zinc-50">
        <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[60%] bg-zinc-200/30 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[50%] bg-zinc-200/30 blur-[120px] rounded-full" />
        
        {/* Massive Background Text - Maximizado para impacto visual */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] select-none">
          <h1 className="text-[65vw] font-black tracking-tighter leading-none italic text-zinc-900">911</h1>
        </div>
      </div>

      {/* Header con Logo de 500px */}
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
        {/* Espacio reservado para equilibrio visual del justify-between */}
        <div className="w-10" />
      </header>

      {/* Menú Táctico Izquierdo */}
      <nav className="absolute left-10 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePopup(item.id as PopupType)}
            className={cn(
              "group flex items-center gap-4 p-3 rounded-2xl transition-all duration-500",
              activePopup === item.id 
                ? "bg-zinc-900 text-white shadow-xl" 
                : "bg-white border border-zinc-200 text-zinc-500 hover:border-zinc-400 hover:text-zinc-900"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform",
              activePopup === item.id ? "bg-white/10" : "bg-zinc-50"
            )}>
              <item.icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest pr-4 whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Redes Sociales Inferior Izquierda */}
      <div className="absolute bottom-10 left-10 z-40 flex flex-col gap-4">
        <button className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-xl border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-all shadow-lg group">
          <Instagram className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
        <button className="w-12 h-12 rounded-2xl bg-white/80 backdrop-blur-xl border border-zinc-200 flex items-center justify-center text-zinc-500 hover:text-zinc-900 transition-all shadow-lg group">
          <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Menú Inferior con Créditos */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-4">
        <nav className="flex items-center gap-2 p-2 bg-white/90 backdrop-blur-3xl border border-zinc-200 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)]">
          {bottomNavItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActivePopup(item.id as PopupType)}
              className={cn(
                "flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-500 group",
                activePopup === item.id ? "bg-zinc-900 text-white" : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 transition-transform group-hover:scale-110",
                activePopup === item.id ? "text-primary" : "text-zinc-400"
              )} />
              <span className="text-[10px] font-black uppercase tracking-widest">
                {item.label}
              </span>
            </button>
          ))}
        </nav>
        
        {/* Créditos debajo del menú */}
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
          <span className="hidden md:inline">Desarrollada con</span>
          <Heart className="w-3.5 h-3.5 text-primary fill-primary animate-heartbeat" />
          <span>por Naxde Studio</span>
        </div>
      </div>

      {/* Video Hero Principal */}
      <main className="relative z-10 w-full h-full flex flex-col items-center justify-center pt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full max-w-5xl px-10"
        >
          {/* Reproductor de Video Hero */}
          <div className="relative w-full aspect-video rounded-[3rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.1)] border-[12px] border-white/5 bg-zinc-100">
            <video 
              src={carData.videoUrl} 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            
            {/* Indicador de "Live" */}
            <div className="absolute top-8 left-8 flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest shadow-lg">
              <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Live Presentation
            </div>
          </div>
          
          {/* Etiquetas de Precio y Modelo */}
          <div className="mt-12 text-center space-y-2">
            <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none text-zinc-900">{carData.model}</h2>
            <div className="flex items-center justify-center gap-4">
              <span className="text-2xl font-black text-zinc-900">{carData.price}</span>
              <div className="w-1 h-1 rounded-full bg-zinc-200" />
              <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">{carData.negotiable}</span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Sistema de Ventanas Emergentes (Pop-ups) */}
      <AnimatePresence>
        {activePopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10">
            {/* Backdrop con desenfoque */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePopup}
              className="absolute inset-0 bg-white/80 backdrop-blur-md"
            />

            {/* Ventana de Contenido */}
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
                    {(menuItems.find(i => i.id === activePopup)?.icon || bottomNavItems.find(i => i.id === activePopup)?.icon) && 
                      React.createElement((menuItems.find(i => i.id === activePopup)?.icon || bottomNavItems.find(i => i.id === activePopup)!.icon)!, { className: "w-6 h-6 text-zinc-900" })}
                  </div>
                  <h3 className="text-2xl font-headline font-bold uppercase tracking-tight text-zinc-900">
                    {menuItems.find(i => i.id === activePopup)?.label || bottomNavItems.find(i => i.id === activePopup)?.label}
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
                      { icon: Calendar, label: "Año Modelo", val: carData.year },
                      { icon: Gauge, label: "Kilometraje", val: carData.mileage },
                      { icon: Users, label: "Dueños", val: carData.owners },
                      { icon: Box, label: "Referencia", val: carData.reference },
                      { icon: Sparkles, label: "Color", val: carData.color },
                      { icon: CheckCircle2, label: "Permuta", val: carData.permuta },
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
                  <div className="space-y-10">
                    <h4 className="text-3xl font-black tracking-tight text-zinc-900 border-b border-zinc-100 pb-4">Características del producto</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                      {[
                        { icon: Palette, label: "Color", val: "Blanco" },
                        { icon: DoorOpen, label: "Puertas", val: "2" },
                        { icon: Fuel, label: "Tipo de combustible", val: "Gasolina" },
                        { icon: Radio, label: "Sensor de parqueo", val: "Sí" },
                        { icon: Zap, label: "Motor", val: "3.8" },
                        { icon: Settings2, label: "Transmisión", val: "Automática" },
                        { icon: Handshake, label: "Venpermuta", val: "No" },
                        { icon: CircleDollarSign, label: "Con precio negociable", val: "Sí" },
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-6">
                          <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center shadow-sm shrink-0">
                            <item.icon className="w-6 h-6 text-zinc-900" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-zinc-500 whitespace-nowrap">{item.label}: <span className="text-zinc-900 font-bold">{item.val}</span></p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activePopup === 'gallery' && (
                  <div className="w-full">
                    <Carousel setApi={setApi} className="w-full">
                      <CarouselContent>
                        {carData.images.map((src, index) => (
                          <CarouselItem key={index}>
                            <div className="flex items-center justify-center p-2">
                              <img 
                                src={src} 
                                alt={`${carData.model} - toma ${index + 1}`} 
                                className="w-full h-auto max-h-[40vh] object-contain rounded-2xl"
                              />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      
                      <div className="flex justify-center gap-2 mt-6">
                        {carData.images.map((_, i) => (
                          <div 
                            key={i} 
                            className={cn(
                              "h-1.5 rounded-full transition-all duration-300",
                              current === i ? "w-8 bg-zinc-900" : "w-2 bg-zinc-200"
                            )} 
                          />
                        ))}
                      </div>

                      <div className="flex justify-between items-center mt-8">
                        <button 
                          onClick={() => api?.scrollPrev()}
                          className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 hover:bg-zinc-50 transition-colors text-sm font-bold"
                        >
                          <ChevronLeft className="w-4 h-4" /> Anterior
                        </button>
                        <button 
                          onClick={() => api?.scrollNext()}
                          className="flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-200 hover:bg-zinc-50 transition-colors text-sm font-bold"
                        >
                          Siguiente <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </Carousel>
                  </div>
                )}

                {activePopup === 'engine' && (
                  <div className="space-y-6">
                    {[
                      { label: "Motor", val: carData.engine, icon: Zap },
                      { label: "Transmisión", val: carData.transmission, icon: Settings2 },
                      { label: "Combustible", val: carData.fuel, icon: Fuel },
                      { label: "Tracción", val: "Trasera (RWD)", icon: Activity },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-6 rounded-[2.5rem] bg-zinc-50 border border-zinc-100">
                        <div className="flex items-center gap-4">
                          <item.icon className="w-6 h-6 text-zinc-900" />
                          <span className="text-xs font-black uppercase tracking-widest text-zinc-400">{item.label}</span>
                        </div>
                        <span className="text-lg font-bold text-zinc-900">{item.val}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activePopup === 'equipment' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[
                      "Sensores de Parqueo 360°",
                      "Faros LED Matrix",
                      "Frenos Cerámicos Pro",
                      "Sonido Burmester High-End",
                      "Asientos Deportivos Plus",
                      "Apple CarPlay Inalámbrico"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-50 border border-zinc-100">
                        <CheckCircle2 className="w-4 h-4 text-zinc-900" />
                        <span className="text-sm font-medium text-zinc-700">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activePopup === 'description' && (
                  <div className="space-y-6">
                    <p className="text-lg text-zinc-600 leading-relaxed font-medium">
                      {carData.description}
                    </p>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="aspect-square rounded-2xl bg-zinc-100" />
                      <div className="aspect-square rounded-2xl bg-zinc-100" />
                      <div className="aspect-square rounded-2xl bg-zinc-100" />
                    </div>
                  </div>
                )}

                {activePopup === 'interior' && (
                  <div className="space-y-6">
                    <div className="aspect-video rounded-[2rem] bg-zinc-100 mb-6 overflow-hidden">
                      <img src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200" alt="Interior" className="w-full h-full object-cover" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        "Cuero Club Premium",
                        "Iluminación Ambiental 64 Colores",
                        "Pantalla Táctil 10.9\"",
                        "Climatizador Bizona Pro"
                      ].map((feat, i) => (
                        <div key={i} className="p-4 rounded-xl bg-zinc-50 border border-zinc-100 flex items-center gap-3">
                          <CheckCircle2 className="w-4 h-4 text-zinc-900" />
                          <span className="text-sm font-bold text-zinc-700">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activePopup === 'safety' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[
                        { t: "8 Airbags Pro", d: "Protección integral envolvente" },
                        { t: "Frenado Emergencia", d: "Detección de colisión frontal" },
                        { t: "Control Estabilidad", d: "Porsche Stability Management" },
                        { t: "Anclajes ISOFIX", d: "Seguridad para asientos infantiles" }
                      ].map((item, i) => (
                        <div key={i} className="p-6 rounded-[2rem] bg-zinc-50 border border-zinc-100 space-y-2">
                          <Shield className="w-6 h-6 text-zinc-900" />
                          <h4 className="font-black text-zinc-900 uppercase text-sm tracking-tight">{item.t}</h4>
                          <p className="text-xs text-zinc-500">{item.d}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activePopup === 'tech' && (
                  <div className="space-y-6">
                    <div className="flex flex-col gap-4">
                      {[
                        { icon: Globe, t: "Porsche Connect", d: "Servicios online y navegación en tiempo real" },
                        { icon: Zap, t: "Sonido Bose Pro", d: "12 altavoces de alta fidelidad" },
                        { icon: Smartphone, t: "App Remote", d: "Controla tu coche desde el smartphone" }
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-6 p-6 rounded-[2rem] bg-zinc-50 border border-zinc-100">
                          <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                            <item.icon className="w-6 h-6 text-zinc-900" />
                          </div>
                          <div>
                            <h4 className="font-bold text-zinc-900">{item.t}</h4>
                            <p className="text-xs text-zinc-500">{item.d}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activePopup === 'performance' && (
                  <div className="space-y-8">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="flex flex-col items-center p-6 rounded-[2.5rem] bg-zinc-900 text-white text-center">
                        <Timer className="w-6 h-6 text-primary mb-2" />
                        <span className="text-[8px] font-black uppercase opacity-50">0-100 km/h</span>
                        <span className="text-2xl font-black italic">3.5s</span>
                      </div>
                      <div className="flex flex-col items-center p-6 rounded-[2.5rem] bg-zinc-900 text-white text-center">
                        <Gauge className="w-6 h-6 text-primary mb-2" />
                        <span className="text-[8px] font-black uppercase opacity-50">V. Máxima</span>
                        <span className="text-2xl font-black italic">306</span>
                      </div>
                      <div className="flex flex-col items-center p-6 rounded-[2.5rem] bg-zinc-900 text-white text-center">
                        <Activity className="w-6 h-6 text-primary mb-2" />
                        <span className="text-[8px] font-black uppercase opacity-50">Potencia</span>
                        <span className="text-2xl font-black italic">450 CV</span>
                      </div>
                    </div>
                    <div className="p-6 rounded-[2rem] border border-zinc-100 bg-zinc-50">
                      <h4 className="font-bold text-zinc-900 mb-4">Dinámica de Conducción</h4>
                      <p className="text-sm text-zinc-600 leading-relaxed">
                        Sistema de suspensión activa (PASM) con ajuste continuo de la amortiguación. Porsche Torque Vectoring Plus para una agilidad superior en curvas.
                      </p>
                    </div>
                  </div>
                )}

                {activePopup === 'contact' && (
                  <div className="space-y-8">
                    <div className="text-center">
                      <p className="text-zinc-400 text-sm font-medium mb-6">Asesoría personalizada disponible ahora</p>
                      <div className="flex flex-col gap-4">
                        <button className="h-16 bg-zinc-900 hover:bg-black text-white rounded-2xl text-xl font-black flex items-center justify-center gap-4 shadow-lg transition-all">
                          <MessageCircle className="w-6 h-6" />
                          WHATSAPP ASESOR
                        </button>
                        <button className="h-16 border border-zinc-200 hover:bg-zinc-50 text-zinc-900 rounded-2xl text-xl font-black flex items-center justify-center gap-4 transition-all">
                          <Phone className="w-6 h-6" />
                          SOLICITAR LLAMADA
                        </button>
                      </div>
                    </div>
                    <div className="p-6 rounded-[2.5rem] border border-zinc-100 bg-zinc-50 flex items-center gap-6">
                      <MapPin className="w-8 h-8 text-zinc-900" />
                      <div>
                        <h4 className="font-bold text-zinc-900">Showroom Bogotá</h4>
                        <p className="text-zinc-500 text-sm">Av. 116 # 45-20, Zona Norte</p>
                      </div>
                    </div>
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
      `}</style>
    </div>
  );
}
