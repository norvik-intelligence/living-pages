import { AppShell } from "@/components/app-shell";
import { getWorkspaceContext } from "@/lib/core/data";
import "./workspace.css";

export default async function Layout({ children }: { children: React.ReactNode }) {
  const context = await getWorkspaceContext();
  return <AppShell context={context}>{children}</AppShell>;
}
