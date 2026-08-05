export type AiAction =
  | "rewrite"
  | "shorten"
  | "expand"
  | "tone"
  | "seo-title"
  | "meta-description"
  | "section"
  | "page-outline";
export interface AiProvider {
  complete(input: {
    action: AiAction;
    text: string;
  }): Promise<{ text: string; units: number }>;
}
