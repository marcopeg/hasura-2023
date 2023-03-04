alter table "public"."posts"
  add constraint "posts_category_fkey"
  foreign key ("category")
  references "public"."categories"
  ("category") on update cascade on delete cascade;
