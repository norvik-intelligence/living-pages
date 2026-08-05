import "server-only";

import { cache } from "react";
import { redirect } from "next/navigation";
import { modes } from "@/lib/config";
import { createClient } from "@/lib/supabase/server";
import { demoContext, demoPage, demoSite } from "./demo";
import type { DraftBlock, EditorPage, SiteSummary, WorkspaceContext } from "./types";

type Row = Record<string, unknown>;

function text(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

export const getWorkspaceContext = cache(async (): Promise<WorkspaceContext> => {
  if (modes.database === "demo") return demoContext;

  const client = await createClient();
  const { data: auth, error: authError } = await client.auth.getUser();
  if (authError || !auth.user) redirect("/login?error=session-required");

  const { data, error } = await client
    .from("workspace_members")
    .select("role, workspace:workspaces(id,name,slug)")
    .eq("user_id", auth.user.id)
    .order("created_at")
    .limit(1)
    .maybeSingle();

  if (error) throw new Error("Workspace access could not be verified.");
  const record = data as unknown as Row | null;
  const workspaceValue = record?.workspace;
  const workspace = (Array.isArray(workspaceValue) ? workspaceValue[0] : workspaceValue) as Row | undefined;
  if (!workspace) redirect("/onboarding");

  const { data: siteData } = await client
    .from("sites")
    .select("id,name,slug,status")
    .eq("workspace_id", text(workspace.id))
    .is("deleted_at", null)
    .order("created_at")
    .limit(1)
    .maybeSingle();

  const site = siteData as unknown as Row | null;
  return {
    mode: "connected",
    user: {
      id: auth.user.id,
      name: text(auth.user.user_metadata?.full_name, auth.user.email?.split("@")[0] || "Member"),
      email: auth.user.email || "",
    },
    workspace: {
      id: text(workspace.id),
      name: text(workspace.name),
      slug: text(workspace.slug),
      role: text(record?.role, "viewer"),
    },
    site: site
      ? { id: text(site.id), name: text(site.name), slug: text(site.slug), status: text(site.status) }
      : null,
  };
});

export async function getSites(): Promise<SiteSummary[]> {
  const context = await getWorkspaceContext();
  if (context.mode === "demo") return [demoSite];
  const client = await createClient();
  const { data, error } = await client
    .from("sites")
    .select("id,name,slug,status,updated_at,pages(count)")
    .eq("workspace_id", context.workspace.id)
    .is("deleted_at", null)
    .order("updated_at", { ascending: false });
  if (error) throw new Error("Sites could not be loaded.");
  return ((data || []) as unknown as Row[]).map((site) => ({
    id: text(site.id),
    name: text(site.name),
    slug: text(site.slug),
    status: text(site.status, "draft"),
    updatedAt: text(site.updated_at),
    pages: Number((site.pages as Array<{ count: number }> | undefined)?.[0]?.count || 0),
  }));
}

export async function getPages(siteId: string) {
  const context = await getWorkspaceContext();
  if (context.mode === "demo") return [demoPage];
  const client = await createClient();
  const { data, error } = await client
    .from("pages")
    .select("id,site_id,name,slug,status,is_homepage,updated_at,published_version_id")
    .eq("site_id", siteId)
    .eq("workspace_id", context.workspace.id)
    .is("deleted_at", null)
    .order("position");
  if (error) throw new Error("Pages could not be loaded.");
  return ((data || []) as unknown as Row[]).map((page) => ({
    id: text(page.id),
    siteId: text(page.site_id),
    name: text(page.name),
    slug: text(page.slug),
    status: text(page.status, "draft"),
    isHomepage: Boolean(page.is_homepage),
    updatedAt: text(page.updated_at),
    publishedVersionId: page.published_version_id ? text(page.published_version_id) : null,
  }));
}

export async function getEditorPage(pageId: string): Promise<EditorPage | null> {
  const context = await getWorkspaceContext();
  if (context.mode === "demo") return demoPage;
  const client = await createClient();
  const { data, error } = await client
    .from("pages")
    .select("id,site_id,name,slug,status,is_homepage,updated_at,published_version_id,meta_title,meta_description,site:sites(name,slug),blocks:page_blocks(id,type,version,content_props,style_props,visibility_props,position),versions:page_versions(id,version,change_note,created_at)")
    .eq("id", pageId)
    .eq("workspace_id", context.workspace.id)
    .is("deleted_at", null)
    .maybeSingle();
  if (error) throw new Error("Page access could not be verified.");
  if (!data) return null;
  const page = data as unknown as Row;
  const siteValue = page.site;
  const site = (Array.isArray(siteValue) ? siteValue[0] : siteValue) as Row;
  const blocks = ((page.blocks || []) as Row[])
    .sort((a, b) => Number(a.position) - Number(b.position))
    .map((block): DraftBlock => ({
      id: text(block.id),
      type: text(block.type) as DraftBlock["type"],
      version: Number(block.version || 1),
      content: (block.content_props || {}) as DraftBlock["content"],
      style: (block.style_props || {}) as DraftBlock["style"],
      visibility: (block.visibility_props || { desktop: true, tablet: true, mobile: true }) as DraftBlock["visibility"],
    }));
  return {
    id: text(page.id),
    siteId: text(page.site_id),
    siteName: text(site?.name),
    siteSlug: text(site?.slug),
    name: text(page.name),
    slug: text(page.slug),
    status: text(page.status, "draft"),
    isHomepage: Boolean(page.is_homepage),
    updatedAt: text(page.updated_at),
    publishedVersionId: page.published_version_id ? text(page.published_version_id) : null,
    metaTitle: text(page.meta_title),
    metaDescription: text(page.meta_description),
    blocks,
    versions: ((page.versions || []) as Row[])
      .sort((a, b) => Number(b.version) - Number(a.version))
      .map((version) => ({
        id: text(version.id),
        version: Number(version.version),
        note: text(version.change_note, "Published version"),
        createdAt: text(version.created_at),
      })),
  };
}

export async function getPublicPage(siteSlug: string, pageSlug: string) {
  if (modes.database === "demo") {
    if (siteSlug !== demoPage.siteSlug) return null;
    return { site: { name: demoPage.siteName, slug: demoPage.siteSlug }, page: demoPage, blocks: demoPage.blocks };
  }
  const client = await createClient();
  const { data, error } = await client.rpc("get_published_page", {
    requested_site_slug: siteSlug,
    requested_page_slug: pageSlug,
  });
  if (error || !data) return null;
  return data as { site: { name: string; slug: string }; page: { name: string; slug: string; metaTitle?: string; metaDescription?: string }; blocks: DraftBlock[] };
}
