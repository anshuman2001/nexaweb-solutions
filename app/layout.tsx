import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import WhatsAppFloat from '@/components/layout/WhatsAppFloat';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexawebsolutions.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'NexaWeb Solutions — AI Agents & Web Design India',
    template: '%s | NexaWeb Solutions',
  },
  description:
    'Build AI agents and professional websites for your business. Customer support, WhatsApp, sales agents starting ₹15,000. Based in India.',
  keywords: [
    'AI agents India',
    'WhatsApp chatbot',
    'customer support AI',
    'web design India',
    'business automation',
    'AI chatbot',
    'website development India',
  ],
  authors: [{ name: 'NexaWeb Solutions' }],
  creator: 'NexaWeb Solutions',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: siteUrl,
    siteName: 'NexaWeb Solutions',
    title: 'NexaWeb Solutions — AI Agents & Web Design India',
    description:
      'Build AI agents and professional websites for your business. Starting ₹15,000.',
    images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: 'NexaWeb Solutions' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexaWeb Solutions — AI Agents & Web Design India',
    description: 'Build AI agents and professional websites for your business.',
    images: [`${siteUrl}/og-image.png`],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
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
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
