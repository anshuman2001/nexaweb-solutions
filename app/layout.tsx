import type { Metadata } from 'next';
import './globals.css';
import ConditionalShell from '@/components/layout/ConditionalShell';

const siteUrl = 'https://digiagentix.com';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'DigiAgentix — Enterprise Technology Solutions',
    template: '%s | DigiAgentix',
  },
  description:
    'DigiAgentix delivers AI solutions, intelligent automation, software development, cloud infrastructure, and digital transformation services for SMEs and enterprises. Based in Noida, India.',
  keywords: [
    'enterprise technology solutions India',
    'AI solutions India',
    'intelligent automation India',
    'digital transformation India',
    'software development India',
    'cloud solutions India',
    'enterprise consulting India',
    'AI automation India',
    'business automation India',
    'technology partner India',
    'enterprise software development',
    'AI integration services',
    'DigiAgentix',
    'technology company Noida',
    'enterprise solutions Noida',
    'AI consulting India',
    'software company India',
    'digital solutions India',
    'automation services India',
    'cloud infrastructure India',
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
    title: 'DigiAgentix — Enterprise Technology Solutions',
    description:
      'AI solutions, intelligent automation, software development, and digital transformation services for SMEs and enterprises. Intelligence. Built for Business.',
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
