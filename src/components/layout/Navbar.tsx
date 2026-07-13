import Link from "next/link";
import { nav, site } from "@/content/site";
import { Container } from "./Container";

/**
 * Editorial masthead nav — plain text, hairline separator, no buttons.
 * The name doubles as the home link; Japanese name sits underneath as a
 * small subtitle. Primary nav is muted until hover.
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <Container className="flex h-16 items-end justify-between pb-3 pt-4">
        <Link
          href="/"
          className="group flex flex-col leading-none transition-colors hover:text-primary"
        >
          <span className="font-display text-lg tracking-tight">
            {site.name}
          </span>
          <span className="mt-1 text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            川上 勝基 · Sydney
          </span>
        </Link>
        <nav className="flex items-baseline gap-6 text-sm">
          {nav.primary.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground underline-offset-4 transition-colors hover:text-foreground hover:underline hover:decoration-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
