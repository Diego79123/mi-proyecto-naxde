
"use client"

import React, { useState } from 'react';
import { Home, Zap, Plus, Briefcase, Mail, X, Smartphone, Bot, GraduationCap, Globe, ArrowRight, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const BottomNav = () => {
  const pathname = usePathname();
  const [activePopup, setActivePopup] = useState<string | null>(null);

  const closePopup = () => setActivePopup(null);

  const navItems = [
    { id: 'inicio', name: "Inicio", icon: Home, href: "/", type: 'link' },
    { id: 'servicios', name: "Servicios", icon: Zap, type: 'popup' },
    { id: 'proyectos', name: "Proyectos", icon: Briefcase, type: 'popup' },
    { id: 'contacto', name: "Contacto", icon: Mail, type: 'popup' }
  ];

  return (
    <>
      <nav className="fixed bottom-6 left-6 right-6 z-[130] flex justify-center pointer-events-none">
        <div className="relative w-full max-w-4xl h-20 flex items-center bg-[#050515]/90 border border-white/10 rounded-[3rem] shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-[45px] px-4 pointer-events-auto">
          <div className="relative w-full h-full flex items-center justify-between z-10">
            <div className="flex-1 flex justify-around">
              {navItems.slice(0, 2).map((item) => (
                item.type === 'link' ? (
                  <Link 
                    key={item.id} 
                    href={item.href!}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1 transition-all group h-full",
                      pathname === item.href ? "text-primary" : "text-white/40 hover:text-white"
                    )}
                  >
                    <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-[8px] font-bold uppercase tracking-[0.2em]">{item.name}</span>
                  </Link>
                ) : (
                  <button 
                    key={item.id}
                    onClick={() => setActivePopup(item.id)}
                    className={cn(
                      "flex flex-col items-center justify-center gap-1 transition-all group h-full",
                      activePopup === item.id ? "text-primary" : "text-white/40 hover:text-white"
                    )}
                  >
                    <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    <span className="text-[8px] font-bold uppercase tracking-[0.2em]">{item.name}</span>
                  </button>
                )
              ))}
            </div>

            <div className="mx-4">
              <button 
                onClick={() => setActivePopup('mega')}
                className={cn(
                  "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500",
                  "bg-gradient-to-br from-[#5200F8] to-[#F80037] shadow-[0_0_25px_rgba(82,0,248,0.4)]",
                  "hover:scale-110 active:scale-95 relative z-20 group"
                )}
              >
                <Plus className={cn("w-7 h-7 text-white transition-transform duration-500", activePopup === 'mega' && "rotate-45")} />
              </button>
            </div>

            <div className="flex-1 flex justify-around">
              {navItems.slice(2).map((item) => (
                <button 
                  key={item.id}
                  onClick={() => setActivePopup(item.id)}
                  className={cn(
                    "flex flex-col items-center justify-center gap-1 transition-all group h-full",
                    activePopup === item.id ? "text-primary" : "text-white/40 hover:text-white"
                  )}
                >
                  <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span className="text-[8px] font-bold uppercase tracking-[0.2em]">{item.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <Dialog open={activePopup !== null} onOpenChange={(open) => !open && closePopup()}>
        <DialogContent className="max-w-4xl w-[90vw] bg-white/[0.03] border border-white/10 backdrop-blur-[60px] rounded-[3.5rem] p-0 overflow-hidden shadow-[0_30px_100px_rgba(0,0,0,0.8),inset_0_0_20px_rgba(255,255,255,0.05)] border-none">
          <div className="relative p-8 md:p-12 h-full max-h-[85vh] overflow-y-auto no-scrollbar">
            
            {activePopup === 'mega' && (
              <div className="space-y-10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-4xl font-headline font-black text-white uppercase tracking-tighter">Naxde <span className="text-primary italic">Tactical</span></h3>
                    <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Centro de operaciones avanzado</p>
                  </div>
                  <Button variant="ghost" onClick={closePopup} className="rounded-full h-12 w-12 border border-white/5 text-white/40"><X /></Button>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/asistente" onClick={closePopup} className="group p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-primary/40 transition-all text-center flex flex-col items-center gap-4 relative overflow-hidden">
                    <div className="absolute top-2 right-2">
                      <Sparkles className="w-3 h-3 text-primary animate-pulse" />
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg shadow-primary/20">
                      <Bot className="w-8 h-8" />
                    </div>
                    <div>
                      <h4 className="font-black text-white uppercase text-[10px] tracking-widest">Social AI</h4>
                      <p className="text-[8px] text-white/30 font-bold uppercase">Asistente Estratégico</p>
                    </div>
                  </Link>

                  {[
                    { title: "Neocard", icon: Smartphone, desc: "Simulador Digital", color: "from-blue-500 to-cyan-500", href: "/tarjetas-neocard" },
                    { title: "Academy", icon: GraduationCap, desc: "Recursos & Tips", color: "from-yellow-500 to-orange-500", href: "/servicios" },
                    { title: "Global", icon: Globe, desc: "Status de Red", color: "from-emerald-500 to-teal-500", href: "/servicios" }
                  ].map((m, i) => (
                    <Link key={i} href={m.href} onClick={closePopup} className="group p-6 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-white/20 transition-all text-center flex flex-col items-center gap-4">
                      <div className={cn("w-16 h-16 rounded-2xl bg-gradient-to-br flex items-center justify-center text-white group-hover:scale-110 transition-transform shadow-lg", m.color)}>
                        <m.icon className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="font-black text-white uppercase text-[10px] tracking-widest">{m.title}</h4>
                        <p className="text-[8px] text-white/30 font-bold uppercase">{m.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-center">
                  <p className="text-[9px] font-black text-primary uppercase tracking-[0.4em] animate-pulse">Sistema Naxde OS v2.5 Online</p>
                </div>
              </div>
            )}

            {activePopup === 'servicios' && (
              <div className="space-y-10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-4xl font-headline font-black text-white uppercase tracking-tighter">Nuestros <span className="text-primary italic">Módulos</span></h3>
                    <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Ingeniería de alta gama para tu negocio</p>
                  </div>
                  <Button variant="ghost" onClick={closePopup} className="rounded-full h-12 w-12 border border-white/5 text-white/40"><X /></Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: "Software a Medida", desc: "Apps robustas y escalables.", icon: Smartphone },
                    { title: "Web Inmersiva", desc: "Diseño futurista de conversión.", icon: Globe },
                    { title: "IA Aplicada", desc: "Automatización con LLMs.", icon: Bot },
                    { title: "Ecosistema NFC", desc: "Identidad inteligente.", icon: Zap }
                  ].map((s, i) => (
                    <Link href="/servicios" key={i} onClick={closePopup} className="group p-6 rounded-2xl bg-white/[0.03] border border-white/5 hover:border-primary/30 transition-all flex items-center gap-6">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform"><s.icon className="text-primary" /></div>
                      <div>
                        <h4 className="font-bold text-white uppercase tracking-widest text-sm">{s.title}</h4>
                        <p className="text-[10px] text-white/40">{s.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/servicios" onClick={closePopup}>
                  <Button className="w-full h-16 bg-primary text-white rounded-2xl font-black uppercase tracking-widest">VER TODO EL ECOSISTEMA <ArrowRight className="ml-2 w-5 h-5" /></Button>
                </Link>
              </div>
            )}

            {activePopup === 'proyectos' && (
              <div className="space-y-10">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-4xl font-headline font-black text-white uppercase tracking-tighter">Casos de <span className="text-primary italic">Éxito</span></h3>
                    <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Transformando industrias en LATAM</p>
                  </div>
                  <Button variant="ghost" onClick={closePopup} className="rounded-full h-12 w-12 border border-white/5 text-white/40"><X /></Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative aspect-video rounded-2xl overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1512364615838-8088a04a778b?q=80&w=800" className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black p-6 flex flex-col justify-end">
                      <h4 className="font-black text-white uppercase italic">Naxde Hub Pro</h4>
                      <p className="text-[10px] text-primary font-bold">PLATAFORMA CORPORATIVA</p>
                    </div>
                  </div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1687969962129-dd77e13b95b7?q=80&w=800" className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black p-6 flex flex-col justify-end">
                      <h4 className="font-black text-white uppercase italic">Vortex Oscar R.</h4>
                      <p className="text-[10px] text-primary font-bold">NEOCARD EXPERIENCE</p>
                    </div>
                  </div>
                </div>
                <Link href="/proyectos" onClick={closePopup}>
                  <Button className="w-full h-16 border border-white/10 hover:bg-white/5 text-white rounded-2xl font-black uppercase tracking-widest">EXPLORAR PORTAFOLIO COMPLETO</Button>
                </Link>
              </div>
            )}

            {activePopup === 'contacto' && (
              <div className="space-y-10 text-center">
                <div className="flex justify-between items-start text-left">
                  <div>
                    <h3 className="text-4xl font-headline font-black text-white uppercase tracking-tighter">Canal <span className="text-primary italic">Directo</span></h3>
                    <p className="text-white/40 font-bold uppercase tracking-widest text-[10px]">Ingeniería a un clic de distancia</p>
                  </div>
                  <Button variant="ghost" onClick={closePopup} className="rounded-full h-12 w-12 border border-white/5 text-white/40"><X /></Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <a href="https://wa.me/57315001001" target="_blank" className="p-8 rounded-3xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-all flex flex-col items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-[#25D366] flex items-center justify-center text-white"><Mail className="w-8 h-8" /></div>
                    <span className="font-black text-white text-[10px] uppercase tracking-widest">WhatsApp Pro</span>
                  </a>
                  <a href="mailto:desarrollonaxde@gmail.com" className="p-8 rounded-3xl bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-all flex flex-col items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white"><Mail className="w-8 h-8" /></div>
                    <span className="font-black text-white text-[10px] uppercase tracking-widest">Email Corporativo</span>
                  </a>
                  <Link href="/contacto" onClick={closePopup} className="p-8 rounded-3xl bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all flex flex-col items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-blue-500 flex items-center justify-center text-white"><Smartphone className="w-8 h-8" /></div>
                    <span className="font-black text-white text-[10px] uppercase tracking-widest">Formulario IA</span>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
