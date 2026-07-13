"use client";

/**
 * Contact section — direct, no gimmicks.
 *
 * Three real channels (email / LinkedIn / GitHub) shown as large, copyable
 * cards. Email has a copy button. The mock zsh form was removed so visitors
 * can see exactly how to reach Masaki without thinking.
 */

import { useState } from "react";
import { useLang, t } from "@/components/lang-provider";
import { profile } from "@/content/profile";
import { social } from "@/content/site";

export function Contact() {
  const { lang } = useLang();
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(social.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* clipboard unavailable — silently ignore */
    }
  };

  return (
    <section id="contact" className="border-b border-line bg-bg">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="border-b border-line pb-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-inkDim">
            <span className="text-mint">$</span> say hello
          </p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <h2
              className={`text-[36px] leading-[0.95] tracking-[-0.02em] text-ink md:text-[48px] ${
                lang === "ja" ? "font-jp" : ""
              }`}
              style={{ fontWeight: 600 }}
            >
              {lang === "en" ? "Contact" : "連絡先"}
            </h2>
            <p
              className={`pb-1 text-[11px] text-inkDim ${
                lang === "ja" ? "font-jp" : "font-mono uppercase tracking-[0.22em]"
              }`}
            >
              {lang === "en" ? "reply within 24h" : "24時間以内に返信"}
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-12 md:grid-cols-[1fr_1fr]">
          {/* Left: the pitch */}
          <div>
            <h3
              className={`text-[28px] leading-[1.15] tracking-[-0.02em] text-ink md:text-[36px] ${
                lang === "ja" ? "font-jp" : ""
              }`}
              style={{ fontWeight: 600 }}
            >
              {lang === "en"
                ? "I'd love to hear from you."
                : "ご連絡お待ちしています。"}
            </h3>
            <p
              className={`mt-5 max-w-md text-[16px] leading-[1.65] text-inkMuted ${
                lang === "ja" ? "font-jp" : ""
              }`}
            >
              {t(profile.home.closing, lang)}
            </p>
          </div>

          {/* Right: real contact channels */}
          <div className="flex flex-col gap-3">
            {/* Email — primary, with copy button */}
            <div className="rounded-lg border border-line2 bg-panel p-5 transition-colors hover:border-mint/50">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-inkDim">
                {lang === "en" ? "Email · primary" : "メール · 最優先"}
              </p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`mailto:${social.email}`}
                  className="break-all font-mono text-[18px] text-ink transition-colors hover:text-mint"
                >
                  {social.email}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="shrink-0 rounded-md border border-line2 bg-bg px-3 py-1.5 font-mono text-[11px] text-inkMuted transition-colors hover:border-mint/50 hover:text-mint"
                  aria-label={lang === "en" ? "Copy email" : "メールをコピー"}
                >
                  {copied
                    ? lang === "en"
                      ? "✓ copied"
                      : "✓ コピー済"
                    : lang === "en"
                      ? "copy"
                      : "コピー"}
                </button>
              </div>
            </div>

            {/* LinkedIn */}
            <a
              href={social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-lg border border-line2 bg-panel p-5 transition-colors hover:border-mint/50"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-inkDim">
                  LinkedIn
                </p>
                <p className="mt-2 font-mono text-[15px] text-ink transition-colors group-hover:text-mint">
                  /in/masaki-kawakami
                </p>
              </div>
              <span className="font-mono text-inkDim transition-colors group-hover:text-mint">
                →
              </span>
            </a>

            {/* GitHub */}
            <a
              href={social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-lg border border-line2 bg-panel p-5 transition-colors hover:border-mint/50"
            >
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-inkDim">
                  GitHub
                </p>
                <p className="mt-2 font-mono text-[15px] text-ink transition-colors group-hover:text-mint">
                  @masaki-kawa
                </p>
              </div>
              <span className="font-mono text-inkDim transition-colors group-hover:text-mint">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
