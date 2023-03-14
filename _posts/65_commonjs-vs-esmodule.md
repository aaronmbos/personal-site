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

As the web development domain continued to evolve to more Node-based tooling, the need for modularity became more apparent. In 2018 ECMAScript Modules we're made officially available in all major browsers. This meant that JavaScript code could be defined, exported, and imported in modules that run directly in the browser. Over time Node.js began to support ES Modules, while also supporting an existing module solution called CommonJS. ES Modules and CommonJS share a common goal of modularity in JavaScript, but unfortunately they don't play too nice when being used in the same project. I recently was working on a project that used ES Modules in the browser. I wanted to use Jest to write some tests for these modules and I ended up having to use an experimental Node.js flag in order to run the tests with ES Modules. My goal for this post is to simply understand more about each of the module systems, which I believe will help me in the future when working in frontend or Node-based codebases.

## CommonJS

According to the Node.js documentation CommonJS is the original packaging solution for JavaScript. CommonJS isn't available to use in browsers so it is mostly used in purely Node-based server-side applications. If you're wondering why CommonJS modules can be used within popular libraries like React, it's because that code is often heavily transpiled and bundled before sending to the browser. If you're not too familiar with CommonJS, but have imported modules in JavaScript using the `require()` method then you've used CommonJS. The method of referencing other modules with `require` is the main difference between CommonJS and ES Modules.

Node.js will default to CommonJS unless otherwise specified by file type or an indication in the `package.json`, but it is best to be explicit when defining module type since Node.js supports CommonJS and ES Modules. There are a few ways to specify that modules are using CommonJS in a Node application.

- Use the file extension `.cjs`
- Set the `"type"` field to `"commonjs"` in the `package.json`
- Including `--input-type=commonjs` when invoking Node from the command-line

Another aspect of CommonJS that differs from ES Modules is the method of exporting members. Node wraps the module in a function wrapper which can be used to access some global-like objects. For example, the module wrapper provides an `exports` object that the module author can use to export members from a module. The module wrapping occurs before any module code is executed.

```javascript
(function (exports, require, module, __filename, __dirname) {
  // Module code actually lives in here
});
```

Let's put these CommonJS pieces together with an example. We'll define a module called `ai.js` which exports a function called `processPrompt`. The `ai` module is then required and referenced in another module called `prompt.js`.

```javascript
// ai.js

const processPrompt = (prompt) => {
  switch (prompt) {
    case "Are you human?":
      return "No, I'm your friendly neighborhood AI.";
    case "Will you take my software engineering job?":
      return "Yes, but not today.";
    default:
      return "I'm sorry, you've reached your request limit.";
  }
};

module.exports = {
  processPrompt,
};
```

```javascript
// prompt.js

const { processPrompt } = require("./ai");

console.log(processPrompt("Are you human?"));
console.log(processPrompt("Will you take my software engineering job?"));
console.log(processPrompt("Why does time only flow in one direction?"));
```

By running `node prompt.js` we'll see this output.

```shell
$ node prompt.js
No, I'm your friendly neighborhood AI.
Yes, but not today.
I'm sorry, you've reached your request limit.
```

CommonJS seems to be the de-facto method of modularizing JavaScipt that is meant to run on the server. In my opinion things got a little more complicated when Node decided to support ES Modules.

## ES Modules
