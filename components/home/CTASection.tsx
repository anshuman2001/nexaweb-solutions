'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MessageCircle, ArrowRight } from 'lucide-react';

export default function CTASection() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999';

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-accent-blue/20 via-surface to-accent-green/10 border border-accent-blue/20 p-12 text-center"
        >
          {/* Background glow */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-accent-blue/20 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-green/20 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <div className="text-5xl mb-6">🚀</div>
            <h2 className="text-3xl lg:text-5xl font-extrabold text-white mb-4">
              Ready to Automate<br />
              <span className="gradient-text">Your Business?</span>
            </h2>
            <p className="text-gray-300 text-lg mb-10 max-w-xl mx-auto">
              Get a free consultation call. We'll analyze your business and show you exactly how AI can save you time and money.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hi! I'd like to automate my business with AI. Can we schedule a free consultation?`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-[#25D366] text-white font-semibold text-lg hover:bg-green-500 transition-all shadow-lg shadow-green-900/30"
              >
                <MessageCircle className="w-5 h-5" />
                WhatsApp Us
              </a>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent-blue text-white font-semibold text-lg hover:bg-blue-500 transition-all btn-glow"
              >
                Get Free Demo
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
            <p className="text-gray-500 text-sm mt-6">
              ⚡ We reply within 2 hours • Free consultation • No obligation
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
