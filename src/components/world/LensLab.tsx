"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";
import { BG_VERT, BG_FRAG, SDF_LENS_FRAG } from "@/lib/world/shaders";
import { makeTextBlock, EN_FONT } from "@/lib/world/text-block";

const SHAPES = ["四角", "円", "水滴", "帯", "絞り"];

/**
 * /lab — lens form comparison. No scroll choreography: just the field,
 * the name in its two layers (ghost outside, resolved inside) and one
 * lens defined as a screen-space SDF whose shape is switchable. Move
 * the pointer to drag the lens over the letters.
 */
export function LensLab() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const shapeRef = useRef(0);
  const [shape, setShape] = useState(0);

  useEffect(() => {
    shapeRef.current = shape;
  }, [shape]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: "high-performance",
    });
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);

    /* --- the light field (shared with the world) --- */
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
    fieldScene.add(new THREE.Mesh(tri, bgMat));

    const rt = new THREE.WebGLRenderTarget(2, 2);

    /* --- the name, both layers --- */
    const contentScene = new THREE.Scene();
    const contentCam = new THREE.PerspectiveCamera(35, 1, 0.1, 20);
    contentCam.position.z = 6;
    const name = makeTextBlock("left");
    name.setLineWorld(0.52);
    name.draw(["Masaki", "Kawakami"], EN_FONT, 0.012);
    contentScene.add(name.group);

    /* --- the lens: fullscreen SDF pass sampling the resolved RT --- */
    const lensScene = new THREE.Scene();
    const lensUniforms = {
      tBg: { value: rt.texture },
      uRes: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uShape: { value: 0 },
      uCenter: { value: new THREE.Vector2(0, 0) },
      uRefr: { value: 0.045 },
      uSplit: { value: 0.16 },
    };
    const lensMat = new THREE.ShaderMaterial({
      vertexShader: BG_VERT,
      fragmentShader: SDF_LENS_FRAG,
      uniforms: lensUniforms,
      transparent: true,
      depthTest: false,
      depthWrite: false,
    });
    lensScene.add(new THREE.Mesh(tri, lensMat));

    const HALF_H = Math.tan((35 * Math.PI) / 360) * 6;
    let vw = 1;
    let vh = 1;
    const toWorldX = (u: number) => (u - 0.5) * 2 * HALF_H * (vw / vh);

    /* pointer: the lens follows it; parked over the name until touched */
    let tcx = 0;
    let tcy = 0;
    let cx = 0;
    let cy = 0;
    let started = false;

    function measure() {
      vw = canvas!.clientWidth || window.innerWidth;
      vh = canvas!.clientHeight || window.innerHeight;
      renderer.setSize(vw, vh, false);
      rt.setSize(Math.round(vw * dpr), Math.round(vh * dpr));
      bgUniforms.uRes.value.set(vw * dpr, vh * dpr);
      lensUniforms.uRes.value.set(vw * dpr, vh * dpr);
      contentCam.aspect = vw / vh;
      contentCam.updateProjectionMatrix();
      name.group.position.set(toWorldX(0.09) + name.width() / 2, 0, 0);
      if (!started) {
        tcx = vw * 0.42;
        tcy = vh * 0.5;
        cx = tcx;
        cy = tcy;
      }
    }
    measure();

    function onPointer(e: PointerEvent) {
      started = true;
      tcx = e.clientX;
      tcy = e.clientY;
    }

    let raf = 0;
    let running = true;
    function onVis() {
      running = document.visibilityState === "visible";
      if (running) raf = requestAnimationFrame(frame);
      else cancelAnimationFrame(raf);
    }
    const t0 = performance.now();
    function frame(now: number) {
      if (!running) return;
      const time = (now - t0) / 1000;
      bgUniforms.uTime.value = time;
      lensUniforms.uTime.value = time;
      lensUniforms.uShape.value = shapeRef.current;
      cx += (tcx - cx) * 0.14;
      cy += (tcy - cy) * 0.14;
      /* idle: a slow breath so the lens feels alive before first touch */
      const ix = started ? 0 : Math.sin(time * 0.5) * vw * 0.015;
      const iy = started ? 0 : Math.cos(time * 0.4) * vh * 0.02;
      lensUniforms.uCenter.value.set((cx + ix) * dpr, (vh - (cy + iy)) * dpr);

      renderer.setRenderTarget(rt);
      renderer.render(fieldScene, bgCam);
      renderer.autoClear = false;
      renderer.render(contentScene, contentCam);
      renderer.autoClear = true;
      renderer.setRenderTarget(null);
      renderer.render(fieldScene, bgCam);
      renderer.autoClear = false;
      renderer.render(contentScene, contentCam);
      renderer.render(lensScene, bgCam);
      renderer.autoClear = true;

      raf = requestAnimationFrame(frame);
    }
    raf = requestAnimationFrame(frame);

    const ro = new ResizeObserver(measure);
    ro.observe(canvas);
    window.addEventListener("resize", measure);
    window.addEventListener("pointermove", onPointer);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVis);
      name.dispose();
      tri.dispose();
      bgMat.dispose();
      lensMat.dispose();
      rt.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="wl-root">
      <canvas ref={canvasRef} className="wl-canvas" />
      <div className="wl-hud">
        <span>Lens Lab</span>
        <Link href="/">← Home</Link>
      </div>
      <p className="wl-note">形を選んで、マウスで文字の上をなぞる</p>
      <div className="wl-shapes">
        {SHAPES.map((label, i) => (
          <button
            key={label}
            className={i === shape ? "on" : ""}
            onClick={() => setShape(i)}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
