
"use client"

import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, Sparkles } from 'lucide-react';

const faqs = [
  {
    id: "item-1",
    question: "¿Qué es exactamente una NeoCard?",
    answer: "Es una tarjeta digital inteligente que utiliza tecnología NFC y códigos QR para compartir tu perfil profesional, redes sociales y datos de contacto instantáneamente, sin necesidad de aplicaciones externas. Es el nuevo estándar del networking corporativo."
  },
  {
    id: "item-2",
    question: "¿Cómo potencia la IA mis procesos de negocio?",
    answer: "Integramos modelos de lenguaje avanzados (LLMs) y agentes inteligentes que automatizan la atención al cliente, gestionan leads y optimizan flujos operativos, permitiendo a tu equipo enfocarse en tareas de alto valor mientras la IA gestiona la complejidad."
  },
  {
    id: "item-3",
    question: "¿Qué diferencia a un sitio web de Naxde de otros?",
    answer: "Nuestros sitios no son solo páginas; son portales interactivos diseñados con ingeniería de vanguardia, animaciones premium WebGL, optimización absoluta de velocidad y seguridad cloud de nivel bancario. Priorizamos la conversión táctica sobre la estética simple."
  },
  {
    id: "item-4",
    question: "¿El software desarrollado por Naxde es escalable?",
    answer: "Absolutamente. Construimos sobre arquitecturas cloud modernas (Serverless, Microservicios) que permiten que tu plataforma soporte desde cientos hasta millones de usuarios de forma orgánica y sin fricciones técnicas."
  },
  {
    id: "item-5",
    question: "¿Ofrecen soporte técnico post-lanzamiento?",
    answer: "Naxde es tu socio a largo plazo. Ofrecemos planes de mantenimiento evolutivo, monitoreo de seguridad 24/7 y actualizaciones tecnológicas constantes para asegurar que tu plataforma nunca quede obsoleta."
  }
];

export const FAQSection = () => {
  return (
    <section className="py-24 md:py-40 bg-[#00001D] relative overflow-hidden">
      {/* Glow Decorativo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle,rgba(82,0,248,0.05)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <HelpCircle className="w-4 h-4 text-primary animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/60">Resolución de Dudas</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-headline font-black text-white uppercase tracking-tighter leading-none">
            PREGUNTAS <br />
            <span className="text-primary italic">FRECUENTES</span>.
          </h2>
          <p className="text-white/40 font-medium text-lg">Respuestas claras para decisiones inteligentes.</p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq) => (
            <AccordionItem 
              key={faq.id} 
              value={faq.id}
              className="border-none rounded-[2rem] bg-white/[0.02] border border-white/5 px-8 md:px-10 overflow-hidden transition-all duration-300 hover:bg-white/[0.04] group"
            >
              <AccordionTrigger className="hover:no-underline py-8">
                <span className="text-lg md:text-xl font-bold text-left text-white/80 group-data-[state=open]:text-primary transition-colors uppercase tracking-tight">
                  {faq.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-8 text-white/50 text-base md:text-lg leading-relaxed font-medium">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-20 p-8 rounded-[2.5rem] bg-gradient-to-r from-primary/10 to-transparent border border-primary/20 text-center">
          <p className="text-white/60 text-sm font-medium mb-4">¿Tienes una duda técnica específica?</p>
          <button className="inline-flex items-center gap-3 text-primary font-black uppercase tracking-[0.2em] text-[10px] hover:gap-5 transition-all">
            CONSULTAR CON UN INGENIERO <Sparkles className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
