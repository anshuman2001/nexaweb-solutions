import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, Linkedin, Instagram, Twitter } from 'lucide-react';

const footerLinks = {
  services: [
    { label: 'AI Agents', href: '/ai-agents' },
    { label: 'Web Design', href: '/services' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Pricing', href: '/pricing' },
  ],
  company: [
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
    { label: 'Client Portal', href: '/portal' },
  ],
  agents: [
    { label: 'Customer Support', href: '/ai-agents' },
    { label: 'WhatsApp Agent', href: '/ai-agents' },
    { label: 'Sales & Lead', href: '/ai-agents' },
    { label: 'Meeting AI', href: '/ai-agents' },
  ],
};

export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919997730768';
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border-subtle mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4">
              <div className="relative h-12 w-44">
                <Image
                  src="/logo.png"
                  alt="NexaWeb Solutions"
                  fill
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Building AI agents and professional websites for Indian businesses. Automate, grow, and scale with cutting-edge technology.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <a
                href="mailto:info.nexawebsolution@gmail.com"
                className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-accent-blue transition-colors"
              >
                <Mail className="w-4 h-4" />
                info.nexawebsolution@gmail.com
              </a>
              <a
                href={`https://wa.me/919997730768`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-accent-green transition-colors"
              >
                <Phone className="w-4 h-4" />
                +91 99977 30768
              </a>
              <div className="flex items-center gap-2.5 text-sm text-gray-400">
                <MapPin className="w-4 h-4" />
                Noida, UP 🇮🇳
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {[
                { icon: Linkedin, label: 'LinkedIn', href: '#' },
                { icon: Instagram, label: 'Instagram', href: '#' },
                { icon: Twitter, label: 'Twitter', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-border-subtle flex items-center justify-center text-gray-400 hover:text-white hover:border-accent-blue/50 hover:bg-accent-blue/10 transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* AI Agents */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">AI Agents</h3>
            <ul className="space-y-3">
              {footerLinks.agents.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6">
              <a
                href={`https://wa.me/${whatsappNumber}?text=Hi! I'd like a free demo.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-green/10 border border-accent-green/20 text-accent-green text-sm font-medium hover:bg-accent-green/20 transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border-subtle py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © {currentYear} NexaWeb Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-border-subtle text-xs text-gray-400">
              Made in India 🇮🇳
            </span>
            <div className="flex gap-4 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-gray-300 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-gray-300 transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
