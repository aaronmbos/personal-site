---
id: 19
slug: http-options-introduction
title: "Introduction to HTTP OPTIONS Method"
description: If you've ever looked at the Network tab in the Browser Dev Tools, you may have noticed a lot of OPTIONS requests being sent to the server. Oftentimes these requests are not being made from our code, but made by the browser. In this post, we'll be covering the purpose that the HTTP OPTIONS method serves in our web applications.
publishedAt: 2021-10-15T02:24:03.332Z
updatedAt: 2021-10-15T02:40:08.737Z
metadata: dev,web
---
## What is an OPTIONS HTTP Request?

Before we get into everything that the HTTP OPTIONS method can be used for, I think it would be helpful to have a quick rundown on its general. At a high level, the OPTIONS method is used to determine the communication **options** available for a specific resource. This means that we can send an HTTP request using the OPTIONS method to see what other types of request methods can be used (ie GET, POST, PUT, DELETE, etc.) when requesting information from a resource. This is useful so that we can avoid potential failed requests when a server or endpoint doesn't support a particular request method, like making a POST request to a server that only accepts GET requests.

Once the request is made the server is responsible for returning the necessary headers in the response to indicate which actions are available for the requested resource.  When making OPTIONS requests, we can either indicate a specific resource like `/api/user/1` or we can use the `*` to test the capabilities of the entire server. Using the `*` is not used as frequently as requesting a specific resource, since many times the endpoint capabilities are more fine-grained than the entire server.

Here is an example of an OPTIONS request that is wanting to know about the capabilities of the `/index.html` resource.

```
OPTIONS /index.html HTTP/1.1
```

When thinking about the response from the server, it is expected that the necessary information will be included in response headers. One of the main headers to look out for is the `Allow` or `access-control-allow-methods` header. This header indicates which HTTP methods are supported by the requested resource. The response can have a body that describes what the requested resource is capable of, but it is not defined in the HTTP [specification](https://httpwg.org/specs/rfc7231.html#OPTIONS).

Here is an example of an OPTIONS response. As you can see the `access-control-allow-methods` header includes the supported HTTP methods for the requested resource.

```
HTTP/2 200 OK
access-control-allow-methods: POST, GET
access-control-allow-headers: Origin, X-Requested-With, Content-Name, Content-Type, Accept, Sdk-Context
access-control-allow-origin: *
access-control-max-age: 3600
x-content-type-options: nosniff
date: Thu, 14 Oct 2021 00:59:26 GMT
content-length: 0
```

One important thing to note about the specification is that HTTP OPTIONS responses are said to not be cacheable and they are not cached by the browser or CDNs by default. Caching is meaningful here because OPTIONS requests are often made by the browser and can result in a high number of round trips to the server. The key header to focus on with caching is `access-control-max-age`, which indicates how many seconds that the OPTIONS response can be cached for. In our example above the server responded with an `access-control-max-age` header value of 3600, so the browser knows that it does not need to make this OPTIONS request again for 60 minutes.

## Using HTTP OPTIONS Method for CORS Preflight Requests

So far we've looked at the HTTP OPTIONS method from a high level, but one of the main use cases of the HTTP OPTIONS method is for CORS preflight requests. If you're not familiar with CORS, don't worry because we're going to break it down a bit right here.

CORS stands for "Cross-Origin Resource Sharing" and it comes into play when we want to request information from a different origin. For example, there may be a web application hosted at `https://testapp.com` and from the application, we may want to make requests to `https://api.twitter.com`. In that example, CORS can be used to indicate whether or not the browser displaying information from `https://testapp.com` should be able to request information from `https://api.twitter.com`. For a more in-depth look at CORS check out this awesome MDN [documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS).

A CORS preflight request is a special request sent by the browser to make sure that the requested resource understands the CORS header-based protocol. A preflight request is made using the OPTIONS method and relies on three main HTTP headers.

1. `Access-Control-Request-Method`
2. `Access-Control-Request-Headers`
3. `Origin`

An important thing to note is that not every HTTP request requires a preflight request. Requests that are deemed to be "simple" do not require preflights. At this point, you may be wondering, *What qualifies a "simple request"?* and I don't blame you because I did the same thing. A [simple request](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#simple_requests) must meet the following criteria to be allowed to skip preflight requests.

*A simple request...*request

- Uses one of the following request methods: GET, HEAD, POST
- Can only contain the following request headers: Accept, Accept-Language, Content-Language, Content-Type
  - Content-Type header must be one of the following: application/x-www-form-urlencoded, multipart/form-data, text/plain
- If made with XmlHttpRequest object, then no event listeners can be registered on the XmlHttpRequest.upload property
- No ReadableStream object is used in the requst

Here is an example of what a CORS preflight OPTIONS request may look like

```
OPTIONS /o/client/token HTTP/1.1
Host: sp.auth.adobe.com
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:93.0) Gecko/20100101 Firefox/93.0
Accept: */*
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Access-Control-Request-Method: POST
Access-Control-Request-Headers: ap-sdk-identifier,ap_11,ap_42,ap_z
Referer: https://www.espn.com/
Origin: https://www.espn.com
Connection: keep-alive
```

As discussed earlier, CORS preflight requests can and should be cached for as long as **safely** possible. Each preflight request required involves an extra round-trip to the server, which can add up quickly and affect user experience.

I hope the information provided in this post will help demystify OPTIONS requests and also provide some ideas for improving load times on applications that currently require many CORS preflight requests.

### Resources

[https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS)

[https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request](https://developer.mozilla.org/en-US/docs/Glossary/Preflight_request)

[https://httpwg.org/specs/rfc7231.html#OPTIONS](https://httpwg.org/specs/rfc7231.html#OPTIONS)

[https://httptoolkit.tech/blog/cache-your-cors/](https://httptoolkit.tech/blog/cache-your-cors/)

[https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#simple_requests](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS#simple_requests)