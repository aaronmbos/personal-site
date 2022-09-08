---
id: 16
slug: uninstall-tsqlt-sqlserver
title: "How To Uninstall tSQLt From SQL Server"
description: If you've used the SQL unit testing framework tSQLt before you may have come across the need to uninstall it from a database. There are a couple of ways you could go about this, but we'll look at the quickest method.
publishedAt: 2021-08-28T03:06:57.779Z
updatedAt: 2021-08-29T17:32:11.236Z
metadata: sql,database,dev
---
## tSQLt Overview

Before we get too far into this short post, I just want to highlight what tSQLt is and exactly what it's used for. tSQLt is an **open source** database unit testing framework for SQL Server. It is compatible with any version of SQL Server and allows for the writing of unit tests using T-SQL instead of some other language. I'm assuming if you've landed here you're probably familiar with tSQLt in some form, but if that isn't the case or you'd like to learn more head over to check out [their docs](https://tsqlt.org/). Without further ado, let's jump into uninstalling tSQLt.

## Uninstall tSQLt

There are many ways that we could go about uninstalling tSQLt. We could manually write a script that would drop all of the objects created under the `tSQLt` schema from the install script. We could try to reserve the result of the install script by writing a drop statement for every object in reverse order of their creation. These are both valid options, but both would probably take much more time than the method that we **should** use. This might be a little underwhelming, but all we need is a single statement.

```SQL
EXEC tSQLt.Uninstall;
```

Yep, that's right. If you look in the installation script for tSQLt you'll find the creation of a stored procedure called `tSQLt.Uninstall`. This stored procedure encapsulates all of the work necessary to remove all of the database objects installed initially by the tSQLt installation script. If you're curious, it uses the first method I mentioned earlier of drop objects based on the schema. I was in the process of reverting the install script when I came across the creation of the Uninstall stored procedure and I was elated. While reverting all of the objects created by tSQLt is not difficult, it is *tedious*. Stumbling across this stored procedure saved me some precious time 😅 and I hope it does for you too!
