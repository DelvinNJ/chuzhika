import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS || false;
const repoName = "chuzhika";

const nextConfig: NextConfig = {
  output: "export",
  // In GitHub Actions, automatically set basePath to repository name for GitHub Pages
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? (isGithubActions ? `/${repoName}` : ""),
  images: {
    unoptimized: true,
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
