import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';
import JsonLd from '@/components/seo/JsonLd';

const siteUrl = 'https://digiagentix.com';

export const metadata: Metadata = {
  title: 'Contact DigiAgentix — Get Free AI Agent Demo | Noida, India',
  description: 'Contact DigiAgentix for AI agents and web design. Based in Noida, UP. WhatsApp: +91 99977 30768. Email: info.nexawebsolution@gmail.com. We reply within 2 hours.',
  keywords: [
    'contact DigiAgentix', 'AI agent demo India', 'free chatbot demo',
    'web design consultation India', 'AI agent Noida', 'web design Noida',
    'hire AI developer India', 'WhatsApp chatbot demo', 'contact AI company India',
  ],
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    title: 'Contact DigiAgentix — Free AI Agent Demo',
    description: 'Get a free demo of our AI agents. Based in Noida, India. WhatsApp +91 99977 30768. Reply within 2 hours.',
    url: `${siteUrl}/contact`,
    images: [{ url: `${siteUrl}/logo.png`, width: 1200, height: 630, alt: 'Contact DigiAgentix' }],
  },
};

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Contact DigiAgentix',
  url: `${siteUrl}/contact`,
  description: 'Get in touch with DigiAgentix for AI agents and web design services in India.',
  mainEntity: {
    '@type': 'ProfessionalService',
    name: 'DigiAgentix',
    telephone: '+91-9997730768',
    email: 'info.nexawebsolution@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Noida',
      addressRegion: 'Uttar Pradesh',
      postalCode: '201301',
      addressCountry: 'IN',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        opens: '09:00',
        closes: '20:00',
      },
    ],
    availableLanguage: ['English', 'Hindi'],
    url: siteUrl,
    image: `${siteUrl}/logo.png`,
    priceRange: '₹₹',
    areaServed: { '@type': 'Country', name: 'India' },
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Contact', item: `${siteUrl}/contact` },
  ],
};

export default function ContactPage() {
  return (
    <>
      <JsonLd schema={contactPageSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <ContactPageClient />
    </>
  );
}
