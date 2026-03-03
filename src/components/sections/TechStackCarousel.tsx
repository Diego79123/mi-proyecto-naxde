
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
    <section className="py-24 bg-[#00001D] overflow-hidden relative">
      {/* Background Subtle Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(248,0,55,0.03)_0%,transparent_70%)]" />
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 mb-16 text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Tecnologías de Vanguardia</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-headline font-black text-white tracking-tighter uppercase leading-none">
          NUESTRO <span className="text-primary italic">STACK</span> TÉCNICO
        </h2>
      </div>

      <div className="relative flex overflow-x-hidden group z-10">
        <div className="animate-marquee flex items-center gap-12 md:gap-24 whitespace-nowrap py-8">
          {technologies.concat(technologies).map((tech, idx) => (
            <div key={idx} className="flex items-center gap-8 group/item">
              <div className="w-16 h-16 md:w-24 md:h-24 relative flex items-center justify-center transition-all duration-500 hover:scale-110">
                <img 
                  src={tech.logo} 
                  alt={tech.name} 
                  className="w-full h-full object-contain brightness-0 invert opacity-40 group-hover/item:opacity-100 group-hover/item:brightness-100 group-hover/item:invert-0 transition-all duration-500"
                />
              </div>
              <span className="text-white/10 group-hover/item:text-white/40 font-black text-3xl md:text-5xl transition-colors duration-500 uppercase italic select-none">
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
