
"use client"

import React, { useEffect, useRef, useState } from 'react';

export const ConnectingIdealsSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 md:py-40 bg-[#F0F4FF] text-black relative overflow-hidden flex flex-col justify-center min-h-[60vh]"
    >
      {/* Figura Orgánica Cyan - El gran trazo curvo de la imagen */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-visible">
        <svg 
          viewBox="0 0 1000 1000" 
          className="w-[120%] h-[120%] transition-transform duration-1000 ease-out opacity-60"
          style={{ transform: `scale(${1.1 + scrollProgress * 0.1}) rotate(${scrollProgress * -10}deg)` }}
        >
          <path 
            d="M 300,100 C 600,50 900,300 800,600 C 700,900 200,950 100,700 C 0,450 100,150 300,100" 
            fill="none" 
            stroke="#40C4FF" 
            strokeWidth="12" 
            strokeLinecap="round"
            className="transition-all duration-1000"
          />
        </svg>
      </div>

      <div className="max-w-[1600px] mx-auto px-12 md:px-24 relative z-10 w-full">
        <div className="max-w-5xl">
          <h2 className="text-[10vw] md:text-[8vw] font-bold leading-[1.1] tracking-tighter text-black">
            <div 
              className="transition-all duration-1000 ease-out"
              style={{ 
                opacity: Math.min(1, scrollProgress * 2),
                transform: `translateY(${(1 - scrollProgress) * 40}px)` 
              }}
            >
              Conectando ideales
            </div>
            <div 
              className="transition-all duration-1000 ease-out delay-100"
              style={{ 
                opacity: Math.min(1, scrollProgress * 2),
                transform: `translateY(${(1 - scrollProgress) * 60}px)` 
              }}
            >
              creando experiencias
            </div>
            <div 
              className="transition-all duration-1000 ease-out delay-200"
              style={{ 
                opacity: Math.min(1, scrollProgress * 2),
                transform: `translateY(${(1 - scrollProgress) * 80}px)` 
              }}
            >
              únicas
            </div>
          </h2>
        </div>
      </div>
    </section>
  );
};
