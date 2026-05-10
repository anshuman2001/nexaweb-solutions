'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Calendar, Bell, CheckCircle, Plus, Trash2, AlertTriangle,
  Clock, MessageCircle, FileText, X,
} from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type FilingType = 'GST' | 'ITR' | 'TDS' | 'ROC' | 'Audit' | 'Other';
type Status = 'Pending' | 'Done';

interface Client {
  id: string;
  name: string;
  pan: string;
  mobile: string;
  filingType: FilingType;
  dueDate: string;   // YYYY-MM-DD
  status: Status;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const today = new Date();
today.setHours(0, 0, 0, 0);

function daysLeft(dateStr: string): number {
  const d = new Date(dateStr);
  d.setHours(0, 0, 0, 0);
  return Math.round((d.getTime() - today.getTime()) / 86400000);
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

function urgencyColor(days: number, status: Status) {
  if (status === 'Done') return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
  if (days < 0)  return 'text-red-400 bg-red-500/10 border-red-500/20';
  if (days <= 1) return 'text-red-400 bg-red-500/10 border-red-500/20';
  if (days <= 7) return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
  return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
}

function urgencyLabel(days: number, status: Status) {
  if (status === 'Done') return '✅ Done';
  if (days < 0)  return `Overdue by ${Math.abs(days)}d`;
  if (days === 0) return '⚠ Due Today!';
  if (days === 1) return '🔴 Due Tomorrow!';
  if (days <= 7) return `🟠 ${days} days left`;
  return `${days} days left`;
}

function whatsappMessage(client: Client): string {
  return `Dear ${client.name},\n\nReminder: *${client.filingType}* filing is due on *${formatDate(client.dueDate)}*.\nPlease share the required documents at the earliest.\n\n— DigiAgentix CA Tools`;
}

// ─── Sample / Demo data ───────────────────────────────────────────────────────

function sampleDate(offset: number): string {
  const d = new Date();
  d.setDate(d.getDate() + offset);
  return d.toISOString().split('T')[0];
}

const DEMO_CLIENTS: Client[] = [
  { id: '1', name: 'Ramesh Shah',   pan: 'ABCRS1234F', mobile: '+919876543210', filingType: 'GST',   dueDate: sampleDate(1),  status: 'Pending' },
  { id: '2', name: 'Priya Mehta',   pan: 'BCPRM5678G', mobile: '+919812345678', filingType: 'TDS',   dueDate: sampleDate(7),  status: 'Pending' },
  { id: '3', name: 'Suresh Jain',   pan: 'CDSUJ9012H', mobile: '+919823456789', filingType: 'ITR',   dueDate: sampleDate(14), status: 'Pending' },
  { id: '4', name: 'Kavita Desai',  pan: 'DEKAD3456I', mobile: '+919834567890', filingType: 'ROC',   dueDate: sampleDate(30), status: 'Pending' },
  { id: '5', name: 'Amit Gupta',    pan: 'EFAMG7890J', mobile: '+919845678901', filingType: 'Audit', dueDate: sampleDate(-2), status: 'Done'    },
];

const FILING_TYPES: FilingType[] = ['GST', 'ITR', 'TDS', 'ROC', 'Audit', 'Other'];

// ─── WhatsApp Preview Modal ───────────────────────────────────────────────────

function WhatsAppPreview({ client, onClose }: { client: Client; onClose: () => void }) {
  const msg = whatsappMessage(client);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4" onClick={onClose}>
      <div className="w-full max-w-sm bg-[#0c0f1a] rounded-2xl border border-white/10 p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-emerald-400 font-semibold">
            <MessageCircle className="w-5 h-5" /> WhatsApp Preview
          </div>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400 hover:text-white" /></button>
        </div>
        <div className="text-xs text-gray-500 mb-1">To: {client.mobile}</div>
        <div className="bg-[#1a2a1a] rounded-xl p-4 text-sm text-gray-200 leading-relaxed border border-emerald-500/20 whitespace-pre-wrap">
          {msg.split('*').map((part, i) =>
            i % 2 === 1
              ? <strong key={i} className="text-white">{part}</strong>
              : part
          )}
        </div>
        <p className="text-xs text-gray-500 mt-3 text-center">
          This message would be auto-sent {daysLeft(client.dueDate) <= 1 ? 'today (1-day reminder)' : '7 days before due date'}
        </p>
      </div>
    </div>
  );
}

// ─── Add Client Form ──────────────────────────────────────────────────────────

const EMPTY_FORM = { name: '', pan: '', mobile: '+91', filingType: 'GST' as FilingType, dueDate: '', status: 'Pending' as Status };

function AddClientForm({ onAdd }: { onAdd: (c: Client) => void }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [err, setErr] = useState('');

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm(prev => ({ ...prev, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.mobile || !form.dueDate) { setErr('Name, Mobile and Due Date are required.'); return; }
    onAdd({ ...form, id: Date.now().toString() });
    setForm(EMPTY_FORM);
    setErr('');
  };

  const inputCls = "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500 transition-colors";

  return (
    <form onSubmit={submit} className="rounded-2xl border border-blue-500/20 bg-[#0c0f1a]/80 p-6">
      <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Plus className="w-4 h-4 text-blue-400" /> Add Client</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="block text-xs text-gray-400 mb-1">Client Name *</label>
          <input value={form.name} onChange={set('name')} placeholder="Ramesh Shah" className={inputCls} />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">PAN (optional)</label>
          <input value={form.pan} onChange={set('pan')} placeholder="ABCDE1234F" className={inputCls} />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Mobile (with +91) *</label>
          <input value={form.mobile} onChange={set('mobile')} placeholder="+919876543210" className={inputCls} />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Filing Type *</label>
          <select value={form.filingType} onChange={set('filingType')} className={inputCls}>
            {FILING_TYPES.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Due Date *</label>
          <input type="date" value={form.dueDate} onChange={set('dueDate')} className={inputCls} />
        </div>
        <div>
          <label className="block text-xs text-gray-400 mb-1">Status</label>
          <select value={form.status} onChange={set('status')} className={inputCls}>
            <option value="Pending">Pending</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>
      {err && <p className="text-red-400 text-xs mb-3">{err}</p>}
      <button type="submit"
        className="px-6 py-2.5 rounded-xl text-white font-semibold text-sm transition-all"
        style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}>
        Add to Calendar
      </button>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CAComplianceCalendar() {
  const [clients, setClients] = useState<Client[]>(DEMO_CLIENTS);
  const [preview, setPreview] = useState<Client | null>(null);
  const [filter, setFilter] = useState<'all' | 'urgent' | 'pending'>('all');

  const addClient = (c: Client) => setClients(prev => [c, ...prev]);
  const removeClient = (id: string) => setClients(prev => prev.filter(c => c.id !== id));
  const toggleDone = (id: string) =>
    setClients(prev => prev.map(c => c.id === id ? { ...c, status: c.status === 'Done' ? 'Pending' : 'Done' } : c));

  const sorted = [...clients].sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  const filtered = sorted.filter(c => {
    if (filter === 'urgent')  return daysLeft(c.dueDate) <= 7 && c.status === 'Pending';
    if (filter === 'pending') return c.status === 'Pending';
    return true;
  });

  const urgentCount  = clients.filter(c => daysLeft(c.dueDate) <= 7 && c.status === 'Pending').length;
  const pendingCount = clients.filter(c => c.status === 'Pending').length;
  const doneCount    = clients.filter(c => c.status === 'Done').length;

  return (
    <div className="min-h-screen bg-background pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg leading-tight">CA Compliance Calendar</h1>
              <p className="text-gray-500 text-xs">Auto WhatsApp Reminders · DigiAgentix</p>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-500 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-full">
            <Bell className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-orange-300 font-medium">{urgentCount} urgent</span> reminders
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Total Clients', value: clients.length, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/20' },
            { label: 'Pending Filings', value: pendingCount, color: 'text-orange-400', bg: 'bg-orange-500/10 border-orange-500/20' },
            { label: 'Completed', value: doneCount, color: 'text-emerald-400', bg: 'bg-emerald-500/10 border-emerald-500/20' },
          ].map(s => (
            <div key={s.label} className={`rounded-xl border ${s.bg} p-4 text-center`}>
              <div className={`text-2xl font-extrabold ${s.color}`}>{s.value}</div>
              <div className="text-gray-400 text-xs mt-0.5">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Demo notice */}
        <div className="mb-6 flex items-start gap-3 p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 text-sm text-blue-300">
          <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>
            This is a <strong className="text-white">live interactive demo</strong> — pre-loaded with sample clients. Add your own, preview WhatsApp messages, and see how reminders work.
            {' '}<Link href="/contact" className="underline text-blue-400 hover:text-blue-300">Contact us</Link> to set up automated sending for your firm.
          </span>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-5">
          {([['all', 'All Filings'], ['urgent', `🔴 Urgent (${urgentCount})`], ['pending', 'Pending']] as const).map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === val ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'}`}>
              {label}
            </button>
          ))}
        </div>

        {/* Compliance Calendar Table */}
        <div className="rounded-2xl border border-white/10 bg-[#0c0f1a]/80 overflow-hidden mb-8">
          <div className="px-6 py-4 border-b border-white/10 flex items-center gap-2">
            <FileText className="w-4 h-4 text-blue-400" />
            <span className="text-white font-semibold">Compliance Calendar</span>
            <span className="text-gray-500 text-sm ml-1">({filtered.length} filings)</span>
          </div>

          {filtered.length === 0 ? (
            <div className="px-6 py-12 text-center text-gray-500 text-sm">No filings found for this filter.</div>
          ) : (
            <div className="divide-y divide-white/5">
              {filtered.map(client => {
                const days = daysLeft(client.dueDate);
                const cls  = urgencyColor(days, client.status);
                return (
                  <div key={client.id} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center gap-3 hover:bg-white/2 transition-colors">
                    {/* Client info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className="text-white font-semibold text-sm">{client.name}</span>
                        {client.pan && <span className="text-gray-500 text-xs font-mono">{client.pan}</span>}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formatDate(client.dueDate)}</span>
                        <span>{client.mobile}</span>
                      </div>
                    </div>

                    {/* Filing type */}
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-white/8 border border-white/10 text-white text-xs font-bold">
                        {client.filingType}
                      </span>
                    </div>

                    {/* Urgency badge */}
                    <div className={`px-3 py-1 rounded-full border text-xs font-semibold ${cls} min-w-[110px] text-center`}>
                      {urgencyLabel(days, client.status)}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setPreview(client)}
                        title="Preview WhatsApp message"
                        className="p-2 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-colors">
                        <MessageCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => toggleDone(client.id)}
                        title={client.status === 'Done' ? 'Mark Pending' : 'Mark Done'}
                        className={`p-2 rounded-lg border transition-colors ${client.status === 'Done' ? 'bg-white/5 border-white/10 text-gray-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20'}`}>
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeClient(client.id)}
                        title="Remove"
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
        <AddClientForm onAdd={addClient} />

        {/* How automated reminders work */}
        <div className="mt-10 rounded-2xl border border-white/10 bg-[#0c0f1a]/80 p-6">
          <h3 className="text-white font-bold mb-4 flex items-center gap-2"><Clock className="w-4 h-4 text-blue-400" /> How Automated Reminders Work</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: '📋', title: 'You Add Clients', desc: 'Enter client name, filing type, due date and mobile number.' },
              { icon: '⏰', title: 'System Checks Daily', desc: 'Every morning at 9 AM, the system checks for filings due in 7 days or 1 day.' },
              { icon: '📱', title: 'WhatsApp Sent Auto', desc: 'Client receives a WhatsApp reminder. Done filings are automatically skipped.' },
            ].map(s => (
              <div key={s.title} className="flex gap-3">
                <span className="text-2xl">{s.icon}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{s.title}</p>
                  <p className="text-gray-400 text-xs mt-0.5 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center">
          <h3 className="text-white font-bold text-xl mb-2">Want This For Your CA Firm?</h3>
          <p className="text-gray-400 text-sm mb-5 max-w-md mx-auto">
            We set it up for you — connected to your WhatsApp, your client list, running 24/7. No technical knowledge needed.
          </p>
          <Link href="/contact"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-white font-semibold transition-all btn-glow"
            style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}>
            Get Free Setup →
          </Link>
        </div>

      </div>

      {/* WhatsApp Preview Modal */}
      {preview && <WhatsAppPreview client={preview} onClose={() => setPreview(null)} />}
    </div>
  );
}
