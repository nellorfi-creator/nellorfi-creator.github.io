CREATE TABLE IF NOT EXISTS daily_visits (
  visitor_key TEXT NOT NULL,
  visit_date TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (visitor_key, visit_date)
);

INSERT OR IGNORE INTO daily_visits (visitor_key, visit_date, created_at)
SELECT visitor_key, date(created_at), created_at
FROM unique_visitors;

PRAGMA optimize;
