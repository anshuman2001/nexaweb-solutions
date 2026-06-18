'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { portfolioData } from '@/lib/utils';

const filters = ['All', 'AI Agent', 'eCommerce', 'Business', 'Landing Page'];

const NAVY = '#1e3a8a';
const BLUE = '#2563eb';
const SLATE = '#334155';
const MUTED = '#64748b';
const BORDER = '#e2e8f0';

type PortfolioItem = {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  techStack: string[];
  liveUrl?: string;
  description: string;
  featured: boolean;
};

export default function PortfolioPageClient() {
  const [active, setActive] = useState('All');
  const filtered: PortfolioItem[] = (active === 'All' ? portfolioData : portfolioData.filter(p => p.category === active)) as PortfolioItem[];

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 50%, #e8efff 100%)' }}>
      {/* Hero */}
      <section style={{ padding: '108px 24px 64px', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 100, background: '#e0e7ff', border: '1px solid #c7d2fe', color: NAVY, fontSize: 13, fontWeight: 600, marginBottom: 20 }}
          >
            Our Work
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 800, color: '#0f172a', marginBottom: 16, lineHeight: 1.15 }}
          >
            Projects That{' '}
            <span style={{ background: 'linear-gradient(135deg, #1e3a8a, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Deliver Results
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ color: MUTED, fontSize: 17, lineHeight: 1.6 }}
          >
            50+ projects delivered across AI agents and web design
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section style={{ padding: '0 24px 40px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8 }}>
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActive(f)}
              style={{
                padding: '8px 20px', borderRadius: 100, fontSize: 13, fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.15s',
                background: active === f ? NAVY : '#fff',
                color: active === f ? '#fff' : SLATE,
                border: `1.5px solid ${active === f ? NAVY : BORDER}`,
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Portfolio Grid */}
      <section style={{ padding: '0 24px 96px', maxWidth: 1280, margin: '0 auto' }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.07 }}
                style={{
                  background: '#fff', borderRadius: 16, border: `1px solid ${BORDER}`,
                  overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,0,0,0.06)',
                  transition: 'box-shadow 0.2s, transform 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(30,58,138,0.12)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 8px rgba(0,0,0,0.06)';
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                }}
              >
                <div style={{ position: 'relative', height: 224, overflow: 'hidden' }}>
                  <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                  />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15,23,42,0.25) 0%, transparent 50%)' }} />
                  <div style={{ position: 'absolute', top: 12, left: 12, padding: '4px 10px', borderRadius: 100, background: NAVY, color: '#fff', fontSize: 11, fontWeight: 700 }}>
                    {project.category}
                  </div>
                  {project.featured && (
                    <div style={{ position: 'absolute', top: 12, right: 12, padding: '4px 10px', borderRadius: 100, background: '#059669', color: '#fff', fontSize: 11, fontWeight: 700 }}>
                      Featured
                    </div>
                  )}
                </div>
                <div style={{ padding: 24 }}>
                  <h3 style={{ color: '#0f172a', fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{project.title}</h3>
                  <p style={{ color: MUTED, fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>{project.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 16 }}>
                    {project.techStack.map(t => (
                      <span key={t} style={{ padding: '3px 8px', borderRadius: 6, background: '#f1f5f9', border: `1px solid ${BORDER}`, color: SLATE, fontSize: 12, fontWeight: 500 }}>
                        {t}
                      </span>
                    ))}
                  </div>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: BLUE, fontSize: 13, fontWeight: 600, textDecoration: 'none' }}
                    >
                      <ExternalLink style={{ width: 13, height: 13 }} />
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
