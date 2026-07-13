/**
 * Static liquid-glass refraction filter, referenced by CSS as
 * `backdrop-filter: url(#w-glass)`. Defined once and never mutated per
 * frame, so it composites on the GPU with no scroll jank. Browsers
 * without url() backdrop support fall back to plain blur via @supports.
 */
export function GlassFilter() {
  return (
    <svg className="w-svgdefs" width="0" height="0" aria-hidden focusable="false">
      <defs>
        <filter
          id="w-glass"
          x="-15%"
          y="-15%"
          width="130%"
          height="130%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.009 0.013"
            numOctaves="2"
            seed="11"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="1.2" result="soft" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="soft"
            scale="10"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
