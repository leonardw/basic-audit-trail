

# basic-audit-trail

A very basic audit trail for Node.js that writes to log files only, and support daily rotation of log files.


## Usage

Plain audit trail:
```js
var audit = require('./audit');
audit.filename('./log/audit.log'); // must set location of audit log file

audit.info('Hello World!'); // audit as level 'info'
audit.info({json:'object', to:'stringfy'}); // objects are stringify'd in audit message

audit.error('An error occurred'); // audit as level 'error'
audit.error({err:'404', text:'File not found!'});
```

Callback audit trail:
```js
// audit by intercepting a callback
someApiCall(p1, p2, audit.intercept(callback, p2));
```

In the above, ``callback`` must support an error parameter as its first argument:
```js
callback = function(err, p1, p2, ... pN){
   ...
}
```

`intercept()` takes a message as second argument, and optionally a scope for the `callback`
```js
audit.intercept(callback, message[, scope])
```

The `message` is only included in audit trail if originating call completed successfully.
On failure, the error argument to `callback` is audited instead.


##License

(The MIT License)

Copyright (c) 2013 Leonard Wu <leonard.wu92@imperial.ac.uk>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
