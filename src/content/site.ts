/**
 * Site-wide constants: brand name, URLs, navigation.
 * Keep this small — page-specific content lives in profile.ts and projects.ts.
 */

export const site = {
  name: "Masaki Kawakami",
  title: "Masaki Kawakami · AI-native full-stack builder",
  description:
    "AI-native full-stack builder based in Sydney. Building production AI products across recruiting, local SEO, and data, with a background in HR and startup operations.",
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
