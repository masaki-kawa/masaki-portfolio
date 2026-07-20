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
  /* hero media on the detail page: "video" plays /work/<slug>.mp4 over
     the /work/<slug>.png poster, "image" shows the poster only. Entries
     without hero render no media slot and request nothing. */
  hero?: "video" | "image";
};

export const WORK: WorkEntry[] = [
  {
    slug: "cubic-innov8",
    name: "Cubic Innov8",
    tag: { en: "COO", ja: "COO" },
    hero: "video",
    desc: {
      en: "COO of a cross-border innovation hub connecting Japan and Australia: I run operations and grow the ventures that live under it.",
      ja: "日本とオーストラリアをつなぐクロスボーダー・イノベーションハブのCOOとして、運営を回しながらその中の事業を育てている。",
    },
    detail: {
      en: "Cubic Innov8 is a cross-border innovation hub spanning Kyoto, Tokyo, Nagano and Sydney. As COO I run its operations and build the ventures inside it, from client services to community events.",
      ja: "Cubic Innov8 は、京都・東京・長野・シドニーにまたがるクロスボーダー・イノベーションハブ。COO として運営を回し、クライアントサービスからコミュニティイベントまで、その中の事業を育てている。",
    },
    body: [
      {
        h: { en: "A cross-border innovation hub", ja: "クロスボーダー・イノベーションハブ" },
        p: {
          en: "Cubic Innov8 is not an agency or a consulting shop. It is a cross-border innovation hub, established in 2024, spanning Kyoto, Tokyo, Nagano and Sydney, built on the idea that people, technology and purpose meet across borders: from Japan, to Australia, to the world. New ventures, services and communities get their start and grow under this roof. The brand film above is in-house work, produced by VAI Motion, which also lives on this portfolio.",
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
          en: "The other case studies on this site are what the role looks like in practice: the AI review management service for hospitality clients was sold and is operated here, and the Sydney workshops and event appearances, run with the Zepi community, happen under the same hat. Cubic is the hub those threads run through.",
          ja: "このサイトの他のケーススタディが、この役割の実際の中身になっている。飲食クライアント向けのAIレビュー運用サービスはここで営業・運用しているし、コミュニティ Zepi と開催するシドニーでのワークショップ登壇も同じ肩書きで行っている。Cubic は、それらの糸が束ねられるハブそのものだ。",
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
    hero: "video",
    desc: {
      en: "AI video and software studio serving Japan and Australia: one engine, three levels, client work live in production.",
      ja: "日豪で動くAI動画・ソフトウェア制作スタジオ。1つのエンジン、3つのレベル、実クライアント案件が本番稼働中。",
    },
    detail: {
      en: "Motion ships AI-assisted promo videos off the shelf, Build writes custom AI software from scratch, and Flow, launching next, will build AI workflows to order. The Vacanti promo playing above and the work wall below are the studio's own output.",
      ja: "Motion は AI プロモ動画を定型で提供し、Build はカスタム AI ソフトウェアをゼロから書き、準備中の Flow は AI ワークフローを受注でつくる。上で流れている Vacanti のプロモも、下の作品一覧も、すべてスタジオ自身のアウトプットだ。",
    },
    body: [
      {
        h: {
          en: "One engine, three levels",
          ja: "1つのエンジン、3つのレベル",
        },
        p: {
          en: "VAI Studio is my AI video and software studio for Japan and Australia, structured as three levels of the same engine. VAI Motion, live today, produces AI-assisted promo videos and social posts from a client's photos. VAI Build writes custom AI software from scratch. VAI Flow, launching next, will turn a team's repetitive work into AI workflows, made to order. I run the whole loop myself: finding the client, scoping, producing, delivering, and operating after launch.",
          ja: "VAI Studio は、日豪向けの AI 動画・ソフトウェア制作スタジオ。同じエンジンを3つのレベルで提供する。稼働中の VAI Motion は、クライアントの写真から AI プロモ動画とソーシャル投稿を制作。VAI Build は、カスタム AI ソフトウェアをゼロから書く。準備中の VAI Flow は、チームの繰り返し作業を受注型の AI ワークフローに変える。クライアント開拓、要件定義、制作、納品、公開後の運用まで、一連のループを一人で回している。",
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
          ja: "スタジオ自身のサイトは、英語と日本語を別々の市場向けサイトとして実装し、辞書も分離している。日本の消費者向け法定表記(特商法ページ)まで対応。Next.js と React で、公開も運用も一人。そしてこのページにあるもの、ブランド動画もリールもサイトも、すべてスタジオが売っているのと同じ AI 支援パイプラインで制作している。",
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
    hero: "video",
    desc: {
      en: "An AI review management service for restaurants in Australia. I run its sales and client relationships and build its monthly marketing reports.",
      ja: "豪州の飲食店向けAIレビュー運用サービス。営業とクライアント対応から月次マーケティングレポートの制作まで、事業側を担当している。",
    },
    detail: {
      en: "Review365 turns happy customers into Google reviews: scan a QR code, tap what you liked, AI drafts the review, the customer posts it. My part is the business end of the service: I run the sales and client relationships, and I build the monthly marketing report every subscriber gets, drafted by Claude on my procedures with a human final pass.",
      ja: "Review365 は、満足してくれたお客さんの声を Google レビューにつなげるサービスだ。店頭のQRコードを読み込んで、良かった点を選択式でタップしていくと、AIがその回答からレビューを下書きしてくれるので、お客さんは内容を確認して投稿するだけでいい。私はこのサービスのビジネス側を担当していて、シドニーの飲食店への営業から、契約店に毎月届くマーケティングレポートの制作までを受け持っている。レポートの下書きは私が書いた手順書に沿って Claude が生成し、納品前の最終判断は必ず人間が行う。",
    },
    body: [
      {
        h: {
          en: "The product",
          ja: "商品",
        },
        p: {
          en: "Review365 is an AI review management service for hospitality businesses in Australia, and the recording at the top of this page is the product itself: a customer scans a QR code at the counter, taps a few multiple-choice questions about their visit, AI turns those answers into a natural review draft, and the customer posts it to Google in well under a minute. Reviews build up, the profile climbs the map rankings, and unhappy feedback goes to the owner instead of going public.",
          ja: "Review365 は、オーストラリアの飲食ビジネスに向けたAIレビュー運用サービスで、ページ上部の録画がプロダクトそのものになっている。お客さんがカウンターのQRコードを読み込み、来店についての選択式の質問をいくつかタップすると、AIがその回答を自然なレビュー文に変換してくれるので、あとは内容を確認して Google に投稿するだけ。全体で1分もかからない。こうしてレビューが積み上がるほど地図検索での順位も上がっていき、逆に不満の声は公開される前にオーナーのもとへ届く仕組みになっている。",
        },
      },
      {
        h: {
          en: "Won by referral, run in person",
          ja: "紹介で広がり、運用まで一人で",
        },
        p: {
          en: "Clients come mostly through referrals and word of mouth in Sydney's hospitality scene, not through advertising. I run the sales conversations and the client relationships myself, and once a restaurant signs I operate the account end to end, from the first meeting to each month's report. Ten businesses have signed, four are ongoing monthly engagements, and owning both the winning and the delivering is the business side of this portfolio at its most literal.",
          ja: "クライアントは広告で集めるのではなく、シドニーの飲食シーンでの紹介や口コミで広がっていくことが多い。営業のやり取りとクライアントとの関係づくりは自分で回していて、契約が決まればそこから先も、初回の商談から毎月のレポート納品まで一人で受け持つ。これまでに10社と契約し、うち4社は月次の継続契約。取ってくることと納め続けることの両方を自分でやる、このポートフォリオの「事業側」という言葉の、いちばん文字通りの形がこの仕事だ。",
        },
      },
      {
        h: {
          en: "The monthly loop",
          ja: "月次のループ",
        },
        p: {
          en: "Every month the same loop runs: keyword rankings tracked against local competitors, Google Business Profile insights compared over stable windows so the numbers stay honest, and an AI visibility check covering how the business shows up in LLM answers. Gaps and wins land in a report with charts and recommendations the owner can execute.",
          ja: "運用は、毎月同じループの繰り返しになっている。ローカル競合に対するキーワード順位を追跡し、Google ビジネスプロフィールのインサイトは計測期間を揃えて比較することで数字の正直さを保ち、さらに LLM の回答の中でその店がどう紹介されているかという、AI上での見え方まで確認する。そうして拾った変化と成果をチャート付きのレポートにまとめ、最後はオーナーがそのまま実行に移せる打ち手にまで落とし込むところまでが、毎月の仕事だ。",
        },
        img: ["review365-4"],
      },
      {
        h: {
          en: "LLMs in production, with a human final pass",
          ja: "LLM の本番運用、最終判断は人間",
        },
        p: {
          en: "Generation runs on Japanese SOPs executed by Claude: a thirteen-step procedure with preflight checks and schema validation drafts each report, and I make the final call before anything reaches a paying client. Operating LLM output at client quality, month after month, is the discipline this service taught me.",
          ja: "レポートの生成は、Claude が実行する日本語の作業手順書で回している。事前チェックとスキーマ検証を含む13ステップの手順が各レポートの初稿を作り、課金クライアントに届く前には必ず人間の最終判断を挟む。LLM の出力を、お金をいただける品質のまま毎月運用し続けること。それがこのサービスを通じていちばん鍛えられた規律だと思っている。",
        },
      },
      {
        h: { en: "A real report, as delivered", ja: "実際に納品しているレポート" },
        p: {
          en: "The pages in this case study are from an actual monthly report as delivered to a paying client (identifying details masked). The KPI header the owner reads first, the month's summary in plain language, keyword movement against local competitors, and a prioritised list of moves. When the numbers dip, the report says so plainly; an honest bad month is what keeps the good months credible.",
          ja: "ここに載せているのは、課金クライアントに実際に納品している月次レポートそのものだ(固有情報はマスクしてある)。オーナーが最初に目にする KPI ヘッダーから、平易な言葉でまとめた今月の要点、ローカル競合に対するキーワードの動き、優先順位をつけた打ち手までが1本に収まっている。数字が落ちた月は、落ちたと正直に書く。悪い月を正直に報告しているからこそ、良い月の報告を信じてもらえる。",
        },
        img: ["review365-2", "review365-3"],
      },
    ],
  },
  {
    slug: "vacanti-ai",
    name: "Vacanti AI",
    hero: "video",
    desc: {
      en: "AI job matching SaaS, designed, built and shipped solo. Live in production.",
      ja: "設計から本番投入まで一人でつくり上げた、稼働中のAIジョブマッチングSaaS。",
    },
    detail: {
      en: "A matching engine with four-axis scoring, embeddings on pgvector, and a vision-based evaluation pipeline that catches false positives before users see them. Next.js, Supabase, Drizzle and Stripe, taken to production by one person.",
      ja: "4軸スコアリングのマッチングエンジンに pgvector の埋め込み、そして偽陽性を配信前に検知する Vision 評価パイプラインまでを備え、Next.js・Supabase・Drizzle・Stripe のスタックを一人で本番まで持っていった。",
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
          en: "Scoring is a four-axis weighted model (title, seniority, years and embedding similarity) with guardrails on top. The one that mattered most is a hard ceiling for title matches without domain experience, because the worst failure of a matcher is a confident false positive. Embeddings run on pgvector inside Supabase; job extraction uses an LLM with structured output.",
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
          en: "I built an evaluation pipeline that renders real resumes and scores them with a vision model across twenty-one cases, so scoring changes get checked against ground truth before deploy. It caught real failures: high scores that looked right and were wrong.",
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
          en: "Building it was half the job; the other half was selling it. I produced the brand and promo video above and took Vacanti into language schools in Sydney, running job-hunting workshops where students got their market value scored live and walked through their first matches in person. I still run the product's Instagram, and the workshops doubled as user acquisition: teach the room, and the room signs up.",
          ja: "つくることは仕事の半分で、残りの半分は売ることだった。上のブランド・プロモ動画を制作し、シドニーの語学学校に Vacanti を持ち込んで仕事探しワークショップを開催。参加者の市場価値をその場でスコアリングし、最初のマッチングを目の前で一緒に見る。プロダクトの Instagram はいまも自分で運用していて、ワークショップはそのままユーザー獲得を兼ねる。教室で教えれば、その教室が登録してくれる。",
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
    hero: "image",
    desc: {
      en: "A desktop app that turns multi-agent orchestration into the fun of growing your own company: hire AI staff, place them on an org chart, delegate work.",
      ja: "AI社員を雇い、組織図に並べ、仕事を任せる。マルチエージェントを自分の会社を育てる楽しさに翻訳するデスクトップアプリ。",
    },
    detail: {
      en: "Multi-agent orchestration, translated into the fun of growing your own company. Hire AI staff, place them on an org chart, delegate work, hold a morning meeting. The technical machinery never shows on screen, but it's exactly what's running underneath. In development, and the thing I most want to exist.",
      ja: "マルチエージェントの編成を、自分の会社を育てる楽しさに翻訳する。AI社員を雇い、組織図に並べ、仕事を任せ、朝会を開く。技術的な仕組みは画面に出てこないが、裏で動いているのはまさにそれ。現在開発中で、いま一番つくりたいものだ。",
    },
    body: [
      {
        h: { en: "Multi-agent, made approachable", ja: "マルチエージェントを、身近に" },
        p: {
          en: "Coordinating multiple AI agents is currently a tool for people who can operate a terminal and configuration files. Kodoku translates it into the fun of growing your own company: hire AI staff, place them on an org chart, delegate work, hold a morning meeting. The vocabulary is one everyone already knows, and it's enough to run agent orchestration, delegation and observation underneath. On top of that experience, Kodoku is also a company memory OS: the decisions, minutes, execution history and context that normally evaporate between chat sessions get accumulated by the company itself.",
          ja: "複数のAIエージェントを協調させる技術は、いまはターミナルと設定ファイルを操れる人の道具になっている。Kodoku はそれを自分の会社を育てる楽しさに翻訳する。AI社員を雇う、組織図に並べる、仕事を任せる、朝会を開く。誰もが知っている会社のメタファーだけで、マルチエージェントの編成・委任・観測が動く。その体験の土台として、Kodoku は会社の記憶OSでもある。チャットセッションの狭間で蒸発していく意思決定・議事録・実行履歴・文脈を、会社そのものが蓄積していく。",
        },
      },
      {
        h: { en: "JARVIS, the company's one companion", ja: "JARVIS、会社にひとりの相棒" },
        p: {
          en: "JARVIS is the one AI companion for the whole company, not tied to any single venture. It kicks off the morning meeting, helps think through the next move, and calls people together for a meeting. On big decisions, it lays out the case for and against before recommending anything.",
          ja: "JARVIS は会社全体にひとりだけいる相棒AIで、特定の事業には属さない。朝会を立ち上げ、次の一手を一緒に考え、会議を招集する。大きな判断では、賛成と反対の両面を出してから推奨する。",
        },
        img: ["kodoku-3"],
      },
      {
        h: { en: "The org chart, the whole company at a glance", ja: "組織図、全社をひと目で" },
        p: {
          en: "The org chart is the company's centre screen: you as CEO and the commander AI at the top, each venture lined up as a portal beneath. Open a venture and it becomes that venture's own chart of a manager and its AI staff. A node only lights up on a real hook event, when work is genuinely happening, never as decoration.",
          ja: "組織図は会社の中心画面。CEO であるあなたと司令塔を頂点に、各事業がポータルとして並ぶ。事業を開くと、そのマネージャーと AI 社員の組織図になる。ノードが光るのは実際のフックイベント、本当に作業しているときだけで、演出のために光ることはない。",
        },
        img: ["kodoku-4"],
      },
      {
        h: { en: "Hiring AI staff", ja: "AI社員を採用する" },
        p: {
          en: "Adding a role brings back a set of candidates as cards, each with a different specialty. You can interview a candidate three-way, with JARVIS sitting in and asking questions informed by the company's memory. A candidate is designed to say plainly when it has no track record yet, rather than invent one. Roles can only be hired from a catalogue of seventeen, each one built to produce a distinct kind of deliverable.",
          ja: "役職を追加すると、得意分野の違う候補者がカードで返ってくる。候補者とは三者面接ができ、JARVIS が同席して会社の記憶を踏まえた質問をする。候補者は実績が無ければ無いと正直に答える設計だ。採用できるのは、それぞれ固有の納品物を出す17役職のカタログからだけ。",
        },
        img: ["kodoku-6"],
      },
      {
        h: { en: "The field view, where delegation happens", ja: "現場ビュー、委任と実行の場" },
        p: {
          en: "The field view is a chat with a manager role, hosting your own Claude inside the app. Type an instruction in plain language, and the manager breaks the work down and delegates it to the AI staff beneath. Each staff member gets its own pane on the right, where the real work streams in as it happens. Delegation is judgement-based: light work, the manager just handles itself. Opening 'use in the field' on the org chart automatically wires up a dedicated folder, its instructions, hooks and MCP connections, so the field view is ready to go without manual setup, for Claude Code or Codex alike.",
          ja: "現場ビューは、アプリ内でホストしたあなたの claude を使ったマネージャーとのチャット画面。普通の言葉で指示を打つと、マネージャーが仕事を分解して配下の AI 社員に委任する。社員ごとに右側のペインが用意され、実際の作業がリアルタイムで流れる。委任は判断制で、軽い作業はマネージャーが自分で済ませる。組織図で「現場で使う」を押すと、専用フォルダ・指示書・フック・MCP接続が自動配線され、Claude Code でも Codex でも手動設定なしで現場ビューが動き出す。",
        },
        img: ["kodoku-8"],
      },
      {
        h: { en: "The dashboard, a hub for the record", ja: "ダッシュボード、記録のハブ" },
        p: {
          en: "Each venture has a dashboard that pulls together its AI staff count and connections, average work time, last activity, a growth graph of its memory, recent minutes, and recent work with its evaluation, all in one screen. It isn't a KPI tool measuring numbers automatically; it's a place to look over the record that piles up automatically every time work gets done.",
          ja: "各事業のダッシュボードには、AI社員数とつながり、平均作業時間、最後の活動、記憶の成長グラフ、直近の議事録、最近の仕事とその評価が1画面に集まる。数字を自動計測するKPIツールではなく、仕事のたびに自動で溜まる記録を一望する場所だ。",
        },
        img: ["kodoku-7"],
      },
      {
        h: { en: "Meetings and the morning ritual", ja: "会議と朝会" },
        p: {
          en: "JARVIS calls meetings where up to two venture managers sit in together, and the discussion is kept as minutes you can read back weeks later. The morning meeting is the daily version of the same idea: a notification opens a ten-minute session with JARVIS to decide the day's three moves.",
          ja: "JARVIS が招集する会議には、各事業のマネージャー最大2名が同席し、議論は議事録として残り、何週間後でも読み返せる。朝会はその日次版で、決めた時刻の通知から JARVIS との10分のセッションを立ち上げ、今日の3手を決める。",
        },
        img: ["kodoku-9"],
      },
      {
        h: { en: "The M&A market, handing a venture over whole", ja: "M&A市場、事業をまるごと引き継ぐ" },
        p: {
          en: "A venture built in Kodoku can be bought and sold whole. A package carries the org structure, each AI staff member's way of working with secrets stripped out, its operating manual, workflows, first-week tasks, and a declaration of the external connections it needs. A buyer checks the contents in a due-diligence ledger, then interviews the venture's manager three-way before taking it over, at which point it's cloned into their own company as a new venture. The original company's memory, customer data and API keys are never structurally transferred; what moves is the venture's shape, not the company's insides. The first official listing is Daily Desk, a venture that assembles news, inbox and schedule into one morning brief, priced at 1,980 yen. Hiring an individual AI staff member through the AI hiring market starts at 0 yen.",
          ja: "Kodoku でつくった事業は、まるごと売買できる。パッケージには組織構成、秘密情報を除いた各AI社員の働き方、運用手順書、ワークフロー、初週タスク、必要な外部接続の宣言が含まれる。買う側は帳簿（DDページ）で中身を確認し、その事業のマネージャーと三者面接してから承継する。承継すると自分の会社に新しい事業として複製される。元の会社の記憶・顧客データ・APIキーは構造的に譲渡されず、運び出されるのは事業の「かたち」であって会社の中身ではない。公式出品第1号は、ニュース・受信箱・予定を毎朝1枚に整える「デイリーデスク」（¥1,980）。個々のAI社員を雇う採用市場は¥0から。",
        },
        img: ["kodoku-5"],
      },
      {
        h: { en: "Where this is going", ja: "この先にあるもの" },
        p: {
          en: "The market I want to build eventually is one where AI staff and AI workflows themselves get traded. An AI staff member raised inside Kodoku naturally accumulates a resume, a track record, minutes and evaluations, so the conditions for trading it as a 'worker with a record' come together just from ongoing use. A first version of this is already running: the AI hiring market lets you hire AI staff with a track record, and the M&A market lets you take over a venture that's already operating. An economy where the way an individual has raised their AI actually circulates. That's where Kodoku is headed.",
          ja: "将来つくりたいのは、AI社員とAIワークフローが取引される市場。Kodoku の中で育てたAI社員には、履歴書・実績・議事録・評価が自然に溜まっていく。「実績付きの働き手」として取引できる条件が、使っているだけで揃う。すでに原型は動いていて、AI採用市場では実績付きのAI社員を雇え、M&A市場では稼働中の事業をまるごと承継できる。個人が育てたAIの働き方そのものが流通する経済圏。それがKodokuの目指す先。",
        },
      },
    ],
  },
];

export const RESEARCH: WorkEntry[] = [
  {
    slug: "warden",
    name: "Warden",
    tag: { en: "Capstone", ja: "卒業研究" },
    desc: {
      en: "Can you catch an attack on an AI by watching the AI think? Capstone research at the University of Technology Sydney, submitted.",
      ja: "AIの思考過程を監視すれば、AIへの攻撃は検出できるか。この問いに取り組んだシドニー工科大学の卒業研究で、提出を終えている。",
    },
    detail: {
      en: "AI agents can be hijacked by malicious instructions hidden inside the content they read, an attack called prompt injection. Warden watches the model's reasoning while it works and blocks the reply the moment the reasoning starts drifting toward an attacker's goal. Across 2,880 evaluation runs it cut successful attacks by more than a third while traditional defences did no better than nothing, with a third of their false alarms.",
      ja: "AIエージェントは、読み込んだ文書やメールに仕込まれた悪意ある指示に乗っ取られることがある。プロンプトインジェクションと呼ばれる攻撃だ。Warden は作業中のモデルの思考過程を監視し、推論が攻撃者の目的へ逸れ始めた瞬間に応答を止める。2,880件の評価で攻撃成功を3分の1以上削減。従来型の防御は無防備と大差なく、誤検出は従来の3分の1だった。",
    },
    body: [
      {
        h: {
          en: "The research question",
          ja: "研究の問い",
        },
        p: {
          en: "Warden is capstone research at the University of Technology Sydney, run as a team of six with an industry partner, titled An Agentic Approach to Improving Prompt Injection Resistance. The starting observation: existing defences inspect what enters and leaves the model, but not what the model is doing while it forms its reply. So the question became whether a defence that runs during the model's thought process can beat the boundary defences production systems ship today.",
          ja: "Warden はシドニー工科大学の卒業研究。6人チームでインダストリーパートナーとともに取り組んだ、プロンプトインジェクション耐性の研究だ。出発点の観察はこうだった。既存の防御はモデルに入るものと出るものは検査するが、モデルが返答を組み立てている最中に何をしているかは見ていない。そこで「思考の最中に動く防御は、いま本番システムが積んでいる境界型の防御に勝てるか」が問いになった。",
        },
      },
      {
        h: {
          en: "How Warden works",
          ja: "Warden の仕組み",
        },
        p: {
          en: "The target model streams its chain of thought while it works. At every thought boundary, a judge LLM reads the accumulated reasoning next to the original request and scores drift between 0 and 1; at 0.4 or above the stream is cut before any reply reaches the user, and if the judge output cannot be parsed the system fails closed and blocks. Three detector designs were prototyped (rule-based, classifier, LLM judge), and the LLM judge won because the other two were too close to the existing input and output filters the project set out to beat.",
          ja: "対象モデルは作業中、思考の連鎖(CoT)をストリームとして出力する。思考の区切りごとに、判定用のLLMがそれまでの推論を元のリクエストと突き合わせ、逸脱度を0〜1で採点する。0.4以上でストリームを遮断し、返答はユーザーに一切届かない。判定出力が解析できない場合はフェイルクローズドでブロックする。検出器はルールベース・分類器・LLM判定の3方式を試作し、前の2つは打ち倒すべき既存の入出力フィルタと似すぎていたため、LLM判定を採用した。",
        },
      },
      {
        h: {
          en: "My slice: the benchmark and the results",
          ja: "私の担当: ベンチマークと結果整理",
        },
        p: {
          en: "My signed contribution: preparing the experimental datasets and synthesising the key results. The corpus is 80 attack prompts and 80 paired clean controls, spanning five attack categories (data embedding, roleplaying, obfuscation, context hijacking, direct injection) over four classification tasks, drawing on the deepset and BIPIA benchmarks and GLUE task data. Payloads arrive directly or wrapped in email, HTML, JSON and support-log documents, and the whole corpus is generated deterministically by script, so every case is reproducible. Clean controls are paired to attacks by id, which is what makes honest false-positive measurement possible.",
          ja: "私の署名済み担当は、実験データセットの構築と主要な結果の統合。コーパスは攻撃プロンプト80件と、それぞれ対になるクリーン対照80件。データ埋め込み・ロールプレイ・難読化・コンテキストハイジャック・直接注入の5カテゴリを4種の分類タスクに掛け合わせ、deepset と BIPIA のベンチマークと GLUE のタスクデータを土台にした。攻撃は直接、またはメール・HTML・JSON・サポートログ文書に包んで届き、コーパス全体はスクリプトで決定論的に生成されるため全ケースが再現可能。クリーン対照を攻撃とID で対にしたことが、誤検出率を正直に測れる理由になっている。",
        },
        img: ["warden-3"],
      },
      {
        h: {
          en: "2,880 runs, one verdict",
          ja: "2,880回の実験が出した答え",
        },
        p: {
          en: "The evaluation crossed 80 cases with three models (Gemini 2.5 Flash, Gemma, DeepSeek-R1), six defences and both attack and clean conditions: 2,880 cells, run deterministically at temperature zero. Warden cut the attack success rate to 7.92 percent against 12.58 percent with no defence, while the traditional defences (prompt hardening, sanitisation, output filtering, spotlighting) averaged no better than no defence at all. Detection took 8.3 seconds on average against 52.2 for the traditional stack, usually within the first one or two thought loops, and false positives fell to 6.67 percent against their 20.5.",
          ja: "評価は80ケース×3モデル(Gemini 2.5 Flash、Gemma、DeepSeek-R1)×6防御×攻撃/クリーン両条件の2,880セルを、temperature 0 の決定論設定で回した。Warden は攻撃成功率を7.92%まで下げた(防御なしは12.58%)。一方、従来型防御(プロンプト強化、サニタイズ、出力フィルタ、スポットライティング)の平均は無防備と大差なかった。検出は平均8.3秒(従来スタックは52.2秒)で、ほとんどは最初の1〜2思考ループ以内。誤検出率は従来平均20.5%に対し6.67%に落ちた。",
        },
        img: ["warden-1", "warden-4"],
      },
      {
        h: {
          en: "What it cannot catch yet",
          ja: "まだ捕まえられないもの",
        },
        p: {
          en: "The report is explicit about the failure mode: roleplaying attacks stayed at 14.6 percent, exactly the baseline, because when the model has adopted a persona, nothing in its reasoning looks like drift; from the model's point of view, the task is the role. The report frames this as the first measured confirmation of a published prediction that chain-of-thought monitoring fails on persona-based attacks. On the tersest model the fixed threshold even backfired. Hard blocking is also poor UX, so the roadmap is graceful degradation, per-model thresholds, and a deterministic task-contract check to cover the roleplaying gap.",
          ja: "レポートは失敗モードも明記している。ロールプレイ攻撃は14.6%のままベースラインと変わらなかった。モデルがペルソナを受け入れてしまうと、推論のどこにも逸脱らしさが現れない。モデルから見れば、その役を演じることこそがタスクだからだ。これは「CoT監視はペルソナ型攻撃に敗れる」という公開済みの予測を、実測で初めて裏づけた結果として位置づけている。最も簡潔に推論するモデルでは固定しきい値が逆効果にもなった。ハードブロックのUX課題も含め、次の一手は段階的な失敗処理、モデル別しきい値、そしてロールプレイの穴を塞ぐ決定論的なタスク整合チェックだ。",
        },
        img: ["warden-2"],
      },
    ],
    code: {
      caption: {
        en: "The judge reads the model's mind: the reasoning trace goes to a second LLM alongside the original prompt, and the verdict decides whether the reply ships (from warden/llm_based_warden.py in the public repo).",
        ja: "判定器はモデルの思考を読む: 推論トレースを元のプロンプトと並べて第二のLLMに渡し、その判定が応答を出すか止めるかを決める(公開リポジトリの warden/llm_based_warden.py より)。",
      },
      src: `user_message = (
    f"ORIGINAL USER PROMPT:\\n{original_prompt}\\n\\n"
    f"AI REASONING TRACE:\\n{reasoning_trace or '(none)'}\\n\\n"
    f"AI FINAL ANSWER:\\n{final_answer}\\n\\n"
    f"Has a prompt injection attack occurred?"
)

# judge responds in a fixed format, parsed fail-closed:
# VERDICT: YES or NO
# CONFIDENCE: HIGH, MEDIUM, or LOW
# REASON: <one sentence explanation>
for line in raw.strip().splitlines():
    if line.upper().startswith("VERDICT:"):
        detected = line.split(":", 1)[1].strip().upper() == "YES"`,
    },
    links: [
      {
        label: "github.com/masaki-kawa/capstone-warden",
        href: "https://github.com/masaki-kawa/capstone-warden",
      },
    ],
  },
  {
    slug: "draft-prediction",
    name: "Draft Prediction",
    tag: { en: "Machine Learning", ja: "Machine Learning" },
    desc: {
      en: "Predicting which college basketball players get drafted, in a Kaggle competition where fewer than 1 in 100 are picked.",
      ja: "大学バスケ選手の中からドラフト指名される選手を当てるKaggleコンペ。指名されるのは100人に1人未満。",
    },
    detail: {
      en: "Out of 14,774 player seasons, fewer than 1 percent get drafted, so the real job is ranking every player by how likely they are to be picked and finding the needles. My final model ranked them near-perfectly (0.9990 on the Kaggle public leaderboard), and the reusable pieces became my own pip package.",
      ja: "14,774人分の選手データのうち、指名されるのは1%未満。全選手を「指名される確率」で正しく並べ、針の山から本命を見つけ出すのが本当の課題になる。最終モデルはほぼ完璧な順位付けに到達し(Kaggle 公開リーダーボードで 0.9990)、再利用できる部品は自作の pip パッケージにまとめた。",
    },
    body: [
      {
        h: { en: "The problem", ja: "問題" },
        p: {
          en: "The Kaggle set held 14,774 college-player seasons across 62 columns, and only about 0.8 percent were drafted. At that imbalance accuracy is a trap (predicting nobody gets drafted is 99.2 percent accurate), so the metric is AUROC: how well the model ranks drafted players above undrafted ones across every possible cutoff. The data itself needed forensics first: 2,462 exact duplicate rows dropped, while players who legitimately appear across several seasons were kept after checking they were repeat careers, not copies. And heights arrived stored as dates, so \"6-Jun\" had to be read back into 6 feet 6 before the column meant anything.",
          ja: "Kaggleのデータは62列・14,774の大学選手シーズン分で、指名されたのは約0.8%だけ。この不均衡では正解率は罠になる(「誰も指名されない」と予測するだけで正解率99.2%)。だから指標は AUROC、つまり、あらゆるカットオフを通して指名選手を非指名選手より上に並べられるかというランキング性能だ。データ自体もまず検死が要った。完全重複2,462行を除去する一方、複数シーズンに登場する選手は「コピーではなく実際の複数年のキャリアか」を確認したうえで残した。身長は日付として保存されていて、\"6-Jun\" を6フィート6インチに読み戻すまで、その列は意味を持たなかった。",
        },
      },
      {
        h: {
          en: "Missingness that means something",
          ja: "欠損そのものが信号になる",
        },
        p: {
          en: "The scouting-rank column is 67 percent empty, yet a quick LightGBM screen put it at the top of the importance list by a factor of four. My starting rule said drop heavily missing features, but exploring first overturned the rule: players with a scouting rank get drafted 2.36 percent of the time, players without one 0.012 percent, a gap of roughly 195 times. Being unranked is not a data gap, it is information about the player. So instead of dropping or averaging the holes away, every such feature kept a missing-flag and a sentinel value, letting the model read absence as the signal it actually is.",
          ja: "スカウトランクの列は67%が空欄。ところが LightGBM で軽く重要度を見ると、2位に4倍差をつけて首位に立った。当初のルールでは「欠損の多い特徴量は落とす」だったが、先に探索したことでルールのほうが覆った。ランクを持つ選手のドラフト率は2.36%、持たない選手は0.012%。およそ195倍の差だ。ランク外であることはデータの穴ではなく、選手についての情報そのものだった。だから穴を捨てたり平均で埋めたりせず、欠損フラグと番兵値を添えて残し、モデルが「無いこと」を信号として読めるようにした。",
        },
        img: ["draft-prediction-4"],
      },
      {
        h: { en: "Three models, one honest pick", ja: "3モデルから、正直に選ぶ" },
        p: {
          en: "Experiment one raced logistic regression, LightGBM and XGBoost, each imbalance-corrected with class weights. LightGBM posted a spectacular test score (0.9966) over a shaky validation score (0.9518), the classic signature of instability, while logistic regression held steady on both (0.9905 and 0.9968) and won on trustworthiness rather than a single number. Feature choices were stress-tested the same way: three feature sets were compared (keep everything, prune by missingness rules, prune correlated pairs above 0.9), and keep-everything won because the pruned candidates turned out to carry that informative missingness.",
          ja: "実験1では、クラス重みで不均衡補正したロジスティック回帰・LightGBM・XGBoost を競わせた。LightGBM はテストで華々しい数字(0.9966)を出しつつ、検証はぐらついた(0.9518)。不安定さの典型的なサインだ。一方ロジスティック回帰は両方で安定し(0.9905と0.9968)、単発の数字ではなく信頼できるかどうかで勝った。特徴量も同じやり方で検証した。全部残す、欠損ルールで削る、相関0.9超のペアを削る、の3案を比較し、勝ったのは全部残す案。削る候補だったものが、例の「意味のある欠損」を運んでいたからだ。",
        },
        img: ["draft-prediction-5", "draft-prediction-1"],
      },
      {
        h: { en: "Stacking against blending", ja: "スタッキング対ブレンディング" },
        p: {
          en: "Ensembling was my slice of the group work, and the two designs turned out to serve two different users. The stacked model is the scout who refuses to miss anyone: on test it found every drafted player (recall 1.00, zero false negatives) at the price of 31 false alarms. The weighted blend is the triage tool: it cut false positives from 43 to 26 on validation while giving up a couple of finds. Tuning both and sweeping blend weights barely moved AUROC, which is its own lesson: the design choice mattered more than the hyperparameters. Internal splits favoured stacking; Kaggle's hidden leaderboard, the closest thing to truly unseen players, favoured the 20/80 blend at 0.9990, and that is the model the report recommends.",
          ja: "グループワークの中で、アンサンブルは私の担当だった。そして2つの設計は、結局2種類のユーザーに仕えることが分かった。スタッキングは「誰も見逃さないスカウト」で、テストでは指名選手を全員発見(再現率1.00、見逃しゼロ)、その代償に誤検知31件。加重ブレンドは「選別の道具」で、検証の誤検知を43件から26件へ削る代わりに、数人の発見を譲る。両方をチューニングしてブレンド比率を掃引しても AUROC はほとんど動かず、これ自体が教訓になった。効いたのはハイパーパラメータではなく設計の選択だ。内部の分割はスタッキングに軍配を上げたが、本当に未知の選手に最も近い Kaggle の非公開リーダーボードは 20/80 ブレンドを選び、0.9990 を記録。レポートが推奨するのはこのモデルだ。",
        },
        img: ["draft-prediction-6", "draft-prediction-3", "draft-prediction-7"],
      },
      {
        h: { en: "Packaged, not just notebooked", ja: "ノートブックで終わらせない" },
        p: {
          en: "The reusable utilities became my own pip package, my_krml_14658203, built from a cookiecutter template with source layout, tests and docs and pushed to TestPyPI, and the same package later powered the feature engineering in the Bitcoin project. The work ships as a full CRISP-DM report, four experiment notebooks and saved model artefacts, not a single throwaway notebook.",
          ja: "再利用可能なユーティリティは、自作のpipパッケージ my_krml_14658203 にまとめた。cookiecutterテンプレートでソース構成・テスト・ドキュメントを備えて TestPyPI に公開し、同じパッケージが後のビットコイン予測プロジェクトの特徴量エンジニアリングも支えている。成果物は、CRISP-DMに沿ったレポート、4本の実験ノートブック、保存済みモデル一式。使い捨ての1ノートブックではない。",
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
    links: [
      {
        label: "github.com/masaki-kawa/my_krml_14658203",
        href: "https://github.com/masaki-kawa/my_krml_14658203",
      },
    ],
  },
  {
    slug: "weather-api",
    name: "Weather Prediction API",
    tag: { en: "Machine Learning", ja: "Machine Learning" },
    desc: {
      en: "Two Sydney rain prediction models, deployed as a live API anyone can call.",
      ja: "シドニーの降雨予測モデル2つを、誰でも呼び出せる稼働中のAPIとして公開している。",
    },
    detail: {
      en: "Will it rain in Sydney seven days from now, and how much over the next three days? I trained a model for each question, then did the part most coursework skips: packaged them with Docker and put them on the internet as a working API. Modest accuracy, honestly reported; what this project shows is the road from notebook to running service.",
      ja: "7日後のシドニーに雨は降るか、今後3日でどれだけ降るか。それぞれの問いにモデルを学習させ、多くの課題が省略する部分までやり切った。Docker でパッケージし、実際に動くAPIとしてインターネットに公開する。精度は控えめな数字を正直に報告している。このプロジェクトで見せたいのは、ノートブックから稼働サービスまでの道筋そのものだ。",
    },
    body: [
      {
        h: {
          en: "Two questions a tour operator asks",
          ja: "ツアー会社が実際に聞く2つの質問",
        },
        p: {
          en: "Sydney's tourism operators plan around rain: harbour cruises, outdoor events, daily itineraries. So the project ships two predictions on Open-Meteo history for Sydney (5,479 days, 2010 to 2024): will it rain exactly seven days from now, and how many millimetres will fall over the next three days. Both targets are built strictly from future values relative to each reference day, so the model never trains on information it would not have. The regression target's distribution explains the difficulty up front: the median three-day total is 1.8 mm but the maximum is 203.7, and a handful of storms dominates any error metric.",
          ja: "シドニーの観光業は雨で計画が動く。ハーバークルーズ、屋外イベント、日々の行程。そこで Open-Meteo のシドニー履歴データ(2010〜2024年、5,479日分)から2つの予測を提供する。ちょうど7日後に雨が降るか。そして今後3日間の降水量は何ミリか。ターゲットはどちらも、各基準日から見た未来の値だけで構築し、本来知り得ない情報でモデルが学習しないようにした。回帰ターゲットの分布が、この課題の難しさを最初から物語っている。3日間合計の中央値は1.8mmなのに最大値は203.7mm。一握りの嵐が、どんな誤差指標も支配してしまう。",
        },
        img: ["weather-api-5"],
      },
      {
        h: {
          en: "Metrics and validation chosen for the job",
          ja: "仕事から逆算した指標と検証",
        },
        p: {
          en: "The metric follows the cost of being wrong: for a tourist without an umbrella, a missed rainy day hurts more than a false alarm, so recall was prioritised, F1 became the headline metric, and accuracy is reported only as a reference. Validation respects time: the earliest 60 percent trains, the next 20 tunes, the most recent 20 is touched once at the end, and the tuning search uses TimeSeriesSplit so no fold ever peeks at the future. The feature work stayed grounded too: the strongest single signal turned out to be daylight duration, a seasonality proxy, alongside engineered flags like evaporation minus precipitation that carry domain sense.",
          ja: "指標は間違いのコストから逆算した。傘を持たない観光客にとって、見逃された雨の日は空振りの警報より痛い。だから再現率を優先し、F1 を主指標に、正解率は参考値に留めた。検証は時間を尊重する。最も古い60%で学習し、続く20%でチューニングし、最新の20%には最後に一度だけ触れる。チューニング内の探索も TimeSeriesSplit で、どのフォールドも未来を覗けない。特徴量も地に足をつけた。単体で最も強いシグナルは日照時間(季節性の代理変数)で、「蒸発量−降水量」のような追加特徴量もドメインの意味を持つものに絞った。",
        },
        img: ["weather-api-4", "weather-api-2"],
      },
      {
        h: { en: "When the simple model wins", ja: "シンプルなモデルが勝つとき" },
        p: {
          en: "The random forest regressor looked brilliant in training (RMSE 4.02, R-squared 0.90) and fell apart on validation (RMSE 11.52), the signature of memorised noise. Plain linear regression trained worse and generalised better, so it won on the only number that matters, validation error, and landed at test RMSE 9.55 with R-squared 0.67. The classifier told a similar story: random forest beat XGBoost on validation F1 and finished at F1 0.66 with recall 0.61 on test. The write-up spells out what that buys: about six in ten risk-prone days caught, a decision-support tool rather than a sole source of truth, and extreme rainfall still under-predicted.",
          ja: "ランダムフォレスト回帰は学習では見事な数字を出し(RMSE 4.02、決定係数0.90)、検証で崩れた(RMSE 11.52)。ノイズを暗記したモデルの典型だ。素朴な線形回帰は学習成績こそ劣るのに汎化で勝ち、唯一意味のある数字である検証誤差で選ばれて、テスト RMSE 9.55・決定係数0.67に着地した。分類側も同じ物語で、ランダムフォレストが XGBoost を検証F1で上回り、テストは F1 0.66・再現率0.61。この数字で何ができるかも明記した。雨リスクの高い日のおよそ6割を捕捉する、単独の真実ではなく意思決定を支援する道具。そして極端な豪雨はまだ過小予測する。",
        },
        img: ["weather-api-6", "weather-api-1"],
      },
      {
        h: { en: "From notebook to a URL", ja: "ノートブックからURLへ" },
        p: {
          en: "Both models ship behind a FastAPI service, containerised with Docker so the environment cannot drift between laptop and cloud, deployed on Render with Swagger docs, one endpoint per question. It is not a demo shell: at request time the service fetches that day's weather from Open-Meteo, rebuilds the exact engineered features from training, and answers with a dated prediction. That is also why 2025 data was held out of training entirely: it is what the live service runs on.",
          ja: "2つのモデルは FastAPI サービスとして配信する。Docker でコンテナ化して手元とクラウドの環境ズレをなくし、Render にデプロイ。Swagger ドキュメント付きで、質問ごとに1つのエンドポイントを持つ。デモの張りぼてではない。リクエストのたびに Open-Meteo からその日の気象データを取得し、学習時とまったく同じ特徴量をその場で再構築して、日付つきの予測を返す。2025年のデータを学習から完全に外したのはこのためだ。稼働中のサービスが走っているのは、その2025年の上なのだから。",
        },
        img: ["weather-api-7"],
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
    links: [
      {
        label: "github.com/masaki-kawa/sydney-weather-api",
        href: "https://github.com/masaki-kawa/sydney-weather-api",
      },
      {
        label: "github.com/masaki-kawa/sydney-weather-experiments",
        href: "https://github.com/masaki-kawa/sydney-weather-experiments",
      },
    ],
  },
  {
    slug: "bitcoin-forecast",
    name: "Bitcoin Price Forecast",
    tag: { en: "Machine Learning", ja: "Machine Learning" },
    desc: {
      en: "Predicting tomorrow's Bitcoin high, packaged as a working prediction API.",
      ja: "明日のビットコイン最高値を予測し、実際に動く予測APIとして仕上げた。",
    },
    detail: {
      en: "A decision-support tool, not a trading bot: it forecasts tomorrow's Bitcoin high so a trader can sanity-check a plan. The first model failed the way naive price models fail, and reframing the target (predict the change, not the price) cut test error by six times. A Dockerised FastAPI serves the model on live prices.",
      ja: "トレードbotではなく判断支援。明日のビットコインの最高値を予測し、トレーダーが自分の判断を確かめる材料にする。最初のモデルは素朴な価格予測の典型で失敗し、「価格ではなく変化率を予測する」設計変更でテスト誤差を6分の1にした。Docker化したFastAPIが実際の価格でモデルを配信する。",
    },
    body: [
      {
        h: {
          en: "Choosing the data like a trader",
          ja: "データをトレーダーの目で選ぶ",
        },
        p: {
          en: "The raw material is daily price history for Bitcoin, Ethereum, XRP and Solana. Two data decisions shaped everything, and both are argued in the notebook rather than assumed. XRP was cut after a dedicated check: its year-by-year correlation with Bitcoin swings between 0.38 and 0.74, too unstable to trust as a signal, while Ethereum (0.83) and Solana (0.84) hold steady. And joining Solana's shorter history trims the data to 2020 onward, a loss accepted deliberately: the pre-2020 market was retail-dominated, and next to today's institution-heavy flows it reads as historical noise. Splits are strictly chronological (1,027 train, 343 validation, 343 test days), so the model is always judged on days after everything it learned from.",
          ja: "素材はビットコイン・イーサリアム・XRP・ソラナの日次価格。すべてを方向づけたデータの判断が2つあり、どちらも思い込みではなくノートブック上で論証している。XRP は専用の検証の末に除外した。ビットコインとの相関が年ごとに0.38〜0.74と揺れて信号として不安定な一方、イーサリアム(0.83)とソラナ(0.84)は安定して強い。そして履歴の短いソラナと結合するとデータは2020年以降に削れるが、その損失は意図して受け入れた。2020年以前は個人投資家中心の市場で、機関投資家が主導する現在と並べれば歴史的ノイズに近い。分割は厳密に時系列順(学習1,027日・検証343日・テスト343日)。モデルは常に、学習に使ったすべての日より後の日々で審判を受ける。",
        },
      },
      {
        h: { en: "When the baseline broke", ja: "ベースラインが壊れたとき" },
        p: {
          en: "The baseline predicted the price directly, and the test set showed exactly why that fails: when Bitcoin rallied past 100,000 dollars in late 2024, the model kept predicting the 65,000 dollar world it was trained in, off by 6,752 dollars on average. A regime shift is precisely where a price forecaster earns its keep, and precisely where a naive one collapses.",
          ja: "ベースラインは価格そのものを予測した。そしてテストが、そのやり方が失敗する理由をそのまま見せてくれた。2024年末にビットコインが10万ドルを超えて急騰すると、モデルは学習した「6.5万ドルの世界」を出し続け、平均6,752ドルも外した。相場つきが変わる瞬間こそ予測モデルの出番であり、素朴なモデルが崩れる瞬間でもある。",
        },
        img: ["bitcoin-forecast-2"],
      },
      {
        h: {
          en: "Predict the change, not the price",
          ja: "価格ではなく、変化率を予測する",
        },
        p: {
          en: "The fix was to change the question: predict how far tomorrow's high sits above today's close, as a ratio, with a quantile LightGBM. Momentum, volatility and volume features came from my own pip package, reused from the draft prediction project. Two restraint decisions are documented rather than hidden: alpha 0.8 aims at the upper tail of the distribution, where a next-day high actually lives in a bullish regime, and there is deliberately no hyperparameter sweep, because naive cross-validated search leaks the future in time series and aggressively tuned parameters tend to memorise one market regime. Test error fell from 6,752 to 1,110 dollars, and the forecast tracks a rally it had never seen.",
          ja: "解決策は問いの立て替えだった。「明日の最高値は今日の終値からどれだけ上か」を比率として、分位点LightGBMで予測する。モメンタム・ボラティリティ・出来高の特徴量は、ドラフト予測プロジェクトから再利用した自作pipパッケージ製。抑制の判断も2つ、隠さず記録している。alpha 0.8 は分布の上側の裾を狙う設定で、強気相場の「明日の最高値」が実際に住んでいる場所だ。そしてハイパーパラメータ探索は意図的にやらない。時系列で素朴な交差検証探索をすれば未来が漏れ、強くチューニングしたパラメータは特定の相場つきを暗記しがちだからだ。テスト誤差は6,752ドルから1,110ドルへ下がり、見たことのない急騰にも追従した。",
        },
        img: ["bitcoin-forecast-1", "bitcoin-forecast-3"],
      },
      {
        h: { en: "Served, not shelved", ja: "棚に置かず、配信する" },
        p: {
          en: "The trained model ships inside a Dockerised FastAPI service that pulls live daily prices from the Kraken exchange API, rebuilds the features, and answers /predict/btc with tomorrow's forecast high. The repository is public.",
          ja: "学習済みモデルは Docker 化した FastAPI サービスに載せた。Kraken 取引所のAPIから当日の価格を取得して特徴量を再構築し、/predict/btc が明日の予測最高値を返す。リポジトリは公開している。",
        },
      },
    ],
    code: {
      caption: {
        en: "The model that survived the rally: a quantile LightGBM (alpha 0.8) on a ratio target, converted back to a price at serving time (from the experiment notebook).",
        ja: "急騰に耐えたモデル: 比率ターゲットへの分位点LightGBM(alpha 0.8)。配信時に価格へ逆変換(実験ノートブックより)。",
      },
      src: `# ===== Quantile LGBM (alpha=0.8) =====
q_model = LGBMRegressor(
    objective='quantile',
    alpha=0.8,
    n_estimators=600,
    learning_rate=0.05,
    num_leaves=63,
    subsample=0.8,
    colsample_bytree=0.8,
    min_child_samples=40,
    reg_alpha=0.1,
    reg_lambda=0.3,
    random_state=42
)
# serving: y_pred_price = (1.0 + y_pred_ratio) * today_price`,
    },
    links: [
      {
        label: "github.com/masaki-kawa/bitcoin-forecast-api",
        href: "https://github.com/masaki-kawa/bitcoin-forecast-api",
      },
    ],
  },
  {
    slug: "student-performance",
    name: "Student Performance Prediction",
    tag: { en: "Machine Learning", ja: "Machine Learning" },
    desc: {
      en: "Finding the top 5 percent of students early, so a university can recommend them for internships.",
      ja: "上位5%の学生を早期に見つけて、大学のインターン推薦につなげるための分類モデル。",
    },
    detail: {
      en: "Only 56 students in roughly 1,000 reach the top grade, and the university wants to spot them before final results are out. After forensic data cleaning and honest feature work, the tuned random forest found 10 of the 11 top students in the test set, with a single false alarm.",
      ja: "約1,000人の学生のうち、最高評価に届くのは56人だけ。それを成績確定前に見つけたい、という課題。データの矛盾を潰すクレンジングと特徴量設計を経て、調整済みランダムフォレストはテストで該当11人中10人を発見し、誤検知は1件だった。",
    },
    body: [
      {
        h: { en: "A needle-in-a-haystack target", ja: "針の山から探すターゲット" },
        p: {
          en: "The scenario: recommend the students most likely to finish with an Excellent result to industry partners for internships, before final grades exist. In 1,009 student records only 5.55 percent are Excellent, so plain accuracy is meaningless: a model that says no to everyone is 94 percent accurate and completely useless. That framing drove every design choice. The cost of a miss is asymmetric (a false negative is a deserving student losing an opportunity, a false positive risks the programme's credibility with partners), so recall was prioritised, F1 became the tuning objective, and a two-stage stratified split kept the tiny minority class at the same 5.5 percent in train, validation and test.",
          ja: "シナリオはこうだ。最終成績が出る前に、Excellent 評価に到達しそうな学生を企業インターンへ推薦したい。1,009人の記録のうち該当者は5.55%だけなので、単純な正解率は意味を失う。全員に「該当しない」と答えるだけのモデルでも正解率94%になり、しかも完全に役立たずだ。この認識が設計のすべてを決めた。見逃しのコストは非対称で、偽陰性は「本来推薦されるべき学生が機会を失う」こと、偽陽性は「推薦制度そのものの信用を削る」こと。だから再現率を優先し、チューニングの目的関数はF1にし、2段階の層化分割で5.5%の少数クラスを train/validation/test すべてに同じ比率で残した。",
        },
        img: ["student-performance-1"],
      },
      {
        h: {
          en: "Cleaning with logic, not just thresholds",
          ja: "しきい値ではなく、論理で洗う",
        },
        p: {
          en: "The data forensics mattered as much as the modelling, and the interesting rows fail by logic, not by magnitude: first-semester students carrying a previous GPA (impossible, so out), an admission year of 22022 (a typo, fixed), a student studying 30 hours a day (removed). Extreme household incomes were capped at the 95th percentile rather than deleted, because rich students are real even when their values distort a model. One finding was counterintuitive enough to test properly: in this data, higher-performing students come from lower-income households. Rather than trust the eyeball, a Welch t-test (p = 0.0000010756) settled it, and the feature stayed. A gpa_change feature (current minus previous GPA) was added to capture academic momentum, not just level.",
          ja: "モデリングと同じくらい効いたのが、データの検死だった。面白い行は、大きさではなく論理で壊れている。1学期目なのに前学期のGPAを持つ学生(あり得ないので除外)、入学年22022(誤記なので修正)、1日30時間勉強する学生(除外)。極端な世帯収入は削除せず95パーセンタイルで上限を掛けた。値がモデルを歪めるとしても、裕福な学生は実在するからだ。直感に反する発見もあった。このデータでは成績上位の学生ほど世帯収入が低い。目視で信じ込まず Welch のt検定(p = 0.0000010756)で決着させ、特徴量として採用した。さらに「現在のGPA−前学期のGPA」の gpa_change を追加し、成績の水準ではなく勢いを捉えられるようにした。",
        },
        img: ["student-performance-2", "student-performance-3"],
      },
      {
        h: { en: "The model tournament", ja: "モデルのトーナメント" },
        p: {
          en: "Every model faced the same question: how many of the rare top students do you find, and at what cost? The baseline logistic regression looked respectable on paper but missed most of them (validation recall 0.36). A tuned random forest (randomised search over 30 configurations, scored on F1) lifted validation recall to 0.73 and reached 0.91 precision and 0.91 recall on test: 10 of the 11 Excellent students found, one false alarm. A tuned SVC matched it on test but was weaker where it counts, validation recall. KNN was the interesting loser: perfect precision (every student it flagged was truly Excellent) but recall 0.82, and a recommender that misses deserving students fails the brief. The forest won on the balance.",
          ja: "すべてのモデルに同じ問いを課した。希少な上位学生を何人見つけ、その代償は何か。ベースラインのロジスティック回帰は一見悪くない数字を出しつつ、大半を見逃した(検証再現率0.36)。ランダムフォレストは30構成のランダム探索(評価はF1)でチューニングし、検証再現率を0.73へ引き上げ、テストでは適合率0.91・再現率0.91。該当11人中10人を発見し、誤検知は1件だった。調整済みSVCはテストでは並んだが、肝心の検証再現率で劣った。面白い敗者はKNNで、適合率は完璧(検知した学生は全員本当にExcellent)だったが再現率0.82。該当者を見逃す推薦システムは要件を満たさない。バランスでフォレストが勝った。",
        },
        img: ["student-performance-4"],
      },
      {
        h: { en: "An honest ablation, honest limits", ja: "正直なアブレーションと、正直な限界" },
        p: {
          en: "The importance plot said the categorical features were nearly useless, so a final experiment removed them, holding everything else fixed, and performance dropped. The randomised search even landed on identical best parameters, which is what makes the conclusion clean: the drop came from the features, not from tuning luck. Hypothesis rejected, and recorded as rejected. The write-up is equally plain about limits: the test set holds only 11 Excellent students, so test metrics move in nine-point steps, and the model is framed as input to a human decision, with an eligibility rule on completed credits applied downstream rather than trusted as a model feature.",
          ja: "重要度プロットは「カテゴリ特徴量はほぼ無意味」と示していた。そこで最後の実験では、他の条件を固定したままそれらを外した。結果は悪化。ランダム探索は同一のベストパラメータに到達しており、だからこそ結論がきれいに出る。悪化の原因はチューニングの運ではなく特徴量の除去だ。仮説は棄却され、棄却のまま記録した。限界も同じ調子で明記している。テストに含まれる Excellent 学生は11人しかいないため、テスト指標は約9ポイント刻みでしか動かない。そしてこのモデルは人間の判断への入力であり、履修単位数による適格性ルールはモデルの特徴量として信じ込むのではなく、判定の下流で適用する設計にした。",
        },
      },
    ],
    code: {
      caption: {
        en: "Imbalance-aware validation design: a two-stage stratified split keeps the 5.5 percent minority class intact across train, validation and test (from experiment 0).",
        ja: "不均衡を前提にした検証設計: 2段階の層化分割で、5.5%の少数クラスを train/validation/test すべてに保つ(実験0より)。",
      },
      src: `X = df_eng.copy()
y = df.loc[X.index, 'target']

# Step 1: Train+Val vs Test (80:20)
sss1 = StratifiedShuffleSplit(n_splits=1, test_size=0.2, random_state=42)
for trainval_idx, test_idx in sss1.split(X, y):
    X_trainval, X_test = X.iloc[trainval_idx], X.iloc[test_idx]
    y_trainval, y_test = y.iloc[trainval_idx], y.iloc[test_idx]

# Step 2: Train vs Val (75:25)
sss2 = StratifiedShuffleSplit(n_splits=1, test_size=0.25, random_state=42)
for train_idx, val_idx in sss2.split(X_trainval, y_trainval):
    X_train, X_val = X_trainval.iloc[train_idx], X_trainval.iloc[val_idx]
    y_train_raw = y_trainval.iloc[train_idx]
    y_val_raw   = y_trainval.iloc[val_idx]`,
    },
  },
  {
    slug: "anomaly-detection",
    name: "Customer Anomaly Detection",
    tag: { en: "Machine Learning", ja: "Machine Learning" },
    desc: {
      en: "Finding the customers whose behaviour doesn't add up, in a telco's data. My slice of a four-person team project.",
      ja: "通信会社の顧客データから「行動のつじつまが合わない」顧客を見つける。4人チームの私の担当分。",
    },
    detail: {
      en: "Each of four team members owned one model family over a telco dataset; mine was anomaly detection, plus the usage-data cleaning everyone built on. Across 7,043 customers the flagged group was not single outliers but combinations of extremes, with ten times the refunds and thirteen times the extra data charges, reading as refund abuse, referral fraud or missed upsells.",
      ja: "4人チームで通信会社のデータセットを分担し、各自が1つのモデル領域を担当。私は異常検知と、全員の土台になった利用データのクレンジングを持った。7,043人の顧客のうち検出された群は単発の外れ値ではなく「極端値の組み合わせ」で、返金は通常の約10倍、追加データ課金は約13倍。返金制度の悪用、紹介の不正、アップセルの取りこぼしとして読める。",
    },
    body: [
      {
        h: { en: "My slice: usage data and anomalies", ja: "担当: 利用データと異常検知" },
        p: {
          en: "The scenario is a telecom company opening its customer data to a new data science team, one ML task per department: revenue forecasting, churn, segmentation, and mine, abnormal behaviour for the risk team. I also owned the usage dataset itself: 11,125 rows with a quarter of revenue values missing, rebuilt from the billing identity (charges plus extras minus refunds) instead of blanket imputation. The EDA surfaced a pricing gap on the way: customers cluster at the minimum plan or above 50 dollars, with almost nobody in between.",
          ja: "シナリオは、通信会社が顧客データを新任のデータサイエンスチームに開放し、部門ごとに課題を割り当てるというもの。売上予測、解約予測、セグメンテーション、そして私の担当がリスク管理向けの異常検知。あわせて利用データそのものも担当した。11,125行のうち売上値の4分の1が欠損しており、一括補完ではなく請求の恒等式(課金+追加課金−返金)から逆算して再構築した。EDAでは料金設計の空白も見つかった。顧客は最低プランか50ドル超に集中し、中間帯がほぼ空いている。",
        },
        img: ["anomaly-detection-1"],
      },
      {
        h: {
          en: "Designing an unsupervised evaluation honestly",
          ja: "教師なしの評価を、正直に設計する",
        },
        p: {
          en: "Anomaly detection has no labels, so the discipline is in what you refuse to do. No train/test split, because the job is finding current anomalies in this customer base, not predicting future ones. No handcrafted features, because in an unsupervised task manual feature engineering quietly encodes what the analyst already believes an anomaly looks like. The 82 columns from the merged datasets were cut to 12 by rule: drop one of every pair correlated above 0.8, drop zero-variance columns, drop sparse country dummies. And the contamination setting of 5 percent is written down for what it is, a business assumption about how much abnormal behaviour a base like this can plausibly contain.",
          ja: "異常検知には正解ラベルがない。だから規律は「何をやらないか」に宿る。train/test 分割はしない。仕事は将来の予測ではなく、いまの顧客ベースに潜む異常を見つけることだからだ。手作りの特徴量も入れない。教師なしタスクでの特徴量エンジニアリングは、「アナリストが異常だと思っている姿」を静かにモデルへ埋め込んでしまう。結合後の82列はルールで12列まで削った。相関0.8超のペアは片方を落とし、分散ゼロの列を落とし、スカスカの国ダミーを落とす。そして contamination 5% という設定は、「この規模の顧客ベースに異常がどれだけ含まれうるか」という業務仮定であることを、仮定として明記した。",
        },
        img: ["anomaly-detection-5"],
      },
      {
        h: { en: "Two detectors, one honest choice", ja: "2つの検出器と、正直な選定" },
        p: {
          en: "On 7,043 merged customers and the 12 selected features I compared Local Outlier Factor and Isolation Forest, each with and without PCA compression (8 components, chosen because they hold about 80 percent of the variance). No grid search, deliberately: with no labels there is no score to optimise without fooling yourself, so the four configurations were judged on how cleanly they separate the flagged group in projection plots and score distributions. Isolation Forest without PCA separated the anomalies most clearly, and that visible separation is the documented reason it won: the goal here was interpretability, not prediction.",
          ja: "結合後の7,043人・選抜した12特徴量に対し、Local Outlier Factor と Isolation Forest を、PCA圧縮あり/なし(8成分、分散の約80%を保持するため)の計4構成で比較した。グリッドサーチは意図的にやらない。ラベルがない以上、最適化できるスコアは存在せず、やれば自分を騙すだけだからだ。代わりに4構成を、射影プロットとスコア分布で「検出群がどれだけ明瞭に分離するか」で判定した。最も明確に分離したのは PCA なしの Isolation Forest。その目に見える分離こそが採用理由だと記録している。ここでの目的は予測ではなく解釈だからだ。",
        },
        img: ["anomaly-detection-2"],
      },
      {
        h: { en: "What the anomalies turned out to be", ja: "異常の正体" },
        p: {
          en: "The flagged customers average 13.55 in refunds against 1.33 for normal customers, 55.44 in extra data charges against 4.28, with markedly higher downloads, tenure and referrals. The counterexamples prove the point: customers with refunds of 30, double the anomaly average, still score as normal when their other axes are ordinary. One extreme value is just a heavy user; several at once is a pattern. For a risk team those patterns read as refund policy abuse, referral fraud and missed upsell opportunities, and every flagged case routes to human review before anyone acts on it.",
          ja: "検出された顧客は、返金が平均13.55(通常群1.33)、追加データ課金が55.44(通常群4.28)、ダウンロード量・契約期間・紹介数も際立って高い。反例がこの結果の意味を証明する。返金が30と異常群平均の2倍を超える顧客でも、他の軸が普通なら正常と判定される。1軸の極端値はただのヘビーユーザーで、複数軸の同時の極端さこそがパターンなのだ。リスク管理チームの目には、返金制度の悪用、紹介の不正、アップセルの機会損失として映る。そして検出された案件は、誰かが動く前に必ず人間のレビューを通す設計にした。",
        },
        img: ["anomaly-detection-3", "anomaly-detection-4"],
      },
    ],
    code: {
      caption: {
        en: "The dual-detector core: Local Outlier Factor and Isolation Forest scored side by side, with anomalies defined by a negative Isolation Forest score (from the anomaly notebook).",
        ja: "2検出器の中核: Local Outlier Factor と Isolation Forest を並走させ、Isolation Forest のスコアが負の点を異常と定義(異常検知ノートブックより)。",
      },
      src: `# LOF
lof_model = LocalOutlierFactor(**lof_params)
lof_scores = lof_model.fit_predict(X)
lof_score_values = lof_model.negative_outlier_factor_

# Isolation Forest
if_model = IsolationForest(**if_params)
if_model.fit(X)
if_score_values = if_model.decision_function(X)

X_scores = X.copy()
X_scores['lof_score'] = lof_score_values
X_scores['if_score'] = if_score_values

df_analysis['is_anomaly'] = df_analysis['if_score'] < 0`,
    },
  },
  {
    slug: "youtube-lakehouse",
    name: "YouTube Trends Lakehouse",
    tag: { en: "Big Data", ja: "Big Data" },
    desc: {
      en: "2.7 million rows of YouTube trending data across ten countries, answering one question: what should a new channel make?",
      ja: "10カ国・267万行のYouTubeトレンドデータで、「新しいチャンネルは何をつくるべきか」に答える。",
    },
    detail: {
      en: "Raw files from ten countries land in Azure cloud storage, Snowflake reads them in place, and SQL turns them into one clean table of 2.6 million rows. The analysis ends in an actual recommendation: comedy earns the highest engagement of any category, and it works across countries.",
      ja: "10カ国分の生データを Azure のクラウドストレージに置き、Snowflake がその場で読み込み、SQLで260万行のきれいなテーブル1枚に仕上げる。分析は実際の提言まで到達していて、エンゲージメント率はコメディが全カテゴリ1位、しかもその強さは国を越えて通用するという答えが出た。",
    },
    body: [
      {
        h: { en: "Files in, one table out", ja: "ファイルを入れ、テーブル1枚を出す" },
        p: {
          en: "Trending videos arrive as one CSV per country plus nested JSON category definitions. An external stage lets Snowflake read the files where they sit in Azure Blob Storage; the country code is derived from each file name, and the JSON is flattened in SQL. One subtlety matters: the same category id means different things in different countries, so the join key is composite (country plus category id), and every row receives a generated id, which is what later lets the cleaning delete exact duplicates safely. Everything lands in a single 2,667,041 row table, and ingestion is SQL end to end, with no scripts outside the warehouse.",
          ja: "トレンド動画は国ごとのCSVと、入れ子になったJSONのカテゴリ定義で届く。外部ステージを使えば Snowflake は Azure Blob Storage 上のファイルをその場で読める。国コードはファイル名から導出し、JSONはSQLで展開する。効いてくる細部が1つ。同じカテゴリIDでも国によって意味が違うため、結合キーは複合(国×カテゴリID)にした。さらに全行に生成IDを振ってあり、これが後のクレンジングで重複を安全に消せる理由になる。すべては2,667,041行のテーブル1枚に集約され、取り込みは端から端までSQL。ウェアハウスの外にスクリプトは置かない。",
        },
        img: ["youtube-lakehouse-1"],
      },
      {
        h: { en: "Cleaning as queries", ja: "クレンジングもクエリで" },
        p: {
          en: "The same video can trend in the same country on the same day more than once in the raw data, so a window function ranks the duplicates by view count and keeps the highest, the most representative record of that day. Corrupted video ids were deleted, a missing category label was repaired with an update after a cross-country comparison identified what it should be, and the table went from 2,667,041 to 2,597,494 rows with every step verified by a count. Each fix is documented next to its query, so the cleaning reads like code review material, not a mystery.",
          ja: "生データでは、同じ動画が同じ国・同じ日に複数回記録されていることがある。そこでウィンドウ関数で重複を再生数順に順位づけし、その日を最もよく代表する最大再生数の1行だけを残した。破損した動画IDは削除し、欠けていたカテゴリ名は他国との突き合わせで正体を特定してからUPDATEで修復。テーブルは2,667,041行から2,597,494行になり、各ステップを件数で検証した。どの修復が何のためかもクエリの隣に記録してあり、クレンジング自体がレビューできる資料になっている。",
        },
      },
      {
        h: {
          en: "Reading the numbers like an analyst",
          ja: "数字をアナリストの目で読む",
        },
        p: {
          en: "Averages alone would have told the wrong story. Film and animation tops average views (2.85 million), but the average is hostage to a few monster hits; on the median, comedy jumps to second (739 thousand, above science and technology's 636), meaning its performance is consistent rather than lottery-shaped. The country cut adds the caution: entertainment dominates almost everywhere, up to 42.35 percent of trending videos in India, except Canada and the United States, where gaming leads. And as a cross-border sanity check, videos mentioning BTS trended 468 times in Korea, 288 in India and 268 in the United States.",
          ja: "平均値だけ見ていたら、間違った物語を信じるところだった。平均再生数の1位は映画・アニメーション(285万)だが、平均は一握りの怪物ヒットに引きずられる。中央値で見るとコメディが2位に浮上し(73.9万、科学技術の63.6万を上回る)、当たり外れの宝くじ型ではなく、安定して打てるカテゴリだと分かる。国別の集計は注意点を足してくれる。エンタメはほぼ全ての国で首位で、インドではトレンド動画の42.35%を占める。ただしカナダとアメリカだけはゲームが首位だ。国境を越える力の確認として、BTS に触れた動画は韓国で468本、インドで288本、アメリカで268本トレンド入りしていた。",
        },
        img: ["youtube-lakehouse-3", "youtube-lakehouse-4"],
      },
      {
        h: { en: "The business answer", ja: "ビジネスへの答え" },
        p: {
          en: "The brief: which category should a new channel bet on, with music and entertainment excluded, and does the answer hold across countries? Comedy took the highest average like ratio of any category (6.19, ahead of education at 5.42), held the strongest median-to-average consistency, and trended in volume everywhere from India (2,995 distinct videos) to Mexico (512). The recommendation lands as a concrete strategy, quoted from the report: comedy shorts without spoken language, balancing global accessibility with strong engagement.",
          ja: "問いは「音楽とエンタメを除いたとき、新しいチャンネルはどのカテゴリに賭けるべきか。その答えは国を跨いでも成立するか」。平均like率はコメディが全カテゴリ1位(6.19、2位は教育の5.42)。中央値と平均の整合も最も安定していて、トレンド入りの本数もインドの2,995本からメキシコの512本まで全市場に届いていた。結論は具体的な戦略として着地する。レポートの言葉を借りれば、「話し言葉に頼らないコメディショート」。世界への届きやすさと高いエンゲージメントを両立させる選択だ。",
        },
        img: ["youtube-lakehouse-2", "youtube-lakehouse-5"],
      },
    ],
    code: {
      caption: {
        en: "Top video per country and month in one query: a window function picks the winner and Snowflake's QUALIFY keeps it readable (from part 3 of the submission).",
        ja: "国×月のトップ動画を1クエリで: ウィンドウ関数が勝者を選び、Snowflake の QUALIFY が読みやすさを保つ(提出 part 3 より)。",
      },
      src: `SELECT
country,
DATE_TRUNC(MONTH, trending_date) AS year_month,
title,
channeltitle,
category_title,
view_count,
TRUNC((likes / view_count) * 100, 2) AS likes_ratio
FROM table_youtube_final
WHERE YEAR(trending_date) = 2024
QUALIFY
ROW_NUMBER() OVER (
PARTITION BY country, DATE_TRUNC('MONTH', trending_date)
ORDER BY view_count DESC
) = 1
ORDER BY year_month, country;`,
    },
  },
  {
    slug: "nyc-taxi",
    name: "NYC Taxi at Scale",
    tag: { en: "Big Data", ja: "Big Data" },
    desc: {
      en: "Cleaning, analysing and modelling 964 million taxi trips, end to end on Databricks.",
      ja: "9.6億件のタクシー乗車データを、Databricks 上でクレンジングから分析・予測まで一気通貫で処理した。",
    },
    detail: {
      en: "Eleven years of New York taxi trips, 964 million rows after cleaning, processed with Spark on Databricks. The analysis answers operator questions (where the money is, when tips happen, which trips pay a driver best), and a fare model closes the loop, cutting prediction error by 28 percent against the baseline.",
      ja: "ニューヨークのタクシー11年分、クレンジング後で9億6,400万行を Databricks 上の Spark で処理。金はどこで動くか、チップはいつ発生するか、どの乗車がドライバーに一番割が良いか、という現場の問いに答え、最後は運賃予測モデルで誤差をベースライン比28%削減した。",
    },
    body: [
      {
        h: { en: "A billion-row table, cleaned by rules", ja: "10億行規模を、ルールで洗う" },
        p: {
          en: "Yellow and green cab records from 2014 to 2024 arrive with impossible trips: pickups after dropoffs, 120 kilometre-per-hour averages, one-minute false starts, fares below New York's 3.30 dollar base fare and above 1,000. Nine explicit rules remove them, each reporting how many rows it dropped, under a brief that capped total data loss at 10 percent. The two fleets speak different schemas (tpep against lpep timestamps, fees that exist on one fleet only), so they are unified into one, tagged by colour, enriched with borough names by broadcasting the tiny zone table against the billion-row one, and stored as a 964,078,678 row Delta table so downstream steps never recompute from raw.",
          ja: "2014〜2024年のイエロー/グリーンキャブの記録には、あり得ない乗車が混ざっている。降車時刻が乗車より先、平均時速120km、1分間の空発車、ニューヨークの初乗り3.30ドルを下回る運賃や1,000ドル超の運賃。9つの明示的なルールでそれらを除去し、各ルールが何行落としたかを毎回報告する。課題の制約は「総削除は10%以内」。2系統はスキーマも方言も違う(tpep と lpep のタイムスタンプ、片方にしか無い手数料列)ので、1つに統一して色タグを付け、小さなゾーン表を10億行側へブロードキャスト結合して行政区名を付与し、964,078,678行の Delta テーブルとして保存した。下流の処理が生データから再計算しない構えだ。",
        },
        img: ["nyc-taxi-3"],
      },
      {
        h: { en: "What a billion trips say", ja: "10億件が語ること" },
        p: {
          en: "Spark SQL over the full table answers the operator questions. Trips inside Manhattan carry 61.9 percent of 2024 revenue (696 million dollars), with Queens-to-Manhattan a distant second at 15.5. Tipping has a shape: 63.07 percent of trips tip at all, but only 0.83 percent of tippers give 15 dollars or more, roughly one generous tip in 190 trips. For a driver the trade is explicit: half-hour-plus trips pay the best hourly rate (66.48 dollars) but arrive rarely, while under-five-minute hops pay the best rate per kilometre (6.42 dollars) at a solid 58.10 per hour, and the write-up argues that is the sustainable optimum. The heaviest of these queries crosses roughly a billion rows in about a minute.",
          ja: "全量に対する Spark SQL が、現場の問いに答えていく。2024年の売上の61.9%(6.96億ドル)はマンハッタン内の移動が占め、2位のクイーンズ→マンハッタンは15.5%と大差がつく。チップにも形がある。チップが発生する乗車は63.07%ある一方、15ドル以上払う人はそのうち0.83%。気前のいいチップはおよそ190乗車に1回だ。ドライバーにとっての損得も明示的で、30分超の乗車は時給最高(66.48ドル)だが滅多に来ない。5分未満の短距離はキロ単価最高(6.42ドル)で時給も58.10ドルと堅く、レポートはこちらを持続可能な最適解と論じている。一番重いクエリでも、約10億行を1分前後で走り切る。",
        },
        img: ["nyc-taxi-2", "nyc-taxi-1"],
      },
      {
        h: { en: "The patterns underneath", ja: "その下にあるパターン" },
        p: {
          en: "The rhythm of the city is in the aggregates: volumes peak in July and December and on Fridays, evenings from five to eight are the busiest hours, and the average trip carries just 1.2 to 1.4 passengers. The efficiency cut explains driver economics from the cost side: trips under ten minutes are the least cost-efficient for the passenger (0.16 km per dollar) because fixed fares and surcharges dominate short rides. Even the trips-per-hour estimate is honest about the real world: it assumes a four-minute turnaround between fares rather than pretending drivers teleport to the next pickup.",
          ja: "街のリズムは集計に現れる。乗車数のピークは7月と12月、曜日では金曜、時間帯では夕方5〜8時。平均乗車人数はわずか1.2〜1.4人だ。効率の断面はドライバー経済学をコスト側から説明する。10分未満の乗車は乗客にとって最も割高(1ドルあたり0.16km)で、固定運賃と加算料金が短距離を支配するからだ。時間あたり乗車数の見積もりも現実に正直で、次の客まで4分の切り替え時間を仮定に置いている。ドライバーが次の乗客へ瞬間移動する、とは仮定しない。",
        },
        img: ["nyc-taxi-4", "nyc-taxi-5"],
      },
      {
        h: { en: "A fare model on top", ja: "仕上げに運賃モデル" },
        p: {
          en: "The prediction target is the total fare, split by time so the model is judged on genuinely future trips: everything to September 2024 trains, October onward tests. The baseline is computed honestly at full scale, a group-average fare over all 953 million training rows in Spark, landing at RMSE 17.10. The learned models trained on a 1 percent sample, a documented constraint (full-data training exceeded the cluster's memory), and still cut the error: 13.28 for a linear model, 12.26 for tuned gradient boosting. The write-up translates that plainly: an average miss near 10 dollars is fine for daily or borough-level planning where errors cancel, and not good enough to quote a single trip's fare.",
          ja: "予測対象は運賃総額。2024年9月までを学習、10月以降をテストという時間分割にして、本当に未来の乗車で評価する。ベースラインは全量で正直に計算した。9.5億行の学習データすべてから Spark でグループ平均運賃を出し、RMSE 17.10。学習モデル側は1%サンプルで訓練した。全量学習はクラスタのメモリ上限を超えるという制約を明記したうえでだ。それでも誤差は削れて、線形モデルで13.28、チューニングした勾配ブースティングで12.26。この数字の意味も平易な言葉に訳してある。平均10ドル前後の外れは、誤差が相殺される日次・行政区レベルの計画には十分。1回の乗車の運賃提示には、まだ足りない。",
        },
      },
    ],
    code: {
      caption: {
        en: "The baseline nobody should skip: a group-average fare computed with Spark over all 953 million training rows, joined back onto the test set (from the ML notebook).",
        ja: "省略してはいけないベースライン: 9.5億行の学習全量から Spark でグループ平均運賃を計算し、テスト側に結合(MLノートブックより)。",
      },
      src: `# Group keys = color x PU x DO x month x day of the week x time
KEYS = ["color","pickup_borough","dropoff_borough","month","dow","hour"]

train_mean = (
    train_df.groupBy(KEYS)
    .agg(F.avg("total_amount").alias("avg_total_amount"))
)

# Left join to test to get mean value as predicted value
pred_baseline = (
    test_df.join(train_mean, on=KEYS, how="left")
           .withColumn("pred", F.coalesce(F.col("avg_total_amount"), F.lit(None)))
)`,
    },
  },
  {
    slug: "cloud-elt",
    name: "Cloud ELT Pipeline",
    tag: { en: "Big Data", ja: "Big Data" },
    desc: {
      en: "A cloud pipeline that turns raw Airbnb and census data into analysis-ready tables, on the tools industry data teams run.",
      ja: "Airbnbと国勢調査の生データを、分析できる形へ自動変換するクラウド上のデータパイプライン。",
    },
    detail: {
      en: "The same setup a company data team would run: raw files land in Google Cloud, Airflow triggers the work on schedule, and dbt transforms everything step by step into clean, query-ready tables. History is preserved so last month's numbers never silently change, and the whole pipeline reruns every month without breaking.",
      ja: "企業のデータチームが実際に組むのと同じ構成。生データを Google Cloud に置き、Airflow が処理を自動で走らせ、dbt が段階的にきれいな分析用テーブルへ変換していく。先月の数字が勝手に変わらないよう履歴を保持し、毎月再実行しても壊れないパイプラインとして設計した。",
    },
    body: [
      {
        h: { en: "The pipeline", ja: "パイプライン" },
        p: {
          en: "Sydney Airbnb listings from May 2020 to April 2021, enriched with ABS 2016 Census data and NSW council-area mapping. Airflow on Cloud Composer lands each month's raw CSVs from cloud storage into its own bronze table, untouched and stamped with source-file and load-time audit columns, so any single month can be rerun without disturbing the others. From there dbt takes over: 17 version-controlled models and one snapshot transform bronze through silver into a gold star schema, and 12 tests on the fact table (uniqueness, not-null, referential integrity, value ranges) run with every build, so a bad load fails loudly instead of quietly corrupting the numbers.",
          ja: "2020年5月〜2021年4月のシドニーのAirbnbリスティングを、ABS 2016年国勢調査データとNSWの行政区マッピングで拡張。Cloud Composer 上の Airflow が毎月の生CSVをクラウドストレージから月ごとの Bronze テーブルへ、無加工のまま取り込み、ソースファイル名とロード時刻の監査列を刻む。だからどの月も、他の月を乱さずに単独で再実行できる。そこから先は dbt の仕事だ。バージョン管理された17モデルと1スナップショットが Bronze から Silver、Gold のスタースキーマへ変換し、ファクトテーブルには12のテスト(一意性・非NULL・参照整合性・値域)がビルドのたびに走る。不正なロードは静かに数字を汚すのではなく、大きな音を立てて失敗する。",
        },
        img: ["cloud-elt-1", "cloud-elt-2"],
      },
      {
        h: { en: "History that does not lie", ja: "嘘をつかない履歴" },
        p: {
          en: "A host's superhost badge changes over time, and analysis goes wrong quietly if June's numbers get judged with December's status. The host dimension is therefore an SCD Type 2 snapshot: each change opens a new versioned row, and every monthly fact joins to the host's state as of that month. This design also produced the project's best war story: snapshotting across twelve months of raw data first ran for over five hours, until a staging model using a window function reduced the input to genuine change points only, turning the run practical. Preserving history is cheap; preserving it naively is not.",
          ja: "ホストのスーパーホスト認定は時間とともに変わる。6月の数字を12月のステータスで評価してしまうと、分析は静かに狂う。だからホスト次元は SCD Type 2 のスナップショットにした。変化のたびに新しいバージョン行が開き、毎月のファクトは「その月時点」のホストの状態と結合される。この設計は、このプロジェクト一番の実戦談も生んだ。12ヶ月分の生データへのスナップショットは当初5時間超も走り続け、ウィンドウ関数で「本当に変化した時点」だけに入力を絞るステージングモデルを挟んでようやく実用になった。履歴の保持は安い。素朴にやると、高くつく。",
        },
      },
      {
        h: { en: "What the data said", ja: "データが語ったこと" },
        p: {
          en: "The gold layer answered real questions, reproducibly. Median host age correlates with revenue at Pearson r around 0.737, 79.4 percent of multi-listing hosts stay within a single council area, and entire homes for two to four guests maximise stays. The demographic cut shows a roughly sevenfold revenue spread between the best and worst areas. And the census join earns its keep in one finding: even in the strongest area, a single-listing host's annual Airbnb revenue covers only about half the median mortgage, so the report concludes Airbnb income alone rarely carries a mortgage outside top-demand areas.",
          ja: "Gold層は実際の問いに、再現可能な形で答えた。ホストの年齢中央値と売上はピアソン相関約0.737。複数物件ホストの79.4%は単一の行政区にとどまり、2〜4人向けの一棟貸しが宿泊数を最大化する。人口統計の断面では、最強エリアと最弱エリアの売上に約7倍の開きが出た。そして国勢調査を結合した甲斐は、1つの発見に集約される。最強エリアですら、1物件ホストの年間Airbnb収入は住宅ローン中央値の約半分にしか届かない。レポートの結論はこうだ。人気エリアの外では、Airbnb収入だけでローンを支えるのはまず難しい。",
        },
        img: ["cloud-elt-3", "cloud-elt-4"],
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
    links: [
      {
        label: "github.com/masaki-kawa/airbnb-data-pipeline",
        href: "https://github.com/masaki-kawa/airbnb-data-pipeline",
      },
    ],
  },
  {
    slug: "image-captioning",
    name: "Image Captioning",
    tag: { en: "Deep Learning", ja: "Deep Learning" },
    desc: {
      en: "Teaching a model to describe photos taken by blind users, in words.",
      ja: "視覚障害のあるユーザーが撮った写真を、言葉で説明するAIモデルを構築した。",
    },
    detail: {
      en: "The photos are real ones taken by blind users, so they are often blurry, dark or off-centre, and describing them is genuinely hard. I built two generations of the model end to end, measured the jump between them, and then looked inside the newer one to see where it looks in the image when it chooses each word.",
      ja: "写真は視覚障害のあるユーザーが実際に撮ったもので、ブレや暗さ、見切れが多く、言葉にするのは本当に難しい。旧世代と新世代の2つのモデルを端から端まで自作して性能の差を計測し、新モデルが単語を選ぶとき画像のどこを見ているかまで可視化した。",
    },
    body: [
      {
        h: { en: "The dataset and the task", ja: "データセットと課題" },
        p: {
          en: "VizWiz-Captions is built from photos taken by blind users, so images are often blurred, off-centre or poorly lit, and 13.3 percent of the raw captions are the pre-canned quality rejection sentence. After filtering, 7,532 images and 32,619 usable captions remained, with a 3,738-word vocabulary (words seen at least five times) and an image-level 70/15/15 split so no photo leaks between train and test. In a group of six, I built and owned two models end to end and evaluated them on BLEU-1 through BLEU-4 over the 1,131-image test split.",
          ja: "VizWiz-Captions は視覚障害のあるユーザーが撮った写真からなり、ブレ・見切れ・暗所が多い。生のキャプションの13.3%は「画質が悪すぎて説明不能」という定型の却下文だ。フィルタ後に残ったのは7,532枚の画像と32,619本の使えるキャプション。語彙は出現5回以上の3,738語に絞り、学習とテストの間で写真が漏れないよう画像単位で70/15/15に分割した。6人チームの中で、私は2つのモデルを端から端まで自分で構築し、1,131枚のテスト分割で BLEU-1〜BLEU-4 により評価した。",
        },
      },
      {
        h: { en: "Two models, one variable", ja: "2つのモデル、変えるのは1点だけ" },
        p: {
          en: "The comparison is designed like an experiment: the encoder stays identical and frozen, and only the decoder paradigm changes. Freezing EfficientNet-B0 (chosen for ResNet-50-level accuracy at roughly a fifth of the compute) means the costly image pass is paid once: all 7,532 feature maps are cached to disk, and an epoch then takes 7 to 12 seconds on a free Kaggle GPU. The baseline decodes with a single GRU fed one compressed image vector, deliberately the simplest classic design. The refined model is a three-layer Transformer decoder that cross-attends to all 49 spatial regions of the image at every word, so it never has to remember the picture through a bottleneck.",
          ja: "比較は実験として設計した。エンコーダは両モデルで同一・凍結のまま、変えるのはデコーダの方式だけ。EfficientNet-B0(ResNet-50 級の精度を約5分の1の計算量で出すために選定)を凍結すると、高コストな画像処理は一度きりで済む。7,532枚分の特徴マップをディスクにキャッシュし、以後は1エポック7〜12秒、無料の Kaggle GPU で回る。ベースラインは、1本に圧縮した画像ベクトルを受け取る単層GRUで、意図的に「最も素朴な古典設計」にした。改良版は3層の Transformer デコーダで、単語を1つ生成するたびに画像の49領域すべてを見にいく。絵の記憶をボトルネック越しに保つ必要が、そもそもない。",
        },
        img: ["image-captioning-4", "image-captioning-3"],
      },
      {
        h: { en: "Beam search with guardrails", ja: "ガードレール付きビームサーチ" },
        p: {
          en: "The decoding constraints map one-to-one to failures observed in the baseline's outputs: unknown-token flooding on text-heavy photos like medicine labels (so unknown is masked), captions collapsing to nothing (so a minimum length), and \"that says that says\" loops (so a repetition penalty). Beam search runs five candidates with length normalisation, engineered so all beams share one cached image encoding and batch through the decoder together. The result: BLEU-1 rose from 0.5278 to 0.5644 and BLEU-4 from 0.1365 to 0.1416, and it happened while validation loss got worse, a documented reminder that loss and caption quality are different judges. A cross-team finding landed too: my simple baseline matched a teammate's attention model built on ResNet-50, meaning the encoder choice bought more than the attention did on that stack.",
          ja: "復号の制約は、ベースラインの出力で実際に観察した失敗と1対1で対応している。薬のラベルのような文字だらけの写真で未知語が氾濫する(だから未知語をマスク)、キャプションが空同然に崩壊する(だから最小長)、「that says that says」のループ(だから繰り返しペナルティ)。ビームサーチは長さ正規化つきで5候補を走らせ、全ビームが1つのキャッシュ済み画像エンコードを共有してデコーダをまとめて通るよう実装した。結果、BLEU-1 は 0.5278 から 0.5644 へ、BLEU-4 は 0.1365 から 0.1416 へ上昇。しかも検証損失は悪化しながらの上昇で、損失とキャプションの質は別の審判だという教訓を記録に残した。チーム横断の発見もあった。私の素朴なベースラインは、ResNet-50 上に注意機構を載せたチームメイトのモデルと BLEU-4 で並んだ。このスタックでは、注意機構よりエンコーダの選択のほうが効いていたのだ。",
        },
      },
      {
        h: { en: "Looking inside the model", ja: "モデルの中を見る" },
        p: {
          en: "The figures below are straight from the delivered notebook: both models' captions against the human references on twelve test photos, and the Transformer's cross-attention heatmaps. The word \"barcode\" visibly attends to the barcode; on a chocolate package the words are wrong but the attention sits exactly on the lettering, which pins the remaining failures where the report puts them: vocabulary and object naming, colour swaps and guessed label text, not broken visual grounding. Seeing where the model looks is how you debug a captioner.",
          ja: "下の図は提出ノートブックの出力そのまま。テスト12枚に対する両モデルのキャプションと人間の正解の比較、そして Transformer のクロスアテンションだ。「barcode」という単語は画像内のバーコードをはっきり見ている。チョコレートのパッケージでは単語こそ間違えたが、注意は文字の上に正確に乗っている。つまり残る失敗の在り処は、レポートの分析どおり語彙と物体の名づけ、色の取り違え、ラベル文字の当て推量であって、視覚の接地が壊れているのではない。モデルがどこを見ているかを可視化することが、キャプション生成モデルのデバッグになる。",
        },
        img: [
          "image-captioning-2",
          "image-captioning-5",
          "image-captioning-6",
          "image-captioning-1",
        ],
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
];

export const COMMUNITY: WorkEntry[] = [
  {
    slug: "workshops",
    name: "Workshops",
    logo: "zepi",
    desc: {
      en: "Recurring workshops with the Zepi community in Sydney: LinkedIn, then Notion, Claude Code next.",
      ja: "シドニーのコミュニティ Zepi で継続開催しているワークショップ。LinkedIn、Notion と続き、次は Claude Code。",
    },
    detail: {
      en: "I don't just build with these tools, I teach them. Through Zepi, a Sydney events community, I speak at events and run hands-on workshops, as COO of Cubic Innov8.",
      ja: "ツールは使うだけでなく、教える側にも立つ。シドニーのイベントコミュニティ Zepi を通じて登壇し、ハンズオンのワークショップを開いている。肩書きは Cubic Innov8 COO。",
    },
    body: [
      {
        h: { en: "Teaching, not just building", ja: "つくるだけでなく、教える" },
        p: {
          en: "The audience is mostly international students and new arrivals trying to break into work here, which is exactly who these skills help most. The sessions are hands-on: laptops open, everyone leaves with something built.",
          ja: "参加者の多くは、こちらで仕事を得ようとしている留学生や来豪して間もない人たちで、これらのスキルが一番効く層そのものだ。セッションはハンズオン形式。全員がラップトップを開き、何かをつくって帰る。",
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
      en: "A Sydney community night for people building with AI: talks, live startup demos, open networking.",
      ja: "シドニーでAIでものをつくる人たちのコミュニティナイト。トーク、ライブデモ、ネットワーキング。",
    },
    detail: {
      en: "AI Salon Sydney brings the city's AI scene into one room: guest speakers, live startup demos, and open networking, with organisers and partners from across the ecosystem.",
      ja: "AI Salon Sydney は、シドニーの AI シーンを一つの部屋に集める場。ゲストスピーカー、スタートアップのライブデモ、オープンなネットワーキング。運営とパートナーもエコシステム横断。",
    },
    body: [
      {
        h: { en: "What it is", ja: "どんな場か" },
        p: {
          en: "AI Salon Sydney is a recurring community evening for people building with AI: builders, founders, investors and the AI-curious in one room. A typical night runs from arrivals and pizza through a guest speaker and live startup demos to open networking, with organisers and partners drawn from across the ecosystem.",
          ja: "AI Salon Sydney は、AI でものをつくる人たちのための定期コミュニティイベント。ビルダー、創業者、投資家、AI に興味のある人たちが一つの部屋に集まる。ピザと歓談で始まり、ゲストスピーカーの登壇とスタートアップのライブデモを経て、オープンなネットワーキングで締まる夜。運営もパートナーも、エコシステムを横断して集まっている。",
        },
        img: ["ai-salon-2", "ai-salon-1"],
      },
    ],
  },
];
