
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
      // Physics: Smooth easing (lerp) for the head
      const ease = 0.15;
      cursorRef.current.x += (targetRef.current.x - cursorRef.current.x) * ease;
      cursorRef.current.y += (targetRef.current.y - cursorRef.current.y) * ease;

      // Update trail history
      setTrail((prev) => {
        const newPoint = { 
          x: cursorRef.current.x, 
          y: cursorRef.current.y, 
          id: Date.now() + Math.random() 
        };
        // Keep the last 20 points for a longer, more fluid tail
        return [...prev.slice(-20), newPoint];
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
      {/* Comet Head with Glow */}
      <div 
        className="cursor-follower"
        style={{
          transform: `translate(${cursorRef.current.x - 12}px, ${cursorRef.current.y - 12}px)`,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '24px',
          height: '24px',
          backgroundColor: '#5200F8',
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'screen',
          filter: 'blur(2px)',
          boxShadow: '0 0 20px #5200F8, 0 0 40px #5200F8, 0 0 60px rgba(82, 0, 248, 0.5)',
        }}
      />
      
      {/* Dynamic Comet Tail segments */}
      {trail.map((point, index) => {
        const ratio = index / trail.length;
        const size = 4 + (ratio * 8); // Tail segments get smaller towards the start
        const opacity = ratio * 0.6; // Tail fades out
        
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
              boxShadow: `0 0 ${index}px #5200F8`,
            }}
          />
        );
      })}
    </>
  );
};
