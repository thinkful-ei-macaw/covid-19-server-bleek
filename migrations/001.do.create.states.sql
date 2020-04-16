CREATE TABLE IF NOT EXISTS us_states (
    id INTEGER NOT NULL UNIQUE
        /*REFERENCES user_comments(comment_id) ON DELETE CASCADE*/,
    state_name TEXT NOT NULL,
    confirm_cases INTEGER NOT NULL,
    confirm_fatal INTEGER NOT NULL,
    date_updated TIMESTAMP DEFAULT now() NOT NULL
);