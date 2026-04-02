'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Bot, Zap, Globe, Sparkles } from 'lucide-react';

const badges = [
  { icon: '🤖', text: '24/7 AI Support' },
  { icon: '🇮🇳', text: 'Hindi + English' },
  { icon: '💬', text: 'WhatsApp Ready' },
];

export default function HeroSection() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919997730768';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">

      {/* ── Deep space gradient base ── */}
      <div className="absolute inset-0 bg-[#07090f]">
        <div className="absolute inset-0 aurora-bg" />
        <div className="absolute inset-0 grid-bg opacity-60" />
      </div>

      {/* ── 3D floating orbs ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large deep glow — center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)' }} />

        {/* Orb 1 — top left, blue */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-20 -left-20 w-[500px] h-[500px] rounded-full animate-orb"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.14) 0%, transparent 65%)' }}
        />

        {/* Orb 2 — bottom right, purple */}
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 15, 0], scale: [1, 1.12, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -bottom-32 -right-32 w-[600px] h-[600px] rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 65%)' }}
        />

        {/* Orb 3 — top right, green */}
        <motion.div
          animate={{ x: [0, -15, 0], y: [0, 25, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute top-10 right-10 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.09) 0%, transparent 65%)' }}
        />

        {/* Floating geometric rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full border border-blue-500/8"
          style={{ borderStyle: 'dashed' }}
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 rounded-full border border-purple-500/6"
          style={{ borderStyle: 'dashed' }}
        />

        {/* Floating particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4 + i * 1.5, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
            className="absolute w-1 h-1 rounded-full bg-blue-400"
            style={{
              left: `${15 + i * 14}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">

        {/* Top badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-blue-500/30 bg-blue-500/8 text-blue-300 text-sm font-medium mb-8 animate-glow-ring"
        >
          <Sparkles className="w-4 h-4" />
          India&apos;s Leading AI Agent Builder
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight tracking-tight mb-6"
        >
          We Build{' '}
          <span className="gradient-text-luxury">AI Agents</span>
          {' & '}
          <br className="hidden sm:block" />
          Websites That{' '}
          <span className="relative inline-block">
            <span className="gradient-text">Grow</span>
            <motion.div
              className="absolute -bottom-2 left-0 right-0 h-[3px] rounded-full"
              style={{ background: 'linear-gradient(90deg, #3b82f6, #a78bfa, #34d399)' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.9 }}
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
          <span className="text-emerald-400 font-semibold">starting ₹15,000</span>
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
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold text-lg transition-all btn-glow btn-shimmer text-white"
            style={{ background: 'linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)' }}
          >
            <Bot className="w-5 h-5" />
            Explore AI Agents
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-white/10 text-white font-semibold text-lg hover:border-blue-500/40 hover:bg-white/5 transition-all glass-luxury"
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
              className="flex items-center gap-2 px-4 py-2 rounded-full glass-luxury text-sm text-gray-300 animate-border-glow"
            >
              <span>{badge.icon}</span>
              {badge.text}
            </motion.div>
          ))}
        </motion.div>

        {/* Hero visual — 3D dashboard card */}
        <motion.div
          initial={{ opacity: 0, y: 60, rotateX: 15 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-4xl"
          style={{ perspective: '1200px' }}
        >
          {/* Glow behind card */}
          <div className="absolute -inset-4 rounded-3xl opacity-40 blur-2xl"
            style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.3), rgba(124,58,237,0.2), rgba(16,185,129,0.15))' }} />

          <div className="relative rounded-2xl border border-white/10 bg-[#0c0f1a]/80 p-6 backdrop-blur-xl overflow-hidden luxury-border">
            {/* Top bar */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs text-gray-500 font-mono tracking-wide">NexaWeb AI Dashboard — Live</span>
              <span className="ml-auto flex items-center gap-1.5 text-xs text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                All agents online
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { name: 'Support Agent', status: 'Active', color: 'green', queries: '2.4k', icon: '🤖' },
                { name: 'WhatsApp Bot', status: 'Active', color: 'green', queries: '1.8k', icon: '💬' },
                { name: 'Sales Agent', status: 'Active', color: 'blue', queries: '890', icon: '📈' },
                { name: 'Email Agent', status: 'Running', color: 'purple', queries: '3.2k', icon: '📧' },
              ].map((agent, i) => (
                <motion.div
                  key={agent.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 + i * 0.1 }}
                  className="bg-[#07090f]/70 rounded-xl p-3.5 border border-white/5 text-left hover:border-blue-500/20 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-lg">{agent.icon}</span>
                    <span className={`w-2 h-2 rounded-full animate-pulse ${
                      agent.color === 'green' ? 'bg-emerald-400' :
                      agent.color === 'purple' ? 'bg-purple-400' : 'bg-blue-400'
                    }`} />
                  </div>
                  <p className="text-xs font-semibold text-white truncate">{agent.name}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{agent.queries} queries</p>
                  <p className={`text-xs mt-1.5 font-medium ${
                    agent.color === 'green' ? 'text-emerald-400' :
                    agent.color === 'purple' ? 'text-purple-400' : 'text-blue-400'
                  }`}>{agent.status}</p>
                </motion.div>
              ))}
            </div>

            {/* Chat preview */}
            <div className="mt-4 bg-[#07090f]/60 rounded-xl p-4 border border-white/5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
                  🤖
                </div>
                <span className="text-xs text-gray-400 font-medium">Customer Support Agent</span>
                <span className="text-xs text-emerald-400 ml-auto">● Online</span>
              </div>
              <div className="space-y-2">
                <div className="flex justify-end">
                  <div className="bg-blue-600/20 text-blue-200 text-xs rounded-xl rounded-tr-sm px-3 py-2 max-w-xs border border-blue-500/10">
                    नमस्ते! मेरा ऑर्डर कहाँ है?
                  </div>
                </div>
                <div className="flex gap-2 items-end">
                  <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center text-xs"
                    style={{ background: 'linear-gradient(135deg, #2563eb, #7c3aed)' }}>
                    🤖
                  </div>
                  <div className="bg-white/5 text-gray-300 text-xs rounded-xl rounded-tl-sm px-3 py-2 max-w-xs border border-white/5">
                    नमस्ते! आपका ऑर्डर #12345 आज शाम 6 बजे डिलीवर होगा 🚀
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
