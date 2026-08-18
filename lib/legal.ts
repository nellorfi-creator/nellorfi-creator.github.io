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

export const CONTACT_PHONE = "347 536 8488";
export const CONTACT_PHONE_TEL = "+393475368488";

export const CONTACT_EMAIL = "info@revengegymboxe.it";

export const CONTACT_FORM_URL = "https://revenge-gym-visit-counter.revenge-gym-ladispoli.workers.dev/contact";

export const LEGAL_TRADEMARK_DISCLAIMER =
  "Panatta, Hammer Strength, Life Fitness, Precor, Hoist, Nautilus, Star Trac, Gymleco, Teca, Technogym e gli altri marchi citati sono di proprietà dei rispettivi titolari. Revenge Gym non è affiliata, sponsorizzata o certificata da tali aziende, salvo diverso accordo scritto.";
