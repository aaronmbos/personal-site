---
id: 4
slug: query-postgresql-json
title: "Querying JSON Data in PostgreSQL"
description: Storing JSON provides flexibility, but can add complexity. Let's take a look at how we can store and query this data in PostgreSQL.
publishedAt: 2021-02-13T05:06:42.301Z
updatedAt: 2022-01-28T03:43:45.567Z
metadata: dev,json,postgres,database
---
***Note:** If you'd like to see the updated syntax for JSON support in **PostgreSQL 14** checkout the post [here](https://aaronbos.dev/posts/postgres-14-json)!*

*The content in this post is directed at the functionality of PostgreSQL 13. If you are on a different version and something mentioned doesn't work as expected, check the [docs](https://www.postgresql.org/docs/) to verify that what is mentioned in this post exists in the version you're on.*

### Why Store JSON Data in Postgres?
So you may be wondering why it's a good idea to store JSON data in a relational database in the first place. I think you're right in questioning the idea, but there are some situations where it can make sense. If you're thinking about storing JSON, your data model is probably unstructured and does not fit well into the relational model with consistent columns, relationships, etc. There are so many great document database options like MongoDB, CouchDB, Azure CosmosDB, Amazon DocumentDB, and many more (most public cloud services will have an offering). Why go with **Postgres**? Maybe your team or company is invested in Postgres and doesn't want the overhead of another database provider to use and manage, then Postgres is a great option. Since Postgres is also a relational database you're able to integrate relational and non-relational data seamlessly, providing greater flexibility to users/applications consuming the data. Finally, Postgres has built-in support for querying and processing JSON data natively.

### PostgreSQL JSON Data Types
As I mentioned previously Postgres has built-in support for JSON so we won't be storing the data as raw text. Postgres has two data types for this purpose.
1. `jsonb`
2. `json`

So which one should we choose? Based on recommendations in their [documentation](https://www.postgresql.org/docs/13/datatype-json.html), `jsonb` is the preferred data type for storing JSON. The `json` type has its use cases, but it's mostly there for backward compatibility and specialized scenarios.

The main difference between the two types is efficiency. When using `json` the data is stored exactly as received (preserving whitespace, orders, duplicate keys). Since the JSON is stored "as is", it must be reparsed each time it is processed. `jsonb` on the other hand will convert valid JSON to a decomposed binary format before storing. This means that writes will be slightly slower to convert the JSON, but reads will be quicker to process the data. A few other things to note about `jsonb`.
- Supports indexing
- Does not preserve whitespace, key ordering, or duplicate keys (if there are duplicates, the last key/value is kept)
- Primitive JSON types map directly to Postgres data types.

Now that we've looked at the data types used to store JSON, let's look at how we can retrieve the data from our database.

### Querying JSON Data
If you'd like to follow along with these examples, checkout this [Gist](https://gist.github.com/aaronmbos/4e2320859251cc3fe570465dda31e18c) that contains the SQL to create the table and insert a couple of the records I'll be demonstrating with.

If you'd just like to read along with the examples below, here are a couple of the JSON "documents" that we'll be working with. There are two `person` records that I've added to the table. For the demo's sake, I've included two columns named `person` and `personb` in the table that have the same JSON data, but stored as different data types (`person is type json` and `personb is type jsonb`). As mentioned earlier, `jsonb` should be the default choice for JSON storage.

```
{
    "last_name": "Allen",
    "first_name": "Fran",
    "pets": [
        {
            "name": "Charlie",
            "type": "dog"
        },
        {
            "name": "Marshmallow",
            "type": "cat"
        }
    ]
}

{
    "last_name": "Perkins",
    "first_name": "Gladys",
    "hobbies": [
        "Star Gazing",
        "Coding"
    ]
}
```

I think the first thing to note about querying JSON is that the standard comparison operators `<, >, <=, >=, =, <>` **only** work with `jsonb`. They will not work when trying to compare `json` type data. We'll see an example of this a bit later.

The next thing to point out is that there are a lot of operators and functions available to work with JSON in Postgres, but my goal in this post is to provide information that I think is important to get up and running. If you need to learn more functionality or dig deeper, definitely check out the [docs](https://www.postgresql.org/docs/13/functions-json.html).

The first operator we'll look at is `->` and it is used to extract 'json' or 'jsonb' objects or values. Let's break it down with a couple of examples.
This query will return the `"first_name"` value as JSON. (Note the quotes around the resulting strings) The resulting type is `json` because that is the type of the `person` column. We can use the `pg_typeof()` function to inspect a value's type.

```
SELECT person -> 'first_name' AS first_name, pg_typeof(person -> 'first_name') AS type
FROM public.person;
```
![extract-json-first-name.png](https://res.cloudinary.com/aaron-bos/image/upload/v1613187737/extract_json_first_name_bc6b634caa.png)

This query will return `jsonb` because that is the type of value in the `personb` column, which is confirmed again with the `pg_typeof()` function.
```
SELECT personb -> 'first_name' AS first_name, pg_typeof(personb -> 'first_name') AS type
FROM public.person;
```
![extract-jsonb-first-name.png](https://res.cloudinary.com/aaron-bos/image/upload/v1613187424/extract_jsonb_first_name_cbbb546d2d.png)

Those are pretty basic examples, but we can see a bit more of how this operator can be used with JSON arrays and objects in the example below. We can use `->` combined with an integer to extract 'json' or 'jsonb' data by zero-based index from an array, like the "pets" array in our example document. This example also includes a where clause that demonstrates that we can use `->` with text to extract `json` or `jsonb` by key. It also shows the comparison operator works on a value from the `personb` column because it is `jsonb` and not `json`.

```
SELECT person -> 'pets' -> 1 -> 'name' AS name, 
  person -> 'pets' -> 1 -> 'type' AS type
FROM public.person
WHERE personb -> 'last_name' = '"Allen"'::jsonb; -- this comparison only works with jsonb
```
![extract-json-jsonb-operator.png](https://res.cloudinary.com/aaron-bos/image/upload/v1613192474/extract_json_jsonb_operator_fc41eeccbd.png)

The next operator we'll look at is the `->>` operator which is similar to the previous one with the difference being that the resulting value is of type `text` instead of `json` or `jsonb`. Let's look at an example.

```
SELECT person -> 'hobbies' ->> 0 AS first_hobby, 
  personb -> 'hobbies' ->> 1 AS second_hobby,
  pg_typeof(personb ->> 'hobbies')
FROM public.person
WHERE personb ->> 'last_name' = 'Perkins';
```
Before looking at the results of this query let's break it down as to what it's doing.
1. We are selecting the `text` value of the first two hobbies in the `hobbies` array (indices 0 and 1).
2. To confirm the type that is returned from the `->>` operator we can use `pg_typeof()` to see that `->>` returns `text`.
3. The `WHERE` clause is able to use the equals comparison between two text values because we using `->>`. 
4. Note how the selected hobby values are just plain text and not surrounded by double quotes as the JSON in the previous examples.

![extract-text-operator.png](https://res.cloudinary.com/aaron-bos/image/upload/v1613188609/extract_text_operator_2d5a58ee7e.png)

Those two basic operators will get you up and running quickly with querying JSON in Postgres, but let's take a quick look at a couple more valuable operators before calling it a day. **Note**: The following operators will only work when applied with `jsonb` typed data.

There may come a time when you want to see if a JSON document **contains** a particular JSON object. One way to accomplish this is to use the `@>` operator which tests for containment. The contained object must match the containing object in structure and contents. In the example below the `WHERE` clause is asking if what is on the right side of the operator is **contained** in the value on the left. So are there any records that have a `pets` key that's value is an array containing an object with a `name` of "Marshmallow" and `type` of "cat"? The answer in this case is yes.
```
SELECT id, person ->> 'first_name' AS first_name
FROM public.person
WHERE personb @> '{"pets": [{"name": "Marshmallow", "type": "cat"}]}'
```
![containment-operator.png](https://res.cloudinary.com/aaron-bos/image/upload/v1613189730/containment_operator_e2a7c6b408.png)


Another situation that may come up is needing to see if a particular key **exists** within a JSON document. We can accomplish this using the `?` operator, which tests for the **existence** of a **key** in a JSON object. In the example below, we are using the `WHERE` clause to filter the data that contains a key of `hobbies`. In the case of our tiny dataset, it returns a single row.
```
SELECT id, person ->> 'last_name' AS last_name
FROM public.person
WHERE personb ? 'hobbies'
```
![existence-operator.png](https://res.cloudinary.com/aaron-bos/image/upload/v1613190845/existence_operator_63a5c48e55.png)


As you can see from the operators and functions we've seen in our examples, Postgres provides great support for working with JSON data natively. With that being said, I've just scratched the surface on the operators and functions at your disposal. My goal was to provide what is needed to give you a starting point. I think Postgres has great [docs](https://www.postgresql.org/docs/13/functions-json.html) and you should definitely refer to them to expand your knowledge (I know I will be 😃).