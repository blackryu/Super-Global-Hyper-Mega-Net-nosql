var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var app = express();
// Sectret Config
var config = require('./secret');
// DB
var mongooseConnection = 'mongodb://' + config.dbUser + ':' + config.dbPass + '@' + config.dbUrl + '/' + config.dbName;
var db = mongoose.connection;
// let us konw we connected
db.once('open', function callback() {
    console.log('yay we conected :) ');
});
// die on connection erros
db.on('error', console.error.bind(console, 'connection error:'));
// connect
mongoose.connect(mongooseConnection);
var User = require('./dbModels/users.js');
//Configuration for Passwort
var passport = require('passport');
var expressSession = require('express-session');
//register login strategy
require('./passport/login.js')(passport);
//register sing-up strategy
require('./passport/singup.js')(passport);
//register middleware for passport
app.use(expressSession({secret: config.sessionSecret, resave: true, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
//serialization method
passport.serializeUser(function(user, done) {
  done(null, user._id);
});
//deserialization method
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});



// Routes
    //pass passport for the main routes
var indexRoutes = require('./routes/index')(passport);
var users = require('./routes/users');
var listRoutes = require('./routes/list');
var todosRoutes = require('./routes/todo');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//logger 
app.use(logger('dev'));
//body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));
app.use(cookieParser());


// make bootflap files accessible
app.use('/bootflat/css',express.static(__dirname+'/node_modules/bootflat/css/'));
app.use('/bootflat/js',express.static(__dirname+'/node_modules/bootflat/js/'));
app.use('/bootflat/bootflat/img',express.static(__dirname+'/node_modules/bootflat/bootflat/img/'));

app.use('/bootflat/bootflat/bootflat/img',express.static(__dirname+'/node_modules/bootflat/bootflat/img/'));
app.use('/bootflat/bootflat/css',express.static(__dirname+'/node_modules/bootflat/bootflat/css/'));
app.use('/bootflat/fonts',express.static(__dirname+'/node_modules/bootflat/fonts/'));
// make angular files accessible
app.use('/lib/angular/angular.js',express.static(__dirname+'/node_modules/angular/angular.js'));
app.use('/lib/angular-route/angular-route.js',express.static(__dirname+'/node_modules/angular-route/angular-route.js'));

app.use('/', indexRoutes);
 
// auth for api
app.use('/', function(req, res, next){
    
    if(req.isAuthenticated()) {

        return next();
    }
    res.status(401);
    res.send({error: 'not singed-in'});
    
    });

app.use('/users', users);
app.use('/list', listRoutes);
app.use('/todos', todosRoutes);

app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler


app.use(function(req, res, next) {
    
    
    console.log(req.path);
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {

    res.status(err.status || 500);
    console.log('error handler!');
    console.log(err);
    if(res.get('Content-Type') === 'text/html') {

        res.render('error', { message : err.message, error : {} });

    } else {

        res.send(err);
    }

});

module.exports = app;
