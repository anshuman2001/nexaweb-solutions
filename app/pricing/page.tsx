import type { Metadata } from 'next';
import PricingPageClient from './PricingPageClient';
import JsonLd from '@/components/seo/JsonLd';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexawebsolutions.vercel.app';

export const metadata: Metadata = {
  title: 'Pricing — AI Agents from ₹15,000 & Websites from ₹8,000 | India',
  description: 'Transparent pricing for AI agents and websites in India. Customer support AI from ₹20,000. WhatsApp agents from ₹20,000. Business websites from ₹15,000. No hidden fees.',
  keywords: [
    'AI agent pricing India', 'chatbot cost India', 'website cost India',
    'how much AI agent costs', 'WhatsApp chatbot price', 'affordable AI agent India',
    'website development cost India', 'eCommerce website price India',
    'AI agent monthly fee', 'website maintenance cost India',
  ],
  alternates: {
    canonical: `${siteUrl}/pricing`,
  },
  openGraph: {
    title: 'AI Agent & Website Pricing — NexaWeb Solutions India',
    description: 'Transparent pricing: AI agents from ₹15,000, websites from ₹8,000. No hidden fees. Monthly maintenance from ₹2,000.',
    url: `${siteUrl}/pricing`,
    images: [{ url: `${siteUrl}/logo.png`, width: 1200, height: 630, alt: 'NexaWeb Pricing Plans' }],
  },
};

const pricingSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'NexaWeb Solutions Pricing Plans',
  url: `${siteUrl}/pricing`,
  itemListElement: [
    {
      '@type': 'ListItem', position: 1,
      item: {
        '@type': 'Offer',
        name: 'Starter AI Agent',
        description: 'Basic customer support AI agent for small businesses',
        price: '15000',
        priceCurrency: 'INR',
        eligibleRegion: { '@type': 'Country', name: 'India' },
        offeredBy: { '@type': 'Organization', name: 'NexaWeb Solutions' },
      },
    },
    {
      '@type': 'ListItem', position: 2,
      item: {
        '@type': 'Offer',
        name: 'Professional AI Agent',
        description: 'Advanced AI agent with WhatsApp, CRM integration & analytics',
        price: '35000',
        priceCurrency: 'INR',
        eligibleRegion: { '@type': 'Country', name: 'India' },
        offeredBy: { '@type': 'Organization', name: 'NexaWeb Solutions' },
      },
    },
    {
      '@type': 'ListItem', position: 3,
      item: {
        '@type': 'Offer',
        name: 'Business Website',
        description: 'Professional Next.js website with SEO and mobile optimization',
        price: '15000',
        priceCurrency: 'INR',
        eligibleRegion: { '@type': 'Country', name: 'India' },
        offeredBy: { '@type': 'Organization', name: 'NexaWeb Solutions' },
      },
    },
    {
      '@type': 'ListItem', position: 4,
      item: {
        '@type': 'Offer',
        name: 'Website + AI Bundle',
        description: 'Professional website combined with a custom AI agent',
        price: '35000',
        priceCurrency: 'INR',
        eligibleRegion: { '@type': 'Country', name: 'India' },
        offeredBy: { '@type': 'Organization', name: 'NexaWeb Solutions' },
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Pricing', item: `${siteUrl}/pricing` },
  ],
};

export default function PricingPage() {
  return (
    <>
      <JsonLd schema={pricingSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <PricingPageClient />
    </>
  );
}
