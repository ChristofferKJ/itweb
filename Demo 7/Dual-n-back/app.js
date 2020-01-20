var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const passport = require('passport');
const net = require('net');
var cors = require('cors')
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 3030 });




wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    wss.clients.forEach(function each(client) {
      client.send(data); 
    });
  });
});




//passport config
require('./config/local')(passport)
require('./config/jwt')(passport)

//Routes
var homeRouter = require('./routes/homeRoute')
var scoreRouter = require('./routes/scoreRoute');
var userRouter = require('./routes/userRoute')

var app = express();
app.use(cors())
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

//passport middleware 
app.use(passport.initialize());
app.use(passport.session());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use('/', homeRouter)
app.use('/score', scoreRouter);
app.use('/user', userRouter);

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






module.exports = app;
