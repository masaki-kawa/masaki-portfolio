import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WORK, RESEARCH, COMMUNITY } from "@/lib/content/work";
import { WorkDetail } from "@/components/world/WorkDetail";
import { site } from "@/content/site";

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
  if (!w) return { title: "Work" };
  const title = `${w.name} · ${site.name}`;
  const url = `${site.url}/work/${w.slug}`;
  return {
    title: w.name,
    description: w.desc.en,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description: w.desc.en,
      siteName: site.name,
      images: [{ url: site.ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: w.desc.en,
      images: [site.ogImage],
    },
  };
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
