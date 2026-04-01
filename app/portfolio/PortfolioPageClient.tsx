'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { portfolioData } from '@/lib/utils';

const filters = ['All', 'AI Agent', 'eCommerce', 'Business', 'Landing Page'];

export default function PortfolioPageClient() {
  const [active, setActive] = useState('All');
  const filtered = active === 'All' ? portfolioData : portfolioData.filter(p => p.category === active);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-blue text-sm font-medium mb-6">
            🚀 Our Work
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl lg:text-5xl font-extrabold text-white mb-5">
            Projects That <span className="gradient-text">Deliver Results</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            className="text-gray-400 text-lg">
            50+ projects delivered across AI agents and web design
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
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
      </section>

      {/* Portfolio Grid */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.07 }}
                className="group bg-surface rounded-2xl border border-border-subtle overflow-hidden card-hover"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-accent-blue text-white text-xs font-semibold">
                    {project.category}
                  </div>
                  {project.featured && (
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-accent-green text-black text-xs font-semibold">
                      Featured
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-white font-bold text-lg mb-2">{project.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.techStack.map(t => (
                      <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 border border-border-subtle text-gray-400 text-xs">{t}</span>
                    ))}
                  </div>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-accent-blue text-sm font-medium hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      View Live
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
