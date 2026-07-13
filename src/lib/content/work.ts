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
  /* case-study sections rendered on /work/[slug]; entries without a
     body stay as summary-only pages by design */
  body?: { h: Localized; p: Localized }[];
  links?: { label: string; href: string }[];
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
    body: [
      {
        h: {
          en: "One studio, two working arms",
          ja: "1つのスタジオ、2つの実働部門",
        },
        p: {
          en: "VAI Studio is my AI content and web studio for Japan and Australia. Motion produces AI assisted video and social content; Build ships client websites. I run the whole loop myself: finding the client, scoping the work, producing, delivering, and operating it after launch.",
          ja: "VAI Studio は日豪向けの AI コンテンツ・Web 制作スタジオ。Motion が AI 動画とソーシャルコンテンツを、Build がクライアントサイトを担当する。クライアント開拓、要件定義、制作、納品、公開後の運用まで、この一連のループを一人で回している。",
        },
      },
      {
        h: {
          en: "Client work: Yukoala Concierge",
          ja: "クライアントワーク: Yukoala Concierge",
        },
        p: {
          en: "For Yukoala Concierge, a Japanese private concierge service in Sydney, Build delivered the full company site: seven pages with a pricing simulator, a contact flow and a cancellation policy, implemented in Next.js from a design handoff and running in production on its own domain. Motion produces their ongoing Instagram content.",
          ja: "シドニーの日本人向けプライベートコンシェルジュ Yukoala Concierge には、Build として企業サイト一式を納品した。料金シミュレーター、問い合わせフロー、キャンセルポリシーを含む全7ページを、デザインハンドオフから Next.js で本実装し、独自ドメインで本番運用中。Motion は同クライアントの Instagram コンテンツを継続制作している。",
        },
      },
      {
        h: {
          en: "Two markets, one build",
          ja: "2つの市場、1つの実装",
        },
        p: {
          en: "The studio's own site runs English and Japanese as separate market entries with separate dictionaries, down to the legal disclosure pages Japanese consumer law expects. Next.js and React, shipped and maintained by one person.",
          ja: "スタジオ自身のサイトは、英語と日本語を別々の市場エントリとして実装し、辞書も分離している。日本の消費者向け法定表記(特商法ページ)まで対応。Next.js と React で、公開も運用も一人で行っている。",
        },
      },
    ],
    links: [
      { label: "vai-motion.vercel.app", href: "https://vai-motion.vercel.app" },
      {
        label: "yukoala-concierge.com",
        href: "https://yukoala-concierge.com",
      },
    ],
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
    body: [
      {
        h: {
          en: "The service",
          ja: "サービス",
        },
        p: {
          en: "Review365 is a monthly reporting service for hospitality businesses in Australia: review growth, local search and AI visibility, measured and written up so owners can act. I sourced ten small business clients for it and currently operate four ongoing engagements, end to end, from the first conversation to the monthly report.",
          ja: "Review365 は、豪州の飲食ビジネス向け月次レポーティングサービス。レビューの伸び、ローカル検索、AI 上の可視性を計測し、オーナーが動ける形に書き上げる。これまでに10社のスモールビジネスを開拓し、現在は4社の継続契約を、初回の商談から月次レポートまでエンドツーエンドで運用している。",
        },
      },
      {
        h: {
          en: "The monthly loop",
          ja: "月次のループ",
        },
        p: {
          en: "Every month the same loop runs: keyword rankings tracked against local competitors, Google Business Profile insights compared over stable windows so the numbers stay honest, and an AI visibility check covering how the business shows up in LLM answers. Gaps and wins land in a report with charts and recommendations the owner can execute.",
          ja: "毎月同じループを回す。ローカル競合に対するキーワード順位の追跡、期間を揃えて比較することで数字を正直に保つ Google ビジネスプロフィールのインサイト、そして LLM の回答にその店がどう登場するかという AI 可視性のチェック。差分と成果はチャート付きのレポートにまとめ、オーナーが実行できる推奨事項まで落とし込む。",
        },
      },
      {
        h: {
          en: "LLMs in production, with a human final pass",
          ja: "LLM の本番運用、最終判断は人間",
        },
        p: {
          en: "Generation runs on Japanese SOPs executed by Claude: a thirteen step procedure with preflight checks and schema validation drafts each report, and I make the final call before anything reaches a paying client. Operating LLM output at client quality, month after month, is the discipline this service taught me.",
          ja: "生成は Claude が実行する日本語 SOP で回る。preflight チェックとスキーマ検証を含む13ステップの手順が各レポートの初稿を作り、課金クライアントに届く前に必ず人間が最終判断する。LLM の出力をクライアント品質で毎月運用し続けること、それがこのサービスで身についた規律になっている。",
        },
      },
    ],
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
    body: [
      {
        h: {
          en: "What I built",
          ja: "つくったもの",
        },
        p: {
          en: "Vacanti AI is an AI job matching SaaS for job seekers in Australia. I designed, built and shipped it alone, from the matching engine to payments, and it runs in production today.",
          ja: "Vacanti AI は、オーストラリアの求職者向け AI ジョブマッチング SaaS。マッチングエンジンから課金まで一人で設計・実装して本番公開し、今も本番で稼働している。",
        },
      },
      {
        h: {
          en: "The matching engine",
          ja: "マッチングエンジン",
        },
        p: {
          en: "Scoring is a four axis weighted model, title, seniority, years and embedding similarity, with guardrails on top. The one that mattered most is a hard ceiling for title matches without domain experience, because the worst failure of a matcher is a confident false positive. Embeddings run on pgvector inside Supabase; job extraction uses an LLM with structured output.",
          ja: "スコアリングは、職種タイトル、レベル、経験年数、埋め込み類似度の4軸加重モデルに、ガードレールを重ねたもの。いちばん効いたのは「タイトルは一致するがドメイン経験がゼロ」の求人にスコア上限を掛けるハードシーリングで、マッチングの最悪の失敗である自信満々の偽陽性を抑えている。埋め込みは Supabase 上の pgvector、求人情報の抽出は構造化出力の LLM。",
        },
      },
      {
        h: {
          en: "Measuring quality before users see it",
          ja: "ユーザーに届く前に品質を測る",
        },
        p: {
          en: "I built an evaluation pipeline that renders real resumes and scores them with a vision model across twenty one cases, so scoring changes get checked against ground truth before deploy. It caught real failures: high scores that looked right and were wrong.",
          ja: "実際のレジュメをレンダリングして Vision モデルで採点する21ケースの評価パイプラインを実装し、スコアリングの変更はデプロイ前に正解データと突き合わせて検証する体制にした。見た目は正しく中身は間違っている高スコアという、実害のある失敗を実際に検出している。",
        },
      },
      {
        h: {
          en: "Product, stack, and the first users",
          ja: "プロダクト、スタック、最初のユーザー",
        },
        p: {
          en: "Around the engine sits an application workspace: resume tailoring, cover letters, screening answers and a kanban of applications. The stack is Next.js, Supabase with pgvector, Drizzle, Clerk and Stripe, with the UI in English and Japanese. To find the first users I ran workshops at language schools and walked people through their first matches in person.",
          ja: "エンジンの周りには応募ワークスペースを実装した。レジュメ調整、カバーレター、スクリーニング回答、応募管理のカンバン。スタックは Next.js、Supabase(pgvector)、Drizzle、Clerk、Stripe で、UI は英語と日本語。最初のユーザーは語学学校でワークショップを開いて獲得し、目の前で最初のマッチングを一緒に見るところから始めた。",
        },
      },
    ],
    links: [{ label: "vacanti-ai.com", href: "https://vacanti-ai.com" }],
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
    body: [
      {
        h: {
          en: "The research question",
          ja: "研究の問い",
        },
        p: {
          en: "Warden is capstone research at the University of Technology Sydney: can you catch prompt injection by watching the model think? Instead of only screening inputs and outputs, Warden monitors the model's chain of thought and flags reasoning that starts following injected instructions. Two detector families were built: rule based checks over the reasoning trace, and an LLM as judge.",
          ja: "Warden はシドニー工科大学の Capstone 研究で、問いは「モデルの思考過程を見れば、プロンプトインジェクションを捕まえられるか」。入力と出力だけを検査するのではなく、CoT(思考の連鎖)を監視して、注入された指示に従い始めた推論を検出する。検出器はルールベースと LLM-as-judge の2系統を実装した。",
        },
      },
      {
        h: {
          en: "My slice: the benchmark",
          ja: "私の担当: ベンチマーク",
        },
        p: {
          en: "In a team of six, I owned the attack dataset and the baselines. The attack set is built entirely from real, published attacks (the deepset and BIPIA corpora), classified with an LLM, wrapped in realistic carriers such as emails, HTML documents and Slack messages, and paired with clean controls for false positive measurement. Every row carries provenance back to its source, verified by exact match, so the benchmark itself can be audited.",
          ja: "6人チームの中で、私は攻撃データセットとベースラインを担当した。攻撃データは deepset と BIPIA という公開された実在の攻撃コーパスだけから構築し、LLM で分類、メール・HTML文書・Slack メッセージといった現実的なキャリアに包み、誤検出率を測るためのクリーン対照群と対にした。全行が原典への出所情報を持ち、完全一致で検証済み。ベンチマーク自体が監査できる作りになっている。",
        },
      },
      {
        h: {
          en: "Evaluation and outcome",
          ja: "評価と結果",
        },
        p: {
          en: "Wardens and baselines were evaluated on attack success rate, and on detection and false positive rates by attack category. The full report is written and submitted as the capstone deliverable.",
          ja: "各 Warden とベースラインは、攻撃成功率と、攻撃カテゴリ別の検出率・誤検出率で評価した。レポートは執筆を完了し、Capstone の成果物として提出済み。",
        },
      },
    ],
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
