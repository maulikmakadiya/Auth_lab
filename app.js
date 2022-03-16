var createError = require('http-errors');
var express = require('express');
const bodyParser = require("body-parser");
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var connection = require("express-myconnection");
var mysql = require('mysql');
var config = require('./config/db_connection');
var cors = require('cors');
require('dotenv').config();
var fileUpload = require("express-fileupload")
const { router } = require('./components/indexRoutes');

var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload({
  limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use(connection(mysql,config))

app.use('/', router)

// catch 404 and forward to error handler
app.use(function (req, res, next) {d
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send("Something went wrong, please try again later.");
});

app.listen(4000,function (err) {
  if(err) throw err;  
})

module.exports = app;
