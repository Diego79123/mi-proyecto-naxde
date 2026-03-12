
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
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';

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
  description: "El Porsche 911 Carrera S redefine la ingeniería automotriz. Una obra maestra de precisión alemana diseñada para quienes no aceptan compromisos.",
  images: [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200",
    "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=1200"
  ]
};

export default function AutoSpecPage() {
  const [activeTab, setActiveTab] = useState('specs');

  return (
    <div className="min-h-screen bg-[#050515] text-white font-sans selection:bg-primary/30">
      {/* Background Decor */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[60%] bg-primary/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[70%] h-[50%] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      {/* Header Interactivo */}
      <header className="sticky top-0 z-50 h-16 bg-black/40 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-6">
        <Link href="/proyectos">
          <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex flex-col items-center">
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-primary">Naxde Auto Hub</span>
          <span className="text-xs font-bold uppercase tracking-widest">Ficha Interactiva</span>
        </div>
        <Button variant="ghost" size="icon" className="text-white/60 hover:text-white">
          <Share2 className="w-5 h-5" />
        </Button>
      </header>

      <main className="relative z-10 max-w-lg mx-auto pb-32">
        {/* Car Hero Image */}
        <section className="relative aspect-[4/3] overflow-hidden">
          <img 
            src={carData.images[0]} 
            alt={carData.model} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050515] via-transparent to-transparent" />
          
          {/* Price Badge Overlay */}
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
            <div className="space-y-1">
              <h1 className="text-4xl font-black uppercase tracking-tighter leading-none italic">{carData.brand}</h1>
              <p className="text-xl font-bold text-white/60 uppercase tracking-tight">{carData.model}</p>
            </div>
            <div className="text-right">
              <Badge className="bg-primary text-white font-black text-lg px-4 py-1 rounded-xl shadow-glow-accent mb-2">
                {carData.price}
              </Badge>
              <p className="text-[10px] font-bold text-primary uppercase tracking-widest animate-pulse">{carData.negotiable}</p>
            </div>
          </div>
        </section>

        {/* Quick Stats Grid */}
        <section className="px-6 py-8 grid grid-cols-3 gap-4">
          {[
            { label: "Año", val: carData.year, icon: Calendar },
            { label: "Kilometraje", val: carData.mileage, icon: Gauge },
            { label: "Dueños", val: carData.owners, icon: Users },
          ].map((stat, i) => (
            <div key={i} className="glass-card p-4 rounded-3xl border border-white/5 text-center space-y-2">
              <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center mx-auto">
                <stat.icon className="w-4 h-4 text-primary" />
              </div>
              <p className="text-[8px] font-black uppercase tracking-widest text-white/40">{stat.label}</p>
              <p className="text-xs font-bold text-white">{stat.val}</p>
            </div>
          ))}
        </section>

        {/* Detailed Info Tabs */}
        <section className="px-6">
          <Tabs defaultValue="specs" className="w-full">
            <TabsList className="w-full bg-white/5 border border-white/5 rounded-2xl h-14 p-1">
              <TabsTrigger value="specs" className="flex-1 rounded-xl font-bold text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white">Ficha Técnica</TabsTrigger>
              <TabsTrigger value="equipment" className="flex-1 rounded-xl font-bold text-xs uppercase tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white">Equipamiento</TabsTrigger>
            </TabsList>

            <TabsContent value="specs" className="mt-6 space-y-4">
              <div className="glass-card p-6 rounded-[2.5rem] border border-white/5 space-y-6">
                {[
                  { icon: Zap, label: "Motor", val: carData.engine },
                  { icon: Settings2, label: "Transmisión", val: carData.transmission },
                  { icon: Fuel, label: "Combustible", val: carData.fuel },
                  { icon: Box, label: "Referencia", val: carData.reference },
                  { icon: Sparkles, label: "Color", val: carData.color },
                  { icon: CheckCircle2, label: "Permuta", val: carData.permuta },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between group">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                        <item.icon className="w-5 h-5 text-white/40 group-hover:text-primary transition-colors" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{item.label}</span>
                    </div>
                    <span className="text-sm font-bold text-white text-right">{item.val}</span>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="equipment" className="mt-6 space-y-4">
              <div className="glass-card p-6 rounded-[2.5rem] border border-white/5 space-y-6">
                {[
                  { label: "Puertas", val: carData.doors },
                  { label: "Sensores", val: carData.sensors },
                  { label: "Tracción", val: "Trasera (RWD)" },
                  { label: "Frenos", val: "Cerámicos Pro" },
                  { label: "Faros", val: "LED Matrix" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{item.label}</span>
                    <span className="text-sm font-bold text-white">{item.val}</span>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Description Section */}
        <section className="px-6 mt-8">
          <div className="glass-card p-8 rounded-[3rem] border border-white/5 space-y-4">
            <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary">Descripción</h3>
            <p className="text-sm text-white/60 leading-relaxed font-medium">
              {carData.description}
            </p>
          </div>
        </section>
      </main>

      {/* Floating Action Bar */}
      <nav className="fixed bottom-6 left-6 right-6 z-50 h-20 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-around px-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <Button className="flex-1 h-14 bg-primary hover:bg-primary/90 text-white rounded-full font-black uppercase tracking-widest text-[10px] gap-3 neon-accent mx-2 group">
          <MessageCircle className="w-5 h-5" />
          WhatsApp
        </Button>
        <Button variant="outline" className="w-14 h-14 bg-white/5 border-white/10 text-white rounded-full flex items-center justify-center p-0 hover:bg-white/10 mx-2">
          <Phone className="w-5 h-5" />
        </Button>
        <Button variant="outline" className="w-14 h-14 bg-white/5 border-white/10 text-white rounded-full flex items-center justify-center p-0 hover:bg-white/10 mx-2">
          <MapPin className="w-5 h-5" />
        </Button>
      </nav>
    </div>
  );
}
