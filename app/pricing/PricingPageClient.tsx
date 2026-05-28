'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const aiPlans = [
  {
    name: 'Starter',
    price: '₹15,000',
    description: 'Perfect for small businesses getting started with AI automation',
    features: ['Basic FAQ chatbot', 'Website integration only', 'Hindi + English', 'Up to 500 queries/month', '5-day setup', 'Email support', 'Basic analytics'],
    popular: false,
  },
  {
    name: 'Growth',
    price: '₹35,000',
    description: 'Full AI agent with multi-channel support for growing businesses',
    features: ['Full AI agent', 'Website + WhatsApp', 'CRM integration', 'Lead collection', 'Human handoff', 'Up to 2000 queries/month', '7-day setup', 'Priority support', 'Analytics dashboard'],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: '₹75,000+',
    description: 'Custom AI solution for large businesses with complex needs',
    features: ['Custom AI agent', 'All channels', 'Custom integrations', 'Unlimited queries', 'Dedicated manager', 'SLA guarantee', 'Training sessions', 'White-label option', 'Priority 24/7 support'],
    popular: false,
  },
];

const websitePlans = [
  {
    name: 'Basic',
    price: '₹15,000',
    description: 'Simple, clean website for small businesses',
    features: ['Up to 5 pages', 'Mobile responsive', 'Contact form', 'Google Maps', 'Basic SEO', '1 revision round'],
    popular: false,
  },
  {
    name: 'Professional',
    price: '₹35,000',
    description: 'Feature-rich website for serious businesses',
    features: ['Up to 10 pages', 'CMS integration', 'Blog system', 'Advanced SEO', 'Analytics setup', 'WhatsApp button', '2 revision rounds', 'Performance optimization'],
    popular: true,
  },
  {
    name: 'Premium',
    price: '₹75,000',
    description: 'Full-featured eCommerce or custom web application',
    features: ['eCommerce ready', 'Payment gateway', 'AI chat integration', 'Custom dashboard', 'API integrations', 'Unlimited pages', '3 revision rounds', '30-day support'],
    popular: false,
  },
];

const maintenancePlans = [
  { name: 'Basic', price: '₹2,000/month', features: ['Hosting management', 'Security updates', 'Monthly backup', 'Email support'] },
  { name: 'Standard', price: '₹5,000/month', features: ['Everything in Basic', 'Content updates (2/month)', 'Performance monitoring', 'Priority support'] },
  { name: 'Premium', price: '₹10,000/month', features: ['Everything in Standard', 'Unlimited content updates', 'AI agent monitoring', 'Dedicated support', 'Monthly report'] },
];

export default function PricingPageClient() {
  const [activeTab, setActiveTab] = useState<'ai' | 'website'>('website');

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Simple, Transparent <span className="gradient-text">Pricing</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg mb-2">
            One-time setup cost. No hidden fees. Monthly maintenance optional.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
            className="text-emerald-400 font-semibold text-lg mb-8">
            Websites starting at ₹4,999 · Get a free custom quote
          </motion.p>

          {/* Tab Toggle */}
          <div className="inline-flex rounded-xl border border-border-subtle bg-surface p-1">
            {(['ai', 'website'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${activeTab === tab ? 'bg-accent-blue text-white' : 'text-gray-400 hover:text-white'}`}
              >
                {tab === 'ai' ? '🤖 AI Agents' : '🌐 Websites'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {(activeTab === 'ai' ? aiPlans : websitePlans).map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative rounded-2xl border p-8 ${plan.popular ? 'border-accent-blue bg-accent-blue/5 shadow-xl shadow-accent-blue/10' : 'border-border-subtle bg-surface'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-accent-blue text-white text-sm font-semibold">
                  ⭐ Most Popular
                </div>
              )}
              <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
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
                {plan.popular ? 'Get Started' : 'Contact Us'}
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Monthly Maintenance */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-24">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-white mb-2">Monthly <span className="gradient-text">Maintenance</span></h2>
          <p className="text-gray-400">Keep your website & AI agent running smoothly</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {maintenancePlans.map((m, i) => (
            <motion.div key={m.name} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-surface rounded-xl border border-border-subtle p-6">
              <h3 className="text-white font-bold mb-4">{m.name}</h3>
              <ul className="space-y-2">
                {m.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-400">
                    <Check className="w-3.5 h-3.5 text-accent-green flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
