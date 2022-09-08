---
id: 13
slug: sql-index-introduction
title: "Introduction to SQL Indexes"
description: For most of my career I've known the general purpose of an SQL (read S-Q-L) index, but I've never taken the time to dig a little deeper to understand more until recently. In this post we'll be taking a look at SQL indexes from a high level, as well as how they can be used effectively (and not so effectively) to impact the performance of SQL operations.
publishedAt: 2021-07-19T01:49:29.359Z
updatedAt: 2021-07-19T01:49:29.452Z
metadata: introduction,sql,database,learning
---
## What is an SQL Index?

I've often heard SQL indexes compared to phone books. Like a phone book, an SQL index must be effectively and efficiently sorted to improve lookup speed. In terms of a phone book, as long as you know the value by which phone numbers are ordered (most often Last Name) then you can quickly find what you're looking for. The same goes for an SQL index in that generally speaking the index will be sorted based on the column(s) provided in a `CREATE INDEX` statement. The process and implementation for accessing the sorted data may differ between operations being performed and database vendors.

That's about as far as we can take the phone book to SQL index analogy because beyond that SQL indexes have the potential to be updated frequently when data changes, whereas a phone book, is relatively static. This example is slightly antiquated as well, I haven't owned a phone book for over 10 years and my kids will likely never see or use one.

It's important to note here that an index is a separate object in the database than the table it refers to. It's the result of a `CREATE INDEX` statement and is pure redundancy in terms of storage. The index does not store the data itself, but instead they keep track of the sorted index value and also a reference to the actual data. Indexes play an important role in SQL operation speed and efficiency. An SQL index is comprised of two core data structures, the B-tree and doubly-linked lists. Both of these data structures are used in conjunction to allow for quick index lookups.

### The Index B-Tree and Doubly Linked List

In this portion of the post, I don't plan on going in-depth into B-trees or their properties. We'll be focusing a little bit more on the properties of the B-tree that impact SQL indexes specifically. If you'd like a little bit more information on B-trees checkout [wikipedia](https://en.wikipedia.org/wiki/B-tree) for a quick rundown. At a high level, a B-tree is a balanced tree data structure in that the tree depth is the same at every position of the tree. The distance between the root node and all leaf nodes is equal for the entire structure. Another key point of the B-tree is that it has a defined order. These properties make performing operations like access and manipulation much more time-efficient, which makes it a great candidate for indexes.

The B-tree consists of a few different types of nodes. The **root** is the initial node of the tree that has no parent nodes, only children. Next up are **branch nodes** and these nodes are the ones that defined the order of data and allow for quick searching. Finally, we have **leaf nodes** and these are the actual index entries, which are normally stored in database pages or blocks (unit of storage for databases). The B-tree is key to locating the necessary leaf nodes quickly. As I mentioned before doubly linked lists are also used in SQL indexes to provide an additional layer of ordering.

As with the B-tree, I don't intend to go in-depth on the features and functionality of doubly linked lists, but if you're unfamiliar or would like to learn more you can head over to [wikipedia](https://en.wikipedia.org/wiki/Doubly_linked_list). A property of the doubly linked list is the existence of pointers to the next and previous nodes in the list. So, *What does this mean for indexes?*, the B-tree **leaf nodes** are linked via a doubly linked list and this provides a way to navigate the chain of leaf nodes in the B-tree. If we think about both structures and how data access via the index may work, it can be broken down into three main steps.

1. B-tree traversal (navigating from root -> branch nodes -> leaf nodes)
2. Following the chain of leaf nodes (via the doubly linked list)
3. Access the table data that the index references

Now that we have a high-level understanding of what an index is and the data structures used to implement one we can go into actually creating the index in the database.

## Creating an Index

Creating an SQL index is a relatively easy process. In order to create the index, we'll need to know the table and column(s) that we would like to create the index for. With that information, we're ready to write the create statement.

```
CREATE INDEX index_name
ON table_name (column1 [, column2,...]);
```

As you can see the index is given a name and create referencing a column or multiple columns in the provided table. The example above is a basic example and each database vendor may have specific syntax for different index features. Consult the respective database vendor docs for more detail on the `CREATE INDEX` statement. Now that we know how to create an index, let's take a look at some considerations to take into account before we create and use an index.

## SQL Index Considerations

Thus far we've talked about SQL indexes at a high level, how they are implemented, and how to create them. Now we're ready to discuss some important topics that can influence when and how to create an index. The first thing to consider is the access patterns of a particular application. As a developer, we know how our applications use data better than anyone. This is why understanding indexes can be so vital to the performance of the database and consuming application. Before creating an index we should be considering columns that are most frequently included in `WHERE` clauses, columns that are frequently updated, high traffic execution paths, as well as any other commonalities that pertain to the data that a particular application uses. Taking all of this into consideration will provide the necessary context for creating and maintaining useful database indexes.

Most database providers will automatically create an index for the Primary Key column in a table. Having an index on a column will help increase the speed in which we are able to query data filtered on the indexed column in most cases. There are situations where an index will not improve query performance on a column, but I'd consider that an exception as opposed to the rule. If you're ever curious as to why a query is performing unexpectedly, it's definitely worth viewing the query execution plan. Most database providers will provide a way to view this in text form or graphically. Viewing the execution plan can shed some light on how the query optimizer decided to execute the query. It will provide a list of steps taken in order to return the data. So far we've spent most of our time discussing how indexes may affect querying data. What about modifying data?

## Modifying Data in Relation to Indexes

Depending on your situation being able to manipulate data efficiently may be just as important as being able to query it efficiently. In almost all cases SQL indexes will have a negative impact on data manipulation performance. As we saw earlier in the post, the data in the index needs to be kept sorted for quick access. When data that the index is referencing changes, the database also needs to update the index to keep it in sync and this takes time. One of the key factors of index performance is its ability to cluster indexed data. This clustering makes for quick sequential access, but its also a factor in the negative performance impact of data manipulation.

Inserting or updating data in a table **without** an index will be very quick. The amount of time that it takes to complete an insert or update will multiply with each index added. With this in mind, it is important to be mindful of placing indexes on data that is updated frequently. While the access performance may improve, the database could be taking a big hit on insert and update performance. We should always use indexes with care and avoid redundant or unnecessary indexes.

## Quick Index Tips

To wrap up I'd like to share a handful of quick index tips that will be helpful when trying to build on existing knowledge of SQL indexes.

1. A poorly written `WHERE` clause is the first step to a slow query
2. Always aim to index original data
3. Using parameterized queries is important for security and performance
4. Index for equality first, then for ranges
5. Avoid `LIKE` expressions with leading wildcards ie `'%BLOGS'`
6. One index with multiple columns is faster than two indexes
7. Avoid unnecessary filters in SQL statements

These tips are general rules of thumb as opposed to hard and fast rules. As always, know your data and application access patterns. I would also like to take this time to shout out the book that provided many of these quick tips and a lot of information that led up to this blog post.

**SQL Performance Explained** by Markus Winand

[https://sql-performance-explained.com/](https://sql-performance-explained.com/)

Over the past several months I've been prioritizing the improvement of my SQL knowledge and skills. This book was one that I had recently read and found very helpful for understanding the *what*, *how*, and *why* of SQL indexes. This post only scratches the surface of what's in the book and I can't recommend it enough.
