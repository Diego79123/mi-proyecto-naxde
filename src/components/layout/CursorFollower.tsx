
'use client';

import React, { useEffect, useState } from 'react';

export const CursorFollower = () => {
  const [position, setMousePosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<{ x: number; y: number; id: number }[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      
      const id = Date.now();
      setTrail((prev) => [...prev.slice(-15), { x: e.clientX, y: e.clientY, id }]);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <>
      {/* Comet Head */}
      <div 
        className="cursor-follower"
        style={{
          transform: `translate(${position.x - 12}px, ${position.y - 12}px)`
        }}
      />
      {/* Comet Tail - Shooting Star effect */}
      {trail.map((point, index) => (
        <div
          key={point.id}
          className="cursor-trail"
          style={{
            transform: `translate(${point.x - 4}px, ${point.y - 4}px)`,
            opacity: index / trail.length,
            scale: index / trail.length,
            backgroundColor: '#5200F8',
            boxShadow: `0 0 ${index * 2}px #5200F8`,
          }}
        />
      ))}
    </>
  );
};
