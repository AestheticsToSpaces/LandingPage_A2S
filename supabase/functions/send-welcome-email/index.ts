// @ts-nocheck - Deno runtime, types not available in VS Code
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
<body style="margin: 0; padding: 0; background-color: #f8fafa; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <!-- Wrapper Table -->
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color: #f8fafa;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <!-- Main Container -->
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" style="max-width: 600px; width: 100%;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #0d9488 0%, #14b8a6 50%, #2dd4bf 100%); padding: 40px 40px 35px 40px; border-radius: 16px 16px 0 0; text-align: center;">
              <!-- Logo -->
              <table role="presentation" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto 15px auto;">
                <tr>
                  <td>
                    <img src="https://aestheticstospaces.tech/logo.png" alt="A2S Logo" width="70" height="70" style="display: block; border-radius: 14px; box-shadow: 0 4px 15px rgba(0,0,0,0.2);" />
                  </td>
                </tr>
              </table>
              <!-- Brand Name -->
              <h1 style="margin: 0; font-size: 28px; font-weight: 700; color: #ffffff; letter-spacing: 0.5px;">Aesthetics To Spaces</h1>
              <p style="margin: 8px 0 0 0; font-size: 14px; color: rgba(255,255,255,0.85); letter-spacing: 2px; text-transform: uppercase;">India's Design Execution Infrastructure</p>
            </td>
          </tr>
          
          <!-- Body Content -->
          <tr>
            <td style="background-color: #ffffff; padding: 40px; border-left: 1px solid #e5e7eb; border-right: 1px solid #e5e7eb;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <tr>
                  <td style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.7; color: #1a1a1a;">
                    
                    <p style="font-size: 18px; margin: 0 0 10px 0;">Hey ${firstName},</p>
                    
                    <p style="font-size: 22px; font-weight: 700; color: #14b8a6; margin: 0 0 20px 0;">You're in.</p>
                    
                    <p style="font-size: 15px; color: #374151; margin: 0 0 25px 0;">Welcome to the Aesthetics To Spaces early access waitlist — you're among the first people in India to get access to something we've been quietly building.</p>
                    
                    <!-- Divider -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr><td style="border-bottom: 2px solid #f3f4f6; padding: 15px 0;"></td></tr>
                    </table>
                    
                    <h2 style="color: #1a1a1a; font-size: 13px; letter-spacing: 2px; margin: 25px 0 15px 0; text-transform: uppercase;">What is A2S?</h2>
                    
                    <p style="font-size: 15px; color: #374151; margin: 0 0 15px 0;">Aesthetics To Spaces is India's first structured home design catalog — room-specific, budget-filtered, and AI-assisted.</p>
                    
                    <p style="font-size: 15px; color: #374151; margin: 0 0 15px 0;">Here's what that means for you:</p>
                    
                    <!-- Feature List -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 15px 0;">
                      <tr>
                        <td style="padding: 8px 0; font-size: 15px; color: #374151;">
                          <span style="color: #14b8a6; font-weight: 600;">→</span> &nbsp;Select your room. Set your budget. Pick your style.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 15px; color: #374151;">
                          <span style="color: #14b8a6; font-weight: 600;">→</span> &nbsp;Instantly see every product you need — across brands, price points, and platforms.
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; font-size: 15px; color: #374151;">
                          <span style="color: #14b8a6; font-weight: 600;">→</span> &nbsp;Our AI assistant builds your entire room shortlist from a single prompt.
                        </td>
                      </tr>
                    </table>
                    
                    <p style="font-size: 15px; color: #374151; margin: 0 0 5px 0;">No designer needed.</p>
                    <p style="font-size: 15px; color: #374151; margin: 0 0 5px 0;">No switching between 12 tabs.</p>
                    <p style="font-size: 15px; color: #374151; margin: 0 0 15px 0;">No budget surprises.</p>
                    
                    <p style="font-size: 15px; font-style: italic; color: #6b7280; margin: 0 0 25px 0;">We start with intelligence. We end with execution.</p>
                    
                    <!-- Divider -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr><td style="border-bottom: 2px solid #f3f4f6; padding: 15px 0;"></td></tr>
                    </table>
                    
                    <h2 style="color: #1a1a1a; font-size: 13px; letter-spacing: 2px; margin: 25px 0 15px 0; text-transform: uppercase;">🔑 Your Referral Code</h2>
                    
                    <!-- Referral Code Box -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 20px 0;">
                      <tr>
                        <td style="background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%); padding: 25px; border-radius: 12px; text-align: center; box-shadow: 0 4px 15px rgba(20, 184, 166, 0.3);">
                          <span style="font-size: 32px; font-weight: 700; color: #ffffff; letter-spacing: 4px; display: block;">${referralCode}</span>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="font-size: 15px; color: #374151; margin: 0 0 15px 0;">Every friend who joins using your code moves you higher up the early access list. The earlier you are on the list, the earlier you get in at launch.</p>
                    
                    <!-- Referral Milestones -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 20px 0;">
                      <tr>
                        <td style="background: #f8fafa; padding: 15px 20px; border-radius: 8px; border: 1px solid #e5e7eb;">
                          <p style="font-size: 13px; font-weight: 600; color: #1a1a1a; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 1px;">Referral Rewards</p>
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="padding: 6px 0; font-size: 14px; color: #374151;">
                                <span style="color: #14b8a6; font-weight: 700;">3 referrals</span> → Move up 6 spots + Early feature preview
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 6px 0; font-size: 14px; color: #374151;">
                                <span style="color: #14b8a6; font-weight: 700;">5 referrals</span> → <strong style="color: #0d9488;">Priority Access</strong> (skip the queue)
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 6px 0; font-size: 14px; color: #374151;">
                                <span style="color: #14b8a6; font-weight: 700;">10 referrals</span> → Priority Access + Founding Member Badge
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <p style="font-size: 15px; color: #374151; margin: 0 0 25px 0;">Share your link → <a href="https://aestheticstospaces.tech/?ref=${referralCode}" style="color: #14b8a6; font-weight: 600; text-decoration: none;">aestheticstospaces.tech/?ref=${referralCode}</a></p>
                    
                    <!-- Divider -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr><td style="border-bottom: 2px solid #f3f4f6; padding: 15px 0;"></td></tr>
                    </table>
                    
                    <h2 style="color: #1a1a1a; font-size: 13px; letter-spacing: 2px; margin: 25px 0 15px 0; text-transform: uppercase;">Launch Details</h2>
                    
                    <!-- Launch Details Cards -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 25px 0;">
                      <tr>
                        <td style="background: #f8fafa; padding: 15px 20px; border-radius: 8px; margin-bottom: 8px;">
                          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tr>
                              <td style="font-size: 15px; color: #374151; padding: 6px 0;">📅 &nbsp;&nbsp;2nd Week of March 2026</td>
                            </tr>
                            <tr>
                              <td style="font-size: 15px; color: #374151; padding: 6px 0;">📍 &nbsp;&nbsp;Starting with Hyderabad, Bengaluru & Mumbai</td>
                            </tr>
                            <tr>
                              <td style="font-size: 15px; color: #374151; padding: 6px 0;">🛋️ &nbsp;&nbsp;28,000+ products across every room type at launch</td>
                            </tr>
                            <tr>
                              <td style="font-size: 15px; color: #374151; padding: 6px 0;">🤖 &nbsp;&nbsp;AI design consultant built for Indian budgets & aesthetics</td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Divider -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr><td style="border-bottom: 2px solid #f3f4f6; padding: 15px 0;"></td></tr>
                    </table>
                    
                    <h2 style="color: #1a1a1a; font-size: 13px; letter-spacing: 2px; margin: 25px 0 15px 0; text-transform: uppercase;">What Happens Next</h2>
                    
                    <p style="font-size: 15px; color: #374151; margin: 0 0 15px 0;">We won't flood your inbox. Before launch, you'll hear from us exactly twice:</p>
                    
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 0 0 15px 20px;">
                      <tr>
                        <td style="font-size: 15px; color: #374151; padding: 4px 0;">1. A sneak peek of the product — what it looks like, how it works</td>
                      </tr>
                      <tr>
                        <td style="font-size: 15px; color: #374151; padding: 4px 0;">2. Your personal launch day access link — the moment we go live</td>
                      </tr>
                    </table>
                    
                    <p style="font-size: 15px; color: #374151; font-weight: 600; margin: 0 0 25px 0;">That's it. No noise.</p>
                    
                    <!-- Divider -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                      <tr><td style="border-bottom: 2px solid #f3f4f6; padding: 15px 0;"></td></tr>
                    </table>
                    
                    <p style="font-size: 15px; color: #374151; margin: 25px 0 15px 0;">If you have questions, thoughts, or just want to tell us what room you're designing — reply to this email. We read and respond to every single one.</p>
                    
                    <p style="font-size: 15px; color: #374151; margin: 0 0 25px 0;">See you at launch.</p>
                    
                    <!-- Signature -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 30px 0 0 0;">
                      <tr>
                        <td>
                          <p style="font-size: 15px; color: #374151; margin: 0 0 5px 0;">Warm regards,</p>
                          <p style="font-size: 16px; font-weight: 700; color: #1a1a1a; margin: 0 0 3px 0;">Asha Jyothi</p>
                          <p style="font-size: 14px; color: #6b7280; margin: 0 0 3px 0;">Founder, Aesthetics To Spaces</p>
                          <a href="https://aestheticstospaces.tech" style="font-size: 14px; color: #14b8a6; text-decoration: none; font-weight: 500;">aestheticstospaces.tech</a>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- PS Box -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 30px 0 0 0;">
                      <tr>
                        <td style="background: linear-gradient(135deg, #f8fafa 0%, #f0fdfa 100%); padding: 20px; border-radius: 10px; border-left: 4px solid #14b8a6;">
                          <p style="font-size: 14px; color: #4b5563; margin: 0; line-height: 1.6;">
                            <strong style="color: #1a1a1a;">P.S.</strong> — Know someone who just moved, is renovating, or is tired of spending hours across Pepperfry, Amazon and IKEA trying to furnish one room? Send them your code. They'll thank you for it. 🏠
                          </p>
                        </td>
                      </tr>
                    </table>
                    
                    <!-- Bottom Referral CTA -->
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin: 25px 0 0 0;">
                      <tr>
                        <td style="background: linear-gradient(135deg, #0d9488 0%, #14b8a6 100%); padding: 18px; border-radius: 10px; text-align: center; box-shadow: 0 4px 15px rgba(20, 184, 166, 0.25);">
                          <span style="font-size: 20px; font-weight: 700; color: #ffffff; letter-spacing: 3px;">${referralCode}</span>
                        </td>
                      </tr>
                    </table>
                    
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background: #1a1a1a; padding: 35px 40px; border-radius: 0 0 16px 16px;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0">
                <!-- Footer Logo -->
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <span style="font-size: 18px; font-weight: 700; color: #14b8a6; letter-spacing: 0.5px;">Aesthetics To Spaces</span>
                  </td>
                </tr>
                <!-- Social Links -->
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding: 0 10px;">
                          <a href="https://www.instagram.com/aestheticstospaces" style="color: #9ca3af; text-decoration: none; font-size: 13px;">Instagram</a>
                        </td>
                        <td style="color: #4b5563;">|</td>
                        <td style="padding: 0 10px;">
                          <a href="https://x.com/A2S_India" style="color: #9ca3af; text-decoration: none; font-size: 13px;">Twitter/X</a>
                        </td>
                        <td style="color: #4b5563;">|</td>
                        <td style="padding: 0 10px;">
                          <a href="https://www.linkedin.com/company/aesthetics-to-spaces/" style="color: #9ca3af; text-decoration: none; font-size: 13px;">LinkedIn</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Email -->
                <tr>
                  <td align="center" style="padding-bottom: 15px;">
                    <a href="mailto:hello@mail.aestheticstospaces.tech" style="color: #14b8a6; text-decoration: none; font-size: 13px;">hello@mail.aestheticstospaces.tech</a>
                  </td>
                </tr>
                <!-- Tagline -->
                <tr>
                  <td align="center" style="padding-bottom: 20px;">
                    <p style="font-size: 12px; color: #6b7280; margin: 0; letter-spacing: 1px;">India's Design Execution Infrastructure</p>
                  </td>
                </tr>
                <!-- Divider -->
                <tr>
                  <td style="border-bottom: 1px solid #374151; padding-bottom: 20px;"></td>
                </tr>
                <!-- Legal Links -->
                <tr>
                  <td align="center" style="padding-top: 20px;">
                    <table role="presentation" cellspacing="0" cellpadding="0" border="0">
                      <tr>
                        <td style="padding: 0 8px;">
                          <a href="https://aestheticstospaces.tech/privacy" style="color: #6b7280; text-decoration: none; font-size: 11px;">Privacy Policy</a>
                        </td>
                        <td style="color: #4b5563; font-size: 11px;">•</td>
                        <td style="padding: 0 8px;">
                          <a href="https://aestheticstospaces.tech/terms" style="color: #6b7280; text-decoration: none; font-size: 11px;">Terms of Service</a>
                        </td>
                        <td style="color: #4b5563; font-size: 11px;">•</td>
                        <td style="padding: 0 8px;">
                          <a href="https://aestheticstospaces.tech/cookies" style="color: #6b7280; text-decoration: none; font-size: 11px;">Cookie Policy</a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Unsubscribe -->
                <tr>
                  <td align="center" style="padding-top: 15px;">
                    <p style="font-size: 10px; color: #6b7280; margin: 0;">
                      You received this email because you signed up for the A2S waitlist.<br/>
                      <a href="mailto:hello@mail.aestheticstospaces.tech?subject=Unsubscribe&body=Please%20remove%20me%20from%20the%20waitlist.%20Email:%20${email}" style="color: #9ca3af; text-decoration: underline;">Unsubscribe</a>
                    </p>
                  </td>
                </tr>
                <!-- Copyright -->
                <tr>
                  <td align="center" style="padding-top: 15px;">
                    <p style="font-size: 11px; color: #4b5563; margin: 0;">© 2026 Aesthetics To Spaces. All rights reserved.</p>
                    <p style="font-size: 11px; color: #4b5563; margin: 5px 0 0 0;">Hyderabad, India</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
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
  } catch (error: unknown) {
    const err = error as Error;
    console.error("Error sending welcome email:", err);
    return new Response(
      JSON.stringify({ error: err.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
});
