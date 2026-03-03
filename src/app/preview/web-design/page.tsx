
"use client"

import React, { useEffect, useState } from 'react';
import { Zap, Shield, Cpu, Globe, ArrowRight } from 'lucide-react';

export default function WebDesignPreview() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#00001D]" />;

  return (
    <div className="min-h-screen bg-[#00001D] text-white font-body overflow-x-hidden selection:bg-primary/30">
      {/* Mini Hero inside Laptop */}
      <section className="pt-12 pb-8 px-8 relative">
        <div className="absolute top-0 right-0 w-40 h-40 bg-primary/20 blur-[60px] rounded-full" />
        <div className="max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-white/60">Vanguardia Digital</span>
          </div>
          <h1 className="text-4xl font-black tracking-tighter leading-none italic">
            EL FUTURO <br />
            <span className="text-primary not-italic">ES HOY.</span>
          </h1>
          <p className="text-[10px] text-white/40 max-w-xs leading-relaxed uppercase font-bold tracking-widest">
            Diseñamos interfaces que desafían la realidad y potencian tu conversión al máximo nivel.
          </p>
        </div>
      </section>

      {/* Futuristic Grid */}
      <section className="px-8 py-6 grid grid-cols-2 gap-4">
        {[
          { icon: Globe, t: "Global Reach", d: "Escalabilidad sin fronteras" },
          { icon: Cpu, t: "Core Engine", d: "Performance optimizado" },
          { icon: Zap, t: "Fast Load", d: "Velocidad instantánea" },
          { icon: Shield, t: "Secure Hub", d: "Protección militar" }
        ].map((item, i) => (
          <div key={i} className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 group hover:bg-white/[0.08] transition-all">
            <item.icon className="w-4 h-4 text-primary mb-2 group-hover:scale-110 transition-transform" />
            <h3 className="text-[10px] font-black uppercase tracking-tight">{item.t}</h3>
            <p className="text-[8px] text-white/30 font-medium">{item.d}</p>
          </div>
        ))}
      </section>

      {/* Floating Elements Style */}
      <div className="px-8 py-4">
        <div className="h-24 w-full rounded-3xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/10 flex items-center justify-between px-6 overflow-hidden relative">
          <div className="space-y-1 relative z-10">
            <p className="text-[10px] font-black italic">CONSTRUYE TU LEGADO</p>
            <button className="flex items-center gap-2 text-primary font-bold text-[8px] uppercase tracking-widest group">
              Empezar Ahora <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-white/5 rounded-full blur-xl" />
        </div>
      </div>

      <style jsx global>{`
        ::-webkit-scrollbar {
          width: 4px;
        }
        ::-webkit-scrollbar-track {
          background: transparent;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(248, 0, 55, 0.2);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
