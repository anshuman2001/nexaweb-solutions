import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Calendar, MessageCircle } from 'lucide-react';
import { blogPostsData } from '@/lib/utils';
import JsonLd from '@/components/seo/JsonLd';

const siteUrl = 'https://digiagentix.com';

export async function generateStaticParams() {
  return blogPostsData.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPostsData.find((p) => p.slug === params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, 'DigiAgentix', 'AI agents India', 'web design Noida', post.title.split(' ').slice(0, 4).join(' ')],
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: [{ url: post.imageUrl, width: 800, height: 450, alt: post.title }],
      url: `${siteUrl}/blog/${post.slug}`,
      siteName: 'DigiAgentix',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.imageUrl],
    },
    alternates: { canonical: `${siteUrl}/blog/${post.slug}` },
  };
}

const blogContent: Record<string, string[]> = {
  'ai-agents-transforming-customer-support-india': [
    'Indian businesses are rapidly adopting AI-powered customer support agents, and the results are remarkable. Companies that implement AI agents report handling 80% of customer queries automatically, with response times dropping from hours to seconds.',
    'The traditional model of hiring large customer support teams is becoming unsustainable. With AI agents, a single solution can handle thousands of simultaneous conversations in both Hindi and English — 24 hours a day, 7 days a week.',
    'Key benefits Indian businesses are seeing include: 60-70% reduction in support costs, 3x faster response times, consistent quality across all interactions, and the ability to scale instantly during peak seasons like Diwali.',
    'The technology works by combining natural language understanding with your business knowledge base. The agent learns your products, FAQs, and policies, then handles customer queries automatically — escalating complex cases to your human team.',
    'Getting started is simpler than most businesses think. A basic customer support AI agent can be deployed in as little as 5-7 days, with pricing starting at ₹15,000 for a complete setup including training and integration.',
  ],
  'whatsapp-business-api-guide-india-2024': [
    'WhatsApp has over 500 million users in India, making it the most powerful business communication channel available. The WhatsApp Business API allows businesses to automate conversations, send notifications, and build full customer service workflows.',
    'Unlike the regular WhatsApp Business app (which is limited to 1 device and manual responses), the API version enables: automated replies, bulk messaging to opted-in customers, chatbot integration, CRM sync, and multi-agent support.',
    'Pricing for WhatsApp Business API in India: Meta charges per conversation (not per message). Utility conversations cost ₹0.14-0.22 each. Marketing messages cost ₹0.74 each. The first 1,000 service conversations per month are free.',
    'To get started, you need: a verified Facebook Business account, a dedicated phone number, and a Business Service Provider (BSP) or direct API access. Most businesses work with a BSP like DigiAgentix to handle the technical setup.',
    'With an AI agent integrated into WhatsApp, you can automate order updates, appointment booking, product inquiries, complaint handling, and payment collection — turning WhatsApp into a 24/7 sales and support channel.',
  ],
  'nextjs-vs-wordpress-business-website-2024': [
    'When building a business website in 2024, the two most common choices are WordPress (the world\'s most popular CMS) and Next.js (the modern React framework). Each has distinct advantages depending on your needs.',
    'WordPress advantages: Easy content management, thousands of plugins, familiar interface for non-technical users, lower upfront cost for simple sites. WordPress powers 43% of all websites globally.',
    'Next.js advantages: 3-5x faster page loads, better Core Web Vitals scores, superior SEO performance, more secure (no database exposed), modern UI capabilities, and scales effortlessly under high traffic.',
    'For Indian businesses, speed matters enormously. Google\'s data shows that 53% of mobile users abandon sites that take more than 3 seconds to load. Next.js sites typically load in under 1 second, while WordPress sites average 3-5 seconds without heavy optimization.',
    'Our recommendation: For content-heavy sites (news, blogs, large eCommerce), WordPress with good hosting works well. For business websites, landing pages, and SaaS products, Next.js delivers significantly better performance, SEO results, and user experience.',
  ],
  'case-study-lead-agent-300-leads-month': [
    'Client: A real estate company in Noida with 15 agents. Problem: Sales team was spending 4+ hours daily answering repetitive queries about property prices, locations, and availability — leaving little time for actual sales.',
    'Solution: We built a custom Sales & Lead AI Agent integrated on their website and WhatsApp. The agent was trained on their entire property inventory, pricing, location details, and common buyer questions.',
    'The agent qualifies leads by asking: budget range, preferred location, property type (apartment/villa/plot), timeline for purchase, and contact details — all in a natural conversation flow in Hindi and English.',
    'Results after 3 months: 300+ qualified leads generated monthly (up from 80), sales team time on calls reduced by 65%, lead response time dropped from 2-4 hours to under 30 seconds, and monthly revenue increased by 40%.',
    'Total investment: ₹45,000 one-time setup + ₹3,000/month maintenance. ROI was achieved within the first month. The client has since expanded the system to handle post-sale customer support as well.',
  ],
  '7-ways-automate-small-business-ai': [
    '1. Customer Support Automation: An AI agent on your website and WhatsApp handles FAQs, complaints, and order queries 24/7. Most small businesses can automate 60-70% of support tickets immediately.',
    '2. Lead Qualification: Instead of manually calling every inquiry, an AI agent pre-qualifies leads by asking the right questions — budget, timeline, requirements — and only passes serious buyers to your sales team.',
    '3. Appointment Booking: AI agents can check your calendar availability and book appointments directly via WhatsApp or website chat, eliminating back-and-forth scheduling calls.',
    '4. Invoice & Payment Reminders: Automated WhatsApp messages for invoice follow-ups, payment due dates, and receipts. This alone can improve cash flow significantly for service businesses.',
    '5. Social Media Content: AI tools can generate weekly content calendars, write captions, and suggest posting schedules based on your industry and target audience.',
    '6. Email Marketing: Automated email sequences for new leads, abandoned carts, post-purchase follow-ups, and re-engagement campaigns — running 24/7 without any manual work.',
    '7. Inventory Alerts: For retail and eCommerce businesses, AI can monitor stock levels and send automatic reorder alerts, preventing stockouts during peak seasons.',
  ],
  'website-design-trends-india-2025': [
    'Dark mode design has gone from a trendy option to a necessity. With over 80% of smartphone users preferring dark mode, Indian businesses are adopting dark-themed websites that look premium, reduce eye strain, and display beautifully on AMOLED screens.',
    'Micro-animations and 3D elements add depth and interactivity without sacrificing performance. Subtle hover effects, smooth page transitions, and floating 3D elements make websites feel alive — significantly improving time-on-site metrics.',
    'AI chat widgets have become a standard feature on business websites. A well-configured AI agent on your website can convert 15-25% of visitors into leads — making it one of the highest-ROI investments for any business website.',
    'Mobile-first design is no longer optional. With 75%+ of Indian internet users accessing websites via mobile, every design decision must start with mobile experience. Fast load times, thumb-friendly navigation, and minimal text input are critical.',
    'Local SEO integration in design — structured data markup, location pages, Google Maps embedding, and regional language support — is becoming a key competitive advantage for Indian businesses targeting local customers.',
  ],
};

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = blogPostsData.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const content = blogContent[post.slug] || [post.excerpt];
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919997730768';

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: post.imageUrl,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: { '@type': 'Person', name: post.author },
    publisher: {
      '@type': 'Organization',
      name: 'DigiAgentix',
      logo: { '@type': 'ImageObject', url: `${siteUrl}/logo.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${siteUrl}/blog/${post.slug}` },
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
    <>
      <JsonLd schema={[articleSchema, breadcrumbSchema]} />
      <div className="min-h-screen bg-background pt-24 pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </Link>

          <div className="mb-4">
            <span className="badge-blue px-3 py-1 rounded-full text-xs font-medium">{post.category}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight mb-4">{post.title}</h1>

          <div className="flex items-center gap-4 text-sm text-gray-400 mb-8">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {post.readTime} min read
            </span>
            <span className="text-gray-500">by {post.author}</span>
          </div>

          <div className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden mb-10">
            <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
          </div>

          <div className="prose prose-invert max-w-none">
            {content.map((para, i) => (
              <p key={i} className="text-gray-300 leading-relaxed mb-5 text-base sm:text-lg">{para}</p>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 p-8 rounded-2xl border border-blue-500/20 bg-blue-500/5 text-center">
            <h3 className="text-xl font-bold text-white mb-2">Ready to automate your business?</h3>
            <p className="text-gray-400 text-sm mb-6">Get a free consultation — we&apos;ll show you exactly how AI can help your business.</p>
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi! I read your blog and would like a free consultation.`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent-blue text-white font-semibold hover:bg-blue-500 transition-all btn-glow"
            >
              <MessageCircle className="w-4 h-4" />
              Get Free Consultation
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
