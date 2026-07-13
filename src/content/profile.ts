/**
 * Masaki's profile — single source of truth for About / Home / Contact pages.
 * Edit here; pages pick up changes automatically.
 */

import type { CopyEnJa } from "@/types/lang";

export const profile = {
  name: {
    en: "Masaki Kawakami",
    ja: "川上 勝基",
  },
  location: "Sydney, Australia",
  availability: "Open to opportunities in Australia and Japan",

  positioning: {
    en: "AI-native full-stack builder with an HR background and startup operations experience, shipping production AI products across recruiting, local SEO, and data.",
    ja: "AIネイティブなフルスタック開発者。人事領域の実務経験とスタートアップCOOとしての事業運営を背景に、実プロダクトを作れる人材。",
  },

  taglines: {
    home: {
      en: "Shipping AI-native products from Sydney.",
      ja: "シドニーから、AIネイティブなプロダクトを作っています。",
    },
  },

  // Short story used on About page — keep tight, expand inline in UI if needed.
  story: [
    {
      period: "2017-2021",
      title: "Human Resources, Canon Marketing Japan Inc.",
      summary:
        "Five years across four HR functions at a major Japanese enterprise: labour and time management, headcount tracking across business units, group-wide annual promotion assessment, and KPI dashboard design for a remote call centre stood up during COVID.",
    },
    {
      period: "2024-2026 (current)",
      title: "Master of Data Science and Innovation, University of Technology Sydney",
      summary:
        "Pivoted into data and AI. Hands-on coursework across ML, big data engineering (Airflow / dbt / Snowflake / GCP), data visualisation, and an ongoing Capstone on LLM prompt-injection detection.",
    },
    {
      period: "Current",
      title: "COO at Cubic Innov8 + sole builder of Zepi Match",
      summary:
        "Running operations across a Sydney-based group spanning talent, local SEO SaaS, bilingual consulting, and cross-border M&A. Built Zepi Match (the AI application workspace inside Zepi Recruit, the group's cross-border JP↔AU talent service) from zero to production, single-handedly.",
    },
  ],

  // TODO: confirm Kwansei Gakuin faculty — user said "小学部" but 2013-2017 is undergraduate period.
  education: [
    {
      school: "Kwansei Gakuin University",
      schoolJa: "関西学院大学",
      faculty: "TBD", // e.g. "School of Commerce" — awaiting confirmation
      period: "Apr 2013 to Mar 2017",
    },
    {
      school: "University of Technology Sydney (UTS)",
      schoolJa: "シドニー工科大学",
      faculty: "Master of Data Science and Innovation",
      period: "Jul 2024 to Jun 2026 (in progress)",
    },
  ],

  experience: [
    {
      role: "COO",
      org: "Cubic Innov8 Inc.",
      period: "Current",
      location: "Sydney",
      blurb:
        "Operations across a multi-business group (Zepi talent hub, Review365 local-SEO SaaS, bilingual consulting, cross-border M&A, 9-5 Startup Podcast). Owning strategy, customer conversations, and AI-driven product execution.",
    },
    {
      role: "Sole Builder",
      org: "Zepi Match (Cubic Innov8 / Zepi Recruit)",
      period: "Current",
      location: "Sydney",
      blurb:
        "Built an AI job-matching SaaS end-to-end, single-handedly. Next.js 15 App Router, Supabase + pgvector, Claude Haiku 4.5 generation pipeline, Chrome extension on LinkedIn, Stripe billing. Primary ICP: Japanese speakers job-hunting in Australia.",
    },
    {
      role: "Human Resources Specialist",
      org: "Canon Marketing Japan Inc.",
      period: "Apr 2017 to Dec 2021",
      location: "Tokyo",
      blurb:
        "Five years across four HR functions at a major Japanese enterprise: labour and time management, headcount tracking across business units, group-wide annual promotion assessment, and KPI dashboard design for a remote call centre stood up during COVID.",
    },
  ],

  /**
   * Home page — bilingual content for the Terminal composition.
   * Consumed by `src/components/home/*`. Each CopyEnJa tuple gets resolved
   * at render time by the `t()` helper in `lang-provider.tsx`.
   */
  home: {
    whoami: {
      en: "ex-HR turned data scientist, bridging people insight and ML",
      ja: "人事からデータサイエンスへ。人事の知見と機械学習を橋渡しする",
    } as CopyEnJa,
    tagline: {
      en: "Ex-HR / MSc Data Science, University of Technology Sydney / Startup COO. I take AI products from idea to ship, solo.",
      ja: "元人事 / シドニー工科大学 データサイエンス修士 / スタートアップ COO。AI プロダクトを企画から実装まで一人で。",
    } as CopyEnJa,
    subtag: {
      en: "COO at Cubic Innov8 · MSc Data Science, University of Technology Sydney (Jun 2026) · Open to AU & JP",
      ja: "Cubic Innov8 COO / シドニー工科大学 データサイエンス修士（2026年6月修了）/ 豪日両国で就活中",
    } as CopyEnJa,
    now: [
      {
        en: "Zepi Match. Built solo, idea to ship (in production)",
        ja: "Zepi Match。企画から実装まで一人で（本番稼働中）",
      },
      {
        en: "COO · Cubic Innov8 · Sydney ↔ Tokyo cross-border startup",
        ja: "Cubic Innov8 COO · シドニー↔東京の越境スタートアップ",
      },
      {
        en: "MSc Data Science at the University of Technology Sydney, graduating Jun 2026",
        ja: "シドニー工科大学 データサイエンス修士、2026年6月修了見込み",
      },
    ] satisfies CopyEnJa[],
    about: {
      en: [
        "I worked in HR at Canon Marketing Japan for five years, across four areas: labour management, headcount tracking across business units, group-wide annual promotion assessment, and a KPI dashboard I designed for a remote call centre we set up during COVID. Watching how staffing and promotion decisions were actually made, and seeing how much of that could be supported by data, is what pushed me toward data science.",
        "I left Canon at the end of 2021. I'd had a long-standing wish to do a Master's abroad, so I studied English in the Philippines and came to Sydney on a Working Holiday visa. I got a forklift licence soon after arriving and spent about a year and a half doing manual work, primarily two seasons at Namoi Cotton (an Australian cotton processor) plus warehouse and fruit-picking jobs in between, to save the tuition for the Master's program at the University of Technology Sydney. What I took from those years is a habit of seeing things through once I commit, and that's how I approach work too.",
        "I'm currently studying Data Science at the University of Technology Sydney. The coursework covers machine learning, ETL on GCP, and deep learning, and I've taken individual coursework projects from notebook all the way to running services. For one assignment I built a bronze/silver/gold ELT pipeline orchestrated by Airflow on GCP Cloud Composer; for another I packaged two trained ML models into a FastAPI service, containerised with Docker, and deployed to Render. For my capstone I'm working on prompt-injection detection for LLMs. In parallel, I'm COO at Cubic Innov8, where I built Zepi Match end-to-end (an AI application workspace for international job seekers in Australia, on Next.js · Supabase + pgvector · Anthropic Claude · Stripe · Chrome MV3) and run the Review 365 SaaS portfolio for Sydney SMB clients in hospitality and retail. I've also been doing algorithmic FX trading for eight years, which is where my discipline around data and risk comes from. I'm looking for a role where someone who can move between HR, operations, and AI product execution, including taking models from notebook to a deployed service, can be useful.",
      ],
      ja: [
        "キヤノンマーケティングジャパンで人事を5年やりました。労務・勤怠管理、事業部別の要員管理、グループ全体の年次昇格アセスメント、コロナ禍で立ち上げたリモートコールセンターのKPIダッシュボード設計まで、4つの機能を経験しています。人員や昇格の判断が現場でどう下されているかを近くで見ていて、データでもっと支えられる部分が多いと感じたのが、データサイエンスに転向した動機です。",
        "2021年末にキヤノンを退職しました。もともと海外で大学院に行ってみたいという気持ちがあり、フィリピンで英語を学んだ後、ワーキングホリデービザでシドニーに来ました。到着後すぐにフォークリフト免許を取り、約1年半の間、オーストラリアの綿花加工会社 Namoi Cotton で2シーズン働いたのを軸に、オフシーズンは別の倉庫やフルーツピッキングなどを掛け持ちして、シドニー工科大学の修士課程の学費を貯めました。この期間で身についたのは、決めたら最後までやり切るというスタンスで、仕事でも同じように動きます。",
        "現在はシドニー工科大学でデータサイエンスを学んでいます。コースワークでは機械学習、GCP上のETL、深層学習に取り組み、ノートブックから本番稼働のサービスまで持っていく経験を積んできました。ある課題ではAirflowをGCP Cloud Composerに乗せてbronze/silver/gold層のELTパイプラインを構築し、別の課題では学習済みのML 2モデルをFastAPIに束ね、Dockerでコンテナ化してRenderにデプロイしています。Capstoneプロジェクトとして LLM のプロンプト注入検出に取り組んでいます。並行して Cubic Innov8 で COO をしながら、オーストラリアで働きたい国際人材向けの AI アプリケーションワークスペース Zepi Match を一人でフルスタック構築（Next.js / Supabase + pgvector / Anthropic Claude / Stripe / Chrome 拡張）し、Sydney の飲食・小売向けに Review 365 SaaS ポートフォリオを運営しています。FXのアルゴリズム取引も8年続けていて、データとリスクの扱い方はそこで身につけました。HR・事業オペレーション・AIプロダクト実装を一人で行き来でき、モデルをノートブックから本番デプロイまで自分で運べる人として、力になれる場所を探しています。",
      ],
    } as { en: readonly string[]; ja: readonly string[] },
    closing: {
      en: "I'll graduate from the University of Technology Sydney in June 2026. Open to full-time roles in Sydney or Tokyo. Please feel free to reach out.",
      ja: "2026年6月にシドニー工科大学を修了予定です。シドニー・東京どちらでも、フルタイムのご相談を歓迎します。お気軽にご連絡ください。",
    } as CopyEnJa,
  },

  // Stack — grouped by purpose. Surface as-is on the Home page Stack block.
  stack: {
    frontend: ["Next.js 15/16", "React 19", "TypeScript", "Tailwind CSS v4", "shadcn/ui"],
    backend: ["Python", "FastAPI", "Supabase", "PostgreSQL", "pgvector", "Drizzle ORM"],
    ai: [
      "Anthropic Claude (Haiku / Sonnet)",
      "OpenAI",
      "Embeddings + RAG",
      "Claude Code",
      "Codex",
      "Prompt engineering",
    ],
    data: ["pandas", "scikit-learn", "dbt", "Airflow", "Snowflake", "GCP", "Azure", "Docker"],
    ops: ["Vercel", "Stripe", "Clerk", "Notion", "n8n"],
  },
} as const;
