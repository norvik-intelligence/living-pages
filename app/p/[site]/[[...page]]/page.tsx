import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageRenderer } from "@/components/page-renderer";
import { getPublicPage } from "@/lib/core/data";

type Props = { params: Promise<{ site: string; page?: string[] }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { site, page } = await params;
  const published = await getPublicPage(site, page?.join("/") || "home");
  if (!published) return { title: "Page not found" };
  return { title: published.page.metaTitle || published.page.name, description: published.page.metaDescription || undefined };
}

export default async function PublicPage({ params }: Props) {
  const { site, page } = await params;
  const published = await getPublicPage(site, page?.join("/") || "home");
  if (!published) notFound();
  return <main id="content"><PageRenderer blocks={published.blocks} /></main>;
}
