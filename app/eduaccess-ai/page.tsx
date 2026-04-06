'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, FileText, CheckCircle, Zap, RefreshCw, Copy, Check, Lock, Building2, User, ArrowRight, X } from 'lucide-react';

const API_BASE = 'https://eduaccess-ai.onrender.com';

type View = 'pricing' | 'demo';

export default function EduAccessAIPage() {
  const [view, setView]               = useState<View>('pricing');
  const [activeTab, setActiveTab]     = useState<'alt-text' | 'content'>('alt-text');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode]       = useState<'login' | 'register'>('register');

  // Alt Text State
  const [imageUrl, setImageUrl]       = useState('');
  const [imageFile, setImageFile]     = useState<File | null>(null);
  const [context, setContext]         = useState('');
  const [gradeLevel, setGradeLevel]   = useState('Grade 3-5');
  const [subject, setSubject]         = useState('');
  const [altResult, setAltResult]     = useState<any>(null);
  const [altLoading, setAltLoading]   = useState(false);
  const [altError, setAltError]       = useState('');

  // Content State
  const [topic, setTopic]             = useState('');
  const [contentGrade, setContentGrade] = useState('Grade 3-5');
  const [contentType, setContentType] = useState('blog_post');
  const [audience, setAudience]       = useState('students');
  const [tone, setTone]               = useState('friendly');
  const [wordCount, setWordCount]     = useState(300);
  const [contentResult, setContentResult] = useState<any>(null);
  const [contentLoading, setContentLoading] = useState(false);
  const [contentError, setContentError]     = useState('');
  const [copied, setCopied]           = useState('');

  const gradeLevels = ['K-2', 'Grade 3-5', 'Grade 6-8', 'Grade 9-12', 'Higher Education', 'Professional'];

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });

  const generateAltText = async () => {
    if (!imageUrl && !imageFile) { setAltError('Please provide an image URL or upload an image.'); return; }
    setAltLoading(true); setAltError(''); setAltResult(null);
    try {
      const body: any = { context, grade_level: gradeLevel, subject, num_variations: 2 };
      if (imageFile) { body.image_base64 = await fileToBase64(imageFile); }
      else { body.image_url = imageUrl; }
      const res = await fetch(`${API_BASE}/api/alt-text/generate`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      setAltResult(await res.json());
    } catch (e: any) {
      setAltError(e.message || 'Failed to generate. Please try again.');
    } finally { setAltLoading(false); }
  };

  const generateContent = async () => {
    if (!topic) { setContentError('Please enter a topic.'); return; }
    setContentLoading(true); setContentError(''); setContentResult(null);
    try {
      const res = await fetch(`${API_BASE}/api/content/generate`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, grade_level: contentGrade, content_type: contentType, audience, tone, word_count: wordCount }),
      });
      if (!res.ok) throw new Error(`Error ${res.status}`);
      setContentResult(await res.json());
    } catch (e: any) {
      setContentError(e.message || 'Failed to generate. Please try again.');
    } finally { setContentLoading(false); }
  };

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  // ── PRICING PLANS ─────────────────────────────────────────────────────
  const plans = [
    {
      type: 'personal',
      name: 'Free Trial',
      price: '₹0',
      period: '',
      highlight: false,
      badge: '',
      description: 'Try before you buy',
      features: [
        '5 Alt Text generations',
        '5 Content creations',
        'WCAG 2.1 AA compliant',
        'All image types supported',
        'No credit card required',
      ],
      cta: 'Start Free Trial',
      ctaAction: () => setShowAuthModal(true),
      limit: '5 + 5 generations',
    },
    {
      type: 'personal',
      name: 'Alt Text Plan',
      price: '₹399',
      period: '/month',
      highlight: false,
      badge: 'Personal',
      description: 'For individuals & freelancers',
      features: [
        '100 Alt Text generations/month',
        'WCAG 2.1 & ADA compliant',
        'All image types supported',
        'Short alt + long description',
        '3 variations per generation',
        'Generation history',
        'Copy & export outputs',
      ],
      cta: 'Get Started',
      ctaAction: () => setShowAuthModal(true),
      limit: '100 alt texts/month',
    },
    {
      type: 'personal',
      name: 'Full Access Plan',
      price: '₹899',
      period: '/month',
      highlight: true,
      badge: 'Most Popular',
      description: 'Alt text + content writing',
      features: [
        '100 Alt Text generations/month',
        '100 Blog / Content creations/month',
        'WCAG 2.1 & ADA compliant',
        'K-12 & Higher Education tones',
        'Bias-free inclusive language',
        'All image types supported',
        'Priority support',
        'Generation history',
      ],
      cta: 'Get Full Access',
      ctaAction: () => setShowAuthModal(true),
      limit: '100 alt texts + 100 content/month',
    },
    {
      type: 'organization',
      name: 'Organization',
      price: 'Custom',
      period: '',
      highlight: false,
      badge: 'Enterprise',
      description: 'For schools, universities & edtech',
      features: [
        'Unlimited generations',
        'Team / multi-user access',
        'Custom WCAG compliance rules',
        'API access for integration',
        'Dedicated support',
        'SLA guarantee',
        'Custom onboarding',
        'Invoice & PO billing',
      ],
      cta: 'Send Query',
      ctaAction: () => window.location.href = '/contact',
      limit: 'Unlimited',
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-20">

      {/* ── AUTH MODAL ── */}
      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" style={{ background: 'rgba(0,0,0,0.8)' }}>
          <div className="relative w-full max-w-md rounded-2xl border border-white/10 bg-[#0c0f1a] p-8">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
            <div className="text-center mb-6">
              <div className="text-3xl mb-2">♿</div>
              <h2 className="text-xl font-bold text-white">EduAccess AI</h2>
              <p className="text-gray-400 text-sm mt-1">
                {authMode === 'register' ? 'Create account — 5 free generations included' : 'Welcome back'}
              </p>
            </div>

            <div className="flex gap-2 mb-6 p-1 rounded-lg bg-white/5 border border-white/10">
              {(['register', 'login'] as const).map((m) => (
                <button key={m} onClick={() => setAuthMode(m)}
                  className={`flex-1 py-2 rounded-md text-sm font-semibold transition-all ${authMode === m ? 'bg-blue-600 text-white' : 'text-gray-400 hover:text-white'}`}>
                  {m === 'register' ? 'Register' : 'Login'}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {authMode === 'register' && (
                <input type="text" placeholder="Full Name"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50" />
              )}
              <input type="email" placeholder="Email address"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50" />
              <input type="password" placeholder="Password"
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50" />
              {authMode === 'register' && (
                <div className="rounded-lg bg-blue-500/10 border border-blue-500/20 px-3 py-2.5 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <p className="text-blue-300 text-xs">Free trial includes <strong>5 alt texts + 5 content generations</strong> — no card needed</p>
                </div>
              )}
              <button onClick={() => { setShowAuthModal(false); setView('demo'); }}
                className="w-full py-3 rounded-xl font-semibold text-white text-sm btn-shimmer"
                style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}>
                {authMode === 'register' ? 'Create Account & Start Free Trial' : 'Login'}
              </button>
            </div>

            <p className="text-center text-gray-600 text-xs mt-4">
              {authMode === 'register' ? 'Already have an account? ' : "Don't have an account? "}
              <button onClick={() => setAuthMode(authMode === 'register' ? 'login' : 'register')} className="text-blue-400 hover:underline">
                {authMode === 'register' ? 'Login' : 'Register'}
              </button>
            </p>
          </div>
        </div>
      )}

      {/* ── HERO ── */}
      <div className="relative overflow-hidden border-b border-white/5 pb-12 pt-10">
        <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(37,99,235,0.15), transparent)' }} />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <Link href="/products" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 mb-5 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Products
          </Link>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            ♿ EduAccess <span className="gradient-text">AI</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-6">
            WCAG 2.1 and ADA compliant alt text generator and educational content writer — built for US schools, universities and edtech companies.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => setShowAuthModal(true)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white text-sm btn-shimmer"
              style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}>
              <Zap className="w-4 h-4" /> Start Free Trial — 5+5 Free
            </button>
            <button onClick={() => setView(view === 'pricing' ? 'demo' : 'pricing')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-gray-300 text-sm border border-white/10 hover:border-white/20 hover:text-white transition-all">
              {view === 'pricing' ? 'View Demo' : 'View Pricing'}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">

        {/* ── PRICING VIEW ── */}
        {view === 'pricing' && (
          <>
            {/* Mode tabs */}
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-white mb-2">Simple, Transparent Pricing</h2>
              <p className="text-gray-400 text-sm">Start free — no credit card required</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
              {plans.map((plan) => (
                <div key={plan.name}
                  className={`relative rounded-2xl border p-6 flex flex-col transition-all ${
                    plan.highlight
                      ? 'border-blue-500/50 bg-blue-500/5'
                      : 'border-white/10 bg-[#0c0f1a]/80 hover:border-white/20'
                  }`}>

                  {/* Top glow for highlighted */}
                  {plan.highlight && (
                    <div className="absolute top-0 left-0 right-0 h-px rounded-t-2xl"
                      style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.8), transparent)' }} />
                  )}

                  {/* Badge */}
                  {plan.badge && (
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold w-fit mb-3 ${
                      plan.badge === 'Most Popular'
                        ? 'bg-blue-500/20 border border-blue-500/40 text-blue-300'
                        : plan.badge === 'Enterprise'
                        ? 'bg-purple-500/15 border border-purple-500/30 text-purple-300'
                        : 'bg-white/5 border border-white/10 text-gray-400'
                    }`}>
                      {plan.badge === 'Enterprise' ? <Building2 className="w-3 h-3" /> : <User className="w-3 h-3" />}
                      {plan.badge}
                    </div>
                  )}

                  <h3 className="text-white font-bold text-lg">{plan.name}</h3>
                  <p className="text-gray-500 text-xs mb-4">{plan.description}</p>

                  <div className="mb-5">
                    <span className="text-3xl font-extrabold text-white">{plan.price}</span>
                    <span className="text-gray-500 text-sm">{plan.period}</span>
                  </div>

                  <ul className="space-y-2 flex-1 mb-6">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-xs text-gray-300">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />{f}
                      </li>
                    ))}
                  </ul>

                  <button onClick={plan.ctaAction}
                    className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all flex items-center justify-center gap-2 ${
                      plan.highlight
                        ? 'text-white btn-shimmer'
                        : plan.type === 'organization'
                        ? 'border border-purple-500/30 text-purple-300 hover:bg-purple-500/10'
                        : 'border border-white/10 text-gray-300 hover:border-white/20 hover:text-white'
                    }`}
                    style={plan.highlight ? { background: 'linear-gradient(135deg, #2563eb, #4f46e5)' } : {}}>
                    {plan.type === 'organization' ? <Building2 className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>

            {/* Comparison note */}
            <div className="rounded-2xl border border-white/8 bg-white/3 p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              {[
                { icon: '🔒', title: 'Register to Start', desc: 'Create a free account — no credit card needed' },
                { icon: '🎯', title: '5 + 5 Free', desc: '5 alt texts and 5 content pieces on free trial' },
                { icon: '🏢', title: 'Organization?', desc: 'Contact us for custom unlimited plan' },
              ].map((item) => (
                <div key={item.title}>
                  <div className="text-2xl mb-2">{item.icon}</div>
                  <p className="text-white font-semibold text-sm">{item.title}</p>
                  <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {/* ── DEMO VIEW ── */}
        {view === 'demo' && (
          <>
            {/* Usage banner */}
            <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 px-4 py-3 flex items-center justify-between mb-6 flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-yellow-400" />
                <span className="text-yellow-300 text-sm font-medium">Free Trial</span>
                <span className="text-gray-400 text-sm">— 5 alt texts and 5 content creations remaining</span>
              </div>
              <button onClick={() => setShowAuthModal(true)}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold text-white btn-shimmer"
                style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}>
                <Zap className="w-3 h-3" /> Upgrade Plan
              </button>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 p-1 rounded-xl bg-white/5 border border-white/10 w-fit">
              {(['alt-text', 'content'] as const).map((tab) => (
                <button key={tab} onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                    activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'
                  }`}>
                  {tab === 'alt-text' ? '🖼️ Alt Text Generator' : '✍️ Content Writer'}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* INPUT */}
              <div className="rounded-2xl border border-white/10 bg-[#0c0f1a]/80 p-6">
                <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
                  {activeTab === 'alt-text' ? <><Upload className="w-5 h-5 text-blue-400" /> Image Input</> : <><FileText className="w-5 h-5 text-blue-400" /> Content Input</>}
                </h2>

                {activeTab === 'alt-text' ? (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-400 font-medium mb-1.5 block">Upload Image</label>
                      <label className="flex flex-col items-center justify-center w-full h-28 border-2 border-dashed border-white/10 rounded-xl cursor-pointer hover:border-blue-500/40 transition-colors">
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => { setImageFile(e.target.files?.[0] || null); setImageUrl(''); }} />
                        {imageFile
                          ? <span className="text-emerald-400 text-sm font-medium">{imageFile.name}</span>
                          : <><Upload className="w-6 h-6 text-gray-600 mb-1" /><span className="text-gray-500 text-xs">Click to upload PNG, JPG, WEBP</span></>}
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-px bg-white/10" /><span className="text-gray-600 text-xs">OR</span><div className="flex-1 h-px bg-white/10" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 font-medium mb-1.5 block">Image URL</label>
                      <input type="url" value={imageUrl} onChange={(e) => { setImageUrl(e.target.value); setImageFile(null); }}
                        placeholder="https://example.com/image.jpg"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 font-medium mb-1.5 block">Educational Context</label>
                      <input type="text" value={context} onChange={(e) => setContext(e.target.value)}
                        placeholder="e.g. Grade 5 science lesson about photosynthesis"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-400 font-medium mb-1.5 block">Grade Level</label>
                        <select value={gradeLevel} onChange={(e) => setGradeLevel(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50">
                          {gradeLevels.map((g) => <option key={g} value={g} className="bg-[#0c0f1a]">{g}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 font-medium mb-1.5 block">Subject</label>
                        <input type="text" value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="e.g. Science"
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50" />
                      </div>
                    </div>
                    {altError && <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{altError}</p>}
                    <button onClick={generateAltText} disabled={altLoading}
                      className="w-full py-3 rounded-xl font-semibold text-white text-sm btn-shimmer disabled:opacity-50 flex items-center justify-center gap-2"
                      style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}>
                      {altLoading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Generating...</> : <><Zap className="w-4 h-4" /> Generate Alt Text</>}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="text-xs text-gray-400 font-medium mb-1.5 block">Topic *</label>
                      <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. What is Photosynthesis?"
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white placeholder:text-gray-600 focus:outline-none focus:border-blue-500/50" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-400 font-medium mb-1.5 block">Grade Level</label>
                        <select value={contentGrade} onChange={(e) => setContentGrade(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50">
                          {gradeLevels.map((g) => <option key={g} value={g} className="bg-[#0c0f1a]">{g}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 font-medium mb-1.5 block">Content Type</label>
                        <select value={contentType} onChange={(e) => setContentType(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50">
                          {['blog_post','course_material','lesson_plan','website_page','summary'].map((t) => (
                            <option key={t} value={t} className="bg-[#0c0f1a]">{t.replace('_',' ')}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-400 font-medium mb-1.5 block">Audience</label>
                        <select value={audience} onChange={(e) => setAudience(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50">
                          {['students','teachers','parents','general'].map((a) => <option key={a} value={a} className="bg-[#0c0f1a]">{a}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-gray-400 font-medium mb-1.5 block">Tone</label>
                        <select value={tone} onChange={(e) => setTone(e.target.value)}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500/50">
                          {['friendly','formal','neutral'].map((t) => <option key={t} value={t} className="bg-[#0c0f1a]">{t}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 font-medium mb-1.5 block">Word Count: {wordCount}</label>
                      <input type="range" min={100} max={1000} step={50} value={wordCount} onChange={(e) => setWordCount(Number(e.target.value))} className="w-full accent-blue-500" />
                    </div>
                    {contentError && <p className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{contentError}</p>}
                    <button onClick={generateContent} disabled={contentLoading}
                      className="w-full py-3 rounded-xl font-semibold text-white text-sm btn-shimmer disabled:opacity-50 flex items-center justify-center gap-2"
                      style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}>
                      {contentLoading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Generating...</> : <><Zap className="w-4 h-4" /> Generate Content</>}
                    </button>
                  </div>
                )}
              </div>

              {/* OUTPUT */}
              <div className="rounded-2xl border border-white/10 bg-[#0c0f1a]/80 p-6">
                <h2 className="text-white font-bold text-lg mb-5">Output</h2>
                {activeTab === 'alt-text' && (
                  <>
                    {!altResult && !altLoading && (
                      <div className="flex flex-col items-center justify-center h-64 text-center">
                        <div className="text-4xl mb-3">🖼️</div>
                        <p className="text-gray-500 text-sm">Upload an image or paste a URL to generate WCAG-compliant alt text</p>
                      </div>
                    )}
                    {altLoading && (
                      <div className="flex flex-col items-center justify-center h-64 gap-3">
                        <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
                        <p className="text-gray-400 text-sm">Analyzing image with Claude AI...</p>
                      </div>
                    )}
                    {altResult && (
                      <div className="space-y-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                            <CheckCircle className="w-3 h-3" /> WCAG {altResult.accessibility_level}
                          </span>
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/15 border border-blue-500/30 text-blue-400">{altResult.image_type}</span>
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/15 border border-purple-500/30 text-purple-400">{altResult.char_count} chars</span>
                        </div>
                        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">Short Alt Text</span>
                            <button onClick={() => copyText(altResult.short_alt, 'short')} className="text-gray-500 hover:text-white">
                              {copied === 'short' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                          <p className="text-white text-sm leading-relaxed">"{altResult.short_alt}"</p>
                          <p className="text-gray-600 text-xs mt-2">{altResult.char_count} of 200 characters</p>
                        </div>
                        {altResult.long_description && (
                          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-semibold text-purple-400 uppercase tracking-wide">Long Description</span>
                              <button onClick={() => copyText(altResult.long_description, 'long')} className="text-gray-500 hover:text-white">
                                {copied === 'long' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                            <p className="text-gray-300 text-sm leading-relaxed">{altResult.long_description}</p>
                          </div>
                        )}
                        {altResult.variations?.length > 0 && (
                          <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                            <span className="text-xs font-semibold text-yellow-400 uppercase tracking-wide block mb-3">Variations</span>
                            <div className="space-y-2">
                              {altResult.variations.map((v: any, i: number) => (
                                <div key={i} className="flex items-start justify-between gap-2">
                                  <p className="text-gray-300 text-xs leading-relaxed flex-1">"{v.short_alt}"</p>
                                  <button onClick={() => copyText(v.short_alt, `var-${i}`)} className="text-gray-600 hover:text-white flex-shrink-0">
                                    {copied === `var-${i}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        {altResult.accessibility_notes && (
                          <div className="rounded-xl bg-blue-500/5 border border-blue-500/15 p-3">
                            <p className="text-blue-300 text-xs leading-relaxed">Note: {altResult.accessibility_notes}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
                {activeTab === 'content' && (
                  <>
                    {!contentResult && !contentLoading && (
                      <div className="flex flex-col items-center justify-center h-64 text-center">
                        <div className="text-4xl mb-3">✍️</div>
                        <p className="text-gray-500 text-sm">Enter a topic to generate WCAG-compliant educational content</p>
                      </div>
                    )}
                    {contentLoading && (
                      <div className="flex flex-col items-center justify-center h-64 gap-3">
                        <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
                        <p className="text-gray-400 text-sm">Writing content with Claude AI...</p>
                      </div>
                    )}
                    {contentResult && (
                      <div className="space-y-4 max-h-[600px] overflow-y-auto pr-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">{contentResult.accessibility_score} Compliant</span>
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/15 border border-blue-500/30 text-blue-400">{contentResult.reading_level}</span>
                          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-500/15 border border-purple-500/30 text-purple-400">{contentResult.word_count} words</span>
                        </div>
                        <div className="rounded-xl bg-white/5 border border-white/10 p-4">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-semibold text-blue-400 uppercase tracking-wide">Title</span>
                            <button onClick={() => copyText(contentResult.title, 'title')} className="text-gray-500 hover:text-white">
                              {copied === 'title' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                            </button>
                          </div>
                          <p className="text-white font-semibold text-sm">{contentResult.title}</p>
                        </div>
                        {contentResult.sections?.map((section: any, i: number) => (
                          <div key={i} className="rounded-xl bg-white/5 border border-white/10 p-4">
                            <span className="text-xs font-semibold text-purple-400 uppercase tracking-wide block mb-2">{section.heading}</span>
                            <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{section.content}</p>
                          </div>
                        ))}
                        {contentResult.key_takeaways?.length > 0 && (
                          <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/15 p-4">
                            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wide block mb-2">Key Takeaways</span>
                            <ul className="space-y-1">
                              {contentResult.key_takeaways.map((t: string, i: number) => (
                                <li key={i} className="text-gray-300 text-xs flex items-start gap-2">
                                  <CheckCircle className="w-3 h-3 text-emerald-400 flex-shrink-0 mt-0.5" />{t}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <button onClick={() => { const full = `${contentResult.title}\n\n${contentResult.sections?.map((s:any) => `${s.heading}\n${s.content}`).join('\n\n')}`; copyText(full, 'all'); }}
                          className="w-full py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white text-sm font-medium transition-all flex items-center justify-center gap-2">
                          {copied === 'all' ? <><Check className="w-4 h-4 text-emerald-400" /> Copied!</> : <><Copy className="w-4 h-4" /> Copy Full Content</>}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
