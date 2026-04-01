import { Check } from 'lucide-react';
import Link from 'next/link';
import { PricingPlan } from '@/types';

export default function PricingCard({ plan }: { plan: PricingPlan }) {
  return (
    <div className={`relative rounded-2xl border p-8 ${plan.popular ? 'border-accent-blue bg-accent-blue/5 shadow-xl shadow-accent-blue/10' : 'border-border-subtle bg-surface'}`}>
      {plan.popular && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-accent-blue text-white text-sm font-semibold">⭐ Most Popular</div>
      )}
      <h3 className="text-white font-bold text-xl mb-1">{plan.name}</h3>
      <div className="text-3xl font-extrabold gradient-text mb-2">{plan.price}</div>
      <p className="text-gray-400 text-sm mb-6 leading-relaxed">{plan.description}</p>
      <ul className="space-y-3 mb-8">
        {plan.features.map(f => (
          <li key={f} className="flex items-center gap-2.5 text-sm text-gray-300">
            <Check className="w-4 h-4 text-accent-green flex-shrink-0" />{f}
          </li>
        ))}
      </ul>
      <Link href="/contact" className={`block text-center py-3 rounded-xl font-semibold text-sm transition-all ${plan.popular ? 'bg-accent-blue text-white hover:bg-blue-500 btn-glow' : 'border border-border-subtle text-white hover:border-accent-blue/50 hover:bg-white/5'}`}>
        {plan.cta}
      </Link>
    </div>
  );
}
