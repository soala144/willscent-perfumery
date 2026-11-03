import { ArrowDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import WaitlistForm from "@/components/waitlist-form";

const socialLinks = {
  instagram: "https://www.instagram.com/willscent_perfumery?cplk=d3NwY2tqcTMyMTM%3D&utm_source=qr",
  facebook: "https://www.facebook.com/share/1D8fpDBsLG/?mibextid=wwXIfr",
  tiktok: "https://www.tiktok.com/@willscentperfumery?_r=1&_t=ZS-9B5pVeYdJ2O",
};

export default function Home() {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center justify-center rounded-full bg-[#0A0A0A]/30 p-1 shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
            <Image
              src="/logo1.png"
              alt="Will-Scent Perfumery logo"
              width={200}
              height={80}
              priority
              className="h-12 w-auto object-contain"
            />
          </Link>
          <nav className="hidden items-center gap-8 text-sm uppercase tracking-[0.18em] text-[#C8C0B3] md:flex">
            <Link href="#about" className="transition hover:text-[#E6C875]">
              About
            </Link>
            <Link href="#waitlist" className="transition hover:text-[#E6C875]">
              Waitlist
            </Link>
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="transition hover:text-[#E6C875]">
              Instagram
            </a>
            <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="transition hover:text-[#E6C875]">
              Facebook
            </a>
            <a href={socialLinks.tiktok} target="_blank" rel="noreferrer" className="transition hover:text-[#E6C875]">
              TikTok
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="relative isolate overflow-hidden bg-[#0A0A0A] text-[#F8F4EC]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.18),transparent_50%)]" />
          <Image
            src="/bg-img1.jpeg"
            alt="Will-Scent Perfumery gift bag and perfume"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(8,8,8,0.88)_0%,rgba(8,8,8,0.68)_55%,rgba(8,8,8,0.36)_100%)]" />

          <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 pb-16 pt-28 sm:px-6 lg:px-8">
            <div className="grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div className="max-w-xl">
                <p className="mb-4 text-xs font-medium uppercase tracking-[0.32em] text-[#E6C875]">
                  LUXURY YOU CAN SMELL
                </p>
                <h1 className="max-w-lg font-serif text-5xl leading-none text-[#F8F4EC] sm:text-6xl lg:text-7xl">
                  Something Beautiful Is Taking Shape.
                </h1>
                <p className="mt-5 text-xl text-[#F8F4EC]/85">Will-Scent Perfumery is coming soon.</p>
                <p className="mt-4 max-w-md text-base leading-7 text-[#C8C0B3]">
                  A considered collection of distinctive perfumes, chosen for their character and lasting impression.
                </p>

                <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <a
                    href="#waitlist"
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-6 py-3 text-sm font-semibold uppercase tracking-[0.12em] text-[#0A0A0A] transition hover:bg-[#E6C875]"
                  >
                    Join the Waitlist
                    <ArrowDown className="h-4 w-4" />
                  </a>
                  <p className="text-sm text-[#C8C0B3]">Be among the first to discover Will-Scent Perfumery.</p>
                </div>
              </div>

              <div className="lg:justify-self-end">
                <div className="rounded-[2rem] border border-[#D4AF37]/30 bg-[#171717]/75 p-5 backdrop-blur-sm">
                  <div className="flex items-center gap-3 border-b border-[#D4AF37]/20 pb-4">
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/10 p-1">
                      <Image
                        src="/logo2.jpg"
                        alt="Will-Scent Perfumery brand mark"
                        width={64}
                        height={64}
                        className="h-full w-full rounded-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.18em] text-[#C8C0B3]">Premier launch</p>
                      <p className="font-serif text-2xl text-[#F8F4EC]">Will-Scent Perfumery</p>
                    </div>
                  </div>
                  <p className="mt-4 max-w-xs text-sm leading-6 text-[#C8C0B3]">
                    A refined selection of perfumes for the moments you want to be remembered.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="border-t border-[#D4AF37]/20 bg-[#0A0A0A] px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
            <div className="relative h-[420px] overflow-hidden rounded-[1.75rem] border border-[#D4AF37]/25 bg-[#171717]">
              <Image
                src="/image2.jpeg"
                alt="Will-Scent Perfumery perfume bottle"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.04),rgba(10,10,10,0.32))]" />
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.24em] text-[#E6C875]">The brand</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#F8F4EC] sm:text-5xl">
                More Than a Fragrance. An Impression.
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-8 text-[#C8C0B3]">
                Will-Scent Perfumery brings together distinctive perfumes selected for their character, depth, and memorable presence.
              </p>
            </div>
          </div>
        </section>

        <section id="waitlist" className="bg-[#12110F] px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="max-w-md">
              <p className="text-xs uppercase tracking-[0.24em] text-[#E6C875]">Join us</p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-[#F8F4EC] sm:text-5xl">
                Be First to Discover Will-Scent Perfumery.
              </h2>
              <p className="mt-5 text-lg leading-8 text-[#C8C0B3]">
                Join our launch list and be among the first to know when our perfume collection becomes available.
              </p>
            </div>

            <WaitlistForm />
          </div>
        </section>
      </main>

      <footer className="border-t border-[#D4AF37]/20 bg-[#0A0A0A] px-4 py-10 text-[#F8F4EC] sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Image
              src="/logo1.png"
              alt="Will-Scent Perfumery logo"
              width={200}
              height={80}
              className="h-12 w-auto object-contain"
            />
            <p className="mt-2 max-w-sm text-sm leading-6 text-[#C8C0B3]">
              Discover a world of captivating fragrance crafted for those who appreciate elegant, distinctive scents.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-[#C8C0B3]">
            <a href={socialLinks.instagram} target="_blank" rel="noreferrer" className="transition hover:text-[#E6C875]">Instagram</a>
            <a href={socialLinks.facebook} target="_blank" rel="noreferrer" className="transition hover:text-[#E6C875]">Facebook</a>
            <a href={socialLinks.tiktok} target="_blank" rel="noreferrer" className="transition hover:text-[#E6C875]">TikTok</a>
          </div>
        </div>

        <div className="mx-auto mt-6 max-w-6xl border-t border-[#D4AF37]/20 pt-6 text-xs uppercase tracking-[0.18em] text-[#C8C0B3]">
          © {new Date().getFullYear()} Will-Scent Perfumery. All rights reserved.
        </div>
      </footer>
    </>
  );
}
