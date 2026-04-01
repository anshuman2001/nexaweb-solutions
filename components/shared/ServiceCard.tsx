import { Check, Clock } from 'lucide-react';
import { Service } from '@/types';

export default function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="bg-surface rounded-2xl border border-border-subtle p-6 card-hover">
      <div className="text-4xl mb-4">{service.icon}</div>
      <h3 className="text-white font-bold text-xl mb-1">{service.name}</h3>
      <p className="text-accent-green font-semibold text-sm mb-2">{service.priceRange}</p>
      <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-4">
        <Clock className="w-3.5 h-3.5" />{service.timeline}
      </div>
      <p className="text-gray-400 text-sm mb-4 leading-relaxed">{service.description}</p>
      <ul className="space-y-2 mb-4">
        {service.features.slice(0, 4).map(f => (
          <li key={f} className="flex items-center gap-2 text-sm text-gray-300">
            <Check className="w-3.5 h-3.5 text-accent-green flex-shrink-0" />{f}
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-1.5">
        {service.techStack.map(t => <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 border border-border-subtle text-gray-400 text-xs">{t}</span>)}
      </div>
    </div>
  );
}
