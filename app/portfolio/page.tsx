import type { Metadata } from 'next';
import PortfolioPageClient from './PortfolioPageClient';
import JsonLd from '@/components/seo/JsonLd';

const siteUrl = 'https://digiagentix.com';

export const metadata: Metadata = {
  title: 'Portfolio — AI Agents & Websites Built for Indian Businesses',
  description: 'See real projects by DigiAgentix: WhatsApp bots, customer support AI, eCommerce stores, hospital portals, real estate websites and more. 50+ projects delivered across India.',
  keywords: [
    'AI agent portfolio India', 'web design portfolio India', 'chatbot examples India',
    'WhatsApp bot case study', 'DigiAgentix portfolio', 'website examples India',
    'AI projects India', 'eCommerce website examples India',
  ],
  alternates: {
    canonical: `${siteUrl}/portfolio`,
  },
  openGraph: {
    title: 'Portfolio — AI Agents & Websites by DigiAgentix India',
    description: '50+ projects: WhatsApp chatbots, customer support AI, eCommerce stores, business websites built for Indian clients.',
    url: `${siteUrl}/portfolio`,
    images: [{ url: `${siteUrl}/logo.png`, width: 1200, height: 630, alt: 'DigiAgentix Portfolio' }],
  },
};

const portfolioSchema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'DigiAgentix Portfolio',
  description: 'Collection of AI agents and websites built by DigiAgentix for Indian businesses.',
  url: `${siteUrl}/portfolio`,
  provider: { '@type': 'Organization', name: 'DigiAgentix', url: siteUrl },
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
