"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Small brand mark on a frosted glass tile. Renders /<dir>/<slug>.png
 * and quietly removes itself (tile and all) if that file has not been
 * added yet, so a card without a logo stays clean. The tile is light,
 * so drop dark or full-colour marks (see public/LOGOS.md). Plain <img>
 * so any logo aspect ratio sizes itself by height inside the tile.
 */
export function Logo({
  slug,
  dir,
  alt,
  className,
  plain = false,
}: {
  slug: string;
  dir: string;
  alt: string;
  className?: string;
  /* plain keeps the logo's own colours (no white-ising filter): used
     for marks that carry their own background/colour, e.g. Vacanti */
  plain?: boolean;
}) {
  const [ok, setOk] = useState(true);
  const ref = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    // A server-rendered <img> can 404 before React attaches onError, so
    // the error event is missed. An image that has finished loading with
    // zero natural size errored; hide the tile in that case too.
    const im = ref.current;
    if (im && im.complete && im.naturalWidth === 0) setOk(false);
  }, []);

  if (!ok) return null;
  return (
    <span className={plain && className ? `${className} is-plain` : className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={ref}
        src={`/${dir}/${slug}.png`}
        alt={alt}
        onError={() => setOk(false)}
      />
    </span>
  );
}
