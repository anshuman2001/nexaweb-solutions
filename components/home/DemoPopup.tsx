'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DemoPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('demo-popup-dismissed');
    if (dismissed) return;
    const timer = setTimeout(() => setShow(true), 30000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem('demo-popup-dismissed', 'true');
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999';

  return (
    <AnimatePresence>
      {show && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md px-4"
          >
            <div className="bg-surface border border-accent-blue/20 rounded-2xl p-8 shadow-2xl text-center relative">
              <button onClick={dismiss} className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
              <div className="w-16 h-16 rounded-2xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center mx-auto mb-5">
                <Bot className="w-8 h-8 text-accent-blue" />
              </div>
              <h3 className="text-2xl font-extrabold text-white mb-2">Get a Free AI Demo</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                See exactly how an AI agent can automate your business. Free 30-minute demo call — no obligation.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hi! I'd like a free demo of your AI agents.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent-blue text-white font-semibold hover:bg-blue-500 transition-all btn-glow"
                >
                  Book Free Demo
                  <ArrowRight className="w-4 h-4" />
                </a>
                <button onClick={dismiss} className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
                  Maybe later
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
