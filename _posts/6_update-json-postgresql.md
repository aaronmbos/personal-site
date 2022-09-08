---
id: 6
slug: update-json-postgresql
title: "Updating JSON Data in PostgreSQL"
description: If you're storing JSON data in Postgres, you'll eventually need to update it. In this post, we'll talk about a couple of functions that can be used to update JSON data.
publishedAt: 2021-03-20T22:23:28.694Z
updatedAt: 2022-01-28T03:43:30.734Z
metadata: dev,postgres,database
---
***Note:** If you'd like to see the updated syntax for JSON support in **PostgreSQL 14** checkout the post [here](https://aaronbos.dev/posts/postgres-14-json)!*

*The content in this post is directed at the functionality of PostgreSQL 13. If you are on a different version and something mentioned doesn't work as expected, check the [docs](https://www.postgresql.org/docs/) to verify that what is mentioned in this post exists in the version you're on.*

### Functions to Update JSON
In this post, we will be focusing on what we can do to update values in an existing JSON document. Check out my previous blog [post](https://aaronbos.dev/posts/query-postgresql-json) on querying JSON data in Postgres if you're unfamiliar with the `->>` operator syntax in the statements. If you're used to updating data in a relational database you may try to do something like this. 
```
UPDATE public.person
SET personb ->> 'last_name' = 'Ellis'
WHERE personb ->> 'first_name' = 'Clarence'
```
I thought I could do something along those lines before realizing it doesn't work 😞, but as anyone should do when they hit an unexpected roadblock, I decided to consult the Postgres [documentation](https://www.postgresql.org/docs/13/functions-json.html). After thinking about it for a bit, it makes sense as to why this method of updating JSON doesn't work. Since the data we are working with is `jsonb`, essentially a blob of JSON data in binary format, we can't just pick a value out of it and update it in place. Luckily Postgres provides a couple of functions to accomplish the task for us.

The first function that we're going to look at is `jsonb_set` which has the following signature.
```
jsonb_set (target jsonb, path text[], new_value jsonb [, create_if_missing boolean ])
```
Let's break down the function's parameters to get a better understanding of how the function works.
1. `target` - This is the `jsonb` value that will be updated and returned from the function.
2. `path` - This is how we indicate which JSON key needs to be updated via a `text[]`. We can think of it as an absolute path in that if we have a nested object, we'll need to specify all parent keys.
3. `new_value` - This is the `jsonb` value that will be updated based on the `path` argument.
4. `create_if_missing` - This is an **optional** boolean parameter that indicates if the key/value should be created if the key indicated by the path does not exist.

Now that we've covered the parameters provided by `jsonb_set`, let's look at some examples. For our examples, we'll be working with this JSON document. The table that we'll be working with has an `id` column as well as a column called `personb` which is the column that stores our JSON below.
```
{
  "first_name": "Clarence", 
  "last_name": "Ellis", 
  "interests": [
    "Computing", 
    "Science"
  ]
}
```
For this first example let's say that we want to update the `"first_name"` key of this object to the value of "Dr. Clarence". Our update statement might look something like this.
```
UPDATE public.person
SET personb = jsonb_set(personb, '{first_name}', '"Dr.Clarence"', false)
WHERE personb ->> 'last_name' = 'Ellis';
```
With this statement we are using the `jsonb_set` function to update the `personb` column where the `last_name` key is "Ellis". This is a contrived example that assumes there is only one document in our dataset that has `last_name='Ellis'`. Since the `"first_name"` key that we wanted to update is at the first level of the JSON document, we only have to define `'{first_name}'` for the path.

Let's look at another example where we want to update the `interests` array to create a value when it does not exist. This will require specifying `true` for the optional `create_if_missing` parameter. (We explicitly passed false in our previous example) For this example, we want to add the value "Teaching" to the `interests` key.
```
UPDATE public.person
SET personb = jsonb_set(personb, '{interests, 2}', '"Teaching"', true)
WHERE personb ->> 'last_name' = 'Ellis';
```
You'll notice that the path is a little different this time because we first needed to specify that we'll be updating the `interests` key, which is an array with only two items in it (before updating). This path `'{interests, 2}'` is saying that we want to update a JSON value located at the top-level `interests` key and we expect it to be an array by specifying `2` for the index. Since we specified `true` for the `create_if_missing` parameter, the function will create the item at index 2 of the interests array.
```
{
  "first_name": "Dr.Clarence",
  "last_name": "Ellis", 
  "interests": [
    "Computing", 
    "Science", 
    "Teaching"
  ]
}
```
Let's look at one more function available to us that's used to update JSON. It is very similar to `jsonb_set` but there is a subtle difference that opens up a few more options to our update capabilities. The function I'm referring to is `jsonb_set_lax` and its signature looks like this.
```
jsonb_set_lax ( target jsonb, path text[], new_value jsonb [, create_if_missing boolean [, null_value_treatment text ]] ) 
``` 
I will skip the breakdown on the first four parameters because they are the same as `jsonb_set`. I will focus on explaining the **optional** `null_value_treatment` parameter. This parameter accepts text and will determine the function's behavior when the `new_value` argument passed to the function is `NULL`. The list of predefined values that we can use for this parameter are as follows.
1. `'raise_exception'` - If `new_value` is `NULL`, an exception with be thrown.
2. `'use_json_null'` - If `new_value` is `NULL`, the JSON null value will be used.
3. `'delete_key'` - If `new_value` is `NULL`, the JSON key and value specified by `path` argument will be deleted.
4. `'return_target'` - If `new_value` is `NULL`, the function will return the target specified by `path` argument.

Let's take a look at a couple of examples using `jsonb_set_lax`. In the first example we will attempt to set a JSON value to `NULL` when the `null_value_treatment` argument is `'raise_exception'`. Here's the SQL.
```
UPDATE public.person
SET personb = jsonb_set_lax(personb, '{interests, 2}', NULL, true, 'raise_exception')
WHERE personb ->> 'last_name' = 'Ellis'; 
```
When we run this SQL statement we see the following exception message as expected.

![result_exception.png](https://res.cloudinary.com/aaron-bos/image/upload/v1616272269/result_exception_6cb3f9cf0b.png)

I think that the remaining options for the null treatment parameter are relatively self-explanatory, so the final example will be what happens when we pass a value that isn't one of the four predefined options. So this time we will attempt to run this.
```
UPDATE public.person
SET personb = jsonb_set_lax(personb, '{interests, 2}', NULL, true, 'not_an_option')
WHERE personb ->> 'last_name' = 'Ellis';
```
In this scenario, you might expect the function to use the default option which is `use_json_null`. Fortunately, the function protects us from any unexpected behavior by raising this exception.

![not_an_option.png](https://res.cloudinary.com/aaron-bos/image/upload/v1616272538/not_an_option_eaa60473df.png)

In this post, we covered a couple of different ways that we can utilize `jsonb_set` and `jsonb_set_lax` to update JSON data in Postgres. If you are storing JSON in Postgres, there will most likely come a time that you need to update specific keys or values and these are ways that I found useful when trying to solve that problem. Definitely check out the Postgres [docs](https://www.postgresql.org/docs/13/functions-json.html) to learn more!