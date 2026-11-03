"use client";

import { ArrowUpDown, Download, Search } from "lucide-react";
import { useMemo, useState } from "react";
import type { WaitlistSubscriber } from "@/lib/waitlist";

const nowTimestamp = Date.now();

export default function AdminDashboardClient({ subscribers }: { subscribers: WaitlistSubscriber[] }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const filteredSubscribers = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const baseList = subscribers.slice().sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
    );

    if (!normalizedQuery) {
      return baseList;
    }

    return baseList.filter((subscriber) => {
      const haystack = [
        subscriber.full_name,
        subscriber.email,
        subscriber.whatsapp_number,
        subscriber.location,
        subscriber.fragrance_interests,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [query, subscribers]);

  const totalPages = Math.max(1, Math.ceil(filteredSubscribers.length / pageSize));
  const pageItems = filteredSubscribers.slice((page - 1) * pageSize, page * pageSize);

  const todayCount = subscribers.filter(
    (subscriber) =>
      new Date(subscriber.created_at).toDateString() === new Date(nowTimestamp).toDateString(),
  ).length;

  const weeklyCount = subscribers.filter(
    (subscriber) =>
      nowTimestamp - new Date(subscriber.created_at).getTime() <= 1000 * 60 * 60 * 24 * 7,
  ).length;

  return (
    <div className="space-y-8">
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#171717] p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[#C8C0B3]">Total subscribers</p>
          <p className="mt-3 text-3xl font-semibold text-[#F8F4EC]">{subscribers.length}</p>
        </div>
        <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#171717] p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[#C8C0B3]">Registrations today</p>
          <p className="mt-3 text-3xl font-semibold text-[#F8F4EC]">{todayCount}</p>
        </div>
        <div className="rounded-2xl border border-[#D4AF37]/30 bg-[#171717] p-5">
          <p className="text-xs uppercase tracking-[0.18em] text-[#C8C0B3]">Registrations this week</p>
          <p className="mt-3 text-3xl font-semibold text-[#F8F4EC]">{weeklyCount}</p>
        </div>
      </section>

      <section className="rounded-2xl border border-[#D4AF37]/30 bg-[#171717] p-4 sm:p-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C8C0B3]" />
            <input
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
              placeholder="Search name, email, WhatsApp, location, or fragrance"
              className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#0A0A0A] py-2.5 pl-9 pr-3 text-sm text-[#F8F4EC] placeholder:text-[#8a7d6a] outline-none focus:border-[#E6C875]"
            />
          </div>

          <a
            href="/api/admin/export"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-[#D4AF37]/50 bg-[#D4AF37] px-4 py-2 text-sm font-medium text-[#0A0A0A] transition hover:bg-[#E6C875]"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </a>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-y-2 text-left">
            <thead className="text-xs uppercase tracking-[0.16em] text-[#C8C0B3]">
              <tr>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Email</th>
                <th className="px-3 py-2">WhatsApp</th>
                <th className="px-3 py-2">Location</th>
                <th className="px-3 py-2">Fragrance preferences</th>
                <th className="px-3 py-2">
                  <span className="inline-flex items-center gap-2">
                    Date joined
                    <ArrowUpDown className="h-3.5 w-3.5" />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((subscriber) => (
                <tr key={subscriber.id} className="rounded-xl bg-[#0A0A0A] text-[#F8F4EC]">
                  <td className="rounded-l-xl px-3 py-3 align-top">{subscriber.full_name}</td>
                  <td className="px-3 py-3 align-top">{subscriber.email}</td>
                  <td className="px-3 py-3 align-top">{subscriber.whatsapp_number}</td>
                  <td className="px-3 py-3 align-top">{subscriber.location}</td>
                  <td className="px-3 py-3 align-top text-[#C8C0B3]">{subscriber.fragrance_interests}</td>
                  <td className="rounded-r-xl px-3 py-3 align-top text-[#C8C0B3]">
                    {new Date(subscriber.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSubscribers.length === 0 ? (
          <p className="mt-5 text-sm text-[#C8C0B3]">No subscribers match your search.</p>
        ) : null}

        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-[#C8C0B3]">
            Showing {Math.min((page - 1) * pageSize + 1, filteredSubscribers.length)}-{Math.min(page * pageSize, filteredSubscribers.length)} of {filteredSubscribers.length}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
              className="rounded-full border border-[#D4AF37]/40 px-3 py-1.5 text-sm text-[#F8F4EC] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Prev
            </button>
            <button
              type="button"
              onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
              disabled={page === totalPages}
              className="rounded-full border border-[#D4AF37]/40 px-3 py-1.5 text-sm text-[#F8F4EC] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
