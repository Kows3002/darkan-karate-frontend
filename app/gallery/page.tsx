import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";

export const metadata: Metadata = {
  title: "Karate Tournament & Belt Grading Gallery",
  description: "Original photographs of Darkan students at the 2026 Chennai Karate Kobudo Championship and belt grading days in Tamil Nadu.",
};

export default function Gallery() {
  return <>
    <section className="gallery-hero">
      <div className="container gallery-hero__grid">
        <div><p>Darkan photo archive</p><h1>Tournament and grading days.</h1></div>
        <p>Original photographs of our students, instructors, medals, certificates and completed belt gradings.</p>
      </div>
    </section>
    <main className="gallery-page"><div className="container"><GalleryGrid/></div></main>
  </>;
}
