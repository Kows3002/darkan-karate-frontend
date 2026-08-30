import type {NextConfig} from "next";
const nextConfig:NextConfig={
  outputFileTracingRoot:process.cwd(),
  experimental:{optimizePackageImports:["lucide-react"]},
  async redirects(){return [
    {source:"/about-us",destination:"/about",permanent:true},
    {source:"/dojo",destination:"/dojos",permanent:true},
    {source:"/classes",destination:"/dojos",permanent:true},
    {source:"/event",destination:"/events",permanent:true},
    {source:"/photos",destination:"/gallery",permanent:true},
    {source:"/contact-us",destination:"/contact",permanent:true},
    {source:"/enquiry",destination:"/contact",permanent:true},
    {source:"/dojos/thiruvenkadu",destination:"/dojos#thiruverkadu",permanent:true},
  ]},
  async headers(){return [
    {source:"/sitemap.xml",headers:[{key:"Cache-Control",value:"public, max-age=0, must-revalidate"}]},
    {source:"/robots.txt",headers:[{key:"Cache-Control",value:"public, max-age=0, must-revalidate"}]},
    {source:"/images/:path*",headers:[{key:"Cache-Control",value:"public, max-age=31536000, immutable"}]},
    {source:"/:path*",headers:[
      {key:"X-Content-Type-Options",value:"nosniff"},
      {key:"Referrer-Policy",value:"strict-origin-when-cross-origin"},
      {key:"Permissions-Policy",value:"camera=(), microphone=(), geolocation=()"},
      {key:"X-Frame-Options",value:"DENY"},
    ]},
  ]},
  // Keep `next dev` and `next build` from overwriting each other's CSS assets.
  // This matters when a production verification build runs while the local
  // preview server is still open.
  distDir:process.env.NODE_ENV==="development"?".next-dev":".next",
};
export default nextConfig;
