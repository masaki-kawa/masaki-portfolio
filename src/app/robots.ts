import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/* /lab is kept out of the index by its own noindex meta tag, so the
   crawler must stay allowed to fetch it and read that tag. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
