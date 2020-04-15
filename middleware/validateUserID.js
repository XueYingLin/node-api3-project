const users = require("../users/userDb")
module.exports = () => {
    return (req, res, next) => {
        users.getById(req.params.id)
            .then((user) => {
                if (user) {
                //make the user object available to later middleware function
                req.user =  user

                //middleware did waht it sent out to do,
                //(validated the suer),
                //move on to the next piece of middleware
                next()
            } else {
                //if you want to cancel the request from middleware,
                //just don't call next
                res.status(404).json({
                    message: "User not found"
                })
             }
        })
            .catch((error) => {
                next(error)
            })
    }
    
}