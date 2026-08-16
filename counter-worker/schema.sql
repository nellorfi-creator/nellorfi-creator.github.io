CREATE TABLE IF NOT EXISTS unique_visitors (
  visitor_key TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS daily_visits (
  visitor_key TEXT NOT NULL,
  visit_date TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (visitor_key, visit_date)
);

CREATE TABLE IF NOT EXISTS counter_totals (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  page_views INTEGER NOT NULL DEFAULT 0
);

INSERT OR IGNORE INTO counter_totals (id, page_views) VALUES (1, 0);

PRAGMA optimize;
