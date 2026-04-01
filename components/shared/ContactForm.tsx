'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

interface ContactFormProps {
  compact?: boolean;
  defaultService?: string;
}

export default function ContactForm({ compact = false, defaultService = '' }: ContactFormProps) {
  const [form, setForm] = useState({ name:'', email:'', phone:'', service: defaultService, message:'' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setError('Please fill all required fields.'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
      if (res.ok) setSuccess(true);
      else setError('Failed to send. Please try again.');
    } catch { setError('Network error. Please try again.'); }
    finally { setLoading(false); }
  };

  if (success) return (
    <div className="text-center py-8">
      <CheckCircle className="w-12 h-12 text-accent-green mx-auto mb-4" />
      <h3 className="text-white font-bold text-xl mb-2">Message Sent!</h3>
      <p className="text-gray-400 text-sm">We'll reply within 2 hours.</p>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className={compact ? 'grid grid-cols-2 gap-4' : 'space-y-4'}>
        <input type="text" value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Your name *" required
          className="w-full bg-background border border-border-subtle rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue transition-colors text-sm" />
        <input type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="Email address *" required
          className="w-full bg-background border border-border-subtle rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue transition-colors text-sm" />
      </div>
      <input type="tel" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} placeholder="WhatsApp number"
        className="w-full bg-background border border-border-subtle rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue transition-colors text-sm" />
      <textarea value={form.message} onChange={e => setForm({...form, message:e.target.value})} placeholder="Tell us about your business needs... *" rows={compact ? 3 : 5} required
        className="w-full bg-background border border-border-subtle rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue transition-colors resize-none text-sm" />
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <button type="submit" disabled={loading}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-accent-blue text-white font-semibold hover:bg-blue-500 transition-all btn-glow disabled:opacity-60">
        {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send className="w-4 h-4" />Send Message</>}
      </button>
    </form>
  );
}
