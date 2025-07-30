import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject?: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, company, subject, message }: ContactEmailRequest = await req.json();

    console.log("Sending contact email:", { name, email, subject });
    
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    console.log("RESEND_API_KEY exists:", !!resendApiKey);
    
    if (!resendApiKey) {
      console.error("RESEND_API_KEY is missing");
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY is not configured. Please add it to Supabase secrets." }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const emailResponse = await resend.emails.send({
      from: "Nonplo Contact Form <onboarding@resend.dev>",
      to: ["efeyildirim@nonplo.com"],
      subject: subject ? `İletişim Formu: ${subject}` : "Yeni İletişim Formu Mesajı",
      html: `
        <h2>Yeni İletişim Formu Mesajı</h2>
        <p><strong>Ad Soyad:</strong> ${name}</p>
        <p><strong>E-posta:</strong> ${email}</p>
        ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
        ${company ? `<p><strong>Şirket:</strong> ${company}</p>` : ''}
        ${subject ? `<p><strong>Konu:</strong> ${subject}</p>` : ''}
        <div style="margin-top: 20px;">
          <strong>Mesaj:</strong>
          <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin-top: 10px;">
            ${message.replace(/\n/g, '<br>')}
          </div>
        </div>
      `,
    });

    console.log("Email sent successfully:", emailResponse);
    
    if (emailResponse.error) {
      console.error("Resend API error details:", JSON.stringify(emailResponse.error, null, 2));
      throw new Error(`Resend API error: ${JSON.stringify(emailResponse.error)}`);
    }

    return new Response(JSON.stringify({ success: true, id: emailResponse.data?.id }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);