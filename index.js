/**
 * Clay runtime for cloud functions.
 */

function startFunction() {
    this.event = startFunction.caller.arguments[0]
    this.context = startFunction.caller.arguments[1]
    this.callback = startFunction.caller.arguments[2]

    try { 
        this.params = JSON.parse(this.event.body);
    } catch(e) {
        // Not json input
        console.log(e);
    }
}

var clayRuntime = {
    event: null,
    context: null,
    callback: null,

    // Default status code
    statusCode: 200,

    // Default headers
    headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    },

    start: startFunction.bind(this),

    /**
     * Set the status of the lambda
     * @param {int} status
     */
    status: function(status) {
        this.statusCode = status;
        return this;
    },

    /**
     * Add or modify a header
     * @param {string} name
     * @param {string} value
     */
    header: function(name, value) {
        this.headers[name] = value;
        return this;
    },

    /**
     * End the lambda function with a result
     * @param {result} can be json or error
     */
    end: function(result) {
        if(result instanceof Error) {
            return this.callback(result);
        }

        return this.context.succeed({
            'body': JSON.stringify(result),
            'statusCode': this.statusCode,
            'headers': this.headers
        })
    },

    /**
     * Returns the base dir where the function
     * can write and read files.
     */
    baseDir: function() {
        return '/tmp/';
    }
}

module.exports = clayRuntime;