export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Contact email shown in the privacy policy. Set NEXT_PUBLIC_CONTACT_EMAIL in .env.
export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "";

// WhatsApp link, e.g. https://wa.me/36301234567 (country code + number, no + or spaces).
// Set NEXT_PUBLIC_WHATSAPP_URL in .env. The icon is hidden until this is set.
const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL ?? "";

export type SocialKey = "instagram" | "tiktok" | "facebook" | "whatsapp";

export const socialLinks: { key: SocialKey; label: string; href: string }[] = [
  { key: "instagram", label: "Instagram", href: "https://www.instagram.com/willscent_perfumery/" },
  { key: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@willscentperfumery" },
  { key: "facebook", label: "Facebook", href: "https://www.facebook.com/share/1D8fpDBsLG/" },
  { key: "whatsapp", label: "WhatsApp", href: whatsappUrl },
].filter((link) => link.href) as { key: SocialKey; label: string; href: string }[];
