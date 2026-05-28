'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download, Play, RefreshCw, CheckCircle, AlertCircle, Copy } from 'lucide-react';

const APPS_SCRIPT_CODE_URL = 'https://raw.githubusercontent.com/anshuman2001/nexaweb-solutions/main/google-apps-script/drive_filter.gs';

const STEPS = [
  { n: 1, title: 'Open Apps Script', desc: 'Go to script.google.com → New Project' },
  { n: 2, title: 'Paste the Code', desc: 'Copy our script and paste into the editor' },
  { n: 3, title: 'Deploy', desc: 'Deploy → New Deployment → Web App → Anyone → Deploy' },
  { n: 4, title: 'Copy Web App URL', desc: 'Copy the generated Web App URL and paste below' },
];

type Status = { status: string; totalRows: number; noWebRows: number; filesDone: number; totalFiles: number; downloadUrl: string };

export default function DataFilterClient() {
  const [driveUrl, setDriveUrl]       = useState('');
  const [scriptUrl, setScriptUrl]     = useState('');
  const [websiteCol, setWebsiteCol]   = useState('Website');
  const [jobId, setJobId]             = useState('');
  const [phase, setPhase]             = useState<'idle' | 'running' | 'done' | 'error'>('idle');
  const [statusData, setStatusData]   = useState<Status | null>(null);
  const [errorMsg, setErrorMsg]       = useState('');
  const [showSetup, setShowSetup]     = useState(false);
  const [codeCopied, setCodeCopied]   = useState(false);
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const scriptCode = `/* Copy from: github.com/anshuman2001/nexaweb-solutions/blob/main/google-apps-script/drive_filter.gs */`;

  async function startJob() {
    setErrorMsg('');
    if (!driveUrl.includes('drive.google.com')) { setErrorMsg('Paste a valid Google Drive folder URL.'); return; }
    if (!scriptUrl.startsWith('https://script.google.com')) { setErrorMsg('Paste your Apps Script Web App URL.'); return; }

    setPhase('running');
    try {
      const res = await fetch('/api/drive-filter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ driveUrl, appsScriptUrl: scriptUrl, websiteCol }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setJobId(data.jobId);
      startPolling(data.jobId);
    } catch (e: any) {
      setPhase('error');
      setErrorMsg(e.message || 'Failed to start job.');
    }
  }

  function startPolling(id: string) {
    pollRef.current = setInterval(async () => {
      try {
        const res = await fetch(`/api/drive-filter?jobId=${id}&appsScriptUrl=${encodeURIComponent(scriptUrl)}`);
        const data: Status = await res.json();
        setStatusData(data);
        if (data.status === 'done') {
          setPhase('done');
          if (pollRef.current) clearInterval(pollRef.current);
        }
      } catch {}
    }, 4000);
  }

  function reset() {
    if (pollRef.current) clearInterval(pollRef.current);
    setPhase('idle'); setJobId(''); setStatusData(null); setErrorMsg('');
  }

  async function copyCode() {
    try {
      const res = await fetch(APPS_SCRIPT_CODE_URL);
      const text = await res.text();
      await navigator.clipboard.writeText(text);
    } catch {
      await navigator.clipboard.writeText(scriptCode);
    }
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  }

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">

      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-green text-sm font-medium mb-4">
          🔍 Free Data Tool
        </div>
        <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-3">
          No-Website <span className="gradient-text">Filter Tool</span>
        </h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          Upload your Google Drive folder → runs in Google&apos;s cloud → download filtered CSV with businesses that have no website.
        </p>
      </motion.div>

      {/* Setup Guide Toggle */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }} className="mb-6">
        <button
          onClick={() => setShowSetup(!showSetup)}
          className="w-full flex items-center justify-between px-5 py-4 rounded-xl bg-surface border border-border-subtle hover:border-accent-blue/40 transition-all"
        >
          <span className="text-white font-semibold">⚙️ First time? Setup Guide (1 min)</span>
          <span className="text-gray-400 text-sm">{showSetup ? '▲ Hide' : '▼ Show'}</span>
        </button>

        {showSetup && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="mt-2 bg-surface border border-border-subtle rounded-xl p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {STEPS.map(s => (
                <div key={s.n} className="flex gap-3">
                  <div className="w-7 h-7 rounded-full bg-accent-blue/20 text-accent-blue text-sm font-bold flex items-center justify-center flex-shrink-0">{s.n}</div>
                  <div>
                    <p className="text-white font-semibold text-sm">{s.title}</p>
                    <p className="text-gray-400 text-xs">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <a href="https://script.google.com" target="_blank" rel="noopener noreferrer"
                className="flex-1 text-center py-2.5 rounded-xl bg-accent-blue text-white text-sm font-semibold hover:bg-blue-500 transition-all">
                Open Apps Script ↗
              </a>
              <button onClick={copyCode}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl border border-accent-green/40 text-accent-green text-sm font-semibold hover:bg-accent-green/10 transition-all">
                <Copy className="w-4 h-4" />
                {codeCopied ? 'Copied!' : 'Copy Script Code'}
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Main Form */}
      {phase === 'idle' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="bg-surface rounded-2xl border border-border-subtle p-6 space-y-5">

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Google Drive Folder URL</label>
            <input
              value={driveUrl} onChange={e => setDriveUrl(e.target.value)}
              placeholder="https://drive.google.com/drive/folders/..."
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border-subtle text-white placeholder-gray-600 text-sm focus:outline-none focus:border-accent-blue/50 transition-all"
            />
            <p className="text-xs text-gray-500 mt-1">Folder must be shared as &quot;Anyone with the link can view&quot;</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Apps Script Web App URL</label>
            <input
              value={scriptUrl} onChange={e => setScriptUrl(e.target.value)}
              placeholder="https://script.google.com/macros/s/.../exec"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border-subtle text-white placeholder-gray-600 text-sm focus:outline-none focus:border-accent-blue/50 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Website Column Name</label>
            <input
              value={websiteCol} onChange={e => setWebsiteCol(e.target.value)}
              placeholder="Website"
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-border-subtle text-white placeholder-gray-600 text-sm focus:outline-none focus:border-accent-blue/50 transition-all"
            />
          </div>

          {errorMsg && (
            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <AlertCircle className="w-4 h-4 flex-shrink-0" /> {errorMsg}
            </div>
          )}

          <button onClick={startJob}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-accent-blue text-white font-bold text-lg hover:bg-blue-500 transition-all btn-glow">
            <Play className="w-5 h-5" />
            Process in Cloud
          </button>
        </motion.div>
      )}

      {/* Running */}
      {phase === 'running' && (
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-surface rounded-2xl border border-accent-blue/30 p-8 text-center">
          <RefreshCw className="w-12 h-12 text-accent-blue mx-auto mb-4 animate-spin" />
          <h2 className="text-white font-bold text-xl mb-2">Processing in Google&apos;s Cloud</h2>
          <p className="text-gray-400 text-sm mb-6">Running on Google&apos;s servers — your machine does nothing</p>

          {statusData && (
            <div className="grid grid-cols-2 gap-4 text-left">
              {[
                { label: 'Files processed', val: `${statusData.filesDone} / ${statusData.totalFiles}` },
                { label: 'Rows scanned',    val: statusData.totalRows.toLocaleString() },
                { label: 'No-website rows', val: statusData.noWebRows.toLocaleString() },
                { label: 'Status',          val: statusData.status },
              ].map(r => (
                <div key={r.label} className="bg-white/5 rounded-xl p-4">
                  <p className="text-gray-500 text-xs mb-1">{r.label}</p>
                  <p className="text-white font-bold">{r.val}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      )}

      {/* Done */}
      {phase === 'done' && statusData && (
        <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }}
          className="bg-surface rounded-2xl border border-accent-green/40 p-8 text-center">
          <CheckCircle className="w-12 h-12 text-accent-green mx-auto mb-4" />
          <h2 className="text-white font-bold text-xl mb-6">Done! Saved to Google Drive</h2>

          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label: 'Total rows',      val: statusData.totalRows.toLocaleString() },
              { label: 'No website',      val: statusData.noWebRows.toLocaleString() },
              { label: 'Has website',     val: (statusData.totalRows - statusData.noWebRows).toLocaleString() },
            ].map(r => (
              <div key={r.label} className="bg-white/5 rounded-xl p-4">
                <p className="text-gray-500 text-xs mb-1">{r.label}</p>
                <p className="text-accent-green font-bold text-lg">{r.val}</p>
              </div>
            ))}
          </div>

          <div className="flex gap-3">
            <a href={statusData.downloadUrl} target="_blank" rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-4 rounded-xl bg-accent-green text-black font-bold text-lg hover:bg-green-400 transition-all">
              <Download className="w-5 h-5" />
              Download CSV
            </a>
            <button onClick={reset}
              className="px-6 py-4 rounded-xl border border-border-subtle text-gray-400 hover:text-white hover:border-accent-blue/40 transition-all font-semibold">
              New Job
            </button>
          </div>
        </motion.div>
      )}

      {/* Error */}
      {phase === 'error' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          className="bg-surface rounded-2xl border border-red-500/30 p-8 text-center">
          <AlertCircle className="w-12 h-12 text-red-400 mx-auto mb-4" />
          <h2 className="text-white font-bold text-xl mb-2">Error</h2>
          <p className="text-red-400 text-sm mb-6">{errorMsg}</p>
          <button onClick={reset} className="px-8 py-3 rounded-xl bg-accent-blue text-white font-semibold hover:bg-blue-500 transition-all">
            Try Again
          </button>
        </motion.div>
      )}

      {/* Info Cards */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
        {[
          { icon: '☁️', title: 'Runs in Cloud', desc: 'Google\'s servers do the work. No local CPU/RAM needed.' },
          { icon: '🔒', title: 'Your Data Stays in Drive', desc: 'Output saved to your Google Drive. Never stored on our servers.' },
          { icon: '⚡', title: 'Any Size', desc: 'Handles millions of rows. Auto-batches large datasets.' },
        ].map(c => (
          <div key={c.title} className="bg-surface rounded-xl border border-border-subtle p-5 text-center">
            <div className="text-3xl mb-2">{c.icon}</div>
            <h3 className="text-white font-semibold text-sm mb-1">{c.title}</h3>
            <p className="text-gray-500 text-xs">{c.desc}</p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
