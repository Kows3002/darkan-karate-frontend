import type {MetadataRoute} from "next";import {site,navigation} from "@/data/site";
export default function sitemap():MetadataRoute.Sitemap{return navigation.map(([,path])=>({url:`${site.url}${path}`,lastModified:new Date(),changeFrequency:path==="/"?"weekly":"monthly",priority:path==="/" ? 1:.7}))}
