import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SocialIcon from "@/components/social-icon";
import { socialLinks } from "@/lib/site";

export default function SiteFooter() {
  return (
    <footer className="border-t border-[#D4AF37]/20 bg-[#0A0A0A] px-5 pb-8 pt-12 text-[#F3EAD7] sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <Image
          src="/logo1.png"
          alt="Will-Scent Perfumery"
          width={500}
          height={500}
          sizes="112px"
          className="h-28 w-28 object-contain"
        />
        <p className="mt-2 max-w-sm text-base leading-7 text-[#C8C0B3]">
          Premium perfume oils. Distinctive fragrances. A scent experience worth remembering.
        </p>
        <p className="mt-3 font-serif text-xl italic text-[#E6C875]">Luxury you can smell.</p>

        <ul className="mt-7 flex items-center gap-3" aria-label="Will-Scent on social media">
          {socialLinks.map((link) => (
            <li key={link.key}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Will-Scent Perfumery on ${link.label}`}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#D4AF37]/35 text-[#E6C875] transition hover:border-[#E6C875] hover:bg-[#D4AF37]/10"
              >
                <SocialIcon name={link.key} />
              </a>
            </li>
          ))}
        </ul>

        <p className="mt-7 inline-flex items-center gap-2 text-sm text-[#C8C0B3]">
          <MapPin className="h-4 w-4 text-[#D4AF37]" aria-hidden />
          Based in Hungary
        </p>
      </div>

      <div className="mx-auto mt-8 flex max-w-5xl flex-col items-center gap-3 border-t border-[#D4AF37]/15 pt-6 text-xs text-[#8f8676] sm:flex-row sm:justify-between">
        <p>© {new Date().getFullYear()} Will-Scent Perfumery. All rights reserved.</p>
        <Link href="/privacy" className="py-2 underline-offset-4 hover:text-[#E6C875] hover:underline">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
