/*
This is executed  on each request from browser
*/
var express = require('express');
var path = require('path');
// var favicon = require('serve-favicon');
var app = express();
// var logger = require('morgan');
// var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
//Reference route files to use - And make sure to add to below code
// var appRoutes = require('./routes/app');
var blogRoutes = require('./routes/blogs');

var port = process.env.PORT || '3000';
var http = require('http');
app.set('port', port);

/**
 * Create HTTP server.
 */

var server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);


mongoose.connect('main-user:omar1993@ds145263.mlab.com:45263/reflections_blog');

// view engine setup
// app.set('views', path.join(__dirname, 'views'));//view folder
app.set('view engine', 'hbs');//Templating engine (HandleBars)


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));//This is only accessible folder, serving application
//Need for Cross domain requests (CORS)
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PATCH, DELETE, OPTIONS');
    next();
});
//ROUTES
//Handle specific routes first
app.use('/blogs', blogRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    return res.render('index');
});

module.exports = app;
