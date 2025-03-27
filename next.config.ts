import type { NextConfig } from "next";
import path from "path";
const nextConfig: NextConfig = {
  /* config options here */
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
    additionalData: `$var: red;`,
  },
  images: {
    remotePatterns: [
      {
        hostname: "openweathermap.org",
      },
    ],
  },
};

export default nextConfig;
