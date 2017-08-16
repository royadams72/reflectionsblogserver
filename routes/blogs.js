var express = require('express');
var router = express.Router();
var Blog = require('../models/blog');

//route: middleware applied to a request (middleware acts as a bridge between application and database)
//With Nodejs http methods; get post, patch delete
router.get('/', function (req, res, next) {
  //Create an new instance of User object
    // var user = new User({firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: bcrypt.hashSync(req.body.password, 10)});
    Blog.find()
    .exec(function(err, response){
      if(err){
        return res.status(500).json({
          title: 'An error has occured',
          error: err
        })
      }
    //console.log(messages)
      res.status(201).json({
        message: 'Success',
        blogs: response
      })
    });
});
//signin will be appended on to the end of url


module.exports = router;
