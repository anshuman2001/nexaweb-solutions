import HeroSection from '@/components/home/HeroSection';
import StatsBar from '@/components/home/StatsBar';
import AIAgentsSection from '@/components/home/AIAgentsSection';
import WebsiteServicesSection from '@/components/home/WebsiteServicesSection';
import HowItWorks from '@/components/home/HowItWorks';
import PortfolioSection from '@/components/home/PortfolioSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import PricingSection from '@/components/home/PricingSection';
import FAQSection from '@/components/home/FAQSection';
import CTASection from '@/components/home/CTASection';
import LiveDemoWidget from '@/components/home/LiveDemoWidget';
import DemoPopup from '@/components/home/DemoPopup';
import JsonLd from '@/components/seo/JsonLd';

const siteUrl = 'https://digiagentix.com';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${siteUrl}/#organization`,
  name: 'DigiAgentix',
  url: siteUrl,
  logo: {
    '@type': 'ImageObject',
    url: `${siteUrl}/logo.png`,
    width: 512,
    height: 512,
  },
  description: 'DigiAgentix builds AI agents and professional websites for Indian businesses. We specialize in WhatsApp chatbots, customer support AI, sales automation, and Next.js web development.',
  foundingDate: '2021',
  foundingLocation: 'Noida, Uttar Pradesh, India',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Noida',
    addressRegion: 'Uttar Pradesh',
    addressCountry: 'IN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-9997730768',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
      contactOption: 'TollFree',
    },
    {
      '@type': 'ContactPoint',
      email: 'info.nexawebsolution@gmail.com',
      contactType: 'sales',
      areaServed: 'IN',
    },
  ],
  sameAs: [
    'https://www.linkedin.com/company/DigiAgentixsolutions',
    'https://www.instagram.com/DigiAgentixsolutions',
    'https://twitter.com/DigiAgentixsolutions',
  ],
  knowsAbout: [
    'AI Agents',
    'WhatsApp Business Automation',
    'Customer Support Chatbots',
    'Web Design',
    'Next.js Development',
    'Business Automation',
  ],
  areaServed: {
    '@type': 'Country',
    name: 'India',
  },
  numberOfEmployees: { '@type': 'QuantitativeValue', value: 10 },
  priceRange: '₹₹',
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${siteUrl}/#website`,
  url: siteUrl,
  name: 'DigiAgentix',
  description: 'AI Agents & Web Design for Indian Businesses',
  publisher: { '@id': `${siteUrl}/#organization` },
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${siteUrl}/blog?search={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
  inLanguage: ['en-IN', 'hi-IN'],
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${siteUrl}/#localbusiness`,
  name: 'DigiAgentix',
  image: `${siteUrl}/logo.png`,
  url: siteUrl,
  telephone: '+91-9997730768',
  email: 'info.nexawebsolution@gmail.com',
  priceRange: '₹15,000 - ₹1,50,000',
  description: 'AI agent development and web design services for Indian businesses. We build WhatsApp chatbots, customer support AI, and professional websites.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Noida',
    addressLocality: 'Noida',
    addressRegion: 'Uttar Pradesh',
    postalCode: '201301',
    addressCountry: 'IN',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 28.5355,
    longitude: 77.3910,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '09:00',
      closes: '20:00',
    },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'AI Agents & Web Design Services',
    itemListElement: [
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Customer Support AI Agent', description: '24/7 automated customer support' }, price: '20000', priceCurrency: 'INR' },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'WhatsApp Business Agent', description: 'WhatsApp automation for business' }, price: '20000', priceCurrency: 'INR' },
      { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Business Website', description: 'Professional Next.js website' }, price: '15000', priceCurrency: 'INR' },
    ],
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
    reviewCount: '30',
    bestRating: '5',
    worstRating: '1',
  },
  review: [
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Rajesh Sharma' },
      reviewRating: { '@type': 'Rating', ratingValue: '5' },
      reviewBody: 'DigiAgentix built us a WhatsApp agent that handles 200+ customer queries daily. Our support cost dropped by 60%.',
    },
    {
      '@type': 'Review',
      author: { '@type': 'Person', name: 'Priya Patel' },
      reviewRating: { '@type': 'Rating', ratingValue: '5' },
      reviewBody: 'The hospital appointment agent they built is amazing. We save 4 hours of staff time every day.',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does it take to build an AI agent?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most AI agents are ready in 2-7 days depending on complexity. A basic customer support agent takes 2-3 days, while industry-specific agents with custom integrations can take 7-14 days.',
      },
    },
    {
      '@type': 'Question',
      name: 'What languages do your AI agents support?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'All our AI agents support both Hindi and English natively. The agent automatically detects the language the customer is using and responds accordingly. We can also add support for other regional languages like Marathi, Tamil, or Gujarati on request.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need technical knowledge to use the AI agent?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not at all! We handle the entire setup, training, and deployment. You just need to provide us with your business information, FAQs, and products/services.',
      },
    },
    {
      '@type': 'Question',
      name: 'Which platforms does the AI agent work on?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Our agents work on your website (chat widget), WhatsApp Business, Instagram DMs, and Facebook Messenger. We recommend starting with website + WhatsApp for maximum coverage.',
      },
    },
    {
      '@type': 'Question',
      name: 'What happens if the AI agent cannot answer a question?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We build a smart human handoff system. If the AI cannot answer confidently, it transfers the conversation to your team via WhatsApp notification. You never miss an important query.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is there a monthly fee after setup?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The setup is a one-time cost. There is a small monthly maintenance fee starting at ₹2,000/month which covers AI model costs, monitoring, updates, and support.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does an AI agent cost in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'AI agents from DigiAgentix start at ₹15,000 for a basic customer support agent. WhatsApp Business agents start at ₹20,000, and sales & lead agents start at ₹30,000. Monthly maintenance starts at ₹2,000.',
      },
    },
    {
      '@type': 'Question',
      name: 'How much does a business website cost in India?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Business websites start at ₹8,000 for a landing page, ₹15,000 for a full business website, and ₹25,000 for an eCommerce store. All websites are built with Next.js for maximum speed and SEO.',
      },
    },
  ],
};

const servicesSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'DigiAgentix Services',
  description: 'AI Agents and Web Design services for Indian businesses',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      item: {
        '@type': 'Service',
        name: 'Customer Support AI Agent',
        description: 'Handle customer queries 24/7 with intelligent AI automation. Hindi + English support.',
        provider: { '@id': `${siteUrl}/#organization` },
        offers: { '@type': 'Offer', price: '20000', priceCurrency: 'INR', priceSpecification: { '@type': 'PriceSpecification', minPrice: '20000', maxPrice: '50000', priceCurrency: 'INR' } },
        url: `${siteUrl}/ai-agents`,
      },
    },
    {
      '@type': 'ListItem',
      position: 2,
      item: {
        '@type': 'Service',
        name: 'WhatsApp Business Agent',
        description: 'Convert WhatsApp into your 24/7 sales and support channel.',
        provider: { '@id': `${siteUrl}/#organization` },
        offers: { '@type': 'Offer', price: '20000', priceCurrency: 'INR', priceSpecification: { '@type': 'PriceSpecification', minPrice: '20000', maxPrice: '60000', priceCurrency: 'INR' } },
        url: `${siteUrl}/ai-agents`,
      },
    },
    {
      '@type': 'ListItem',
      position: 3,
      item: {
        '@type': 'Service',
        name: 'Sales & Lead Generation Agent',
        description: 'Qualify leads and book appointments automatically 24/7.',
        provider: { '@id': `${siteUrl}/#organization` },
        offers: { '@type': 'Offer', price: '30000', priceCurrency: 'INR', priceSpecification: { '@type': 'PriceSpecification', minPrice: '30000', maxPrice: '80000', priceCurrency: 'INR' } },
        url: `${siteUrl}/ai-agents`,
      },
    },
    {
      '@type': 'ListItem',
      position: 4,
      item: {
        '@type': 'Service',
        name: 'Business Website Development',
        description: 'Professional, fast Next.js websites for Indian businesses.',
        provider: { '@id': `${siteUrl}/#organization` },
        offers: { '@type': 'Offer', price: '15000', priceCurrency: 'INR', priceSpecification: { '@type': 'PriceSpecification', minPrice: '15000', maxPrice: '50000', priceCurrency: 'INR' } },
        url: `${siteUrl}/services`,
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd schema={organizationSchema} />
      <JsonLd schema={websiteSchema} />
      <JsonLd schema={localBusinessSchema} />
      <JsonLd schema={faqSchema} />
      <JsonLd schema={servicesSchema} />
      <HeroSection />
      <StatsBar />
      <AIAgentsSection />
      <WebsiteServicesSection />
      <HowItWorks />
      <PortfolioSection />
      <TestimonialsSection />
      <PricingSection />
      <FAQSection />
      <CTASection />
      <LiveDemoWidget />
      <DemoPopup />
    </>
  );
}
