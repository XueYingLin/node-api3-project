// a higher order function(HOF) that returns a middleware
// function. Using allows us to pass options through
// when it's called. Options can anthing--an object, a
//string, a boolean, etc.

//logger logs to the console the following information about each request: request method, request url, and a timestamp
//this middleware runs on every request made to the API
module.exports = (options) => {
    return (req, res, next) => {
        switch (options.format) {
            case "short": 
                console.log(`${req.method} ${req.url}`)
                break
            case "long":
            default:
                console.log(`${new Data().toISOString()} ${req.method} ${req.url}`)
                break
        }
        next()
    }
}