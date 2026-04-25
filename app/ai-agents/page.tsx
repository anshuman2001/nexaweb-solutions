import type { Metadata } from 'next';
import AIAgentsPageClient from './AIAgentsPageClient';
import JsonLd from '@/components/seo/JsonLd';

const siteUrl = 'https://digiagentix.com';

export const metadata: Metadata = {
  title: 'AI Agents India — WhatsApp Chatbot, Customer Support, Sales Automation',
  description: 'Build AI agents for your Indian business: WhatsApp chatbots, 24/7 customer support, sales lead agents, meeting AI & more. Hindi + English. Starting ₹15,000. Noida, India.',
  keywords: [
    'AI agents India', 'WhatsApp chatbot India', 'customer support AI agent',
    'sales AI agent India', 'AI chatbot for business', 'WhatsApp automation India',
    'Hindi AI chatbot', 'lead generation AI India', 'meeting AI agent',
    'eCommerce AI agent', 'chatbot development Noida', 'AI agent pricing India',
  ],
  alternates: {
    canonical: `${siteUrl}/ai-agents`,
  },
  openGraph: {
    title: 'AI Agents for Indian Businesses — DigiAgentix',
    description: 'WhatsApp chatbots, customer support AI, sales agents starting ₹15,000. Hindi + English. Deployed in 2–7 days.',
    url: `${siteUrl}/ai-agents`,
    images: [{ url: `${siteUrl}/logo.png`, width: 1200, height: 630, alt: 'DigiAgentix AI Agents' }],
  },
};

const agentsListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'AI Agents by DigiAgentix',
  description: 'Complete list of AI agents available for Indian businesses',
  url: `${siteUrl}/ai-agents`,
  numberOfItems: 8,
  itemListElement: [
    { '@type': 'ListItem', position: 1, item: { '@type': 'Service', name: 'Customer Support Agent', description: 'Handle customer queries 24/7 with intelligent automation. Hindi + English.', offers: { '@type': 'Offer', priceSpecification: { '@type': 'PriceSpecification', minPrice: '20000', maxPrice: '50000', priceCurrency: 'INR' } } } },
    { '@type': 'ListItem', position: 2, item: { '@type': 'Service', name: 'WhatsApp Business Agent', description: 'Convert WhatsApp into your 24/7 sales & support channel.', offers: { '@type': 'Offer', priceSpecification: { '@type': 'PriceSpecification', minPrice: '20000', maxPrice: '60000', priceCurrency: 'INR' } } } },
    { '@type': 'ListItem', position: 3, item: { '@type': 'Service', name: 'Sales & Lead Agent', description: 'Qualify leads and book appointments automatically.', offers: { '@type': 'Offer', priceSpecification: { '@type': 'PriceSpecification', minPrice: '30000', maxPrice: '80000', priceCurrency: 'INR' } } } },
    { '@type': 'ListItem', position: 4, item: { '@type': 'Service', name: 'Meeting AI Agent', description: 'Auto-transcribe and summarize your meetings.', offers: { '@type': 'Offer', priceSpecification: { '@type': 'PriceSpecification', minPrice: '30000', maxPrice: '150000', priceCurrency: 'INR' } } } },
    { '@type': 'ListItem', position: 5, item: { '@type': 'Service', name: 'eCommerce Shopping Agent', description: 'AI-powered shopping assistant for online stores.', offers: { '@type': 'Offer', priceSpecification: { '@type': 'PriceSpecification', minPrice: '25000', maxPrice: '70000', priceCurrency: 'INR' } } } },
    { '@type': 'ListItem', position: 6, item: { '@type': 'Service', name: 'Email Marketing Agent', description: 'Automate your email campaigns with AI.', offers: { '@type': 'Offer', priceSpecification: { '@type': 'PriceSpecification', minPrice: '15000', maxPrice: '40000', priceCurrency: 'INR' } } } },
    { '@type': 'ListItem', position: 7, item: { '@type': 'Service', name: 'Content Writing Agent', description: 'Generate blogs, social posts and marketing copy with AI.', offers: { '@type': 'Offer', priceSpecification: { '@type': 'PriceSpecification', minPrice: '15000', maxPrice: '35000', priceCurrency: 'INR' } } } },
    { '@type': 'ListItem', position: 8, item: { '@type': 'Service', name: 'Industry Specific Agent', description: 'Custom AI agents for healthcare, real estate, education, retail and more.', offers: { '@type': 'Offer', priceSpecification: { '@type': 'PriceSpecification', minPrice: '30000', maxPrice: '150000', priceCurrency: 'INR' } } } },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'AI Agents', item: `${siteUrl}/ai-agents` },
  ],
};

export default function AIAgentsPage() {
  return (
    <>
      <JsonLd schema={agentsListSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <AIAgentsPageClient />
    </>
  );
}
