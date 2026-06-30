'use client';

// Typed cubic-bezier tuple required by framer-motion v12
const EASE_OUT_SPRING: [number, number, number, number] = [0.16, 1, 0.3, 1];

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Magnetic from './Magnetic';

const navLinks = [
  { href: '/#features', label: 'Features' },
  { href: '/#how-it-works', label: 'How It Works' },
  { href: '/#pricing', label: 'Pricing' },
  { href: '/downloads', label: 'Downloads' },
  { href: '/contact', label: 'Contact' },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#08080a]/85 backdrop-blur-xl border-b border-white/[0.06] py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-9 h-9 overflow-hidden rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-500/30 transition-transform group-hover:scale-105">
              <Image src="/logo.png" alt="QR Dine Cloud" fill className="object-cover" />
            </div>
            <span className="text-xl font-black tracking-tight text-white">
              QR Dine<span className="text-brand-500">Cloud</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Magnetic key={link.href}>
                <Link
                  href={link.href}
                  className="relative text-sm font-semibold text-zinc-400 hover:text-white transition-colors group px-2 py-1"
                >
                  {link.label}
                  <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-gradient-to-r from-brand-500 to-amber-400 group-hover:w-full transition-all duration-300" />
                </Link>
              </Magnetic>
            ))}
            <div className="w-px h-4 bg-white/[0.1]" />
            <Magnetic>
              <a
                href="https://qr-dine-cloud.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                id="nav-admin-login"
                className="relative group text-sm font-bold px-5 py-2.5 rounded-full overflow-hidden block"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-brand-600 to-amber-500 transition-all group-hover:from-brand-500 group-hover:to-amber-400" />
                <div className="absolute inset-0 bg-brand-500 blur-md opacity-0 group-hover:opacity-40 transition-opacity" />
                <span className="relative text-white flex items-center gap-1.5">Admin Login</span>
              </a>
            </Magnetic>
          </nav>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-btn"
            className="md:hidden p-2 rounded-lg text-zinc-400 hover:text-white hover:bg-white/[0.05] transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <div className="w-5 h-5 flex flex-col justify-center gap-[5px]">
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="block h-0.5 w-5 bg-current origin-center"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.2 }}
                className="block h-0.5 w-5 bg-current"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.25 }}
                className="block h-0.5 w-5 bg-current origin-center"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: EASE_OUT_SPRING }}
            className="md:hidden overflow-hidden bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/[0.06]"
          >
            <div className="py-5 px-5 flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block text-base font-semibold text-zinc-300 hover:text-brand-400 transition-colors py-3 border-b border-white/[0.04]"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://qr-dine-cloud.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-center text-base font-bold px-5 py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-amber-500 text-white shadow-lg shadow-brand-500/20"
              >
                Admin Login
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
