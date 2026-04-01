import type { Metadata } from 'next';
import PortfolioPageClient from './PortfolioPageClient';
import JsonLd from '@/components/seo/JsonLd';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexawebsolutions.vercel.app';

export const metadata: Metadata = {
  title: 'Portfolio — AI Agents & Websites Built for Indian Businesses',
  description: 'See real projects by NexaWeb Solutions: WhatsApp bots, customer support AI, eCommerce stores, hospital portals, real estate websites and more. 50+ projects delivered across India.',
  keywords: [
    'AI agent portfolio India', 'web design portfolio India', 'chatbot examples India',
    'WhatsApp bot case study', 'NexaWeb portfolio', 'website examples India',
    'AI projects India', 'eCommerce website examples India',
  ],
  alternates: {
    canonical: `${siteUrl}/portfolio`,
  },
  openGraph: {
    title: 'Portfolio — AI Agents & Websites by NexaWeb Solutions India',
    description: '50+ projects: WhatsApp chatbots, customer support AI, eCommerce stores, business websites built for Indian clients.',
    url: `${siteUrl}/portfolio`,
    images: [{ url: `${siteUrl}/logo.png`, width: 1200, height: 630, alt: 'NexaWeb Solutions Portfolio' }],
  },
};

const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'NexaWeb Solutions Portfolio',
  description: 'Collection of AI agents and websites built by NexaWeb Solutions for Indian businesses.',
  url: `${siteUrl}/portfolio`,
  provider: { '@type': 'Organization', name: 'NexaWeb Solutions', url: siteUrl },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Portfolio', item: `${siteUrl}/portfolio` },
  ],
};

export default function PortfolioPage() {
  return (
    <>
      <JsonLd schema={portfolioSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <PortfolioPageClient />
    </>
  );
}
