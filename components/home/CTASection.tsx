'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MessageCircle, ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919997730768';

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="relative rounded-3xl overflow-hidden p-12 text-center"
          style={{
            background: 'linear-gradient(135deg, rgba(37,99,235,0.12) 0%, rgba(12,15,26,0.95) 40%, rgba(124,58,237,0.10) 100%)',
            border: '1px solid rgba(99,102,241,0.2)',
          }}
        >
          {/* Soft radial glows — no blur filter */}
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 65%)' }} />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)' }} />

          {/* Animated top border glow */}
          <div className="absolute top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.6), rgba(16,185,129,0.4), transparent)' }} />

          {/* Corner accents */}
          <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-blue-500/40 rounded-tl-xl" />
          <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-purple-500/40 rounded-tr-xl" />
          <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-blue-500/40 rounded-bl-xl" />
          <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-purple-500/40 rounded-br-xl" />

          <div className="relative z-10">
            <div className="text-5xl mb-6">🚀</div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/25 bg-purple-500/8 text-purple-300 text-xs font-medium mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              Free Consultation Available
            </div>

            <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-4 leading-tight">
              Ready to Automate<br />
              <span className="gradient-text-luxury">Your Business?</span>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-xl mx-auto leading-relaxed">
              Get a free consultation call. We&apos;ll analyze your business and show you exactly how AI can save you time and money.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hi! I'd like to automate my business with AI. Can we schedule a free consultation?`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all btn-shimmer shadow-lg shadow-green-900/20"
                style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-lg transition-all btn-glow btn-shimmer"
                style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}
              >
                Get Free Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            <p className="text-gray-600 text-sm mt-6">
              ⚡ We reply within 2 hours &nbsp;•&nbsp; Free consultation &nbsp;•&nbsp; No obligation
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
