
"use client"

import React, { useEffect, useState } from 'react';
import { Play, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export const ShowreelSection = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [asteroids, setAsteroids] = useState<any[]>([]);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 40;
      const y = (e.clientY / window.innerHeight - 0.5) * 40;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);

    // Generar asteroides aleatorios solo en el cliente
    const generatedAsteroids = Array.from({ length: 12 }).map((_, i) => ({
      id: i,
      size: Math.random() * 60 + 20,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * -20,
      rotate: Math.random() * 360,
    }));
    setAsteroids(generatedAsteroids);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="py-12 px-6 md:px-12 bg-[#F0F4FF]">
      <div className="max-w-[1600px] mx-auto relative h-[600px] md:h-[850px] rounded-[3rem] overflow-hidden group shadow-[0_50px_100px_rgba(0,0,0,0.15)]">
        
        {/* Background Vortex Layer */}
        <div className="absolute inset-0 bg-[#0A0520]">
          <div className="absolute inset-0 opacity-60 mix-blend-screen">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle,rgba(248,0,55,0.4)_0%,rgba(82,0,248,0.3)_30%,transparent_70%)] animate-spin-slow duration-[20s]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle,rgba(255,255,255,0.1)_0%,rgba(168,85,247,0.2)_40%,transparent_80%)] animate-spin-slow duration-[15s] [animation-direction:reverse]" />
          </div>
          
          {/* Noise / Texture */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
        </div>

        {/* Asteroids Layer */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          {hasMounted && asteroids.map((ast) => (
            <div
              key={ast.id}
              className="absolute bg-white/10 backdrop-blur-[2px] border border-white/5 shadow-2xl animate-float"
              style={{
                width: ast.size,
                height: ast.size,
                top: ast.top,
                left: ast.left,
                clipPath: 'polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%)',
                animationDuration: `${ast.duration}s`,
                animationDelay: `${ast.delay}s`,
                transform: `rotate(${ast.rotate}deg) translate(${mousePos.x * 0.2}px, ${mousePos.y * 0.2}px)`,
                transition: 'transform 0.5s ease-out',
                opacity: 0.4
              }}
            />
          ))}
        </div>

        {/* Monumental Overlapping Text */}
        <div 
          className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none select-none"
          style={{ transform: `translate(${mousePos.x * -0.3}px, ${mousePos.y * -0.3}px)`, transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)' }}
        >
          <h2 className="text-[15vw] md:text-[12vw] font-black text-white leading-[0.7] tracking-[-0.05em] flex flex-col items-center">
            <span className="opacity-90">IMPACTO</span>
            <span className="text-transparent opacity-40 ml-[10vw]" style={{ WebkitTextStroke: '2px white' }}>DIGITAL</span>
          </h2>
        </div>

        {/* Interface Elements */}
        <div className="absolute top-12 left-12 z-30 flex items-center gap-2">
          <Plus className="w-4 h-4 text-white/40" />
        </div>

        <div className="absolute top-12 right-12 z-30 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-black">
            <div className="w-4 h-[2px] bg-black" />
          </div>
          <button className="px-6 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all">
            VAMOS A HABLAR
          </button>
          <button className="px-6 h-10 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
            MENÚ <div className="flex gap-0.5"><div className="w-1 h-1 bg-black rounded-full"/><div className="w-1 h-1 bg-black rounded-full"/></div>
          </button>
        </div>

        {/* Central Play Button */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40">
          <button className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white flex items-center justify-center group/play relative overflow-hidden transition-transform hover:scale-110 active:scale-95">
            <div className="absolute inset-0 bg-primary/10 scale-0 group-hover/play:scale-100 transition-transform duration-500 rounded-full" />
            <Play className="w-8 h-8 md:w-10 md:h-10 text-black fill-black relative z-10 ml-1" />
            
            {/* Ripple Effect */}
            <div className="absolute inset-0 border-2 border-white rounded-full animate-ping opacity-20" />
          </button>
        </div>

        {/* Bottom Credits */}
        <div className="absolute bottom-12 left-12 right-12 z-30 flex justify-between items-end">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-white/40 uppercase tracking-widest">Showreel 2025</p>
            <p className="text-xs font-bold text-white uppercase tracking-tighter">EL FUTURO EN MOVIMIENTO</p>
          </div>
          <div className="flex gap-1">
            <div className="w-1 h-1 bg-white rounded-full opacity-40" />
            <div className="w-1 h-1 bg-white rounded-full opacity-40" />
            <div className="w-1 h-1 bg-white rounded-full opacity-40" />
            <div className="w-1 h-1 bg-white rounded-full opacity-40" />
          </div>
        </div>

      </div>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-40px) rotate(180deg); }
        }
        .animate-float {
          animation: float 15s infinite ease-in-out;
        }
      `}</style>
    </section>
  );
};
