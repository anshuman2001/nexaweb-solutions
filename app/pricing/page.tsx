import type { Metadata } from 'next';
import PricingPageClient from './PricingPageClient';

export const metadata: Metadata = {
  title: 'Pricing — AI Agents & Website Design Plans',
  description: 'Transparent pricing for AI agents and website design. AI agents from ₹15,000. Websites from ₹8,000. Monthly maintenance from ₹2,000.',
};

export default function PricingPage() {
  return <PricingPageClient />;
}
