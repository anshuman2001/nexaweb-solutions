'use client';

import { useState, useEffect, useRef, Component, ReactNode } from 'react';

/* ─── Error Boundary ─────────────────────────────────────────────────────────── */
class ErrorBoundary extends Component<{ children: ReactNode }, { error: string | null }> {
  constructor(props: any) { super(props); this.state = { error: null }; }
  static getDerivedStateFromError(e: Error) { return { error: e.message }; }
  render() {
    if (this.state.error) return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#0a0f1e' }}>
        <div className="text-center p-8 max-w-md">
          <div className="text-4xl mb-4">⚠️</div>
          <h2 className="text-white font-bold text-xl mb-2">Something went wrong</h2>
          <p className="text-gray-400 text-sm mb-6">{this.state.error}</p>
          <button onClick={() => { localStorage.clear(); window.location.reload(); }}
            className="px-6 py-3 rounded-xl text-white font-semibold text-sm"
            style={{ background: 'linear-gradient(135deg,#6366f1,#3b82f6)' }}>
            Clear & Reload
          </button>
        </div>
      </div>
    );
    return this.props.children;
  }
}
import {
  Eye, EyeOff, Upload, FileText, CheckCircle, Zap, RefreshCw,
  Copy, Check, LogOut, BarChart2, BookOpen, Image, ChevronRight,
  Star, Users, Shield, Award, X, AlertCircle
} from 'lucide-react';

const API_BASE = 'https://eduaccess-ai.onrender.com';

/* ─── tiny helpers ─────────────────────────────────────────────────────────── */
const UsageBar = ({ label, used, limit }: { label: string; used: number; limit: number }) => {
  const pct = limit > 0 ? Math.min((used / limit) * 100, 100) : 0;
  const color = pct >= 90 ? '#ef4444' : pct >= 70 ? '#f59e0b' : '#10b981';
  return (
    <div className="mb-3">
      <div className="flex justify-between text-xs mb-1" style={{ color: '#94a3b8' }}>
        <span>{label}</span>
        <span style={{ color: pct >= 90 ? '#ef4444' : '#94a3b8' }}>{used}/{limit === 999999 ? '∞' : limit}</span>
      </div>
      <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
        <div className="h-1.5 rounded-full transition-all duration-500" style={{ width: `${limit === 999999 ? 5 : pct}%`, background: color }} />
      </div>
    </div>
  );
};

/* ─── MAIN COMPONENT ────────────────────────────────────────────────────────── */
function EduAccessAIPageInner() {

  /* ── auth state */
  const [authMode, setAuthMode]       = useState<'login' | 'register' | 'forgot'>('login');
  const [user, setUser]               = useState<any>(null);
  const [usage, setUsage]             = useState<any>(null);
  const [token, setToken]             = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError]     = useState('');
  const [authSuccess, setAuthSuccess] = useState('');
  const [showPass, setShowPass]       = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [form, setForm]               = useState({ full_name: '', email: '', password: '', confirm: '' });

  /* ── tool state */
  const [activeTab, setActiveTab]     = useState<'alt-text' | 'content'>('alt-text');

  // alt text
  const [imageUrl, setImageUrl]       = useState('');
  const [imageFile, setImageFile]     = useState<File | null>(null);
  const [imgPreview, setImgPreview]   = useState('');
  const [context, setContext]         = useState('');
  const [gradeLevel, setGradeLevel]   = useState('Grade 3-5');
  const [subject, setSubject]         = useState('');
  const [altResult, setAltResult]     = useState<any>(null);
  const [altLoading, setAltLoading]   = useState(false);
  const [altError, setAltError]       = useState('');

  // content
  const [topic, setTopic]             = useState('');
  const [contentGrade, setContentGrade] = useState('Grade 3-5');
  const [contentType, setContentType]   = useState('blog_post');
  const [audience, setAudience]         = useState('students');
  const [tone, setTone]                 = useState('friendly');
  const [wordCount, setWordCount]       = useState(300);
  const [contentResult, setContentResult] = useState<any>(null);
  const [contentLoading, setContentLoading] = useState(false);
  const [contentError, setContentError]     = useState('');
  const [copied, setCopied]           = useState('');

  const fileRef = useRef<HTMLInputElement>(null);
  const gradeLevels = ['K-2', 'Grade 3-5', 'Grade 6-8', 'Grade 9-12', 'Higher Education', 'Professional'];

  /* ── restore session */
  useEffect(() => {
    try {
      const t = localStorage.getItem('eduaccess_token');
      const u = localStorage.getItem('eduaccess_user');
      if (t && u) {
        const parsed = JSON.parse(u);
        setToken(t);
        setUser(parsed);
        fetchUsage(t);
      }
    } catch {
      // clear any corrupt localStorage data
      localStorage.removeItem('eduaccess_token');
      localStorage.removeItem('eduaccess_user');
    }
  }, []);

  const fetchUsage = async (t: string) => {
    try {
      const r = await fetch(`${API_BASE}/api/auth/usage`, { headers: { Authorization: `Bearer ${t}` } });
      if (r.ok) setUsage(await r.json());
    } catch {}
  };

  /* ── auth ── */
  const handleAuth = async () => {
    setAuthError(''); setAuthSuccess(''); setAuthLoading(true);

    // ── Forgot password flow ──
    if (authMode === 'forgot') {
      if (!form.email) { setAuthError('Please enter your email address.'); setAuthLoading(false); return; }
      try {
        await fetch(`${API_BASE}/api/auth/forgot-password`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: form.email }),
        });
        setAuthSuccess('Reset link sent! Check your inbox (and spam folder).');
      } catch { setAuthSuccess('Reset link sent! Check your inbox (and spam folder).'); }
      finally { setAuthLoading(false); }
      return;
    }

    if (authMode === 'register' && form.password !== form.confirm) {
      setAuthError('Passwords do not match.'); setAuthLoading(false); return;
    }
    if (form.password.length < 6) {
      setAuthError('Password must be at least 6 characters.'); setAuthLoading(false); return;
    }
    try {
      const body: any = { email: form.email, password: form.password };
      if (authMode === 'register') body.full_name = form.full_name;
      const res  = await fetch(`${API_BASE}/api/auth/${authMode === 'register' ? 'register' : 'login'}`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Authentication failed');

      if (authMode === 'login') {
        localStorage.setItem('eduaccess_token', data.access_token);
        localStorage.setItem('eduaccess_user', JSON.stringify(data));
        setToken(data.access_token); setUser(data);
        await fetchUsage(data.access_token);
      } else {
        setAuthSuccess('Account created! Please login now.');
        setAuthMode('login');
        setForm(f => ({ ...f, confirm: '' }));
      }
    } catch (e: any) { setAuthError(e.message || 'Something went wrong.'); }
    finally { setAuthLoading(false); }
  };

  const handleLogout = () => {
    localStorage.removeItem('eduaccess_token'); localStorage.removeItem('eduaccess_user');
    setUser(null); setToken(''); setUsage(null);
    setAltResult(null); setContentResult(null);
  };

  /* ── alt text ── */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setImageFile(f);
    setImgPreview(URL.createObjectURL(f));
    setImageUrl('');
  };

  /* convert File → base64 string (strips data:...;base64, prefix) */
  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload  = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const generateAltText = async () => {
    setAltLoading(true); setAltError(''); setAltResult(null);
    try {
      const body: Record<string, any> = {
        context:       context || undefined,
        grade_level:   gradeLevel || undefined,
        subject:       subject   || undefined,
        num_variations: 3,
      };

      if (imageFile) {
        body.image_base64 = await fileToBase64(imageFile);
      } else if (imageUrl) {
        body.image_url = imageUrl;
      } else {
        setAltError('Please upload an image or enter an image URL.');
        setAltLoading(false);
        return;
      }

      const res = await fetch(`${API_BASE}/api/alt-text/generate`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body:    JSON.stringify(body),
      });

      const data = await res.json();
      if (res.status === 402) {
        setAltError(typeof data.detail === 'string' ? data.detail : data.detail?.message || 'Limit reached. Please upgrade your plan.');
        return;
      }
      if (!res.ok) throw new Error(typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail));
      setAltResult(data);
      fetchUsage(token);
    } catch (e: any) { setAltError(e.message); }
    finally { setAltLoading(false); }
  };

  const generateContent = async () => {
    setContentLoading(true); setContentError(''); setContentResult(null);
    try {
      const res = await fetch(`${API_BASE}/api/content/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify({ topic, grade_level: contentGrade, content_type: contentType, audience, tone, word_count: wordCount }),
      });
      const data = await res.json();
      if (res.status === 402) { setContentError(data.detail || 'Limit reached. Please upgrade your plan.'); return; }
      if (!res.ok) throw new Error(data.detail || 'Generation failed');
      setContentResult(data);
      fetchUsage(token);
    } catch (e: any) { setContentError(e.message); }
    finally { setContentLoading(false); }
  };

  const copyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(''), 2000);
  };

  /* ══════════════════════════════════════════════════════════════════════════
     AUTH SCREEN — split layout
  ══════════════════════════════════════════════════════════════════════════ */
  if (!user) return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── LEFT PANEL ── */}
      <div className="hidden lg:flex lg:w-[58%] flex-col justify-between relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #1e3a5f 100%)' }}>

        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #6366f1, transparent)', transform: 'translate(30%, -30%)' }} />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #3b82f6, transparent)', transform: 'translate(-30%, 30%)' }} />
          {/* grid lines */}
          <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Top brand */}
        <div className="relative z-10 p-10">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg"
              style={{ background: 'linear-gradient(135deg, #6366f1, #3b82f6)' }}>♿</div>
            <span className="font-bold text-white text-lg tracking-tight">DigiAgentix</span>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold mt-1"
            style={{ background: 'rgba(99,102,241,0.2)', border: '1px solid rgba(99,102,241,0.4)', color: '#a5b4fc' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            DIGIAGENTIX · EDU SUITE
          </div>
        </div>

        {/* Hero content */}
        <div className="relative z-10 px-10 pb-6 flex-1 flex flex-col justify-center">
          <h1 className="text-4xl xl:text-5xl font-extrabold text-white leading-tight mb-5">
            AI-Powered<br />
            <span style={{ background: 'linear-gradient(90deg, #818cf8, #38bdf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Accessible Content
            </span><br />
            for Education
          </h1>
          <p className="text-base mb-8 max-w-md leading-relaxed" style={{ color: '#94a3b8' }}>
            Generate WCAG 2.1 &amp; ADA compliant alt text and educational content for US schools,
            universities &amp; edtech — in seconds.
          </p>

          {/* Illustration — classroom/study scene with SVG */}
          <div className="relative mb-8 rounded-2xl overflow-hidden"
            style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', padding: '24px' }}>
            <div className="flex items-center gap-4">
              {/* Student avatars */}
              {[
                { emoji: '👩‍🎓', bg: '#4f46e5', label: 'Students' },
                { emoji: '👨‍🏫', bg: '#0891b2', label: 'Teachers' },
                { emoji: '♿', bg: '#059669', label: 'Accessible' },
                { emoji: '🏫', bg: '#7c3aed', label: 'Schools' },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center gap-1.5">
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-xl"
                    style={{ background: item.bg + '33', border: `1px solid ${item.bg}66` }}>
                    {item.emoji}
                  </div>
                  <span className="text-xs" style={{ color: '#64748b' }}>{item.label}</span>
                </div>
              ))}
              <div className="ml-auto text-right">
                <p className="text-xs mb-1" style={{ color: '#64748b' }}>Compliance</p>
                <div className="flex flex-col gap-1">
                  {['WCAG 2.1', 'ADA', 'Section 508'].map(s => (
                    <span key={s} className="text-xs px-2 py-0.5 rounded-full font-semibold"
                      style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' }}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: <Image className="w-4 h-4" />, text: 'Alt text under 200 chars', color: '#6366f1' },
              { icon: <Shield className="w-4 h-4" />, text: 'WCAG 1.4.1 no color rule', color: '#0ea5e9' },
              { icon: <BookOpen className="w-4 h-4" />, text: 'K-2 to Higher Ed content', color: '#10b981' },
              { icon: <Award className="w-4 h-4" />, text: 'Bias-free inclusive lang', color: '#f59e0b' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl"
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.06)' }}>
                <span style={{ color: f.color }}>{f.icon}</span>
                <span className="text-xs text-gray-300">{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="relative z-10 p-10 pt-0">
          <div className="flex items-center gap-6">
            {[
              { val: '5+5', label: 'Free Generations' },
              { val: '100%', label: 'WCAG Compliant' },
              { val: '3', label: 'Alt Variations' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-xl font-extrabold text-white">{s.val}</p>
                <p className="text-xs" style={{ color: '#64748b' }}>{s.label}</p>
              </div>
            ))}
            <div className="ml-auto flex items-center gap-1">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />)}
              <span className="text-xs ml-1" style={{ color: '#64748b' }}>5.0</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── RIGHT PANEL ── */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12"
        style={{ background: '#f8fafc' }}>
        <div className="w-full max-w-md">

          {/* Mobile brand */}
          <div className="lg:hidden flex items-center gap-2 justify-center mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base"
              style={{ background: 'linear-gradient(135deg, #6366f1, #3b82f6)' }}>♿</div>
            <span className="font-bold text-gray-800 text-lg">EduAccess AI</span>
          </div>

          {/* Badge */}
          <div className="hidden lg:flex items-center gap-1.5 text-xs font-semibold mb-4" style={{ color: '#6366f1' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
            DIGIAGENTIX · EDU SUITE
          </div>

          <h2 className="text-3xl font-extrabold mb-1 text-gray-900">
            {authMode === 'login' ? 'Welcome back' : authMode === 'register' ? 'Create account' : 'Reset password'}
          </h2>
          <p className="text-sm text-gray-500 mb-8">
            {authMode === 'login' ? 'Sign in to your workspace'
              : authMode === 'register' ? 'Start with 5 free alt texts + 5 content generations'
              : 'Enter your email and we\'ll send a reset link'}
          </p>

          {/* Tabs — hide on forgot mode */}
          {authMode !== 'forgot' && (
            <div className="flex rounded-xl p-1 mb-7" style={{ background: '#e2e8f0' }}>
              {(['login', 'register'] as const).map((m) => (
                <button key={m} onClick={() => { setAuthMode(m); setAuthError(''); setAuthSuccess(''); }}
                  className="flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all"
                  style={{
                    background: authMode === m ? 'white' : 'transparent',
                    color: authMode === m ? '#1e293b' : '#64748b',
                    boxShadow: authMode === m ? '0 1px 3px rgba(0,0,0,0.12)' : 'none',
                  }}>
                  {m === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              ))}
            </div>
          )}

          {/* ── FORGOT PASSWORD FORM ── */}
          {authMode === 'forgot' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="jane@school.edu"
                  className="w-full px-4 py-3 rounded-xl border text-gray-900 text-sm outline-none transition-all"
                  style={{ borderColor: '#e2e8f0', background: 'white' }}
                  onFocus={e => e.target.style.borderColor = '#6366f1'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  onKeyDown={e => e.key === 'Enter' && handleAuth()} />
              </div>

              {authError && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                  style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />{authError}
                </div>
              )}
              {authSuccess && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                  style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a' }}>
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />{authSuccess}
                </div>
              )}

              <button onClick={handleAuth} disabled={authLoading}
                className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all"
                style={{
                  background: authLoading ? '#a5b4fc' : 'linear-gradient(135deg, #6366f1, #3b82f6)',
                  boxShadow: authLoading ? 'none' : '0 4px 20px rgba(99,102,241,0.4)',
                }}>
                {authLoading
                  ? <span className="flex items-center justify-center gap-2"><RefreshCw className="w-4 h-4 animate-spin" /> Sending link...</span>
                  : 'Send Reset Link →'}
              </button>

              <button onClick={() => { setAuthMode('login'); setAuthError(''); setAuthSuccess(''); }}
                className="w-full py-2.5 rounded-xl text-sm font-medium transition-colors"
                style={{ color: '#6366f1', background: 'transparent' }}>
                ← Back to Sign In
              </button>
            </div>
          )}

          {/* ── LOGIN / REGISTER FORM ── */}
          {authMode !== 'forgot' && (
            <div className="space-y-4">
              {authMode === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                  <input value={form.full_name} onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
                    placeholder="Jane Smith"
                    className="w-full px-4 py-3 rounded-xl border text-gray-900 text-sm outline-none transition-all"
                    style={{ borderColor: '#e2e8f0', background: 'white' }}
                    onFocus={e => e.target.style.borderColor = '#6366f1'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'} />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Email Address</label>
                <input type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="jane@school.edu"
                  className="w-full px-4 py-3 rounded-xl border text-gray-900 text-sm outline-none transition-all"
                  style={{ borderColor: '#e2e8f0', background: 'white' }}
                  onFocus={e => e.target.style.borderColor = '#6366f1'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  onKeyDown={e => e.key === 'Enter' && handleAuth()} />
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  {authMode === 'login' && (
                    <button type="button"
                      onClick={() => { setAuthMode('forgot'); setAuthError(''); setAuthSuccess(''); }}
                      className="text-xs font-medium transition-colors hover:underline"
                      style={{ color: '#6366f1' }}>
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <input type={showPass ? 'text' : 'password'} value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    placeholder="Min 6 characters"
                    className="w-full px-4 py-3 pr-11 rounded-xl border text-gray-900 text-sm outline-none transition-all"
                    style={{ borderColor: '#e2e8f0', background: 'white' }}
                    onFocus={e => e.target.style.borderColor = '#6366f1'}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                    onKeyDown={e => e.key === 'Enter' && handleAuth()} />
                  <button type="button" onClick={() => setShowPass(v => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {authMode === 'register' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Confirm Password</label>
                  <div className="relative">
                    <input type={showConfirm ? 'text' : 'password'} value={form.confirm}
                      onChange={e => setForm(f => ({ ...f, confirm: e.target.value }))}
                      placeholder="Re-enter password"
                      className="w-full px-4 py-3 pr-11 rounded-xl border text-gray-900 text-sm outline-none transition-all"
                      style={{
                        borderColor: form.confirm && form.confirm !== form.password ? '#ef4444' : '#e2e8f0',
                        background: 'white',
                      }}
                      onFocus={e => { if (!(form.confirm && form.confirm !== form.password)) e.target.style.borderColor = '#6366f1'; }}
                      onBlur={e => { if (!(form.confirm && form.confirm !== form.password)) e.target.style.borderColor = '#e2e8f0'; }}
                      onKeyDown={e => e.key === 'Enter' && handleAuth()} />
                    <button type="button" onClick={() => setShowConfirm(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  {form.confirm && form.confirm !== form.password && (
                    <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
                  )}
                </div>
              )}

              {/* Error / Success */}
              {authError && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                  style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />{authError}
                </div>
              )}
              {authSuccess && (
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm"
                  style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', color: '#16a34a' }}>
                  <CheckCircle className="w-4 h-4 flex-shrink-0" />{authSuccess}
                </div>
              )}

              {/* Submit */}
              <button onClick={handleAuth} disabled={authLoading}
                className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all mt-2"
                style={{
                  background: authLoading ? '#a5b4fc' : 'linear-gradient(135deg, #6366f1, #3b82f6)',
                  boxShadow: authLoading ? 'none' : '0 4px 20px rgba(99,102,241,0.4)',
                }}>
                {authLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    {authMode === 'login' ? 'Signing in...' : 'Creating account...'}
                  </span>
                ) : authMode === 'login' ? 'Sign In →' : 'Create Account →'}
              </button>
            </div>
          )}

          {/* Free trial note */}
          {authMode === 'register' && (
            <div className="mt-5 flex items-center gap-2 text-xs text-gray-500 justify-center">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
              Free trial includes 5 alt texts + 5 content generations — no credit card required
            </div>
          )}

          {/* Pricing preview */}
          <div className="mt-8 rounded-2xl p-5" style={{ background: 'white', border: '1px solid #e2e8f0' }}>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4">Pricing Plans</p>
            <div className="space-y-3">
              {[
                { name: 'Free Trial', price: '$0', desc: '5 alt texts + 5 content', color: '#6366f1' },
                { name: 'Alt Text Only', price: '₹399/mo', desc: '100 alt text generations', color: '#0ea5e9' },
                { name: 'Full Access', price: '₹899/mo', desc: '100 alt texts + 100 content', color: '#10b981', popular: true },
                { name: 'Organization', price: 'Custom', desc: 'Unlimited — send query', color: '#f59e0b' },
              ].map((p) => (
                <div key={p.name} className="flex items-center justify-between py-2 border-b last:border-0" style={{ borderColor: '#f1f5f9' }}>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: p.color }} />
                    <span className="text-sm text-gray-700 font-medium">{p.name}</span>
                    {p.popular && <span className="text-xs px-1.5 py-0.5 rounded-full font-semibold"
                      style={{ background: '#f0fdf4', color: '#16a34a', border: '1px solid #bbf7d0' }}>Popular</span>}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-gray-900">{p.price}</p>
                    <p className="text-xs text-gray-400">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  /* ══════════════════════════════════════════════════════════════════════════
     TOOL SCREEN — after login
  ══════════════════════════════════════════════════════════════════════════ */
  return (
    <div className="min-h-screen" style={{ background: '#0a0f1e', fontFamily: "'Inter', sans-serif" }}>

      {/* ── TOP NAV ── */}
      <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b"
        style={{ background: 'rgba(10,15,30,0.95)', backdropFilter: 'blur(12px)', borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm"
            style={{ background: 'linear-gradient(135deg, #6366f1, #3b82f6)' }}>♿</div>
          <div>
            <span className="font-bold text-white text-sm">EduAccess AI</span>
            <span className="text-xs ml-2 px-2 py-0.5 rounded-full" style={{ background: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: '1px solid rgba(99,102,241,0.3)' }}>
              {user?.plan || 'free_trial'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {usage && (
            <div className="hidden md:flex items-center gap-3 text-xs" style={{ color: '#64748b' }}>
              <span>Alt: <b style={{ color: '#a5b4fc' }}>{usage.alt_text_remaining ?? '?'}</b> left</span>
              <span>Content: <b style={{ color: '#a5b4fc' }}>{usage.content_remaining ?? '?'}</b> left</span>
            </div>
          )}
          <div className="text-xs text-gray-400">{user?.email}</div>
          <button onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg transition-colors hover:bg-white/5 text-gray-400 hover:text-white">
            <LogOut className="w-3.5 h-3.5" /> Logout
          </button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-8">

        {/* ── USAGE BARS ── */}
        {usage && (
          <div className="mb-8 p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <div className="flex items-center gap-2 mb-4">
              <BarChart2 className="w-4 h-4" style={{ color: '#6366f1' }} />
              <span className="text-sm font-semibold text-white">Monthly Usage</span>
              <span className="text-xs ml-auto" style={{ color: '#475569' }}>Resets monthly</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8">
              <UsageBar label="Alt Text Generations"
                used={usage.alt_text_used ?? 0}
                limit={usage.alt_text_limit ?? 5} />
              <UsageBar label="Content Generations"
                used={usage.content_used ?? 0}
                limit={usage.content_limit ?? 5} />
            </div>
          </div>
        )}

        {/* ── TABS ── */}
        <div className="flex gap-2 mb-8">
          {[
            { id: 'alt-text', icon: <Image className="w-4 h-4" />, label: 'Alt Text Generator' },
            { id: 'content', icon: <FileText className="w-4 h-4" />, label: 'Content Writer' },
          ].map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id as any)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: activeTab === tab.id ? 'linear-gradient(135deg, #6366f1, #3b82f6)' : 'rgba(255,255,255,0.05)',
                color: activeTab === tab.id ? 'white' : '#64748b',
                border: `1px solid ${activeTab === tab.id ? 'transparent' : 'rgba(255,255,255,0.06)'}`,
                boxShadow: activeTab === tab.id ? '0 4px 20px rgba(99,102,241,0.3)' : 'none',
              }}>
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {/* ══════════════════════ ALT TEXT TAB ══════════════════════ */}
        {activeTab === 'alt-text' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Input */}
            <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 className="font-bold text-white mb-5 flex items-center gap-2">
                <Image className="w-4 h-4 text-indigo-400" /> Image Input
              </h3>

              {/* Upload area */}
              <div onClick={() => fileRef.current?.click()}
                className="border-2 border-dashed rounded-xl p-6 text-center cursor-pointer mb-4 transition-all hover:border-indigo-500/50"
                style={{ borderColor: imgPreview ? 'rgba(99,102,241,0.4)' : 'rgba(255,255,255,0.1)', background: 'rgba(255,255,255,0.02)' }}>
                {imgPreview ? (
                  <div className="relative">
                    <img src={imgPreview} alt="preview" className="max-h-36 mx-auto rounded-lg object-contain" />
                    <button onClick={e => { e.stopPropagation(); setImageFile(null); setImgPreview(''); }}
                      className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-500/80 text-white flex items-center justify-center text-xs">
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 mx-auto mb-2" style={{ color: '#475569' }} />
                    <p className="text-sm" style={{ color: '#64748b' }}>Click to upload image</p>
                    <p className="text-xs mt-1" style={{ color: '#334155' }}>PNG, JPG, GIF, WEBP</p>
                  </>
                )}
              </div>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />

              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <span className="text-xs" style={{ color: '#334155' }}>OR</span>
                <div className="flex-1 h-px" style={{ background: 'rgba(255,255,255,0.06)' }} />
              </div>

              <input value={imageUrl} onChange={e => { setImageUrl(e.target.value); setImageFile(null); setImgPreview(''); }}
                placeholder="Paste image URL..."
                className="w-full px-4 py-3 rounded-xl text-sm text-white mb-4 outline-none"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }} />

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="text-xs mb-1 block" style={{ color: '#64748b' }}>Grade Level</label>
                  <select value={gradeLevel} onChange={e => setGradeLevel(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {gradeLevels.map(g => <option key={g} value={g} style={{ background: '#1e293b' }}>{g}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs mb-1 block" style={{ color: '#64748b' }}>Subject (optional)</label>
                  <input value={subject} onChange={e => setSubject(e.target.value)}
                    placeholder="e.g. Science"
                    className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }} />
                </div>
              </div>

              <textarea value={context} onChange={e => setContext(e.target.value)} rows={2}
                placeholder="Additional context about this image (optional)..."
                className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none resize-none mb-4"
                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }} />

              <button onClick={generateAltText} disabled={altLoading || (!imageFile && !imageUrl)}
                className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
                style={{
                  background: altLoading || (!imageFile && !imageUrl) ? 'rgba(99,102,241,0.3)' : 'linear-gradient(135deg, #6366f1, #3b82f6)',
                  boxShadow: altLoading || (!imageFile && !imageUrl) ? 'none' : '0 4px 20px rgba(99,102,241,0.3)',
                }}>
                {altLoading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Generating...</> : <><Zap className="w-4 h-4" /> Generate Alt Text</>}
              </button>

              {altError && (
                <div className="mt-3 px-4 py-3 rounded-xl text-sm flex items-start gap-2"
                  style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}>
                  <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> {altError}
                </div>
              )}
            </div>

            {/* Results */}
            <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 className="font-bold text-white mb-5 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" /> Generated Alt Text
              </h3>

              {!altResult && !altLoading && (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
                    <Image className="w-7 h-7" style={{ color: '#6366f1' }} />
                  </div>
                  <p className="text-sm" style={{ color: '#475569' }}>Upload an image to generate<br />WCAG-compliant alt text</p>
                </div>
              )}

              {altLoading && (
                <div className="flex flex-col items-center justify-center h-64 gap-3">
                  <RefreshCw className="w-8 h-8 animate-spin" style={{ color: '#6366f1' }} />
                  <p className="text-sm" style={{ color: '#64748b' }}>Analyzing image with Claude AI...</p>
                </div>
              )}

              {altResult && (
                <div className="space-y-4 overflow-y-auto max-h-[520px] pr-1">
                  {/* Short alt */}
                  {altResult.short_alt && (
                    <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold" style={{ color: '#10b981' }}>SHORT ALT TEXT</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs" style={{ color: (altResult.short_alt.length > 200 ? '#ef4444' : '#64748b') }}>
                            {altResult.short_alt.length} chars
                          </span>
                          <button onClick={() => copyText(altResult.short_alt, 'short')}
                            className="text-gray-400 hover:text-white transition-colors">
                            {copied === 'short' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                          </button>
                        </div>
                      </div>
                      <p className="text-sm text-gray-200 leading-relaxed">"{altResult.short_alt}"</p>
                    </div>
                  )}

                  {/* Long description */}
                  {altResult.long_description && (
                    <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-semibold" style={{ color: '#6366f1' }}>LONG DESCRIPTION</span>
                        <button onClick={() => copyText(altResult.long_description, 'long')}
                          className="text-gray-400 hover:text-white transition-colors">
                          {copied === 'long' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                      <p className="text-sm text-gray-300 leading-relaxed">{altResult.long_description}</p>
                    </div>
                  )}

                  {/* Variations */}
                  {altResult.variations?.length > 0 && (
                    <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <span className="text-xs font-semibold block mb-3" style={{ color: '#f59e0b' }}>VARIATIONS</span>
                      <div className="space-y-2">
                        {altResult.variations.map((v: string, i: number) => (
                          <div key={i} className="flex items-start gap-2">
                            <span className="text-xs mt-0.5 flex-shrink-0" style={{ color: '#475569' }}>#{i + 1}</span>
                            <p className="text-sm text-gray-300 leading-relaxed flex-1">"{v}"</p>
                            <button onClick={() => copyText(v, `var${i}`)} className="text-gray-400 hover:text-white transition-colors flex-shrink-0">
                              {copied === `var${i}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* WCAG badge */}
                  {altResult.wcag_compliant !== undefined && (
                    <div className="flex items-center gap-2 px-3 py-2 rounded-lg"
                      style={{ background: altResult.wcag_compliant ? 'rgba(16,185,129,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${altResult.wcag_compliant ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)'}` }}>
                      {altResult.wcag_compliant ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <AlertCircle className="w-4 h-4 text-red-400" />}
                      <span className="text-xs" style={{ color: altResult.wcag_compliant ? '#34d399' : '#f87171' }}>
                        {altResult.wcag_compliant ? 'WCAG 2.1 AA Compliant' : 'Review for WCAG compliance'}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════════════════════ CONTENT TAB ══════════════════════ */}
        {activeTab === 'content' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Input */}
            <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 className="font-bold text-white mb-5 flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-400" /> Content Settings
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="text-xs mb-1.5 block font-medium" style={{ color: '#64748b' }}>Topic / Title</label>
                  <input value={topic} onChange={e => setTopic(e.target.value)}
                    placeholder="e.g. The Water Cycle for Middle School Students"
                    className="w-full px-4 py-3 rounded-xl text-sm text-white outline-none"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }} />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs mb-1.5 block font-medium" style={{ color: '#64748b' }}>Content Type</label>
                    <select value={contentType} onChange={e => setContentType(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {['blog_post', 'lesson_plan', 'course_material', 'website_page', 'quiz', 'summary'].map(t => (
                        <option key={t} value={t} style={{ background: '#1e293b' }}>{t.replace(/_/g, ' ')}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs mb-1.5 block font-medium" style={{ color: '#64748b' }}>Grade Level</label>
                    <select value={contentGrade} onChange={e => setContentGrade(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {gradeLevels.map(g => <option key={g} value={g} style={{ background: '#1e293b' }}>{g}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs mb-1.5 block font-medium" style={{ color: '#64748b' }}>Audience</label>
                    <select value={audience} onChange={e => setAudience(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {['students', 'teachers', 'parents', 'general'].map(a => (
                        <option key={a} value={a} style={{ background: '#1e293b' }}>{a}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs mb-1.5 block font-medium" style={{ color: '#64748b' }}>Tone</label>
                    <select value={tone} onChange={e => setTone(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl text-sm text-white outline-none"
                      style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      {['friendly', 'formal', 'neutral'].map(t => (
                        <option key={t} value={t} style={{ background: '#1e293b' }}>{t}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-xs mb-1.5 block font-medium flex justify-between" style={{ color: '#64748b' }}>
                    <span>Word Count</span>
                    <span style={{ color: '#a5b4fc' }}>{wordCount} words</span>
                  </label>
                  <input type="range" min={100} max={1000} step={50} value={wordCount}
                    onChange={e => setWordCount(+e.target.value)}
                    className="w-full accent-indigo-500" />
                  <div className="flex justify-between text-xs mt-1" style={{ color: '#334155' }}>
                    <span>100</span><span>1000</span>
                  </div>
                </div>

                <button onClick={generateContent} disabled={contentLoading || !topic.trim()}
                  className="w-full py-3.5 rounded-xl text-white font-semibold text-sm transition-all flex items-center justify-center gap-2"
                  style={{
                    background: contentLoading || !topic.trim() ? 'rgba(99,102,241,0.3)' : 'linear-gradient(135deg, #6366f1, #3b82f6)',
                    boxShadow: contentLoading || !topic.trim() ? 'none' : '0 4px 20px rgba(99,102,241,0.3)',
                  }}>
                  {contentLoading ? <><RefreshCw className="w-4 h-4 animate-spin" /> Generating...</> : <><Zap className="w-4 h-4" /> Generate Content</>}
                </button>

                {contentError && (
                  <div className="px-4 py-3 rounded-xl text-sm flex items-start gap-2"
                    style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5' }}>
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" /> {contentError}
                  </div>
                )}
              </div>
            </div>

            {/* Result */}
            <div className="rounded-2xl p-6" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
              <h3 className="font-bold text-white mb-5 flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" /> Generated Content
              </h3>

              {!contentResult && !contentLoading && (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
                    style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
                    <BookOpen className="w-7 h-7" style={{ color: '#6366f1' }} />
                  </div>
                  <p className="text-sm" style={{ color: '#475569' }}>Enter a topic to generate<br />accessible educational content</p>
                </div>
              )}

              {contentLoading && (
                <div className="flex flex-col items-center justify-center h-64 gap-3">
                  <RefreshCw className="w-8 h-8 animate-spin" style={{ color: '#6366f1' }} />
                  <p className="text-sm" style={{ color: '#64748b' }}>Writing content with Claude AI...</p>
                </div>
              )}

              {contentResult && (
                <div className="space-y-4 overflow-y-auto max-h-[520px] pr-1">
                  {contentResult.title && (
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-white text-lg">{contentResult.title}</h4>
                      {contentResult.accessibility_score && (
                        <span className="text-xs px-2 py-1 rounded-full font-bold"
                          style={{ background: 'rgba(16,185,129,0.15)', color: '#34d399', border: '1px solid rgba(16,185,129,0.3)' }}>
                          {contentResult.accessibility_score}
                        </span>
                      )}
                    </div>
                  )}

                  {contentResult.meta_description && (
                    <p className="text-xs italic" style={{ color: '#64748b' }}>{contentResult.meta_description}</p>
                  )}

                  <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-semibold" style={{ color: '#6366f1' }}>CONTENT</span>
                      <button onClick={() => {
                        const full = contentResult.sections?.length
                          ? contentResult.sections.map((s: any) => `${s.heading}\n\n${s.content}`).join('\n\n')
                          : contentResult.content || contentResult.body || '';
                        copyText(full, 'content');
                      }}
                        className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors hover:bg-white/5"
                        style={{ color: '#64748b' }}>
                        {copied === 'content' ? <><Check className="w-3 h-3 text-emerald-400" /> Copied!</> : <><Copy className="w-3 h-3" /> Copy All</>}
                      </button>
                    </div>
                    {contentResult.sections?.length > 0 ? (
                      <div className="space-y-4">
                        {contentResult.sections.map((s: any, i: number) => (
                          <div key={i}>
                            {s.heading && <h4 className="text-sm font-semibold text-white mb-1">{s.heading}</h4>}
                            <p className="text-sm leading-relaxed" style={{ color: '#cbd5e1' }}>{s.content}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-sm leading-relaxed whitespace-pre-wrap" style={{ color: '#cbd5e1' }}>
                        {contentResult.content || contentResult.body}
                      </div>
                    )}
                  </div>

                  {/* Key takeaways */}
                  {contentResult.key_takeaways?.length > 0 && (
                    <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
                      <span className="text-xs font-semibold block mb-2" style={{ color: '#f59e0b' }}>KEY TAKEAWAYS</span>
                      <ul className="space-y-1.5">
                        {contentResult.key_takeaways.map((t: string, i: number) => (
                          <li key={i} className="flex items-start gap-2 text-xs text-gray-300">
                            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />{t}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Meta description */}
                  {contentResult.meta_description && (
                    <div className="p-3 rounded-xl flex items-start gap-2" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}>
                      <span className="text-xs font-semibold text-indigo-400 flex-shrink-0 mt-0.5">META:</span>
                      <p className="text-xs text-gray-400 leading-relaxed flex-1">{contentResult.meta_description}</p>
                      <button onClick={() => copyText(contentResult.meta_description, 'meta')} className="flex-shrink-0 text-gray-500 hover:text-white">
                        {copied === 'meta' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      </button>
                    </div>
                  )}

                  {contentResult.word_count && (
                    <div className="flex items-center gap-4 text-xs" style={{ color: '#475569' }}>
                      <span>Words: <b style={{ color: '#94a3b8' }}>{contentResult.word_count}</b></span>
                      {contentResult.reading_level && <span>Level: <b style={{ color: '#94a3b8' }}>{contentResult.reading_level}</b></span>}
                      {contentResult.bias_check && <span style={{ color: '#34d399' }}>✓ {contentResult.bias_check}</span>}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function EduAccessAIPage() {
  return (
    <ErrorBoundary>
      <EduAccessAIPageInner />
    </ErrorBoundary>
  );
}
