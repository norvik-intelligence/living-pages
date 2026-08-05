import { describe, expect, it } from "vitest";
import { blockSchema } from "../../lib/blocks";
describe("block schema", () => {
  it("accepts a structured hero", () => {
    expect(
      blockSchema.safeParse({
        id: "d9428888-122b-11e1-b85c-61cd3cbb3210",
        page_id: "d9428888-122b-11e1-b85c-61cd3cbb3211",
        type: "hero",
        version: 1,
        content_props: { headline: "Hello" },
        style_props: {},
        visibility_props: { desktop: true, tablet: true, mobile: true },
        order: 0,
      }).success,
    ).toBe(true);
  });
  it("rejects arbitrary html block types", () => {
    expect(blockSchema.safeParse({ type: "html" }).success).toBe(false);
  });
});
