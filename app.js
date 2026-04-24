var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/users/index');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// NO Helmet.js - missing security headers (vulnerable)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// VULNERABLE session config
app.use(session({
  secret: 'secrettobecchanged',
  resave: true,
  saveUninitialized: true,
  cookie: { httpOnly: false, secure: false }
}));

app.use('/', indexRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', { message: err.message, error: err });
});

module.exports = app;