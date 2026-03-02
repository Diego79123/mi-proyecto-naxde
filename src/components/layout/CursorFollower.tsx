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
      // Física: Interpolación lineal (lerp)
      // Aumentamos el ease a 0.25 para que esté mucho más cerca del cursor real
      const ease = 0.25; 
      cursorRef.current.x += (targetRef.current.x - cursorRef.current.x) * ease;
      cursorRef.current.y += (targetRef.current.y - cursorRef.current.y) * ease;

      // Actualizar historial de la estela
      setTrail((prev) => {
        const newPoint = { 
          x: cursorRef.current.x, 
          y: cursorRef.current.y, 
          id: Date.now() + Math.random() 
        };
        // Mantenemos una estela elegante de 10 puntos
        return [...prev.slice(-10), newPoint];
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
      {/* Cabeza de la Estrella (Punto morado vibrante) */}
      <div 
        className="cursor-follower"
        style={{
          transform: `translate(${cursorRef.current.x - 5}px, ${cursorRef.current.y - 5}px)`,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '10px',
          height: '10px',
          backgroundColor: '#5200F8', // Morado marca
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'screen',
          filter: 'blur(0.5px)',
          boxShadow: '0 0 10px #5200F8, 0 0 20px #5200F8, 0 0 35px rgba(255, 255, 255, 0.5)',
        }}
      />
      
      {/* Estela de la Estrella (Partículas que siguen la trayectoria) */}
      {trail.map((point, index) => {
        const ratio = index / trail.length;
        const size = 2 + (ratio * 6);
        const opacity = ratio * 0.4;
        
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
              boxShadow: `0 0 ${index}px rgba(82, 0, 248, 0.6)`,
            }}
          />
        );
      })}
    </>
  );
};
