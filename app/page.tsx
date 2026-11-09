import { ArrowDown } from "lucide-react";
import Image from "next/image";
import SiteFooter from "@/components/site-footer";
import WaitlistForm from "@/components/waitlist-form";

const highlights = [
  {
    title: "Premium perfume oils",
    text: "Rich, concentrated perfume oils presented in signature Will-Scent bottles.",
  },
  {
    title: "Designer & niche-inspired",
    text: "Distinctive scent profiles inspired by the fragrances people love most.",
  },
  {
    title: "You help choose",
    text: "Tell us which fragrances you would like to see in our launch collection.",
  },
];

export default function Home() {
  return (
    <>
      <main>
        {/* Hero */}
        <section className="relative isolate overflow-hidden bg-[#0A0A0A]">
          <div className="absolute inset-0 -z-10 lg:left-[46%]">
            <Image
              src="/bg-img1.jpeg"
              alt="Will-Scent Perfumery gift bag and perfume oil bottle"
              fill
              priority
              sizes="(min-width: 1024px) 54vw, 100vw"
              className="object-cover object-[50%_25%]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.85)_0%,rgba(10,10,10,0.15)_24%,rgba(10,10,10,0.4)_40%,rgba(10,10,10,0.94)_58%,#0A0A0A_100%)] lg:bg-[linear-gradient(90deg,#0A0A0A_0%,rgba(10,10,10,0.55)_28%,rgba(10,10,10,0.05)_60%)]" />
          </div>

          <div className="mx-auto flex min-h-[100svh] max-w-6xl flex-col px-5 pb-10 pt-5 sm:px-8 lg:min-h-[90vh] lg:pb-16">
            <div className="flex justify-center lg:justify-start">
              <Image
                src="/logo1.png"
                alt="Will-Scent Perfumery"
                width={500}
                height={500}
                priority
                sizes="128px"
                className="h-32 w-32 object-contain drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
              />
            </div>

            <div className="mt-auto max-w-xl lg:my-auto">
              <p className="inline-flex items-center gap-2 rounded-full border border-[#D4AF37]/50 bg-[#0A0A0A]/60 px-3.5 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#E6C875] backdrop-blur-sm">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E6C875]" aria-hidden />
                Launching soon
              </p>
              <h1 className="mt-4 font-serif text-[2.75rem] font-medium leading-[1.02] text-[#F3EAD7] sm:text-6xl lg:text-7xl">
                Premium perfume oils.
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-[#E9E1D2] sm:text-xl">
                Designer and niche-inspired scent profiles from Will-Scent Perfumery. Tell us the fragrances you
                would love, and be first to hear when we launch.
              </p>

              <a
                href="#waitlist"
                className="mt-7 inline-flex h-14 w-full items-center justify-center gap-2 rounded-full bg-[#D4AF37] px-8 text-base font-semibold uppercase tracking-[0.12em] text-[#0A0A0A] shadow-[0_10px_30px_rgba(212,175,55,0.25)] transition hover:bg-[#E6C875] sm:w-auto"
              >
                Join the Waitlist
                <ArrowDown className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </div>
        </section>

        {/* What Will-Scent is */}
        <section className="bg-[#F3EAD7] px-5 py-16 text-[#1c1915] sm:px-8 lg:py-24">
          <div className="mx-auto grid max-w-5xl items-center gap-10 lg:grid-cols-[1fr_0.8fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a6a1c]">Luxury you can smell</p>
              <h2 className="mt-3 font-serif text-4xl font-medium leading-tight sm:text-5xl">
                A scent experience worth remembering.
              </h2>
              <ul className="mt-8 space-y-6">
                {highlights.map((item, index) => (
                  <li key={item.title} className="flex gap-4">
                    <span className="mt-0.5 font-serif text-2xl text-[#a98224]">0{index + 1}</span>
                    <div>
                      <h3 className="text-lg font-semibold">{item.title}</h3>
                      <p className="mt-1 text-base leading-7 text-[#4a4237]">{item.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative mx-auto aspect-[2/3] w-full max-w-[18rem] lg:max-w-sm">
              <Image
                src="/image2.jpeg"
                alt="Will-Scent perfume oil bottle"
                fill
                sizes="(min-width: 1024px) 384px, 288px"
                className="object-contain mix-blend-multiply [mask-image:radial-gradient(ellipse_at_center,black_50%,transparent_72%)]"
              />
            </div>
          </div>
        </section>

        {/* Waitlist */}
        <section id="waitlist" className="relative isolate scroll-mt-4 overflow-hidden bg-[#0A0A0A] px-5 py-16 sm:px-8 lg:py-24">
          <div className="absolute inset-0 -z-10" aria-hidden>
            <Image src="/waitlist-bg.jpg" alt="" fill sizes="100vw" className="object-cover opacity-50" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.16),transparent_60%),linear-gradient(180deg,rgba(10,10,10,0.7),rgba(10,10,10,0.92))]" />
            <Image
              src="/symbol.png"
              alt=""
              width={108}
              height={258}
              className="absolute -right-6 top-10 h-72 w-auto opacity-[0.07] sm:right-10 lg:h-[26rem]"
            />
          </div>

          <div className="mx-auto max-w-lg">
            <div className="text-center">
              <Image src="/symbol.png" alt="" width={108} height={258} className="mx-auto h-12 w-auto" />
              <h2 className="mt-4 font-serif text-4xl font-medium leading-tight text-[#F3EAD7] sm:text-5xl">
                Join the waitlist
              </h2>
              <p className="mx-auto mt-3 max-w-md text-base leading-7 text-[#C8C0B3] sm:text-lg">
                Tell us which fragrances you would like to see, and receive launch updates first.
              </p>
            </div>

            <div className="mt-8">
              <WaitlistForm />
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
