import type { Metadata } from 'next';
import BlogPageClient from './BlogPageClient';

export const metadata: Metadata = {
  title: 'Blog — AI Agents, Web Design & Business Tips',
  description: 'Articles on AI agents, WhatsApp automation, web design, and growing your Indian business with technology.',
};

export default function BlogPage() {
  return <BlogPageClient />;
}
