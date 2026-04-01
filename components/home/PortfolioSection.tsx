'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { portfolioData } from '@/lib/utils';

const filters = ['All', 'AI Agent', 'eCommerce', 'Business'];

export default function PortfolioSection() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? portfolioData.slice(0, 3) : portfolioData.filter(p => p.category === active).slice(0, 3);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">
          Featured <span className="gradient-text">Portfolio</span>
        </h2>
        <p className="text-gray-400 mb-8">Real projects, real results</p>
        <div className="flex flex-wrap justify-center gap-2">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${active === f ? 'bg-accent-blue text-white' : 'bg-surface text-gray-400 border border-border-subtle hover:text-white'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <AnimatePresence mode="wait">
          {filtered.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-surface rounded-2xl border border-border-subtle overflow-hidden card-hover"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-accent-blue/90 text-white text-xs font-medium">
                  {project.category}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-white mb-2">{project.title}</h3>
                <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techStack.map(t => (
                    <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 text-gray-400 text-xs border border-border-subtle">{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="text-center mt-10">
        <Link
          href="/portfolio"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-border-subtle text-white font-semibold hover:border-accent-blue/50 hover:bg-white/5 transition-all"
        >
          View All Projects
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </section>
  );
}
