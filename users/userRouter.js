const express = require('express');

const router = express.Router();
const users = require("./userDb");

// const validateUserID = require("../middleware/validateUserID")
// const validateUser = require("../middleware/validateUser")

router.post('/', validatePost(), (req, res) => {
  // do your magic!
  users.insert(req.body)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((error) => {
      next(error)
    })
});

router.post('/:id/posts', validateUserId(), (req, res) => {
  // do your magic!
  if (!req.body.text) {
    return res.status(400).json({message: "Need a value for text"})
  }
   users.insert(req.params.id, req.body)
    .then((post) => {
      res.status(201).json(post)
    })
    .catch((error) => {
      next(error)
    })
});

router.get('/', (req, res, next) => {
  // do your magic!
  const options = {
    sortBy: req.query.sortBy,
    limit: req.query.limit
  }

  users.find(options)
    .then((uers) => {
      res.status(200).json(users)
    })
    .catch((eror) => {
      next(error)
    })

});

router.get('/:id', validateUserId(), (req, res, next) => {
  // do your magic!
  res.status(200).json(req.user)
});

router.get('/:id/posts', validateUserId(), (req, res, next) => {
  // do your magic!
  users.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(post)
    })
    .catch((error) => {
      next(error)
    })
});

router.delete('/:id', validateUserId(), (req, res,  next) => {
  // do your magic!
  users.remove(req.params.id)
    .then((count) => {
      res.status(200).json({message: "The user has been nuked"})
    })
    .catch((error) => {
      next(error)
    })
});

router.put('/:id', validateUser(), (req, res, next) => {
  // do your magic!
  users.update(req.params.id, req.body)
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((error) => {
      next(error)
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  return (req, res, next) => {
    users.getById(req.params.id)
      .then((user) => {
        if (use) {
          req.user = user;
          next();
        } else {
          res.status(400).json({
            message: "missing required name field"
          })
        }
      })
      .catch((error) => {
        next(error)
      })
  }
}

function validateUser(req, res, next) {
  // do your magic!
  users.getById(req.body.id)
    .then((user) => {
      if (!req.body) {
        return res.status(400).json({message: "missing post data"})
      }
      if (!req.body.name) {
        return res.status(400).json({ message: "missing required name field" })
      }
    })
}

function validatePost(req, res, next) {
  // do your magic!
  users.getUserPosts(req.body.post)
    .then((post) => {
      if (!req.body) {
        return res.status(400).json({ message: "missing post data" })
      }
      if (!req.body.text) {
        return res.status(400).json({ message: "missing required text field" })
      }
    })
}





module.exports = router;
