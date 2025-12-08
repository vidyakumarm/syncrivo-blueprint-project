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
}
};

serve(handler);
