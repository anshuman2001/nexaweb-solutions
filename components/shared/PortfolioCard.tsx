import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { PortfolioProject } from '@/types';

export default function PortfolioCard({ project }: { project: PortfolioProject }) {
  return (
    <div className="group bg-surface rounded-2xl border border-border-subtle overflow-hidden card-hover">
      <div className="relative h-52 overflow-hidden">
        <Image src={project.imageUrl} alt={project.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-accent-blue text-white text-xs font-semibold">{project.category}</div>
        {project.featured && <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-accent-green text-black text-xs font-semibold">Featured</div>}
      </div>
      <div className="p-5">
        <h3 className="text-white font-bold text-lg mb-2 group-hover:text-accent-blue transition-colors">{project.title}</h3>
        <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">{project.description}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techStack.map(t => <span key={t} className="px-2 py-0.5 rounded-md bg-white/5 border border-border-subtle text-gray-400 text-xs">{t}</span>)}
        </div>
        {project.liveUrl && (
          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-accent-blue text-sm font-medium hover:text-blue-400 transition-colors">
            <ExternalLink className="w-3.5 h-3.5" />View Live
          </a>
        )}
      </div>
    </div>
  );
}
