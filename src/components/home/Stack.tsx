"use client";

/**
 * Stack section — "uname -a · ./stack".
 *
 * Honest framing: Masaki writes Python and SQL directly; everything else
 * (Next.js / Supabase / Stripe / Chrome extension) was vibe-coded with
 * Claude Code. We lead with that as a differentiator rather than hiding
 * it behind a generic skill list.
 */

import { useLang } from "@/components/lang-provider";

export function Stack() {
  const { lang } = useLang();

  const groups: { k: string; v: string; localised?: boolean }[] = [
    {
      k: "how I build",
      v:
        lang === "en"
          ? "Vibe-coded. I own design, code review, and ship calls; AI writes the implementation."
          : "バイブコーディング。設計・コードレビュー・本番判断は私が握り、実装は AI に書かせます。",
      localised: true,
    },
    {
      k: "write directly",
      v: "Python · SQL",
    },
    {
      k: "ship with (AI-built)",
      v: "Next.js · React · TypeScript · Tailwind · shadcn/ui · Supabase · pgvector · Anthropic Claude · Stripe · Chrome MV3",
    },
    {
      k: "ai tooling",
      v: "Claude Code · Codex · MCP · Anthropic API · OpenAI API",
    },
    {
      k: "ml",
      v: "pandas · NumPy · scikit-learn · LightGBM · XGBoost · PyTorch · Hugging Face",
    },
    {
      k: "data eng",
      v: "Airflow · dbt · Spark · Databricks · Snowflake · BigQuery · Postgres · Docker",
    },
    {
      k: "cloud",
      v: "GCP (Composer / Cloud SQL / GCS) · Azure · AWS",
    },
    {
      k: "bi",
      v: "Streamlit · Plotly · Tableau · Power BI",
    },
    {
      k: "ops",
      v: "Vercel · Stripe · Clerk · GitHub · Notion · n8n · Slack",
    },
    {
      k: "people & talent",
      v:
        lang === "en"
          ? "HR (Canon, 5 yrs) · workforce planning · group-wide promotion assessment · HR KPI dashboards"
          : "人事5年（キヤノン）/ 配置計画 / グループ全体の昇格アセスメント / HR KPI ダッシュボード",
      localised: true,
    },
    {
      k: "growth",
      v:
        lang === "en"
          ? "Local SEO (MEO) · GEO / AIO tracking · GBP ops · cross-border GTM (JP↔AU) · founder-led sales · startup COO"
          : "ローカル SEO（MEO）/ GEO・AIO 追跡 / GBP 運用 / 越境 GTM（JP↔AU）/ ファウンダー営業 / スタートアップ COO",
      localised: true,
    },
    {
      k: "trade",
      v: "MQL5 · 8+ yrs FX / crypto / indices",
    },
  ];

  return (
    <section className="border-b border-line bg-bg">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <div className="border-b border-line pb-6">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-inkDim">
            <span className="text-mint">$</span> uname -a · ./stack
          </p>
          <div className="mt-3 flex items-end justify-between gap-4">
            <h2
              className={`text-[36px] leading-[0.95] tracking-[-0.02em] text-ink md:text-[48px] ${
                lang === "ja" ? "font-jp" : ""
              }`}
              style={{ fontWeight: 600 }}
            >
              {lang === "en" ? "Stack" : "技術スタック"}
            </h2>
            <p
              className={`pb-1 text-[11px] text-inkDim ${
                lang === "ja" ? "font-jp" : "font-mono uppercase tracking-[0.22em]"
              }`}
            >
              {lang === "en" ? "what I build with" : "道具立て"}
            </p>
          </div>
        </div>

        <div className="mt-6 divide-y divide-line">
          {groups.map((g) => (
            <div
              key={g.k}
              className="grid grid-cols-[8rem_1fr] gap-6 py-4 md:grid-cols-[12rem_1fr]"
            >
              <span className="font-mono text-[12px] uppercase tracking-[0.18em] text-inkDim">
                {g.k}
              </span>
              <span
                className={`text-[15px] text-ink ${
                  lang === "ja" && g.localised ? "font-jp" : ""
                }`}
              >
                {g.v}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
