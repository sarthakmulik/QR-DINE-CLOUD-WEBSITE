'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { QrCode, Printer, LayoutDashboard, UtensilsCrossed, Users, Settings } from 'lucide-react';

const pages = [
  { id: 'dashboard', name: 'Dashboard', icon: LayoutDashboard },
  { id: 'menu',      name: 'Menu',      icon: UtensilsCrossed },
  { id: 'staff',     name: 'Staff',     icon: Users },
];

export function DashboardMockup() {
  const [activePage, setActivePage] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  /* ── 3D mouse-tilt ── */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [7, -7]), { stiffness: 280, damping: 38 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-7, 7]), { stiffness: 280, damping: 38 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  /* ── Auto-slide ── */
  useEffect(() => {
    const id = setInterval(() => setActivePage((p) => (p + 1) % pages.length), 4000);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: '1400px' }}
      className="relative"
    >
      {/* Ambient underglow */}
      <div className="absolute -inset-6 bg-brand-500/[0.07] rounded-3xl blur-3xl pointer-events-none" />

      <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="relative">
        {/* Gradient border rim */}
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-br from-brand-500/40 via-amber-500/10 to-brand-600/30" />

        <div className="relative rounded-2xl border border-white/[0.07] bg-[#0d0d12] shadow-2xl overflow-hidden flex flex-col md:flex-row h-[500px]">

          {/* ── Sidebar ── */}
          <div className="w-56 bg-[#09090e] border-r border-white/[0.05] p-5 hidden md:flex flex-col">
            <div className="flex items-center gap-2.5 mb-8">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-brand-500 to-brand-700 shadow-md shadow-brand-500/30 flex-shrink-0" />
              <div className="font-black text-white text-sm leading-none">QR Dine Cloud</div>
            </div>

            <nav className="flex flex-col gap-0.5 flex-grow">
              {pages.map((page, index) => {
                const Icon = page.icon;
                const isActive = index === activePage;
                return (
                  <motion.div
                    key={page.id}
                    animate={{
                      backgroundColor: isActive ? 'rgba(249,115,22,0.10)' : 'transparent',
                      color: isActive ? '#fb923c' : '#3f3f46',
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-semibold text-xs"
                  >
                    <Icon size={14} />
                    {page.name}
                    {isActive && <div className="ml-auto w-1 h-1 rounded-full bg-brand-500" />}
                  </motion.div>
                );
              })}
              <div className="flex items-center gap-2.5 px-3 py-2.5 text-zinc-800 text-xs font-medium">
                <QrCode size={14} /> Tables
              </div>
            </nav>

            <div className="flex items-center gap-2.5 px-3 py-2 text-zinc-800 text-xs font-medium">
              <Settings size={14} /> Settings
            </div>
          </div>

          {/* ── Main area ── */}
          <div className="flex-1 flex flex-col bg-[#0c0c11] overflow-hidden">
            {/* Faux title bar */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.04] flex-shrink-0">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <div className="text-[10px] text-zinc-800 font-medium tracking-wide">
                qr-dine-cloud.vercel.app
              </div>
              <div className="w-7 h-7 rounded-full bg-brand-500/15 border border-brand-500/20 flex items-center justify-center text-brand-400 font-bold text-[10px]">
                A
              </div>
            </div>

            {/* Slide content */}
            <div className="flex-1 relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activePage}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.38, ease: 'easeInOut' }}
                  className="absolute inset-0 p-5 md:p-7 overflow-y-auto"
                >
                  {activePage === 0 && <DashboardView />}
                  {activePage === 1 && <MenuView />}
                  {activePage === 2 && <StaffView />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ────────────────── Sub-views ────────────────── */

function DashboardView() {
  const tables = [
    { num: 1, status: 'occupied',         amount: '₹1,250' },
    { num: 2, status: 'available',        amount: '' },
    { num: 3, status: 'occupied',         amount: '₹840' },
    { num: 4, status: 'occupied',         amount: '₹3,400' },
    { num: 5, status: 'available',        amount: '' },
    { num: 6, status: 'needs_attention',  amount: 'Wait' },
    { num: 7, status: 'available',        amount: '' },
    { num: 8, status: 'occupied',         amount: '₹2,100' },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-sm font-bold text-white">Live Overview</h2>
          <p className="text-[11px] text-zinc-700">Real-time restaurant status</p>
        </div>
        <div className="px-3 py-1.5 bg-brand-500/10 border border-brand-500/20 rounded-full text-xs font-bold text-brand-400">
          Today: ₹24,500
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mb-5">
        {tables.map((t) => (
          <div
            key={t.num}
            className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 relative ${
              t.status === 'occupied'
                ? 'border-brand-500/20 bg-brand-500/[0.07]'
                : t.status === 'needs_attention'
                ? 'border-red-500/20 bg-red-500/[0.07]'
                : 'border-white/[0.04] bg-white/[0.01]'
            }`}
          >
            <span
              className={`absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full ${
                t.status === 'occupied'
                  ? 'bg-brand-500'
                  : t.status === 'needs_attention'
                  ? 'bg-red-500'
                  : 'bg-emerald-500'
              }`}
            />
            <div className="text-sm font-black text-zinc-300">T{t.num}</div>
            <div
              className={`text-[10px] font-bold ${
                t.status === 'occupied'
                  ? 'text-brand-400'
                  : t.status === 'needs_attention'
                  ? 'text-red-400'
                  : 'text-emerald-500'
              }`}
            >
              {t.amount || 'Empty'}
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-white/[0.03] border border-white/[0.05] p-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Printer size={15} />
          </div>
          <div>
            <div className="font-bold text-white text-xs">Thermal Printer</div>
            <div className="text-[10px] text-zinc-700">Connected • Ready to print</div>
          </div>
        </div>
        <div className="w-9 h-4.5 bg-emerald-500 rounded-full relative flex-shrink-0" style={{ height: 18 }}>
          <div className="absolute right-0.5 top-0.5 w-3.5 h-3.5 bg-white rounded-full" />
        </div>
      </div>
    </>
  );
}

function MenuView() {
  const items = [
    { name: 'Paneer Butter Masala', price: '₹350', stock: true },
    { name: 'Garlic Naan',          price: '₹60',  stock: true },
    { name: 'Mushroom Risotto',     price: '₹450', stock: false },
    { name: 'Mango Lassi',          price: '₹120', stock: true },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-sm font-bold text-white">Menu Management</h2>
          <p className="text-[11px] text-zinc-700">Update items in real-time</p>
        </div>
        <div className="px-3 py-1.5 bg-brand-500 text-white rounded-lg text-xs font-bold shadow-md shadow-brand-500/30">
          + Add Item
        </div>
      </div>

      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex items-center justify-between p-3 border border-white/[0.05] rounded-xl bg-white/[0.02]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-white/[0.05] flex-shrink-0" />
              <div>
                <div className="font-semibold text-zinc-300 text-xs">{item.name}</div>
                <div className="text-brand-400 font-bold text-xs">{item.price}</div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className={`text-[10px] font-bold px-2 py-0.5 rounded ${item.stock ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                {item.stock ? 'In Stock' : 'Out'}
              </div>
              <div className={`w-8 rounded-full relative flex-shrink-0 ${item.stock ? 'bg-emerald-500' : 'bg-zinc-700'}`} style={{ height: 16 }}>
                <div className={`absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all ${item.stock ? 'right-0.5' : 'left-0.5'}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function StaffView() {
  const staff = [
    { name: 'Rahul Sharma', role: 'Admin',   status: 'online',  grad: 'from-brand-500 to-brand-700' },
    { name: 'Priya Patel',  role: 'Manager', status: 'online',  grad: 'from-amber-500 to-brand-500' },
    { name: 'Amit Kumar',   role: 'Waiter',  status: 'offline', grad: 'from-zinc-600 to-zinc-800' },
    { name: 'Neha Singh',   role: 'Kitchen', status: 'online',  grad: 'from-emerald-500 to-emerald-700' },
  ];

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-sm font-bold text-white">Staff & Roles</h2>
          <p className="text-[11px] text-zinc-700">Manage team access</p>
        </div>
        <div className="px-3 py-1.5 bg-brand-500 text-white rounded-lg text-xs font-bold shadow-md shadow-brand-500/30">
          + Add Staff
        </div>
      </div>

      <div className="space-y-2">
        {staff.map((s, i) => (
          <div key={i} className="flex items-center justify-between p-3 border border-white/[0.05] rounded-xl bg-white/[0.02]">
            <div className="flex items-center gap-2.5">
              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${s.grad} flex items-center justify-center font-bold text-white text-xs flex-shrink-0`}>
                {s.name.charAt(0)}
              </div>
              <div>
                <div className="font-semibold text-zinc-300 text-xs">{s.name}</div>
                <div className="text-zinc-700 text-[10px]">{s.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className={`flex h-1.5 w-1.5 rounded-full ${s.status === 'online' ? 'bg-emerald-500' : 'bg-zinc-700'}`} />
              <span className="text-[10px] text-zinc-700 capitalize">{s.status}</span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
