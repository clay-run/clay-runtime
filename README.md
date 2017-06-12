# Clay Runtime

Provides a simple to use interface for lambda functions.

Currently supports:
- Amazon Web Services Lambda

## Install

```
$ npm install clay-runtime --save
```

Then use the starter code:

```js
// Require your files or libraries here. You can use npm to install libraries.
var clay = require('./clay.js');

exports.handler = function() {
    // Has to be the first line of the function
    clay.start()

    /*
    Your service only responds to POST requests
    any variables passed are found in event.body
    eventVars is a convenience that parses any JSON
    objects that were passed in the POST request
    */

    var key1 = clay.params.key1;

    /*
    JSON Stringify the result of the service call
    In this example we simply pass back whatever parameters
    were sent to the service
    */

    clay.status(200)
        .header('Header', 'value')
        .end(clay.params);
}
```

## Documentation

Soon to come! Go to [Clay.run](https://clay.run) to learn more about Lambda functions.