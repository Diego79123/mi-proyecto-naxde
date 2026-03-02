'use client';

import React, { useEffect, useRef, useState } from 'react';

export const CursorFollower = () => {
  const cursorRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const requestRef = useRef<number>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      // Física: Interpolación lineal (lerp) para un movimiento suave y etéreo
      const ease = 0.08; // Valor menor para más suavizado (inercia)
      cursorRef.current.x += (targetRef.current.x - cursorRef.current.x) * ease;
      cursorRef.current.y += (targetRef.current.y - cursorRef.current.y) * ease;

      // Actualizar historial de la estela (más corta y leve)
      setTrail((prev) => {
        const newPoint = { 
          x: cursorRef.current.x, 
          y: cursorRef.current.y, 
          id: Date.now() + Math.random() 
        };
        // Reducimos el número de puntos para una estela más leve
        return [...prev.slice(-12), newPoint];
      });

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <>
      {/* Cabeza de la Estrella (Punto de luz brillante) */}
      <div 
        className="cursor-follower"
        style={{
          transform: `translate(${cursorRef.current.x - 6}px, ${cursorRef.current.y - 6}px)`,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '12px',
          height: '12px',
          backgroundColor: '#FFF', // Blanco en el centro para efecto estrella
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'screen',
          filter: 'blur(1px)',
          boxShadow: '0 0 10px #5200F8, 0 0 20px rgba(82, 0, 248, 0.8), 0 0 30px rgba(255, 255, 255, 0.4)',
        }}
      />
      
      {/* Estela de la Estrella (Segmentos tenues y pequeños) */}
      {trail.map((point, index) => {
        const ratio = index / trail.length;
        const size = 2 + (ratio * 4); // Segmentos mucho más pequeños
        const opacity = ratio * 0.3; // Mucho más transparente
        
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
              filter: 'blur(1.5px)',
              boxShadow: `0 0 ${index}px rgba(82, 0, 248, 0.5)`,
            }}
          />
        );
      })}
    </>
  );
};
