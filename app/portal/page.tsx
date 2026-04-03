import type { Metadata } from 'next';
import PortalLoginClient from './PortalLoginClient';

export const metadata: Metadata = {
  title: 'Client Portal Login',
  description: 'Log in to your DigiAgentix client portal to view project status, invoices, and messages.',
};

export default function PortalPage() {
  return <PortalLoginClient />;
}
