'use client';

// Typed cubic-bezier tuple required by framer-motion v12
const EASE_OUT_SPRING: [number, number, number, number] = [0.16, 1, 0.3, 1];

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from 'framer-motion';
import {
  QrCode,
  Printer,
  Bell,
  ArrowRight,
  ChevronDown,
  CheckCircle2,
  TrendingUp,
  Zap,
  ShieldCheck,
  Play,
  Download,
} from 'lucide-react';

import { Navigation }     from '@/components/Navigation';
import { Footer }         from '@/components/Footer';
import { ParticleField }  from '@/components/ParticleField';
import { HowItWorks }     from '@/components/HowItWorks';
import { StatsSection }   from '@/components/StatsSection';
import { Testimonials }   from '@/components/Testimonials';
import { DashboardMockup } from '@/components/DashboardMockup';
import Magnetic            from '@/components/Magnetic';
import { ComparisonSection } from '@/components/ComparisonSection';
import { IntegrationsSection } from '@/components/IntegrationsSection';
import { ROICalculator } from '@/components/ROICalculator';
import { ConciergeSection } from '@/components/ConciergeSection';

/* ─────────────────────── DATA ─────────────────────── */

const faqs = [
  {
    question: 'Do I need special hardware to use QR Dine Cloud?',
    answer:
      'No! Your customers can order directly from their own smartphones. For your staff, our dashboard works on any standard tablet, laptop, or phone. You can optionally connect a standard thermal printer for automated KOTs.',
  },
  {
    question: 'How long does it take to set up?',
    answer:
      'You can be up and running in less than 15 minutes. Just upload your logo, add your menu items, generate your QR codes from our dashboard, and you\'re ready to serve your first customer.',
  },
  {
    question: 'Are there any hidden fees or commissions per order?',
    answer:
      'Absolutely zero commissions. Unlike traditional delivery apps, we charge a flat monthly fee for our software. 100% of your revenue goes directly into your pocket.',
  },
  {
    question: 'Can I update my menu during service?',
    answer:
      'Yes! Updates to pricing, availability, and menu items reflect instantly across all scanned QR menus. Mark an item out of stock with one click, and customers will immediately see the change.',
  },
];

const plans = [
  {
    name: 'Basic',
    desc: 'Perfect for small cafes.',
    monthly: 999,
    annual: 799,
    features: [
      { text: 'Digital Menus',       ok: true },
      { text: 'Basic QR Ordering',   ok: true },
      { text: 'Web Dashboard',       ok: true },
      { text: 'Thermal Printing',    ok: false },
      { text: 'Staff Notifications', ok: false },
    ],
    cta: 'Contact Sales',
    href: 'mailto:qrdinecloud@gmail.com',
    popular: false,
  },
  {
    name: 'Pro',
    desc: 'Best for standard restaurants.',
    monthly: 2999,
    annual: 2399,
    features: [
      { text: 'Everything in Basic',     ok: true },
      { text: 'Thermal Printer Support', ok: true },
      { text: 'Staff Notifications',     ok: true },
      { text: 'KOT Management',          ok: true },
      { text: 'Advanced Analytics',      ok: false },
    ],
    cta: 'Get Started Now',
    href: 'mailto:qrdinecloud@gmail.com',
    popular: true,
  },
  {
    name: 'Elite',
    desc: 'For premium & multi-outlet setups.',
    monthly: 4499,
    annual: 3599,
    features: [
      { text: 'Everything in Pro',    ok: true },
      { text: 'Advanced Analytics',   ok: true },
      { text: 'Multiple Outlets',     ok: true },
      { text: 'Custom Branding',      ok: true },
      { text: '24/7 Priority Support',ok: true },
    ],
    cta: 'Contact Sales',
    href: 'mailto:qrdinecloud@gmail.com',
    popular: false,
  },
];

const marqueeRestaurants = [
  'The Spice Route', 'Café Mocha', 'Urban Plates', 'Bistro 44',
  'Golden Dragon', 'Pizza Nova', 'Sushi Sensation', 'The Daily Grind',
  'Burger Bar', 'Green Leaf Vegan',
];

/* ─────────────────── 3-D TILT CARD ─────────────────── */

function TiltCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 300, damping: 40 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-5, 5]), { stiffness: 300, damping: 40 });

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <div style={{ perspective: '1000px' }}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}

/* ─────────────────────── PAGE ─────────────────────── */

export default function Home() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [annual, setAnnual] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX - window.innerWidth / 2);
      mouseY.set(e.clientY - window.innerHeight / 2);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const orbX1 = useSpring(useTransform(mouseX, [-1000, 1000], [30, -30]), { stiffness: 50, damping: 20 });
  const orbY1 = useSpring(useTransform(mouseY, [-1000, 1000], [30, -30]), { stiffness: 50, damping: 20 });
  const orbX2 = useSpring(useTransform(mouseX, [-1000, 1000], [-40, 40]), { stiffness: 40, damping: 25 });
  const orbY2 = useSpring(useTransform(mouseY, [-1000, 1000], [-40, 40]), { stiffness: 40, damping: 25 });

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 700], [0, -90]);

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_SPRING } },
  };

  return (
    <>
      <Navigation />
      <main className="flex-grow overflow-hidden relative">
        {/* Global Spotlight */}
        <div 
          className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(249,115,22,0.06), transparent 40%)`
          }}
        />

        {/* ══════════════════ HERO ══════════════════ */}
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
          <ParticleField />

          {/* Layered backgrounds */}
          <div className="absolute inset-0 bg-[#08080a]" />
          {/* Rich warm radial — mimics restaurant spotlight */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_60%_at_50%_-10%,rgba(249,115,22,0.15),rgba(245,158,11,0.04)_50%,transparent)]" />
          {/* QR-code-inspired dot matrix texture */}
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.018)_1px,transparent_1px)] bg-[size:28px_28px]" />
          {/* Subtle diagonal grid overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:56px_56px]" />

          {/* Floating orbs — richer, warmer with Parallax */}
          <motion.div style={{ x: orbX1, y: orbY1 }} className="absolute top-[20%] left-[8%] w-96 h-96 bg-brand-500/[0.11] rounded-full blur-[160px] animate-aurora pointer-events-none" />
          <motion.div style={{ x: orbX2, y: orbY2 }} className="absolute bottom-[15%] right-[6%] w-72 h-72 bg-amber-400/[0.08] rounded-full blur-[140px] animate-aurora [animation-delay:5s] pointer-events-none" />
          <motion.div style={{ x: orbX1, y: orbY2 }} className="absolute top-[60%] left-[40%] w-48 h-48 bg-brand-600/[0.06] rounded-full blur-[100px] animate-aurora [animation-delay:8s] pointer-events-none" />

          <motion.div
            style={{ y: heroY }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-28 pb-16 w-full"
          >
            <div className="text-center max-w-5xl mx-auto">

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-brand-500/[0.08] border border-brand-500/[0.2] text-brand-400 text-xs font-bold mb-10 uppercase tracking-[0.15em]"
              >
                <span className="relative flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-500" />
                </span>
                The Future of Dining — Now in India
              </motion.div>

              {/* H1 */}
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, delay: 0.08, ease: EASE_OUT_SPRING }}
                className="text-5xl sm:text-6xl md:text-[88px] font-black text-white tracking-[-0.03em] leading-[0.9] mb-8"
              >
                Run your restaurant
                <br />
                on{' '}
                <span className="shimmer-text">Cloud Nine.</span>
              </motion.h1>

              {/* Subtitle */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.22 }}
                className="text-lg md:text-xl text-zinc-500 mb-10 max-w-2xl mx-auto leading-relaxed"
              >
                QR menus, instant thermal printing, real-time staff notifications — all in one
                powerful platform. Zero commissions. Zero complexity.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.34 }}
                className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4 mb-14"
              >
                <Magnetic>
                  <Link
                    href="/simulator"
                    id="hero-cta-simulator"
                    className="group relative w-full sm:w-auto px-8 py-4 rounded-full text-white font-bold text-base overflow-hidden block"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-amber-500 group-hover:from-brand-500 group-hover:to-amber-400 transition-all duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-amber-500 blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
                    <span className="relative flex items-center justify-center gap-2">
                      <Play size={18} fill="currentColor" />
                      Take Virtual Tour
                      <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200 ml-1" />
                    </span>
                  </Link>
                </Magnetic>

                <Magnetic>
                  <a
                    href="https://qr-dine-cloud.vercel.app"
                    id="hero-cta-login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/[0.04] border border-white/[0.1] text-white font-bold hover:bg-white/[0.08] hover:border-white/[0.18] transition-all text-base flex items-center justify-center gap-2"
                  >
                    Login as Admin
                  </a>
                </Magnetic>

                <Magnetic>
                  <a
                    href="/downloads/QR-Dine-Cloud-Setup.exe"
                    download
                    id="hero-cta-download"
                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 font-bold hover:bg-blue-600/20 hover:border-blue-500/50 transition-all text-base flex items-center justify-center gap-2"
                  >
                    <Download size={18} />
                    Download for Windows
                  </a>
                </Magnetic>
              </motion.div>

              {/* Social proof strip */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mb-10"
              >
                <div className="flex items-center gap-1.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="12" height="12" viewBox="0 0 24 24" fill="#f59e0b" className="flex-shrink-0">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                  <span className="text-xs font-bold text-zinc-500 ml-1">4.9/5</span>
                </div>
                <div className="w-px h-4 bg-white/[0.08]" />
                <span className="text-xs font-semibold text-zinc-600">500+ restaurants trust us</span>
                <div className="w-px h-4 bg-white/[0.08]" />
                <span className="text-xs font-semibold text-zinc-600">₹0 commission, always</span>
                <div className="w-px h-4 bg-white/[0.08] hidden sm:block" />
                <span className="text-xs font-semibold text-zinc-600 hidden sm:block">Setup in 15 min</span>
              </motion.div>

              {/* Scroll cue */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2, duration: 1 }}
                className="flex flex-col items-center gap-2 text-zinc-700"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <ChevronDown size={16} />
                </motion.div>
              </motion.div>
            </div>

            {/* 3D Dashboard Mockup + Floating Context Cards */}
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.5, ease: EASE_OUT_SPRING }}
              className="mt-20 relative mx-auto max-w-5xl"
            >
              {/* Floating notification — NEW ORDER (left) */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 }}
                className="hidden xl:block absolute -left-56 top-[22%] z-30 w-52 animate-float"
                style={{ animationDelay: '0s' }}
              >
                <div className="rounded-2xl p-3.5 bg-[#111116] border border-brand-500/25 shadow-xl shadow-brand-500/10 backdrop-blur-xl">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-base flex-shrink-0">🍽️</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[11px] font-bold text-white">New Order</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse flex-shrink-0" />
                      </div>
                      <p className="text-[10px] text-zinc-400 leading-snug">Table 4 · Butter Chicken ×2</p>
                      <p className="text-[10px] text-zinc-700 mt-1">₹700 · Just now</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating notification — KOT PRINTED (right) */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 1.9 }}
                className="hidden xl:block absolute -right-56 top-[18%] z-30 w-52 animate-float"
                style={{ animationDelay: '2.5s' }}
              >
                <div className="rounded-2xl p-3.5 bg-[#111116] border border-emerald-500/25 shadow-xl shadow-emerald-500/10 backdrop-blur-xl">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-base flex-shrink-0">🖨️</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[11px] font-bold text-white">KOT Printed</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                      </div>
                      <p className="text-[10px] text-zinc-400 leading-snug">Kitchen notified · Table 7</p>
                      <p className="text-[10px] text-zinc-700 mt-1">Thermal done · 2s ago</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating notification — STAFF ALERT (left lower) */}
              <motion.div
                initial={{ opacity: 0, x: -30, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 2.3 }}
                className="hidden xl:block absolute -left-56 top-[56%] z-30 w-52 animate-float"
                style={{ animationDelay: '4s' }}
              >
                <div className="rounded-2xl p-3.5 bg-[#111116] border border-amber-500/25 shadow-xl shadow-amber-500/10 backdrop-blur-xl">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-base flex-shrink-0">🔔</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[11px] font-bold text-white">Staff Alert</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
                      </div>
                      <p className="text-[10px] text-zinc-400 leading-snug">Table 2 requests the bill</p>
                      <p className="text-[10px] text-zinc-700 mt-1">Waiter notified · 1m ago</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Floating notification — TABLE SCAN (right lower) */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.8, delay: 2.7 }}
                className="hidden xl:block absolute -right-56 top-[55%] z-30 w-52 animate-float"
                style={{ animationDelay: '6.5s' }}
              >
                <div className="rounded-2xl p-3.5 bg-[#111116] border border-sky-500/25 shadow-xl shadow-sky-500/10 backdrop-blur-xl">
                  <div className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center text-base flex-shrink-0">📱</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="text-[11px] font-bold text-white">QR Scanned</span>
                        <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse flex-shrink-0" />
                      </div>
                      <p className="text-[10px] text-zinc-400 leading-snug">New guest at Table 5</p>
                      <p className="text-[10px] text-zinc-700 mt-1">Menu opened · Just now</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Fade bottom edge */}
              <div className="absolute inset-x-0 -bottom-1 h-2/5 bg-gradient-to-t from-[#08080a] to-transparent z-20 pointer-events-none" />
              <DashboardMockup />
            </motion.div>
          </motion.div>
        </section>

        {/* ══════════════════ MARQUEE ══════════════════ */}
        <section className="py-10 border-y border-white/[0.04] overflow-hidden bg-[#08080a]">
          <p className="text-center text-[10px] font-bold text-zinc-800 uppercase tracking-[0.38em] mb-6">
            Trusted by 500+ innovative restaurants across India
          </p>
          <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
            {[0, 1].map((dup) => (
              <div
                key={dup}
                aria-hidden={dup === 1}
                className="flex shrink-0 animate-marquee gap-14 pr-14 items-center"
              >
                {marqueeRestaurants.map((name, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 opacity-20 hover:opacity-60 transition-opacity cursor-default whitespace-nowrap"
                  >
                    <div className="w-7 h-7 rounded bg-white/[0.08] flex items-center justify-center font-black text-zinc-600 text-xs flex-shrink-0">
                      {name.charAt(0)}
                    </div>
                    <span className="text-base font-bold text-zinc-600">{name}</span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════ STATS ══════════════════ */}
        <StatsSection />

        {/* ══════════════════ HOW IT WORKS ══════════════════ */}
        <HowItWorks />

        {/* ══════════════════ FEATURES ══════════════════ */}
        <section id="features" className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#08080a]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_0%,rgba(249,115,22,0.05),transparent)]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16 max-w-2xl mx-auto"
            >
              <div className="mb-6">
                <span className="section-label">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
                  The Kitchen OS
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Built to serve <span className="shimmer-text">faster.</span>
              </h2>
              <p className="text-zinc-600 mt-4">
                Every feature designed to eliminate friction — for your team and your guests.
              </p>
            </motion.div>

            {/* Bento grid */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-6xl mx-auto"
            >
              {/* QR Menus — wide */}
              <motion.div variants={fadeUp} className="md:col-span-2">
                <TiltCard className="bg-[#111116] border border-white/[0.06] rounded-[2rem] p-8 md:p-10 relative overflow-hidden group hover:border-brand-500/30 transition-colors duration-500 h-full">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-brand-500/[0.05] rounded-full blur-[80px] group-hover:bg-brand-500/[0.15] transition-colors duration-700 pointer-events-none" />
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-500/[0.02] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-2xl glass-brand flex items-center justify-center text-brand-400 mb-8 relative overflow-hidden" style={{ boxShadow: '0 8px 30px rgba(249,115,22,0.18)' }}>
                      <QrCode size={28} />
                      {/* Scanning laser animation */}
                      <motion.div 
                        animate={{ top: ['-10%', '110%', '-10%'] }}
                        transition={{ duration: 3, ease: 'linear', repeat: Infinity }}
                        className="absolute left-0 right-0 h-[2px] bg-brand-400 shadow-[0_0_8px_2px_rgba(249,115,22,0.6)]"
                      />
                    </div>
                    <div className="mt-auto">
                      <h3 className="text-2xl font-bold text-white mb-4">Dynamic QR Menus</h3>
                      <p className="text-zinc-400 leading-relaxed text-lg max-w-md group-hover:text-zinc-300 transition-colors">
                      Beautiful, mobile-optimized menus that update in real-time. Instantly mark items
                      out of stock or update pricing — no reprinting, ever.
                    </p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Zero Commissions */}
              <motion.div variants={fadeUp}>
                <TiltCard className="bg-[#111116] border border-white/[0.06] rounded-3xl p-8 relative overflow-hidden group hover:border-emerald-500/20 transition-colors duration-500 h-full">
                  <div className="relative z-10">
                    <div className="w-full h-24 mb-6 relative flex items-end">
                      {/* Animated mini chart */}
                      <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                        <defs>
                          <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <motion.path
                          d="M0 40 L10 30 L25 35 L40 15 L55 20 L75 5 L100 0 L100 40 L0 40 Z"
                          fill="url(#chartGradient)"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ duration: 1, delay: 0.5 }}
                        />
                        <motion.path
                          d="M0 40 L10 30 L25 35 L40 15 L55 20 L75 5 L100 0"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          initial={{ pathLength: 0 }}
                          whileInView={{ pathLength: 1 }}
                          transition={{ duration: 1.5, ease: "easeInOut" }}
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Zero Commissions</h3>
                    <p className="text-zinc-500 leading-relaxed text-sm">
                      Stop giving away 30% to delivery apps. Keep 100% of your dine-in revenue with
                      our flat monthly fee.
                    </p>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Thermal Printing */}
              <motion.div variants={fadeUp}>
                <TiltCard className="bg-[#111116] border border-white/[0.06] rounded-3xl p-8 relative overflow-hidden group hover:border-amber-500/20 transition-colors duration-500 h-full">
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/15 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-6">
                      <Printer size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">Thermal Printing</h3>
                    <p className="text-zinc-500 leading-relaxed text-sm">
                      Automated background printing for 58 mm / 80 mm thermal printers the second
                      an order is placed.
                    </p>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Staff Sync — wide */}
              <motion.div variants={fadeUp} className="md:col-span-2">
                <TiltCard className="bg-[#111116] border border-white/[0.06] rounded-[2rem] p-8 md:p-10 relative overflow-hidden group hover:border-brand-500/30 transition-colors duration-500 h-full">
                  <div className="absolute bottom-0 right-0 w-80 h-80 bg-brand-500/[0.05] rounded-full blur-[80px] group-hover:bg-brand-500/[0.15] pointer-events-none transition-colors duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-tr from-brand-500/[0.02] to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="w-14 h-14 rounded-2xl glass-brand flex items-center justify-center text-brand-400 mb-8">
                      <Bell size={28} />
                    </div>
                    <div className="mt-auto">
                      <h3 className="text-2xl font-bold text-white mb-4">Real-Time Staff Sync</h3>
                      <p className="text-zinc-400 leading-relaxed text-lg max-w-md group-hover:text-zinc-300 transition-colors">
                      Waiters receive instant push notifications when customers request assistance,
                      ask for the bill, or when kitchen orders are ready to serve.
                    </p>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Instant Setup */}
              <motion.div variants={fadeUp}>
                <TiltCard className="bg-[#111116] border border-white/[0.06] rounded-3xl p-8 relative overflow-hidden group hover:border-purple-500/20 transition-colors duration-500 h-full">
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-purple-500/15 border border-purple-500/20 flex items-center justify-center text-purple-400 mb-6">
                      <Zap size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">15-Min Setup</h3>
                    <p className="text-zinc-500 leading-relaxed text-sm">
                      No IT team needed. Upload logo, build menu, print QR — you&apos;re live in under
                      15 minutes.
                    </p>
                  </div>
                </TiltCard>
              </motion.div>

              {/* Security — wide */}
              <motion.div variants={fadeUp} className="md:col-span-2">
                <TiltCard className="bg-[#111116] border border-white/[0.06] rounded-3xl p-8 relative overflow-hidden group hover:border-sky-500/20 transition-colors duration-500 h-full">
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-sky-500/15 border border-sky-500/20 flex items-center justify-center text-sky-400 mb-6">
                      <ShieldCheck size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Enterprise-Grade Security</h3>
                    <p className="text-zinc-500 leading-relaxed text-lg max-w-md">
                      99.9% uptime SLA, encrypted data, role-based access controls, and daily backups
                      — so your business never sleeps.
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ══════════════════ INTEGRATIONS & HARDWARE ══════════════════ */}
        <IntegrationsSection />

        {/* ══════════════════ COMPARISON ══════════════════ */}
        <ComparisonSection />

        {/* ══════════════════ TESTIMONIALS ══════════════════ */}
        <Testimonials />

        {/* ══════════════════ ROI CALCULATOR ══════════════════ */}
        <ROICalculator />

        {/* ══════════════════ PRICING ══════════════════ */}
        <section id="pricing" className="py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#08080a]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(249,115,22,0.06),transparent)]" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <div className="mb-6">
                <span className="section-label">Transparent Pricing</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-8">
                Plans that <span className="shimmer-text">scale with you.</span>
              </h2>

              {/* Billing toggle */}
              <div
                className="inline-flex items-center gap-1 p-1 rounded-full bg-white/[0.04] border border-white/[0.08]"
                role="group"
                aria-label="Billing period"
              >
                <button
                  id="billing-monthly"
                  onClick={() => setAnnual(false)}
                  className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    !annual
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Monthly
                </button>
                <button
                  id="billing-annual"
                  onClick={() => setAnnual(true)}
                  className={`flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                    annual
                      ? 'bg-brand-500 text-white shadow-lg shadow-brand-500/30'
                      : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  Annual
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                    Save 20%
                  </span>
                </button>
              </div>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-80px' }}
              variants={stagger}
              className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto items-center"
            >
              {plans.map((plan, index) => (
                <motion.div
                  key={plan.name}
                  variants={fadeUp}
                  className={`relative ${plan.popular ? 'md:-my-5 z-10' : ''}`}
                >
                  {plan.popular && (
                    <>
                      {/* Outer glow */}
                      <div className="absolute -inset-3 bg-brand-500/[0.12] rounded-[2.5rem] blur-xl" />
                      {/* Gradient border */}
                      <div className="absolute -inset-[1px] rounded-[2.2rem] bg-gradient-to-br from-brand-500 via-amber-400 to-brand-600" />
                    </>
                  )}

                  <div
                    className={`relative rounded-[2rem] p-9 flex flex-col h-full ${
                      plan.popular
                        ? 'bg-[#0f0f15]'
                        : 'bg-[#111116] border border-white/[0.06]'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-brand-500 to-amber-500 text-white text-[10px] font-black uppercase tracking-[0.18em] whitespace-nowrap shadow-lg">
                        Most Popular
                      </div>
                    )}

                    <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                    <p className="text-zinc-600 text-sm mb-7">{plan.desc}</p>

                    <div className="mb-8">
                      <div className="flex items-end gap-1">
                        <span className="text-4xl md:text-5xl font-black text-white">
                          ₹{(annual ? plan.annual : plan.monthly).toLocaleString('en-IN')}
                        </span>
                        <span className="text-zinc-600 mb-1.5">/mo</span>
                      </div>
                      <AnimatePresence>
                        {annual && (
                          <motion.p
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-xs text-emerald-500 mt-1"
                          >
                            ₹{(plan.monthly - plan.annual).toLocaleString('en-IN')} saved per month
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>

                    <ul className="space-y-3.5 mb-9 flex-grow">
                      {plan.features.map((f, fi) => (
                        <li
                          key={fi}
                          className={`flex items-center gap-3 text-sm ${
                            f.ok ? 'text-zinc-300' : 'text-zinc-700'
                          }`}
                        >
                          <CheckCircle2 size={16} className={f.ok ? 'text-brand-500 flex-shrink-0' : 'text-zinc-800 flex-shrink-0'} />
                          {f.text}
                        </li>
                      ))}
                    </ul>

                    <a
                      href={plan.href}
                      id={`pricing-cta-${plan.name.toLowerCase()}`}
                      className={`block w-full py-3.5 text-center rounded-2xl font-bold text-sm transition-all duration-300 ${
                        plan.popular
                          ? 'bg-gradient-to-r from-brand-600 to-amber-500 text-white hover:from-brand-500 hover:to-amber-400 shadow-lg shadow-brand-500/20'
                          : 'bg-white/[0.04] border border-white/[0.08] text-white hover:bg-white/[0.08] hover:border-white/[0.16]'
                      }`}
                    >
                      {plan.cta}
                    </a>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ══════════════════ FAQ ══════════════════ */}
        <section className="py-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#0a0a0e]" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:44px_44px]" />

          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-16"
            >
              <div className="mb-6">
                <span className="section-label">FAQ</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
                Got questions?
              </h2>
              <p className="text-zinc-600">Everything you need to know about QR Dine Cloud.</p>
            </motion.div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.07 }}
                  className="bg-[#111116] border border-white/[0.06] rounded-2xl overflow-hidden"
                >
                  <button
                    id={`faq-btn-${index}`}
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none group"
                  >
                    <span className="font-bold text-zinc-200 group-hover:text-brand-400 transition-colors text-sm md:text-base">
                      {faq.question}
                    </span>
                    <motion.div
                      animate={{ rotate: openFaq === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-zinc-700 flex-shrink-0 ml-4"
                    >
                      <ChevronDown size={18} />
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE_OUT_SPRING }}
                      >
                        <div className="px-6 pb-6 text-zinc-500 leading-relaxed text-sm border-t border-white/[0.04] pt-4">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════ CONCIERGE SETUP ══════════════════ */}
        <ConciergeSection />

        {/* ══════════════════ CTA ══════════════════ */}
        <section className="py-28 relative overflow-hidden">
          <div className="absolute inset-0 bg-[#08080a]" />
          {/* Layered glows */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(249,115,22,0.08),transparent)]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none">
            <div className="absolute inset-0 bg-brand-500/[0.06] rounded-full blur-[140px] animate-glow-pulse" />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:44px_44px]" />

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: EASE_OUT_SPRING }}
            className="max-w-4xl mx-auto px-4 text-center relative z-10"
          >
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-[-0.03em] leading-tight mb-6">
              Ready to transform
              <br />
              your restaurant?
            </h2>
            <p className="text-zinc-500 text-xl mb-10 max-w-xl mx-auto">
              Join 500+ restaurants already running on Cloud Nine. Start in 15 minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Magnetic>
                <a
                  href="mailto:qrdinecloud@gmail.com"
                  id="cta-get-in-touch"
                  className="group relative w-full sm:w-auto px-10 py-4 rounded-full overflow-hidden block"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-amber-500 group-hover:from-brand-500 group-hover:to-amber-400 transition-all duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-amber-500 blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
                  <span className="relative font-black text-white flex items-center justify-center gap-2 text-base">
                    Get in touch
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-200" />
                  </span>
                </a>
              </Magnetic>

              <Magnetic>
                <Link
                  href="/simulator"
                  id="cta-try-demo"
                  className="w-full sm:w-auto px-10 py-4 rounded-full bg-white/[0.04] border border-white/[0.1] text-white font-bold hover:bg-white/[0.08] hover:border-white/[0.18] transition-all text-base flex items-center justify-center gap-2"
                >
                  <Play size={18} fill="currentColor" />
                  Virtual Simulator
                </Link>
              </Magnetic>
            </div>
          </motion.div>
        </section>

      </main>
      <Footer />
    </>
  );
}
