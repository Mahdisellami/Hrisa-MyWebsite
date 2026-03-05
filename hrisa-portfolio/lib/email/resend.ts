import { Resend } from 'resend';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

if (!process.env.RESEND_API_KEY) {
  console.warn('⚠️  RESEND_API_KEY not set. Email functionality will not work.');
}

// Provide a dummy key during build, actual key used at runtime
export const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build');

// Using Resend's onboarding domain for testing
// TODO: Update to 'Hrisa Portfolio <noreply@hrisa.tech>' after verifying domain
export const FROM_EMAIL = 'Hrisa Portfolio <onboarding@resend.dev>';

/**
 * Send magic link email
 */
export async function sendMagicLinkEmail(
  to: string,
  magicLink: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Workaround: Use curl since Node.js fetch has network issues
    const payload = JSON.stringify({
      from: FROM_EMAIL,
      to,
      subject: 'Your Magic Link to Hrisa Portfolio',
      html: renderMagicLinkEmail(magicLink),
    });

    const command = `curl -s -X POST "https://api.resend.com/emails" \\
      -H "Authorization: Bearer ${process.env.RESEND_API_KEY}" \\
      -H "Content-Type: application/json" \\
      -d '${payload.replace(/'/g, "'\\''")}'`;

    const { stdout, stderr } = await execAsync(command);

    if (stderr) {
      console.error('Resend error:', stderr);
      return { success: false, error: 'Failed to send email' };
    }

    const response = JSON.parse(stdout);
    if (response.id) {
      console.log('Email sent successfully:', response.id);
      return { success: true };
    } else if (response.message) {
      console.error('Resend error:', response);
      return { success: false, error: response.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Failed to send email:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send registration request notification to admin
 */
export async function sendRegistrationRequestEmail(
  adminEmail: string,
  userEmail: string,
  userName: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: adminEmail,
        subject: `New Access Request from ${userName}`,
        html: renderRegistrationRequestEmail(userEmail, userName),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Resend error:', errorData);
      return { success: false, error: errorData.message || 'Failed to send email' };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Failed to send email:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send registration approval email
 */
export async function sendRegistrationApprovedEmail(
  to: string,
  name: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: 'Welcome to Hrisa Portfolio - Access Approved!',
      html: renderRegistrationApprovedEmail(name, baseUrl),
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Failed to send email:', error);
    return { success: false, error: error.message };
  }
}

/**
 * Send registration rejection email
 */
export async function sendRegistrationRejectedEmail(
  to: string,
  name: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { data, error } = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject: 'Hrisa Portfolio Access Request Update',
      html: renderRegistrationRejectedEmail(name),
    });

    if (error) {
      console.error('Resend error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (error: any) {
    console.error('Failed to send email:', error);
    return { success: false, error: error.message };
  }
}

// Email templates (simple HTML for now)

function renderMagicLinkEmail(magicLink: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #f94f3d 0%, #d64027 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .header h1 { color: white; margin: 0; font-size: 32px; }
          .content { background: white; padding: 40px 20px; }
          .button { display: inline-block; padding: 16px 32px; background: #f94f3d; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; }
          .footer { background: #f9f6f1; padding: 20px; text-align: center; color: #826951; font-size: 12px; border-radius: 0 0 8px 8px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Hrisa Portfolio</h1>
          </div>
          <div class="content">
            <h2 style="color: #382c22; margin-bottom: 20px;">Your Magic Link</h2>
            <p style="color: #6a5644; font-size: 16px;">Click the button below to sign in to your account. This link will expire in 15 minutes.</p>
            <div style="text-align: center; margin: 40px 0;">
              <a href="${magicLink}" class="button">Sign In</a>
            </div>
            <p style="color: #9d8160; font-size: 14px;">If you didn't request this link, you can safely ignore this email.</p>
          </div>
          <div class="footer">
            <p style="margin: 0;">© 2026 Hrisa Portfolio. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function renderRegistrationRequestEmail(userEmail: string, userName: string): string {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000';

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #382c22; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .header h1 { color: white; margin: 0; font-size: 32px; }
          .content { background: white; padding: 40px 20px; border: 1px solid #e0d5c7; }
          .button { display: inline-block; padding: 16px 32px; background: #f94f3d; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; }
          .info { background: #f9f6f1; padding: 15px; border-left: 4px solid #f94f3d; margin: 20px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 New Access Request</h1>
          </div>
          <div class="content">
            <h2 style="color: #382c22;">Someone wants to access your portfolio</h2>
            <div class="info">
              <p style="margin: 5px 0;"><strong>Name:</strong> ${userName}</p>
              <p style="margin: 5px 0;"><strong>Email:</strong> ${userEmail}</p>
            </div>
            <p>Please review and approve or reject this request from your admin panel.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="${baseUrl}/admin/users/pending" class="button">Review Request</a>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
}

function renderRegistrationApprovedEmail(name: string, baseUrl: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #4caf50 0%, #45a049 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .header h1 { color: white; margin: 0; font-size: 32px; }
          .content { background: white; padding: 40px 20px; }
          .button { display: inline-block; padding: 16px 32px; background: #f94f3d; color: white; text-decoration: none; border-radius: 8px; font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>✅ Access Approved!</h1>
          </div>
          <div class="content">
            <h2 style="color: #382c22;">Welcome, ${name}!</h2>
            <p>Your access request has been approved. You can now explore the full Hrisa Portfolio.</p>
            <div style="text-align: center; margin: 40px 0;">
              <a href="${baseUrl}/login" class="button">Log In Now</a>
            </div>
            <p style="color: #6a5644;">Simply enter your email address and you'll receive a magic link to sign in.</p>
          </div>
        </div>
      </body>
    </html>
  `;
}

function renderRegistrationRejectedEmail(name: string): string {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #757575; padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .header h1 { color: white; margin: 0; font-size: 32px; }
          .content { background: white; padding: 40px 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Hrisa Portfolio</h1>
          </div>
          <div class="content">
            <h2 style="color: #382c22;">Access Request Update</h2>
            <p>Hi ${name},</p>
            <p>Thank you for your interest in accessing the Hrisa Portfolio. Unfortunately, we're unable to approve your request at this time.</p>
            <p>If you believe this is an error, please feel free to reach out directly.</p>
            <p style="color: #6a5644; margin-top: 30px;">Best regards,<br>Hrisa Portfolio Team</p>
          </div>
        </div>
      </body>
    </html>
  `;
}
