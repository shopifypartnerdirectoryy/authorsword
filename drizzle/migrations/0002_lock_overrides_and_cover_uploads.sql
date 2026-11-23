DROP POLICY IF EXISTS "Anyone reads service overrides" ON public.service_overrides;
REVOKE SELECT ON public.service_overrides FROM anon;
GRANT ALL ON public.service_overrides TO service_role;
CREATE POLICY "Admins read overrides" ON public.service_overrides
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'::app_role));

DROP POLICY IF EXISTS "Anyone can upload a book cover" ON storage.objects;