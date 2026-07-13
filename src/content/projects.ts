/**
 * Project registry. Single source of truth for /work and case study pages.
 * To add a project: append to `projects`. To edit: update in place.
 */

import type { CopyEnJa } from "@/types/lang";

export type Project = {
  slug: string;
  title: string;
  subtitle: string;
  role: string;
  period: string;
  status: "production" | "active" | "research" | "experimental" | "complete";
  summary: string; // one sentence for the work index
  problem: string;
  approach: string;
  contributions: string[];
  stack: string[];
  outcomes: string[]; // quantifiable or qualitative
  links?: { label: string; href: string }[];
  // Disclosures and positioning
  disclosures?: string[];
  featured: boolean;
};

export const projects: Project[] = [
  {
    slug: "zepi-match",
    title: "Zepi Match",
    subtitle: "Japanese-first AI application workspace for international job seekers in Australia",
    role: "Sole builder · plan to ship",
    period: "Current",
    status: "production",
    summary:
      "An AI workspace that makes the entire job-application process radically faster for international job seekers in Australia. The flagship product inside Zepi Recruit, Cubic Innov8 Group's cross-border JP↔AU talent service.",
    problem:
      "International job seekers in Australia don't really struggle to find jobs. LinkedIn and Seek surface plenty. The real bottleneck is application throughput: writing each cover letter from scratch, researching the company, preparing for the interview, and re-tailoring a resume every time. Generic AI chatbots can do parts of this, but they don't know the Australian context, can't preserve a resume's design, and forget everything between sessions.",
    approach:
      "Built around a single object, the Application, instead of a job board or a resume tool. The user pastes a job URL or description and the workspace generates the cover letter, company brief, and predicted interview questions from the user's career profile. Format-preserving DOCX editing keeps the user's existing resume design intact while rewriting bullets to fit the role. Curated jobs from direct ATS pulls (Greenhouse / Lever / Ashby) supplement the major boards. Bilingual EN/JA throughout, including Japanese 履歴書 and 職務経歴書 formats. The wedge that lets the product launch with a clear first audience while staying useful for any international background.",
    contributions: [
      "Designed the full architecture: web app, AI pipeline, and an Application-centred data model",
      "Built the application generator: cover letter, company brief, and interview prep produced together from a single job URL or pasted description",
      "Implemented format-preserving DOCX editing so users keep their existing resume layout while bullets adapt to the target role",
      "Shipped a Japanese document bridge with bilingual generation including 履歴書 and 職務経歴書 formats",
      "Built the matching engine: rule-based fit + semantic similarity + seniority and language signals, calibrated against a labelled set",
      "Set up Stripe billing, tier quotas, Clerk SSR auth, and bilingual UI (EN/JA) end to end",
    ],
    stack: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Tailwind CSS v4",
      "shadcn/ui",
      "Supabase",
      "pgvector",
      "Drizzle ORM",
      "Clerk",
      "Stripe",
      "Anthropic Claude",
      "OpenAI embeddings",
      "Vercel",
    ],
    outcomes: [
      "An end-to-end application package (cover letter, company brief, and interview prep) produced from a single job URL",
      "Format-preserving DOCX edits that keep the user's existing resume design while tailoring bullets to each role",
      "Direct ATS integration with Greenhouse, Lever, and Ashby surfaces roles that don't appear on the major job boards",
      "Bilingual application generation in EN and JA, including Japanese resume formats from day one",
    ],
    disclosures: [
      "Zepi Match is the AI SaaS product inside Zepi Recruit, Cubic Innov8 Group's cross-border JP↔AU talent service. Source code is private. Architecture and screenshots shown here are approved for public use.",
    ],
    featured: true,
  },
  {
    slug: "review365",
    title: "Review 365",
    subtitle: "AI-assisted Google review collection for local businesses",
    role: "COO · Sales, strategy, and reporting",
    period: "Current",
    status: "production",
    summary:
      "Japan-built MEO / local-SEO SaaS entering the Australian market. I lead GTM, customer conversations, and the monthly reporting process that operationalises the product for restaurant and hospitality clients in Sydney.",
    problem:
      "Local businesses, especially restaurants, struggle to convert satisfied customers into written Google reviews. Star-only reviews don't move rankings; written reviews do. Stores want reviews; customers don't want to write.",
    approach:
      "Review 365 turns a short multiple-choice survey into an AI-drafted Google review a customer can paste and post. Beyond the product, I designed the monthly client reporting process (Fact → Interpretation → Recommendation) and GTM motion aimed at Sydney hospitality.",
    contributions: [
      "B2B sales and pitching to Sydney restaurants and local businesses",
      "Google Business Profile audits and local-SEO strategy per client",
      "Designed the monthly report framework (review growth + ranking trends + AI-search visibility + strategic recommendations)",
      "Built a semi-automated reporting pipeline (CSV + PDF + manual YAML inputs → Claude-generated draft → Notion)",
      "Positioning work that crystallises the core message: 'Ads rent attention. Reviews build trust.'",
    ],
    stack: [
      "Notion",
      "Claude Code",
      "n8n (operations automation)",
      "Google Business Profile",
      "Google Maps ranking tools",
      "Structured reporting (Fact → Interpretation → Recommendation)",
    ],
    outcomes: [
      "Multiple Sydney hospitality clients onboarded (customer names withheld)",
      "AI-search visibility achieved, with a client featured in a ChatGPT-generated 'top restaurants' list",
      "Operationalised monthly reporting with semi-automation, keeping operator judgment in the loop",
    ],
    disclosures: [
      "Review 365 is a product of Cubic Innov8 Group. Client names are withheld under confidentiality.",
    ],
    featured: true,
  },
  {
    slug: "capstone-warden",
    title: "Capstone Warden",
    subtitle: "Prompt-injection detection via CoT reasoning monitoring",
    role: "Master's Capstone research, University of Technology Sydney",
    period: "In progress",
    status: "research",
    summary:
      "An in-progress Master's capstone at the University of Technology Sydney investigating whether a lightweight 'Warden' agent can detect prompt-injection attacks on an LLM by monitoring its reasoning trace rather than only the final answer.",
    problem:
      "Production LLM applications are routinely exposed to prompt-injection attacks (naive concatenation, ignore-previous, fake-completion, combined techniques). Output-only filters miss subtle compliance cases. Can we detect attacks earlier and more reliably by inspecting chain-of-thought?",
    approach:
      "Build a pipeline where a victim LLM processes attack and benign prompts, emitting both an answer and a reasoning trace. A Warden, implemented as rule-based and LLM-as-judge variants, inspects these and outputs detected: True/False. Evaluate with ASR / TPR / FPR across attack categories.",
    contributions: [
      "Defined the experimental pipeline and attack taxonomy (naive, ignore_previous, fake_completion, combined, benign)",
      "Implemented rule-based and LLM-based Warden variants",
      "Wrote the evaluation harness to compute ASR / TPR / FPR",
      "Evaluating datasets: deepset/prompt-injections, BIPIA, plus hand-crafted attacks",
    ],
    stack: ["Python", "Anthropic Claude", "OpenAI", "pandas", "Jupyter"],
    outcomes: [
      "Work in progress; results pending",
      "Thesis and write-up planned for 2026",
    ],
    disclosures: [
      "Research is in progress. Details and methodology shown here are at the design stage; results and conclusions will be published on completion.",
    ],
    featured: true,
  },
  {
    slug: "canon-hr",
    title: "Human Resources at Canon Marketing Japan",
    subtitle: "Five years across four HR functions at a major Japanese enterprise",
    role: "Human Resources Specialist",
    period: "Apr 2017 to Dec 2021",
    status: "complete",
    summary:
      "Five years inside HR at Canon Marketing Japan covering labour and time management, headcount tracking across business units, end-to-end administration of the group-wide annual promotion assessment, and KPI dashboard design for a remote call centre stood up during COVID.",
    problem:
      "Staffing and promotion decisions inside a large Japanese enterprise are shaped by a mix of documented criteria, undocumented norms, and stakeholder politics. Supporting those decisions well, with data or with software, requires understanding which parts can be operationalised and which parts cannot.",
    approach:
      "Sat inside HR Operations across four functions over five years: labour and time management; headcount tracking across business units; end-to-end administration of the group-wide annual promotion assessment; and KPI dashboard design for a remote call centre stood up during COVID. The work spanned both the rules side (policy, compliance, scheduling) and the judgement side (assessment calibration, panel design, manager feedback loops).",
    contributions: [
      "Operated payroll, attendance, and workplace compliance (Years 1 to 2)",
      "Tracked headcount composition across business units, maintaining who and how many sat in each division (Years 2 to 3)",
      "Operated end-to-end administration of the group-wide annual promotion assessment: designed pass/fail thresholds aligned with group-wide workforce composition, configured panel structures for first-stage written essays and second-stage interviews with department heads, and coordinated with subsidiary HR teams across the wider group (Year 4)",
      "Designed and implemented HR KPI dashboards from scratch for a remote call centre stood up during COVID, establishing metrics, reporting cadence, and governance for distributed operations (Secondment, 2021)",
    ],
    stack: [
      "HR Operations",
      "Headcount tracking",
      "Promotion assessment",
      "KPI design",
      "Excel",
      "Internal HRIS",
      "Stakeholder management",
      "Cross-functional coordination",
    ],
    outcomes: [
      "Five years of HR domain experience at a major Japanese enterprise",
      "Working knowledge of how staffing and promotion decisions actually get made: what's documented, what isn't, and what data can plausibly support",
    ],
    featured: false,
  },
  {
    slug: "weather-api",
    title: "Sydney Weather Prediction API",
    subtitle: "Two ML models packaged into a FastAPI service, containerised with Docker and deployed to Render",
    role: "Solo · Advanced Machine Learning AT2",
    period: "2025",
    status: "research",
    summary:
      "End-to-end coursework project taking two trained ML models from notebook to a deployed REST API: Python package on TestPyPI, FastAPI service, Docker image, Render deployment.",
    problem:
      "Course assignment to take ML models from notebook to a production-callable endpoint, covering training, packaging, serving, containerisation, and cloud deployment in one piece of work.",
    approach:
      "Trained two models on Open-Meteo Sydney historical weather data (2010 to 2024): a classifier for rain-or-not 7 days ahead, and a regressor for 3-day cumulative precipitation volume. Used Cookiecutter Data Science layout with Poetry for dependency management. Shared utilities (preprocessing, feature engineering, evaluation) packaged as a Python module published on TestPyPI and consumed from the experiment notebooks. Best models exported via joblib and served by a FastAPI app with two POST endpoints. Containerised with a Dockerfile and deployed to Render so the same image runs locally via `docker run` and in the cloud.",
    contributions: [
      "Built feature engineering and model selection pipelines for both classification and regression tasks",
      "Published shared utilities as a Python package on TestPyPI, consumed from the experiment notebooks",
      "Wrote the FastAPI service with model loading at boot and two prediction endpoints",
      "Containerised the service with Docker and deployed to Render so the identical image runs locally and in the cloud",
    ],
    stack: [
      "Python",
      "scikit-learn",
      "FastAPI",
      "Docker",
      "Render",
      "Poetry",
      "TestPyPI",
      "Open-Meteo API",
    ],
    outcomes: [
      "Containerised inference service with two REST endpoints, deployed and reachable on Render",
      "End-to-end pipeline from data ingestion through training to a deployed REST endpoint, owned solo",
    ],
    featured: false,
  },
  {
    slug: "bde-airbnb",
    title: "Sydney Airbnb ELT Pipeline",
    subtitle: "Production-grade ELT on GCP across 12 months of Airbnb data joined with ABS Census",
    role: "Solo Data Engineer · Big Data Engineering AT3",
    period: "2025",
    status: "research",
    summary:
      "Solo build over 12 months of Sydney Airbnb listings (May 2020 to Apr 2021) joined with ABS 2016 Census G01/G02 and NSW LGA-Suburb mapping. Bronze/silver/gold layered ELT on GCP.",
    problem:
      "Course assignment to design and build a production-shaped ELT pipeline (orchestrated, idempotent, tested, and analytically useful) from raw external data to a star-schema warehouse with SCD Type 2 history.",
    approach:
      "GCS for raw landing → Airflow on GCP Cloud Composer → Postgres on Cloud SQL (Bronze) → dbt Cloud (Silver clean/normalize → Gold star schema with SCD Type 2 host snapshots) → 5 SQL analytical queries. Idempotent monthly DAG via BashOperator orchestrating dbt; data-quality tests defined in `schema.yml`.",
    contributions: [
      "Designed the bronze/silver/gold layering and the Gold star schema (fact_listing + dim_host / dim_suburb / dim_date / dm_property_type)",
      "Built a single combined Airflow DAG that orchestrates dbt runs idempotently per monthly partition",
      "Implemented SCD Type 2 host snapshots so historical host attributes survive overwrites in source data",
      "Wrote dbt models, sources, and `schema.yml` data-quality tests across the bronze/silver/gold layers",
      "Authored 5 analytical SQL queries on the Gold layer to surface revenue and host concentration patterns",
    ],
    stack: [
      "Python",
      "Airflow",
      "dbt",
      "Postgres",
      "GCP Cloud Composer",
      "Cloud SQL",
      "GCS",
      "SQL",
      "SCD Type 2",
    ],
    outcomes: [
      "Production-shaped ELT pipeline (orchestrated, idempotent, tested) from raw GCS to a Gold star schema",
      "Findings: r ≈ 0.737 between median host age and revenue; entire-home/apt for 2 to 4 guests is the revenue-maximizing config; ~80% of multi-listing hosts cluster within a single LGA",
    ],
    featured: false,
  },
];

export const getProject = (slug: string): Project | undefined =>
  projects.find((p) => p.slug === slug);

export const featuredProjects = projects.filter((p) => p.featured);

/**
 * Home page Work block. Compact bilingual entries for the terminal
 * "ls -la ./work" list. Fields mirror the Claude-Design HomePage.html
 * 1:1 (id, year, status, title/role/one/detail in both languages, stack
 * chips, case-study href).
 */
export type HomeWorkCategory = "professional" | "academic";

export type HomeWorkItem = {
  id: string;
  category: HomeWorkCategory;
  year: string;
  status: "shipping" | "live" | "research" | "complete";
  title: CopyEnJa;
  role: CopyEnJa;
  one: CopyEnJa;
  detail: CopyEnJa;
  stack: readonly string[];
  href: string;
};

export const homeWork: readonly HomeWorkItem[] = [
  {
    id: "zepi",
    category: "professional",
    year: "2025-26",
    status: "shipping",
    title: { en: "Zepi Match", ja: "Zepi Match" },
    role: {
      en: "Built solo · plan to ship",
      ja: "企画から実装まで一人で",
    },
    one: {
      en: "An AI workspace that makes job applications radically faster for international job seekers in Australia.",
      ja: "オーストラリアで就活する海外人材の応募作業を AI で最大効率化するワークスペース。",
    },
    detail: {
      en: "The flagship AI product inside Zepi Recruit, Cubic Innov8 Group's cross-border JP↔AU talent service, built end-to-end by one person. Aimed at the real bottleneck for international job seekers in Australia: not finding jobs, but applying to them well. Paste a job URL or description and the workspace generates a tailored cover letter, company brief, and predicted interview questions against the user's career profile, and edits an existing resume in place, keeping its original layout while rewriting bullets to fit each role. Bilingual EN/JA throughout, including Japanese resume formats (履歴書 / 職務経歴書), so the product opens with a clear first audience while staying useful for any international background. Direct ATS integration (Greenhouse / Lever / Ashby) supplements the major boards with roles that don't appear there. Stack: Next.js 15, Supabase Postgres + pgvector, Drizzle ORM, Anthropic Claude, OpenAI embeddings, Stripe, Clerk.",
      ja: "Cubic Innov8 Group の越境 JP↔AU タレント事業 Zepi Recruit の中核 AI プロダクトとして、ひとりでフルスタック構築。オーストラリアで就活する海外人材の本当のボトルネックは、求人を「見つける」ことではなく、見つけた求人に「応募し切る」ことを AI で最大効率化する点にある。求人URLや本文を貼ると、ユーザーのキャリアプロフィールに対してカバーレター・企業情報・面接質問が一気に生成され、既存レジュメも元のレイアウトを保ったまま職種ごとに最適化される。バイリンガル EN/JA、履歴書・職務経歴書フォーマット対応で、日本人を入口にしつつ世界中の international job seeker に届くプロダクト構造。Greenhouse / Lever / Ashby 直結で大手求人サイトに出ない求人もカバー。スタック: Next.js 15、Supabase Postgres + pgvector、Drizzle ORM、Anthropic Claude、OpenAI 埋め込み、Stripe、Clerk。",
    },
    stack: [
      "Next.js 15",
      "TypeScript",
      "Supabase",
      "pgvector",
      "Drizzle",
      "Anthropic Claude",
      "OpenAI",
      "Stripe",
      "Clerk",
      "Vercel",
    ],
    href: "/work/zepi-match",
  },
  {
    id: "r365",
    category: "professional",
    year: "2025-26",
    status: "live",
    title: { en: "Review 365", ja: "Review 365" },
    role: { en: "Head of MEO/GEO Strategy", ja: "MEO/GEO戦略統括" },
    one: {
      en: "Sydney SMB portfolio across hospitality and retail with measurable Maps and AI-search wins.",
      ja: "Sydneyの飲食・小売向け中小企業ポートフォリオ。マップ順位・AI検索可視性で計測可能な成果。",
    },
    detail: {
      en: "Sourced Sydney SMB clients via English-language cold outreach across hospitality, F&B, tech retail, and electronics. Designed a 3-tier pricing structure positioned well below competing agencies. Owns the full lifecycle solo: prospecting → onboarding → monthly reporting → keyword and GBP optimisation → Instagram-to-Maps automation → renewals. Representative outcomes across the portfolio: meaningful review-volume growth within months for a flagship account, top Google Maps positions for primary local keywords, and full AIO visibility across multiple AI search engines (ChatGPT, Google AI Mode, Perplexity), demonstrating local-search visibility in the AI era. Client names withheld under confidentiality.",
      ja: "英語の新規開拓で Sydney の中小企業を獲得（ホスピタリティ、飲食、テック小売、電化）。競合エージェンシーを大きく下回る3階層価格設計。プロスペクティングからオンボーディング、月次レポート、キーワード/GBP最適化、Instagram→Maps自動化、更新まで全ライフサイクルを単独運用。代表的な成果として、数ヶ月でレビュー件数を大きく伸ばし、地域の主要キーワードで Google マップ 上位を獲得。ChatGPT・Google AI Mode・Perplexity を含む複数の AI 検索エンジンで AIO 可視性を達成し、AI 時代のローカル検索可視性を実証。顧客名は守秘義務により非公開。",
    },
    stack: [
      "Google Business Profile",
      "MEO",
      "GEO / AIO tracking",
      "n8n",
      "Notion",
      "Claude Code",
      "B2B sales",
    ],
    href: "/work/review365",
  },
  {
    id: "canon-hr",
    category: "professional",
    year: "2017-21",
    status: "complete",
    title: {
      en: "Enterprise HR",
      ja: "エンタープライズ人事",
    },
    role: {
      en: "Human Resources Specialist · Tokyo",
      ja: "人事スペシャリスト / 東京",
    },
    one: {
      en: "Four HR functions across five years at a major Japanese enterprise.",
      ja: "大手日系企業で4つの人事機能を5年経験。",
    },
    detail: {
      en: "Five years inside HR at Canon Marketing Japan across four functions: labour and time management (Years 1 to 2); headcount tracking across business units, capturing who and how many sat in each division (Years 2 to 3); end-to-end administration of the group-wide annual promotion assessment, including pass/fail threshold design and panel configuration for first-stage written essays and second-stage interviews with department heads, plus coordination with subsidiary HR teams across the wider group (Year 4); and HR KPI dashboard design for a remote call centre stood up during COVID, establishing metrics, reporting cadence, and governance from scratch (secondment, 2021). The work spanned both the rules side (policy, compliance, scheduling) and the judgement side (assessment calibration, panel design, manager feedback loops).",
      ja: "キヤノンマーケティングジャパンで人事を5年経験。4つの機能を担当した。1〜2年目は労務・勤怠管理、2〜3年目は事業部横断の要員管理（どの事業部にどんな人材が何人いるかの集計と取りまとめ）、4年目はグループ全体の年次昇格アセスメント運営の end to end（合否基準設計、一次小論文と部長面接のパネル設計、グループ各社人事との連携）、出向した2021年はコロナ禍で立ち上がったリモートコールセンターのHR KPIダッシュボードをゼロから設計し、指標・レポーティング頻度・ガバナンスを整備した。HRのルール側（ポリシー・コンプライアンス・勤怠）と判断側（アセスメントのキャリブレーション、パネル設計、マネージャーのフィードバックループ）の両方を経験した。",
    },
    stack: [
      "HR Operations",
      "Headcount tracking",
      "Promotion assessment",
      "KPI design",
      "Excel",
      "Stakeholder management",
    ],
    href: "/work/canon-hr",
  },
  {
    id: "bde",
    category: "academic",
    year: "2025",
    status: "research",
    title: { en: "Sydney Airbnb ELT Pipeline", ja: "Sydney Airbnb ELTパイプライン" },
    role: {
      en: "Solo Data Engineer · Big Data Engineering AT3",
      ja: "単独データエンジニア / ビッグデータエンジニアリング AT3",
    },
    one: {
      en: "Production-grade ELT on GCP across 12 months of Airbnb data × ABS Census.",
      ja: "GCP上の本番品質ELT。Airbnb 12ヶ月分データ × ABS国勢調査。",
    },
    detail: {
      en: "Solo build over 12 months of Sydney Airbnb listings (May 2020 to Apr 2021) joined with ABS 2016 Census G01/G02 and NSW LGA-Suburb mapping. GCS → Airflow on GCP Cloud Composer → Postgres on Cloud SQL (Bronze raw) → dbt Cloud (Silver clean/normalize → Gold star schema with SCD Type 2 host snapshots) → 5 SQL analytical queries. Idempotent monthly DAG via BashOperator orchestrating dbt; schema.yml data-quality tests. Findings: r ≈ 0.737 between median host age and revenue; entire-home/apt for 2 to 4 guests is the revenue-maximizing config; ~80% of multi-listing hosts cluster within a single LGA.",
      ja: "シドニーのAirbnbリスティング12ヶ月分（2020年5月〜2021年4月）にABS 2016国勢調査（G01/G02）とNSW LGA-郊外マッピングを結合し、ひとりで構築。GCS → GCP Cloud Composer上のAirflow → Cloud SQLのPostgres（Bronze生データ）→ dbt Cloud（Silver正規化 → SCD Type 2でホスト履歴を保持するGoldスタースキーマ）→ 5本の分析SQL。BashOperatorでdbtを束ねた冪等な月次DAG、schema.ymlによるデータ品質テスト。発見: ホスト年齢中央値と収益の相関 r ≈ 0.737、収益最大化は2〜4名向けの一棟貸し、複数物件保有ホストの約80%が単一LGAに集中。",
    },
    stack: [
      "Python",
      "Airflow",
      "dbt",
      "Postgres",
      "GCP Cloud Composer",
      "Cloud SQL",
      "GCS",
      "SQL",
      "SCD Type 2",
    ],
    href: "/work/bde-airbnb",
  },
  {
    id: "weather-api",
    category: "academic",
    year: "2025",
    status: "research",
    title: { en: "Sydney Weather Prediction API", ja: "Sydney 天気予測API" },
    role: {
      en: "Solo · Advanced Machine Learning AT2",
      ja: "単独 / 高度ML AT2",
    },
    one: {
      en: "Two ML models served via FastAPI + Docker, deployed to Render.",
      ja: "2つのMLモデルをFastAPI + Dockerで提供、Renderにデプロイ。",
    },
    detail: {
      en: "Trained classification (rain-or-not, 7-day ahead) and regression (precipitation volume, 3-day cumulative mm) models on Open-Meteo Sydney historical weather data (2010 to 2024). Used Cookiecutter Data Science layout with Poetry; shared utilities (preprocessing, feature engineering, evaluation) published as a Python package on TestPyPI and consumed from the experiment notebooks. Best models exported via joblib and served through a FastAPI app with two POST endpoints (`/predict/rain_or_not`, `/predict/precipitation_fall`). Containerised with Docker and deployed to Render so the same image runs locally and in the cloud. End-to-end pipeline from data ingestion through training to a deployed REST endpoint, owned solo.",
      ja: "Open-Meteoから取得したSydneyの気象データ（2010〜2024）で、分類（7日先のrain-or-not）と回帰（3日累計の降水量mm）の2モデルを学習。Cookiecutter Data Science構造とPoetryで管理し、共通ユーティリティ（前処理・特徴量設計・評価）はPythonパッケージとしてTestPyPIに公開、実験ノートブックから利用。学習済みモデルをjoblibでエクスポートし、2つのPOSTエンドポイント（`/predict/rain_or_not`、`/predict/precipitation_fall`）を持つFastAPIアプリで配信。Dockerでコンテナ化しRenderにデプロイし、同一イメージがローカルとクラウドで動作。データ取得から学習、本番REST APIまでの一貫パイプラインを単独で構築。",
    },
    stack: [
      "Python",
      "scikit-learn",
      "FastAPI",
      "Docker",
      "Render",
      "Poetry",
      "TestPyPI",
      "Open-Meteo API",
    ],
    href: "/work/weather-api",
  },
  {
    id: "warden",
    category: "academic",
    year: "2026",
    status: "research",
    title: { en: "Capstone Warden", ja: "Capstone Warden" },
    role: {
      en: "Master's Capstone · 6-person team",
      ja: "修士キャップストーン / 6名チーム",
    },
    one: {
      en: "Detecting prompt injection by monitoring LLM reasoning traces.",
      ja: "LLMの思考過程を監視し、プロンプト注入攻撃を検出する。",
    },
    detail: {
      en: "Master's capstone (Autumn 2026). Architecture: Victim LLM emits answer + reasoning trace → Warden (rule-based + LLM-as-judge variants) inspects → ASR / TPR / FPR scoring. Experimental matrix: 5 attack categories (naive, ignore_previous, fake_completion, combined, benign) × 2 tasks × 6 defences × 3 models = 720 runs. Datasets: deepset/prompt-injections, BIPIA, plus hand-crafted attacks. Stack: Anthropic Claude API for production-class evals, Ollama (Llama 3.2, Qwen 2.5) for local inference. Presentation 5/6, submission 5/17.",
      ja: "修士キャップストーン（2026年Autumn）。構成: 被害LLMが回答と推論トレースを出力 → Warden（ルールベース + LLM-as-judge）が検査 → ASR / TPR / FPR でスコアリング。実験行列: 5種の攻撃カテゴリ（naive・ignore_previous・fake_completion・combined・benign）× 2タスク × 6防御 × 3モデル = 720ラン。データセット: deepset/prompt-injections、BIPIA、独自手作り攻撃。スタック: 本番級評価にAnthropic Claude API、ローカル推論にOllama（Llama 3.2、Qwen 2.5）。発表5/6、提出5/17。",
    },
    stack: [
      "Python",
      "Anthropic Claude API",
      "Ollama",
      "Llama 3.2",
      "Qwen 2.5",
      "LLM evals",
      "AI safety",
    ],
    href: "/work/capstone-warden",
  },
];
