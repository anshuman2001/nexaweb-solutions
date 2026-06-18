'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Brain, Cog, Code2, Cloud, RefreshCw, Users,
  HeartPulse, Building2, GraduationCap, ShoppingBag,
  DollarSign, Factory, Rocket, CheckCircle2, ArrowRight,
  TrendingUp, Shield, Award, Clock, MapPin, Phone, Mail,
  ChevronRight, Star, BarChart3, Layers, Briefcase, MessageCircle,
} from 'lucide-react';

const NAVY   = '#1e3a8a';
const BLUE   = '#2563eb';
const SLATE  = '#334155';
const MUTED  = '#64748b';
const BORDER = '#e2e8f0';
const LIGHT  = '#f8fafc';
const LIGHTER = '#f1f5f9';

/* ─── Fade-in wrapper ──────────────────────────── */
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

/* ─── Section label ────────────────────────────── */
function SectionLabel({ text, dark = false }: { text: string; dark?: boolean }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
      <div style={{ width: 24, height: 2, background: dark ? '#60a5fa' : BLUE, borderRadius: 2 }} />
      <span style={{ fontSize: 12, fontWeight: 700, color: dark ? '#60a5fa' : BLUE, letterSpacing: 2, textTransform: 'uppercase' }}>{text}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════
   1. INDUSTRY SECTORS BAR (replaces fake logos)
═══════════════════════════════════════════════ */
const sectors = [
  { icon: HeartPulse,    label: 'Healthcare' },
  { icon: Building2,     label: 'Real Estate' },
  { icon: GraduationCap, label: 'Education' },
  { icon: ShoppingBag,   label: 'Retail' },
  { icon: DollarSign,    label: 'Financial Services' },
  { icon: Factory,       label: 'Manufacturing' },
  { icon: Rocket,        label: 'Startups' },
  { icon: Layers,        label: 'Enterprise' },
];

export function ClientLogosBar() {
  return (
    <section style={{ background: '#fff', borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}`, padding: '20px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', textAlign: 'center' }}>
        <span style={{ fontSize: 11, fontWeight: 600, color: MUTED, letterSpacing: 1, textTransform: 'uppercase', display: 'block', marginBottom: 14 }}>
          Serving clients across
        </span>
        <div className="flex flex-wrap gap-x-6 gap-y-3 items-center justify-center">
          {sectors.map(({ icon: Icon, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
              <Icon size={14} color={MUTED} />
              <span style={{ fontSize: 13, fontWeight: 600, color: SLATE }}>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   2. CERTIFICATIONS BAR (ISO removed — only real creds)
═══════════════════════════════════════════════ */
const certs = [
  { icon: Shield,       label: 'MSME Registered',      sub: 'Ministry of MSME · Govt. of India' },
  { icon: Award,        label: 'Startup India',         sub: 'DPIIT Recognised Startup' },
  { icon: CheckCircle2, label: '50+ Projects',          sub: 'Successfully Delivered' },
  { icon: Star,         label: '4.9 / 5 Rating',        sub: 'Verified Client Satisfaction' },
  { icon: Clock,        label: '5+ Years',              sub: 'Industry Experience' },
];

export function CertificationsBar() {
  return (
    <section style={{ background: LIGHTER, padding: '40px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {certs.map(({ icon: Icon, label, sub }, i) => (
            <FadeIn key={label} delay={i * 0.07}>
              <div style={{
                background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 12,
                padding: '18px 16px', display: 'flex', alignItems: 'center', gap: 12,
                boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              }}>
                <div style={{ width: 40, height: 40, background: '#e0e7ff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={18} color={NAVY} />
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>{label}</div>
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

/* ═══════════════════════════════════════════════
   3. ABOUT SECTION (compact — full story on /about)
═══════════════════════════════════════════════ */
export function AboutSection() {
  return (
    <section id="about" style={{ background: '#fff', padding: '80px 24px' }}>
      <div className="max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-center">
        <FadeIn>
          <SectionLabel text="About Us" />
          <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 20 }}>
            A Technology Partner<br />You Can Trust
          </h2>
          <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.8, marginBottom: 16 }}>
            DigiAgentix is a professional technology solutions company headquartered in Noida, India. We partner with SMEs, enterprises, and growth-stage organisations to design, build, and deploy intelligent systems that drive measurable operational improvement.
          </p>
          <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.8, marginBottom: 28 }}>
            From AI automation and cloud infrastructure to custom enterprise software — we deliver full-spectrum technology services that bridge ambition and execution at scale.
          </p>
          <div style={{ background: '#f0f4ff', border: `1px solid #c7d2fe`, borderRadius: 10, padding: '14px 18px', marginBottom: 28 }}>
            <p style={{ fontSize: 14, fontStyle: 'italic', color: NAVY, lineHeight: 1.6 }}>
              &ldquo;We don&apos;t sell software. We solve business problems.&rdquo;
            </p>
          </div>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 28 }}>
            {['AI Solutions', 'Automation', 'Cloud Services', 'Enterprise Software', 'Digital Transformation'].map(tag => (
              <span key={tag} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: NAVY, fontWeight: 600 }}>
                <CheckCircle2 size={14} color={BLUE} /> {tag}
              </span>
            ))}
          </div>
          <Link href="/about" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            color: BLUE, fontWeight: 700, fontSize: 14, textDecoration: 'none',
            border: `2px solid ${BLUE}`, borderRadius: 8, padding: '10px 22px',
          }}>
            Our Story & Team <ArrowRight size={15} />
          </Link>
        </FadeIn>

        <FadeIn delay={0.15}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
            {[
              { v: '50+', l: 'Projects Delivered', dark: true },
              { v: '30+', l: 'Enterprise Clients', dark: false },
              { v: '5+',  l: 'Years of Excellence', dark: false },
              { v: '98%', l: 'On-Time Delivery', dark: true },
            ].map(({ v, l, dark }) => (
              <div key={l} style={{
                background: dark ? NAVY : '#fff',
                border: `1px solid ${dark ? NAVY : BORDER}`,
                borderRadius: 14, padding: '26px 20px', textAlign: 'center',
                boxShadow: dark ? '0 8px 24px rgba(30,58,138,0.18)' : '0 2px 8px rgba(0,0,0,0.05)',
              }}>
                <div style={{ fontSize: 34, fontWeight: 900, color: dark ? '#fff' : NAVY, lineHeight: 1 }}>{v}</div>
                <div style={{ fontSize: 12, color: dark ? '#93c5fd' : MUTED, marginTop: 8, fontWeight: 500 }}>{l}</div>
              </div>
            ))}
          </div>
          <div style={{ background: LIGHTER, borderRadius: 12, padding: '14px 18px', marginTop: 14, border: `1px solid ${BORDER}`, display: 'flex', gap: 10, alignItems: 'center' }}>
            <MapPin size={15} color={BLUE} style={{ flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0f172a' }}>Noida, Uttar Pradesh, India</div>
              <div style={{ fontSize: 11, color: MUTED, marginTop: 1 }}>MSME Registered · Pan-India services</div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   4. SOLUTIONS SECTION
═══════════════════════════════════════════════ */
const solutions = [
  {
    icon: Brain, title: 'AI & Machine Learning',
    desc: 'Custom AI models, NLP, predictive analytics, and intelligent decision systems tailored to your processes.',
    tags: ['Predictive Analytics', 'NLP', 'Computer Vision'],
    href: '/services',
  },
  {
    icon: Cog, title: 'Intelligent Automation',
    desc: 'End-to-end workflow automation — from document processing to multi-channel AI-driven operations.',
    tags: ['RPA', 'Process Automation', 'AI Workflows'],
    href: '/services',
  },
  {
    icon: Code2, title: 'Software Development',
    desc: 'Enterprise web applications, APIs, and SaaS platforms built on scalable, production-ready architecture.',
    tags: ['Web Apps', 'APIs', 'SaaS Platforms'],
    href: '/services',
  },
  {
    icon: Cloud, title: 'Cloud Solutions',
    desc: 'Cloud migration, serverless architecture, DevOps pipelines, and managed infrastructure services.',
    tags: ['Migration', 'DevOps', 'Serverless'],
    href: '/services',
  },
  {
    icon: RefreshCw, title: 'Digital Transformation',
    desc: 'Strategic modernisation of operations, systems, and customer experience from end to end.',
    tags: ['Strategy', 'Modernisation', 'CX'],
    href: '/services',
  },
  {
    icon: Users, title: 'Enterprise Consulting',
    desc: 'Technology assessment, roadmap planning, and hands-on advisory to align IT strategy with business goals.',
    tags: ['Assessment', 'Roadmap', 'Advisory'],
    href: '/services',
  },
];

export function SolutionsSection() {
  return (
    <section id="solutions" style={{ background: LIGHTER, padding: '80px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 48px' }}>
            <SectionLabel text="Our Solutions" />
            <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 16 }}>
              End-to-End Technology Services
            </h2>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.7 }}>
              From strategy to deployment — complete technology solutions that create measurable business outcomes.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 18 }}>
          {solutions.map(({ icon: Icon, title, desc, tags, href }, i) => (
            <FadeIn key={title} delay={i * 0.07}>
              <Link href={href} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
                <div style={{
                  background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 14,
                  padding: '26px 22px', height: '100%',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  transition: 'box-shadow 0.2s, border-color 0.2s, transform 0.2s',
                }}
                  onMouseEnter={e => {
                    const d = e.currentTarget as HTMLDivElement;
                    d.style.boxShadow = '0 12px 32px rgba(30,58,138,0.12)';
                    d.style.borderColor = '#93c5fd';
                    d.style.transform = 'translateY(-2px)';
                  }}
                  onMouseLeave={e => {
                    const d = e.currentTarget as HTMLDivElement;
                    d.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                    d.style.borderColor = BORDER;
                    d.style.transform = 'translateY(0)';
                  }}
                >
                  <div style={{ width: 46, height: 46, background: '#e0e7ff', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                    <Icon size={21} color={NAVY} />
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>{title}</h3>
                  <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, marginBottom: 16 }}>{desc}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {tags.map(tag => (
                      <span key={tag} style={{ fontSize: 11, background: LIGHTER, color: SLATE, border: `1px solid ${BORDER}`, borderRadius: 20, padding: '3px 10px', fontWeight: 600 }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.3}>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/services" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: NAVY, color: '#fff', padding: '13px 28px',
              borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none',
              boxShadow: '0 4px 14px rgba(30,58,138,0.28)',
            }}>
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   5. INDUSTRIES SECTION
═══════════════════════════════════════════════ */
const industries = [
  { icon: HeartPulse,    label: 'Healthcare',           desc: 'Patient workflows, automation & clinical analytics' },
  { icon: Building2,     label: 'Real Estate',          desc: 'PropTech platforms, CRM & lead intelligence' },
  { icon: GraduationCap, label: 'Education',            desc: 'EdTech platforms & learning automation' },
  { icon: ShoppingBag,   label: 'Retail & E-commerce',  desc: 'Inventory, customer experience & sales AI' },
  { icon: DollarSign,    label: 'Financial Services',   desc: 'Compliance automation, analytics & fintech' },
  { icon: Factory,       label: 'Manufacturing',        desc: 'Process optimisation & supply chain intelligence' },
  { icon: Rocket,        label: 'Startups',             desc: 'MVP development, automation & growth engineering' },
  { icon: Layers,        label: 'Enterprises',          desc: 'Digital transformation & legacy modernisation' },
];

export function IndustriesSection() {
  return (
    <section id="industries" style={{ background: '#fff', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 48px' }}>
            <SectionLabel text="Industries We Serve" />
            <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 16 }}>
              Built for Your Sector
            </h2>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.7 }}>
              Deep domain knowledge across industries — ensuring our solutions fit your sector&apos;s unique compliance, operational, and growth requirements.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14 }}>
          {industries.map(({ icon: Icon, label, desc }, i) => (
            <FadeIn key={label} delay={i * 0.06}>
              <div style={{
                border: `1px solid ${BORDER}`, borderRadius: 12,
                padding: '20px 18px', background: LIGHT,
                display: 'flex', gap: 14, alignItems: 'flex-start',
                transition: 'border-color 0.2s, background 0.2s',
                cursor: 'default',
              }}
                onMouseEnter={e => {
                  const d = e.currentTarget as HTMLDivElement;
                  d.style.borderColor = '#93c5fd';
                  d.style.background = '#f0f4ff';
                }}
                onMouseLeave={e => {
                  const d = e.currentTarget as HTMLDivElement;
                  d.style.borderColor = BORDER;
                  d.style.background = LIGHT;
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

/* ═══════════════════════════════════════════════
   6. PRODUCTS SECTION — 3 featured platforms
═══════════════════════════════════════════════ */
const products = [
  {
    title: 'AI Agents Suite',
    nameTag: 'Intelligent Automation Platform',
    category: 'Cross-Industry · AI & Automation',
    desc: 'A comprehensive suite of purpose-built AI agents — customer support, sales, WhatsApp, meeting, and industry-specific agents — deployable across your existing workflows.',
    href: '/ai-agents',
    badge: 'Live',
  },
  {
    title: 'ComplianceIQ',
    nameTag: 'CA Compliance Management',
    category: 'Financial Services · Compliance',
    desc: 'Automated compliance tracking, deadline management, and client communication platform for Chartered Accountant firms.',
    href: '/ca-compliance-calendar',
    badge: 'Live',
  },
  {
    title: 'BrokerNote',
    nameTag: 'Real Estate Intelligence Platform',
    category: 'Real Estate · PropTech',
    desc: 'AI-powered property research and compliance platform for real estate brokers — automating due diligence and deal documentation.',
    href: '/brokernote-ai',
    badge: 'Live',
  },
];

export function ProductsSection() {
  return (
    <section id="products" style={{ background: LIGHTER, padding: '80px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 680, margin: '0 auto 48px' }}>
            <SectionLabel text="Technology Platforms & Products" />
            <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 16 }}>
              Technology Platforms &amp; Products
            </h2>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.7 }}>
              Explore our portfolio of AI-powered business solutions and enterprise technology platforms.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20 }}>
          {products.map(({ title, nameTag, category, desc, href, badge }, i) => (
            <FadeIn key={title} delay={i * 0.09}>
              <div style={{
                background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 14,
                padding: '26px', height: '100%', display: 'flex', flexDirection: 'column',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'box-shadow 0.2s, transform 0.2s',
              }}
                onMouseEnter={e => {
                  const d = e.currentTarget as HTMLDivElement;
                  d.style.boxShadow = '0 12px 32px rgba(30,58,138,0.12)';
                  d.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={e => {
                  const d = e.currentTarget as HTMLDivElement;
                  d.style.boxShadow = '0 2px 8px rgba(0,0,0,0.04)';
                  d.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <span style={{ fontSize: 11, color: BLUE, fontWeight: 600, textTransform: 'uppercase', letterSpacing: 0.8 }}>{category}</span>
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
                    background: '#f0fdf4', color: '#15803d', border: '1px solid #bbf7d0',
                  }}>
                    {badge}
                  </span>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: '#0f172a', marginBottom: 2 }}>{title}</h3>
                <p style={{ fontSize: 12, fontWeight: 600, color: MUTED, marginBottom: 12, textTransform: 'uppercase', letterSpacing: 0.5 }}>{nameTag}</p>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.65, flex: 1 }}>{desc}</p>
                <Link href={href} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  marginTop: 18, color: BLUE, fontSize: 13, fontWeight: 700, textDecoration: 'none',
                }}>
                  Learn More <ArrowRight size={13} />
                </Link>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.28}>
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <Link href="/products" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              border: `2px solid ${NAVY}`, color: NAVY, padding: '12px 28px',
              borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none',
              transition: 'background 0.15s, color 0.15s',
            }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = NAVY;
                el.style.color = '#fff';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = 'transparent';
                el.style.color = NAVY;
              }}
            >
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   7. WHY DIGIAGENTIX — dark section (the 20%)
═══════════════════════════════════════════════ */
const pillars = [
  { icon: TrendingUp, title: 'Outcomes-First Approach',  desc: 'Every engagement is tied to measurable business results — not just technology deliverables. We define success in your terms.' },
  { icon: Shield,     title: 'Enterprise-Grade Quality', desc: 'Solutions built for scale, security, and seamless integration with your existing enterprise systems and workflows.' },
  { icon: Users,      title: 'Long-Term Partnership',    desc: 'We stay engaged beyond deployment. Regular reviews, optimisation cycles, and strategic advisory — not just a vendor.' },
  { icon: BarChart3,  title: 'Measurable ROI',           desc: 'Our clients report an average 3× return on technology investment within the first 18 months of engagement.' },
];

export function WhyUsSection() {
  return (
    <section style={{ background: '#0f172a', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 52px' }}>
            <SectionLabel text="Why DigiAgentix" dark />
            <h2 style={{ fontSize: 'clamp(28px,4vw,42px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>
              Why 30+ Companies Choose Us
            </h2>
            <p style={{ fontSize: 16, color: '#94a3b8', lineHeight: 1.7 }}>
              We don&apos;t sell software. We solve business problems — and stay to make sure they stay solved.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 18, marginBottom: 48 }}>
          {pillars.map(({ icon: Icon, title, desc }, i) => (
            <FadeIn key={title} delay={i * 0.08}>
              <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 14, padding: '26px 22px' }}>
                <div style={{ width: 46, height: 46, background: 'rgba(37,99,235,0.14)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <Icon size={21} color='#60a5fa' />
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9', marginBottom: 10 }}>{title}</h3>
                <p style={{ fontSize: 14, color: '#94a3b8', lineHeight: 1.7 }}>{desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn delay={0.25}>
          <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 14, padding: '30px 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 24 }}>
            {[
              { v: '50+', l: 'Projects Delivered' },
              { v: '30+', l: 'Enterprise Clients' },
              { v: '98%', l: 'On-Time Delivery' },
              { v: '4.9★', l: 'Client Rating' },
              { v: '3×',  l: 'Average ROI' },
            ].map(({ v, l }) => (
              <div key={l} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 30, fontWeight: 900, color: '#60a5fa' }}>{v}</div>
                <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>{l}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   8. CASE STUDIES
═══════════════════════════════════════════════ */
const cases = [
  {
    sector: 'Real Estate',
    title: 'BrokerNote — Intelligent Property Research Platform',
    result: '60% reduction in broker research time',
    details: 'AI-powered document analysis and compliance tool that automates due diligence for real estate transactions across the NCR region.',
    color: '#1e3a8a',
  },
  {
    sector: 'Financial Services',
    title: 'ComplianceIQ — CA Deadline Management',
    result: '200+ compliance deadlines managed per firm',
    details: 'Smart compliance management platform with automated reminders and WhatsApp notifications deployed across 40+ CA firms.',
    color: '#065f46',
  },
  {
    sector: 'Sales & Outreach',
    title: 'OutreachIQ — Automated Lead Engagement',
    result: '3× increase in outreach capacity',
    details: 'Conversational AI calling and email system that qualifies leads, books appointments, and integrates with existing CRM workflows.',
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
              View All Case Studies <ChevronRight size={16} />
            </Link>
          </div>
        </FadeIn>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18 }}>
          {cases.map(({ sector, title, result, details, color }, i) => (
            <FadeIn key={title} delay={i * 0.1}>
              <div style={{ border: `1px solid ${BORDER}`, borderRadius: 14, overflow: 'hidden', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                <div style={{ background: color, padding: '22px 22px 20px' }}>
                  <span style={{ fontSize: 11, background: 'rgba(255,255,255,0.16)', color: '#fff', borderRadius: 20, padding: '4px 12px', fontWeight: 600, letterSpacing: 0.5 }}>
                    {sector}
                  </span>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginTop: 12, lineHeight: 1.4 }}>{title}</h3>
                </div>
                <div style={{ padding: '20px 22px', background: '#fff' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginBottom: 12, padding: '10px 14px', background: '#f0fdf4', borderRadius: 8, border: '1px solid #bbf7d0' }}>
                    <TrendingUp size={15} color='#16a34a' style={{ flexShrink: 0, marginTop: 1 }} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#15803d' }}>{result}</span>
                  </div>
                  <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.65 }}>{details}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   9. CAREERS — compact banner (full page at /careers)
═══════════════════════════════════════════════ */
export function CareersSection() {
  return (
    <section id="careers" style={{ background: LIGHTER, padding: '48px 24px', borderTop: `1px solid ${BORDER}` }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 48, height: 48, background: '#e0e7ff', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Briefcase size={22} color={NAVY} />
          </div>
          <div>
            <div style={{ fontSize: 18, fontWeight: 800, color: '#0f172a' }}>We&apos;re Growing Our Team</div>
            <div style={{ fontSize: 14, color: MUTED, marginTop: 3 }}>
              Join a team of technologists building enterprise products for Indian businesses · Remote-friendly · Noida HQ
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {['Full Stack Developer', 'AI/ML Engineer', 'Business Development'].map(role => (
            <span key={role} style={{ fontSize: 12, background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 20, padding: '5px 14px', fontWeight: 600, color: SLATE }}>
              {role}
            </span>
          ))}
          <Link href="/contact" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: NAVY, color: '#fff', padding: '8px 20px',
            borderRadius: 20, fontWeight: 700, fontSize: 13, textDecoration: 'none',
          }}>
            View Openings <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   10. FINAL CTA — dark banner, no broken form
═══════════════════════════════════════════════ */
export function EnterpriseContactSection() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919997730768';
  return (
    <section style={{ background: NAVY, padding: '72px 24px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#93c5fd', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>
            Get Started
          </div>
          <h2 style={{ fontSize: 'clamp(28px,4vw,44px)', fontWeight: 800, color: '#fff', lineHeight: 1.2, marginBottom: 20 }}>
            Ready to Transform Your Operations?
          </h2>
          <p style={{ fontSize: 17, color: '#93c5fd', lineHeight: 1.7, marginBottom: 40, maxWidth: 600, margin: '0 auto 40px' }}>
            Book a 30-minute discovery call with our technology consultants. We&apos;ll assess your current operations and design a roadmap tailored to your business — at no obligation.
          </p>

          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#fff', color: NAVY, padding: '14px 30px',
              borderRadius: 8, fontWeight: 800, fontSize: 15, textDecoration: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
            }}>
              Book a Discovery Call <ArrowRight size={16} />
            </Link>
            <a
              href={`https://wa.me/${wa}?text=Hi! I'd like to schedule a discovery consultation with DigiAgentix.`}
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: '#16a34a', color: '#fff', padding: '14px 28px',
                borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none',
              }}
            >
              <MessageCircle size={16} /> WhatsApp Us
            </a>
          </div>

          <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { icon: Phone, text: '+91-9997730768' },
              { icon: Mail,  text: 'info.nexawebsolution@gmail.com' },
              { icon: MapPin, text: 'Noida, Uttar Pradesh, India' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Icon size={14} color='#93c5fd' />
                <span style={{ fontSize: 13, color: '#cbd5e1' }}>{text}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
