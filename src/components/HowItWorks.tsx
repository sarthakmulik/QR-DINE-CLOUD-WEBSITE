'use client';

// Typed cubic-bezier tuple required by framer-motion v12
const EASE_OUT_SPRING: [number, number, number, number] = [0.16, 1, 0.3, 1];

import { motion } from 'framer-motion';
import { ScanLine, Smartphone, ChefHat } from 'lucide-react';

const steps = [
  {
    icon: ScanLine,
    number: '01',
    title: 'Setup in Minutes',
    description:
      'Upload your logo, build your menu in our dashboard, and generate QR codes for every table. No tech skills needed.',
    glowColor: 'rgba(249,115,22,0.25)',
    iconBg: 'bg-brand-500/15 border-brand-500/20 text-brand-400',
    iconGlow: '0 8px 32px rgba(249,115,22,0.25)',
  },
  {
    icon: Smartphone,
    number: '02',
    title: 'Customers Scan & Order',
    description:
      'Guests scan the table QR code with their own phone and browse your stunning digital menu — no app download needed.',
    glowColor: 'rgba(251,191,36,0.2)',
    iconBg: 'bg-amber-500/15 border-amber-500/20 text-amber-400',
    iconGlow: '0 8px 32px rgba(251,191,36,0.25)',
  },
  {
    icon: ChefHat,
    number: '03',
    title: 'Kitchen Gets Notified',
    description:
      'Orders print instantly to your thermal printer and staff receive push notifications. Zero confusion, maximum speed.',
    glowColor: 'rgba(234,88,12,0.25)',
    iconBg: 'bg-brand-600/15 border-brand-600/20 text-brand-300',
    iconGlow: '0 8px 32px rgba(234,88,12,0.25)',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.18 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_SPRING } },
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-[#0a0a0e]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:44px_44px]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-48 bg-brand-500/[0.04] blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <div className="mb-6">
            <span className="section-label">Simple Process</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Up and running in{' '}
            <span className="shimmer-text">15 minutes.</span>
          </h2>
          <p className="text-zinc-600 mt-4 max-w-lg mx-auto">
            No technical knowledge. No expensive hardware. Just pure simplicity.
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
          className="relative grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-[68px] left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px bg-gradient-to-r from-brand-500/20 via-amber-500/30 to-brand-500/20" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="relative group"
            >
              <div className="bg-[#111116] border border-white/[0.06] rounded-3xl p-8 h-full hover:border-brand-500/20 transition-all duration-500 hover:bg-[#15151c]">
                {/* Step number watermark */}
                <div className="text-6xl md:text-8xl font-black text-white/[0.03] absolute top-4 right-6 leading-none select-none pointer-events-none">
                  {step.number}
                </div>

                {/* Icon */}
                <div
                  className={`relative w-14 h-14 rounded-2xl border flex items-center justify-center mb-6 ${step.iconBg}`}
                  style={{ boxShadow: step.iconGlow }}
                >
                  <step.icon size={26} />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                <p className="text-zinc-500 leading-relaxed text-sm">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
