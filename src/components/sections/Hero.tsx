"use client"

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Mouse, Zap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';

const StarField = ({ isAbsorbing }: { isAbsorbing: boolean }) => {
  const [stars, setStars] = useState<{ id: number; top: string; left: string; size: string; duration: string }[]>([]);
  const [shootingStars, setShootingStars] = useState<{ id: number; top: string; left: string; duration: string; delay: string }[]>([]);

  useEffect(() => {
    const starCount = 180;
    const newStars = Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: `${Math.random() * 2.5 + 0.5}px`,
      duration: `${Math.random() * 4 + 2}s`
    }));
    setStars(newStars);

    const shootingCount = 4;
    const newShootingStars = Array.from({ length: shootingCount }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 40}%`,
      left: `${Math.random() * 100 + 40}%`,
      duration: `${Math.random() * 2 + 2}s`,
      delay: `${Math.random() * 10}s`
    }));
    setShootingStars(newShootingStars);
  }, []);

  return (
    <div className={cn(
      "stars-container absolute inset-0 overflow-hidden pointer-events-none z-[5] transition-all",
      isAbsorbing && "animate-absorb"
    )}
    style={{ '--absorb-x': '40vw', '--absorb-y': '200px' } as any}
    >
      {stars.map((star) => (
        <div
          key={star.id}
          className="star absolute bg-white rounded-full opacity-60 animate-pulse"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDuration: star.duration,
            boxShadow: '0 0 6px rgba(255, 255, 255, 0.6)'
          } as any}
        />
      ))}
      {shootingStars.map((ss) => (
        <div
          key={ss.id}
          className="shooting-star absolute h-[1px] bg-gradient-to-r from-white to-transparent opacity-0"
          style={{
            top: ss.top,
            left: ss.left,
            width: '220px',
            animation: `shooting ${ss.duration} linear infinite`,
            animationDelay: ss.delay
          } as any}
        />
      ))}
    </div>
  );
};

interface ParticleProps {
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: string;
  size: number;
  friction: number;
  ease: number;
}

class Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: string;
  size: number;
  vx: number;
  vy: number;
  friction: number;
  ease: number;

  constructor({ x, y, originX, originY, color, size, friction, ease }: ParticleProps) {
    this.x = x;
    this.y = y;
    this.originX = originX;
    this.originY = originY;
    this.color = color;
    this.size = size;
    this.vx = 0;
    this.vy = 0;
    this.friction = friction;
    this.ease = ease;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }

  update(mouse: { x: number; y: number; radius: number }) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const force = (mouse.radius - distance) / mouse.radius;

    if (distance < mouse.radius) {
      const angle = Math.atan2(dy, dx);
      this.vx -= Math.cos(angle) * force * 15;
      this.vy -= Math.sin(angle) * force * 15;
    }

    this.vx *= this.friction;
    this.vy *= this.friction;

    this.x += this.vx + (this.originX - this.x) * this.ease;
    this.y += this.vy + (this.originY - this.y) * this.ease;
  }
}

const ParticleText = ({ text }: { text: string }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: -9999, y: -9999, radius: 100 });
  const animationFrameId = useRef<number>(0);

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    particles.current = [];
    
    const parent = canvas.parentElement;
    if (!parent) return;
    
    const width = parent.clientWidth;
    const height = parent.clientHeight;
    if (width === 0 || height === 0) return;
    
    canvas.width = width;
    canvas.height = height;

    const isMobile = width < 768;
    const baseSize = isMobile ? width * 0.25 : 320;
    const scaleFactor = isMobile ? (width / 400) : (width / 1440);
    const responsiveFontSize = Math.min(baseSize * scaleFactor * (text.length > 6 ? 0.8 : 1), baseSize);
    
    ctx.font = `900 ${responsiveFontSize}px sans-serif`;
    
    const gradient = ctx.createLinearGradient(0, 0, width, 0);
    gradient.addColorStop(0, '#5200F8');
    gradient.addColorStop(1, '#F80037');
    
    ctx.fillStyle = gradient;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, width / 2, height / 2);

    const pixels = ctx.getImageData(0, 0, width, height).data;
    ctx.clearRect(0, 0, width, height);

    const gap = isMobile ? 3 : 1;

    for (let y = 0; y < height; y += gap) {
      for (let x = 0; x < width; x += gap) {
        const index = (y * width + x) * 4;
        const alpha = pixels[index + 3];
        if (alpha > 100) {
          const r = pixels[index];
          const g = pixels[index + 1];
          const b = pixels[index + 2];
          
          particles.current.push(
            new Particle({
              x: x, 
              y: y, 
              originX: x,
              originY: y,
              color: `rgb(${r}, ${g}, ${b})`,
              size: isMobile ? 1.8 : 1.2,
              friction: 0.9,
              ease: 0.1
            })
          );
        }
      }
    }
  }, [text]);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.current.forEach((particle) => {
      particle.update(mouse.current);
      particle.draw(ctx);
    });

    animationFrameId.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    init();
    animate();

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [init, animate]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    }
  };

  const handleMouseLeave = () => {
    mouse.current.x = -9999;
    mouse.current.y = -9999;
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="w-full h-full cursor-default touch-none"
    />
  );
};

export const Hero = () => {
  const router = useRouter();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  const words = ["CREA", "CONECTA", "AVANZA"];
  const subtitles = [
    "Construimos plataformas digitales que transforman negocios.",
    "Conectamos tu visión con tecnología de alta conversión.",
    "Impulsamos el crecimiento de tu marca en el ecosistema digital."
  ];
  
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAbsorbing, setIsAbsorbing] = useState(false);
  const [showWhiteOut, setShowWhiteOut] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (isAbsorbing) return;
    const interval = setInterval(() => {
      setCurrentWordIndex((prev) => (prev + 1) % words.length);
    }, 15000);
    return () => clearInterval(interval);
  }, [isAbsorbing]);

  const scrollToNextSection = () => {
    if (typeof window !== 'undefined') {
      const target = document.getElementById('featured-services');
      target?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBlackHoleClick = () => {
    setIsAbsorbing(true);
    // Iniciar prefetching de la ruta para suavizar la carga final
    router.prefetch('/tarjetas-neocard');
    
    setTimeout(() => {
      setShowWhiteOut(true);
    }, 800);

    setTimeout(() => {
      router.push('/tarjetas-neocard');
    }, 2500);
  };

  return (
    <section className="relative h-screen w-full flex flex-col bg-[#00001D] overflow-hidden select-none">
      {/* Wormhole Wormhole / Black Hole Transition Layer */}
      {showWhiteOut && (
        <div className="fixed inset-0 z-[10000] bg-black flex items-center justify-center overflow-hidden animate-white-out">
          {/* Central Singular Point */}
          <div className="relative w-4 h-4 bg-white rounded-full shadow-[0_0_100px_white,0_0_200px_white] z-[100]" />
          
          {/* Black Spiral Layers */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[0, 90, 180, 270].map((angle) => (
              <div 
                key={angle}
                className="absolute w-[200vw] h-[200vw] opacity-80"
                style={{ 
                  transform: `rotate(${angle}deg)`,
                  background: 'conic-gradient(from 0deg, black 0%, transparent 40%, black 50%, transparent 90%, black 100%)',
                  animation: `spin ${3 - (angle/100)}s linear infinite`
                } as any}
              />
            ))}
          </div>

          {/* Wormhole Waves */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i}
                className="absolute rounded-full border border-primary/30 animate-wormhole-wave"
                style={{ 
                  width: '40vh', 
                  height: '40vh',
                  animationDelay: `${i * 0.4}s`
                }}
              />
            ))}
          </div>

          {/* Hyper-speed Stars */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 100 }).map((_, i) => (
              <div 
                key={i}
                className="absolute w-px h-16 bg-gradient-to-t from-white to-transparent opacity-0 animate-hyper-star"
                style={{
                  left: '50%',
                  top: '50%',
                  '--tx': `${(Math.random() - 0.5) * 3000}px`,
                  '--ty': `${(Math.random() - 0.5) * 3000}px`,
                  animationDelay: `${Math.random() * 1.5}s`,
                  transform: `rotate(${Math.random() * 360}deg)`
                } as any}
              />
            ))}
          </div>
        </div>
      )}

      {/* Nebula Background */}
      <div className={cn(
        "absolute inset-0 z-0 pointer-events-none transition-all duration-1000",
        isAbsorbing && "animate-absorb",
        isHovered && !isAbsorbing && "translate-x-[2%] scale-[1.02]"
      )}
      style={{ '--absorb-x': '40vw', '--absorb-y': '200px' } as any}
      >
        <div 
          className="absolute inset-0 transition-transform duration-[2000ms] ease-out scale-110"
          style={{ transform: `translate(${mousePos.x * 0.5}px, ${mousePos.y * 0.5}px)` }}
        >
          <div className="absolute top-[-10%] right-[-10%] w-[80%] h-[70%] bg-purple-600/20 blur-[150px] rounded-full animate-pulse duration-[8s]" />
          <div className="absolute bottom-[-15%] left-[-5%] w-[70%] h-[60%] bg-[#F80037]/10 blur-[120px] rounded-full animate-pulse duration-[10s] delay-700" />
          <div className="absolute top-[20%] left-[20%] w-[50%] h-[50%] bg-blue-600/10 blur-[140px] rounded-full animate-pulse duration-[12s] delay-1000" />
          <div className="absolute top-[40%] right-[10%] w-[120%] h-[70%] bg-purple-900/10 blur-[150px] rounded-full opacity-60" />
        </div>
      </div>

      <StarField isAbsorbing={isAbsorbing} />

      {/* Black Hole Singularity with Dimension Portal */}
      <div 
        onClick={handleBlackHoleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={cn(
          "absolute right-[5%] md:right-[8%] lg:right-[10%] top-[calc(70%+200px)] sm:top-[calc(50%+200px)] -translate-y-1/2 z-[30] cursor-pointer group transition-all duration-1000",
          isAbsorbing && "scale-[4] opacity-100 rotate-[720deg]",
          isHovered && !isAbsorbing && "scale-110"
        )}
      >
        <div className="absolute inset-[-20px] sm:inset-[-40px] rounded-full animate-spin-slow opacity-60 blur-2xl bg-[conic-gradient(from_0deg,#F80037,#5200F8,#F80037)] pointer-events-none" />
        <div className="absolute inset-[-40px] sm:inset-[-60px] md:inset-[-80px] pointer-events-none animate-spin-slow">
          <svg viewBox="0 0 200 200" className="w-full h-full overflow-visible">
            <defs>
              <path id="circlePath" d="M 100, 100 m -85, 0 a 85,85 0 1,1 170,0 a 85,85 0 1,1 -170,0" />
            </defs>
            <text className="fill-white/40 text-[8px] sm:text-[10px] font-black tracking-[0.25em] uppercase">
              <textPath xlinkHref="#circlePath">
                PRODUCTO DESTACADO • PRODUCTO DESTACADO • PRODUCTO DESTACADO • 
              </textPath>
            </text>
          </svg>
        </div>
        
        <div className="relative w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full bg-black shadow-[0_0_40px_rgba(248,0,55,0.4),0_0_80px_rgba(82,0,248,0.4)] transition-all duration-500 group-hover:shadow-[0_0_60px_#F80037,0_0_120px_#5200F8] overflow-hidden">
          <div className={cn(
            "absolute inset-0 transition-all duration-1000 ease-in-out pointer-events-none opacity-0 scale-150 rotate-12",
            isHovered && !isAbsorbing && "opacity-40 scale-100 rotate-0"
          )}>
            <img 
              src="https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Tarjetas%20digitales%2FNaxde%2FPerfil%20oscar.jpeg?alt=media&token=1b57f085-d1fd-4435-8693-1be5d9bdd2b1" 
              alt="Neocard Dimension"
              className="w-full h-full object-cover animate-pulse blur-[1px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
          </div>

          <div className="absolute inset-0 rounded-full border border-white/5 animate-spin duration-[15s]" />
          <div className={cn(
            "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/20 transition-all duration-500",
            isHovered && !isAbsorbing ? "opacity-100 text-primary scale-125" : "opacity-40 scale-100"
          )}>
            <Zap className="w-4 h-4 sm:w-6 sm:h-6 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Astronaut con interacción de cursor */}
      <div className={cn(
        "absolute inset-0 flex items-center justify-center z-[20] pointer-events-none transition-all duration-[1000ms] ease-out",
        isAbsorbing && "animate-absorb scale-0"
      )}
      style={{ 
        '--absorb-x': '40vw', 
        '--absorb-y': '200px',
        transform: isAbsorbing ? 'none' : `translate(${mousePos.x * 1.2}px, ${mousePos.y * 1.2}px)`
      } as any}
      >
        <div className={cn(
          "relative w-[180px] h-[180px] sm:w-[280px] sm:h-[280px] md:w-[480px] md:h-[480px] opacity-60 sm:opacity-100",
          !isAbsorbing && "float-anim"
        )}>
          <Image 
            src="https://firebasestorage.googleapis.com/v0/b/studio-4920931495-1d74b.firebasestorage.app/o/Elementos%20graficos%2FAstronauta%20candy.png?alt=media&token=2b444080-0b94-4549-a656-6e67dc038512"
            alt="Astronauta Candy"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>

      {/* Content Stack */}
      <div className={cn(
        "flex-1 relative flex flex-col items-center justify-center gap-2 sm:gap-4 transition-all duration-[1500ms] px-6 sm:px-12 ease-out",
        isAbsorbing && "animate-absorb opacity-0 scale-50",
        isHovered && !isAbsorbing && "translate-x-[2%] scale-[0.99]"
      )}
      style={{ '--absorb-x': '40vw', '--absorb-y': '200px' } as any}
      >
        <div 
          key={`word-${currentWordIndex}`} 
          className="w-full min-h-[25vh] sm:min-h-[40vh] md:min-h-[50vh] flex items-center justify-center z-10 text-center overflow-hidden animate-slide-up-cycle"
        >
          <ParticleText text={words[currentWordIndex]} />
        </div>
        
        <div className="max-w-4xl z-10 flex flex-col items-center gap-6 sm:gap-8 w-full mt-4 md:mt-0 lg:-top-[300px] relative">
          <div key={`sub-${currentWordIndex}`} className="animate-slide-up-cycle w-full flex justify-center">
            <p className="text-[10px] sm:text-xs md:text-base lg:text-lg text-white/60 font-bold tracking-[0.2em] sm:tracking-[0.3em] uppercase leading-relaxed text-center px-4 max-w-2xl">
              {subtitles[currentWordIndex]}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center items-center">
            <Link href="/contacto" className="w-full sm:w-auto">
              <Button size="lg" className="h-12 sm:h-14 px-8 sm:px-10 bg-primary hover:bg-primary/90 text-white rounded-full neon-accent text-sm sm:text-lg font-bold w-full sm:w-auto transition-all hover:scale-105">
                Contacta
              </Button>
            </Link>
            <Link href="/proyectos" className="w-full sm:w-auto">
              <Button size="lg" variant="outline" className="h-12 sm:h-14 px-8 sm:px-10 border-white/20 hover:bg-white/10 text-white rounded-full text-sm sm:text-lg font-bold w-full sm:w-auto backdrop-blur-sm transition-all hover:border-white/40">
                Ver Proyectos
              </Button>
            </Link>
          </div>

          <div 
            className="flex flex-col items-center gap-2 sm:gap-3 cursor-pointer group mt-8 sm:mt-12 transition-all hover:translate-y-1" 
            onClick={scrollToNextSection}
          >
            <Mouse className="w-5 h-5 sm:w-8 sm:h-8 text-white/30 group-hover:text-primary transition-all duration-300" />
            <span className="text-[8px] md:text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">
              desliza
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Fade Gradient to smooth transition */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#00001D] to-transparent z-[40] pointer-events-none" />

      <style jsx global>{`
        @keyframes slide-up-cycle {
          0% { transform: translateY(100px); opacity: 0; filter: blur(20px); }
          15% { transform: translateY(0); opacity: 1; filter: blur(0); }
          85% { transform: translateY(0); opacity: 1; filter: blur(0); }
          100% { transform: translateY(100px); opacity: 0; filter: blur(20px); }
        }
        .animate-slide-up-cycle {
          animation: slide-up-cycle 15s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          will-change: transform, opacity;
        }
      `}</style>
    </section>
  );
};
