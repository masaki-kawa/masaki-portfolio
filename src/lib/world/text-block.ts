import * as THREE from "three";

/**
 * Dual-layer display type for the liquid glass world.
 *
 * The story of the lens: outside it the world is raw — display type
 * renders as a ghost outline. Inside it the same type is resolved —
 * full ink, plus the dispersion the lens adds. Two rasterizations of
 * the same block on separate layers:
 *   layer 1 (solid ink)     → rendered only into the RT the lens reads
 *   layer 2 (ghost outline) → rendered only to the screen
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
  const solidCv = document.createElement("canvas");
  const ghostCv = document.createElement("canvas");
  const sCtx = solidCv.getContext("2d");
  const gCtx = ghostCv.getContext("2d");
  const sTex = new THREE.CanvasTexture(solidCv);
  const gTex = new THREE.CanvasTexture(ghostCv);
  for (const t of [sTex, gTex]) {
    t.minFilter = THREE.LinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.generateMipmaps = false;
  }
  const geo = new THREE.PlaneGeometry(1, 1);
  const sMat = new THREE.MeshBasicMaterial({
    map: sTex,
    transparent: true,
    depthWrite: false,
  });
  const gMat = new THREE.MeshBasicMaterial({
    map: gTex,
    transparent: true,
    depthWrite: false,
  });
  const sMesh = new THREE.Mesh(geo, sMat);
  const gMesh = new THREE.Mesh(geo, gMat);
  sMesh.layers.set(1); /* resolved world: lens/RT pass only */
  gMesh.layers.set(2); /* raw world: screen pass only       */
  const group = new THREE.Group();
  group.add(sMesh, gMesh);
  const state = { aspect: 1, lines: 1, lineWorld: 0.5 };

  function applyScale() {
    /* the canvas holds all lines, so its aspect already covers the full
       block: width = fullHeight * (canvasW / canvasH) */
    const h = state.lines * state.lineWorld;
    sMesh.scale.set(h * state.aspect, h, 1);
    gMesh.scale.set(h * state.aspect, h, 1);
  }
  function draw(lines: string[], font: string, spacingEm: number) {
    if (!sCtx || !gCtx) return;
    const px = 220;
    const prep = (ctx: CanvasRenderingContext2D) => {
      ctx.font = `700 ${px}px ${font}`;
      try {
        (
          ctx as CanvasRenderingContext2D & { letterSpacing: string }
        ).letterSpacing = `${spacingEm * px}px`;
      } catch {
        /* cosmetic */
      }
    };
    prep(sCtx);
    const widths = lines.map((l) => sCtx.measureText(l).width);
    const maxW = Math.ceil(Math.max(...widths, 1));
    const lineH = px * 1.14;
    const padX = px * 0.1;
    const ascent = px * 0.78;
    const W = maxW + padX * 2;
    const H = Math.ceil(ascent + lineH * (lines.length - 1) + px * 0.34);
    solidCv.width = W;
    solidCv.height = H;
    ghostCv.width = W;
    ghostCv.height = H;
    prep(sCtx); /* canvas resize resets ctx state */
    prep(gCtx);
    sCtx.clearRect(0, 0, W, H);
    gCtx.clearRect(0, 0, W, H);
    sCtx.fillStyle = "#141519";
    gCtx.strokeStyle = "rgba(22, 23, 26, 0.36)";
    gCtx.lineWidth = px * 0.028;
    gCtx.fillStyle = "rgba(22, 23, 26, 0.05)";
    lines.forEach((l, i) => {
      const w = sCtx.measureText(l).width;
      const x = align === "left" ? padX : (W - w) / 2;
      const yy = ascent + i * lineH;
      sCtx.fillText(l, x, yy);
      gCtx.fillText(l, x, yy);
      gCtx.strokeText(l, x, yy);
    });
    sTex.needsUpdate = true;
    gTex.needsUpdate = true;
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
      sMat.dispose();
      gMat.dispose();
      sTex.dispose();
      gTex.dispose();
    },
  };
}
