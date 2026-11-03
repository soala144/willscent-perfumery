import { Resend } from "resend";

export type EmailSendResult = {
  delivered: boolean;
  id?: string;
  error?: string;
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function sendCustomerConfirmationEmail(email: string) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;

  if (!apiKey || !from) {
    return {
      delivered: false,
      error: "Email delivery not configured.",
    } satisfies EmailSendResult;
  }

  const resend = new Resend(apiKey);

  const result = await resend.emails.send({
    from,
    to: [email],
    subject: "Welcome to the Will-Scent Perfumery waitlist.",
    html: `
      <div style="background:#0A0A0A;color:#F8F4EC;font-family:Arial,sans-serif;padding:32px 20px;">
        <div style="max-width:600px;margin:0 auto;background:#171717;border:1px solid #D4AF37;border-radius:18px;padding:30px;">
          <div style="text-align:center;padding-bottom:20px;">
            <img src="${siteUrl}/logo1.png" alt="WILL-SCENT" style="max-width:220px;height:auto;border-radius:10px;" />
          </div>
          <div style="height:1px;background:#D4AF37;margin:20px 0;opacity:0.7;"></div>
          <h1 style="font-size:28px;letter-spacing:0.04em;margin:0 0 14px;text-align:center;color:#F8F4EC;">You're on the Will-Scent Perfumery list.</h1>
          <p style="font-size:16px;line-height:1.7;color:#F8F4EC;text-align:center;">Thank you for joining us. Luxury you can smell is on its way.</p>
          <p style="font-size:16px;line-height:1.7;color:#C8C0B3;text-align:center;">We'll let you know when the perfume collection is ready to discover.</p>
          <p style="font-size:14px;line-height:1.7;color:#C8C0B3;text-align:center;margin-top:24px;">With appreciation,<br />The Will-Scent Perfumery Team</p>
        </div>
      </div>
    `,
    text: "You're on the Will-Scent Perfumery list. Thank you for joining us. Luxury you can smell is on its way. We'll let you know when the perfume collection is ready to discover.",
  });

  if (result.error) {
    return {
      delivered: false,
      error: result.error.message,
    } satisfies EmailSendResult;
  }

  return {
    delivered: true,
    id: result.data?.id,
  } satisfies EmailSendResult;
}

export async function sendAdminNotificationEmail(input: {
  fullName: string;
  email: string;
  location: string;
  fragranceInterests: string;
  createdAt: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const adminEmail = process.env.ADMIN_NOTIFICATION_EMAIL;

  if (!apiKey || !from || !adminEmail) {
    return {
      delivered: false,
      error: "Admin notification email not configured.",
    } satisfies EmailSendResult;
  }

  const resend = new Resend(apiKey);
  const fullNameValue = escapeHtml(input.fullName);
  const emailValue = escapeHtml(input.email);
  const locationValue = escapeHtml(input.location);
  const fragranceInterestsValue = escapeHtml(input.fragranceInterests);
  const createdAtValue = escapeHtml(input.createdAt);
  const result = await resend.emails.send({
    from,
    to: [adminEmail],
    subject: "New Will-Scent Perfumery waitlist signup",
    html: `
      <div style="background:#0A0A0A;color:#F8F4EC;padding:24px;font-family:Arial,sans-serif;">
        <h2 style="color:#D4AF37;letter-spacing:0.08em;">New Will-Scent Perfumery Subscriber</h2>
        <p><strong>Name:</strong> ${fullNameValue}</p>
        <p><strong>Email:</strong> ${emailValue}</p>
        <p><strong>Location:</strong> ${locationValue}</p>
        <p><strong>Fragrance interests:</strong> ${fragranceInterestsValue}</p>
        <p><strong>Registration date:</strong> ${createdAtValue}</p>
        <p>Manage subscribers in the admin dashboard: <a href="${siteUrl}/admin">${siteUrl}/admin</a></p>
      </div>
    `,
  });

  if (result.error) {
    return {
      delivered: false,
      error: result.error.message,
    } satisfies EmailSendResult;
  }

  return {
    delivered: true,
    id: result.data?.id,
  } satisfies EmailSendResult;
}
