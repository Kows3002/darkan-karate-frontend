import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page Not Found | Darkan Karate Academy",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="section paper-grid" aria-labelledby="not-found-title">
      <div className="container">
        <p className="eyebrow">Error 404</p>
        <h1 className="title serif" id="not-found-title">This page could not be found.</h1>
        <p className="muted">The address may be outdated or mistyped. Continue to the academy homepage or find a nearby dojo.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginTop: "28px" }}>
          <Link className="btn btn-red" href="/">Return home</Link>
          <Link className="btn" href="/dojos">Find a dojo</Link>
        </div>
      </div>
    </section>
  );
}
