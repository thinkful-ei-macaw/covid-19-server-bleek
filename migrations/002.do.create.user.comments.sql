CREATE TABLE IF NOT EXISTS user_comments (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    state_id INTEGER REFERENCES us_states(id) ON DELETE CASCADE,
    user_name TEXT NOT NULL,
    comment_body TEXT NOT NULL,
    date_posted TIMESTAMPTZ DEFAULT now() NOT NULL
);