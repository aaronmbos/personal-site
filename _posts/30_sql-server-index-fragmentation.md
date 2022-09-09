---
id: 30
slug: sql-server-index-fragmentation
title: "What is SQL Index Fragmentation?"
description: SQL indexes are an important part of every database, but they don't come without requiring some regular maintenance. In this post, we'll be looking at SQL index fragmentation in the context of Microsoft's SQL Server and how it can affect our database performance.
publishedAt: 2022-02-27T04:15:08.191Z
updatedAt: 2022-02-27T04:29:25.643Z
metadata: dev,database,sql,learning
---
## How are Indexes Stored?

Before jumping straight into fragmentation let's first look at how SQL indexes are stored within the database. This will give us a better idea of how they may become fragmented and also provide some context on why fragmentation is problematic.

The two main types of indexes in SQL Server are clustered and non-clustered indexes. Both types of indexes serve the same purpose, improve read performance for rows of a table or view. The data structure used for indexes is known as the B-tree (actually a special kind of B-tree known as a B+ tree), which is key for keeping query performance optimal as the amount of data in a table grows.

**Clustered** indexes are stored directly with the table on which they are applied. For this reason, there can be only one clustered index per table because the table data can only be sorted and stored one way. If there is no clustered index on a table, then the rows are stored unsorted and this can be referred to as a *heap*.

**Non-clustered** indexes are stored separately from tables and rows, which means a table can have both a clustered and non-clustered index simultaneously. Since the non-clustered index is stored separately from the table, it must store a key that uniquely identifies are particular row and also a pointer to the data. If the table is a clustered table (has a clustered index), the pointer will go to the clustered index key. Otherwise, with heap tables, the row locater is a pointer to the row.

Now that we have a high-level understanding of how indexes are stored, let's begin looking at how they become fragmented.

## How Indexes Become Fragmented 

When we first create indexes, they are clean and sorted optimally. Over time as data is inserted, updated, and deleted the indexes must be updated as the data changes. Before data has been updated there is little to no fragmentation in indexes, but as data changes, it's very likely that the logical ordering of the index will start to differ from the actual physical storage of the data in pages. As an example, when rows are inserted into the table pages may split, which can lead to data in the index being spread throughout the database. This is what is meant when discussing "index fragmentation".

Another piece of the index performance puzzle is "page density". A "page" in SQL Server is the mechanism used to store data. The size of each page is 8 KB and can contain actual data or index data that are references to data. When thinking about the density of pages, we want the index pages to be as full as possible. When pages are less dense, more IO is required to scan indexes during queries. This increased IO can affect query performance negatively.

At this point, you may be wondering *"How can I see if my database's indexes are fragmented or suffering from low page density?"*. Here is a query that will provide this information.

```sql
SELECT OBJECT_SCHEMA_NAME(ips.object_id) AS schema_name,
       OBJECT_NAME(ips.object_id) AS object_name,
       i.name AS index_name,
       i.type_desc AS index_type,
       ips.avg_fragmentation_in_percent, -- Fragmentation %
       ips.avg_page_space_used_in_percent, -- Page Density %
       ips.page_count,
       ips.alloc_unit_type_desc
FROM sys.dm_db_index_physical_stats(DB_ID(), default, default, default, 'SAMPLED') AS ips
INNER JOIN sys.indexes AS i 
ON ips.object_id = i.object_idit's
   AND
   ips.index_id = i.index_id
ORDER BY page_count DESC;
```

So, we've run this query and noticed that our database has some heavily fragmented indexes that are also suffering from some low page density. What next?

## How to Address Index Fragmentation

Now that we understand what index fragmentation is and how it occurs, we'll be looking at what we can do to address the problem. We have a couple of options.

1. Reorganize indexes
  
2. Rebuild indexes
  
3. Update statistics
  

### Reorganizing Indexes

Reorganizing indexes should be the first action to take when thinking about index maintenance or repair. Reorganization is less resource-intensive than rebuilding and is always an online operation. To be more specific, reorganization indexes involves defragmenting only the leaf level of clustered and non-clustered indexes by updating leaf pages to match the logical ordering of leaf nodes.

In order to execute index reorganization on a specific index, we can use the following statement.

```sql
ALTER INDEX IX_Some_Index_Name
    ON dbo.SomeTable
    REORGANIZE;
```

### Rebuilding Indexes

Rebuilding indexes is more heavy-handed than reorganization, but could potentially be more effective in some cases. Rebuilds can be done online or offline. Online rebuilds will take more time while offline rebuilds will be quicker, but require object-level locks leading to query blocking on affected tables or views.

The process of rebuilding indexes involves dropping and recreating the index. Unlike reorganization, rebuilding an index will reduce fragmentation at all levels of the tree while also compacting page density at each level.

To rebuild a specific index use the following statement.

```sql
ALTER INDEX IX_Some_Index_Name ON dbo.SomeTable
REBUILD;
```

### Updating Statistics

While this solution may not directly impact index fragmentation, it may be all that is needed to improve database performance. SQL database statistics are used to generate optimal query plans. Over time the statistics can become stale and out of sync with the data. Updating statistics is a much cheaper operation than rebuilding indexes and can potentially lead to similar (if not better) results for query performance.

In order to update statistics for all indexes on a particular table, the following statement can be used.

```sql
UPDATE STATISTICS dbo.SomeTable;   
GO 
```

### Summary

In this post, we've discussed the basics of index fragmentation and how to address the problem. There is a lot of information out on there this topic and this post just scratches the surface. If anything I hope this post can be a springboard for those interested to learn even more about SQL index maintenance and performance. Cheers 🍻!

#### Resources

[Maintaining indexes optimally to improve performance and reduce resource utilization - SQL Server | Microsoft Docs](https://docs.microsoft.com/en-us/sql/relational-databases/indexes/reorganize-and-rebuild-indexes?view=sql-server-ver15)

[How to identify and resolve SQL Server Index Fragmentation](https://www.sqlshack.com/how-to-identify-and-resolve-sql-server-index-fragmentation/)