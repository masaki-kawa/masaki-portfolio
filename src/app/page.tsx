import type { Metadata } from "next";
import { World } from "@/components/world/World";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

/**
 * Home — the liquid glass world (redesign/liquid-glass).
 *
 * The previous terminal home was removed from the tree and is
 * preserved in git history (checkpoint e623e29). This page hands the
 * whole viewport to the WebGL world; DOM copy layers render above it
 * inside <World />.
 */
export default function HomePage() {
  return <World />;
}
