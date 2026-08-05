import { z } from "zod";
export const blockSchema = z.object({
  id: z.uuid(),
  page_id: z.uuid(),
  type: z.enum([
    "header",
    "hero",
    "feature-grid",
    "services",
    "stats",
    "testimonials",
    "case-studies",
    "cta",
    "faq",
    "contact",
    "footer",
    "image",
    "text",
    "button",
    "spacer",
    "divider",
  ]),
  version: z.number().int().positive(),
  content_props: z.record(z.string(), z.unknown()),
  style_props: z.record(z.string(), z.unknown()),
  visibility_props: z.object({
    desktop: z.boolean(),
    tablet: z.boolean(),
    mobile: z.boolean(),
  }),
  order: z.number().int().nonnegative(),
});
export type PageBlock = z.infer<typeof blockSchema>;
