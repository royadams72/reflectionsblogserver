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

router.get('/:id', function (req, res, next) {
  var id =
  Blog.findById(id, function (err, user) {


  })
  //Create an new instance of User object
    // var user = new User({firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: bcrypt.hashSync(req.body.password, 10)});
    // Blog.find(function(err, response){
    //   if(err){
    //     return res.status(500).json({
    //       title: 'An error has occured',
    //       error: err
    //     })
    //   }
    // //console.log(messages)
    //   res.status(201).json({
    //     message: 'Success',
    //     blog: response
    //   })
    // })

});


router.post('/', function (req, res, next) {
  //Create an new instance of User object
    // var user = new User({firstname: req.body.firstname, lastname: req.body.lastname, email: req.body.email, password: bcrypt.hashSync(req.body.password, 10)});
    var blog = new Blog({
      title: req.body.title,
      script: req.body.script,
       vidUrl:req.body.vidUrl
    })
    blog.save(function(err, result){
          if(err){
            return res.status(500).json({
              title: 'An error has occured',
              error: err
            })
          }
          res.status(201).json({
            message: 'Everything ok',
            obj: result
          })
    })
});


module.exports = router;
