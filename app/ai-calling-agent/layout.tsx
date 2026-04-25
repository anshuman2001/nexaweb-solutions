import type { ReactNode } from 'react';
import type { Metadata } from 'next';

const siteUrl = 'https://digiagentix.com';

export const metadata: Metadata = {
  title: 'AI Calling Agent India — 10,000 Concurrent Calls at ₹33/call | DigiAgentix',
  description: 'Replace 500 sales agents with 1 AI Calling Agent. Human-like voice in Hindi & English, 24/7 outreach, real-time CRM updates. 10,000 concurrent calls. Starting ₹49,999/mo.',
  keywords: [
    'AI calling agent India', 'AI phone agent', 'automated calling India',
    'sales AI agent India', 'voice AI agent', 'outbound calling AI',
    'AI telemarketing India', 'call center AI India', 'AI cold calling',
    'automated sales calls India', 'Hindi voice AI', 'bulk calling AI India',
  ],
  alternates: { canonical: `${siteUrl}/ai-calling-agent` },
  openGraph: {
    title: 'AI Calling Agent — 10,000 Concurrent Calls at ₹33/call',
    description: 'Replace your sales team with AI. 10,000 concurrent calls, Hindi + English, real-time CRM. Starting ₹49,999/mo.',
    url: `${siteUrl}/ai-calling-agent`,
    siteName: 'DigiAgentix',
    images: [{ url: `${siteUrl}/logo.png`, width: 1200, height: 630, alt: 'DigiAgentix AI Calling Agent' }],
  },
  robots: { index: true, follow: true },
};

export default function AICallingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
