
"use client"

import React from 'react';

const technologies = [
  { name: 'HTML5', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'TypeScript', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
  { name: 'React', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Next.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original-wordmark.svg', className: 'invert brightness-0' },
  { name: 'Tailwind CSS', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwind-css-plain.svg' },
  { name: 'Node.js', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Firebase', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
  { name: 'Google Cloud', logo: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/googlecloud/googlecloud-original.svg' },
];

export const TechStackCarousel = () => {
  return (
    <section className="py-24 bg-neutral-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
        <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-primary mb-4">Nuestros Aliados</h2>
        <p className="text-3xl md:text-4xl font-headline font-bold text-black tracking-tighter">TECNOLOGÍAS DE VANGUARDIA</p>
      </div>

      <div className="relative flex overflow-x-hidden group">
        <div className="animate-marquee flex items-center gap-12 md:gap-24 whitespace-nowrap py-4">
          {technologies.concat(technologies).map((tech, idx) => (
            <div key={idx} className="flex items-center gap-6 group/item">
              <div className="w-14 h-14 md:w-20 md:h-20 relative flex items-center justify-center grayscale opacity-40 group-hover/item:grayscale-0 group-hover/item:opacity-100 transition-all duration-500 hover:scale-110">
                <img 
                  src={tech.logo} 
                  alt={tech.name} 
                  className={`w-full h-full object-contain ${tech.className || ''}`}
                />
              </div>
              <span className="text-black/10 group-hover/item:text-black/80 font-black text-2xl md:text-4xl transition-colors duration-500 uppercase italic select-none">
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
