'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageCircle } from 'lucide-react';
import Image from 'next/image';

const navLinks = [
  { label: 'Home',       href: '/' },
  { label: 'About Us',   href: '/about' },
  { label: 'Solutions',  href: '/services' },
  { label: 'Industries', href: '/#industries' },
  { label: 'Products',   href: '/products' },
  { label: 'Resources',  href: '/portfolio' },
  { label: 'Careers',    href: '/#careers' },
  { label: 'Blog',       href: '/blog' },
  { label: 'Contact',    href: '/contact' },
];

const STANDALONE_ROUTES = ['/eduaccess-ai', '/ai-calling-agent', '/cold-email-agent'];
// Light hero bg — transparent w/ dark text, scrolls to dark navy
const MIXED_LIGHT_PAGES = ['/services'];
// Dark hero bg — transparent w/ light text, scrolls to dark navy
const MIXED_DARK_PAGES  = ['/products'];

export default function Navbar() {
  const [isOpen, setIsOpen]     = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHome        = pathname === '/';
  const isStandalone  = !!pathname && STANDALONE_ROUTES.some((r) => pathname === r || pathname.startsWith(r + '/'));
  const isMixedLight  = !!pathname && MIXED_LIGHT_PAGES.includes(pathname);
  const isMixedDark   = !!pathname && MIXED_DARK_PAGES.includes(pathname);
  const isMixed       = isMixedLight || isMixedDark;
  // Light state: homepage always; light-bg mixed pages before scroll
  const isLightState  = isHome || (isMixedLight && !scrolled);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => { setIsOpen(false); }, [pathname]);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919997730768';

  if (isStandalone) return null;

  const navBg = isHome
    ? (scrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.95)')
    : isMixed
      ? (scrolled ? '#0f172a' : 'transparent')
      : '#0f172a';
  const navBorder = isLightState
    ? (scrolled ? '1px solid #e2e8f0' : '1px solid rgba(226,232,240,0.6)')
    : '1px solid rgba(255,255,255,0.06)';
  // No shadow when fully transparent
  const navShadow = (isMixed && !scrolled)
    ? 'none'
    : isLightState
      ? (scrolled ? '0 2px 16px rgba(0,0,0,0.08)' : 'none')
      : '0 4px 24px rgba(0,0,0,0.35)';
  const navHeight  = !isHome && scrolled ? 60 : 68;
  const linkColor  = isLightState ? '#334155' : '#d1d5db';
  const linkActive = isLightState ? '#1e3a8a' : '#fff';
  const logoSub    = isLightState ? '#64748b' : '#94a3b8';

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          background: navBg, borderBottom: navBorder,
          boxShadow: navShadow,
          backdropFilter: 'blur(12px)',
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: navHeight, transition: 'height 0.3s ease' }}>

            {/* Logo */}
            <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
              <div style={{ position: 'relative', width: 36, height: 36, borderRadius: 8, overflow: 'hidden', border: isLightState ? '1px solid #e2e8f0' : '1px solid rgba(255,255,255,0.1)', flexShrink: 0 }}>
                <Image src="/logo.png" alt="DigiAgentix" fill className="object-contain" priority />
              </div>
              <div style={{ lineHeight: 1.2 }}>
                <div style={{ fontWeight: 800, fontSize: 15, color: isLightState ? '#0f172a' : '#fff', letterSpacing: 0.2 }}>DigiAgentix</div>
                <div style={{ fontSize: 9, color: logoSub, letterSpacing: 2, textTransform: 'uppercase', fontWeight: 600 }}>Technology Solutions</div>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex">
              <div style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                {navLinks.map((link) => {
                  const active = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      style={{
                        padding: '8px 10px', borderRadius: 6, fontSize: 13, fontWeight: 600,
                        color: active ? linkActive : linkColor,
                        textDecoration: 'none',
                        background: active ? (isLightState ? '#e0e7ff' : 'rgba(255,255,255,0.08)') : 'transparent',
                        transition: 'all 0.15s',
                      }}
                      onMouseEnter={e => {
                        if (!active) {
                          (e.currentTarget as HTMLAnchorElement).style.color = isLightState ? '#1e3a8a' : '#fff';
                          (e.currentTarget as HTMLAnchorElement).style.background = isLightState ? '#f0f4ff' : 'rgba(255,255,255,0.06)';
                        }
                      }}
                      onMouseLeave={e => {
                        if (!active) {
                          (e.currentTarget as HTMLAnchorElement).style.color = linkColor;
                          (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                        }
                      }}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Right CTA */}
            <div className="hidden lg:flex" style={{ alignItems: 'center', gap: 10 }}>
              <Link
                href="/portal"
                style={{
                  padding: '8px 16px', borderRadius: 6, fontSize: 13, fontWeight: 600,
                  color: linkColor, textDecoration: 'none',
                  border: `1px solid ${isLightState ? '#e2e8f0' : 'rgba(255,255,255,0.12)'}`,
                  transition: 'all 0.15s',
                }}
              >
                Client Login
              </Link>
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hi! I'd like to schedule a consultation with DigiAgentix.`}
                target="_blank" rel="noopener noreferrer"
                style={{
                  padding: '9px 20px', borderRadius: 6, fontSize: 13, fontWeight: 700,
                  background: '#1e3a8a', color: '#fff', textDecoration: 'none',
                  boxShadow: '0 2px 8px rgba(30,58,138,0.25)',
                  transition: 'all 0.15s',
                }}
              >
                Book a Consultation
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              style={{ padding: 8, borderRadius: 6, border: 'none', background: 'transparent', cursor: 'pointer', color: isLightState ? '#334155' : '#d1d5db' }}
              className="lg:hidden block"
            >
              {isOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'fixed', inset: '68px 0 auto 0', zIndex: 40,
              background: isLightState ? '#fff' : 'rgba(7,9,15,0.97)',
              borderBottom: `1px solid ${isLightState ? '#e2e8f0' : '#1e293b'}`,
              backdropFilter: 'blur(20px)',
            }}
          >
            <div style={{ padding: '12px 20px', display: 'flex', flexDirection: 'column', gap: 2 }}>
              {navLinks.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      padding: '11px 14px', borderRadius: 8, fontSize: 14, fontWeight: 600,
                      color: active ? '#1e3a8a' : (isLightState ? '#334155' : '#d1d5db'),
                      textDecoration: 'none',
                      background: active ? '#e0e7ff' : 'transparent',
                      borderLeft: active ? '3px solid #2563eb' : '3px solid transparent',
                      transition: 'all 0.15s',
                    }}
                  >
                    {link.label}
                  </Link>
                );
              })}
              <div style={{ borderTop: `1px solid ${isLightState ? '#e2e8f0' : '#1e293b'}`, marginTop: 6, paddingTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hi DigiAgentix! I have a quick question.`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ padding: '11px 14px', borderRadius: 8, fontSize: 14, fontWeight: 600, color: '#22c55e', textDecoration: 'none', border: '1px solid rgba(34,197,94,0.25)', background: 'rgba(34,197,94,0.06)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7 }}
                >
                  <MessageCircle size={15} /> Chat on WhatsApp
                </a>
                <Link href="/portal" style={{ padding: '11px 14px', borderRadius: 8, fontSize: 14, fontWeight: 600, color: isLightState ? '#334155' : '#d1d5db', textDecoration: 'none', border: `1px solid ${isLightState ? '#e2e8f0' : '#334155'}`, textAlign: 'center' }}>
                  Client Login
                </Link>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hi! I'd like to schedule a consultation.`}
                  target="_blank" rel="noopener noreferrer"
                  style={{ padding: '12px 14px', borderRadius: 8, fontSize: 14, fontWeight: 700, background: '#1e3a8a', color: '#fff', textDecoration: 'none', textAlign: 'center' }}
                >
                  Book a Consultation
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
