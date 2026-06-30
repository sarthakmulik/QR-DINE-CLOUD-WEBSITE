'use client';

// Typed cubic-bezier tuple required by framer-motion v12
const EASE_OUT_SPRING: [number, number, number, number] = [0.16, 1, 0.3, 1];

import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Arjun Mehta',
    role: 'Owner, The Spice Route',
    rating: 5,
    text: 'QR Dine Cloud transformed our operations completely. Order errors dropped to zero and our staff can actually focus on hospitality instead of running back to take orders.',
    initials: 'AM',
    gradient: 'from-brand-500 to-amber-400',
  },
  {
    name: 'Priya Verma',
    role: 'Manager, Café Mocha',
    rating: 5,
    text: "Setup took us literally 12 minutes. The QR menus look incredibly premium and customers always comment on how smooth the experience is. Best investment we've made this year.",
    initials: 'PV',
    gradient: 'from-amber-500 to-brand-500',
  },
  {
    name: 'Rohit Kapoor',
    role: 'Director, Urban Plates (3 outlets)',
    rating: 5,
    text: "We run 3 outlets with QR Dine Cloud. The centralized dashboard is phenomenal — I monitor all tables, menus, and staff across every location in real-time from my phone.",
    initials: 'RK',
    gradient: 'from-brand-600 to-amber-500',
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_SPRING } },
};

export function Testimonials() {
  return (
    <section className="py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#0a0a0e]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-56 bg-brand-500/[0.04] blur-[120px]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <div className="mb-6">
            <span className="section-label">What Restaurants Say</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Loved by <span className="shimmer-text">500+ restaurants.</span>
          </h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((t, index) => (
            <motion.div key={index} variants={cardVariants} className="group">
              <div className="bg-[#111116] border border-white/[0.06] rounded-3xl p-8 h-full flex flex-col relative overflow-hidden hover:border-brand-500/20 transition-all duration-500">
                {/* Corner gradient glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-brand-500/[0.08] to-transparent pointer-events-none" />

                {/* Quote icon */}
                <Quote size={28} className="text-brand-500/20 mb-5 flex-shrink-0" />

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={13} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>

                {/* Text */}
                <p className="text-zinc-400 leading-relaxed mb-7 flex-grow text-sm">
                  &ldquo;{t.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 border-t border-white/[0.05] pt-5 mt-auto">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br ${t.gradient} flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}
                  >
                    {t.initials}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">{t.name}</div>
                    <div className="text-zinc-600 text-xs">{t.role}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
