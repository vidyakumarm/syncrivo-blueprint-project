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
    
    const subject = "Your SyncRivo Enterprise Demo Is Confirmed";
    
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>SyncRivo Demo Confirmation</title>
  <!--[if mso]>
  <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
  </noscript>
  <![endif]-->
</head>
<body style="margin: 0; padding: 0; background-color: #E5E7EB; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;">
  
  <!-- Outer wrapper for centering -->
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #E5E7EB;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        
        <!-- Main container - 600px max width -->
        <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width: 600px; width: 100%; background-color: #FFFFFF; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
          
          <!-- Header with gradient - reduced height -->
          <tr>
            <td style="background: linear-gradient(135deg, #3B82F6 0%, #10B981 100%); padding: 24px 32px; text-align: center;">
              <h1 style="color: #FFFFFF; margin: 0; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">SyncRivo</h1>
              <p style="color: rgba(255, 255, 255, 0.9); margin: 6px 0 0 0; font-size: 14px; font-weight: 500;">Enterprise Demo Confirmation</p>
            </td>
          </tr>
          
          <!-- Main content area -->
          <tr>
            <td style="padding: 32px;">
              
              <!-- Greeting -->
              <h2 style="color: #1E293B; margin: 0 0 16px 0; font-size: 22px; font-weight: 600; line-height: 1.4;">Hi ${firstName},</h2>
              
              <p style="color: #475569; margin: 0 0 24px 0; font-size: 15px; line-height: 1.6;">
                Thank you for booking an enterprise demo with SyncRivo! We're excited to show you how we can transform your team's communication.
              </p>
              
              <!-- Demo Details Card -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #F7F9FC; border-radius: 12px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px;">
                    
                    <!-- Card Header -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td style="padding-bottom: 16px; border-bottom: 1px solid #E2E8F0;">
                          <span style="font-size: 18px; margin-right: 8px;">&#128197;</span>
                          <span style="color: #3B82F6; font-size: 16px; font-weight: 600;">Your Demo Details</span>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Details rows -->
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="margin-top: 12px;">
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; width: 40%;">
                          <span style="color: #64748B; font-size: 14px; line-height: 1.6;">Name</span>
                        </td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; text-align: right;">
                          <span style="color: #1E293B; font-size: 14px; font-weight: 600; line-height: 1.6;">${firstName} ${lastName}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; width: 40%;">
                          <span style="color: #64748B; font-size: 14px; line-height: 1.6;">Company</span>
                        </td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; text-align: right;">
                          <span style="color: #1E293B; font-size: 14px; font-weight: 600; line-height: 1.6;">${companyName}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; width: 40%;">
                          <span style="color: #64748B; font-size: 14px; line-height: 1.6;">Date</span>
                        </td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; text-align: right;">
                          <span style="color: #1E293B; font-size: 14px; font-weight: 600; line-height: 1.6;">${selectedDate}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; width: 40%;">
                          <span style="color: #64748B; font-size: 14px; line-height: 1.6;">Time</span>
                        </td>
                        <td style="padding: 12px 0; border-bottom: 1px solid #E2E8F0; text-align: right;">
                          <span style="color: #1E293B; font-size: 14px; font-weight: 600; line-height: 1.6;">${selectedTime}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 0; width: 40%;">
                          <span style="color: #64748B; font-size: 14px; line-height: 1.6;">Demo Type</span>
                        </td>
                        <td style="padding: 12px 0; text-align: right;">
                          <span style="color: #1E293B; font-size: 14px; font-weight: 600; line-height: 1.6;">${demoType}</span>
                        </td>
                      </tr>
                    </table>
                    
                  </td>
                </tr>
              </table>
              
              <!-- Meeting Link Section -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background-color: #E7F8EF; border-radius: 12px; margin-bottom: 24px;">
                <tr>
                  <td style="padding: 20px; text-align: center;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                      <tr>
                        <td align="center">
                          <span style="font-size: 24px; display: block; margin-bottom: 8px;">&#128198;</span>
                          <p style="color: #166534; margin: 0; font-size: 14px; font-weight: 600; line-height: 1.6;">
                            Meeting Link Coming Soon
                          </p>
                          <p style="color: #15803D; margin: 6px 0 0 0; font-size: 13px; line-height: 1.6;">
                            A calendar invite with the meeting link will be sent to you shortly.
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- What to Expect Section -->
              <h3 style="color: #1E293B; margin: 24px 0 16px 0; font-size: 16px; font-weight: 600; line-height: 1.4;">What to Expect</h3>
              
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="padding: 6px 0;">
                    <span style="color: #3B82F6; font-size: 14px; margin-right: 10px;">&#10003;</span>
                    <span style="color: #475569; font-size: 14px; line-height: 1.6;">30-45 minute personalized session</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0;">
                    <span style="color: #3B82F6; font-size: 14px; margin-right: 10px;">&#10003;</span>
                    <span style="color: #475569; font-size: 14px; line-height: 1.6;">Live walkthrough of SyncRivo's enterprise features</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0;">
                    <span style="color: #3B82F6; font-size: 14px; margin-right: 10px;">&#10003;</span>
                    <span style="color: #475569; font-size: 14px; line-height: 1.6;">Q&A with our solutions team</span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 6px 0;">
                    <span style="color: #3B82F6; font-size: 14px; margin-right: 10px;">&#10003;</span>
                    <span style="color: #475569; font-size: 14px; line-height: 1.6;">Custom pricing discussion for your organization</span>
                  </td>
                </tr>
              </table>
              
              <!-- Reschedule note -->
              <p style="color: #64748B; font-size: 13px; margin: 24px 0 0 0; line-height: 1.6;">
                Need to reschedule? Simply reply to this email or contact us at 
                <a href="mailto:support@syncrivo.com" style="color: #3B82F6; text-decoration: none; font-weight: 500;">support@syncrivo.com</a>
              </p>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="padding: 0 32px;">
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                <tr>
                  <td style="border-top: 1px solid #E2E8F0;"></td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 32px 28px 32px; text-align: center;">
              <p style="color: #64748B; margin: 0 0 8px 0; font-size: 13px; line-height: 1.6;">
                Questions? Contact us at <a href="mailto:support@syncrivo.com" style="color: #3B82F6; text-decoration: none;">support@syncrivo.com</a>
              </p>
              <p style="color: #94A3B8; margin: 0; font-size: 12px; line-height: 1.6;">
                &copy; ${new Date().getFullYear()} SyncRivo by KXN Tech. All rights reserved.
              </p>
            </td>
          </tr>
          
        </table>
        <!-- End main container -->
        
      </td>
    </tr>
  </table>
  
</body>
</html>
    `;

    const text = `Hi ${firstName},

Thank you for booking an enterprise demo with SyncRivo! We're excited to show you how we can transform your team's communication.

YOUR DEMO DETAILS
-----------------
Name: ${firstName} ${lastName}
Company: ${companyName}
Date: ${selectedDate}
Time: ${selectedTime}
Demo Type: ${demoType}

MEETING LINK
A calendar invite with the meeting link will be sent to you shortly.

WHAT TO EXPECT
- 30-45 minute personalized session
- Live walkthrough of SyncRivo's enterprise features
- Q&A with our solutions team
- Custom pricing discussion for your organization

Need to reschedule? Reply to this email or contact us at support@syncrivo.com

---
Questions? Contact us at support@syncrivo.com
(c) ${new Date().getFullYear()} SyncRivo by KXN Tech. All rights reserved.
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
