"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useLang } from "@/components/lang-provider";
import { WORK, RESEARCH, COMMUNITY, type Localized } from "@/lib/content/work";
import { GlassFilter } from "@/components/world/GlassFilter";
import { Media } from "@/components/world/Media";

/* In-section product recording: ambient loop plus a corner button that
   steps a quarter of the way through, so a reader can hop between the
   stages of a flow without scrubbing. */
function SectionVideo({ src, next }: { src: string; next: string }) {
  const ref = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const step = () => {
    const el = ref.current;
    if (!el || !el.duration) return;
    const chunk = el.duration / 4;
    const target = (Math.floor(el.currentTime / chunk) + 1) * chunk;
    el.currentTime = target >= el.duration - 0.5 ? 0 : target;
    el.play().catch(() => {});
  };

  return (
    <div className="wd-vid">
      <video
        ref={ref}
        src={`/work/gallery/${src}.mp4`}
        muted
        loop
        playsInline
        autoPlay
        preload="metadata"
      />
      <button className="wd-vid-next" onClick={step} type="button">
        {next}
      </button>
    </div>
  );
}

/**
 * /work/[slug] — quiet detail page for one project. Same silver world
 * language as home, no WebGL: the artifact speaks, the chrome stays
 * out of the way. Media slot fills from public/work/<slug>.png.
 */
export function WorkDetail({ slug }: { slug: string }) {
  const { lang, setLang } = useLang();
  const en = lang === "en";
  const pick = (l: Localized) => (en ? l.en : l.ja);

  const all = [...WORK, ...RESEARCH, ...COMMUNITY];
  const w = all.find((x) => x.slug === slug);
  if (!w) return null;

  return (
    <div className="w-root wd-root">
      <GlassFilter />
      <div className="w-grain" aria-hidden />

      <nav className="w-hud" aria-label="Navigation">
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
        {w.hero && <Media className="wd-media" slug={w.slug} kind={w.hero} />}
        <p className="wd-body">{pick(w.detail)}</p>
        {w.body?.map((s) => {
          const figs = Array.isArray(s.img)
            ? s.img
            : s.img
              ? en
                ? s.img.en
                : s.img.ja
              : [];
          return (
            <section className="wd-sec" key={s.h.en}>
              <h2 className="wd-h2">{pick(s.h)}</h2>
              <p className="wd-p">{pick(s.p)}</p>
              {s.video ? (
                <SectionVideo
                  src={s.video}
                  next={en ? "Next →" : "次へ →"}
                />
              ) : null}
              {figs.length > 0 ? (
                <div
                  className={figs.length > 1 ? "wd-figs wd-figs--2" : "wd-figs"}
                >
                  {figs.map((g) => (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      key={g}
                      className="wd-shot"
                      src={`/work/gallery/${g}.png`}
                      alt=""
                      loading="lazy"
                    />
                  ))}
                </div>
              ) : null}
            </section>
          );
        })}
        {w.gallery && w.gallery.length > 0 ? (
          <div className="wd-gallery">
            {w.gallery.map((g) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={g}
                className="wd-shot"
                src={`/work/gallery/${g}.png`}
                alt=""
                loading="lazy"
              />
            ))}
          </div>
        ) : null}
        {w.code ? (
          <figure className="wd-code">
            <pre>
              <code>{w.code.src}</code>
            </pre>
            <figcaption>{pick(w.code.caption)}</figcaption>
          </figure>
        ) : null}
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
          <Link href="/#work">
            {en ? "← Back to all work" : "← 一覧に戻る"}
          </Link>
        </div>
      </main>
    </div>
  );
}
