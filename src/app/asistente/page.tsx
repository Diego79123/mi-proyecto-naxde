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
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import { cn } from '@/lib/utils';
import { generateChatResponseAction } from './actions';
import { ImageEditor } from '@/components/asistente/ImageEditor';
import { Header } from '@/components/layout/Header';
import { BottomNav } from '@/components/layout/BottomNav';

const STORAGE_KEY = 'naxde_ai_sessions';

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
        }]);
      };
      reader.readAsDataURL(file);
    });
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

    const userMsg = { id: Date.now().toString(), role: 'user', content: input, attachments: [...attachments], timestamp: Date.now() };
    setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, messages: [...s.messages, userMsg], updatedAt: Date.now() } : s));

    const currentInput = input;
    const currentAtts = [...attachments];
    setInput('');
    setAttachments([]);
    setIsLoading(true);

    try {
      const history = messages.map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] }));
      const response = await generateChatResponseAction(currentInput, history, currentAtts);
      
      const assistantMsg = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: Date.now(),
      };

      setSessions(prev => prev.map(s => s.id === sessionId ? { ...s, messages: [...s.messages, assistantMsg], updatedAt: Date.now() } : s));
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-[#00001D] text-white overflow-hidden">
      <Header />
      
      {/* Sidebar Historial */}
      <aside className="w-64 border-r border-white/5 bg-black/20 pt-24 hidden md:flex flex-col">
        <div className="p-4 space-y-4">
          <button onClick={createNewSession} className="w-full flex items-center gap-2 p-3 bg-primary rounded-xl font-bold hover:bg-primary/90 transition-all">
            <Plus className="w-5 h-5" /> Nuevo Chat
          </button>
          <div className="space-y-1">
            {sessions.map(s => (
              <button key={s.id} onClick={() => setCurrentSessionId(s.id)} className={cn("w-full text-left p-3 rounded-lg text-sm transition-all", currentSessionId === s.id ? "bg-white/10 text-primary" : "text-white/40 hover:bg-white/5")}>
                <div className="truncate font-medium">{s.title}</div>
              </button>
            ))}
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col pt-24 relative">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 no-scrollbar">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-2xl mx-auto space-y-8">
              <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center text-primary animate-pulse"><Sparkles className="w-10 h-10" /></div>
              <h2 className="text-4xl font-headline font-black uppercase tracking-tighter italic">Naxde <span className="text-primary not-italic">Social AI</span></h2>
              <p className="text-white/40 text-lg">Tu copiloto estratégico para dominar las redes sociales con ingeniería de datos e IA generativa.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
                {["Estrategia para Instagram", "Captions para LinkedIn", "Análisis de marca", "Ideas de contenido"].map((s, i) => (
                  <button key={i} onClick={() => setInput(s)} className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-primary/50 text-sm font-bold uppercase tracking-widest transition-all">{s}</button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m: any) => (
            <div key={m.id} className={cn("flex gap-4 max-w-4xl mx-auto", m.role === 'user' ? "flex-row-reverse" : "flex-row")}>
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", m.role === 'user' ? "bg-primary" : "bg-white/5 border border-white/10")}>
                {m.role === 'user' ? <User className="w-6 h-6" /> : <Bot className="w-6 h-6 text-primary" />}
              </div>
              <div className={cn("p-5 rounded-3xl max-w-[85%] space-y-3 shadow-2xl", m.role === 'user' ? "bg-primary/20 border border-primary/20 text-right" : "bg-white/5 border border-white/5")}>
                {m.attachments?.map((att: any, i: number) => (
                  <img key={i} src={`data:${att.mimeType};base64,${att.data}`} className="max-w-[200px] rounded-xl border border-white/10" alt="Adjunto" />
                ))}
                <div className="prose prose-invert prose-sm"><Markdown>{m.content}</Markdown></div>
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex gap-4 max-w-4xl mx-auto">
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0"><Bot className="w-6 h-6 text-primary animate-pulse" /></div>
              <div className="bg-white/5 border border-white/5 p-5 rounded-3xl flex gap-2">
                {[0, 150, 300].map(d => <span key={d} className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />)}
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 bg-gradient-to-t from-[#00001D] to-transparent">
          <div className="max-w-4xl mx-auto relative group">
            {attachments.length > 0 && (
              <div className="flex gap-3 mb-4 p-2 overflow-x-auto no-scrollbar">
                {attachments.map((att, i) => (
                  <div key={i} className="relative group/att shrink-0">
                    <img src={att.url} className="w-20 h-20 object-cover rounded-xl border-2 border-primary/50" alt="Preview" />
                    <button onClick={() => setAttachments(prev => prev.filter((_, idx) => idx !== i))} className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 shadow-lg"><X className="w-3 h-3" /></button>
                  </div>
                ))}
              </div>
            )}
            <div className="relative">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend())}
                placeholder="Escribe tu mensaje estratégico..."
                className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-5 pr-32 focus:border-primary/50 outline-none resize-none min-h-[70px] shadow-2xl transition-all"
                rows={1}
              />
              <div className="absolute right-3 bottom-3 flex gap-2">
                <button onClick={() => fileInputRef.current?.click()} className="p-2.5 text-white/40 hover:text-primary transition-all"><Paperclip className="w-5 h-5" /></button>
                <button onClick={handleSend} disabled={isLoading} className="p-2.5 bg-primary rounded-2xl text-white shadow-lg hover:scale-105 transition-all"><Send className="w-5 h-5" /></button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <input type="file" ref={fileInputRef} onChange={(e) => e.target.files && processFiles(e.target.files)} className="hidden" accept="image/*" multiple />
      <BottomNav />

      {editingImageIndex !== null && (
        <ImageEditor imageUrl={attachments[editingImageIndex].url} onSave={() => {}} onClose={() => setEditingImageIndex(null)} />
      )}
    </div>
  );
}
