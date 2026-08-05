import { Editor } from "@/components/editor";
import { PagesTable, WorkspaceModule } from "@/components/workspace-module";
export default async function ModulePage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  if (slug.includes("editor")) return <Editor />;
  if (slug.at(-1) === "pages") return <PagesTable />;
  return <WorkspaceModule slug={slug[0]} />;
}
