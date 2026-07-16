"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Hero media slot for project detail pages. Tries /work/<slug>.mp4 as
 * an ambient loop (muted, autoplays, pauses off screen) over a
 * /work/<slug>.png poster. When neither asset exists the slot renders
 * nothing at all, so pages without a hero never show an empty frame.
 * Reduced motion renders the still only.
 */
export function Media({
  slug,
  className,
}: {
  slug: string;
  className: string;
}) {
  const [video, setVideo] = useState(false);
  const [still, setStill] = useState<"probing" | "yes" | "no">("probing");
  const vidRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    /* deferred a tick (not rAF: rAF never fires in hidden tabs) */
    const t = setTimeout(() => {
      if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setVideo(true);
      }
    }, 0);
    /* probe the poster: CSS backgrounds cannot report a 404, so load it
       through an Image first and only keep the slot when it exists */
    const probe = new Image();
    probe.onload = () => setStill("yes");
    probe.onerror = () => setStill("no");
    probe.src = `/work/${slug}.png`;
    return () => clearTimeout(t);
  }, [slug]);

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
  }, [video, still]);

  /* no poster and no video: the page simply has no hero */
  if (still === "no" && !video) return null;
  if (still === "probing") return null;

  return (
    <div
      className={className}
      style={{
        backgroundImage:
          still === "yes" ? `url(/work/${slug}.png)` : undefined,
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
          autoPlay
          preload="metadata"
          onError={() => setVideo(false)}
        />
      )}
    </div>
  );
}
