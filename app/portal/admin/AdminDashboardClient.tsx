'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users, FileText, MessageSquare, LogOut, Plus, Edit2, Save, X,
  CheckCircle, Clock, AlertCircle, TrendingUp, IndianRupee, Eye,
  Trash2, ChevronDown, Phone, Mail, Calendar,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';

type Tab = 'clients' | 'invoices' | 'contacts';

const statusOptions = ['in_progress', 'review', 'completed', 'on_hold'];
const statusLabels: Record<string, string> = {
  in_progress: 'In Progress',
  review: 'Under Review',
  completed: 'Completed',
  on_hold: 'On Hold',
};
const statusColors: Record<string, string> = {
  in_progress: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  review: 'text-accent-blue bg-accent-blue/10 border-accent-blue/20',
  completed: 'text-accent-green bg-accent-green/10 border-accent-green/20',
  on_hold: 'text-red-400 bg-red-400/10 border-red-400/20',
};

export default function AdminDashboardClient() {
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>('clients');

  // Data
  const [clients, setClients] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [contacts, setContacts] = useState<any[]>([]);

  // Edit client modal
  const [editingClient, setEditingClient] = useState<any>(null);
  const [editForm, setEditForm] = useState<any>({});

  // Add invoice modal
  const [addingInvoiceFor, setAddingInvoiceFor] = useState<any>(null);
  const [invoiceForm, setInvoiceForm] = useState({ description: '', amount: '', due_date: '', status: 'pending' });

  // Expanded contact
  const [expandedContact, setExpandedContact] = useState<string | null>(null);

  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  useEffect(() => {
    const init = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

      if (!user || (adminEmail && user.email?.toLowerCase() !== adminEmail.toLowerCase())) {
        router.push('/portal');
        return;
      }
      setAdminUser(user);
      await fetchAll();
      setLoading(false);
    };
    init();
  }, [router]);

  const fetchAll = async () => {
    const [{ data: c }, { data: inv }, { data: con }] = await Promise.all([
      supabase.from('clients').select('*').order('created_at', { ascending: false }),
      supabase.from('invoices').select('*').order('created_at', { ascending: false }),
      supabase.from('contacts').select('*').order('created_at', { ascending: false }),
    ]);
    setClients(c || []);
    setInvoices(inv || []);
    setContacts(con || []);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/portal');
  };

  // ─── EDIT CLIENT ─────────────────────────────────────────
  const openEdit = (client: any) => {
    setEditingClient(client);
    setEditForm({
      company_name: client.company_name || '',
      project_name: client.project_name || '',
      status: client.status || 'in_progress',
      progress: client.progress || 0,
      contact_number: client.contact_number || '',
    });
  };

  const saveClient = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('clients')
      .update({
        company_name: editForm.company_name,
        project_name: editForm.project_name,
        status: editForm.status,
        progress: Number(editForm.progress),
        contact_number: editForm.contact_number,
      })
      .eq('id', editingClient.id);

    if (!error) {
      setClients(prev => prev.map(c => c.id === editingClient.id ? { ...c, ...editForm, progress: Number(editForm.progress) } : c));
      setEditingClient(null);
      showToast('✅ Client updated successfully');
    } else {
      showToast('❌ Failed to update. Try again.');
    }
    setSaving(false);
  };

  // ─── ADD INVOICE ─────────────────────────────────────────
  const saveInvoice = async () => {
    if (!invoiceForm.description || !invoiceForm.amount) return;
    setSaving(true);
    const { data, error } = await supabase.from('invoices').insert([{
      client_id: addingInvoiceFor.id,
      description: invoiceForm.description,
      amount: Number(invoiceForm.amount),
      due_date: invoiceForm.due_date || null,
      status: invoiceForm.status,
    }]).select().single();

    if (!error && data) {
      setInvoices(prev => [data, ...prev]);
      setAddingInvoiceFor(null);
      setInvoiceForm({ description: '', amount: '', due_date: '', status: 'pending' });
      showToast('✅ Invoice added successfully');
    } else {
      showToast('❌ Failed to add invoice. Try again.');
    }
    setSaving(false);
  };

  // ─── UPDATE INVOICE STATUS ────────────────────────────────
  const updateInvoiceStatus = async (invoiceId: string, newStatus: string) => {
    await supabase.from('invoices').update({ status: newStatus }).eq('id', invoiceId);
    setInvoices(prev => prev.map(inv => inv.id === invoiceId ? { ...inv, status: newStatus } : inv));
    showToast('✅ Invoice status updated');
  };

  // ─── DELETE INVOICE ───────────────────────────────────────
  const deleteInvoice = async (invoiceId: string) => {
    if (!confirm('Delete this invoice?')) return;
    await supabase.from('invoices').delete().eq('id', invoiceId);
    setInvoices(prev => prev.filter(inv => inv.id !== invoiceId));
    showToast('🗑️ Invoice deleted');
  };

  // ─── STATS ────────────────────────────────────────────────
  const totalRevenue = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + Number(i.amount), 0);
  const pendingRevenue = invoices.filter(i => i.status === 'pending').reduce((s, i) => s + Number(i.amount), 0);
  const activeProjects = clients.filter(c => c.status === 'in_progress' || c.status === 'review').length;

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent-blue/30 border-t-accent-blue rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div initial={{ opacity: 0, y: -40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -40 }}
            className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-3 rounded-xl bg-surface border border-border-subtle text-white text-sm shadow-2xl">
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="bg-surface border-b border-border-subtle sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative h-9 w-32">
              <Image src="/logo.png" alt="NexaWeb" fill className="object-contain object-left" />
            </div>
            <span className="px-2 py-0.5 rounded-md bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold">ADMIN</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-gray-400 text-sm hidden sm:block">{adminUser?.email}</span>
            <button onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-subtle text-gray-400 text-sm hover:text-white hover:border-red-500/30 transition-all">
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Clients', value: clients.length, icon: Users, color: 'text-accent-blue', bg: 'bg-accent-blue/10' },
            { label: 'Active Projects', value: activeProjects, icon: TrendingUp, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
            { label: 'Revenue Collected', value: `₹${totalRevenue.toLocaleString('en-IN')}`, icon: IndianRupee, color: 'text-accent-green', bg: 'bg-accent-green/10' },
            { label: 'Pending Amount', value: `₹${pendingRevenue.toLocaleString('en-IN')}`, icon: Clock, color: 'text-red-400', bg: 'bg-red-400/10' },
          ].map(stat => (
            <div key={stat.label} className="bg-surface rounded-2xl border border-border-subtle p-5">
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-gray-400 text-sm mt-0.5">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-2 border-b border-border-subtle pb-0">
          {([
            { id: 'clients', label: 'Clients', icon: Users, count: clients.length },
            { id: 'invoices', label: 'Invoices', icon: FileText, count: invoices.length },
            { id: 'contacts', label: 'Contact Requests', icon: MessageSquare, count: contacts.length },
          ] as const).map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all -mb-px ${
                activeTab === tab.id
                  ? 'border-accent-blue text-white'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}>
              <tab.icon className="w-4 h-4" />
              {tab.label}
              <span className={`px-1.5 py-0.5 rounded-full text-xs ${activeTab === tab.id ? 'bg-accent-blue/20 text-accent-blue' : 'bg-white/5 text-gray-500'}`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ── CLIENTS TAB ── */}
        {activeTab === 'clients' && (
          <div className="space-y-4">
            {clients.length === 0 ? (
              <div className="text-center py-16 text-gray-500">No clients yet.</div>
            ) : (
              clients.map(client => (
                <motion.div key={client.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-surface rounded-2xl border border-border-subtle p-5">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 flex-wrap">
                        <div className="w-9 h-9 rounded-full bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue font-bold text-sm">
                          {(client.company_name || 'C')[0].toUpperCase()}
                        </div>
                        <div>
                          <p className="text-white font-semibold">{client.company_name || 'No Name'}</p>
                          <p className="text-gray-400 text-xs">{client.email || '—'}</p>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-xs font-medium ${statusColors[client.status] || statusColors.in_progress}`}>
                          {statusLabels[client.status] || 'In Progress'}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="bg-background rounded-xl border border-border-subtle px-4 py-3">
                          <p className="text-gray-500 text-xs mb-1">Project</p>
                          <p className="text-white text-sm font-medium">{client.project_name || '—'}</p>
                        </div>
                        <div className="bg-background rounded-xl border border-border-subtle px-4 py-3">
                          <p className="text-gray-500 text-xs mb-1">Contact</p>
                          <p className="text-white text-sm">{client.contact_number || '—'}</p>
                        </div>
                        <div className="bg-background rounded-xl border border-border-subtle px-4 py-3">
                          <p className="text-gray-500 text-xs mb-1">Joined</p>
                          <p className="text-white text-sm">{new Date(client.created_at).toLocaleDateString('en-IN')}</p>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="mt-4">
                        <div className="flex justify-between text-xs mb-1.5">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-white font-semibold">{client.progress || 0}%</span>
                        </div>
                        <div className="h-2 bg-background rounded-full overflow-hidden border border-border-subtle">
                          <div
                            className="h-full bg-gradient-to-r from-accent-blue to-accent-green rounded-full transition-all duration-500"
                            style={{ width: `${client.progress || 0}%` }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex sm:flex-col gap-2 sm:min-w-[120px]">
                      <button onClick={() => openEdit(client)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-sm font-medium hover:bg-accent-blue/20 transition-all">
                        <Edit2 className="w-4 h-4" /> Edit
                      </button>
                      <button onClick={() => setAddingInvoiceFor(client)}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-accent-green/10 border border-accent-green/20 text-accent-green text-sm font-medium hover:bg-accent-green/20 transition-all">
                        <Plus className="w-4 h-4" /> Invoice
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        )}

        {/* ── INVOICES TAB ── */}
        {activeTab === 'invoices' && (
          <div className="space-y-3">
            {invoices.length === 0 ? (
              <div className="text-center py-16 text-gray-500">No invoices yet.</div>
            ) : (
              invoices.map(inv => {
                const clientForInv = clients.find(c => c.id === inv.client_id);
                return (
                  <motion.div key={inv.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                    className="bg-surface rounded-2xl border border-border-subtle p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-white font-semibold">INV-{inv.id.slice(0, 8).toUpperCase()}</span>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
                          inv.status === 'paid' ? 'badge-green' :
                          inv.status === 'overdue' ? 'bg-red-400/10 border-red-400/20 text-red-400' :
                          'bg-yellow-400/10 border-yellow-400/20 text-yellow-400'
                        }`}>
                          {inv.status === 'paid' ? '✓ Paid' : inv.status === 'overdue' ? '⚠ Overdue' : '⏳ Pending'}
                        </span>
                      </div>
                      <p className="text-gray-400 text-sm">{inv.description}</p>
                      <p className="text-gray-500 text-xs mt-1">
                        Client: <span className="text-gray-300">{clientForInv?.company_name || '—'}</span>
                        {inv.due_date && <> · Due: <span className="text-gray-300">{new Date(inv.due_date).toLocaleDateString('en-IN')}</span></>}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-white">₹{Number(inv.amount).toLocaleString('en-IN')}</span>
                      {/* Status toggle */}
                      <select
                        value={inv.status}
                        onChange={e => updateInvoiceStatus(inv.id, e.target.value)}
                        className="bg-background border border-border-subtle rounded-lg px-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:border-accent-blue cursor-pointer"
                      >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="overdue">Overdue</option>
                      </select>
                      <button onClick={() => deleteInvoice(inv.id)}
                        className="p-2 rounded-lg text-red-400 hover:bg-red-400/10 transition-all">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        )}

        {/* ── CONTACTS TAB ── */}
        {activeTab === 'contacts' && (
          <div className="space-y-3">
            {contacts.length === 0 ? (
              <div className="text-center py-16 text-gray-500">No contact requests yet.</div>
            ) : (
              contacts.map(contact => (
                <motion.div key={contact.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="bg-surface rounded-2xl border border-border-subtle overflow-hidden">
                  <button
                    onClick={() => setExpandedContact(expandedContact === contact.id ? null : contact.id)}
                    className="w-full flex items-center justify-between p-5 text-left hover:bg-white/[0.02] transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-9 h-9 rounded-full bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center text-accent-blue font-bold text-sm">
                        {(contact.name || 'U')[0].toUpperCase()}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{contact.name}</p>
                        <p className="text-gray-400 text-xs">{contact.service || 'General Inquiry'} · {contact.budget || 'Budget not specified'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500 text-xs hidden sm:block">{new Date(contact.created_at).toLocaleDateString('en-IN')}</span>
                      <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedContact === contact.id ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedContact === contact.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden border-t border-border-subtle"
                      >
                        <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="w-4 h-4 text-gray-500" />
                              <a href={`mailto:${contact.email}`} className="text-accent-blue hover:underline">{contact.email}</a>
                            </div>
                            {contact.phone && (
                              <div className="flex items-center gap-2 text-sm">
                                <Phone className="w-4 h-4 text-gray-500" />
                                <a href={`https://wa.me/${contact.phone?.replace(/\D/g, '')}`} className="text-accent-green hover:underline" target="_blank" rel="noopener noreferrer">{contact.phone}</a>
                              </div>
                            )}
                            <div className="flex items-center gap-2 text-sm">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <span className="text-gray-300">{new Date(contact.created_at).toLocaleString('en-IN')}</span>
                            </div>
                          </div>
                          <div className="bg-background rounded-xl border border-border-subtle p-4">
                            <p className="text-gray-500 text-xs mb-2">Message</p>
                            <p className="text-gray-300 text-sm leading-relaxed">{contact.message || '—'}</p>
                          </div>
                          <div className="sm:col-span-2 flex gap-3">
                            <a href={`mailto:${contact.email}?subject=Re: Your inquiry about ${contact.service || 'NexaWeb Services'}`}
                              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent-blue/10 border border-accent-blue/20 text-accent-blue text-sm font-medium hover:bg-accent-blue/20 transition-all">
                              <Mail className="w-4 h-4" /> Reply via Email
                            </a>
                            {contact.phone && (
                              <a href={`https://wa.me/${contact.phone?.replace(/\D/g, '')}?text=Hi ${contact.name}, thanks for reaching out to NexaWeb Solutions!`}
                                target="_blank" rel="noopener noreferrer"
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] text-sm font-medium hover:bg-[#25D366]/20 transition-all">
                                <MessageSquare className="w-4 h-4" /> Reply on WhatsApp
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))
            )}
          </div>
        )}
      </div>

      {/* ── EDIT CLIENT MODAL ── */}
      <AnimatePresence>
        {editingClient && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setEditingClient(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-lg mx-auto bg-surface rounded-2xl border border-border-subtle shadow-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold text-lg">Edit Client</h3>
                <button onClick={() => setEditingClient(null)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-1.5">Client Name</label>
                  <input value={editForm.company_name} onChange={e => setEditForm({ ...editForm, company_name: e.target.value })}
                    className="w-full bg-background border border-border-subtle rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue text-sm" />
                </div>
                <div>
                  <label className="text-gray-400 text-sm block mb-1.5">Project Name</label>
                  <input value={editForm.project_name} onChange={e => setEditForm({ ...editForm, project_name: e.target.value })}
                    className="w-full bg-background border border-border-subtle rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue text-sm" />
                </div>
                <div>
                  <label className="text-gray-400 text-sm block mb-1.5">Contact Number</label>
                  <input value={editForm.contact_number} onChange={e => setEditForm({ ...editForm, contact_number: e.target.value })}
                    className="w-full bg-background border border-border-subtle rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue text-sm" />
                </div>
                <div>
                  <label className="text-gray-400 text-sm block mb-1.5">Status</label>
                  <select value={editForm.status} onChange={e => setEditForm({ ...editForm, status: e.target.value })}
                    className="w-full bg-background border border-border-subtle rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue text-sm cursor-pointer">
                    {statusOptions.map(s => <option key={s} value={s}>{statusLabels[s]}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-gray-400 text-sm block mb-1.5">Progress: <span className="text-white font-semibold">{editForm.progress}%</span></label>
                  <input type="range" min={0} max={100} value={editForm.progress}
                    onChange={e => setEditForm({ ...editForm, progress: e.target.value })}
                    className="w-full accent-accent-blue cursor-pointer" />
                  <div className="flex justify-between text-xs text-gray-500 mt-1"><span>0%</span><span>50%</span><span>100%</span></div>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setEditingClient(null)}
                    className="flex-1 py-3 rounded-xl border border-border-subtle text-gray-300 text-sm font-medium hover:text-white transition-all">
                    Cancel
                  </button>
                  <button onClick={saveClient} disabled={saving}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-accent-blue text-white text-sm font-semibold hover:bg-blue-500 transition-all disabled:opacity-60">
                    {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Save className="w-4 h-4" /> Save Changes</>}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── ADD INVOICE MODAL ── */}
      <AnimatePresence>
        {addingInvoiceFor && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setAddingInvoiceFor(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50" />
            <motion.div initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-lg mx-auto bg-surface rounded-2xl border border-border-subtle shadow-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-white font-bold text-lg">Add Invoice</h3>
                  <p className="text-gray-400 text-sm">For: {addingInvoiceFor.company_name}</p>
                </div>
                <button onClick={() => setAddingInvoiceFor(null)} className="text-gray-400 hover:text-white"><X className="w-5 h-5" /></button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-gray-400 text-sm block mb-1.5">Description *</label>
                  <input value={invoiceForm.description} onChange={e => setInvoiceForm({ ...invoiceForm, description: e.target.value })}
                    placeholder="e.g. WhatsApp Agent Development"
                    className="w-full bg-background border border-border-subtle rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue text-sm" />
                </div>
                <div>
                  <label className="text-gray-400 text-sm block mb-1.5">Amount (₹) *</label>
                  <input type="number" value={invoiceForm.amount} onChange={e => setInvoiceForm({ ...invoiceForm, amount: e.target.value })}
                    placeholder="e.g. 25000"
                    className="w-full bg-background border border-border-subtle rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue text-sm" />
                </div>
                <div>
                  <label className="text-gray-400 text-sm block mb-1.5">Due Date (optional)</label>
                  <input type="date" value={invoiceForm.due_date} onChange={e => setInvoiceForm({ ...invoiceForm, due_date: e.target.value })}
                    className="w-full bg-background border border-border-subtle rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue text-sm" />
                </div>
                <div>
                  <label className="text-gray-400 text-sm block mb-1.5">Status</label>
                  <select value={invoiceForm.status} onChange={e => setInvoiceForm({ ...invoiceForm, status: e.target.value })}
                    className="w-full bg-background border border-border-subtle rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent-blue text-sm cursor-pointer">
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                  </select>
                </div>
                <div className="flex gap-3 pt-2">
                  <button onClick={() => setAddingInvoiceFor(null)}
                    className="flex-1 py-3 rounded-xl border border-border-subtle text-gray-300 text-sm font-medium hover:text-white transition-all">
                    Cancel
                  </button>
                  <button onClick={saveInvoice} disabled={saving || !invoiceForm.description || !invoiceForm.amount}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-accent-green text-white text-sm font-semibold hover:bg-emerald-500 transition-all disabled:opacity-60">
                    {saving ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><Plus className="w-4 h-4" /> Add Invoice</>}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
