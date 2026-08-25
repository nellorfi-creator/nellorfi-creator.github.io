CREATE TABLE IF NOT EXISTS daily_page_views (
  visit_date TEXT PRIMARY KEY,
  views INTEGER NOT NULL DEFAULT 0
);

PRAGMA optimize;
