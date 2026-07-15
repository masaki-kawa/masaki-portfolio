import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WORK, RESEARCH, COMMUNITY } from "@/lib/content/work";
import { WorkDetail } from "@/components/world/WorkDetail";

/**
 * Project detail page (liquid glass world). Content comes from
 * lib/content/work.ts; case-study bodies will extend it per project.
 */

const ALL = [...WORK, ...RESEARCH, ...COMMUNITY];

export function generateStaticParams() {
  return ALL.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const w = ALL.find((x) => x.slug === slug);
  return { title: w ? w.name : "Work" };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!ALL.some((w) => w.slug === slug)) notFound();
  return <WorkDetail slug={slug} />;
}
