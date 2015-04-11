var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var db = require('./db');
var todo = require('./routes/todo');
var routes = require('./routes/index');
var users = require('./routes/users');

// var firstTodo = new Todo ({
//   due_date : Date.now(),
//   description: "My first to do item",
//   title:  "First",
//   priority: 10,
//   complete: false
// });

// firstTodo.save(function (err, first) {
//   if (err) {
//     return console.log(err);
//   }
//   console.log(first);
// });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// // GET method route
// app.get('/users', function (req, res) {
//   res.send('GET request to the homepage');
// });

// // POST method route
// app.post('/todo', function (req, res) {
//   console.log('someone posted to me');
//   res.send('POST request to the homepage');
// });

app.use('/', routes);
app.use('/users', users);
app.use('/todo',todo);
app.use('/create',todo);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
