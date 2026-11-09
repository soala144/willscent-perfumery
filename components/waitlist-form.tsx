"use client";

import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { z } from "zod";

const formSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address."),
  location: z.string().trim().min(2, "Please tell us where you are based."),
  fragrance_interests: z.string().trim().min(2, "Please tell us at least one fragrance or scent you would like."),
});

type FieldName = keyof z.infer<typeof formSchema>;

const emptyValues = { email: "", location: "", fragrance_interests: "", website: "" };

const inputClass =
  "w-full rounded-xl border border-[#D4AF37]/30 bg-[#0A0A0A]/80 px-4 py-3.5 text-base text-[#F3EAD7] placeholder:text-[#8a7d6a] outline-none transition focus:border-[#E6C875] focus:ring-2 focus:ring-[#E6C875]/20 aria-[invalid=true]:border-[#E7A7A7]/70";

const labelClass = "mb-2 block text-sm font-medium text-[#E9E1D2]";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="mt-2 flex items-center gap-2 text-sm text-[#E7A7A7]">
      <AlertCircle className="h-4 w-4 shrink-0" aria-hidden />
      {message}
    </p>
  );
}

export default function WaitlistForm() {
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState<Partial<Record<FieldName, string>>>({});
  const [submitState, setSubmitState] = useState<"idle" | "submitting" | "success">("idle");
  const [serverMessage, setServerMessage] = useState("");

  function handleFieldChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setServerMessage("");

    const parsed = formSchema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: Partial<Record<FieldName, string>> = {};
      for (const issue of parsed.error.issues) {
        const path = issue.path[0] as FieldName;
        fieldErrors[path] ??= issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setSubmitState("submitting");
    setErrors({});

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...parsed.data, website: values.website }),
      });

      const payload = (await response.json()) as { message?: string; error?: string };

      if (!response.ok) {
        throw new Error(payload.error ?? payload.message ?? "Unable to join the waitlist right now.");
      }

      setSubmitState("success");
      setServerMessage(payload.message ?? "You're on the list.");
      setValues(emptyValues);
    } catch (error) {
      setSubmitState("idle");
      setServerMessage(error instanceof Error ? error.message : "Unable to join the waitlist right now.");
    }
  }

  if (submitState === "success") {
    return (
      <div
        role="status"
        className="rounded-3xl border border-[#D4AF37]/40 bg-[#141310]/90 p-7 text-center shadow-[0_18px_48px_rgba(0,0,0,0.4)]"
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/50 bg-[#D4AF37]/10 text-[#E6C875]">
          <CheckCircle2 className="h-6 w-6" aria-hidden />
        </div>
        <h3 className="font-serif text-3xl font-medium text-[#F3EAD7]">You&apos;re on the list.</h3>
        <p className="mt-3 text-base leading-7 text-[#C8C0B3]">
          Thank you for joining Will-Scent Perfumery. We&apos;ll be in touch as soon as the collection is ready.
        </p>
        <p className="mt-4 font-serif text-lg italic text-[#E6C875]">Luxury you can smell.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-[#D4AF37]/30 bg-[#141310]/90 p-5 shadow-[0_18px_48px_rgba(0,0,0,0.4)] sm:p-7"
    >
      <div className="space-y-5">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            value={values.email}
            onChange={handleFieldChange}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            className={inputClass}
          />
          <FieldError id="email-error" message={errors.email} />
        </div>

        <div>
          <label htmlFor="location" className={labelClass}>
            Location
          </label>
          <input
            id="location"
            name="location"
            autoComplete="address-level2"
            value={values.location}
            onChange={handleFieldChange}
            placeholder="City, country"
            aria-invalid={Boolean(errors.location)}
            aria-describedby={errors.location ? "location-error" : undefined}
            className={inputClass}
          />
          <FieldError id="location-error" message={errors.location} />
        </div>

        <div>
          <label htmlFor="fragrance_interests" className={labelClass}>
            Which fragrances would you like to see?
          </label>
          <textarea
            id="fragrance_interests"
            name="fragrance_interests"
            value={values.fragrance_interests}
            onChange={handleFieldChange}
            placeholder="e.g. Baccarat Rouge, Oud Wood, something fresh for summer…"
            rows={3}
            aria-invalid={Boolean(errors.fragrance_interests)}
            aria-describedby={errors.fragrance_interests ? "fragrance-error" : undefined}
            className={`${inputClass} resize-none`}
          />
          <FieldError id="fragrance-error" message={errors.fragrance_interests} />
        </div>

        {/* Honeypot: hidden from people, filled in by bots */}
        <div aria-hidden="true" className="hidden">
          <input name="website" type="text" value={values.website} onChange={handleFieldChange} tabIndex={-1} autoComplete="off" />
        </div>

        <button
          type="submit"
          disabled={submitState === "submitting"}
          className="inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 text-base font-semibold uppercase tracking-[0.12em] text-[#0A0A0A] transition hover:bg-[#E6C875] disabled:cursor-not-allowed disabled:bg-[#8b7f55]"
        >
          {submitState === "submitting" ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
          {submitState === "submitting" ? "Joining…" : "Join the Waitlist"}
        </button>

        <p className="text-center text-sm leading-6 text-[#C8C0B3]">
          By joining the waitlist, you agree to receive Will-Scent launch and fragrance updates. You can unsubscribe at
          any time. See our{" "}
          <Link href="/privacy" className="text-[#E6C875] underline underline-offset-4">
            Privacy Policy
          </Link>
          .
        </p>

        {serverMessage ? (
          <p role="alert" className="text-center text-sm text-[#E7A7A7]">
            {serverMessage}
          </p>
        ) : null}
      </div>
    </form>
  );
}
