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
  /* community cards carry a logo slug (public/community/<logo>.png) */
  logo?: string;
  /* gallery image basenames under public/work/gallery/; rendered as a
     grid of real activity shots on the detail page */
  gallery?: string[];
};

export const WORK: WorkEntry[] = [
  {
    slug: "cubic-innov8",
    name: "Cubic Innov8",
    tag: { en: "COO", ja: "COO" },
    desc: {
      en: "COO of an IT and innovation group across Kyoto and Sydney: I bring in the clients, run operations, and build the AI systems that serve them.",
      ja: "京都とシドニーのIT・イノベーション企業のCOO。クライアントを開拓し、運営を回し、それを支えるAIシステムまで自分でつくる。",
    },
    detail: {
      en: "The business side and the build side in one role: sourcing and running client work, then designing the AI workflows and systems that deliver it. This is where the two halves of what I do meet.",
      ja: "事業側と実装側を一つの役割で。クライアントの開拓と運営、そしてそれを届けるAIワークフローとシステムの設計。私の仕事の両輪が交わる場所。",
    },
    body: [
      {
        h: { en: "The role", ja: "役割" },
        p: {
          en: "I am COO of Cubic Innov8, an IT and innovation group working across Kyoto and Sydney. The role spans the two sides most companies split between different people: on the business side I bring in clients and run operations, and on the build side I design and ship the systems that serve them. Doing both means the workflow I sell is the workflow I can actually build.",
          ja: "私は京都とシドニーで事業を展開するIT・イノベーション企業 Cubic Innov8 のCOO。多くの会社が別々の人に分ける二つの側面を、一つの役割で担っている。事業側ではクライアントを開拓して運営を回し、実装側ではそれを支えるシステムを設計して本番に投入する。両方をやるからこそ、売るワークフローと、実際につくれるワークフローが一致する。",
        },
      },
      {
        h: { en: "AI that changes how the business runs", ja: "事業の回り方を変えるAI" },
        p: {
          en: "The through line is using AI to change how a business actually runs: finding where a workflow is slow or manual, rebuilding it with LLMs and automation, and standing up the SOPs and tooling so it holds up in daily operation. It is consulting that ends in something shipped, not a slide deck.",
          ja: "一貫しているのは、AIで事業の回り方そのものを変えること。どの業務が遅く手作業になっているかを見つけ、LLMと自動化で組み直し、日々の運用で崩れないようSOPとツールまで整える。スライドで終わらず、動くものに着地するコンサルティング。",
        },
      },
      {
        h: { en: "Two cities, one operator", ja: "二つの都市、一人のオペレーター" },
        p: {
          en: "Kyoto and Sydney are different markets with different clients, and I work across both. The same person scopes the engagement, prices it, delivers it and keeps it running afterwards, which is what lets small teams move quickly without losing the thread between the sales conversation and the running system.",
          ja: "京都とシドニーは、クライアントも違う別々の市場で、その両方にまたがって動いている。同じ人間が案件を見立て、値付けし、納品し、その後の運用まで持つ。だからこそ小さなチームでも、商談から稼働中のシステムまで一本の線を切らさずに速く動ける。",
        },
      },
    ],
  },
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
    slug: "draft-prediction",
    name: "Draft Prediction",
    desc: {
      en: "Predicting the college basketball draft on a Kaggle competition, on data where fewer than 1 percent get picked.",
      ja: "Kaggleコンペで大学バスケのドラフト指名を予測。指名される選手は1%未満という不均衡データ。",
    },
    detail: {
      en: "A classification problem with severe class imbalance and a public leaderboard to beat. Test AUROC reached 0.997 to 0.998, and I packaged the reusable pieces as my own pip library.",
      ja: "強い不均衡と、公開リーダーボードのあるクラス分類問題。テストAUROCは0.997〜0.998に到達し、再利用部品は自作のpipライブラリとして公開した。",
    },
    body: [
      {
        h: { en: "The problem", ja: "問題" },
        p: {
          en: "The Kaggle set held 14,774 college-player seasons across 62 features, but only about 0.8 percent were drafted, so accuracy is meaningless and the real task is ranking. The data was also genuinely messy: 2,462 exact duplicates removed, and heights stored as dates (5'11\" had become \"11-May\") that had to be repaired before anything else.",
          ja: "Kaggleのデータは62特徴量・14,774の大学選手シーズン分。だが指名されたのは約0.8%だけで、正解率は意味を持たず、本当の課題はランキングになる。データも相当汚く、完全重複2,462件を除去し、身長が日付として保存されていた箇所(5'11\" が \"11-May\" 化)を先に修復する必要があった。",
        },
      },
      {
        h: { en: "Model and result", ja: "モデルと結果" },
        p: {
          en: "After ANOVA, chi-square and mutual-information feature selection, I compared logistic regression, random forest, XGBoost and LightGBM, then a stacked ensemble. The chosen model was a 20/80 logistic-regression and XGBoost blend, picked on the leaderboard: test AUROC around 0.998, Kaggle 0.9985. In business terms, a shortlist of 100 flagged players holds roughly 78 true prospects.",
          ja: "ANOVA・カイ二乗・相互情報量で特徴選択し、ロジスティック回帰・ランダムフォレスト・XGBoost・LightGBM、さらにスタッキングを比較。最終的にリーダーボードで選んだのは、ロジスティック回帰とXGBoostの20/80ブレンド。テストAUROCは約0.998、Kaggleで0.9985。業務的に言えば、100人の候補リストに約78人の本命が含まれる精度。",
        },
      },
      {
        h: { en: "Packaged, not just notebooked", ja: "ノートブックで終わらせない" },
        p: {
          en: "The reusable utilities became my own pip package, my_krml_14658203, built from a cookiecutter template with source layout, tests and docs and pushed to TestPyPI. The project ships as a full CRISP-DM report, four experiment notebooks and saved model artifacts, not a single throwaway notebook.",
          ja: "再利用可能なユーティリティは、自作のpipパッケージ my_krml_14658203 にまとめた。cookiecutterテンプレートでソース構成・テスト・ドキュメントを備え、TestPyPIに公開。成果物は、CRISP-DMに沿ったレポート、4本の実験ノートブック、保存済みモデル一式で、使い捨ての1ノートブックではない。",
        },
      },
    ],
  },
  {
    slug: "weather-api",
    name: "Weather Prediction API",
    desc: {
      en: "Two Sydney weather models, trained then containerised and deployed as a live, callable API.",
      ja: "シドニーの天気モデル2つを学習し、コンテナ化して稼働中の呼び出せるAPIとしてデプロイ。",
    },
    detail: {
      en: "Will it rain seven days out, and how much rain over the next three: a classifier and a regressor served behind FastAPI in Docker, deployed with a live public endpoint. The value here is the deployment path, not the accuracy.",
      ja: "7日後に雨が降るか、そして今後3日の降水量はどれだけか。分類器と回帰器を Docker 上の FastAPI で配信し、公開エンドポイントとして稼働させた。ここで見せたいのは精度ではなくデプロイまでの道筋。",
    },
    body: [
      {
        h: { en: "Two services", ja: "2つのサービス" },
        p: {
          en: "Built for Sydney's tourism sector on Open-Meteo history from 2010 to 2024, with time-series-aware cross-validation. The rain classifier (random forest) reached F1 around 0.66 at recall 0.61 and precision 0.72; the three-day precipitation regressor (linear regression, which beat an overfitting forest) landed at RMSE about 9.55 mm and R-squared around 0.67. Modest numbers, honestly reported.",
          ja: "Open-Meteoの2010〜2024年の履歴データで、シドニーの観光需要向けに構築。時系列を考慮した交差検証を使用。降雨分類(ランダムフォレスト)はF1約0.66、再現率0.61・適合率0.72。3日間の降水量回帰(過学習した森を上回った線形回帰)はRMSE約9.55mm、決定係数約0.67。控えめな数字を正直に報告している。",
        },
      },
      {
        h: { en: "From model to running service", ja: "モデルから稼働サービスへ" },
        p: {
          en: "Both models were containerised with Docker and served through FastAPI with Swagger docs, deployed to a live public URL on Render behind /predict/rain_or_not and /predict/precipitation_fall. Most student projects stop at a notebook; this one is a call away.",
          ja: "両モデルを Docker でコンテナ化し、Swaggerドキュメント付きの FastAPI で配信。Render の公開URLにデプロイし、/predict/rain_or_not と /predict/precipitation_fall で呼び出せる。多くの学生プロジェクトはノートブックで止まるが、これはリクエスト一つで動く。",
        },
      },
    ],
  },
  {
    slug: "cloud-elt",
    name: "Cloud ELT Pipeline",
    desc: {
      en: "A production-shaped ELT on GCP: dbt, Airflow, Medallion layers and SCD Type 2 over Airbnb and census data.",
      ja: "GCP上の本番型ELT。dbt・Airflow・Medallion構成・SCD Type 2 を、Airbnbと国勢調査データに適用。",
    },
    detail: {
      en: "dbt Cloud transformations orchestrated by Airflow on Cloud Composer, Medallion layers from bronze to gold, a star schema with SCD Type 2, and idempotent monthly loads. Real analytic findings came out the other end.",
      ja: "dbt Cloud の変換を Cloud Composer 上の Airflow で編成し、Bronze から Gold の Medallion 構成、SCD Type 2 のスタースキーマ、冪等な月次ロード。出口では実際の分析結果まで出した。",
    },
    body: [
      {
        h: { en: "The pipeline", ja: "パイプライン" },
        p: {
          en: "Sydney Airbnb listings from May 2020 to April 2021 were enriched with ABS 2016 Census data and NSW LGA mapping, moved through bronze, silver and gold Medallion layers on Cloud SQL Postgres, and modelled as a star schema with SCD Type 2 snapshot dimensions so history is preserved across monthly, idempotent loads.",
          ja: "2020年5月〜2021年4月のシドニーのAirbnbリスティングを、ABS 2016年国勢調査データとNSWのLGAマッピングで拡張。Cloud SQL(PostgreSQL)上で Bronze・Silver・Gold の Medallion 層を通し、SCD Type 2 のスナップショット次元を持つスタースキーマとしてモデル化。月次・冪等なロードで履歴を保持する。",
        },
      },
      {
        h: { en: "What the data said", ja: "データが語ったこと" },
        p: {
          en: "The gold layer answered real questions: median host age correlated with revenue at Pearson r around 0.737, 79.4 percent of multi-listing hosts stayed within a single LGA, and entire-home listings sized for two to four guests maximised stays. The point of the engineering is that these answers are reproducible, not one-off queries.",
          ja: "Gold層は実際の問いに答えた。ホストの年齢中央値と売上はピアソン相関 約0.737、複数物件を持つホストの79.4%が単一LGA内にとどまり、2〜4人向けの一棟貸しが宿泊数を最大化した。エンジニアリングの意義は、これらの答えが使い捨てクエリではなく再現可能である点にある。",
        },
      },
    ],
  },
  {
    slug: "image-captioning",
    name: "Image Captioning",
    desc: {
      en: "Generating captions for photos taken by blind users (VizWiz), from a CNN and GRU baseline to a Transformer decoder.",
      ja: "視覚障害のあるユーザーが撮った写真(VizWiz)にキャプションを生成。CNN+GRUからTransformerデコーダへ。",
    },
    detail: {
      en: "An encoder and decoder captioning model on the VizWiz-Captions dataset, evaluated with BLEU. My contribution went from an EfficientNet and GRU baseline to an EfficientNet and Transformer decoder with beam search.",
      ja: "VizWiz-Captions データセットでの、エンコーダ・デコーダ型キャプション生成。BLEUで評価。私の担当は、EfficientNet+GRUのベースラインから、ビームサーチ付きの EfficientNet+Transformer デコーダへ。",
    },
    body: [
      {
        h: { en: "The dataset and the task", ja: "データセットと課題" },
        p: {
          en: "VizWiz-Captions is built from photos taken by blind users, so images are often blurred, off-centre or poorly lit, which makes captioning genuinely hard. In a group of six, I built and owned two models end to end and evaluated them on BLEU-1 through BLEU-4 over a 1,131 image test split.",
          ja: "VizWiz-Captions は視覚障害のあるユーザーが撮った写真からなり、ブレ・見切れ・暗所が多く、キャプション生成は本当に難しい。6人チームの中で、私は2つのモデルを端から端まで自分で構築し、1,131枚のテスト分割で BLEU-1〜BLEU-4 により評価した。",
        },
      },
      {
        h: { en: "Baseline to Transformer", ja: "ベースラインからTransformerへ" },
        p: {
          en: "The baseline paired a frozen EfficientNet-B0 encoder with a GRU decoder and greedy decoding, reaching BLEU-1 0.5278. The refined model swapped in a Transformer decoder with beam search (beam 5), lifting BLEU-1 to 0.5644 and BLEU-4 to 0.1416. The delivered notebook is individually attributed.",
          ja: "ベースラインは、凍結した EfficientNet-B0 エンコーダに GRU デコーダとグリーディ復号を組み合わせ、BLEU-1 0.5278。改良版は Transformer デコーダとビームサーチ(ビーム幅5)に置き換え、BLEU-1 を 0.5644、BLEU-4 を 0.1416 に引き上げた。提出ノートブックは個人名義で記録されている。",
        },
      },
    ],
  },
  {
    slug: "rental-regression",
    name: "Rental Price Regression",
    desc: {
      en: "Predicting fair rent across six Australian cities, motivated by finding housing as an international student myself.",
      ja: "豪州6都市の適正家賃を予測。留学生として自分が住まい探しに苦労した経験が動機。",
    },
    detail: {
      en: "A clean, solo regression project: messy listing data taken through careful cleaning and feature engineering to a model chosen for generalisation, not just training fit.",
      ja: "一人で仕上げたシンプルな回帰プロジェクト。汚いリスティングデータを、丁寧なクレンジングと特徴量エンジニアリングを経て、訓練適合ではなく汎化で選んだモデルまで。",
    },
    body: [
      {
        h: { en: "Cleaning first", ja: "まずクレンジング" },
        p: {
          en: "Rentals across Sydney, Melbourne, Brisbane, Adelaide, Perth and Canberra came with the usual problems: 686 cross-split duplicates removed, unrealistic floor areas fixed, floor numbers extracted, and a target so skewed (skew 8.18) it needed a log transform down to 5.09 before any model could learn from it.",
          ja: "シドニー・メルボルン・ブリスベン・アデレード・パース・キャンベラの賃貸データには、よくある問題があった。分割をまたぐ重複686件を除去し、非現実的な床面積を修正し、階数を抽出。目的変数は歪度8.18と偏りが激しく、モデルが学習できるよう対数変換で5.09まで落とした。",
        },
      },
      {
        h: { en: "Chosen for generalisation", ja: "汎化で選ぶ" },
        p: {
          en: "Across four experiment notebooks I compared linear regression (test RMSE 0.0702 on log-rent) and ElasticNet (0.0708) against a KNN model. The KNN with Manhattan distance at k equals 11 won at test RMSE 0.0649, chosen because its train and validation gap stayed small, not because it topped a single split.",
          ja: "4本の実験ノートブックで、線形回帰(対数家賃のテストRMSE 0.0702)と ElasticNet(0.0708)を KNN と比較。マンハッタン距離・k=11 の KNN がテストRMSE 0.0649で最良となった。選定理由は、単一分割で首位だったからではなく、訓練と検証の差が小さく保たれたため。",
        },
      },
    ],
  },
];

export const COMMUNITY: WorkEntry[] = [
  {
    slug: "workshops",
    name: "Workshops",
    logo: "zepi",
    desc: {
      en: "Recurring workshops run through Zepi: LinkedIn, then Notion, Claude Code next.",
      ja: "Zepi で継続開催しているワークショップ。LinkedIn、次に Notion、次は Claude Code。",
    },
    detail: {
      en: "I don't just build with these tools, I teach them. Through Zepi in Sydney I speak at events and run hands-on workshops, as COO of Cubic Innov8.",
      ja: "ツールはつくるだけでなく、教える側にも立つ。シドニーの Zepi を通じてイベントに登壇し、ハンズオンのワークショップを開いている。肩書きは Cubic Innov8 COO。",
    },
    body: [
      {
        h: { en: "Teaching, not just building", ja: "つくるだけでなく、教える" },
        p: {
          en: "Through Zepi in Sydney I co-run an events series and speak at it as COO of Cubic Innov8. The audience is mostly international students and new arrivals trying to break into work here, which is exactly who these skills help most.",
          ja: "シドニーの Zepi を通じてイベントシリーズを共同運営し、Cubic Innov8 の COO として登壇している。参加者の多くは、こちらで仕事を得ようとしている留学生や来豪して間もない人たちで、これらのスキルが一番効く層そのものだ。",
        },
      },
      {
        h: { en: "The workshops", ja: "ワークショップ" },
        p: {
          en: "The LinkedIn Workshop at the University of Wollongong covered finding the right job and reaching out to founders directly. The Notion x AI workshop (Zepi Rooftop #8, at Sydney Polytechnic Institute) walked through building a second brain that turns your life into an asset. Claude Code is next.",
          ja: "ウーロンゴン大学での LinkedIn ワークショップでは、自分に合う仕事の見つけ方と、創業者への直接アプローチを扱った。Notion × AI ワークショップ(Zepi Rooftop #8、Sydney Polytechnic Institute 開催)では、人生を資産に変える「第二の脳」の作り方を実演。次は Claude Code。",
        },
      },
    ],
    gallery: [
      "ws-linkedin-1",
      "ws-notion-1",
      "ws-zepi-1",
      "ws-linkedin-2",
      "ws-notion-2",
      "ws-zepi-2",
      "ws-notion-3",
      "ws-zepi-3",
      "ws-zepi-4",
      "ws-zepi-5",
    ],
  },
  {
    slug: "ai-salon",
    name: "AI Salon Sydney",
    logo: "ai-salon",
    desc: {
      en: "Co-organiser of a Sydney AI community, running regular meetups and hands-on sessions.",
      ja: "シドニーのAIコミュニティを共同運営。定期的なミートアップとハンズオンを開催。",
    },
    detail: {
      en: "Co-organiser of an AI community in Sydney, bringing people together for regular meetups and hands-on sessions.",
      ja: "シドニーのAIコミュニティを共同運営。定期的なミートアップとハンズオンで人をつなぐ。",
    },
    body: [
      {
        h: { en: "A community, not an audience", ja: "観客ではなく、コミュニティ" },
        p: {
          en: "Beyond speaking on stage, I help organise an AI community in Sydney: regular meetups and hands-on sessions where people who are curious about AI can actually try things together, rather than just watch a talk.",
          ja: "壇上で話すだけでなく、シドニーのAIコミュニティの運営にも関わっている。定期的なミートアップとハンズオンで、AIに興味がある人たちが講演を見るだけでなく、実際に一緒に手を動かせる場をつくっている。",
        },
      },
    ],
  },
];
