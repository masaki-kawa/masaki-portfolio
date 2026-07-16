"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero media slot for project detail pages, driven by the entry's
 * `hero` field in lib/content/work.ts (no network probing: pages
 * without hero media render nothing and request nothing).
 *   - kind "image": the /work/<slug>.png poster only.
 *   - kind "video": /work/<slug>.mp4 as an ambient loop (muted,
 *     autoplays, pauses off screen) over the poster. Reduced motion
 *     renders the still only.
 */
export function Media({
  slug,
  kind,
  className,
}: {
  slug: string;
  kind: "video" | "image";
  className: string;
}) {
  const [video, setVideo] = useState(false);
  const vidRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (kind !== "video") return;
    /* deferred a tick (not rAF: rAF never fires in hidden tabs) */
    const t = setTimeout(() => {
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setVideo(true);
      }
    }, 0);
    return () => clearTimeout(t);
  }, [kind]);

  useEffect(() => {
    if (!video) return;
    const el = vidRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.2 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [video]);

  return (
    <div
      className={className}
      style={{ backgroundImage: `url(/work/${slug}.png)` }}
      aria-hidden
    >
      {video && (
        <video
          ref={vidRef}
          className="w-media-video"
          src={`/work/${slug}.mp4`}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          onError={() => setVideo(false)}
        />
      )}
    </div>
  );
}
