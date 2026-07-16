/**
 * Site-wide constants: brand name, URLs, navigation.
 * Keep this small — page-specific content lives in profile.ts and projects.ts.
 */

export const site = {
  name: "Masaki Kawakami",
  title: "Masaki Kawakami · Data & AI, Tokyo to Sydney",
  description:
    "I use AI to change how businesses run, and build the systems behind it myself. COO at Cubic Innov8, builder of Vacanti AI, operator of Review365. Tokyo and Sydney.",
  url: "https://masaki-kawakami.vercel.app",
  locale: "en",
  author: "Masaki Kawakami",
  ogImage: "/og.png",
} as const;

export const nav = {
  primary: [
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
  footer: [
    { href: "/work", label: "Work" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ],
} as const;

export const social = {
  linkedin: "https://www.linkedin.com/in/masaki-kawakami-563643354/",
  github: "https://github.com/masaki-kawa",
  email: "sng1006.trade@gmail.com",
} as const;
