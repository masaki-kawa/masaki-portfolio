"use client";

import Link from "next/link";
import { useLang } from "@/components/lang-provider";

/**
 * 404 in the same silver world language as everything else: quiet,
 * one language at a time, one way back.
 */
export default function NotFound() {
  const { lang, setLang } = useLang();
  const en = lang === "en";

  return (
    <div className="w-root wd-root">
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
          <Link href="/">{en ? "← Home" : "← ホーム"}</Link>
        </p>
        <h1 className="wd-name">404</h1>
        <p className="wd-lead">
          {en
            ? "This page does not exist, or it has moved."
            : "このページは存在しないか、移動しました。"}
        </p>
        <div className="wd-next">
          <Link href="/#work">
            {en ? "← Back to all work" : "← 一覧に戻る"}
          </Link>
        </div>
      </main>
    </div>
  );
}
