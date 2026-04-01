'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Settings, Rocket } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: MessageSquare,
    title: 'Tell us your business needs',
    description: 'Share your requirements, current workflow, and what you want to automate. Free 30-min consultation call.',
    color: 'blue',
  },
  {
    step: '02',
    icon: Settings,
    title: 'We build your AI agent',
    description: 'Our team trains the agent on your data, integrates with your systems, and tests thoroughly.',
    color: 'green',
  },
  {
    step: '03',
    icon: Rocket,
    title: 'Go live in 7 days',
    description: 'Your agent goes live on website & WhatsApp. We monitor, optimize, and provide ongoing support.',
    color: 'blue',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">
          How It <span className="gradient-text">Works</span>
        </h2>
        <p className="text-gray-400">Simple 3-step process to automate your business</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
        {/* Connector line */}
        <div className="hidden md:block absolute top-16 left-1/3 right-1/3 h-0.5 bg-gradient-to-r from-accent-blue to-accent-green" />

        {steps.map((s, i) => (
          <motion.div
            key={s.step}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="relative text-center"
          >
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 ${s.color === 'blue' ? 'bg-accent-blue/10 border border-accent-blue/20' : 'bg-accent-green/10 border border-accent-green/20'}`}>
              <s.icon className={`w-7 h-7 ${s.color === 'blue' ? 'text-accent-blue' : 'text-accent-green'}`} />
            </div>
            <div className={`text-xs font-bold tracking-widest mb-2 ${s.color === 'blue' ? 'text-accent-blue' : 'text-accent-green'}`}>
              STEP {s.step}
            </div>
            <h3 className="text-white font-bold text-xl mb-3">{s.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{s.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
