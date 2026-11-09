import type { SocialKey } from "@/lib/site";

export default function SocialIcon({ name, className = "h-5 w-5" }: { name: SocialKey; className?: string }) {
  const common = { className, viewBox: "0 0 24 24", "aria-hidden": true } as const;

  switch (name) {
    case "instagram":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth={1.8}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "tiktok":
      return (
        <svg {...common} fill="currentColor">
          <path d="M16.6 3c.35 2.3 1.75 3.9 4 4.15v3.3a7.4 7.4 0 0 1-4-1.2v6.25A5.5 5.5 0 1 1 11.1 10v3.35a2.25 2.25 0 1 0 2.2 2.25V3h3.3z" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common} fill="currentColor">
          <path d="M13.5 22v-8h2.8l.45-3.3H13.5V8.6c0-.95.3-1.6 1.65-1.6h1.75V4.1A23 23 0 0 0 14.35 4C11.9 4 10.2 5.5 10.2 8.25v2.45H7.4V14h2.8v8h3.3z" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinejoin="round">
          <path d="M3.5 20.5l1.25-4.3A8.5 8.5 0 1 1 8 19.3L3.5 20.5z" />
          <path
            d="M9.2 8.2c.2-.4.5-.4.8-.4h.4c.2 0 .4 0 .5.4l.6 1.5c.1.2 0 .4-.1.6l-.5.6c.6 1.2 1.6 2.2 2.8 2.8l.6-.5c.2-.1.4-.2.6-.1l1.5.6c.3.1.4.3.4.5v.4c0 .3 0 .6-.4.8-.5.3-1.1.5-1.7.4-2.9-.4-5.3-2.8-5.7-5.7-.1-.6.1-1.2.4-1.7z"
            fill="currentColor"
            stroke="none"
          />
        </svg>
      );
  }
}
