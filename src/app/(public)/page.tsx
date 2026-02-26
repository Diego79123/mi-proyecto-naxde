import { Header } from '@/components/layout/Header';
import { Hero } from '@/components/sections/Hero';
import { FeaturedServices } from '@/components/sections/FeaturedServices';
import { NFCSection } from '@/components/sections/NFCSection';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { Briefcase, MessageSquare, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-white selection:bg-primary/30">
      <Header />
      
      <Hero />
      
      {/* Metrics Section */}
      <section className="py-12 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { val: "250+", label: "Plataformas" },
            { val: "10K+", label: "Tarjetas NFC" },
            { val: "99%", label: "Seguridad" },
            { val: "LATAM", label: "Alcance Regional" }
          ].map((item, idx) => (
            <div key={idx} className="text-center space-y-1">
              <div className="text-3xl md:text-4xl font-headline font-bold text-white">{item.val}</div>
              <div className="text-xs uppercase tracking-widest text-white/40 font-bold">{item.label}</div>
            </div>
          ))}
        </div>
      </section>

      <FeaturedServices />
      
      <NFCSection />

      {/* CTA Final */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto glass-card rounded-[3rem] p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/20 rounded-full blur-[100px]" />
          
          <h3 className="text-4xl md:text-6xl font-headline font-bold text-white">¿LISTO PARA EL <span className="text-primary">SIGUIENTE</span> NIVEL?</h3>
          <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto">
            Hablemos de tu proyecto. Nuestro equipo técnico y creativo está listo para construir tu ventaja competitiva.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-6 pt-4">
            <Link href="/contacto">
              <Button size="lg" className="h-16 px-10 bg-primary hover:bg-primary/90 text-white rounded-full neon-accent text-xl font-bold">
                Empezar Proyecto
                <ArrowRight className="w-6 h-6 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <BottomNav />
    </main>
  );
}