'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Calendar, Bell, CheckCircle, Plus, Trash2, AlertTriangle,
  Clock, MessageCircle, X, Loader2, LogOut, User,
  Eye, EyeOff, Send, ClipboardList,
} from 'lucide-react';

const API = 'https://brokernote-backend.onrender.com';
const CA  = `${API}/ca`;   // CA Calendar routes prefix

// ─── Types ────────────────────────────────────────────────────────────────────
type AuthUser = { token: string; email: string; name: string; firm: string };
type FilingType = 'GST' | 'ITR' | 'TDS' | 'ROC' | 'Audit' | 'Other';
type Status = 'Pending' | 'Done';
interface Client {
  id: number; name: string; pan: string; mobile: string;
  filing_type: FilingType; due_date: string; status: Status;
}
interface LogEntry {
  client_name: string; filing_type: string; due_date: string;
  mobile: string; sent_at: string; result: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const today = new Date(); today.setHours(0,0,0,0);

function daysLeft(d: string) {
  const dt = new Date(d); dt.setHours(0,0,0,0);
  return Math.round((dt.getTime() - today.getTime()) / 86400000);
}
function fmtDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}
function urgencyBadge(days: number, status: Status) {
  if (status === 'Done') return { cls: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20', label: '✅ Done' };
  if (days < 0)  return { cls: 'text-red-400 bg-red-500/10 border-red-500/20', label: `Overdue ${Math.abs(days)}d` };
  if (days === 0) return { cls: 'text-red-400 bg-red-500/10 border-red-500/20', label: '⚠ Due Today!' };
  if (days === 1) return { cls: 'text-red-400 bg-red-500/10 border-red-500/20', label: '🔴 Tomorrow!' };
  if (days <= 7)  return { cls: 'text-orange-400 bg-orange-500/10 border-orange-500/20', label: `🟠 ${days} days` };
  return { cls: 'text-blue-400 bg-blue-500/10 border-blue-500/20', label: `${days} days` };
}

const FILING_TYPES: FilingType[] = ['GST', 'ITR', 'TDS', 'ROC', 'Audit', 'Other'];
const EMPTY_FORM = { name: '', pan: '', mobile: '+91', filing_type: 'GST' as FilingType, due_date: '', status: 'Pending' as Status };

// ─── Auth Modal ───────────────────────────────────────────────────────────────
function AuthModal({ onSuccess }: { onSuccess: (u: AuthUser) => void }) {
  const [tab, setTab] = useState<'login' | 'signup'>('login');
  const [form, setForm] = useState({ email: '', password: '', name: '', firm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setForm(p => ({ ...p, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      const body = tab === 'login'
        ? { email: form.email, password: form.password }
        : { email: form.email, password: form.password, name: form.name, firm: form.firm };
      const res  = await fetch(`${CA}/auth/${tab}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const json = await res.json();
      if (!res.ok) throw new Error(json.detail || 'Failed');
      localStorage.setItem('ca_cal_user', JSON.stringify(json));
      onSuccess(json);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally { setLoading(false); }
  };

  const inp = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-[#0c0f1a] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
        <div className="p-8 pb-6 text-center" style={{ background: 'linear-gradient(135deg,rgba(22,163,74,0.15),rgba(16,185,129,0.1))' }}>
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-600/20 border border-emerald-500/30 mb-4">
            <Calendar className="w-7 h-7 text-emerald-400" />
          </div>
          <h1 className="text-2xl font-bold text-white">CA Compliance Calendar</h1>
          <p className="text-gray-400 text-sm mt-1">Auto WhatsApp Reminders for Your Clients</p>
        </div>
        <div className="flex border-b border-white/10">
          {(['login', 'signup'] as const).map(t => (
            <button key={t} onClick={() => { setTab(t); setError(''); }}
              className={`flex-1 py-3 text-sm font-semibold transition-colors ${tab===t ? 'text-emerald-400 border-b-2 border-emerald-500' : 'text-gray-500 hover:text-gray-300'}`}>
              {t === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          ))}
        </div>
        <form onSubmit={submit} className="p-8 space-y-4">
          {tab === 'signup' && <>
            <div><label className="block text-sm text-gray-400 mb-1.5">Full Name *</label>
              <input value={form.name} onChange={set('name')} required placeholder="CA Rajesh Sharma" className={inp} /></div>
            <div><label className="block text-sm text-gray-400 mb-1.5">Firm Name</label>
              <input value={form.firm} onChange={set('firm')} placeholder="Sharma & Associates" className={inp} /></div>
          </>}
          <div><label className="block text-sm text-gray-400 mb-1.5">Email *</label>
            <input type="email" value={form.email} onChange={set('email')} required placeholder="ca@example.com" className={inp} /></div>
          <div><label className="block text-sm text-gray-400 mb-1.5">Password *</label>
            <div className="relative">
              <input type={showPwd ? 'text' : 'password'} value={form.password} onChange={set('password')} required placeholder="Min 6 characters" className={`${inp} pr-10`} />
              <button type="button" onClick={() => setShowPwd(!showPwd)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                {showPwd ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          {error && <div className="flex items-center gap-2 text-red-400 text-sm bg-red-500/10 rounded-xl px-4 py-3 border border-red-500/20"><AlertTriangle className="w-4 h-4 shrink-0" />{error}</div>}
          <button type="submit" disabled={loading}
            className="w-full py-3 rounded-xl text-white font-semibold text-sm transition-all disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg,#16a34a,#15803d)' }}>
            {loading ? <span className="flex items-center justify-center gap-2"><Loader2 className="w-4 h-4 animate-spin" />Please wait...</span>
              : tab === 'login' ? 'Sign In' : 'Create Account'}
          </button>
          <p className="text-center text-xs text-gray-500">🔒 Your client data is secure and private to your account.</p>
        </form>
      </div>
    </div>
  );
}

// ─── WhatsApp Preview Modal ───────────────────────────────────────────────────
function PreviewModal({ client, onClose, onSend, sending }: {
  client: Client; onClose: () => void;
  onSend: () => void; sending: boolean;
}) {
  const days = daysLeft(client.due_date);
  const msg  = `Dear ${client.name},\n\nReminder: ${client.filing_type} filing is due on ${fmtDate(client.due_date)}.\nPlease share the required documents at the earliest.\n\n— DigiAgentix CA Tools`;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4" onClick={onClose}>
      <div className="w-full max-w-sm bg-[#0c0f1a] rounded-2xl border border-white/10 p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold"><MessageCircle className="w-5 h-5" />WhatsApp Preview</div>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400 hover:text-white" /></button>
        </div>
        <div className="text-xs text-gray-500 mb-1">To: <span className="text-gray-300">{client.mobile}</span></div>
        <div className="bg-[#1a2a1a] rounded-xl p-4 text-sm text-gray-200 leading-relaxed border border-emerald-500/20 whitespace-pre-wrap">{msg}</div>
        <p className="text-xs text-gray-500 mt-3 mb-4">
          {days <= 0 ? 'Auto-sent: overdue alert' : days <= 1 ? 'Auto-sent: 1-day reminder' : days <= 7 ? 'Auto-sent: 7-day reminder' : `Next auto-send: when ${days-7} days pass`}
        </p>
        <button onClick={onSend} disabled={sending}
          className="w-full py-2.5 rounded-xl text-white font-semibold text-sm flex items-center justify-center gap-2 disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg,#16a34a,#15803d)' }}>
          {sending ? <><Loader2 className="w-4 h-4 animate-spin" />Sending...</> : <><Send className="w-4 h-4" />Send Now</>}
        </button>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function CAComplianceCalendar() {
  const [user, setUser]         = useState<AuthUser | null>(null);
  const [clients, setClients]   = useState<Client[]>([]);
  const [logs, setLogs]         = useState<LogEntry[]>([]);
  const [loading, setLoading]   = useState(false);
  const [preview, setPreview]   = useState<Client | null>(null);
  const [sending, setSending]   = useState(false);
  const [sendResult, setSendResult] = useState<{ ok: boolean; msg: string } | null>(null);
  const [tab, setTab]           = useState<'calendar' | 'log'>('calendar');
  const [filter, setFilter]     = useState<'all' | 'urgent' | 'pending'>('all');
  const [addForm, setAddForm]   = useState(EMPTY_FORM);
  const [addErr, setAddErr]     = useState('');
  const [adding, setAdding]     = useState(false);

  const headers = useCallback(() => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${user?.token}`,
  }), [user]);

  const fetchClients = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await fetch(`${CA}/clients`, { headers: headers() });
      const data = await res.json();
      if (res.ok) setClients(data);
    } catch { /* ignore */ } finally { setLoading(false); }
  }, [user, headers]);

  const fetchLogs = useCallback(async () => {
    if (!user) return;
    const res = await fetch(`${CA}/logs`, { headers: headers() });
    if (res.ok) setLogs(await res.json());
  }, [user, headers]);

  // Restore session
  useEffect(() => {
    try { const s = localStorage.getItem('ca_cal_user'); if (s) setUser(JSON.parse(s)); } catch { /* */ }
  }, []);

  useEffect(() => { if (user) { fetchClients(); fetchLogs(); } }, [user, fetchClients, fetchLogs]);

  const logout = () => { localStorage.removeItem('ca_cal_user'); setUser(null); setClients([]); setLogs([]); };

  const toggleDone = async (client: Client) => {
    const newStatus = client.status === 'Done' ? 'Pending' : 'Done';
    const res = await fetch(`${CA}/clients/${client.id}`, {
      method: 'PUT', headers: headers(), body: JSON.stringify({ status: newStatus }),
    });
    if (res.ok) setClients(prev => prev.map(c => c.id === client.id ? { ...c, status: newStatus } : c));
  };

  const removeClient = async (id: number) => {
    await fetch(`${CA}/clients/${id}`, { method: 'DELETE', headers: headers() });
    setClients(prev => prev.filter(c => c.id !== id));
  };

  const addClient = async (e: React.FormEvent) => {
    e.preventDefault(); setAddErr('');
    if (!addForm.name || !addForm.mobile || !addForm.due_date) { setAddErr('Name, Mobile and Due Date required'); return; }
    setAdding(true);
    try {
      const res  = await fetch(`${CA}/clients`, { method: 'POST', headers: headers(), body: JSON.stringify(addForm) });
      const data = await res.json();
      if (!res.ok) throw new Error(data.detail || 'Failed');
      setClients(prev => [data, ...prev]);
      setAddForm(EMPTY_FORM);
    } catch (err: unknown) {
      setAddErr(err instanceof Error ? err.message : 'Failed to add');
    } finally { setAdding(false); }
  };

  const sendNow = async (client: Client) => {
    setSending(true); setSendResult(null);
    try {
      const res  = await fetch(`${CA}/remind/test/${client.id}`, { method: 'POST', headers: headers() });
      const data = await res.json();
      setSendResult({ ok: data.success, msg: data.success ? `Message sent to ${client.mobile}` : 'Sending failed — check Twilio config' });
      if (data.success) fetchLogs();
    } catch { setSendResult({ ok: false, msg: 'Network error' }); }
    finally { setSending(false); }
  };

  if (!user) return <AuthModal onSuccess={setUser} />;

  const sorted   = [...clients].sort((a, b) => new Date(a.due_date).getTime() - new Date(b.due_date).getTime());
  const filtered = sorted.filter(c => {
    if (filter === 'urgent')  return daysLeft(c.due_date) <= 7 && c.status === 'Pending';
    if (filter === 'pending') return c.status === 'Pending';
    return true;
  });
  const urgentCount  = clients.filter(c => daysLeft(c.due_date) <= 7 && c.status === 'Pending').length;
  const pendingCount = clients.filter(c => c.status === 'Pending').length;
  const inp = "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-emerald-500 transition-colors";

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">CA Compliance Calendar</h1>
              <p className="text-gray-500 text-xs">Auto WhatsApp Reminders · {user.firm || user.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {urgentCount > 0 && (
              <span className="hidden sm:flex items-center gap-1.5 text-xs text-orange-300 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full">
                <Bell className="w-3.5 h-3.5 text-orange-400" />{urgentCount} urgent
              </span>
            )}
            <div className="hidden sm:flex items-center gap-1.5 text-sm text-gray-400"><User className="w-4 h-4" />{user.name}</div>
            <button onClick={logout} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-gray-400 hover:text-white text-sm transition-colors">
              <LogOut className="w-4 h-4" />Sign out
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { label: 'Total', value: clients.length, cls: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
            { label: 'Pending', value: pendingCount, cls: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
            { label: 'Done', value: clients.length - pendingCount, cls: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
          ].map(s => (
            <div key={s.label} className={`rounded-xl border ${s.bg} p-4 text-center`}>
              <div className={`text-2xl font-extrabold ${s.cls}`}>{s.value}</div>
              <div className="text-gray-400 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Send result banner */}
        {sendResult && (
          <div className={`mb-4 flex items-center gap-3 px-4 py-3 rounded-xl border text-sm ${sendResult.ok ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-300' : 'bg-red-500/10 border-red-500/20 text-red-300'}`}>
            {sendResult.ok ? <CheckCircle className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
            {sendResult.msg}
            <button onClick={() => setSendResult(null)} className="ml-auto"><X className="w-4 h-4" /></button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex gap-2 mb-5">
          <button onClick={() => setTab('calendar')} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${tab==='calendar' ? 'bg-emerald-600 text-white' : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white'}`}>
            <Calendar className="w-3.5 h-3.5" />Calendar
          </button>
          <button onClick={() => { setTab('log'); fetchLogs(); }} className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${tab==='log' ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 border border-white/10 hover:text-white'}`}>
            <ClipboardList className="w-3.5 h-3.5" />Message Log
          </button>
        </div>

        {tab === 'calendar' && (
          <>
            {/* Filter */}
            <div className="flex gap-2 mb-4">
              {([['all','All'],['urgent',`🔴 Urgent (${urgentCount})`],['pending','Pending']] as const).map(([v,l]) => (
                <button key={v} onClick={() => setFilter(v)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${filter===v ? 'bg-white/15 text-white' : 'text-gray-500 hover:text-gray-300'}`}>
                  {l}
                </button>
              ))}
            </div>

            {/* Calendar Table */}
            <div className="rounded-2xl border border-white/10 bg-[#0c0f1a]/80 overflow-hidden mb-6">
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <span className="text-white font-semibold text-sm">Compliance Calendar ({filtered.length})</span>
                {loading && <Loader2 className="w-4 h-4 text-gray-400 animate-spin" />}
              </div>

              {filtered.length === 0 ? (
                <div className="px-6 py-12 text-center text-gray-500 text-sm">
                  {clients.length === 0 ? 'No clients yet — add your first client below.' : 'No filings for this filter.'}
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {filtered.map(c => {
                    const days = daysLeft(c.due_date);
                    const { cls, label } = urgencyBadge(days, c.status);
                    return (
                      <div key={c.id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-white/2 transition-colors">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-white font-semibold text-sm">{c.name}</span>
                            {c.pan && <span className="text-gray-500 text-xs font-mono">{c.pan}</span>}
                          </div>
                          <div className="flex items-center gap-3 text-xs text-gray-500">
                            <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{fmtDate(c.due_date)}</span>
                            <span>{c.mobile}</span>
                          </div>
                        </div>
                        <span className="px-2.5 py-1 rounded-lg bg-white/8 border border-white/10 text-white text-xs font-bold">{c.filing_type}</span>
                        <span className={`px-3 py-1 rounded-full border text-xs font-semibold ${cls} min-w-[100px] text-center`}>{label}</span>
                        <div className="flex items-center gap-2">
                          <button onClick={() => { setPreview(c); setSendResult(null); }} title="Preview & Send WhatsApp"
                            className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                            <MessageCircle className="w-4 h-4" />
                          </button>
                          <button onClick={() => toggleDone(c)} title={c.status === 'Done' ? 'Mark Pending' : 'Mark Done'}
                            className={`p-2 rounded-lg border transition-colors ${c.status==='Done' ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'}`}>
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button onClick={() => removeClient(c.id)} title="Remove"
                            className="p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Add Client */}
            <form onSubmit={addClient} className="rounded-2xl border border-blue-500/20 bg-[#0c0f1a]/80 p-6">
              <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Plus className="w-4 h-4 text-blue-400" />Add Client</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-3">
                {[['name','Client Name *','Ramesh Shah'],['pan','PAN','ABCDE1234F'],['mobile','Mobile (+91) *','+919876543210']].map(([k,l,ph]) => (
                  <div key={k}>
                    <label className="block text-xs text-gray-400 mb-1">{l}</label>
                    <input value={(addForm as Record<string,string>)[k]} onChange={e => setAddForm(p => ({...p,[k]:e.target.value}))} placeholder={ph} className={inp} />
                  </div>
                ))}
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Filing Type *</label>
                  <select value={addForm.filing_type} onChange={e => setAddForm(p => ({...p, filing_type: e.target.value as FilingType}))} className={inp}>
                    {FILING_TYPES.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Due Date *</label>
                  <input type="date" value={addForm.due_date} onChange={e => setAddForm(p => ({...p, due_date: e.target.value}))} className={inp} />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1">Status</label>
                  <select value={addForm.status} onChange={e => setAddForm(p => ({...p, status: e.target.value as Status}))} className={inp}>
                    <option value="Pending">Pending</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>
              {addErr && <p className="text-red-400 text-xs mb-3">{addErr}</p>}
              <button type="submit" disabled={adding}
                className="px-6 py-2.5 rounded-xl text-white font-semibold text-sm flex items-center gap-2 disabled:opacity-50"
                style={{ background: 'linear-gradient(135deg,#2563eb,#4f46e5)' }}>
                {adding ? <><Loader2 className="w-4 h-4 animate-spin" />Adding...</> : <><Plus className="w-4 h-4" />Add Client</>}
              </button>
            </form>

            {/* Auto-send info */}
            <div className="mt-6 rounded-2xl border border-white/10 bg-[#0c0f1a]/80 p-5 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Auto-reminders run daily at 9:00 AM</p>
                <p className="text-gray-400 text-xs mt-1">WhatsApp messages are automatically sent to clients whose filing is due in <strong className="text-white">7 days</strong> or <strong className="text-white">1 day</strong>. Clients marked Done are skipped.</p>
              </div>
            </div>
          </>
        )}

        {tab === 'log' && (
          <div className="rounded-2xl border border-white/10 bg-[#0c0f1a]/80 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10">
              <span className="text-white font-semibold text-sm">Message Log ({logs.length} messages)</span>
            </div>
            {logs.length === 0 ? (
              <div className="px-6 py-12 text-center text-gray-500 text-sm">No messages sent yet. Send a test reminder from the calendar tab.</div>
            ) : (
              <div className="divide-y divide-white/5">
                {logs.map((l, i) => (
                  <div key={i} className="px-6 py-3 flex items-center gap-4">
                    <span className={`px-2 py-0.5 rounded text-xs font-bold ${l.result === 'sent' || l.result === 'sent-manual' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                      {l.result === 'sent-manual' ? '📱 Manual' : l.result === 'sent' ? '⏰ Auto' : '❌ Failed'}
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="text-white text-sm font-medium">{l.client_name}</span>
                      <span className="text-gray-500 text-xs ml-2">{l.filing_type} · due {fmtDate(l.due_date)}</span>
                    </div>
                    <span className="text-gray-500 text-xs">{new Date(l.sent_at).toLocaleString('en-IN', { day:'2-digit', month:'short', hour:'2-digit', minute:'2-digit' })}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <p className="text-white font-bold">Need this for your entire CA firm?</p>
            <p className="text-gray-400 text-sm">Multi-user access, bulk import from Excel, custom sender name — contact us.</p>
          </div>
          <Link href="/contact" className="shrink-0 px-6 py-2.5 rounded-xl text-white font-semibold text-sm"
            style={{ background: 'linear-gradient(135deg,#16a34a,#15803d)' }}>
            Contact Us →
          </Link>
        </div>

      </div>

      {preview && (
        <PreviewModal client={preview} onClose={() => setPreview(null)}
          onSend={() => sendNow(preview)} sending={sending} />
      )}
    </div>
  );
}
