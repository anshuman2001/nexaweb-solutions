'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, MessageCircle } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// ─── NexaWeb Custom Sales Agent ───────────────────────────
type Stage = 'greeting' | 'name' | 'service' | 'budget' | 'timeline' | 'contact' | 'done';

interface Lead {
  name?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  contact?: string;
}

const SERVICES: Record<string, string> = {
  website: 'Website Development',
  site: 'Website Development',
  web: 'Website Development',
  ecommerce: 'eCommerce Development',
  'e-commerce': 'eCommerce Development',
  shop: 'eCommerce Development',
  store: 'eCommerce Development',
  ai: 'AI Solutions / Automation',
  agent: 'AI Solutions / Automation',
  chatbot: 'AI Solutions / Automation',
  bot: 'AI Solutions / Automation',
  automation: 'AI Solutions / Automation',
  whatsapp: 'WhatsApp AI Agent',
  app: 'App Development',
  mobile: 'App Development',
  seo: 'SEO / Digital Marketing',
  marketing: 'SEO / Digital Marketing',
  digital: 'SEO / Digital Marketing',
  design: 'UI/UX Design',
  ui: 'UI/UX Design',
  logo: 'UI/UX Design',
};

const SERVICE_DETAILS: Record<string, string> = {
  'Website Development': '🌐 We build fast, SEO-optimised websites starting from ₹8,000.\n✅ Landing Page: ₹8,000+\n✅ Business Website: ₹15,000+\n✅ Delivered in 5–10 days',
  'eCommerce Development': '🛒 Full eCommerce stores with payments & inventory.\n✅ Starting ₹25,000\n✅ Razorpay / Paytm integration\n✅ Delivered in 7–14 days',
  'AI Solutions / Automation': '🤖 Custom AI agents for your business.\n✅ Customer Support AI: ₹20,000+\n✅ Sales & Lead Agent: ₹30,000+\n✅ Hindi + English support',
  'WhatsApp AI Agent': '💬 Turn WhatsApp into your 24/7 sales channel.\n✅ Auto reply, order taking, payment links\n✅ Starting ₹20,000\n✅ Ready in 2–3 days',
  'App Development': '📱 Mobile apps for Android & iOS.\n✅ Starting ₹50,000\n✅ React Native / Flutter\n✅ Timeline: 4–8 weeks',
  'SEO / Digital Marketing': '📈 Rank on Google & grow your business online.\n✅ SEO starting ₹8,000/month\n✅ Google Ads, Meta Ads setup\n✅ Monthly performance reports',
  'UI/UX Design': '🎨 Beautiful, conversion-focused designs.\n✅ Starting ₹10,000\n✅ Figma prototypes included\n✅ Delivered in 3–5 days',
};

function detectService(text: string): string | null {
  const lower = text.toLowerCase();
  for (const [keyword, service] of Object.entries(SERVICES)) {
    if (lower.includes(keyword)) return service;
  }
  return null;
}

function detectBudget(text: string): string | null {
  const lower = text.toLowerCase();
  if (lower.includes('15000') || lower.includes('15,000') || lower.includes('15k') || lower.includes('under 20')) return 'Under ₹20,000';
  if (lower.includes('20000') || lower.includes('20k') || lower.includes('20,000')) return '₹20,000 – ₹40,000';
  if (lower.includes('50000') || lower.includes('50k') || lower.includes('50,000')) return '₹40,000 – ₹80,000';
  if (lower.includes('1 lakh') || lower.includes('100000') || lower.includes('1l')) return '₹1,00,000+';
  if (lower.match(/\d{4,}/)) return `₹${text.match(/\d+/)?.[0]}+`;
  if (lower.includes('sure') || lower.includes('pata nahi') || lower.includes('nahi')) return 'Not sure yet';
  return null;
}

function getAgentReply(stage: Stage, userText: string, lead: Lead): { reply: string; nextStage: Stage; updatedLead: Lead } {
  const lower = userText.toLowerCase().trim();
  let updatedLead = { ...lead };

  // Greetings
  if (stage === 'greeting') {
    const isHindi = /[^\u0000-\u007F]/.test(userText) || lower.includes('namaste') || lower.includes('helo') || lower.includes('kya');
    if (isHindi) {
      return {
        reply: `Namaste! 🙏 Main NexaWeb Solutions ka AI Sales Assistant hoon.\nAapki business ke liye sahi solution dhundne mein help karunga!\n\nPehle, aapka naam kya hai? 😊`,
        nextStage: 'name',
        updatedLead,
      };
    }
    return {
      reply: `Hi there! 👋 I'm NexaWeb's AI Sales Assistant.\nI help businesses grow with AI agents & professional websites!\n\nMay I know your name to get started? 😊`,
      nextStage: 'name',
      updatedLead,
    };
  }

  if (stage === 'name') {
    updatedLead.name = userText.trim().split(' ')[0];
    const detectedService = detectService(userText);
    if (detectedService) {
      updatedLead.service = detectedService;
      return {
        reply: `Nice to meet you, ${updatedLead.name}! 🎉\n\n${SERVICE_DETAILS[detectedService]}\n\nWhat's your approximate budget for this project?`,
        nextStage: 'budget',
        updatedLead,
      };
    }
    return {
      reply: `Nice to meet you, ${updatedLead.name}! 😊\n\nWhat kind of service are you looking for?\n\n1️⃣ Website / eCommerce\n2️⃣ AI Agent / WhatsApp Bot\n3️⃣ SEO / Digital Marketing\n4️⃣ App Development\n5️⃣ UI/UX Design`,
      nextStage: 'service',
      updatedLead,
    };
  }

  if (stage === 'service') {
    let service = detectService(userText);
    if (!service) {
      if (lower.includes('1')) service = 'Website Development';
      else if (lower.includes('2')) service = 'AI Solutions / Automation';
      else if (lower.includes('3')) service = 'SEO / Digital Marketing';
      else if (lower.includes('4')) service = 'App Development';
      else if (lower.includes('5')) service = 'UI/UX Design';
    }
    if (!service) {
      return {
        reply: `Please choose from:\n1️⃣ Website / eCommerce\n2️⃣ AI Agent / WhatsApp Bot\n3️⃣ SEO / Marketing\n4️⃣ App Development\n5️⃣ UI/UX Design\n\nJust type the number or keyword! 😊`,
        nextStage: 'service',
        updatedLead,
      };
    }
    updatedLead.service = service;
    return {
      reply: `Great choice! 🚀\n\n${SERVICE_DETAILS[service]}\n\nWhat's your approximate budget for this?`,
      nextStage: 'budget',
      updatedLead,
    };
  }

  if (stage === 'budget') {
    const budget = detectBudget(userText) || userText.trim();
    updatedLead.budget = budget;
    return {
      reply: `Got it! Budget: ${budget} ✅\n\nWhat's your expected timeline?\n⚡ ASAP (within 1 week)\n📅 1–2 weeks\n🗓️ 1 month\n🔜 No rush`,
      nextStage: 'timeline',
      updatedLead,
    };
  }

  if (stage === 'timeline') {
    updatedLead.timeline = userText.trim();
    return {
      reply: `Perfect! 📋 Almost done...\n\nLastly, your WhatsApp number or email so our team can reach you? 📱`,
      nextStage: 'contact',
      updatedLead,
    };
  }

  if (stage === 'contact') {
    updatedLead.contact = userText.trim();
    return {
      reply: `🎉 Thank you, ${updatedLead.name || 'there'}!\n\nYour details have been noted:\n📌 Service: ${updatedLead.service}\n💰 Budget: ${updatedLead.budget}\n⏱️ Timeline: ${updatedLead.timeline}\n📞 Contact: ${updatedLead.contact}\n\nOur team will reach you within **2 hours**! ✅\n\nYou can also WhatsApp us directly:\n👉 +91 99977 30768`,
      nextStage: 'done',
      updatedLead,
    };
  }

  if (stage === 'done') {
    return {
      reply: `We've already noted your details! 😊\nOur team will contact you shortly.\n\nFor immediate help, WhatsApp us:\n👉 +91 99977 30768`,
      nextStage: 'done',
      updatedLead,
    };
  }

  return {
    reply: `Hi! I'm NexaWeb's AI Assistant. How can I help you today? 😊`,
    nextStage: 'greeting',
    updatedLead,
  };
}
// ──────────────────────────────────────────────────────────

export default function LiveDemoWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Namaste! 🙏 I'm NexaWeb's AI Sales Assistant.\nI'm here to help you find the right solution for your business!\n\nMay I know your name to get started? 😊" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState<Stage>('name');
  const [lead, setLead] = useState<Lead>({});
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    // Small delay for natural feel
    await new Promise(r => setTimeout(r, 600));

    const { reply, nextStage, updatedLead } = getAgentReply(stage, userMsg, lead);
    setStage(nextStage);
    setLead(updatedLead);
    setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    setLoading(false);
  };

  return (
    <>
      {/* Chat Panel */}
      <div className="fixed bottom-28 right-4 z-30 flex flex-col items-end">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              className="w-[300px] sm:w-[340px] bg-surface border border-border-subtle rounded-2xl shadow-2xl shadow-black/60 overflow-hidden mb-3"
              style={{ maxHeight: '420px' }}
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 flex items-center gap-2.5 flex-shrink-0">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-bold text-sm leading-none">NexaWeb AI</p>
                  <p className="text-blue-200 text-[11px] mt-0.5">Sales & Support Agent 🟢</p>
                </div>
              </div>

              {/* Messages */}
              <div className="overflow-y-auto p-4 space-y-3 bg-background/60" style={{ height: '260px' }}>
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'gap-2 items-start'}`}>
                    {m.role === 'assistant' && (
                      <div className="w-6 h-6 rounded-full bg-accent-blue/20 flex-shrink-0 flex items-center justify-center mt-0.5">
                        <Bot className="w-3.5 h-3.5 text-accent-blue" />
                      </div>
                    )}
                    <div className={`max-w-[82%] px-3 py-2 rounded-xl text-sm whitespace-pre-line leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-accent-blue text-white rounded-tr-sm'
                        : 'bg-surface text-gray-300 rounded-tl-sm border border-border-subtle'
                    }`}>
                      {m.content.replace(/\*\*(.*?)\*\*/g, '$1')}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex gap-2 items-start">
                    <div className="w-6 h-6 rounded-full bg-accent-blue/20 flex-shrink-0 flex items-center justify-center">
                      <Bot className="w-3.5 h-3.5 text-accent-blue" />
                    </div>
                    <div className="bg-surface border border-border-subtle px-4 py-3 rounded-xl rounded-tl-sm">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={bottomRef} />
              </div>

              {/* Input */}
              <div className="p-3 border-t border-border-subtle flex-shrink-0 bg-surface">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && sendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 bg-background border border-border-subtle rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent-blue transition-colors"
                  />
                  <button
                    onClick={sendMessage}
                    disabled={loading || !input.trim()}
                    className="w-9 h-9 rounded-xl bg-accent-blue flex items-center justify-center text-white disabled:opacity-40 hover:bg-blue-500 transition-all flex-shrink-0"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-center text-[10px] text-gray-600 mt-1.5">Powered by NexaWeb AI · No API needed</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Toggle Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2 }}
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-surface border border-accent-blue/30 shadow-xl hover:border-accent-blue/60 transition-all group"
        >
          <div className="w-8 h-8 rounded-full bg-accent-blue flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            {isOpen ? <X className="w-4 h-4 text-white" /> : <MessageCircle className="w-4 h-4 text-white" />}
          </div>
          <div className="text-left">
            <p className="font-semibold text-sm leading-none mb-0.5 text-white">
              {isOpen ? 'Close Chat' : 'Chat with AI Agent'}
            </p>
            <p className="text-gray-400 text-xs">{isOpen ? 'Click to close' : 'Get instant answers →'}</p>
          </div>
        </motion.button>
      </div>
    </>
  );
}
