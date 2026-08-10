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
  // The static site does not use the Cloudflare-only database/worker files.
  // Vinext still validates them for the normal hosted build.
  typescript: { ignoreBuildErrors: isGitHubPages },
};

export default nextConfig;
