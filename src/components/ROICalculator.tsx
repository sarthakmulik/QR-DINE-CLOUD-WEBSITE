'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export function ROICalculator() {
  const [ordersPerDay, setOrdersPerDay] = useState(50);
  const [avgOrderValue, setAvgOrderValue] = useState(500);

  // Constants
  const aggregatorCommissionRate = 0.25; // 25%
  const daysInYear = 365;
  const qrDineProAnnualCost = 35988; // 2999 * 12

  // Calculations
  const dailyRevenue = ordersPerDay * avgOrderValue;
  const annualRevenue = dailyRevenue * daysInYear;
  const aggregatorTax = annualRevenue * aggregatorCommissionRate;
  const savings = aggregatorTax - qrDineProAnnualCost;

  return (
    <section className="py-24 relative overflow-hidden bg-[#08080a]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(249,115,22,0.05),transparent_50%)] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="text-center mb-16">
          <div className="mb-6 flex justify-center">
            <span className="section-label text-red-500 border-red-500/20 bg-red-500/10">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              The Aggregator Tax
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-6">
            Calculate your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-amber-500">true losses.</span>
          </h2>
          <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
            Food aggregators take up to 30% of your hard-earned revenue. See exactly how much money you're leaving on the table every year.
          </p>
        </div>

        <div className="glass-md rounded-[2.5rem] border border-white/[0.08] p-8 md:p-12">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            
            {/* Left: Sliders */}
            <div className="space-y-10">
              {/* Slider 1 */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="text-sm font-bold tracking-widest uppercase text-zinc-400">Orders per day</label>
                  <span className="text-2xl font-black text-white">{ordersPerDay}</span>
                </div>
                <input 
                  type="range" 
                  min="10" 
                  max="500" 
                  step="10"
                  value={ordersPerDay} 
                  onChange={(e) => setOrdersPerDay(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                />
              </div>

              {/* Slider 2 */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="text-sm font-bold tracking-widest uppercase text-zinc-400">Avg. Order Value (₹)</label>
                  <span className="text-2xl font-black text-white">₹{avgOrderValue}</span>
                </div>
                <input 
                  type="range" 
                  min="100" 
                  max="3000" 
                  step="50"
                  value={avgOrderValue} 
                  onChange={(e) => setAvgOrderValue(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
                />
              </div>
            </div>

            {/* Right: Results */}
            <div className="bg-[#111116] rounded-3xl p-8 border border-white/[0.05] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[50px] rounded-full pointer-events-none" />
              
              <div className="mb-8 relative z-10">
                <p className="text-sm font-bold tracking-widest uppercase text-zinc-500 mb-2">You lose to aggregators (25%)</p>
                <div className="text-4xl md:text-6xl font-black text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                  ₹{Math.round(aggregatorTax).toLocaleString('en-IN')}
                  <span className="text-xl text-red-500/50 ml-2">/ yr</span>
                </div>
              </div>

              <div className="mb-8 pb-8 border-b border-white/[0.05] relative z-10">
                <p className="text-sm font-bold tracking-widest uppercase text-zinc-500 mb-2">QR Dine Cloud (Pro Plan)</p>
                <div className="text-3xl font-black text-zinc-300">
                  ₹{qrDineProAnnualCost.toLocaleString('en-IN')}
                  <span className="text-base text-zinc-500 ml-2">/ yr (Flat)</span>
                </div>
              </div>

              <div className="relative z-10">
                <p className="text-sm font-bold tracking-widest uppercase text-emerald-500 mb-2">Your Annual Savings</p>
                <motion.div 
                  key={savings}
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-3xl md:text-5xl font-black text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.3)]"
                >
                  ₹{Math.round(savings > 0 ? savings : 0).toLocaleString('en-IN')}
                </motion.div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
