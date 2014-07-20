sonya-from-directory
====================

A Sonya provider that automatically loads modules from a directory.


How to Use
-----------
Before loading sonya in your project, load sonya-from-directory. The provider will automatically register itself with sonya and be usable like any other provider.

Example
--------

```javascript
require("sonya-from-directory");
var sonya = require("sonya");

sonya.Provide.fromDirectory("./directory-where-all-my-modules-are");
```

Options
---------
sonya-from-directory can be used without any options, as in the example above. To do this, simply pass a string to the provider and ensure your modules meet certain requirements:

   * Each module is contained in its own JavaScript file. The module itself is a function that is the sole export of the file, using `module.exports`.
   * Each module function should define at least two properties, `$type` and `$name`. The `$type` property tells sonya-from-directory what type of module this is (e.g. a service or a facctory.) The `$name` property tells sonya-from-directory what name to register the module under.
   * In the absence of `$type` and/or `$name` properties, sonya-from-directory will assume every module is a factory and will use the name of each module function as the name to register the module under.

To override these assumptions and specify options, pass an object to the provider instead of a string:

```javascript
require("sonya-from-directory");

var sonya = require("sonya");

sonya.Provide.fromDirectory({
  dir: "./directory-where-all-my-modules-are",
  useFunctionNames: false,   //if set to false, every module MUST use the $name property.
  defaultProvider: "service"
});

