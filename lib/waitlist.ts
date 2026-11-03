import "server-only";
import { desc, eq } from "drizzle-orm";
import { db } from "@/db";
import { waitlistSubscribers } from "@/db/schema";
import { z } from "zod";

export const waitlistSubmissionSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(2, "Please enter your name.")
    .max(150, "Name must be 150 characters or fewer."),
  email: z
    .string()
    .trim()
    .max(255, "Email address is too long.")
    .email("Please enter a valid email address."),
  location: z
    .string()
    .trim()
    .min(2, "Please tell us where you are located.")
    .max(255, "Location must be 255 characters or fewer."),
  fragrance_interests: z
    .string()
    .trim()
    .min(10, "Tell us the fragrances or scent profiles you would love to discover.")
    .max(4000, "Fragrance preferences must be 4,000 characters or fewer."),
});

export type WaitlistSubmission = z.infer<typeof waitlistSubmissionSchema>;

export type WaitlistSubscriber = {
  id: string;
  full_name: string;
  email: string;
  location: string;
  fragrance_interests: string;
  created_at: string;
  updated_at: string;
};

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

function toWaitlistSubscriber(
  row: typeof waitlistSubscribers.$inferSelect,
): WaitlistSubscriber {
  return {
    id: row.id,
    full_name: row.fullName,
    email: row.email,
    location: row.location,
    fragrance_interests: row.fragranceInterests,
    created_at: row.createdAt.toISOString(),
    updated_at: row.updatedAt.toISOString(),
  };
}

export async function createWaitlistSubscriber(submission: WaitlistSubmission) {
  const [row] = await db
    .insert(waitlistSubscribers)
    .values({
      fullName: submission.full_name.trim(),
      email: normalizeEmail(submission.email),
      location: submission.location.trim(),
      fragranceInterests: submission.fragrance_interests.trim(),
    })
    .onConflictDoNothing({ target: waitlistSubscribers.email })
    .returning();

  return row ? toWaitlistSubscriber(row) : null;
}

export async function getWaitlistSubscribers() {
  const rows = await db
    .select()
    .from(waitlistSubscribers)
    .orderBy(desc(waitlistSubscribers.createdAt));

  return rows.map(toWaitlistSubscriber);
}

export async function findWaitlistSubscriberByEmail(email: string) {
  const [row] = await db
    .select()
    .from(waitlistSubscribers)
    .where(eq(waitlistSubscribers.email, normalizeEmail(email)))
    .limit(1);

  return row ? toWaitlistSubscriber(row) : null;
}
