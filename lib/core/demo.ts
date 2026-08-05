import type { DraftBlock, EditorPage, SiteSummary, WorkspaceContext } from "./types";

export const demoContext: WorkspaceContext = {
  mode: "demo",
  user: { id: "demo-user", name: "Mocca", email: "demo@livingpages.local" },
  workspace: {
    id: "demo-workspace",
    name: "Northstar Studio",
    slug: "northstar-studio",
    role: "owner",
  },
  site: {
    id: "demo-site",
    name: "Northstar Website",
    slug: "northstar",
    status: "draft",
  },
};

export const demoBlocks: DraftBlock[] = [
  {
    id: "d9428888-122b-11e1-b85c-61cd3cbb3201",
    type: "header",
    version: 1,
    content: { brand: "Northstar", links: "Services,Work,About,Contact" },
    style: { theme: "light" },
    visibility: { desktop: true, tablet: true, mobile: true },
  },
  {
    id: "d9428888-122b-11e1-b85c-61cd3cbb3202",
    type: "hero",
    version: 1,
    content: {
      eyebrow: "Northstar studio",
      headline: "Strategy for brands moving forward.",
      body: "We turn complex ambition into clear systems, distinctive identities and digital products built to last.",
      button: "Explore our work",
    },
    style: { tone: "ivory", align: "left" },
    visibility: { desktop: true, tablet: true, mobile: true },
  },
  {
    id: "d9428888-122b-11e1-b85c-61cd3cbb3203",
    type: "feature-grid",
    version: 1,
    content: {
      heading: "Three disciplines. One direction.",
      items: [
        { title: "Direction", body: "Strategy that aligns teams and decisions." },
        { title: "Identity", body: "A system built for recognition and growth." },
        { title: "Experience", body: "Products that make the strategy tangible." },
      ],
    },
    style: {},
    visibility: { desktop: true, tablet: true, mobile: true },
  },
  {
    id: "d9428888-122b-11e1-b85c-61cd3cbb3204",
    type: "cta",
    version: 1,
    content: { headline: "Make the next move unmistakable.", button: "Start a project" },
    style: { tone: "dark" },
    visibility: { desktop: true, tablet: true, mobile: true },
  },
  {
    id: "d9428888-122b-11e1-b85c-61cd3cbb3205",
    type: "footer",
    version: 1,
    content: { brand: "Northstar", note: "Independent strategy and design studio." },
    style: {},
    visibility: { desktop: true, tablet: true, mobile: true },
  },
];

export const demoSite: SiteSummary = {
  id: "demo-site",
  name: "Northstar Website",
  slug: "northstar",
  status: "draft",
  updatedAt: new Date(0).toISOString(),
  pages: 1,
};

export const demoPage: EditorPage = {
  id: "demo-page",
  siteId: demoSite.id,
  siteName: demoSite.name,
  siteSlug: demoSite.slug,
  name: "Home",
  slug: "home",
  status: "draft",
  isHomepage: true,
  updatedAt: new Date(0).toISOString(),
  publishedVersionId: null,
  metaTitle: "Northstar — Strategy for brands moving forward",
  metaDescription: "Independent strategy and design studio.",
  blocks: demoBlocks,
  versions: [],
};
