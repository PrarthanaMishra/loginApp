var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var promise=require('promise');
var index = require('./routes/index');
var users = require('./routes/users');
var list=require('./routes/list');
var routes = require('./server/routes/route');
var connection=require('./server/models/connection');
var jwt = require('jsonwebtoken'); 
var cookieParser=require('cookie-parser');
//var pgp = require('pg-promise')(options);

var app = express();
// var options = {
//   // Initialization Options
//   promiseLib: promise
// };

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());

app.use('/', index);
app.use('/users', users);
//app.use('/login',list);

routes(app);
//jsonwebtoken test

const payload = {
  admin: 123,
  id:'foo'
};
var arrr=[ 
  {
  id: 1,
  name: 'diya',
  occupation: 'programmer',
  age: 25,
  sex: 'F',
  user_name: 'diya123',
  password: '123' } ]
   console.log(arrr[0].id);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
