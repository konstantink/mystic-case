-- Create table users
CREATE TABLE IF NOT EXISTS public.users (
    id uuid PRIMARY KEY,
    username VARCHAR(64) UNIQUE NOT NULL,
    first_name VARCHAR(32) NOT NULL,
    last_name VARCHAR(32) NOT NULL,
    email VARCHAR(128) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    is_admin BOOLEAN NOT NULL,
    deleted_at timestamp without time zone,
    created_at timestamp without time zone NOT NULL,
    updated_at timestamp without time zone NOT NULL
);

ALTER TABLE public.users OWNER TO mysticcase;

-- Create indices
CREATE INDEX users_email_idx ON public.users USING btree (email);
CREATE INDEX users_username_idx ON public.users USING btree (username);

-- Create table sessions
CREATE TABLE IF NOT EXISTS public.sessions (
    id uuid PRIMARY KEY,
    user_id uuid,
    active BOOLEAN,
    expires_at BIGINT,
    json JSON,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
);

ALTER TABLE public.sessions OWNER TO mysticcase;

-- Create indices
CREATE INDEX sessions_user_idx ON public.sessions USING btree(user_id);

-- Create table tokens
CREATE TABLE IF NOT EXISTS public.tokens (
    id uuid PRIMARY KEY,
    user_id uuid,
    active BOOLEAN,
    expires_at BIGINT,
    value TEXT,
    type SMALLINT,
    refreshed_from_id uuid,
    session_id uuid,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE,
    CONSTRAINT fk_refreshed_from FOREIGN KEY (refreshed_from_id) REFERENCES public.tokens(id) ON DELETE SET NULL
    -- CONSTRAINT fk_session FOREIGN KEY (session_id) REFERENCES public.sessions(id) ON DELETE CASCADE
);

ALTER TABLE public.tokens OWNER TO mysticcase;

-- Create indices
CREATE INDEX tokens_user_idx ON public.tokens USING btree(user_id);
