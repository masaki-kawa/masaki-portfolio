"use client";

/**
 * Selected work list — styled as `ls -la ./work`.
 * Items are split into two groups: professional and academic.
 * Each row expands on hover to reveal detail + stack chips.
 */

import Link from "next/link";
import { useLang, t } from "@/components/lang-provider";
import {
  homeWork,
  type HomeWorkCategory,
  type HomeWorkItem,
} from "@/content/projects";
import { Scramble } from "./typography";
import type { CopyEnJa } from "@/types/lang";

const groupMeta: Record<
  HomeWorkCategory,
  { cmd: string; title: CopyEnJa }
> = {
  professional: {
    cmd: "ls ./work/professional",
    title: { en: "Professional", ja: "仕事" },
  },
  academic: {
    cmd: "ls ./work/academic",
    title: { en: "Academic", ja: "学業" },
  },
};

export function Work() {
  const { lang } = useLang();

  const professional = homeWork.filter((w) => w.category === "professional");
  const academic = homeWork.filter((w) => w.category === "academic");

  return (
    <section id="work" className="border-b border-line bg-bg">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="border-b border-line pb-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-inkDim">
            <span className="text-mint">$</span> ls -la ./work
          </p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <h2
              className={`text-[36px] leading-[0.95] tracking-[-0.02em] text-ink md:text-[48px] ${
                lang === "ja" ? "font-jp" : ""
              }`}
              style={{ fontWeight: 600 }}
            >
              {lang === "en" ? "Selected Work" : "主な仕事と研究"}
            </h2>
            <p
              className={`pb-1 text-[11px] text-inkDim ${
                lang === "ja" ? "font-jp" : "font-mono uppercase tracking-[0.22em]"
              }`}
            >
              {lang === "en"
                ? `${homeWork.length} items · hover to inspect`
                : `${homeWork.length}件 · ホバーで詳細`}
            </p>
          </div>
        </div>

        <WorkGroup items={professional} category="professional" />
        <WorkGroup items={academic} category="academic" />

        <div className="mt-6 flex justify-end">
          <Link
            href="/work"
            className="font-mono text-sm text-inkMuted transition-colors hover:text-mint"
          >
            ls ../work →
          </Link>
        </div>
      </div>
    </section>
  );
}

function WorkGroup({
  items,
  category,
}: {
  items: HomeWorkItem[];
  category: HomeWorkCategory;
}) {
  const { lang } = useLang();
  const meta = groupMeta[category];

  if (items.length === 0) return null;

  return (
    <div className="mt-12">
      <div className="flex items-baseline justify-between gap-4 border-b border-line pb-3">
        <div className="flex items-baseline gap-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-inkDim">
            <span className="text-mint">$</span> {meta.cmd}
          </p>
          <h3
            className={`text-[20px] leading-tight tracking-tight text-ink md:text-[22px] ${
              lang === "ja" ? "font-jp" : ""
            }`}
            style={{ fontWeight: 500 }}
          >
            {t(meta.title, lang)}
          </h3>
        </div>
        <span
          className={`pb-1 text-[11px] text-inkDim ${
            lang === "ja" ? "font-jp" : "font-mono uppercase tracking-[0.22em]"
          }`}
        >
          {lang === "en" ? `${items.length} items` : `${items.length}件`}
        </span>
      </div>

      {/* Column header */}
      <div className="grid grid-cols-[4rem_1fr_auto] items-center gap-6 border-b border-line py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-inkDim md:grid-cols-[4rem_1fr_16rem_9rem_7rem]">
        <span>Year</span>
        <span>Name</span>
        <span className="hidden md:block">Summary</span>
        <span className="hidden md:block">Role</span>
        <span className="text-right">Status</span>
      </div>

      <ul>
        {items.map((w) => (
          <li
            key={w.id}
            className="row-reveal group border-b border-line"
          >
            <Link
              href={w.href}
              className="grid grid-cols-[4rem_1fr_auto] items-center gap-6 py-5 transition-colors md:grid-cols-[4rem_1fr_16rem_9rem_7rem]"
            >
              <span className="font-mono text-sm tabular-nums text-inkMuted">
                {w.year}
              </span>
              <div>
                <div className="text-[22px] leading-tight tracking-tight text-ink transition-colors group-hover:text-mint md:text-[26px]">
                  <Scramble value={t(w.title, lang)} />
                </div>
                <div className="mt-1 font-mono text-[11px] text-inkDim md:hidden">
                  {t(w.one, lang)}
                </div>
              </div>
              <span
                className={`hidden text-sm text-inkMuted md:block ${
                  lang === "ja" ? "font-jp" : ""
                }`}
              >
                {t(w.one, lang)}
              </span>
              <span
                className={`hidden font-mono text-[11px] uppercase tracking-[0.18em] text-inkMuted md:block ${
                  lang === "ja" ? "font-jp normal-case tracking-normal" : ""
                }`}
              >
                {t(w.role, lang)}
              </span>
              <span className="pill justify-self-end">
                <span
                  className={`inline-block h-1.5 w-1.5 rounded-full ${
                    w.status === "shipping"
                      ? "pulse-soft bg-mint"
                      : w.status === "live"
                        ? "bg-amber"
                        : "bg-inkDim"
                  }`}
                />
                {w.status}
              </span>
            </Link>

            {/* Reveal on hover */}
            <div className="row-detail">
              <div className="grid gap-8 border-t border-line/60 bg-panel/50 px-0 pb-6 pt-5 md:grid-cols-[4rem_1fr_auto] md:gap-6">
                <span className="hidden font-mono text-[11px] text-inkDim md:block">
                  └─
                </span>
                <div>
                  <p
                    className={`max-w-prose text-[15px] leading-[1.6] text-ink/90 ${
                      lang === "ja" ? "font-jp leading-[1.9]" : ""
                    }`}
                  >
                    {t(w.detail, lang)}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {w.stack.map((s) => (
                      <li
                        key={s}
                        className="pill"
                        style={{
                          textTransform: "none",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="self-end font-mono text-[11px] text-inkDim">
                  {lang === "en" ? "open →" : "開く →"}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
