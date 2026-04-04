'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, Clock, Building2, X, ExternalLink } from 'lucide-react';
import { agentsData } from '@/lib/utils';

const categories = ['All', 'Support', 'Sales', 'Marketing', 'eCommerce', 'Productivity', 'Industry'];

export default function AIAgentsPageClient() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedAgent, setSelectedAgent] = useState<typeof agentsData[0] | null>(null);
  const [expandedFeatures, setExpandedFeatures] = useState<string[]>([]);
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919997730768';

  const toggleFeatures = (agentId: string) => {
    setExpandedFeatures(prev =>
      prev.includes(agentId) ? prev.filter(id => id !== agentId) : [...prev, agentId]
    );
  };

  const filtered = activeCategory === 'All' ? agentsData : agentsData.filter(a => a.category === activeCategory);

  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute inset-0 grid-bg pointer-events-none" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-1/4 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent-green/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-blue text-sm font-medium mb-6">
            🤖 8 AI Agents Available
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-4xl lg:text-6xl font-extrabold text-white mb-5">
            AI Agents That Work{' '}
            <span className="gradient-text">24/7</span>{' '}
            For Your Business
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-gray-400 text-xl max-w-2xl mx-auto">
            Automate customer support, sales, and operations. Hindi + English. Deploy in days, not months.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto mb-12">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all ${activeCategory === cat ? 'bg-accent-blue text-white shadow-lg shadow-accent-blue/25' : 'bg-surface text-gray-400 border border-border-subtle hover:text-white hover:border-accent-blue/30'}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Agent Cards */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((agent, i) => (
              <motion.div
                key={agent.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className="bg-surface rounded-2xl border border-border-subtle p-6 card-hover flex flex-col"
              >
                {/* Header */}
                <div className="text-4xl mb-3">{agent.icon}</div>
                <h3 className="text-white font-bold text-lg mb-1">{agent.name}</h3>
                <p className="text-accent-green text-sm font-semibold mb-2">{agent.priceRange}</p>
                <p className="text-gray-400 text-xs mb-4 leading-relaxed">{agent.description}</p>

                {/* Setup Time */}
                <div className="flex items-center gap-1.5 mb-4">
                  <Clock className="w-3.5 h-3.5 text-accent-blue" />
                  <span className="text-xs text-gray-400">Setup: {agent.setupTime}</span>
                </div>

                {/* Features */}
                <ul className="space-y-1.5 mb-4 flex-1">
                  {(expandedFeatures.includes(agent.id) ? agent.features : agent.features.slice(0, 4)).map(f => (
                    <li key={f} className="flex items-start gap-2 text-xs text-gray-400">
                      <Check className="w-3.5 h-3.5 text-accent-green flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                  {agent.features.length > 4 && (
                    <li>
                      <button
                        onClick={() => toggleFeatures(agent.id)}
                        className="text-xs text-accent-blue hover:text-blue-400 transition-colors font-medium underline underline-offset-2 cursor-pointer"
                      >
                        {expandedFeatures.includes(agent.id)
                          ? '− Show less'
                          : `+${agent.features.length - 4} more features`}
                      </button>
                    </li>
                  )}
                </ul>

                {/* Industries */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {agent.industries.slice(0, 3).map(ind => (
                    <span key={ind} className="px-2 py-0.5 rounded-md badge-green text-xs">{ind}</span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=Hi! I'd like a demo of the ${agent.name}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-2 rounded-xl bg-accent-blue text-white text-xs font-semibold hover:bg-blue-500 transition-all"
                  >
                    Get Demo
                  </a>
                  <button
                    onClick={() => setSelectedAgent(agent)}
                    className="flex-1 py-2 rounded-xl border border-border-subtle text-gray-300 text-xs font-semibold hover:border-accent-blue/50 hover:text-white transition-all"
                  >
                    Know More
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Agent Detail Modal */}
      <AnimatePresence>
        {selectedAgent && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedAgent(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-x-4 top-20 bottom-4 z-50 max-w-2xl mx-auto overflow-y-auto rounded-2xl bg-surface border border-border-subtle shadow-2xl"
            >
              <div className="sticky top-0 bg-surface/95 backdrop-blur-sm border-b border-border-subtle px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{selectedAgent.icon}</span>
                  <div>
                    <h2 className="text-white font-bold text-lg">{selectedAgent.name}</h2>
                    <p className="text-accent-green text-sm font-semibold">{selectedAgent.priceRange}</p>
                  </div>
                </div>
                <button onClick={() => setSelectedAgent(null)} className="text-gray-400 hover:text-white transition-colors p-1">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6 space-y-6">
                <p className="text-gray-400 leading-relaxed">{selectedAgent.description}</p>

                {/* Setup & Category */}
                <div className="flex gap-3">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background border border-border-subtle text-sm">
                    <Clock className="w-4 h-4 text-accent-blue" />
                    <span className="text-gray-300">Setup: {selectedAgent.setupTime}</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-background border border-border-subtle text-sm">
                    <Building2 className="w-4 h-4 text-accent-green" />
                    <span className="text-gray-300">{selectedAgent.category}</span>
                  </div>
                </div>

                {/* All Features */}
                <div>
                  <h3 className="text-white font-bold mb-3">All Features</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {selectedAgent.features.map(f => (
                      <div key={f} className="flex items-start gap-2 text-sm text-gray-300">
                        <Check className="w-4 h-4 text-accent-green flex-shrink-0 mt-0.5" />
                        {f}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Industries */}
                <div>
                  <h3 className="text-white font-bold mb-3">Works For</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedAgent.industries.map(ind => (
                      <span key={ind} className="px-3 py-1.5 rounded-lg badge-green text-sm">{ind}</span>
                    ))}
                  </div>
                </div>

                {/* Sub-types if any */}
                {selectedAgent.subTypes && (
                  <div>
                    <h3 className="text-white font-bold mb-3">Available Variants</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedAgent.subTypes.map(sub => (
                        <div key={sub.name} className="bg-background rounded-xl border border-border-subtle p-4">
                          <h4 className="text-white font-semibold mb-2 text-sm">{sub.name}</h4>
                          <ul className="space-y-1">
                            {sub.features.map(f => (
                              <li key={f} className="flex items-center gap-2 text-xs text-gray-400">
                                <Check className="w-3 h-3 text-accent-green flex-shrink-0" />
                                {f}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* CTA */}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=Hi! I'd like a demo of the ${selectedAgent.name} (${selectedAgent.priceRange}).`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center py-3 rounded-xl bg-accent-blue text-white font-semibold hover:bg-blue-500 transition-all btn-glow"
                  >
                    Get Demo on WhatsApp
                  </a>
                  <a
                    href={`mailto:info.nexawebsolution@gmail.com?subject=Inquiry: ${selectedAgent.name}`}
                    className="flex-1 text-center py-3 rounded-xl border border-border-subtle text-white font-semibold hover:border-accent-blue/50 transition-all"
                  >
                    Email Us
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
