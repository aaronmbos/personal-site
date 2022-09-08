---
id: 2
slug: jwt-under-the-hood
title: "JWTs: A Peek Under the Hood"
description: JWTs are used heavily in front and back end development. Let's open the hood to see how they're put together.
publishedAt: 2021-01-27T03:41:32.155Z
updatedAt: 2021-07-01T10:28:39.086Z
metadata: dev,web,json,introduction
---
If you have worked with APIs on the web, you've most likely interacted with JWTs or JSON Web Tokens (sometimes pronounced "jot"). JWTs are useful when it comes to authorization and information sharing, but they're not something you look at and immediately understand. I think a common misconception with JWTs is that they are used for authentication, but I view them more as a byproduct of authentication to use for further authorization. In this article, we'll be taking a look under the hood of these tokens to gain a better understanding of how they're composed.

### Structure of a JWT
One of the main benefits of using a JWT is that it is an open standard ([RFC 7519](https://tools.ietf.org/html/rfc7519)) for sharing information. What this means is that we, as consumers of a JWT, can count on a token being structured consistently. The structure can be broken down into three pieces and those pieces are separated by a ".".
1. Header
2. Payload
3. Signature (optional)

Note the two periods defining the sections in this example JWT. (I've added line breaks after each period to make the sections more obvious)
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```
One of the key aspects that make JWTs useful for information sharing is their compactness, which is achieved through encoding. More specifically a form of [Base64](https://en.wikipedia.org/wiki/Base64) encoding that is URL-safe known as [base64url](https://tools.ietf.org/html/rfc4648). This encoding allows us to take the sections of a JWT and transform them into a compact string of URL-safe characters. Let's take some time to look a little closer at the three sections of a JWT.

#### Header
Every JWT will carry a header containing claims about itself, for example, the algorithm used to sign it or how the rest of the JWT needs to be parsed. If the JWT is unsecured, the only required claim is the `"alg"` claim and it must be set to "none"
```
{
  "alg": "none"
}
```
Other optional header claims 
- `"typ"`: indicates the media type of the JWT 
- `"cty"`: indicates the content type and is only meant for instances where the JWT contains a JWT in its payload (like Inception, but with JWTs). So in more standard cases when the JWT contains data in the form of standard JSON claims, the `"cty"` claim should not be used.

#### Payload
The payload is, as some would say, where you can find the *"meat and potatoes"* of the JWT. It contains data in the form of a JSON object and claims to describe itself. The claims included can be ones defined by the JWT spec or user-defined. Often times you'll have a mix of the two. We'll touch on the claims that are defined by the spec since they will be seen most frequently. One thing you may notice about each claim is that they are abbreviated three-letter strings. This format is in the spirit of the JWT itself in its goal to be as compact and lightweight as possible. 
- `"iss"`: An abbreviation for the issuer that indicates who issued the JWT. 
- `"sub"`: An abbreviation for the subject that indicates who the JWT is carrying information about. 
- `"aud"`: An abbreviation for the audience to identify who the JWT is intended for.
- `"exp"`: An abbreviation for the expiration of the JWT represented by a date and time formatted in "seconds from epoch".
- `"nbf"`: Short for "not before time" and represents the exact opposite of the expiration claim formatted in a similar fashion.
- `"iat"`: Short for "issued at time" and represents the date and time the JWT was issued formatted similarly to "exp" and "nbf".
- `"jti"`: Short for "JWT ID" and can be used to differentiate JWTs and protect against replay attacks.

All the claims that I've listed above are known as **registered claims** because they have specific meanings attached to them. As you use JWTs in your applications you will most likely use some of these registered claims along with some of your own **private claims**. Private claims are specific to the producer and consumer of the JWT and not defined by the JWT specification.

Here is an example of a small payload. Notice that it contains both registered and private claims that will be parsed by the consumer.
```
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "email": "jdoe@hotmail.com"
}

Base64 Encoded
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJlbWFpbCI6Impkb2VAaG90bWFpbC5jb20ifQ
```

#### Signature
The signature portion of the JWT is not required and not present with unsecured JWTs. This basically means that the JWT is not encrypted or hashed and only contains an encoded header and payload. With that being said the signature could be one of the most important parts of the JWT because it provides a way for consumers to ensure a token's data has not been tampered with.

An important distinction here is that using a signed token does not mean the token's content can't be read by third parties. Secured tokens can be parsed similarly to unsecured tokens with the difference being that secured tokens can be validated against their signature to verify authenticity. All signing algorithms provide this authenticity but in potentially different ways.

The JSON Web Signature (JWS) specification defines a number of algorithms that can be used to sign JWTs for example HMAC using SHA-256 (HS256). I won't go any further into algorithm specifics as that is a deep topic and definitely outside of my wheelhouse.

An example of a JWT with a signature included. Notice how the header contains the algorithm used to sign the token. The only thing that is then needed for a consumer to validate the signature in this instance is the shared key that was included in the hashing function to generate the signature.

```
{
  "alg": "HS256",
  "typ": "JWT"
}

{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022,
  "email": "jdoe@hotmail.com"
}

Resulting token
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJlbWFpbCI6Impkb2VAaG90bWFpbC5jb20ifQ.
lBxKMthAGQPHDRftXRt8HVL0Km87z2cslvIrcn5kNWg
```

### Wrapping Up
If you've made it this far, first of all, thank you! Second of all, I hope this was helpful and informative. Like I said in the beginning, we use JWTs all the time and it can be easy to gloss over some of the basics. I think having a good understanding of what goes into a token can help us to leverage the functionality of JWTs.

The inspiration for this article came after reading the *JWT Handbook*, which is a free e-book available at [jwt.io](https://jwt.io/). The book and the site itself is a great resource for learning more about JWTs. They even have a browser extension that lets you paste in a token to view its contents right in the browser. If you enjoyed this article and want to learn more you should definitely check it out!