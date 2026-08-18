/** Identità giuridica del sito. Sede pubblicata: Via Berna, non il vecchio indirizzo del timbro. */
export const LEGAL_ENTITY = {
  brand: "Revenge Gym",
  legalName: "ASD Revenge Boxe",
  taxId: "91081080581",
  street: "Via Berna 8",
  city: "Ladispoli",
  postalCode: "00055",
  province: "RM",
  country: "IT",
} as const;

export const LEGAL_ADDRESS_LINE = "Via Berna 8, 00055 Ladispoli RM";

export const LEGAL_FOOTER_ENTITY = `${LEGAL_ENTITY.legalName} · C.F. ${LEGAL_ENTITY.taxId} · ${LEGAL_ADDRESS_LINE}`;
