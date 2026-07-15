import type { Section } from "@/lib/content/sections";

/**
 * The chapter header: a small numbered eyebrow (number, rule, label in
 * the active language only) over a large serif display headline. One
 * language at a time, never both at once.
 */
export function SectionHead({
  s,
  en,
  compact = false,
}: {
  s: Section;
  en: boolean;
  /* compact drops the large display headline: used for sub-sections
     (e.g. Approach inside About) that only need the numbered eyebrow */
  compact?: boolean;
}) {
  return (
    <div className={compact ? "c-shead-wrap c-shead-compact" : "c-shead-wrap"}>
      <p className="c-shead w-reveal" aria-hidden>
        <span className="c-shead-n">{s.n}</span>
        <span className="c-shead-rule" />
        <span className="c-shead-en">{en ? s.labelEn : s.labelJa}</span>
      </p>
      {!compact && (
        <h2
          className={en ? "w-headline w-reveal" : "w-headline w-serif w-reveal"}
        >
          {en ? s.headline.en : s.headline.ja}
        </h2>
      )}
    </div>
  );
}
