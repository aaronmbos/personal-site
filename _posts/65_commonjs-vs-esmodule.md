---
id: 65
slug: commonjs-vs-es-module
title: "Exploring CommonJS and ES Modules"
description: "I was recently working on a project involving quite a bit of JavaScript. I always knew about ES Modules and CommonJS, but I never knew much about their differences. This post is a result of my exploration of CommonJS and ES Modules to learn more about their history and use cases."
publishedAt: 2023-03-15T12:00:00.000Z
updatedAt: 2023-03-15T12:00:00.000Z
metadata: javascript,typescript,notes
---

## JavaScript Modularity

For the longest time, JavaScript was purely a language of the web. In the days of jQuery (and before), it was common to include all of the JavaScript that a website needed in a single file. This meant that we would define objects like variables and functions in the global scope, which had the benefit of being able to access everything necessary in that file. While using the default global scope for everything is convenient, it can be error-prone and difficult to maintain. When code begins to grow in size and complexity, developers often reach for modularity. For the longest time, JavaScript in the browser didn't have a great solution for modularity. You could separate code in different script files, but there was no guarantee that objects wouldn't be mutated in the global scope.

As the web development domain continued to evolve to more Node-based tooling, the need for modularity became more apparent. In 2018 ECMAScript Modules were made officially available in all major browsers. This meant that JavaScript code could be defined, exported, and imported in modules that run directly in the browser. Over time Node.js began to support ES Modules, while also supporting an existing module solution called CommonJS. ES Modules and CommonJS share a common goal of modularity in JavaScript, but unfortunately, they don't play too nicely when being used in the same project. I recently was working on a project that used ES Modules in the browser. I wanted to use Jest to write some tests for these modules and I ended up having to use an experimental Node.js flag to run the tests with ES Modules. My goal for this post is to simply understand more about each of the module systems, which I believe will help me in the future when working in frontend or Node-based codebases.

## CommonJS

According to the Node.js documentation, CommonJS is the original packaging solution for JavaScript. CommonJS isn't available to use in browsers so it is used in purely Node-based server-side applications. If you're wondering why CommonJS modules can be used within popular libraries like React, it's because that code is often transpiled and bundled before sending to the browser. If you're not too familiar with CommonJS, but have imported modules in JavaScript using the `require()` method then you've used CommonJS. The method of referencing other modules with `require` is the main difference between CommonJS and ES Modules.

Node.js will default to CommonJS unless otherwise specified by file type or an indication in the `package.json`, but it is best to be explicit when defining module type since Node.js supports CommonJS and ES Modules. There are a few ways to specify that modules are using CommonJS in a Node application.

- Use the file extension `.cjs`
- Set the `"type"` field to `"commonjs"` in the `package.json`
- Including `--input-type=commonjs` when invoking Node from the command-line

Another aspect of CommonJS that differs from ES Modules is the method of exporting members. Node wraps the module in a function wrapper which can be used to access some global-like objects. For example, the module wrapper provides a `module` object that the module author can use to export members from a module by setting the `exports` property. The module wrapping occurs before any module code is executed.

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

CommonJS seems to be the de-facto method of modularizing JavaScipt that is meant to run on the server. In my opinion, things got a little more complicated when Node decided to support ES Modules.

## ES Modules

Modularity isn't anything new to the Node.js ecosystem, but it is something relatively new to the JavaScript that we run in browsers. It wasn't until mid-2018 that all major browsers shipped with the ability to natively import and export from modules in JavaScript, which was accomplished through ES Modules. The implementation details behind CommonJS and ES Modules are presumably quite different, but they both have the same goal of providing modules in JavaScript. Two keywords make ES Modules visibly different from CommonJS. They are `import` and `export`, pretty simple in my opinion.

To use ES Modules natively in the browser we can simply add `type="module"` to the `<script>` tag that is referencing the module.

```html
<script src="main.js" type="module">
```

Since the introduction of ES Modules to the web, Node.js has also adopted support for them. In Node.js we have a few options to tell the JavaScript engine ES Modules should be used for files. The options are quite similar to those used for CommonJS, but slightly different to indicate ES Modules.

- Use the file extension `.mjs`
- Set the `"type"` field to `"module"` in the `package.json`
- Including `--input-type=module` when invoking Node from the command-line

Files with the extension of `.mjs` can also be used when referencing modules in code targeting the browser.

As I mentioned the `import` and `export` keywords are the main user-facing differentiation between ES Modules and CommonJS. The `import` keyword is used to import objects or functions from another module or file. The `export` keyword is used to expose module members (objects and functions) that can then be imported by other modules.

> The import and export keywords are to ES Modules what the require function and module.exports object is to CommonJS respectively.

That declaration may be slightly reductive, but that's how I view them. Obviously, the way that the modules are parsed and evaluated by the respective JavaScript engines is bound to be quite different. Luckily as developers, we don't have to worry about their low-level implementation _too often_.

If we were to translate our previous code sample to ES Modules, there are only a few lines that need to change. In `prompt.js` we need to change the `require` method to the `import` keyword.

```javascript
// prompt.js
import { processPrompt } from "./ai";
// rest of code
```

Similarly in the `ai.js` we need to change `module.exports` to `export`.

```javascript
// ai.js
// rest of code
export { processPrompt };
```

In this post, we looked at CommonJS and ES Modules through the lens of the need for modularity and the environments they are used in. There is a ton of great documentation available to learn more about both of these module systems. So if you're interested in learning more I suggest using this post as a foundation to go deeper in those areas.
