import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(' ');
}

export function formatIndianPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getWhatsAppUrl(phone: string, message?: string): string {
  const baseUrl = `https://wa.me/${phone}`;
  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }
  return baseUrl;
}

export const agentsData = [
  {
    id: 'customer-support',
    icon: '🤖',
    name: 'Customer Support Agent',
    description: 'Handle customer queries 24/7 with intelligent automation',
    features: [
      '24/7 auto replies',
      'FAQ handling & knowledge base',
      'Order tracking integration',
      'Complaint handling & escalation',
      'Lead collection',
      'Human handoff when needed',
      'Hindi + English support',
      'Website + WhatsApp integration',
    ],
    industries: ['eCommerce', 'Retail', 'SaaS', 'Healthcare'],
    priceRange: '₹20,000 - ₹50,000',
    setupTime: '3-5 days',
    category: 'Support',
  },
  {
    id: 'whatsapp-business',
    icon: '💬',
    name: 'WhatsApp Business Agent',
    description: 'Convert WhatsApp into your 24/7 sales & support channel',
    features: [
      'Auto reply to messages',
      'Order taking via WhatsApp',
      'Payment link generation',
      'Invoice sending',
      'Broadcast messages',
      'Product catalog sharing',
      'Customer follow-ups',
      'Multi-language support',
    ],
    industries: ['Retail', 'Restaurant', 'Services', 'D2C Brands'],
    priceRange: '₹20,000 - ₹60,000',
    setupTime: '2-3 days',
    category: 'Support',
  },
  {
    id: 'sales-lead',
    icon: '📈',
    name: 'Sales & Lead Agent',
    description: 'Qualify leads and book appointments automatically',
    features: [
      'Lead qualification',
      'Appointment booking',
      'Follow-up sequences',
      'CRM integration',
      'Lead scoring',
      'Pipeline management',
      'Email + WhatsApp outreach',
      'Analytics dashboard',
    ],
    industries: ['Real Estate', 'EdTech', 'SaaS', 'Consulting'],
    priceRange: '₹30,000 - ₹80,000',
    setupTime: '5-7 days',
    category: 'Sales',
  },
  {
    id: 'meeting-ai',
    icon: '🎙️',
    name: 'Meeting AI Agent',
    description: 'Auto-transcribe and summarize your meetings',
    features: [
      'Joins Teams/Zoom meetings',
      'Transcribes Hindi + English',
      'AI-powered summaries',
      'Action items extraction',
      'Sends meeting report',
      'Speaker identification',
      'Searchable transcripts',
      'CRM sync',
    ],
    industries: ['Corporates', 'Consulting Firms', 'IT Companies'],
    priceRange: '₹30,000 - ₹1,50,000',
    setupTime: '3-5 days',
    category: 'Productivity',
  },
  {
    id: 'ecommerce-shopping',
    icon: '🛒',
    name: 'eCommerce Shopping Agent',
    description: 'Boost sales with AI-powered shopping assistance',
    features: [
      'Product recommendations',
      'Order tracking',
      'Cart abandonment recovery',
      'Upselling & cross-selling',
      'Size & variant assistance',
      'Return & exchange handling',
      'Inventory updates',
      'Personalized offers',
    ],
    industries: ['Fashion', 'Electronics', 'D2C', 'Grocery'],
    priceRange: '₹25,000 - ₹1,00,000',
    setupTime: '5-7 days',
    category: 'eCommerce',
  },
  {
    id: 'email-marketing',
    icon: '📧',
    name: 'Email Marketing Agent',
    description: 'Automate your entire email marketing pipeline',
    features: [
      'Automated email sequences',
      'Lead nurturing campaigns',
      'Campaign management',
      'A/B testing',
      'Analytics & reporting',
      'Segmentation',
      'Trigger-based emails',
      'Template library',
    ],
    industries: ['Any Business with Email List'],
    priceRange: '₹10,000 - ₹40,000',
    setupTime: '2-3 days',
    category: 'Marketing',
  },
  {
    id: 'content-writing',
    icon: '✍️',
    name: 'Content Writing Agent',
    description: 'Generate quality content at scale in Hindi & English',
    features: [
      'Blog writing',
      'Social media posts',
      'SEO-optimized content',
      'Product descriptions',
      'Hindi + English content',
      'Brand voice consistency',
      'Bulk content generation',
      'Content calendar management',
    ],
    industries: ['Any Business Needing Content'],
    priceRange: '₹10,000 - ₹30,000/month',
    setupTime: '1-2 days',
    category: 'Marketing',
  },
  {
    id: 'industry-specific',
    icon: '🏥',
    name: 'Industry Specific Agent',
    description: 'Custom AI agents built for your specific industry',
    features: [
      'Hospital: appointment booking & doctor info',
      'Real Estate: property search & site visits',
      'Restaurant: table booking & ordering',
      'School: admissions & fee enquiry',
      'Gym: membership & class scheduling',
      'Custom workflows',
      'Industry-specific integrations',
      'Regulatory compliance',
    ],
    industries: ['Hospital', 'Real Estate', 'Restaurant', 'School', 'Gym'],
    priceRange: '₹50,000 - ₹2,00,000',
    setupTime: '7-14 days',
    category: 'Industry',
    subTypes: [
      { name: 'Hospital Agent', features: ['Appointment booking', 'Doctor info', 'Reports access', 'Medicine reminders'] },
      { name: 'Real Estate Agent', features: ['Property search', 'Site visit booking', 'EMI calculator', 'Document checklist'] },
      { name: 'Restaurant Agent', features: ['Table booking', 'Digital menu', 'Online ordering', 'Feedback collection'] },
      { name: 'School Agent', features: ['Admission enquiry', 'Fee information', 'Results access', 'Event updates'] },
      { name: 'Gym Agent', features: ['Membership plans', 'Class scheduling', 'Trainer booking', 'Progress tracking'] },
    ],
  },
];

export const testimonialsData = [
  {
    id: '1',
    name: 'Rajesh Sharma',
    company: 'TechMart India',
    role: 'Founder & CEO',
    content: 'NexaWeb built us a WhatsApp agent that handles 200+ customer queries daily. Our support cost dropped by 60% and customer satisfaction went up. Excellent work!',
    rating: 5,
  },
  {
    id: '2',
    name: 'Priya Patel',
    company: 'HealthFirst Clinic',
    role: 'Operations Manager',
    content: 'The hospital appointment agent they built is amazing. Patients can book, reschedule and get reminders automatically. We save 4 hours of staff time every day.',
    rating: 5,
  },
  {
    id: '3',
    name: 'Amit Kumar',
    company: 'RealSpace Properties',
    role: 'Sales Director',
    content: 'Our real estate AI agent qualifies leads 24/7 and books site visits. Conversion rate improved by 40%. NexaWeb team is professional and delivers on time.',
    rating: 5,
  },
];

export const portfolioData = [
  {
    id: '1',
    title: 'TechMart Customer Support Bot',
    category: 'AI Agent',
    imageUrl: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=80',
    techStack: ['Next.js', 'Anthropic', 'WhatsApp API', 'Supabase'],
    description: 'AI customer support agent handling 200+ daily queries for a D2C eCommerce brand.',
    featured: true,
  },
  {
    id: '2',
    title: 'HealthFirst Hospital Portal',
    category: 'AI Agent',
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
    techStack: ['React', 'Node.js', 'AI Scheduling', 'SMS API'],
    description: 'Appointment booking and patient management system for a 50-doctor clinic.',
    featured: true,
  },
  {
    id: '3',
    title: 'RealSpace Properties Website',
    category: 'eCommerce',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
    techStack: ['Next.js', 'Tailwind', 'Supabase', 'Google Maps'],
    description: 'Property listing website with AI chatbot for lead qualification and site visit booking.',
    featured: true,
  },
  {
    id: '4',
    title: 'FreshBite Restaurant App',
    category: 'Business',
    imageUrl: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80',
    techStack: ['Next.js', 'Tailwind', 'WhatsApp Bot', 'Razorpay'],
    description: 'Full restaurant website with WhatsApp ordering bot and table booking system.',
    featured: false,
  },
  {
    id: '5',
    title: 'EduSpark Learning Platform',
    category: 'Business',
    imageUrl: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=600&q=80',
    techStack: ['Next.js', 'Supabase Auth', 'AI Agent', 'Razorpay'],
    description: 'EdTech platform with AI admission agent and automated fee collection.',
    featured: false,
  },
  {
    id: '6',
    title: 'FitLife Gym Management',
    category: 'Landing Page',
    imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80',
    techStack: ['Next.js', 'Framer Motion', 'AI Chatbot', 'Payment API'],
    description: 'Modern gym website with AI membership agent and class booking system.',
    featured: false,
  },
];

export const faqData = [
  {
    question: 'How long does it take to build an AI agent?',
    answer: 'Most AI agents are ready in 2-7 days depending on complexity. A basic customer support agent takes 2-3 days, while industry-specific agents with custom integrations can take 7-14 days. We follow a clear timeline and keep you updated throughout.',
  },
  {
    question: 'What languages do your AI agents support?',
    answer: 'All our AI agents support both Hindi and English natively. The agent automatically detects the language the customer is using and responds accordingly. We can also add support for other regional languages like Marathi, Tamil, or Gujarati on request.',
  },
  {
    question: 'Do I need technical knowledge to use the AI agent?',
    answer: 'Not at all! We handle the entire setup, training, and deployment. You just need to provide us with your business information, FAQs, and products/services. We\'ll set everything up and provide a simple dashboard to monitor performance.',
  },
  {
    question: 'Which platforms does the AI agent work on?',
    answer: 'Our agents work on your website (chat widget), WhatsApp Business, Instagram DMs, and Facebook Messenger. We recommend starting with website + WhatsApp for maximum coverage. Additional platforms can be added anytime.',
  },
  {
    question: 'What happens if the AI agent can\'t answer a question?',
    answer: 'We build a smart human handoff system. If the AI cannot answer confidently, it politely notifies the customer and immediately transfers the conversation to your team via WhatsApp notification. You never miss an important query.',
  },
  {
    question: 'Is there a monthly fee after setup?',
    answer: 'The setup is a one-time cost. There is a small monthly maintenance fee starting at ₹2,000/month which covers AI model costs, monitoring, updates, and support. Enterprise clients get custom pricing with dedicated support.',
  },
];

export const blogPostsData = [
  {
    id: '1',
    title: 'How AI Agents Are Transforming Customer Support in India',
    slug: 'ai-agents-transforming-customer-support-india',
    excerpt: 'Indian businesses are saving lakhs by automating customer support with AI. Here\'s everything you need to know.',
    content: '',
    category: 'AI Agents',
    imageUrl: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80',
    publishedAt: '2024-12-15',
    author: 'NexaWeb Team',
    readTime: 6,
  },
  {
    id: '2',
    title: 'WhatsApp Business API: Complete Guide for Indian Businesses (2024)',
    slug: 'whatsapp-business-api-guide-india-2024',
    excerpt: 'Everything you need to know about WhatsApp Business API — pricing, setup, and how to automate it with AI.',
    content: '',
    category: 'AI Agents',
    imageUrl: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80',
    publishedAt: '2024-12-10',
    author: 'NexaWeb Team',
    readTime: 8,
  },
  {
    id: '3',
    title: 'Next.js vs WordPress: Which is Better for Your Business Website in 2024?',
    slug: 'nextjs-vs-wordpress-business-website-2024',
    excerpt: 'We compare the two most popular platforms for business websites. Speed, SEO, cost, and scalability breakdown.',
    content: '',
    category: 'Web Design',
    imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&q=80',
    publishedAt: '2024-12-05',
    author: 'NexaWeb Team',
    readTime: 7,
  },
  {
    id: '4',
    title: 'Case Study: How We Built a Lead Agent That Generated 300+ Leads/Month',
    slug: 'case-study-lead-agent-300-leads-month',
    excerpt: 'A detailed breakdown of how our Sales AI Agent helped a real estate company automate lead generation.',
    content: '',
    category: 'Case Studies',
    imageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    publishedAt: '2024-11-28',
    author: 'NexaWeb Team',
    readTime: 10,
  },
  {
    id: '5',
    title: '7 Ways to Automate Your Small Business Operations with AI',
    slug: '7-ways-automate-small-business-ai',
    excerpt: 'From customer support to invoicing — here are 7 practical ways to use AI agents in your business today.',
    content: '',
    category: 'Business Tips',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80',
    publishedAt: '2024-11-20',
    author: 'NexaWeb Team',
    readTime: 5,
  },
  {
    id: '6',
    title: 'Website Design Trends for Indian Businesses in 2025',
    slug: 'website-design-trends-india-2025',
    excerpt: 'Dark mode, AI chatbots, micro-animations — the top web design trends that Indian businesses should adopt.',
    content: '',
    category: 'Web Design',
    imageUrl: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    publishedAt: '2024-11-15',
    author: 'NexaWeb Team',
    readTime: 6,
  },
];
