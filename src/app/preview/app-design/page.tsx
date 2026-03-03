
"use client"

import React, { useEffect, useState } from 'react';
import { Layout, Users, Activity, Settings, Bell, Search, BarChart3, Plus } from 'lucide-react';

export default function AppDesignPreview() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-[#050515]" />;

  return (
    <div className="min-h-screen bg-[#050515] text-white font-body overflow-hidden selection:bg-primary/30 p-4">
      {/* App Header Mockup */}
      <header className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Activity className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-tight">Naxde Dashboard</h2>
            <p className="text-[8px] text-white/40 font-bold uppercase tracking-widest">Enterprise Suite</p>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
            <Search className="w-4 h-4 text-white/40" />
          </div>
          <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center relative">
            <Bell className="w-4 h-4 text-white/40" />
            <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full shadow-[0_0_5px_#F80037]" />
          </div>
        </div>
      </header>

      {/* App Main Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-4 rounded-3xl bg-gradient-to-br from-primary/20 to-transparent border border-white/5 space-y-3">
          <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Revenue</p>
          <h3 className="text-2xl font-black">$45.8k</h3>
          <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
            <div className="h-full w-[70%] bg-primary shadow-[0_0_10px_#F80037]" />
          </div>
        </div>
        <div className="p-4 rounded-3xl bg-gradient-to-br from-blue-500/20 to-transparent border border-white/5 space-y-3">
          <p className="text-[8px] font-black text-white/40 uppercase tracking-widest">Users</p>
          <h3 className="text-2xl font-black">12.4k</h3>
          <div className="flex -space-x-2">
            {[1,2,3].map(i => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-[#050515] bg-white/10" />
            ))}
            <div className="w-6 h-6 rounded-full border-2 border-[#050515] bg-primary flex items-center justify-center text-[8px] font-black">+8</div>
          </div>
        </div>
      </div>

      {/* Performance Graph Mockup */}
      <div className="p-6 rounded-[2.5rem] bg-white/[0.03] border border-white/5 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-[10px] font-black uppercase tracking-widest">Performance</h4>
          <BarChart3 className="w-4 h-4 text-primary" />
        </div>
        <div className="flex items-end gap-2 h-24">
          {[40, 70, 45, 90, 60, 85, 50, 95].map((h, i) => (
            <div key={i} className="flex-1 bg-primary/20 rounded-t-lg relative group">
              <div 
                className="absolute bottom-0 left-0 right-0 bg-primary rounded-t-lg transition-all duration-1000" 
                style={{ height: `${h}%` }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="space-y-3">
        <h4 className="text-[10px] font-black uppercase tracking-widest px-2">Quick Actions</h4>
        <div className="grid grid-cols-4 gap-3">
          {[
            { icon: Layout, label: "Feed" },
            { icon: Users, label: "Teams" },
            { icon: Settings, label: "Tools" },
            { icon: Plus, label: "Add" }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center">
                <item.icon className="w-5 h-5 text-white/60" />
              </div>
              <span className="text-[8px] font-bold text-white/40 uppercase tracking-widest">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        ::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
