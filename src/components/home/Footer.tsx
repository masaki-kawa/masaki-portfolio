"use client";

/**
 * Home-specific footer — tiny monospace strip with copyright, a build
 * credit line, and the L-to-switch hint.
 *
 * Kept separate from the site-wide `src/components/layout/Footer.tsx`
 * because the Terminal Home replaces the global chrome.
 */

import { useLang } from "@/components/lang-provider";

export function HomeFooter() {
  const { lang } = useLang();
  return (
    <footer className="bg-bg">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 font-mono text-[11px] text-inkDim sm:flex-row sm:items-center sm:justify-between">
        <p>© 2026 · Masaki Kawakami · Sydney, AU</p>
        <p className={lang === "ja" ? "font-jp" : ""}>
          {lang === "en"
            ? "built with care · Next.js · Tailwind · Claude"
            : "丁寧に作りました / Next.js / Tailwind / Claude"}
        </p>
        <p>
          <span className="text-inkDim">press</span>{" "}
          <span className="kbd">L</span>{" "}
          <span className="text-inkDim">
            {lang === "en" ? "for" : "で"}
          </span>{" "}
          <span className="kbd">{lang === "en" ? "JA" : "EN"}</span>
        </p>
      </div>
    </footer>
  );
}
