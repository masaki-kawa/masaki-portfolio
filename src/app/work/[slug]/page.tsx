import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/badge";
import { getProject, projects } from "@/content/projects";

/**
 * Dynamic case-study page.
 * Placeholder layout until Claude-Design-generated versions land per-project.
 */

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

type Params = { slug: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.subtitle,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <Container className="py-20">
      <Link
        href="/work"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to work
      </Link>

      <header className="mt-8 space-y-3">
        <div className="flex flex-wrap items-center gap-3 text-xs uppercase tracking-widest text-muted-foreground">
          <span>{project.role}</span>
          <span>·</span>
          <span>{project.period}</span>
          <span>·</span>
          <Badge variant="secondary">{project.status}</Badge>
        </div>
        <h1 className="text-4xl font-semibold tracking-tight">{project.title}</h1>
        <p className="max-w-2xl text-lg text-muted-foreground">
          {project.subtitle}
        </p>
      </header>

      <section className="mt-12 grid gap-10 md:grid-cols-[1fr_2fr]">
        <div className="space-y-8">
          <div>
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Stack
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s}>
                  <Badge variant="outline">{s}</Badge>
                </li>
              ))}
            </ul>
          </div>

          {project.outcomes.length > 0 && (
            <div>
              <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
                Outcomes
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {project.outcomes.map((o) => (
                  <li key={o}>· {o}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="space-y-10">
          <section>
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Problem
            </h2>
            <p className="mt-3 text-base leading-relaxed">{project.problem}</p>
          </section>

          <section>
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              Approach
            </h2>
            <p className="mt-3 text-base leading-relaxed">{project.approach}</p>
          </section>

          <section>
            <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
              My contributions
            </h2>
            <ul className="mt-3 space-y-2 text-base">
              {project.contributions.map((c) => (
                <li key={c}>· {c}</li>
              ))}
            </ul>
          </section>

          {project.disclosures && project.disclosures.length > 0 && (
            <section className="rounded-lg border border-border bg-muted/40 p-4 text-sm text-muted-foreground">
              {project.disclosures.map((d) => (
                <p key={d}>{d}</p>
              ))}
            </section>
          )}
        </div>
      </section>
    </Container>
  );
}
