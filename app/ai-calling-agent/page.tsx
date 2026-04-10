'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Phone, PhoneCall, PhoneOff, Zap, BarChart2, Users, Clock, Shield,
  CheckCircle, ArrowRight, Star, TrendingUp, Globe, Headphones,
  MessageSquare, Database, RefreshCw, ChevronRight, Play, Mic,
  Building2, GraduationCap, Heart, Car, ShoppingBag, Home, Menu, X
} from 'lucide-react';

/* ─── Animated Counter ─────────────────────────────────────────────────────── */
function Counter({ to, suffix = '', prefix = '' }: { to: number; suffix?: string; prefix?: string }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = Math.ceil(to / 60);
    const t = setInterval(() => {
      start += step;
      if (start >= to) { setVal(to); clearInterval(t); }
      else setVal(start);
    }, 24);
    return () => clearInterval(t);
  }, [to]);
  return <>{prefix}{val.toLocaleString('en-IN')}{suffix}</>;
}

/* ─── Live Call Visualizer ─────────────────────────────────────────────────── */
function CallVisualizer() {
  const [active, setActive] = useState(true);
  const bars = [3, 5, 8, 6, 4, 7, 9, 5, 3, 6, 8, 4, 7, 5, 6];
  useEffect(() => {
    const t = setInterval(() => setActive(a => !a), 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="relative w-64 h-64 mx-auto">
      {/* Outer ring pulse */}
      <div className="absolute inset-0 rounded-full animate-ping opacity-10" style={{ background: 'radial-gradient(circle, #00ff88, transparent)' }} />
      <div className="absolute inset-4 rounded-full animate-ping opacity-15 animation-delay-300" style={{ background: 'radial-gradient(circle, #3b82f6, transparent)', animationDelay: '0.5s' }} />
      {/* Main circle */}
      <div className="absolute inset-8 rounded-full flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #00ff8820, #3b82f620)', border: '2px solid #00ff8840', backdropFilter: 'blur(10px)' }}>
        <div className="text-center">
          <PhoneCall className="w-10 h-10 mx-auto mb-2" style={{ color: '#00ff88' }} />
          <div className="text-xs font-semibold" style={{ color: '#00ff88' }}>{active ? 'LIVE CALL' : 'CONNECTING'}</div>
          <div className="text-xs mt-1" style={{ color: '#94a3b8' }}>AI Agent Active</div>
        </div>
      </div>
      {/* Sound bars */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-end gap-0.5">
        {bars.map((h, i) => (
          <div key={i} className="w-1 rounded-full transition-all duration-300" style={{
            height: active ? `${h * 3}px` : '4px',
            background: '#00ff88',
            opacity: 0.7,
            transitionDelay: `${i * 50}ms`
          }} />
        ))}
      </div>
    </div>
  );
}

/* ─── Floating Call Card ───────────────────────────────────────────────────── */
function FloatingCard({ name, status, time, delay }: { name: string; status: string; time: string; delay: string }) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl animate-float" style={{
      background: 'rgba(15,23,42,0.9)',
      border: '1px solid rgba(0,255,136,0.2)',
      backdropFilter: 'blur(12px)',
      animationDelay: delay,
    }}>
      <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg,#00ff88,#3b82f6)' }}>
        <Phone className="w-4 h-4 text-white" />
      </div>
      <div>
        <div className="text-white text-xs font-semibold">{name}</div>
        <div className="text-xs" style={{ color: '#00ff88' }}>{status}</div>
      </div>
      <div className="ml-auto text-xs" style={{ color: '#64748b' }}>{time}</div>
    </div>
  );
}

const stats = [
  { label: 'Calls/Day Capacity', value: 10000, suffix: '+' },
  { label: 'Cost Savings vs Human', value: 85, suffix: '%' },
  { label: 'Response Time (sec)', value: 1, suffix: 's' },
  { label: 'Languages Supported', value: 15, suffix: '+' },
];

const features = [
  { icon: Mic, title: 'Human-Like Voice', desc: 'ElevenLabs voices — Hindi, English & regional. Sounds 100% natural, not robotic.', color: '#00ff88' },
  { icon: Zap, title: 'Instant Response', desc: 'AI responds in under 1 second. No dead air, no awkward pauses.', color: '#3b82f6' },
  { icon: RefreshCw, title: 'Smart Follow-up', desc: 'If busy → schedules callback. If interested → books demo. Fully autonomous.', color: '#a855f7' },
  { icon: Database, title: 'Live CRM Updates', desc: 'Every call auto-updates your CRM with sentiment, intent & next action.', color: '#f59e0b' },
  { icon: BarChart2, title: 'Real-time Analytics', desc: 'Track call outcomes, conversion rates, objections & agent performance live.', color: '#ef4444' },
  { icon: Globe, title: '24/7 Operation', desc: 'Never sleeps. Calls at 2am if needed. Handles 10,000 calls simultaneously.', color: '#06b6d4' },
  { icon: MessageSquare, title: 'WhatsApp Follow-up', desc: 'After every call, auto-sends personalized WhatsApp message to warm leads.', color: '#00ff88' },
  { icon: Shield, title: 'TRAI Compliant', desc: 'DLT registered, Do Not Disturb filters, consent management built-in.', color: '#3b82f6' },
];

const industries = [
  { icon: Home, name: 'Real Estate', calls: '5,000+', saving: '₹4.2L', color: '#f59e0b' },
  { icon: GraduationCap, name: 'EdTech', calls: '3,000+', saving: '₹2.1L', color: '#3b82f6' },
  { icon: Heart, name: 'Healthcare', calls: '2,000+', saving: '₹1.5L', color: '#ef4444' },
  { icon: Building2, name: 'Finance & Loans', calls: '8,000+', saving: '₹6.8L', color: '#00ff88' },
  { icon: Car, name: 'Automobile', calls: '1,500+', saving: '₹1.2L', color: '#a855f7' },
  { icon: ShoppingBag, name: 'eCommerce', calls: '4,000+', saving: '₹3.4L', color: '#06b6d4' },
];

const steps = [
  { n: '01', title: 'Upload Your Leads', desc: 'Upload CSV or connect CRM. We auto-import name, phone & context for each lead.', icon: Database },
  { n: '02', title: 'AI Starts Calling', desc: 'Our AI dials leads instantly, speaks naturally, handles objections & books meetings.', icon: PhoneCall },
  { n: '03', title: 'CRM Auto-Updates', desc: 'Every call result syncs to your CRM with full transcript, sentiment & next action.', icon: BarChart2 },
];

const plans = [
  {
    name: 'Starter',
    price: '₹49,999',
    period: '/month',
    calls: '1,000 calls',
    concurrent: '10 concurrent',
    color: '#3b82f6',
    popular: false,
    features: [
      '1,000 AI calls/month',
      '10 concurrent calls',
      'Hindi + English voice',
      'Basic CRM integration',
      'Call recordings',
      'Email support',
      'Web dashboard',
      '2 lead source integrations',
    ],
  },
  {
    name: 'Growth',
    price: '₹1,49,999',
    period: '/month',
    calls: '5,000 calls',
    concurrent: '50 concurrent',
    color: '#00ff88',
    popular: true,
    features: [
      '5,000 AI calls/month',
      '50 concurrent calls',
      'Hindi + English + Regional',
      'Full CRM integration',
      'Call recordings + transcripts',
      'WhatsApp follow-up',
      'Real-time analytics',
      'Priority support',
      'Custom AI script training',
      '10 lead source integrations',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'pricing',
    calls: 'Unlimited calls',
    concurrent: '1,000+ concurrent',
    color: '#a855f7',
    popular: false,
    features: [
      'Unlimited AI calls',
      '1,000+ concurrent calls',
      'All languages supported',
      'Custom CRM build',
      'White-label option',
      'Dedicated account manager',
      'SLA guarantee',
      'On-premise deployment',
      'API access',
      'Volume discounts',
    ],
  },
];

const testimonials = [
  { name: 'Rajesh Kumar', role: 'Sales Head, PropNest Realty', text: 'We were losing 60% of leads because agents couldn\'t call fast enough. DigiAgentix AI calls every lead within 2 minutes — our conversions tripled.', rating: 5 },
  { name: 'Priya Sharma', role: 'Director, EduVision Academy', text: 'From 800 leads/month, we were only calling 200. Now AI handles all 800 instantly. Admissions up 4x.', rating: 5 },
  { name: 'Amit Patel', role: 'GM, QuickLoan Finance', text: '₹40 per AI call vs ₹500 per human call. Same quality, 10x speed. Best ROI we\'ve seen in years.', rating: 5 },
];

export default function AICallingAgentPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div style={{ background: '#020817', color: '#e2e8f0', fontFamily: 'system-ui, sans-serif', minHeight: '100vh' }}>

      {/* ── Navbar ── */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: 'rgba(2,8,23,0.85)', borderBottom: '1px solid rgba(0,255,136,0.1)', backdropFilter: 'blur(16px)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#00ff88,#3b82f6)' }}>
                <Phone className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-white">DigiAgentix</span>
              <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: 'rgba(0,255,136,0.15)', color: '#00ff88', border: '1px solid rgba(0,255,136,0.3)' }}>AI Calls</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              {['Features', 'How it Works', 'Industries', 'Pricing'].map(item => (
                <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} className="text-sm text-gray-400 hover:text-white transition-colors">{item}</a>
              ))}
            </div>
            <div className="flex items-center gap-3">
              <Link href="/ai-calling-agent/dashboard" className="hidden md:block text-sm font-medium px-4 py-2 rounded-lg" style={{ background: 'rgba(0,255,136,0.1)', color: '#00ff88', border: '1px solid rgba(0,255,136,0.3)' }}>
                Dashboard
              </Link>
              <a href="https://wa.me/919997730768?text=I+want+a+demo+of+AI+Calling+Agent" target="_blank" rel="noopener noreferrer" className="text-sm font-semibold px-4 py-2 rounded-lg text-black" style={{ background: 'linear-gradient(135deg,#00ff88,#00cc6a)' }}>
                Get Demo
              </a>
              <button className="md:hidden text-gray-400" onClick={() => setMenuOpen(!menuOpen)}>
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
          {menuOpen && (
            <div className="md:hidden pb-4 space-y-2">
              {['Features', 'How it Works', 'Industries', 'Pricing'].map(item => (
                <a key={item} href={`#${item.toLowerCase().replace(/ /g, '-')}`} onClick={() => setMenuOpen(false)} className="block py-2 text-sm text-gray-400 hover:text-white">{item}</a>
              ))}
              <Link href="/ai-calling-agent/dashboard" onClick={() => setMenuOpen(false)} className="block py-2 text-sm font-medium" style={{ color: '#00ff88' }}>Dashboard →</Link>
            </div>
          )}
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative pt-24 pb-20 overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,255,136,0.08), transparent)' }} />
        <div className="absolute top-40 right-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.08), transparent)' }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-6" style={{ background: 'rgba(0,255,136,0.1)', color: '#00ff88', border: '1px solid rgba(0,255,136,0.2)' }}>
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                AI Calling Agent — Live & Ready
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
                Replace{' '}
                <span style={{ background: 'linear-gradient(135deg,#00ff88,#3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  500 Sales Agents
                </span>
                <br />with{' '}
                <span className="text-white">1 AI</span>
              </h1>
              <p className="text-lg text-gray-400 mb-8 leading-relaxed max-w-lg">
                Human-like AI calls your leads in Hindi & English — 24/7, 10,000 calls simultaneously, at just <strong style={{ color: '#00ff88' }}>₹33 per call</strong>. No salary. No leave. No excuses.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-10">
                <a href="https://wa.me/919997730768?text=I+want+a+demo+of+AI+Calling+Agent" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-bold text-black text-base" style={{ background: 'linear-gradient(135deg,#00ff88,#00cc6a)', boxShadow: '0 0 30px rgba(0,255,136,0.3)' }}>
                  <Play className="w-5 h-5" />
                  Book Free Demo
                </a>
                <Link href="/ai-calling-agent/dashboard" className="flex items-center justify-center gap-2 px-7 py-4 rounded-xl font-semibold text-white text-base" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <BarChart2 className="w-5 h-5" />
                  View Dashboard
                </Link>
              </div>
              {/* Trust badges */}
              <div className="flex flex-wrap gap-4">
                {['TRAI Compliant', 'DLT Registered', 'ISO 27001', 'GDPR Safe'].map(b => (
                  <div key={b} className="flex items-center gap-1.5 text-xs text-gray-400">
                    <Shield className="w-3.5 h-3.5" style={{ color: '#00ff88' }} />
                    {b}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — visualizer + floating cards */}
            <div className="relative">
              <CallVisualizer />
              <div className="absolute -left-4 top-10 w-56 space-y-2">
                <FloatingCard name="Rajesh Kumar" status="Interest: High ✓" time="2s ago" delay="0s" />
                <FloatingCard name="Priya Sharma" status="Demo Booked ✓" time="15s ago" delay="0.5s" />
              </div>
              <div className="absolute -right-4 bottom-10 w-56 space-y-2">
                <FloatingCard name="Amit Patel" status="Callback: 3pm" time="1m ago" delay="1s" />
                <FloatingCard name="Sunita Devi" status="Converted ✓" time="3m ago" delay="1.5s" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <section style={{ background: 'rgba(0,255,136,0.04)', borderTop: '1px solid rgba(0,255,136,0.1)', borderBottom: '1px solid rgba(0,255,136,0.1)' }}>
        <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-3xl sm:text-4xl font-extrabold mb-1" style={{ color: '#00ff88' }}>
                <Counter to={s.value} suffix={s.suffix} />
              </div>
              <div className="text-sm text-gray-400">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it Works ── */}
      <section id="how-it-works" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#00ff88' }}>Simple Process</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Up & Running in <span style={{ color: '#00ff88' }}>24 Hours</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto">No technical setup. No coding. Just upload leads and watch AI close deals.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="relative text-center p-8 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="text-6xl font-extrabold mb-4 opacity-10">{s.n}</div>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5" style={{ background: 'linear-gradient(135deg,rgba(0,255,136,0.2),rgba(59,130,246,0.2))', border: '1px solid rgba(0,255,136,0.2)' }}>
                  <s.icon className="w-7 h-7" style={{ color: '#00ff88' }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-6 h-6 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="py-24" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#3b82f6' }}>Features</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Everything Your Sales Team <span style={{ color: '#3b82f6' }}>Can't Do</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto">Built with the world's most advanced AI — Claude, ElevenLabs & Vapi.ai.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div key={i} className="p-6 rounded-2xl group hover:scale-105 transition-all duration-300" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${f.color}15`, border: `1px solid ${f.color}30` }}>
                  <f.icon className="w-6 h-6" style={{ color: f.color }} />
                </div>
                <h3 className="font-bold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section id="industries" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#a855f7' }}>Industries</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Built for <span style={{ color: '#a855f7' }}>Every Industry</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto">From real estate to healthcare — wherever there are leads, our AI converts them.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {industries.map((ind, i) => (
              <div key={i} className="p-6 rounded-2xl flex items-center gap-5 group hover:scale-102 transition-all" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0" style={{ background: `${ind.color}15`, border: `1px solid ${ind.color}30` }}>
                  <ind.icon className="w-7 h-7" style={{ color: ind.color }} />
                </div>
                <div>
                  <h3 className="font-bold text-white mb-1">{ind.name}</h3>
                  <div className="text-xs text-gray-400 mb-1">Avg calls/month: <span style={{ color: ind.color }}>{ind.calls}</span></div>
                  <div className="text-xs text-gray-400">Monthly savings: <span className="font-semibold" style={{ color: '#00ff88' }}>{ind.saving}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── AI Conversation Demo ── */}
      <section className="py-24" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Hear How It Sounds</h2>
            <p className="text-gray-400">Real conversation flow between our AI and a lead</p>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(0,255,136,0.2)' }}>
            {/* Call header */}
            <div className="flex items-center justify-between px-6 py-4" style={{ background: 'rgba(0,255,136,0.05)', borderBottom: '1px solid rgba(0,255,136,0.1)' }}>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-sm font-semibold" style={{ color: '#00ff88' }}>LIVE AI CALL — Real Estate Lead</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <Clock className="w-3.5 h-3.5" />
                2:34
              </div>
            </div>
            {/* Conversation */}
            <div className="p-6 space-y-4" style={{ background: '#030c1a' }}>
              {[
                { from: 'ai', name: 'Priya (AI)', text: 'Hi, this is Priya calling from PropNest Realty. Am I speaking with Rahul ji?' },
                { from: 'human', name: 'Rahul Kumar', text: 'Haan, main Rahul bol raha hoon.' },
                { from: 'ai', name: 'Priya (AI)', text: 'Bahut achha Rahul ji! Aapne recently hmare website pe 2BHK flats ke baare mein enquiry ki thi. Kya aap abhi baat kar sakte hain — sirf 2 minutes?' },
                { from: 'human', name: 'Rahul Kumar', text: 'Haan, bataiye. Kaunsa project hai?' },
                { from: 'ai', name: 'Priya (AI)', text: 'PropNest Sunrise — Sector 62, Noida. 2BHK starting ₹45 lakh. Ready possession, home loan facility available. Kya aap ek site visit lete hain? Saturday ya Sunday — which suits you better?' },
                { from: 'human', name: 'Rahul Kumar', text: 'Saturday theek rahega — 11 baje ke baad.' },
                { from: 'ai', name: 'Priya (AI)', text: 'Perfect! Saturday 11am book kar diya. Confirmation SMS aur WhatsApp dono pe aayega. Dhanyawad Rahul ji!' },
              ].map((msg, i) => (
                <div key={i} className={`flex gap-3 ${msg.from === 'ai' ? '' : 'flex-row-reverse'}`}>
                  <div className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold" style={{ background: msg.from === 'ai' ? 'linear-gradient(135deg,#00ff88,#3b82f6)' : 'rgba(255,255,255,0.1)', color: msg.from === 'ai' ? '#000' : '#fff' }}>
                    {msg.from === 'ai' ? 'AI' : 'R'}
                  </div>
                  <div className="max-w-sm">
                    <div className="text-xs mb-1" style={{ color: msg.from === 'ai' ? '#00ff88' : '#94a3b8' }}>{msg.name}</div>
                    <div className="px-4 py-3 rounded-2xl text-sm" style={{ background: msg.from === 'ai' ? 'rgba(0,255,136,0.08)' : 'rgba(255,255,255,0.06)', border: `1px solid ${msg.from === 'ai' ? 'rgba(0,255,136,0.15)' : 'rgba(255,255,255,0.08)'}`, color: '#e2e8f0' }}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {/* Result */}
              <div className="mt-6 p-4 rounded-xl flex items-center gap-3" style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.2)' }}>
                <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: '#00ff88' }} />
                <div>
                  <div className="text-sm font-semibold" style={{ color: '#00ff88' }}>Meeting Booked — CRM Updated</div>
                  <div className="text-xs text-gray-400 mt-0.5">Interest: High | Next: Site visit Saturday 11am | WhatsApp sent</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <section id="pricing" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: '#00ff88' }}>Pricing</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Transparent <span style={{ color: '#00ff88' }}>Pricing</span></h2>
            <p className="text-gray-400 max-w-xl mx-auto">All plans include setup, training & dedicated support. No hidden charges.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {plans.map((p, i) => (
              <div key={i} className="relative p-8 rounded-2xl flex flex-col" style={{
                background: p.popular ? `linear-gradient(135deg, rgba(0,255,136,0.06), rgba(59,130,246,0.06))` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${p.popular ? 'rgba(0,255,136,0.4)' : 'rgba(255,255,255,0.07)'}`,
                boxShadow: p.popular ? '0 0 40px rgba(0,255,136,0.1)' : 'none',
              }}>
                {p.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-black" style={{ background: 'linear-gradient(135deg,#00ff88,#00cc6a)' }}>
                    MOST POPULAR
                  </div>
                )}
                <div className="mb-6">
                  <h3 className="text-xl font-bold text-white mb-1">{p.name}</h3>
                  <div className="flex items-end gap-1 mb-2">
                    <span className="text-3xl font-extrabold" style={{ color: p.color }}>{p.price}</span>
                    <span className="text-gray-400 text-sm mb-1">{p.period}</span>
                  </div>
                  <div className="flex gap-3 text-xs text-gray-400">
                    <span style={{ color: p.color }}>{p.calls}</span>
                    <span>•</span>
                    <span>{p.concurrent}</span>
                  </div>
                </div>
                <ul className="space-y-3 mb-8 flex-1">
                  {p.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: p.color }} />
                      {f}
                    </li>
                  ))}
                </ul>
                <a href="https://wa.me/919997730768?text=I+want+to+know+more+about+AI+Calling+Agent" target="_blank" rel="noopener noreferrer" className="w-full py-3 rounded-xl font-semibold text-sm text-center block transition-all" style={{
                  background: p.popular ? `linear-gradient(135deg,${p.color},#3b82f6)` : `rgba(${p.color === '#3b82f6' ? '59,130,246' : '168,85,247'},0.15)`,
                  color: p.popular ? '#000' : p.color,
                  border: p.popular ? 'none' : `1px solid ${p.color}40`,
                }}>
                  {p.name === 'Enterprise' ? 'Contact Sales →' : 'Get Started →'}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-24" style={{ background: 'rgba(255,255,255,0.015)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">Clients Love It</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                <div className="flex gap-1 mb-4">
                  {Array(t.rating).fill(0).map((_, j) => <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed mb-5 italic">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-white text-sm">{t.name}</div>
                  <div className="text-xs text-gray-400 mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="p-12 rounded-3xl" style={{ background: 'linear-gradient(135deg, rgba(0,255,136,0.08), rgba(59,130,246,0.08))', border: '1px solid rgba(0,255,136,0.2)' }}>
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4">
              Start Calling in <span style={{ color: '#00ff88' }}>24 Hours</span>
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">Join 50+ companies already using DigiAgentix AI to supercharge their sales. Get a free demo today.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://wa.me/919997730768?text=I+want+a+free+demo+of+DigiAgentix+AI+Calling+Agent" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-xl font-bold text-black text-base" style={{ background: 'linear-gradient(135deg,#00ff88,#00cc6a)', boxShadow: '0 0 30px rgba(0,255,136,0.3)' }}>
                📞 Book Free Demo on WhatsApp
              </a>
              <a href="mailto:info@digiagentix.com?subject=AI Calling Agent Demo Request" className="px-8 py-4 rounded-xl font-semibold text-white text-base" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.15)' }}>
                ✉️ Email Us
              </a>
            </div>
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <span>✓ Free 100-call trial</span>
              <span>✓ No setup fee</span>
              <span>✓ Cancel anytime</span>
              <span>✓ 24hr onboarding</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.06)', background: '#010610' }}>
        <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#00ff88,#3b82f6)' }}>
              <Phone className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-bold text-white text-sm">DigiAgentix</span>
          </Link>
          <p className="text-xs text-gray-500 text-center">© 2026 DigiAgentix. AI Calling Agent | info@digiagentix.com</p>
          <div className="flex gap-4 text-xs text-gray-500">
            <Link href="/privacy" className="hover:text-gray-300">Privacy</Link>
            <Link href="/terms" className="hover:text-gray-300">Terms</Link>
            <Link href="/contact" className="hover:text-gray-300">Contact</Link>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-float { animation: float 4s ease-in-out infinite; }
        .scale-102 { transform: scale(1.02); }
      `}</style>
    </div>
  );
}
