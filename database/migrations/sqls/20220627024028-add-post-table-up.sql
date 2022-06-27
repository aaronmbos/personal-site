create table if not exists post.post (
  id integer generate by default as identity,
  title nvarchar(256) not null,
  slug nvarchar(128) not null,
  published_on date not null,
  constraint pk_post_id primary key (id),
  constraint uq_post_slug unique (slug)
)

