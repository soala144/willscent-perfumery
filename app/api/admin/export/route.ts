import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/auth";
import { getWaitlistSubscribers } from "@/lib/waitlist";

function csvCell(value: string) {
  const safeValue = /^[\u0000-\u0020]*[=+\-@]/.test(value) ? `'${value}` : value;
  return `"${safeValue.replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
}

// "2026-11-09 14:05" — sorts correctly and Excel reads it as a date.
const dateFormatter = new Intl.DateTimeFormat("sv-SE", {
  timeZone: "Europe/Budapest",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
});

function formatDate(value: string) {
  return dateFormatter.format(new Date(value));
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  try {
    const subscribers = await getWaitlistSubscribers();
    const rows = [
      ["Email", "Location", "Requested fragrances", "Date joined (Budapest time)", "Name"],
      ...subscribers.map((subscriber) => [
        subscriber.email,
        subscriber.location,
        subscriber.fragrance_interests,
        formatDate(subscriber.created_at),
        subscriber.full_name,
      ]),
    ];

    const csv = rows.map((row) => row.map(csvCell).join(",")).join("\r\n");

    return new Response(`\uFEFF${csv}`, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="willscent-waitlist-${new Date().toISOString().slice(0, 10)}.csv"`,
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
