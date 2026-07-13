import Link from "next/link";
import { nav, site, social } from "@/content/site";
import { Container } from "./Container";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border/60 py-10 text-sm text-muted-foreground">
      <Container className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}. Built in Sydney.
        </p>
        <div className="flex flex-wrap items-center gap-5">
          {nav.footer.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
          <a
            href={social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            LinkedIn
          </a>
          <a
            href={social.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </div>
      </Container>
    </footer>
  );
}
