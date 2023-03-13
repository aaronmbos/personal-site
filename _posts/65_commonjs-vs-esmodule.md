---
id: 65
slug: commonjs-vs-es-module
title: "Exploring Differences Between CommonJS and ES Modules"
description: "I was recently working on a little project involving quite a bit of JavaScript. I always knew about the existence of ES Modules and CommonJS, but I never really knew much about their differences. In this post, I'll be exploring CommonJS and ES Modules to learn more about their history and use cases."
publishedAt: YYYY-MM-DDTHH:MM:SS.000Z
updatedAt: YYYY-MM-DDTHH:MM:SS.000Z
metadata: javascript,typescript,notes
---

## JavaScript Modularity

For the longest time JavaScript was purely a language of the web. In the days of jQuery (and before) it was common to include all of the JavaScript that a website needed in a single file. This meant that we would define objects like variables and functions in the global scope, which had the benefit of being able to access everything necessary in that file. While using the default global scope for everything is convenient, it can be error prone and difficult to maintain. When code begins to grow in size and complexity, developers often reach for modularity. For the longest time JavaScript in the browser didn't have a great solution for modularity. You could separate code in different script files, but there was no guarantee that objects wouldn't be mutated in the global scope.

As the web development domain continued to evolve to more Node-based tooling, the need for modularity became more apparent. In 2018 ECMAScript Modules we're made officially available in all major browsers. This meant that JavaScript code could be defined, exported, and imported in modules that run directly in the browser. Over time NodeJS began to support ES Modules, while also supporting an existing module solution called CommonJS. ES Modules and CommonJS share a common goal of modularity in JavaScript, but unfortunately they don't play too nice when being used in the same project. I recently was working on a project that used ES Modules in the browser. I wanted to use Jest to write some tests for these modules and I ended up having to use an experimental NodeJS flag in order to run the tests with ES Modules. My goal for this post is to simply understand more about each of the module systems, which I believe will help me in the future when working in frontend or Node-based codebases.

## CommonJS

## ES Modules
