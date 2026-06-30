import Link from 'next/link';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="relative bg-[#06060a] text-zinc-400 pt-16 pb-8 overflow-hidden">
      {/* Top glow line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-brand-500/40 to-transparent" />

      {/* Ambient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-32 bg-brand-500/[0.04] blur-[80px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">

          {/* Brand column */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="relative w-9 h-9 overflow-hidden rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 shadow-lg shadow-brand-500/30 transition-transform group-hover:scale-105">
                <Image src="/logo.png" alt="QR Dine Cloud" fill className="object-cover" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                QR Dine<span className="text-brand-500">Cloud</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-600 max-w-xs leading-relaxed">
              India&apos;s most powerful QR ordering and restaurant management platform. Built for the modern restaurateur.
            </p>

            {/* Social links */}
            <div className="flex gap-3 mt-6">
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center text-zinc-600 hover:text-brand-500 hover:border-brand-500/30 transition-all"
              >
                <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* X / Twitter */}
              <a
                href="#"
                aria-label="X (Twitter)"
                className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center text-zinc-600 hover:text-brand-500 hover:border-brand-500/30 transition-all"
              >
                <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="#"
                aria-label="LinkedIn"
                className="w-9 h-9 rounded-xl bg-white/[0.03] border border-white/[0.07] flex items-center justify-center text-zinc-600 hover:text-brand-500 hover:border-brand-500/30 transition-all"
              >
                <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Product column */}
          <div>
            <h3 className="text-white font-bold mb-5 text-xs tracking-[0.18em] uppercase">Product</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/#features"     className="text-zinc-600 hover:text-brand-400 transition-colors">Features</Link></li>
              <li><Link href="/#how-it-works" className="text-zinc-600 hover:text-brand-400 transition-colors">How It Works</Link></li>
              <li><Link href="/#pricing"      className="text-zinc-600 hover:text-brand-400 transition-colors">Pricing</Link></li>
              <li>
                <a href="https://qr-dine-cloud.vercel.app" target="_blank" rel="noopener noreferrer" className="text-zinc-600 hover:text-brand-400 transition-colors">
                  Admin Login
                </a>
              </li>
            </ul>
          </div>

          {/* Legal column */}
          <div>
            <h3 className="text-white font-bold mb-5 text-xs tracking-[0.18em] uppercase">Legal</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/terms"   className="text-zinc-600 hover:text-brand-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/privacy" className="text-zinc-600 hover:text-brand-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/contact" className="text-zinc-600 hover:text-brand-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.04] text-xs text-zinc-700 flex flex-col md:flex-row justify-between items-center gap-3">
          <p>&copy; {new Date().getFullYear()} QR Dine Cloud. All rights reserved.</p>
          <p>Made with ❤️ for Indian restaurants</p>
        </div>
      </div>
    </footer>
  );
}
