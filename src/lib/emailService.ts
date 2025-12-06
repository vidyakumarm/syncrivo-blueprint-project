import { supabase } from "@/integrations/supabase/client";

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

interface EmailResult {
  success: boolean;
  error?: string;
}

/**
 * Unified email service for all SyncRivo communications
 * Uses Hostinger SMTP via Supabase Edge Function
 */
export const emailService = {
  /**
   * Send an email using the configured SMTP service
   */
  async send(params: SendEmailParams): Promise<EmailResult> {
    try {
      const { data, error } = await supabase.functions.invoke('send-email', {
        body: params,
      });

      if (error) {
        console.error('Email service error:', error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: any) {
      console.error('Failed to send email:', err);
      return { success: false, error: err.message || 'Failed to send email' };
    }
  },

  /**
   * Send demo booking confirmation email
   */
  async sendDemoConfirmation(params: {
    to: string;
    firstName: string;
    lastName: string;
    companyName: string;
    selectedDate: string;
    selectedTime: string;
    demoType: string;
  }): Promise<EmailResult> {
    const { to, firstName, lastName, companyName, selectedDate, selectedTime, demoType } = params;
    
    const subject = "🎉 Your SyncRivo Enterprise Demo Is Confirmed";
    
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
        <div style="background: linear-gradient(135deg, #3b82f6 0%, #10b981 100%); padding: 30px; border-radius: 12px 12px 0 0; text-align: center;">
          <h1 style="color: white; margin: 0; font-size: 28px;">SyncRivo</h1>
          <p style="color: rgba(255,255,255,0.9); margin: 10px 0 0 0;">Enterprise Demo Confirmation</p>
        </div>
        
        <div style="background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; border-top: none;">
          <h2 style="color: #1e293b; margin-top: 0;">Hi ${firstName},</h2>
          
          <p>Thank you for booking an enterprise demo with SyncRivo! We're excited to show you how we can transform your team's communication.</p>
          
          <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #3b82f6;">📅 Your Demo Details</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Name:</td>
                <td style="padding: 8px 0; font-weight: 600;">${firstName} ${lastName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Company:</td>
                <td style="padding: 8px 0; font-weight: 600;">${companyName}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Date:</td>
                <td style="padding: 8px 0; font-weight: 600;">${selectedDate}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Time:</td>
                <td style="padding: 8px 0; font-weight: 600;">${selectedTime}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; color: #64748b;">Demo Type:</td>
                <td style="padding: 8px 0; font-weight: 600;">${demoType}</td>
              </tr>
            </table>
          </div>
          
          <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 15px; margin: 20px 0;">
            <p style="margin: 0; color: #166534;">
              <strong>📎 Meeting Link:</strong><br>
              A calendar invite with the meeting link will be sent to you shortly.
            </p>
          </div>
          
          <h3 style="color: #1e293b;">What to Expect</h3>
          <ul style="color: #475569;">
            <li>30-45 minute personalized session</li>
            <li>Live walkthrough of SyncRivo's enterprise features</li>
            <li>Q&A with our solutions team</li>
            <li>Custom pricing discussion for your organization</li>
          </ul>
          
          <p style="color: #64748b; font-size: 14px; margin-top: 30px;">
            Need to reschedule? Reply to this email or contact us at <a href="mailto:marketing@kxntech.com" style="color: #3b82f6;">marketing@kxntech.com</a>
          </p>
        </div>
        
        <div style="background: #1e293b; padding: 20px; border-radius: 0 0 12px 12px; text-align: center;">
          <p style="color: #94a3b8; margin: 0; font-size: 14px;">
            © ${new Date().getFullYear()} SyncRivo by KXN Tech. All rights reserved.
          </p>
        </div>
      </body>
      </html>
    `;

    const text = `
Hi ${firstName},

Thank you for booking an enterprise demo with SyncRivo!

YOUR DEMO DETAILS:
- Name: ${firstName} ${lastName}
- Company: ${companyName}
- Date: ${selectedDate}
- Time: ${selectedTime}
- Demo Type: ${demoType}

A calendar invite with the meeting link will be sent to you shortly.

What to Expect:
- 30-45 minute personalized session
- Live walkthrough of SyncRivo's enterprise features
- Q&A with our solutions team
- Custom pricing discussion for your organization

Need to reschedule? Reply to this email or contact us at marketing@kxntech.com

© ${new Date().getFullYear()} SyncRivo by KXN Tech
    `;

    return this.send({ to, subject, html, text });
  },

  /**
   * Send password reset email
   */
  async sendPasswordReset(params: { to: string; resetLink: string }): Promise<EmailResult> {
    const { to, resetLink } = params;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px;">
        <div style="max-width: 500px; margin: 0 auto;">
          <h1 style="color: #3b82f6;">Reset Your Password</h1>
          <p>You requested to reset your SyncRivo password. Click the button below to proceed:</p>
          <a href="${resetLink}" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Reset Password</a>
          <p style="color: #666; font-size: 14px;">If you didn't request this, please ignore this email.</p>
        </div>
      </body>
      </html>
    `;

    return this.send({ to, subject: "Reset Your SyncRivo Password", html });
  },

  /**
   * Send welcome/onboarding email
   */
  async sendWelcome(params: { to: string; firstName: string }): Promise<EmailResult> {
    const { to, firstName } = params;
    
    const html = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 20px;">
        <div style="max-width: 500px; margin: 0 auto;">
          <h1 style="color: #3b82f6;">Welcome to SyncRivo, ${firstName}! 🎉</h1>
          <p>We're thrilled to have you on board. SyncRivo will help you unify all your team communications in one powerful platform.</p>
          <h3>Getting Started:</h3>
          <ul>
            <li>Connect your first messaging platform</li>
            <li>Invite your team members</li>
            <li>Set up your notification preferences</li>
          </ul>
          <a href="https://syncrivo.com/dashboard" style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 20px 0;">Go to Dashboard</a>
        </div>
      </body>
      </html>
    `;

    return this.send({ to, subject: "Welcome to SyncRivo! 🚀", html });
  },

  /**
   * Send admin notification email
   */
  async sendAdminAlert(params: { subject: string; message: string }): Promise<EmailResult> {
    const adminEmail = "marketing@kxntech.com";
    
    const html = `
      <!DOCTYPE html>
      <html>
      <body style="font-family: monospace; padding: 20px; background: #1e293b; color: #e2e8f0;">
        <div style="max-width: 600px; margin: 0 auto;">
          <h2 style="color: #f59e0b;">⚠️ SyncRivo Admin Alert</h2>
          <div style="background: #334155; padding: 15px; border-radius: 8px;">
            <pre style="white-space: pre-wrap;">${params.message}</pre>
          </div>
          <p style="color: #94a3b8; font-size: 12px; margin-top: 20px;">
            Generated at: ${new Date().toISOString()}
          </p>
        </div>
      </body>
      </html>
    `;

    return this.send({ to: adminEmail, subject: `[SyncRivo Alert] ${params.subject}`, html });
  },
};
