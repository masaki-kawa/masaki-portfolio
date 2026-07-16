import type { MetadataRoute } from "next";
import { WORK, RESEARCH, COMMUNITY } from "@/lib/content/work";
import { site } from "@/content/site";

/* Home plus every project detail page. /lab is intentionally absent
   (internal playground, noindex). */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages = [...WORK, ...RESEARCH, ...COMMUNITY].map((w) => ({
    url: `${site.url}/work/${w.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [
    { url: site.url, changeFrequency: "monthly", priority: 1 },
    ...pages,
  ];
}
