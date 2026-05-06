import type { Metadata } from 'next';

const siteUrl = 'https://digiagentix.com';

export const metadata: Metadata = {
  title: 'BrokerNote AI — Stock Contract Note Extractor for CA Firms | DigiAgentix',
  description: 'Upload Angel One, Zerodha, Upstox broker contract notes — AI extracts trade data instantly. Clean Excel output + Tally XML import. Free for CA firms & accountants.',
  keywords: [
    'contract note extractor', 'broker contract note to excel', 'CA firm accounting tool',
    'Angel One contract note', 'Zerodha contract note extraction', 'Tally XML import stocks',
    'stock trade data extraction', 'CA accounting automation', 'brokerage note AI',
    'ISIN trade data excel', 'contract note software India', 'stock broker statement parser',
  ],
  alternates: { canonical: `${siteUrl}/brokernote-ai` },
  openGraph: {
    title: 'BrokerNote AI — Contract Note Extractor for CA Firms',
    description: 'Upload broker PDFs → AI extracts trade data → Download Excel + Tally XML. Free tool for accountants.',
    url: `${siteUrl}/brokernote-ai`,
    siteName: 'DigiAgentix',
    images: [{ url: `${siteUrl}/logo.png`, width: 1200, height: 630, alt: 'BrokerNote AI' }],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
