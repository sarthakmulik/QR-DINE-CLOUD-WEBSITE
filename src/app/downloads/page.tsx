'use client';

import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { ParticleField } from '@/components/ParticleField';
import { motion } from 'framer-motion';
import { Download, Monitor, Smartphone, CheckCircle2 } from 'lucide-react';
import Magnetic from '@/components/Magnetic';

const EASE_OUT_SPRING: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function DownloadsPage() {
  return (
    <div className="min-h-screen bg-[#08080a] flex flex-col font-sans selection:bg-brand-500/30">
      <Navigation />

      <main className="flex-grow relative flex flex-col items-center justify-center pt-32 pb-24 overflow-hidden">
        <ParticleField />
        
        {/* Glowing Backgrounds */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(59,130,246,0.15),transparent)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:28px_28px] pointer-events-none" />
        
        <div className="absolute top-[20%] left-[10%] w-72 h-72 bg-blue-500/[0.08] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-96 h-96 bg-emerald-500/[0.08] rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full text-center">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.1] text-zinc-300 text-xs font-bold mb-8 uppercase tracking-[0.15em]"
          >
            <Download size={14} className="text-brand-400" />
            Available Now
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: EASE_OUT_SPRING }}
            className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6"
          >
            Get the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Right Tools</span>
            <br />for Your Team
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg text-zinc-500 mb-16 max-w-2xl mx-auto leading-relaxed"
          >
            Whether you're managing the hotel from your desk or taking orders on the floor, we have native applications designed for peak performance.
          </motion.p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Windows App Card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.3, ease: EASE_OUT_SPRING }}
              className="bg-[#111116] border border-white/[0.06] rounded-[2rem] p-8 relative overflow-hidden group hover:border-blue-500/30 transition-all duration-500 text-left h-full flex flex-col"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/[0.05] rounded-full blur-[80px] group-hover:bg-blue-500/[0.1] transition-colors pointer-events-none" />
              
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-8">
                <Monitor size={32} />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">Admin Dashboard</h2>
              <p className="text-zinc-500 mb-6 text-sm leading-relaxed">
                The complete management suite for Windows. Manage menus, track analytics, and handle KOT routing effortlessly.
              </p>

              <ul className="space-y-3 mb-10 flex-grow">
                {['Live order monitoring', 'Thermal printer integration', 'Analytics & reports'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-semibold text-zinc-300">
                    <CheckCircle2 size={16} className="text-blue-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Magnetic>
                <a
                  href="/downloads/QR-Dine-Cloud-Setup.exe"
                  download
                  className="w-full py-4 rounded-xl bg-blue-600/10 border border-blue-500/30 text-blue-400 font-bold hover:bg-blue-600/20 hover:border-blue-500/50 transition-all text-sm flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  Download for Windows
                </a>
              </Magnetic>
              <p className="text-center text-[10px] text-zinc-600 mt-4 uppercase font-bold tracking-widest">Windows 10 / 11 (64-bit)</p>
            </motion.div>

            {/* Android App Card */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE_OUT_SPRING }}
              className="bg-[#111116] border border-white/[0.06] rounded-[2rem] p-8 relative overflow-hidden group hover:border-emerald-500/30 transition-all duration-500 text-left h-full flex flex-col"
            >
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/[0.05] rounded-full blur-[80px] group-hover:bg-emerald-500/[0.1] transition-colors pointer-events-none" />
              
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-8">
                <Smartphone size={32} />
              </div>
              
              <h2 className="text-2xl font-bold text-white mb-2">Waiter App</h2>
              <p className="text-zinc-500 mb-6 text-sm leading-relaxed">
                Empower your floor staff with a native Android app to take orders, track statuses, and receive instant push notifications.
              </p>

              <ul className="space-y-3 mb-10 flex-grow">
                {['Add items on-the-fly', 'Real-time kitchen alerts', 'Customer assistance pings'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-semibold text-zinc-300">
                    <CheckCircle2 size={16} className="text-emerald-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <Magnetic>
                <a
                  href="/downloads/QR-Dine-Cloud-Waiters.apk"
                  download
                  className="w-full py-4 rounded-xl bg-emerald-600/10 border border-emerald-500/30 text-emerald-400 font-bold hover:bg-emerald-600/20 hover:border-emerald-500/50 transition-all text-sm flex items-center justify-center gap-2"
                >
                  <Download size={18} />
                  Download for Android
                </a>
              </Magnetic>
              <p className="text-center text-[10px] text-zinc-600 mt-4 uppercase font-bold tracking-widest">Android 10.0+ (.apk)</p>
            </motion.div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
