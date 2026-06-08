import { MetadataRoute } from 'next';
import { blogPostsData } from '@/lib/utils';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://digiagentix.com';
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl,                              lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${baseUrl}/ai-agents`,               lastModified: now, changeFrequency: 'weekly',  priority: 0.95 },
    { url: `${baseUrl}/services`,                lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/products`,                lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/pricing`,                 lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${baseUrl}/portfolio`,               lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/blog`,                    lastModified: now, changeFrequency: 'daily',   priority: 0.8 },
    { url: `${baseUrl}/contact`,                 lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/ai-calling-agent`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${baseUrl}/cold-email-agent`,        lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${baseUrl}/brokernote-ai`,           lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${baseUrl}/ca-compliance-calendar`, lastModified: now, changeFrequency: 'weekly',  priority: 0.85 },
    { url: `${baseUrl}/gst-reconcile`,           lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/privacy`,                 lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${baseUrl}/terms`,                   lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ];

  const blogPages: MetadataRoute.Sitemap = blogPostsData.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}
