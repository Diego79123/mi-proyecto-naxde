'use client';

import { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Image as ImageIcon, 
  Sparkles, 
  User, 
  Bot, 
  Plus, 
  Trash2, 
  Share2, 
  Download, 
  Mic, 
  MicOff, 
  Paperclip, 
  X, 
  Edit3, 
  CheckCircle2, 
  Circle,
  MessageSquare,
  Zap,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { generateChatResponseAction, generateImageAction } from './actions';
import { ImageEditor } from '@/components/asistente/ImageEditor';
import { Header } from '@/components/layout/Header';
import Link from 'next/link';

const STORAGE_KEY = 'naxde_ai_sessions_v2';

export default function AsistentePage() {
  const [sessions, setSessions] = useState<any[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [attachments, setAttachments] = useState<any[]>([]);
  const [editingImageIndex, setEditingImageIndex] = useState<number | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setSessions(parsed);
          if (parsed.length > 0) setCurrentSessionId(parsed[0].id);
        }
      } catch (e) { console.error(e); }
    }
  }, []);

  useEffect(() => {
    if (sessions.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessions));
    }
  }, [sessions]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [currentSessionId, sessions]);

  const currentSession = sessions.find(s => s.id === currentSessionId);
  const messages = currentSession?.messages || [];

  const createNewSession = () => {
    const newSession = {
      id: Date.now().toString(),
      title: 'Nueva conversación',
      messages: [],
      updatedAt: Date.now(),
    };
    setSessions(prev => [newSession, ...prev]);
    setCurrentSessionId(newSession.id);
  };

  const deleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessions(prev => prev.filter(s => s.id !== id));
    if (currentSessionId === id) setCurrentSessionId(null);
  };

  const processFiles = (files: FileList | File[]) => {
    Array.from(files).forEach(file => {
      if (!file.type.startsWith('image/')) return;
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        if (!result) return;
        setAttachments(prev => [...prev, {
          mimeType: file.type,
          data: result.split(',')[1],
          url: URL.createObjectURL(file),
          isReference: false
        }]);
      };
      reader.readAsDataURL(file);
    });
  };

  const toggleReference = (index: number) => {
    setAttachments(prev => prev.map((att, i) => 
      i === index ? { ...att, isReference: !att.isReference } : att
    ));
  };

  const handleSend = async () => {
    if ((!input.trim() && attachments.length === 0) || isLoading) return;

    let sessionId = currentSessionId;
    if (!sessionId) {
      const newSession = { id: Date.now().toString(), title: input.slice(0, 30) || 'Imagen adjunta', messages: [], updatedAt: Date.now() };
      setSessions(prev => [newSession, ...prev]);
      setCurrentSessionId(newSession.id);
      sessionId = newSession.id;
    }

    const userMsg = { 
      id: Date.now().toString(), 
      role: 'user', 
      content: input, 
      attachments: [...attachments], 
      timestamp: Date.now() 
    };

    setSessions(prev => prev.map(s => s.id === sessionId ? { 
      ...s, 
      messages: [...s.messages, userMsg], 
      updatedAt: Date.now(),
      title: s.messages.length === 0 ? (input.slice(0, 30) || 'Estrategia Visual') : s.title
    } : s));

    const currentInput = input;
    const currentAtts = [...attachments];
    setInput('');
    setAttachments([]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ 
        role: m.role === 'user' ? 'user' : 'model', 
        parts: [{ text: m.content }] 
      }));

      const response = await generateChatResponseAction(currentInput, history, currentAtts);
      
      // Detección de comando de generación de imagen
      const imageMatch = response.match(/\[GENERATE_IMAGE:\s*(.*?)\]/);
      let generatedImageUrl = null;

      if (imageMatch) {
        const imagePrompt = imageMatch[1];
        const referenceImage = currentAtts.find(a => a.isReference);
        generatedImageUrl = await generateImageAction(imagePrompt, referenceImage ? { data: referenceImage.data, mimeType: referenceImage.mimeType } : undefined);
      }

      const assistantMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response.replace(/\[GENERATE_IMAGE:.*?\]/g, '').trim(),
        imageUrl: generatedImageUrl || undefined,
        timestamp: Date.now(),
      };

      setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, messages: [...s.messages, assistantMsg], updatedAt: Date.now() } : s));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      recognitionRef.current?.stop();
      setIsRecording(false);
    } else {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (!SpeechRecognition) return alert("Tu navegador no soporta el reconocimiento de voz.");

      const recognition = new SpeechRecognition();
      recognition.lang = 'es-ES';
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + (prev ? ' ' : '') + transcript);
      };
      recognition.onend = () => setIsRecording(false);
      recognitionRef.current = recognition;
      recognition.start();
      setIsRecording(true);
    }
  };

  return (
    <div className="flex h-screen bg-[#00001D] text-white overflow-hidden">
      <Header />
      
      {/* Sidebar Historial Portado */}
      <aside className="w-72 border-r border-white/5 bg-black/40 pt-24 hidden lg:flex flex-col">
        <div className="p-6 space-y-6">
          <button onClick={createNewSession} className="w-full flex items-center justify-center gap-3 p-4 bg-primary rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-primary/90 transition-all shadow-glow-accent">
            <Plus className="w-5 h-5" /> Nuevo Proyecto
          </button>
          
          <div className="space-y-4">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 px-2">Historial Estratégico</p>
            <div className="space-y-1 max-h-[60vh] overflow-y-auto no-scrollbar">
              {sessions.map(s => (
                <div key={s.id} className="group relative">
                  <button 
                    onClick={() => setCurrentSessionId(s.id)} 
                    className={cn(
                      "w-full text-left p-4 rounded-xl text-sm transition-all flex items-center gap-3", 
                      currentSessionId === s.id ? "bg-white/10 text-primary border border-white/10" : "text-white/40 hover:bg-white/5"
                    )}
                  >
                    <MessageSquare className="w-4 h-4 shrink-0" />
                    <div className="truncate font-bold uppercase text-[10px] tracking-widest">{s.title}</div>
                  </button>
                  <button onClick={(e) => deleteSession(s.id, e)} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 opacity-0 group-hover:opacity-100 text-white/20 hover:text-red-500 transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-auto p-6 border-t border-white/5">
          <Link href="/admin">
            <button className="w-full flex items-center gap-3 p-4 rounded-xl text-white/40 hover:bg-white/5 transition-all text-xs font-bold uppercase tracking-widest">
              <LayoutDashboard className="w-4 h-4" /> Panel Admin
            </button>
          </Link>
        </div>
      </aside>

      <main className="flex-1 flex flex-col pt-24 relative">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 md:p-10 space-y-8 no-scrollbar">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-10">
              <div className="relative">
                <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl animate-pulse" />
                <div className="w-24 h-24 bg-primary/10 rounded-[2.5rem] border border-primary/30 flex items-center justify-center text-primary relative z-10">
                  <Sparkles className="w-12 h-12" />
                </div>
              </div>
              <div className="space-y-4">
                <h2 className="text-5xl font-headline font-black uppercase tracking-tighter italic leading-none">Naxde <span className="text-primary not-italic">Social AI</span></h2>
                <p className="text-white/40 text-xl font-medium">Ingeniería de contenido impulsada por modelos Gemini 2.0</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {["Estrategia para Instagram", "Diseño de Logo Minimalista", "Plan de Contenido Mensual", "Copys de Alto Impacto"].map((s, i) => (
                  <button key={i} onClick={() => setInput(s)} className="p-5 bg-white/[0.02] border border-white/10 rounded-[2rem] hover:border-primary/50 text-[10px] font-black uppercase tracking-widest transition-all hover:bg-white/[0.05]">{s}</button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m: any) => (
            <div key={m.id} className={cn("flex gap-6 max-w-5xl mx-auto", m.role === 'user' ? "flex-row-reverse" : "flex-row")}>
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-2xl transition-transform hover:scale-110", 
                m.role === 'user' ? "bg-primary neon-accent" : "bg-white/5 border border-white/10"
              )}>
                {m.role === 'user' ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6 text-primary" />}
              </div>
              
              <div className={cn(
                "p-6 md:p-8 rounded-[2.5rem] max-w-[85%] space-y-4 shadow-2xl transition-all", 
                m.role === 'user' ? "bg-primary/10 border border-primary/20 rounded-tr-none" : "bg-white/5 border border-white/5 rounded-tl-none backdrop-blur-md"
              )}>
                {m.attachments?.map((att: any, i: number) => (
                  <div key={i} className="relative inline-block group">
                    <img src={`data:${att.mimeType};base64,${att.data}`} className="max-w-[250px] rounded-2xl border border-white/10 shadow-lg" alt="Adjunto" />
                    {att.isReference && (
                      <div className="absolute top-2 left-2 bg-emerald-500 text-white text-[8px] font-black px-2 py-1 rounded uppercase tracking-widest shadow-lg">Referencia Logo</div>
                    )}
                  </div>
                ))}
                
                <div className="prose prose-invert prose-sm max-w-none prose-headings:font-headline prose-headings:uppercase prose-headings:tracking-tighter prose-strong:text-primary">
                  <Markdown>{m.content}</Markdown>
                </div>

                {m.imageUrl && (
                  <div className="mt-6 rounded-3xl overflow-hidden border border-white/10 shadow-2xl group/img">
                    <img src={m.imageUrl} className="w-full h-auto object-cover" alt="Generada por IA" />
                    <div className="p-4 bg-white/5 backdrop-blur-xl flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Visualización Generativa</span>
                      <a href={m.imageUrl} download="naxde-ai-design.png" className="p-3 bg-primary rounded-xl hover:scale-105 transition-all"><Download className="w-4 h-4" /></a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-6 max-w-5xl mx-auto">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0"><Bot className="w-6 h-6 text-primary animate-pulse" /></div>
              <div className="bg-white/5 border border-white/5 p-6 rounded-[2rem] rounded-tl-none flex gap-2">
                {[0, 150, 300].map(d => <span key={d} className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce shadow-glow-accent" style={{ animationDelay: `${d}ms` }} />)}
              </div>
            </div>
          )}
        </div>

        {/* Input Area Rediseñada */}
        <div className="p-6 md:p-10 bg-gradient-to-t from-[#00001D] via-[#00001D]/90 to-transparent">
          <div className="max-w-5xl mx-auto space-y-6">
            
            {/* Modo Logo Activo Indicador */}
            {attachments.some(a => a.isReference) && (
              <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full w-fit animate-pulse">
                <div className="w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_8px_#10b981]" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">Logo de Referencia Activo</span>
              </div>
            )}

            <div className="relative group">
              <AnimatePresence>
                {attachments.length > 0 && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="flex gap-4 mb-6 p-4 overflow-x-auto no-scrollbar bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-xl">
                    {attachments.map((att, i) => (
                      <div key={i} className="relative group/att shrink-0">
                        <div className={cn(
                          "w-24 h-24 rounded-2xl overflow-hidden border-2 transition-all shadow-xl",
                          att.isReference ? "border-emerald-500 ring-4 ring-emerald-500/20" : "border-white/10"
                        )}>
                          <img src={att.url} className="w-full h-full object-cover" alt="Preview" />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/att:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                            <button onClick={() => setEditingImageIndex(i)} className="p-2 bg-white/10 rounded-lg hover:bg-white/20"><Edit3 className="w-4 h-4" /></button>
                            <button onClick={() => toggleReference(i)} className={cn("p-2 rounded-lg", att.isReference ? "bg-emerald-500" : "bg-white/10")}>
                              {att.isReference ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                        <button onClick={() => setAttachments(prev => prev.filter((_, idx) => idx !== i))} className="absolute -top-3 -right-3 bg-red-500 rounded-full p-1.5 shadow-2xl hover:scale-110 transition-all"><X className="w-3.5 h-3.5" /></button>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                  placeholder="Describe tu estrategia o pide un diseño..."
                  className="w-full bg-white/[0.03] border border-white/10 rounded-[2.5rem] px-8 py-6 pr-40 focus:border-primary/50 outline-none resize-none min-h-[85px] shadow-2xl transition-all focus:bg-white/[0.05] font-medium"
                  rows={1}
                />
                <div className="absolute right-4 bottom-4 flex gap-2">
                  <button onClick={() => fileInputRef.current?.click()} className="p-3 text-white/40 hover:text-primary hover:bg-white/5 rounded-2xl transition-all" title="Adjuntar activos"><Paperclip className="w-6 h-6" /></button>
                  <button onClick={toggleRecording} className={cn("p-3 rounded-2xl transition-all", isRecording ? "bg-red-500/20 text-red-500 animate-pulse" : "text-white/40 hover:text-primary hover:bg-white/5")}><Mic className="w-6 h-6" /></button>
                  <button onClick={handleSend} disabled={isLoading} className="p-4 bg-primary rounded-[1.5rem] text-white shadow-glow-accent hover:scale-105 active:scale-95 transition-all"><Send className="w-6 h-6" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <input type="file" ref={fileInputRef} onChange={(e) => e.target.files && processFiles(e.target.files)} className="hidden" accept="image/*" multiple />

      {editingImageIndex !== null && (
        <ImageEditor imageUrl={attachments[editingImageIndex].url} onSave={(url) => {
          setAttachments(prev => prev.map((att, i) => i === editingImageIndex ? { ...att, url, data: url.split(',')[1] } : att));
          setEditingImageIndex(null);
        }} onClose={() => setEditingImageIndex(null)} />
      )}
    </div>
  );
}
