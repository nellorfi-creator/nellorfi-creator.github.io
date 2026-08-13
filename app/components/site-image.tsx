import type { ImgHTMLAttributes } from "react";

type SiteImageProps = ImgHTMLAttributes<HTMLImageElement>;

export default function SiteImage({
  alt,
  decoding = "async",
  loading = "lazy",
  ...props
}: SiteImageProps) {
  // Static-export assets are already curated locally; this component centralizes
  // native image loading without adding a runtime image proxy to GitHub Pages.
  // eslint-disable-next-line @next/next/no-img-element
  return <img alt={alt ?? ""} decoding={decoding} loading={loading} {...props} />;
}
