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

import { useEffect, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { useLang } from "@/components/lang-provider";
import type { Lang } from "@/types/lang";
import {
  BG_VERT,
  SCENE_FRAG,
  LENS_VERT,
  LENS_FRAG,
  PART_VERT,
  PART_FRAG,
} from "@/lib/world/shaders";
import { makeTextBlock, EN_FONT, JA_FONT } from "@/lib/world/text-block";
import Link from "next/link";
import Image from "next/image";
import { WORK, RESEARCH } from "@/lib/content/work";
import { GlassFilter } from "@/components/world/GlassFilter";
import { Media } from "@/components/world/Media";

/* lens half extents in world units (geometry is 3.0 x 1.85). The flight
   plan is derived from the measured text blocks, not hand-tuned points:
   during a pass the lens position is defined RELATIVE to the block, so
   the diagonal traverse covers every letter on any language, viewport
   or scroll speed — coverage by construction. */
const LENS_HW = 1.5;
const LENS_HH = 0.925;

/* the page is a chaptered journey; the rail and scene caption follow */
const CHAPTERS = [
  { id: "00", en: "PROLOGUE", ja: "序章" },
  { id: "01", en: "WORK", ja: "仕事" },
  { id: "02", en: "RESEARCH", ja: "研究" },
  { id: "03", en: "COMMUNITY", ja: "コミュニティ" },
  { id: "04", en: "ABOUT", ja: "自己紹介" },
  { id: "05", en: "CONTACT", ja: "連絡先" },
];
const CH_MODE = ["light", "dark", "dark", "light", "light", "light"];


export function World() {
  const { lang, setLang } = useLang();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const heroSecRef = useRef<HTMLElement | null>(null);
  const cueRef = useRef<HTMLDivElement | null>(null);
  const [intro, setIntro] = useState(true);
  const langRef = useRef<Lang>(lang);
  const redrawRef = useRef<(l: Lang) => void>(() => {});
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [slide, setSlide] = useState(0);
  const [detail, setDetail] = useState(0);
  const [aboutOpen, setAboutOpen] = useState<number | null>(null);
  const [ch, setCh] = useState(0);
  const railFillRef = useRef<HTMLSpanElement | null>(null);
  const cursorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    /* the emblem plays once per session; returning from a detail page
       goes straight to the world */
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem("w-intro") === "1";
    if (reduced || seen) {
      setIntro(false);
      return;
    }
    sessionStorage.setItem("w-intro", "1");
    const t = setTimeout(() => setIntro(false), 1700);
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

    /* --- the light field / journey scenes --- */
    const fieldScene = new THREE.Scene();
    const bgCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    /* photo backdrops per chapter: drop images at
       public/scenes/ch01.jpg … ch05.jpg (png also works) and they
       replace the tinted procedural placeholders automatically */
    const dummyTex = new THREE.DataTexture(
      new Uint8Array([255, 255, 255, 255]),
      1,
      1,
    );
    dummyTex.needsUpdate = true;
    const SCENE_TINTS = [
      new THREE.Vector3(1, 1, 1) /* prologue: pure silver world */,
      new THREE.Vector3(0.52, 0.56, 0.72) /* tokyo night placeholder */,
      new THREE.Vector3(0.47, 0.5, 0.6) /* skytree fog placeholder */,
      new THREE.Vector3(1.06, 0.99, 0.9) /* sydney dawn placeholder */,
      new THREE.Vector3(1.0, 1.0, 1.02) /* harbour day placeholder */,
      new THREE.Vector3(0.92, 0.99, 1.1) /* above clouds placeholder */,
    ];
    const sceneTex: (THREE.Texture | null)[] = [
      null,
      null,
      null,
      null,
      null,
      null,
    ];
    const texLoader = new THREE.TextureLoader();
    for (let s = 1; s <= 5; s++) {
      const apply = (t: THREE.Texture) => {
        t.minFilter = THREE.LinearFilter;
        t.magFilter = THREE.LinearFilter;
        t.generateMipmaps = false;
        sceneTex[s] = t;
      };
      texLoader.load(`/scenes/ch0${s}.jpg`, apply, undefined, () => {
        texLoader.load(`/scenes/ch0${s}.png`, apply, undefined, () => {});
      });
    }

    const bgUniforms = {
      uRes: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uDrift: { value: 0 },
      uDark: { value: 0 },
      tA: { value: dummyTex as THREE.Texture },
      tB: { value: dummyTex as THREE.Texture },
      uASize: { value: new THREE.Vector2(16, 9) },
      uBSize: { value: new THREE.Vector2(16, 9) },
      uAProc: { value: 1 },
      uBProc: { value: 1 },
      uATint: { value: new THREE.Vector3(1, 1, 1) },
      uBTint: { value: new THREE.Vector3(1, 1, 1) },
      uKbA: { value: 0 },
      uKbB: { value: 0 },
      uProg: { value: 0 },
      uType: { value: 0 },
    };
    const bgMat = new THREE.ShaderMaterial({
      vertexShader: BG_VERT,
      fragmentShader: SCENE_FRAG,
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
      uRefr: { value: 0.1 },
      uSplit: { value: 0.22 },
      uTime: { value: 0 },
      uFlash: { value: 0 },
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

    /* soft contact shadow: grounds the glass on the bright field so it
       never reads as a washed-out outline on white */
    const shCv = document.createElement("canvas");
    shCv.width = 256;
    shCv.height = 256;
    const shCtx = shCv.getContext("2d");
    if (shCtx) {
      const g = shCtx.createRadialGradient(128, 128, 10, 128, 128, 126);
      g.addColorStop(0, "rgba(24, 28, 36, 0.34)");
      g.addColorStop(0.55, "rgba(24, 28, 36, 0.12)");
      g.addColorStop(1, "rgba(24, 28, 36, 0)");
      shCtx.fillStyle = g;
      shCtx.fillRect(0, 0, 256, 256);
    }
    const shTex = new THREE.CanvasTexture(shCv);
    const shGeo = new THREE.PlaneGeometry(1, 1);
    const shMat = new THREE.MeshBasicMaterial({
      map: shTex,
      transparent: true,
      depthWrite: false,
    });
    const shadow = new THREE.Mesh(shGeo, shMat);
    shadow.scale.set(4.7, 2.9, 1);
    shadow.position.z = -0.5;
    glassScene.add(shadow);

    /* comet swarm state: home positions, live positions, velocities,
       glow (proximity to the glass) and per-mote swirl direction */
    const PART_N = 240;
    const partGeo = new THREE.BufferGeometry();
    const pBase = new Float32Array(PART_N * 3);
    const pVel = new Float32Array(PART_N * 3);
    const pSeed = new Float32Array(PART_N);
    const pGlow = new Float32Array(PART_N);
    const pSwirl = new Float32Array(PART_N);
    for (let i = 0; i < PART_N; i++) {
      pBase[i * 3] = (Math.random() * 2 - 1) * 5.2;
      pBase[i * 3 + 1] = (Math.random() * 2 - 1) * 2.8;
      pBase[i * 3 + 2] = -2.6 + Math.random() * 4.2;
      pSeed[i] = Math.random();
      pSwirl[i] = Math.random() < 0.5 ? -1 : 1;
    }
    const pPos = pBase.slice();
    const posAttr = new THREE.BufferAttribute(pPos, 3);
    posAttr.setUsage(THREE.DynamicDrawUsage);
    const glowAttr = new THREE.BufferAttribute(pGlow, 1);
    glowAttr.setUsage(THREE.DynamicDrawUsage);
    partGeo.setAttribute("position", posAttr);
    partGeo.setAttribute("aSeed", new THREE.BufferAttribute(pSeed, 1));
    partGeo.setAttribute("aGlow", glowAttr);
    const partMat = new THREE.ShaderMaterial({
      vertexShader: PART_VERT,
      fragmentShader: PART_FRAG,
      uniforms: { uTime: { value: 0 }, uBoost: { value: 0 } },
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
    let pcx = -100;
    let pcy = -100;
    let pcxT = -100;
    let pcyT = -100;
    let uDarkV = 0;
    let chRects: { top: number; h: number; dark: boolean }[] = [];
    let gx = 0;
    let gy = 0;
    let pgx = 0;
    let roll = 0;
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
      chRects = Array.from(
        document.querySelectorAll<HTMLElement>("[data-ch]"),
      ).map((el) => ({
        top: el.offsetTop,
        h: el.offsetHeight,
        dark: el.dataset.mode === "dark",
      }));
    }
    measure();
    redraw(langRef.current);

    const HALF_H = Math.tan((35 * Math.PI) / 360) * 6;
    const toWorldX = (u: number) => (u - 0.5) * 2 * HALF_H * (vw / vh);
    const toWorldY = (v: number) => (0.5 - v) * 2 * HALF_H;

    function onPointer(e: PointerEvent) {
      tmx = (e.clientX / vw) * 2 - 1;
      tmy = (e.clientY / vh) * 2 - 1;
      pcxT = e.clientX;
      pcyT = e.clientY;
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
      /* after the sweep the lens glides to centre stage and waits:
         scroll then carries the camera straight through the glass */
      const t2 = easeIO(Math.min(1, (yy - nB) / (vh * 0.35)));
      return lerp2(nameExit, { x: 0, y: 0 }, t2);
    }

    const t0 = performance.now();
    let lastNow = t0;
    function frame(now: number) {
      if (!running) return;
      const time = reduced ? 2.0 : (now - t0) / 1000;
      const dt = Math.min(0.033, Math.max(0.001, (now - lastNow) / 1000));
      lastNow = now;
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

      /* the glass flies its plan; smoothing polishes, never gates.
         In the hero it also leans toward the pointer: a nudge, not a grab */
      const wp = lensTarget(y);
      const heroPull = reduced ? 0 : Math.max(0, 1 - y / (vh * 0.55));
      const pwx = mx * HALF_H * (vw / vh);
      const pwy = -my * HALF_H;
      const txw =
        wp.x + Math.max(-1, Math.min(1, (pwx - wp.x) * 0.24 * heroPull));
      const tyw =
        wp.y + Math.max(-0.7, Math.min(0.7, (pwy - wp.y) * 0.2 * heroPull));
      if (!gInit) {
        gx = txw;
        gy = tyw;
        pgx = txw;
        gInit = true;
      }
      const k = reduced ? 1 : 0.22;
      gx += (txw - gx) * k;
      gy += (tyw - gy) * k;

      /* bank smoothly into actual horizontal motion: velocity-based and
         then low-passed, so the roll eases through changes of direction
         instead of snapping between leans. Level at rest. */
      const vx = gx - pgx;
      pgx = gx;
      const targetRoll = Math.max(-0.14, Math.min(0.14, vx * 1.5));
      roll += (targetRoll - roll) * (reduced ? 1 : 0.05);

      /* fly-through: past the sweep the camera passes THROUGH the
         glass. Entirely scroll-driven; nothing ever gates the page */
      const fA = vh * 0.62;
      const fB = vh * 1.55;
      const flyT = reduced
        ? y > fA
          ? 1
          : 0
        : Math.max(0, Math.min(1, (y - fA) / (fB - fA)));
      const zFly = flyT * flyT * flyT * 7.6;
      const through = zFly > 6.35;
      lens.visible = !through;
      shadow.visible = flyT < 0.4;

      const calm = 1 - flyT;
      lens.position.set(gx, gy + Math.sin(time * 0.4) * 0.05 * calm, zFly);
      shadow.position.set(gx + 0.14, gy - 1.08, -0.5);
      lens.rotation.y =
        (-0.16 + Math.sin(time * 0.13) * 0.07 + mx * 0.1) * calm;
      lens.rotation.x =
        (0.04 - my * 0.08 + Math.cos(time * 0.17) * 0.04) * calm;
      lens.rotation.z = roll * calm;

      /* white burst exactly as the face crosses the camera plane */
      const flash = reduced ? 0 : Math.exp(-Math.pow(zFly - 5.9, 2) / 0.35);
      lensUniforms.uFlash.value = flash * 0.9;
      lensUniforms.uSplit.value = 0.22 + flash * 0.55;

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

      /* comet swarm: motes inside the glass's reach fall toward it and
         orbit; the rest drift gently around their home spots. When the
         glass travels they lag into a tail behind it */
      if (!reduced) {
        const lx = lens.position.x;
        const ly = lens.position.y;
        const lensOn = lens.visible;
        for (let i = 0; i < PART_N; i++) {
          const i3 = i * 3;
          const sd = pSeed[i];
          const hx = pBase[i3] + Math.sin(time * 0.14 + sd * 6.2831) * 0.28;
          const hy = pBase[i3 + 1] + Math.cos(time * 0.1 + sd * 9.42) * 0.22;
          const hz = pBase[i3 + 2];
          const px = pPos[i3];
          const py = pPos[i3 + 1];
          const pz = pPos[i3 + 2];
          const dx = lx - px;
          const dy = ly - py;
          const dz = -pz;
          const r = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.001;
          let ax: number;
          let ay: number;
          let az: number;
          let gT = 0;
          if (lensOn && r < 2.7) {
            const ux = dx / r;
            const uy = dy / r;
            const uz = dz / r;
            let pull = 3.2 / Math.max(r * r, 0.35);
            if (r < 0.62) pull -= (0.62 - r) * 30; /* ring, not a clump */
            const s = (pSwirl[i] * 2.1) / Math.max(r, 0.5);
            ax = ux * pull - uy * s;
            ay = uy * pull + ux * s;
            az = uz * pull * 0.6;
            gT = Math.max(0, Math.min(1, 1.6 - r * 0.6));
          } else {
            ax = (hx - px) * 0.5;
            ay = (hy - py) * 0.5;
            az = (hz - pz) * 0.5;
          }
          pVel[i3] = (pVel[i3] + ax * dt) * 0.94;
          pVel[i3 + 1] = (pVel[i3 + 1] + ay * dt) * 0.94;
          pVel[i3 + 2] = (pVel[i3 + 2] + az * dt) * 0.94;
          pPos[i3] += pVel[i3] * dt;
          pPos[i3 + 1] += pVel[i3 + 1] * dt;
          pPos[i3 + 2] += pVel[i3 + 2] * dt;
          pGlow[i] += (gT - pGlow[i]) * 0.1;
        }
        posAttr.needsUpdate = true;
        glowAttr.needsUpdate = true;
      }

      bgUniforms.uTime.value = time;
      bgUniforms.uDrift.value = hp;
      lensUniforms.uTime.value = time;
      partMat.uniforms.uTime.value = time;

      /* field state: dark chapters sink the world into graphite; the
         fly-through itself hands you into the first dark chapter */
      const midY = y + vh * 0.5;
      let darkT = 0;
      let ci = 0;
      for (let i = 0; i < chRects.length; i++) {
        const r = chRects[i];
        if (midY >= r.top && midY < r.top + r.h) {
          darkT = r.dark ? 1 : 0;
          ci = i;
          break;
        }
        if (midY >= r.top) ci = i;
      }
      darkT = Math.max(darkT, flyT * 0.9);
      uDarkV += (darkT - uDarkV) * (reduced ? 1 : 0.06);
      bgUniforms.uDark.value = uDarkV;
      partMat.uniforms.uBoost.value = uDarkV;

      /* which scene pair is on stage, and which transition plays.
         Boundary types: 0 fade under the fly-through flash,
         1 glass wipe, 4 vertical travel, 2 blinds, 3 exposure burst */
      const TR_TYPES = [0, 1, 4, 2, 3];
      let aIdx = ci;
      let bIdx = Math.min(ci + 1, 5);
      let trProg = 0;
      let trType = 0;
      if (chRects.length >= 6) {
        if (ci === 0 || (ci === 1 && flyT < 1)) {
          aIdx = 0;
          bIdx = 1;
          trProg = flyT;
          trType = 0;
        } else {
          const zone = vh * 0.5;
          for (let k = 1; k < 5; k++) {
            const bTop = chRects[k + 1].top;
            if (Math.abs(midY - bTop) < zone) {
              const tt = (midY - (bTop - zone)) / (2 * zone);
              trProg = tt * tt * (3 - 2 * tt);
              aIdx = k;
              bIdx = k + 1;
              trType = TR_TYPES[k];
              break;
            }
          }
        }
      }
      const kbOf = (idx: number) => {
        const r = chRects[idx];
        if (!r) return 0;
        return Math.max(0, Math.min(1, (midY - r.top) / Math.max(1, r.h)));
      };
      const setSlot = (
        texU: { value: THREE.Texture },
        sizeU: { value: THREE.Vector2 },
        procU: { value: number },
        tintU: { value: THREE.Vector3 },
        idx: number,
      ) => {
        const t = sceneTex[idx];
        const img = t?.image as { width: number; height: number } | undefined;
        if (t && img) {
          texU.value = t;
          sizeU.value.set(img.width, img.height);
          procU.value = 0;
        } else {
          texU.value = dummyTex;
          procU.value = 1;
          tintU.value.copy(SCENE_TINTS[idx]);
        }
      };
      setSlot(
        bgUniforms.tA,
        bgUniforms.uASize,
        bgUniforms.uAProc,
        bgUniforms.uATint,
        aIdx,
      );
      setSlot(
        bgUniforms.tB,
        bgUniforms.uBSize,
        bgUniforms.uBProc,
        bgUniforms.uBTint,
        bIdx,
      );
      bgUniforms.uKbA.value = kbOf(aIdx);
      bgUniforms.uKbB.value = kbOf(bIdx);
      bgUniforms.uProg.value = trProg;
      bgUniforms.uType.value = trType;

      /* rail progress + ring cursor: transform-only writes */
      if (railFillRef.current) {
        railFillRef.current.style.transform = `scaleY(${p})`;
      }
      if (cursorRef.current) {
        pcx += (pcxT - pcx) * 0.3;
        pcy += (pcyT - pcy) * 0.3;
        cursorRef.current.style.transform = `translate3d(${pcx}px, ${pcy}px, 0)`;
      }

      /* the content sheet is translucent frost, so the world and the
         gliding glass stay visible behind it — draw every frame */
      /* RT holds the resolved world (solid ink); only the lens reads it */
      renderer.setRenderTarget(rt);
      renderer.render(fieldScene, bgCam);
      renderer.autoClear = false;
      contentCam.layers.set(1);
      renderer.render(contentScene, contentCam);
      renderer.autoClear = true;
      /* the name is solid and readable on screen; the lens glides over
         it as clear glass, refracting rather than hiding it */
      renderer.setRenderTarget(null);
      renderer.render(fieldScene, bgCam);
      renderer.autoClear = false;
      contentCam.layers.set(1);
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
      shGeo.dispose();
      shMat.dispose();
      shTex.dispose();
      partGeo.dispose();
      partMat.dispose();
      bgMat.dispose();
      lensMat.dispose();
      nameQuad.dispose();
      sceneTex.forEach((t) => t?.dispose());
      dummyTex.dispose();
      rt.dispose();
      renderer.dispose();
    };
  }, []);

  /* chapter rail + scene caption follow whichever chapter crosses the
     middle of the viewport */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const n = Number((e.target as HTMLElement).dataset.ch);
            if (!Number.isNaN(n)) setCh(n);
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );
    document.querySelectorAll("[data-ch]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* the ring cursor grows over anything interactive */
  useEffect(() => {
    const onOver = (e: MouseEvent) => {
      const hit = (e.target as HTMLElement | null)?.closest?.("a, button");
      cursorRef.current?.classList.toggle("big", !!hit);
    };
    document.addEventListener("mouseover", onOver, { passive: true });
    return () => document.removeEventListener("mouseover", onOver);
  }, []);

  /* about modal: Esc closes, page scroll locks while open */
  useEffect(() => {
    if (aboutOpen === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setAboutOpen(null);
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [aboutOpen]);

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

  /* content comes from lib/content/work.ts (shared with the detail
     pages); visual slots fill from public/work/<slug>.png */
  const pick = (l: { en: string; ja: string }) => (en ? l.en : l.ja);
  const workItems = WORK.map((w) => ({
    slug: w.slug,
    name: w.name,
    tag: w.tag ? pick(w.tag) : undefined,
    desc: pick(w.desc),
  }));
  const researchItems = RESEARCH.map((w) => ({
    slug: w.slug,
    name: w.name,
    desc: pick(w.desc),
    detail: pick(w.detail),
  }));

  function goTo(i: number) {
    const t = trackRef.current;
    if (!t) return;
    const kids = Array.from(t.children) as HTMLElement[];
    const j = Math.max(0, Math.min(kids.length - 1, i));
    const el = kids[j];
    t.scrollTo({
      left: el.offsetLeft - (t.clientWidth - el.clientWidth) / 2,
      behavior: "smooth",
    });
  }
  function onTrackScroll() {
    const t = trackRef.current;
    const first = t?.firstElementChild as HTMLElement | null;
    if (!t || !first) return;
    const w = first.clientWidth + 22;
    setSlide(
      Math.max(0, Math.min(workItems.length - 1, Math.round(t.scrollLeft / w))),
    );
  }

  const community = en
    ? [
        {
          slug: "ai-salon",
          name: "AI Salon Sydney",
          desc: "Co-organiser of AI community events in Sydney.",
        },
        {
          slug: "workshops",
          name: "Workshops",
          desc: "Speaker at Sydney community workshops: LinkedIn, Notion, and Claude Code next.",
        },
      ]
    : [
        {
          slug: "ai-salon",
          name: "AI Salon Sydney",
          desc: "シドニーのAIコミュニティイベントを共同運営。",
        },
        {
          slug: "workshops",
          name: "Workshops",
          desc: "シドニーのコミュニティワークショップに登壇。LinkedIn、Notion、次は Claude Code。",
        },
      ];

  /* About: three cards; the plus opens an Apple-style modal */
  const aboutCards: { lead: string; body: ReactNode }[] = [
    {
      lead: en
        ? "AI systems that stay in production."
        : "本番で動き続けるAIをつくる。",
      body: en
        ? "An AI job matching SaaS, LLM reporting that paying clients rely on, and the workflows behind them. I build them and keep them running."
        : "AIジョブマッチングSaaS、課金クライアントが使うLLMレポーティング、それらを支えるワークフロー。つくって、動かし続ける。",
    },
    {
      lead: en
        ? "Business and build, both sides."
        : "事業と実装、その両方。",
      body: en ? (
        <>
          As COO of{" "}
          <a
            href="https://cubic-innov8-group.com/"
            target="_blank"
            rel="noreferrer"
          >
            Cubic Innov8
          </a>
          , an IT and innovation group across Kyoto and Sydney, I bring in
          clients and run operations, then build the systems that serve them. I
          also built and shipped Vacanti AI as an independent venture.
        </>
      ) : (
        <>
          京都とシドニーのIT企業{" "}
          <a
            href="https://cubic-innov8-group.com/"
            target="_blank"
            rel="noreferrer"
          >
            Cubic Innov8
          </a>{" "}
          のCOOとして、クライアント開拓や運営という事業側と、それを支える実装側の両方。独立ベンチャーとして
          Vacanti AI もつくり、本番公開。
        </>
      ),
    },
    {
      lead: en ? "From HR to data science." : "人事からデータサイエンスへ。",
      body: en
        ? "Five years in HR at Canon Marketing Japan, then a Master of Data Science at the University of Technology Sydney. Native Japanese speaker based in Sydney, working in English."
        : "キヤノンマーケティングジャパンの人事に5年。その後シドニーへ渡り、シドニー工科大学でデータサイエンス修士を修了。日本語ネイティブ、仕事は英語。",
    },
  ];

  return (
    <div className="w-root" data-intro={intro ? "on" : "off"}>
      <GlassFilter />
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
        <Link className="w-avatar" href="/" aria-label="Masaki Kawakami">
          <Image
            src="/avatar.png"
            alt="Masaki Kawakami"
            width={64}
            height={64}
            priority
          />
        </Link>
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
        <section
          className="w-sec w-sec-hero c-ch"
          data-ch="0"
          data-mode="light"
          ref={heroSecRef}
        >
          <h1 className="w-sr">Masaki Kawakami</h1>
          <p className="w-kicker">
            {en ? "Data & AI · Sydney" : "データ & AI · シドニー"}
          </p>
        </section>

        {/* Work: full-width highlights carousel, one slide per project */}
        <section
          id="work"
          className="w-carsec c-ch"
          data-ch="1"
          data-mode="dark"
          aria-label={en ? "Work" : "仕事"}
        >
          <div className="w-carhead">
            <span className="c-chnum w-reveal" aria-hidden>
              01
            </span>
            <p className="w-label w-reveal">{en ? "Work" : "仕事"}</p>
            <h2 className="w-headline w-reveal">
              {en ? "Start with the work." : "まずは、仕事から。"}
            </h2>
          </div>
          <div className="w-cartrack" ref={trackRef} onScroll={onTrackScroll}>
            {workItems.map((it, i) => (
              <Link
                className="w-slide"
                href={`/work/${it.slug}`}
                key={it.slug}
              >
                <span className="w-slide-num" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Media className="w-slide-media" slug={it.slug} />
                <div className="w-slide-cap">
                  <h3 className="w-slide-name">
                    {it.name}
                    {it.tag ? <em className="w-tag">{it.tag}</em> : null}
                  </h3>
                  <p className="w-slide-desc">{it.desc}</p>
                  <span className="w-slide-plus" aria-hidden>
                    +
                  </span>
                </div>
              </Link>
            ))}
          </div>
          <div className="w-carctl">
            <button
              className="w-arrow"
              aria-label={en ? "Previous" : "前へ"}
              onClick={() => goTo(slide - 1)}
            >
              ‹
            </button>
            <div className="w-dots">
              {workItems.map((it, i) => (
                <button
                  key={it.slug}
                  className={i === slide ? "w-dot on" : "w-dot"}
                  aria-label={it.name}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <button
              className="w-arrow"
              aria-label={en ? "Next" : "次へ"}
              onClick={() => goTo(slide + 1)}
            >
              ›
            </button>
            <span className="w-count" aria-hidden>
              {String(slide + 1).padStart(2, "0")} /{" "}
              {String(workItems.length).padStart(2, "0")}
            </span>
          </div>
        </section>

        {/* Research & University: pick one, the visual and copy follow */}
        <section
          className="w-detsec c-ch"
          data-ch="2"
          data-mode="dark"
          aria-label={en ? "Research and university" : "研究・大学"}
        >
          <div className="w-carhead">
            <span className="c-chnum w-reveal" aria-hidden>
              02
            </span>
            <p className="w-label w-reveal">
              {en ? "Research & University" : "研究・大学"}
            </p>
            <h2 className="w-headline w-reveal">
              {en ? "Take a closer look." : "近づいて見る。"}
            </h2>
          </div>
          <div className="w-detgrid">
            <div className="w-detlist">
              {researchItems.map((it, i) => (
                <div className={i === detail ? "w-det on" : "w-det"} key={it.slug}>
                  <button
                    className="w-det-pill"
                    onClick={() => setDetail(i)}
                    aria-expanded={i === detail}
                  >
                    <span className="w-det-plus" aria-hidden>
                      +
                    </span>
                    <span className="w-det-num" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {it.name}
                  </button>
                  <div className="w-det-body">
                    <div className="w-det-inner">
                      <p>{it.detail}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Media
              key={researchItems[detail].slug}
              className="w-detvis"
              slug={researchItems[detail].slug}
            />
          </div>
        </section>

        {/* Community: two large photo cards */}
        <section
          className="w-comsec c-ch"
          data-ch="3"
          data-mode="light"
          aria-label={en ? "Community and speaking" : "コミュニティ・登壇"}
        >
          <div className="w-carhead">
            <span className="c-chnum w-reveal" aria-hidden>
              03
            </span>
            <p className="w-label w-reveal">
              {en ? "Community & Speaking" : "コミュニティ・登壇"}
            </p>
            <h2 className="w-headline w-reveal">
              {en ? "Out in the community." : "コミュニティでも。"}
            </h2>
          </div>
          <div className="w-two">
            {community.map((it) => (
              <figure className="w-photo w-reveal" key={it.slug}>
                <Media className="w-photo-media" slug={it.slug} />
                <figcaption className="w-photo-cap">
                  <strong>{it.name}.</strong> {it.desc}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* About: three cards, plus to expand */}
        <section
          className="w-aboutsec c-ch"
          data-ch="4"
          data-mode="light"
          aria-label={en ? "About" : "自己紹介"}
        >
          <div className="w-carhead">
            <span className="c-chnum w-reveal" aria-hidden>
              04
            </span>
            <p className="w-label w-reveal">{en ? "About" : "自己紹介"}</p>
            <h2 className="w-headline w-reveal">
              {en ? "Who's building this." : "つくっている人。"}
            </h2>
          </div>
          <div className="w-three">
            {aboutCards.map((c, i) => (
              <div className="w-acard w-reveal" key={c.lead}>
                <p className="w-acard-lead">{c.lead}</p>
                <button
                  className="w-acard-plus"
                  aria-haspopup="dialog"
                  aria-label={en ? "More" : "詳しく"}
                  onClick={() => setAboutOpen(i)}
                >
                  +
                </button>
              </div>
            ))}
          </div>
        </section>

        <div className="w-flow c-ch" data-ch="5" data-mode="light">
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
        {en ? "Scroll to begin" : "スクロールで始まる"}
      </div>

      <div
        className={CH_MODE[ch] === "dark" ? "c-rail on-dark" : "c-rail"}
        aria-hidden
      >
        <span className="c-rail-ch">CH.{CHAPTERS[ch].id}</span>
        <span className="c-rail-line">
          <span className="c-rail-fill" ref={railFillRef} />
        </span>
        <span className="c-rail-label">
          {en ? CHAPTERS[ch].en : CHAPTERS[ch].ja}
        </span>
      </div>
      <div
        className={CH_MODE[ch] === "dark" ? "c-scene on-dark" : "c-scene"}
        aria-hidden
      >
        SCENE {CHAPTERS[ch].id} / {en ? CHAPTERS[ch].en : CHAPTERS[ch].ja}
      </div>
      <div className="c-cursor" ref={cursorRef} aria-hidden>
        <span className="c-cursor-ring" />
      </div>

      {aboutOpen !== null && (
        <div
          className="w-modal"
          role="dialog"
          aria-modal="true"
          aria-label={aboutCards[aboutOpen].lead}
          onClick={() => setAboutOpen(null)}
        >
          <div className="w-modal-card" onClick={(e) => e.stopPropagation()}>
            <button
              className="w-modal-x"
              aria-label={en ? "Close" : "閉じる"}
              onClick={() => setAboutOpen(null)}
            >
              ×
            </button>
            <h3 className="w-modal-title">{aboutCards[aboutOpen].lead}</h3>
            <p className="w-modal-text">{aboutCards[aboutOpen].body}</p>
          </div>
        </div>
      )}
    </div>
  );
}
