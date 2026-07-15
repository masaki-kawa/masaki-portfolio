import * as THREE from "three";

/**
 * Display type as a single canvas-textured quad for the liquid glass
 * world. Rasterised once per draw() and sampled both into the lens RT
 * and to the screen, so the glass refracts the same solid ink the page
 * shows. (The earlier dual-canvas ghost/resolve variant is gone; both
 * passes render this one mesh.)
 */

export const EN_FONT =
  '-apple-system, BlinkMacSystemFont, "SF Pro Display", sans-serif';
export const JA_FONT =
  '"Hiragino Sans", "Hiragino Kaku Gothic ProN", sans-serif';

export type TextBlock = {
  group: THREE.Group;
  width: () => number;
  height: () => number;
  draw: (lines: string[], font: string, spacingEm: number) => void;
  setLineWorld: (lw: number) => void;
  dispose: () => void;
};

export function makeTextBlock(align: "left" | "center"): TextBlock {
  const cv = document.createElement("canvas");
  const ctx = cv.getContext("2d");
  const tex = new THREE.CanvasTexture(cv);
  tex.minFilter = THREE.LinearFilter;
  tex.magFilter = THREE.LinearFilter;
  tex.generateMipmaps = false;
  const geo = new THREE.PlaneGeometry(1, 1);
  const mat = new THREE.MeshBasicMaterial({
    map: tex,
    transparent: true,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(geo, mat);
  const group = new THREE.Group();
  group.add(mesh);
  const state = { aspect: 1, lines: 1, lineWorld: 0.5 };

  function applyScale() {
    const h = state.lines * state.lineWorld;
    mesh.scale.set(h * state.aspect, h, 1);
  }
  function draw(lines: string[], font: string, spacingEm: number) {
    if (!ctx) return;
    const px = 220;
    const prep = () => {
      ctx.font = `700 ${px}px ${font}`;
      try {
        (ctx as CanvasRenderingContext2D & { letterSpacing: string }).letterSpacing = `${spacingEm * px}px`;
      } catch {
        /* cosmetic */
      }
    };
    prep();
    const widths = lines.map((l) => ctx.measureText(l).width);
    const maxW = Math.ceil(Math.max(...widths, 1));
    const lineH = px * 1.14;
    const padX = px * 0.14;
    const ascent = px * 0.78;
    const W = maxW + padX * 2;
    const H = Math.ceil(ascent + lineH * (lines.length - 1) + px * 0.34);
    cv.width = W;
    cv.height = H;
    prep(); /* canvas resize resets ctx state */
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#141519";
    lines.forEach((l, i) => {
      const w = ctx.measureText(l).width;
      const x = align === "left" ? padX : (W - w) / 2;
      ctx.fillText(l, x, ascent + i * lineH);
    });
    /* the canvas was resized, so force a full re-upload: a plain
       needsUpdate can leave the old, larger texture's pixels around the
       new smaller text (the other language bleeding through) */
    tex.dispose();
    tex.needsUpdate = true;
    state.aspect = W / H;
    state.lines = lines.length;
    applyScale();
  }
  function setLineWorld(lw: number) {
    state.lineWorld = lw;
    applyScale();
  }
  return {
    group,
    width: () => state.lines * state.lineWorld * state.aspect,
    height: () => state.lines * state.lineWorld,
    draw,
    setLineWorld,
    dispose: () => {
      geo.dispose();
      mat.dispose();
      tex.dispose();
    },
  };
}
