var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var nosotrosRouter = require('./routes/nosotros');
var galeriaRouter = require('./routes/galeria');
var eventosRouter = require('./routes/eventos');
var contactoRouter = require('./routes/contacto');
var logingRouter = require('./routes/admin/login');
var adminRouter = require('./routes/admin/eventos')




var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret:"PW2022intawqye",
  resave: false,
  saveUninitialized: true
}));

  secured = async (req, res, next) => {
    try {
      console.log(`test session ${req.session.id_usuario}`);
      if(req.session.id_usuario) {
        next();
      } else {
        res.redirect('/admin/login');
      }
    } catch (error) {
      console.log(error);
    }
  }

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/nosotros',nosotrosRouter);
app.use('/galeria',galeriaRouter);
app.use('/eventos',eventosRouter);
app.use('/contacto',contactoRouter);
app.use('/admin/login',logingRouter);
app.use('/admin/eventos',secured, adminRouter);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
