import { notFound } from "next/navigation";
import { Editor } from "@/components/editor";
import { PageRenderer } from "@/components/page-renderer";
import { PagesView, SitesView } from "@/components/site-management";
import { WorkspaceModule } from "@/components/workspace-module";
import { getEditorPage, getPages, getSites, getWorkspaceContext } from "@/lib/core/data";

export default async function ModulePage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  const context = await getWorkspaceContext();

  if (slug.length === 1 && slug[0] === "sites") {
    return <SitesView sites={await getSites()} isDemo={context.mode === "demo"} />;
  }
  if (slug[0] === "sites" && slug[2] === "pages" && slug.length === 3) {
    const pages = await getPages(slug[1]);
    return <PagesView siteId={slug[1]} siteName={context.site?.name || "Site"} pages={pages} isDemo={context.mode === "demo"} />;
  }
  if (slug[0] === "sites" && slug[2] === "pages" && slug[4] === "editor") {
    const page = await getEditorPage(slug[3]);
    if (!page) notFound();
    return <Editor page={page} isDemo={context.mode === "demo"} />;
  }
  if (slug[0] === "sites" && slug[2] === "pages" && slug[4] === "preview") {
    const page = await getEditorPage(slug[3]);
    if (!page) notFound();
    return <div className="draft-preview-shell"><div className="draft-preview-bar"><span>Private draft preview</span><a href={`/app/sites/${slug[1]}/pages/${slug[3]}/editor`}>Return to editor</a></div><PageRenderer blocks={page.blocks} /></div>;
  }
  return <WorkspaceModule slug={slug[0]} mode={context.mode} />;
}
