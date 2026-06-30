'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, CheckCircle2, ChevronRight, Play, QrCode, Bell, CreditCard, MonitorSmartphone } from 'lucide-react';
import Link from 'next/link';
import { Canvas } from '@react-three/fiber';
import { CafeScene } from '@/components/3d/CafeScene';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function SimulatorPage() {
  const [step, setStep] = useState(0);

  // Auto-advance logic for demo purposes, or we can use manual clicks
  // Let's use manual clicks for better control by the user.

  const nextStep = () => setStep((s) => Math.min(s + 1, 9));
  const prevStep = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <main className="h-[100dvh] overflow-hidden bg-zinc-950 flex flex-col font-sans">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(249,115,22,0.05),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      {/* Header */}
      <header className="h-16 lg:h-20 flex-shrink-0 flex items-center justify-between px-4 lg:px-12 border-b border-white/5 relative z-20 bg-[#06060a]">
        <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors w-10 lg:w-[100px]">
          <ArrowLeft size={20} />
          <span className="font-bold text-sm hidden sm:block">Exit Tour</span>
        </Link>
        <div className="text-white text-lg lg:text-xl font-black tracking-tight flex items-center justify-center">
          QR Dine<span className="text-brand-500">Cloud</span>
          <span className="px-1.5 py-0.5 rounded-full bg-brand-500/10 text-brand-500 text-[9px] lg:text-[10px] uppercase tracking-wider ml-1.5 border border-brand-500/20">Simulator</span>
        </div>
        <div className="w-10 lg:w-[100px]" /> {/* Spacer for centering */}
      </header>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col-reverse lg:flex-row relative z-10 overflow-hidden">
        
        {/* Bottom Area (Mobile) / Left Area (Desktop): Controls & Narrative */}
        <div className="w-full h-[45%] lg:h-full lg:w-[40%] px-5 py-4 lg:p-16 flex flex-col justify-start md:justify-center border-t lg:border-t-0 lg:border-r border-white/[0.04] relative z-20 bg-gradient-to-r from-[#06060a] to-[#111116] lg:to-transparent overflow-y-auto">
          <AnimatePresence mode="wait">
            <Narrative step={step} key={step} />
          </AnimatePresence>

          {/* Controls */}
          <div className="mt-4 lg:mt-12 flex items-center gap-4 flex-shrink-0">
            {step === 0 ? (
              <button 
                onClick={nextStep}
                className="flex items-center gap-2 px-6 py-3 lg:px-8 lg:py-4 rounded-full bg-brand-500 text-white font-bold hover:bg-brand-400 transition-colors shadow-lg shadow-brand-500/30 text-sm lg:text-base"
              >
                <Play fill="currentColor" size={18} />
                Start Tour
              </button>
            ) : (
              <>
                <button 
                  onClick={prevStep}
                  disabled={step === 1}
                  className="px-6 py-3 rounded-full text-zinc-400 font-bold hover:text-white hover:bg-white/5 transition-colors disabled:opacity-30"
                >
                  Back
                </button>
                {step < 9 ? (
                  <button 
                    onClick={nextStep}
                    className="flex items-center gap-2 px-8 py-3 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-colors"
                  >
                    Next Step
                    <ChevronRight size={18} />
                  </button>
                ) : (
                  <a 
                    href="https://qr-dine-cloud.vercel.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-8 py-3 rounded-full bg-brand-500 text-white font-bold hover:bg-brand-400 transition-colors shadow-lg shadow-brand-500/30"
                  >
                    Try Actual Admin
                  </a>
                )}
              </>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mt-4 pb-2 lg:mt-16 flex gap-1 w-full max-w-sm flex-shrink-0">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
              <div key={i} className="h-1.5 flex-1 rounded-full bg-white/[0.05] overflow-hidden">
                <motion.div 
                  className="h-full bg-brand-500"
                  initial={{ width: 0 }}
                  animate={{ width: step >= i ? '100%' : '0%' }}
                  transition={{ duration: 0.5, ease: EASE }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Top Area (Mobile) / Right Area (Desktop): Visual Mockups (3D Canvas) */}
        <div className="w-full h-[55%] lg:h-full lg:w-[60%] relative bg-[#06060a] overflow-hidden">
          <Canvas shadows camera={{ position: [0, 5, 10], fov: 50 }}>
            <CafeScene 
              step={step} 
              mobileUI={<MobileScreen step={step} setStep={setStep} />} 
              tabletUI={<TabletScreen step={step} />} 
              kdsUI={<KDSMockup step={step} />}
            />
          </Canvas>
        </div>

      </div>
    </main>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* 1) NARRATIVE COMPONENT */
/* ─────────────────────────────────────────────────────────────────── */
function Narrative({ step }: { step: number }) {
  const content = [
    {
      label: "Interactive Demo",
      title: "Experience the magic.",
      desc: "See exactly how QR Dine Cloud bridges the gap between your guests and your kitchen in real-time. No fluff, just the actual flow.",
      icon: <Play size={24} className="text-brand-400" />
    },
    {
      label: "Step 1: The Guest Arrives",
      title: "Scan to Start",
      desc: "Guests simply point their camera at the table's QR code. No apps to download, no logins required. The beautiful digital menu loads instantly.",
      icon: <QrCode size={24} className="text-blue-400" />
    },
    {
      label: "Step 2: Browsing the Menu",
      title: "Visual Discovery",
      desc: "High-resolution photos and rich descriptions entice guests. They can easily scroll through categories and discover your best dishes.",
      icon: <MonitorSmartphone size={24} className="text-blue-400" />
    },
    {
      label: "Step 3: Customizing",
      title: "Add to Cart",
      desc: "Guests easily customize their preferences, add modifiers, and drop items into their digital cart without calling a waiter.",
      icon: <CheckCircle2 size={24} className="text-emerald-400" />
    },
    {
      label: "Step 4: The Order",
      title: "Tap to Fire",
      desc: "With a single tap, the order is finalized. A real-time data packet fires straight from the table directly to your kitchen.",
      icon: <CheckCircle2 size={24} className="text-brand-400" />
    },
    {
      label: "Step 5: The Kitchen",
      title: "Instant KDS Sync",
      desc: "Millisecond-level real-time sync. The moment the guest taps 'Order', your kitchen display flashes green and a ticket is instantly generated.",
      icon: <Bell size={24} className="text-amber-400" />
    },
    {
      label: "Step 6: Admin POS",
      title: "Live Dashboard",
      desc: "Track every active order across your entire restaurant from a single pane of glass. Full operational visibility.",
      icon: <MonitorSmartphone size={24} className="text-indigo-400" />
    },
    {
      label: "Step 7: Preparation",
      title: "Status Updates",
      desc: "The kitchen accepts the order with one tap on the KDS. The guest's phone instantly updates to 'Preparing'.",
      icon: <CheckCircle2 size={24} className="text-purple-400" />
    },
    {
      label: "Step 8: Delivery",
      title: "Order Ready",
      desc: "The guest receives a real-time notification on their phone the second the kitchen marks their food as prepared.",
      icon: <CheckCircle2 size={24} className="text-emerald-500" />
    },
    {
      label: "Step 9: The Checkout",
      title: "Zero-Commission Payments",
      desc: "Guests pay via UPI, cards, or net banking securely at their table. The amount drops straight into your bank account—we take 0% commission.",
      icon: <CreditCard size={24} className="text-brand-500" />
    }
  ];

  const current = content[step];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="space-y-6"
    >
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center">
          {current.icon}
        </div>
        <span className="text-sm font-bold tracking-widest uppercase text-zinc-500">{current.label}</span>
      </div>
      <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-tight">
        {current.title}
      </h1>
      <p className="text-xl text-zinc-400 leading-relaxed max-w-lg">
        {current.desc}
      </p>
    </motion.div>
  );
}



/* ─────────────────────────────────────────────────────────────────── */
/* 3) MOBILE MOCKUP CONTENT */
/* ─────────────────────────────────────────────────────────────────── */
function MobileScreen({ step, setStep }: { step: number, setStep: (s: number) => void }) {
  return (
    <div className="w-full h-full relative bg-zinc-50">
      
      {/* Step 0/1: Scan */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: (step === 0 || step === 1) ? 1 : 0 }}
        className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900 cursor-pointer pointer-events-none"
      >
        <div className="relative w-48 h-48 rounded-3xl border-2 border-white/20 p-4 transition-colors">
          <motion.div 
            animate={{ y: [0, 160, 0] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            className="absolute top-4 left-4 right-4 h-1 bg-brand-500 shadow-[0_0_15px_rgba(249,115,22,1)] z-10"
          />
          <QrCode className="w-full h-full text-white/50" />
        </div>
        <p className="text-white mt-8 font-bold animate-pulse">Scanning Table 12...</p>
      </motion.div>

      {/* Step 2-8: Menu & Cart */}
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: (step >= 2 && step <= 8) ? 1 : 0, y: (step >= 2 && step <= 8) ? 0 : 50 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="absolute inset-0 bg-zinc-50 pointer-events-none flex flex-col overflow-hidden"
      >
        {/* Header */}
        <div className="bg-white p-4 shadow-sm flex justify-between items-center z-10 relative">
          <div>
            <h2 className="font-black text-lg text-zinc-900">Cafe Mocha</h2>
            <p className="text-xs text-zinc-500">Table 12</p>
          </div>
          
          <motion.div 
            animate={{ scale: step >= 3 ? [1, 1.2, 1] : 1, backgroundColor: step >= 3 ? "#f97316" : "#f4f4f5" }}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-colors"
          >
            <span className={`font-bold text-sm ${step >= 3 ? 'text-white' : 'text-zinc-900'}`}>{step >= 3 ? '1' : '0'}</span>
          </motion.div>

          {/* Order Ready Notification Overlay */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: step === 8 ? 1 : 0, scale: step === 8 ? 1 : 0.8 }}
            className="absolute top-2 left-2 right-2 bg-emerald-500 rounded-2xl p-4 shadow-xl shadow-emerald-500/20 text-white flex gap-4 items-center z-50 pointer-events-auto"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle2 size={24} className="text-white" />
            </div>
            <div>
              <p className="font-bold leading-tight">Order is Ready!</p>
              <p className="text-xs text-emerald-100">Your food is arriving now.</p>
            </div>
          </motion.div>
        </div>
        
        {/* Menu Items with Scrolling Animation */}
        <motion.div 
          animate={{ y: step === 2 ? -20 : 0 }}
          transition={{ ease: "easeInOut", duration: 2, repeat: step === 2 ? Infinity : 0, repeatType: "reverse" }}
          className="flex-grow p-4 space-y-4"
        >
          <div className="bg-white p-3 rounded-2xl shadow-sm flex gap-4 border border-zinc-100">
            <div className="w-20 h-20 bg-zinc-200 rounded-xl bg-cover bg-center" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80)'}}></div>
            <div className="flex-1 flex flex-col justify-center">
              <h3 className="font-bold text-zinc-900">Classic Burger</h3>
              <p className="text-sm font-semibold text-brand-500 mb-2">₹249</p>
              
              {step >= 3 ? (
                <div className="w-full h-8 rounded-lg bg-zinc-100 flex items-center justify-between px-3">
                  <span className="text-lg font-bold text-zinc-400">-</span>
                  <span className="font-bold text-zinc-900">1</span>
                  <span className="text-lg font-bold text-brand-500">+</span>
                </div>
              ) : (
                <div className="w-24 h-8 rounded-lg bg-brand-50 text-brand-500 flex items-center justify-center text-sm font-bold border border-brand-200">
                  ADD
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Bottom Sheet Cart */}
        <motion.div 
          initial={{ y: "100%" }}
          animate={{ y: (step >= 4 && step <= 7) ? "0%" : "100%" }}
          transition={{ duration: 0.6, ease: EASE }}
          className="bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-6 mt-auto pointer-events-auto"
        >
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-zinc-500">Total</span>
            <span className="font-black text-xl text-zinc-900">₹249</span>
          </div>
          
          <div className="w-full relative">
             <motion.div 
               animate={{ scale: step === 4 ? [1, 0.95, 1] : 1, backgroundColor: step >= 5 ? "#10b981" : "#f97316" }}
               transition={{ duration: 0.3 }}
               className="w-full py-4 rounded-xl flex items-center justify-center text-white font-bold transition-all"
             >
               {step >= 5 ? (step >= 7 ? 'Preparing...' : 'Order Placed') : 'Place Order'}
             </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Step 9: Checkout/Payment */}
      <motion.div 
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: step === 9 ? 1 : 0, x: step === 9 ? 0 : 100 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="absolute inset-0 bg-white flex flex-col items-center justify-center pointer-events-none p-6 z-20"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: step === 7 ? 1 : 0 }}
          transition={{ type: "spring", delay: 0.3 }}
          className="w-24 h-24 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-6"
        >
          <CheckCircle2 size={48} />
        </motion.div>
        <h2 className="text-2xl font-black text-zinc-900 mb-2">Payment Successful</h2>
        <p className="text-zinc-500 text-center mb-10">Thank you for dining with Cafe Mocha.</p>
        
        <div className="w-full bg-zinc-50 rounded-2xl p-4 border border-zinc-100">
          <div className="flex justify-between text-sm mb-2 text-zinc-500">
            <span>Amount Paid</span>
            <span className="font-bold text-zinc-900">₹249.00</span>
          </div>
          <div className="flex justify-between text-sm mb-2 text-zinc-500">
            <span>Method</span>
            <span className="font-bold text-zinc-900">UPI</span>
          </div>
          <div className="flex justify-between text-sm text-zinc-500">
            <span>Table</span>
            <span className="font-bold text-zinc-900">12</span>
          </div>
        </div>
      </motion.div>

    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* 4) TABLET SCREEN CONTENTS */
/* ─────────────────────────────────────────────────────────────────── */
function TabletScreen({ step }: { step: number }) {
  return (
    <div className="w-full h-full bg-[#111116] flex flex-col relative text-zinc-200">
      
      {/* Topbar */}
      <div className="h-14 border-b border-white/[0.05] flex items-center px-6 justify-between bg-[#0a0a0d]">
        <div className="flex items-center gap-4">
          <div className="w-8 h-8 rounded bg-brand-500/20 text-brand-500 flex items-center justify-center font-black text-xs">CM</div>
          <span className="font-bold">Dashboard</span>
        </div>
        <div className="flex items-center gap-4 text-zinc-500">
          <Bell size={18} />
          <div className="w-8 h-8 rounded-full bg-zinc-800" />
        </div>
      </div>

      <div className="flex-grow flex p-6 gap-6 overflow-hidden">
        
        {/* Sidebar Nav (Mock) */}
        <div className="w-48 space-y-2">
          <div className="px-4 py-2 rounded-lg bg-brand-500/10 text-brand-400 font-bold text-sm">Active Orders</div>
          <div className="px-4 py-2 rounded-lg text-zinc-500 font-medium text-sm">Table Management</div>
          <div className="px-4 py-2 rounded-lg text-zinc-500 font-medium text-sm">Menu Builder</div>
          <div className="px-4 py-2 rounded-lg text-zinc-500 font-medium text-sm">Analytics</div>
        </div>

        {/* Main Orders Area */}
        <div className="flex-grow bg-[#0a0a0d] rounded-2xl border border-white/[0.05] p-6 relative overflow-hidden">
          <h2 className="text-xl font-bold text-white mb-6">Live Admin Terminal</h2>

          {/* Empty state before step 5 */}
          <motion.div 
            animate={{ opacity: step < 5 ? 1 : 0 }}
            className="absolute inset-0 flex items-center justify-center flex-col text-zinc-600 z-0"
          >
            <div className="w-16 h-16 rounded-full bg-zinc-900 mb-4 flex items-center justify-center">
              <Bell size={24} />
            </div>
            <p>Waiting for orders...</p>
          </motion.div>

          {/* New Order Appears at Step 5 */}
          <motion.div
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: step >= 5 ? 1 : 0, x: step >= 5 ? 0 : -50, scale: step >= 5 ? 1 : 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative z-10 w-[280px] bg-[#1a1a24] rounded-xl border border-white/[0.1] shadow-2xl flex flex-col"
          >
            {/* Ping animation */}
            {step === 5 && (
              <motion.div 
                initial={{ opacity: 1, scale: 1 }}
                animate={{ opacity: 0, scale: 2 }}
                transition={{ duration: 1 }}
                className="absolute -inset-1 bg-brand-500 rounded-xl z-[-1]"
              />
            )}

            <div className="p-4 border-b border-white/[0.05] bg-[#22222e] rounded-t-xl flex justify-between items-center">
              <span className="font-black text-white">Table 12</span>
              <span className={`text-xs text-white px-2 py-1 rounded font-bold uppercase ${step >= 7 ? 'bg-emerald-500' : 'bg-brand-500'}`}>
                {step >= 7 ? 'PREPARING' : 'NEW'}
              </span>
            </div>
            
            <div className="p-4 space-y-4 flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <span className="font-bold text-brand-400 mr-2">1x</span>
                  <span className="font-medium text-white">Classic Burger</span>
                </div>
                <span className="text-zinc-500 text-sm">₹249</span>
              </div>
            </div>

            {/* Status updates in Step 7 */}
            <div className="p-4 pt-0">
              <motion.div 
                animate={{ backgroundColor: step >= 7 ? "#10b981" : "#3b82f6" }}
                className="w-full py-2 rounded-lg flex items-center justify-center text-white text-sm font-bold"
              >
                {step >= 7 ? 'Ready for Pickup' : 'Accept Order'}
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────── */
/* 5) KDS MOCKUP CONTENT (Kitchen Display System) */
/* ─────────────────────────────────────────────────────────────────── */
function KDSMockup({ step }: { step: number }) {
  return (
    <div className="w-full h-full relative bg-[#12121a] text-white p-4 font-sans flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 pb-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <h2 className="font-bold text-lg tracking-tight">KDS Active</h2>
        </div>
        <div className="text-zinc-400 font-mono text-sm">
          {step >= 5 ? "1 Pending Order" : "0 Pending Orders"}
        </div>
      </div>

      {/* Ticket Grid */}
      <div className="flex-grow flex gap-4 overflow-hidden">
        <AnimatePresence>
          {step >= 5 && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, x: -50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className={`w-64 bg-[#1a1a24] rounded-xl border-l-4 shadow-2xl flex flex-col overflow-hidden ${step >= 7 ? 'border-l-emerald-500' : 'border-l-brand-500'}`}
            >
              {/* Ticket Header */}
              <div className="bg-[#22222f] p-3 flex justify-between items-center">
                <span className="font-black text-xl text-white">Table 12</span>
                <span className={`px-2 py-1 rounded text-xs font-bold ${step >= 7 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-brand-500/20 text-brand-400'}`}>
                  {step >= 7 ? 'Cooking' : 'New'}
                </span>
              </div>
              
              {/* Ticket Body */}
              <div className="p-4 flex-grow flex flex-col gap-3">
                <div className="flex justify-between items-start text-zinc-300">
                  <span className="font-bold text-lg">1x Classic Burger</span>
                </div>
                <div className="flex justify-between items-start text-zinc-500 text-sm border-t border-white/5 pt-2 mt-2">
                  <span>Dine In</span>
                  <span className="font-mono text-brand-400 animate-pulse">00:00</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {step < 5 && (
          <div className="w-full h-full flex flex-col items-center justify-center text-zinc-600">
            <Bell size={48} className="mb-4 opacity-20" />
            <p className="font-medium text-lg">Waiting for orders...</p>
          </div>
        )}
      </div>
    </div>
  );
}
