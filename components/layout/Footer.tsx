'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter } from 'lucide-react';
import { usePathname } from 'next/navigation';

const STANDALONE_ROUTES = ['/eduaccess-ai', '/ai-calling-agent', '/cold-email-agent'];

const footerLinks = {
  company: [
    { label: 'About Us',  href: '/about' },
    { label: 'Careers',   href: '/#careers' },
    { label: 'Blog',      href: '/blog' },
    { label: 'Contact',   href: '/contact' },
  ],
  solutions: [
    { label: 'AI & Machine Learning', href: '/services' },
    { label: 'Automation',            href: '/services' },
    { label: 'Software Development',  href: '/services' },
    { label: 'Cloud Solutions',       href: '/services' },
    { label: 'Consulting',            href: '/services' },
  ],
  products: [
    { label: 'AI Agents Suite', href: '/ai-agents' },
    { label: 'BrokerNote',      href: '/brokernote-ai' },
    { label: 'ComplianceIQ',    href: '/ca-compliance-calendar' },
  ],
  resources: [
    { label: 'Case Studies',    href: '/portfolio' },
    { label: 'Documentation',   href: '/blog' },
    { label: 'Insights',        href: '/blog' },
  ],
  legal: [
    { label: 'Privacy Policy',    href: '/privacy' },
    { label: 'Terms & Conditions', href: '/terms' },
  ],
};

// Static star positions — no JS, no canvas, no animation lag
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
  { top: '25%', left: '95%', size: 1, opacity: 0.4 },
  { top: '62%', left: '30%', size: 1, opacity: 0.35 },
  { top: '14%', left: '55%', size: 1.5, opacity: 0.5 },
  { top: '45%', left: '98%', size: 1, opacity: 0.3 },
  { top: '78%', left: '62%', size: 2, opacity: 0.4 },
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
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">

          {/* Brand — spans 2 cols */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <div className="relative h-12 w-12 rounded-xl overflow-hidden ring-1 ring-white/10">
                <Image src="/logo.png" alt="DigiAgentix" fill className="object-contain" />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Enterprise technology solutions company delivering AI, automation, software development, and digital transformation services for SMEs and enterprises.
            </p>

            <div className="space-y-3">
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

            <div className="flex gap-3 mt-6">
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
          <FooterColumn title="Company"   links={footerLinks.company} />
          <FooterColumn title="Solutions" links={footerLinks.solutions} />
          <FooterColumn title="Products"  links={footerLinks.products} />

          {/* Resources + Legal stacked */}
          <div className="space-y-8">
            <FooterColumn title="Resources" links={footerLinks.resources} />
            <FooterColumn title="Legal"     links={footerLinks.legal} />
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">© 2026 DigiAgentix. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
              Made with care in India 🇮🇳
            </span>
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi! I'd like to connect with DigiAgentix.`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-medium hover:bg-green-500/20 transition-all">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
