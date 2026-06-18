'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Receipt, FileSpreadsheet, PenTool, ShoppingBag, PhoneCall,
  Home, CalendarCheck, GraduationCap, Mail, Award,
  CheckCircle2, ArrowRight, Phone, MessageCircle,
  BadgeCheck, Users, Package, Layers, Zap, Headphones,
} from 'lucide-react';

/* ── Design tokens (matches Solutions / Homepage) ── */
const NAVY    = '#1e3a8a';
const BLUE    = '#2563eb';
const SLATE   = '#334155';
const MUTED   = '#64748b';
const BORDER  = '#e2e8f0';
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

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
      <div style={{ width: 24, height: 2, background: BLUE, borderRadius: 2 }} />
      <span style={{ fontSize: 12, fontWeight: 700, color: BLUE, letterSpacing: 2, textTransform: 'uppercase' }}>{text}</span>
    </div>
  );
}

/* ══════════════════════════════════════════
   DATA
══════════════════════════════════════════ */
type BadgeVariant = 'Featured' | 'Popular' | 'Enterprise' | 'Best Seller' | 'Recommended';
type CtaVariant   = 'Schedule Demo' | 'Learn More' | 'Request Access' | 'Contact Sales';

interface Product {
  id: string;
  href: string;
  external: boolean;
  badge: BadgeVariant;
  icon: React.ElementType;
  name: string;
  tagline: string;
  description: string;
  features: string[];
  cta: CtaVariant;
  category: string;
  filterKey: string;
  price: string;
  priceType: 'free' | 'from' | 'contact';
}

const products: Product[] = [
  {
    id: 'gst-reconciliation',
    href: '/gst-ai-agent',
    external: true,
    badge: 'Featured',
    icon: Receipt,
    name: 'GST AI Reconciliation',
    tagline: 'AI-Powered GST Reconciliation Platform',
    description: 'Upload invoices, auto-match GSTR-2B, detect anomalies, and generate PDF audit reports. Built for CA firms, accountants, and finance teams.',
    features: [
      'Auto fuzzy invoice matching',
      'AI fraud & anomaly detection',
      'Any Excel column format supported',
      'PDF audit report generation',
      'Multi-firm / multi-user support',
      'AI-powered mismatch explanations',
    ],
    cta: 'Schedule Demo',
    category: 'Finance & Compliance',
    filterKey: 'Finance',
    price: 'Contact for Pricing',
    priceType: 'contact',
  },
  {
    id: 'brokernote-ai',
    href: '/brokernote-ai',
    external: false,
    badge: 'Popular',
    icon: FileSpreadsheet,
    name: 'BrokerNote AI',
    tagline: 'Stock Contract Note Extractor for CA Firms',
    description: 'Upload Angel One, Zerodha, Upstox contract note PDFs — AI extracts all trade data instantly. Download clean Excel and Tally Prime XML import files.',
    features: [
      'Supports all major brokers (Angel One, Zerodha, Upstox)',
      'Extracts ISIN, WAP, STT, GST, stamp duty, net obligation',
      '3-sheet Excel: Trade Summary + Tally Journal + Order Details',
      'Tally Prime XML — ready to import journal entries',
      'Secure login — data discarded after extraction',
      'No subscription, no hidden cost',
    ],
    cta: 'Learn More',
    category: 'Finance & CA Tools',
    filterKey: 'Finance',
    price: 'Free Forever',
    priceType: 'free',
  },
  {
    id: 'content-agent',
    href: '/content-agent',
    external: true,
    badge: 'Enterprise',
    icon: PenTool,
    name: 'DigiAgentix Content Agent',
    tagline: 'AI Content Writing Platform for Businesses',
    description: 'Generate SEO blogs, product descriptions, social media posts, and ad copy in Hindi & English — with templates, brand voice training, and bulk generation.',
    features: [
      'Blog, social, product & ad copy generation',
      'Hindi + English with SEO optimisation',
      'Pre-built templates (Instagram, LinkedIn, Amazon)',
      'Brand voice training from your samples',
      'Bulk CSV keyword → content generation',
      'Export as PDF, DOCX or copy to clipboard',
    ],
    cta: 'Schedule Demo',
    category: 'Content & Marketing',
    filterKey: 'Marketing',
    price: 'Starting From ₹10,000/mo',
    priceType: 'from',
  },
  {
    id: 'ecommerce-agent',
    href: '/ecommerce-agent',
    external: true,
    badge: 'Enterprise',
    icon: ShoppingBag,
    name: 'eCommerce Shopping Agent',
    tagline: 'AI Sales Agent for Online Stores',
    description: 'Full-stack AI shopping agent that boosts sales, recovers abandoned carts, handles support in Hindi & English, and cuts costs with smart hybrid AI.',
    features: [
      'Conversational AI in Hindi + English',
      'Smart product recommendations engine',
      'WhatsApp + Email cart abandonment recovery',
      'Real-time order tracking integration',
      'Upselling, cross-selling & bundling AI',
      'Admin dashboard with full analytics',
    ],
    cta: 'Schedule Demo',
    category: 'eCommerce & Retail',
    filterKey: 'eCommerce',
    price: 'Starting From ₹25,000',
    priceType: 'from',
  },
  {
    id: 'ai-calling-agent',
    href: '/ai-calling-agent',
    external: true,
    badge: 'Best Seller',
    icon: PhoneCall,
    name: 'AI Calling Agent',
    tagline: 'Scale Sales Outreach with Human-like AI Calls',
    description: 'Human-like AI calls your leads 24/7 in Hindi & English — 10,000 concurrent calls, real-time CRM updates, and WhatsApp follow-up.',
    features: [
      'Human-like voice — ElevenLabs Hindi & English',
      '10,000 concurrent calls simultaneously',
      'Real-time CRM updates after every call',
      'Smart objection handling & follow-ups',
      'WhatsApp follow-up automation',
      'TRAI compliant — DLT registered',
    ],
    cta: 'Schedule Demo',
    category: 'Sales & Outreach',
    filterKey: 'AI Agents',
    price: 'Starting From ₹49,999/mo',
    priceType: 'from',
  },
  {
    id: 'interior-ai-designer',
    href: '/interior-ai',
    external: false,
    badge: 'Popular',
    icon: Home,
    name: 'Interior AI Designer',
    tagline: 'AI-Powered 4K Interior Redesign',
    description: 'Upload a photo of any room and get a photorealistic 4K interior redesign in seconds — preserving exact room dimensions, doors, and windows.',
    features: [
      'Upload any room photo — JPG, PNG, WEBP',
      '4K photorealistic V-Ray quality render',
      '5 design styles — Modern Indian Luxury, Contemporary, Minimalist, and more',
      'Preserves exact room structure, doors & windows',
      'Before / after comparison view',
      'Adjustable design intensity slider',
    ],
    cta: 'Request Access',
    category: 'Design & Real Estate',
    filterKey: 'Design',
    price: 'Starting From ₹4/render',
    priceType: 'from',
  },
  {
    id: 'ca-compliance-calendar',
    href: '/ca-compliance-calendar',
    external: false,
    badge: 'Popular',
    icon: CalendarCheck,
    name: 'CA Compliance Calendar',
    tagline: 'Auto WhatsApp Reminders for Filing Deadlines',
    description: 'Never miss a GST, ITR, TDS, or ROC deadline. Add clients to Google Sheets — the bot auto-sends WhatsApp reminders 7 days and 1 day before every due date.',
    features: [
      'WhatsApp alerts 7 days & 1 day before due date',
      'Google Sheets as client database — no coding needed',
      'Supports GST / ITR / TDS / ROC filings',
      'Auto-logs every sent message',
      'Runs daily at 9 AM',
      '100% open source — self-hosted',
    ],
    cta: 'Learn More',
    category: 'Finance & CA Tools',
    filterKey: 'Finance',
    price: 'Free Forever',
    priceType: 'free',
  },
  {
    id: 'eduaccess-ai',
    href: '/eduaccess-ai',
    external: true,
    badge: 'Featured',
    icon: GraduationCap,
    name: 'EduAccess AI',
    tagline: 'Accessible Content & Alt Text Generator',
    description: 'AI-powered platform for US schools & edtech — generate WCAG 2.1 compliant alt text and ADA-compliant educational content in seconds.',
    features: [
      'WCAG 2.1 & ADA compliant alt text',
      'Short alt text strictly under 200 characters',
      'Supports diagrams, charts, infographics',
      'Blog, course & lesson content writing',
      'K-12 & higher education tone',
      'Bias-free, inclusive language engine',
    ],
    cta: 'Request Access',
    category: 'Education & Accessibility',
    filterKey: 'Education',
    price: 'Contact for Pricing',
    priceType: 'contact',
  },
  {
    id: 'cold-email-agent',
    href: '/cold-email-agent',
    external: false,
    badge: 'Popular',
    icon: Mail,
    name: 'Cold Email AI Agent',
    tagline: 'AI-Powered Cold Email Outreach Automation',
    description: 'Generate hyper-personalised cold email sequences using AI. Upload leads, auto-write emails for each prospect, and launch outreach campaigns in minutes.',
    features: [
      'AI writes personalised email per prospect',
      'Upload CSV — auto-personalise at scale',
      'Multi-step follow-up sequence generator',
      'Subject line A/B testing with AI',
      'Industry-specific tone & template library',
      'No credit card required',
    ],
    cta: 'Learn More',
    category: 'Sales & Outreach',
    filterKey: 'Marketing',
    price: 'Free Forever',
    priceType: 'free',
  },
];

const FILTER_TABS = ['All', 'Finance', 'AI Agents', 'Marketing', 'eCommerce', 'Education', 'Design'];

/* Badge styles for light backgrounds */
const BADGE_STYLES: Record<BadgeVariant, { bg: string; border: string; color: string }> = {
  'Featured':    { bg: '#e0e7ff', border: '#c7d2fe', color: NAVY },
  'Popular':     { bg: '#fef3c7', border: '#fde68a', color: '#92400e' },
  'Enterprise':  { bg: '#ede9fe', border: '#ddd6fe', color: '#5b21b6' },
  'Best Seller': { bg: '#d1fae5', border: '#a7f3d0', color: '#065f46' },
  'Recommended': { bg: '#e0f2fe', border: '#bae6fd', color: '#0c4a6e' },
};

const whyItems = [
  { icon: Zap,        label: 'Easy Setup',                 sub: 'Get started in days, not months' },
  { icon: Package,    label: 'AI Powered',                 sub: 'Latest AI models under the hood' },
  { icon: BadgeCheck, label: 'Affordable Pricing',         sub: 'Designed for SME budgets' },
  { icon: Layers,     label: 'Secure & Reliable',          sub: 'Enterprise-grade security' },
  { icon: Users,      label: 'Built for Indian Businesses', sub: 'Localised for India-specific needs' },
  { icon: Headphones, label: 'Dedicated Support',          sub: 'WhatsApp & phone support' },
];

/* ══════════════════════════════════════════
   HERO (light — matches Solutions page)
══════════════════════════════════════════ */
function Hero() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919997730768';
  return (
    <section style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 50%, #e8efff 100%)', paddingTop: 108, paddingBottom: 88 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#e0e7ff', border: '1px solid #c7d2fe', borderRadius: 20, padding: '6px 18px', marginBottom: 28 }}>
            <span style={{ width: 8, height: 8, background: BLUE, borderRadius: '50%', display: 'inline-block' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: NAVY }}>Enterprise Technology Products</span>
          </div>

          <h1 style={{ fontSize: 'clamp(32px,5.5vw,60px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.1, marginBottom: 20, letterSpacing: -0.5 }}>
            AI Products Built for<br />
            <span style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Modern Businesses</span>
          </h1>

          <p style={{ fontSize: 'clamp(16px,2vw,19px)', color: '#475569', lineHeight: 1.75, maxWidth: 620, margin: '0 auto 40px' }}>
            Ready-to-use AI and automation products designed to increase efficiency, reduce costs, and accelerate business growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <a
              href={`https://wa.me/${wa}?text=Hi! I'd like to book a demo of DigiAgentix products.`}
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: NAVY, color: '#fff', padding: '15px 32px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 16px rgba(30,58,138,0.35)' }}
            >
              <Phone size={16} /> Schedule a Demo
            </a>
            <a
              href={`https://wa.me/${wa}?text=Hi DigiAgentix! I have a question about your products.`}
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#fff', color: NAVY, padding: '15px 32px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none', border: `2px solid ${NAVY}` }}
            >
              <MessageCircle size={16} /> WhatsApp Us
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {['MSME Registered', 'India-Based Team', '10+ SaaS Products', 'Enterprise Ready'].map(label => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <CheckCircle2 size={14} color={BLUE} />
                <span style={{ fontSize: 13, fontWeight: 600, color: SLATE }}>{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   PRODUCTS GRID (light cards)
══════════════════════════════════════════ */
function ProductsGrid() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filtered = activeFilter === 'All' ? products : products.filter(p => p.filterKey === activeFilter);
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919997730768';

  return (
    <section style={{ background: LIGHTER, padding: '72px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>

        {/* Section header */}
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 40px' }}>
            <SectionLabel text="Our Products" />
            <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 12 }}>
              Purpose-Built for Every Business Need
            </h2>
            <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.7 }}>
              Filter by category to find the right product for your team.
            </p>
          </div>
        </FadeIn>

        {/* Filter tabs */}
        <FadeIn delay={0.05}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginBottom: 48 }}>
            {FILTER_TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                style={{
                  padding: '8px 20px', borderRadius: 20, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  background: activeFilter === tab ? NAVY : '#fff',
                  color: activeFilter === tab ? '#fff' : MUTED,
                  border: activeFilter === tab ? `1px solid ${NAVY}` : `1px solid ${BORDER}`,
                  transition: 'all 0.15s',
                } as React.CSSProperties}
              >
                {tab}
              </button>
            ))}
          </div>
        </FadeIn>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filtered.map((product, i) => {
            const Icon = product.icon;
            const badgeStyle = BADGE_STYLES[product.badge];
            const isPrimary = product.cta === 'Schedule Demo' || product.cta === 'Request Access';
            return (
              <FadeIn key={product.id} delay={i * 0.06}>
                <div
                  style={{
                    background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 16,
                    padding: '28px 24px', display: 'flex', flexDirection: 'column', height: '100%',
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
                  {/* Badge + Category */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 12px', borderRadius: 20, fontSize: 11, fontWeight: 700, background: badgeStyle.bg, border: `1px solid ${badgeStyle.border}`, color: badgeStyle.color }}>
                      <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'currentColor', display: 'inline-block' }} />
                      {product.badge}
                    </span>
                    <span style={{ fontSize: 11, color: MUTED, border: `1px solid ${BORDER}`, padding: '3px 10px', borderRadius: 20 }}>
                      {product.category}
                    </span>
                  </div>

                  {/* Icon + Name */}
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 14 }}>
                    <div style={{ width: 52, height: 52, background: '#e0e7ff', border: '1px solid #c7d2fe', borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={22} color={NAVY} />
                    </div>
                    <div>
                      <h2 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 4, lineHeight: 1.3 }}>{product.name}</h2>
                      <p style={{ fontSize: 12, fontWeight: 600, color: BLUE, letterSpacing: 0.2 }}>{product.tagline}</p>
                    </div>
                  </div>

                  <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, marginBottom: 18 }}>{product.description}</p>

                  {/* Features */}
                  <div style={{ flex: 1, marginBottom: 22 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                      {product.features.map(f => (
                        <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                          <CheckCircle2 size={13} color={BLUE} style={{ flexShrink: 0, marginTop: 2 }} />
                          <span style={{ fontSize: 13, color: SLATE, lineHeight: 1.45 }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price + CTA */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap', borderTop: `1px solid ${BORDER}`, paddingTop: 18 }}>
                    <div>
                      <div style={{ fontSize: 10, color: MUTED, marginBottom: 2, textTransform: 'uppercase', letterSpacing: 0.8, fontWeight: 700 }}>Pricing</div>
                      <div style={{
                        fontSize: 13, fontWeight: 700,
                        color: product.priceType === 'free' ? '#059669' : product.priceType === 'from' ? NAVY : MUTED,
                      }}>
                        {product.price}
                      </div>
                    </div>
                    <Link
                      href={product.href}
                      target={product.external ? '_blank' : '_self'}
                      rel={product.external ? 'noopener noreferrer' : undefined}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 7,
                        padding: '10px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700,
                        textDecoration: 'none', transition: 'all 0.15s',
                        ...(isPrimary
                          ? { background: NAVY, color: '#fff', boxShadow: '0 2px 8px rgba(30,58,138,0.25)' }
                          : { background: 'transparent', color: NAVY, border: `1.5px solid ${NAVY}` }),
                      }}
                    >
                      {product.cta} <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              </FadeIn>
            );
          })}

          {/* Coming Soon */}
          <FadeIn delay={0.05}>
            <div style={{ background: '#fff', border: `1px dashed ${BORDER}`, borderRadius: 16, padding: '40px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: 280 }}>
              <div style={{ width: 52, height: 52, background: LIGHTER, border: `1px solid ${BORDER}`, borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                <Package size={22} color={MUTED} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>More Products In Pipeline</h3>
              <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.65, maxWidth: 260, marginBottom: 18 }}>
                We are building more AI-powered tools for businesses globally. Have an idea or need a custom product?
              </p>
              <Link href="/contact" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, color: BLUE, textDecoration: 'none', fontWeight: 600 }}>
                Suggest a product <ArrowRight size={13} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   WHY SECTION (light)
══════════════════════════════════════════ */
function WhySection() {
  return (
    <section style={{ background: '#fff', padding: '80px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 52px' }}>
            <SectionLabel text="Why Choose Us" />
            <h2 style={{ fontSize: 'clamp(24px,4vw,40px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 12 }}>
              Why Businesses Use DigiAgentix Products
            </h2>
            <p style={{ fontSize: 15, color: MUTED, lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
              Trusted by SMEs, CA firms, and enterprises across India.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {whyItems.map(({ icon: Icon, label, sub }, i) => (
            <FadeIn key={label} delay={i * 0.07}>
              <div style={{ background: LIGHTER, border: `1px solid ${BORDER}`, borderRadius: 14, padding: '22px 20px', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                <div style={{ width: 42, height: 42, background: '#e0e7ff', border: '1px solid #c7d2fe', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Icon size={18} color={NAVY} />
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{label}</div>
                  <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.5 }}>{sub}</div>
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
   CTA (dark navy — matches Solutions)
══════════════════════════════════════════ */
function CTA() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919997730768';
  return (
    <section style={{ background: NAVY, padding: '88px 24px' }}>
      <div style={{ maxWidth: 700, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#93c5fd', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Custom Solutions</div>
          <h2 style={{ fontSize: 'clamp(26px,4vw,46px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 16 }}>
            Need a Custom Solution?
          </h2>
          <p style={{ fontSize: 17, color: '#94a3b8', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 40px' }}>
            Don&apos;t see exactly what you need? We build custom AI agents, automation systems, and software solutions tailored to your business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${wa}?text=Hi! I'd like to book a consultation for a custom solution.`}
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#fff', color: NAVY, padding: '15px 32px', borderRadius: 8, fontWeight: 800, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
            >
              <Phone size={16} /> Book Consultation
            </a>
            <Link
              href="/contact"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'transparent', color: '#fff', padding: '15px 32px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none', border: '2px solid rgba(255,255,255,0.3)' }}
            >
              Contact Sales <ArrowRight size={16} />
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   PAGE
══════════════════════════════════════════ */
export default function ProductsPageClient() {
  return (
    <div style={{ background: '#fff' }}>
      <Hero />
      <ProductsGrid />
      <WhySection />
      <CTA />
    </div>
  );
}
