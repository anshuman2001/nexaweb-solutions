import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Package, CheckCircle, Zap } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://digiagentix.vercel.app';

export const metadata: Metadata = {
  title: 'Products — DigiAgentix',
  description: 'Explore DigiAgentix software products — GST AI Reconciliation for CA firms and EduAccess AI for WCAG-compliant educational content.',
  alternates: { canonical: `${siteUrl}/products` },
  openGraph: {
    title: 'Products — DigiAgentix',
    description: 'Ready-to-use software products for Indian businesses.',
    url: `${siteUrl}/products`,
    siteName: 'DigiAgentix',
  },
};

const products = [
  {
    id: 'gst-reconciliation',
    href: '/gst-ai-agent',
    external: true,
    badge: 'Live',
    badgeColor: 'green',
    icon: '🧾',
    name: 'GST AI Reconciliation',
    tagline: 'AI-Powered GST Reconciliation SaaS',
    description: 'Upload invoices, auto-match GSTR-2B, detect fraud & generate PDF reports instantly. Built for CA firms, accountants and businesses.',
    features: [
      'Auto fuzzy invoice matching',
      'AI fraud & anomaly detection',
      'Any Excel column format supported',
      'PDF audit report generation',
      'Multi-firm / multi-user support',
      'Claude AI explanations per mismatch',
    ],
    cta: 'Try Free →',
    category: 'Finance & Compliance',
    price: '10 Free → ₹399/mo',
  },
  {
    id: 'ecommerce-agent',
    href: '/ecommerce-agent',
    external: true,
    badge: 'New',
    badgeColor: 'blue',
    icon: '🛒',
    name: 'eCommerce Shopping Agent',
    tagline: 'AI Sales Agent for Online Stores',
    description: 'Full-stack AI shopping agent that boosts sales, recovers abandoned carts, handles support in Hindi & English, and cuts costs with smart hybrid AI.',
    features: [
      'Conversational AI in Hindi + English',
      'Smart product recommendations engine',
      'WhatsApp + Email cart abandonment recovery',
      'Real-time order tracking integration',
      'Upselling, cross-selling & bundling AI',
      'Returns & exchange automation',
      'Image search — upload & find products',
      'Admin dashboard with full analytics',
    ],
    cta: 'Get Demo →',
    category: 'eCommerce & Retail',
    price: '₹25,000 – ₹1,00,000',
  },
  {
    id: 'eduaccess-ai',
    href: '/eduaccess-ai',
    external: true,
    badge: 'Live',
    badgeColor: 'green',
    icon: '♿',
    name: 'EduAccess AI',
    tagline: 'Accessible Content & Alt Text Generator',
    description: 'AI-powered platform for US schools & edtech — generate WCAG 2.1 compliant alt text for images and ADA-compliant educational content in seconds.',
    features: [
      'WCAG 2.1 & ADA compliant alt text',
      'Short alt text strictly under 200 characters',
      'No color-only descriptions (WCAG 1.4.1 compliant)',
      'Supports diagrams, charts, infographics',
      'Long description — no limit, adapts to image complexity',
      'Blog, course & lesson content writing',
      'K-12 & higher education tone',
      'Bias-free, inclusive language engine',
      'Multiple variations per generation',
      'Accessibility score per output',
    ],
    cta: 'Try API →',
    category: 'Education & Accessibility',
    price: '5+5 Free → ₹399/mo',
  },
];

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Products', item: `${siteUrl}/products` },
  ],
};

export default function ProductsPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <div className="min-h-screen bg-background pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/8 text-blue-300 text-sm font-medium mb-6">
              <Package className="w-4 h-4" />
              Our Products
            </div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4">
              Built for{' '}
              <span className="gradient-text">Indian Businesses</span>
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Ready-to-use software tools that solve real problems — no setup headaches, no technical knowledge required.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {products.map((product) => (
              <div
                key={product.id}
                className="relative rounded-2xl border border-white/10 bg-[#0c0f1a]/80 p-8 hover:border-blue-500/30 transition-all group overflow-hidden"
              >
                {/* Top glow line */}
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.5), transparent)' }} />

                {/* Badge + Category */}
                <div className="flex items-center justify-between mb-6">
                  <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                    product.badgeColor === 'green'
                      ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-400'
                      : 'bg-blue-500/15 border border-blue-500/30 text-blue-400'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                      product.badgeColor === 'green' ? 'bg-emerald-400' : 'bg-blue-400'
                    }`} />
                    {product.badge}
                  </span>
                  <span className="text-xs text-gray-500 border border-white/10 px-2 py-1 rounded-full">
                    {product.category}
                  </span>
                </div>

                {/* Icon + Name */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg, rgba(37,99,235,0.2), rgba(124,58,237,0.15))', border: '1px solid rgba(99,102,241,0.2)' }}>
                    {product.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">{product.name}</h2>
                    <p className="text-blue-400 text-sm font-medium">{product.tagline}</p>
                  </div>
                </div>

                <p className="text-gray-400 text-sm leading-relaxed mb-6">{product.description}</p>

                {/* Features */}
                <ul className="space-y-2 mb-6">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Price + CTA */}
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold text-lg">{product.price}</span>
                  <Link
                    href={product.href}
                    target={product.external ? '_blank' : '_self'}
                    rel={product.external ? 'noopener noreferrer' : undefined}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-white font-semibold text-sm transition-all btn-glow btn-shimmer"
                    style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}
                  >
                    <Zap className="w-4 h-4" />
                    {product.cta}
                  </Link>
                </div>
              </div>
            ))}

            {/* Coming Soon card */}
            <div className="relative rounded-2xl border border-dashed border-white/10 p-8 flex flex-col items-center justify-center text-center min-h-[300px]">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-4">
                🚀
              </div>
              <h3 className="text-lg font-bold text-white mb-2">More Products In Pipeline</h3>
              <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                We&apos;re building AI-powered tools for businesses globally. Have an idea or need a custom tool?
              </p>
              <Link href="/contact" className="mt-5 inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Suggest a product <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
