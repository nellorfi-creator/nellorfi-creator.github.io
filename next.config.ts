import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // GitHub Pages serves static files only. The hosted Sites build keeps its
  // normal server output, while the GitHub workflow enables this export.
  output: isGitHubPages ? "export" : undefined,
  images: { unoptimized: isGitHubPages },
  // The static site does not use the Cloudflare-only database/worker files.
  // Vinext still validates them for the normal hosted build.
  typescript: { ignoreBuildErrors: isGitHubPages },
};

export default nextConfig;
