'use client';

import { useEffect, useRef } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const stats = [
  { value: 500, suffix: '+', label: 'Restaurants', sub: 'Across India' },
  { value: 0, prefix: '₹', label: 'Commissions', sub: 'Keep 100% revenue' },
  { value: 15, suffix: ' min', label: 'Setup Time', sub: 'Start in minutes' },
  { value: 99.9, suffix: '%', label: 'Uptime', sub: 'Rock-solid reliability' },
];

interface CounterProps {
  to: number;
  prefix?: string;
  suffix?: string;
  started: boolean;
}

function Counter({ to, prefix = '', suffix = '', started }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!started || !ref.current) return;
    const node = ref.current;
    
    const controls = animate(0, to, {
      duration: 2,
      ease: [0.16, 1, 0.3, 1], // Custom spring-like easing
      onUpdate(value) {
        node.textContent = prefix + (to % 1 !== 0 ? value.toFixed(1) : Math.floor(value)) + suffix;
      }
    });
    
    return () => controls.stop();
  }, [started, to, prefix, suffix]);

  return <span ref={ref}>{prefix}0{suffix}</span>;
}

export function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-[#08080a]" />
      {/* Ambient glows */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1/2 h-64 bg-brand-500/[0.05] blur-[120px] rounded-full" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-48 bg-amber-500/[0.04] blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              className="text-center"
            >
              <div
                className="text-4xl md:text-6xl font-black mb-2"
                style={{
                  background: 'linear-gradient(135deg, #f97316, #fbbf24)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                <Counter
                  to={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  started={isInView}
                />
              </div>
              <div className="text-white font-bold text-lg mb-1">{stat.label}</div>
              <div className="text-zinc-600 text-sm">{stat.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
