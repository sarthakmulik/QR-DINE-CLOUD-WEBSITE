import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function TermsOfService() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-[#08080a] pt-32 pb-24 relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-brand-500/[0.03] blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link href="/" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white mb-10 transition-colors w-fit">
            <ArrowLeft size={18} />
            <span className="font-semibold text-sm">Back to Home</span>
          </Link>

          <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-zinc-500 mb-12">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-invert prose-zinc max-w-none">
            <h2 className="text-2xl font-bold text-white mt-10 mb-4">1. Acceptance of Terms</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              By accessing and using QR Dine Cloud, you accept and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">2. Description of Service</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              QR Dine Cloud provides restaurants with digital QR menus, order management systems, and hardware integration software. We reserve the right to modify, suspend, or discontinue any part of the service with or without notice.
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">3. Zero Commission Policy</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              QR Dine Cloud does not charge any percentage-based commissions on food orders placed through our platform. Restaurants are only responsible for the fixed subscription fee and any standard payment gateway transaction fees imposed by third-party processors (e.g., Razorpay/PhonePe).
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">4. Account Responsibilities</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. QR Dine Cloud cannot and will not be liable for any loss or damage arising from your failure to comply with this security obligation.
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">5. Refunds & Cancellations</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Subscription cancellations take effect at the end of the current billing cycle. We do not provide refunds or credits for any partial-month subscription periods or unused services. If you are unsatisfied, please contact our support team.
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">6. Contact Us</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              If you have any questions about these Terms, please contact us at:
              <br /><br />
              <strong>QR Dine Cloud</strong><br />
              Email: <a href="mailto:qrdinecloud@gmail.com" className="text-brand-400 hover:underline">qrdinecloud@gmail.com</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
