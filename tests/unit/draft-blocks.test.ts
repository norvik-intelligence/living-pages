import { describe, expect, it } from "vitest";
import { draftBlocksSchema } from "../../lib/core/types";
import { demoBlocks } from "../../lib/core/demo";

describe("draft block contract", () => {
  it("accepts the governed demo composition", () => {
    expect(draftBlocksSchema.safeParse(demoBlocks).success).toBe(true);
  });

  it("rejects arbitrary HTML and script block types", () => {
    const malicious = [{ ...demoBlocks[0], type: "html", content: { html: "<script>alert(1)</script>" } }];
    expect(draftBlocksSchema.safeParse(malicious).success).toBe(false);
  });

  it("caps a page at eighty blocks", () => {
    const oversized = Array.from({ length: 81 }, (_, index) => ({ ...demoBlocks[1], id: `d9428888-122b-11e1-b85c-${String(index).padStart(12, "0")}` }));
    expect(draftBlocksSchema.safeParse(oversized).success).toBe(false);
  });
});
