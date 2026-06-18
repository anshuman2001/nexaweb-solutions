import type { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';
import JsonLd from '@/components/seo/JsonLd';

const siteUrl = 'https://digiagentix.com';

export const metadata: Metadata = {
  title: 'Technology Solutions & Services — AI, Automation, Software Development | DigiAgentix',
  description: 'Enterprise technology services including AI & machine learning, intelligent automation, software development, cloud solutions, digital transformation, and enterprise consulting. Serving businesses across India.',
  keywords: [
    'technology solutions India', 'AI solutions India', 'business automation India',
    'software development India', 'cloud solutions India', 'digital transformation India',
    'enterprise consulting India', 'AI machine learning India', 'RPA automation India',
    'technology company Noida', 'enterprise software development India',
  ],
  alternates: {
    canonical: `${siteUrl}/services`,
  },
  openGraph: {
    title: 'Enterprise Technology Services — DigiAgentix',
    description: 'AI & ML, intelligent automation, software development, cloud solutions, digital transformation, and enterprise consulting for businesses across India.',
    url: `${siteUrl}/services`,
    images: [{ url: `${siteUrl}/logo.png`, width: 1200, height: 630, alt: 'DigiAgentix Technology Solutions' }],
  },
};

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Technology Services by DigiAgentix',
  url: `${siteUrl}/services`,
  itemListElement: [
    { '@type': 'ListItem', position: 1, item: { '@type': 'Service', name: 'AI & Machine Learning', description: 'Custom AI models, NLP, predictive analytics, and intelligent decision systems.', provider: { '@id': `${siteUrl}/#organization` } } },
    { '@type': 'ListItem', position: 2, item: { '@type': 'Service', name: 'Intelligent Automation', description: 'RPA, intelligent document processing, and multi-channel workflow automation.', provider: { '@id': `${siteUrl}/#organization` } } },
    { '@type': 'ListItem', position: 3, item: { '@type': 'Service', name: 'Software Development', description: 'Enterprise web applications, SaaS platforms, APIs, and internal tools.', provider: { '@id': `${siteUrl}/#organization` } } },
    { '@type': 'ListItem', position: 4, item: { '@type': 'Service', name: 'Cloud Solutions', description: 'Cloud migration, serverless architecture, DevOps, and managed infrastructure.', provider: { '@id': `${siteUrl}/#organization` } } },
    { '@type': 'ListItem', position: 5, item: { '@type': 'Service', name: 'Digital Transformation', description: 'End-to-end modernisation of operations, systems, and customer experience.', provider: { '@id': `${siteUrl}/#organization` } } },
    { '@type': 'ListItem', position: 6, item: { '@type': 'Service', name: 'Enterprise Consulting', description: 'Technology assessment, roadmap planning, and strategic advisory.', provider: { '@id': `${siteUrl}/#organization` } } },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Solutions', item: `${siteUrl}/services` },
  ],
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd schema={servicesSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <ServicesPageClient />
    </>
  );
}
