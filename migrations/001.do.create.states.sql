CREATE TABLE IF NOT EXISTS us_states (
    state_name TEXT NOT NULL, 
    id INTEGER NOT NULL UNIQUE,
    confirm_cases INTEGER NOT NULL,
    confirm_fatal INTEGER NOT NULL,
    date_updated TIMESTAMP DEFAULT now() NOT NULL
);