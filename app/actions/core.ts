"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { modes } from "@/lib/config";
import { draftBlocksSchema } from "@/lib/core/types";
import { createClient } from "@/lib/supabase/server";

export type ActionResult = {
  ok: boolean;
  message: string;
  updatedAt?: string;
  version?: number;
};

const onboardingSchema = z.object({
  workspaceName: z.string().trim().min(2).max(80),
  siteName: z.string().trim().min(2).max(80),
  siteType: z.enum(["business", "portfolio", "service", "agency", "other"]),
  role: z.string().trim().min(2).max(40),
  startingPoint: z.enum(["template", "business-information", "blank"]),
});

const pageMutationSchema = z.object({
  pageId: z.uuid(),
  expectedUpdatedAt: z.string().datetime(),
  metaTitle: z.string().trim().max(70),
  metaDescription: z.string().trim().max(180),
  blocks: draftBlocksSchema,
});

const createSiteSchema = z.object({
  name: z.string().trim().min(2).max(80),
  type: z.enum(["business", "portfolio", "service", "agency"]).default("business"),
});

const demoMutationResult: ActionResult = {
  ok: false,
  message: "Demo mode uses read-only sample data. Activate connected mode to save changes.",
};

function slugify(value: string) {
  const slug = value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 55);
  return slug || `living-${crypto.randomUUID().slice(0, 8)}`;
}

async function requireAuthenticatedClient() {
  if (modes.auth !== "connected") {
    throw new Error(
      modes.auth === "demo"
        ? demoMutationResult.message
        : "Supabase is not configured.",
    );
  }
  const client = await createClient();
  const { data, error } = await client.auth.getUser();
  if (error || !data.user) throw new Error("Your session has expired. Please log in again.");
  return { client, user: data.user };
}

async function requireEditor(pageId: string) {
  const { client, user } = await requireAuthenticatedClient();
  const { data, error } = await client
    .from("pages")
    .select("id,workspace_id,site_id")
    .eq("id", pageId)
    .is("deleted_at", null)
    .maybeSingle();
  if (error || !data) throw new Error("Page not found or access denied.");
  const { data: membership } = await client
    .from("workspace_members")
    .select("role")
    .eq("workspace_id", data.workspace_id)
    .eq("user_id", user.id)
    .maybeSingle();
  if (!membership || !["owner", "admin", "editor"].includes(membership.role)) {
    throw new Error("You do not have permission to edit this page.");
  }
  return { client, user, page: data };
}

export async function bootstrapWorkspace(
  _previous: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  if (modes.application === "demo") return demoMutationResult;
  const parsed = onboardingSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, message: "Complete every onboarding step before continuing." };
  try {
    const { client } = await requireAuthenticatedClient();
    const workspaceSlug = `${slugify(parsed.data.workspaceName)}-${crypto.randomUUID().slice(0, 6)}`;
    const siteSlug = `${slugify(parsed.data.siteName)}-${crypto.randomUUID().slice(0, 6)}`;
    const { error } = await client.rpc("bootstrap_workspace", {
      workspace_name: parsed.data.workspaceName,
      workspace_slug: workspaceSlug,
      site_name: parsed.data.siteName,
      site_slug: siteSlug,
      site_type: parsed.data.siteType,
      member_role_label: parsed.data.role,
      starting_point: parsed.data.startingPoint,
    });
    if (error) return { ok: false, message: "The workspace could not be created. Try a different name." };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Workspace creation failed." };
  }
  revalidatePath("/app", "layout");
  redirect("/app/sites");
}

export async function createSite(
  _previous: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  if (modes.application === "demo") return demoMutationResult;
  const parsed = createSiteSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { ok: false, message: "Enter a valid site name." };
  try {
    const { client, user } = await requireAuthenticatedClient();
    const { data: membership } = await client
      .from("workspace_members")
      .select("workspace_id,role")
      .eq("user_id", user.id)
      .in("role", ["owner", "admin", "editor"])
      .order("created_at")
      .limit(1)
      .maybeSingle();
    if (!membership) return { ok: false, message: "No editable workspace was found." };
    const { data, error } = await client.rpc("create_site_with_homepage", {
      target_workspace_id: membership.workspace_id,
      site_name: parsed.data.name,
      site_slug: `${slugify(parsed.data.name)}-${crypto.randomUUID().slice(0, 6)}`,
      site_type: parsed.data.type,
    });
    if (error) return { ok: false, message: "The site could not be created." };
    const record = data as { site_id?: string } | null;
    revalidatePath("/app/sites");
    if (record?.site_id) redirect(`/app/sites/${record.site_id}/pages`);
    return { ok: true, message: "Site created." };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Site creation failed." };
  }
}

async function persistDraft(input: z.infer<typeof pageMutationSchema>) {
  const { client, page } = await requireEditor(input.pageId);
  const { data, error } = await client.rpc("save_page_draft", {
    target_page_id: input.pageId,
    expected_updated_at: input.expectedUpdatedAt,
    page_meta_title: input.metaTitle,
    page_meta_description: input.metaDescription,
    draft_blocks: input.blocks,
  });
  if (error) {
    if (error.message.includes("draft_conflict")) throw new Error("This page changed in another session. Reload before saving.");
    throw new Error("The draft could not be saved.");
  }
  revalidatePath(`/app/sites/${page.site_id}/pages`);
  revalidatePath(`/app/sites/${page.site_id}/pages/${input.pageId}/editor`);
  return data as { updated_at?: string } | null;
}

export async function savePageDraft(input: unknown): Promise<ActionResult> {
  const parsed = pageMutationSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: "The page contains invalid or unsupported blocks." };
  if (modes.application === "demo") return demoMutationResult;
  try {
    const result = await persistDraft(parsed.data);
    return { ok: true, message: "Draft saved", updatedAt: result?.updated_at || new Date().toISOString() };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Save failed." };
  }
}

export async function publishPage(input: unknown): Promise<ActionResult> {
  const parsed = pageMutationSchema.safeParse(input);
  if (!parsed.success) return { ok: false, message: "The page cannot be published until all blocks are valid." };
  if (modes.application === "demo") return demoMutationResult;
  try {
    const saved = await persistDraft(parsed.data);
    const { client, page } = await requireEditor(parsed.data.pageId);
    const { data, error } = await client.rpc("publish_page", {
      target_page_id: parsed.data.pageId,
      change_note: "Published from editor",
    });
    if (error) throw new Error("The immutable version could not be published.");
    const record = data as { version?: number } | null;
    revalidatePath(`/p`, "layout");
    revalidatePath(`/app/sites/${page.site_id}/pages/${parsed.data.pageId}/editor`);
    return {
      ok: true,
      message: `Version ${record?.version || "new"} is live.`,
      updatedAt: saved?.updated_at || new Date().toISOString(),
      version: record?.version,
    };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Publish failed." };
  }
}

export async function rollbackPublishedVersion(pageId: string, versionId: string): Promise<ActionResult> {
  if (modes.application === "demo") return demoMutationResult;
  const parsed = z.object({ pageId: z.uuid(), versionId: z.uuid() }).safeParse({ pageId, versionId });
  if (!parsed.success) return { ok: false, message: "Invalid version." };
  try {
    const { client, page } = await requireEditor(parsed.data.pageId);
    const { data, error } = await client.rpc("rollback_published_page", {
      target_page_id: parsed.data.pageId,
      target_version_id: parsed.data.versionId,
    });
    if (error) throw new Error("Rollback could not be completed.");
    const record = data as { version?: number } | null;
    revalidatePath(`/p`, "layout");
    revalidatePath(`/app/sites/${page.site_id}/pages/${parsed.data.pageId}/editor`);
    return { ok: true, message: `Published version ${record?.version || "selected"} restored.` };
  } catch (error) {
    return { ok: false, message: error instanceof Error ? error.message : "Rollback failed." };
  }
}
