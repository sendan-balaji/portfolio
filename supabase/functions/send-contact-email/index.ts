import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@3.2.0";

// These are the permission headers for CORS (the "permission slip")
const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // Allows any website to call this function
  'Access-Control-Allow-Methods': 'POST, OPTIONS', // Allows these HTTP methods
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type', // Allows these headers
};

// This securely reads the API key you set in Supabase
const resend = new Resend(Deno.env.get("RESEND_API_KEY")!);

// The email address you want to send notifications to
const NOTIFICATION_EMAIL = "bssendan28@gmail.com";

serve(async (req) => {
  // This part handles the browser's security check. It's a "preflight" request.
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const { record } = await req.json();

    // Send the email using Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: [NOTIFICATION_EMAIL],
      subject: `New Portfolio Message from ${record.name}`,
      html: `
            <h1>New Message Received</h1>
            <p><strong>Name:</strong> ${record.name}</p>
            <p><strong>Email:</strong> ${record.email}</p>
            <p><strong>Message:</strong></p>
            <p>${record.message}</p>
          `,
    });

    if (error) {
      console.error({ error });
      // Return an error response WITH the permission headers
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Return a success response WITH the permission headers
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err) {
    // Return a catch-all error response WITH the permission headers
    return new Response(String(err?.message ?? err), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
