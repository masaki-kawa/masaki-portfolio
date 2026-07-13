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
import { BG_VERT, BG_FRAG, LENS_VERT, LENS_FRAG } from "@/lib/world/shaders";

const SCROLL_VH = 320; /* total page height in vh; scrub = SCROLL_VH - 100 */

export function World() {
  const { lang, setLang } = useLang();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroRef = useRef<HTMLDivElement | null>(null);
  const stmtRef = useRef<HTMLDivElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);
  const [intro, setIntro] = useState(true);

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
      const e = ease(p);

      /* pointer smoothing */
      mx += (tmx - mx) * 0.06;
      my += (tmy - my) * 0.06;

      /* camera: a slow push-in that drifts past the slab */
      camera.position.z = 6 - 2.7 * e;
      camera.position.x = mx * 0.18 + e * 0.5;
      camera.position.y = -my * 0.12 + e * 0.35;
      camera.lookAt(e * 1.2, e * 0.5, 0);

      /* the slab breathes, tilts to the pointer, steps aside as you pass */
      lens.position.x = e * 2.1;
      lens.position.y = Math.sin(time * 0.4) * 0.06 - e * 0.15;
      lens.rotation.y = -0.32 + mx * 0.1 + e * 0.9 + Math.sin(time * 0.23) * 0.03;
      lens.rotation.x = 0.06 - my * 0.08 + Math.cos(time * 0.31) * 0.02;

      bgUniforms.uTime.value = time;
      bgUniforms.uDrift.value = e;
      lensUniforms.uTime.value = time;

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
        hero.style.opacity = String(1 - Math.min(1, p * 2.1));
        hero.style.transform = `translate3d(0, ${-e * 0.34 * vh}px, 0)`;
      }
      if (stmt) {
        const sp = Math.max(0, Math.min(1, (p - 0.52) / 0.3));
        const se = ease(sp);
        stmt.style.opacity = String(se);
        stmt.style.transform = `translate3d(0, ${(1 - se) * 40}px, 0)`;
      }
      if (cue) cue.style.opacity = String(1 - Math.min(1, p * 4));

      raf = requestAnimationFrame(frame);
    }

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("visibilitychange", onVis);
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVis);
      tri.dispose();
      lensGeo.dispose();
      bgMat.dispose();
      lensMat.dispose();
      rt.dispose();
      renderer.dispose();
    };
  }, []);

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

      {/* hero type */}
      <div className="w-hero" ref={heroRef}>
        <p className="w-kicker">
          {en ? "Data & AI Analyst · Sydney" : "データ/AIアナリスト・シドニー"}
        </p>
        <h1 className="w-name">
          {en ? (
            <>
              <span>Masaki</span>
              <span>Kawakami</span>
            </>
          ) : (
            <>
              <span>川上</span>
              <span>勝基</span>
            </>
          )}
        </h1>
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
