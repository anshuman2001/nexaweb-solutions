'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';
import { agentsData } from '@/lib/utils';

export default function AIAgentsSection() {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-blue text-sm font-medium mb-4">
          🤖 AI Automation
        </div>
        <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
          AI Agents For{' '}
          <span className="gradient-text">Every Business</span>
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Replace repetitive tasks with intelligent automation. Our agents work 24/7 in Hindi & English.
        </p>
      </motion.div>

      {/* Agent Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {agentsData.map((agent, i) => (
          <motion.div
            key={agent.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group relative bg-surface rounded-2xl border border-border-subtle p-6 card-hover cursor-pointer"
          >
            {/* Popular badge for first agent */}
            {i === 0 && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-accent-blue text-white text-xs font-semibold">
                Most Popular
              </div>
            )}

            {/* Icon */}
            <div className="text-4xl mb-4">{agent.icon}</div>

            {/* Name & Price */}
            <h3 className="text-white font-bold text-lg mb-4 group-hover:text-accent-blue transition-colors">
              {agent.name}
            </h3>

            {/* Features */}
            <ul className="space-y-2 mb-5">
              {agent.features.slice(0, 3).map((f) => (
                <li key={f} className="flex items-start gap-2 text-sm text-gray-400">
                  <Check className="w-4 h-4 text-accent-green flex-shrink-0 mt-0.5" />
                  {f}
                </li>
              ))}
            </ul>

            {/* Setup Time */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg badge-blue text-xs mb-5">
              ⏱ {agent.setupTime}
            </div>

            {/* Button */}
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999'}?text=Hi! I'd like a demo of the ${agent.name}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-sm font-semibold hover:bg-accent-blue hover:text-white transition-all"
            >
              Get Demo
              <ArrowRight className="w-4 h-4" />
            </a>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center mt-12"
      >
        <Link
          href="/ai-agents"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-accent-blue text-white font-semibold hover:bg-blue-500 transition-all btn-glow"
        >
          View All AI Agents & Details
          <ArrowRight className="w-5 h-5" />
        </Link>
      </motion.div>
    </section>
  );
}
