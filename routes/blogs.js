var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');
var fs = require('fs');
var app = express();
var Blog = require('../models/blog');
const jwt = require('express-jwt');
const jwks = require('jwks-rsa');

const authCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: "https://royadams.eu.auth0.com/.well-known/jwks.json"
  }),
  // This is the identifier we set when we created the API
  aud: 'https://royadams.eu.auth0.com/api/v2/',
  iss: "https://royadams.eu.auth0.com",
  alg: ['RS256']
});

// For the private route, we'll add this authCheck middleware
router.use('/edit', authCheck)

router.use(function(err, req, res, next) {
  if (err.name === 'UnauthorizedError') {
    console.log(err.message, err.status);
    return res.status(err.status).send({
      title: 'An error has occured',
      statusText: err.message
    });
  }
  console.log("all good");
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
