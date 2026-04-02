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

    type Star = {
      angle: number;   // angle from center (radians)
      dist: number;    // current distance from center
      speed: number;   // pixels per frame
      size: number;    // current dot size
      opacity: number;
      maxDist: number; // when to reset
      hue: number;     // color hue (blue-purple range)
    };

    let stars: Star[] = [];
    let cx = 0, cy = 0;

    const resetStar = (s: Star) => {
      s.angle = Math.random() * Math.PI * 2;
      s.dist = Math.random() * 30 + 5;    // start near center
      s.speed = 0.3 + Math.random() * 0.7;
      s.size = 0;
      s.opacity = 0;
      s.hue = 200 + Math.random() * 60;   // 200–260: blue to purple
    };

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      cx = canvas.width / 2;
      cy = canvas.height / 2;
      stars = [];
      const count = Math.floor((canvas.width * canvas.height) / 2200);
      for (let i = 0; i < count; i++) {
        const s: Star = { angle: 0, dist: 0, speed: 0, size: 0, opacity: 0, maxDist: 0, hue: 0 };
        resetStar(s);
        // Spread initial distances so it doesn't start empty
        s.dist = Math.random() * Math.hypot(cx, cy) * 0.9;
        s.maxDist = Math.hypot(cx, cy) * (0.9 + Math.random() * 0.2);
        stars.push(s);
      }
    };

    const draw = () => {
      // Fade trail instead of clear — gives warp-speed streaks
      ctx.fillStyle = 'rgba(7,9,15,0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (const star of stars) {
        star.dist += star.speed * (star.dist / 60 + 0.4);

        // Size and opacity grow as star moves outward
        const progress = star.dist / star.maxDist;
        star.size = progress * 1.4;
        star.opacity = Math.min(progress * 1.5, 0.85);

        const x = cx + Math.cos(star.angle) * star.dist;
        const y = cy + Math.sin(star.angle) * star.dist;

        // Reset if out of bounds
        if (x < -5 || x > canvas.width + 5 || y < -5 || y > canvas.height + 5) {
          resetStar(star);
          star.maxDist = Math.hypot(cx, cy) * (0.9 + Math.random() * 0.2);
          continue;
        }

        // Draw dot with subtle glow
        if (star.size > 0.5) {
          const grd = ctx.createRadialGradient(x, y, 0, x, y, star.size * 2.5);
          grd.addColorStop(0, `hsla(${star.hue},80%,75%,${star.opacity * 0.5})`);
          grd.addColorStop(1, `hsla(${star.hue},80%,75%,0)`);
          ctx.beginPath();
          ctx.arc(x, y, star.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = grd;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(x, y, Math.max(star.size, 0.2), 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${star.hue},85%,80%,${star.opacity})`;
        ctx.fill();
      }

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
