'use client';

import { motion } from 'framer-motion';
import { MessageSquare, FileText, CheckCircle2 } from 'lucide-react';
import Magnetic from './Magnetic';

export function ConciergeSection() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 -mt-16 mb-32">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.7 }}
        className="relative overflow-hidden rounded-[2.5rem] bg-[#111116] border border-white/[0.08] p-8 md:p-12 shadow-2xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-brand-500/[0.05] to-purple-500/[0.05] pointer-events-none" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/10 blur-[80px] rounded-full pointer-events-none" />

        <div className="grid md:grid-cols-2 gap-10 items-center relative z-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-xs font-bold uppercase tracking-wider mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              White-Glove Onboarding
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white tracking-tight mb-4">
              Too busy to set it up? <br />
              <span className="text-zinc-400 font-medium">We'll do it for free.</span>
            </h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-8">
              We know you run a restaurant, not an IT department. Send us a WhatsApp photo of your physical menu, and our team will digitize it, organize your categories, and have you ready to launch in 24 hours.
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-center gap-3 text-zinc-300 font-medium">
                <CheckCircle2 className="text-emerald-500" size={20} /> Menu Digitization Included
              </li>
              <li className="flex items-center gap-3 text-zinc-300 font-medium">
                <CheckCircle2 className="text-emerald-500" size={20} /> Table QR Codes Generated
              </li>
              <li className="flex items-center gap-3 text-zinc-300 font-medium">
                <CheckCircle2 className="text-emerald-500" size={20} /> Free Staff Training Session
              </li>
            </ul>

            <Magnetic>
              <a 
                href="https://wa.me/910000000000" // Replace with actual WhatsApp number
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-colors shadow-xl"
              >
                <MessageSquare size={18} />
                Send Menu via WhatsApp
              </a>
            </Magnetic>
          </div>

          {/* Visual Graphic */}
          <div className="relative flex justify-center">
            <div className="w-full max-w-sm aspect-square relative perspective-1000">
              {/* Paper Menu */}
              <motion.div 
                initial={{ rotateZ: -10, x: -20, opacity: 0 }}
                whileInView={{ rotateZ: -10, x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute inset-0 bg-zinc-100 rounded-xl shadow-2xl p-6 origin-bottom-left"
              >
                <FileText className="text-zinc-300 w-12 h-12 mb-4" />
                <div className="w-2/3 h-4 bg-zinc-200 rounded mb-4" />
                <div className="space-y-2">
                  <div className="w-full h-2 bg-zinc-200 rounded" />
                  <div className="w-5/6 h-2 bg-zinc-200 rounded" />
                  <div className="w-4/6 h-2 bg-zinc-200 rounded" />
                </div>
              </motion.div>

              {/* Digital Transformation Arrow */}
              <motion.div 
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-brand-500 flex items-center justify-center text-white z-10 shadow-[0_0_30px_rgba(249,115,22,0.5)]"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"/>
                </svg>
              </motion.div>

              {/* Mobile Phone Mockup */}
              <motion.div 
                initial={{ rotateZ: 5, x: 20, opacity: 0 }}
                whileInView={{ rotateZ: 5, x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="absolute inset-y-4 right-0 w-3/4 bg-[#1a1a24] rounded-3xl border-8 border-[#2a2a35] shadow-2xl overflow-hidden origin-bottom-right"
              >
                <div className="w-full h-12 bg-white flex items-center px-4 mb-2">
                  <span className="font-bold text-black text-sm">Digital Menu</span>
                </div>
                <div className="px-4 space-y-3">
                  <div className="w-full h-16 bg-white/[0.05] rounded-xl flex items-center p-2 gap-3">
                    <div className="w-12 h-12 bg-white/10 rounded-lg" />
                    <div className="space-y-2 flex-1">
                      <div className="w-2/3 h-2 bg-white/20 rounded" />
                      <div className="w-1/3 h-2 bg-brand-500/50 rounded" />
                    </div>
                  </div>
                  <div className="w-full h-16 bg-white/[0.05] rounded-xl flex items-center p-2 gap-3">
                    <div className="w-12 h-12 bg-white/10 rounded-lg" />
                    <div className="space-y-2 flex-1">
                      <div className="w-3/4 h-2 bg-white/20 rounded" />
                      <div className="w-1/4 h-2 bg-brand-500/50 rounded" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
