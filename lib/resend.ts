import { Resend } from 'resend';

export const resend = new Resend(process.env.RESEND_API_KEY);

export const FROM_EMAIL = 'NexaWeb Solutions <onboarding@resend.dev>';
export const OWNER_EMAIL = 'info.nexawebsolution@gmail.com';

export async function sendContactNotification(data: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  message: string;
}) {
  try {
    await resend.emails.send({
      from: FROM_EMAIL,
      to: OWNER_EMAIL,
      subject: `New Contact: ${data.name} - ${data.service || 'General Inquiry'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #07090f; color: #fff; padding: 32px; border-radius: 12px;">
          <h2 style="color: #2563eb; margin-bottom: 24px;">New Contact Form Submission</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #9ca3af; width: 120px;">Name:</td><td style="padding: 8px 0; font-weight: bold;">${data.name}</td></tr>
            <tr><td style="padding: 8px 0; color: #9ca3af;">Email:</td><td style="padding: 8px 0;">${data.email}</td></tr>
            <tr><td style="padding: 8px 0; color: #9ca3af;">Phone:</td><td style="padding: 8px 0;">${data.phone || 'Not provided'}</td></tr>
            <tr><td style="padding: 8px 0; color: #9ca3af;">Service:</td><td style="padding: 8px 0;">${data.service || 'Not specified'}</td></tr>
            <tr><td style="padding: 8px 0; color: #9ca3af;">Budget:</td><td style="padding: 8px 0;">${data.budget || 'Not specified'}</td></tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #0c0f1a; border-radius: 8px; border-left: 4px solid #2563eb;">
            <p style="color: #9ca3af; margin-bottom: 8px;">Message:</p>
            <p style="margin: 0;">${data.message}</p>
          </div>
        </div>
      `,
    });

    await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: 'We received your inquiry - NexaWeb Solutions',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #07090f; color: #fff; padding: 32px; border-radius: 12px;">
          <h2 style="color: #2563eb; margin-bottom: 16px;">Thank you, ${data.name}! 🙏</h2>
          <p style="color: #d1d5db; line-height: 1.6;">We've received your inquiry and will get back to you within <strong style="color: #10b981;">2 hours</strong>.</p>
          <p style="color: #d1d5db; line-height: 1.6;">In the meantime, feel free to WhatsApp us at <a href="https://wa.me/919997730768" style="color: #10b981;">+91 99977 30768</a> for faster response.</p>
          <div style="margin-top: 24px; padding: 20px; background: #0c0f1a; border-radius: 8px; text-align: center;">
            <p style="color: #9ca3af; margin-bottom: 12px;">Your inquiry details:</p>
            <p style="color: #fff; font-weight: bold;">${data.service || 'General Inquiry'}</p>
          </div>
          <p style="color: #6b7280; font-size: 14px; margin-top: 24px;">NexaWeb Solutions | AI Agents & Web Design | India</p>
        </div>
      `,
    });

    return { success: true };
  } catch (error) {
    console.error('Email error:', error);
    return { success: false, error };
  }
}
