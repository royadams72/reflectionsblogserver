var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');
var fs = require('fs');
var app = express();
var Blog = require('../models/blog');

//route: middleware applied to a request (middleware acts as a bridge between application and database)
const RSA_PUBLIC_KEY = fs.readFileSync('./jwtRS256.key.pub');
const checkIfAuthenticated = expressJwt({
  secret: RSA_PUBLIC_KEY
});

router.use('/edit', checkIfAuthenticated);
router.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    console.log(err.message);
    return res.status(err.status).send({
      title: 'An error has occured',
      statusText: err.message
    });
  }
  next();
});
router.get('/', function(req, res, next) {
  //Create an new instance of Blog object
  Blog.find()
    .exec(function(err, response) {
      if (err) {
        return res.status(500).json({
          title: 'An error has occured',
          error: err
        });
      }
      //console.log(messages)
      res.status(201).json({
        message: 'Success',
        blogs: response
      });
    });
});

router.get('/:id', function(req, res, next) {
  var id = req.params.id;
  Blog.findById(id, function(err, response) {
    if (err) {
      return res.status(500).json({
        title: 'An error has occured',
        error: err
      });
    }
    res.status(201).json({
      message: 'Success',
      blog: response
    });
  });
});

router.post('/edit', function(req, res, next) {
  //Create an new instance of User object
  var blog = new Blog({
    title: req.body.title,
    script: req.body.script,
    vidUrl: req.body.vidUrl
  });

  blog.save(function(err, result) {
    if (err) {
      return res.status(500).json({
        title: 'An error has occured',
        error: err
      });
    }
    res.status(201).json({
      message: 'Everything ok',
      obj: result
    });
  });
});


var p = router.patch('/edit', function(req, res, next) {
  var id = req.body._id;
  Blog.findById(id, function(err, blog) {
    if (err) {
      return res.status(500).json({
        title: 'An error has occured',
        error: err
      });
    }

    blog.title = req.body.title;
    blog.script = req.body.script;
    blog.vidUrl = req.body.vidUrl;
    blog.save(function(err, result) {
      if (err) {
        return res.status(500).json({
          title: 'An error has occured',
          error: err
        });
      }
      res.status(201).json({
        message: 'Everything ok',
        obj: result
      });
    });
  });
});
module.exports = router;
