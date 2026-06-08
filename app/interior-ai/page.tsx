import { Metadata } from 'next';
import Link from 'next/link';
import { Check, ArrowRight, Upload, Zap, Download, Image } from 'lucide-react';
import JsonLd from '@/components/seo/JsonLd';

const siteUrl = 'https://digiagentix.com';

export const metadata: Metadata = {
  title: 'Interior AI Designer — 4K Room Redesign from Your Photo | DigiAgentix',
  description: 'Upload any room photo and get a photorealistic 4K interior redesign in seconds. Modern Indian luxury, contemporary, minimalist styles. Powered by Replicate AI.',
  keywords: [
    'AI interior designer India', 'room redesign AI', '4K interior render AI',
    'interior design tool online', 'room photo to design AI', 'home interior AI India',
    'living room redesign AI', 'AI architecture visualization', 'interior design software India',
  ],
  alternates: { canonical: `${siteUrl}/interior-ai` },
  openGraph: {
    title: 'Interior AI Designer — 4K Room Redesign from Your Photo',
    description: 'Upload your room photo. Describe your style. Get a 4K photorealistic redesign in seconds.',
    url: `${siteUrl}/interior-ai`,
    siteName: 'DigiAgentix',
    images: [{ url: `${siteUrl}/logo.png`, width: 1200, height: 630, alt: 'Interior AI Designer' }],
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Interior AI Designer',
  applicationCategory: 'DesignApplication',
  description: 'AI-powered photorealistic 4K interior redesign tool. Upload a room photo and generate a redesign in seconds.',
  offers: { '@type': 'Offer', price: '4', priceCurrency: 'INR', availability: 'https://schema.org/InStock' },
  url: `${siteUrl}/interior-ai`,
  creator: { '@type': 'Organization', name: 'DigiAgentix', url: siteUrl },
};

const steps = [
  { icon: <Upload className="w-6 h-6" />, title: 'Upload Room Photo', desc: 'Drop any JPG, PNG or WEBP photo of your room — up to 20MB.' },
  { icon: <Image className="w-6 h-6" />, title: 'Choose Style & Describe', desc: 'Pick a design style and describe your vision using quick tags or your own prompt.' },
  { icon: <Zap className="w-6 h-6" />, title: 'AI Generates Design', desc: 'Our AI analyzes your room structure and renders a photorealistic 4K redesign in 30–90 seconds.' },
  { icon: <Download className="w-6 h-6" />, title: 'Compare & Download', desc: 'View before/after side by side and download your 4K design instantly.' },
];

const features = [
  'Upload any room photo — JPG, PNG, WEBP up to 20MB',
  '4K photorealistic V-Ray quality render',
  '5 design styles — Modern Indian Luxury, Contemporary, Minimalist, Royal Indian, Scandinavian',
  'Preserves exact room structure, doors, windows & dimensions',
  'Before / after comparison view',
  'Instant download of generated design',
  'Adjustable design intensity — subtle refresh to full redesign',
  'Quick-add tags: False Ceiling, TV Panel, Chandelier, Sofa, Plants & more',
  'Warm LED strip lighting, gypsum false ceiling, marble dining table',
  'Works for living rooms, bedrooms, kitchens, offices',
];

const styles = [
  { emoji: '🪑', name: 'Modern Indian Luxury', desc: 'Walnut wood panels, marble, warm beige, LED strips' },
  { emoji: '🏙', name: 'Contemporary', desc: 'Clean lines, neutral palette, premium materials' },
  { emoji: '🪵', name: 'Minimalist', desc: 'Warm whites, natural wood, hidden lighting' },
  { emoji: '👑', name: 'Royal Indian', desc: 'Rich tones, brass accents, crystal chandelier' },
  { emoji: '❄️', name: 'Scandinavian', desc: 'Warm whites, natural wood, cozy minimal design' },
];

const faqs = [
  { q: 'How long does one render take?', a: 'Typically 30–90 seconds depending on AI queue and image complexity.' },
  { q: 'Does it move doors or windows?', a: 'No. The AI preserves your exact room structure — doors, windows, columns and ceiling height stay exactly where they are.' },
  { q: 'What image size should I upload?', a: 'Any resolution works, up to 20MB. Higher resolution input gives better output quality.' },
  { q: 'Can I run this on my own server?', a: 'Yes — the tool is a Node.js + Express app. You only need a Replicate API key (~₹4 per render). Contact us for deployment support.' },
  { q: 'Can I use it for commercial projects?', a: 'Yes — architects, interior designers, and real estate agents can use it for client presentations.' },
];

export default function InteriorAIPage() {
  const whatsapp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919999999999';

  return (
    <>
      <JsonLd schema={schema} />
      <div className="min-h-screen bg-background pt-24 pb-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Hero */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/8 text-blue-300 text-sm font-medium mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              New Product
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white mb-5 leading-tight">
              Interior AI{' '}
              <span className="gradient-text">Designer</span>
            </h1>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-8">
              Upload your room photo · Describe your dream design · Get a <strong className="text-white">4K photorealistic render</strong> in under 90 seconds
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`https://wa.me/${whatsapp}?text=Hi! I want to try the Interior AI Designer tool.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-base transition-all btn-glow btn-shimmer"
                style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}
              >
                <Zap className="w-5 h-5" />
                Get Access on WhatsApp
              </a>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-white/15 text-white font-semibold text-base hover:border-blue-500/40 transition-all"
              >
                View All Products
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="text-gray-500 text-sm mt-4">~₹4 per render · Powered by Replicate AI · No subscription needed</p>
          </div>

          {/* How It Works */}
          <div className="mb-20">
            <h2 className="text-3xl font-extrabold text-white text-center mb-12">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {steps.map((step, i) => (
                <div key={i} className="relative rounded-2xl border border-white/10 bg-[#0c0f1a]/80 p-6">
                  <div className="absolute top-0 left-0 right-0 h-px"
                    style={{ background: 'linear-gradient(90deg, transparent, rgba(37,99,235,0.4), transparent)' }} />
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center text-blue-400 mb-4"
                    style={{ background: 'rgba(37,99,235,0.1)', border: '1px solid rgba(37,99,235,0.2)' }}>
                    {step.icon}
                  </div>
                  <div className="text-xs text-blue-400 font-semibold mb-2">Step {i + 1}</div>
                  <h3 className="text-white font-bold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Features + Styles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">

            {/* Features */}
            <div className="rounded-2xl border border-white/10 bg-[#0c0f1a]/80 p-8">
              <h2 className="text-2xl font-extrabold text-white mb-6">Everything Included</h2>
              <ul className="space-y-3">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-gray-300">
                    <Check className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            {/* Styles */}
            <div className="rounded-2xl border border-white/10 bg-[#0c0f1a]/80 p-8">
              <h2 className="text-2xl font-extrabold text-white mb-6">5 Design Styles</h2>
              <div className="space-y-4">
                {styles.map((s) => (
                  <div key={s.name} className="flex items-start gap-4 p-4 rounded-xl bg-white/3 border border-white/8">
                    <span className="text-2xl">{s.emoji}</span>
                    <div>
                      <div className="text-white font-semibold text-sm mb-0.5">{s.name}</div>
                      <div className="text-gray-400 text-xs">{s.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-20">
            <h2 className="text-3xl font-extrabold text-white text-center mb-12">Frequently Asked Questions</h2>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-2xl border border-white/10 bg-[#0c0f1a]/80 p-6">
                  <h3 className="text-white font-bold mb-2">{faq.q}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="relative rounded-2xl border border-blue-500/20 bg-[#0c0f1a]/80 p-10 text-center overflow-hidden">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute -top-20 left-1/4 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-indigo-600/10 rounded-full blur-3xl" />
            </div>
            <div className="relative">
              <div className="text-4xl mb-4">🏠</div>
              <h2 className="text-3xl font-extrabold text-white mb-3">Ready to Redesign Your Space?</h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Get access to the Interior AI Designer tool. Contact us on WhatsApp — we&apos;ll set it up for you with your own Replicate API key.
              </p>
              <a
                href={`https://wa.me/${whatsapp}?text=Hi! I want to try the Interior AI Designer. Please share access details.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-10 py-4 rounded-xl text-white font-bold text-base transition-all btn-glow"
                style={{ background: 'linear-gradient(135deg, #2563eb, #4f46e5)' }}
              >
                <Zap className="w-5 h-5" />
                Get Started on WhatsApp
              </a>
              <p className="text-gray-500 text-sm mt-4">~₹4 per render · No subscription · Self-hosted or hosted by us</p>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
