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
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("Database is connected");
}).catch(err => {
    console.log("Error is ", err.message);
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var classesRouter = require('./routes/classes');
var todosRouter = require('./routes/todos');
var announcementsRouter = require('./routes/announcements');
var assignmentsRouter = require('./routes/assignments')

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "client-app/build")));
    app.use(express.static("public"));
} else {
    app.use(express.static(path.join(__dirname, 'public')));
}

//Passport middleware
app.use(passport.initialize());

//Config for JWT strategy
require("./stratgies/jwt-strategy")(passport);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/classes', classesRouter);
app.use('/classes', todosRouter);
app.use('/classes', announcementsRouter);
app.use('/classes', assignmentsRouter);
app.use((req, res, next) => {
    res.sendFile(path.join(__dirname, ".", "client-app/build", "index.html"));
});

module.exports = app;
