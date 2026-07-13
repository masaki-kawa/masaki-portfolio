"use client";

/**
 * About section — "cat ./about.txt".
 *
 * Client component because it reads from the language context. If we
 * later adopt an SSR-friendly language strategy (cookie / URL param),
 * this can move back to a Server Component.
 */

import Link from "next/link";
import { useLang } from "@/components/lang-provider";
import { profile } from "@/content/profile";

export function About() {
  const { lang } = useLang();
  const paras = lang === "en" ? profile.home.about.en : profile.home.about.ja;

  const metaRows: { k: string; v: string }[] = [
    { k: "From", v: lang === "en" ? "Itami, Hyogo, Japan" : "兵庫県伊丹市" },
    { k: "Now", v: lang === "en" ? "Sydney, NSW" : "シドニー" },
    {
      k: "Edu",
      v:
        lang === "en"
          ? "MSc Data Science, University of Technology Sydney (Jun 2026)\nBCom, Kwansei Gakuin University (2017)"
          : "シドニー工科大学 データサイエンス修士（2026年6月修了）\n関西学院大学 商学部（2017年卒）",
    },
    {
      k: "Past",
      v:
        lang === "en"
          ? "5y HR · Canon Marketing Japan"
          : "人事5年 / キヤノンマーケティングジャパン",
    },
    {
      k: "Cert",
      v:
        lang === "en"
          ? "PTE Academic · IT Passport · Bookkeeping L2"
          : "PTE Academic / ITパスポート / 簿記2級",
    },
    {
      k: "Visa",
      v:
        lang === "en"
          ? "Student → Graduate (work rights confirmed)"
          : "学生 → 卒業生ビザ切替（就労権確認済み）",
    },
    {
      k: "Open",
      v:
        lang === "en"
          ? "Sydney (primary) · Tokyo (Sep 2026+)"
          : "シドニー最優先 / 東京は2026年9月以降",
    },
    { k: "Lang", v: lang === "en" ? "JA native · EN business" : "日本語ネイティブ・英語ビジネス" },
  ];

  return (
    <section id="about" className="border-b border-line bg-bg">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-6 py-20 md:grid-cols-[1fr_2fr]">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-inkDim">
            <span className="text-mint">$</span> cat ./about.txt
          </p>
          <h2
            className={`mt-3 text-[36px] leading-[0.95] tracking-[-0.02em] text-ink md:text-[44px] ${
              lang === "ja" ? "font-jp" : ""
            }`}
            style={{ fontWeight: 600 }}
          >
            {lang === "en" ? "About" : "自己紹介"}
          </h2>
          <p
            className={`mt-4 text-[11px] text-inkDim ${
              lang === "ja" ? "font-jp" : "font-mono uppercase tracking-[0.22em]"
            }`}
          >
            {lang === "en" ? "a quick story · 1 min read" : "短い話 · 1分"}
          </p>

          <div className="mt-10 grid grid-cols-2 gap-4 font-mono text-[11px] md:grid-cols-1">
            {metaRows.map((row) => (
              <div
                key={row.k}
                className="flex items-baseline gap-3 border-b border-line/60 pb-2"
              >
                <span className="w-12 shrink-0 uppercase tracking-[0.18em] text-inkDim">
                  {row.k}
                </span>
                <span
                  className={`min-w-0 flex-1 whitespace-pre-line text-ink ${
                    lang === "ja" ? "font-jp" : ""
                  }`}
                >
                  {row.v}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="space-y-6">
            {paras.map((p, i) => (
              <p
                key={i}
                className={`max-w-prose text-[18px] leading-[1.65] text-ink ${
                  lang === "ja" ? "font-jp text-[16px] leading-[2]" : ""
                }`}
              >
                {p}
              </p>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-3 font-mono text-sm">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-md border border-line2 bg-panel px-3 py-1.5 text-ink transition-colors hover:border-mint/50 hover:text-mint"
            >
              <span className="text-inkDim">$</span>
              <span>man masaki</span>
            </Link>
            <a
              href="/resume.pdf"
              className="inline-flex items-center gap-2 rounded-md border border-line2 bg-panel px-3 py-1.5 text-ink transition-colors hover:border-mint/50 hover:text-mint"
            >
              <span className="text-inkDim">$</span>
              <span>download resume.pdf</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
