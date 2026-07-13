import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "About",
  description:
    "Masaki Kawakami. HR background, Master's in Data Science at the University of Technology Sydney, now building AI products from Sydney.",
};

export default function AboutPage() {
  return (
    <Container className="py-20">
      <h1 className="text-4xl font-semibold tracking-tight">About</h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        {profile.positioning.en}
      </p>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        {profile.positioning.ja}
      </p>

      <section className="mt-14">
        <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Story
        </h2>
        <ol className="mt-6 space-y-8">
          {profile.story.map((s) => (
            <li key={s.title} className="border-l border-border pl-5">
              <div className="text-xs uppercase tracking-widest text-muted-foreground">
                {s.period}
              </div>
              <div className="mt-1 text-lg font-medium">{s.title}</div>
              <p className="mt-2 text-muted-foreground">{s.summary}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-16 grid gap-10 md:grid-cols-2">
        <div>
          <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Experience
          </h2>
          <ul className="mt-6 space-y-6">
            {profile.experience.map((e) => (
              <li key={`${e.role}-${e.org}`}>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {e.period} · {e.location}
                </div>
                <div className="mt-1 font-medium">
                  {e.role} · {e.org}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{e.blurb}</p>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-medium uppercase tracking-widest text-muted-foreground">
            Education
          </h2>
          <ul className="mt-6 space-y-6">
            {profile.education.map((ed) => (
              <li key={ed.school}>
                <div className="text-xs uppercase tracking-widest text-muted-foreground">
                  {ed.period}
                </div>
                <div className="mt-1 font-medium">{ed.school}</div>
                <p className="mt-1 text-sm text-muted-foreground">
                  {ed.faculty}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Container>
  );
}
