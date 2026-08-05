export type Plan =
  | "free"
  | "portfolio"
  | "pages"
  | "business"
  | "commerce"
  | "agency"
  | "enterprise";
const limits: Record<
  Plan,
  {
    sites: number;
    pages: number;
    members: number;
    customDomain: boolean;
    automation: boolean;
    removeBranding: boolean;
  }
> = {
  free: {
    sites: 1,
    pages: 3,
    members: 1,
    customDomain: false,
    automation: false,
    removeBranding: false,
  },
  portfolio: {
    sites: 1,
    pages: 20,
    members: 1,
    customDomain: true,
    automation: false,
    removeBranding: true,
  },
  pages: {
    sites: 1,
    pages: 20,
    members: 1,
    customDomain: true,
    automation: true,
    removeBranding: true,
  },
  business: {
    sites: 5,
    pages: 100,
    members: 3,
    customDomain: true,
    automation: true,
    removeBranding: true,
  },
  commerce: {
    sites: 5,
    pages: 100,
    members: 3,
    customDomain: true,
    automation: true,
    removeBranding: true,
  },
  agency: {
    sites: 25,
    pages: 500,
    members: 20,
    customDomain: true,
    automation: true,
    removeBranding: true,
  },
  enterprise: {
    sites: Infinity,
    pages: Infinity,
    members: Infinity,
    customDomain: true,
    automation: true,
    removeBranding: true,
  },
};
export function entitlements(
  plan: Plan,
  usage = { sites: 0, pages: 0, members: 0 },
) {
  const l = limits[plan];
  return {
    canCreateSite: usage.sites < l.sites,
    canAddPage: usage.pages < l.pages,
    canUseCustomDomain: l.customDomain,
    canRemoveBranding: l.removeBranding,
    canInviteMember: usage.members < l.members,
    canUseAutomation: l.automation,
    canUseAiAction: true,
    limits: l,
  };
}
