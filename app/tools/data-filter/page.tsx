import type { Metadata } from 'next';
import DataFilterClient from './DataFilterClient';

export const metadata: Metadata = {
  title: 'No-Website Filter Tool | DigiAgentix',
  description: 'Filter businesses without a website from your Google Drive CSV data. Runs in Google\'s cloud. Free tool by DigiAgentix.',
};

export default function DataFilterPage() {
  return <DataFilterClient />;
}
