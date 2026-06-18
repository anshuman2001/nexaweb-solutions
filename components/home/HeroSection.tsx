'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, CalendarCheck, ShieldCheck, Award } from 'lucide-react';

const NAVY = '#1e3a8a';
const BLUE = '#2563eb';

const trustBadges = [
  { icon: ShieldCheck, label: 'MSME Registered', sub: 'Govt. of India Certified' },
  { icon: Award, label: 'ISO 9001:2015', sub: 'Quality Certified' },
  { icon: ShieldCheck, label: '5+ Years', sub: 'Industry Experience' },
];

const metrics = [
  { value: '50+', label: 'Projects Delivered', bar: 92 },
  { value: '98%', label: 'Client Satisfaction', bar: 98 },
  { value: '30+', label: 'Enterprise Clients', bar: 78 },
  { value: '3x', label: 'Avg. ROI Delivered', bar: 85 },
];

export default function HeroSection() {
  return (
    <section style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 60%, #e8efff 100%)', paddingTop: 96, paddingBottom: 80 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left — text */}
          <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>

            {/* Badge */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#e0e7ff', border: '1px solid #c7d2fe', borderRadius: 20, padding: '6px 16px', marginBottom: 24 }}>
              <span style={{ width: 8, height: 8, background: BLUE, borderRadius: '50%', display: 'inline-block' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: NAVY, letterSpacing: 0.3 }}>Enterprise Technology Partner</span>
            </div>

            {/* Headline */}
            <h1 style={{ fontSize: 'clamp(30px,5vw,60px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.1, marginBottom: 20, letterSpacing: -1 }}>
              Technology That<br />
              <span style={{ color: NAVY }}>Moves Business</span>{' '}
              <span style={{ background: `linear-gradient(135deg, ${BLUE}, #6366f1)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Forward</span>
            </h1>

            {/* Sub */}
            <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: '#475569', lineHeight: 1.75, marginBottom: 36, maxWidth: 520 }}>
              DigiAgentix delivers AI solutions, intelligent automation, cloud services, and enterprise software engineered to accelerate business growth.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10">
              <Link href="/services" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: NAVY, color: '#fff', padding: '14px 28px',
                borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none',
                boxShadow: '0 4px 14px rgba(30,58,138,0.35)',
              }}>
                Explore Solutions <ArrowRight size={16} />
              </Link>
              <Link href="/contact" style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                background: '#fff', color: NAVY, padding: '14px 28px',
                borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none',
                border: `2px solid ${NAVY}`,
              }}>
                <CalendarCheck size={16} /> Schedule a Consultation
              </Link>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {trustBadges.map(({ icon: Icon, label, sub }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <div style={{ width: 36, height: 36, background: '#e0e7ff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={18} color={NAVY} />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>{label}</div>
                    <div style={{ fontSize: 10, color: '#64748b' }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — platform card */}
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <div style={{
              background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0',
              boxShadow: '0 20px 60px rgba(30,58,138,0.10), 0 4px 16px rgba(0,0,0,0.06)',
              padding: 28, overflow: 'hidden',
            }}>
              {/* Card header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>DigiAgentix Platform Overview</div>
                  <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>Enterprise Performance Dashboard</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 20, padding: '4px 12px' }}>
                  <span style={{ width: 7, height: 7, background: '#22c55e', borderRadius: '50%', display: 'inline-block' }} />
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#15803d' }}>All Systems Active</span>
                </div>
              </div>

              {/* Metrics with progress bars */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 24 }}>
                {metrics.map((m) => (
                  <div key={m.label}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                      <span style={{ fontSize: 13, color: '#334155', fontWeight: 500 }}>{m.label}</span>
                      <span style={{ fontSize: 14, fontWeight: 800, color: NAVY }}>{m.value}</span>
                    </div>
                    <div style={{ height: 6, background: '#f1f5f9', borderRadius: 4, overflow: 'hidden' }}>
                      <motion.div
                        style={{ height: '100%', background: `linear-gradient(90deg, ${NAVY}, ${BLUE})`, borderRadius: 4 }}
                        initial={{ width: 0 }}
                        animate={{ width: `${m.bar}%` }}
                        transition={{ duration: 1.2, delay: 0.8 }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: '#f1f5f9', margin: '20px 0' }} />

              {/* Service tags */}
              <div style={{ marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 600, color: '#64748b', letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>Services Active</div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {['AI & ML', 'Automation', 'Cloud', 'Software Dev', 'Consulting', 'Digital Transformation'].map(tag => (
                    <span key={tag} style={{ fontSize: 11, background: '#f0f4ff', color: NAVY, border: '1px solid #c7d2fe', borderRadius: 20, padding: '4px 12px', fontWeight: 600 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom stats */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                {[
                  { v: '50+', l: 'Projects' },
                  { v: '30+', l: 'Clients' },
                  { v: '4.9★', l: 'Rating' },
                ].map(s => (
                  <div key={s.l} style={{ background: '#f8fafc', borderRadius: 10, padding: '12px 8px', textAlign: 'center', border: '1px solid #e2e8f0' }}>
                    <div style={{ fontSize: 20, fontWeight: 800, color: NAVY }}>{s.v}</div>
                    <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
