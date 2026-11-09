import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SiteFooter from "@/components/site-footer";
import { contactEmail } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy | Will-Scent Perfumery",
  description: "How Will-Scent Perfumery collects and uses waitlist information.",
};

const lastUpdated = "9 November 2026";

function ContactLine() {
  if (contactEmail) {
    return (
      <a href={`mailto:${contactEmail}`} className="text-[#E6C875] underline underline-offset-4">
        {contactEmail}
      </a>
    );
  }
  return <>replying to any email we send you, or messaging us on our official social media pages</>;
}

export default function PrivacyPage() {
  return (
    <>
      <main className="bg-[#0A0A0A] px-5 py-10 text-[#E9E1D2] sm:px-8">
        <div className="mx-auto max-w-2xl">
          <Link href="/" aria-label="Back to Will-Scent Perfumery home" className="inline-block">
            <Image src="/logo1.png" alt="Will-Scent Perfumery" width={500} height={500} sizes="80px" className="h-20 w-20 object-contain" />
          </Link>

          <h1 className="mt-6 font-serif text-4xl font-medium text-[#F3EAD7] sm:text-5xl">Privacy Policy</h1>
          <p className="mt-2 text-sm text-[#8f8676]">Last updated: {lastUpdated}</p>

          <div className="mt-8 space-y-8 text-base leading-7 [&_h2]:mb-2 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-[#F3EAD7] [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
            <section>
              <h2>Who we are</h2>
              <p>
                Will-Scent Perfumery is a perfume oil brand based in Hungary. This policy explains how we handle the
                information you give us when you join our launch waitlist.
              </p>
            </section>

            <section>
              <h2>What we collect</h2>
              <ul>
                <li>Your email address</li>
                <li>Your location (as you enter it)</li>
                <li>The fragrances or scent profiles you tell us you would like</li>
                <li>The date and time you joined</li>
              </ul>
            </section>

            <section>
              <h2>How we use it</h2>
              <ul>
                <li>To send you Will-Scent launch and fragrance updates by email.</li>
                <li>To understand which fragrances our customers want, so we can plan our collection.</li>
                <li>To understand where interest is coming from, so we can plan delivery.</li>
              </ul>
              <p className="mt-3">
                We use your information on the basis of your consent, which you give by joining the waitlist. We do not
                sell your information or share it with other companies for their own marketing.
              </p>
            </section>

            <section>
              <h2>Who processes it for us</h2>
              <p>
                We use trusted service providers to host this website, store the waitlist securely and send emails. They
                process your information only on our behalf and only for these purposes.
              </p>
            </section>

            <section>
              <h2>How long we keep it</h2>
              <p>
                We keep your information until you unsubscribe or ask us to delete it, or until it is no longer needed
                for launch updates, whichever comes first.
              </p>
            </section>

            <section>
              <h2>Your rights</h2>
              <p>
                You can unsubscribe at any time. You can also ask to see, correct or delete the information we hold about
                you, or withdraw your consent, by contacting us at <ContactLine />.
              </p>
              <p className="mt-3">
                If you are unhappy with how we handle your information, you can complain to the Hungarian National
                Authority for Data Protection and Freedom of Information (NAIH) or the data protection authority in your
                country.
              </p>
            </section>
          </div>

          <Link
            href="/#waitlist"
            className="mt-10 inline-flex h-12 items-center justify-center rounded-full border border-[#D4AF37]/50 px-6 text-sm font-semibold uppercase tracking-[0.12em] text-[#E6C875] transition hover:bg-[#D4AF37]/10"
          >
            Back to the waitlist
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
