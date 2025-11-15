import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  cacheComponents: true,
  typedRoutes: true,

  experimental:{
    typedEnv: true
  }
};

export default nextConfig;
