import Link from "next/link";

type Props = {
  className?: string;
};

export default function NelloCredit({ className }: Props) {
  return (
    <span className={className ?? "by-nello"} style={{ textTransform: "none", position: "relative" }}>
      © by nello 2026
      <Link href="/stats/" className="nello-gate" aria-hidden="true" tabIndex={-1} prefetch={false} />
    </span>
  );
}
