DROP TABLE IF EXISTS daily_visits;

CREATE TABLE IF NOT EXISTS unique_visitors (
  visitor_key TEXT PRIMARY KEY,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS counter_totals (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  page_views INTEGER NOT NULL DEFAULT 0
);

INSERT OR IGNORE INTO counter_totals (id, page_views) VALUES (1, 0);

PRAGMA optimize;
