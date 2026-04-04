import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Package } from 'lucide-react';
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

const products: never[] = [];

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

          {/* Coming Soon */}
          <div className="flex justify-center">
            <div className="relative rounded-2xl border border-dashed border-white/10 p-16 flex flex-col items-center justify-center text-center max-w-lg w-full">
              <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-3xl mb-5">
                🚀
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Products Coming Soon</h3>
              <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
                We&apos;re building powerful tools for Indian businesses. Stay tuned or tell us what you need.
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
