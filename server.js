process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var mongoose = require('./config/mongoose');
var db = mongoose();
var passport = require('./config/passport');

var express = require('./config/express.js');
console.log('before express loding..');

var app =  express(db);
passport = passport();
module.exports = app;
app.listen(3000);
console.log('Server running at http://localhost:3000');  





                 

