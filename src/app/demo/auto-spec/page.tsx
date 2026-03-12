"use client"

import React, { useState } from 'react';
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
  Activity
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

const carData = {
  brand: "Porsche",
  model: "911 Carrera S",
  year: 2024,
  price: "$145,000",
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
  description: "El Porsche 911 Carrera S redefine la ingeniería automotriz. Una obra maestra de precisión alemana diseñada para quienes no aceptan compromisos. Su motor bóxer biturbo entrega una respuesta inmediata, mientras que su silueta icónica corta el viento con una eficiencia inigualable.",
  images: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200",
  ]
};

type PopupType = 'specs' | 'engine' | 'equipment' | 'contact' | 'description' | null;

export default function AutoSpecPage() {
  const [activePopup, setActivePopup] = useState<PopupType>(null);

  const closePopup = () => setActivePopup(null);

  const menuItems = [
    { id: 'specs', label: 'Ficha Técnica', icon: Info },
    { id: 'engine', label: 'Motor y Potencia', icon: Zap },
    { id: 'equipment', label: 'Equipamiento', icon: Settings2 },
    { id: 'description', label: 'Historia', icon: Activity },
    { id: 'contact', label: 'Ventas', icon: MessageCircle },
  ];

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-white to-zinc-100 text-zinc-900 font-body overflow-hidden selection:bg-primary/30">
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[60%] bg-primary/5 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[50%] bg-blue-600/5 blur-[120px] rounded-full" />
        
        {/* Massive Background Text */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.05] select-none">
          <h1 className="text-[40vw] font-black tracking-tighter leading-none italic text-zinc-900">911</h1>
        </div>
      </div>

      {/* Minimalist Header */}
      <header className="absolute top-0 left-0 right-0 z-50 h-24 flex items-center justify-between px-10">
        <Link href="/proyectos">
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-900 rounded-full bg-zinc-100/50">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex flex-col items-center gap-1">
          <div className="relative h-20 w-[200px]">
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Logos%2Fporsche-logo-0.png?alt=media&token=7ab4dfea-f919-4f19-8e5f-91427f396bbe" 
              alt="Porsche Logo" 
              className="h-full w-full object-contain" 
            />
          </div>
          <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-zinc-400">Official Dealer Hub</span>
        </div>
        <div className="w-10" /> {/* Spacer */}
      </header>

      {/* Tactical Left Menu */}
      <nav className="absolute left-10 top-1/2 -translate-y-1/2 z-40 flex flex-col gap-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePopup(item.id as PopupType)}
            className={cn(
              "group flex items-center gap-4 p-3 rounded-2xl transition-all duration-500",
              activePopup === item.id ? "bg-primary text-white shadow-lg shadow-primary/20" : "bg-white border border-zinc-200 text-zinc-500 hover:border-primary/30 hover:text-primary"
            )}
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform",
              activePopup === item.id ? "bg-white/20" : "bg-zinc-50"
            )}>
              <item.icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest pr-4 opacity-100 transition-opacity whitespace-nowrap">
              {item.label}
            </span>
          </button>
        ))}
      </nav>

      {/* Hero Car Section */}
      <main className="relative z-10 w-full h-full flex flex-col items-center justify-center pt-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative w-full max-w-5xl px-10"
        >
          <img 
            src={carData.images[0]} 
            alt={carData.model} 
            className="w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.15)]"
          />
          
          {/* Price Label */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center space-y-2">
            <h2 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-none text-zinc-900">{carData.model}</h2>
            <div className="flex items-center justify-center gap-4">
              <span className="text-2xl font-black text-primary">{carData.price}</span>
              <div className="w-1 h-1 rounded-full bg-zinc-200" />
              <span className="text-sm font-bold text-zinc-400 uppercase tracking-widest">{carData.negotiable}</span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Pop-up System */}
      <AnimatePresence>
        {activePopup && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 md:p-10">
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closePopup}
              className="absolute inset-0 bg-white/60 backdrop-blur-md"
            />

            {/* Content Window */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full max-w-2xl bg-white/95 border border-zinc-200 rounded-[3rem] shadow-[0_30px_100px_rgba(0,0,0,0.1)] overflow-hidden"
            >
              <header className="p-8 border-b border-zinc-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center">
                    {menuItems.find(i => i.id === activePopup)?.icon && React.createElement(menuItems.find(i => i.id === activePopup)!.icon, { className: "w-6 h-6 text-primary" })}
                  </div>
                  <h3 className="text-2xl font-headline font-bold uppercase tracking-tight text-zinc-900">
                    {menuItems.find(i => i.id === activePopup)?.label}
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
                        <item.icon className="w-4 h-4 text-primary mb-2" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{item.label}</span>
                        <span className="text-lg font-bold text-zinc-900">{item.val}</span>
                      </div>
                    ))}
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
                      <div key={i} className="flex items-center justify-between p-6 rounded-[2rem] bg-zinc-50 border border-zinc-100">
                        <div className="flex items-center gap-4">
                          <item.icon className="w-6 h-6 text-primary" />
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
                        <CheckCircle2 className="w-4 h-4 text-primary" />
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

                {activePopup === 'contact' && (
                  <div className="space-y-8">
                    <div className="text-center">
                      <p className="text-zinc-400 text-sm font-medium mb-6">Asesoría personalizada disponible ahora</p>
                      <div className="flex flex-col gap-4">
                        <Button className="h-16 bg-primary hover:bg-primary/90 text-white rounded-2xl text-xl font-black gap-4 neon-accent shadow-glow-accent">
                          <MessageCircle className="w-6 h-6" />
                          WHATSAPP ASESOR
                        </Button>
                        <Button variant="outline" className="h-16 border-zinc-200 hover:bg-zinc-50 text-zinc-900 rounded-2xl text-xl font-black gap-4">
                          <Phone className="w-6 h-6" />
                          SOLICITAR LLAMADA
                        </Button>
                      </div>
                    </div>
                    <div className="p-6 rounded-[2rem] border border-zinc-100 bg-zinc-50 flex items-center gap-6">
                      <MapPin className="w-8 h-8 text-primary" />
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
