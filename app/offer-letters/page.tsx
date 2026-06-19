'use client';
import { useState, useEffect } from 'react';

interface OfferLetter {
  id: string;
  candidate_name: string;
  email: string;
  role: string;
  department: string;
  start_date: string;
  end_date: string;
  duration: string;
  mode: string;
  status: string;
  issued_date: string;
}

const ROLES = [
  'Web Development Intern',
  'AI/ML Intern',
  'Digital Marketing Intern',
  'SEO Intern',
  'Social Media Intern',
  'Graphic Design Intern',
  'Content Writing Intern',
  'Business Development Intern',
  'Data Analytics Intern',
  'Full Stack Development Intern',
];

const EMPTY_FORM = {
  candidate_name: '', email: '', phone: '',
  role: '', department: '',
  start_date: '', end_date: '', duration: '',
  stipend: '', mode: 'Remote',
  working_hours: '4–6 hours/day, Monday to Friday',
  reporting_to: 'Team Lead',
  issued_date: new Date().toISOString().split('T')[0],
};

export default function OfferLettersPage() {
  const [token, setToken]           = useState('');
  const [authMode, setAuthMode]     = useState<'login' | 'signup'>('login');
  const [authForm, setAuthForm]     = useState({ email: '', password: '', name: '', firm: '' });
  const [authError, setAuthError]   = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [letters, setLetters]       = useState<OfferLetter[]>([]);
  const [form, setForm]             = useState({ ...EMPTY_FORM });
  const [issuing, setIssuing]       = useState(false);
  const [issueMsg, setIssueMsg]     = useState('');
  const [loading, setLoading]       = useState(false);
  const [newOffer, setNewOffer]     = useState<OfferLetter | null>(null);
  const [revoking, setRevoking]     = useState('');
  const [search, setSearch]         = useState('');

  useEffect(() => {
    const t = localStorage.getItem('cert_token');
    if (t) { setToken(t); fetchLetters(t); }
  }, []);

  async function fetchLetters(t = token) {
    setLoading(true);
    try {
      const res = await fetch('/api/offer-letters', { headers: { Authorization: `Bearer ${t}` } });
      if (res.ok) setLetters(await res.json());
    } catch { /* ignore */ }
    setLoading(false);
  }

  async function doAuth() {
    setAuthLoading(true); setAuthError('');
    const url = authMode === 'login' ? '/api/auth/login' : '/api/auth/signup';
    const body: Record<string, string> = { email: authForm.email, password: authForm.password };
    if (authMode === 'signup') { body.name = authForm.name; body.firm = authForm.firm; }
    try {
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) { setAuthError(data.detail || 'Authentication failed'); return; }
      localStorage.setItem('cert_token', data.token);
      setToken(data.token);
      fetchLetters(data.token);
    } catch { setAuthError('Connection error. Please try again.'); }
    setAuthLoading(false);
  }

  async function issueOffer() {
    setIssuing(true); setIssueMsg(''); setNewOffer(null);
    try {
      const res = await fetch('/api/offer-letters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) { setIssueMsg(data.detail || 'Failed to issue offer letter'); }
      else {
        setNewOffer(data);
        setForm({ ...EMPTY_FORM });
        fetchLetters();
        setIssueMsg('✅ Offer letter issued successfully!');
      }
    } catch { setIssueMsg('Connection error. Please try again.'); }
    setIssuing(false);
  }

  async function revoke(id: string) {
    if (!confirm(`Revoke offer letter ${id}? This cannot be undone.`)) return;
    setRevoking(id);
    await fetch(`/api/offer-letters/${id}/revoke`, {
      method: 'PUT', headers: { Authorization: `Bearer ${token}` },
    });
    fetchLetters();
    setRevoking('');
  }

  const f = (k: keyof typeof form, v: string) => setForm(prev => ({ ...prev, [k]: v }));
  const filtered = letters.filter(l =>
    l.candidate_name.toLowerCase().includes(search.toLowerCase()) ||
    l.id.toLowerCase().includes(search.toLowerCase()) ||
    l.role.toLowerCase().includes(search.toLowerCase())
  );

  // ── Login ────────────────────────────────────────────────────────────────
  if (!token) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-3xl font-black text-white">Digi<span className="text-blue-400">Agentix</span></div>
          <p className="text-slate-400 text-sm mt-1">Offer Letter Portal</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex mb-5 bg-white/5 rounded-xl p-1">
            {(['login', 'signup'] as const).map(m => (
              <button key={m} onClick={() => setAuthMode(m)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition capitalize ${authMode === m ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                {m === 'login' ? 'Login' : 'Sign Up'}
              </button>
            ))}
          </div>
          {authMode === 'signup' && <>
            <input placeholder="Full Name" value={authForm.name} onChange={e => setAuthForm({ ...authForm, name: e.target.value })} className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm mb-3 focus:outline-none focus:border-blue-400" />
            <input placeholder="Firm / Organization" value={authForm.firm} onChange={e => setAuthForm({ ...authForm, firm: e.target.value })} className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm mb-3 focus:outline-none focus:border-blue-400" />
          </>}
          <input placeholder="Email" type="email" value={authForm.email} onChange={e => setAuthForm({ ...authForm, email: e.target.value })} className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm mb-3 focus:outline-none focus:border-blue-400" />
          <input placeholder="Password" type="password" value={authForm.password} onChange={e => setAuthForm({ ...authForm, password: e.target.value })} onKeyDown={e => e.key === 'Enter' && doAuth()} className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm mb-4 focus:outline-none focus:border-blue-400" />
          {authError && <p className="text-red-400 text-xs mb-3">{authError}</p>}
          <button onClick={doAuth} disabled={authLoading} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold text-sm transition disabled:opacity-50">
            {authLoading ? 'Please wait...' : authMode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  );

  // ── Dashboard ────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">

      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <div className="text-xl font-black">Digi<span className="text-blue-400">Agentix</span></div>
          <p className="text-slate-500 text-xs">Offer Letter Portal</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/certificates" className="text-slate-400 hover:text-white text-xs border border-white/10 px-3 py-1.5 rounded-lg transition">
            🎓 Certificates
          </a>
          <button onClick={() => { localStorage.removeItem('cert_token'); setToken(''); setLetters([]); }}
            className="text-slate-400 hover:text-white text-sm transition border border-white/10 px-3 py-1.5 rounded-lg">
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Issue Form ── */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl sticky top-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">📄 Issue Offer Letter</h2>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Candidate Name *</label>
                <input placeholder="e.g. Rahul Sharma" value={form.candidate_name} onChange={e => f('candidate_name', e.target.value)}
                  className="w-full bg-white/10 border border-white/15 text-white placeholder-slate-600 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Internship Role *</label>
                <select value={form.role} onChange={e => f('role', e.target.value)}
                  className="w-full bg-slate-800 border border-white/15 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400">
                  <option value="">Select role...</option>
                  {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Department</label>
                <input placeholder="e.g. Technology" value={form.department} onChange={e => f('department', e.target.value)}
                  className="w-full bg-white/10 border border-white/15 text-white placeholder-slate-600 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 text-xs mb-1 block">Start Date *</label>
                  <input type="date" value={form.start_date} onChange={e => f('start_date', e.target.value)}
                    className="w-full bg-white/10 border border-white/15 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="text-slate-400 text-xs mb-1 block">End Date</label>
                  <input type="date" value={form.end_date} onChange={e => f('end_date', e.target.value)}
                    className="w-full bg-white/10 border border-white/15 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400" />
                </div>
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Duration</label>
                <input placeholder="e.g. 3 months" value={form.duration} onChange={e => f('duration', e.target.value)}
                  className="w-full bg-white/10 border border-white/15 text-white placeholder-slate-600 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Mode</label>
                <select value={form.mode} onChange={e => f('mode', e.target.value)}
                  className="w-full bg-slate-800 border border-white/15 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400">
                  <option>Remote</option>
                  <option>On-site</option>
                  <option>Hybrid</option>
                </select>
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Stipend <span className="text-slate-600">(leave blank if unpaid)</span></label>
                <input placeholder="e.g. ₹5,000/month" value={form.stipend} onChange={e => f('stipend', e.target.value)}
                  className="w-full bg-white/10 border border-white/15 text-white placeholder-slate-600 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Working Hours</label>
                <input value={form.working_hours} onChange={e => f('working_hours', e.target.value)}
                  className="w-full bg-white/10 border border-white/15 text-white placeholder-slate-600 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Reporting To</label>
                <input value={form.reporting_to} onChange={e => f('reporting_to', e.target.value)}
                  className="w-full bg-white/10 border border-white/15 text-white placeholder-slate-600 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Email</label>
                <input type="email" placeholder="candidate@email.com" value={form.email} onChange={e => f('email', e.target.value)}
                  className="w-full bg-white/10 border border-white/15 text-white placeholder-slate-600 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Phone</label>
                <input placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={e => f('phone', e.target.value)}
                  className="w-full bg-white/10 border border-white/15 text-white placeholder-slate-600 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">📅 Date of Issue</label>
                <input type="date" value={form.issued_date} onChange={e => f('issued_date', e.target.value)}
                  className="w-full bg-white/10 border border-white/15 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400" />
              </div>
            </div>

            {issueMsg && (
              <p className={`text-xs mt-3 ${issueMsg.startsWith('✅') ? 'text-green-400' : 'text-red-400'}`}>{issueMsg}</p>
            )}

            <button
              onClick={issueOffer}
              disabled={issuing || !form.candidate_name || !form.role || !form.start_date}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold text-sm transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {issuing ? 'Issuing...' : '📄 Issue Offer Letter'}
            </button>

            {newOffer && (
              <div className="mt-4 bg-green-950/50 border border-green-500/25 rounded-xl p-4">
                <p className="text-green-400 text-xs font-bold mb-1">Offer Letter Ready!</p>
                <p className="text-white text-sm font-mono font-bold">{newOffer.id}</p>
                <p className="text-slate-400 text-xs mb-3">{newOffer.candidate_name} · {newOffer.role}</p>
                <a
                  href={`/offer-letter-preview?id=${newOffer.id}`}
                  target="_blank"
                  className="block w-full bg-amber-600 hover:bg-amber-500 text-white py-2 rounded-lg text-xs font-bold text-center transition">
                  📄 Preview & Download PDF
                </a>
              </div>
            )}
          </div>
        </div>

        {/* ── List ── */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">📋 Issued Offer Letters <span className="text-slate-500 font-normal text-sm">({letters.length})</span></h2>
            <button onClick={() => fetchLetters()} className="text-slate-400 hover:text-white text-xs border border-white/10 px-3 py-1.5 rounded-lg transition">
              ↻ Refresh
            </button>
          </div>

          <input
            placeholder="Search by name, ID, or role..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm mb-4 focus:outline-none focus:border-blue-400"
          />

          {loading && <div className="text-slate-500 text-sm text-center py-12 animate-pulse">Loading offer letters...</div>}

          {!loading && filtered.length === 0 && (
            <div className="text-center py-16 text-slate-600">
              <div className="text-4xl mb-3">📄</div>
              <p className="text-sm">{search ? 'No offer letters match your search.' : 'No offer letters issued yet.'}</p>
            </div>
          )}

          <div className="space-y-3">
            {filtered.map(letter => (
              <div key={letter.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${letter.status === 'Active' ? 'bg-green-400' : 'bg-red-400'}`} />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-semibold text-sm">{letter.candidate_name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${letter.status === 'Active' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                      {letter.status}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-blue-900/40 text-blue-300">{letter.mode}</span>
                  </div>
                  <p className="text-slate-400 text-xs mt-0.5">{letter.role}{letter.department ? ` · ${letter.department}` : ''}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-slate-500 text-xs font-mono">{letter.id}</span>
                    {letter.start_date && <span className="text-slate-600 text-xs">{letter.start_date}{letter.end_date ? ` → ${letter.end_date}` : ''}</span>}
                  </div>
                </div>

                <div className="flex gap-2 flex-shrink-0">
                  <a
                    href={`/offer-letter-preview?id=${letter.id}`}
                    target="_blank"
                    title="Preview & Download PDF"
                    className="bg-amber-600/20 hover:bg-amber-600/40 border border-amber-500/20 text-amber-400 px-3 py-2 rounded-lg text-xs font-semibold transition">
                    📄 PDF
                  </a>
                  {letter.status === 'Active' && (
                    <button
                      onClick={() => revoke(letter.id)}
                      disabled={revoking === letter.id}
                      title="Revoke offer letter"
                      className="bg-red-900/20 hover:bg-red-900/40 border border-red-500/20 text-red-400 px-3 py-2 rounded-lg text-xs transition disabled:opacity-50">
                      {revoking === letter.id ? '...' : '✕'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
