'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Minimize2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function LiveDemoWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Namaste! 🙏 I'm NexaWeb's AI Sales Assistant. I'm here to help you find the right solution for your business!\n\nMay I know your name to get started? 😊" },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
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

    try {
      const res = await fetch('/api/demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, history: messages }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', content: data.reply || 'Sorry, something went wrong. Please try again.' }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Connection error. Please check your internet and try again.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-24 right-6 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="w-80 sm:w-96 bg-surface border border-border-subtle rounded-2xl shadow-2xl shadow-black/50 overflow-hidden mb-4"
          >
            {/* Header */}
            <div className="bg-accent-blue px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">NexaWeb AI</p>
                  <p className="text-blue-200 text-xs">Try our agent live!</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-3 bg-background/50">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'gap-2'}`}>
                  {m.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-full bg-accent-blue/20 flex-shrink-0 flex items-center justify-center mt-1">
                      <Bot className="w-3.5 h-3.5 text-accent-blue" />
                    </div>
                  )}
                  <div className={`max-w-[80%] px-3 py-2 rounded-xl text-sm ${m.role === 'user' ? 'bg-accent-blue text-white rounded-tr-sm' : 'bg-surface-2 text-gray-300 rounded-tl-sm border border-border-subtle'}`}>
                    {m.content}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full bg-accent-blue/20 flex-shrink-0 flex items-center justify-center">
                    <Bot className="w-3.5 h-3.5 text-accent-blue" />
                  </div>
                  <div className="bg-surface-2 border border-border-subtle px-4 py-3 rounded-xl rounded-tl-sm">
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
            <div className="p-3 border-t border-border-subtle">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-background border border-border-subtle rounded-xl px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-accent-blue transition-colors"
                />
                <button
                  onClick={sendMessage}
                  disabled={loading || !input.trim()}
                  className="w-9 h-9 rounded-xl bg-accent-blue flex items-center justify-center text-white disabled:opacity-50 hover:bg-blue-500 transition-all flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <p className="text-center text-xs text-gray-600 mt-2">Powered by NexaWeb AI</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      {!isOpen && (
        <motion.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-surface border border-accent-blue/30 text-white text-sm font-medium shadow-xl hover:border-accent-blue/60 transition-all group"
        >
          <div className="w-8 h-8 rounded-full bg-accent-blue flex items-center justify-center group-hover:scale-110 transition-transform">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div className="text-left">
            <p className="font-semibold text-sm leading-none mb-0.5">Try Our AI Agent Live!</p>
            <p className="text-gray-400 text-xs">Ask anything →</p>
          </div>
        </motion.button>
      )}
    </div>
  );
}
