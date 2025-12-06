import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { SMTPClient } from "https://deno.land/x/denomailer@1.6.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// Clean HTML to prevent quoted-printable =20 artifacts and ensure proper rendering
function cleanHtmlForEmail(html: string): string {
  return html
    // Remove all newlines and excessive whitespace that cause =20
    .split('\n').map(line => line.trim()).join('')
    // Remove whitespace between tags
    .replace(/>\s+</g, '><')
    // Collapse multiple spaces to single space
    .replace(/\s{2,}/g, ' ')
    // Remove any stray =20 artifacts that might have been introduced
    .replace(/=20/g, ' ')
    // Clean up any double spaces
    .replace(/  +/g, ' ')
    .trim();
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { to, subject, html, text }: EmailRequest = await req.json();

    // Validate required fields
    if (!to || !subject || !html) {
      console.error("Missing required email fields");
      return new Response(
        JSON.stringify({ error: "Missing required fields: to, subject, html" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Get SMTP configuration from environment
    const smtpHost = Deno.env.get("SMTP_HOST");
    const smtpPort = parseInt(Deno.env.get("SMTP_PORT") || "465");
    const smtpUsername = Deno.env.get("SMTP_USERNAME");
    const smtpPassword = Deno.env.get("SMTP_PASSWORD");
    const fromEmail = Deno.env.get("SMTP_FROM_EMAIL");

    if (!smtpHost || !smtpUsername || !smtpPassword || !fromEmail) {
      console.error("Missing SMTP configuration - check environment variables");
      return new Response(
        JSON.stringify({ error: "Email service not configured properly" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    console.log(`Attempting to send email to: ${to}, subject: ${subject}`);
    console.log(`SMTP Config - Host: ${smtpHost}, Port: ${smtpPort}, From: ${fromEmail}`);

    // Create SMTP client with proper encoding settings
    const client = new SMTPClient({
      connection: {
        hostname: smtpHost,
        port: smtpPort,
        tls: true,
        auth: {
          username: smtpUsername,
          password: smtpPassword,
        },
      },
    });

    // Clean HTML to prevent =20 artifacts
    const processedHtml = cleanHtmlForEmail(html);
    const plainText = text || html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();

    console.log("Sending email with cleaned HTML...");

    // Send email - denomailer handles encoding internally
    await client.send({
      from: fromEmail,
      to: to,
      subject: subject,
      content: plainText,
      html: processedHtml,
    });

    await client.close();

    console.log(`Email sent successfully to: ${to}`);

    return new Response(
      JSON.stringify({ success: true, message: "Email sent successfully" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    // Mask sensitive info in logs
    const safeError = error.message?.replace(/password[^,]*/gi, "password: [MASKED]");
    console.error("Error sending email:", safeError);

    return new Response(
      JSON.stringify({ error: "Failed to send email. Please try again later." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
};

serve(handler);
