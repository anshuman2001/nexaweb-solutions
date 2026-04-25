import type { Metadata } from 'next';
import './globals.css';
import ConditionalShell from '@/components/layout/ConditionalShell';

const siteUrl = 'https://digiagentix.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'DigiAgentix — AI Agents & Web Design for Indian Businesses',
    template: '%s | DigiAgentix',
  },
  description:
    'DigiAgentix builds AI agents & professional websites for Indian businesses. WhatsApp chatbots, customer support AI, sales agents from ₹15,000. Based in Noida, UP.',
  keywords: [
    'AI agents India',
    'AI chatbot India',
    'WhatsApp chatbot India',
    'WhatsApp business automation',
    'customer support AI India',
    'web design India',
    'website development Noida',
    'website development India',
    'business automation India',
    'AI agent for business',
    'chatbot development India',
    'sales AI agent',
    'lead generation AI',
    'eCommerce website India',
    'AI calling agent India',
    'cold email AI agent',
    'DigiAgentix',
    'AI agents Noida',
    'web design Noida',
    'Hindi chatbot',
    'multilingual AI chatbot',
  ],
  authors: [{ name: 'DigiAgentix', url: siteUrl }],
  creator: 'DigiAgentix',
  publisher: 'DigiAgentix',
  category: 'Technology',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'DigiAgentix',
    title: 'DigiAgentix — AI Agents & Web Design for Indian Businesses',
    description:
      'Build AI agents & professional websites for your business. WhatsApp chatbots, customer support AI, sales agents from ₹15,000. Noida, India.',
    images: [
      {
        url: `${siteUrl}/logo.png`,
        width: 1200,
        height: 630,
        alt: 'DigiAgentix — AI Agents & Web Design India',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DigiAgentix — AI Agents & Web Design India',
    description: 'Build AI agents & professional websites for your Indian business. Starting ₹15,000.',
    images: [`${siteUrl}/logo.png`],
    creator: '@DigiAgentix',
    site: '@DigiAgentix',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [{ url: '/logo.png', type: 'image/png' }],
    shortcut: '/logo.png',
    apple: '/logo.png',
  },
  alternates: {
    canonical: siteUrl,
    languages: { 'en-IN': siteUrl },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || '',
  },
};

/* ── JSON-LD Structured Data ─────────────────────────────────────────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'DigiAgentix',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
        width: 512,
        height: 512,
      },
      description: 'AI Agents & Web Design for Indian Businesses',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Noida',
        addressRegion: 'Uttar Pradesh',
        addressCountry: 'IN',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'customer support',
        email: 'info@digiagentix.com',
        availableLanguage: ['English', 'Hindi'],
      },
      sameAs: [
        'https://www.instagram.com/digiagentix',
        'https://www.linkedin.com/company/digiagentix',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'DigiAgentix',
      publisher: { '@id': `${siteUrl}/#organization` },
      potentialAction: {
        '@type': 'SearchAction',
        target: { '@type': 'EntryPoint', urlTemplate: `${siteUrl}/blog?q={search_term_string}` },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${siteUrl}/#localbusiness`,
      name: 'DigiAgentix',
      image: `${siteUrl}/logo.png`,
      url: siteUrl,
      telephone: '+91-XXXXXXXXXX',
      priceRange: '₹₹',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Noida',
        addressRegion: 'Uttar Pradesh',
        postalCode: '201301',
        addressCountry: 'IN',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 28.5355,
        longitude: 77.3910,
      },
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
        opens: '09:00',
        closes: '19:00',
      },
      hasMap: 'https://maps.google.com/?q=Noida,UP,India',
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Google Analytics */}
        {gaId && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`,
              }}
            />
          </>
        )}
      </head>
      <body className="bg-background text-white antialiased">
        <ConditionalShell>{children}</ConditionalShell>
      </body>
    </html>
  );
}
