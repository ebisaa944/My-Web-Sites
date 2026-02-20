import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function contactHandler(req, res) {
  // Enable CORS (no credentials required)
  res.setHeader('Access-Control-Allow-Origin', process.env.ALLOWED_ORIGIN || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  // Handle OPTIONS request for CORS
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ error: 'Server email configuration is missing (RESEND_API_KEY).' });
    }

    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { name, email, subject, message } = payload || {};

    // Basic validation
    if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM || 'Portfolio Contact <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO || 'ebisaachame123@gmail.com'],
      reply_to: email.trim(),
      subject: `Portfolio Message: ${subject}`,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ error: error.message || 'Failed to send email' });
    }

    res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully!',
      data 
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
