'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Magnetic from '@/components/Magnetic';

export default function ContactPage() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate form submission
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <main className="min-h-screen bg-[#08080a] relative overflow-hidden flex flex-col pt-24 pb-16">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(249,115,22,0.1),transparent)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex-grow flex flex-col">
        
        {/* Back button */}
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-12 transition-colors w-fit">
          <ArrowLeft size={20} />
          <span className="font-semibold text-sm">Back to Home</span>
        </Link>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="mb-6">
              <span className="section-label">Get in Touch</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-6">
              Let's scale your <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-amber-500">restaurant.</span>
            </h1>
            <p className="text-xl text-zinc-400 mb-12 leading-relaxed">
              Have questions about the platform? Need a custom enterprise plan? Or just want to say hi? We're here to help you transition to Cloud Nine.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 text-brand-400 flex items-center justify-center flex-shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Email Us</h3>
                  <a href="mailto:qrdinecloud@gmail.com" className="text-zinc-400 hover:text-brand-400 transition-colors">
                    qrdinecloud@gmail.com
                  </a>
                  <p className="text-zinc-500 text-sm mt-1">We typically reply within 2 hours.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Call Us</h3>
                  <p className="text-zinc-400">Available Mon-Sat, 9AM - 8PM</p>
                  <p className="text-zinc-500 text-sm mt-1">Schedule a callback via email.</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-1">Headquarters</h3>
                  <p className="text-zinc-400">Pune, Maharashtra</p>
                  <p className="text-zinc-500 text-sm mt-1">India</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="glass-md rounded-[2.5rem] p-8 md:p-10 border border-white/[0.08]"
          >
            {formState === 'success' ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Send size={32} />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
                <p className="text-zinc-400 mb-8">We've received your inquiry and will get back to you shortly.</p>
                <button 
                  onClick={() => setFormState('idle')}
                  className="px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 text-white font-semibold transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-300">Your Name</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="John Doe"
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-500/50 focus:bg-brand-500/[0.02] transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-zinc-300">Restaurant Name</label>
                    <input 
                      required 
                      type="text" 
                      placeholder="Cafe Mocha"
                      className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-500/50 focus:bg-brand-500/[0.02] transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-300">Email Address</label>
                  <input 
                    required 
                    type="email" 
                    placeholder="john@cafemocha.com"
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-500/50 focus:bg-brand-500/[0.02] transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-zinc-300">Message</label>
                  <textarea 
                    required 
                    rows={4}
                    placeholder="How can we help you?"
                    className="w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-brand-500/50 focus:bg-brand-500/[0.02] transition-all resize-none"
                  />
                </div>

                <Magnetic>
                  <button 
                    disabled={formState === 'submitting'}
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-brand-600 to-amber-500 hover:from-brand-500 hover:to-amber-400 transition-all shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed block"
                  >
                    {formState === 'submitting' ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Send Message
                        <Send size={18} />
                      </>
                    )}
                  </button>
                </Magnetic>
              </form>
            )}
          </motion.div>

        </div>
      </div>
    </main>
  );
}
