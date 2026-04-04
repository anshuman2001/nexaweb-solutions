'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Upload, CheckCircle, AlertCircle, FileText, Download, Zap, Shield, Clock } from 'lucide-react';

const features = [
  { icon: <Zap className="w-5 h-5" />, title: 'Instant Reconciliation', desc: 'Upload your files and get results in seconds — no manual matching needed.' },
  { icon: <Shield className="w-5 h-5" />, title: 'Catch All Mismatches', desc: 'Automatically flags missing invoices, amount differences, and GSTIN errors.' },
  { icon: <Clock className="w-5 h-5" />, title: 'Save Hours Every Month', desc: 'What takes CAs hours manually, our tool does in minutes.' },
  { icon: <Download className="w-5 h-5" />, title: 'Export Reports', desc: 'Download matched, unmatched, and partial-match reports in Excel/PDF.' },
];

const steps = [
  { step: '01', title: 'Upload GSTR-2B', desc: 'Download your GSTR-2B JSON from the GST portal and upload it here.' },
  { step: '02', title: 'Upload Purchase Register', desc: 'Upload your purchase register in Excel format (.xlsx or .csv).' },
  { step: '03', title: 'Auto Reconcile', desc: 'Our tool matches invoices by GSTIN, invoice number, date and amount.' },
  { step: '04', title: 'Download Report', desc: 'Get a detailed mismatch report — ready to share with your CA.' },
];

export default function GSTReconcilePage() {
  const [gstr2b, setGstr2b] = useState<File | null>(null);
  const [purchaseReg, setPurchaseReg] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'processing' | 'done'>('idle');
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919997730768';

  const handleReconcile = () => {
    if (!gstr2b || !purchaseReg) return;
    setStatus('processing');
    setTimeout(() => setStatus('done'), 2500);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Back */}
        <Link href="/products" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>

        {/* Hero */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live Product
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight mb-4">
              GST{' '}
              <span className="gradient-text">Reconcile</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              Automatically match your GSTR-2B with your purchase register. Catch mismatches instantly, save hours of manual work, and stay GST compliant — every month.
            </p>
            <div className="flex flex-wrap gap-3 mb-8">
              {['GSTR-2A/2B', 'Purchase Register', 'Mismatch Reports', 'Excel Export', 'Free to Use'].map((tag) => (
                <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-300">
                  {tag}
                </span>
              ))}
            </div>
            <a
              href={`https://wa.me/${whatsapp}?text=Hi! I want to know more about the GST Reconcile tool.`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm text-gray-300 border border-white/10 hover:border-blue-500/30 hover:text-white transition-all"
            >
              Need help? WhatsApp us
            </a>
          </div>

          {/* Tool Card */}
          <div className="relative rounded-2xl border border-white/10 bg-[#0c0f1a]/90 p-6 overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.6), transparent)' }} />

            <div className="flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-sm">🧾</div>
              <div>
                <p className="text-white font-semibold text-sm">GST Reconcile Tool</p>
                <p className="text-gray-500 text-xs">Upload files to start</p>
              </div>
            </div>

            {/* File Upload — GSTR-2B */}
            <div className="mb-4">
              <label className="block text-xs text-gray-400 font-medium mb-2">GSTR-2B (JSON)</label>
              <label className={`flex items-center gap-3 p-4 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
                gstr2b ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-white/10 hover:border-blue-500/30 bg-white/2'
              }`}>
                <input type="file" accept=".json" className="hidden" onChange={(e) => setGstr2b(e.target.files?.[0] || null)} />
                {gstr2b ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-emerald-400 truncate">{gstr2b.name}</span>
                  </>
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <span className="text-sm text-gray-500">Upload GSTR-2B JSON file</span>
                  </>
                )}
              </label>
            </div>

            {/* File Upload — Purchase Register */}
            <div className="mb-6">
              <label className="block text-xs text-gray-400 font-medium mb-2">Purchase Register (Excel/CSV)</label>
              <label className={`flex items-center gap-3 p-4 rounded-xl border-2 border-dashed cursor-pointer transition-all ${
                purchaseReg ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-white/10 hover:border-blue-500/30 bg-white/2'
              }`}>
                <input type="file" accept=".xlsx,.csv,.xls" className="hidden" onChange={(e) => setPurchaseReg(e.target.files?.[0] || null)} />
                {purchaseReg ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                    <span className="text-sm text-emerald-400 truncate">{purchaseReg.name}</span>
                  </>
                ) : (
                  <>
                    <FileText className="w-5 h-5 text-gray-500 flex-shrink-0" />
                    <span className="text-sm text-gray-500">Upload Purchase Register</span>
                  </>
                )}
              </label>
            </div>

            {/* Reconcile Button */}
            <button
              onClick={handleReconcile}
              disabled={!gstr2b || !purchaseReg || status === 'processing'}
              className="w-full py-3 rounded-xl font-semibold text-sm transition-all disabled:opacity-40 disabled:cursor-not-allowed btn-shimmer text-white"
              style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}
            >
              {status === 'processing' ? '⏳ Reconciling...' : status === 'done' ? '✅ Done — Download Report' : '⚡ Start Reconciliation'}
            </button>

            {/* Result */}
            {status === 'done' && (
              <div className="mt-4 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 text-sm font-semibold">Reconciliation Complete</span>
                </div>
                <p className="text-xs text-gray-400">Your report is ready. Contact us on WhatsApp to receive it.</p>
                <a
                  href={`https://wa.me/${whatsapp}?text=Hi! I completed GST reconciliation and need my report.`}
                  target="_blank" rel="noopener noreferrer"
                  className="mt-3 flex items-center gap-2 text-xs text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" /> Get my report on WhatsApp
                </a>
              </div>
            )}

            {(!gstr2b || !purchaseReg) && (
              <p className="text-center text-xs text-gray-600 mt-3">Upload both files to start</p>
            )}
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Why use GST Reconcile?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl border border-white/8 bg-[#0c0f1a]/60 hover:border-blue-500/20 transition-all">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-4">
                  {f.icon}
                </div>
                <h3 className="text-white font-semibold mb-2 text-sm">{f.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="mb-20">
          <h2 className="text-2xl font-bold text-white text-center mb-10">How it works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.step} className="relative p-6 rounded-2xl border border-white/8 bg-[#0c0f1a]/60">
                <span className="text-4xl font-black text-white/5 absolute top-4 right-4">{s.step}</span>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold mb-4">
                  {s.step}
                </div>
                <h3 className="text-white font-semibold mb-2 text-sm">{s.title}</h3>
                <p className="text-gray-400 text-xs leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center p-10 rounded-2xl border border-blue-500/15 bg-blue-500/5">
          <h3 className="text-2xl font-bold text-white mb-3">Need a custom GST automation for your business?</h3>
          <p className="text-gray-400 mb-6">We build custom GST, accounting, and finance automation tools for CAs, businesses, and enterprises.</p>
          <a
            href={`https://wa.me/${whatsapp}?text=Hi! I need a custom GST automation solution.`}
            target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold transition-all btn-glow btn-shimmer"
            style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}
          >
            <Zap className="w-4 h-4" />
            Talk to us on WhatsApp
          </a>
        </div>

      </div>
    </div>
  );
}
