/**
 * Portfolio content, single source of truth for the home sections and
 * the /work/[slug] detail pages. Copy mirrors
 * masaki-application-strategy.md §3 (confirmed 2026-07-13).
 *
 * Visual slots: drop screenshots at public/work/<slug>.png and every
 * surface that references the slug picks them up automatically.
 */

export type Localized = { en: string; ja: string };

export type WorkEntry = {
  slug: string;
  name: string;
  tag?: Localized;
  desc: Localized;
  detail: Localized;
};

export const WORK: WorkEntry[] = [
  {
    slug: "vai-studio",
    name: "VAI Studio",
    desc: {
      en: "AI video and web studio serving Japan and Australia. Client work live, including Yukoala Concierge.",
      ja: "日豪で動くAI動画・Web制作スタジオ。Yukoala Concierge など実クライアント案件が稼働中。",
    },
    detail: {
      en: "Motion produces AI assisted video, Build ships client sites. For Yukoala Concierge that meant a full company site, live in production, plus ongoing Instagram content.",
      ja: "Motion が AI 動画を、Build がクライアントサイトを届ける。Yukoala Concierge には本番公開の企業サイトと、継続中の Instagram コンテンツを提供。",
    },
  },
  {
    slug: "review365",
    name: "Review365",
    desc: {
      en: "LLM reporting for paying local clients, run on Japanese SOPs. Rankings tracked monthly.",
      ja: "日本語SOPで回すLLMレポーティング。課金クライアントの順位を毎月計測。",
    },
    detail: {
      en: "Review growth and local search for hospitality clients, run as a monthly measurement loop: rankings, profile insights and AI visibility, written up so owners can act. Generation runs on Japanese SOPs executed by Claude, with a human final pass.",
      ja: "飲食クライアントのレビュー成長とローカル検索を、月次の計測ループとして運用。順位、プロフィールインサイト、AI上の可視性を計測し、オーナーが動ける形のレポートに。生成は日本語SOP × Claude、最終判断は人間。",
    },
  },
  {
    slug: "vacanti-ai",
    name: "Vacanti AI",
    desc: {
      en: "AI job matching SaaS, designed, built and shipped solo. Live in production.",
      ja: "一人で設計から本番投入まで。稼働中のAIジョブマッチングSaaS。",
    },
    detail: {
      en: "A matching engine with four axis scoring, embeddings on pgvector, and a vision based evaluation pipeline that catches false positives before users see them. Next.js, Supabase, Drizzle and Stripe, taken to production by one person.",
      ja: "4軸スコアリングのマッチングエンジン、pgvector の埋め込み、偽陽性を配信前に検知する Vision 評価パイプライン。Next.js、Supabase、Drizzle、Stripe を一人で本番まで。",
    },
  },
  {
    slug: "fabric-sampling",
    name: "Fabric Sampling Tool",
    desc: {
      en: "WeChat mini program digitising sample lending for a textile trading company.",
      ja: "ある繊維商社のサンプル貸出業務をWeChatミニプログラムでデジタル化。",
    },
    detail: {
      en: "Fabric sample lending digitised end to end: QR scan to borrow, return tracking, and a partner briefing deck. Built as a WeChat mini program so it runs inside China without a VPN.",
      ja: "生地サンプルの貸出を、QRスキャンでの貸出から返却管理までデジタル化し、取引先向け説明資料まで用意。中国国内でVPNなしで動くよう、WeChatミニプログラムで構築。",
    },
  },
  {
    slug: "kodoku",
    name: "Kodoku",
    tag: { en: "In development", ja: "開発中" },
    desc: {
      en: "Solo founders running a company with AI agents as staff.",
      ja: "AIエージェントのチームで1人の会社を回す。",
    },
    detail: {
      en: "An operating layer where AI agents hold real roles in a one person company: workflows, MCP integrations, and handoff to tools like Slack and n8n. In development, and the thing I most want to exist.",
      ja: "AIエージェントが実際の役割を持つ、1人会社のためのオペレーティングレイヤー。ワークフロー、MCP連携、Slack や n8n への受け渡し。開発中、いま一番つくりたいもの。",
    },
  },
];

export const RESEARCH: WorkEntry[] = [
  {
    slug: "warden",
    name: "Warden",
    desc: {
      en: "Prompt injection detection research: CoT monitoring, LLM as judge. Submitted at the University of Technology Sydney.",
      ja: "プロンプトインジェクション検出の研究。CoT監視、LLM-as-judge。シドニー工科大学に提出済み。",
    },
    detail: {
      en: "Detecting prompt injection by watching the model think: rule based checks over chain of thought traces plus an LLM as judge, evaluated on attack success and detection rates against a purpose built dataset. Capstone research, submitted.",
      ja: "モデルの思考過程を見て攻撃を検出する研究。CoTトレースへのルールベース検査と LLM-as-judge を組み合わせ、専用データセットで攻撃成功率と検出精度を評価。Capstone 研究として提出済み。",
    },
  },
  {
    slug: "cloud-elt",
    name: "Cloud ELT Pipeline",
    desc: {
      en: "dbt, Airflow, Medallion architecture, SCD Type 2, monthly loads on GCP.",
      ja: "dbt、Airflow、Medallion 構成、SCD Type 2。GCP 上の月次ロード。",
    },
    detail: {
      en: "A cloud ELT pipeline on GCP: dbt Cloud transformations orchestrated by Airflow on Cloud Composer, Medallion layers from bronze to gold, a star schema with SCD Type 2, and idempotent monthly loads over Airbnb and census data.",
      ja: "GCP 上のクラウド ELT。dbt Cloud の変換を Cloud Composer 上の Airflow で編成し、Bronze から Gold の Medallion 構成、SCD Type 2 のスタースキーマ、冪等な月次ロード。Airbnb と国勢調査データで構築。",
    },
  },
  {
    slug: "crypto-api",
    name: "Crypto Forecast API",
    desc: {
      en: "From model to service: PyPI package, FastAPI, Docker, deployed and callable.",
      ja: "モデルからサービスまで。PyPIパッケージ、FastAPI、Docker、稼働中のAPI。",
    },
    detail: {
      en: "Next day bitcoin high prediction with LightGBM, taken all the way to serving: a package published on TestPyPI, a FastAPI service in Docker deployed on Render, and integration into a group Streamlit app as a microservice.",
      ja: "LightGBM によるビットコイン翌日高値予測を、サービングまで。TestPyPI 公開の自作パッケージ、Docker 化した FastAPI を Render にデプロイし、グループの Streamlit アプリにマイクロサービスとして統合。",
    },
  },
];
