var createError = require('http-errors');
var express = require('express');

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const session = require('express-session');
var cors = require('cors')

require('./app_server/config/passport');

// Passport config
require('./app_server/config/passport')(passport)


// Mongoose & mongodb
const mongoose = require('mongoose');
var uri = "mongodb+srv://admin:admin@fitnessmongo-3cmix.gcp.mongodb.net/FitnessApp?retryWrites=true&w=majority"
mongoose.connect(uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${uri}`);
});
mongoose.connection.on('error', err => {
  console.log('Mongoose connection error:', err);
});
mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});

var userRouter = require('./app_server/routes/user');
var workoutRouter = require('./app_server/routes/workout');
var excerciseRouter = require('./app_server/routes/excercise');
var userApiRouter = require('./app_server/routes/api/user')
var exerciseApiRouter = require('./app_server/routes/api/excercise')
var workoutApiRouter = require('./app_server/routes/api/workout')

var app = express();
app.use(cors());

app.use('/public', express.static('public'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Express Session 
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true
}))

var cors = require('cors')

//passport middleware 
app.use(passport.initialize());
app.use(passport.session());

app.use('/', userRouter);
app.use('/user', userRouter);
app.use('/workout', workoutRouter);
app.use('/excercise', excerciseRouter);

//Api routes
app.use('/api/user', userApiRouter)
app.use('/api/exercise', exerciseApiRouter)
app.use('/api/workout', workoutApiRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page 
  res.status(err.status || 500);
  res.render('error');
});

passport.serializeUser(function (user, cb) {
  cb(null, user._id);
});

passport.deserializeUser(function (id, cb) {
  db.users.findById(id, function (err, user) {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

module.exports = app;
