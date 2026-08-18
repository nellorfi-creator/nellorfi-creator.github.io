"use client";

import { useState } from "react";

const MAP_EMBED =
  "https://www.google.com/maps?q=Revenge%20Gym%2C%20Via%20Berna%208%2C%2000055%20Ladispoli%20RM&z=14&output=embed";
const MAP_LINK =
  "https://www.google.com/maps/search/?api=1&query=Revenge%20Gym%2C%20Via%20Berna%208%2C%2000055%20Ladispoli%20RM";

export default function GymMap() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="map-placeholder">
      <div className="map-label">
        <span>●</span>
        <div>
          <strong>REVENGE GYM</strong>
          <small>Via Berna 8 · Ladispoli</small>
        </div>
      </div>
      {loaded ? (
        <iframe
          title="Mappa di Revenge Gym a Ladispoli"
          src={MAP_EMBED}
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <button type="button" className="map-consent" onClick={() => setLoaded(true)}>
          <strong>Carica Google Maps</strong>
          <small>Cliccando accetti il trasferimento di dati tecnici (incluso l’indirizzo IP) a Google.</small>
        </button>
      )}
      <a className="map-open" href={MAP_LINK} target="_blank" rel="noopener noreferrer">
        Apri la mappa <span>↗</span>
      </a>
    </div>
  );
}
