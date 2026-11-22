
create policy "Anyone can upload a book cover" on storage.objects for insert to anon, authenticated
with check (bucket_id = 'book-covers' and (storage.foldername(name))[1] = 'submissions');
create policy "Admins can view book covers" on storage.objects for select to authenticated
using (bucket_id = 'book-covers' and public.has_role(auth.uid(), 'admin'));
create policy "Admins can delete book covers" on storage.objects for delete to authenticated
using (bucket_id = 'book-covers' and public.has_role(auth.uid(), 'admin'));
