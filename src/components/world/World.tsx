"use client";

/**
 * World v2 — free scroll, traveling glass.
 *
 * The page scrolls like a normal document (no pinning, no waiting).
 * Display typography (the name, the statement) lives inside the WebGL
 * scene as text quads that move in sync with the document, so the
 * glass can bend it; functional copy stays in the DOM, crisp.
 *
 * The glass slab travels a diagonal path through the viewport as you
 * scroll: parked top-right → down-left THROUGH the name → banks
 * toward bottom-right where the statement rises to meet it → drifts
 * on. Scroll fast and it flies; it never gates the page.
 *
 * Performance contract: one scrollY read per rAF, transforms only,
 * DPR capped, pauses when hidden, reduced-motion = no smoothing.
 */

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { useLang } from "@/components/lang-provider";
import type { Lang } from "@/types/lang";
import {
  BG_VERT,
  BG_FRAG,
  LENS_VERT,
  LENS_FRAG,
  PART_VERT,
  PART_FRAG,
} from "@/lib/world/shaders";
import { makeTextBlock, EN_FONT, JA_FONT } from "@/lib/world/text-block";

/* lens half extents in world units (geometry is 3.0 x 1.85). The flight
   plan is derived from the measured text blocks, not hand-tuned points:
   during a pass the lens position is defined RELATIVE to the block, so
   the diagonal traverse covers every letter on any language, viewport
   or scroll speed — coverage by construction. */
const LENS_HW = 1.5;
const LENS_HH = 0.925;

type Row = { name: string; desc: string; tag?: string };

export function World() {
  const { lang, setLang } = useLang();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroSecRef = useRef<HTMLElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);
  const [intro, setIntro] = useState(true);
  const langRef = useRef<Lang>(lang);
  const redrawRef = useRef<(l: Lang) => void>(() => {});

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setIntro(false), reduced ? 0 : 1700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
    });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);

    /* --- the light field --- */
    const fieldScene = new THREE.Scene();
    const bgCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const bgUniforms = {
      uRes: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uDrift: { value: 0 },
    };
    const bgMat = new THREE.ShaderMaterial({
      vertexShader: BG_VERT,
      fragmentShader: BG_FRAG,
      uniforms: bgUniforms,
      depthTest: false,
      depthWrite: false,
    });
    const tri = new THREE.BufferGeometry();
    tri.setAttribute(
      "position",
      new THREE.BufferAttribute(
        new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]),
        3,
      ),
    );
    const bgMesh = new THREE.Mesh(tri, bgMat);
    bgMesh.frustumCulled = false;
    fieldScene.add(bgMesh);

    const rt = new THREE.WebGLRenderTarget(2, 2, { depthBuffer: false });

    /* --- content layer: display type that scrolls with the page --- */
    const contentScene = new THREE.Scene();
    const contentCam = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    contentCam.position.set(0, 0, 6);
    contentCam.lookAt(0, 0, 0);

    const nameQuad = makeTextBlock("left");
    nameQuad.setLineWorld(0.52);
    contentScene.add(nameQuad.group);

    function redraw(l: Lang) {
      const en = l === "en";
      nameQuad.draw(
        en ? ["Masaki", "Kawakami"] : ["川上", "勝基"],
        en ? EN_FONT : JA_FONT,
        en ? -0.035 : 0.03,
      );
    }
    redrawRef.current = redraw;

    /* --- glass layer --- */
    const glassScene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 50);
    camera.position.set(0, 0, 6);

    const lensUniforms = {
      tBg: { value: rt.texture },
      uRefr: { value: 0.085 },
      uSplit: { value: 0.16 },
      uTime: { value: 0 },
    };
    const lensMat = new THREE.ShaderMaterial({
      vertexShader: LENS_VERT,
      fragmentShader: LENS_FRAG,
      uniforms: lensUniforms,
    });
    const lensGeo = new RoundedBoxGeometry(3.0, 1.85, 0.34, 5, 0.17);
    const lens = new THREE.Mesh(lensGeo, lensMat);
    glassScene.add(lens);

    const shardGeo = new RoundedBoxGeometry(0.85, 0.55, 0.16, 4, 0.09);
    const shardA = new THREE.Mesh(shardGeo, lensMat);
    const shardB = new THREE.Mesh(shardGeo, lensMat);
    shardA.position.set(-2.35, 1.35, 1.3);
    shardB.position.set(2.75, -1.55, -1.6);
    glassScene.add(shardA, shardB);

    const PART_N = 170;
    const partGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(PART_N * 3);
    const pSeed = new Float32Array(PART_N);
    for (let i = 0; i < PART_N; i++) {
      pPos[i * 3] = (Math.random() * 2 - 1) * 5.2;
      pPos[i * 3 + 1] = (Math.random() * 2 - 1) * 2.8;
      pPos[i * 3 + 2] = -2.6 + Math.random() * 4.2;
      pSeed[i] = Math.random();
    }
    partGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
    partGeo.setAttribute("aSeed", new THREE.BufferAttribute(pSeed, 1));
    const partMat = new THREE.ShaderMaterial({
      vertexShader: PART_VERT,
      fragmentShader: PART_FRAG,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      depthWrite: false,
    });
    const parts = new THREE.Points(partGeo, partMat);
    parts.frustumCulled = false;
    glassScene.add(parts);

    /* --- layout + state --- */
    let vw = 1;
    let vh = 1;
    let docH = 1;
    let heroTop = 0;
    let mx = 0;
    let my = 0;
    let tmx = 0;
    let tmy = 0;
    let gx = 0;
    let gy = 0;
    let gInit = false;
    let raf = 0;
    let running = true;

    const cue = cueRef.current;

    function measure() {
      vw = window.innerWidth;
      vh = window.innerHeight;
      renderer.setSize(vw, vh, false);
      rt.setSize(Math.round(vw * dpr), Math.round(vh * dpr));
      camera.aspect = vw / vh;
      camera.updateProjectionMatrix();
      contentCam.aspect = vw / vh;
      contentCam.updateProjectionMatrix();
      bgUniforms.uRes.value.set(vw * dpr, vh * dpr);
      docH = document.documentElement.scrollHeight;
      heroTop = heroSecRef.current ? heroSecRef.current.offsetTop : 0;
    }
    measure();
    redraw(langRef.current);

    const HALF_H = Math.tan((35 * Math.PI) / 360) * 6;
    const toWorldX = (u: number) => (u - 0.5) * 2 * HALF_H * (vw / vh);
    const toWorldY = (v: number) => (0.5 - v) * 2 * HALF_H;

    function onPointer(e: PointerEvent) {
      tmx = (e.clientX / vw) * 2 - 1;
      tmy = (e.clientY / vh) * 2 - 1;
    }
    function onVis() {
      running = document.visibilityState === "visible";
      if (running) raf = requestAnimationFrame(frame);
      else cancelAnimationFrame(raf);
    }
    const easeIO = (x: number) =>
      x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;

    /* Flight plan derived from the measured blocks. During a pass the
       lens position is block-relative (center + offset), so the
       enter→exit diagonal is exact in the block's own frame even while
       the block scrolls — every letter gets covered, in any language,
       at any viewport. Between passes we blend exit → next entry. */
    const lerp2 = (
      a: { x: number; y: number },
      b: { x: number; y: number },
      t: number,
    ) => ({ x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t });

    function lensTarget(yy: number) {
      const margin = 0.14;
      /* the name block's center at this scroll position */
      const nC = {
        x: toWorldX(0.07) + nameQuad.width() / 2,
        y: toWorldY((heroTop + vh * 0.5 - yy) / vh),
      };
      /* enter/exit just outside opposite corners, so the diagonal sweep
         covers every glyph regardless of language or viewport */
      const nOff = {
        x: nameQuad.width() / 2 + LENS_HW + margin,
        y: nameQuad.height() / 2 + LENS_HH * 0.75,
      };
      const nameEnter = { x: nC.x + nOff.x, y: nC.y + nOff.y }; /* ↗ of name */
      const nameExit = { x: nC.x - nOff.x, y: nC.y - nOff.y }; /* ↙ of name */

      /* the whole sweep lives inside the hero; by the time the name
         scrolls up under the rising content sheet it is fully read.
         Past the sweep the lens rides the name off the top. */
      const nA = vh * 0.02;
      const nB = vh * 0.28; /* sweep fast, while the name is still centered */
      if (yy <= nA) return nameEnter;
      if (yy <= nB) {
        return lerp2(nameEnter, nameExit, easeIO((yy - nA) / (nB - nA)));
      }
      /* once the name is read the lens glides on: a soft glass presence
         that travels with you, refracting the field behind the content */
      const travel = (yy - nB) / vh;
      return {
        x: toWorldX(0.5 + 0.2 * Math.sin(travel * 0.7)),
        y: toWorldY(0.44 + 0.14 * Math.sin(travel * 0.9 + 1.2)),
      };
    }

    const t0 = performance.now();
    function frame(now: number) {
      if (!running) return;
      const time = reduced ? 2.0 : (now - t0) / 1000;
      const y = window.scrollY;
      const p = Math.max(0, Math.min(1, y / Math.max(1, docH - vh)));
      const hp = Math.min(1, y / vh); /* hero-local progress */

      mx += (tmx - mx) * 0.06;
      my += (tmy - my) * 0.06;

      /* the name follows the document exactly */
      const nameV = (heroTop + vh * 0.5 - y) / vh;
      nameQuad.group.position.set(
        toWorldX(0.07) + nameQuad.width() / 2,
        toWorldY(nameV),
        0,
      );

      /* the glass flies its plan; smoothing polishes, never gates */
      const wp = lensTarget(y);
      const txw = wp.x;
      const tyw = wp.y;
      if (!gInit) {
        gx = txw;
        gy = tyw;
        gInit = true;
      }
      const k = reduced ? 1 : 0.22;
      gx += (txw - gx) * k;
      gy += (tyw - gy) * k;

      /* bank into the direction of travel */
      const ahead = lensTarget(y + 40);
      const bank = Math.atan2(ahead.y - tyw, ahead.x - txw + 1e-5);

      lens.position.set(gx, gy + Math.sin(time * 0.4) * 0.05, 0);
      lens.rotation.y = -0.16 + Math.sin(time * 0.13) * 0.07 + mx * 0.1;
      lens.rotation.x = 0.04 - my * 0.08 + Math.cos(time * 0.17) * 0.04;
      lens.rotation.z = reduced ? 0 : Math.max(-0.2, Math.min(0.2, bank * 0.1));

      /* shards start off-screen and drift in with scroll, so the hero
         top stays clean — no clipped fragment glinting in the corner */
      shardA.position.x = -2.6 + mx * 0.5 + hp * 0.7;
      shardA.position.y =
        2.9 - hp * 2.6 - my * 0.32 + Math.sin(time * 0.5) * 0.06;
      shardA.rotation.y = 0.42 + Math.sin(time * 0.19) * 0.3 + mx * 0.2;
      shardB.position.x = 2.9 + mx * 0.16;
      shardB.position.y = -2.9 + hp * 1.7;
      shardB.rotation.y = -0.3 + Math.cos(time * 0.15) * 0.24;

      /* glass camera carries the pointer parallax; content stays true */
      camera.position.x = mx * 0.1;
      camera.position.y = -my * 0.07;
      camera.lookAt(0, 0, 0);

      bgUniforms.uTime.value = time;
      bgUniforms.uDrift.value = hp;
      lensUniforms.uTime.value = time;
      partMat.uniforms.uTime.value = time;

      /* the content sheet is translucent frost, so the world and the
         gliding glass stay visible behind it — draw every frame */
      /* RT holds the resolved world (solid ink); only the lens reads it */
      renderer.setRenderTarget(rt);
      renderer.render(fieldScene, bgCam);
      renderer.autoClear = false;
      contentCam.layers.set(1);
      renderer.render(contentScene, contentCam);
      renderer.autoClear = true;
      /* the screen shows the raw world (ghost outline) under the lens */
      renderer.setRenderTarget(null);
      renderer.render(fieldScene, bgCam);
      renderer.autoClear = false;
      contentCam.layers.set(2);
      renderer.render(contentScene, contentCam);
      renderer.render(glassScene, camera);
      renderer.autoClear = true;

      if (cue) cue.style.opacity = String(1 - Math.min(1, hp * 2.2));

      raf = requestAnimationFrame(frame);
    }

    window.addEventListener("resize", measure, { passive: true });
    const ro = new ResizeObserver(() => measure());
    ro.observe(document.documentElement);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVis);
      tri.dispose();
      lensGeo.dispose();
      shardGeo.dispose();
      partGeo.dispose();
      partMat.dispose();
      bgMat.dispose();
      lensMat.dispose();
      nameQuad.dispose();
      rt.dispose();
      renderer.dispose();
    };
  }, []);

  /* reveal content rows as they enter view (transform/opacity only) */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );
    document.querySelectorAll(".w-reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* language flip: re-rasterize the display type */
  useEffect(() => {
    langRef.current = lang;
    redrawRef.current(lang);
  }, [lang]);

  const en = lang === "en";

  const work: Row[] = en
    ? [
        {
          name: "VAI Studio",
          desc: "AI video and web studio serving Japan and Australia. Client work live, including Yukoala Concierge.",
        },
        {
          name: "Review365",
          desc: "LLM reporting for paying local clients, run on Japanese SOPs. Rankings tracked monthly.",
        },
        {
          name: "Vacanti AI",
          desc: "AI job matching SaaS, designed, built and shipped solo. Live in production.",
        },
        {
          name: "Fabric Sampling Tool",
          desc: "WeChat mini program digitising sample lending for a textile trading company.",
        },
        {
          name: "Kodoku",
          tag: "In development",
          desc: "Solo founders running a company with AI agents as staff.",
        },
      ]
    : [
        {
          name: "VAI Studio",
          desc: "日豪で動くAI動画・Web制作スタジオ。Yukoala Concierge など実クライアント案件が稼働中。",
        },
        {
          name: "Review365",
          desc: "日本語SOPで回すLLMレポーティング。課金クライアントの順位を毎月計測。",
        },
        {
          name: "Vacanti AI",
          desc: "一人で設計から本番投入まで。稼働中のAIジョブマッチングSaaS。",
        },
        {
          name: "Fabric Sampling Tool",
          desc: "ある繊維商社のサンプル貸出業務をWeChatミニプログラムでデジタル化。",
        },
        {
          name: "Kodoku",
          tag: "開発中",
          desc: "AIエージェントのチームで1人の会社を回す。",
        },
      ];

  const research: Row[] = en
    ? [
        {
          name: "Warden",
          desc: "Prompt injection detection research: CoT monitoring, LLM as judge. Submitted at UTS.",
        },
        {
          name: "Cloud ELT Pipeline",
          desc: "dbt, Airflow, Medallion architecture, SCD Type 2, monthly loads on GCP.",
        },
        {
          name: "Crypto Forecast API",
          desc: "From model to service: PyPI package, FastAPI, Docker, deployed and callable.",
        },
      ]
    : [
        {
          name: "Warden",
          desc: "プロンプトインジェクション検出の研究。CoT監視、LLM-as-judge。UTS提出済み。",
        },
        {
          name: "Cloud ELT Pipeline",
          desc: "dbt、Airflow、Medallion 構成、SCD Type 2。GCP 上の月次ロード。",
        },
        {
          name: "Crypto Forecast API",
          desc: "モデルからサービスまで。PyPIパッケージ、FastAPI、Docker、稼働中のAPI。",
        },
      ];

  const community: Row[] = en
    ? [
        {
          name: "AI Salon Sydney",
          desc: "Co-organiser of AI community events in Sydney.",
        },
        {
          name: "Workshops",
          desc: "Speaker at Sydney community workshops: LinkedIn, Notion, and Claude Code next.",
        },
      ]
    : [
        {
          name: "AI Salon Sydney",
          desc: "シドニーのAIコミュニティイベントを共同運営。",
        },
        {
          name: "Workshops",
          desc: "シドニーのコミュニティワークショップに登壇。LinkedIn、Notion、次は Claude Code。",
        },
      ];

  return (
    <div className="w-root" data-intro={intro ? "on" : "off"}>
      <canvas ref={canvasRef} className="w-canvas" aria-hidden />
      <div className="w-grain" aria-hidden />

      <div className="w-loading" aria-hidden={!intro}>
        <svg viewBox="0 0 200 200" className="w-emblem">
          <defs>
            <path
              id="w-ring"
              d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0"
              fill="none"
            />
          </defs>
          <text className="w-ringtext">
            <textPath href="#w-ring" startOffset="0">
              MASAKI KAWAKAMI · DATA &amp; AI · SYDNEY · MASAKI KAWAKAMI · DATA &amp; AI ·
            </textPath>
          </text>
          <text x="100" y="94" textAnchor="middle" className="w-mono-mark">
            MK
          </text>
          <text x="100" y="116" textAnchor="middle" className="w-mono-sub">
            19 — 94
          </text>
        </svg>
      </div>

      <nav className="w-hud" aria-label="Navigation">
        <span className="w-brand">Masaki Kawakami</span>
        <button
          className="w-lang"
          onClick={() => setLang(en ? "ja" : "en")}
          aria-label="Switch language"
        >
          <span className={en ? "on" : ""}>EN</span>
          <span className={en ? "" : "on"}>日本語</span>
        </button>
      </nav>

      <main>
        <section className="w-sec w-sec-hero" ref={heroSecRef}>
          <h1 className="w-sr">Masaki Kawakami</h1>
          <p className="w-kicker">
            {en ? "Data & AI · Sydney" : "データ & AI · シドニー"}
          </p>
        </section>

        <div className="w-sheet">
          <section className="w-block" aria-label={en ? "Work" : "仕事"}>
            <p className="w-label w-reveal">{en ? "Work" : "仕事"}</p>
            <ul className="w-list">
              {work.map((it) => (
                <li className="w-item w-reveal" key={it.name}>
                  <span className="w-item-name">
                    {it.name}
                    {it.tag ? <em className="w-tag">{it.tag}</em> : null}
                  </span>
                  <span className="w-item-desc">{it.desc}</span>
                </li>
              ))}
            </ul>
          </section>

          <section
            className="w-block"
            aria-label={en ? "Research and university" : "研究・大学"}
          >
            <p className="w-label w-reveal">
              {en ? "Research & University" : "研究・大学"}
            </p>
            <ul className="w-list">
              {research.map((it) => (
                <li className="w-item w-reveal" key={it.name}>
                  <span className="w-item-name">{it.name}</span>
                  <span className="w-item-desc">{it.desc}</span>
                </li>
              ))}
            </ul>
          </section>

          <section
            className="w-block"
            aria-label={en ? "Community and speaking" : "コミュニティ・登壇"}
          >
            <p className="w-label w-reveal">
              {en ? "Community & Speaking" : "コミュニティ・登壇"}
            </p>
            <ul className="w-list">
              {community.map((it) => (
                <li className="w-item w-reveal" key={it.name}>
                  <span className="w-item-name">{it.name}</span>
                  <span className="w-item-desc">{it.desc}</span>
                </li>
              ))}
            </ul>
          </section>

          <section
            className="w-block w-about"
            aria-label={en ? "About" : "自己紹介"}
          >
            <p className="w-label w-reveal">{en ? "About" : "自己紹介"}</p>
            <p className="w-prose w-reveal">
              {en ? (
                <>
                  I build AI systems that change how businesses run, and keep
                  them running in production: an AI job matching SaaS, LLM
                  reporting that paying clients rely on, and the workflows
                  behind them. I work both sides of the table: as COO of{" "}
                  <a
                    href="https://cubic-innov8-group.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Cubic Innov8
                  </a>
                  , an IT and innovation group across Kyoto and Sydney, I bring
                  in clients and run operations, then build the systems that
                  serve them. I also built and shipped Vacanti AI, an AI job
                  matching SaaS, as an independent venture. Before this I spent
                  five years in HR at Canon Marketing Japan, then moved to
                  Sydney and completed a Master of Data Science at the
                  University of Technology Sydney. Native Japanese speaker,
                  working in English.
                </>
              ) : (
                <>
                  ビジネスの回り方を変えるAIをつくり、本番で動かし続けています。AIジョブマッチングSaaS、課金クライアントが使うLLMレポーティング、それらを支えるワークフロー。京都とシドニーのIT企業{" "}
                  <a
                    href="https://cubic-innov8-group.com/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Cubic Innov8
                  </a>{" "}
                  のCOOとして、クライアント開拓や運営という事業側と、それを支えるシステムの実装側の両方をやっています。また、独立ベンチャーとして AIジョブマッチングSaaS「Vacanti AI」を一人でつくり、本番公開しました。その前はキヤノンマーケティングジャパンの人事に5年、その後シドニーに渡り、シドニー工科大学でデータサイエンス修士を修了しました。日本語ネイティブ、仕事は英語です。
                </>
              )}
            </p>
          </section>

          <section
            className="w-block w-contact"
            aria-label={en ? "Contact" : "連絡先"}
          >
            <p className="w-label w-reveal">{en ? "Contact" : "連絡先"}</p>
            <div className="w-contact-row w-reveal">
              <a href="mailto:sng1006.trade@gmail.com">Email</a>
              <a
                href="https://www.linkedin.com/in/masaki-kawakami-563643354/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/masaki-kawa"
                target="_blank"
                rel="noreferrer"
              >
                GitHub
              </a>
            </div>
          </section>

          <footer className="w-foot">© 2026 Masaki Kawakami</footer>
        </div>
      </main>

      <div className="w-cue" ref={cueRef}>
        {en ? "Scroll" : "スクロール"}
      </div>
    </div>
  );
}
