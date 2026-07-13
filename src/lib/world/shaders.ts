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

    /* silver base: brighter above, cooler below */
    vec3 top = vec3(0.972, 0.976, 0.984);
    vec3 bottom = vec3(0.852, 0.868, 0.892);
    vec3 col = mix(bottom, top, smoothstep(0.0, 1.0, uv.y + 0.12));

    /* slow breathing warp so the lights feel like weather, not wallpaper */
    float t = uTime * 0.05;
    vec2 warp = 0.22 * vec2(fbm(p * 1.4 + t), fbm(p * 1.4 - t));

    vec2 q = p + warp + vec2(uDrift * 0.35, -uDrift * 0.18);
    col += lightAt(q, vec2(aspect * 0.24, 0.78), vec3(0.055, 0.045, 0.020), 0.85); /* warm */
    col += lightAt(q, vec2(aspect * 0.80, 0.30), vec3(0.020, 0.030, 0.055), 0.90); /* cool */
    col += lightAt(q, vec2(aspect * 0.58, 0.86), vec3(0.030, 0.030, 0.035), 0.70); /* neutral */

    /* faint large-grain texture keeps the field from banding */
    col += (noise(p * 3.0 + t) - 0.5) * 0.012;

    /* corners settle slightly darker */
    float vig = smoothstep(1.25, 0.45, length(uv - 0.5));
    col *= mix(0.94, 1.0, vig);

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
    float sp = 1.0 + uSplit * (0.6 + 6.0 * rim);

    vec3 col;
    col.r = texture2D(tBg, suv + off * sp).r;
    col.g = texture2D(tBg, suv + off).g;
    col.b = texture2D(tBg, suv + off / sp).b;

    /* frost: two soft extra taps, stronger toward the rim */
    vec2 j = vec2(0.0022, 0.0017) * (0.4 + 1.6 * rim);
    vec3 soft = texture2D(tBg, suv + off + j).rgb + texture2D(tBg, suv + off - j).rgb;
    col = mix(col, (col + soft) / 3.0, 0.55);

    /* fresnel rim light + a slow moving specular streak */
    float fres = pow(1.0 - face, 3.0);
    float streak = pow(max(0.0, sin(suv.x * 6.2831 + uTime * 0.4) * 0.5 + 0.5), 24.0);
    col += fres * 0.34 + streak * rim * 0.10;

    /* interior lift keeps the slab reading as material, not a hole */
    col = mix(col, vec3(1.0), 0.05 + 0.09 * fres);

    gl_FragColor = vec4(col, 1.0);
  }
`;
