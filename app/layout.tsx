import type { Metadata } from 'next';
import './globals.css';
import ConditionalShell from '@/components/layout/ConditionalShell';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://DigiAgentixsolutions.vercel.app';

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
    'Next.js website India',
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
    creator: '@DigiAgentixsolutions',
    site: '@DigiAgentixsolutions',
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
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
