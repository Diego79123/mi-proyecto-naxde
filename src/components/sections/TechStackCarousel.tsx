
"use client"

import React from 'react';

const technologies = [
  { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg' },
  { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwind-css-plain.svg' },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'Google Cloud', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
];

export const TechStackCarousel = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-[#5200F8] via-[#8B00C7] to-[#F80037] overflow-hidden relative">
      {/* Capa de estrellas sutil para capturar el ambiente de la imagen */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-1 h-1 bg-white rounded-full animate-pulse" />
        <div className="absolute top-40 left-1/4 w-0.5 h-1.5 bg-white rounded-full animate-pulse delay-700" />
        <div className="absolute top-20 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse delay-300" />
        <div className="absolute bottom-20 left-1/2 w-1.5 h-1.5 bg-white rounded-full animate-pulse delay-1000" />
        <div className="absolute bottom-40 right-10 w-1 h-1 bg-white rounded-full animate-pulse delay-500" />
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-12 text-center relative z-10">
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60 mb-4">Nuestros Aliados</h2>
        <p className="text-3xl md:text-4xl font-headline font-bold text-white tracking-tighter uppercase">TECNOLOGÍAS DE VANGUARDIA</p>
      </div>

      <div className="relative flex overflow-x-hidden group z-10">
        <div className="animate-marquee flex items-center gap-12 md:gap-24 whitespace-nowrap py-4">
          {technologies.concat(technologies).map((tech, idx) => (
            <div key={idx} className="flex items-center gap-6 group/item">
              <div className="w-14 h-14 md:w-20 md:h-20 relative flex items-center justify-center brightness-0 invert opacity-80 group-hover/item:opacity-100 transition-all duration-500 hover:scale-110">
                <img 
                  src={tech.logo} 
                  alt={tech.name} 
                  className={`w-full h-full object-contain ${tech.className || ''}`}
                />
              </div>
              <span className="text-white/20 group-hover/item:text-white/80 font-black text-2xl md:text-4xl transition-colors duration-500 uppercase italic select-none">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
        .animate-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
};
