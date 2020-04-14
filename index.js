const express = require("express")
const users = require("./users/userDb")
const userRouter = require("./users/userRouter")

const server = expres()
const port = 4000

server.use(express.json())
server.use("./users", userRouter)

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})
