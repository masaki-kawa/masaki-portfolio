/**
 * Section display copy (EN/JA), verified against masaki-master.md and
 * masaki-application-strategy.md. Drawn on Masaki's own world (the
 * lens, silver, the Tokyo to Sydney journey, data to production, one
 * person on both the business and build sides), deliberately clear of
 * the reference site's light/prism metaphor.
 */

export type L = { en: string; ja: string };

export const SECTION = {
  work: {
    n: "01",
    labelEn: "Work",
    labelJa: "仕事",
    headline: {
      en: "The work that is actually live, in Tokyo and Sydney.",
      ja: "東京とシドニーで、実際に動いている仕事。",
    },
    hint: { en: "Scroll or drag", ja: "スクロール、またはドラッグ" },
  } as Section,
  research: {
    n: "02",
    labelEn: "Research & University",
    labelJa: "研究・大学",
    headline: {
      en: "Kept separate from the client work: research and university projects.",
      ja: "クライアント案件とは別に、研究と大学で取り組んだもの。",
    },
  } as Section,
  community: {
    n: "03",
    labelEn: "Community & Speaking",
    labelJa: "コミュニティ・登壇",
    headline: { en: "Out in the community.", ja: "コミュニティでも。" },
  } as Section,
  about: {
    n: "04",
    labelEn: "About",
    labelJa: "自己紹介",
    headline: {
      en: "The business side and the build side. I work across both.",
      ja: "事業をつくる側と、システムをつくる側。両方に立つ。",
    },
    lead: {
      en: "I use AI to change how businesses run, and build the workflows behind it myself. As COO of Cubic Innov8, a cross-border innovation hub connecting Japan and Australia, I bring in the clients and run operations on the business side, then build the systems that serve them. I designed, built and shipped Vacanti AI, an AI job matching SaaS, solo and into production, as an independent venture. Before this I spent five years in HR at Canon Marketing Japan, then completed a Master of Data Science at the University of Technology Sydney, and I work between Tokyo and Sydney.",
      ja: "AIで業務の回り方を変え、それを支えるワークフローまで自分でつくります。日本とオーストラリアをつなぐクロスボーダー・イノベーションハブ Cubic Innov8 のCOOとして、クライアントを開拓し運営を回す事業側と、それを動かすシステムをつくる実装側の両方に立ちます。独立ベンチャーとしては、AIジョブマッチングSaaS「Vacanti AI」を一人で設計・実装し、本番まで出しました。その前はキヤノンマーケティングジャパンの人事に5年、その後シドニー工科大学でデータサイエンス修士を修了し、いまは東京とシドニーを行き来しています。",
    },
    pillars: [
      {
        labelEn: "The business side",
        title: { en: "Bring it in, run it", ja: "事業をつくり、回す" },
        body: {
          en: "As COO, I bring in the clients and keep the operations running.",
          ja: "COOとして、クライアントを開拓し、日々の運営を回します。",
        },
      },
      {
        labelEn: "The build side",
        title: { en: "Shipped to production", ja: "システムを、本番まで" },
        body: {
          en: "I design and ship the systems behind that work, solo, all the way to production.",
          ja: "その事業を支えるシステムを、設計から本番投入まで一人でつくります。",
        },
      },
      {
        labelEn: "The bridge",
        title: { en: "HR, data, two cities", ja: "人事とデータ、二つの拠点" },
        body: {
          en: "Five years of HR domain knowledge, a data science degree, and two bases: Tokyo and Sydney.",
          ja: "人事5年のドメイン理解、データサイエンス、そして東京とシドニーの二拠点をつなぎます。",
        },
      },
    ],
    metrics: [
      { value: "2", cap: { en: "Cities, Tokyo and Sydney", ja: "拠点、東京とシドニー" } },
      { value: "10", cap: { en: "Clients sourced, Review365", ja: "社を開拓、Review365" } },
      { value: "4", cap: { en: "Ongoing engagements", ja: "社を継続中" } },
      { value: "5", cap: { en: "Years in HR at Canon", ja: "年、キヤノンの人事" } },
    ],
  } as Section,
  approach: {
    n: "05",
    labelEn: "Approach",
    labelJa: "仕事の流れ",
    headline: {
      en: "From the first conversation to a system running in production. Carried by one person.",
      ja: "事業の入口から、本番で動くまで。ひとりで持っていく。",
    },
    steps: [
      {
        num: "01",
        labelEn: "Scope",
        title: { en: "Scope", ja: "見立て" },
        body: {
          en: "Start on the business side: find the paying client, then map where AI actually changes the work.",
          ja: "事業側に立ち、課金クライアントを見つけ、どの業務をAIで変えられるかを見極める。",
        },
      },
      {
        num: "02",
        labelEn: "Design",
        title: { en: "Design", ja: "設計" },
        body: {
          en: "Shape the scoring, the SOPs and the workflows, working back from what the business needs.",
          ja: "スコアリングやSOP、ワークフローを、事業の狙いから逆算して組み立てる。",
        },
      },
      {
        num: "03",
        labelEn: "Ship",
        title: { en: "Ship", ja: "実装" },
        body: {
          en: "Take it past the notebook, all the way to a production system real users depend on.",
          ja: "ノートブックで止めず、実ユーザーが依存する本番システムまで持っていく。",
        },
      },
      {
        num: "04",
        labelEn: "Operate",
        title: { en: "Operate", ja: "運用" },
        body: {
          en: "Launch is not the finish line. Measure, fix, and keep it healthy in production.",
          ja: "公開して終わりにせず、計測して直し、動き続ける状態を保つ。",
        },
      },
    ],
  } as Section,
  contact: {
    n: "06",
    labelEn: "Contact",
    labelJa: "連絡先",
    headline: {
      en: "Let's talk. From Tokyo, or from Sydney.",
      ja: "話しましょう。東京からでも、シドニーからでも。",
    },
    tagline: {
      en: "I work across data and AI, from Tokyo to Sydney. Say hello.",
      ja: "データとAIを、東京からシドニーまで。気軽にどうぞ。",
    },
    lead: {
      en: "Whether it is the business or the build. If you want to move a workflow forward with data and AI, get in touch.",
      ja: "事業の話でも、実装の話でも。データとAIで業務を前に進めたい方、お気軽にご連絡ください。",
    },
    meta: [
      { labelEn: "Based", body: { en: "Tokyo and Sydney.", ja: "東京とシドニー、二つの拠点から。" } },
      { labelEn: "Languages", body: { en: "English and Japanese.", ja: "英語と日本語で。" } },
      {
        labelEn: "Focus",
        body: {
          en: "AI that improves how businesses run, from both the business and build sides.",
          ja: "AIで業務を良くする。事業も実装も両サイドで。",
        },
      },
    ],
  } as Section,
};

/* loose shared shape so every section object type-checks */
export type Section = {
  n: string;
  labelEn: string;
  labelJa: string;
  headline: L;
  hint?: L;
  lead?: L;
  tagline?: L;
  pillars?: { labelEn: string; title: L; body: L }[];
  metrics?: { value: string; cap: L }[];
  steps?: { num: string; labelEn: string; title: L; body: L }[];
  meta?: { labelEn: string; body: L }[];
};
