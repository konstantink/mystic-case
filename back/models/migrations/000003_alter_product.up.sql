-- Add new column is_live
ALTER TABLE public.products ADD COLUMN is_live BOOLEAN NOT NULL DEFAULT false;