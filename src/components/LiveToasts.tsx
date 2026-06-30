'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, TrendingUp, Star } from 'lucide-react';

const restaurants = [
  { "name": "Boho Boho", "city": "Pune", "type": "Cafe" },
  { "name": "Savannah Garden Restaurant", "city": "Pune", "type": "Restaurant" },
  { "name": "The Camden Lane", "city": "Pune", "type": "Restaurant" },
  { "name": "11 East Street Cafe", "city": "Pune", "type": "Cafe" },
  { "name": "Cafe The Voyage", "city": "Pune", "type": "Cafe" },
  { "name": "Zen Cafe", "city": "Pune", "type": "Cafe" },
  { "name": "Cafe Kathaa", "city": "Pune", "type": "Cafe" },
  { "name": "Paashh", "city": "Pune", "type": "Restaurant" },
  { "name": "Chafa Cafe & Studio", "city": "Pune", "type": "Cafe" },
  { "name": "Matcha Brew & Bake", "city": "Pune", "type": "Cafe" },
  { "name": "Hyatt Pune", "city": "Pune", "type": "Hotel" },
  { "name": "The Pride Hotel Pune", "city": "Pune", "type": "Hotel" },
  { "name": "O Hotel Pune", "city": "Pune", "type": "Hotel" },
  { "name": "The Orchid Hotel Pune", "city": "Pune", "type": "Hotel" },
  { "name": "Lemon Tree Premier Pune", "city": "Pune", "type": "Hotel" },
  { "name": "Prithvi Cafe", "city": "Mumbai", "type": "Cafe" },
  { "name": "Bayview Cafe", "city": "Mumbai", "type": "Cafe" },
  { "name": "Bayleaf Cafe", "city": "Mumbai", "type": "Cafe" },
  { "name": "Lake View Cafe", "city": "Mumbai", "type": "Restaurant" },
  { "name": "The Backyard Brew", "city": "Mumbai", "type": "Cafe" },
  { "name": "Bombay To Barcelona Library Cafe", "city": "Mumbai", "type": "Cafe" },
  { "name": "Mockingbird Cafe Bar", "city": "Mumbai", "type": "Cafe" },
  { "name": "Leopold Cafe", "city": "Mumbai", "type": "Cafe" },
  { "name": "The Cacao Mill by Subko", "city": "Mumbai", "type": "Cafe" },
  { "name": "Grandmama's Cafe Dadar", "city": "Mumbai", "type": "Cafe" },
  { "name": "Carlton Hotel Colaba", "city": "Mumbai", "type": "Hotel" },
  { "name": "The Taj Mahal Palace", "city": "Mumbai", "type": "Hotel" },
  { "name": "Hotel Sahara Star", "city": "Mumbai", "type": "Hotel" },
  { "name": "Hotel Orient Regency", "city": "Mumbai", "type": "Hotel" },
  { "name": "Four Seasons Hotel Mumbai", "city": "Mumbai", "type": "Hotel" },
  { "name": "Charlies Deck", "city": "Nashik", "type": "Cafe" },
  { "name": "The Breakfast Story", "city": "Nashik", "type": "Cafe" },
  { "name": "Mykonos Nashik", "city": "Nashik", "type": "Restaurant" },
  { "name": "La Vitis Farm to Fork", "city": "Nashik", "type": "Restaurant" },
  { "name": "The Leaf", "city": "Nashik", "type": "Cafe" },
  { "name": "Huboho Cafe & Eatery", "city": "Nagpur", "type": "Cafe" },
  { "name": "BellaVista Cafe & Skybar", "city": "Nagpur", "type": "Cafe" },
  { "name": "Little Owl Cafe", "city": "Nagpur", "type": "Cafe" },
  { "name": "Tipsy Turk", "city": "Nagpur", "type": "Restaurant" },
  { "name": "Pablo The Art Cafe", "city": "Nagpur", "type": "Restaurant" },
  { "name": "Uptown501 Cafe Lounge Bar", "city": "Aurangabad", "type": "Cafe" },
  { "name": "Twist In Flavours", "city": "Aurangabad", "type": "Restaurant" },
  { "name": "Sonna Kitchen & Bar", "city": "Aurangabad", "type": "Restaurant" },
  { "name": "Indiana Exotica", "city": "Aurangabad", "type": "Cafe" },
  { "name": "Chéri Cafe & Eatery", "city": "Aurangabad", "type": "Cafe" }
];

type Restaurant = { name: string; city: string; type: string };
type ToastEvent = { text: string; icon: React.ReactNode };

const eventTemplates = [
  (r: Restaurant): ToastEvent => ({ text: `${r.name} (${r.city}) just joined the Annual Plan.`, icon: <Star className="text-amber-400" size={16} /> }),
  (r: Restaurant): ToastEvent => {
    const amount = Math.floor(Math.random() * 5 + 1) + "," + Math.floor(Math.random() * 900 + 100);
    return { text: `${r.name} in ${r.city} processed a ₹${amount} order at 0% commission.`, icon: <TrendingUp className="text-emerald-400" size={16} /> };
  },
  (r: Restaurant): ToastEvent => ({ text: `${r.name} (${r.city}) went live in 12 minutes.`, icon: <CheckCircle2 className="text-brand-400" size={16} /> }),
  (r: Restaurant): ToastEvent => ({ text: `A diner at ${r.name} just paid via UPI seamlessly.`, icon: <CheckCircle2 className="text-brand-400" size={16} /> }),
];

export function LiveToasts() {
  const [currentEvent, setCurrentEvent] = useState<ToastEvent | null>(null);

  useEffect(() => {
    const showNext = () => {
      const r = restaurants[Math.floor(Math.random() * restaurants.length)];
      const t = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
      setCurrentEvent(t(r));
    };

    // Show first toast after 3 seconds
    const initialTimeout = setTimeout(showNext, 3000);
    return () => clearTimeout(initialTimeout);
  }, []);

  useEffect(() => {
    if (currentEvent === null) return;

    // Hide toast after 5 seconds
    const hideTimeout = setTimeout(() => {
      setCurrentEvent(null);
      
      // Schedule next toast in 20 to 35 seconds
      const nextDelay = Math.random() * 15000 + 20000;
      setTimeout(() => {
        const r = restaurants[Math.floor(Math.random() * restaurants.length)];
        const t = eventTemplates[Math.floor(Math.random() * eventTemplates.length)];
        setCurrentEvent(t(r));
      }, nextDelay);

    }, 5000);

    return () => clearTimeout(hideTimeout);
  }, [currentEvent]);

  return (
    <div className="fixed top-20 left-4 right-4 md:top-auto md:bottom-6 md:left-6 md:right-auto z-50 pointer-events-none flex justify-center md:justify-start">
      <AnimatePresence>
        {currentEvent !== null && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="bg-[#111116] border border-white/[0.08] shadow-[0_10px_40px_rgba(0,0,0,0.5)] rounded-xl md:rounded-2xl p-3 md:p-4 pr-4 md:pr-6 flex items-center gap-3 md:gap-4 max-w-[260px] md:max-w-sm"
          >
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-white/[0.05] flex items-center justify-center flex-shrink-0">
              <div className="scale-75 md:scale-100 flex items-center justify-center">
                {currentEvent.icon}
              </div>
            </div>
            <p className="text-xs md:text-sm text-zinc-300 leading-snug">
              {currentEvent.text}
              <span className="block text-[9px] md:text-[10px] text-zinc-500 mt-0.5 md:mt-1 uppercase tracking-wider font-bold">Just now</span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
