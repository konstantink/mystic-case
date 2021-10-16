-- First need to drop indices
DROP INDEX IF EXISTS tokens_user_idx;
DROP INDEX IF EXISTS sessions_user_idx;
DROP INDEX IF EXISTS users_email_idx;
DROP INDEX IF EXISTS users_username_idx;

-- Dropping table itself
DROP TABLE IF EXISTS tokens;
DROP TABLE IF EXISTS sessions;
DROP TABLE IF EXISTS users;