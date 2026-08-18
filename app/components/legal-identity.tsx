import { LEGAL_FOOTER_ENTITY, LEGAL_TRADEMARK_DISCLAIMER } from "@/lib/legal";

type Props = {
  copyright?: string;
};

export default function LegalIdentity({ copyright = "© 2026 Revenge Gym" }: Props) {
  return (
    <>
      <span>{copyright}</span>
      <span className="footer-entity">{LEGAL_FOOTER_ENTITY}</span>
      <span className="footer-disclaimer">{LEGAL_TRADEMARK_DISCLAIMER}</span>
    </>
  );
}
