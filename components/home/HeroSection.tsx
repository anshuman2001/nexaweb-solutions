'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Bot, Zap, Globe } from 'lucide-react';

const badges = [
  { icon: '🤖', text: '24/7 AI Support' },
  { icon: '🇮🇳', text: 'Hindi + English' },
  { icon: '💬', text: 'WhatsApp Ready' },
];

export default function HeroSection() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden grid-bg pt-20">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-green/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-blue/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent-blue/30 bg-accent-blue/10 text-accent-blue text-sm font-medium mb-8"
        >
          <Zap className="w-4 h-4" />
          India's Leading AI Agent Builder
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6"
        >
          We Build{' '}
          <span className="gradient-text">AI Agents</span>
          {' & '}
          <br className="hidden sm:block" />
          Websites That{' '}
          <span className="relative">
            <span className="gradient-text">Grow</span>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-accent-blue to-accent-green rounded-full"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            />
          </span>
          {' '}Your Business
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Automate customer support, sales & operations with AI —{' '}
          <span className="text-accent-green font-semibold">starting ₹15,000</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-14"
        >
          <Link
            href="/ai-agents"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-accent-blue text-white font-semibold text-lg hover:bg-blue-500 transition-all btn-glow"
          >
            <Bot className="w-5 h-5" />
            Explore AI Agents
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-border-subtle text-white font-semibold text-lg hover:border-accent-blue/50 hover:bg-white/5 transition-all"
          >
            <Globe className="w-5 h-5" />
            View Our Work
          </Link>
        </motion.div>

        {/* Floating badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {badges.map((badge, i) => (
            <motion.div
              key={badge.text}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-gray-300 border border-white/10"
            >
              <span>{badge.icon}</span>
              {badge.text}
            </motion.div>
          ))}
        </motion.div>

        {/* Hero visual - animated agent cards preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="relative mx-auto max-w-4xl"
        >
          <div className="rounded-2xl border border-border-subtle bg-surface/50 p-6 backdrop-blur-sm overflow-hidden">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-2 text-xs text-gray-500 font-mono">NexaWeb AI Dashboard</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: 'Support Agent', status: 'Active', color: 'green', queries: '2.4k' },
                { name: 'WhatsApp Bot', status: 'Active', color: 'green', queries: '1.8k' },
                { name: 'Sales Agent', status: 'Active', color: 'blue', queries: '890' },
                { name: 'Email Agent', status: 'Running', color: 'blue', queries: '3.2k' },
              ].map((agent, i) => (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  className="bg-background rounded-xl p-3 border border-border-subtle text-left"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Bot className="w-4 h-4 text-accent-blue" />
                    <span className={`w-2 h-2 rounded-full ${agent.color === 'green' ? 'bg-accent-green' : 'bg-accent-blue'} animate-pulse`} />
                  </div>
                  <p className="text-xs font-medium text-white truncate">{agent.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{agent.queries} queries today</p>
                  <p className={`text-xs mt-1 font-medium ${agent.color === 'green' ? 'text-accent-green' : 'text-accent-blue'}`}>{agent.status}</p>
                </motion.div>
              ))}
            </div>
            {/* Chat preview */}
            <div className="mt-4 bg-background rounded-xl p-4 border border-border-subtle">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full bg-accent-blue flex items-center justify-center">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs text-gray-400">Customer Support Agent • Online</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-end">
                  <div className="bg-accent-blue/20 text-blue-200 text-xs rounded-xl rounded-tr-sm px-3 py-2 max-w-xs">
                    नमस्ते! मेरा ऑर्डर कहाँ है?
                  </div>
                </div>
                <div className="flex gap-2">
                  <div className="w-5 h-5 rounded-full bg-accent-blue/20 flex-shrink-0 flex items-center justify-center">
                    <Bot className="w-3 h-3 text-accent-blue" />
                  </div>
                  <div className="bg-surface-2 text-gray-300 text-xs rounded-xl rounded-tl-sm px-3 py-2 max-w-xs">
                    नमस्ते! आपका ऑर्डर #12345 आज शाम 6 बजे तक डिलीवर हो जाएगा। ट्रैकिंग लिंक: track.example.com 🚀
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
