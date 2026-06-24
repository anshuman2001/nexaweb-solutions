'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter } from 'lucide-react';
import { usePathname } from 'next/navigation';

const STANDALONE_ROUTES = ['/eduaccess-ai', '/ai-calling-agent', '/cold-email-agent', '/certificate-preview', '/offer-letter/admin', '/offer-letter-preview'];

const footerLinks = {
  solutions: [
    { label: 'AI Customer Support',    href: '/services' },
    { label: 'WhatsApp Automation',    href: '/services' },
    { label: 'Lead Generation',        href: '/services' },
    { label: 'Business Websites',      href: '/services' },
    { label: 'Software Development',   href: '/services' },
    { label: 'Cloud & Transformation', href: '/services' },
  ],
  company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers',  href: '/#careers' },
    { label: 'Blog',     href: '/blog' },
    { label: 'Contact',  href: '/contact' },
  ],
  legal: [
    { label: 'Privacy Policy',     href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ],
};

const STARS = [
  { top: '8%', left: '5%', size: 1.5, opacity: 0.6 },
  { top: '15%', left: '18%', size: 1, opacity: 0.4 },
  { top: '5%', left: '32%', size: 2, opacity: 0.5 },
  { top: '22%', left: '45%', size: 1, opacity: 0.35 },
  { top: '10%', left: '60%', size: 1.5, opacity: 0.55 },
  { top: '18%', left: '72%', size: 1, opacity: 0.4 },
  { top: '7%', left: '85%', size: 2, opacity: 0.5 },
  { top: '30%', left: '92%', size: 1, opacity: 0.35 },
  { top: '40%', left: '3%', size: 1.5, opacity: 0.45 },
  { top: '50%', left: '12%', size: 1, opacity: 0.3 },
  { top: '35%', left: '25%', size: 2, opacity: 0.4 },
  { top: '55%', left: '38%', size: 1, opacity: 0.35 },
  { top: '42%', left: '52%', size: 1.5, opacity: 0.5 },
  { top: '60%', left: '65%', size: 1, opacity: 0.3 },
  { top: '38%', left: '78%', size: 2, opacity: 0.45 },
  { top: '48%', left: '88%', size: 1, opacity: 0.4 },
  { top: '70%', left: '8%', size: 1.5, opacity: 0.35 },
  { top: '75%', left: '22%', size: 1, opacity: 0.4 },
  { top: '68%', left: '40%', size: 2, opacity: 0.5 },
  { top: '80%', left: '55%', size: 1, opacity: 0.3 },
  { top: '72%', left: '70%', size: 1.5, opacity: 0.45 },
  { top: '85%', left: '82%', size: 1, opacity: 0.35 },
  { top: '90%', left: '15%', size: 2, opacity: 0.4 },
  { top: '92%', left: '48%', size: 1, opacity: 0.3 },
  { top: '88%', left: '95%', size: 1.5, opacity: 0.45 },
];

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="text-sm text-gray-400 hover:text-white transition-colors">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Footer() {
  const pathname = usePathname();
  const isStandalone = !!pathname && STANDALONE_ROUTES.some((r) => pathname === r || pathname.startsWith(r + '/'));
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919997730768';

  if (isStandalone) return null;

  return (
    <footer
      className="relative border-t border-white/10 mt-auto overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #07090f 0%, #0a0d1a 60%, #060810 100%)' }}
    >
      {/* CSS-only static stars */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {STARS.map((s, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-blue-200"
            style={{ top: s.top, left: s.left, width: s.size, height: s.size, opacity: s.opacity }}
          />
        ))}
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)' }} />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          {/* Brand — spans 2 cols */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <div className="relative h-12 w-12 rounded-xl overflow-hidden ring-1 ring-white/10">
                <Image src="/logo.png" alt="DigiAgentix" fill className="object-contain" />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-5 max-w-xs">
              Enterprise technology solutions company delivering AI, automation, software development, and digital transformation for SMEs and businesses across India.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-300 font-medium">
                MSME Registered
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-xs text-green-300 font-medium">
                India-Based Team
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <a href="mailto:info@digiagentix.com"
                className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-blue-400 transition-colors">
                <Mail className="w-4 h-4" />
                info@digiagentix.com
              </a>
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-green-400 transition-colors">
                <Phone className="w-4 h-4" />
                +91 99977 30768
              </a>
              <div className="flex items-center gap-2.5 text-sm text-gray-400">
                <MapPin className="w-4 h-4" />
                Noida, UP, India
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col gap-2 mb-6">
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hi! I'd like to chat with DigiAgentix.`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium hover:bg-green-500/20 transition-all w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                Chat on WhatsApp
              </a>
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hi! I'd like to book a consultation.`}
                target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-300 text-sm font-medium hover:bg-blue-600/30 transition-all w-fit">
                Book a Consultation
              </a>
            </div>

            <div className="flex gap-3">
              {[
                { icon: Linkedin,  label: 'LinkedIn',  href: '#' },
                { icon: Instagram, label: 'Instagram', href: '#' },
                { icon: Twitter,   label: 'Twitter',   href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <FooterColumn title="Solutions" links={footerLinks.solutions} />
          <FooterColumn title="Company"   links={footerLinks.company} />
          <FooterColumn title="Legal"     links={footerLinks.legal} />
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 DigiAgentix. All rights reserved.</p>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
            Made with care in India 🇮🇳
          </span>
        </div>
      </div>
    </footer>
  );
}
