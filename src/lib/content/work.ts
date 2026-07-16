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
     body stay as summary-only pages by design. A section can carry its
     own figures (basenames under public/work/gallery/), rendered right
     after its paragraph so images sit in context. Figures are either
     shared across languages (string[]) or split per language, so an
     EN screenshot only shows on the EN page and vice versa. */
  body?: {
    h: Localized;
    p: Localized;
    img?: string[] | { en: string[]; ja: string[] };
  }[];
  links?: { label: string; href: string }[];
  /* community cards carry a logo slug (public/community/<logo>.png) */
  logo?: string;
  /* gallery image basenames under public/work/gallery/; rendered as a
     grid of real activity shots / result figures on the detail page */
  gallery?: string[];
  /* a real code excerpt shown in a panel on the detail page */
  code?: { caption: Localized; src: string };
};

export const WORK: WorkEntry[] = [
  {
    slug: "cubic-innov8",
    name: "Cubic Innov8",
    tag: { en: "COO", ja: "COO" },
    desc: {
      en: "COO of a cross-border innovation hub connecting Japan and Australia: I run operations and grow the ventures that live under it.",
      ja: "日本とオーストラリアをつなぐクロスボーダー・イノベーションハブのCOO。運営を回し、その中の事業を育てる。",
    },
    detail: {
      en: "Cubic Innov8 is a cross-border innovation hub spanning Kyoto, Tokyo, Nagano and Sydney. As COO I run its operations and build the ventures inside it, from client services to community events.",
      ja: "Cubic Innov8 は、京都・東京・長野・シドニーにまたがるクロスボーダー・イノベーションハブ。COO として運営を回し、クライアントサービスからコミュニティイベントまで、その中の事業を育てている。",
    },
    body: [
      {
        h: { en: "A cross-border innovation hub", ja: "クロスボーダー・イノベーションハブ" },
        p: {
          en: "Cubic Innov8 is not an agency or a consulting shop. It is a cross-border innovation hub, established in 2024, spanning Kyoto, Tokyo, Nagano and Sydney, built on the idea that people, technology and purpose meet across borders: from Japan, to Australia, to the world. New ventures, services and communities get started and grown under this roof. The brand film above is in-house work, produced by VAI Motion, which also lives on this portfolio.",
          ja: "Cubic Innov8 は、受託会社でもコンサル会社でもない。2024年設立、京都・東京・長野・シドニーにまたがるクロスボーダー・イノベーションハブで、「人・テクノロジー・目的が国境を越えて出会う」という思想でつくられている。日本からオーストラリアへ、そして世界へ。新しい事業やサービス、コミュニティがこの傘の下で生まれ、育っていく。ページ上部のブランドフィルムは、このポートフォリオにも登場する VAI Motion による自社制作。",
        },
        img: ["cubic-innov8-1"],
      },
      {
        h: { en: "What the COO does here", ja: "COO の仕事" },
        p: {
          en: "My role spans the two sides most organisations split between different people. On the business side I bring in partners and clients, run operations across both countries, and stand on stage at community events. On the build side I design and ship the AI systems and workflows that power the ventures. Doing both means what the hub promises is something I can actually build.",
          ja: "私の役割は、多くの組織が別々の人に分ける二つの側面にまたがる。事業側ではパートナーとクライアントを開拓し、日豪両国で運営を回し、コミュニティイベントの壇上にも立つ。実装側では、事業を動かすAIシステムとワークフローを設計して本番に投入する。両方をやるからこそ、ハブが掲げる約束を自分の手でかたちにできる。",
        },
      },
      {
        h: { en: "The ventures under this roof", ja: "この傘の下の事業" },
        p: {
          en: "The other case studies on this site are what the role looks like in practice: the monthly marketing report service for hospitality clients was sourced and is operated here, and the Sydney workshops and event appearances happen under the same hat. Cubic is the hub those threads run through.",
          ja: "このサイトの他のケーススタディが、この役割の実際の中身になっている。飲食クライアント向けの月次マーケティングレポート事業はここで開拓・運用しているし、シドニーでのワークショップ登壇も同じ肩書きで行っている。Cubic は、それらの糸が束ねられるハブそのものだ。",
        },
      },
      {
        h: { en: "Japan and Australia, one operator", ja: "日本とオーストラリア、一人のオペレーター" },
        p: {
          en: "Japan and Australia are different markets with different customs, and I work across both in both languages. The same person scopes an initiative, launches it, and keeps it running afterwards, which is what lets a small cross-border team move fast without losing the thread between the two countries.",
          ja: "日本とオーストラリアは商習慣も違う別々の市場で、その両方に、両方の言語でまたがって動いている。同じ人間が構想を見立て、立ち上げ、その後の運用まで持つ。だからこそ小さなクロスボーダーチームでも、二つの国の間の糸を切らさずに速く動ける。",
        },
      },
    ],
    links: [
      {
        label: "cubic-innov8-group.com",
        href: "https://cubic-innov8-group.com",
      },
    ],
  },
  {
    slug: "vai-studio",
    name: "VAI Studio",
    desc: {
      en: "AI video and web studio serving Japan and Australia: one engine, three levels, client work live in production.",
      ja: "日豪で動くAI動画・Web制作スタジオ。1つのエンジン、3つのレベル、実クライアント案件が本番稼働中。",
    },
    detail: {
      en: "V plus AI. Motion ships AI assisted promo videos off the shelf, Flow builds AI workflows to order, and Build writes custom AI software from scratch. The Vacanti promo playing above and the work wall below are the studio's own output.",
      ja: "V + AI = VAI。Motion は AI プロモ動画を定型で、Flow は AI ワークフローを受注で、Build はカスタム AI ソフトウェアをゼロから。上で流れている Vacanti のプロモも下の作品一覧も、スタジオ自身のアウトプット。",
    },
    body: [
      {
        h: {
          en: "One engine, three levels",
          ja: "1つのエンジン、3つのレベル",
        },
        p: {
          en: "VAI Studio (V plus AI) is my AI content and software studio for Japan and Australia, structured as three levels of the same engine. VAI Motion, live today, produces AI assisted promo videos and social posts from a client's photos. VAI Flow turns a team's repetitive work into AI workflows, made to order. VAI Build writes custom AI software from scratch. I run the whole loop myself: finding the client, scoping, producing, delivering, and operating after launch.",
          ja: "VAI Studio(V + AI)は、日豪向けの AI コンテンツ・ソフトウェアスタジオ。同じエンジンを3つのレベルで提供する。稼働中の VAI Motion は、クライアントの写真から AI プロモ動画とソーシャル投稿を制作。VAI Flow は、チームの繰り返し作業を受注型の AI ワークフローに変える。VAI Build は、カスタム AI ソフトウェアをゼロから書く。クライアント開拓、要件定義、制作、納品、公開後の運用まで、一連のループを一人で回している。",
        },
        img: ["vai-studio-1", "vai-studio-3"],
      },
      {
        h: {
          en: "Motion: AI-made videos, finished by a human",
          ja: "Motion: AIがつくり、人が仕上げる動画",
        },
        p: {
          en: "Motion's promise is simple: no shoots, far cheaper than an agency, send a photo and we handle the rest. AI generates, a person finishes, and the client approves before anything goes live. The recent-work wall below is real output across industries: vertical reels for a gym, a language school, a cafe, a salon and an izakaya, plus landscape brand videos, including the Vacanti promo and the Cubic Innov8 brand film from this very portfolio.",
          ja: "Motion の約束はシンプルで、撮影なし、代理店よりずっと安く、写真を送れば残りはこちらでやる。AI が生成し、人が仕上げ、公開前にクライアントが承認する。下の作品一覧は業種を横断した実制作で、ジム・語学学校・カフェ・サロン・居酒屋の縦型リール、そして横型のブランド動画。このポートフォリオに登場する Vacanti のプロモも Cubic Innov8 のブランドフィルムも、ここで制作した。",
        },
        img: ["vai-work-wall"],
      },
      {
        h: {
          en: "Build: client work, live in production",
          ja: "Build: クライアントワークは本番で稼働中",
        },
        p: {
          en: "For a private concierge service in Sydney, Build delivered the full company site: seven pages with a pricing simulator, a contact flow and a cancellation policy, implemented in Next.js from a design handoff and running in production on the client's own domain. Motion produces the same client's ongoing Instagram content, month after month: one studio covering both the site and the feed.",
          ja: "シドニーのプライベートコンシェルジュサービスには、Build として企業サイト一式を納品した。料金シミュレーター、問い合わせフロー、キャンセルポリシーを含む全7ページを、デザインハンドオフから Next.js で本実装し、クライアントの独自ドメインで本番運用中。同じクライアントの Instagram コンテンツは Motion が毎月継続制作している。サイトとフィードを、1つのスタジオで両方持つ。",
        },
      },
      {
        h: {
          en: "Two markets, one build",
          ja: "2つの市場、1つの実装",
        },
        p: {
          en: "The studio's own sites run English and Japanese as separate market entries with separate dictionaries, down to the legal disclosure pages Japanese consumer law expects. Next.js and React, shipped and maintained by one person, and everything on this page, the brand video, the reels, the sites, was produced with the same AI-assisted pipeline the studio sells.",
          ja: "スタジオ自身のサイトは、英語と日本語を別々の市場エントリとして実装し、辞書も分離している。日本の消費者向け法定表記(特商法ページ)まで対応。Next.js と React で、公開も運用も一人。そしてこのページにあるもの、ブランド動画もリールもサイトも、すべてスタジオが売っているのと同じ AI 支援パイプラインで制作している。",
        },
        img: ["vai-motion-1"],
      },
    ],
    links: [
      {
        label: "vai-studio-rho.vercel.app",
        href: "https://vai-studio-rho.vercel.app",
      },
      { label: "vai-motion.vercel.app", href: "https://vai-motion.vercel.app" },
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
          en: "The product",
          ja: "商品",
        },
        p: {
          en: "Review365 is a productised monthly marketing report for hospitality businesses in Australia: review growth, local keyword rankings, Google Business Profile insights and AI visibility, measured every month and written up in plain language with a prioritised list of moves the owner can actually make. One subscription, one report, delivered every month.",
          ja: "Review365 は、豪州の飲食ビジネス向けに商品化した月次マーケティングレポート。レビューの伸び、ローカルキーワード順位、Google ビジネスプロフィールのインサイト、AI 上の可視性を毎月計測し、オーナーが実行できる優先順位つきの打ち手まで、平易な言葉で書き上げる。1つの契約、1本のレポート、毎月納品。",
        },
        img: ["review365-1"],
      },
      {
        h: {
          en: "Sold the hard way",
          ja: "飛び込みで売った",
        },
        p: {
          en: "The client list did not come from ads or referrals. I walked into restaurants in Sydney, pitched the owners face to face, and ran every sales meeting myself. Ten businesses signed up, and four became ongoing monthly engagements that I still operate end to end, from that first conversation to each month's report. Selling door to door and then delivering month after month is the business side of this portfolio at its most literal.",
          ja: "クライアントは広告や紹介で集めたのではない。シドニーの飲食店に飛び込みで入り、オーナーに直接売り込み、商談もすべて自分で回した。10社が契約し、うち4社は月次の継続契約として、初回の商談からその月のレポートまで今もエンドツーエンドで運用している。飛び込みで売り、毎月納品し続ける。このポートフォリオの「事業側」の、いちばん文字通りの形。",
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
        img: ["review365-4"],
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
      {
        h: { en: "A real report, as delivered", ja: "実際に納品しているレポート" },
        p: {
          en: "The pages on this case study are from an actual monthly report as delivered to a paying client (identifying details masked). The KPI header the owner reads first, the month's summary in plain language, keyword movement against local competitors, and a prioritised list of moves. When the numbers dip, the report says so plainly; an honest bad month is what keeps the good months credible.",
          ja: "このページに載せているのは、課金クライアントに実際に納品している月次レポートそのもの(固有情報はマスク済み)。オーナーが最初に見る KPI ヘッダー、平易な言葉での今月の要点、ローカル競合に対するキーワードの動き、優先順位つきの打ち手。数字が落ちた月は落ちたと正直に書く。悪い月を正直に報告するから、良い月の報告が信用される。",
        },
        img: ["review365-2", "review365-3"],
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
        img: { en: ["vacanti-en-1"], ja: ["vacanti-ja-1"] },
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
        img: { en: ["vacanti-en-2"], ja: ["vacanti-ja-2"] },
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
          en: "Around the engine sits an application workspace: resume tailoring, cover letters, screening answers and a kanban of applications. The stack is Next.js, Supabase with pgvector, Drizzle, Clerk and Stripe, with the UI in English and Japanese.",
          ja: "エンジンの周りには応募ワークスペースを実装した。レジュメ調整、カバーレター、スクリーニング回答、応募管理のカンバン。スタックは Next.js、Supabase(pgvector)、Drizzle、Clerk、Stripe で、UI は英語と日本語。",
        },
        img: { en: ["vacanti-en-3"], ja: ["vacanti-ja-3"] },
      },
      {
        h: { en: "Taking it to market", ja: "市場に持っていく" },
        p: {
          en: "Building it was half the job; the other half was selling it. I produced the brand and promo video above, run the product's Instagram, and took Vacanti into language schools in Sydney, running job-hunting workshops where students got their market value scored live and walked through their first matches in person. The workshops doubled as user acquisition: teach the room, and the room signs up.",
          ja: "つくることは仕事の半分で、残りの半分は売ることだった。上のブランド・プロモ動画を制作し、プロダクトの Instagram を運用し、シドニーの語学学校に Vacanti を持ち込んで仕事探しワークショップを開催。参加者の市場価値をその場でスコアリングし、最初のマッチングを目の前で一緒に見る。ワークショップはそのままユーザー獲得を兼ねる。教室に教えれば、教室が登録してくれる。",
        },
        img: ["vacanti-flyer", "vacanti-ai-1"],
      },
    ],
    code: {
      caption: {
        en: "The scoring formula and its guardrails, as documented in the shipped code (src/lib/jobs/adapters.ts): the level-floor ceiling, and the v20 hard cap that killed a confident 100/100 false positive.",
        ja: "本番コードに書かれたままのスコアリング式とガードレール(src/lib/jobs/adapters.ts)。レベルフロアの上限と、自信満々の 100/100 偽陽性を潰した v20 のハードキャップ。",
      },
      src: `/* v15 4-axis title-weighted scorer (career-changer friendly)
 * embedding' = (titleAxis=100 && embeddingAxis<70) ? 70 : embeddingAxis
 * core    = title*0.50 + level*0.25 + years*0.15 + embedding'*0.10
 * raw     = core + clamp(0..+8, languageBonus)
 * ceiling = 50 + level_axis                     // level-floor rule
 * final   = clamp(40, min(raw, ceiling), 100)
 *
 * v20: title-match-without-domain-experience hard ceiling.
 * A target list with a broad token like "Sales" gave titleAxis=100
 * against any role containing the word, producing a 100/100 score
 * for an obvious mismatch. Fix: when titleAxis=100 but
 * candidateYearsByDomain[jobDomain]=0, cap the final score at 85. */`,
    },
    links: [
      { label: "vacanti-ai.com", href: "https://vacanti-ai.com" },
      {
        label: "instagram.com/vacanti_ai",
        href: "https://www.instagram.com/vacanti_ai/",
      },
    ],
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
    body: [
      {
        h: { en: "The idea", ja: "アイデア" },
        p: {
          en: "Kodoku is a company memory OS for solo founders: you hire AI staff, arrange them on an org chart, and delegate work, while the company itself accumulates the decisions, minutes and context that normally evaporate between chat sessions. The org chart above is the actual product: a constellation of roles around a single commander, with you as CEO.",
          ja: "Kodoku は、1人で会社をやる人のための会社の記憶OS。AI社員を雇い、組織図に並べ、仕事を任せる。その間に、普段はチャットセッションの狭間で蒸発していく意思決定・議事録・文脈を、会社そのものが蓄積していく。上の組織図は実際のプロダクト画面で、司令塔を中心とした役割の星座の下に、CEO としてのあなたが立つ。",
        },
      },
      {
        h: { en: "A deliberate architecture", ja: "意図した設計" },
        p: {
          en: "The design principle is strict: Kodoku does not build its own agent runtime. The execution engine is always the user's own AI tooling, and Kodoku is the memory and organisation layer on top. It is in development, and it is the thing I most want to exist.",
          ja: "設計原則は厳格で、Kodoku は自前のエージェントランタイムを作らない。実行エンジンは常にユーザー自身の AI ツールで、Kodoku はその上に載る記憶と組織のレイヤーに徹する。現在開発中。いま一番つくりたいものだ。",
        },
        img: ["kodoku-2"],
      },
    ],
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
        img: ["warden-2"],
      },
      {
        h: {
          en: "Evaluation and outcome",
          ja: "評価と結果",
        },
        p: {
          en: "Against the benchmark, the Warden agent cut attack success rate from 12.5 percent (no defence) to 7.9 percent, where traditional defences averaged 12.6 percent, and it kept false positives at 6.7 percent versus their 20.5 percent average, detecting attacks in about 8 seconds. The full report is written and submitted as the capstone deliverable.",
          ja: "ベンチマーク上で、Warden エージェントは攻撃成功率を12.5%(防御なし)から7.9%まで下げた。従来型防御の平均は12.6%。誤検出率も従来平均20.5%に対し6.7%に抑え、検出まで約8秒。レポートは執筆を完了し、Capstone の成果物として提出済み。",
        },
        img: ["warden-1"],
      },
    ],
    code: {
      caption: {
        en: "The benchmark audits itself: every attack row is traced back to its upstream corpus (BIPIA / deepset) by exact match, so nothing in the dataset is synthesised (from verify_attack_provenance.py).",
        ja: "ベンチマーク自身を監査する: 全攻撃行を上流コーパス(BIPIA / deepset)と完全一致で突き合わせ、捏造ゼロを保証(verify_attack_provenance.py より)。",
      },
      src: `"""Verify every attack string in phase1_attacks_provenance.jsonl
traces back to the upstream BIPIA / deepset corpus, not synthesized."""

def load_deepset() -> dict[str, set[str]]:
    ds = load_dataset("deepset/prompt-injections")
    out: dict[str, set[str]] = {}
    for split in ("train", "test"):
        out[split] = {r["text"].strip() for r in ds[split] if r["label"] == 1}
    return out

with PROV_PATH.open() as f:
    prov = [json.loads(l) for l in f]
# reports MATCH / MISMATCH per row + summary`,
    },
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
        img: ["draft-prediction-1"],
      },
      {
        h: { en: "Model and result", ja: "モデルと結果" },
        p: {
          en: "After ANOVA, chi-square and mutual-information feature selection, I compared logistic regression, random forest, XGBoost and LightGBM, then a stacked ensemble. The chosen model was a 70/30 logistic-regression and XGBoost blend, picked by sweeping the blend weight against validation AUROC: test AUROC around 0.997, Kaggle 0.9985. In business terms, a shortlist of 100 flagged players holds roughly 78 true prospects.",
          ja: "ANOVA・カイ二乗・相互情報量で特徴選択し、ロジスティック回帰・ランダムフォレスト・XGBoost・LightGBM、さらにスタッキングを比較。最終的に選んだのは、検証AUROCに対してブレンド比率を掃引して決めた、ロジスティック回帰とXGBoostの70/30ブレンド。テストAUROCは約0.997、Kaggleで0.9985。業務的に言えば、100人の候補リストに約78人の本命が含まれる。",
        },
        img: ["draft-prediction-2", "draft-prediction-3"],
      },
      {
        h: { en: "Packaged, not just notebooked", ja: "ノートブックで終わらせない" },
        p: {
          en: "The reusable utilities became my own pip package, my_krml_14658203, built from a cookiecutter template with source layout, tests and docs and pushed to TestPyPI. The project ships as a full CRISP-DM report, four experiment notebooks and saved model artifacts, not a single throwaway notebook.",
          ja: "再利用可能なユーティリティは、自作のpipパッケージ my_krml_14658203 にまとめた。cookiecutterテンプレートでソース構成・テスト・ドキュメントを備え、TestPyPIに公開。成果物は、CRISP-DMに沿ったレポート、4本の実験ノートブック、保存済みモデル一式で、使い捨ての1ノートブックではない。",
        },
      },
    ],
    code: {
      caption: {
        en: "Choosing the blend: sweeping the LogReg / XGBoost weight against validation AUROC (from experiment 4).",
        ja: "ブレンドの決定: LogReg / XGBoost の比率を検証AUROCに対して掃引(実験4より)。",
      },
      src: `weights = [0.1, 0.2, 0.3, 0.5, 0.7, 0.8, 0.9]
records = []
for w in weights:
    blend_val  = w * pred_lr_val  + (1 - w) * pred_xgb_val
    blend_test = w * pred_lr_test + (1 - w) * pred_xgb_test
    records.append({
        "Blend (LogReg/XGB)": f"{round(w*100)}/{round((1-w)*100)}",
        "AUROC_val":  roc_auc_score(y_val,  blend_val),
        "AUROC_test": roc_auc_score(y_test, blend_test),
    })
blend_df = pd.DataFrame(records).sort_values("AUROC_val", ascending=False)`,
    },
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
        img: ["weather-api-1", "weather-api-3", "weather-api-2"],
      },
      {
        h: { en: "From model to running service", ja: "モデルから稼働サービスへ" },
        p: {
          en: "Both models were containerised with Docker and served through FastAPI with Swagger docs, deployed to a live public URL on Render behind /predict/rain_or_not and /predict/precipitation_fall. Most student projects stop at a notebook; this one is a call away.",
          ja: "両モデルを Docker でコンテナ化し、Swaggerドキュメント付きの FastAPI で配信。Render の公開URLにデプロイし、/predict/rain_or_not と /predict/precipitation_fall で呼び出せる。多くの学生プロジェクトはノートブックで止まるが、これはリクエスト一つで動く。",
        },
      },
    ],
    code: {
      caption: {
        en: "Time-series-aware tuning: TimeSeriesSplit keeps the folds in chronological order, and XGBoost's scale_pos_weight is computed from the real class imbalance (from the rain classifier experiment).",
        ja: "時系列を守ったチューニング: TimeSeriesSplit で学習フォールドの時間順を保ち、XGBoost の scale_pos_weight は実際のクラス不均衡から算出(降雨分類の実験より)。",
      },
      src: `from sklearn.model_selection import TimeSeriesSplit

ts_cv = TimeSeriesSplit(n_splits=5)   # keep time order within training
SCORING = "f1"                        # main metric per business goal

# class imbalance helper for XGBoost
pos = y_train.sum()
neg = len(y_train) - pos
scale_pos_weight = float(neg) / float(pos) if pos > 0 else 1.0

rf = RandomForestClassifier(
    random_state=RANDOM_STATE, class_weight="balanced", n_jobs=-1)
xgb = XGBClassifier(
    tree_method="hist", random_state=RANDOM_STATE,
    eval_metric="logloss")`,
    },
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
        img: ["cloud-elt-1", "cloud-elt-2"],
      },
      {
        h: { en: "What the data said", ja: "データが語ったこと" },
        p: {
          en: "The gold layer answered real questions: median host age correlated with revenue at Pearson r around 0.737, 79.4 percent of multi-listing hosts stayed within a single LGA, and entire-home listings sized for two to four guests maximised stays. The point of the engineering is that these answers are reproducible, not one-off queries.",
          ja: "Gold層は実際の問いに答えた。ホストの年齢中央値と売上はピアソン相関 約0.737、複数物件を持つホストの79.4%が単一LGA内にとどまり、2〜4人向けの一棟貸しが宿泊数を最大化した。エンジニアリングの意義は、これらの答えが使い捨てクエリではなく再現可能である点にある。",
        },
      },
    ],
    code: {
      caption: {
        en: "The ingestion DAG on Cloud Composer: raw CSVs land from GCS into the Bronze schema on Cloud SQL, with retries and error handling before dbt takes over (from the combined Airflow DAG).",
        ja: "Cloud Composer 上のインジェスト DAG: GCS の生CSVを Cloud SQL の Bronze スキーマへ。リトライとエラー処理を備え、その先は dbt が引き継ぐ(Airflow DAG より)。",
      },
      src: `dag = DAG(
    dag_id="bde_load_raw_to_postgres",
    description="Load raw CSVs from GCS to Cloud SQL Bronze schema",
    default_args={"retries": 1, "retry_delay": timedelta(minutes=3)},
    schedule_interval=None,
    start_date=datetime(2025, 1, 1),
    catchup=False,
    max_active_runs=1,
)

def _download_from_gcs(gcs_path: str, **_):
    Path(LOCAL_DIR).mkdir(parents=True, exist_ok=True)
    local_path = os.path.join(LOCAL_DIR, os.path.basename(gcs_path))
    GCSHook().download(bucket_name=BUCKET,
                       object_name=gcs_path, filename=local_path)
    return local_path`,
    },
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
        img: ["image-captioning-3"],
      },
      {
        h: { en: "Looking inside the model", ja: "モデルの中を見る" },
        p: {
          en: "The gallery below is straight from the delivered notebook: both models' captions against the human references on twelve test photos, and the Transformer's cross-attention heatmaps, where the word \"barcode\" visibly attends to the barcode in the image. Seeing where the model looks is how you debug a captioner.",
          ja: "下のギャラリーは提出ノートブックの出力そのまま。テスト12枚に対する両モデルのキャプションと人間の正解の比較、そして Transformer のクロスアテンション。「barcode」という単語の生成時に、モデルが実際に画像内のバーコードを見ているのが分かる。モデルがどこを見ているかを可視化することが、キャプショナーのデバッグになる。",
        },
        img: ["image-captioning-2", "image-captioning-1"],
      },
    ],
    code: {
      caption: {
        en: "Beam-search evaluation on the test split: width 5, UNK masked, repetition penalised, scored with BLEU (from the delivered notebook).",
        ja: "テスト分割でのビームサーチ評価: 幅5、UNKマスク、繰り返しペナルティ、BLEUで採点(提出ノートブックより)。",
      },
      src: `@torch.no_grad()
def evaluate_beam(model, loader, beam_width: int = 5) -> dict:
    model.eval()
    hyps, ids = [], []
    for batch_ids, feats, tokens, lens in loader:
        feats = feats.to(DEVICE)
        out_ids = model.generate_beam(feats, beam_width=beam_width)
        hyps.extend([decode_ids(o) for o in out_ids])
        ids.extend(batch_ids)
    return {'scores': compute_bleu(ids, hyps), 'ids': ids, 'hyps': hyps}

m2_eval = evaluate_beam(model2, test_loader, beam_width=5)`,
    },
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
        img: ["rental-regression-3"],
      },
      {
        h: { en: "Chosen for generalisation", ja: "汎化で選ぶ" },
        p: {
          en: "Across four experiment notebooks I compared linear regression (test RMSE 0.0702 on log-rent) and ElasticNet (0.0708) against a KNN model. The KNN with Manhattan distance at k equals 11 won at test RMSE 0.0649, chosen because its train and validation gap stayed small, not because it topped a single split.",
          ja: "4本の実験ノートブックで、線形回帰(対数家賃のテストRMSE 0.0702)と ElasticNet(0.0708)を KNN と比較。マンハッタン距離・k=11 の KNN がテストRMSE 0.0649で最良となった。選定理由は、単一分割で首位だったからではなく、訓練と検証の差が小さく保たれたため。",
        },
        img: ["rental-regression-1", "rental-regression-2"],
      },
    ],
    code: {
      caption: {
        en: "The final pick, with the losing option kept on record: euclidean vs manhattan at k=11, decided on the train/val/test spread (from experiment 3).",
        ja: "最終選定。負けた案も記録に残す: k=11 でのユークリッド vs マンハッタン、train/val/test の広がりで判断(実験3より)。",
      },
      src: `# euclidean            # manhattan
# n_neighbors = 11     n_neighbors = 11
# p = 2                p = 1
# train = 0.0452       # train = 0.0432
# val   = 0.0472       # val   = 0.0443
# test  = 0.0664       # test  = 0.0649  <- chosen

knn_model = KNeighborsRegressor(n_neighbors=n_neighbors, p=p)
knn_model.fit(X_train, y_train)`,
    },
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
        img: ["ws-zepi-1", "ws-zepi-3"],
      },
      {
        h: { en: "The workshops", ja: "ワークショップ" },
        p: {
          en: "The LinkedIn Workshop at the University of Wollongong covered finding the right job and reaching out to founders directly. The Notion x AI workshop (Zepi Rooftop #8, at Sydney Polytechnic Institute) walked through building a second brain that turns your life into an asset. Claude Code is next.",
          ja: "ウーロンゴン大学での LinkedIn ワークショップでは、自分に合う仕事の見つけ方と、創業者への直接アプローチを扱った。Notion × AI ワークショップ(Zepi Rooftop #8、Sydney Polytechnic Institute 開催)では、人生を資産に変える「第二の脳」の作り方を実演。次は Claude Code。",
        },
        img: ["ws-linkedin-1", "ws-notion-1", "ws-linkedin-2", "ws-notion-2"],
      },
    ],
    gallery: ["ws-notion-3", "ws-zepi-2", "ws-zepi-4", "ws-zepi-5"],
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
        img: ["ai-salon-1"],
      },
    ],
  },
];
