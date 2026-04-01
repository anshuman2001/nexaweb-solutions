import { Star, Quote } from 'lucide-react';
import { Testimonial } from '@/types';

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bg-surface rounded-2xl border border-border-subtle p-6 card-hover relative">
      <Quote className="absolute top-4 right-4 w-8 h-8 text-accent-blue/20" />
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />)}
      </div>
      <p className="text-gray-300 text-sm leading-relaxed mb-6">"{testimonial.content}"</p>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-blue to-accent-green flex items-center justify-center text-white font-bold text-sm">
          {testimonial.name.charAt(0)}
        </div>
        <div>
          <p className="text-white font-semibold text-sm">{testimonial.name}</p>
          <p className="text-gray-500 text-xs">{testimonial.role}, {testimonial.company}</p>
        </div>
      </div>
    </div>
  );
}
