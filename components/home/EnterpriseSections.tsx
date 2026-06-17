'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Brain, Cog, Code2, Cloud, RefreshCw, Users,
  HeartPulse, Building2, GraduationCap, ShoppingBag,
  DollarSign, Factory, Rocket, CheckCircle2, ArrowRight,
  TrendingUp, Shield, Award, Clock, MapPin, Phone, Mail,
  ChevronRight, Star, BarChart3, Layers, Briefcase,
} from 'lucide-react';

const NAVY   = '#1e3a8a';
const BLUE   = '#2563eb';
const SLATE  = '#334155';
const MUTED  = '#64748b';
const BORDER = '#e2e8f0';
const LIGHT  = '#f8fafc';
const LIGHTER = '#f1f5f9';

/* ─── Fade-in wrapper ──────────────────────────────── */
function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ─── Section label ────────────────────────────────── */
function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
      <div style={{ width: 24, height: 2, background: BLUE, borderRadius: 2 }} />
      <span style={{ fontSize: 12, fontWeight: 700, color: BLUE, letterSpacing: 2, textTransform: 'uppercase' }}>{text}</span>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   1. CLIENT LOGOS BAR
══════════════════════════════════════════════════════ */
const clientNames = ['BrokerNote', 'CA Calendar', 'HealthTech', 'EduAccess', 'RetailMax', 'PropSmart'];

export function ClientLogosBar() {
  return (
    <section style={{ background: '#fff', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: '28px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: MUTED, letterSpacing: 1, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>
            Trusted by growing organisations
          </span>
          <div style={{ width: 1, height: 24, background: BORDER }} />
          <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', alignItems: 'center' }}>
            {clientNames.map((name) => (
              <div key={name} style={{
                padding: '6px 18px', border: `1px solid ${BORDER}`, borderRadius: 6,
                fontSize: 13, fontWeight: 700, color: '#94a3b8', letterSpacing: 0.5,
                background: LIGHT,
              }}>
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   2. CERTIFICATIONS BAR
══════════════════════════════════════════════════════ */
const certs = [
  { icon: Shield,    label: 'MSME Registered',  sub: 'Ministry of MSME · Govt. of India' },
  { icon: Award,     label: 'ISO 9001:2015',     sub: 'Quality Management System' },
  { icon: CheckCircle2, label: '50+ Projects',   sub: 'Successfully Delivered' },
  { icon: Star,      label: '4.9 / 5 Rating',    sub: 'Client Satisfaction Score' },
  { icon: Clock,     label: '5+ Years',           sub: 'Industry Experience' },
];

export function CertificationsBar() {
  return (
    <section style={{ background: LIGHTER, padding: '40px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20 }}>
          {certs.map(({ icon: Icon, label, sub }, i) => (
            <FadeIn key={label} delay={i * 0.08}>
              <div style={{
                background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 12,
                padding: '20px 18px', display: 'flex', alignItems: 'center', gap: 14,
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}>
                <div style={{ width: 44, height: 44, background: '#e0e7ff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={20} color={NAVY} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{label}</div>
                  <div style={{ fontSize: 11, color: MUTED, marginTop: 2 }}>{sub}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   3. ABOUT SECTION
══════════════════════════════════════════════════════ */
const aboutStats = [
  { v: '50+',  l: 'Projects Delivered' },
  { v: '30+',  l: 'Enterprise Clients' },
  { v: '5+',   l: 'Years of Excellence' },
  { v: '98%',  l: 'Satisfaction Rate' },
];

export function AboutSection() {
  return (
    <section id="about" style={{ background: '#fff', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>

        <FadeIn>
          <SectionLabel text="About Us" />
          <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 20 }}>
            A Technology Partner<br />You Can Trust
          </h2>
          <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.8, marginBottom: 16 }}>
            DigiAgentix is a professional technology solutions company headquartered in Noida, India. We partner with SMEs, enterprises, and growth-stage organizations to design, build, and deploy intelligent systems that drive measurable operational improvement.
          </p>
          <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.8, marginBottom: 32 }}>
            From AI automation and cloud infrastructure to custom enterprise software, we deliver full-spectrum technology services that bridge ambition and execution at scale.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
            {['AI Solutions', 'Automation', 'Cloud Services', 'Enterprise Software', 'Digital Transformation'].map(tag => (
              <span key={tag} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: NAVY, fontWeight: 600 }}>
                <CheckCircle2 size={15} color={BLUE} /> {tag}
              </span>
            ))}
          </div>
          <Link href="/about" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            color: BLUE, fontWeight: 700, fontSize: 14, textDecoration: 'none',
            border: `2px solid ${BLUE}`, borderRadius: 8, padding: '10px 22px',
          }}>
            Learn About DigiAgentix <ArrowRight size={15} />
          </Link>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {aboutStats.map(({ v, l }, i) => (
              <div key={l} style={{
                background: i % 2 === 0 ? NAVY : '#fff',
                border: `1px solid ${i % 2 === 0 ? NAVY : BORDER}`,
                borderRadius: 14, padding: '28px 20px', textAlign: 'center',
                boxShadow: i % 2 === 0 ? '0 8px 24px rgba(30,58,138,0.18)' : '0 2px 8px rgba(0,0,0,0.06)',
              }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: i % 2 === 0 ? '#fff' : NAVY, lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: 13, color: i % 2 === 0 ? '#93c5fd' : MUTED, marginTop: 8, fontWeight: 500 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ background: LIGHTER, borderRadius: 12, padding: '16px 20px', marginTop: 16, border: `1px solid ${BORDER}` }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
              <MapPin size={16} color={BLUE} style={{ marginTop: 2, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Noida, Uttar Pradesh, India</div>
                <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>MSME Registered · Serving clients across India</div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   4. SOLUTIONS SECTION
══════════════════════════════════════════════════════ */
const solutions = [
  {
    icon: Brain, title: 'AI & Machine Learning',
    desc: 'Custom AI models, NLP solutions, predictive analytics, and intelligent decision systems tailored to your business processes.',
    tags: ['Predictive Analytics', 'NLP', 'Computer Vision'],
  },
  {
    icon: Cog, title: 'Intelligent Automation',
    desc: 'End-to-end automation of business workflows — from RPA and document processing to multi-channel AI agents.',
    tags: ['RPA', 'Process Automation', 'AI Agents'],
  },
  {
    icon: Code2, title: 'Software Development',
    desc: 'Enterprise web applications, APIs, and SaaS platforms built with modern technology stacks and scalable architecture.',
    tags: ['Web Apps', 'APIs', 'SaaS Platforms'],
  },
  {
    icon: Cloud, title: 'Cloud Solutions',
    desc: 'Cloud migration, infrastructure design, serverless architecture, and managed cloud services for optimal performance.',
    tags: ['Migration', 'DevOps', 'Serverless'],
  },
  {
    icon: RefreshCw, title: 'Digital Transformation',
    desc: 'Strategic technology transformation that modernizes your operations, culture, and customer experience end-to-end.',
    tags: ['Strategy', 'Modernization', 'CX'],
  },
  {
    icon: Users, title: 'Enterprise Consulting',
    desc: 'Technology assessment, roadmap planning, and hands-on consulting to align your IT strategy with business objectives.',
    tags: ['Assessment', 'Roadmap', 'Advisory'],
  },
];

export function SolutionsSection() {
  return (
    <section id="solutions" style={{ background: LIGHTER, padding: '80px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 52px' }}>
            <SectionLabel text="Our Solutions" />
            <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 16 }}>
              End-to-End Technology Services
            </h2>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.7 }}>
              From strategy to deployment — we deliver complete technology solutions that create measurable business outcomes.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
          {solutions.map(({ icon: Icon, title, desc, tags }, i) => (
            <FadeIn key={title} delay={i * 0.07}>
              <div style={{
                background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 14,
                padding: '28px 24px', height: '100%',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(30,58,138,0.12)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                  (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                }}
              >
                <div style={{ width: 48, height: 48, background: '#e0e7ff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon size={22} color={NAVY} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, marginBottom: 16 }}>{desc}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {tags.map(tag => (
                    <span key={tag} style={{ fontSize: 11, background: LIGHTER, color: SLATE, border: `1px solid ${BORDER}`, borderRadius: 20, padding: '3px 10px', fontWeight: 600 }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/services" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: NAVY, color: '#fff', padding: '14px 30px',
              borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(30,58,138,0.3)',
            }}>
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   5. INDUSTRIES SECTION
══════════════════════════════════════════════════════ */
const industries = [
  { icon: HeartPulse,   label: 'Healthcare',          desc: 'Patient management, automation & analytics' },
  { icon: Building2,    label: 'Real Estate',          desc: 'PropTech, CRM & lead intelligence' },
  { icon: GraduationCap,label: 'Education',            desc: 'EdTech platforms & learning automation' },
  { icon: ShoppingBag,  label: 'Retail & E-commerce', desc: 'Inventory, CX & sales automation' },
  { icon: DollarSign,   label: 'Financial Services',   desc: 'Compliance tools, automation & analytics' },
  { icon: Factory,      label: 'Manufacturing',        desc: 'Process optimization & supply chain AI' },
  { icon: Rocket,       label: 'Startups',             desc: 'MVP development & growth automation' },
  { icon: Layers,       label: 'Enterprises',          desc: 'Digital transformation & modernization' },
];

export function IndustriesSection() {
  return (
    <section id="industries" style={{ background: '#fff', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 52px' }}>
            <SectionLabel text="Industries We Serve" />
            <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 16 }}>
              Built for Your Sector
            </h2>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.7 }}>
              We bring deep domain knowledge across industries, ensuring our solutions fit your sector's unique compliance, operational, and growth requirements.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 16 }}>
          {industries.map(({ icon: Icon, label, desc }, i) => (
            <FadeIn key={label} delay={i * 0.06}>
              <div style={{
                border: `1px solid ${BORDER}`, borderRadius: 12,
                padding: '22px 20px', background: LIGHT,
                display: 'flex', gap: 14, alignItems: 'flex-start',
                transition: 'border-color 0.2s, background 0.2s',
                cursor: 'default',
              }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = '#93c5fd';
                  (e.currentTarget as HTMLDivElement).style.background = '#f0f4ff';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = BORDER;
                  (e.currentTarget as HTMLDivElement).style.background = LIGHT;
                }}
              >
                <div style={{ width: 40, height: 40, background: '#e0e7ff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={18} color={NAVY} />
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.5 }}>{desc}</div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   6. PRODUCTS SECTION
══════════════════════════════════════════════════════ */
const products = [
  { title: 'BrokerNote AI', category: 'Real Estate · PropTech', desc: 'Intelligent property research and compliance tool for real estate brokers.', href: '/brokernote-ai', badge: 'Live' },
  { title: 'CA Compliance Calendar', category: 'Financial Services · Compliance', desc: 'Automated compliance tracking and deadline management for Chartered Accountants.', href: '/ca-compliance-calendar', badge: 'Live' },
  { title: 'AI Calling Agent', category: 'Sales · Outreach', desc: 'Automated outbound calling system powered by conversational AI for lead engagement.', href: '/ai-calling-agent', badge: 'Live' },
  { title: 'Cold Email Agent', category: 'Marketing · Outreach', desc: 'AI-powered cold email campaigns with personalization at enterprise scale.', href: '/cold-email-agent', badge: 'Live' },
  { title: 'GST Reconcile', category: 'Finance · Compliance', desc: 'Automated GST data reconciliation and mismatch detection for finance teams.', href: '/gst-reconcile', badge: 'Beta' },
  { title: 'Certificate Generator', category: 'HR · Administration', desc: 'QR-verified digital internship certificates with instant generation and verification.', href: '/certificates', badge: 'Live' },
];

export function ProductsSection() {
  return (
    <section id="products" style={{ background: LIGHTER, padding: '80px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 44 }}>
            <div>
              <SectionLabel text="Our Products" />
              <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, maxWidth: 480 }}>
                Purpose-Built Enterprise Products
              </h2>
            </div>
            <Link href="/products" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: BLUE, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              View All Products <ChevronRight size={16} />
            </Link>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          {products.map(({ title, category, desc, href, badge }, i) => (
            <FadeIn key={title} delay={i * 0.07}>
              <Link href={href} style={{ textDecoration: 'none' }}>
                <div style={{
                  background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 14,
                  padding: '24px', height: '100%', display: 'flex', flexDirection: 'column',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  transition: 'box-shadow 0.2s, transform 0.2s',
                }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(30,58,138,0.12)';
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
                    (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                    <span style={{ fontSize: 11, color: BLUE, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 1 }}>{category}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20, letterSpacing: 0.5,
                      background: badge === 'Live' ? '#f0fdf4' : '#fefce8',
                      color: badge === 'Live' ? '#15803d' : '#92400e',
                      border: badge === 'Live' ? '1px solid #bbf7d0' : '1px solid #fde68a',
                    }}>
                      {badge}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{title}</h3>
                  <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.65, flex: 1 }}>{desc}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 16, color: BLUE, fontSize: 13, fontWeight: 700 }}>
                    Learn More <ArrowRight size={13} />
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   7. WHY DIGIAGENTIX — dark section (20%)
══════════════════════════════════════════════════════ */
const pillars = [
  { icon: TrendingUp, title: 'Outcomes-First Approach', desc: 'Every engagement is tied to measurable business results — not just technology deliverables. We define success in your terms.' },
  { icon: Shield,     title: 'Enterprise-Grade Quality', desc: 'Solutions built for scale, security, and seamless integration with your existing enterprise systems and workflows.' },
  { icon: Users,      title: 'Long-Term Partnership', desc: 'We stay engaged beyond deployment. Regular reviews, optimization cycles, and strategic advisory — not just a vendor.' },
  { icon: BarChart3,  title: 'Measurable ROI',          desc: 'Our clients report an average 3x return on technology investment within the first 18 months of engagement.' },
];

export function WhyUsSection() {
  return (
    <section style={{ background: '#0f172a', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 52px' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div style={{ width: 24, height: 2, background: '#60a5fa', borderRadius: 2 }} />
              <span style={{ fontSize: 12, fontWeight: 700, color: '#60a5fa', letterSpacing: 2, textTransform: 'uppercase' }}>Why DigiAgentix</span>
            </div>
            <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>
              Why 30+ Companies Choose Us
            </h2>
            <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.7 }}>
              We don&apos;t sell software. We solve business problems — and stay to make sure they stay solved.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20, marginBottom: 52 }}>
          {pillars.map(({ icon: Icon, title, desc }, i) => (
            <FadeIn key={title} delay={i * 0.08}>
              <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 14, padding: '28px 24px' }}>
                <div style={{ width: 48, height: 48, background: 'rgba(37,99,235,0.15)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon size={22} color='#60a5fa' />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: '#f1f5f9', marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.7 }}>{desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* Stats bar */}
        <FadeIn delay={0.2}>
          <div style={{
            background: '#1e293b', border: '1px solid #334155', borderRadius: 14,
            padding: '32px 40px', display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 24,
          }}>
            {[
              { v: '50+', l: 'Projects Delivered' },
              { v: '30+', l: 'Enterprise Clients' },
              { v: '98%', l: 'On-Time Delivery' },
              { v: '4.9★', l: 'Client Rating' },
              { v: '3x',  l: 'Average ROI' },
            ].map(({ v, l }) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: '#60a5fa' }}>{v}</div>
                <div style={{ fontSize: 13, color: '#64748b', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   8. CASE STUDIES SECTION
══════════════════════════════════════════════════════ */
const cases = [
  {
    sector: 'Real Estate',
    title: 'BrokerNote AI — Intelligent Property Research',
    result: '60% reduction in research time for property brokers',
    details: 'Built an AI-powered document analysis and compliance tool that automates due diligence for real estate transactions.',
    color: '#1e3a8a',
  },
  {
    sector: 'Financial Services',
    title: 'CA Compliance Calendar — Automated Deadline Management',
    result: '40+ CA firms managing 200+ compliance deadlines',
    details: 'Developed a smart compliance management platform with automated reminders and client communication for chartered accountants.',
    color: '#065f46',
  },
  {
    sector: 'Sales & Outreach',
    title: 'AI Calling Agent — Automated Lead Engagement',
    result: '3x increase in outreach capacity without added headcount',
    details: 'Deployed a conversational AI calling system that qualifies leads, books appointments, and integrates with existing CRM systems.',
    color: '#7c2d12',
  },
];

export function CaseStudiesSection() {
  return (
    <section id="case-studies" style={{ background: '#fff', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 16, marginBottom: 44 }}>
            <div>
              <SectionLabel text="Case Studies" />
              <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2 }}>
                Results That Speak
              </h2>
            </div>
            <Link href="/portfolio" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: BLUE, fontWeight: 700, fontSize: 14, textDecoration: 'none' }}>
              View Portfolio <ChevronRight size={16} />
            </Link>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          {cases.map(({ sector, title, result, details, color }, i) => (
            <FadeIn key={title} delay={i * 0.1}>
              <div style={{ border: `1px solid ${BORDER}`, borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ background: color, padding: '24px', marginBottom: 0 }}>
                  <span style={{ fontSize: 11, background: 'rgba(255,255,255,0.15)', color: '#fff', borderRadius: 20, padding: '4px 12px', fontWeight: 600, letterSpacing: 0.5 }}>
                    {sector}
                  </span>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#fff', marginTop: 12, lineHeight: 1.4 }}>{title}</h3>
                </div>
                <div style={{ padding: '22px 24px', background: '#fff' }}>
                  <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 14, padding: '12px 14px', background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
                    <TrendingUp size={16} color='#16a34a' style={{ flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#15803d' }}>{result}</span>
                  </div>
                  <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.65 }}>{details}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   9. CAREERS SECTION
══════════════════════════════════════════════════════ */
const openRoles = [
  { title: 'Full Stack Developer', type: 'Full-time', location: 'Noida / Remote' },
  { title: 'AI/ML Engineer', type: 'Full-time', location: 'Noida / Remote' },
  { title: 'Business Development Executive', type: 'Full-time', location: 'Noida' },
];

export function CareersSection() {
  return (
    <section id="careers" style={{ background: LIGHTER, padding: '80px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}>
        <FadeIn>
          <SectionLabel text="Careers" />
          <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 16 }}>
            Shape the Future of Enterprise Technology
          </h2>
          <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.8, marginBottom: 24 }}>
            Join a fast-growing technology company where your work directly impacts how Indian businesses operate. We invest in people who take ownership and think long-term.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
            {['Competitive salary + performance bonus', 'Remote-first flexibility', 'Work on real enterprise products', 'Fast career growth in a growing company'].map(p => (
              <div key={p} style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <CheckCircle2 size={16} color={BLUE} />
                <span style={{ fontSize: 14, color: SLATE }}>{p}</span>
              </div>
            ))}
          </div>
          <a href="mailto:info.nexawebsolution@gmail.com?subject=Career Enquiry — DigiAgentix" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: NAVY, color: '#fff', padding: '12px 24px',
            borderRadius: 8, fontWeight: 700, fontSize: 14, textDecoration: 'none',
          }}>
            Apply Now <ArrowRight size={15} />
          </a>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: SLATE, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 4 }}>Open Positions</div>
            {openRoles.map(({ title, type, location }) => (
              <div key={title} style={{
                background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 12,
                padding: '18px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: '#0f172a' }}>{title}</div>
                  <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                    <span style={{ fontSize: 12, color: MUTED }}>
                      <Briefcase size={11} style={{ display: 'inline', marginRight: 4 }} />{type}
                    </span>
                    <span style={{ fontSize: 12, color: MUTED }}>
                      <MapPin size={11} style={{ display: 'inline', marginRight: 4 }} />{location}
                    </span>
                  </div>
                </div>
                <a href="mailto:info.nexawebsolution@gmail.com?subject=Application — DigiAgentix" style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, color: BLUE, fontWeight: 700, textDecoration: 'none' }}>
                  Apply <ChevronRight size={14} />
                </a>
              </div>
            ))}
            <div style={{ background: '#e0e7ff', border: `1px solid #c7d2fe`, borderRadius: 12, padding: '14px 20px', textAlign: 'center' }}>
              <span style={{ fontSize: 13, color: NAVY, fontWeight: 600 }}>
                Don&apos;t see your role? Send us your profile at{' '}
                <a href="mailto:info.nexawebsolution@gmail.com" style={{ color: BLUE, textDecoration: 'underline' }}>
                  info.nexawebsolution@gmail.com
                </a>
              </span>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════════════════
   10. CONTACT SECTION
══════════════════════════════════════════════════════ */
export function EnterpriseContactSection() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919997730768';
  return (
    <section id="contact" style={{ background: '#fff', padding: '80px 24px', borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }}>

        <FadeIn>
          <SectionLabel text="Get In Touch" />
          <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 16 }}>
            Start Your Technology Transformation
          </h2>
          <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.8, marginBottom: 36 }}>
            Book a discovery call with our technology consultants. We&apos;ll assess your current operations and design a transformation roadmap tailored to your business.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: Phone, label: '+91-9997730768', sub: 'Mon–Sat · 9am–8pm IST' },
              { icon: Mail, label: 'info.nexawebsolution@gmail.com', sub: 'We respond within 2 hours' },
              { icon: MapPin, label: 'Noida, Uttar Pradesh, India', sub: 'MSME Registered Company' },
            ].map(({ icon: Icon, label, sub }) => (
              <div key={label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, background: '#e0e7ff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={18} color={NAVY} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a' }}>{label}</div>
                  <div style={{ fontSize: 12, color: MUTED, marginTop: 2 }}>{sub}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div style={{ background: LIGHTER, border: `1px solid ${BORDER}`, borderRadius: 16, padding: 36 }}>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>Book a Discovery Call</h3>
            <p style={{ fontSize: 14, color: MUTED, marginBottom: 28 }}>Tell us about your project and we&apos;ll be in touch within 2 hours.</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { placeholder: 'Your Name', type: 'text' },
                { placeholder: 'Company Name', type: 'text' },
                { placeholder: 'Business Email', type: 'email' },
                { placeholder: 'Phone Number', type: 'tel' },
              ].map(({ placeholder, type }) => (
                <input key={placeholder} type={type} placeholder={placeholder} style={{
                  width: '100%', padding: '12px 16px', border: `1px solid ${BORDER}`, borderRadius: 8,
                  fontSize: 14, color: '#0f172a', background: '#fff', outline: 'none',
                  fontFamily: 'inherit',
                }} />
              ))}
              <textarea placeholder="Describe your requirements…" rows={3} style={{
                width: '100%', padding: '12px 16px', border: `1px solid ${BORDER}`, borderRadius: 8,
                fontSize: 14, color: '#0f172a', background: '#fff', outline: 'none',
                resize: 'vertical', fontFamily: 'inherit',
              }} />
              <div style={{ display: 'flex', gap: 10 }}>
                <a
                  href={`https://wa.me/${wa}?text=Hi! I'd like to schedule a discovery consultation.`}
                  target="_blank" rel="noopener noreferrer"
                  style={{
                    flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    background: '#16a34a', color: '#fff', padding: '13px', borderRadius: 8,
                    fontWeight: 700, fontSize: 14, textDecoration: 'none',
                  }}
                >
                  WhatsApp
                </a>
                <Link href="/contact" style={{
                  flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  background: NAVY, color: '#fff', padding: '13px', borderRadius: 8,
                  fontWeight: 700, fontSize: 14, textDecoration: 'none',
                }}>
                  Schedule Consultation <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
