import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  // Keep Turbopack scoped to this project when another lockfile exists higher
  // in the user's filesystem (as happens on the local Mac).
  turbopack: { root: process.cwd() },
  // GitHub Pages serves static files only. The hosted Sites build keeps its
  // normal server output, while the GitHub workflow enables this export.
  output: isGitHubPages ? "export" : undefined,
  // Emit /nuove-macchine/index.html so GitHub Pages resolves /nuove-macchine/.
  trailingSlash: isGitHubPages ? true : undefined,
  images: { unoptimized: isGitHubPages },
};

export default nextConfig;
