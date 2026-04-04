'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';
import Image from 'next/image';

const navLinks = [
  { label: 'AI Agents', href: '/ai-agents' },
  { label: 'Products', href: '/products' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lang, setLang] = useState<'en' | 'hi'>('en');
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919997730768';

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#07090f]/85 backdrop-blur-2xl nav-glow-border shadow-xl shadow-black/40'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo + Branding */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative h-9 w-9 flex-shrink-0 group-hover:scale-105 transition-transform duration-200 rounded-xl overflow-hidden ring-1 ring-white/10">
                <Image
                  src="/logo.png"
                  alt="DigiAgentix"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col leading-tight">
                <span className="text-white font-bold text-sm sm:text-base tracking-wide">DigiAgentix</span>
                <span className="text-[9px] sm:text-[10px] text-gray-400 tracking-[0.15em] uppercase font-medium">AI Agency</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    pathname === link.href
                      ? 'text-white bg-accent-blue/10 text-accent-blue'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Right Side */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language Toggle */}
              <button
                onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-subtle text-sm text-gray-400 hover:text-white hover:border-accent-blue/50 transition-all"
              >
                <Globe className="w-3.5 h-3.5" />
                {lang === 'en' ? 'EN' : 'हि'}
              </button>

              <Link
                href="/portal"
                className="px-4 py-2 rounded-lg border border-border-subtle text-sm font-medium text-gray-300 hover:text-white hover:border-accent-blue/50 transition-all"
              >
                Client Login
              </Link>

              <a
                href={`https://wa.me/${whatsappNumber}?text=Hi! I'd like a free demo of your AI agents.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-medium transition-all btn-glow btn-shimmer"
              >
                Get Free Demo
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 lg:hidden bg-surface/95 backdrop-blur-xl border-b border-border-subtle"
          >
            <div className="px-4 py-6 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    pathname === link.href
                      ? 'bg-accent-blue/10 text-accent-blue border border-accent-blue/20'
                      : 'text-gray-300 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 space-y-3 border-t border-border-subtle mt-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-border-subtle text-sm text-gray-400 hover:text-white transition-all"
                  >
                    <Globe className="w-4 h-4" />
                    {lang === 'en' ? 'Switch to Hindi' : 'Switch to English'}
                  </button>
                  <Link
                    href="/portal"
                    className="flex-1 text-center px-4 py-2.5 rounded-xl border border-border-subtle text-sm font-medium text-gray-300 hover:text-white transition-all"
                  >
                    Client Login
                  </Link>
                </div>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999'}?text=Hi! I'd like a free demo.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full text-center px-4 py-3 rounded-xl bg-accent-blue text-white text-sm font-semibold hover:bg-blue-500 transition-all"
                >
                  Get Free Demo
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
