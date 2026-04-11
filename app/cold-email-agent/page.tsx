'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import * as XLSX from 'xlsx';
import {
  Mail, Upload, Play, Pause, BarChart2, Users, CheckCircle, Clock,
  Zap, Eye, MousePointer, RefreshCw, Download, Search, Plus,
  Send, FileSpreadsheet, Sparkles, AlertCircle, ChevronRight,
  Settings, Home, List, TrendingUp, Trash2, Copy, Check,
  Menu, X, Globe, Phone, ArrowRight
} from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_COLD_EMAIL_API || 'https://cold-email-backend.onrender.com';

/* ─── Types ───────────────────────────────────────────────────────────────── */
type Lead = {
  id: string; name: string; email: string; business: string;
  website?: string; city?: string; status: 'pending' | 'sent' | 'opened' | 'clicked' | 'replied' | 'failed';
  generatedEmail?: string; sentAt?: string;
};
type Tab = 'dashboard' | 'upload' | 'compose' | 'campaigns' | 'analytics' | 'settings';

/* ─── Status Config ────────────────────────────────────────────────────────── */
const STATUS = {
  pending:  { color: '#94a3b8', label: 'Pending',  bg: 'rgba(148,163,184,0.1)' },
  sent:     { color: '#3b82f6', label: 'Sent',     bg: 'rgba(59,130,246,0.1)'  },
  opened:   { color: '#f59e0b', label: 'Opened',   bg: 'rgba(245,158,11,0.1)'  },
  clicked:  { color: '#8b5cf6', label: 'Clicked',  bg: 'rgba(139,92,246,0.1)'  },
  replied:  { color: '#10b981', label: 'Replied',  bg: 'rgba(16,185,129,0.1)'  },
  failed:   { color: '#ef4444', label: 'Failed',   bg: 'rgba(239,68,68,0.1)'   },
};

/* ─── Stat Card ─────────────────────────────────────────────────────────────── */
function StatCard({ icon: Icon, label, value, color, sub }: any) {
  return (
    <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div className="text-2xl font-extrabold text-white mb-0.5">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
      {sub && <div className="text-xs mt-1" style={{ color }}>{sub}</div>}
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────────────────────── */
export default function ColdEmailAgent() {
  const [tab, setTab] = useState<Tab>('dashboard');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [generating, setGenerating] = useState(false);
  const [sending, setSending] = useState(false);
  const [search, setSearch] = useState('');
  const [previewLead, setPreviewLead] = useState<Lead | null>(null);
  const [copied, setCopied] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  const [settings, setSettings] = useState({
    senderName: 'Anshuman — DigiAgentix',
    senderEmail: 'info@digiagentix.com',
    subject: 'Quick question about {business}\'s online presence',
    delaySeconds: 5,
    service: 'website',
    sendgridKey: '',
  });
  const fileRef = useRef<HTMLInputElement>(null);

  /* ── Excel Parser ── */
  const parseExcel = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target?.result as ArrayBuffer);
      const wb = XLSX.read(data, { type: 'array' });
      const ws = wb.Sheets[wb.SheetNames[0]];
      const rows: any[] = XLSX.utils.sheet_to_json(ws, { defval: '' });
      const parsed: Lead[] = rows.map((row, i) => ({
        id: `lead_${i}_${Date.now()}`,
        name: row['name'] || row['Name'] || row['full_name'] || row['Full Name'] || 'Business Owner',
        email: row['email'] || row['Email'] || row['email_address'] || '',
        business: row['business'] || row['Business'] || row['company'] || row['Company'] || row['business_name'] || 'Your Company',
        website: row['website'] || row['Website'] || row['url'] || '',
        city: row['city'] || row['City'] || row['location'] || '',
        status: 'pending',
      })).filter(l => l.email.includes('@'));
      setLeads(prev => [...prev, ...parsed]);
      addLog(`✅ Imported ${parsed.length} leads from ${file.name}`);
      setTab('upload');
    };
    reader.readAsArrayBuffer(file);
  }, []);

  const addLog = (msg: string) => setLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 49)]);

  /* ── Generate Emails via Claude ── */
  const generateEmails = async () => {
    const targets = leads.filter(l => l.status === 'pending' && !l.generatedEmail);
    if (!targets.length) return addLog('⚠️ No pending leads without emails');
    setGenerating(true);
    setProgress(0);
    addLog(`🤖 Generating AI emails for ${targets.length} leads...`);
    for (let i = 0; i < targets.length; i++) {
      const lead = targets[i];
      try {
        const res = await fetch(`${API_BASE}/email/generate`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: lead.name, business: lead.business,
            website: lead.website, city: lead.city,
            service: settings.service,
            sender_name: settings.senderName,
          }),
        });
        const data = await res.json();
        setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, generatedEmail: data.email } : l));
        addLog(`✍️ Email generated for ${lead.name} — ${lead.business}`);
      } catch {
        addLog(`❌ Failed for ${lead.name}`);
      }
      setProgress(Math.round(((i + 1) / targets.length) * 100));
      await new Promise(r => setTimeout(r, 400));
    }
    setGenerating(false);
    addLog('✅ All emails generated!');
  };

  /* ── Send Emails ── */
  const sendEmails = async () => {
    const targets = leads.filter(l => l.generatedEmail && l.status === 'pending');
    if (!targets.length) return addLog('⚠️ No emails ready to send. Generate emails first.');
    if (!settings.sendgridKey && !settings.senderEmail) return addLog('⚠️ Add SendGrid API key in Settings first.');
    setSending(true);
    setProgress(0);
    addLog(`📤 Sending ${targets.length} emails...`);
    for (let i = 0; i < targets.length; i++) {
      const lead = targets[i];
      try {
        const res = await fetch(`${API_BASE}/email/send`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to_email: lead.email,
            to_name: lead.name,
            subject: settings.subject.replace('{business}', lead.business),
            body: lead.generatedEmail,
            from_email: settings.senderEmail,
            from_name: settings.senderName,
            sendgrid_key: settings.sendgridKey,
          }),
        });
        const data = await res.json();
        setLeads(prev => prev.map(l => l.id === lead.id ? {
          ...l, status: data.success ? 'sent' : 'failed', sentAt: new Date().toLocaleTimeString()
        } : l));
        addLog(data.success ? `✅ Sent → ${lead.email}` : `❌ Failed → ${lead.email}: ${data.error}`);
      } catch {
        setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, status: 'failed' } : l));
        addLog(`❌ Error sending to ${lead.email}`);
      }
      setProgress(Math.round(((i + 1) / targets.length) * 100));
      await new Promise(r => setTimeout(r, settings.delaySeconds * 1000));
    }
    setSending(false);
    addLog('🎉 Campaign complete!');
  };

  const filtered = leads.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.email.toLowerCase().includes(search.toLowerCase()) ||
    l.business.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: leads.length,
    sent: leads.filter(l => ['sent', 'opened', 'clicked', 'replied'].includes(l.status)).length,
    opened: leads.filter(l => ['opened', 'clicked', 'replied'].includes(l.status)).length,
    replied: leads.filter(l => l.status === 'replied').length,
    generated: leads.filter(l => l.generatedEmail).length,
  };

  const navItems: { id: Tab; icon: any; label: string }[] = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'upload', icon: FileSpreadsheet, label: 'Leads' },
    { id: 'compose', icon: Sparkles, label: 'AI Compose' },
    { id: 'campaigns', icon: Send, label: 'Send Campaign' },
    { id: 'analytics', icon: BarChart2, label: 'Analytics' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#020817', color: '#e2e8f0', fontFamily: 'system-ui,sans-serif' }}>

      {/* ── Sidebar ── */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        style={{ width: 240, background: '#010610', borderRight: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        <div className="p-5 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg,#6366f1,#3b82f6)' }}>
            <Mail className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-white text-sm">Cold Email</div>
            <div className="text-xs" style={{ color: '#6366f1' }}>AI Agent</div>
          </div>
        </div>

        {/* Stats pill */}
        <div className="mx-4 mt-4 mb-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
          <div className="text-xs text-gray-400">{stats.total} leads • {stats.generated} ready • {stats.sent} sent</div>
        </div>

        <nav className="flex-1 px-3 py-2 overflow-y-auto">
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setTab(item.id); setSidebarOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-sm text-left transition-all"
              style={{
                background: tab === item.id ? 'rgba(99,102,241,0.12)' : 'transparent',
                color: tab === item.id ? '#818cf8' : '#94a3b8',
                border: tab === item.id ? '1px solid rgba(99,102,241,0.25)' : '1px solid transparent',
              }}>
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
              {item.id === 'compose' && stats.total > 0 && stats.generated < stats.total && (
                <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full" style={{ background: '#6366f1', color: '#fff' }}>
                  {stats.total - stats.generated}
                </span>
              )}
            </button>
          ))}
        </nav>

        <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <Link href="/" className="block text-center text-xs text-gray-500 hover:text-gray-300">← DigiAgentix Home</Link>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center justify-between px-4 sm:px-6 py-3 flex-shrink-0" style={{ background: '#010610', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3">
            <button className="md:hidden text-gray-400" onClick={() => setSidebarOpen(true)}><Menu className="w-5 h-5" /></button>
            <h1 className="font-bold text-white capitalize">{tab === 'compose' ? 'AI Email Composer' : tab}</h1>
          </div>
          <div className="flex items-center gap-2">
            {(generating || sending) && (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs" style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8' }}>
                <RefreshCw className="w-3 h-3 animate-spin" />
                {generating ? `Generating ${progress}%` : `Sending ${progress}%`}
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">

          {/* ── DASHBOARD ── */}
          {tab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Users} label="Total Leads" value={stats.total} color="#6366f1" sub="Imported from Excel" />
                <StatCard icon={Sparkles} label="Emails Generated" value={stats.generated} color="#3b82f6" sub="AI personalized" />
                <StatCard icon={Send} label="Emails Sent" value={stats.sent} color="#10b981" sub={stats.total > 0 ? `${Math.round((stats.sent/stats.total)*100)}% sent` : '0%'} />
                <StatCard icon={Mail} label="Replies" value={stats.replied} color="#f59e0b" sub={stats.sent > 0 ? `${Math.round((stats.replied/stats.sent)*100)}% reply rate` : '0%'} />
              </div>

              {/* Quick actions */}
              <div className="grid sm:grid-cols-3 gap-4">
                {[
                  { icon: Upload, title: 'Upload Excel', desc: 'Import your USA leads database', tab: 'upload' as Tab, color: '#6366f1' },
                  { icon: Sparkles, title: 'Generate Emails', desc: 'AI writes personalized emails', tab: 'compose' as Tab, color: '#3b82f6' },
                  { icon: Send, title: 'Send Campaign', desc: 'Send to all leads at once', tab: 'campaigns' as Tab, color: '#10b981' },
                ].map((a, i) => (
                  <button key={i} onClick={() => setTab(a.tab)} className="p-5 rounded-2xl text-left hover:scale-105 transition-all" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${a.color}20` }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${a.color}15` }}>
                      <a.icon className="w-5 h-5" style={{ color: a.color }} />
                    </div>
                    <div className="font-semibold text-white mb-1">{a.title}</div>
                    <div className="text-xs text-gray-400">{a.desc}</div>
                  </button>
                ))}
              </div>

              {/* Activity log */}
              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="px-5 py-3 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <h3 className="text-sm font-semibold text-white">Activity Log</h3>
                  <button onClick={() => setLog([])} className="text-xs text-gray-500 hover:text-gray-300">Clear</button>
                </div>
                <div className="p-4 space-y-2 max-h-48 overflow-y-auto" style={{ background: '#030c1a' }}>
                  {log.length === 0 ? (
                    <div className="text-center text-gray-500 text-sm py-4">No activity yet — upload leads to start</div>
                  ) : log.map((l, i) => (
                    <div key={i} className="text-xs font-mono" style={{ color: l.includes('❌') ? '#ef4444' : l.includes('✅') || l.includes('🎉') ? '#10b981' : '#94a3b8' }}>{l}</div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── UPLOAD / LEADS TAB ── */}
          {tab === 'upload' && (
            <div className="space-y-5">
              {/* Upload box */}
              <div
                className="rounded-2xl p-10 text-center cursor-pointer transition-all"
                style={{ border: '2px dashed rgba(99,102,241,0.3)', background: 'rgba(99,102,241,0.04)' }}
                onClick={() => fileRef.current?.click()}
                onDragOver={e => e.preventDefault()}
                onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) parseExcel(f); }}
              >
                <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) parseExcel(f); }} />
                <FileSpreadsheet className="w-12 h-12 mx-auto mb-3" style={{ color: '#6366f1' }} />
                <div className="font-bold text-white text-lg mb-2">Drop Your Excel / CSV File Here</div>
                <div className="text-gray-400 text-sm mb-4">Columns needed: <span style={{ color: '#818cf8' }}>name, email, business</span> (optional: website, city)</div>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm" style={{ background: 'linear-gradient(135deg,#6366f1,#3b82f6)' }}>
                  <Upload className="w-4 h-4" /> Choose File
                </div>
                <div className="mt-3 text-xs text-gray-500">Supports .xlsx, .xls, .csv — up to 10,000 leads</div>
              </div>

              {/* Sample format */}
              <div className="p-4 rounded-xl" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)' }}>
                <div className="text-xs font-semibold text-indigo-400 mb-2">📋 Your Excel should look like this:</div>
                <div className="overflow-x-auto">
                  <table className="text-xs w-full">
                    <thead>
                      <tr style={{ color: '#6366f1' }}>
                        {['name', 'email', 'business', 'website', 'city'].map(h => <th key={h} className="text-left pr-6 pb-1">{h}</th>)}
                      </tr>
                    </thead>
                    <tbody style={{ color: '#94a3b8' }}>
                      <tr><td className="pr-6">John Smith</td><td className="pr-6">john@smithlaw.com</td><td className="pr-6">Smith Law Firm</td><td className="pr-6">smithlaw.com</td><td>New York</td></tr>
                      <tr><td className="pr-6">Sarah Johnson</td><td className="pr-6">sarah@dentalcare.com</td><td className="pr-6">Denver Dental Care</td><td className="pr-6">dentalcare.com</td><td>Denver</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Leads table */}
              {leads.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" placeholder="Search leads..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9 pr-4 py-2 rounded-xl text-sm text-white w-56" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    </div>
                    <div className="flex gap-2">
                      <span className="text-sm text-gray-400">{filtered.length} leads</span>
                      <button onClick={() => setLeads([])} className="text-xs text-red-400 hover:text-red-300 px-2 py-1 rounded-lg" style={{ background: 'rgba(239,68,68,0.1)' }}>Clear All</button>
                    </div>
                  </div>
                  <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="hidden sm:grid grid-cols-12 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500" style={{ background: 'rgba(255,255,255,0.04)' }}>
                      <div className="col-span-3">Name</div><div className="col-span-3">Email</div>
                      <div className="col-span-3">Business</div><div className="col-span-2">Status</div><div className="col-span-1">Email</div>
                    </div>
                    <div className="divide-y max-h-96 overflow-y-auto" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                      {filtered.slice(0, 200).map(l => (
                        <div key={l.id} className="grid grid-cols-12 items-center px-5 py-3 hover:bg-white hover:bg-opacity-5">
                          <div className="col-span-6 sm:col-span-3 flex items-center gap-2">
                            <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg,#6366f1,#3b82f6)' }}>{l.name[0]}</div>
                            <span className="text-sm text-white truncate">{l.name}</span>
                          </div>
                          <div className="hidden sm:block col-span-3 text-xs text-gray-400 truncate">{l.email}</div>
                          <div className="hidden sm:block col-span-3 text-xs text-gray-400 truncate">{l.business}</div>
                          <div className="col-span-4 sm:col-span-2">
                            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: STATUS[l.status].bg, color: STATUS[l.status].color }}>{STATUS[l.status].label}</span>
                          </div>
                          <div className="col-span-2 sm:col-span-1">
                            {l.generatedEmail && (
                              <button onClick={() => setPreviewLead(l)} className="text-xs" style={{ color: '#6366f1' }}>
                                <Eye className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── AI COMPOSE TAB ── */}
          {tab === 'compose' && (
            <div className="space-y-5">
              <div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.08),rgba(59,130,246,0.08))', border: '1px solid rgba(99,102,241,0.2)' }}>
                <h3 className="font-bold text-white text-lg mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5" style={{ color: '#818cf8' }} />
                  AI Email Generator
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  Claude AI reads each lead's name, business & website and writes a <strong className="text-white">100% personalized</strong> cold email for website design or AI agent services.
                </p>
                <div className="grid sm:grid-cols-3 gap-4 mb-5">
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">Service to Pitch</label>
                    <select value={settings.service} onChange={e => setSettings(s => ({ ...s, service: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl text-sm text-white" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                      <option value="website">Website Design & Development</option>
                      <option value="ai_agent">AI Agents & Automation</option>
                      <option value="both">Website + AI Agents</option>
                      <option value="seo">SEO & Digital Marketing</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">Your Name</label>
                    <input type="text" value={settings.senderName} onChange={e => setSettings(s => ({ ...s, senderName: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl text-sm text-white" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">Tone</label>
                    <select className="w-full px-4 py-2.5 rounded-xl text-sm text-white" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                      <option>Friendly & Casual</option>
                      <option>Professional</option>
                      <option>Direct & Bold</option>
                    </select>
                  </div>
                </div>

                {/* Progress bar */}
                {generating && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1.5"><span>Generating emails...</span><span>{progress}%</span></div>
                    <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <div className="h-2 rounded-full transition-all" style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#6366f1,#3b82f6)' }} />
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={generateEmails} disabled={generating || leads.length === 0} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm disabled:opacity-50" style={{ background: generating ? 'rgba(99,102,241,0.3)' : 'linear-gradient(135deg,#6366f1,#3b82f6)', color: '#fff' }}>
                    {generating ? <><RefreshCw className="w-4 h-4 animate-spin" />Generating...</> : <><Sparkles className="w-4 h-4" />Generate All Emails ({leads.filter(l => !l.generatedEmail).length} pending)</>}
                  </button>
                </div>
              </div>

              {/* Preview generated emails */}
              {leads.filter(l => l.generatedEmail).length > 0 && (
                <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="px-5 py-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <h3 className="text-sm font-semibold text-white">{leads.filter(l => l.generatedEmail).length} Emails Generated — Click to Preview</h3>
                  </div>
                  <div className="divide-y max-h-96 overflow-y-auto" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                    {leads.filter(l => l.generatedEmail).map(l => (
                      <div key={l.id} className="flex items-center gap-4 px-5 py-3 hover:bg-white hover:bg-opacity-5 cursor-pointer" onClick={() => setPreviewLead(l)}>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg,#6366f1,#3b82f6)' }}>{l.name[0]}</div>
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-white">{l.name} — {l.business}</div>
                          <div className="text-xs text-gray-400 truncate">{l.email}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" style={{ color: '#10b981' }} />
                          <Eye className="w-4 h-4 text-gray-400" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── CAMPAIGNS / SEND TAB ── */}
          {tab === 'campaigns' && (
            <div className="space-y-5">
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <h3 className="font-bold text-white text-lg mb-2 flex items-center gap-2">
                  <Send className="w-5 h-5" style={{ color: '#10b981' }} />
                  Launch Email Campaign
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">From Email</label>
                    <input type="email" value={settings.senderEmail} onChange={e => setSettings(s => ({ ...s, senderEmail: e.target.value }))} placeholder="info@digiagentix.com" className="w-full px-4 py-2.5 rounded-xl text-sm text-white" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">Subject Line</label>
                    <input type="text" value={settings.subject} onChange={e => setSettings(s => ({ ...s, subject: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl text-sm text-white" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">Delay Between Emails (seconds)</label>
                    <input type="number" value={settings.delaySeconds} onChange={e => setSettings(s => ({ ...s, delaySeconds: +e.target.value }))} min={3} max={60} className="w-full px-4 py-2.5 rounded-xl text-sm text-white" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }} />
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">SendGrid API Key</label>
                    <input type="password" value={settings.sendgridKey} onChange={e => setSettings(s => ({ ...s, sendgridKey: e.target.value }))} placeholder="SG.xxxxxxxxxxxx" className="w-full px-4 py-2.5 rounded-xl text-sm text-white" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }} />
                  </div>
                </div>

                {/* Campaign summary */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: 'Ready to Send', val: leads.filter(l => l.generatedEmail && l.status === 'pending').length, color: '#10b981' },
                    { label: 'Already Sent', val: stats.sent, color: '#3b82f6' },
                    { label: 'Est. Time', val: `${Math.ceil(leads.filter(l => l.generatedEmail && l.status === 'pending').length * settings.delaySeconds / 60)} min`, color: '#f59e0b' },
                  ].map(s => (
                    <div key={s.label} className="text-center p-3 rounded-xl" style={{ background: 'rgba(0,0,0,0.2)' }}>
                      <div className="text-xl font-bold" style={{ color: s.color }}>{s.val}</div>
                      <div className="text-xs text-gray-400">{s.label}</div>
                    </div>
                  ))}
                </div>

                {sending && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1.5"><span>Sending emails...</span><span>{progress}%</span></div>
                    <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <div className="h-2 rounded-full transition-all" style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#10b981,#3b82f6)' }} />
                    </div>
                  </div>
                )}

                <div className="flex gap-3">
                  <button onClick={sendEmails} disabled={sending || stats.generated === 0} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white disabled:opacity-50" style={{ background: sending ? 'rgba(16,185,129,0.3)' : 'linear-gradient(135deg,#10b981,#3b82f6)' }}>
                    {sending ? <><RefreshCw className="w-4 h-4 animate-spin" />Sending...</> : <><Send className="w-4 h-4" />Send {leads.filter(l => l.generatedEmail && l.status === 'pending').length} Emails</>}
                  </button>
                  <button onClick={() => setTab('compose')} className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm text-gray-300" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <Sparkles className="w-4 h-4" />Generate First
                  </button>
                </div>
              </div>

              {/* Live log */}
              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="px-5 py-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <h3 className="text-sm font-semibold text-white">Send Log</h3>
                </div>
                <div className="p-4 space-y-1 max-h-64 overflow-y-auto font-mono" style={{ background: '#030c1a' }}>
                  {log.length === 0 ? <div className="text-gray-500 text-xs text-center py-4">Logs will appear here when sending starts</div>
                    : log.map((l, i) => (
                      <div key={i} className="text-xs" style={{ color: l.includes('❌') ? '#ef4444' : l.includes('✅') || l.includes('🎉') ? '#10b981' : '#94a3b8' }}>{l}</div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* ── ANALYTICS TAB ── */}
          {tab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Send} label="Total Sent" value={stats.sent} color="#3b82f6" sub="Delivered" />
                <StatCard icon={Eye} label="Opened" value={stats.opened} color="#f59e0b" sub={stats.sent > 0 ? `${Math.round((stats.opened/stats.sent)*100)}% open rate` : '0%'} />
                <StatCard icon={MousePointer} label="Clicked" value={leads.filter(l => l.status === 'clicked').length} color="#8b5cf6" sub="Clicked a link" />
                <StatCard icon={Mail} label="Replied" value={stats.replied} color="#10b981" sub={stats.sent > 0 ? `${Math.round((stats.replied/stats.sent)*100)}% reply rate` : '0%'} />
              </div>

              {/* Industry breakdown */}
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 className="font-semibold text-white mb-4">Email Status Breakdown</h3>
                {Object.entries(STATUS).map(([key, val]) => {
                  const count = leads.filter(l => l.status === key).length;
                  const pct = leads.length > 0 ? Math.round((count / leads.length) * 100) : 0;
                  return (
                    <div key={key} className="mb-3">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-400">{val.label}</span>
                        <span style={{ color: val.color }}>{count} ({pct}%)</span>
                      </div>
                      <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                        <div className="h-2 rounded-full" style={{ width: `${pct}%`, background: val.color }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 className="font-semibold text-white mb-3">USA Cold Email Benchmarks</h3>
                <div className="grid sm:grid-cols-3 gap-4 text-center">
                  {[
                    { label: 'Avg Open Rate', industry: '25–35%', yours: `${stats.sent > 0 ? Math.round((stats.opened / stats.sent) * 100) : 0}%`, color: '#f59e0b' },
                    { label: 'Avg Reply Rate', industry: '5–10%', yours: `${stats.sent > 0 ? Math.round((stats.replied / stats.sent) * 100) : 0}%`, color: '#10b981' },
                    { label: 'Avg Click Rate', industry: '3–5%', yours: `${stats.sent > 0 ? Math.round((leads.filter(l => l.status === 'clicked').length / stats.sent) * 100) : 0}%`, color: '#8b5cf6' },
                  ].map(m => (
                    <div key={m.label} className="p-3 rounded-xl" style={{ background: 'rgba(0,0,0,0.2)' }}>
                      <div className="text-2xl font-bold" style={{ color: m.color }}>{m.yours}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{m.label}</div>
                      <div className="text-xs mt-1" style={{ color: '#64748b' }}>Industry avg: {m.industry}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── SETTINGS TAB ── */}
          {tab === 'settings' && (
            <div className="space-y-5 max-w-2xl">
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 className="font-semibold text-white mb-4">Sender Settings</h3>
                <div className="space-y-4">
                  {[
                    { label: 'Your Name', key: 'senderName', type: 'text', placeholder: 'Anshuman — DigiAgentix' },
                    { label: 'From Email', key: 'senderEmail', type: 'email', placeholder: 'info@digiagentix.com' },
                    { label: 'SendGrid API Key', key: 'sendgridKey', type: 'password', placeholder: 'SG.xxxxxxxxxxxx' },
                    { label: 'Email Subject', key: 'subject', type: 'text', placeholder: 'Quick question about {business}' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="text-xs text-gray-400 mb-1.5 block">{f.label}</label>
                      <input type={f.type} value={(settings as any)[f.key]} onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))} placeholder={f.placeholder} className="w-full px-4 py-2.5 rounded-xl text-sm text-white" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    </div>
                  ))}
                </div>
              </div>
              <div className="p-5 rounded-2xl" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.2)' }}>
                <h3 className="font-semibold text-white mb-2">How to get SendGrid API Key (Free)</h3>
                <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
                  <li>Go to <span style={{ color: '#818cf8' }}>sendgrid.com</span> → Sign up free</li>
                  <li>Go to Settings → API Keys → Create API Key</li>
                  <li>Select "Full Access" → Create & View</li>
                  <li>Copy key starting with <span style={{ color: '#818cf8' }}>SG.</span></li>
                  <li>Paste above → Free 100 emails/day</li>
                </ol>
                <div className="mt-3 text-xs text-gray-500">💡 Paid plan: $19.95/mo = 50,000 emails/month</div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── Email Preview Modal ── */}
      {previewLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.8)' }} onClick={() => setPreviewLead(null)}>
          <div className="w-full max-w-2xl rounded-2xl overflow-hidden" style={{ background: '#0f172a', border: '1px solid rgba(99,102,241,0.3)' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4" style={{ background: 'rgba(99,102,241,0.1)', borderBottom: '1px solid rgba(99,102,241,0.2)' }}>
              <div>
                <div className="font-semibold text-white">{previewLead.name} — {previewLead.business}</div>
                <div className="text-xs text-gray-400">{previewLead.email}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => { navigator.clipboard.writeText(previewLead.generatedEmail || ''); setCopied(previewLead.id); setTimeout(() => setCopied(''), 2000); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs" style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}>
                  {copied === previewLead.id ? <><Check className="w-3 h-3" />Copied!</> : <><Copy className="w-3 h-3" />Copy</>}
                </button>
                <button onClick={() => setPreviewLead(null)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="p-5 max-h-96 overflow-y-auto">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed font-sans">{previewLead.generatedEmail}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
