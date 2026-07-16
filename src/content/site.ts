/**
 * Site-wide constants: brand name, URLs, metadata copy.
 * Keep this small; page content lives in src/lib/content/.
 */

export const site = {
  name: "Masaki Kawakami",
  title: "Masaki Kawakami · Data & AI, Tokyo to Sydney",
  description:
    "I use AI to change how businesses run, and build the workflows behind it myself. COO at Cubic Innov8, builder of Vacanti AI, operator of Review365. Based in Sydney, working across Japan and Australia.",
  url: "https://masaki-kawakami.vercel.app",
  locale: "en",
  author: "Masaki Kawakami",
  ogImage: "/og.png",
} as const;

export const social = {
  linkedin: "https://www.linkedin.com/in/masaki-kawakami-563643354/",
  github: "https://github.com/masaki-kawa",
  email: "sng1006.trade@gmail.com",
} as const;
