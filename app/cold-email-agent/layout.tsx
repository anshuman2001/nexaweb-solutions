import type { Metadata } from 'next';

const siteUrl = 'https://digiagentix.com';

export const metadata: Metadata = {
  title: 'Cold Email AI Agent — Send 1000 Personalized Emails/Day | DigiAgentix',
  description: 'AI-powered cold email outreach tool. Upload your USA leads, Claude AI writes unique personalized emails per lead, auto follow-ups on Day 3/7/14. Free to use.',
  keywords: [
    'cold email AI agent', 'AI cold email tool', 'automated cold email',
    'personalized cold email software', 'bulk cold email AI', 'USA lead outreach',
    'cold email follow up automation', 'AI email writer', 'sales outreach AI',
    'B2B email automation', 'cold email SaaS', 'email personalization AI',
  ],
  alternates: { canonical: `${siteUrl}/cold-email-agent` },
  openGraph: {
    title: 'Cold Email AI Agent — Personalized Outreach at Scale',
    description: 'Upload leads → AI writes unique emails → auto follow-ups. Claude AI personalizes every email. Free to try.',
    url: `${siteUrl}/cold-email-agent`,
    siteName: 'DigiAgentix',
    images: [{ url: `${siteUrl}/logo.png`, width: 1200, height: 630, alt: 'DigiAgentix Cold Email AI Agent' }],
  },
  robots: { index: true, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
