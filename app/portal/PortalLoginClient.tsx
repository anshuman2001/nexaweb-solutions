'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Lock, Eye, EyeOff, ArrowRight, User, Phone } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function PortalLoginClient() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError(''); setSuccess('');

    try {
      if (isSignUp) {
        // Sign up with extra metadata
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name, phone }
          }
        });
        if (error) throw error;

        // Save basic client record in clients table
        if (data.user) {
          await supabase.from('clients').insert([{
            user_id: data.user.id,
            company_name: name,
            project_name: 'Pending Setup',
            status: 'in_progress',
            progress: 0,
          }]);
        }

        setSuccess('Account created! Please check your email to verify, then log in.');
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        router.push('/portal/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-20 flex items-center justify-center px-4 grid-bg">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent-green/10 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center justify-center mb-6">
            <div className="relative h-14 w-52">
              <Image
                src="/logo.png"
                alt="NexaWeb Solutions"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
          <h1 className="text-2xl font-extrabold text-white mb-2">
            {isSignUp ? 'Create Account' : 'Client Portal'}
          </h1>
          <p className="text-gray-400 text-sm">
            {isSignUp
              ? 'Register to track your project & invoices'
              : 'Log in to view your project status & invoices'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleAuth} className="bg-surface rounded-2xl border border-border-subtle p-8 space-y-4">

          {/* Sign Up Extra Fields */}
          {isSignUp && (
            <>
              {/* Full Name */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                    className="w-full bg-background border border-border-subtle rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue transition-colors"
                  />
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm text-gray-400 mb-1.5">Contact Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={e => setPhone(e.target.value)}
                    placeholder="Enter your WhatsApp number"
                    required
                    className="w-full bg-background border border-border-subtle rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue transition-colors"
                  />
                </div>
              </div>
            </>
          )}

          {/* Email */}
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Email *</label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full bg-background border border-border-subtle rounded-xl pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue transition-colors"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Password *</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                minLength={6}
                className="w-full bg-background border border-border-subtle rounded-xl pl-11 pr-11 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-accent-blue transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
              >
                {showPw ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {isSignUp && (
              <p className="text-gray-600 text-xs mt-1">Minimum 6 characters</p>
            )}
          </div>

          {/* Error / Success */}
          {error && (
            <p className="text-red-400 text-sm bg-red-900/20 border border-red-900/30 rounded-lg px-4 py-2">{error}</p>
          )}
          {success && (
            <p className="text-green-400 text-sm bg-green-900/20 border border-green-900/30 rounded-lg px-4 py-2">{success}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-accent-blue text-white font-semibold hover:bg-blue-500 transition-all btn-glow disabled:opacity-60 mt-2"
          >
            {loading
              ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              : <>{isSignUp ? 'Create Account' : 'Log In'}<ArrowRight className="w-4 h-4" /></>
            }
          </button>

          {/* Toggle */}
          <div className="text-center pt-1">
            <button
              type="button"
              onClick={() => { setIsSignUp(!isSignUp); setError(''); setSuccess(''); setName(''); setPhone(''); }}
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              {isSignUp
                ? 'Already have an account? Log in'
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>

        <p className="text-center text-gray-600 text-xs mt-4">
          Not a client?{' '}
          <Link href="/contact" className="text-accent-blue hover:text-blue-400 transition-colors">
            Contact us to get started
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
