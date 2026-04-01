import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { blogPostsData } from '@/lib/utils';
import JsonLd from '@/components/seo/JsonLd';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://nexawebsolutions.vercel.app';

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  return blogPostsData.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPostsData.find(p => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, 'AI agents India', 'NexaWeb Solutions', 'chatbot India', 'web design India'],
    authors: [{ name: post.author }],
    alternates: { canonical: `${siteUrl}/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      url: `${siteUrl}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      authors: [post.author],
      section: post.category,
      images: [{ url: post.imageUrl, width: 800, height: 500, alt: post.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    },
  };
}

const sampleContent = `
## Introduction

Artificial intelligence is rapidly transforming the way Indian businesses operate. From customer service to sales and marketing, AI agents are helping companies automate repetitive tasks and focus on what truly matters — growing their business.

## What Are AI Agents?

AI agents are software programs that use large language models (LLMs) to understand and respond to natural language. Unlike simple chatbots that follow rigid scripts, AI agents can:

- Understand context and intent
- Respond in multiple languages (Hindi + English)
- Learn from past conversations
- Integrate with your existing systems (CRM, WhatsApp, etc.)
- Handle complex multi-step tasks

## Why Indian Businesses Need AI Agents

The Indian market has unique requirements that make AI agents especially valuable:

**1. Multilingual Support**
Indian customers communicate in Hindi, regional languages, and English. AI agents can seamlessly switch between languages based on the customer's preference.

**2. 24/7 Availability**
With customers spread across different time zones and shopping at all hours, having an AI agent that never sleeps is invaluable.

**3. Cost Efficiency**
Hiring customer support staff in India costs ₹25,000 - ₹40,000 per employee per month. An AI agent handles the same volume for a fraction of the cost.

**4. WhatsApp Integration**
With 500+ million WhatsApp users in India, businesses that can automate WhatsApp conversations have a massive advantage.

## Real Results from Indian Businesses

A TechMart customer using our AI agent reported:
- **60% reduction** in support costs
- **200+ queries handled** per day automatically
- **4.8/5 customer satisfaction** rating
- **Response time reduced** from 2 hours to 30 seconds

## Getting Started

Ready to implement AI agents for your business? Here's what you need:

1. Define your use case (customer support, sales, etc.)
2. Choose the right AI agent type
3. Set up your knowledge base
4. Integrate with your channels (website + WhatsApp)
5. Monitor and optimize

## Conclusion

AI agents are no longer a luxury for large corporations — they're a competitive necessity for any Indian business that wants to scale efficiently. Starting from ₹15,000, you can have a professional AI agent running in just 3-7 days.

Contact NexaWeb Solutions for a free demo and see how AI can transform your business.
`;

export default function BlogPostPage({ params }: Props) {
  const post = blogPostsData.find(p => p.slug === params.slug);
  if (!post) notFound();

  const relatedPosts = blogPostsData.filter(p => p.id !== post.id).slice(0, 3);

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.imageUrl,
    url: `${siteUrl}/blog/${post.slug}`,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Organization',
      name: 'NexaWeb Solutions',
      url: siteUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'NexaWeb Solutions',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/blog/${post.slug}` },
    articleSection: post.category,
    inLanguage: 'en-IN',
    keywords: `${post.category}, AI agents India, chatbot India, web design India, NexaWeb Solutions`,
    timeRequired: `PT${post.readTime}M`,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${siteUrl}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: `${siteUrl}/blog/${post.slug}` },
    ],
  };

  return (
    <div className="min-h-screen pt-20">
      <JsonLd schema={articleSchema} />
      <JsonLd schema={breadcrumbSchema} />

      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        {/* Header */}
        <header className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full badge-blue text-sm mb-5">
            {post.category}
          </div>
          <h1 className="text-3xl lg:text-5xl font-extrabold text-white mb-6 leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-8">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent-blue to-accent-green flex items-center justify-center text-white text-xs font-bold">
                N
              </div>
              <span>{post.author}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })}
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime} min read
            </div>
          </div>
          <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </header>

        {/* Content */}
        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white prose-headings:font-bold
            prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
            prose-p:text-gray-400 prose-p:leading-relaxed
            prose-li:text-gray-400
            prose-strong:text-white
            prose-a:text-accent-blue
            prose-blockquote:border-accent-blue prose-blockquote:text-gray-400"
          dangerouslySetInnerHTML={{ __html: sampleContent.replace(/\n/g, '<br/>').replace(/## (.*)/g, '<h2>$1</h2>').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/- (.*)/g, '<li>$1</li>') }}
        />

        {/* CTA */}
        <div className="mt-16 p-8 rounded-2xl bg-accent-blue/5 border border-accent-blue/20 text-center">
          <h3 className="text-white font-bold text-2xl mb-3">Ready to Get Started?</h3>
          <p className="text-gray-400 mb-6">Get a free demo of our AI agents and see how they can help your business.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={`https://wa.me/919997730768?text=Hi! I read your blog about ${post.category} and would like a free demo.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-accent-blue text-white font-semibold hover:bg-blue-500 transition-all btn-glow"
            >
              Get Free Demo
            </a>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl border border-border-subtle text-white font-semibold hover:border-accent-blue/50 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <h2 className="text-2xl font-bold text-white mb-8">Related Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedPosts.map(related => (
            <Link
              key={related.id}
              href={`/blog/${related.slug}`}
              className="group bg-surface rounded-xl border border-border-subtle overflow-hidden card-hover"
            >
              <div className="relative h-36 overflow-hidden">
                <Image src={related.imageUrl} alt={related.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-4">
                <p className="text-xs text-accent-blue mb-2">{related.category}</p>
                <h3 className="text-white font-semibold text-sm leading-snug group-hover:text-accent-blue transition-colors">{related.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
