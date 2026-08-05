import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Footer, Header } from "@/components/marketing";
const data: Record<
  string,
  { k: string; t: string; d: string; items: string[] }
> = {
  product: {
    k: "Living Pages",
    t: "A website system, not a website project.",
    d: "Structure, content, brand and publishing live in one controlled operating layer.",
    items: [
      "Component-based visual editor",
      "Versioned publishing and preview",
      "Brand-governed AI suggestions",
      "Content sources and automations",
    ],
  },
  portfolio: {
    k: "Living Portfolio",
    t: "Your best work should keep working.",
    d: "A living portfolio for creators, freelancers and studios—built around proof, not posts.",
    items: [
      "Project and case study system",
      "Dynamic expertise pages",
      "Testimonial content type",
      "Custom domain publishing",
    ],
  },
  commerce: {
    k: "Living Commerce · Planned",
    t: "Turn living content into commercial momentum.",
    d: "Products, services, bookings and stories will share the same brand and content core.",
    items: [
      "Physical and digital products",
      "Services and bookings",
      "Order architecture",
      "No platform tax planned",
    ],
  },
  enterprise: {
    k: "Living Enterprise · Roadmap",
    t: "One standard. Every brand. Every market.",
    d: "Governance infrastructure prepared for multi-brand and multi-location organizations.",
    items: [
      "Role-based governance",
      "Global components and local overrides",
      "Approval workflows",
      "SSO and audit logs planned",
    ],
  },
  templates: {
    k: "Templates",
    t: "Designed systems. Not disposable themes.",
    d: "Each template is a responsive component system ready to inherit your brand.",
    items: ["Business", "Portfolio", "Service", "Editorial"],
  },
  showcase: {
    k: "Showcase",
    t: "Built to feel authored, not generated.",
    d: "The public showcase opens after the first verified customer sites are published.",
    items: [
      "No invented customer logos",
      "No fabricated performance numbers",
      "Verified sites only",
      "Submit workflow planned",
    ],
  },
  integrations: {
    k: "Integrations",
    t: "Connect the systems that already know your business.",
    d: "Version one supports RSS and structured imports. Every other connector is visibly marked as planned.",
    items: [
      "RSS · Available",
      "JSON import · Available",
      "Manual content · Available",
      "Shopify, Notion, GitHub · Planned",
    ],
  },
  agencies: {
    k: "For agencies",
    t: "Build the system once. Scale the craft.",
    d: "Manage repeatable quality without turning every client site into the same template.",
    items: [
      "25 client sites on Agency",
      "Reusable brand rules",
      "Client roles prepared",
      "Transfer workflow planned",
    ],
  },
  resources: {
    k: "Resources",
    t: "The operating manual for a living web.",
    d: "Practical frameworks for content systems, brand governance and responsible automation.",
    items: [
      "Guides launching soon",
      "Product documentation",
      "Security overview",
      "Release notes",
    ],
  },
  security: {
    k: "Security",
    t: "Control is part of the product.",
    d: "Tenant isolation, server-side authorization and explicit approval boundaries shape the architecture from day one.",
    items: [
      "Row Level Security",
      "No service keys in browsers",
      "Validated structured content",
      "Versioned publishing",
    ],
  },
};
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const x = data[slug];
  if (!x) notFound();
  return (
    <>
      <Header />
      <main id="content">
        <section className="inner-hero">
          <div className="container">
            <span className="eyebrow">{x.k}</span>
            <h1>{x.t}</h1>
            <p className="muted">{x.d}</p>
            <Link className="button dark" href="/signup">
              Start building <ArrowRight size={16} />
            </Link>
          </div>
        </section>
        <section className="section">
          <div className="container grid-2">
            {x.items.map((i, n) => (
              <article className="card" key={i}>
                <span className="num">0{n + 1}</span>
                <h3>{i}</h3>
                <p>
                  <Check size={15} /> Designed as part of the shared Living
                  Pages core.
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
