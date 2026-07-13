import { World } from "@/components/world/World";

/**
 * Home — the liquid glass world (redesign/liquid-glass).
 *
 * The previous terminal home lives at `src/components/home/*` and is
 * preserved on `main` (checkpoint e623e29). This page hands the whole
 * viewport to the WebGL world; DOM copy layers render above it inside
 * <World />.
 */
export default function HomePage() {
  return <World />;
}
