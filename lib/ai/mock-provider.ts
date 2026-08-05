import type { AiProvider } from "./provider";
export const mockProvider: AiProvider = {
  async complete({ action, text }) {
    const clean = text.trim().replace(/\s+/g, " ");
    const transforms = {
      rewrite: `Clearer version: ${clean}`,
      shorten: clean.split(" ").slice(0, 12).join(" "),
      expand: `${clean} This deterministic demo extension shows the workflow without claiming a live AI result.`,
      tone: `Measured and direct: ${clean}`,
      "seo-title": `${clean.slice(0, 52)} | Living Pages`,
      "meta-description": clean.slice(0, 155),
      section: `Section draft: ${clean}`,
      "page-outline": `1. Context\n2. Value\n3. Proof\n4. Next step`,
    };
    return {
      text: transforms[action],
      units: Math.max(1, Math.ceil(clean.length / 40)),
    };
  },
};
