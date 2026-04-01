export interface Agent {
  id: string;
  icon: string;
  name: string;
  description: string;
  features: string[];
  industries: string[];
  priceRange: string;
  setupTime: string;
  category: string;
  subTypes?: SubType[];
}

export interface SubType {
  name: string;
  features: string[];
}

export interface Service {
  id: string;
  name: string;
  description: string;
  features: string[];
  priceRange: string;
  timeline: string;
  techStack: string[];
  icon: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  techStack: string[];
  liveUrl?: string;
  description: string;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  company: string;
  role: string;
  content: string;
  rating: number;
  avatar?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  imageUrl: string;
  publishedAt: string;
  author: string;
  readTime: number;
}

export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  popular?: boolean;
  cta: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
}

export interface DemoRequest {
  name: string;
  email: string;
  phone: string;
  agentType: string;
  company: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface Client {
  id: string;
  userId: string;
  companyName: string;
  projectName: string;
  status: 'in_progress' | 'completed' | 'review' | 'on_hold';
  progress: number;
  createdAt: string;
}

export interface Invoice {
  id: string;
  clientId: string;
  amount: number;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  description: string;
  createdAt: string;
}
