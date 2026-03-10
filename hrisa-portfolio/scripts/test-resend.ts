#!/usr/bin/env tsx
/**
 * Test Resend API connection
 */
import { Resend } from 'resend';

const RESEND_API_KEY = process.env.RESEND_API_KEY;

async function testResend() {
  if (!RESEND_API_KEY) {
    console.error('❌ RESEND_API_KEY not set');
    process.exit(1);
  }

  console.log('🔍 Testing Resend API connection...\n');

  try {
    const resend = new Resend(RESEND_API_KEY);

    // Test with a dry run - just check if we can authenticate
    console.log('✅ Resend client initialized');
    console.log(`   API Key: ${RESEND_API_KEY.slice(0, 10)}...${RESEND_API_KEY.slice(-5)}`);

    // Try to send a test email (to yourself)
    const testEmail = process.argv[2] || 'mahdi.sellami.95@gmail.com';

    console.log(`\n📧 Attempting to send test email to: ${testEmail}`);

    const { data, error } = await resend.emails.send({
      from: 'Hrisa Portfolio <onboarding@resend.dev>',
      to: testEmail,
      subject: 'Test Email from Hrisa Portfolio',
      html: '<p>This is a test email to verify Resend API is working correctly.</p>',
    });

    if (error) {
      console.error('❌ Resend API error:', error);
      process.exit(1);
    }

    console.log('✅ Email sent successfully!');
    console.log(`   Email ID: ${data?.id}`);

  } catch (error: any) {
    console.error('❌ Failed to send email:', error.message || error);
    process.exit(1);
  }
}

testResend();
