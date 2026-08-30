import type {Metadata,Viewport} from "next";import "./globals.css";import {Header} from "@/components/Header";import {Footer} from "@/components/Footer";import {site} from "@/data/site";
export const metadata:Metadata={metadataBase:new URL(site.url),applicationName:site.shortName,category:"sports",icons:{icon:"/images/brand/darkan-academy-logo-clean.webp",apple:"/images/brand/darkan-academy-logo-clean.webp"}};
export const viewport:Viewport={width:"device-width",initialScale:1,themeColor:"#f5f0e5",colorScheme:"light"};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en-IN"><body><a href="#main" className="skip">Skip to content</a><Header/><main id="main">{children}</main><Footer/></body></html>}
