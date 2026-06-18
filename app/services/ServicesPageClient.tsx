'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Brain, Cog, Code2, Cloud, RefreshCw, Briefcase,
  ArrowRight, CheckCircle2, ChevronRight, CalendarCheck,
  Target, Shield, BarChart3, Users, Layers,
} from 'lucide-react';

/* ── Design tokens (matches homepage) ── */
const NAVY   = '#1e3a8a';
const BLUE   = '#2563eb';
const SLATE  = '#334155';
const MUTED  = '#64748b';
const BORDER = '#e2e8f0';
const LIGHT  = '#f8fafc';
const LIGHTER = '#f1f5f9';

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

function SectionLabel({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
      <div style={{ width: 24, height: 2, background: dark ? '#60a5fa' : BLUE, borderRadius: 2 }} />
      <span style={{ fontSize: 12, fontWeight: 700, color: dark ? '#60a5fa' : BLUE, letterSpacing: 2, textTransform: 'uppercase' }}>{text}</span>
    </div>
  );
}

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
const solutions = [
  {
    icon: Brain,
    title: 'AI & Machine Learning',
    tagline: 'Intelligent systems that learn and decide',
    desc: 'We design and deploy custom AI models, NLP systems, and predictive analytics platforms that give your business the ability to act on data with speed and confidence.',
    capabilities: [
      'Custom ML model development & training',
      'Natural language processing (NLP)',
      'Predictive analytics & forecasting',
      'Computer vision & image intelligence',
      'AI-powered decision automation',
      'Model monitoring & retraining',
    ],
    outcomes: ['Faster decision-making', 'Reduced operational error', 'Revenue from data assets'],
  },
  {
    icon: Cog,
    title: 'Intelligent Automation',
    tagline: 'Eliminate repetition. Accelerate throughput.',
    desc: 'From document processing to multi-channel AI-driven operations — we automate the workflows that consume your team\'s time, reduce errors, and keep your business running 24/7.',
    capabilities: [
      'Robotic process automation (RPA)',
      'Intelligent document processing',
      'Multi-channel workflow automation',
      'API integration & orchestration',
      'AI agent deployment & management',
      'Business rule engine configuration',
    ],
    outcomes: ['60–80% task time reduction', 'Near-zero processing errors', '24/7 operational continuity'],
  },
  {
    icon: Code2,
    title: 'Software Development',
    tagline: 'Custom enterprise software, built to last',
    desc: 'We build production-grade web applications, enterprise SaaS platforms, internal tools, and APIs that are designed to scale with your business and integrate with your existing systems.',
    capabilities: [
      'Enterprise web application development',
      'SaaS platform architecture & build',
      'REST & GraphQL API development',
      'Internal tooling & admin systems',
      'Database design & optimisation',
      'Legacy system modernisation',
    ],
    outcomes: ['Reduced vendor dependency', 'Faster internal operations', 'Scalable custom infrastructure'],
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    tagline: 'Scalable infrastructure for modern workloads',
    desc: 'We architect, migrate, and manage cloud infrastructure across AWS, GCP, and Azure — building DevOps pipelines, serverless functions, and managed services that keep your business running at scale.',
    capabilities: [
      'Cloud migration strategy & execution',
      'AWS / GCP / Azure architecture',
      'Serverless & containerised deployments',
      'CI/CD pipeline implementation',
      'Cost optimisation & right-sizing',
      'Infrastructure as code (IaC)',
    ],
    outcomes: ['30–50% infrastructure cost savings', 'Improved reliability & uptime', 'Faster release cycles'],
  },
  {
    icon: RefreshCw,
    title: 'Digital Transformation',
    tagline: 'End-to-end modernisation of your business',
    desc: 'We partner with you to systematically modernise your operations, customer-facing systems, and internal workflows — from initial audit to full deployment, with measurable milestones at every stage.',
    capabilities: [
      'Digital maturity assessment',
      'Technology roadmap development',
      'Legacy process redesign',
      'Customer experience modernisation',
      'Change management support',
      'KPI-driven transformation tracking',
    ],
    outcomes: ['Measurable operational improvement', 'Reduced legacy overhead', 'Future-ready architecture'],
  },
  {
    icon: Briefcase,
    title: 'Enterprise Consulting',
    tagline: 'Independent technology advisory you can trust',
    desc: 'Our consulting practice offers CTO-level technology guidance without the full-time cost — technology assessments, vendor evaluations, architecture reviews, and strategic roadmaps for businesses navigating complex decisions.',
    capabilities: [
      'Technology stack assessment & audit',
      'Vendor evaluation & selection',
      'Architecture design & review',
      'Build vs. buy analysis',
      'IT strategy & roadmap planning',
      'Security & compliance advisory',
    ],
    outcomes: ['Informed, risk-aware decisions', 'Reduced wasted investment', 'Aligned IT & business strategy'],
  },
];

const process = [
  { step: '01', title: 'Discovery',    desc: 'We begin by thoroughly understanding your business, current systems, pain points, and desired outcomes before recommending any technology.' },
  { step: '02', title: 'Strategy',     desc: 'We design a tailored technology approach — architecture, timeline, resource plan, and measurable success criteria agreed upfront.' },
  { step: '03', title: 'Build',        desc: 'Our engineering team builds iteratively, with regular demos, code reviews, and milestone sign-offs throughout the engagement.' },
  { step: '04', title: 'Deploy',       desc: 'We manage go-live end-to-end — testing, staging, production deployment, and hypercare in the weeks following launch.' },
  { step: '05', title: 'Optimise',     desc: 'Post-launch, we monitor performance, gather operational feedback, and continuously improve the solution as your business evolves.' },
];

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
function Hero() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919997730768';
  return (
    <section style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 60%, #e8efff 100%)', paddingTop: 104, paddingBottom: 80 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#e0e7ff', border: '1px solid #c7d2fe', borderRadius: 20, padding: '6px 16px', marginBottom: 24 }}>
              <span style={{ width: 8, height: 8, background: BLUE, borderRadius: '50%', display: 'inline-block' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: NAVY }}>Technology Solutions</span>
            </div>

            <h1 style={{ fontSize: 'clamp(30px,5vw,56px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.1, marginBottom: 20, letterSpacing: -0.5 }}>
              Enterprise Technology<br />
              <span style={{ color: NAVY }}>Services That</span>{' '}
              <span style={{ background: `linear-gradient(135deg, ${BLUE}, #6366f1)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Drive Results</span>
            </h1>

            <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: '#475569', lineHeight: 1.75, marginBottom: 36, maxWidth: 520 }}>
              From AI and automation to cloud infrastructure and digital transformation — we deliver end-to-end technology solutions that create measurable business outcomes.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10">
              <a
                href={`https://wa.me/${wa}?text=Hi! I'd like to discuss a technology project.`}
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: NAVY, color: '#fff', padding: '14px 28px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 14px rgba(30,58,138,0.35)' }}
              >
                <CalendarCheck size={16} /> Schedule a Consultation
              </a>
              <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#fff', color: NAVY, padding: '14px 28px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none', border: `2px solid ${NAVY}` }}>
                Contact Us <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Target,   label: 'Outcomes First',    sub: 'KPI-driven engagements' },
                { icon: Shield,   label: 'Enterprise Grade',  sub: 'Security-first delivery' },
                { icon: BarChart3, label: 'Measurable ROI',  sub: 'Avg. 3× return' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ width: 34, height: 34, background: '#e0e7ff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <Icon size={15} color={NAVY} />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>{label}</div>
                    <div style={{ fontSize: 10, color: MUTED }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — service overview card */}
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 20px 60px rgba(30,58,138,0.10)', padding: 28 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: BLUE, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 18 }}>Our Practice Areas</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                {solutions.map(({ icon: Icon, title, tagline }, i) => (
                  <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '13px 0', borderBottom: i < solutions.length - 1 ? `1px solid ${BORDER}` : 'none' }}>
                    <div style={{ width: 38, height: 38, background: '#e0e7ff', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={17} color={NAVY} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{title}</div>
                      <div style={{ fontSize: 11, color: MUTED, marginTop: 1 }}>{tagline}</div>
                    </div>
                    <ChevronRight size={14} color={MUTED} />
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

/* ══════════════════════════════════════════
   SOLUTIONS GRID
══════════════════════════════════════════ */
function SolutionsGrid() {
  return (
    <section style={{ background: LIGHTER, padding: '88px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
            <SectionLabel text="Our Services" />
            <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 16 }}>
              End-to-End Technology Services
            </h2>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.7 }}>
              Six practice areas. One integrated team. Every service designed to connect directly to your business goals.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map(({ icon: Icon, title, tagline, desc, capabilities, outcomes }, i) => (
            <FadeIn key={title} delay={i * 0.07}>
              <div style={{
                background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16,
                padding: '28px 24px', height: '100%', display: 'flex', flexDirection: 'column',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'box-shadow 0.2s, transform 0.2s, border-color 0.2s',
              }}
                onMouseEnter={e => {
                  const d = e.currentTarget as HTMLDivElement;
                  d.style.boxShadow = '0 16px 40px rgba(30,58,138,0.12)';
                  d.style.transform = 'translateY(-3px)';
                  d.style.borderColor = '#93c5fd';
                }}
                onMouseLeave={e => {
                  const d = e.currentTarget as HTMLDivElement;
                  d.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                  d.style.transform = 'translateY(0)';
                  d.style.borderColor = BORDER;
                }}
              >
                {/* Icon + title */}
                <div style={{ width: 50, height: 50, background: '#e0e7ff', borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <Icon size={22} color={NAVY} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{title}</h3>
                <p style={{ fontSize: 12, fontWeight: 600, color: BLUE, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>{tagline}</p>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, marginBottom: 20 }}>{desc}</p>

                {/* Capabilities */}
                <div style={{ marginBottom: 20, flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: MUTED, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 10 }}>What We Deliver</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                    {capabilities.map(c => (
                      <div key={c} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                        <CheckCircle2 size={13} color={BLUE} style={{ flexShrink: 0, marginTop: 2 }} />
                        <span style={{ fontSize: 13, color: SLATE, lineHeight: 1.4 }}>{c}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Outcomes */}
                <div style={{ background: '#f0f4ff', border: '1px solid #c7d2fe', borderRadius: 10, padding: '12px 14px' }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: NAVY, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>Business Outcomes</div>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {outcomes.map(o => (
                      <span key={o} style={{ fontSize: 11, background: '#fff', color: NAVY, border: '1px solid #c7d2fe', borderRadius: 20, padding: '3px 10px', fontWeight: 600 }}>{o}</span>
                    ))}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   HOW WE WORK
══════════════════════════════════════════ */
function HowWeWork() {
  return (
    <section style={{ background: '#fff', padding: '88px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 56px' }}>
            <SectionLabel text="Our Process" />
            <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 16 }}>
              How We Deliver
            </h2>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.7 }}>
              A disciplined, transparent delivery process — from your first call to continuous post-launch improvement.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {process.map(({ step, title, desc }, i) => (
            <FadeIn key={step} delay={i * 0.08}>
              <div style={{ position: 'relative' }}>
                {/* Connector line (desktop only) */}
                {i < process.length - 1 && (
                  <div className="hidden lg:block" style={{ position: 'absolute', top: 24, left: '100%', width: '100%', height: 1, background: `linear-gradient(90deg, ${BORDER}, transparent)`, zIndex: 0 }} />
                )}
                <div style={{ background: LIGHTER, border: `1px solid ${BORDER}`, borderRadius: 14, padding: '24px 20px', height: '100%', position: 'relative', zIndex: 1 }}>
                  <div style={{ width: 48, height: 48, background: NAVY, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <span style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>{step}</span>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{title}</h3>
                  <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>{desc}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   ENGAGEMENT MODELS
══════════════════════════════════════════ */
function EngagementModels() {
  return (
    <section style={{ background: LIGHTER, padding: '80px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 48px' }}>
            <SectionLabel text="How We Engage" />
            <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 14 }}>
              Flexible Engagement Models
            </h2>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.7 }}>
              We structure our engagements to match your project type, team size, and operational preferences.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: Target,
              title: 'Fixed-Scope Project',
              desc: 'A defined deliverable with agreed timeline, milestones, and investment. Ideal for well-scoped builds — new platforms, automation systems, or specific integrations.',
              best: 'Best for: New platforms, defined requirements',
            },
            {
              icon: Users,
              title: 'Dedicated Team',
              desc: 'A dedicated team of engineers, consultants, or specialists embedded in your workflow. Fully managed by DigiAgentix, reporting directly to your stakeholders.',
              best: 'Best for: Ongoing development, scale-ups',
              featured: true,
            },
            {
              icon: Layers,
              title: 'Advisory & Consulting',
              desc: 'Strategic technology guidance, architecture reviews, and roadmap planning — without a full development engagement. CTO-level advisory at a fraction of the cost.',
              best: 'Best for: Strategy, audits, complex decisions',
            },
          ].map(({ icon: Icon, title, desc, best, featured }) => (
            <FadeIn key={title} delay={0.08}>
              <div style={{
                background: featured ? NAVY : '#fff',
                border: `1px solid ${featured ? NAVY : BORDER}`,
                borderRadius: 16, padding: '32px 26px', height: '100%',
                boxShadow: featured ? '0 12px 40px rgba(30,58,138,0.22)' : '0 2px 8px rgba(0,0,0,0.04)',
              }}>
                <div style={{ width: 48, height: 48, background: featured ? 'rgba(255,255,255,0.12)' : '#e0e7ff', borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <Icon size={22} color={featured ? '#93c5fd' : NAVY} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: featured ? '#fff' : '#0f172a', marginBottom: 12 }}>{title}</h3>
                <p style={{ fontSize: 14, color: featured ? '#94a3b8' : MUTED, lineHeight: 1.7, marginBottom: 20 }}>{desc}</p>
                <div style={{ paddingTop: 16, borderTop: `1px solid ${featured ? 'rgba(255,255,255,0.1)' : BORDER}` }}>
                  <span style={{ fontSize: 12, fontWeight: 600, color: featured ? '#60a5fa' : BLUE }}>{best}</span>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   CTA
══════════════════════════════════════════ */
function ServicesCTA() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919997730768';
  return (
    <section style={{ background: NAVY, padding: '88px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#93c5fd', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Start a Conversation</div>
          <h2 style={{ fontSize: 'clamp(26px,4vw,46px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 20 }}>
            Ready to Discuss Your Project?
          </h2>
          <p style={{ fontSize: 17, color: '#93c5fd', lineHeight: 1.7, marginBottom: 44, maxWidth: 540, margin: '0 auto 44px' }}>
            Book a 30-minute discovery call. We&apos;ll listen to your requirements, assess feasibility, and outline an approach — no obligation, no pressure.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 32 }}>
            <a
              href={`https://wa.me/${wa}?text=Hi! I'd like to discuss a technology project with DigiAgentix.`}
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: NAVY, padding: '15px 32px', borderRadius: 8, fontWeight: 800, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
            >
              <CalendarCheck size={16} /> Book a Discovery Call
            </a>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: '#fff', padding: '15px 32px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none', border: '2px solid rgba(255,255,255,0.35)' }}>
              Send an Enquiry <ArrowRight size={16} />
            </Link>
          </div>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['No commitment required', 'Response within 24 hours', '50+ projects delivered'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={13} color="#60a5fa" />
                <span style={{ fontSize: 13, color: '#cbd5e1' }}>{t}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function ServicesPageClient() {
  return (
    <div style={{ background: '#fff' }}>
      <Hero />
      <SolutionsGrid />
      <HowWeWork />
      <EngagementModels />
      <ServicesCTA />
    </div>
  );
}
