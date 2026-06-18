'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Brain, MessageCircle, TrendingUp, Globe, Code2, Cloud,
  CheckCircle2, ChevronDown, Phone,
  BadgeCheck, Users, Zap, Headphones, Award, Handshake, Shield,
} from 'lucide-react';

/* ── Design tokens (matches homepage) ── */
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
const services = [
  {
    icon: Brain,
    title: 'AI Customer Support',
    tagline: 'Automate inquiries, delight customers 24/7',
    desc: 'Deploy AI-powered chatbots and virtual assistants that handle customer questions around the clock across WhatsApp, your website, and email — freeing your team for high-value work.',
    benefits: [
      '24/7 customer support without extra staff',
      'Instant responses to common queries',
      'Handles hundreds of conversations at once',
      'Seamless handoff to human agents when needed',
    ],
  },
  {
    icon: MessageCircle,
    title: 'WhatsApp Automation',
    tagline: 'Turn WhatsApp into a business growth engine',
    desc: 'Automate lead follow-ups, appointment reminders, order updates, and customer communication on WhatsApp — the channel your customers already use every day.',
    benefits: [
      'Instant automated lead follow-up',
      'Appointment & payment reminders',
      'Order status and delivery updates',
      'Bulk messaging with personalisation',
    ],
  },
  {
    icon: TrendingUp,
    title: 'Lead Generation Systems',
    tagline: 'More qualified leads, less manual effort',
    desc: 'We build automated lead capture and nurturing pipelines that identify, qualify, and follow up with prospects across your digital channels — so your sales team talks to buyers, not browsers.',
    benefits: [
      'Automated lead capture from website & ads',
      'Smart qualification and scoring',
      'CRM integration and sync',
      'Follow-up sequences that convert',
    ],
  },
  {
    icon: Globe,
    title: 'Business Websites',
    tagline: 'Professional websites that convert visitors',
    desc: 'Fast, modern, mobile-first websites built to represent your brand professionally and turn visitors into customers — with SEO, analytics, and easy content management built in.',
    benefits: [
      'Mobile-first, fast-loading design',
      'SEO optimised from day one',
      'Contact forms and WhatsApp integration',
      'Easy to manage and update',
    ],
  },
  {
    icon: Code2,
    title: 'Custom Software Development',
    tagline: 'Software built exactly for your business',
    desc: 'We design and build custom web applications, internal tools, and business management systems tailored to your exact workflows — no bloated off-the-shelf software that only half-fits your needs.',
    benefits: [
      'Built around your actual workflows',
      'Scales as your business grows',
      'Integrates with tools you already use',
      'Ongoing support and improvements',
    ],
  },
  {
    icon: Cloud,
    title: 'Cloud & Digital Transformation',
    tagline: 'Modernise your business for the digital age',
    desc: 'Move your operations to the cloud, digitise your processes, and future-proof your infrastructure — with a clear migration roadmap and hands-on support from planning to go-live.',
    benefits: [
      'Reduce IT infrastructure costs',
      'Better data security and backups',
      'Work and collaborate from anywhere',
      'Modern, scalable infrastructure',
    ],
  },
];

const whyChoose = [
  { icon: BadgeCheck,  label: 'MSME Registered',        sub: 'Verified & compliant Indian company' },
  { icon: Users,       label: 'India-Based Team',        sub: 'Local expertise, no outsourcing' },
  { icon: Award,       label: '50+ Projects Delivered',  sub: 'Proven track record across industries' },
  { icon: Zap,         label: 'Affordable for SMEs',     sub: 'Enterprise quality, SME-friendly pricing' },
  { icon: TrendingUp,  label: 'Fast Turnaround',         sub: 'Most projects live in 2–6 weeks' },
  { icon: Headphones,  label: 'Dedicated Support',       sub: 'WhatsApp & phone support always on' },
  { icon: Shield,      label: 'Enterprise-Grade Quality', sub: 'Rigorous testing and security practices' },
  { icon: Handshake,   label: 'Long-Term Partnership',   sub: 'We grow alongside your business' },
];

const steps = [
  { num: '01', title: 'Discovery Call',        desc: 'We start with a free 30-minute call to understand your business, goals, and the specific problem you want to solve.' },
  { num: '02', title: 'Requirement Analysis',  desc: 'Our team documents your exact requirements, maps your current workflows, and identifies the best technology approach.' },
  { num: '03', title: 'Solution Design',       desc: 'We present a clear proposal — scope, timeline, investment, and expected outcomes — no technical jargon, just plain language.' },
  { num: '04', title: 'Development & Testing', desc: 'Our engineers build your solution iteratively with regular progress updates and demos so you are never in the dark.' },
  { num: '05', title: 'Deployment & Support',  desc: 'We go live together, train your team, and provide ongoing WhatsApp and phone support to ensure everything runs smoothly.' },
];

const faqs = [
  {
    q: 'How much does it cost?',
    a: 'Our pricing is flexible and designed to be accessible for SMEs. Most projects start from ₹25,000 and scale based on scope. We provide a detailed, fixed-price quote before any work begins — no surprises.',
  },
  {
    q: 'How long does a typical project take?',
    a: 'Simple automation or chatbot projects typically take 1–2 weeks. Custom software and websites take 3–6 weeks. We share a clear timeline during our discovery call and keep you updated throughout.',
  },
  {
    q: 'Do you provide support after the project is live?',
    a: 'Yes — all our projects include post-launch support. We are reachable on WhatsApp and phone. For ongoing maintenance and updates, we offer affordable monthly support plans.',
  },
  {
    q: 'Can you customise the solution for my specific business?',
    a: 'Absolutely. Every solution we build is custom-made for your business. We do not use generic templates or off-the-shelf tools that only half-fit. Your solution reflects your exact workflows and brand.',
  },
  {
    q: 'Is DigiAgentix suitable for small businesses and startups?',
    a: 'Yes — we specifically serve SMEs, startups, and growing businesses across India. Our pricing, timelines, and communication style are designed for teams who want results without the complexity of a large IT vendor.',
  },
];

/* ══════════════════════════════════════════
   HERO
══════════════════════════════════════════ */
function Hero() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919997730768';
  return (
    <section style={{ background: 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 50%, #e8efff 100%)', paddingTop: 108, paddingBottom: 88 }}>
      <div style={{ maxWidth: 900, margin: '0 auto', padding: '0 24px', textAlign: 'center' }}>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#e0e7ff', border: '1px solid #c7d2fe', borderRadius: 20, padding: '6px 18px', marginBottom: 28 }}>
            <span style={{ width: 8, height: 8, background: BLUE, borderRadius: '50%', display: 'inline-block' }} />
            <span style={{ fontSize: 13, fontWeight: 600, color: NAVY }}>Technology Solutions for Indian Businesses</span>
          </div>

          <h1 style={{ fontSize: 'clamp(32px,5.5vw,60px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.1, marginBottom: 20, letterSpacing: -0.5 }}>
            Technology Solutions That<br />
            <span style={{ background: `linear-gradient(135deg, ${NAVY}, ${BLUE})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Drive Business Growth</span>
          </h1>

          <p style={{ fontSize: 'clamp(16px,2vw,19px)', color: '#475569', lineHeight: 1.75, marginBottom: 40, maxWidth: 620, margin: '0 auto 40px' }}>
            From AI-powered automation to custom software and cloud solutions — we build technology that helps Indian businesses save time, reduce costs, and grow faster.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-12">
            <a
              href={`https://wa.me/${wa}?text=Hi! I'd like to book a free consultation with DigiAgentix.`}
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: NAVY, color: '#fff', padding: '15px 32px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 16px rgba(30,58,138,0.35)' }}
            >
              <Phone size={16} /> Book a Free Consultation
            </a>
            <a
              href={`https://wa.me/${wa}?text=Hi! I have a question about DigiAgentix services.`}
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#fff', color: NAVY, padding: '15px 32px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none', border: `2px solid ${NAVY}` }}
            >
              <MessageCircle size={16} /> WhatsApp Us
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {['MSME Registered', 'India-Based Team', '50+ Projects Delivered', 'Pan India Service'].map(label => (
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
   SERVICES GRID
══════════════════════════════════════════ */
function ServicesGrid() {
  return (
    <section style={{ background: LIGHTER, padding: '88px 24px' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto 56px' }}>
            <SectionLabel text="What We Do" />
            <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 16 }}>
              Solutions Built for Your Business
            </h2>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.7 }}>
              Six practical services designed to help Indian businesses automate operations, reach more customers, and grow efficiently.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(({ icon: Icon, title, tagline, desc, benefits }, i) => (
            <FadeIn key={title} delay={i * 0.07}>
              <div
                style={{
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
                <div style={{ width: 52, height: 52, background: '#e0e7ff', borderRadius: 13, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                  <Icon size={23} color={NAVY} />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: '#0f172a', marginBottom: 4 }}>{title}</h3>
                <p style={{ fontSize: 12, fontWeight: 600, color: BLUE, textTransform: 'uppercase', letterSpacing: 0.5, marginBottom: 12 }}>{tagline}</p>
                <p style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, marginBottom: 20 }}>{desc}</p>
                <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {benefits.map(b => (
                    <div key={b} style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                      <CheckCircle2 size={14} color={BLUE} style={{ flexShrink: 0, marginTop: 2 }} />
                      <span style={{ fontSize: 13, color: SLATE, lineHeight: 1.4 }}>{b}</span>
                    </div>
                  ))}
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
   WHY CHOOSE
══════════════════════════════════════════ */
function WhyChoose() {
  return (
    <section style={{ background: '#fff', padding: '88px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 56px' }}>
            <SectionLabel text="Why DigiAgentix" />
            <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 16 }}>
              Why Businesses Choose Us
            </h2>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.7 }}>
              We are not just a technology vendor — we are a long-term growth partner for your business.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {whyChoose.map(({ icon: Icon, label, sub }, i) => (
            <FadeIn key={label} delay={i * 0.06}>
              <div style={{ background: LIGHTER, border: `1px solid ${BORDER}`, borderRadius: 14, padding: '24px 20px' }}>
                <div style={{ width: 44, height: 44, background: '#e0e7ff', borderRadius: 11, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  <Icon size={19} color={NAVY} />
                </div>
                <div style={{ fontSize: 14, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>{label}</div>
                <div style={{ fontSize: 12, color: MUTED, lineHeight: 1.5 }}>{sub}</div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   PROCESS
══════════════════════════════════════════ */
function HowWeWork() {
  return (
    <section style={{ background: LIGHTER, padding: '88px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', maxWidth: 600, margin: '0 auto 56px' }}>
            <SectionLabel text="Our Process" />
            <h2 style={{ fontSize: 'clamp(26px,4vw,42px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 16 }}>
              How We Work With You
            </h2>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.7 }}>
              A simple, transparent process from your first call to a running solution — and beyond.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {steps.map(({ num, title, desc }, i) => (
            <FadeIn key={num} delay={i * 0.08}>
              <div style={{ background: '#fff', border: `1px solid ${BORDER}`, borderRadius: 14, padding: '24px 20px', height: '100%' }}>
                <div style={{ width: 48, height: 48, background: NAVY, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <span style={{ fontSize: 13, fontWeight: 800, color: '#fff' }}>{num}</span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', marginBottom: 8 }}>{title}</h3>
                <p style={{ fontSize: 13, color: MUTED, lineHeight: 1.6 }}>{desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   FAQ
══════════════════════════════════════════ */
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section style={{ background: '#fff', padding: '88px 24px' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>
        <FadeIn>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionLabel text="FAQ" />
            <h2 style={{ fontSize: 'clamp(26px,4vw,40px)', fontWeight: 800, color: '#0f172a', lineHeight: 1.2, marginBottom: 12 }}>
              Frequently Asked Questions
            </h2>
            <p style={{ fontSize: 16, color: MUTED, lineHeight: 1.7 }}>
              Everything you need to know before getting started.
            </p>
          </div>
        </FadeIn>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map(({ q, a }, i) => (
            <FadeIn key={i} delay={i * 0.05}>
              <div style={{ background: LIGHTER, border: `1px solid ${open === i ? '#93c5fd' : BORDER}`, borderRadius: 12, overflow: 'hidden', transition: 'border-color 0.2s' }}>
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 12 }}
                >
                  <span style={{ fontSize: 15, fontWeight: 700, color: '#0f172a', lineHeight: 1.4 }}>{q}</span>
                  <ChevronDown
                    size={18}
                    color={MUTED}
                    style={{ flexShrink: 0, transform: open === i ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.25s' }}
                  />
                </button>
                {open === i && (
                  <div style={{ padding: '0 20px 18px', fontSize: 14, color: SLATE, lineHeight: 1.7 }}>
                    {a}
                  </div>
                )}
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
function CTA() {
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919997730768';
  return (
    <section style={{ background: NAVY, padding: '88px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
        <FadeIn>
          <div style={{ fontSize: 12, fontWeight: 700, color: '#93c5fd', letterSpacing: 2, textTransform: 'uppercase', marginBottom: 16 }}>Get Started Today</div>
          <h2 style={{ fontSize: 'clamp(26px,4vw,48px)', fontWeight: 800, color: '#fff', lineHeight: 1.15, marginBottom: 18 }}>
            Ready to Transform<br />Your Business?
          </h2>
          <p style={{ fontSize: 17, color: '#94a3b8', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 44px' }}>
            Book a free 30-minute consultation. We will listen, suggest the right solution, and give you a clear quote — no pressure, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <a
              href={`https://wa.me/${wa}?text=Hi! I'd like to book a free consultation with DigiAgentix.`}
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: '#fff', color: NAVY, padding: '15px 32px', borderRadius: 8, fontWeight: 800, fontSize: 15, textDecoration: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.2)' }}
            >
              <Phone size={16} /> Book a Free Consultation
            </a>
            <a
              href={`https://wa.me/${wa}?text=Hi DigiAgentix! I'd like to learn more about your services.`}
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, background: 'transparent', color: '#fff', padding: '15px 32px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none', border: '2px solid rgba(255,255,255,0.35)' }}
            >
              <MessageCircle size={16} /> WhatsApp Us
            </a>
          </div>
          <div className="flex flex-wrap gap-6 justify-center">
            {['Free consultation, no obligation', 'Response within a few hours', 'Pan India service'].map(t => (
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
      <ServicesGrid />
      <WhyChoose />
      <HowWeWork />
      <FAQ />
      <CTA />
    </div>
  );
}
