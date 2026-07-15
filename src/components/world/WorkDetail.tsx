"use client";

import Link from "next/link";
import { useLang } from "@/components/lang-provider";
import { WORK, RESEARCH, type Localized } from "@/lib/content/work";
import { GlassFilter } from "@/components/world/GlassFilter";
import { Media } from "@/components/world/Media";

/**
 * /work/[slug] — quiet detail page for one project. Same silver world
 * language as home, no WebGL: the artifact speaks, the chrome stays
 * out of the way. Media slot fills from public/work/<slug>.png.
 */
export function WorkDetail({ slug }: { slug: string }) {
  const { lang, setLang } = useLang();
  const en = lang === "en";
  const pick = (l: Localized) => (en ? l.en : l.ja);

  const all = [...WORK, ...RESEARCH];
  const i = all.findIndex((w) => w.slug === slug);
  const w = all[i];
  if (!w) return null;
  const next = all[(i + 1) % all.length];

  return (
    <div className="w-root wd-root">
      <GlassFilter />
      <div className="w-grain" aria-hidden />

      <nav className="w-hud" aria-label="Navigation">
        <Link className="w-brand" href="/" aria-label="Masaki Kawakami">
          MK
        </Link>
        <button
          className="w-lang"
          onClick={() => setLang(en ? "ja" : "en")}
          aria-label="Switch language"
        >
          <span className={en ? "on" : ""}>EN</span>
          <span className={en ? "" : "on"}>日本語</span>
        </button>
      </nav>

      <main className="wd-main">
        <p className="wd-back">
          <Link href="/#work">{en ? "← Work" : "← 仕事一覧"}</Link>
        </p>
        <h1 className="wd-name">
          {w.name}
          {w.tag ? <em className="w-tag">{pick(w.tag)}</em> : null}
        </h1>
        <p className="wd-lead">{pick(w.desc)}</p>
        <Media className="wd-media" slug={w.slug} />
        <p className="wd-body">{pick(w.detail)}</p>
        {w.body?.map((s) => (
          <section className="wd-sec" key={s.h.en}>
            <h2 className="wd-h2">{pick(s.h)}</h2>
            <p className="wd-p">{pick(s.p)}</p>
          </section>
        ))}
        {w.links && w.links.length > 0 ? (
          <div className="wd-links">
            {w.links.map((l) => (
              <a key={l.href} href={l.href} target="_blank" rel="noreferrer">
                {l.label} ↗
              </a>
            ))}
          </div>
        ) : null}
        <div className="wd-next">
          <span>{en ? "Next" : "次"}</span>
          <Link href={`/work/${next.slug}`}>{next.name} →</Link>
        </div>
      </main>
    </div>
  );
}
