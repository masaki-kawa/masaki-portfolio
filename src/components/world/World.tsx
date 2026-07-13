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

const EN_FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
const JA_FONT = '"Hiragino Sans", "Hiragino Kaku Gothic ProN", sans-serif';

/* glass flight plan: (page progress, screen-x fraction, screen-y fraction) */
const PATH = [
  { p: 0.0, x: 0.76, y: 0.2 },
  { p: 0.3, x: 0.3, y: 0.55 } /* down-left, through the name          */,
  { p: 0.62, x: 0.71, y: 0.62 } /* bank right, meet the statement     */,
  { p: 1.0, x: 0.32, y: 0.9 } /* carry on down-left                   */,
];

type TextQuad = {
  mesh: THREE.Mesh;
  draw: (lines: string[], font: string, spacingEm: number) => void;
  setLineWorld: (lw: number) => void;
  dispose: () => void;
};

function makeTextQuad(align: "left" | "center"): TextQuad {
  const cv = document.createElement("canvas");
  const ctx = cv.getContext("2d");
  const tex = new THREE.CanvasTexture(cv);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
  const mat = new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
    depthWrite: false,
  });
  const geo = new THREE.PlaneGeometry(1, 1);
  const mesh = new THREE.Mesh(geo, mat);
  const state = { aspect: 1, lines: 1, lineWorld: 0.5 };

  function applyScale() {
    /* the canvas holds all lines, so its aspect already covers the full
       block: width = fullHeight * (canvasW / canvasH). No per-line divisor. */
    const h = state.lines * state.lineWorld;
    mesh.scale.set(h * state.aspect, h, 1);
  }
  function draw(lines: string[], font: string, spacingEm: number) {
    if (!ctx) return;
    const px = 220;
    const setFont = () => {
      ctx.font = `700 ${px}px ${font}`;
      try {
        (
          ctx as CanvasRenderingContext2D & { letterSpacing: string }
        ).letterSpacing = `${spacingEm * px}px`;
      } catch {
        /* cosmetic */
      }
    };
    setFont();
    const widths = lines.map((l) => ctx.measureText(l).width);
    const maxW = Math.ceil(Math.max(...widths, 1));
    const lineH = px * 1.14;
    const padX = px * 0.1;
    const ascent = px * 0.78;
    cv.width = maxW + padX * 2;
    cv.height = Math.ceil(ascent + lineH * (lines.length - 1) + px * 0.34);
    setFont(); /* canvas resize resets ctx state */
    ctx.clearRect(0, 0, cv.width, cv.height);
    ctx.fillStyle = "#15161a";
    lines.forEach((l, i) => {
      const w = ctx.measureText(l).width;
      const x = align === "left" ? padX : (cv.width - w) / 2;
      ctx.fillText(l, x, ascent + i * lineH);
    });
    tex.needsUpdate = true;
    state.aspect = cv.width / cv.height;
    state.lines = lines.length;
    applyScale();
  }
  function setLineWorld(lw: number) {
    state.lineWorld = lw;
    applyScale();
  }
  return {
    mesh,
    draw,
    setLineWorld,
    dispose: () => {
      geo.dispose();
      mat.dispose();
      tex.dispose();
    },
  };
}

export function World() {
  const { lang, setLang } = useLang();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroSecRef = useRef<HTMLElement | null>(null);
  const stmtSecRef = useRef<HTMLElement | null>(null);
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

    const nameQuad = makeTextQuad("left");
    nameQuad.setLineWorld(0.52);
    const stmtQuad = makeTextQuad("center");
    stmtQuad.setLineWorld(0.27);
    contentScene.add(nameQuad.mesh, stmtQuad.mesh);

    function redraw(l: Lang) {
      const en = l === "en";
      nameQuad.draw(
        en ? ["Masaki", "Kawakami"] : ["川上", "勝基"],
        en ? EN_FONT : JA_FONT,
        en ? -0.035 : 0.03,
      );
      stmtQuad.draw(
        en
          ? ["I build data and AI", "systems that stay", "in production."]
          : ["本番で動き続ける、", "データとAIの", "システムをつくる。"],
        en ? EN_FONT : JA_FONT,
        en ? -0.025 : 0.01,
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
    let stmtTop = 0;
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
      stmtTop = stmtSecRef.current ? stmtSecRef.current.offsetTop : vh;
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

    function samplePath(p: number) {
      const last = PATH[PATH.length - 1];
      if (p <= PATH[0].p) return { x: PATH[0].x, y: PATH[0].y };
      if (p >= last.p) return { x: last.x, y: last.y };
      for (let i = 0; i < PATH.length - 1; i++) {
        const a = PATH[i];
        const b = PATH[i + 1];
        if (p >= a.p && p <= b.p) {
          const t = easeIO((p - a.p) / (b.p - a.p));
          return { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
        }
      }
      return { x: last.x, y: last.y };
    }

    const t0 = performance.now();
    function frame(now: number) {
      if (!running) return;
      const time = reduced ? 2.0 : (now - t0) / 1000;
      const y = window.scrollY;
      const p = Math.max(0, Math.min(1, y / Math.max(1, docH - vh)));

      mx += (tmx - mx) * 0.06;
      my += (tmy - my) * 0.06;

      /* display type follows the document exactly */
      const nameV = (heroTop + vh * 0.5 - y) / vh;
      nameQuad.mesh.position.set(
        toWorldX(0.07) + nameQuad.mesh.scale.x / 2,
        toWorldY(nameV),
        0,
      );
      const stmtV = (stmtTop + vh * 0.45 - y) / vh;
      stmtQuad.mesh.position.set(0, toWorldY(stmtV), 0);

      /* the glass flies its plan; smoothing polishes, never gates */
      const wp = samplePath(p);
      const txw = toWorldX(wp.x);
      const tyw = toWorldY(wp.y);
      if (!gInit) {
        gx = txw;
        gy = tyw;
        gInit = true;
      }
      const k = reduced ? 1 : 0.16;
      gx += (txw - gx) * k;
      gy += (tyw - gy) * k;

      /* bank into the direction of travel */
      const ahead = samplePath(Math.min(1, p + 0.02));
      const bank = Math.atan2(
        toWorldY(ahead.y) - tyw,
        toWorldX(ahead.x) - txw + 1e-5,
      );

      lens.position.set(gx, gy + Math.sin(time * 0.4) * 0.05, 0);
      lens.rotation.y = -0.16 + Math.sin(time * 0.13) * 0.07 + mx * 0.1;
      lens.rotation.x = 0.04 - my * 0.08 + Math.cos(time * 0.17) * 0.04;
      lens.rotation.z = reduced ? 0 : Math.max(-0.2, Math.min(0.2, bank * 0.1));

      /* shards start off-screen and drift in with scroll, so the hero
         top stays clean — no clipped fragment glinting in the corner */
      shardA.position.x = -2.6 + mx * 0.5 + p * 0.7;
      shardA.position.y =
        2.9 - p * 2.6 - my * 0.32 + Math.sin(time * 0.5) * 0.06;
      shardA.rotation.y = 0.42 + Math.sin(time * 0.19) * 0.3 + mx * 0.2;
      shardB.position.x = 2.9 + mx * 0.16;
      shardB.position.y = -2.9 + p * 1.7;
      shardB.rotation.y = -0.3 + Math.cos(time * 0.15) * 0.24;

      /* glass camera carries the pointer parallax; content stays true */
      camera.position.x = mx * 0.1;
      camera.position.y = -my * 0.07;
      camera.lookAt(0, 0, 0);

      bgUniforms.uTime.value = time;
      bgUniforms.uDrift.value = p;
      lensUniforms.uTime.value = time;
      partMat.uniforms.uTime.value = time;

      renderer.setRenderTarget(rt);
      renderer.render(fieldScene, bgCam);
      renderer.autoClear = false;
      renderer.render(contentScene, contentCam);
      renderer.autoClear = true;
      renderer.setRenderTarget(null);
      renderer.render(fieldScene, bgCam);
      renderer.autoClear = false;
      renderer.render(contentScene, contentCam);
      renderer.render(glassScene, camera);
      renderer.autoClear = true;

      if (cue) cue.style.opacity = String(1 - Math.min(1, p * 6));

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
      stmtQuad.dispose();
      rt.dispose();
      renderer.dispose();
    };
  }, []);

  /* language flip: re-rasterize the display type */
  useEffect(() => {
    langRef.current = lang;
    redrawRef.current(lang);
  }, [lang]);

  const en = lang === "en";

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
            {en ? "Data & AI Analyst · Sydney" : "データ/AIアナリスト・シドニー"}
          </p>
          <p className="w-sub">
            {en
              ? "Systems that stay in production, for real clients."
              : "実クライアントのために、本番で動き続けるシステムを。"}
          </p>
        </section>

        <section className="w-sec w-sec-stmt" ref={stmtSecRef}>
          <p className="w-cap">
            {en
              ? "Five years in HR at Canon. Now shipping analytics and LLM systems for paying clients across Australia and Japan."
              : "キヤノンの人事で5年。いまは日豪の実クライアントに向けて、分析とLLMのシステムを届けている。"}
          </p>
        </section>

        <section className="w-sec w-tail" aria-hidden />
      </main>

      <div className="w-cue" ref={cueRef}>
        {en ? "Scroll" : "スクロール"}
      </div>
    </div>
  );
}
