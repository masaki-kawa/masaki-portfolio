"use client";

import { useEffect, useRef, useState } from "react";
import { useLang, t } from "@/components/lang-provider";
import { profile } from "@/content/profile";
import { Scramble, TypedLine } from "./typography";

export function Hero() {
  const { lang } = useLang();
  const wrapRef = useRef<HTMLElement | null>(null);
  const [pos, setPos] = useState({ x: 0.5, y: 0.5, px: 0, py: 0 });
  const [inside, setInside] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      setPos({ x, y, px: e.clientX - r.left, py: e.clientY - r.top });
    };
    const onEnter = () => setInside(true);
    const onLeave = () => setInside(false);
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  const spot = {
    background: `radial-gradient(600px 400px at ${pos.x * 100}% ${pos.y * 100}%, rgba(124,240,194,0.10), transparent 60%)`,
  };

  const whoami = t(profile.home.whoami, lang);

  return (
    <section
      ref={wrapRef}
      className="relative overflow-hidden border-b border-line bg-bg"
    >
      <div className="spot" style={spot} aria-hidden />
      <div className="spot crt-scan" aria-hidden />
      <div className="spot crt-vignette" aria-hidden />
      <div
        aria-hidden
        className="scan-line pointer-events-none absolute left-0 right-0 h-px bg-mint/10"
      />

      {inside && (
        <div
          className="track-dot"
          style={{ left: pos.px, top: pos.py }}
          aria-hidden
        />
      )}

      <div className="relative mx-auto max-w-6xl px-6 pb-24 pt-16 md:pb-28 md:pt-20">
        <div className="flex items-baseline justify-between font-mono text-[11px] text-inkDim">
          <span>/home/masaki/portfolio.index</span>
          <span className="hidden sm:inline">rev · 001 · 2026</span>
        </div>

        <div className="mt-6">
          <p
            className={`font-mono text-[10px] uppercase tracking-[0.22em] text-inkDim ${
              lang === "ja" ? "font-jp normal-case tracking-normal" : ""
            }`}
          >
            {lang === "en" ? "Role" : "役割"}
          </p>
          <p
            className={`mt-2 text-[15px] text-ink ${
              lang === "ja" ? "font-jp" : "font-mono"
            }`}
          >
            <span className="text-mint">→ </span>
            <TypedLine text={whoami} className="text-ink" />
          </p>
        </div>

        <h1
          className="mt-10 leading-[0.88] tracking-[-0.035em] text-ink"
          style={{ fontSize: "clamp(3.25rem, 11vw, 9rem)", fontWeight: 600 }}
        >
          {lang === "en" ? (
            <>
              <Scramble value="Masaki" className="block" />
              <Scramble value="Kawakami." className="block" />
            </>
          ) : (
            <Scramble value="川上 勝基" className="block" />
          )}
        </h1>

        <div className="mt-10 grid max-w-4xl gap-3 border-t border-line pt-6 sm:grid-cols-[8rem_1fr]">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-inkDim">
            Tagline
          </span>
          <p
            className={`text-[20px] leading-[1.45] text-ink sm:text-[22px] ${
              lang === "ja" ? "font-jp" : ""
            }`}
          >
            {t(profile.home.tagline, lang)}
          </p>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-inkDim">
            Subtitle
          </span>
          <p
            className={`text-[14px] text-inkMuted ${
              lang === "ja" ? "font-jp" : ""
            }`}
          >
            {t(profile.home.subtag, lang)}
          </p>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-inkDim">
            Now
          </span>
          <ul className="space-y-1">
            {profile.home.now.map((row, i) => (
              <li key={i} className="flex items-baseline gap-3">
                <span className="font-mono text-inkDim">&gt;</span>
                <span
                  className={`text-ink ${lang === "ja" ? "font-jp" : ""}`}
                >
                  {t(row, lang)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-12 flex flex-wrap items-center gap-3">
          <a
            href="#work"
            className="group relative inline-flex items-center gap-2 rounded-md border border-mint/40 bg-mint/10 px-4 py-2 font-mono text-[13px] text-mint transition-colors hover:bg-mint/20"
          >
            <span className="text-inkDim">$</span>
            <span className="glitch">open ./work</span>
            <span className="text-inkDim">→</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-md border border-line2 bg-panel px-4 py-2 font-mono text-[13px] text-ink transition-colors hover:border-ink/40"
          >
            <span className="text-inkDim">$</span>
            <span className="glitch">mail masaki</span>
          </a>
          <span className="font-mono text-[11px] text-inkDim">
            {lang === "en" ? "or scroll" : "または下へ"}{" "}
            <span aria-hidden>↓</span>
          </span>
        </div>
      </div>
    </section>
  );
}
