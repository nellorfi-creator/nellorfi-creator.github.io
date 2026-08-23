import type { ReactNode } from "react";

type CourseAreaIconKind = "strength" | "isotonic" | "cardio" | "free";

const paths: Record<CourseAreaIconKind, ReactNode> = {
  strength: (
    <path d="M12 28h8l2-8h8l2 8h8l-6 14 4 10H14l4-10-6-14Z" fill="currentColor" />
  ),
  isotonic: (
    <>
      <rect x="14" y="10" width="20" height="28" rx="2" fill="currentColor" />
      <path d="M20 14v20M28 14v20" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  cardio: (
    <>
      <path d="M18 32c0-8 6-14 12-14s12 6 12 14" stroke="currentColor" strokeWidth="4" strokeLinecap="round" fill="none" />
      <circle cx="18" cy="32" r="4" fill="currentColor" />
      <circle cx="42" cy="32" r="4" fill="currentColor" />
    </>
  ),
  free: (
    <>
      <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="4" fill="none" />
      <circle cx="24" cy="24" r="5" fill="currentColor" />
    </>
  ),
};

export function CourseAreaIcon({ kind, className }: { kind: CourseAreaIconKind; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      {paths[kind]}
    </svg>
  );
}

export type { CourseAreaIconKind };
