import type { Metadata } from 'next';
import AIAgentsPageClient from './AIAgentsPageClient';

export const metadata: Metadata = {
  title: 'AI Agents — Customer Support, Sales, WhatsApp & More',
  description: 'Explore our 8 AI agents: customer support, WhatsApp business, sales & lead, meeting AI, eCommerce, email marketing, content writing, and industry-specific agents. Starting ₹15,000.',
};

export default function AIAgentsPage() {
  return <AIAgentsPageClient />;
}
