#!/usr/bin/env tsx
/**
 * Generate a test magic link
 */
import { generateMagicLink } from '../lib/auth/magiclink.js';

const email = process.argv[2] || 'mahdi.sellami.95@gmail.com';

async function generateTestLink() {
  try {
    console.log('🔗 Generating test magic link for:', email);

    const magicLink = await generateMagicLink(email, 'test-script');
    const baseUrl = process.env.BASE_URL || 'https://janette.technology';
    const magicLinkUrl = `${baseUrl}/verify?token=${magicLink.token}`;

    console.log('\n✅ Magic link generated!');
    console.log('\n🔗 Click this link to test:');
    console.log(magicLinkUrl);
    console.log('\n⏰ Expires:', new Date(magicLink.expires_at * 1000).toLocaleString());

  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

generateTestLink();
