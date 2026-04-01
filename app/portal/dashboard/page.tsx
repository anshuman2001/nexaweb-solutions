'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Bot, LogOut, FileText, MessageCircle, Download, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';

const mockProject = {
  name: 'Customer Support AI Agent',
  status: 'in_progress',
  progress: 65,
  startDate: '2024-12-01',
  estimatedDelivery: '2024-12-15',
  updates: [
    { date: '2024-12-10', message: 'AI model training completed. Starting WhatsApp integration.' },
    { date: '2024-12-08', message: 'Knowledge base setup completed with 150+ FAQs.' },
    { date: '2024-12-05', message: 'Project kickoff call completed. Requirements finalized.' },
  ],
};

const mockInvoices = [
  { id: 'INV-001', description: 'AI Agent Setup - 50% Advance', amount: 17500, status: 'paid', date: '2024-12-01' },
  { id: 'INV-002', description: 'AI Agent Setup - 50% Balance', amount: 17500, status: 'pending', date: '2024-12-15' },
];

const statusConfig = {
  in_progress: { label: 'In Progress', icon: Clock, color: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' },
  completed: { label: 'Completed', icon: CheckCircle, color: 'text-accent-green bg-accent-green/10 border-accent-green/20' },
  review: { label: 'Under Review', icon: AlertCircle, color: 'text-accent-blue bg-accent-blue/10 border-accent-blue/20' },
};

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push('/portal');
      else setUser(data.user);
      setLoading(false);
    });
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/portal');
  };

  if (loading) return (
    <div className="min-h-screen pt-20 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-accent-blue/30 border-t-accent-blue rounded-full animate-spin" />
    </div>
  );

  const status = statusConfig[mockProject.status as keyof typeof statusConfig];
  const StatusIcon = status.icon;

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="border-b border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">Hello, {user?.email?.split('@')[0]} 👋</h1>
            <p className="text-gray-400 text-sm">{user?.email}</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-xl border border-border-subtle text-gray-400 text-sm hover:text-white hover:border-accent-blue/50 transition-all">
            <LogOut className="w-4 h-4" />Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        {/* Project Status */}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="bg-surface rounded-2xl border border-border-subtle p-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-white font-bold text-xl">{mockProject.name}</h2>
              <span className={`inline-flex items-center gap-1.5 mt-2 px-3 py-1 rounded-full border text-xs font-medium ${status.color}`}>
                <StatusIcon className="w-3.5 h-3.5" />{status.label}
              </span>
            </div>
            <div className="text-right text-sm text-gray-400">
              <p>Started: {new Date(mockProject.startDate).toLocaleDateString('en-IN')}</p>
              <p>Est. Delivery: {new Date(mockProject.estimatedDelivery).toLocaleDateString('en-IN')}</p>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-400">Overall Progress</span>
              <span className="text-white font-semibold">{mockProject.progress}%</span>
            </div>
            <div className="h-3 bg-background rounded-full overflow-hidden">
              <motion.div initial={{ width:0 }} animate={{ width:`${mockProject.progress}%` }} transition={{ duration:1, delay:0.3 }}
                className="h-full bg-gradient-to-r from-accent-blue to-accent-green rounded-full" />
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-white font-semibold mb-4 text-sm">Recent Updates</h3>
            <div className="space-y-3">
              {mockProject.updates.map((u, i) => (
                <div key={i} className="flex gap-3 text-sm">
                  <div className="w-2 h-2 rounded-full bg-accent-blue mt-1.5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">{u.message}</p>
                    <p className="text-gray-500 text-xs mt-0.5">{new Date(u.date).toLocaleDateString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Invoices */}
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.1 }} className="bg-surface rounded-2xl border border-border-subtle p-6">
            <h2 className="text-white font-bold text-lg mb-5 flex items-center gap-2">
              <FileText className="w-5 h-5 text-accent-blue" />Invoices
            </h2>
            <div className="space-y-3">
              {mockInvoices.map(inv => (
                <div key={inv.id} className="flex items-center justify-between p-4 bg-background rounded-xl border border-border-subtle">
                  <div>
                    <p className="text-white text-sm font-medium">{inv.id}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{inv.description}</p>
                    <p className="text-gray-500 text-xs">{new Date(inv.date).toLocaleDateString('en-IN')}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white font-semibold">₹{inv.amount.toLocaleString('en-IN')}</p>
                    <span className={`inline-flex text-xs px-2 py-0.5 rounded-full mt-1 font-medium ${inv.status === 'paid' ? 'badge-green' : 'bg-yellow-400/10 border border-yellow-400/20 text-yellow-400'}`}>
                      {inv.status === 'paid' ? '✓ Paid' : 'Pending'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2 }} className="space-y-5">
            <div className="bg-surface rounded-2xl border border-border-subtle p-6">
              <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-accent-green" />Need Help?
              </h2>
              <p className="text-gray-400 text-sm mb-4">Have questions? Chat with us directly.</p>
              <a href="https://wa.me/919999999999?text=Hi! I'm checking on my project status." target="_blank" rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] font-semibold text-sm hover:bg-[#25D366]/20 transition-all">
                <MessageCircle className="w-5 h-5" />Message on WhatsApp
              </a>
            </div>
            <div className="bg-surface rounded-2xl border border-border-subtle p-6">
              <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                <Download className="w-5 h-5 text-accent-blue" />Downloads
              </h2>
              <div className="space-y-2">
                {['Project Proposal.pdf', 'Requirements Doc.pdf'].map(file => (
                  <div key={file} className="flex items-center justify-between p-3 bg-background rounded-lg border border-border-subtle">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-300">{file}</span>
                    </div>
                    <button className="text-xs text-accent-blue hover:text-blue-400 transition-colors font-medium">Download</button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
