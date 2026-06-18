import { Metadata } from 'next';
import JsonLd from '@/components/seo/JsonLd';
import ProductsPageClient from './ProductsPageClient';

const siteUrl = 'https://digiagentix.com';

export const metadata: Metadata = {
  title: 'AI Software Products — GST Reconciliation, AI Calling Agent, Content AI & More | DigiAgentix',
  description: 'Enterprise AI and automation software products for Indian businesses. GST AI Reconciliation, AI Calling Agent, Content Agent, eCommerce AI, EduAccess, and more. Schedule a demo today.',
  keywords: [
    'AI SaaS products India', 'GST reconciliation AI', 'AI calling agent India',
    'content AI India', 'eCommerce AI agent', 'interior AI designer India',
    'CA compliance software', 'EduAccess AI', 'business automation software India',
    'enterprise AI products India', 'DigiAgentix products',
  ],
  alternates: { canonical: `${siteUrl}/products` },
  openGraph: {
    title: 'AI Software Products — DigiAgentix',
    description: 'Enterprise AI and automation products for Indian businesses. GST AI, AI Calling Agent, Content Agent, eCommerce AI & more.',
    url: `${siteUrl}/products`,
    siteName: 'DigiAgentix',
    images: [{ url: `${siteUrl}/logo.png`, width: 1200, height: 630, alt: 'DigiAgentix AI Products' }],
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home',     item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Products', item: `${siteUrl}/products` },
  ],
};

const productsListSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'DigiAgentix AI Software Products',
  url: `${siteUrl}/products`,
  numberOfItems: 9,
  itemListElement: [
    { '@type': 'ListItem', position: 1,  item: { '@type': 'SoftwareApplication', name: 'GST AI Reconciliation',           applicationCategory: 'FinanceApplication',     url: `${siteUrl}/gst-ai-agent` } },
    { '@type': 'ListItem', position: 2,  item: { '@type': 'SoftwareApplication', name: 'BrokerNote AI',                   applicationCategory: 'FinanceApplication',     url: `${siteUrl}/brokernote-ai` } },
    { '@type': 'ListItem', position: 3,  item: { '@type': 'SoftwareApplication', name: 'CA Compliance Calendar',          applicationCategory: 'FinanceApplication',     url: `${siteUrl}/ca-compliance-calendar` } },
    { '@type': 'ListItem', position: 4,  item: { '@type': 'SoftwareApplication', name: 'Cold Email AI Agent',             applicationCategory: 'BusinessApplication',    url: `${siteUrl}/cold-email-agent` } },
    { '@type': 'ListItem', position: 5,  item: { '@type': 'SoftwareApplication', name: 'AI Calling Agent',                applicationCategory: 'BusinessApplication',    url: `${siteUrl}/ai-calling-agent` } },
    { '@type': 'ListItem', position: 6,  item: { '@type': 'SoftwareApplication', name: 'eCommerce Shopping Agent',        applicationCategory: 'ShoppingApplication',    url: `${siteUrl}/ecommerce-agent` } },
    { '@type': 'ListItem', position: 7,  item: { '@type': 'SoftwareApplication', name: 'Interior AI Designer',            applicationCategory: 'DesignApplication',      url: `${siteUrl}/interior-ai` } },
    { '@type': 'ListItem', position: 8,  item: { '@type': 'SoftwareApplication', name: 'EduAccess AI',                    applicationCategory: 'EducationalApplication', url: `${siteUrl}/eduaccess-ai` } },
    { '@type': 'ListItem', position: 9,  item: { '@type': 'SoftwareApplication', name: 'DigiAgentix Content Agent',       applicationCategory: 'BusinessApplication',    url: `${siteUrl}/content-agent` } },
  ],
};

export default function ProductsPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema} />
      <JsonLd schema={productsListSchema} />
      <ProductsPageClient />
    </>
  );
}
