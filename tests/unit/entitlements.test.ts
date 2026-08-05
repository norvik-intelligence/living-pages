import { describe, expect, it } from "vitest";
import { entitlements } from "../../lib/entitlements";
describe("entitlements", () => {
  it("enforces free site and page limits", () => {
    expect(
      entitlements("free", { sites: 1, pages: 3, members: 1 }),
    ).toMatchObject({
      canCreateSite: false,
      canAddPage: false,
      canUseCustomDomain: false,
    });
  });
  it("enables business collaboration centrally", () => {
    expect(
      entitlements("business", { sites: 1, pages: 5, members: 2 }),
    ).toMatchObject({
      canInviteMember: true,
      canUseAutomation: true,
      canUseCustomDomain: true,
    });
  });
});
