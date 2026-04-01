'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, Mail, MapPin, Clock, MessageCircle, CheckCircle } from 'lucide-react';

const services = [
  'Customer Support Agent','WhatsApp Business Agent','Sales & Lead Agent',
  'Meeting AI Agent','eCommerce Shopping Agent','Email Marketing Agent',
  'Content Writing Agent','Industry Specific Agent','eCommerce Website',
  'Business Website','Landing Page','Portfolio Website','Website + AI Agent Bundle','Other',
];
const budgets = [
  'Under ₹15,000','₹15,000 - ₹30,000','₹30,000 - ₹60,000',
  '₹60,000 - ₹1,00,000','₹1,00,000+','Not sure yet',
];

export default function ContactPageClient() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', service:'', budget:'', message:'' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919997730768';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { setError('Please fill in name, email, and message.'); return; }
    setLoading(true); setError('');
    try {
      const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
      if (res.ok) { setSuccess(true); setForm({ name:'', email:'', phone:'', service:'', budget:'', message:'' }); }
      else setError('Something went wrong. Please WhatsApp us directly.');
    } catch { setError('Network error. Please try again.'); }
    finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen pt-20">
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full badge-green text-sm font-medium mb-5">
            <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
            We reply within 2 hours
          </motion.div>
          <motion.h1 initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }}
            className="text-4xl lg:text-5xl font-extrabold text-white mb-4">
            Let's Build Something <span className="gradient-text">Amazing</span>
          </motion.h1>
          <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.2 }}
            className="text-gray-400 text-lg">
            Tell us about your business and we'll show you exactly how AI can help
          </motion.p>
        </div>
      </section>

      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Info */}
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-5">Get In Touch</h2>
              <div className="space-y-4">
                {[
                  { icon: Phone, label:'WhatsApp', value:'+91 99977 30768', href:`https://wa.me/${whatsappNumber}` },
                  { icon: Mail, label:'Email', value:'info.nexawebsolution@gmail.com', href:'mailto:info.nexawebsolution@gmail.com' },
                  { icon: MapPin, label:'Location', value:'Noida, UP 🇮🇳', href:'#' },
                  { icon: Clock, label:'Working Hours', value:'Mon-Sat, 9AM - 8PM IST', href:'#' },
                ].map(({ icon: Icon, label, value, href }) => (
                  <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer" className="flex items-start gap-3 group">
                    <div className="w-10 h-10 rounded-xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-blue/20 transition-colors">
                      <Icon className="w-5 h-5 text-accent-blue" />
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs">{label}</p>
                      <p className="text-white text-sm font-medium">{value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
            <a href={`https://wa.me/${whatsappNumber}?text=Hi! I'd like to discuss a project.`} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-3 p-4 rounded-2xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-all">
              <div className="w-12 h-12 rounded-xl bg-[#25D366] flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Chat on WhatsApp</p>
                <p className="text-[#25D366] text-xs">Fastest response — usually &lt; 30 min</p>
              </div>
            </a>
            <div className="bg-surface rounded-xl border border-border-subtle p-4 space-y-3">
              {['Free consultation call','No obligation quote','Reply within 2 hours','3+ years experience'].map(t => (
                <div key={t} className="flex items-center gap-2 text-sm text-gray-300">
                  <CheckCircle className="w-4 h-4 text-accent-green flex-shrink-0" />
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2">
            {success ? (
              <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} className="h-full flex items-center justify-center">
                <div className="text-center p-12">
                  <div className="w-20 h-20 rounded-full bg-accent-green/10 border border-accent-green/20 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="w-10 h-10 text-accent-green" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">Message Sent! 🎉</h3>
                  <p className="text-gray-400 mb-6">We've received your message and will reply within 2 hours.</p>
                  <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white font-semibold hover:bg-green-500 transition-all">
                    <MessageCircle className="w-5 h-5" />
                    Follow up on WhatsApp
                  </a>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-surface rounded-2xl border border-border-subtle p-8 space-y-5">
                <h2 className="text-xl font-bold text-white mb-2">Send us a message</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Name *</label>
                    <input type="text" value={form.name} onChange={e => setForm({...form, name:e.target.value})} placeholder="Your full name" required
                      className="w-full bg-background border border-border-subtle rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue transition-colors" />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Email *</label>
                    <input type="email" value={form.email} onChange={e => setForm({...form, email:e.target.value})} placeholder="your@email.com" required
                      className="w-full bg-background border border-border-subtle rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue transition-colors" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Phone (WhatsApp)</label>
                  <input type="tel" value={form.phone} onChange={e => setForm({...form, phone:e.target.value})} placeholder="+91 98765 43210"
                    className="w-full bg-background border border-border-subtle rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue transition-colors" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Service</label>
                    <select value={form.service} onChange={e => setForm({...form, service:e.target.value})}
                      className="w-full bg-background border border-border-subtle rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue transition-colors">
                      <option value="">Select a service</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1.5">Budget</label>
                    <select value={form.budget} onChange={e => setForm({...form, budget:e.target.value})}
                      className="w-full bg-background border border-border-subtle rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue transition-colors">
                      <option value="">Select budget</option>
                      {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1.5">Message *</label>
                  <textarea value={form.message} onChange={e => setForm({...form, message:e.target.value})} placeholder="Tell us about your business..." rows={5} required
                    className="w-full bg-background border border-border-subtle rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue transition-colors resize-none" />
                </div>
                {error && <p className="text-red-400 text-sm bg-red-900/20 border border-red-900/30 rounded-lg px-4 py-2">{error}</p>}
                <button type="submit" disabled={loading}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-accent-blue text-white font-semibold hover:bg-blue-500 transition-all btn-glow disabled:opacity-60">
                  {loading ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Send className="w-5 h-5" />Send Message</>}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
