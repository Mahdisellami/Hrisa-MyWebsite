// Quick test script for Resend API
const { Resend } = require('resend');

const resend = new Resend('re_acpfkyF9_NznUSqjVYyWQb4mfMZ8Kbe8P');

async function testResend() {
  try {
    console.log('Testing Resend API connection...\n');

    const { data, error } = await resend.emails.send({
      from: 'Janette <onboarding@resend.dev>',
      to: 'mahdi.sellami.95@gmail.com',
      subject: 'Test Email from Janette',
      html: '<p>This is a test email to verify Resend is working!</p>',
    });

    if (error) {
      console.error('❌ Resend Error:', error);
      process.exit(1);
    }

    console.log('✅ Email sent successfully!');
    console.log('Email ID:', data.id);
    console.log('\nCheck your inbox: mahdi.sellami.95@gmail.com');
  } catch (error) {
    console.error('❌ Connection Error:', error);
    console.error('\nPossible issues:');
    console.error('- Network/firewall blocking Resend API');
    console.error('- DNS resolution issue');
    console.error('- API key invalid or revoked');
    process.exit(1);
  }
}

testResend();
