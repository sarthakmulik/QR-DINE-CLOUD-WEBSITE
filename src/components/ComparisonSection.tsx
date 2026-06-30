'use client';

import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const EASE_OUT_SPRING: [number, number, number, number] = [0.16, 1, 0.3, 1];

const features = [
  { name: 'Commissions per order', us: '0%', aggregators: '20-30%', traditional: 'N/A (Monthly Fees)' },
  { name: 'Setup Time', us: '15 Minutes', aggregators: 'Weeks', traditional: 'Days' },
  { name: 'Customer Data Ownership', us: '100% Yours', aggregators: 'They Keep It', traditional: 'Varies' },
  { name: 'Menu Updates', us: 'Instant (Real-time)', aggregators: 'Requires Approval', traditional: 'Manual Sync' },
  { name: 'Hardware Required', us: 'Just a Phone/Tablet', aggregators: 'Dedicated Tablets', traditional: 'Expensive Terminals' },
];

export function ComparisonSection() {
  return (
    <section className="py-24 relative overflow-hidden" id="comparison">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: EASE_OUT_SPRING }}
          className="text-center mb-16"
        >
          <div className="mb-6 flex justify-center">
            <span className="section-label">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              The Cloud Nine Advantage
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">
            Why restaurants are <span className="shimmer-text">switching.</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Stop giving away your margins. Take back control of your customer experience and your revenue.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: EASE_OUT_SPRING }}
          className="relative overflow-x-auto glass-md rounded-3xl border border-white/[0.08]"
        >
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-white/[0.08]">
                <th className="p-6 text-lg font-semibold text-zinc-300 w-1/4">Feature</th>
                <th className="p-6 text-xl font-bold text-white w-1/4 bg-brand-500/[0.05] relative overflow-hidden">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-500 to-amber-500" />
                  QR Dine Cloud
                </th>
                <th className="p-6 text-lg font-semibold text-zinc-500 w-1/4">Food Aggregators</th>
                <th className="p-6 text-lg font-semibold text-zinc-500 w-1/4">Traditional POS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {features.map((feature, i) => (
                <tr key={i} className="hover:bg-white/[0.01] transition-colors">
                  <td className="p-6 text-zinc-400 font-medium">{feature.name}</td>
                  <td className="p-6 text-white font-bold bg-brand-500/[0.02] flex items-center gap-3">
                    <Check className="text-brand-400" size={20} />
                    {feature.us}
                  </td>
                  <td className="p-6 text-zinc-500">
                    <div className="flex items-center gap-3">
                      <X className="text-red-500/50" size={18} />
                      {feature.aggregators}
                    </div>
                  </td>
                  <td className="p-6 text-zinc-500">
                    <div className="flex items-center gap-3">
                      <X className="text-red-500/50" size={18} />
                      {feature.traditional}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

      </div>
    </section>
  );
}
