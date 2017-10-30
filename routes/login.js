var express = require('express');
var router = express.Router();
var fs = require('fs');
var jwt = require('jsonwebtoken');
var ObjectId = require('mongodb').ObjectID;
var expressJwt = require('express-jwt');

var Blog = require('../models/blog');
var Admin = require('../models/admin');

//route: middleware applied to a request (middleware acts as a bridge between application and database)
const RSA_PRIVATE_KEY = fs.readFileSync('./jwtRS256.key');

router.post('/', function(req, res, next) {
  const email = req.body.email,
    password = req.body.password;
  Admin.findOne({
    email: email,
    password: password
  }, function(err, admin) {
    if (err) {
      return res.status(500).json({
        title: 'An error has occured',
        error: err
      });
    }
    // console.log(admin)
    if (!admin) {
      return res.status(401).json({
        title: 'Login failed',
        error: 'Invalid login credentials'
      });
    }
    if (!password === admin.password) {
      return res.status(401).json({
        title: 'Login failed',
        error: 'Password not found'
      });
    }
    const adminId = admin._id.toString();
    const token = jwt.sign({
      name: admin.name
    }, RSA_PRIVATE_KEY, {
      algorithm: 'RS256',
      expiresIn: 1200,
      subject: adminId
    });
    // send the JWT back to the user
    // console.log(admin);
    res.status(201).json({
      message: 'Everything ok',
      token: token
    });

  });
});


// const checkIfAuthenticated = expressJwt({
//   secret: RSA_PUBLIC_KEY
// });
// app.route('/api/lessons')
//   .get(checkIfAuthenticated, readAllLessons);

module.exports = router;
