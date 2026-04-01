import Link from 'next/link';
import { ArrowLeft, Bot } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 grid-bg">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 rounded-2xl bg-accent-blue/10 border border-accent-blue/20 flex items-center justify-center mx-auto mb-6">
          <Bot className="w-10 h-10 text-accent-blue" />
        </div>
        <h1 className="text-6xl font-extrabold gradient-text mb-4">404</h1>
        <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-gray-400 mb-8 leading-relaxed">
          Oops! This page doesn't exist. Our AI agent couldn't find it either.
        </p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-blue text-white font-semibold hover:bg-blue-500 transition-all btn-glow">
          <ArrowLeft className="w-5 h-5" />Back to Home
        </Link>
      </div>
    </div>
  );
}
