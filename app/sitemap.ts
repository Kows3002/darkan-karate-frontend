import type { MetadataRoute } from "next";

const productionOrigin = "https://darkankarate.in";
const routes = ["", "/about", "/dojos", "/events", "/gallery", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
    return routes.map((path) => ({
        url: `${productionOrigin}${path || "/"}`,
        lastModified: new Date("2026-08-30"),
        changeFrequency: path === "" ? "weekly" : "monthly",
        priority: path === "" ? 1 : 0.7,
    }));
}
