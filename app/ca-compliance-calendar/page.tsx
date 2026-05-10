import { Metadata } from 'next';
import Link from 'next/link';
import { CheckCircle, Download, Github, Calendar, Bell, FileSpreadsheet, MessageCircle, Clock, Shield } from 'lucide-react';

const siteUrl = 'https://digiagentix.com';
const GITHUB_URL = 'https://github.com/anshuman2001/ca-compliance-calendar';

export const metadata: Metadata = {
  title: 'CA Compliance Calendar — Free WhatsApp Reminder Tool for CA Firms | DigiAgentix',
  description: 'Never miss a GST, ITR, TDS or ROC deadline. Auto WhatsApp reminders to all clients 7 days & 1 day before due date. Free, open-source Python tool for CA firms.',
  keywords: ['CA compliance calendar', 'GST reminder WhatsApp', 'ITR due date reminder', 'TDS reminder tool', 'CA firm automation', 'compliance reminder India'],
  alternates: { canonical: `${siteUrl}/ca-compliance-calendar` },
  openGraph: {
    title: 'CA Compliance Calendar — Free WhatsApp Reminder Tool',
    description: 'Auto WhatsApp reminders for GST, ITR, TDS & ROC deadlines. Google Sheets client database. Free & open source.',
    url: `${siteUrl}/ca-compliance-calendar`,
    siteName: 'DigiAgentix',
  },
};

const steps = [
  {
    step: '01',
    title: 'Create Google Sheet',
    desc: 'Add a sheet named "CA Compliance Calendar" with columns: Client Name, PAN, Mobile, Filing Type, Due Date, Status.',
    icon: <FileSpreadsheet className="w-5 h-5" />,
  },
  {
    step: '02',
    title: 'Set Up Google API',
    desc: 'Create a Service Account in Google Cloud Console, download credentials.json, and share your sheet with the service account email.',
    icon: <Shield className="w-5 h-5" />,
  },
  {
    step: '03',
    title: 'Configure Twilio WhatsApp',
    desc: 'Sign up on Twilio, get your Account SID & Auth Token, and activate the WhatsApp sandbox. Copy keys to the .env file.',
    icon: <MessageCircle className="w-5 h-5" />,
  },
  {
    step: '04',
    title: 'Deploy & Forget',
    desc: 'Deploy to Render or Railway for free. The bot runs daily at 9 AM — sends reminders, logs every message, skips Done filings.',
    icon: <Clock className="w-5 h-5" />,
  },
];

const features = [
  'WhatsApp alerts 7 days & 1 day before due date',
  'Google Sheets as client database — no coding needed',
  'Supports GST / ITR / TDS / ROC filings',
  'Skips clients with Status = Done automatically',
  'Auto-logs every sent message to a separate Log tab',
  'Runs daily at 9 AM — deploy free on Render / Railway',
  'Configurable reminder days & sender name',
  '100% open source — your data never leaves your server',
];

const sheetColumns = [
  { col: 'Client Name', example: 'Ramesh Shah', note: 'Full client name' },
  { col: 'PAN', example: 'ABCDE1234F', note: 'For your reference' },
  { col: 'Mobile', example: '+919876543210', note: 'With country code' },
  { col: 'Filing Type', example: 'GST / ITR / TDS / ROC', note: 'Any label works' },
  { col: 'Due Date', example: '20-05-2026', note: 'Format: DD-MM-YYYY' },
  { col: 'Status', example: 'Pending / Done', note: 'Done = skip reminder' },
];

export default function CAComplianceCalendarPage() {
  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Hero ─────────────────────────────────────────────────────────── */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/8 text-emerald-300 text-sm font-medium mb-6">
            <Calendar className="w-4 h-4" />
            Free & Open Source Tool
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
            CA Compliance{' '}
            <span className="gradient-text">Calendar</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Auto WhatsApp reminders for <strong className="text-white">GST, ITR, TDS & ROC</strong> deadlines.
            Add clients to Google Sheets — the bot handles the rest. Runs free on Render.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-white font-semibold transition-all btn-glow btn-shimmer"
              style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}
            >
              <Download className="w-5 h-5" />
              Download Free Tool
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-colors font-medium"
            >
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
        </div>

        {/* ── Sample WhatsApp Message ───────────────────────────────────────── */}
        <div className="mb-14 flex justify-center">
          <div className="rounded-2xl border border-white/10 bg-[#0c0f1a]/80 p-6 max-w-sm w-full">
            <p className="text-gray-500 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
              <MessageCircle className="w-3.5 h-3.5" /> Sample WhatsApp Message
            </p>
            <div className="bg-[#1a2a1a] rounded-xl p-4 text-sm text-gray-200 leading-relaxed border border-emerald-500/20">
              Dear <strong className="text-white">Ramesh Shah</strong>,<br /><br />
              Reminder: <strong className="text-emerald-400">GST</strong> is due on{' '}
              <strong className="text-white">20 May 2026</strong>.<br />
              Please share documents at the earliest.<br /><br />
              <span className="text-gray-400">— DigiAgentix CA Tools</span>
            </div>
            <div className="flex items-center gap-4 mt-4 text-xs text-gray-500">
              <span className="flex items-center gap-1"><Bell className="w-3 h-3 text-emerald-400" /> 7 days before</span>
              <span className="flex items-center gap-1"><Bell className="w-3 h-3 text-orange-400" /> 1 day before</span>
            </div>
          </div>
        </div>

        {/* ── Features ─────────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-white/10 bg-[#0c0f1a]/80 p-8 mb-10">
          <h2 className="text-2xl font-bold text-white mb-6">What&apos;s Included</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map(f => (
              <div key={f} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm">{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Google Sheet Format ───────────────────────────────────────────── */}
        <div className="rounded-2xl border border-white/10 bg-[#0c0f1a]/80 p-8 mb-10">
          <h2 className="text-2xl font-bold text-white mb-2">Google Sheet Format</h2>
          <p className="text-gray-400 text-sm mb-6">Create a sheet named <code className="bg-white/10 px-1.5 py-0.5 rounded text-blue-300">CA Compliance Calendar</code> with a tab called <code className="bg-white/10 px-1.5 py-0.5 rounded text-blue-300">Clients</code></p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10">
                  {['Column', 'Example', 'Note'].map(h => (
                    <th key={h} className="text-left py-2 px-3 text-xs text-blue-400 font-semibold">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sheetColumns.map((row, i) => (
                  <tr key={row.col} className={`border-b border-white/5 ${i % 2 === 0 ? 'bg-white/2' : ''}`}>
                    <td className="py-2.5 px-3 text-white font-semibold text-xs">{row.col}</td>
                    <td className="py-2.5 px-3 text-emerald-400 font-mono text-xs">{row.example}</td>
                    <td className="py-2.5 px-3 text-gray-400 text-xs">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ── Setup Steps ──────────────────────────────────────────────────── */}
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-white mb-6">Setup in 4 Steps</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {steps.map(s => (
              <div key={s.step} className="rounded-2xl border border-white/10 bg-[#0c0f1a]/80 p-6">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-2xl font-black text-white/10">{s.step}</span>
                  <div className="w-9 h-9 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    {s.icon}
                  </div>
                  <h3 className="text-white font-bold">{s.title}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Deploy Info ───────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-blue-500/20 bg-blue-500/5 p-8 mb-10">
          <h2 className="text-xl font-bold text-white mb-4">🚀 Deploy Free on Render</h2>
          <ol className="space-y-2 text-sm text-gray-300 list-decimal list-inside">
            <li>Fork / download the GitHub repo</li>
            <li>Go to <strong className="text-white">render.com</strong> → New → <strong className="text-white">Background Worker</strong></li>
            <li>Build: <code className="bg-white/10 px-1.5 py-0.5 rounded text-blue-300">pip install -r requirements.txt</code></li>
            <li>Start: <code className="bg-white/10 px-1.5 py-0.5 rounded text-blue-300">python main.py</code></li>
            <li>Add your <code className="bg-white/10 px-1.5 py-0.5 rounded text-blue-300">.env</code> variables and upload <code className="bg-white/10 px-1.5 py-0.5 rounded text-blue-300">credentials.json</code> as Secret File</li>
            <li>Deploy — bot runs every day at 9 AM automatically ✅</li>
          </ol>
        </div>

        {/* ── CTA ──────────────────────────────────────────────────────────── */}
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-10 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Free for All CA Firms</h2>
          <p className="text-gray-400 mb-6 max-w-md mx-auto">No subscription. No hidden cost. Self-host it — your client data never leaves your server.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl text-white font-semibold transition-all btn-glow"
              style={{ background: 'linear-gradient(135deg, #16a34a, #15803d)' }}
            >
              <Download className="w-5 h-5" />
              Download Free Tool
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 text-gray-300 hover:text-white hover:border-white/20 transition-colors font-medium"
            >
              Need Custom Setup? Contact Us
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
