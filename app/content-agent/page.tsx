import { Metadata } from 'next';
import Link from 'next/link';
import {
  PenTool, FileText, Globe, Zap, BarChart2, Shield, ArrowRight,
  CheckCircle, Copy, Download, Star, Users, Brain, Layers,
  BookOpen, Instagram, Linkedin, ShoppingBag, Monitor,
  UploadCloud, Calendar, Mic, ChevronRight, Lock, DollarSign,
  TrendingUp, Settings, History, Layout,
} from 'lucide-react';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://digiagentix.com';

export const metadata: Metadata = {
  title: 'DigiAgentix Content Agent — AI Content Writing SaaS',
  description: 'AI-powered content writing agent that generates SEO blogs, product descriptions, social media posts & ad copy in Hindi & English for Indian businesses.',
  alternates: { canonical: `${siteUrl}/content-agent` },
  openGraph: {
    title: 'DigiAgentix Content Agent — AI Content Writing SaaS',
    description: 'Generate high-quality content in seconds. Blog posts, Instagram captions, LinkedIn posts, Amazon product descriptions — all SEO optimised.',
    url: `${siteUrl}/content-agent`,
    siteName: 'DigiAgentix',
  },
};

/* ─── Data ─────────────────────────────────────────────────────────────────── */

const dashboardSections = [
  { icon: PenTool, label: 'Create Content', desc: 'Generate any content type in seconds', color: '#6366f1' },
  { icon: History, label: 'Content History', desc: 'Browse, edit, reuse past outputs', color: '#0ea5e9' },
  { icon: Layout, label: 'Templates', desc: '20+ pre-built content templates', color: '#10b981' },
  { icon: Settings, label: 'Settings', desc: 'Brand voice, language, API config', color: '#f59e0b' },
];

const contentTypes = [
  { icon: BookOpen, label: 'Blog Posts', desc: 'Long-form SEO articles up to 3000 words', color: '#6366f1' },
  { icon: Instagram, label: 'Instagram Captions', desc: 'Hooks, hashtags, CTA — ready to post', color: '#ec4899' },
  { icon: Linkedin, label: 'LinkedIn Posts', desc: 'Thought leadership & B2B content', color: '#0ea5e9' },
  { icon: ShoppingBag, label: 'Product Descriptions', desc: 'Amazon-style with bullet features', color: '#f59e0b' },
  { icon: Monitor, label: 'Website Copy', desc: 'Hero, about, services, CTA sections', color: '#10b981' },
  { icon: Zap, label: 'Ad Copy', desc: 'Google, Meta & WhatsApp ad scripts', color: '#ef4444' },
];

const inputFields = [
  { label: 'Content Type', options: ['Blog Post', 'Social Media', 'Product Description', 'Ad Copy', 'Website Copy'] },
  { label: 'Language', options: ['English', 'Hindi', 'Hinglish'] },
  { label: 'Tone', options: ['Professional', 'Casual', 'Marketing', 'Storytelling', 'Educational'] },
  { label: 'Word Count', options: ['150', '300', '600', '1000', '2000+'] },
];

const aiFeatures = [
  { title: 'SEO Optimization', desc: 'Auto-inserts target keywords, H1/H2 structure, meta description & readability scoring', color: '#6366f1' },
  { title: 'Human-Like Writing', desc: 'Prompt chaining + persona system — outputs that feel written by a skilled copywriter', color: '#0ea5e9' },
  { title: 'No Plagiarism Engine', desc: 'System-level uniqueness instructions + optional Grammarly API correction layer', color: '#10b981' },
  { title: 'Brand Voice Training', desc: 'Upload 3-5 samples → AI learns your tone, vocabulary, and style permanently', color: '#f59e0b' },
  { title: 'Readability Scoring', desc: 'Flesch-Kincaid score shown per output — keep content at the right complexity level', color: '#ec4899' },
  { title: 'Prompt Chaining', desc: 'Multi-step generation: outline → draft → refine → SEO pass — better output than single-shot', color: '#8b5cf6' },
];

const powerFeatures = [
  { icon: UploadCloud, label: 'Bulk CSV Generation', desc: 'Upload keywords list → get 100 articles overnight' },
  { icon: Calendar, label: 'Content Calendar', desc: 'AI auto-plans 30 days of content for your niche' },
  { icon: Mic, label: 'Brand Voice Training', desc: 'Upload samples → AI writes exactly like your brand' },
  { icon: Globe, label: 'Multi-Language', desc: 'Hindi, English, Hinglish — future-ready for more' },
  { icon: Download, label: 'Export: PDF / DOCX', desc: 'One-click download in professional formats' },
  { icon: Copy, label: 'Copy to Clipboard', desc: 'Instant copy with formatting preserved' },
];

const metrics = [
  { val: '<5s', label: 'Generation time' },
  { val: '20+', label: 'Content templates' },
  { val: '3', label: 'Languages supported' },
  { val: '100%', label: 'SEO optimised' },
];

const plans = [
  {
    name: 'Free Trial',
    price: '₹0',
    period: 'forever',
    color: '#6366f1',
    badge: null,
    desc: 'Get a feel for the platform before committing.',
    features: [
      '5 content generations/month',
      'Blog & social templates',
      'English only',
      'Copy to clipboard',
      'Basic dashboard',
    ],
  },
  {
    name: 'Basic',
    price: '₹10,000',
    period: '/month',
    color: '#0ea5e9',
    badge: null,
    desc: 'Great for solo content creators and small teams.',
    features: [
      '200 content generations/month',
      'All content types',
      'Hindi + English',
      'SEO optimization',
      'Content history (90 days)',
      'PDF & DOCX export',
      'Email support',
    ],
  },
  {
    name: 'Pro',
    price: '₹30,000',
    period: '/month',
    color: '#f59e0b',
    badge: 'Best Value',
    desc: 'For agencies and businesses scaling content production.',
    features: [
      'Unlimited generations',
      'All Basic features',
      'Bulk CSV generation',
      'Brand voice training',
      'Content calendar',
      'Admin panel + team accounts',
      'Priority support',
      'Custom integrations on request',
      'Dedicated account manager',
    ],
  },
];

const techStack = [
  { label: 'Frontend', value: 'React + Tailwind CSS', emoji: '⚛️' },
  { label: 'Backend', value: 'Node.js + Express', emoji: '🟢' },
  { label: 'Database', value: 'MongoDB / Firebase', emoji: '🍃' },
  { label: 'AI Engine', value: 'OpenAI GPT-4o / 4o-mini', emoji: '🤖' },
  { label: 'Auth', value: 'JWT + Google OAuth', emoji: '🔐' },
  { label: 'Payments', value: 'Razorpay / Stripe', emoji: '💳' },
  { label: 'Export', value: 'PDFKit + docx.js', emoji: '📄' },
  { label: 'Hosting', value: 'Vercel + AWS', emoji: '☁️' },
];

/* ─── Component ─────────────────────────────────────────────────────────────── */

export default function ContentAgentPage() {
  const whatsapp = 'https://wa.me/919997730768?text=Hi! I want a demo of the DigiAgentix Content Agent.';

  return (
    <div className="min-h-screen bg-background text-white" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative pt-28 pb-20 px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(ellipse, #6366f1, transparent 70%)' }} />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-8"
            style={{ background: 'radial-gradient(circle, #ec4899, transparent 70%)' }} />
          <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
            <defs><pattern id="g" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern></defs>
            <rect width="100%" height="100%" fill="url(#g)" />
          </svg>
        </div>

        <div className="relative max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold mb-6"
            style={{ background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.35)', color: '#a5b4fc' }}>
            <PenTool className="w-4 h-4" />
            DigiAgentix Content Agent
            <span className="px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: '#6366f1', color: 'white' }}>New</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold mb-6 leading-tight">
            Your AI Content Team{' '}
            <span style={{ background: 'linear-gradient(90deg, #6366f1, #ec4899, #f59e0b)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Works 24/7
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto mb-10 leading-relaxed">
            Generate SEO blogs, Instagram captions, Amazon product descriptions & ad copy in Hindi & English —
            in under 5 seconds. Built for Indian businesses that need quality content at scale.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-base transition-all"
              style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)', boxShadow: '0 8px 30px rgba(99,102,241,0.4)' }}>
              <Zap className="w-5 h-5" /> Get Demo
            </a>
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-base transition-all hover:bg-white/5"
              style={{ border: '1px solid rgba(255,255,255,0.12)', color: '#94a3b8' }}>
              Know More <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {metrics.map((m) => (
              <div key={m.label} className="rounded-2xl p-4 text-center"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <p className="text-2xl font-extrabold mb-1"
                  style={{ background: 'linear-gradient(90deg, #6366f1, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {m.val}
                </p>
                <p className="text-xs text-gray-500">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MOCK UI PREVIEW ═══════════════════════════════════════════════════ */}
      <section className="py-4 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
            {/* Browser bar */}
            <div className="flex items-center gap-2 px-5 py-3 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
              <span className="w-3 h-3 rounded-full bg-red-500/60" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
              <span className="w-3 h-3 rounded-full bg-green-500/60" />
              <div className="ml-4 flex-1 max-w-xs h-6 rounded-md px-3 flex items-center text-xs"
                style={{ background: 'rgba(255,255,255,0.05)', color: '#475569' }}>
                app.digiagentix.com/create
              </div>
            </div>

            {/* App layout mock */}
            <div className="flex h-80">
              {/* Sidebar */}
              <div className="w-48 flex-shrink-0 border-r p-4 space-y-1" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-lg flex items-center justify-center text-xs"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)' }}>✍️</div>
                  <span className="text-xs font-bold text-white">Content Agent</span>
                </div>
                {dashboardSections.map((s) => (
                  <div key={s.label}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs transition-all ${s.label === 'Create Content' ? 'text-white' : 'text-gray-500'}`}
                    style={{ background: s.label === 'Create Content' ? 'rgba(99,102,241,0.2)' : 'transparent' }}>
                    <s.icon className="w-3.5 h-3.5" style={{ color: s.label === 'Create Content' ? s.color : undefined }} />
                    {s.label}
                  </div>
                ))}
              </div>

              {/* Main area */}
              <div className="flex-1 p-5 grid grid-cols-2 gap-4">
                {/* Left — inputs */}
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-white mb-1">Create Content</p>
                  {inputFields.map((f) => (
                    <div key={f.label}>
                      <p className="text-xs mb-1" style={{ color: '#475569' }}>{f.label}</p>
                      <div className="h-7 rounded-lg px-3 flex items-center text-xs"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: '#94a3b8' }}>
                        {f.options[0]}
                      </div>
                    </div>
                  ))}
                  <div className="h-7 rounded-lg flex items-center justify-center text-xs font-semibold mt-2"
                    style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)', color: 'white' }}>
                    ⚡ Generate Content
                  </div>
                </div>

                {/* Right — output preview */}
                <div className="rounded-xl p-4 overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold" style={{ color: '#10b981' }}>OUTPUT</span>
                    <div className="flex gap-1.5">
                      <div className="h-5 px-2 rounded text-xs flex items-center gap-1" style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc' }}>
                        <Copy className="w-2.5 h-2.5" /> Copy
                      </div>
                      <div className="h-5 px-2 rounded text-xs flex items-center gap-1" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399' }}>
                        <Download className="w-2.5 h-2.5" /> PDF
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <div className="h-2.5 rounded-full w-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
                    <div className="h-2.5 rounded-full w-5/6" style={{ background: 'rgba(255,255,255,0.06)' }} />
                    <div className="h-2.5 rounded-full w-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
                    <div className="h-2.5 rounded-full w-3/4" style={{ background: 'rgba(255,255,255,0.05)' }} />
                    <div className="h-2.5 rounded-full w-full" style={{ background: 'rgba(255,255,255,0.08)' }} />
                    <div className="h-2.5 rounded-full w-4/6" style={{ background: 'rgba(255,255,255,0.06)' }} />
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.2)' }}>
                      SEO Score: 94
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.2)' }}>
                      Readability: A
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ CONTENT TYPES ════════════════════════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.25)', color: '#a5b4fc' }}>
              <FileText className="w-3.5 h-3.5" /> Content Types
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">One Platform, Every Format</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">From 2000-word SEO blogs to snappy Instagram captions — all generated in under 5 seconds.</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {contentTypes.map((c) => (
              <div key={c.label} className="flex flex-col items-center text-center p-5 rounded-2xl hover:scale-105 transition-all"
                style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${c.color}25` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-3"
                  style={{ background: c.color + '15', border: `1px solid ${c.color}30` }}>
                  <c.icon className="w-5 h-5" style={{ color: c.color }} />
                </div>
                <h4 className="font-semibold text-white text-sm mb-1">{c.label}</h4>
                <p className="text-gray-500 text-xs leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ AI ENGINE ════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(139,92,246,0.1)', border: '1px solid rgba(139,92,246,0.25)', color: '#c4b5fd' }}>
              <Brain className="w-3.5 h-3.5" /> AI Engine
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Smarter Than a Single Prompt</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Multi-step prompt chaining + SEO rules + plagiarism guards = content that ranks and reads like a human wrote it.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {aiFeatures.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${f.color}22` }}>
                <div className="w-2 h-2 rounded-full mb-4" style={{ background: f.color }} />
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Prompt chain flow */}
          <div className="mt-12 p-6 rounded-2xl" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
            <p className="text-xs font-semibold text-indigo-400 mb-4 text-center uppercase tracking-wider">Prompt Chain Flow</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {['User Input', '→', 'Topic Research', '→', 'Outline Generation', '→', 'Draft Writing', '→', 'SEO Pass', '→', 'Readability Check', '→', 'Final Output'].map((s, i) => (
                s === '→' ? (
                  <span key={i} className="text-indigo-700 font-bold text-lg">→</span>
                ) : (
                  <span key={i} className="px-3 py-1.5 rounded-lg text-xs font-semibold"
                    style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.2)' }}>
                    {s}
                  </span>
                )
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ POWER FEATURES ═══════════════════════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-4"
              style={{ background: 'rgba(236,72,153,0.1)', border: '1px solid rgba(236,72,153,0.25)', color: '#f472b6' }}>
              <Star className="w-3.5 h-3.5" /> Power Features
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Built for Scale</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Features agencies and high-volume content teams actually need.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {powerFeatures.map((f) => (
              <div key={f.label} className="flex gap-4 p-5 rounded-2xl"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(99,102,241,0.12)', border: '1px solid rgba(99,102,241,0.2)' }}>
                  <f.icon className="w-4 h-4 text-indigo-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1 text-sm">{f.label}</h4>
                  <p className="text-gray-500 text-xs leading-relaxed">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TECH STACK ════════════════════════════════════════════════════════ */}
      <section className="py-16 px-4" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-extrabold text-white mb-2">Tech Stack</h2>
            <p className="text-gray-500 text-sm">Enterprise-grade, fully deployable with environment variables</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {techStack.map((t) => (
              <div key={t.label} className="p-4 rounded-xl flex items-center gap-3"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span className="text-xl">{t.emoji}</span>
                <div>
                  <p className="text-xs text-gray-500">{t.label}</p>
                  <p className="text-sm font-semibold text-white">{t.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Security strip */}
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {[
              { icon: Lock, label: 'JWT + Google OAuth' },
              { icon: Shield, label: 'API Rate Limiting' },
              { icon: Lock, label: 'Secure Payment (Razorpay)' },
              { icon: Globe, label: 'HTTPS Enforced' },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium"
                style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#34d399' }}>
                <s.icon className="w-3.5 h-3.5" />{s.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ADMIN PANEL ═══════════════════════════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-5"
                style={{ background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.25)', color: '#fbbf24' }}>
                <BarChart2 className="w-3.5 h-3.5" /> Admin Panel
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-4">Full Control for Admins</h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Manage users, monitor API usage, toggle plans, and view revenue — all from a clean admin dashboard.
              </p>
              <ul className="space-y-3">
                {[
                  'Manage all user accounts + roles',
                  'Real-time API usage monitoring per user',
                  'Enable / disable subscription plans',
                  'View total generations this month',
                  'Revenue dashboard (Razorpay integrated)',
                  'Force-upgrade or downgrade any user',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-300">
                    <CheckCircle className="w-4 h-4 text-yellow-400 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mini admin mock */}
            <div className="rounded-2xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="px-5 py-3 border-b flex items-center justify-between"
                style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(0,0,0,0.2)' }}>
                <span className="text-xs font-semibold text-white">Admin Dashboard</span>
                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171' }}>Admin</span>
              </div>
              <div className="p-5 grid grid-cols-2 gap-3 mb-2">
                {[
                  { label: 'Total Users', val: '1,248', color: '#6366f1' },
                  { label: 'Generations Today', val: '3,891', color: '#0ea5e9' },
                  { label: 'Active Plans', val: '342', color: '#10b981' },
                  { label: 'Revenue (MTD)', val: '₹4.2L', color: '#f59e0b' },
                ].map((s) => (
                  <div key={s.label} className="p-3 rounded-xl"
                    style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${s.color}22` }}>
                    <p className="text-xs text-gray-500 mb-0.5">{s.label}</p>
                    <p className="text-lg font-extrabold" style={{ color: s.color }}>{s.val}</p>
                  </div>
                ))}
              </div>
              <div className="px-5 pb-5">
                <p className="text-xs text-gray-500 mb-2">Recent Users</p>
                {['user@startup.in', 'agency@brand.com', 'writer@blog.co'].map((u) => (
                  <div key={u} className="flex items-center justify-between py-2 border-b last:border-0"
                    style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
                    <span className="text-xs text-gray-400">{u}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(16,185,129,0.1)', color: '#34d399' }}>Pro</span>
                  </div>
                ))}
              </div>
            </div>
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
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">Simple, Transparent Pricing</h2>
            <p className="text-gray-400 max-w-xl mx-auto">Start free. Scale when you're ready. Cancel anytime.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div key={p.name} className={`relative rounded-2xl p-7 flex flex-col ${p.badge ? 'ring-1' : ''}`}
                style={{
                  background: p.badge ? `linear-gradient(135deg, ${p.color}10, rgba(255,255,255,0.03))` : 'rgba(255,255,255,0.03)',
                  border: `1px solid ${p.color}33`,
                  ringColor: p.color,
                }}>
                {p.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: p.color }}>
                    {p.badge}
                  </div>
                )}
                <h3 className="font-bold text-white text-lg mb-1">{p.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{p.desc}</p>
                <div className="flex items-end gap-1 mb-6">
                  <span className="text-3xl font-extrabold text-white">{p.price}</span>
                  <span className="text-gray-500 text-sm mb-1">{p.period}</span>
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
                  {p.name === 'Free Trial' ? 'Start Free →' : 'Get Started →'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ CTA ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="rounded-3xl p-10 relative overflow-hidden"
            style={{ background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(236,72,153,0.08))', border: '1px solid rgba(99,102,241,0.25)' }}>
            <div className="absolute inset-0 pointer-events-none"
              style={{ background: 'radial-gradient(ellipse at center, rgba(99,102,241,0.08), transparent 70%)' }} />
            <div className="relative">
              <span className="text-4xl block mb-4">✍️</span>
              <h2 className="text-3xl font-extrabold text-white mb-4">Stop Writing. Start Publishing.</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Book a free demo. We'll generate a real blog post, product description, and Instagram caption for your business — live, in front of you.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href={whatsapp} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-bold transition-all"
                  style={{ background: 'linear-gradient(135deg, #6366f1, #ec4899)', boxShadow: '0 8px 30px rgba(99,102,241,0.4)' }}>
                  <Zap className="w-5 h-5" /> Get Demo
                </a>
                <Link href="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold transition-all hover:bg-white/5"
                  style={{ border: '1px solid rgba(255,255,255,0.12)', color: '#94a3b8' }}>
                  Know More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="mt-8 flex flex-wrap justify-center gap-4">
                {['Free demo call', 'Real output for your brand', 'No obligation', 'Reply within 2 hours'].map((t) => (
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
