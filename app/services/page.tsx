import type { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'Web Design Services — eCommerce, Business, Landing Pages',
  description: 'Professional websites built with Next.js. eCommerce starting ₹25,000. Business websites, landing pages, portfolios. Made in India.',
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
