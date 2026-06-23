'use client';
import { useState, useEffect, useRef } from 'react';

const API = '';

interface Cert {
  id: string;
  student_name: string;
  email: string;
  internship_role: string;
  department: string;
  duration: string;
  issued_date: string;
  status: string;
}

const FILING_ROLES = [
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
  student_name: '', email: '', phone: '',
  internship_role: '', department: '', duration: '',
  start_date: '', end_date: '',
  issued_date: new Date().toISOString().split('T')[0],
  custom_id: '',
};

export default function CertificatesPage() {
  const [token, setToken] = useState('');
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authForm, setAuthForm] = useState({ email: '', password: '', name: '', firm: '' });
  const [authError, setAuthError] = useState('');
  const [authLoading, setAuthLoading] = useState(false);

  const [certs, setCerts] = useState<Cert[]>([]);
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [issuing, setIssuing] = useState(false);
  const [issueMsg, setIssueMsg] = useState('');
  const [loadingCerts, setLoadingCerts] = useState(false);
  const [qrModal, setQrModal] = useState<Cert | null>(null);
  const [revoking, setRevoking] = useState('');
  const [search, setSearch] = useState('');
  const [newCert, setNewCert] = useState<Cert | null>(null);

  useEffect(() => {
    const t = localStorage.getItem('cert_token');
    if (t) { setToken(t); fetchCerts(t); }
  }, []);

  async function fetchCerts(t = token) {
    setLoadingCerts(true);
    try {
      const res = await fetch(`/api/certs`, { headers: { Authorization: `Bearer ${t}` } });
      if (res.ok) setCerts(await res.json());
    } catch { /* ignore */ }
    setLoadingCerts(false);
  }

  async function doAuth() {
    setAuthLoading(true); setAuthError('');
    const url = authMode === 'login' ? `/api/auth/login` : `/api/auth/signup`;
    const body: Record<string, string> = { email: authForm.email, password: authForm.password };
    if (authMode === 'signup') { body.name = authForm.name; body.firm = authForm.firm; }
    try {
      const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json();
      if (!res.ok) { setAuthError(data.detail || 'Authentication failed'); return; }
      localStorage.setItem('cert_token', data.token);
      setToken(data.token);
      fetchCerts(data.token);
    } catch { setAuthError('Connection error. Please try again.'); }
    setAuthLoading(false);
  }

  async function issueCert() {
    setIssuing(true); setIssueMsg(''); setNewCert(null);
    try {
      const res = await fetch(`/api/certs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        body: JSON.stringify(form),
      });
      let data: Record<string, string> = {};
      try { data = await res.json(); } catch { /* non-json body */ }
      if (!res.ok) { setIssueMsg(data.detail || `Error ${res.status}: ${res.statusText}`); }
      else {
        setNewCert(data as unknown as Cert);
        setForm({ ...EMPTY_FORM });
        fetchCerts();
        setIssueMsg('✅ Certificate issued successfully!');
      }
    } catch (e: unknown) {
      setIssueMsg('Error: ' + (e instanceof Error ? e.message : String(e)));
    }
    setIssuing(false);
  }

  async function revoke(id: string) {
    if (!confirm(`Revoke certificate ${id}? This cannot be undone.`)) return;
    setRevoking(id);
    await fetch(`/api/certs/${id}/revoke`, {
      method: 'PUT', headers: { Authorization: `Bearer ${token}` }
    });
    fetchCerts();
    setRevoking('');
  }

  const filtered = certs.filter(c =>
    c.student_name.toLowerCase().includes(search.toLowerCase()) ||
    c.id.toLowerCase().includes(search.toLowerCase()) ||
    c.internship_role.toLowerCase().includes(search.toLowerCase())
  );

  const verifyUrl = (id: string) => `https://digiagentix.com/verify?id=${id}`;

  // ── Login screen ──────────────────────────────────────────────────────────
  if (!token) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-3xl font-black text-white">Digi<span className="text-blue-400">Agentix</span></div>
          <p className="text-slate-400 text-sm mt-1">Certificate Management Portal</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl">
          <div className="flex mb-5 bg-white/5 rounded-xl p-1">
            {(['login','signup'] as const).map(m => (
              <button key={m} onClick={() => setAuthMode(m)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold transition capitalize ${authMode === m ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                {m === 'login' ? 'Login' : 'Sign Up'}
              </button>
            ))}
          </div>
          {authMode === 'signup' && <>
            <input placeholder="Full Name" value={authForm.name} onChange={e => setAuthForm({...authForm, name: e.target.value})} className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm mb-3 focus:outline-none focus:border-blue-400" />
            <input placeholder="Firm / Organization" value={authForm.firm} onChange={e => setAuthForm({...authForm, firm: e.target.value})} className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm mb-3 focus:outline-none focus:border-blue-400" />
          </>}
          <input placeholder="Email" type="email" value={authForm.email} onChange={e => setAuthForm({...authForm, email: e.target.value})} className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm mb-3 focus:outline-none focus:border-blue-400" />
          <input placeholder="Password" type="password" value={authForm.password} onChange={e => setAuthForm({...authForm, password: e.target.value})} onKeyDown={e => e.key === 'Enter' && doAuth()} className="w-full bg-white/10 border border-white/20 text-white placeholder-slate-500 rounded-xl px-4 py-3 text-sm mb-4 focus:outline-none focus:border-blue-400" />
          {authError && <p className="text-red-400 text-xs mb-3">{authError}</p>}
          <button onClick={doAuth} disabled={authLoading} className="w-full bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold text-sm transition disabled:opacity-50">
            {authLoading ? 'Please wait...' : authMode === 'login' ? 'Login' : 'Create Account'}
          </button>
        </div>
      </div>
    </div>
  );

  // ── Main dashboard ────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">

      {/* Header */}
      <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div>
          <div className="text-xl font-black">Digi<span className="text-blue-400">Agentix</span></div>
          <p className="text-slate-500 text-xs">Certificate Management Portal</p>
        </div>
        <button onClick={() => { localStorage.removeItem('cert_token'); setToken(''); setCerts([]); }}
          className="text-slate-400 hover:text-white text-sm transition border border-white/10 px-3 py-1.5 rounded-lg">
          Logout
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Issue Certificate Form ── */}
        <div className="lg:col-span-1">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-5 shadow-xl sticky top-6">
            <h2 className="text-lg font-bold mb-4 flex items-center gap-2">🎓 Issue Certificate</h2>

            <div className="space-y-3">
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Student Name *</label>
                <input placeholder="e.g. Rahul Sharma" value={form.student_name}
                  onChange={e => setForm({...form, student_name: e.target.value})}
                  className="w-full bg-white/10 border border-white/15 text-white placeholder-slate-600 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Internship Role *</label>
                <select value={form.internship_role} onChange={e => setForm({...form, internship_role: e.target.value})}
                  className="w-full bg-slate-800 border border-white/15 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400">
                  <option value="">Select role...</option>
                  {FILING_ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Department</label>
                <input placeholder="e.g. Technology" value={form.department}
                  onChange={e => setForm({...form, department: e.target.value})}
                  className="w-full bg-white/10 border border-white/15 text-white placeholder-slate-600 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Duration *  (displayed on certificate)</label>
                <input placeholder="e.g. 1 June 2025 – 31 August 2025" value={form.duration}
                  onChange={e => setForm({...form, duration: e.target.value})}
                  className="w-full bg-white/10 border border-white/15 text-white placeholder-slate-600 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 text-xs mb-1 block">Start Date</label>
                  <input type="date" value={form.start_date}
                    onChange={e => setForm({...form, start_date: e.target.value})}
                    className="w-full bg-white/10 border border-white/15 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400" />
                </div>
                <div>
                  <label className="text-slate-400 text-xs mb-1 block">End Date</label>
                  <input type="date" value={form.end_date}
                    onChange={e => setForm({...form, end_date: e.target.value})}
                    className="w-full bg-white/10 border border-white/15 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400" />
                </div>
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Email</label>
                <input type="email" placeholder="student@email.com" value={form.email}
                  onChange={e => setForm({...form, email: e.target.value})}
                  className="w-full bg-white/10 border border-white/15 text-white placeholder-slate-600 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">Phone</label>
                <input placeholder="+91 XXXXX XXXXX" value={form.phone}
                  onChange={e => setForm({...form, phone: e.target.value})}
                  className="w-full bg-white/10 border border-white/15 text-white placeholder-slate-600 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">📅 Date of Issue</label>
                <input type="date" value={form.issued_date}
                  onChange={e => setForm({...form, issued_date: e.target.value})}
                  className="w-full bg-white/10 border border-white/15 text-white rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-blue-400" />
              </div>
              <div>
                <label className="text-slate-400 text-xs mb-1 block">🔁 Custom ID <span className="text-slate-600">(only for re-issuing old certs)</span></label>
                <input placeholder="e.g. DAGI-WSWP0M70" value={form.custom_id}
                  onChange={e => setForm({...form, custom_id: e.target.value})}
                  className="w-full bg-white/10 border border-white/15 text-white placeholder-slate-600 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-amber-400 font-mono" />
              </div>
            </div>

            {issueMsg && (
              <p className={`text-xs mt-3 ${issueMsg.startsWith('✅') ? 'text-green-400' : 'text-red-400'}`}>
                {issueMsg}
              </p>
            )}

            <button
              onClick={issueCert}
              disabled={issuing || !form.student_name || !form.internship_role || !form.duration}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-500 text-white py-3 rounded-xl font-semibold text-sm transition disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {issuing ? 'Issuing...' : '🎓 Issue Certificate'}
            </button>

            {/* Newly issued cert quick actions */}
            {newCert && (
              <div className="mt-4 bg-green-950/50 border border-green-500/25 rounded-xl p-4">
                <p className="text-green-400 text-xs font-bold mb-1">Certificate Ready!</p>
                <p className="text-white text-sm font-mono font-bold">{newCert.id}</p>
                <p className="text-slate-400 text-xs mb-3">{newCert.student_name} · {newCert.internship_role}</p>
                <div className="flex flex-col gap-2">
                  <a
                    href={`/certificate-preview?id=${newCert.id}`}
                    target="_blank"
                    className="w-full bg-amber-600 hover:bg-amber-500 text-white py-2 rounded-lg text-xs font-bold text-center transition">
                    📄 Generate & Download Certificate
                  </a>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setQrModal(newCert as unknown as Cert)}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-xs font-semibold transition">
                      📱 QR Code
                    </button>
                    <button
                      onClick={() => { navigator.clipboard.writeText(verifyUrl(newCert.id)); }}
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-xs font-semibold transition">
                      🔗 Copy URL
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ── Certificate List ── */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold">📋 Issued Certificates <span className="text-slate-500 font-normal text-sm">({certs.length})</span></h2>
            <button onClick={() => fetchCerts()} className="text-slate-400 hover:text-white text-xs border border-white/10 px-3 py-1.5 rounded-lg transition">
              ↻ Refresh
            </button>
          </div>

          <input
            placeholder="Search by name, ID, or role..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-600 rounded-xl px-4 py-3 text-sm mb-4 focus:outline-none focus:border-blue-400"
          />

          {loadingCerts && (
            <div className="text-slate-500 text-sm text-center py-12 animate-pulse">Loading certificates...</div>
          )}

          {!loadingCerts && filtered.length === 0 && (
            <div className="text-center py-16 text-slate-600">
              <div className="text-4xl mb-3">🎓</div>
              <p className="text-sm">{search ? 'No certificates match your search.' : 'No certificates issued yet.'}</p>
            </div>
          )}

          <div className="space-y-3">
            {filtered.map(cert => (
              <div key={cert.id} className="bg-white/5 border border-white/10 rounded-xl p-4 flex items-center gap-4">

                {/* Status dot */}
                <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${cert.status === 'Active' ? 'bg-green-400' : 'bg-red-400'}`} />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-semibold text-sm">{cert.student_name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${cert.status === 'Active' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                      {cert.status}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mt-0.5">{cert.internship_role}{cert.department ? ` · ${cert.department}` : ''}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-slate-500 text-xs font-mono">{cert.id}</span>
                    <span className="text-slate-600 text-xs">{cert.duration}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 flex-shrink-0">
                  <a
                    href={`/certificate-preview?id=${cert.id}`}
                    target="_blank"
                    title="Generate & Download Certificate PDF"
                    className="bg-amber-600/20 hover:bg-amber-600/40 border border-amber-500/20 text-amber-400 px-3 py-2 rounded-lg text-xs font-semibold transition">
                    📄 Cert
                  </a>
                  <button
                    onClick={() => setQrModal(cert)}
                    title="View QR Code"
                    className="bg-blue-600/20 hover:bg-blue-600/40 border border-blue-500/20 text-blue-400 px-3 py-2 rounded-lg text-xs font-semibold transition">
                    📱 QR
                  </button>
                  <button
                    onClick={() => { navigator.clipboard.writeText(verifyUrl(cert.id)); }}
                    title="Copy verification URL"
                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white px-3 py-2 rounded-lg text-xs transition">
                    🔗
                  </button>
                  <a
                    href={`/verify?id=${cert.id}`}
                    target="_blank"
                    title="Open verification page"
                    className="bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white px-3 py-2 rounded-lg text-xs transition">
                    ↗
                  </a>
                  {cert.status === 'Active' && (
                    <button
                      onClick={() => revoke(cert.id)}
                      disabled={revoking === cert.id}
                      title="Revoke certificate"
                      className="bg-red-900/20 hover:bg-red-900/40 border border-red-500/20 text-red-400 px-3 py-2 rounded-lg text-xs transition disabled:opacity-50">
                      {revoking === cert.id ? '...' : '✕'}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── QR Code Modal ── */}
      {qrModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setQrModal(null)}>
          <div className="bg-slate-900 border border-white/15 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-lg">📱 QR Code</h3>
              <button onClick={() => setQrModal(null)} className="text-slate-400 hover:text-white text-xl">×</button>
            </div>

            {/* Student info */}
            <div className="mb-4">
              <p className="text-white font-semibold">{qrModal.student_name}</p>
              <p className="text-slate-400 text-sm">{qrModal.internship_role}</p>
              <p className="text-slate-500 text-xs font-mono mt-1">{qrModal.id}</p>
            </div>

            {/* QR Code image from backend */}
            <div className="bg-white rounded-xl p-4 flex items-center justify-center mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/api/certs/qr/${qrModal.id}`}
                alt={`QR Code for ${qrModal.id}`}
                className="w-48 h-48"
              />
            </div>

            {/* Verification URL */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 mb-4">
              <p className="text-slate-500 text-xs mb-1">Verification URL</p>
              <p className="text-blue-400 text-xs font-mono break-all">{verifyUrl(qrModal.id)}</p>
            </div>

            {/* Instructions */}
            <p className="text-slate-500 text-xs mb-4">
              Print this QR code on the internship certificate. Anyone who scans it will see the verified badge.
            </p>

            <div className="flex gap-3">
              <a
                href={`/api/certs/qr/${qrModal.id}`}
                download={`QR_${qrModal.id}.png`}
                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white py-2.5 rounded-xl text-sm font-semibold text-center transition">
                ⬇ Download QR
              </a>
              <button
                onClick={() => navigator.clipboard.writeText(verifyUrl(qrModal.id))}
                className="flex-1 bg-white/10 hover:bg-white/20 text-white py-2.5 rounded-xl text-sm font-semibold transition">
                🔗 Copy URL
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
