import type { Metadata } from "next";
import { site } from "@/data/site";

type PageMetadata = {
  title: string;
  description: string;
  path: string;
  image: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
};

export function createPageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
  imageWidth,
  imageHeight,
}: PageMetadata): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: { canonical: path },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      siteName: site.shortName,
      url: path,
      title,
      description,
      images: [{ url: image, width: imageWidth, height: imageHeight, alt: imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: image, alt: imageAlt }],
    },
  };
}
