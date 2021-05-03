var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let mongoose = require("mongoose");
require('dotenv').config();
var passport = require("passport");

const db = process.env.TEST_DB;
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Database is connected");
}).catch(err => {
    console.log("Error is ", err.message);
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Passport middleware
app.use(passport.initialize());

//Config for JWT strategy
require("./stratgies/jwt-strategy")(passport);

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
