import { GalleryGrid } from "@/components/GalleryGrid";
import { createPageMetadata } from "@/data/metadata";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbStructuredData } from "@/data/structuredData";

export const metadata = createPageMetadata({
  title: "Karate Tournament & Grading Gallery | Darkan",
  description: "Explore original photos of Darkan students, instructors, tournament medals, certificates and karate belt grading achievements across Tamil Nadu.",
  path: "/gallery",
  image: "/images/gallery/national-tournament-medallists-2026-hd.webp",
  imageAlt: "Darkan karate students with medals and certificates at a national tournament",
  imageWidth: 2400,
  imageHeight: 1800,
});

export default function Gallery() {
  return <>
    <JsonLd data={breadcrumbStructuredData("Gallery", "/gallery")}/>
    <section className="gallery-hero">
      <div className="container gallery-hero__grid">
        <div><p>Darkan photo archive</p><h1>Tournament and grading days.</h1></div>
        <p>Original photographs of our students, instructors, medals, certificates and completed belt gradings.</p>
      </div>
    </section>
    <div className="gallery-page"><div className="container"><GalleryGrid/></div></div>
  </>;
}
