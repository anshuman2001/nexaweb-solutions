'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import {
  Upload, FileText, Download, LogOut, User, Building2,
  CheckCircle, AlertCircle, Loader2, FileSpreadsheet,
  ChevronDown, ChevronUp, Shield, X, Eye, EyeOff,
} from 'lucide-react';

const API = 'https://brokernote-backend.onrender.com';

// ─── Types ────────────────────────────────────────────────────────────────────

type AuthUser = { token: string; email: string; name: string; firm: string };

type Trade = {
  isin: string; security: string;
  buy_qty: number; buy_wap: number; total_buy_value: number;
  sell_qty: number; sell_wap: number; total_sell_value: number;
  net_qty: number; net_obligation: number;
};

type Charges = {
  pay_obligation: number; stt: number; taxable_value: number;
  cgst: number; sgst: number; exchange_charges: number;
  sebi_fees: number; stamp_duty: number; ipf_charges: number;
  net_amount: number;
};

type ExtractedData = {
  header: Record<string, string>;
  broker_info: Record<string, string>;
  trades: Trade[];
  charges: Charges;
  order_details: Array<Record<string, string>>;
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmt = (n: number) =>
  n === 0 ? '—' : new Intl.NumberFormat('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(Math.abs(n));

const fmtQty = (n: number) =>
  n === 0 ? '—' : n.toLocaleString('en-IN');

// ─── Auth Modal ───────────────────────────────────────────────────────────────

function AuthModal({ onSuccess }: { onSuccess: (user: AuthUser) => void }) {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [form, setForm] = useState({ email: '', password: '', name: '', firm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPwd, setShowPwd] = useState(false);

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const endpoint = tab === 'login' ? '/auth/login' : '/auth/signup';
      const body = tab === 'login'
        ? { email: form.email, password: form.password }
        : { email: form.email, password: form.password, name: form.name, firm: form.firm };

      const res = await fetch(`${API}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.detail || 'Authentication failed');
      localStorage.setItem('brokernote_user', JSON.stringify(json));
      onSuccess(json);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-[#0c0f1a] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">

        {/* Header */}
        <div className="p-8 pb-6 text-center" style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(79,70,229,0.1))' }}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 mb-4">
            <FileSpreadsheet className="w-7 h-7 text-blue-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">BrokerNote AI</h1>
          <p className="text-gray-400 text-sm mt-1">Contract Note Extractor for CA Firms</p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-white/10">
          {(['login', 'signup'] as const).map(t => (
            <button
              key={t}
              onClick={() => { setTab(t); setError(''); }}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${tab === t ? 'text-blue-400 border-b-2 border-blue-500' : 'text-gray-500 hover:text-gray-300'}`}
            >
              {t === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={submit} className="p-8 space-y-4">
          {tab === 'signup' && (
            <>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Full Name *</label>
                <input
                  value={form.name} onChange={set('name')} required
                  placeholder="CA Rajesh Sharma"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Firm Name (optional)</label>
                <input
                  value={form.firm} onChange={set('firm')}
                  placeholder="Sharma & Associates"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>
            </>
          )}
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Email *</label>
            <input
              type="email" value={form.email} onChange={set('email')} required
              placeholder="ca@example.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Password *</label>
            <div className="relative">
              <input
                type={showPwd ? 'text' : 'password'} value={form.password} onChange={set('password')} required
                placeholder="Min. 6 characters"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 pr-10 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
              />
              <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 rounded-xl px-4 py-3 border border-red-500/20">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          <button
            type="submit" disabled={loading}
            className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}
          >
            {loading ? <span className="flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" /> Please wait...</span>
              : tab === 'login' ? 'Sign In' : 'Create Account'}
          </button>

          <p className="text-center text-xs text-gray-500">
            🔒 Your data stays secure. PDFs are processed and discarded instantly.
          </p>
        </form>
      </div>
    </div>
  );
}

// ─── Upload Zone ──────────────────────────────────────────────────────────────

function UploadZone({ onFile }: { onFile: (f: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f?.type === 'application/pdf') onFile(f);
  }, [onFile]);

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      className={`relative border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all text-center
        ${dragging ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 hover:border-blue-500/50 hover:bg-blue-500/5'}`}
    >
      <input ref={inputRef} type="file" accept=".pdf" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) onFile(f); }} />
      <div className="w-16 h-16 rounded-2xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center mb-5">
        <Upload className="w-8 h-8 text-blue-400" />
      </div>
      <h3 className="text-white font-bold text-lg mb-2">Upload Contract Note PDF</h3>
      <p className="text-gray-400 text-sm mb-4 max-w-sm">
        Drag & drop or click to upload. Supports Angel One, Zerodha, Upstox, HDFC Securities and more.
      </p>
      <div className="flex flex-wrap justify-center gap-2 text-xs text-gray-500">
        {['Angel One', 'Zerodha', 'Upstox', 'HDFC Sec', 'ICICI Direct', 'Sharekhan'].map(b => (
          <span key={b} className="px-2 py-1 rounded-full border border-white/10 bg-white/5">{b}</span>
        ))}
      </div>
    </div>
  );
}

// ─── Collapsible Section ─────────────────────────────────────────────────────

function Section({ title, icon, children, defaultOpen = true }:
  { title: string; icon: React.ReactNode; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded-2xl border border-white/10 bg-[#0c0f1a]/80 overflow-hidden">
      <button onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors">
        <div className="flex items-center gap-3 text-white font-semibold">
          {icon} {title}
        </div>
        {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
      </button>
      {open && <div className="px-6 pb-6">{children}</div>}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function BrokerNoteAI() {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [data, setData] = useState<ExtractedData | null>(null);
  const [error, setError] = useState('');
  const [downloading, setDownloading] = useState<'excel' | 'xml' | null>(null);
  const [waking, setWaking] = useState(false);

  // Restore auth from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('brokernote_user');
      if (saved) setUser(JSON.parse(saved));
    } catch { /* ignore */ }
  }, []);

  const logout = () => {
    localStorage.removeItem('brokernote_user');
    setUser(null);
    setData(null);
    setFile(null);
  };

  // Wake backend on mount after login
  useEffect(() => {
    if (!user) return;
    setWaking(true);
    fetch(`${API}/`).finally(() => setWaking(false));
  }, [user]);

  const handleFile = async (f: File) => {
    setFile(f);
    setError('');
    setData(null);
    setExtracting(true);
    try {
      const form = new FormData();
      form.append('file', f);
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 60000);
      const res = await fetch(`${API}/extract`, { method: 'POST', body: form, signal: controller.signal });
      clearTimeout(timeout);
      const json = await res.json();
      if (!res.ok) throw new Error(json.detail || 'Extraction failed');
      setData(json);
    } catch (err: unknown) {
      if (err instanceof Error && err.name === 'AbortError') {
        setError('Request timed out. The backend may be starting up — please try again in 30 seconds.');
      } else {
        setError(err instanceof Error ? err.message : 'Extraction failed');
      }
    } finally {
      setExtracting(false);
    }
  };

  const downloadFile = async (type: 'excel' | 'xml') => {
    if (!data) return;
    setDownloading(type);
    try {
      const endpoint = type === 'excel' ? '/excel' : '/tally-xml';
      const res = await fetch(`${API}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('Download failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      const cd = res.headers.get('Content-Disposition') || '';
      const match = cd.match(/filename=(.+)/);
      a.download = match ? match[1] : (type === 'excel' ? 'BrokerNote.xlsx' : 'Tally.xml');
      a.click();
      URL.revokeObjectURL(url);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Download failed');
    } finally {
      setDownloading(null);
    }
  };

  // ── Auth Gate ──────────────────────────────────────────────────────────────
  if (!user) return <AuthModal onSuccess={setUser} />;

  const h = data?.header || {};
  const charges = data?.charges || {} as Charges;
  const trades = data?.trades || [];

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Navbar ──────────────────────────────────────────────────────── */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <FileSpreadsheet className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">BrokerNote AI</h1>
              <p className="text-gray-500 text-xs">Contract Note Extractor</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {waking && <span className="text-xs text-blue-400 animate-pulse">⏳ Connecting...</span>}
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-400">
              <User className="w-4 h-4" />
              <span>{user.name}</span>
              {user.firm && <><Building2 className="w-3.5 h-3.5 ml-1" /><span className="text-gray-500">{user.firm}</span></>}
            </div>
            <button onClick={logout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white hover:border-white/20 text-sm transition-colors">
              <LogOut className="w-4 h-4" /> Sign out
            </button>
          </div>
        </div>

        {/* ── Error Banner ─────────────────────────────────────────────────── */}
        {error && (
          <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <span className="flex-1">{error}</span>
            <button onClick={() => setError('')}><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* ── Upload + Status ──────────────────────────────────────────────── */}
        {!data && (
          <div className="mb-8">
            <UploadZone onFile={handleFile} />
            {extracting && (
              <div className="mt-6 flex flex-col items-center gap-3 text-center">
                <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                <div>
                  <p className="text-white font-semibold">Extracting data from PDF…</p>
                  <p className="text-gray-400 text-sm mt-1">Parsing trades, charges, order details</p>
                </div>
                {file && (
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm text-gray-300">
                    <FileText className="w-4 h-4 text-blue-400" />
                    {file.name} ({(file.size / 1024).toFixed(0)} KB)
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* ── Results ──────────────────────────────────────────────────────── */}
        {data && (
          <div className="space-y-6">
            {/* Success banner + downloads */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-white font-bold text-lg">Extraction Complete!</p>
                    <p className="text-gray-400 text-sm">{file?.name} · {trades.length} trade{trades.length !== 1 ? 's' : ''} found</p>
                  </div>
                </div>
                <div className="flex gap-3 flex-wrap">
                  <button onClick={() => downloadFile('excel')} disabled={!!downloading}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm transition-all disabled:opacity-60"
                    style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}>
                    {downloading === 'excel' ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileSpreadsheet className="w-4 h-4" />}
                    Download Excel
                  </button>
                  <button onClick={() => downloadFile('xml')} disabled={!!downloading}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-white font-semibold text-sm transition-all border border-blue-500/40 hover:bg-blue-500/10 disabled:opacity-60">
                    {downloading === 'xml' ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4 text-blue-400" />}
                    <span className="text-blue-400">Tally XML</span>
                  </button>
                  <button onClick={() => { setData(null); setFile(null); setError(''); }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 text-sm transition-colors">
                    <Upload className="w-4 h-4" /> New File
                  </button>
                </div>
              </div>
            </div>

            {/* Client Info */}
            <Section title="Client & Contract Details" icon={<Shield className="w-5 h-5 text-blue-400" />}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                {[
                  ['Client Name',      h.client_name],
                  ['Client Code (UCC)',h.client_code],
                  ['PAN Number',       h.pan],
                  ['Trade Date',       h.trade_date],
                  ['Contract Note No.',h.contract_note_no],
                  ['Settlement No.',   h.settlement_no],
                  ['Broker',           data.broker_info?.broker],
                  ['Broker GST',       data.broker_info?.broker_gst],
                ].map(([label, value]) => (
                  value ? (
                    <div key={label as string} className="flex flex-col gap-1">
                      <span className="text-gray-500 text-xs uppercase tracking-wider">{label}</span>
                      <span className="text-white font-medium text-sm">{value}</span>
                    </div>
                  ) : null
                ))}
              </div>
            </Section>

            {/* Trades */}
            {trades.length > 0 && (
              <Section title={`Trade Summary (${trades.length} securities)`} icon={<FileText className="w-5 h-5 text-blue-400" />}>
                <div className="overflow-x-auto mt-2">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        {['ISIN', 'Security', 'Buy Qty', 'Buy WAP', 'Buy Value', 'Sell Qty', 'Sell WAP', 'Sell Value', 'Net Qty', 'Net Obligation'].map(h => (
                          <th key={h} className="text-left py-2 px-3 text-xs text-gray-400 font-semibold whitespace-nowrap">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {trades.map((t, i) => (
                        <tr key={i} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/2' : ''}`}>
                          <td className="py-3 px-3 text-gray-400 font-mono text-xs">{t.isin}</td>
                          <td className="py-3 px-3 text-white font-medium whitespace-nowrap">{t.security}</td>
                          <td className="py-3 px-3 text-emerald-400 font-semibold text-right">{fmtQty(t.buy_qty)}</td>
                          <td className="py-3 px-3 text-gray-300 text-right">₹{fmt(t.buy_wap)}</td>
                          <td className="py-3 px-3 text-gray-300 text-right">₹{fmt(t.total_buy_value)}</td>
                          <td className="py-3 px-3 text-red-400 font-semibold text-right">{fmtQty(t.sell_qty)}</td>
                          <td className="py-3 px-3 text-gray-300 text-right">₹{fmt(t.sell_wap)}</td>
                          <td className="py-3 px-3 text-gray-300 text-right">₹{fmt(t.total_sell_value)}</td>
                          <td className="py-3 px-3 text-white text-right font-semibold">{fmtQty(t.net_qty)}</td>
                          <td className={`py-3 px-3 text-right font-bold ${t.net_obligation < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                            {t.net_obligation < 0 ? '−' : '+'}₹{fmt(t.net_obligation)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>
            )}

            {/* Charges */}
            {charges && Object.keys(charges).length > 0 && (
              <Section title="Charges & Levies" icon={<FileSpreadsheet className="w-5 h-5 text-blue-400" />}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-2">
                  {[
                    ['Pay/Receive Obligation',       charges.pay_obligation, false],
                    ['Securities Transaction Tax (STT)', charges.stt, false],
                    ['Taxable Value of Supply',       charges.taxable_value, false],
                    ['CGST @ 9%',                    charges.cgst, false],
                    ['SGST @ 9%',                    charges.sgst, false],
                    ['Exchange Transaction Charges', charges.exchange_charges, false],
                    ['SEBI Turnover Fees',           charges.sebi_fees, false],
                    ['Stamp Duty',                   charges.stamp_duty, false],
                    ['IPF Charges',                  charges.ipf_charges, false],
                  ].filter(([, v]) => (v as number) !== 0).map(([label, value]) => (
                    <div key={label as string} className="flex justify-between items-center py-2 border-b border-white/5">
                      <span className="text-gray-400 text-sm">{label as string}</span>
                      <span className="text-white font-medium text-sm">₹{fmt(Math.abs(value as number))}</span>
                    </div>
                  ))}
                  {/* Net Amount — highlighted */}
                  <div className="sm:col-span-2 flex justify-between items-center py-3 px-4 rounded-xl mt-2"
                    style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(79,70,229,0.1))', border: '1px solid rgba(37,99,235,0.3)' }}>
                    <span className="text-white font-bold">Net Amount Payable / Receivable</span>
                    <span className={`font-extrabold text-lg ${(charges.net_amount ?? 0) < 0 ? 'text-red-400' : 'text-emerald-400'}`}>
                      {(charges.net_amount ?? 0) < 0 ? '−' : '+'}₹{fmt(charges.net_amount ?? 0)}
                    </span>
                  </div>
                </div>
              </Section>
            )}

            {/* Order Details */}
            {data.order_details && data.order_details.length > 0 && (
              <Section title={`Order Details (${data.order_details.length} orders)`} icon={<FileText className="w-5 h-5 text-blue-400" />} defaultOpen={false}>
                <div className="overflow-x-auto mt-2">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-white/10">
                        {['Order No', 'Time', 'Security', 'B/S', 'Qty', 'Rate'].map(h => (
                          <th key={h} className="text-left py-2 px-3 text-xs text-gray-400 font-semibold">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.order_details.map((o, i) => (
                        <tr key={i} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/2' : ''}`}>
                          <td className="py-2 px-3 text-gray-400 font-mono text-xs">{o.order_no}</td>
                          <td className="py-2 px-3 text-gray-400 text-xs">{o.order_time}</td>
                          <td className="py-2 px-3 text-white">{o.security}</td>
                          <td className={`py-2 px-3 font-semibold text-xs ${o.buy_sell?.includes('BUY') ? 'text-emerald-400' : 'text-red-400'}`}>{o.buy_sell?.split(' ')[0]}</td>
                          <td className="py-2 px-3 text-white">{o.qty}</td>
                          <td className="py-2 px-3 text-white">₹{o.gross_rate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>
            )}

            {/* Tally Info Banner */}
            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-6">
              <h3 className="text-white font-bold mb-2">📋 How to Import Tally XML</h3>
              <ol className="text-gray-400 text-sm space-y-1 list-decimal list-inside">
                <li>Download the Tally XML file above</li>
                <li>Open Tally Prime → Go to <strong className="text-white">Gateway of Tally → Import → Vouchers</strong></li>
                <li>Select the downloaded XML file</li>
                <li>Review and accept the imported journal entries</li>
                <li>Create ledgers if prompted (e.g. &quot;Angel One Payable A/c&quot;, stock A/cs)</li>
              </ol>
            </div>
          </div>
        )}

        {/* ── Features (shown before upload) ──────────────────────────────── */}
        {!data && !extracting && (
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              { icon: '🔍', title: 'Smart Extraction', desc: 'Automatically reads ISIN, WAP, brokerage, STT, GST, stamp duty from any broker format.' },
              { icon: '📊', title: 'Clean Excel Output', desc: '3-sheet Excel: Trade Summary, Tally Journal Entry template, and detailed Order list.' },
              { icon: '📒', title: 'Tally XML Import', desc: 'Ready-to-import XML for Tally Prime — journal entries for purchases, charges & broker payable.' },
            ].map(card => (
              <div key={card.title} className="rounded-2xl border border-white/10 bg-[#0c0f1a]/80 p-6">
                <div className="text-3xl mb-3">{card.icon}</div>
                <h3 className="text-white font-bold mb-2">{card.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
