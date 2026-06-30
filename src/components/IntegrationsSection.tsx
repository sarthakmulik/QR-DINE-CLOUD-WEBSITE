'use client';

import { motion } from 'framer-motion';
import { Smartphone, Printer, CreditCard, Wifi } from 'lucide-react';

const EASE_OUT_SPRING: [number, number, number, number] = [0.16, 1, 0.3, 1];

const integrations = [
  {
    icon: <Printer size={32} />,
    title: 'Thermal Printers',
    desc: 'Seamlessly connects to EPSON, Star Micronics, and generic Bluetooth/WiFi thermal printers for instant KOTs.',
  },
  {
    icon: <CreditCard size={32} />,
    title: 'Payment Gateways',
    desc: 'Native integrations with PhonePe, Razorpay, and direct UPI for instant 0% commission payouts.',
  },
  {
    icon: <Smartphone size={32} />,
    title: 'Mobile Devices',
    desc: 'The Admin Dashboard runs flawlessly on any iOS or Android smartphone or tablet.',
  },
  {
    icon: <Wifi size={32} />,
    title: 'Cloud Sync',
    desc: 'Real-time WebSocket connections ensure all devices are synced instantly without refreshing.',
  },
];

export function IntegrationsSection() {
  return (
    <section className="py-24 relative overflow-hidden" id="integrations">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: EASE_OUT_SPRING }}
          >
            <div className="mb-6">
              <span className="section-label">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                Plug & Play Hardware
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6 leading-tight">
              Works with the gear you <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-brand-400">already own.</span>
            </h2>
            <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
              No need to buy expensive proprietary terminals. QR Dine Cloud is designed to be hardware-agnostic. Use your existing smartphones, tablets, and thermal printers.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {integrations.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors"
                >
                  <div className="text-brand-400 mb-4 bg-brand-500/10 w-12 h-12 rounded-xl flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 1, ease: EASE_OUT_SPRING }}
            className="relative perspective-1000"
          >
            {/* Visual representation of connected hardware */}
            <div className="relative w-full aspect-square md:aspect-[4/3] rounded-3xl glass-md border border-white/[0.1] overflow-hidden p-8 flex items-center justify-center">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]" />
              
              {/* Central Hub */}
              <div className="relative z-10 w-24 h-24 rounded-full bg-brand-500 flex items-center justify-center shadow-[0_0_40px_rgba(249,115,22,0.4)] animate-pulse-slow">
                <Wifi size={40} className="text-white" />
              </div>

              {/* Connections */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ filter: 'drop-shadow(0 0 8px rgba(59,130,246,0.5))' }}>
                <path d="M 50% 50% L 20% 30%" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="text-blue-500/50 animate-dash" />
                <path d="M 50% 50% L 80% 30%" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="text-blue-500/50 animate-dash" />
                <path d="M 50% 50% L 50% 80%" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="text-blue-500/50 animate-dash" />
              </svg>

              {/* Floating Nodes */}
              <div className="absolute top-[20%] left-[10%] w-16 h-16 rounded-2xl bg-[#1a1a24] border border-white/10 flex items-center justify-center shadow-xl">
                <Printer size={24} className="text-zinc-300" />
              </div>
              <div className="absolute top-[20%] right-[10%] w-16 h-16 rounded-2xl bg-[#1a1a24] border border-white/10 flex items-center justify-center shadow-xl">
                <Smartphone size={24} className="text-zinc-300" />
              </div>
              <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 w-16 h-16 rounded-2xl bg-[#1a1a24] border border-white/10 flex items-center justify-center shadow-xl">
                <CreditCard size={24} className="text-zinc-300" />
              </div>

            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
