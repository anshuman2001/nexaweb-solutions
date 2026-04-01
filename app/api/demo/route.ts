import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const SYSTEM_PROMPT = `You are a helpful AI customer support agent for NexaWeb Solutions, an Indian company that builds AI agents and professional websites.

About NexaWeb Solutions:
- 8 AI agent types: Customer Support, WhatsApp Business, Sales & Lead, Meeting AI, eCommerce Shopping, Email Marketing, Content Writing, Industry-Specific
- AI agents: ₹15,000 - ₹2,00,000 depending on complexity
- Websites: Landing Pages (₹8,000+), Business (₹15,000+), eCommerce (₹25,000+)
- Hindi + English support in all agents
- Setup: 2-14 days
- WhatsApp: +91 99999 99999

Rules:
- Keep replies concise (2-3 sentences)
- Respond in the same language the user writes in (Hindi or English)
- Always suggest WhatsApp for faster support
- Be warm and helpful`;

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json();
    if (!message?.trim()) return NextResponse.json({ error: 'Message is required' }, { status: 400 });

    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json({
        reply: "Hi! I'm NexaWeb's AI assistant. We build AI agents from ₹15,000 and websites from ₹8,000. WhatsApp us at +91 99999 99999 for a free demo! 🚀"
      });
    }

    const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
    const response = await client.messages.create({
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages: [{ role: 'user', content: message }],
    });

    const reply = response.content[0].type === 'text'
      ? response.content[0].text
      : 'Please WhatsApp us at +91 99999 99999 for instant help!';

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Demo API error:', error);
    return NextResponse.json({
      reply: "Namaste! 🙏 Having a brief issue. Please WhatsApp us at +91 99999 99999 for instant help!"
    });
  }
}
