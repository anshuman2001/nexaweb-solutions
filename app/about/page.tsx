'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowRight, ShieldCheck, MapPin, CheckCircle2, Quote,
  Lightbulb, Shield, Star, Users,
  TrendingUp, Award, Headphones, Lock, Layers, BarChart3,
  Brain, Cog, Code2, Cloud, RefreshCw, Briefcase,
  HeartPulse, Building2, GraduationCap, ShoppingBag,
  DollarSign, Factory, Rocket, CalendarCheck, ChevronRight,
  Target, Eye,
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

/* ══════════════════════════════════════════════
   SECTION 1 — HERO
══════════════════════════════════════════════ */
function HeroSection() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919997730768';
  return (
    <section style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 60%, #e8efff 100%)', paddingTop: 104, paddingBottom: 80 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#e0e7ff', border: '1px solid #c7d2fe', borderRadius: 20, padding: '6px 16px', marginBottom: 24 }}>
              <span style={{ width: 8, height: 8, background: BLUE, borderRadius: '50%', display: 'inline-block' }} />
              <span style={{ fontSize: 13, fontWeight: 600, color: NAVY, letterSpacing: 0.3 }}>About DigiAgentix</span>
            </div>

            <h1 style={{ fontSize: 'clamp(30px,5vw,56px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.1, marginBottom: 20, letterSpacing: -0.5 }}>
              Building Technology<br />
              <span style={{ color: NAVY }}>That Drives</span>{' '}
              <span style={{ background: `linear-gradient(135deg, ${BLUE}, #6366f1)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Business Growth</span>
            </h1>

            <p style={{ fontSize: 'clamp(15px,2vw,18px)', color: '#475569', lineHeight: 1.75, marginBottom: 36, maxWidth: 520 }}>
              DigiAgentix helps organizations modernize operations, automate processes, and build scalable digital solutions — from strategy to deployment.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-10">
              <a
                href={`https://wa.me/${wa}?text=Hi! I'd like to schedule a consultation.`}
                target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: NAVY, color: '#fff', padding: '14px 28px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 14px rgba(30,58,138,0.35)' }}
              >
                <CalendarCheck size={16} /> Schedule Consultation
              </a>
              <Link href="/services" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#fff', color: NAVY, padding: '14px 28px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none', border: `2px solid ${NAVY}` }}>
                Explore Solutions <ArrowRight size={16} />
              </Link>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: ShieldCheck, label: 'MSME Registered', sub: 'Govt. of India Certified' },
                { icon: MapPin,      label: 'India-Based',     sub: 'Headquartered in Noida' },
                { icon: Layers,      label: 'Pan India',       sub: 'Serving clients nationwide' },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                  <div style={{ width: 34, height: 34, background: '#e0e7ff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <Icon size={16} color={NAVY} />
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#0f172a' }}>{label}</div>
                    <div style={{ fontSize: 10, color: MUTED, lineHeight: 1.4 }}>{sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right — company facts card */}
          <motion.div initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <div style={{ background: '#fff', borderRadius: 16, border: '1px solid #e2e8f0', boxShadow: '0 20px 60px rgba(30,58,138,0.10)', padding: 28 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 22 }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>Company Profile</div>
                  <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>DigiAgentix Technology Solutions</div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#15803d', borderRadius: 20, padding: '4px 12px' }}>● Est. 2021</span>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 22 }}>
                {[
                  { label: 'Headquarters', value: 'Noida, Uttar Pradesh, India' },
                  { label: 'Registration',  value: 'MSME · DPIIT Startup India' },
                  { label: 'Service Model', value: 'Consulting + Product + Support' },
                  { label: 'Delivery',      value: 'Remote-First · Pan India' },
                ].map(({ label, value }) => (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: 14, borderBottom: `1px solid ${BORDER}` }}>
                    <span style={{ fontSize: 12, color: MUTED, fontWeight: 500 }}>{label}</span>
                    <span style={{ fontSize: 12, color: SLATE, fontWeight: 700, textAlign: 'right', maxWidth: '55%' }}>{value}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { v: '50+', l: 'Projects Delivered', dark: true },
                  { v: '30+', l: 'Enterprise Clients',  dark: false },
                  { v: '8',   l: 'Industries Served',   dark: false },
                  { v: '98%', l: 'Client Satisfaction', dark: true },
                ].map(({ v, l, dark }) => (
                  <div key={l} style={{ background: dark ? NAVY : LIGHTER, border: `1px solid ${dark ? NAVY : BORDER}`, borderRadius: 10, padding: '14px 12px', textAlign: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: 900, color: dark ? '#fff' : NAVY }}>{v}</div>
                    <div style={{ fontSize: 10, color: dark ? '#93c5fd' : MUTED, marginTop: 4, fontWeight: 500 }}>{l}</div>
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

/* ══════════════════════════════════════════════
   SECTION 2 — COMPANY OVERVIEW
══════════════════════════════════════════════ */
function CompanyOverview() {
  return (
    <section style={{ background: '#fff', padding: '88px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          <FadeIn>
            <SectionLabel text="Who We Are" />
            <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 20 }}>
              A Professional Technology Partner for Modern Business
            </h2>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.8, marginBottom: 16 }}>
              DigiAgentix is a technology solutions company headquartered in Noida, India. We partner with SMEs, growth-stage businesses, and enterprises to design, build, and deploy intelligent systems that create measurable operational improvements.
            </p>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.8, marginBottom: 16 }}>
              Our work spans the full technology spectrum — from AI-driven automation and custom enterprise software to cloud infrastructure and strategic digital transformation. We don't just deliver technology; we align every engagement to specific business outcomes.
            </p>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.8, marginBottom: 28 }}>
              What makes us different is our commitment to staying engaged beyond delivery. We operate as a long-term technology partner — not a one-off vendor — ensuring the solutions we build continue to create value as your business evolves.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                'End-to-end technology consulting, development, and support',
                'Domain expertise across 8 key industry verticals',
                'Outcomes-first approach — every engagement tied to measurable KPIs',
                'MSME Registered & DPIIT Recognised Startup',
              ].map(item => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <CheckCircle2 size={16} color={BLUE} style={{ flexShrink: 0, marginTop: 3 }} />
                  <span style={{ fontSize: 14, color: SLATE, lineHeight: 1.6 }}>{item}</span>
                </div>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.15}>
            {/* Visual panel */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {/* Main visual */}
              <div style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #2563eb 100%)', borderRadius: 16, padding: '36px 32px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: -30, right: -30, width: 160, height: 160, background: 'rgba(255,255,255,0.04)', borderRadius: '50%' }} />
                <div style={{ position: 'absolute', bottom: -20, left: -20, width: 120, height: 120, background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }} />
                <div style={{ fontSize: 12, fontWeight: 600, color: '#93c5fd', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Our Approach</div>
                <p style={{ fontSize: 17, fontWeight: 600, color: '#fff', lineHeight: 1.65, marginBottom: 20, position: 'relative' }}>
                  &ldquo;We don&apos;t sell software.<br />We solve business problems — and stay to make sure they stay solved.&rdquo;
                </p>
                <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
                  {['Strategy', 'Build', 'Deploy', 'Optimise'].map((step, i) => (
                    <div key={step} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 22, height: 22, background: 'rgba(255,255,255,0.15)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, color: '#fff' }}>{i + 1}</div>
                      <span style={{ fontSize: 13, fontWeight: 600, color: '#93c5fd' }}>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Two mini cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                {[
                  { icon: Target,  title: 'Outcomes First',    body: 'Every engagement begins with defining the business result — not the technology.' },
                  { icon: Users,   title: 'Long-Term Partner', body: 'We stay engaged post-deployment with reviews, optimisation, and advisory.' },
                ].map(({ icon: Icon, title, body }) => (
                  <div key={title} style={{ background: LIGHTER, border: `1px solid ${BORDER}`, borderRadius: 12, padding: '18px 16px' }}>
                    <div style={{ width: 38, height: 38, background: '#e0e7ff', borderRadius: 9, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
                      <Icon size={17} color={NAVY} />
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a', marginBottom: 6 }}>{title}</div>
                    <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.5 }}>{body}</div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SECTION 3 — MISSION & VISION
══════════════════════════════════════════════ */
function MissionVision() {
  return (
    <section style={{ background: LIGHTER, padding: '80px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 48px' }}>
            <SectionLabel text="Our Purpose" />
            <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
              Guided by a Clear Direction
            </h2>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mission */}
          <FadeIn delay={0.05}>
            <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16, padding: '36px 32px', height: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
              <div style={{ width: 52, height: 52, background: '#e0e7ff', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}>
                <Target size={24} color={NAVY} />
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: BLUE, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Our Mission</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: '#0f172a', lineHeight: 1.3, marginBottom: 16 }}>
                Deliver Practical Technology That Creates Real Business Value
              </h3>
              <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.75 }}>
                We are committed to delivering technology solutions grounded in business reality — not theoretical innovation. Our work is measured by the operational improvements, cost efficiencies, and revenue outcomes it creates for our clients.
              </p>
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1px solid ${BORDER}` }}>
                {['Practical over theoretical', 'Measured by business outcomes', 'Built for your specific context'].map(p => (
                  <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <CheckCircle2 size={14} color={BLUE} />
                    <span style={{ fontSize: 13, color: SLATE, fontWeight: 500 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>

          {/* Vision */}
          <FadeIn delay={0.12}>
            <div style={{ background: NAVY, border: `1px solid ${NAVY}`, borderRadius: 16, padding: '36px 32px', height: '100%', boxShadow: '0 8px 32px rgba(30,58,138,0.2)' }}>
              <div style={{ width: 52, height: 52, background: 'rgba(255,255,255,0.12)', borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 22 }}>
                <Eye size={24} color="#93c5fd" />
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#60a5fa', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 10 }}>Our Vision</div>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: '#fff', lineHeight: 1.3, marginBottom: 16 }}>
                A Trusted Technology Transformation Partner Across India and Beyond
              </h3>
              <p style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.75 }}>
                We aspire to be the technology partner Indian businesses turn to when they need to modernise, scale, or transform. Not just for a project — but for the long arc of their growth, from their first automation to their full digital transformation.
              </p>
              <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                {['Pan-India technology leadership', 'Trusted across 8+ industries', 'Long-term client partnerships'].map(p => (
                  <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <CheckCircle2 size={14} color="#60a5fa" />
                    <span style={{ fontSize: 13, color: '#cbd5e1', fontWeight: 500 }}>{p}</span>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SECTION 4 — CORE VALUES
══════════════════════════════════════════════ */
const values = [
  {
    icon: Lightbulb,
    title: 'Innovation',
    desc: 'We bring fresh thinking to every engagement. Our team continuously explores emerging technologies and applies them where they create genuine business advantage — not just for novelty.',
  },
  {
    icon: Shield,
    title: 'Integrity',
    desc: 'We operate with complete transparency — in pricing, timelines, and capability. If we cannot solve a problem, we say so. If a solution won\'t work, we tell you before we build it.',
  },
  {
    icon: Star,
    title: 'Excellence',
    desc: 'Every deliverable we ship meets a high internal bar for reliability, performance, and maintainability. We build technology that works in production — not just in demos.',
  },
  {
    icon: Users,
    title: 'Client Success',
    desc: 'Our success is measured entirely by yours. We track business outcomes, not just delivery milestones — and we stay accountable to those outcomes long after go-live.',
  },
];

function CoreValues() {
  return (
    <section style={{ background: '#fff', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 48px' }}>
            <SectionLabel text="Core Values" />
            <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 14 }}>
              The Principles We Work By
            </h2>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.7 }}>
              These aren&apos;t aspirational statements — they are the operating principles that govern how we work with every client, on every project.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map(({ icon: Icon, title, desc }, i) => (
            <FadeIn key={title} delay={i * 0.08}>
              <div style={{
                background: LIGHTER, border: `1px solid ${BORDER}`, borderRadius: 14,
                padding: '28px 22px', height: '100%',
                transition: 'border-color 0.2s, box-shadow 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => {
                  const d = e.currentTarget as HTMLDivElement;
                  d.style.borderColor = '#93c5fd';
                  d.style.boxShadow = '0 12px 32px rgba(30,58,138,0.10)';
                  d.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  const d = e.currentTarget as HTMLDivElement;
                  d.style.borderColor = BORDER;
                  d.style.boxShadow = 'none';
                  d.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ width: 48, height: 48, background: '#e0e7ff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <Icon size={22} color={NAVY} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 800, color: '#0f172a', marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7 }}>{desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SECTION 5 — WHY DIGIAGENTIX
══════════════════════════════════════════════ */
const whyCards = [
  { icon: TrendingUp,   title: 'Outcome Driven',       desc: 'Every engagement is anchored to specific, measurable business outcomes. Technology is the means — results are the measure.' },
  { icon: Award,        title: 'Enterprise Quality',   desc: 'Solutions built to production-grade standards: secure, scalable, and ready to integrate with your existing enterprise stack.' },
  { icon: Headphones,   title: 'Dedicated Support',    desc: '24/7 monitoring and a named point of contact for every client. When something needs attention, you won\'t get a ticket queue.' },
  { icon: Users,        title: 'Long-Term Partnership', desc: 'Regular business reviews, optimisation cycles, and proactive advisory ensure our solutions keep pace with your growth.' },
  { icon: Lock,         title: 'Security Focus',       desc: 'Security-first development practices, data protection standards, and compliance-ready architectures across every solution we build.' },
  { icon: BarChart3,    title: 'Scalable Solutions',   desc: 'Architecture designed for today\'s needs and tomorrow\'s scale. No costly re-builds as your business grows.' },
];

function WhyChoose() {
  return (
    <section style={{ background: LIGHTER, padding: '80px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 48px' }}>
            <SectionLabel text="Why DigiAgentix" />
            <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 14 }}>
              Why Businesses Choose DigiAgentix
            </h2>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.7 }}>
              The qualities that distinguish a technology vendor from a technology partner — we hold ourselves to all of them.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyCards.map(({ icon: Icon, title, desc }, i) => (
            <FadeIn key={title} delay={i * 0.07}>
              <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 14, padding: '26px 22px', height: '100%', boxShadow: '0 2px 8px rgba(0,0,0,0.04)', transition: 'box-shadow 0.2s, transform 0.2s' }}
                onMouseEnter={e => {
                  const d = e.currentTarget as HTMLDivElement;
                  d.style.boxShadow = '0 12px 32px rgba(30,58,138,0.10)';
                  d.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  const d = e.currentTarget as HTMLDivElement;
                  d.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                  d.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ width: 46, height: 46, background: '#e0e7ff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon size={20} color={NAVY} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7 }}>{desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SECTION 6 — TECHNOLOGY EXPERTISE
══════════════════════════════════════════════ */
const capabilities = [
  {
    icon: Brain, title: 'AI & Machine Learning',
    desc: 'Custom AI models, natural language processing, predictive analytics, and intelligent decision systems tailored to your business processes.',
    benefits: ['Reduce manual decision-making', 'Predict demand & risk', 'Automate complex workflows'],
  },
  {
    icon: Cog, title: 'Business Automation',
    desc: 'End-to-end process automation — from document handling to multi-channel operations — reducing operational overhead and human error.',
    benefits: ['Cut operational costs', 'Eliminate repetitive tasks', 'Accelerate throughput'],
  },
  {
    icon: Code2, title: 'Software Development',
    desc: 'Enterprise web applications, APIs, SaaS platforms, and internal tools built on scalable, production-ready architecture with clean code.',
    benefits: ['Custom-fit to your processes', 'Scalable from day one', 'Full documentation & handover'],
  },
  {
    icon: Cloud, title: 'Cloud Solutions',
    desc: 'Cloud migration strategy, serverless architecture, DevOps pipelines, and managed infrastructure services on AWS, GCP, and Azure.',
    benefits: ['Reduce infrastructure cost', 'Improve reliability & uptime', 'Enable global scale'],
  },
  {
    icon: RefreshCw, title: 'Digital Transformation',
    desc: 'Strategic modernisation of legacy operations, customer-facing systems, and internal processes — end to end, from audit to deployment.',
    benefits: ['Modernise legacy systems', 'Improve customer experience', 'Future-proof operations'],
  },
  {
    icon: Briefcase, title: 'Enterprise Consulting',
    desc: 'Technology assessment, architectural roadmaps, vendor evaluation, and hands-on advisory to align your IT strategy with business goals.',
    benefits: ['Independent, objective advice', 'Clear technology roadmaps', 'Risk-aware planning'],
  },
];

function TechExpertise() {
  return (
    <section style={{ background: '#fff', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 48px' }}>
            <SectionLabel text="Technology Expertise" />
            <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 14 }}>
              Our Capabilities
            </h2>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.7 }}>
              Six interconnected practice areas — each with deep expertise, all working together to deliver complete technology solutions.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {capabilities.map(({ icon: Icon, title, desc, benefits }, i) => (
            <FadeIn key={title} delay={i * 0.07}>
              <div style={{ border: `1px solid ${BORDER}`, borderRadius: 14, padding: '26px 22px', height: '100%', background: LIGHT, transition: 'border-color 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => {
                  const d = e.currentTarget as HTMLDivElement;
                  d.style.borderColor = '#93c5fd';
                  d.style.boxShadow = '0 8px 24px rgba(30,58,138,0.08)';
                }}
                onMouseLeave={e => {
                  const d = e.currentTarget as HTMLDivElement;
                  d.style.borderColor = BORDER;
                  d.style.boxShadow = 'none';
                }}
              >
                <div style={{ width: 46, height: 46, background: '#e0e7ff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon size={20} color={NAVY} />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.7, marginBottom: 16 }}>{desc}</p>
                <div style={{ borderTop: `1px solid ${BORDER}`, paddingTop: 14 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: MUTED, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 8 }}>Business Benefits</div>
                  {benefits.map(b => (
                    <div key={b} style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 6 }}>
                      <div style={{ width: 5, height: 5, background: BLUE, borderRadius: '50%', flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: SLATE, fontWeight: 500 }}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <Link href="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: NAVY, color: '#fff', padding: '13px 28px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 14px rgba(30,58,138,0.28)' }}>
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SECTION 7 — INDUSTRIES
══════════════════════════════════════════════ */
const industries = [
  { icon: HeartPulse,    label: 'Healthcare',            desc: 'Patient workflow automation, clinical analytics, appointment management, and compliance-ready health tech platforms.' },
  { icon: Building2,     label: 'Real Estate',           desc: 'PropTech platforms, broker intelligence tools, CRM integration, and due diligence automation for property businesses.' },
  { icon: GraduationCap, label: 'Education',             desc: 'Learning management systems, EdTech platforms, student engagement automation, and accessible content solutions.' },
  { icon: ShoppingBag,   label: 'Retail & E-commerce',  desc: 'Inventory intelligence, customer experience automation, sales analytics, and supply chain optimisation tools.' },
  { icon: DollarSign,    label: 'Financial Services',    desc: 'Compliance automation, fintech platforms, regulatory reporting, and data analytics for BFSI organisations.' },
  { icon: Factory,       label: 'Manufacturing',         desc: 'Process optimisation, quality control automation, supply chain intelligence, and operational efficiency solutions.' },
  { icon: Rocket,        label: 'Startups',              desc: 'MVP development, go-to-market automation, growth engineering, and scalable technical foundations for early-stage companies.' },
  { icon: Layers,        label: 'Enterprises',          desc: 'Legacy modernisation, large-scale digital transformation, enterprise integration, and organisation-wide automation programs.' },
];

function IndustriesSection() {
  return (
    <section style={{ background: LIGHTER, padding: '80px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 48px' }}>
            <SectionLabel text="Industries We Serve" />
            <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 14 }}>
              Deep Domain Knowledge Across Sectors
            </h2>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.7 }}>
              Our solutions are shaped by the compliance requirements, operational patterns, and growth dynamics of the industries we serve.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {industries.map(({ icon: Icon, label, desc }, i) => (
            <FadeIn key={label} delay={i * 0.06}>
              <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 12, padding: '22px 18px', height: '100%', transition: 'border-color 0.2s, box-shadow 0.2s' }}
                onMouseEnter={e => {
                  const d = e.currentTarget as HTMLDivElement;
                  d.style.borderColor = '#93c5fd';
                  d.style.boxShadow = '0 8px 24px rgba(30,58,138,0.08)';
                }}
                onMouseLeave={e => {
                  const d = e.currentTarget as HTMLDivElement;
                  d.style.borderColor = BORDER;
                  d.style.boxShadow = 'none';
                }}
              >
                <div style={{ width: 42, height: 42, background: '#e0e7ff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  <Icon size={18} color={NAVY} />
                </div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{label}</div>
                <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.6 }}>{desc}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SECTION 8 — LEADERSHIP MESSAGE
══════════════════════════════════════════════ */
function LeadershipMessage() {
  return (
    <section style={{ background: '#fff', padding: '80px 24px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionLabel text="Leadership" />
            <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
              A Message From Leadership
            </h2>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #f0f4ff 100%)', border: `1px solid ${BORDER}`, borderRadius: 20, padding: 'clamp(28px, 5vw, 52px)', position: 'relative', overflow: 'hidden' }}>
            {/* Decorative quote mark */}
            <div style={{ position: 'absolute', top: 20, right: 28, fontSize: 120, fontWeight: 900, color: '#e0e7ff', lineHeight: 1, userSelect: 'none', fontFamily: 'Georgia, serif' }}>&ldquo;</div>

            <div style={{ position: 'relative' }}>
              <p style={{ fontSize: 'clamp(16px, 2vw, 19px)', color: SLATE, lineHeight: 1.85, marginBottom: 24, fontStyle: 'italic', maxWidth: 720 }}>
                &ldquo;When we founded DigiAgentix, we made a deliberate choice: to focus on outcomes, not outputs. The technology industry has a habit of celebrating what is built over what is achieved. We believe our job is finished only when the client&apos;s business problem is solved — and we hold ourselves accountable to that standard on every engagement.
              </p>
              <p style={{ fontSize: 'clamp(15px, 2vw, 17px)', color: MUTED, lineHeight: 1.85, marginBottom: 32, maxWidth: 720 }}>
                Our commitment to long-term partnerships isn&apos;t a marketing statement — it is our operating model. We stay engaged, we optimise, and we grow alongside you. In an industry that often prioritises the next project over the current client, we choose the harder path: earning trust through sustained results.&rdquo;
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
                <div style={{ width: 52, height: 52, background: NAVY, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: 18, fontWeight: 800, color: '#fff' }}>D</span>
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>Leadership Team</div>
                  <div style={{ fontSize: 13, color: MUTED, marginTop: 2 }}>DigiAgentix Technology Solutions</div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}>
                    {['MSME Registered', 'Startup India', 'Noida HQ'].map(tag => (
                      <span key={tag} style={{ fontSize: 11, background: '#e0e7ff', color: NAVY, borderRadius: 20, padding: '3px 10px', fontWeight: 600 }}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SECTION 9 — COMPANY STATS
══════════════════════════════════════════════ */
function CompanyStats() {
  const stats = [
    { value: '50+',  label: 'Projects Delivered',   sub: 'Successfully completed engagements' },
    { value: '98%',  label: 'Client Satisfaction',  sub: 'Verified across all engagements' },
    { value: '24/7', label: 'Support Availability', sub: 'Monitoring and incident response' },
    { value: '8',    label: 'Industries Served',    sub: 'Deep domain expertise' },
    { value: '5+',   label: 'Years in Operation',   sub: 'Established experience' },
    { value: '30+',  label: 'Enterprise Clients',   sub: 'Businesses that trust us' },
  ];

  return (
    <section style={{ background: '#0f172a', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 560, margin: '0 auto 52px' }}>
            <SectionLabel text="Our Track Record" dark />
            <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 14 }}>
              Performance by the Numbers
            </h2>
            <p style={{ fontSize: 15, color: '#94a3b8', lineHeight: 1.7 }}>
              Measured outcomes, not aspirations. Every number here reflects real client engagements.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map(({ value, label, sub }, i) => (
            <FadeIn key={label} delay={i * 0.07}>
              <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 14, padding: '26px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 'clamp(26px,4vw,36px)', fontWeight: 900, color: '#60a5fa', lineHeight: 1, marginBottom: 10 }}>{value}</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9', marginBottom: 6 }}>{label}</div>
                <div style={{ fontSize: 11, color: '#64748b', lineHeight: 1.4 }}>{sub}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SECTION 10 — CAREERS PREVIEW
══════════════════════════════════════════════ */
function CareersPreview() {
  return (
    <section style={{ background: LIGHTER, padding: '80px 24px', borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          <FadeIn>
            <SectionLabel text="Careers" />
            <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 16 }}>
              Join Our Growing Team
            </h2>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.8, marginBottom: 16 }}>
              We are a team of technologists, strategists, and problem-solvers building enterprise technology products and services for Indian businesses. We value clarity of thinking, craftsmanship in execution, and genuine care for client outcomes.
            </p>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.8, marginBottom: 28 }}>
              We are remote-friendly with our headquarters in Noida. We offer meaningful work, room for growth, and the rare chance to see your work create real impact for real businesses.
            </p>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: NAVY, color: '#fff', padding: '13px 28px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 14px rgba(30,58,138,0.28)' }}>
              View Careers <ChevronRight size={16} />
            </Link>
          </FadeIn>

          <FadeIn delay={0.12}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                { role: 'Full Stack Developer', type: 'Engineering · Remote', open: true },
                { role: 'AI/ML Engineer',         type: 'Engineering · Remote', open: true },
                { role: 'Business Development',   type: 'Growth · Noida HQ',   open: true },
                { role: 'Product Designer',       type: 'Design · Remote',     open: false },
              ].map(({ role, type, open }) => (
                <div key={role} style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 12, padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{role}</div>
                    <div style={{ fontSize: 12, color: MUTED, marginTop: 3 }}>{type}</div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, padding: '4px 12px', borderRadius: 20, background: open ? '#f0fdf4' : LIGHTER, color: open ? '#15803d' : MUTED, border: `1px solid ${open ? '#bbf7d0' : BORDER}`, whiteSpace: 'nowrap', flexShrink: 0 }}>
                    {open ? 'Open' : 'Coming Soon'}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   SECTION 11 — FINAL CTA
══════════════════════════════════════════════ */
function FinalCTA() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919997730768';
  return (
    <section style={{ background: NAVY, padding: '88px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#93c5fd', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>
            Get Started
          </div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 20 }}>
            Ready to Build the Future Together?
          </h2>
          <p style={{ fontSize: 17, color: '#93c5fd', lineHeight: 1.7, marginBottom: 44, maxWidth: 560, margin: '0 auto 44px' }}>
            Schedule a 30-minute discovery call. We&apos;ll assess your current operations, identify the highest-impact technology opportunities, and outline a practical roadmap — at no obligation.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 36 }}>
            <a
              href={`https://wa.me/${wa}?text=Hi! I'd like to schedule a discovery consultation.`}
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: NAVY, padding: '15px 32px', borderRadius: 8, fontWeight: 800, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
            >
              <CalendarCheck size={16} /> Schedule Consultation
            </a>
            <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'transparent', color: '#fff', padding: '15px 32px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none', border: '2px solid rgba(255,255,255,0.35)' }}>
              Contact Us <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'flex', gap: 28, justifyContent: 'center', flexWrap: 'wrap' }}>
            {['No commitment required', 'Response within 24 hours', 'MSME Registered Company'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={14} color="#60a5fa" />
                <span style={{ fontSize: 13, color: '#cbd5e1' }}>{t}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════
   PAGE EXPORT
══════════════════════════════════════════════ */
export default function AboutPage() {
  return (
    <div style={{ background: '#fff' }}>
      <HeroSection />
      <CompanyOverview />
      <MissionVision />
      <CoreValues />
      <WhyChoose />
      <TechExpertise />
      <IndustriesSection />
      <LeadershipMessage />
      <CompanyStats />
      <CareersPreview />
      <FinalCTA />
    </div>
  );
}
