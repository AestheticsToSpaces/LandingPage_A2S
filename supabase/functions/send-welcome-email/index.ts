import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
// Change this to your verified domain email once domain is ready
// e.g., "Aesthetics To Spaces <welcome@aestheticstospaces.in>"
const FROM_EMAIL = Deno.env.get("FROM_EMAIL") || "Aesthetics To Spaces <onboarding@resend.dev>";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface WelcomeEmailRequest {
  email: string;
  firstName: string;
  referralCode: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { email, firstName, referralCode }: WelcomeEmailRequest = await req.json();

    if (!email || !firstName || !referralCode) {
      throw new Error("Missing required fields: email, firstName, or referralCode");
    }

    const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to A2S</title>
</head>
<body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #1a1a1a; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="text-align: center; margin-bottom: 30px;">
    <h1 style="color: #14b8a6; margin: 0;">Aesthetics To Spaces</h1>
  </div>

  <p style="font-size: 18px;">Hey ${firstName},</p>

  <p style="font-size: 20px; font-weight: bold; color: #14b8a6;">You're in.</p>

  <p>Welcome to the Aesthetics To Spaces early access waitlist — you're among the first people in India to get access to something we've been quietly building.</p>

  <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">

  <h2 style="color: #1a1a1a; font-size: 16px; letter-spacing: 1px;">WHAT IS A2S?</h2>

  <p>Aesthetics To Spaces is India's first structured home design catalog — room-specific, budget-filtered, and AI-assisted.</p>

  <p>Here's what that means for you:</p>

  <p style="margin-left: 20px;">
    → Select your room. Set your budget. Pick your style.<br>
    → Instantly see every product you need — across brands, price points, and platforms.<br>
    → Our AI assistant builds your entire room shortlist from a single prompt.
  </p>

  <p>
    No designer needed.<br>
    No switching between 12 tabs.<br>
    No budget surprises.
  </p>

  <p style="font-style: italic;">We start with intelligence. We end with execution.</p>

  <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">

  <h2 style="color: #1a1a1a; font-size: 16px; letter-spacing: 1px;">🔑 YOUR REFERRAL CODE</h2>

  <div style="background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); color: white; text-align: center; padding: 20px; border-radius: 12px; margin: 20px 0;">
    <span style="font-size: 28px; font-weight: bold; letter-spacing: 3px;">${referralCode}</span>
  </div>

  <p>Every friend who joins using your code moves you higher up the early access list. The earlier you are on the list, the earlier you get in at launch.</p>

  <p>Share your link → <a href="https://aestheticstospaces.in/waitlist?ref=${referralCode}" style="color: #14b8a6; font-weight: 500;">aestheticstospaces.in/waitlist?ref=${referralCode}</a></p>

  <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">

  <h2 style="color: #1a1a1a; font-size: 16px; letter-spacing: 1px;">LAUNCH DETAILS</h2>

  <p>
    📅 &nbsp; 2nd Week of March 2026<br>
    📍 &nbsp; Starting with Hyderabad, Bengaluru & Mumbai<br>
    🛋️ &nbsp; 28,000+ products across every room type at launch<br>
    🤖 &nbsp; AI design consultant built for Indian budgets & aesthetics
  </p>

  <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">

  <h2 style="color: #1a1a1a; font-size: 16px; letter-spacing: 1px;">WHAT HAPPENS NEXT</h2>

  <p>We won't flood your inbox. Before launch, you'll hear from us exactly twice:</p>

  <ol style="margin-left: 20px;">
    <li>A sneak peek of the product — what it looks like, how it works</li>
    <li>Your personal launch day access link — the moment we go live</li>
  </ol>

  <p>That's it. No noise.</p>

  <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 30px 0;">

  <p>If you have questions, thoughts, or just want to tell us what room you're designing — reply to this email. We read and respond to every single one.</p>

  <p>See you at launch.</p>

  <p style="margin-top: 30px;">
    Warm regards,<br>
    <strong>Asha Jyothi</strong><br>
    Founder, Aesthetics To Spaces<br>
    <a href="https://aestheticstospaces.in" style="color: #14b8a6;">aestheticstospaces.in</a>
  </p>

  <p style="background: #f5f5f5; padding: 15px; border-radius: 8px; font-size: 14px; color: #666; margin-top: 30px;">
    <strong>P.S.</strong> — Know someone who just moved, is renovating, or is tired of spending hours across Pepperfry, Amazon and IKEA trying to furnish one room? Send them your code. They'll thank you for it. 🏠
  </p>

  <div style="text-align: center; margin-top: 20px; padding: 15px; background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); border-radius: 8px;">
    <span style="color: white; font-size: 18px; font-weight: bold; letter-spacing: 2px;">${referralCode}</span>
  </div>

  <p style="text-align: center; font-size: 12px; color: #999; margin-top: 30px;">
    © 2026 Aesthetics To Spaces. All rights reserved.
  </p>
</body>
</html>
    `;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [email],
        subject: "You're on the list. Welcome to Aesthetics To Spaces. 🏠",
        html: emailHtml,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Resend error:", data);
      throw new Error(data.message || "Failed to send email");
    }

    return new Response(JSON.stringify({ success: true, id: data.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
