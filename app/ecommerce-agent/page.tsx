import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShoppingCart, MessageSquare, TrendingUp, RotateCcw, Package,
  Zap, BarChart2, Shield, Globe, ArrowRight, CheckCircle,
  Bot, Brain, Layers, Cpu, Star, Users, DollarSign,
  Mic, Search, Bell, RefreshCw, Lock, Smartphone, ChevronRight,
} from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://digiagentix.com';

export const metadata: Metadata = {
  title: 'eCommerce Shopping Agent — DigiAgentix',
  description: 'AI-powered eCommerce shopping agent that boosts sales, recovers carts, assists customers in Hindi & English, and reduces support costs by 70%.',
  alternates: { canonical: `${siteUrl}/ecommerce-agent` },
  openGraph: {
    title: 'eCommerce Shopping Agent — DigiAgentix',
    description: 'Full-stack AI shopping assistant for Indian online stores. Increase conversions and automate customer support.',
    url: `${siteUrl}/ecommerce-agent`,
    siteName: 'DigiAgentix',
  },
};

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const coreFeatures = [
  {
    icon: MessageSquare,
    color: '#6366f1',
    bg: 'rgba(99,102,241,0.1)',
    title: 'Conversational AI Assistant',
    desc: 'Handles product search, FAQs, order status, and returns in fluent Hindi & English — 24/7 without human agents.',
    points: ['Hindi + English bilingual', 'Context memory across sessions', 'Voice-ready architecture', 'No hallucination guardrails'],
  },
  {
    icon: Brain,
    color: '#0ea5e9',
    bg: 'rgba(14,165,233,0.1)',
    title: 'Product Recommendation Engine',
    desc: 'Personalized product suggestions driven by real-time user behavior, purchase history, and trending data.',
    points: ['Collaborative filtering', 'Trending & seasonal logic', 'Smart bundling suggestions', 'Upsell & cross-sell triggers'],
  },
  {
    icon: Bell,
    color: '#f59e0b',
    bg: 'rgba(245,158,11,0.1)',
    title: 'Cart Abandonment Recovery',
    desc: 'AI-generated persuasive messages sent via WhatsApp & Email to recover lost revenue automatically.',
    points: ['WhatsApp Business API', 'Email automation', 'AI-written personalized copy', 'Timing optimization'],
  },
  {
    icon: Package,
    color: '#10b981',
    bg: 'rgba(16,185,129,0.1)',
    title: 'Real-Time Order Tracking',
    desc: 'Live order status via API integrations with major logistics providers — customers get answers instantly.',
    points: ['Shiprocket / Delhivery support', 'Proactive shipping alerts', 'Delay notifications', 'Chat-based tracking'],
  },
  {
    icon: RotateCcw,
    color: '#ec4899',
    bg: 'rgba(236,72,153,0.1)',
    title: 'Returns & Exchange Automation',
    desc: 'Full returns/exchange workflow handled entirely through chat — no human agent needed for 90% of cases.',
    points: ['Policy-aware AI flow', 'Automated refund triggers', 'Exchange size matching', 'Status updates via WhatsApp'],
  },
  {
    icon: BarChart2,
    color: '#8b5cf6',
    bg: 'rgba(139,92,246,0.1)',
    title: 'Admin Analytics Dashboard',
    desc: 'Complete visibility into conversations, sales uplift, cart recovery rate, and AI cost savings.',
    points: ['Conversion funnel tracking', 'Agent performance metrics', 'Cost savings report', 'User behaviour heatmap'],
  },
];

const costFeatures = [
  { icon: Layers, title: 'Hybrid Response System', desc: 'Rule-based for FAQs & order tracking, AI only for complex queries. Cuts API cost by up to 80%.' },
  { icon: RefreshCw, title: 'Response Caching', desc: 'Frequently asked questions served from cache — zero API call, instant response.' },
  { icon: Cpu, title: 'Intent Detection Layer', desc: 'Query classified before any AI call. Simple → no API. Complex → cheapest model first.' },
  { icon: DollarSign, title: 'Model Optimization', desc: 'Uses GPT-4o-mini by default. Escalates to GPT-4o only when truly needed.' },
  { icon: Shield, title: 'Rate Limiting', desc: 'Per-user API limits prevent abuse and runaway costs.' },
  { icon: Bot, title: 'Batch Processing', desc: 'Bulk recommendation jobs run in batches — not per-user API calls.' },
];

const advancedFeatures = [
  { icon: Mic, label: 'Voice Assistant', desc: 'Speak to search, ask about products, track orders' },
  { icon: Search, label: 'Image Search', desc: 'Upload photo → find similar products instantly' },
  { icon: TrendingUp, label: 'AI Urgency Triggers', desc: '"Only 2 left!" — AI-timed scarcity messages' },
  { icon: Brain, label: 'Auto-Learning', desc: 'Gets smarter with every customer interaction' },
  { icon: Globe, label: 'Multi-platform', desc: 'Shopify, WooCommerce, custom stores' },
  { icon: Smartphone, label: 'WhatsApp Native', desc: 'Full shopping journey inside WhatsApp' },
];

const integrations = [
  { name: 'Shopify', emoji: '🛍️' },
  { name: 'WooCommerce', emoji: '⚙️' },
  { name: 'Razorpay', emoji: '💳' },
  { name: 'WhatsApp', emoji: '💬' },
  { name: 'Shiprocket', emoji: '🚚' },
  { name: 'Firebase', emoji: '🔥' },
  { name: 'MongoDB', emoji: '🍃' },
  { name: 'OpenAI', emoji: '🤖' },
];

const plans = [
  {
    name: 'Starter',
    price: '₹25,000',
    period: 'one-time setup',
    color: '#6366f1',
    badge: null,
    desc: 'Perfect for small stores just getting started with AI.',
    features: [
      'AI chat assistant (Hindi + English)',
      'Basic product recommendations',
      'Order tracking integration',
      'FAQ automation',
      'Admin dashboard',
      '1 platform (Shopify or WooCommerce)',
      '1 month support',
    ],
  },
  {
    name: 'Growth',
    price: '₹55,000',
    period: 'one-time setup',
    color: '#0ea5e9',
    badge: 'Most Popular',
    desc: 'For growing stores ready to maximise revenue with AI.',
    features: [
      'Everything in Starter',
      'Cart abandonment recovery (WhatsApp + Email)',
      'Upselling & cross-selling engine',
      'Returns & exchange automation',
      'Personalized discount engine',
      'Image search',
      'Voice assistant',
      'Cost optimization (caching + hybrid AI)',
      '2 platforms',
      '3 months support',
    ],
  },
  {
    name: 'Enterprise',
    price: '₹1,00,000+',
    period: 'custom',
    color: '#f59e0b',
    badge: 'Full Power',
    desc: 'Large catalogues, custom AI training, white-label ready.',
    features: [
      'Everything in Growth',
      'Multi-agent architecture',
      'Custom AI model fine-tuning',
      'Inventory sync (real-time)',
      'White-label / custom branding',
      'Multi-store / multi-language',
      'Dedicated account manager',
      '6 months priority support',
      'API access for custom integrations',
    ],
  },
];

const metrics = [
  { val: '↑ 35%', label: 'Average revenue lift' },
  { val: '↓ 70%', label: 'Support cost reduction' },
  { val: '↑ 22%', label: 'Cart recovery rate' },
  { val: '↓ 80%', label: 'AI API cost vs naive setup' },
];

/* ─── Component ─────────────────────────────────────────────────────────────── */

export default function EcommerceAgentPage() {
  const whatsapp = 'https://wa.me/919997730768?text=Hi! I want a demo of the eCommerce Shopping Agent.';

  return (
    <div className="min-h-screen bg-background text-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-28 pb-20 px-4 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(ellipse, #6366f1, transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-8"
            style={{ background: 'radial-gradient(circle, #f59e0b, transparent 70%)' }} />
          {/* grid */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#g)" />
          </svg>
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.35)', color: '#a5b4fc' }}>
            <ShoppingCart className="w-4 h-4" />
            eCommerce Shopping Agent · DigiAgentix
            <span className="px-2 py-0.5 rounded-full text-xs font-bold"
              style={{ background: '#6366f1', color: 'white' }}>New</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 leading-tight">
            Your Store Needs an{' '}
            <span style={{ background: 'linear-gradient(90deg, #6366f1, #0ea5e9, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              AI Sales Army
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            A full-stack AI shopping agent that sells, supports, and recovers lost revenue — 24/7 in Hindi & English.
            Built with smart cost-optimization so your AI bill stays low while conversions stay high.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-base transition-all"
              style={{ background: 'linear-gradient(135deg, #6366f1, #0ea5e9)', boxShadow: '0 8px 30px rgba(99,102,241,0.4)' }}>
              <Zap className="w-5 h-5" /> Get Free Demo
            </a>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base transition-all hover:bg-white/5"
              style={{ border: '1px solid rgba(255,255,255,0.12)', color: '#94a3b8' }}>
              Request Custom Quote <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Metrics strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-2xl p-4 text-center"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-2xl font-extrabold mb-1"
                  style={{ background: 'linear-gradient(90deg, #6366f1, #0ea5e9)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {m.val}
                </p>
                <p className="text-xs text-gray-500">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══════════════════════════════════════════════════════ */}
      <section className="py-16 px-4" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-white mb-2">How the AI Flow Works</h2>
            <p className="text-gray-500 text-sm">Smart intent detection keeps costs minimal while keeping quality high</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 flex-wrap">
            {[
              { step: '1', label: 'User Query', sub: 'Chat / Voice / WhatsApp', color: '#6366f1' },
              { step: '→', label: '', sub: '', color: '' },
              { step: '2', label: 'Intent Detection', sub: 'Simple or Complex?', color: '#0ea5e9' },
              { step: '→', label: '', sub: '', color: '' },
              { step: '3a', label: 'Rule-Based', sub: 'FAQs · Tracking · Cache', color: '#10b981' },
              { step: '/', label: '', sub: '', color: '' },
              { step: '3b', label: 'AI Engine', sub: 'Recommendations · Persuasion', color: '#f59e0b' },
              { step: '→', label: '', sub: '', color: '' },
              { step: '4', label: 'Response', sub: 'Instant · Accurate · On-brand', color: '#ec4899' },
            ].map((s, i) =>
              s.step === '→' || s.step === '/' ? (
                <span key={i} className="text-2xl font-bold" style={{ color: '#334155' }}>{s.step}</span>
              ) : (
                <div key={i} className="flex flex-col items-center px-4 py-3 rounded-xl text-center min-w-[110px]"
                  style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${s.color}33` }}>
                  <span className="w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center mb-1"
                    style={{ background: s.color + '22', color: s.color }}>{s.step}</span>
                  <p className="text-white text-xs font-semibold">{s.label}</p>
                  <p className="text-gray-500 text-xs">{s.sub}</p>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ══ CORE FEATURES ════════════════════════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', color: '#a5b4fc' }}>
              <Zap className="w-3.5 h-3.5" /> Core Features
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
              Everything Your Store Needs
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">10 AI-powered modules working together to drive revenue, cut costs, and delight customers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreFeatures.map((f) => (
              <div key={f.title} className="rounded-2xl p-6 group hover:scale-[1.01] transition-all"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: f.bg, border: `1px solid ${f.color}33` }}>
                  <f.icon className="w-5 h-5" style={{ color: f.color }} />
                </div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-4">{f.desc}</p>
                <ul className="space-y-1.5">
                  {f.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-xs text-gray-400">
                      <CheckCircle className="w-3.5 h-3.5 flex-shrink-0" style={{ color: f.color }} />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ COST OPTIMIZATION ════════════════════════════════════════════════ */}
      <section className="py-20 px-4" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
                style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', color: '#fbbf24' }}>
                <DollarSign className="w-3.5 h-3.5" /> Smart Cost Optimization
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
                High Quality AI.<br />
                <span style={{ background: 'linear-gradient(90deg, #f59e0b, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  80% Lower API Costs.
                </span>
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Most AI chatbots call the API for every single message — burning thousands of rupees every month.
                Our hybrid architecture only calls AI when it truly needs to, keeping your margins healthy.
              </p>
              <div className="space-y-3">
                {[
                  { label: 'Naive AI (every query → API)', pct: 100, color: '#ef4444' },
                  { label: 'Our hybrid system', pct: 20, color: '#10b981' },
                ].map((b) => (
                  <div key={b.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: '#94a3b8' }}>{b.label}</span>
                      <span style={{ color: b.color }}>{b.pct}% cost</span>
                    </div>
                    <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                      <div className="h-2 rounded-full transition-all duration-700"
                        style={{ width: `${b.pct}%`, background: b.color }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {costFeatures.map((f) => (
                <div key={f.title} className="p-4 rounded-xl"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <f.icon className="w-5 h-5 mb-2" style={{ color: '#f59e0b' }} />
                  <h4 className="font-semibold text-white text-sm mb-1">{f.title}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ ADVANCED FEATURES ════════════════════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.25)', color: '#f472b6' }}>
              <Star className="w-3.5 h-3.5" /> Advanced Capabilities
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Beyond Basic Chatbots</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Features that put you ahead of every competitor still using static FAQs.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {advancedFeatures.map((f) => (
              <div key={f.label} className="flex flex-col items-center text-center p-5 rounded-2xl group hover:scale-105 transition-all"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}>
                  <f.icon className="w-5 h-5 text-indigo-400" />
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">{f.label}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TECH STACK + INTEGRATIONS ═════════════════════════════════════════ */}
      <section className="py-16 px-4" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-white mb-2">Tech Stack & Integrations</h2>
            <p className="text-gray-500 text-sm">Plugs into your existing tools — no migration headaches</p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 mb-10">
            {integrations.map((i) => (
              <div key={i.name} className="flex flex-col items-center gap-2 p-3 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-2xl">{i.emoji}</span>
                <span className="text-xs text-gray-400 text-center leading-tight">{i.name}</span>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { label: 'Frontend', value: 'React + Tailwind CSS', color: '#0ea5e9' },
              { label: 'Backend', value: 'Node.js + Express', color: '#10b981' },
              { label: 'Database', value: 'MongoDB / Firebase', color: '#f59e0b' },
              { label: 'AI Engine', value: 'OpenAI GPT-4o-mini', color: '#6366f1' },
            ].map((t) => (
              <div key={t.label} className="p-4 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${t.color}22` }}>
                <p className="text-xs mb-1" style={{ color: t.color }}>{t.label}</p>
                <p className="text-sm font-semibold text-white">{t.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MULTI-AGENT ARCHITECTURE ══════════════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(14,165,233,0.1)', border: '1px solid rgba(14,165,233,0.25)', color: '#38bdf8' }}>
              <Bot className="w-3.5 h-3.5" /> Multi-Agent Architecture
            </div>
            <h2 className="text-3xl font-extrabold text-white mb-3">Three Specialist Agents Working as One</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                name: 'Shopping Agent',
                emoji: '🛒',
                color: '#6366f1',
                jobs: ['Product discovery', 'Size & variant help', 'Smart recommendations', 'Upselling & bundling'],
              },
              {
                name: 'Support Agent',
                emoji: '🎧',
                color: '#0ea5e9',
                jobs: ['Order tracking', 'Returns & exchanges', 'FAQ resolution', 'Escalation routing'],
              },
              {
                name: 'Revenue Agent',
                emoji: '💰',
                color: '#f59e0b',
                jobs: ['Cart recovery messages', 'Personalized offers', 'Urgency triggers', 'Loyalty rewards'],
              },
            ].map((a) => (
              <div key={a.name} className="rounded-2xl p-6 text-center"
                style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${a.color}33` }}>
                <span className="text-3xl block mb-3">{a.emoji}</span>
                <h3 className="font-bold text-white mb-4">{a.name}</h3>
                <ul className="space-y-2">
                  {a.jobs.map((j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-400 text-left">
                      <ChevronRight className="w-3.5 h-3.5 flex-shrink-0" style={{ color: a.color }} />
                      {j}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Security strip */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {[
              { icon: Lock, label: 'JWT Authentication' },
              { icon: Shield, label: 'API Rate Limiting' },
              { icon: Lock, label: 'Secure Payments' },
              { icon: Globe, label: 'HTTPS + CORS Protected' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#34d399' }}>
                <s.icon className="w-3.5 h-3.5" />
                {s.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRICING ═══════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', color: '#a5b4fc' }}>
              <DollarSign className="w-3.5 h-3.5" /> Pricing
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">One-Time Setup. Lifetime Value.</h2>
            <p className="text-gray-400 max-w-xl mx-auto">No monthly SaaS fees — you own the system. We build, deploy, and hand it over.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div key={p.name}
                className={`relative rounded-2xl p-7 flex flex-col ${p.badge ? 'ring-2' : ''}`}
                style={{
                  background: p.badge ? `linear-gradient(135deg, ${p.color}10, rgba(255,255,255,0.03))` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${p.color}33`,
                  ...(p.badge ? { ringColor: p.color } : {}),
                }}>
                {p.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: p.color }}>
                    {p.badge}
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="font-bold text-white text-lg mb-1">{p.name}</h3>
                  <p className="text-gray-500 text-sm mb-4">{p.desc}</p>
                  <div className="flex items-end gap-2">
                    <span className="text-3xl font-extrabold text-white">{p.price}</span>
                    <span className="text-gray-500 text-sm mb-1">{p.period}</span>
                  </div>
                </div>

                <ul className="space-y-2.5 flex-1 mb-7">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: p.color }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <a href={whatsapp} target="_blank" rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl text-center font-semibold text-sm transition-all block"
                  style={{
                    background: p.badge ? p.color : 'transparent',
                    color: p.badge ? 'white' : p.color,
                    border: `1px solid ${p.color}`,
                    boxShadow: p.badge ? `0 4px 20px ${p.color}40` : 'none',
                  }}>
                  {p.name === 'Enterprise' ? 'Request Custom Quote →' : 'Get Started →'}
                </a>
              </div>
            ))}
          </div>

          <p className="text-center text-xs text-gray-600 mt-6">
            All plans include deployment, handover training, and documentation. Additional hosting costs apply (Vercel / Render / AWS).
          </p>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-3xl p-10 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(14,165,233,0.1))', border: '1px solid rgba(99,102,241,0.25)' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.08), transparent 70%)' }} />
            <div className="relative">
              <span className="text-4xl block mb-4">🛒</span>
              <h2 className="text-3xl font-extrabold text-white mb-4">
                Ready to Build Your AI Sales Machine?
              </h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Book a free 30-minute demo. We'll show you exactly how the agent works for your store — product search, cart recovery, order tracking — live.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={whatsapp} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-bold transition-all"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #0ea5e9)', boxShadow: '0 8px 30px rgba(99,102,241,0.4)' }}>
                  <Zap className="w-5 h-5" /> WhatsApp Us for Demo
                </a>
                <Link href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all hover:bg-white/5"
                  style={{ border: '1px solid rgba(255,255,255,0.12)', color: '#94a3b8' }}>
                  Send Enquiry <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {['Free consultation', 'Custom demo for your store', 'No obligation', 'Reply within 2 hours'].map((t) => (
                  <span key={t} className="flex items-center gap-1.5 text-xs text-gray-400">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />{t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
