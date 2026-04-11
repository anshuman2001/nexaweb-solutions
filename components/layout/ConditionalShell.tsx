'use client';

import { usePathname } from 'next/navigation';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';

/* Routes that should render WITHOUT the site Navbar / Footer / WhatsApp float */
const STANDALONE_ROUTES = [
  '/eduaccess-ai',
  '/ai-calling-agent',
  '/cold-email-agent',
];

export default function ConditionalShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalone = !!pathname && STANDALONE_ROUTES.some((r) => pathname === r || pathname.startsWith(r + '/'));

  if (isStandalone) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}
