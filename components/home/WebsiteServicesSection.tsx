'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShoppingCart, Building2, Zap, User, ArrowRight } from 'lucide-react';

const services = [
  {
    icon: ShoppingCart,
    name: 'eCommerce Website',
    description: 'Full online store with payment gateway & inventory management',
    price: '₹25,000+',
    color: 'blue',
  },
  {
    icon: Building2,
    name: 'Business Website',
    description: 'Professional multi-page website that converts visitors to leads',
    price: '₹15,000+',
    color: 'green',
  },
  {
    icon: Zap,
    name: 'Landing Page',
    description: 'High-converting single page for campaigns & lead generation',
    price: '₹8,000+',
    color: 'blue',
  },
  {
    icon: User,
    name: 'Portfolio Website',
    description: 'Showcase your work with a stunning, modern portfolio',
    price: '₹10,000+',
    color: 'green',
  },
];

export default function WebsiteServicesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-green text-sm font-medium mb-4">
          🌐 Primary Service
        </div>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">
          Professional <span className="gradient-text">Websites</span>
        </h2>
        <p className="text-emerald-400 font-semibold text-lg mb-2">Starting at ₹4,999</p>
        <p className="text-gray-400 max-w-xl mx-auto">
          Fast, beautiful, mobile-first websites built with modern technology
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((s, i) => (
          <motion.div
            key={s.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface rounded-xl border border-border-subtle p-5 card-hover group"
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${s.color === 'blue' ? 'bg-accent-blue/10' : 'bg-accent-green/10'}`}>
              <s.icon className={`w-5 h-5 ${s.color === 'blue' ? 'text-accent-blue' : 'text-accent-green'}`} />
            </div>
            <h3 className="font-bold text-white mb-2 group-hover:text-accent-blue transition-colors">{s.name}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{s.description}</p>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 text-accent-blue font-semibold hover:gap-3 transition-all"
        >
          View All Services & Pricing
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
}
