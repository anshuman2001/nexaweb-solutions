import type { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';
import JsonLd from '@/components/seo/JsonLd';

const siteUrl = 'https://digiagentix.com';

export const metadata: Metadata = {
  title: 'Web Design Services India — eCommerce, Business Websites, Landing Pages',
  description: 'Professional website development in India using Next.js. eCommerce stores from ₹25,000, business websites from ₹15,000, landing pages from ₹8,000. Fast, SEO-optimized, mobile-first.',
  keywords: [
    'web design India', 'website development India', 'website development Noida',
    'eCommerce website India', 'Next.js website India', 'business website India',
    'landing page design India', 'portfolio website India', 'affordable website India',
    'fast website India', 'SEO website India', 'mobile website India',
  ],
  alternates: {
    canonical: `${siteUrl}/services`,
  },
  openGraph: {
    title: 'Web Design & Development Services — DigiAgentix India',
    description: 'eCommerce from ₹25,000. Business websites from ₹15,000. Landing pages from ₹8,000. Built with Next.js for max speed & SEO.',
    url: `${siteUrl}/services`,
    images: [{ url: `${siteUrl}/logo.png`, width: 1200, height: 630, alt: 'DigiAgentix Web Design Services' }],
  },
};

const webServicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Web Design Services by DigiAgentix',
  url: `${siteUrl}/services`,
  itemListElement: [
    {
      '@type': 'ListItem', position: 1,
      item: { '@type': 'Service', name: 'eCommerce Website Development', description: 'Full-featured online store with payments, inventory, and AI chatbot integration.', offers: { '@type': 'Offer', priceSpecification: { '@type': 'PriceSpecification', minPrice: '25000', maxPrice: '80000', priceCurrency: 'INR' } } },
    },
    {
      '@type': 'ListItem', position: 2,
      item: { '@type': 'Service', name: 'Business Website Development', description: 'Professional Next.js business websites that rank on Google and convert visitors.', offers: { '@type': 'Offer', priceSpecification: { '@type': 'PriceSpecification', minPrice: '15000', maxPrice: '50000', priceCurrency: 'INR' } } },
    },
    {
      '@type': 'ListItem', position: 3,
      item: { '@type': 'Service', name: 'Landing Page Design', description: 'High-converting landing pages for ads, product launches, and lead generation.', offers: { '@type': 'Offer', priceSpecification: { '@type': 'PriceSpecification', minPrice: '8000', maxPrice: '20000', priceCurrency: 'INR' } } },
    },
    {
      '@type': 'ListItem', position: 4,
      item: { '@type': 'Service', name: 'Website + AI Agent Bundle', description: 'Professional website combined with a custom AI agent for maximum automation.', offers: { '@type': 'Offer', priceSpecification: { '@type': 'PriceSpecification', minPrice: '35000', maxPrice: '150000', priceCurrency: 'INR' } } },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Web Design Services', item: `${siteUrl}/services` },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd schema={webServicesSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <ServicesPageClient />
    </>
  );
}
