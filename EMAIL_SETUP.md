# Email Setup Guide

## Step 1: Create Resend Account

1. Go to [resend.com](https://resend.com) and sign up
2. Verify your email
3. Go to **API Keys** in the dashboard
4. Click **Create API Key** → Name it "A2S Waitlist" → Copy the key

## Step 2: Add Domain to Resend (Important for Production)

For emails to be sent from `welcome@aestheticstospaces.in`:

1. In Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter: `aestheticstospaces.in`
4. Add the DNS records shown to your domain (MX, TXT records)
5. Wait for verification (usually minutes)

**For testing**, you can use Resend's default `onboarding@resend.dev` by editing the edge function.

## Step 3: Install Supabase CLI

```bash
npm install -g supabase
```

## Step 4: Login to Supabase

```bash
supabase login
```

This opens a browser window. Authorize the CLI.

## Step 5: Link to Your Project

```bash
cd c:\Users\ashaj\OneDrive\Desktop\A2S\EOWLITB\launchpad-glow
supabase link --project-ref xcbsyxjecwwrwvimzdqa
```

## Step 6: Set the Resend API Key as a Secret

```bash
supabase secrets set RESEND_API_KEY=re_YOUR_API_KEY_HERE
```

Replace `re_YOUR_API_KEY_HERE` with your actual Resend API key.

## Step 7: Deploy the Edge Function

```bash
supabase functions deploy send-welcome-email
```

## Step 8: Test

1. Go to your waitlist form
2. Submit a new entry
3. Check your email!

---

## Troubleshooting

### Email not received?
- Check spam folder
- Verify domain is verified in Resend
- Check Supabase dashboard → Edge Functions → Logs

### Function not found?
- Make sure you deployed with `supabase functions deploy`
- Check project is linked correctly

### CORS errors?
- The function includes CORS headers, should work from any origin

---

## Quick Commands Reference

```bash
# View function logs
supabase functions logs send-welcome-email

# Update secret
supabase secrets set RESEND_API_KEY=new_key_here

# List secrets
supabase secrets list

# Redeploy after changes
supabase functions deploy send-welcome-email
```
