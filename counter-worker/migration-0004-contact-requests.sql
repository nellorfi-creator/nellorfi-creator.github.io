-- Registro di sicurezza delle richieste arrivate dal modulo pubblico.
-- I dati vengono salvati solo dopo l'accettazione della privacy policy.
CREATE TABLE IF NOT EXISTS contact_requests (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  course TEXT NOT NULL,
  message TEXT NOT NULL DEFAULT '',
  delivery_status TEXT NOT NULL CHECK (delivery_status IN ('pending', 'accepted', 'failed')),
  resend_id TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  delivered_at TEXT
);

CREATE INDEX IF NOT EXISTS contact_requests_created_at_idx
  ON contact_requests (created_at DESC);
