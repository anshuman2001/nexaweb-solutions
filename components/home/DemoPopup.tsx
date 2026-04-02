'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bot, ArrowRight, MessageCircle, Sparkles } from 'lucide-react';

export default function DemoPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('demo-popup-dismissed');
    if (dismissed) return;
    const timer = setTimeout(() => setShow(true), 20000);
    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem('demo-popup-dismissed', 'true');
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919997730768';

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={dismiss}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          />

          {/* Popup — perfectly centered */}
          <div className="fixed inset-0 z-[101] flex items-center justify-center px-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-md pointer-events-auto"
            >
              {/* Glow behind card */}
              <div className="absolute -inset-3 rounded-3xl blur-2xl opacity-40 pointer-events-none"
                style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.5), rgba(124,58,237,0.3))' }} />

              <div
                className="relative rounded-2xl p-8 text-center overflow-hidden"
                style={{
                  background: 'linear-gradient(145deg, #0f1322 0%, #0c0f1a 60%, #0f1125 100%)',
                  border: '1px solid rgba(99,102,241,0.25)',
                  boxShadow: '0 25px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                {/* Top gradient line */}
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.7), rgba(16,185,129,0.4), transparent)' }} />

                {/* Close button */}
                <button
                  onClick={dismiss}
                  className="absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="w-4 h-4" />
                </button>

                {/* Icon */}
                <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5"
                  style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.2), rgba(124,58,237,0.15))', border: '1px solid rgba(99,102,241,0.3)' }}>
                  <Bot className="w-8 h-8 text-blue-400" />
                </div>

                {/* Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-medium mb-4">
                  <Sparkles className="w-3 h-3" />
                  Limited Free Spots
                </div>

                <h3 className="text-2xl font-extrabold text-white mb-2">Get a Free AI Demo</h3>
                <p className="text-gray-400 text-sm mb-7 leading-relaxed">
                  See exactly how an AI agent can automate your business.<br />
                  Free 30-minute call — no obligation, no payment.
                </p>

                <div className="flex flex-col gap-3">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=Hi! I'd like a free AI demo call.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-white font-semibold transition-all btn-shimmer"
                    style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}
                    onClick={dismiss}
                  >
                    <MessageCircle className="w-4 h-4" />
                    Book Free Demo
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <button
                    onClick={dismiss}
                    className="text-gray-500 text-sm hover:text-gray-300 transition-colors py-1"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
