import { Footer, Header } from "@/components/marketing";
export default async function Legal({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return (
    <>
      <Header />
      <main id="content" className="inner-hero">
        <article className="container" style={{ maxWidth: 760 }}>
          <span className="eyebrow">Legal draft</span>
          <h1>{slug === "privacy" ? "Privacy policy" : "Terms of service"}</h1>
          <p className="muted">
            This document is a launch placeholder and must be reviewed for the
            operating company and jurisdiction before accepting production
            customers.
          </p>
          <h2 style={{ fontSize: 28 }}>Current status</h2>
          <p>
            No production customer data is intentionally collected in
            unconfigured demo mode. Once database, authentication, analytics,
            email or billing services are activated, this policy must name the
            controller, processors, retention periods and user rights.
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
