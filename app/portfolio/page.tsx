import type { Metadata } from 'next';
import PortfolioPageClient from './PortfolioPageClient';

export const metadata: Metadata = {
  title: 'Portfolio — AI Agents & Websites We\'ve Built',
  description: 'See our work: AI agents, eCommerce stores, business websites and landing pages built for Indian businesses.',
};

export default function PortfolioPage() {
  return <PortfolioPageClient />;
}
