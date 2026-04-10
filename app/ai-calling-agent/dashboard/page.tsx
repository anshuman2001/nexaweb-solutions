'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Phone, PhoneCall, PhoneOff, PhoneMissed, BarChart2, Users, Upload,
  Play, Pause, Plus, Search, Filter, Download, RefreshCw, CheckCircle,
  Clock, TrendingUp, ArrowUp, ArrowDown, X, ChevronRight, Mic,
  MessageSquare, Database, Settings, LogOut, Menu, Bell, Eye,
  FileText, Zap, AlertCircle, Globe, Home, List, Activity
} from 'lucide-react';

/* ─── Types ───────────────────────────────────────────────────────────────── */
type Lead = {
  id: string; name: string; phone: string; industry: string;
  status: 'pending' | 'calling' | 'completed' | 'failed' | 'callback';
  interest: 'high' | 'medium' | 'low' | null;
  duration: string; time: string; note: string;
};

type Tab = 'dashboard' | 'leads' | 'campaigns' | 'calls' | 'analytics' | 'crm' | 'settings';

/* ─── Mock Data ────────────────────────────────────────────────────────────── */
const MOCK_LEADS: Lead[] = [
  { id: '1', name: 'Rajesh Kumar', phone: '+91-98765-43210', industry: 'Real Estate', status: 'completed', interest: 'high', duration: '3:24', time: '10:32 AM', note: 'Wants 2BHK, budget ₹45L, site visit Saturday' },
  { id: '2', name: 'Priya Sharma', phone: '+91-87654-32109', industry: 'EdTech', status: 'completed', interest: 'high', duration: '2:11', time: '10:45 AM', note: 'Demo booked for Monday 11am' },
  { id: '3', name: 'Amit Patel', phone: '+91-76543-21098', industry: 'Finance', status: 'callback', interest: 'medium', duration: '1:05', time: '11:00 AM', note: 'Busy, callback at 3pm today' },
  { id: '4', name: 'Sunita Devi', phone: '+91-65432-10987', industry: 'Healthcare', status: 'completed', interest: 'low', duration: '0:45', time: '11:15 AM', note: 'Not interested currently' },
  { id: '5', name: 'Vikram Singh', phone: '+91-54321-09876', industry: 'Real Estate', status: 'calling', interest: null, duration: '0:32', time: '11:30 AM', note: 'In progress...' },
  { id: '6', name: 'Meera Joshi', phone: '+91-43210-98765', industry: 'EdTech', status: 'pending', interest: null, duration: '—', time: '—', note: '' },
  { id: '7', name: 'Rohit Verma', phone: '+91-32109-87654', industry: 'Finance', status: 'completed', interest: 'high', duration: '4:12', time: '09:15 AM', note: 'Approved for ₹10L loan, sending docs' },
  { id: '8', name: 'Anita Gupta', phone: '+91-21098-76543', industry: 'eCommerce', status: 'failed', interest: null, duration: '—', time: '09:30 AM', note: 'Number not reachable' },
];

const MOCK_CRM = [
  { customer_name: 'Rajesh Kumar', phone: '+91-98765-43210', interest_level: 'high', customer_need: '2BHK flat in Noida, budget ₹45L', objections: 'Needs to discuss with wife', next_action: 'demo', follow_up_date: '2026-04-12', notes: 'Site visit Saturday 11am booked' },
  { customer_name: 'Priya Sharma', phone: '+91-87654-32109', interest_level: 'high', customer_need: 'Online MBA program', objections: 'Price slightly high', next_action: 'demo', follow_up_date: '2026-04-14', notes: 'Demo Monday 11am, send brochure' },
  { customer_name: 'Rohit Verma', phone: '+91-32109-87654', interest_level: 'high', customer_need: 'Personal loan ₹10L', objections: 'None', next_action: 'closed', follow_up_date: '2026-04-11', notes: 'Loan approved, sending documentation' },
];

const statusColor: Record<string, string> = {
  completed: '#10b981', calling: '#3b82f6', pending: '#94a3b8',
  callback: '#f59e0b', failed: '#ef4444',
};
const statusLabel: Record<string, string> = {
  completed: 'Completed', calling: 'Live Call', pending: 'Pending',
  callback: 'Callback', failed: 'Failed',
};
const interestColor: Record<string, string> = { high: '#10b981', medium: '#f59e0b', low: '#ef4444' };

/* ─── Stat Card ────────────────────────────────────────────────────────────── */
function StatCard({ icon: Icon, label, value, sub, color, trend }: any) {
  return (
    <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
        {trend !== undefined && (
          <div className="flex items-center gap-1 text-xs" style={{ color: trend >= 0 ? '#10b981' : '#ef4444' }}>
            {trend >= 0 ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div className="text-2xl font-extrabold text-white mb-0.5">{value}</div>
      <div className="text-sm text-gray-400">{label}</div>
      {sub && <div className="text-xs mt-1" style={{ color }}>{sub}</div>}
    </div>
  );
}

/* ─── Mini Bar Chart ───────────────────────────────────────────────────────── */
function MiniChart({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1 h-16">
      {data.map((v, i) => (
        <div key={i} className="flex-1 rounded-sm transition-all duration-500" style={{ height: `${(v / max) * 100}%`, background: `${color}${i === data.length - 1 ? 'ff' : '60'}` }} />
      ))}
    </div>
  );
}

/* ─── Main Component ───────────────────────────────────────────────────────── */
export default function AICallingDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [uploadDrag, setUploadDrag] = useState(false);
  const [campaignRunning, setCampaignRunning] = useState(true);
  const [settingsVoice, setSettingsVoice] = useState('Priya (Hindi/English)');
  const [settingsHours, setSettingsHours] = useState({ from: '09:00', to: '18:00' });
  const [copied, setCopied] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);

  const filtered = leads.filter(l =>
    l.name.toLowerCase().includes(search.toLowerCase()) ||
    l.phone.includes(search) ||
    l.industry.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: leads.length,
    completed: leads.filter(l => l.status === 'completed').length,
    live: leads.filter(l => l.status === 'calling').length,
    high: leads.filter(l => l.interest === 'high').length,
  };

  const copyJson = (obj: any) => {
    navigator.clipboard.writeText(JSON.stringify(obj, null, 2));
    setCopied(obj.customer_name);
    setTimeout(() => setCopied(''), 2000);
  };

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'leads', icon: Users, label: 'Leads' },
    { id: 'campaigns', icon: Play, label: 'Campaigns' },
    { id: 'calls', icon: PhoneCall, label: 'Call Logs' },
    { id: 'analytics', icon: BarChart2, label: 'Analytics' },
    { id: 'crm', icon: Database, label: 'CRM Data' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ] as const;

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: '#020817', color: '#e2e8f0', fontFamily: 'system-ui,sans-serif' }}>

      {/* ── Sidebar ── */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 flex flex-col transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}
        style={{ width: 240, background: '#010610', borderRight: '1px solid rgba(255,255,255,0.06)', flexShrink: 0 }}>
        {/* Logo */}
        <div className="p-5 flex items-center gap-3" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: 'linear-gradient(135deg,#00ff88,#3b82f6)' }}>
            <Phone className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="font-bold text-white text-sm">AI Calling</div>
            <div className="text-xs" style={{ color: '#00ff88' }}>Dashboard</div>
          </div>
        </div>

        {/* Live indicator */}
        <div className="mx-4 mt-4 mb-2 px-3 py-2 rounded-lg flex items-center gap-2" style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.15)' }}>
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
          <div className="text-xs" style={{ color: '#00ff88' }}>{stats.live} Live Call{stats.live !== 1 ? 's' : ''} Active</div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto">
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setActiveTab(item.id as Tab); setSidebarOpen(false); }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 text-sm text-left transition-all"
              style={{
                background: activeTab === item.id ? 'rgba(0,255,136,0.1)' : 'transparent',
                color: activeTab === item.id ? '#00ff88' : '#94a3b8',
                border: activeTab === item.id ? '1px solid rgba(0,255,136,0.2)' : '1px solid transparent',
              }}>
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {item.label}
            </button>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black" style={{ background: 'linear-gradient(135deg,#00ff88,#3b82f6)' }}>A</div>
            <div>
              <div className="text-xs font-semibold text-white">Anshuman</div>
              <div className="text-xs text-gray-500">Admin</div>
            </div>
          </div>
          <Link href="/ai-calling-agent" className="block text-center text-xs text-gray-500 hover:text-gray-300 transition-colors">← Back to Landing</Link>
        </div>
      </aside>

      {/* Sidebar overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 md:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-4 sm:px-6 py-3 flex-shrink-0" style={{ background: '#010610', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3">
            <button className="md:hidden text-gray-400" onClick={() => setSidebarOpen(true)}>
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="font-bold text-white capitalize">{activeTab === 'crm' ? 'CRM Data' : activeTab.replace('-', ' ')}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs" style={{ background: 'rgba(0,255,136,0.08)', border: '1px solid rgba(0,255,136,0.15)', color: '#00ff88' }}>
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Campaign Running
            </div>
            <button className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400" style={{ background: 'rgba(255,255,255,0.05)' }}>
              <Bell className="w-4 h-4" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">

          {/* ── DASHBOARD TAB ── */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Stat Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard icon={PhoneCall} label="Total Calls Today" value={leads.length} color="#00ff88" trend={12} sub="↑ 12% vs yesterday" />
                <StatCard icon={CheckCircle} label="Completed" value={stats.completed} color="#10b981" trend={8} sub={`${Math.round((stats.completed / leads.length) * 100)}% completion rate`} />
                <StatCard icon={TrendingUp} label="Hot Leads" value={stats.high} color="#f59e0b" trend={22} sub="High interest" />
                <StatCard icon={Activity} label="Live Calls" value={stats.live} color="#3b82f6" sub="Right now" />
              </div>

              {/* Charts row */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Calls by hour */}
                <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-white text-sm">Calls Per Hour</h3>
                    <span className="text-xs text-gray-400">Today</span>
                  </div>
                  <MiniChart data={[12, 18, 24, 32, 28, 35, 42, 38, 45, 52, 48, 38]} color="#00ff88" />
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    {['9am', '10am', '11am', '12pm', '1pm', '2pm', '3pm', '4pm', '5pm', '6pm', '7pm', '8pm'].map(h => <span key={h}>{h}</span>)}
                  </div>
                </div>

                {/* Interest breakdown */}
                <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h3 className="font-semibold text-white text-sm mb-4">Interest Breakdown</h3>
                  {[
                    { label: 'High Interest', count: stats.high, color: '#10b981', pct: Math.round((stats.high / stats.completed) * 100) },
                    { label: 'Medium Interest', count: 1, color: '#f59e0b', pct: 17 },
                    { label: 'Low Interest', count: 1, color: '#ef4444', pct: 17 },
                  ].map(row => (
                    <div key={row.label} className="mb-4">
                      <div className="flex justify-between text-xs mb-1.5">
                        <span className="text-gray-400">{row.label}</span>
                        <span style={{ color: row.color }}>{row.count} leads ({row.pct}%)</span>
                      </div>
                      <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <div className="h-2 rounded-full" style={{ width: `${row.pct}%`, background: row.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent calls */}
              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center justify-between px-5 py-4" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <h3 className="font-semibold text-white text-sm">Recent Calls</h3>
                  <button onClick={() => setActiveTab('calls')} className="text-xs" style={{ color: '#00ff88' }}>View All →</button>
                </div>
                <div className="divide-y" style={{ divideColor: 'rgba(255,255,255,0.06)' }}>
                  {leads.slice(0, 5).map(l => (
                    <div key={l.id} className="flex items-center gap-4 px-5 py-3">
                      <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-black" style={{ background: 'linear-gradient(135deg,#00ff88,#3b82f6)' }}>
                        {l.name[0]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-sm text-white truncate">{l.name}</div>
                        <div className="text-xs text-gray-400">{l.industry}</div>
                      </div>
                      <div className="hidden sm:block flex-1 min-w-0 text-xs text-gray-400 truncate">{l.note || '—'}</div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {l.status === 'calling' && <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />}
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${statusColor[l.status]}15`, color: statusColor[l.status] }}>
                          {statusLabel[l.status]}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── LEADS TAB ── */}
          {activeTab === 'leads' && (
            <div className="space-y-5">
              {/* Upload area */}
              <div
                className="rounded-2xl p-8 text-center cursor-pointer transition-all"
                style={{ border: `2px dashed ${uploadDrag ? '#00ff88' : 'rgba(255,255,255,0.12)'}`, background: uploadDrag ? 'rgba(0,255,136,0.05)' : 'rgba(255,255,255,0.02)' }}
                onDragOver={e => { e.preventDefault(); setUploadDrag(true); }}
                onDragLeave={() => setUploadDrag(false)}
                onDrop={e => { e.preventDefault(); setUploadDrag(false); alert('CSV uploaded! AI will start calling shortly.'); }}
                onClick={() => fileRef.current?.click()}
              >
                <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={() => alert('CSV uploaded! AI will start calling shortly.')} />
                <Upload className="w-10 h-10 mx-auto mb-3" style={{ color: '#00ff88' }} />
                <div className="font-semibold text-white mb-1">Upload Lead CSV</div>
                <div className="text-sm text-gray-400 mb-3">Drag & drop or click to upload. Columns: Name, Phone, Industry, Notes</div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-black" style={{ background: 'linear-gradient(135deg,#00ff88,#00cc6a)' }}>
                  <Upload className="w-4 h-4" />
                  Choose CSV File
                </div>
              </div>

              {/* Search + actions */}
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text" placeholder="Search leads..." value={search} onChange={e => setSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-transparent text-white"
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}
                  />
                </div>
                <button onClick={() => setCampaignRunning(r => !r)} className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold" style={{ background: campaignRunning ? 'rgba(239,68,68,0.15)' : 'rgba(0,255,136,0.15)', color: campaignRunning ? '#ef4444' : '#00ff88', border: `1px solid ${campaignRunning ? 'rgba(239,68,68,0.3)' : 'rgba(0,255,136,0.3)'}` }}>
                  {campaignRunning ? <><Pause className="w-4 h-4" />Pause Calls</> : <><Play className="w-4 h-4" />Start Calls</>}
                </button>
              </div>

              {/* Leads table */}
              <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="hidden sm:grid grid-cols-12 gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-wide text-gray-500" style={{ background: 'rgba(255,255,255,0.04)' }}>
                  <div className="col-span-3">Name</div>
                  <div className="col-span-2">Phone</div>
                  <div className="col-span-2">Industry</div>
                  <div className="col-span-2">Status</div>
                  <div className="col-span-2">Interest</div>
                  <div className="col-span-1">Duration</div>
                </div>
                <div className="divide-y" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  {filtered.map(l => (
                    <div key={l.id} className="grid grid-cols-12 gap-2 items-center px-5 py-3 hover:bg-white hover:bg-opacity-5 transition-colors">
                      <div className="col-span-6 sm:col-span-3 flex items-center gap-2">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 text-black" style={{ background: 'linear-gradient(135deg,#00ff88,#3b82f6)' }}>{l.name[0]}</div>
                        <div>
                          <div className="text-sm font-medium text-white">{l.name}</div>
                          <div className="text-xs text-gray-400 sm:hidden">{l.phone}</div>
                        </div>
                      </div>
                      <div className="hidden sm:block col-span-2 text-xs text-gray-400">{l.phone}</div>
                      <div className="hidden sm:block col-span-2 text-xs text-gray-400">{l.industry}</div>
                      <div className="col-span-3 sm:col-span-2">
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${statusColor[l.status]}15`, color: statusColor[l.status] }}>
                          {l.status === 'calling' && <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse mr-1" />}
                          {statusLabel[l.status]}
                        </span>
                      </div>
                      <div className="hidden sm:block col-span-2">
                        {l.interest ? (
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium capitalize" style={{ background: `${interestColor[l.interest]}15`, color: interestColor[l.interest] }}>{l.interest}</span>
                        ) : <span className="text-xs text-gray-500">—</span>}
                      </div>
                      <div className="hidden sm:block col-span-1 text-xs text-gray-400">{l.duration}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── CAMPAIGNS TAB ── */}
          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              {/* Active campaign */}
              <div className="p-6 rounded-2xl" style={{ background: 'linear-gradient(135deg,rgba(0,255,136,0.06),rgba(59,130,246,0.06))', border: '1px solid rgba(0,255,136,0.2)' }}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-xs font-semibold" style={{ color: '#00ff88' }}>ACTIVE</span>
                    </div>
                    <h3 className="text-lg font-bold text-white">Real Estate Q2 Campaign</h3>
                    <p className="text-sm text-gray-400 mt-1">Targeting home buyers in Delhi NCR — 2BHK & 3BHK leads</p>
                  </div>
                  <button onClick={() => setCampaignRunning(r => !r)} className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold" style={{ background: campaignRunning ? 'rgba(239,68,68,0.15)' : 'rgba(0,255,136,0.15)', color: campaignRunning ? '#ef4444' : '#00ff88' }}>
                    {campaignRunning ? <><Pause className="w-4 h-4" />Pause</> : <><Play className="w-4 h-4" />Resume</>}
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Total Leads', val: '1,250' },
                    { label: 'Called', val: '847' },
                    { label: 'Remaining', val: '403' },
                    { label: 'Converted', val: '124 (14.6%)' },
                  ].map(s => (
                    <div key={s.label} className="text-center p-3 rounded-xl" style={{ background: 'rgba(0,0,0,0.2)' }}>
                      <div className="text-lg font-bold text-white">{s.val}</div>
                      <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <div className="flex justify-between text-xs text-gray-400 mb-1.5">
                    <span>Progress</span><span>68%</span>
                  </div>
                  <div className="h-2 rounded-full" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <div className="h-2 rounded-full" style={{ width: '68%', background: 'linear-gradient(90deg,#00ff88,#3b82f6)' }} />
                  </div>
                </div>
              </div>

              {/* Create new */}
              <div className="p-6 rounded-2xl" style={{ border: '2px dashed rgba(255,255,255,0.12)', background: 'rgba(255,255,255,0.02)' }}>
                <h3 className="font-semibold text-white mb-4 flex items-center gap-2"><Plus className="w-4 h-4" />Create New Campaign</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Campaign Name', placeholder: 'e.g. Finance Leads May 2026' },
                    { label: 'Industry Target', placeholder: 'e.g. Real Estate, EdTech' },
                    { label: 'Call Hours', placeholder: '09:00 - 18:00' },
                    { label: 'Max Concurrent Calls', placeholder: 'e.g. 20' },
                  ].map(f => (
                    <div key={f.label}>
                      <label className="text-xs text-gray-400 mb-1.5 block">{f.label}</label>
                      <input type="text" placeholder={f.placeholder} className="w-full px-4 py-2.5 rounded-xl text-sm text-white" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    </div>
                  ))}
                </div>
                <button className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-black" style={{ background: 'linear-gradient(135deg,#00ff88,#00cc6a)' }}>
                  <Play className="w-4 h-4" />
                  Launch Campaign
                </button>
              </div>
            </div>
          )}

          {/* ── CALL LOGS TAB ── */}
          {activeTab === 'calls' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="text" placeholder="Search calls..." className="pl-9 pr-4 py-2.5 rounded-xl text-sm text-white w-56" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                </div>
                <button className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs text-gray-300" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Download className="w-3.5 h-3.5" />Export CSV
                </button>
              </div>
              <div className="space-y-3">
                {leads.map(l => (
                  <div key={l.id} className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 text-black" style={{ background: 'linear-gradient(135deg,#00ff88,#3b82f6)' }}>{l.name[0]}</div>
                        <div>
                          <div className="font-semibold text-white">{l.name}</div>
                          <div className="text-xs text-gray-400">{l.phone} • {l.industry}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap justify-end">
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${statusColor[l.status]}15`, color: statusColor[l.status] }}>{statusLabel[l.status]}</span>
                        {l.interest && <span className="text-xs px-2 py-0.5 rounded-full font-medium capitalize" style={{ background: `${interestColor[l.interest]}15`, color: interestColor[l.interest] }}>{l.interest}</span>}
                      </div>
                    </div>
                    {l.note && (
                      <div className="mt-3 text-sm text-gray-300 px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', borderLeft: '3px solid rgba(0,255,136,0.4)' }}>
                        {l.note}
                      </div>
                    )}
                    <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{l.time}</span>
                      <span className="flex items-center gap-1"><Phone className="w-3 h-3" />{l.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── ANALYTICS TAB ── */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { label: 'Total Calls This Month', val: '4,238', icon: Phone, color: '#00ff88', trend: 18 },
                  { label: 'Avg Call Duration', val: '2m 48s', icon: Clock, color: '#3b82f6', trend: 5 },
                  { label: 'Conversion Rate', val: '14.6%', icon: TrendingUp, color: '#10b981', trend: 22 },
                  { label: 'Cost Saved vs Humans', val: '₹3.8L', icon: Zap, color: '#f59e0b', trend: 15 },
                ].map((s, i) => <StatCard key={i} {...s} />)}
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h3 className="font-semibold text-white text-sm mb-4">Daily Calls — Last 12 Days</h3>
                  <MiniChart data={[120, 180, 240, 320, 280, 350, 420, 380, 450, 520, 480, 550]} color="#00ff88" />
                  <div className="flex justify-between mt-2 text-xs text-gray-500">
                    {['Mar 30', 'Apr 1', 'Apr 3', 'Apr 5', 'Apr 7', 'Apr 9'].map(d => <span key={d}>{d}</span>)}
                  </div>
                </div>
                <div className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h3 className="font-semibold text-white text-sm mb-4">Calls by Industry</h3>
                  {[
                    { name: 'Real Estate', pct: 35, color: '#f59e0b' },
                    { name: 'Finance', pct: 28, color: '#00ff88' },
                    { name: 'EdTech', pct: 20, color: '#3b82f6' },
                    { name: 'Healthcare', pct: 10, color: '#ef4444' },
                    { name: 'Other', pct: 7, color: '#a855f7' },
                  ].map(row => (
                    <div key={row.name} className="mb-3">
                      <div className="flex justify-between text-xs mb-1"><span className="text-gray-400">{row.name}</span><span style={{ color: row.color }}>{row.pct}%</span></div>
                      <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                        <div className="h-1.5 rounded-full" style={{ width: `${row.pct}%`, background: row.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ── CRM TAB ── */}
          {activeTab === 'crm' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-400">Auto-generated after every call. Export to HubSpot, Salesforce or Google Sheets.</p>
                <button className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs text-gray-300" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Download className="w-3.5 h-3.5" />Export All
                </button>
              </div>
              {MOCK_CRM.map((c, i) => (
                <div key={i} className="p-5 rounded-2xl" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold text-black" style={{ background: 'linear-gradient(135deg,#00ff88,#3b82f6)' }}>{c.customer_name[0]}</div>
                      <div>
                        <div className="font-semibold text-white">{c.customer_name}</div>
                        <div className="text-xs text-gray-400">{c.phone}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: `${interestColor[c.interest_level]}15`, color: interestColor[c.interest_level] }}>{c.interest_level} interest</span>
                      <button onClick={() => copyJson(c)} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs" style={{ background: 'rgba(0,255,136,0.1)', color: '#00ff88', border: '1px solid rgba(0,255,136,0.2)' }}>
                        {copied === c.customer_name ? <><CheckCircle className="w-3 h-3" />Copied!</> : <><FileText className="w-3 h-3" />Copy JSON</>}
                      </button>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {[
                      { label: 'Customer Need', val: c.customer_need },
                      { label: 'Objections', val: c.objections || 'None' },
                      { label: 'Next Action', val: c.next_action.replace('_', ' ').toUpperCase() },
                      { label: 'Follow-up Date', val: c.follow_up_date },
                    ].map(f => (
                      <div key={f.label} className="px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <div className="text-xs text-gray-500 mb-0.5">{f.label}</div>
                        <div className="text-sm text-white font-medium">{f.val}</div>
                      </div>
                    ))}
                  </div>
                  {c.notes && (
                    <div className="mt-3 text-sm text-gray-300 px-3 py-2 rounded-lg" style={{ background: 'rgba(0,255,136,0.05)', borderLeft: '3px solid rgba(0,255,136,0.3)' }}>
                      📝 {c.notes}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── SETTINGS TAB ── */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-2xl">
              {[
                {
                  title: 'AI Voice Settings', fields: [
                    { label: 'Agent Name', val: 'Priya', type: 'text' },
                    { label: 'Voice Model', val: 'ElevenLabs — Priya (Hindi/English)', type: 'text' },
                    { label: 'Speaking Speed', val: '1.0x', type: 'text' },
                    { label: 'Language', val: 'Hindi + English (Hinglish)', type: 'text' },
                  ]
                },
                {
                  title: 'Call Schedule', fields: [
                    { label: 'Call Window Start', val: '09:00', type: 'time' },
                    { label: 'Call Window End', val: '18:00', type: 'time' },
                    { label: 'Max Concurrent Calls', val: '20', type: 'number' },
                    { label: 'Retry Failed Calls After (min)', val: '60', type: 'number' },
                  ]
                },
                {
                  title: 'CRM Integration', fields: [
                    { label: 'CRM Platform', val: 'HubSpot', type: 'text' },
                    { label: 'API Key', val: '●●●●●●●●●●●●●●●●', type: 'password' },
                    { label: 'Webhook URL', val: 'https://hooks.zapier.com/catch/...', type: 'text' },
                    { label: 'WhatsApp API Key', val: '●●●●●●●●●●●●', type: 'password' },
                  ]
                },
              ].map(section => (
                <div key={section.title} className="p-6 rounded-2xl" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <h3 className="font-semibold text-white mb-4">{section.title}</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {section.fields.map(f => (
                      <div key={f.label}>
                        <label className="text-xs text-gray-400 mb-1.5 block">{f.label}</label>
                        <input type={f.type} defaultValue={f.val} className="w-full px-4 py-2.5 rounded-xl text-sm text-white" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }} />
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <button className="px-6 py-3 rounded-xl font-bold text-black text-sm" style={{ background: 'linear-gradient(135deg,#00ff88,#00cc6a)' }}>
                Save All Settings
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
