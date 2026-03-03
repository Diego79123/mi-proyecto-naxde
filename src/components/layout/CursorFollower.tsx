'use client';

import React, { useEffect, useRef, useState, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

const CursorFollowerContent = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isMockup = searchParams?.get('mode') === 'mockup';
  
  const cursorRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const requestRef = useRef<number>(null);

  useEffect(() => {
    // Solo inicializar si estamos en el home y no es modo mockup
    if (pathname !== '/' || isMockup) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      const ease = 0.25; 
      cursorRef.current.x += (targetRef.current.x - cursorRef.current.x) * ease;
      cursorRef.current.y += (targetRef.current.y - cursorRef.current.y) * ease;

      setTrail((prev) => {
        const newPoint = { 
          x: cursorRef.current.x, 
          y: cursorRef.current.y, 
          id: Date.now() + Math.random() 
        };
        return [...prev.slice(-12), newPoint];
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [pathname, isMockup]);

  // No renderizar si no es el home o si es el prototipo
  if (pathname !== '/' || isMockup) return null;

  return (
    <>
      <style jsx global>{`
        @keyframes star-pulse {
          0%, 100% { 
            transform: scale(1);
            filter: blur(0.5px) brightness(1);
            box-shadow: 0 0 15px #5200F8, 0 0 30px #5200F8;
          }
          50% { 
            transform: scale(1.4);
            filter: blur(1px) brightness(1.5);
            box-shadow: 0 0 25px #5200F8, 0 0 50px #5200F8, 0 0 70px rgba(255, 255, 255, 0.4);
          }
        }
        .animate-star-pulse {
          animation: star-pulse 2s infinite ease-in-out;
        }
      `}</style>

      {/* Cabeza de la Estrella */}
      <div 
        className="animate-star-pulse"
        style={{
          position: 'fixed',
          top: cursorRef.current.y - 6,
          left: cursorRef.current.x - 6,
          width: '12px',
          height: '12px',
          backgroundColor: '#5200F8',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'screen',
        }}
      />
      
      {/* Estela de la Estrella */}
      {trail.map((point, index) => {
        const ratio = index / trail.length;
        const size = 2 + (ratio * 8);
        const opacity = ratio * 0.5;
        
        return (
          <div
            key={point.id}
            className="cursor-trail"
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: `${size}px`,
              height: `${size}px`,
              transform: `translate(${point.x - size/2}px, ${point.y - size/2}px)`,
              opacity: opacity,
              backgroundColor: '#5200F8',
              borderRadius: '50%',
              pointerEvents: 'none',
              zIndex: 9998,
              filter: 'blur(2px)',
              boxShadow: `0 0 ${index * 2}px rgba(82, 0, 248, 0.6)`,
            }}
          />
        );
      })}
    </>
  );
};

export const CursorFollower = () => {
  return (
    <Suspense fallback={null}>
      <CursorFollowerContent />
    </Suspense>
  );
};