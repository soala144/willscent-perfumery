import { NextResponse } from "next/server";
import { z } from "zod";
import { sendAdminNotificationEmail, sendCustomerConfirmationEmail } from "@/lib/email";
import {
  createWaitlistSubscriber,
  normalizeEmail,
  waitlistSubmissionSchema,
} from "@/lib/waitlist";

export async function POST(request: Request) {
  try {
    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ error: "Please submit valid form data." }, { status: 400 });
    }

    const payloadSchema = waitlistSubmissionSchema.extend({
      website: z.string().optional(),
    });
    const payload = payloadSchema.safeParse(body);

    if (!payload.success) {
      return NextResponse.json(
        {
          error: payload.error.issues[0]?.message ?? "Please complete all required fields.",
        },
        { status: 400 },
      );
    }

    if (payload.data.website) {
      return NextResponse.json(
        { error: "Your request could not be processed." },
        { status: 400 },
      );
    }

    const email = normalizeEmail(payload.data.email);
    const subscriber = await createWaitlistSubscriber({
      full_name: payload.data.full_name,
      email,
      location: payload.data.location,
      fragrance_interests: payload.data.fragrance_interests,
    });

    if (!subscriber) {
      return NextResponse.json(
        {
          message: "You're already on the Will-Scent Perfumery waitlist. We'll be in touch soon.",
        },
        { status: 200 },
      );
    }

    try {
      const confirmation = await sendCustomerConfirmationEmail(subscriber.email);
      if (!confirmation.delivered) {
        console.warn("Waitlist confirmation email failed", confirmation.error);
      }
    } catch (error) {
      console.error("Waitlist confirmation email failed", error);
    }

    if (process.env.ADMIN_NOTIFICATION_EMAIL) {
      try {
        const adminNotification = await sendAdminNotificationEmail({
          fullName: subscriber.full_name,
          email: subscriber.email,
          location: subscriber.location,
          fragranceInterests: subscriber.fragrance_interests,
          createdAt: new Date(subscriber.created_at).toISOString(),
        });

        if (!adminNotification.delivered) {
          console.warn("Admin notification email failed", adminNotification.error);
        }
      } catch (error) {
        console.error("Admin notification email failed", error);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "You're now on the Will-Scent Perfumery waitlist.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Waitlist submission failed", error);
    return NextResponse.json(
      {
        error: "Unable to complete your waitlist registration right now.",
      },
      { status: 500 },
    );
  }
}
