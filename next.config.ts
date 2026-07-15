import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* The WebGL world owns a single canvas + rAF loop + GL context.
     React StrictMode's dev double-invoke mounts it twice on the same
     canvas, leaving two render loops alive (the name renders in both
     languages at once). Off here; the effect still cleans up fully. */
  reactStrictMode: false,
};

export default nextConfig;
