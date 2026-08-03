import type {NextConfig} from "next";
const nextConfig:NextConfig={
  outputFileTracingRoot:process.cwd(),
  // Keep `next dev` and `next build` from overwriting each other's CSS assets.
  // This matters when a production verification build runs while the local
  // preview server is still open.
  distDir:process.env.NODE_ENV==="development"?".next-dev":".next",
};
export default nextConfig;
