import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getWaitlistSubscribers } from "@/lib/waitlist";

function csvCell(value: string) {
  const safeValue = /^[\u0000-\u0020]*[=+\-@]/.test(value) ? `'${value}` : value;
  return `"${safeValue.replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const subscribers = await getWaitlistSubscribers();
    const rows = [
      ["Name", "Email", "Location", "Perfume preferences", "Date joined"],
      ...subscribers.map((subscriber) => [
        subscriber.full_name,
        subscriber.email,
        subscriber.location,
        subscriber.fragrance_interests,
        new Date(subscriber.created_at).toISOString(),
      ]),
    ];

    const csv = rows.map((row) => row.map(csvCell).join(",")).join("\r\n");

    return new Response(`\uFEFF${csv}`, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="willscent-waitlist.csv"',
        "Cache-Control": "private, no-store",
      },
    });
  } catch (error) {
    console.error("Waitlist CSV export failed", error);
    return NextResponse.json(
      { error: "Unable to export waitlist data right now." },
      { status: 500 },
    );
  }
}
