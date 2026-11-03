import AdminDashboardClient from "@/components/admin-dashboard";
import { requireAdminSession } from "@/lib/auth";
import { getWaitlistSubscribers } from "@/lib/waitlist";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  await requireAdminSession();
  const subscribers = await getWaitlistSubscribers();

  return (
    <main className="min-h-screen bg-[#0A0A0A] px-4 py-10 text-[#F8F4EC] md:px-8">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8 flex flex-col gap-5 border-b border-[#D4AF37]/30 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-[#C8C0B3]">Admin dashboard</p>
            <h1 className="mt-2 font-serif text-4xl text-[#F8F4EC]">WILL-SCENT</h1>
          </div>
          <form action="/api/admin/logout" method="POST">
            <button
              type="submit"
              className="rounded-full border border-[#D4AF37]/40 px-4 py-2 text-sm text-[#F8F4EC] transition hover:border-[#E6C875] hover:text-[#E6C875]"
            >
              Log out
            </button>
          </form>
        </header>

        <AdminDashboardClient subscribers={subscribers} />
      </div>
    </main>
  );
}
