ALTER TABLE public.book_submissions ADD COLUMN IF NOT EXISTS goodreads_link text;
ALTER TABLE public.book_submissions ADD COLUMN IF NOT EXISTS project_objectives text;