'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
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

function StarfieldCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let stars: { x: number; y: number; z: number; size: number; opacity: number; twinkle: number; twinkleSpeed: number }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initStars();
    };

    const initStars = () => {
      stars = [];
      const count = Math.floor((canvas.width * canvas.height) / 4000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random(),
          size: Math.random() * 1.8 + 0.3,
          opacity: Math.random() * 0.7 + 0.2,
          twinkle: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
        });
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.twinkle += star.twinkleSpeed;
        const twinkleFactor = 0.6 + 0.4 * Math.sin(star.twinkle);
        const alpha = star.opacity * twinkleFactor;

        // Depth-based color: deeper stars are more blue, closer are whiter
        const blue = Math.floor(180 + star.z * 75);
        const green = Math.floor(180 + star.z * 55);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size * (0.5 + star.z * 0.5), 0, Math.PI * 2);

        // Glow effect for bigger stars
        if (star.size > 1.2) {
          const gradient = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3);
          gradient.addColorStop(0, `rgba(${green}, ${green}, ${blue}, ${alpha})`);
          gradient.addColorStop(1, `rgba(${green}, ${green}, ${blue}, 0)`);
          ctx.fillStyle = gradient;
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
        } else {
          ctx.fillStyle = `rgba(${green}, ${green}, ${blue}, ${alpha})`;
        }

        ctx.fill();

        // Some stars are square dots (like in screenshot)
        if (star.size > 1.5 && Math.random() < 0.002) {
          ctx.fillStyle = `rgba(100, 150, 255, ${alpha * 0.5})`;
          ctx.fillRect(star.x - 1, star.y - 1, 2, 2);
        }
      });

      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();

    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.9 }}
    />
  );
}

export default function Footer() {
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919997730768';

  return (
    <footer className="relative border-t border-white/10 mt-auto overflow-hidden" style={{ background: 'linear-gradient(180deg, #07090f 0%, #0a0d1a 50%, #060810 100%)' }}>
      {/* 3D Starfield Background */}
      <StarfieldCanvas />

      {/* Subtle gradient overlays for depth */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-600/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-blue-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
                info.nexawebsolution@gmail.com
              </a>
              <a
                href="https://wa.me/919997730768"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-gray-400 hover:text-green-400 transition-colors"
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
                  className="w-9 h-9 rounded-lg border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-blue-500/50 hover:bg-blue-500/10 transition-all"
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
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium hover:bg-green-500/20 transition-all"
              >
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2026 NexaWeb Solutions. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">
              Made with care in India 🇮🇳
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
