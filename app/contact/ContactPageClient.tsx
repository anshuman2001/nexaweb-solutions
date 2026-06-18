'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle } from 'lucide-react';

const NAVY = '#1e3a8a';
const SLATE = '#334155';
const MUTED = '#64748b';
const BORDER = '#e2e8f0';

const services = [
  'Customer Support Agent', 'WhatsApp Business Agent', 'Sales & Lead Agent',
  'Meeting AI Agent', 'eCommerce Shopping Agent', 'Email Marketing Agent',
  'Content Writing Agent', 'Industry Specific Agent', 'eCommerce Website',
  'Business Website', 'Landing Page', 'Portfolio Website', 'Website + AI Agent Bundle', 'Other',
];
const budgets = [
  'Under ₹15,000', '₹15,000 - ₹30,000', '₹30,000 - ₹60,000',
  '₹60,000 - ₹1,00,000', '₹1,00,000+', 'Not sure yet',
];

const fieldStyle: React.CSSProperties = {
  width: '100%', boxSizing: 'border-box',
  background: '#fff', border: `1.5px solid ${BORDER}`,
  borderRadius: 10, padding: '12px 16px',
  fontSize: 14, color: SLATE, outline: 'none',
};

export default function ContactPageClient() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', budget: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919997730768';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setError('Please fill in name, email, and message.'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) });
      if (res.ok) { setSuccess(true); setForm({ name: '', email: '', phone: '', service: '', budget: '', message: '' }); }
      else setError('Something went wrong. Please WhatsApp us directly.');
    } catch { setError('Network error. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ffffff 0%, #f0f4ff 50%, #e8efff 100%)' }}>
      {/* Hero */}
      <section style={{ padding: '108px 24px 56px', textAlign: 'center' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 18px', borderRadius: 100, background: '#dcfce7', border: '1px solid #bbf7d0', color: '#15803d', fontSize: 13, fontWeight: 600, marginBottom: 20 }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22c55e', display: 'inline-block', flexShrink: 0 }} />
            We reply within 2 hours
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontSize: 'clamp(30px, 5vw, 48px)', fontWeight: 800, color: '#0f172a', marginBottom: 16, lineHeight: 1.15 }}
          >
            Let&apos;s Build Something{' '}
            <span style={{ background: 'linear-gradient(135deg, #1e3a8a, #2563eb)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Amazing
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
            style={{ color: MUTED, fontSize: 17, lineHeight: 1.6 }}
          >
            Tell us about your business and we&apos;ll show you exactly how AI can help
          </motion.p>
        </div>
      </section>

      <section style={{ padding: '0 24px 96px', maxWidth: 1200, margin: '0 auto' }}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div>
              <h2 style={{ fontSize: 18, fontWeight: 700, color: '#0f172a', marginBottom: 20 }}>Get In Touch</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  { icon: Phone, label: 'WhatsApp', value: '+91 99977 30768', href: `https://wa.me/${whatsappNumber}` },
                  { icon: Mail, label: 'Email', value: 'info@digiagentix.com', href: 'mailto:info@digiagentix.com' },
                  { icon: MapPin, label: 'Location', value: 'Noida, UP, India', href: '#' },
                  { icon: Clock, label: 'Working Hours', value: 'Mon-Sat, 9AM - 8PM IST', href: '#' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'flex-start', gap: 12, textDecoration: 'none' }}
                  >
                    <div style={{ width: 40, height: 40, borderRadius: 10, background: '#e0e7ff', border: '1px solid #c7d2fe', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon style={{ width: 18, height: 18, color: NAVY }} />
                    </div>
                    <div>
                      <p style={{ fontSize: 11, color: MUTED, marginBottom: 2 }}>{label}</p>
                      <p style={{ fontSize: 14, fontWeight: 600, color: SLATE }}>{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi! I'd like to discuss a project.`}
              target="_blank" rel="noopener noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 16, borderRadius: 16, background: 'rgba(37,211,102,0.08)', border: '1px solid rgba(37,211,102,0.25)', textDecoration: 'none', transition: 'background 0.15s' }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 12, background: '#25D366', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <MessageCircle style={{ width: 22, height: 22, color: '#fff' }} />
              </div>
              <div>
                <p style={{ fontWeight: 600, fontSize: 14, color: '#0f172a' }}>Chat on WhatsApp</p>
                <p style={{ fontSize: 12, color: '#16a34a' }}>Fastest response — usually &lt; 30 min</p>
              </div>
            </a>

            <div style={{ background: '#fff', borderRadius: 14, border: `1px solid ${BORDER}`, padding: 18, display: 'flex', flexDirection: 'column', gap: 12, boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
              {['Free consultation call', 'No obligation quote', 'Reply within 2 hours', '3+ years experience'].map(t => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: SLATE }}>
                  <CheckCircle style={{ width: 16, height: 16, color: '#059669', flexShrink: 0 }} />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {success ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                  <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#dcfce7', border: '1px solid #bbf7d0', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <CheckCircle style={{ width: 40, height: 40, color: '#059669' }} />
                  </div>
                  <h3 style={{ fontSize: 24, fontWeight: 700, color: '#0f172a', marginBottom: 10 }}>Message Sent!</h3>
                  <p style={{ color: MUTED, marginBottom: 24, fontSize: 15 }}>We&apos;ve received your message and will reply within 2 hours.</p>
                  <a
                    href={`https://wa.me/${whatsappNumber}`}
                    target="_blank" rel="noopener noreferrer"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', borderRadius: 10, background: '#25D366', color: '#fff', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}
                  >
                    <MessageCircle style={{ width: 18, height: 18 }} />
                    Follow up on WhatsApp
                  </a>
                </div>
              </motion.div>
            ) : (
              <form
                onSubmit={handleSubmit}
                style={{ background: '#fff', borderRadius: 20, border: `1px solid ${BORDER}`, padding: 36, display: 'flex', flexDirection: 'column', gap: 20, boxShadow: '0 2px 16px rgba(0,0,0,0.06)' }}
              >
                <h2 style={{ fontSize: 20, fontWeight: 700, color: '#0f172a', marginBottom: 4 }}>Send us a message</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label style={{ display: 'block', fontSize: 13, color: MUTED, marginBottom: 6, fontWeight: 500 }}>Name *</label>
                    <input
                      type="text" value={form.name}
                      onChange={e => setForm({ ...form, name: e.target.value })}
                      placeholder="Your full name" required
                      style={fieldStyle}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, color: MUTED, marginBottom: 6, fontWeight: 500 }}>Email *</label>
                    <input
                      type="email" value={form.email}
                      onChange={e => setForm({ ...form, email: e.target.value })}
                      placeholder="your@email.com" required
                      style={fieldStyle}
                    />
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: MUTED, marginBottom: 6, fontWeight: 500 }}>Phone (WhatsApp)</label>
                  <input
                    type="tel" value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    style={fieldStyle}
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label style={{ display: 'block', fontSize: 13, color: MUTED, marginBottom: 6, fontWeight: 500 }}>Service</label>
                    <select
                      value={form.service}
                      onChange={e => setForm({ ...form, service: e.target.value })}
                      style={fieldStyle}
                    >
                      <option value="">Select a service</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: 13, color: MUTED, marginBottom: 6, fontWeight: 500 }}>Budget</label>
                    <select
                      value={form.budget}
                      onChange={e => setForm({ ...form, budget: e.target.value })}
                      style={fieldStyle}
                    >
                      <option value="">Select budget</option>
                      {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 13, color: MUTED, marginBottom: 6, fontWeight: 500 }}>Message *</label>
                  <textarea
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    placeholder="Tell us about your business..."
                    rows={5} required
                    style={{ ...fieldStyle, resize: 'none' }}
                  />
                </div>
                {error && (
                  <p style={{ fontSize: 13, color: '#dc2626', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '10px 16px' }}>
                    {error}
                  </p>
                )}
                <button
                  type="submit" disabled={loading}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    padding: '14px 24px', borderRadius: 10, width: '100%',
                    background: NAVY, color: '#fff', fontWeight: 700, fontSize: 15,
                    border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
                    opacity: loading ? 0.65 : 1, transition: 'all 0.15s',
                    boxShadow: '0 4px 16px rgba(30,58,138,0.25)',
                  }}
                >
                  {loading
                    ? <span style={{ width: 18, height: 18, border: '2.5px solid rgba(255,255,255,0.3)', borderTop: '2.5px solid #fff', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.8s linear infinite' }} />
                    : <><Send style={{ width: 17, height: 17 }} />Send Message</>
                  }
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
