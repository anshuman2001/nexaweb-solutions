import type { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact Us — Get a Free AI Agent Demo',
  description: 'Contact NexaWeb Solutions for AI agents and web design. We reply within 2 hours. WhatsApp: +91 99999 99999.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}
