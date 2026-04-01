'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Check, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Starter',
    price: '₹15,000',
    description: 'Perfect for small businesses getting started with AI',
    features: ['Basic chatbot', 'FAQ handling only', 'Website integration', 'Hindi + English', '5 days setup', 'Email support'],
    popular: false,
    cta: 'Get Started',
  },
  {
    name: 'Growth',
    price: '₹35,000',
    description: 'Full AI agent for growing businesses',
    features: ['Full AI agent', 'Hindi + English', 'Website + WhatsApp', 'CRM integration', 'Lead collection', 'Human handoff', 'Priority support', '7 days setup'],
    popular: true,
    cta: 'Most Popular',
  },
  {
    name: 'Enterprise',
    price: '₹75,000+',
    description: 'Custom solution for large businesses',
    features: ['Custom AI agent', 'All channels', 'Custom integrations', 'Dedicated manager', 'SLA guarantee', 'Training sessions', 'White-label option', 'Priority support'],
    popular: false,
    cta: 'Contact Us',
  },
];

export default function PricingSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">
          Simple <span className="gradient-text">Pricing</span>
        </h2>
        <p className="text-gray-400">Transparent pricing, no hidden fees. One-time setup cost.</p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`relative rounded-2xl border p-8 ${plan.popular ? 'border-accent-blue bg-accent-blue/5 shadow-xl shadow-accent-blue/10' : 'border-border-subtle bg-surface'}`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-accent-blue text-white text-sm font-semibold">
                ⭐ Most Popular
              </div>
            )}
            <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
            <div className="text-3xl font-extrabold gradient-text mb-2">{plan.price}</div>
            <p className="text-gray-400 text-sm mb-6 leading-relaxed">{plan.description}</p>
            <ul className="space-y-3 mb-8">
              {plan.features.map(f => (
                <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                  <Check className="w-4 h-4 text-accent-green flex-shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${plan.popular ? 'bg-accent-blue text-white hover:bg-blue-500 btn-glow' : 'border border-border-subtle text-white hover:border-accent-blue/50 hover:bg-white/5'}`}
            >
              {plan.cta}
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-8">
        <Link href="/pricing" className="inline-flex items-center gap-2 text-accent-blue font-semibold hover:gap-3 transition-all">
          View Full Pricing Details
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
