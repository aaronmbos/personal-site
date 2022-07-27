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
