-- First need to drop indices
DROP INDEX IF EXISTS users_email_idx;
DROP INDEX IF EXISTS users_username_idx;

-- Dropping table itself
DROP TABLE IF EXISTS users;