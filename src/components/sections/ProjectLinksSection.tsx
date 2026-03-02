
"use client"

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    tags: "CONCEPT • WEB • GAME DESIGN • 3D",
    title: "dohoo dohoo Oooyod",
    href: "/proyectos"
  },
  {
    tags: "AR • DEVELOPMENT • 3D",
    title: "Sodamiincógnitapagmioiminorte",
    href: "/proyectos"
  }
];

export const ProjectLinksSection = () => {
  return (
    <section className="py-24 md:py-40 bg-[#F0F4FF] text-black relative overflow-hidden">
      {/* Decorative Blue Stroke on the right - mimicking the cyan stroke in the image */}
      <div className="absolute right-[-20px] top-[60%] w-32 h-8 bg-[#40C4FF] rounded-full blur-[2px] rotate-[-5deg] opacity-90 pointer-events-none" />

      <div className="max-w-[1600px] mx-auto px-12 md:px-24">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 md:gap-32">
          {projects.map((project, idx) => (
            <Link key={idx} href={project.href} className="group block max-w-2xl">
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-black/40">
                  {project.tags}
                </p>
                <div className="flex items-center gap-6">
                  <ArrowRight className="w-10 h-10 md:w-14 md:h-14 text-black transition-transform duration-500 group-hover:translate-x-3" />
                  <h3 className="text-4xl md:text-[4.5rem] font-light tracking-tighter leading-none transition-colors duration-500 group-hover:text-primary">
                    {project.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-32 md:mt-48 flex justify-center">
          <Link href="/proyectos">
            <button className="h-14 px-8 bg-white border border-black/5 rounded-full flex items-center gap-4 hover:bg-black hover:text-white transition-all duration-500 shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_rgba(82,0,248,0.2)] group">
              <div className="w-2.5 h-2.5 rounded-full bg-black group-hover:bg-primary transition-colors" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em]">Ver todos los proyectos</span>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};
