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

-- Create table access_tokens
CREATE TABLE IF NOT EXISTS public.access_tokens (
    id uuid PRIMARY KEY,
    user_id uuid,
    active BOOLEAN,
    expires_at BIGINT,
    token TEXT,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
);

ALTER TABLE public.access_tokens OWNER TO mysticcase;

-- Create indices
CREATE INDEX access_tokens_user_idx ON public.access_tokens USING btree(user_id);

-- Create table refresh_tokens
CREATE TABLE IF NOT EXISTS public.refresh_tokens (
    id uuid PRIMARY KEY,
    user_id uuid,
    active BOOLEAN,
    expires_at BIGINT,
    token TEXT,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE
);

ALTER TABLE public.refresh_tokens OWNER TO mysticcase;

-- Create indices
CREATE INDEX refresh_tokens_user_idx ON public.refresh_tokens USING btree(user_id);

-- Create table sessions
CREATE TABLE IF NOT EXISTS public.sessions (
    id uuid PRIMARY KEY,
    user_id uuid,
    active BOOLEAN,
    expires_at BIGINT,
    json JSON,
    access_token_id uuid,
    refresh_token_id uuid,
    CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES public.users(id) ON DELETE CASCADE,
    CONSTRAINT fk_access_token FOREIGN KEY (access_token_id) REFERENCES public.access_tokens(id) ON DELETE CASCADE,
    CONSTRAINT fk_refresh_token FOREIGN KEY (refresh_token_id) REFERENCES public.refresh_tokens(id) ON DELETE CASCADE
);

ALTER TABLE public.sessions OWNER TO mysticcase;

-- Create indices
CREATE INDEX sessions_user_idx ON public.sessions USING btree(user_id);
CREATE INDEX sessions_access_token_idx ON public.sessions USING btree(access_token_id);
CREATE INDEX sessions_refresh_token_idx ON public.sessions USING btree(refresh_token_id);
