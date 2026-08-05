import { z } from "zod";

export const editableBlockTypes = [
  "header",
  "hero",
  "feature-grid",
  "text",
  "cta",
  "divider",
  "footer",
] as const;

export const draftBlockSchema = z.object({
  id: z.uuid(),
  type: z.enum(editableBlockTypes),
  version: z.number().int().positive().default(1),
  content: z.record(z.string(), z.unknown()),
  style: z.record(z.string(), z.unknown()).default({}),
  visibility: z
    .object({
      desktop: z.boolean(),
      tablet: z.boolean(),
      mobile: z.boolean(),
    })
    .default({ desktop: true, tablet: true, mobile: true }),
});

export const draftBlocksSchema = z.array(draftBlockSchema).min(1).max(80);

export type DraftBlock = z.infer<typeof draftBlockSchema>;

export type WorkspaceContext = {
  mode: "connected" | "demo";
  user: { id: string; name: string; email: string };
  workspace: { id: string; name: string; slug: string; role: string };
  site: { id: string; name: string; slug: string; status: string } | null;
};

export type SiteSummary = {
  id: string;
  name: string;
  slug: string;
  status: string;
  updatedAt: string;
  pages: number;
};

export type PageSummary = {
  id: string;
  siteId: string;
  name: string;
  slug: string;
  status: string;
  isHomepage: boolean;
  updatedAt: string;
  publishedVersionId: string | null;
};

export type EditorPage = PageSummary & {
  siteName: string;
  siteSlug: string;
  metaTitle: string;
  metaDescription: string;
  blocks: DraftBlock[];
  versions: Array<{
    id: string;
    version: number;
    note: string;
    createdAt: string;
  }>;
};
