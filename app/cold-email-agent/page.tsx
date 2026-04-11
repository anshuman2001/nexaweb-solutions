'use client';

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import * as XLSX from 'xlsx';
import {
  Mail, Upload, Play, Pause, BarChart2, Users, CheckCircle, Clock,
  Zap, Eye, MousePointer, RefreshCw, Download, Search, Plus,
  Send, FileSpreadsheet, Sparkles, AlertCircle, CalendarDays,
  Settings, Home, TrendingUp, Copy, Check, Bell, BellOff,
  Menu, X, ArrowRight, Repeat, Timer, MailCheck, MailX, CircleDot
} from 'lucide-react';

const API_BASE = process.env.NEXT_PUBLIC_COLD_EMAIL_API || 'https://cold-email-backend-ft53.onrender.com';

/* ─── Types ───────────────────────────────────────────────────────────────── */
type LeadStatus = 'pending' | 'sent' | 'opened' | 'clicked' | 'replied' | 'failed' | 'unsubscribed';

type FollowUp = {
  day: number;
  status: 'waiting' | 'ready' | 'sent' | 'failed';
  email?: string;
  sentAt?: string;
};

type Lead = {
  id: string;
  name: string;
  email: string;
  business: string;
  website?: string;
  city?: string;
  status: LeadStatus;
  generatedEmail?: string;
  sentAt?: string;
  sentDate?: Date;
  followUps: FollowUp[];
};

type Tab = 'dashboard' | 'upload' | 'compose' | 'campaigns' | 'followups' | 'analytics' | 'settings';

/* ─── Status Config ────────────────────────────────────────────────────────── */
const STATUS: Record<LeadStatus, { color: string; label: string; bg: string; icon: any }> = {
  pending:     { color: '#94a3b8', label: 'Pending',      bg: 'rgba(148,163,184,0.1)', icon: CircleDot },
  sent:        { color: '#3b82f6', label: 'Sent',         bg: 'rgba(59,130,246,0.1)',  icon: Send },
  opened:      { color: '#f59e0b', label: 'Opened',       bg: 'rgba(245,158,11,0.1)',  icon: Eye },
  clicked:     { color: '#8b5cf6', label: 'Clicked',      bg: 'rgba(139,92,246,0.1)',  icon: MousePointer },
  replied:     { color: '#10b981', label: 'Replied',      bg: 'rgba(16,185,129,0.1)',  icon: MailCheck },
  failed:      { color: '#ef4444', label: 'Failed',       bg: 'rgba(239,68,68,0.1)',   icon: MailX },
  unsubscribed:{ color: '#6b7280', label: 'Unsubscribed', bg: 'rgba(107,114,128,0.1)', icon: BellOff },
};

const ALL_DAYS = [1, 2, 3, 5, 7, 10, 14, 21, 30];

/* ─── Helper: days since sent ─────────────────────────────────────────────── */
function daysSince(date?: Date): number {
  if (!date) return 0;
  return Math.floor((Date.now() - date.getTime()) / 86400000);
}

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

/* ─── Day Badge ──────────────────────────────────────────────────────────────── */
function DayBadge({ day, active, onClick }: { day: number; active: boolean; onClick: () => void }) {
  return (
    <button onClick={onClick} className="flex flex-col items-center gap-1 px-3 py-2 rounded-xl font-semibold text-xs transition-all"
      style={{
        background: active ? 'linear-gradient(135deg,#6366f1,#3b82f6)' : 'rgba(255,255,255,0.05)',
        color: active ? '#fff' : '#94a3b8',
        border: active ? '1px solid rgba(99,102,241,0.5)' : '1px solid rgba(255,255,255,0.1)',
        transform: active ? 'scale(1.05)' : 'scale(1)',
      }}>
      <span className="text-base font-extrabold">{day}</span>
      <span style={{ color: active ? 'rgba(255,255,255,0.8)' : '#64748b' }}>day</span>
    </button>
  );
}

/* ─── Follow-up Status Badge ──────────────────────────────────────────────── */
function FUBadge({ fu }: { fu: FollowUp }) {
  const cfg = {
    waiting:  { color: '#64748b', label: 'Waiting',  bg: 'rgba(100,116,139,0.1)' },
    ready:    { color: '#f59e0b', label: 'Ready',    bg: 'rgba(245,158,11,0.1)' },
    sent:     { color: '#10b981', label: 'Sent',     bg: 'rgba(16,185,129,0.1)' },
    failed:   { color: '#ef4444', label: 'Failed',   bg: 'rgba(239,68,68,0.1)' },
  }[fu.status];
  return (
    <span className="text-xs px-2 py-0.5 rounded-full font-medium whitespace-nowrap"
      style={{ background: cfg.bg, color: cfg.color }}>
      D{fu.day}: {cfg.label}
    </span>
  );
}

/* ─── Main Component ───────────────────────────────────────────────────────── */
export default function ColdEmailAgent() {
  const [tab, setTab] = useState<Tab>('dashboard');
  const [leads, setLeads] = useState<Lead[]>([]);
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [sending, setSending] = useState(false);
  const [progress, setProgress] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  const [previewLead, setPreviewLead] = useState<Lead | null>(null);
  const [previewFU, setPreviewFU] = useState<{ lead: Lead; fu: FollowUp } | null>(null);
  const [copied, setCopied] = useState('');

  /* ── Follow-up Config ── */
  const [selectedDays, setSelectedDays] = useState<number[]>([3, 7, 14]);
  const [fuGenerating, setFuGenerating] = useState(false);
  const [fuSending, setFuSending] = useState(false);
  const [fuProgress, setFuProgress] = useState(0);

  /* ── Settings — load from localStorage ── */
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('cold_email_settings');
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      senderName: 'Anshuman — DigiAgentix',
      senderEmail: 'info@digiagentix.com',
      subject: "Quick question about {business}'s online presence",
      fuSubject: 'Following up — {business}',
      delaySeconds: 5,
      service: 'website',
      sendgridKey: '',
      tone: 'friendly',
    };
  });
  const [settingsSaved, setSettingsSaved] = useState(false);

  const saveSettings = () => {
    try {
      localStorage.setItem('cold_email_settings', JSON.stringify(settings));
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 2500);
    } catch {}
  };

  const fileRef = useRef<HTMLInputElement>(null);
  const addLog = (msg: string) => setLog(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 99)]);

  /* ── Toggle follow-up day ── */
  const toggleDay = (day: number) => {
    setSelectedDays(prev =>
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day].sort((a, b) => a - b)
    );
  };

  /* ── Apply follow-up schedule to all sent leads ── */
  const applySchedule = () => {
    setLeads(prev => prev.map(l => {
      if (!['sent', 'opened', 'clicked'].includes(l.status)) return l;
      const existing = l.followUps || [];
      const merged = selectedDays.map(day => {
        const ex = existing.find(f => f.day === day);
        return ex || { day, status: 'waiting' as const };
      });
      return { ...l, followUps: merged };
    }));
    addLog(`✅ Follow-up schedule applied: Day ${selectedDays.join(', ')} for all sent leads`);
  };

  /* ── Mark ready follow-ups (days elapsed) ── */
  const refreshReady = () => {
    setLeads(prev => prev.map(l => ({
      ...l,
      followUps: (l.followUps || []).map(fu => {
        if (fu.status !== 'waiting') return fu;
        const elapsed = daysSince(l.sentDate);
        return elapsed >= fu.day ? { ...fu, status: 'ready' as const } : fu;
      }),
    })));
    addLog('🔄 Checked ready follow-ups');
  };

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
        name: row['name'] || row['Name'] || row['full_name'] || 'Business Owner',
        email: row['email'] || row['Email'] || row['email_address'] || '',
        business: row['business'] || row['Business'] || row['company'] || row['Company'] || 'Your Company',
        website: row['website'] || row['Website'] || '',
        city: row['city'] || row['City'] || '',
        status: 'pending' as LeadStatus,
        followUps: [],
      })).filter(l => l.email.includes('@'));
      setLeads(prev => [...prev, ...parsed]);
      addLog(`✅ Imported ${parsed.length} leads from ${file.name}`);
      setTab('upload');
    };
    reader.readAsArrayBuffer(file);
  }, []);

  /* ── Fetch with timeout helper ── */
  const fetchWithTimeout = async (url: string, options: RequestInit, timeoutMs = 45000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(id);
      return res;
    } catch (e: any) {
      clearTimeout(id);
      if (e?.name === 'AbortError') throw new Error('Request timed out (45s). Backend may be waking up — try again.');
      throw e;
    }
  };

  /* ── Wake up backend ── */
  const wakeBackend = async (): Promise<boolean> => {
    addLog('⏳ Waking up backend (Render free tier — up to 30s)...');
    try {
      const res = await fetchWithTimeout(`${API_BASE}/`, {}, 60000);
      if (res.ok) { addLog('✅ Backend is live!'); return true; }
      addLog(`❌ Backend returned ${res.status}. Check Render logs.`); return false;
    } catch (e: any) {
      addLog(`❌ Cannot reach backend: ${e.message}`);
      addLog(`🔗 Backend URL: ${API_BASE}`);
      return false;
    }
  };

  /* ── Generate Initial Emails ── */
  const generateEmails = async () => {
    const targets = leads.filter(l => l.status === 'pending' && !l.generatedEmail);
    if (!targets.length) return addLog('⚠️ No pending leads without emails');
    setGenerating(true); setProgress(0);

    const alive = await wakeBackend();
    if (!alive) { setGenerating(false); return; }

    addLog(`🤖 Generating AI emails for ${targets.length} leads...`);
    for (let i = 0; i < targets.length; i++) {
      const lead = targets[i];
      try {
        const res = await fetchWithTimeout(`${API_BASE}/email/generate`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: lead.name, business: lead.business, website: lead.website, city: lead.city, service: settings.service, sender_name: settings.senderName, tone: settings.tone }),
        });
        if (!res.ok) { addLog(`❌ Server error ${res.status} for ${lead.name}`); continue; }
        const data = await res.json();
        if (data.email) {
          setLeads(prev => prev.map(l => l.id === lead.id ? { ...l, generatedEmail: data.email } : l));
          addLog(`✍️ Email generated for ${lead.name}`);
        } else {
          addLog(`⚠️ No email returned for ${lead.name}: ${JSON.stringify(data)}`);
        }
      } catch (e: any) { addLog(`❌ Failed for ${lead.name}: ${e.message}`); }
      setProgress(Math.round(((i + 1) / targets.length) * 100));
      await new Promise(r => setTimeout(r, 500));
    }
    setGenerating(false);
    addLog('✅ All emails generated!');
  };

  /* ── Generate Follow-up Emails ── */
  const generateFollowUps = async () => {
    const targets = leads.filter(l =>
      (l.followUps || []).some(fu => fu.status === 'ready' && !fu.email)
    );
    if (!targets.length) return addLog('⚠️ No ready follow-ups to generate. Apply schedule first.');
    setFuGenerating(true); setFuProgress(0);

    const alive = await wakeBackend();
    if (!alive) { setFuGenerating(false); return; }

    addLog(`🤖 Generating follow-up emails for ${targets.length} leads...`);
    let done = 0;
    for (const lead of targets) {
      const readyFUs = (lead.followUps || []).filter(fu => fu.status === 'ready' && !fu.email);
      for (const fu of readyFUs) {
        try {
          const res = await fetchWithTimeout(`${API_BASE}/email/followup`, {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: lead.name, business: lead.business, followup_number: selectedDays.indexOf(fu.day) + 1, sender_name: settings.senderName, day: fu.day }),
          });
          const data = await res.json();
          setLeads(prev => prev.map(l => l.id === lead.id ? {
            ...l, followUps: l.followUps.map(f => f.day === fu.day ? { ...f, email: data.email } : f)
          } : l));
          addLog(`✍️ Follow-up Day ${fu.day} generated for ${lead.name}`);
        } catch (e: any) { addLog(`❌ Failed follow-up Day ${fu.day} for ${lead.name}: ${e.message}`); }
        await new Promise(r => setTimeout(r, 500));
      }
      done++;
      setFuProgress(Math.round((done / targets.length) * 100));
    }
    setFuGenerating(false);
    addLog('✅ All follow-up emails generated!');
  };

  /* ── Send Initial Emails ── */
  const sendEmails = async () => {
    const targets = leads.filter(l => l.generatedEmail && l.status === 'pending');
    if (!targets.length) return addLog('⚠️ No emails ready. Generate first.');
    if (!settings.sendgridKey) return addLog('⚠️ Add SendGrid API key in Settings');
    setSending(true); setProgress(0);
    addLog(`📤 Sending ${targets.length} emails...`);
    for (let i = 0; i < targets.length; i++) {
      const lead = targets[i];
      try {
        const res = await fetchWithTimeout(`${API_BASE}/email/send`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ to_email: lead.email, to_name: lead.name, subject: settings.subject.replace('{business}', lead.business), body: lead.generatedEmail, from_email: settings.senderEmail, from_name: settings.senderName, sendgrid_key: settings.sendgridKey }),
        });
        const data = await res.json();
        const now = new Date();
        setLeads(prev => prev.map(l => l.id === lead.id ? {
          ...l,
          status: data.success ? 'sent' : 'failed',
          sentAt: now.toLocaleTimeString(),
          sentDate: now,
          followUps: selectedDays.map(day => ({ day, status: 'waiting' as const })),
        } : l));
        addLog(data.success ? `✅ Sent → ${lead.email}` : `❌ Failed → ${lead.email}: ${data.error || ''}`);
      } catch (e: any) { addLog(`❌ Error sending to ${lead.email}: ${e.message}`); }
      setProgress(Math.round(((i + 1) / targets.length) * 100));
      await new Promise(r => setTimeout(r, settings.delaySeconds * 1000));
    }
    setSending(false);
    addLog('🎉 Campaign sent! Follow-up schedule activated.');
  };

  /* ── Send Follow-up Emails ── */
  const sendFollowUps = async () => {
    const pairs: { lead: Lead; fu: FollowUp }[] = [];
    leads.forEach(l => (l.followUps || []).forEach(fu => {
      if (fu.status === 'ready' && fu.email) pairs.push({ lead: l, fu });
    }));
    if (!pairs.length) return addLog('⚠️ No follow-ups ready to send. Generate them first.');
    if (!settings.sendgridKey) return addLog('⚠️ Add SendGrid API key in Settings');
    setFuSending(true); setFuProgress(0);
    addLog(`📤 Sending ${pairs.length} follow-up emails...`);
    for (let i = 0; i < pairs.length; i++) {
      const { lead, fu } = pairs[i];
      try {
        const res = await fetchWithTimeout(`${API_BASE}/email/send`, {
          method: 'POST', headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ to_email: lead.email, to_name: lead.name, subject: settings.fuSubject.replace('{business}', lead.business), body: fu.email, from_email: settings.senderEmail, from_name: settings.senderName, sendgrid_key: settings.sendgridKey }),
        });
        const data = await res.json();
        setLeads(prev => prev.map(l => l.id === lead.id ? {
          ...l, followUps: l.followUps.map(f => f.day === fu.day ? { ...f, status: data.success ? 'sent' : 'failed', sentAt: new Date().toLocaleTimeString() } : f)
        } : l));
        addLog(data.success ? `✅ Follow-up Day ${fu.day} sent → ${lead.email}` : `❌ Failed → ${lead.email}: ${data.error || ''}`);
      } catch (e: any) { addLog(`❌ Error sending follow-up to ${lead.email}: ${e.message}`); }
      setFuProgress(Math.round(((i + 1) / pairs.length) * 100));
      await new Promise(r => setTimeout(r, settings.delaySeconds * 1000));
    }
    setFuSending(false);
    addLog('🎉 All follow-ups sent!');
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
    fuReady: leads.reduce((acc, l) => acc + (l.followUps || []).filter(fu => fu.status === 'ready').length, 0),
    fuSent: leads.reduce((acc, l) => acc + (l.followUps || []).filter(fu => fu.status === 'sent').length, 0),
    fuGenerated: leads.reduce((acc, l) => acc + (l.followUps || []).filter(fu => fu.email).length, 0),
  };

  const navItems: { id: Tab; icon: any; label: string; badge?: number }[] = [
    { id: 'dashboard',  icon: Home,          label: 'Dashboard' },
    { id: 'upload',     icon: FileSpreadsheet,label: 'Leads',    badge: stats.total },
    { id: 'compose',    icon: Sparkles,       label: 'AI Compose' },
    { id: 'campaigns',  icon: Send,           label: 'Send Campaign' },
    { id: 'followups',  icon: Repeat,         label: 'Follow-ups',  badge: stats.fuReady },
    { id: 'analytics',  icon: BarChart2,      label: 'Analytics' },
    { id: 'settings',   icon: Settings,       label: 'Settings' },
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
            <div className="text-xs" style={{ color: '#818cf8' }}>AI Agent</div>
          </div>
        </div>

        {/* Summary pill */}
        <div className="mx-4 mt-4 mb-2 px-3 py-2 rounded-lg" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}>
          <div className="text-xs text-gray-400">{stats.total} leads · {stats.sent} sent · {stats.fuReady} follow-ups ready</div>
        </div>

        <nav className="flex-1 px-3 py-2 overflow-y-auto">
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setTab(item.id); setSidebarOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-sm text-left transition-all"
              style={{ background: tab === item.id ? 'rgba(99,102,241,0.12)' : 'transparent', color: tab === item.id ? '#818cf8' : '#94a3b8', border: tab === item.id ? '1px solid rgba(99,102,241,0.25)' : '1px solid transparent' }}>
              <item.icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.badge != null && item.badge > 0 && (
                <span className="text-xs px-1.5 py-0.5 rounded-full font-bold" style={{ background: item.id === 'followups' ? '#f59e0b' : '#6366f1', color: '#fff' }}>{item.badge}</span>
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
            <h1 className="font-bold text-white capitalize">{tab === 'followups' ? 'Follow-up Sequences' : tab === 'compose' ? 'AI Compose' : tab}</h1>
          </div>
          {(generating || sending || fuGenerating || fuSending) && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs" style={{ background: 'rgba(99,102,241,0.1)', color: '#818cf8' }}>
              <RefreshCw className="w-3 h-3 animate-spin" />
              {generating ? `Generating ${progress}%` : sending ? `Sending ${progress}%` : fuGenerating ? `FU Generating ${fuProgress}%` : `FU Sending ${fuProgress}%`}
            </div>
          )}
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">

          {/* ══ DASHBOARD ══════════════════════════════════════════════════════ */}
          {tab === 'dashboard' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Users}    label="Total Leads"    value={stats.total}    color="#6366f1" sub="Imported from Excel" />
                <StatCard icon={Send}     label="Emails Sent"    value={stats.sent}     color="#3b82f6" sub={stats.total > 0 ? `${Math.round((stats.sent/stats.total)*100)}% sent` : '0%'} />
                <StatCard icon={Repeat}   label="Follow-ups Sent" value={stats.fuSent} color="#f59e0b" sub={`${stats.fuReady} ready to send`} />
                <StatCard icon={MailCheck} label="Replied"       value={stats.replied}  color="#10b981" sub={stats.sent > 0 ? `${Math.round((stats.replied/stats.sent)*100)}% reply rate` : '0%'} />
              </div>

              {/* Quick actions */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: Upload,       title: 'Upload Excel',      desc: 'Import USA leads',        tab: 'upload'    as Tab, color: '#6366f1' },
                  { icon: Sparkles,     title: 'Generate Emails',   desc: 'AI personalizes each one',tab: 'compose'   as Tab, color: '#3b82f6' },
                  { icon: Send,         title: 'Send Campaign',      desc: 'Bulk send with delay',   tab: 'campaigns' as Tab, color: '#10b981' },
                  { icon: Repeat,       title: 'Follow-ups',         desc: `${stats.fuReady} ready`, tab: 'followups' as Tab, color: '#f59e0b' },
                ].map((a, i) => (
                  <button key={i} onClick={() => setTab(a.tab)} className="p-5 rounded-2xl text-left hover:scale-105 transition-all" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${a.color}20` }}>
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: `${a.color}15` }}>
                      <a.icon className="w-5 h-5" style={{ color: a.color }} />
                    </div>
                    <div className="font-semibold text-white mb-0.5">{a.title}</div>
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
                <div className="p-4 space-y-1 max-h-56 overflow-y-auto font-mono" style={{ background: '#030c1a' }}>
                  {log.length === 0
                    ? <div className="text-center text-gray-500 text-sm py-6">No activity yet — upload leads to start</div>
                    : log.map((l, i) => (
                        <div key={i} className="text-xs" style={{ color: l.includes('❌') ? '#ef4444' : l.includes('✅') || l.includes('🎉') ? '#10b981' : '#94a3b8' }}>{l}</div>
                      ))}
                </div>
              </div>
            </div>
          )}

          {/* ══ UPLOAD / LEADS ══════════════════════════════════════════════════ */}
          {tab === 'upload' && (
            <div className="space-y-5">
              <div className="rounded-2xl p-10 text-center cursor-pointer" style={{ border: '2px dashed rgba(99,102,241,0.3)', background: 'rgba(99,102,241,0.04)' }}
                onClick={() => fileRef.current?.click()} onDragOver={e => e.preventDefault()}
                onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) parseExcel(f); }}>
                <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={e => { const f = e.target.files?.[0]; if (f) parseExcel(f); }} />
                <FileSpreadsheet className="w-12 h-12 mx-auto mb-3" style={{ color: '#6366f1' }} />
                <div className="font-bold text-white text-lg mb-2">Drop Your USA Excel / CSV File Here</div>
                <div className="text-gray-400 text-sm mb-4">Columns: <span style={{ color: '#818cf8' }}>name, email, business</span> (optional: website, city)</div>
                <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm" style={{ background: 'linear-gradient(135deg,#6366f1,#3b82f6)' }}>
                  <Upload className="w-4 h-4" /> Choose File
                </div>
              </div>

              {leads.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="relative flex-1">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input type="text" placeholder="Search leads..." value={search} onChange={e => setSearch(e.target.value)} className="w-full pl-9 pr-4 py-2 rounded-xl text-sm text-white" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    </div>
                    <span className="text-sm text-gray-400 flex-shrink-0">{filtered.length} leads</span>
                    <button onClick={() => setLeads([])} className="text-xs text-red-400 px-2 py-1 rounded-lg flex-shrink-0" style={{ background: 'rgba(239,68,68,0.1)' }}>Clear All</button>
                  </div>
                  <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="hidden sm:grid grid-cols-12 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500" style={{ background: 'rgba(255,255,255,0.04)' }}>
                      <div className="col-span-3">Name</div><div className="col-span-3">Email</div>
                      <div className="col-span-3">Business</div><div className="col-span-2">Status</div><div className="col-span-1">FU</div>
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
                          <div className="hidden sm:block col-span-1 text-xs" style={{ color: '#f59e0b' }}>
                            {(l.followUps || []).filter(f => f.status === 'sent').length}/{(l.followUps || []).length || '—'}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══ AI COMPOSE ══════════════════════════════════════════════════════ */}
          {tab === 'compose' && (
            <div className="space-y-5">
              <div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.08),rgba(59,130,246,0.08))', border: '1px solid rgba(99,102,241,0.2)' }}>
                <h3 className="font-bold text-white text-lg mb-2 flex items-center gap-2"><Sparkles className="w-5 h-5" style={{ color: '#818cf8' }} />AI Email Generator</h3>
                <p className="text-gray-400 text-sm mb-4">Claude AI writes a <strong className="text-white">unique 150-word personalized email</strong> for every single lead based on their business name & website.</p>
                <div className="grid sm:grid-cols-3 gap-4 mb-5">
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">Service to Pitch</label>
                    <select value={settings.service} onChange={e => setSettings((s: typeof settings) => ({ ...s, service: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl text-sm text-white" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                      <option value="website">Website Design & Development</option>
                      <option value="ai_agent">AI Agents & Automation</option>
                      <option value="both">Website + AI Agents</option>
                      <option value="seo">SEO & Digital Marketing</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">Tone</label>
                    <select value={settings.tone} onChange={e => setSettings((s: typeof settings) => ({ ...s, tone: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl text-sm text-white" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}>
                      <option value="friendly">Friendly & Casual</option>
                      <option value="professional">Professional</option>
                      <option value="direct">Direct & Bold</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs text-gray-400 mb-1.5 block">Your Name</label>
                    <input type="text" value={settings.senderName} onChange={e => setSettings((s: typeof settings) => ({ ...s, senderName: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl text-sm text-white" style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }} />
                  </div>
                </div>
                {generating && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1.5"><span>Generating...</span><span>{progress}%</span></div>
                    <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <div className="h-2 rounded-full transition-all" style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#6366f1,#3b82f6)' }} />
                    </div>
                  </div>
                )}
                <button onClick={generateEmails} disabled={generating || leads.length === 0} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-white text-sm disabled:opacity-50" style={{ background: generating ? 'rgba(99,102,241,0.3)' : 'linear-gradient(135deg,#6366f1,#3b82f6)' }}>
                  {generating ? <><RefreshCw className="w-4 h-4 animate-spin" />Generating...</> : <><Sparkles className="w-4 h-4" />Generate All Emails ({leads.filter(l => !l.generatedEmail).length} pending)</>}
                </button>
              </div>

              {leads.filter(l => l.generatedEmail).length > 0 && (
                <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="px-5 py-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <h3 className="text-sm font-semibold text-white">{leads.filter(l => l.generatedEmail).length} Emails Ready — Click to Preview</h3>
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

          {/* ══ SEND CAMPAIGN ═══════════════════════════════════════════════════ */}
          {tab === 'campaigns' && (
            <div className="space-y-5">
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(16,185,129,0.05)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <h3 className="font-bold text-white text-lg mb-4 flex items-center gap-2"><Send className="w-5 h-5" style={{ color: '#10b981' }} />Launch Email Campaign</h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-5">
                  {[
                    { label: 'From Email', key: 'senderEmail', type: 'email', placeholder: 'info@digiagentix.com' },
                    { label: 'Subject Line ({business} = auto-replaced)', key: 'subject', type: 'text', placeholder: "Quick question about {business}'s website" },
                    { label: 'Delay Between Emails (seconds)', key: 'delaySeconds', type: 'number', placeholder: '5' },
                    { label: 'SendGrid API Key', key: 'sendgridKey', type: 'password', placeholder: 'SG.xxxxxxxx' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="text-xs text-gray-400 mb-1.5 block">{f.label}</label>
                      <input type={f.type} value={(settings as any)[f.key]} onChange={e => setSettings((s: typeof settings) => ({ ...s, [f.key]: f.type === 'number' ? +e.target.value : e.target.value }))} placeholder={f.placeholder} className="w-full px-4 py-2.5 rounded-xl text-sm text-white" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }} />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: 'Ready to Send', val: leads.filter(l => l.generatedEmail && l.status === 'pending').length, color: '#10b981' },
                    { label: 'Already Sent', val: stats.sent, color: '#3b82f6' },
                    { label: 'Est. Time', val: `${Math.ceil(leads.filter(l => l.generatedEmail && l.status === 'pending').length * settings.delaySeconds / 60)}m`, color: '#f59e0b' },
                  ].map(s => (
                    <div key={s.label} className="text-center p-3 rounded-xl" style={{ background: 'rgba(0,0,0,0.2)' }}>
                      <div className="text-xl font-bold" style={{ color: s.color }}>{s.val}</div>
                      <div className="text-xs text-gray-400">{s.label}</div>
                    </div>
                  ))}
                </div>
                {sending && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1.5"><span>Sending...</span><span>{progress}%</span></div>
                    <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <div className="h-2 rounded-full transition-all" style={{ width: `${progress}%`, background: 'linear-gradient(90deg,#10b981,#3b82f6)' }} />
                    </div>
                  </div>
                )}
                <button onClick={sendEmails} disabled={sending || stats.generated === 0} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white disabled:opacity-50" style={{ background: 'linear-gradient(135deg,#10b981,#3b82f6)' }}>
                  {sending ? <><RefreshCw className="w-4 h-4 animate-spin" />Sending...</> : <><Send className="w-4 h-4" />Send {leads.filter(l => l.generatedEmail && l.status === 'pending').length} Emails</>}
                </button>
              </div>

              {/* Live Log */}
              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="px-5 py-3" style={{ background: 'rgba(255,255,255,0.04)' }}><h3 className="text-sm font-semibold text-white">Send Log</h3></div>
                <div className="p-4 space-y-1 max-h-52 overflow-y-auto font-mono" style={{ background: '#030c1a' }}>
                  {log.length === 0 ? <div className="text-gray-500 text-xs text-center py-4">Logs appear here when sending</div>
                    : log.map((l, i) => <div key={i} className="text-xs" style={{ color: l.includes('❌') ? '#ef4444' : l.includes('✅') || l.includes('🎉') ? '#10b981' : '#94a3b8' }}>{l}</div>)}
                </div>
              </div>
            </div>
          )}

          {/* ══ FOLLOW-UPS ══════════════════════════════════════════════════════ */}
          {tab === 'followups' && (
            <div className="space-y-6">

              {/* ── Step 1: Select Days ── */}
              <div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg,rgba(245,158,11,0.06),rgba(239,68,68,0.06))', border: '1px solid rgba(245,158,11,0.2)' }}>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-black" style={{ background: '#f59e0b' }}>1</div>
                  <h3 className="font-bold text-white text-lg">Select Follow-up Days</h3>
                </div>
                <p className="text-gray-400 text-sm mb-5">Pick which days after sending to follow up. AI writes a <strong className="text-white">different email</strong> for each follow-up.</p>

                {/* Day picker */}
                <div className="flex flex-wrap gap-3 mb-5">
                  {ALL_DAYS.map(day => (
                    <DayBadge key={day} day={day} active={selectedDays.includes(day)} onClick={() => toggleDay(day)} />
                  ))}
                </div>

                {/* Custom day */}
                <div className="flex items-center gap-3 mb-5">
                  <input type="number" min={1} max={60} placeholder="Custom day (e.g. 45)"
                    className="w-40 px-3 py-2 rounded-xl text-sm text-white"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
                    onKeyDown={e => { if (e.key === 'Enter') { const v = +(e.target as HTMLInputElement).value; if (v > 0 && !selectedDays.includes(v)) { setSelectedDays(prev => [...prev, v].sort((a,b)=>a-b)); (e.target as HTMLInputElement).value=''; } } }}
                  />
                  <span className="text-xs text-gray-400">Press Enter to add custom day</span>
                </div>

                {/* Selected summary */}
                {selectedDays.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-5">
                    {selectedDays.map(d => (
                      <span key={d} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-semibold"
                        style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b', border: '1px solid rgba(245,158,11,0.3)' }}>
                        Day {d}
                        <button onClick={() => toggleDay(d)} className="hover:text-red-400 ml-0.5"><X className="w-3 h-3" /></button>
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex gap-3 flex-wrap">
                  <button onClick={() => setSelectedDays([3, 7, 14])} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8' }}>Quick: 3-7-14</button>
                  <button onClick={() => setSelectedDays([2, 5, 10, 21])} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8' }}>Aggressive: 2-5-10-21</button>
                  <button onClick={() => setSelectedDays([7, 14, 30])} className="text-xs px-3 py-1.5 rounded-lg" style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8' }}>Gentle: 7-14-30</button>
                  <button onClick={() => setSelectedDays([])} className="text-xs px-3 py-1.5 rounded-lg text-red-400" style={{ background: 'rgba(239,68,68,0.08)' }}>Clear All</button>
                </div>
              </div>

              {/* ── Step 2: Apply Schedule ── */}
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-black" style={{ background: '#3b82f6' }}>2</div>
                  <h3 className="font-bold text-white">Apply Schedule to Sent Leads</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">This attaches the follow-up plan to all <strong className="text-white">{stats.sent} sent leads</strong>. Then refresh to see which ones are due.</p>
                <div className="flex gap-3 flex-wrap">
                  <button onClick={applySchedule} disabled={selectedDays.length === 0 || stats.sent === 0} className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white disabled:opacity-40" style={{ background: 'linear-gradient(135deg,#3b82f6,#6366f1)' }}>
                    <CalendarDays className="w-4 h-4" />
                    Apply Day {selectedDays.join(', ')} Schedule
                  </button>
                  <button onClick={refreshReady} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm text-gray-300" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <RefreshCw className="w-4 h-4" />
                    Refresh Ready Status
                  </button>
                </div>
              </div>

              {/* ── Step 3: Generate Follow-up Emails ── */}
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-black" style={{ background: '#8b5cf6' }}>3</div>
                  <h3 className="font-bold text-white">Generate Follow-up Emails</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">Claude writes a <strong className="text-white">different angle email</strong> for each follow-up day. Day 3 = check-in. Day 7 = new value. Day 14 = last attempt.</p>
                {fuGenerating && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1.5"><span>Generating follow-ups...</span><span>{fuProgress}%</span></div>
                    <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <div className="h-2 rounded-full transition-all" style={{ width: `${fuProgress}%`, background: 'linear-gradient(90deg,#8b5cf6,#6366f1)' }} />
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 mb-4 flex-wrap">
                  <button onClick={generateFollowUps} disabled={fuGenerating || stats.fuReady === 0} className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm text-white disabled:opacity-40" style={{ background: fuGenerating ? 'rgba(139,92,246,0.3)' : 'linear-gradient(135deg,#8b5cf6,#6366f1)' }}>
                    {fuGenerating ? <><RefreshCw className="w-4 h-4 animate-spin" />Generating...</> : <><Sparkles className="w-4 h-4" />Generate Follow-ups ({stats.fuReady} ready)</>}
                  </button>
                  <span className="text-xs text-gray-500">{stats.fuGenerated} already generated</span>
                </div>
              </div>

              {/* ── Step 4: Send Follow-ups ── */}
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(16,185,129,0.04)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-black" style={{ background: '#10b981' }}>4</div>
                  <h3 className="font-bold text-white">Send Follow-up Emails</h3>
                </div>
                <p className="text-sm text-gray-400 mb-4">Sends all generated follow-ups that are in <span style={{ color: '#f59e0b' }}>Ready</span> status.</p>

                {/* Subject for follow-ups */}
                <div className="mb-4">
                  <label className="text-xs text-gray-400 mb-1.5 block">Follow-up Subject Line</label>
                  <input type="text" value={settings.fuSubject} onChange={e => setSettings((s: typeof settings) => ({ ...s, fuSubject: e.target.value }))} className="w-full sm:w-96 px-4 py-2.5 rounded-xl text-sm text-white" style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)' }} />
                </div>

                {fuSending && (
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-400 mb-1.5"><span>Sending follow-ups...</span><span>{fuProgress}%</span></div>
                    <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                      <div className="h-2 rounded-full transition-all" style={{ width: `${fuProgress}%`, background: 'linear-gradient(90deg,#10b981,#3b82f6)' }} />
                    </div>
                  </div>
                )}
                <button onClick={sendFollowUps} disabled={fuSending || stats.fuGenerated === 0} className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-white disabled:opacity-40" style={{ background: 'linear-gradient(135deg,#10b981,#3b82f6)' }}>
                  {fuSending ? <><RefreshCw className="w-4 h-4 animate-spin" />Sending...</> : <><Send className="w-4 h-4" />Send {leads.reduce((a,l)=>(l.followUps||[]).filter(f=>f.status==='ready'&&f.email).length+a,0)} Follow-ups</>}
                </button>
              </div>

              {/* ── Follow-up Status per Lead ── */}
              {leads.some(l => (l.followUps || []).length > 0) && (
                <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="px-5 py-3 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.04)' }}>
                    <h3 className="text-sm font-semibold text-white">Follow-up Status Per Lead</h3>
                    <span className="text-xs text-gray-400">{stats.fuSent} sent · {stats.fuReady} ready · {stats.fuGenerated - stats.fuSent - stats.fuReady} waiting</span>
                  </div>
                  <div className="divide-y max-h-96 overflow-y-auto" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    {leads.filter(l => (l.followUps || []).length > 0).map(l => (
                      <div key={l.id} className="px-5 py-3">
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: 'linear-gradient(135deg,#6366f1,#3b82f6)' }}>{l.name[0]}</div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-white">{l.name} — <span className="text-gray-400">{l.business}</span></div>
                            <div className="text-xs text-gray-500 mb-2">{l.email} · Sent at {l.sentAt || '—'}</div>
                            <div className="flex flex-wrap gap-2">
                              {(l.followUps || []).map(fu => (
                                <button key={fu.day} onClick={() => fu.email && setPreviewFU({ lead: l, fu })}
                                  className="flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg transition-all"
                                  style={{
                                    background: fu.status === 'sent' ? 'rgba(16,185,129,0.12)' : fu.status === 'ready' ? 'rgba(245,158,11,0.12)' : fu.status === 'failed' ? 'rgba(239,68,68,0.12)' : 'rgba(255,255,255,0.05)',
                                    color: fu.status === 'sent' ? '#10b981' : fu.status === 'ready' ? '#f59e0b' : fu.status === 'failed' ? '#ef4444' : '#64748b',
                                    border: `1px solid ${fu.status === 'sent' ? 'rgba(16,185,129,0.2)' : fu.status === 'ready' ? 'rgba(245,158,11,0.2)' : 'rgba(255,255,255,0.08)'}`,
                                    cursor: fu.email ? 'pointer' : 'default',
                                  }}>
                                  <Timer className="w-3 h-3" />
                                  Day {fu.day}
                                  {fu.status === 'sent' && <CheckCircle className="w-3 h-3" />}
                                  {fu.status === 'ready' && <Bell className="w-3 h-3" />}
                                  {fu.email && <Eye className="w-3 h-3 opacity-60" />}
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ══ ANALYTICS ═══════════════════════════════════════════════════════ */}
          {tab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={Send}        label="Total Sent"      value={stats.sent}     color="#3b82f6" sub={`${stats.total > 0 ? Math.round((stats.sent/stats.total)*100) : 0}% of leads`} />
                <StatCard icon={Eye}         label="Opened"          value={stats.opened}   color="#f59e0b" sub={`${stats.sent > 0 ? Math.round((stats.opened/stats.sent)*100) : 0}% open rate`} />
                <StatCard icon={Repeat}      label="Follow-ups Sent" value={stats.fuSent}   color="#8b5cf6" sub={`${stats.fuReady} still ready`} />
                <StatCard icon={MailCheck}   label="Replied"         value={stats.replied}  color="#10b981" sub={`${stats.sent > 0 ? Math.round((stats.replied/stats.sent)*100) : 0}% reply rate`} />
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h3 className="font-semibold text-white mb-4">Email Status Breakdown</h3>
                  {(Object.keys(STATUS) as LeadStatus[]).map(key => {
                    const count = leads.filter(l => l.status === key).length;
                    const pct = leads.length > 0 ? Math.round((count / leads.length) * 100) : 0;
                    const s = STATUS[key];
                    return (
                      <div key={key} className="mb-3">
                        <div className="flex justify-between text-xs mb-1.5"><span className="text-gray-400">{s.label}</span><span style={{ color: s.color }}>{count} ({pct}%)</span></div>
                        <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                          <div className="h-1.5 rounded-full" style={{ width: `${pct}%`, background: s.color }} />
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h3 className="font-semibold text-white mb-4">Follow-up Performance</h3>
                  {selectedDays.map(day => {
                    const fuList = leads.flatMap(l => (l.followUps || []).filter(f => f.day === day));
                    const sent = fuList.filter(f => f.status === 'sent').length;
                    const ready = fuList.filter(f => f.status === 'ready').length;
                    const total = fuList.length;
                    return (
                      <div key={day} className="mb-3">
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-gray-400">Day {day} Follow-up</span>
                          <span style={{ color: '#10b981' }}>{sent} sent · <span style={{ color: '#f59e0b' }}>{ready} ready</span></span>
                        </div>
                        <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
                          <div className="h-1.5 rounded-full" style={{ width: total > 0 ? `${Math.round((sent/total)*100)}%` : '0%', background: '#10b981' }} />
                        </div>
                      </div>
                    );
                  })}
                  {selectedDays.length === 0 && <div className="text-gray-500 text-sm text-center py-4">No follow-up days selected yet</div>}

                  <div className="mt-5 p-4 rounded-xl" style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.15)' }}>
                    <div className="text-xs font-semibold text-indigo-300 mb-2">USA Benchmarks</div>
                    <div className="grid grid-cols-3 gap-2 text-center">
                      {[{ l: 'Open Rate', v: '28-35%' }, { l: 'Reply Rate', v: '5-10%' }, { l: 'FU Boost', v: '+22%' }].map(b => (
                        <div key={b.l}><div className="text-sm font-bold" style={{ color: '#818cf8' }}>{b.v}</div><div className="text-xs text-gray-500">{b.l}</div></div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ══ SETTINGS ════════════════════════════════════════════════════════ */}
          {tab === 'settings' && (
            <div className="space-y-5 max-w-2xl">
              <div className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 className="font-semibold text-white mb-4">Sender & API Settings</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Your Name', key: 'senderName', type: 'text' },
                    { label: 'From Email', key: 'senderEmail', type: 'email' },
                    { label: 'SendGrid API Key', key: 'sendgridKey', type: 'password' },
                    { label: 'Delay Between Emails (sec)', key: 'delaySeconds', type: 'number' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className="text-xs text-gray-400 mb-1.5 block">{f.label}</label>
                      <input type={f.type} value={(settings as any)[f.key]} onChange={e => setSettings((s: typeof settings) => ({ ...s, [f.key]: f.type === 'number' ? +e.target.value : e.target.value }))} className="w-full px-4 py-2.5 rounded-xl text-sm text-white" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    </div>
                  ))}
                </div>
              </div>
              {/* Save Button */}
              <button onClick={saveSettings} className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all w-full justify-center"
                style={{ background: settingsSaved ? 'linear-gradient(135deg,#10b981,#059669)' : 'linear-gradient(135deg,#6366f1,#3b82f6)', color: '#fff', boxShadow: settingsSaved ? '0 0 20px rgba(16,185,129,0.3)' : '0 0 20px rgba(99,102,241,0.3)' }}>
                {settingsSaved
                  ? <><CheckCircle className="w-4 h-4" />Settings Saved! ✓</>
                  : <><Check className="w-4 h-4" />Save Settings</>}
              </button>

              <div className="p-5 rounded-2xl" style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.2)' }}>
                <h3 className="font-semibold text-white mb-2">Get Free SendGrid API Key</h3>
                <ol className="text-sm text-gray-400 space-y-1 list-decimal list-inside">
                  <li>Go to <span style={{ color: '#818cf8' }}>sendgrid.com</span> → Sign up free</li>
                  <li>Settings → API Keys → Create API Key</li>
                  <li>Select "Full Access" → Create & View</li>
                  <li>Copy key starting with <span style={{ color: '#818cf8' }}>SG.</span> and paste above</li>
                </ol>
                <div className="mt-3 text-xs text-gray-500">Free: 100 emails/day · Paid $19.95/mo: 50,000/month</div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ── Email Preview Modal ── */}
      {previewLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)' }} onClick={() => setPreviewLead(null)}>
          <div className="w-full max-w-2xl rounded-2xl overflow-hidden" style={{ background: '#0f172a', border: '1px solid rgba(99,102,241,0.3)' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4" style={{ background: 'rgba(99,102,241,0.1)', borderBottom: '1px solid rgba(99,102,241,0.2)' }}>
              <div>
                <div className="font-semibold text-white">Initial Email — {previewLead.name}</div>
                <div className="text-xs text-gray-400">{previewLead.email}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { navigator.clipboard.writeText(previewLead.generatedEmail || ''); setCopied(previewLead.id); setTimeout(() => setCopied(''), 2000); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs" style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}>
                  {copied === previewLead.id ? <><Check className="w-3 h-3" />Copied!</> : <><Copy className="w-3 h-3" />Copy</>}
                </button>
                <button onClick={() => setPreviewLead(null)} className="text-gray-400"><X className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="p-5 max-h-96 overflow-y-auto">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed font-sans">{previewLead.generatedEmail}</pre>
            </div>
          </div>
        </div>
      )}

      {/* ── Follow-up Preview Modal ── */}
      {previewFU && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: 'rgba(0,0,0,0.85)' }} onClick={() => setPreviewFU(null)}>
          <div className="w-full max-w-2xl rounded-2xl overflow-hidden" style={{ background: '#0f172a', border: '1px solid rgba(245,158,11,0.3)' }} onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-5 py-4" style={{ background: 'rgba(245,158,11,0.08)', borderBottom: '1px solid rgba(245,158,11,0.2)' }}>
              <div>
                <div className="font-semibold text-white flex items-center gap-2">
                  <Timer className="w-4 h-4" style={{ color: '#f59e0b' }} />
                  Day {previewFU.fu.day} Follow-up — {previewFU.lead.name}
                </div>
                <div className="text-xs text-gray-400">{previewFU.lead.email} · Status: <span style={{ color: '#f59e0b' }}>{previewFU.fu.status}</span></div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => { navigator.clipboard.writeText(previewFU.fu.email || ''); setCopied(`fu_${previewFU.fu.day}_${previewFU.lead.id}`); setTimeout(() => setCopied(''), 2000); }} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs" style={{ background: 'rgba(245,158,11,0.15)', color: '#f59e0b' }}>
                  {copied === `fu_${previewFU.fu.day}_${previewFU.lead.id}` ? <><Check className="w-3 h-3" />Copied!</> : <><Copy className="w-3 h-3" />Copy</>}
                </button>
                <button onClick={() => setPreviewFU(null)} className="text-gray-400"><X className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="p-5 max-h-96 overflow-y-auto">
              <pre className="text-sm text-gray-300 whitespace-pre-wrap leading-relaxed font-sans">{previewFU.fu.email}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
