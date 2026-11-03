"use client";

import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { z } from "zod";

const formSchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your name.").max(150, "Name must be 150 characters or fewer."),
  email: z.string().trim().email("Please enter a valid email address."),
  location: z.string().trim().min(2, "Please tell us where you are located."),
  fragrance_interests: z
    .string()
    .trim()
    .min(10, "Tell us the fragrances or scent profiles you would love to discover."),
});

export default function WaitlistForm() {
  const [values, setValues] = useState({
    full_name: "",
    email: "",
    location: "",
    fragrance_interests: "",
    website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success">("idle");
  const [serverMessage, setServerMessage] = useState("");

  function handleFieldChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerMessage("");

    const parsed = formSchema.safeParse({
      full_name: values.full_name,
      email: values.email,
      location: values.location,
      fragrance_interests: values.fragrance_interests,
    });

    if (!parsed.success) {
      const flattened: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (typeof path === "string") {
          flattened[path] = issue.message;
        }
      });
      setErrors(flattened);
      return;
    }

    setSubmitState("submitting");
    setErrors({});

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: parsed.data.full_name,
          email: parsed.data.email,
          location: parsed.data.location,
          fragrance_interests: parsed.data.fragrance_interests,
          website: values.website,
        }),
      });

      const payload = (await response.json()) as {
        message?: string;
        error?: string;
      };

      if (!response.ok) {
        throw new Error(payload.error ?? payload.message ?? "Unable to join the waitlist right now.");
      }

      setSubmitState("success");
      setServerMessage(payload.message ?? "You're on the list.");
      setValues({
        full_name: "",
        email: "",
        location: "",
        fragrance_interests: "",
        website: "",
      });
    } catch (error) {
      setSubmitState("idle");
      setServerMessage(error instanceof Error ? error.message : "Unable to join the waitlist right now.");
    }
  }

  if (submitState === "success") {
    return (
      <div className="rounded-[1.75rem] border border-[#D4AF37]/40 bg-[#171717]/95 p-8 text-left shadow-[0_18px_48px_rgba(0,0,0,0.3)]">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#E6C875]">
          <CheckCircle2 className="h-6 w-6" />
        </div>
        <h3 className="font-serif text-3xl text-[#F8F4EC]">You&apos;re on the List.</h3>
        <p className="mt-4 text-base leading-7 text-[#C8C0B3]">
          Thank you for your interest in Will-Scent Perfumery. We&apos;ll be in touch as soon as the collection is ready.
        </p>
        <p className="mt-4 text-sm uppercase tracking-[0.18em] text-[#E6C875]">Luxury you can smell.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[1.75rem] border border-[#D4AF37]/30 bg-[#171717]/90 p-5 shadow-[0_18px_48px_rgba(0,0,0,0.22)] md:p-7" noValidate>
      <div className="space-y-5">
        <div>
          <label htmlFor="full_name" className="mb-2 block text-sm font-medium uppercase tracking-[0.12em] text-[#C8C0B3]">
            Full Name
          </label>
          <input
            id="full_name"
            name="full_name"
            autoComplete="name"
            value={values.full_name}
            onChange={handleFieldChange}
            placeholder="Enter your full name"
            aria-invalid={Boolean(errors.full_name)}
            className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#0A0A0A] px-4 py-3.5 text-base text-[#F8F4EC] placeholder:text-[#8a7d6a] outline-none transition focus:border-[#E6C875] focus:ring-2 focus:ring-[#E6C875]/20"
          />
          {errors.full_name ? <p className="mt-2 flex items-center gap-2 text-sm text-[#E7A7A7]"><AlertCircle className="h-4 w-4" />{errors.full_name}</p> : null}
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium uppercase tracking-[0.12em] text-[#C8C0B3]">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleFieldChange}
            placeholder="Enter your email address"
            aria-invalid={Boolean(errors.email)}
            className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#0A0A0A] px-4 py-3.5 text-base text-[#F8F4EC] placeholder:text-[#8a7d6a] outline-none transition focus:border-[#E6C875] focus:ring-2 focus:ring-[#E6C875]/20"
          />
          {errors.email ? <p className="mt-2 flex items-center gap-2 text-sm text-[#E7A7A7]"><AlertCircle className="h-4 w-4" />{errors.email}</p> : null}
        </div>

        <div>
          <label htmlFor="location" className="mb-2 block text-sm font-medium uppercase tracking-[0.12em] text-[#C8C0B3]">
            Location
          </label>
          <input
            id="location"
            name="location"
            value={values.location}
            onChange={handleFieldChange}
            placeholder="Where are you located?"
            aria-invalid={Boolean(errors.location)}
            className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#0A0A0A] px-4 py-3.5 text-base text-[#F8F4EC] placeholder:text-[#8a7d6a] outline-none transition focus:border-[#E6C875] focus:ring-2 focus:ring-[#E6C875]/20"
          />
          {errors.location ? <p className="mt-2 flex items-center gap-2 text-sm text-[#E7A7A7]"><AlertCircle className="h-4 w-4" />{errors.location}</p> : null}
        </div>

        <div>
          <label htmlFor="fragrance_interests" className="mb-2 block text-sm font-medium uppercase tracking-[0.12em] text-[#C8C0B3]">
            Fragrance Preferences
          </label>
          <textarea
            id="fragrance_interests"
            name="fragrance_interests"
            value={values.fragrance_interests}
            onChange={handleFieldChange}
            placeholder="Tell us which perfumes or scent profiles you would love us to stock..."
            rows={5}
            aria-invalid={Boolean(errors.fragrance_interests)}
            className="w-full rounded-xl border border-[#D4AF37]/30 bg-[#0A0A0A] px-4 py-3.5 text-base text-[#F8F4EC] placeholder:text-[#8a7d6a] outline-none transition focus:border-[#E6C875] focus:ring-2 focus:ring-[#E6C875]/20"
          />
          {errors.fragrance_interests ? <p className="mt-2 flex items-center gap-2 text-sm text-[#E7A7A7]"><AlertCircle className="h-4 w-4" />{errors.fragrance_interests}</p> : null}
          <p className="mt-2 text-xs text-[#C8C0B3]">Your preferences help us choose perfumes you&apos;ll be excited to discover.</p>
        </div>

        <div aria-hidden="true" className="hidden">
          <input
            name="website"
            type="text"
            value={values.website}
            onChange={handleFieldChange}
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <button
          type="submit"
          disabled={submitState === "submitting"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-5 py-3.5 text-base font-semibold text-[#0A0A0A] transition hover:bg-[#E6C875] disabled:cursor-not-allowed disabled:bg-[#8b7f55]"
        >
          {submitState === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {submitState === "submitting" ? "Joining..." : "Join the Waitlist"}
        </button>

        {serverMessage ? <p className="mt-3 text-sm text-[#E6C875]">{serverMessage}</p> : null}
      </div>
    </form>
  );
}
