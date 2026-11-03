"use client";

import { LockKeyhole, Mail } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const payload = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to sign in.");
      }

      router.push("/admin");
      router.refresh();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to sign in.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#0A0A0A] px-4 py-12">
      <div className="w-full max-w-md rounded-[1.75rem] border border-[#D4AF37]/30 bg-[#171717] p-6 shadow-[0_24px_64px_rgba(0,0,0,0.45)]">
        <div className="mb-6 flex items-center justify-between border-b border-[#D4AF37]/20 pb-4">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-[#C8C0B3]">Admin access</p>
            <Image
              src="/logo1.png"
              alt="WILL-SCENT logo"
              width={180}
              height={72}
              className="mt-3 h-12 w-auto object-contain"
            />
          </div>
          <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 p-1">
            <Image src="/logo2.jpg" alt="WILL-SCENT brand mark" width={56} height={56} className="h-full w-full rounded-full object-cover" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="admin-email" className="mb-2 block text-sm uppercase tracking-[0.14em] text-[#C8C0B3]">
              Email address
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C8C0B3]" />
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-[#D4AF37]/25 bg-[#0A0A0A] py-3 pl-10 pr-3 text-[#F8F4EC] placeholder:text-[#8a7d6a] outline-none focus:border-[#E6C875]"
                placeholder="admin@willscent.com"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="admin-password" className="mb-2 block text-sm uppercase tracking-[0.14em] text-[#C8C0B3]">
              Password
            </label>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C8C0B3]" />
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-[#D4AF37]/25 bg-[#0A0A0A] py-3 pl-10 pr-3 text-[#F8F4EC] placeholder:text-[#8a7d6a] outline-none focus:border-[#E6C875]"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex w-full items-center justify-center rounded-full bg-[#D4AF37] px-5 py-3 font-semibold text-[#0A0A0A] transition hover:bg-[#E6C875] disabled:cursor-not-allowed disabled:bg-[#8b7f55]"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>

          {message ? <p className="text-sm text-[#E7A7A7]">{message}</p> : null}
        </form>
      </div>
    </main>
  );
}
