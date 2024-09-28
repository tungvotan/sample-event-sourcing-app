CREATE TABLE accounts (
  account_id VARCHAR PRIMARY KEY,
  balance NUMERIC NOT NULL DEFAULT 0,
  version INT NOT NULL DEFAULT 0
);

CREATE TABLE account_events (
  id SERIAL PRIMARY KEY,
  account_id VARCHAR NOT NULL REFERENCES accounts(account_id) ON DELETE CASCADE,
  event_type VARCHAR NOT NULL,
  payload JSONB NOT NULL,
  version INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

