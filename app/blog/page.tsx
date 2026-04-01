import type { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';
import JsonLd from '@/components/seo/JsonLd';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexawebsolutions.vercel.app';

export const metadata: Metadata = {
  title: 'Blog — AI Agents, WhatsApp Automation & Web Design Tips for India',
  description: 'Read expert articles on AI agents for Indian businesses, WhatsApp automation, chatbot development, web design, and growing your business with technology. By NexaWeb Solutions.',
  keywords: [
    'AI agents blog India', 'WhatsApp chatbot guide', 'AI chatbot tutorial India',
    'web design tips India', 'business automation blog', 'chatbot for business India',
    'AI technology India', 'website development tips', 'digital transformation India',
    'NexaWeb blog',
  ],
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: 'NexaWeb Blog — AI, WhatsApp Automation & Web Design for Indian Businesses',
    description: 'Expert articles on AI agents, WhatsApp automation, chatbot development and web design for Indian businesses.',
    url: `${siteUrl}/blog`,
    type: 'website',
    images: [{ url: `${siteUrl}/logo.png`, width: 1200, height: 630, alt: 'NexaWeb Solutions Blog' }],
  },
};

const blogSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: 'NexaWeb Solutions Blog',
  description: 'Expert articles on AI agents, WhatsApp automation, web design and business technology for Indian businesses.',
  url: `${siteUrl}/blog`,
  publisher: {
    '@type': 'Organization',
    name: 'NexaWeb Solutions',
    logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
  },
  inLanguage: 'en-IN',
  blogPost: [
    {
      '@type': 'BlogPosting',
      headline: 'How AI Agents Are Transforming Customer Support in India',
      url: `${siteUrl}/blog/ai-agents-transforming-customer-support-india`,
      datePublished: '2024-12-15',
      author: { '@type': 'Organization', name: 'NexaWeb Team' },
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80',
    },
    {
      '@type': 'BlogPosting',
      headline: 'WhatsApp Business API: Complete Guide for Indian Businesses (2024)',
      url: `${siteUrl}/blog/whatsapp-business-api-guide-india-2024`,
      datePublished: '2024-12-10',
      author: { '@type': 'Organization', name: 'NexaWeb Team' },
      image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80',
    },
    {
      '@type': 'BlogPosting',
      headline: 'Next.js vs WordPress: Which is Better for Your Business Website in 2024?',
      url: `${siteUrl}/blog/nextjs-vs-wordpress-business-website-2024`,
      datePublished: '2024-12-05',
      author: { '@type': 'Organization', name: 'NexaWeb Team' },
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
    { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
  ],
};

export default function BlogPage() {
  return (
    <>
      <JsonLd schema={blogSchema} />
      <JsonLd schema={breadcrumbSchema} />
      <BlogPageClient />
    </>
  );
}
