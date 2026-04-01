import { NextRequest, NextResponse } from 'next/server';
import { getServiceRoleClient } from '@/lib/supabase';
import { sendContactNotification } from '@/lib/resend';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, service, budget, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Name, email, and message are required.' }, { status: 400 });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Invalid email address.' }, { status: 400 });
    }

    // Save to Supabase (non-fatal)
    try {
      const supabaseAdmin = getServiceRoleClient();
      await supabaseAdmin.from('contacts').insert([{ name, email, phone, service, budget, message }]);
    } catch (dbError) {
      console.error('DB error (non-fatal):', dbError);
    }

    // Send emails
    await sendContactNotification({ name, email, phone, service, budget, message });

    return NextResponse.json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json({ error: 'Internal server error.' }, { status: 500 });
  }
}
