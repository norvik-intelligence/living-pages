import { AppShell } from "@/components/app-shell";
import "./workspace.css";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
