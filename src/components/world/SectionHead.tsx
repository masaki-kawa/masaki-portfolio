import type { Section } from "@/lib/content/sections";

/**
 * The chapter header: a small numbered eyebrow (number, rule, EN label,
 * muted JA label) over a large serif display headline. The refined
 * mincho headline is the section's anchor; no photo needed.
 */
export function SectionHead({ s, en }: { s: Section; en: boolean }) {
  return (
    <div className="c-shead-wrap">
      <p className="c-shead w-reveal" aria-hidden>
        <span className="c-shead-n">{s.n}</span>
        <span className="c-shead-rule" />
        <span className="c-shead-en">{s.labelEn}</span>
        <span className="c-shead-ja">{s.labelJa}</span>
      </p>
      <h2 className={en ? "w-headline w-reveal" : "w-headline w-serif w-reveal"}>
        {en ? s.headline.en : s.headline.ja}
      </h2>
    </div>
  );
}
