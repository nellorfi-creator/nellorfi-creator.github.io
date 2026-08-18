import { LEGAL_FOOTER_ENTITY } from "@/lib/legal";

type Props = {
  copyright?: string;
};

export default function LegalIdentity({ copyright = "© 2026 Revenge Gym" }: Props) {
  return (
    <>
      <span>{copyright}</span>
      <span className="footer-entity">{LEGAL_FOOTER_ENTITY}</span>
    </>
  );
}
