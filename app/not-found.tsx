import Link from "next/link";
import { Logo } from "@/components/logo";

export default function NotFound() {
  return <main className="not-found-page" id="content"><Logo /><span className="eyebrow">404 · Not found</span><h1>This page is not part of the living system.</h1><p>It may have moved, remained a draft or never been published.</p><Link className="button dark" href="/">Return home</Link></main>;
}
