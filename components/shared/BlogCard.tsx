import Image from 'next/image';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';
import { BlogPost } from '@/types';

export default function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article className="group bg-surface rounded-2xl border border-border-subtle overflow-hidden card-hover">
      <div className="relative h-48 overflow-hidden">
        <Image src={post.imageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-accent-blue/90 text-white text-xs font-semibold">{post.category}</div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.readTime} min</div>
          <span>•</span>
          <span>{new Date(post.publishedAt).toLocaleDateString('en-IN', { month:'short', day:'numeric' })}</span>
        </div>
        <h3 className="text-white font-bold mb-2 group-hover:text-accent-blue transition-colors line-clamp-2 leading-snug">{post.title}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">{post.excerpt}</p>
        <Link href={`/blog/${post.slug}`} className="inline-flex items-center gap-1.5 text-accent-blue text-sm font-medium hover:gap-2.5 transition-all">
          Read More <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
}
