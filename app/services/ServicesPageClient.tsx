'use client';

import { motion } from 'framer-motion';
import { Check, Clock, Code2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    icon: '🛒',
    name: 'eCommerce Website',
    priceRange: '₹25,000 - ₹1,00,000',
    timeline: '2-4 weeks',
    description: 'Full-featured online store with payment gateway, inventory management, and order tracking.',
    features: ['Product catalog & variants', 'Razorpay / Stripe payment', 'Order management', 'Inventory tracking', 'Customer accounts', 'Mobile-first design', 'SEO optimized', 'Admin dashboard'],
    techStack: ['Next.js', 'Tailwind CSS', 'Supabase', 'Razorpay', 'Cloudinary'],
    color: 'blue',
  },
  {
    icon: '🏢',
    name: 'Business Website',
    priceRange: '₹15,000 - ₹50,000',
    timeline: '1-2 weeks',
    description: 'Professional multi-page website that builds credibility and converts visitors to leads.',
    features: ['Up to 10 pages', 'Contact & lead forms', 'Google Maps integration', 'WhatsApp chat button', 'Blog / News section', 'SEO setup', 'Mobile responsive', 'Fast loading'],
    techStack: ['Next.js', 'Tailwind CSS', 'Supabase', 'Resend', 'Framer Motion'],
    color: 'green',
  },
  {
    icon: '⚡',
    name: 'Landing Page',
    priceRange: '₹8,000 - ₹25,000',
    timeline: '3-5 days',
    description: 'High-converting single page for product launches, ad campaigns, and lead generation.',
    features: ['Single page design', 'Conversion optimized', 'A/B test ready', 'Lead capture form', 'Analytics integration', 'Mobile first', 'Fast CDN delivery', 'Video support'],
    techStack: ['Next.js', 'Tailwind CSS', 'Framer Motion', 'Resend'],
    color: 'blue',
  },
  {
    icon: '🎨',
    name: 'Portfolio Website',
    priceRange: '₹10,000 - ₹30,000',
    timeline: '1 week',
    description: 'Showcase your work, skills, and achievements with a stunning, modern portfolio.',
    features: ['Project showcase', 'Skills & experience', 'Contact form', 'Blog option', 'Dark/light mode', 'Animations', 'Resume download', 'SEO friendly'],
    techStack: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    color: 'green',
  },
  {
    icon: '📝',
    name: 'CMS Website',
    priceRange: '₹20,000 - ₹60,000',
    timeline: '2-3 weeks',
    description: 'Content management system so you can update your website without any coding knowledge.',
    features: ['Easy content editing', 'Blog management', 'Media library', 'User roles', 'Scheduled publishing', 'SEO tools', 'Multi-language', 'Custom fields'],
    techStack: ['Next.js', 'Supabase', 'Tailwind CSS', 'Cloudinary'],
    color: 'blue',
  },
  {
    icon: '🤖',
    name: 'Website + AI Agent Bundle',
    priceRange: 'Custom Pricing',
    timeline: '2-3 weeks',
    description: 'Best value: get a professional website AND an AI agent at a bundled discount price.',
    features: ['Full website build', 'Custom AI chatbot', 'WhatsApp integration', 'Lead capture', 'CRM integration', 'Priority support', 'Bundle discount', '30-day support'],
    techStack: ['Next.js', 'Anthropic AI', 'WhatsApp API', 'Supabase', 'Tailwind'],
    color: 'green',
    featured: true,
  },
];

export default function ServicesPageClient() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999';

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="relative max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-green text-sm font-medium mb-6">
            🌐 Web Design Services
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl font-extrabold text-white mb-5">
            Professional Websites Built with{' '}
            <span className="gradient-text">Modern Tech</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-gray-400 text-xl max-w-2xl mx-auto mb-4">
            Fast, beautiful, mobile-first websites that drive results. Built with Next.js for maximum performance.
          </motion.p>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
            className="text-emerald-400 font-semibold text-2xl">
            Starting at ₹4,999
          </motion.p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`relative bg-surface rounded-2xl border p-7 card-hover ${s.featured ? 'border-accent-green/40 shadow-xl shadow-accent-green/10' : 'border-border-subtle'}`}
            >
              {s.featured && (
                <div className="absolute -top-3 left-6 px-3 py-1 rounded-full bg-accent-green text-black text-xs font-bold">
                  Best Value 🎉
                </div>
              )}
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-white font-bold text-xl mb-1">{s.name}</h3>
              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
                <Clock className="w-3.5 h-3.5" />
                {s.timeline}
              </div>
              <p className="text-gray-400 text-sm mb-5 leading-relaxed">{s.description}</p>

              <ul className="space-y-2 mb-5">
                {s.features.map(f => (
                  <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
                    <Check className={`w-4 h-4 flex-shrink-0 ${s.color === 'blue' ? 'text-accent-blue' : 'text-accent-green'}`} />
                    {f}
                  </li>
                ))}
              </ul>

              {/* Tech Stack */}
              <div className="mb-5">
                <p className="text-xs text-gray-500 mb-2">Tech Stack:</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.techStack.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 border border-border-subtle text-xs text-gray-400">{t}</span>
                  ))}
                </div>
              </div>

              <a
                href={`https://wa.me/${whatsappNumber}?text=Hi! I'm interested in the ${s.name} service.`}
                target="_blank"
                rel="noopener noreferrer"
                className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${s.featured ? 'bg-accent-green text-black hover:bg-green-400' : s.color === 'blue' ? 'bg-accent-blue/10 border border-accent-blue/20 text-accent-blue hover:bg-accent-blue hover:text-white' : 'bg-accent-green/10 border border-accent-green/20 text-accent-green hover:bg-accent-green hover:text-black'}`}
              >
                Get Quote
              </a>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
