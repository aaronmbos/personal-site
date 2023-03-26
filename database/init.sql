create database personal_site;

create role personal_site_admin with
LOGIN
PASSWORD '' -- Password set outside of script
NOSUPERUSER
NOCREATEDB

create role personal_site_app with
LOGIN
PASSWORD '' -- Password set outside of script
NOSUPERUSER
NOCREATEDB

create schema if not exists post;

create table if not exists post.reaction (
  slug varchar(128) not null,
  ip_address varchar(64) not null,
  reaction_type varchar(64) not null
)

create table if not exists post.post (
  id uuid not null default gen_random_uuid(),
  slug varchar(128) not null,
  title varchar(256) not null,
  description text not null,
  content text not null,
  tags jsonb null,
  created_at timestamp not null default now(),
  updated_at timestamp not null default now(),
  published_at timestamp null,
)

alter table post.reaction
  add constraint PK_post_reaction
    primary key (slug, ip_address, reaction_type);

alter table post.reaction
  add column created_at TIMESTAMP;
alter table post.reaction
  alter column created_at set default now();

create schema if not exists user;

create table if not exists user.user (
  id uuid not null default gen_random_uuid(),
  username varchar(256) not null unique,
  password varchar(256) not null,
  created_at timestamp not null default now()
);

alter table user.user
  add constraint PK_user_user
    primary key (id);
