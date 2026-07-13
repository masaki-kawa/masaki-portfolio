/**
 * Liquid glass world — GLSL sources.
 *
 * Two passes:
 *   1. `BG_*`   : the luminous silver volume, drawn on a fullscreen
 *                 triangle and also rendered into a texture (RT).
 *   2. `LENS_*` : the floating glass slab. Samples the RT with a
 *                 normal-driven screen-space offset (refraction), three
 *                 taps per channel (dispersion) and a fresnel rim.
 *
 * All color lives in the shaders; the DOM above stays monochrome ink.
 */

export const BG_VERT = /* glsl */ `
  void main() {
    gl_Position = vec4(position.xy, 1.0, 1.0);
  }
`;

export const BG_FRAG = /* glsl */ `
  precision highp float;

  uniform vec2 uRes;
  uniform float uTime;
  uniform float uDrift; /* scroll-linked drift of the light field */

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), f.x),
      f.y
    );
  }
  float fbm(vec2 p) {
    return 0.6 * noise(p) + 0.3 * noise(p * 2.17) + 0.12 * noise(p * 4.3);
  }

  /* one soft light source */
  vec3 lightAt(vec2 uv, vec2 c, vec3 tint, float r) {
    float d = length(uv - c);
    return tint * pow(max(0.0, 1.0 - d / r), 2.2);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / uRes;
    float aspect = uRes.x / uRes.y;
    vec2 p = vec2(uv.x * aspect, uv.y);

    /* silver base with a wider range for real dimensionality */
    vec3 top = vec3(0.975, 0.979, 0.986);
    vec3 bottom = vec3(0.820, 0.838, 0.870);
    vec3 col = mix(bottom, top, smoothstep(-0.1, 1.05, uv.y + 0.12));

    /* mercury flow: two drifting octaves so the light morphs, not slides */
    float t = uTime * 0.06;
    vec2 flow = vec2(
      fbm(p * 1.3 + vec2(t, -t * 0.7)),
      fbm(p * 1.3 + vec2(-t * 0.8, t))
    );
    vec2 warp = 0.30 * (flow - 0.5);
    vec2 q = p + warp + vec2(uDrift * 0.4, -uDrift * 0.2);

    /* richness ramps into the upper-right, where the glass lives; the
       name area (lower-left) stays calm so the type reads cleanly */
    float rich = (smoothstep(0.18, 0.95, uv.x) * 0.62 + 0.38)
               * smoothstep(0.0, 0.85, uv.y * 0.55 + 0.45);

    /* liquid light: warm gold and cool steel, morphing with the flow */
    col += lightAt(q, vec2(aspect * 0.80, 0.74), vec3(0.078, 0.060, 0.028), 0.95) * rich;
    col += lightAt(q, vec2(aspect * 0.90, 0.26), vec3(0.028, 0.044, 0.086), 1.00) * rich;
    col += lightAt(q, vec2(aspect * 0.30, 0.92), vec3(0.045, 0.046, 0.052), 0.80) * 0.6;

    /* raking specular sweep: a soft bright band crossing slowly, the
       light-on-liquid-metal that makes the field feel alive at rest */
    float axis = p.x * 0.86 + p.y * 0.5;
    float spec = pow(max(0.0, sin(axis * 2.1 - uTime * 0.30)), 6.0);
    float shimmer = pow(
      max(0.0, sin(axis * 5.0 - uTime * 0.5 + fbm(p * 2.0) * 3.0)),
      10.0
    );
    col += (spec * 0.05 + shimmer * 0.028) * rich;

    /* faint caustic threads flowing through the bright side */
    float caus = pow(smoothstep(0.56, 0.86, fbm(p * 2.6 + vec2(t * 1.6, -t))), 2.0);
    col += caus * 0.028 * rich * vec3(1.0, 0.99, 0.965);

    /* grain against banding */
    col += (noise(p * 3.0 + t) - 0.5) * 0.012;

    /* deeper vignette for dimensionality */
    float vig = smoothstep(1.4, 0.35, length((uv - 0.5) * vec2(aspect, 1.0)));
    col *= mix(0.87, 1.02, vig);

    gl_FragColor = vec4(col, 1.0);
  }
`;

export const LENS_VERT = /* glsl */ `
  varying vec3 vNormal;
  varying vec4 vClip;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vClip = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    gl_Position = vClip;
  }
`;

export const LENS_FRAG = /* glsl */ `
  precision highp float;

  uniform sampler2D tBg;
  uniform float uRefr;   /* refraction strength  */
  uniform float uSplit;  /* dispersion strength  */
  uniform float uTime;

  varying vec3 vNormal;
  varying vec4 vClip;

  void main() {
    vec2 suv = (vClip.xy / vClip.w) * 0.5 + 0.5;

    float face = clamp(abs(vNormal.z), 0.0, 1.0); /* 1 = flat face, 0 = rim */
    float rim = 1.0 - smoothstep(0.05, 0.85, face);

    /* bend harder near the rim, gently across the face */
    vec2 off = vNormal.xy * uRefr * (0.22 + 1.9 * rim);

    /* chromatic split grows at the rim: the Apple fringe */
    float sp = 1.0 + uSplit * (0.6 + 8.5 * rim);

    vec3 col;
    col.r = texture2D(tBg, suv + off * sp).r;
    col.g = texture2D(tBg, suv + off).g;
    col.b = texture2D(tBg, suv + off / sp).b;

    /* frost: two soft extra taps, stronger toward the rim (kept light
       so display type reads clearly through the glass) */
    vec2 j = vec2(0.0022, 0.0017) * (0.4 + 1.6 * rim);
    vec3 soft = texture2D(tBg, suv + off + j).rgb + texture2D(tBg, suv + off - j).rgb;
    col = mix(col, (col + soft) / 3.0, 0.32);

    /* rim spectrum: a faint prism at the very edge, the jewel tell */
    col.r += rim * uSplit * 1.4;
    col.b += rim * uSplit * 1.1;

    /* fresnel rim light + a sharp travelling glint down the face */
    float fres = pow(1.0 - face, 3.0);
    float glint = pow(max(0.0, sin(suv.x * 6.2831 + suv.y * 3.0 - uTime * 0.5) * 0.5 + 0.5), 40.0);
    col += fres * 0.42 + glint * (0.10 + rim * 0.22);

    /* a whisper of interior lift; keep the glass clear, not milky */
    col = mix(col, vec3(1.0), 0.02 + 0.06 * fres);

    gl_FragColor = vec4(col, 1.0);
  }
`;

/* comet swarm: motes simulated on the CPU fall toward the glass and
   orbit it; aGlow (proximity) brightens and warms the captured ones */
export const PART_VERT = /* glsl */ `
  attribute float aSeed;
  attribute float aGlow;
  varying float vAlpha;
  varying float vGlow;

  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    float size = (0.5 + aSeed * 0.9) * (1.0 + aGlow * 0.9);
    gl_PointSize = size * (140.0 / max(0.1, -mv.z));
    /* nearer motes read a touch stronger */
    vAlpha = clamp(0.9 - (-mv.z - 3.0) * 0.14, 0.15, 0.8);
    vGlow = aGlow;
    gl_Position = projectionMatrix * mv;
  }
`;

export const PART_FRAG = /* glsl */ `
  precision mediump float;
  varying float vAlpha;
  varying float vGlow;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    /* soft core with a brighter pinpoint centre so idle motes still read */
    float core = smoothstep(0.5, 0.12, d);
    float spark = smoothstep(0.22, 0.0, d);
    float a = (core * (0.42 + 0.7 * vGlow) + spark * (0.2 + 0.5 * vGlow)) * vAlpha;
    vec3 col = mix(vec3(1.0, 0.995, 0.97), vec3(1.0, 0.965, 0.85), vGlow * 0.7);
    gl_FragColor = vec4(col, min(1.0, a));
  }
`;

/*
 * Lens lab (/lab): the lens as a screen-space SDF region instead of a
 * 3D slab. One shader, five shapes (uShape): 0 rounded rect, 1 disc,
 * 2 droplet, 3 scan band, 4 iris. Disc and droplet magnify their
 * interior; refraction comes from the SDF gradient, and the
 * rim-boosted dispersion / frost / rim light match the slab so the
 * forms compare fairly.
 */
export const SDF_LENS_FRAG = /* glsl */ `
  precision highp float;

  uniform sampler2D tBg;
  uniform vec2 uRes;
  uniform float uTime;
  uniform int uShape;
  uniform vec2 uCenter; /* px, bottom-left origin */
  uniform float uRefr;
  uniform float uSplit;

  float sdRoundBox(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, q.y), 0.0) - r;
  }
  float sdPolygon(vec2 p, float r, float n, float rot) {
    float ang = atan(p.y, p.x) + rot;
    float seg = 6.28318530718 / n;
    ang = mod(ang, seg) - seg * 0.5;
    return length(p) * cos(ang) - r * cos(seg * 0.5);
  }
  float wobble(float th, float t) {
    return 0.055 * sin(3.0 * th + t * 0.9)
         + 0.038 * sin(5.0 * th - t * 0.7)
         + 0.020 * sin(8.0 * th + t * 1.3);
  }
  float shapeSDF(vec2 p, float t) {
    if (uShape == 0) return sdRoundBox(p, vec2(0.66, 0.40), 0.09);
    if (uShape == 1) return length(p) - 0.46;
    if (uShape == 2) { /* droplet: live blob, a little heavier below */
      vec2 q = p;
      q.y *= (q.y > 0.0) ? 1.07 : 0.94;
      float th = atan(q.y, q.x);
      return length(q) - 0.42 * (1.0 + wobble(th, t));
    }
    if (uShape == 3) return abs(p.y) - 0.19; /* full-width scan band */
    /* iris: seven blades, breathing aperture, slow rotation */
    float r = 0.46 * (0.92 + 0.08 * sin(t * 0.45));
    return sdPolygon(p, r, 7.0, t * 0.12);
  }

  void main() {
    float s = 0.5 * min(uRes.x, uRes.y);
    vec2 p = (gl_FragCoord.xy - uCenter) / s;
    float d = shapeSDF(p, uTime);

    float aa = 2.0 / s;
    float alpha = 1.0 - smoothstep(-aa, aa, d);
    if (alpha <= 0.001) discard;

    float e = 0.004;
    vec2 g = vec2(
      shapeSDF(p + vec2(e, 0.0), uTime) - shapeSDF(p - vec2(e, 0.0), uTime),
      shapeSDF(p + vec2(0.0, e), uTime) - shapeSDF(p - vec2(0.0, e), uTime)
    );
    vec2 n = g / max(length(g), 1e-5);
    float edge = 1.0 - smoothstep(0.0, 0.16, -d); /* 1 at rim, 0 inside */

    /* disc and droplet magnify what they cover: the closer look */
    vec2 pix = gl_FragCoord.xy;
    if (uShape == 1 || uShape == 2) {
      float inside = clamp(-d / 0.44, 0.0, 1.0);
      float mag = 1.0 + 0.13 * smoothstep(0.0, 1.0, inside);
      pix = uCenter + (gl_FragCoord.xy - uCenter) / mag;
    }
    vec2 suv = pix / uRes;

    vec2 off = n * uRefr * (0.22 + 1.9 * edge);
    float sp = 1.0 + uSplit * (0.6 + 6.0 * edge);
    vec3 col;
    col.r = texture2D(tBg, suv + off * sp).r;
    col.g = texture2D(tBg, suv + off).g;
    col.b = texture2D(tBg, suv + off / sp).b;

    vec2 j = vec2(0.0022, 0.0017) * (0.4 + 1.6 * edge);
    vec3 soft = texture2D(tBg, suv + off + j).rgb + texture2D(tBg, suv + off - j).rgb;
    col = mix(col, (col + soft) / 3.0, 0.55);

    float rim = 1.0 - smoothstep(0.006, 0.024, abs(d));
    float streak = pow(max(0.0, sin(suv.x * 6.2831 + uTime * 0.4) * 0.5 + 0.5), 24.0);
    col += rim * 0.38 + streak * edge * 0.10;
    col = mix(col, vec3(1.0), 0.04 + 0.08 * edge);

    gl_FragColor = vec4(col, alpha);
  }
`;
