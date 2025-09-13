// supabase/functions/send-contact-email/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@3.2.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY")!);
const NOTIFICATION_EMAIL = "bssendan28@gmail.com";

serve(async (req) => {
  try {
    const { record } = await req.json();

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
      // Return a more specific error
      return new Response(JSON.stringify({ error: `Resend error: ${error.message}` }), { status: 500, headers: { "Content-Type": "application/json" } });
    }

    return new Response(JSON.stringify(data), { headers: { "Content-Type": "application/json" } });

  } catch (err) {
    // Catch other potential errors, like JSON parsing issues
    return new Response(String(err?.message ?? err), { status: 500 });
  }
});
