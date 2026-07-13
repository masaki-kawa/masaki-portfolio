import { TopBar } from "@/components/home/TopBar";
import { Hero } from "@/components/home/Hero";
import { Work } from "@/components/home/Work";
import { About } from "@/components/home/About";
import { Stack } from "@/components/home/Stack";
import { Contact } from "@/components/home/Contact";
import { HomeFooter } from "@/components/home/Footer";

/**
 * Terminal Home — ported from the Claude-Design `Masaki-Kawakami-Home.html`
 * prototype (Variant 02 TERMINAL + Notion warmth + language switch).
 *
 * Thin Server Component shell; the interactive chrome (keyboard shortcut,
 * live clock, cursor spotlight, mock shell) lives inside the child
 * client components under `src/components/home/`.
 */
export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-bg text-ink">
      <TopBar />
      <main className="flex-1">
        <Hero />
        <Work />
        <About />
        <Stack />
        <Contact />
      </main>
      <HomeFooter />
    </div>
  );
}
