import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected work: AI job matching, local-SEO SaaS, LLM security research, and more.",
};

export default function WorkPage() {
  return (
    <Container className="py-20">
      <h1 className="text-4xl font-semibold tracking-tight">Work</h1>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Selected projects across AI products, local-SEO SaaS, and research.
      </p>

      <ul className="mt-12 grid gap-4 sm:grid-cols-2">
        {projects.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/work/${p.slug}`}
              className="block rounded-xl border border-border p-6 transition-colors hover:border-primary/50"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-widest text-muted-foreground">
                <span>{p.role}</span>
                <span>{p.period}</span>
              </div>
              <div className="mt-3 text-xl font-medium">{p.title}</div>
              <p className="mt-1 text-sm text-muted-foreground">{p.subtitle}</p>
              <p className="mt-3 text-sm text-muted-foreground">{p.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
