const express = require('express');

const router = express.Router();
const users = require("./userDb");
const postDb = require("../posts/postDb");

// const validateUserID = require("../middleware/validateUserID")
// const validateUser = require("../middleware/validateUser")

router.post('/', validatePost(), (req, res, next) => {
  // do your magic!
  users.insert(req.body)
    .then((user) => {
      res.status(201).json(user)
    })
    .catch((error) => {
      next(error)
    })
});

//*
router.post('/:id/posts', validateUserId(), (req, res, next) => {
  // do your magic!
  if (!req.body.text) {
    return res.status(400).json({message: "Need a value for text"})
  }

  let newPost = {
    user_id: req.user.id,
    text: req.body.text
  }

  postDb.insert(newPost)
    .then((post) => {
      res.status(201).json(post)
    })
    .catch((error) => {
      next(error)
    })
});

router.get('/', (req, res, next) => {
  users.get()
    .then((user) => {
      res.status(200).json(user)
    })
    .catch((eror) => {
      next(error)
    })

});

router.get('/:id', validateUserId(), (req, res, next) => {
  // do your magic!
  res.status(200).json(req.user)
});

//*
router.get('/:id/posts', validateUserId(), (req, res, next) => {
  // do your magic!
  users.getUserPosts(req.params.id)
    .then((posts) => {
      res.status(200).json(posts)
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

function validateUserId() {
  // do your magic!
  return (req, res, next) => {
    users.getById(req.params.id)
      .then((user) => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(400).json({
            message: "invalid user id"
          })
        }
      })
      .catch((error) => {
        next(error)
      })
  }
}

function validateUser() {
  // do your magic!
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({message: "missing user data"})
    }
    if (!req.body.text) {
      return res.status(400).json({message: "missing required text field"})
    }
  }
}

function validatePost() {
  // do your magic!
  return (req, res, next) => {
    if (!req.body) {
      return res.status(400).json({ message: "missing post data" });
    }
    if (!req.body.text) {
      return res.status(400).json({ message: "missing required text field" });
    }
  };
}





module.exports = router;
