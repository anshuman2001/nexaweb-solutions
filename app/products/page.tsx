import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Package, CheckCircle, Zap } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://digiagentix.vercel.app';

export const metadata: Metadata = {
  title: 'Products — DigiAgentix',
  description: 'Explore DigiAgentix software products built for Indian businesses — GST tools, AI dashboards, automation software and more.',
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
    id: 'gst-reconcile',
    href: '/gst-reconcile',
    badge: 'Live',
    badgeColor: 'green',
    icon: '🧾',
    name: 'GST Reconcile',
    tagline: 'Smart GST Reconciliation Tool',
    description: 'Automatically reconcile your GSTR-2A/2B with purchase registers. Save hours of manual work, catch mismatches instantly, and stay GST compliant — all in one click.',
    features: [
      'GSTR-2A & 2B reconciliation',
      'Purchase register matching',
      'Mismatch detection & reports',
      'Export to Excel / PDF',
      'Supports all GST filing formats',
      'Instant results — no manual work',
    ],
    cta: 'Try GST Reconcile',
    category: 'Finance & Compliance',
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
            {products.map((product) => (
              <div
                key={product.id}
                className="relative rounded-2xl border border-white/10 bg-[#0c0f1a]/80 p-8 hover:border-blue-500/30 transition-all group overflow-hidden"
              >
                {/* Top glow */}
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.5), transparent)' }} />

                {/* Badge */}
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
                <ul className="space-y-2 mb-8">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link
                  href={product.href}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition-all btn-glow btn-shimmer group-hover:shadow-blue-500/30"
                  style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}
                >
                  <Zap className="w-4 h-4" />
                  {product.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}

            {/* Coming Soon card */}
            <div className="relative rounded-2xl border border-dashed border-white/10 p-8 flex flex-col items-center justify-center text-center min-h-[400px]">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-2xl mb-4">
                🚀
              </div>
              <h3 className="text-lg font-bold text-white mb-2">More Products Coming</h3>
              <p className="text-gray-500 text-sm max-w-xs">
                We&apos;re building more tools for Indian businesses. Stay tuned or tell us what you need.
              </p>
              <Link href="/contact" className="mt-6 inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors">
                Suggest a product <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
