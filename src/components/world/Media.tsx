"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Media slot for project visuals. Tries /work/<slug>.mp4 as an ambient
 * loop (muted, plays only while on screen); missing video falls
 * silently back to /work/<slug>.png, and a missing image to the
 * gradient beneath. Reduced motion renders stills only.
 */
export function Media({
  slug,
  className,
}: {
  slug: string;
  className: string;
}) {
  const [video, setVideo] = useState(false);
  const vidRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setVideo(true);
  }, []);

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
      style={{
        backgroundImage: `url(/work/${slug}.png), linear-gradient(165deg, #f0f2f7 0%, #e2e6ee 55%, #d8dde7 100%)`,
      }}
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
          preload="metadata"
          onError={() => setVideo(false)}
        />
      )}
    </div>
  );
}
