import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function PrivacyPolicy() {
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
            Privacy Policy
          </h1>
          <p className="text-zinc-500 mb-12">Last Updated: {new Date().toLocaleDateString()}</p>

          <div className="prose prose-invert prose-zinc max-w-none">
            <h2 className="text-2xl font-bold text-white mt-10 mb-4">1. Introduction</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              At QR Dine Cloud ("we", "our", or "us"), we are committed to protecting your privacy. This Privacy Policy explains how your personal information is collected, used, and disclosed by QR Dine Cloud.
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">2. Information We Collect</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              We collect information from you when you register on our site, place an order, subscribe to our newsletter, respond to a survey or fill out a form. The data collected includes, but is not limited to:
            </p>
            <ul className="list-disc pl-6 text-zinc-400 mb-6 space-y-2">
              <li>Restaurant Details (Name, Location, Contact Info)</li>
              <li>Admin Account Information (Email, Encrypted Passwords)</li>
              <li>Customer Order Data (Item ordered, Table Number) - <em>Note: We do not store customer PII (Personally Identifiable Information) unless explicitly provided for loyalty programs.</em></li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">3. How We Use Your Information</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Any of the information we collect from you may be used in one of the following ways:
            </p>
            <ul className="list-disc pl-6 text-zinc-400 mb-6 space-y-2">
              <li>To personalize your experience and improve our platform.</li>
              <li>To process secure transactions (We do not store payment details; this is handled by our gateway partners like Razorpay/PhonePe).</li>
              <li>To send periodic emails regarding updates, support, or service changes.</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">4. Data Security</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              We implement a variety of security measures to maintain the safety of your personal information. We utilize enterprise-grade encryption (SSL) and secure cloud infrastructure to ensure your restaurant's data is never compromised.
            </p>

            <h2 className="text-2xl font-bold text-white mt-10 mb-4">5. Contact Us</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              If there are any questions regarding this privacy policy, you may contact us using the information below:
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
