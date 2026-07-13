"use client";

/**
 * World v1 — the liquid glass volume.
 *
 * Structure
 *   · fixed WebGL canvas: silver light field (RT) + refracting glass slab
 *   · DOM layers above it: loading emblem, hud, hero type, statement
 *   · a 320vh scroll spacer drives the camera (transform/opacity only)
 *
 * Performance contract (learned the hard way in prototyping):
 *   · rAF reads scrollY once, writes transforms only
 *   · no per-frame layout reads, no per-frame filter/attribute mutation
 *   · DPR capped, canvas paused when the tab is hidden
 *   · prefers-reduced-motion → static frame, no intro
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

const SCROLL_VH = 320; /* total page height in vh; scrub = SCROLL_VH - 100 */

export function World() {
  const { lang, setLang } = useLang();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const stmtRef = useRef<HTMLDivElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);
  const [intro, setIntro] = useState(true);
  const langRef = useRef<Lang>(lang);
  const drawTypeRef = useRef<(l: Lang) => void>(() => {});

  /* intro emblem: a fixed beat, then the world opens */
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

    /* --- pass 1: the light field --- */
    const bgScene = new THREE.Scene();
    const bgCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    /* the name is drawn into the field itself so the glass can bend it */
    const typeCanvas = document.createElement("canvas");
    const typeCtx = typeCanvas.getContext("2d");
    const typeTex = new THREE.CanvasTexture(typeCanvas);
    /* measured extent of the drawn name in uv (y from top). The slab is
       anchored to this every frame, so the overlap is guaranteed by
       construction for any language, viewport or aspect. */
    const typeBounds = { x0: 0.07, x1: 0.4, y0: 0.36, y1: 0.66 };

    function drawType(l: Lang) {
      if (!typeCtx) return;
      const W = typeCanvas.width;
      const H = typeCanvas.height;
      if (W < 2 || H < 2) return;
      typeCtx.clearRect(0, 0, W, H);
      typeCtx.fillStyle = "#131419";
      const size = Math.round(H * 0.125);
      const en = l === "en";
      typeCtx.font = `700 ${size}px ${
        en
          ? '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif'
          : '"Hiragino Sans", "Hiragino Kaku Gothic ProN", sans-serif'
      }`;
      try {
        (
          typeCtx as CanvasRenderingContext2D & { letterSpacing: string }
        ).letterSpacing = `${(en ? -0.035 : 0.03) * size}px`;
      } catch {
        /* tracking is cosmetic; older engines just skip it */
      }
      const x = W * 0.07;
      const l1 = en ? "Masaki" : "川上";
      const l2 = en ? "Kawakami" : "勝基";
      typeCtx.fillText(l1, x, H * 0.5);
      typeCtx.fillText(l2, x, H * 0.635);
      const wMax = Math.max(
        typeCtx.measureText(l1).width,
        typeCtx.measureText(l2).width,
      );
      typeBounds.x0 = 0.07;
      typeBounds.x1 = (x + wMax) / W;
      typeBounds.y0 = (H * 0.5 - size * 0.76) / H;
      typeBounds.y1 = (H * 0.635 + size * 0.06) / H;
      typeTex.needsUpdate = true;
    }
    drawTypeRef.current = drawType;

    const bgUniforms = {
      uRes: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uDrift: { value: 0 },
      tType: { value: typeTex },
      uTypeFade: { value: 1 },
      uTypeShift: { value: 0 },
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
      new THREE.BufferAttribute(new Float32Array([-1, -1, 0, 3, -1, 0, -1, 3, 0]), 3),
    );
    const bgMesh = new THREE.Mesh(tri, bgMat);
    bgMesh.frustumCulled = false;
    bgScene.add(bgMesh);

    const rt = new THREE.WebGLRenderTarget(2, 2, { depthBuffer: false });

    /* --- pass 2: the slab --- */
    const scene = new THREE.Scene();
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
    const lensGeo = new RoundedBoxGeometry(3.1, 1.9, 0.34, 5, 0.17);
    const lens = new THREE.Mesh(lensGeo, lensMat);
    scene.add(lens);

    /* two smaller shards give the volume near/far layers */
    const shardGeo = new RoundedBoxGeometry(0.85, 0.55, 0.16, 4, 0.09);
    const shardA = new THREE.Mesh(shardGeo, lensMat);
    const shardB = new THREE.Mesh(shardGeo, lensMat);
    shardA.position.set(-2.35, 1.35, 1.3);
    shardB.position.set(2.75, -1.55, -1.6);
    scene.add(shardA, shardB);

    /* dust motes: the idle pulse of the world */
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
    scene.add(parts);

    /* --- state driven by scroll + pointer --- */
    let vw = 1;
    let vh = 1;
    let mx = 0;
    let my = 0;
    let tmx = 0;
    let tmy = 0;
    let raf = 0;
    let running = true;

    const hero = heroRef.current;
    const stmt = stmtRef.current;
    const cue = cueRef.current;

    function resize() {
      vw = window.innerWidth;
      vh = window.innerHeight;
      renderer.setSize(vw, vh, false);
      rt.setSize(Math.round(vw * dpr), Math.round(vh * dpr));
      camera.aspect = vw / vh;
      camera.updateProjectionMatrix();
      bgUniforms.uRes.value.set(vw * dpr, vh * dpr);
      typeCanvas.width = Math.min(2048, Math.round(vw * dpr));
      typeCanvas.height = Math.max(2, Math.round(typeCanvas.width * (vh / vw)));
      drawType(langRef.current);
    }
    resize();

    function onPointer(e: PointerEvent) {
      tmx = (e.clientX / vw) * 2 - 1;
      tmy = (e.clientY / vh) * 2 - 1;
    }
    function onVis() {
      running = document.visibilityState === "visible";
      if (running) raf = requestAnimationFrame(frame);
      else cancelAnimationFrame(raf);
    }
    const ease = (x: number) => (x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2);

    const t0 = performance.now();
    function frame(now: number) {
      if (!running) return;
      const time = reduced ? 2.0 : (now - t0) / 1000;

      const scrub = ((SCROLL_VH - 100) / 100) * vh;
      const p = Math.max(0, Math.min(1, window.scrollY / Math.max(1, scrub)));
      /* two acts: A = the glass passes over the name (camera frozen,
         scrub tied 1:1 to scroll) · B = the name departs, the camera
         pushes in, the statement arrives */
      const pA = Math.min(1, p / 0.45);
      const pB = Math.max(0, Math.min(1, (p - 0.45) / 0.55));
      const eB = ease(pB);

      /* pointer smoothing */
      mx += (tmx - mx) * 0.06;
      my += (tmy - my) * 0.06;

      /* camera: frozen during the pass, then a slow push-in */
      camera.position.z = 6 - 2.7 * eB;
      camera.position.x = mx * 0.18 + eB * 0.5;
      camera.position.y = -my * 0.12 + eB * 0.35;
      camera.lookAt(eB * 1.2, eB * 0.5, 0);

      /* the pass: rest position sits clear of the measured name box,
         and scroll carries the slab right-to-left across the letters.
         Camera stays at rest geometry during act A, so the screen
         anchoring is exact for every language and viewport */
      const halfH = Math.tan((35 * Math.PI) / 360) * 6;
      const halfW = halfH * camera.aspect;
      const toWorldX = (u: number) => (u - 0.5) * 2 * halfW;
      const nameCyU = (typeBounds.y0 + typeBounds.y1) / 2;
      const anchorY = (0.5 - nameCyU) * 2 * halfH;
      /* parked: left edge 5% right of the name · done: right edge 5%
         left of the name (fully passed, letters crisp again) */
      const startX = toWorldX(Math.min(0.99, typeBounds.x1 + 0.09)) + 1.72;
      const endX = toWorldX(Math.max(0.02, typeBounds.x0 - 0.07)) - 1.72;

      lens.position.x = startX + (endX - startX) * pA - eB * 1.3;
      lens.position.y =
        anchorY + Math.sin(time * 0.4) * 0.07 - eB * 0.3;
      /* nearly flat while parked (no stray refraction at rest); tilts
         open as it travels so the bend deepens mid-pass */
      lens.rotation.y =
        -0.1 + Math.sin(time * 0.13) * 0.07 + mx * 0.1 - pA * 0.38 + eB * 0.5;
      lens.rotation.x = 0.05 - my * 0.09 + Math.cos(time * 0.17) * 0.05;

      /* shards drift on their own layers: near moves with the pointer,
         far slides away as the camera passes */
      shardA.position.x = -2.35 + mx * 0.5;
      shardA.position.y = 1.35 - my * 0.32 + Math.sin(time * 0.5) * 0.06;
      shardA.rotation.y = 0.42 + Math.sin(time * 0.19) * 0.3 + mx * 0.2;
      shardA.rotation.z = 0.28 + Math.cos(time * 0.16) * 0.08;
      shardB.position.x = 2.75 + mx * 0.16 + eB * 1.4;
      shardB.rotation.y = -0.3 + Math.cos(time * 0.15) * 0.24;

      bgUniforms.uTime.value = time;
      bgUniforms.uDrift.value = eB;
      /* the name stays fully present while the glass passes over it */
      bgUniforms.uTypeFade.value = 1 - Math.min(1, pB * 1.6);
      bgUniforms.uTypeShift.value = eB * 0.34;
      lensUniforms.uTime.value = time;
      partMat.uniforms.uTime.value = time;

      renderer.setRenderTarget(rt);
      renderer.render(bgScene, bgCam);
      renderer.setRenderTarget(null);
      renderer.autoClear = true;
      renderer.render(bgScene, bgCam);
      renderer.autoClear = false;
      renderer.render(scene, camera);
      renderer.autoClear = true;

      /* DOM layers: transforms and opacity only */
      if (hero) {
        hero.style.opacity = String(1 - Math.min(1, pB * 1.8));
        hero.style.transform = `translate3d(0, ${-eB * 0.34 * vh}px, 0)`;
      }
      if (stmt) {
        const sp = Math.max(0, Math.min(1, (pB - 0.35) / 0.4));
        const se = ease(sp);
        stmt.style.opacity = String(se);
        stmt.style.transform = `translate3d(0, ${(1 - se) * 40}px, 0)`;
      }
      if (cue) cue.style.opacity = String(1 - Math.min(1, p * 4));

      raf = requestAnimationFrame(frame);
    }

    window.addEventListener("resize", resize, { passive: true });
    /* some embedded webviews resize the viewport without firing a
       window resize; observe the root element as a reliable backstop */
    const ro = new ResizeObserver(() => resize());
    ro.observe(document.documentElement);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVis);
      tri.dispose();
      lensGeo.dispose();
      shardGeo.dispose();
      partGeo.dispose();
      partMat.dispose();
      bgMat.dispose();
      lensMat.dispose();
      typeTex.dispose();
      rt.dispose();
      renderer.dispose();
    };
  }, []);

  /* redraw the in-field name when the language flips */
  useEffect(() => {
    langRef.current = lang;
    drawTypeRef.current(lang);
  }, [lang]);

  const en = lang === "en";

  return (
    <div className="w-root" data-intro={intro ? "on" : "off"}>
      <canvas ref={canvasRef} className="w-canvas" aria-hidden />
      <div className="w-grain" aria-hidden />

      {/* loading emblem */}
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

      {/* hud */}
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

      {/* hero frame: the name itself lives inside the WebGL field
          (so the glass can bend it); the DOM keeps kicker + sub crisp,
          plus a visually-hidden h1 for semantics and search */}
      <div className="w-hero" ref={heroRef}>
        <h1 className="w-sr">Masaki Kawakami</h1>
        <p className="w-kicker">
          {en ? "Data & AI Analyst · Sydney" : "データ/AIアナリスト・シドニー"}
        </p>
        <p className="w-sub">
          {en
            ? "Systems that stay in production, for real clients."
            : "実クライアントのために、本番で動き続けるシステムを。"}
        </p>
      </div>

      {/* first scroll payoff */}
      <div className="w-stmt" ref={stmtRef}>
        <p>
          {en
            ? "I build data and AI systems that stay in production."
            : "本番で動き続ける、データとAIのシステムをつくる。"}
        </p>
        <span>
          {en
            ? "Five years in HR at Canon. Now shipping for paying clients in Australia and Japan."
            : "キヤノンの人事で5年。いまは日豪の実クライアントに届けている。"}
        </span>
      </div>

      <div className="w-cue" ref={cueRef}>
        {en ? "Scroll" : "スクロール"}
      </div>

      {/* scroll driver */}
      <div style={{ height: `${SCROLL_VH}vh` }} aria-hidden />
    </div>
  );
}
