import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Package, CheckCircle, Zap } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';

const siteUrl = 'https://digiagentix.com';

export const metadata: Metadata = {
  title: 'AI SaaS Products — GST Reconciliation, AI Calling, Interior AI Designer | DigiAgentix',
  description: 'Ready-to-use AI software products for Indian & global businesses. GST AI Reconciliation, AI Calling Agent, Interior AI Designer, EduAccess AI. Start free today.',
  keywords: [
    'AI SaaS products India', 'GST reconciliation AI', 'AI calling agent India',
    'interior AI designer India', 'AI interior design tool', 'room redesign AI',
    'EduAccess AI', 'AI software India', 'business automation tools India',
    'AI agent SaaS', 'eCommerce AI agent',
  ],
  alternates: { canonical: `${siteUrl}/products` },
  openGraph: {
    title: 'AI SaaS Products — DigiAgentix',
    description: 'GST AI Reconciliation, AI Calling Agent, Cold Email AI & more. Ready-to-use AI products for Indian businesses.',
    url: `${siteUrl}/products`,
    siteName: 'DigiAgentix',
    images: [{ url: `${siteUrl}/logo.png`, width: 1200, height: 630, alt: 'DigiAgentix AI Products' }],
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
    id: 'brokernote-ai',
    href: '/brokernote-ai',
    external: false,
    badge: 'Free',
    badgeColor: 'green',
    icon: '📋',
    name: 'BrokerNote AI',
    tagline: 'Stock Contract Note Extractor for CA Firms',
    description: 'Upload Angel One, Zerodha, Upstox contract note PDFs — AI extracts all trade data instantly. Download clean Excel + Tally Prime XML import file.',
    features: [
      'Supports all major brokers (Angel One, Zerodha, Upstox…)',
      'Extracts ISIN, WAP, STT, GST, stamp duty, net obligation',
      '3-sheet Excel: Trade Summary + Tally Journal + Order Details',
      'Tally Prime XML — ready to import journal entries',
      'Secure login/signup — data discarded after extraction',
      '100% free — no subscription, no hidden cost',
    ],
    cta: 'Try Free →',
    category: 'Finance & CA Tools',
    price: 'Free',
  },
  {
    id: 'content-agent',
    href: '/content-agent',
    external: true,
    badge: 'New',
    badgeColor: 'blue',
    icon: '✍️',
    name: 'DigiAgentix Content Agent',
    tagline: 'AI Content Writing SaaS for Businesses',
    description: 'Generate SEO blogs, product descriptions, social media posts & ad copy in Hindi & English — with templates, brand voice training, and bulk generation.',
    features: [
      'Blog, social, product & ad copy generation',
      'Hindi + English with SEO optimization',
      'Pre-built templates (Instagram, LinkedIn, Amazon)',
      'Brand voice training from your samples',
      'Bulk CSV keyword → content generation',
      'Export as PDF, DOCX or copy to clipboard',
      'Content history — edit, reuse, delete',
      'Admin panel with usage & plan control',
    ],
    cta: 'Get Demo →',
    category: 'Content & Marketing',
    price: '₹10,000 – ₹30,000/mo',
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
    id: 'ai-calling-agent',
    href: '/ai-calling-agent',
    external: true,
    badge: 'New',
    badgeColor: 'green',
    icon: '📞',
    name: 'AI Calling Agent',
    tagline: 'Replace 500 Sales Agents with 1 AI',
    description: 'Human-like AI calls your leads 24/7 in Hindi & English — 10,000 concurrent calls, real-time CRM updates, WhatsApp follow-up. At just ₹33/call.',
    features: [
      'Human-like voice — ElevenLabs Hindi & English',
      '10,000 concurrent calls simultaneously',
      'Real-time CRM updates after every call',
      'Smart objection handling & follow-ups',
      'WhatsApp follow-up automation',
      'Live campaign dashboard & analytics',
      'CSV lead upload + CRM integration',
      'TRAI compliant — DLT registered',
    ],
    cta: 'Book Demo →',
    category: 'Sales & Outreach',
    price: '₹49,999 – ₹1,49,999/mo',
  },
  {
    id: 'interior-ai-designer',
    href: '/interior-ai',
    external: false,
    badge: 'New',
    badgeColor: 'blue',
    icon: '🏠',
    name: 'Interior AI Designer',
    tagline: 'AI-Powered 4K Interior Redesign from Your Room Photo',
    description: 'Upload a photo of any room and get a photorealistic 4K interior redesign in seconds. Modern Indian luxury, contemporary, minimalist and more — preserves exact room dimensions, doors and windows.',
    features: [
      'Upload any room photo — JPG, PNG, WEBP',
      '4K photorealistic V-Ray quality render',
      '5 design styles — Modern Indian Luxury, Contemporary, Minimalist, Royal Indian, Scandinavian',
      'Preserves exact room structure, doors & windows',
      'Before / after comparison view',
      'Instant download of generated design',
      'Adjustable design intensity slider',
      'Quick-add tags — False Ceiling, TV Panel, Chandelier & more',
    ],
    cta: 'Try Now →',
    category: 'Design & Real Estate',
    price: '~₹4 / render',
  },
  {
    id: 'ca-compliance-calendar',
    href: '/ca-compliance-calendar',
    external: false,
    badge: 'Free',
    badgeColor: 'green',
    icon: '📅',
    name: 'CA Compliance Calendar',
    tagline: 'Auto WhatsApp Reminders for Filing Deadlines',
    description: 'Never miss a GST, ITR, TDS or ROC deadline. Add clients to Google Sheets — the bot auto-sends WhatsApp reminders 7 days and 1 day before every due date.',
    features: [
      'WhatsApp alerts 7 days & 1 day before due date',
      'Google Sheets as client database — no coding needed',
      'Supports GST / ITR / TDS / ROC filings',
      'Auto-logs every sent message to a separate Log tab',
      'Runs daily at 9 AM — deploy free on Render / Railway',
      '100% open source — self-hosted, your data stays yours',
    ],
    cta: 'Get Free Tool →',
    category: 'Finance & CA Tools',
    price: 'Free & Open Source',
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

const productsListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'DigiAgentix AI SaaS Products',
  url: `${siteUrl}/products`,
  numberOfItems: 8,
  itemListElement: [
    { '@type': 'ListItem', position: 1, item: { '@type': 'SoftwareApplication', name: 'GST AI Reconciliation', applicationCategory: 'FinanceApplication', offers: { '@type': 'Offer', price: '399', priceCurrency: 'INR', availability: 'https://schema.org/InStock' }, url: `${siteUrl}/gst-reconcile` } },
    { '@type': 'ListItem', position: 2, item: { '@type': 'SoftwareApplication', name: 'BrokerNote AI', applicationCategory: 'FinanceApplication', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR', availability: 'https://schema.org/InStock' }, url: `${siteUrl}/brokernote-ai` } },
    { '@type': 'ListItem', position: 3, item: { '@type': 'SoftwareApplication', name: 'AI Calling Agent', applicationCategory: 'BusinessApplication', offers: { '@type': 'Offer', price: '49999', priceCurrency: 'INR' }, url: `${siteUrl}/ai-calling-agent` } },
    { '@type': 'ListItem', position: 4, item: { '@type': 'SoftwareApplication', name: 'Cold Email AI Agent', applicationCategory: 'BusinessApplication', offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR', availability: 'https://schema.org/InStock' }, url: `${siteUrl}/cold-email-agent` } },
    { '@type': 'ListItem', position: 5, item: { '@type': 'SoftwareApplication', name: 'EduAccess AI', applicationCategory: 'EducationalApplication', offers: { '@type': 'Offer', price: '399', priceCurrency: 'INR', availability: 'https://schema.org/InStock' }, url: `${siteUrl}/eduaccess-ai` } },
    { '@type': 'ListItem', position: 6, item: { '@type': 'SoftwareApplication', name: 'eCommerce Shopping Agent', applicationCategory: 'ShoppingApplication', offers: { '@type': 'Offer', price: '25000', priceCurrency: 'INR' }, url: `${siteUrl}/ecommerce-agent` } },
    { '@type': 'ListItem', position: 7, item: { '@type': 'SoftwareApplication', name: 'Interior AI Designer', applicationCategory: 'DesignApplication', offers: { '@type': 'Offer', price: '4', priceCurrency: 'INR', availability: 'https://schema.org/InStock' }, url: `${siteUrl}/interior-ai` } },
  ],
};

export default function ProductsPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={productsListSchema} />
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
