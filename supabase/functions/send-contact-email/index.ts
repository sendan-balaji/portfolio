import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@3.2.0";

// This securely reads the API key you set in the terminal
const resend = new Resend(Deno.env.get("RESEND_API_KEY")!);

// The email address you want to send notifications to
const NOTIFICATION_EMAIL = "bssendan28@gmail.com";

serve(async (req) => {
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
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });

  } catch (err) {
    return new Response(String(err?.message ?? err), { status: 500 });
  }
});