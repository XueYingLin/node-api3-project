const express = require("express")
const cors = require("cors")
const logger = require("./middleware/logger")

const users = require("./users/userDb")
const userRouter = require("./users/userRouter")

const server = express()
const port = 4000

server.use(express.json())
server.use(cors())
server.use(logger({ format: "long" }))

server.use("/users", userRouter)

//this middleware function will only run if no route is found.
//routes never call `next()`, so if a route is found, htis never runs.
server.use((req, res) => {
    res.status(404).json({
        message: "Route was not found",
    })
})

//any time a middleware function call `next` with  aparameter, like `next(error)`, 
//this middleware function will run. The stack skip directly down to it, like a 
//catch statemement.
server.use((err, req, res, next) => {
    console.log(err)
    res.status(500).json({
        //we never want to expose the detail of a server error
        //to the client, since it could potentially contain sentitive
        //info. keep the message generic, and  log out the details for 
        //the developer to see.
        message: "Something went wrong"
    })
})

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
