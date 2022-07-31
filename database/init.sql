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

alter table post.reaction
  add constraint PK_post_reaction
    primary key (slug, ip_address, reaction_type);
