"use client";

/**
 * Top terminal chrome — traffic-light dots, shell label, live clock,
 * EN/JA language toggle, and the "L" keyboard shortcut.
 *
 * Must be a client component: it owns the clock interval, the keydown
 * listener, and reads/writes the shared language context.
 */

import { useEffect, useState } from "react";
import { useLang } from "@/components/lang-provider";

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function fmtTime(d: Date): string {
  return `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

export function TopBar() {
  const { lang, setLang } = useLang();
  const [now, setNow] = useState<Date | null>(null);

  // Start the clock only after mount to avoid SSR/CSR hydration mismatch.
  // The first tick is queued as a microtask so `setNow` runs from a
  // callback rather than synchronously in the effect body.
  useEffect(() => {
    const tick = () => setNow(new Date());
    queueMicrotask(tick);
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  // Keyboard shortcut: press L to toggle language. Ignore when the user
  // is actively typing in an input or textarea (e.g. the Contact shell).
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA")
      ) {
        return;
      }
      if (e.key === "l" || e.key === "L") {
        setLang(lang === "en" ? "ja" : "en");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lang, setLang]);

  return (
    <div className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <div className="mx-auto flex h-10 max-w-6xl items-center justify-between px-4 font-mono text-[11px] text-inkMuted">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5">
            <span className="dot-r h-2 w-2 rounded-full" />
            <span className="dot-y h-2 w-2 rounded-full" />
            <span className="dot-g h-2 w-2 rounded-full" />
          </span>
          <span className="hidden sm:inline">~/masaki · zsh</span>
          <span className="hidden text-inkDim md:inline">· 88×24</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="inline-flex items-center gap-1.5">
            <span className="pulse-soft inline-block h-1.5 w-1.5 rounded-full bg-mint" />
            LIVE · Sydney {now ? fmtTime(now) : "--:--:--"}
          </span>
          <span className="hidden text-inkDim md:inline">
            {lang === "en" ? "press" : "押す"}{" "}
            <span className="kbd">L</span>{" "}
            {lang === "en" ? "to switch" : "で切替"}
          </span>
          <button
            type="button"
            aria-label="Toggle language"
            onClick={() => setLang(lang === "en" ? "ja" : "en")}
            className="group relative inline-flex overflow-hidden rounded border border-line2 text-[10px] uppercase tracking-[0.14em]"
          >
            <span
              className={`px-2 py-0.5 transition-colors ${
                lang === "en"
                  ? "bg-mint text-bg"
                  : "text-inkMuted hover:text-ink"
              }`}
            >
              EN
            </span>
            <span
              className={`border-l border-line2 px-2 py-0.5 transition-colors ${
                lang === "ja"
                  ? "bg-mint text-bg"
                  : "text-inkMuted hover:text-ink"
              }`}
            >
              JA
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
