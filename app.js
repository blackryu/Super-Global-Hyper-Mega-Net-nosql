var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// Routes
var routes = require('./routes/index');
var users = require('./routes/users');
var listRoutes = require('./routes/list');
var todosRoutes = require('./routes/todo');
var mongoose = require('mongoose');
var app = express();

// Sectret Config
var config = require('./secret');

// DB

var mongooseConnection = 'mongodb://' + config.dbUser + ':' + config.dbPass + '@' + config.dbUrl + '/' + config.dbName;
var db = mongoose.connection;

//let us konw we connected
db.once('open', function callback() {

    console.log('yay we conected :) ');
    
});
// die on connection erros
db.on('error', console.error.bind(console, 'connection error:'));

//connect 
mongoose.connect(mongooseConnection);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : false }));
app.use(cookieParser());

// make bootflap files accessible
app.use('/bootflat/css',express.static(__dirname+'/node_modules/bootflat/css/'));
app.use('/bootflat/js',express.static(__dirname+'/node_modules/bootflat/js/'));
app.use('/bootflat/bootflat/js',express.static(__dirname+'/node_modules/bootflat/bootflat/js/'));

app.use('/bootflat/bootflat/css',express.static(__dirname+'/node_modules/bootflat/bootflat/css/'));
app.use('/bootflat/fonts',express.static(__dirname+'/node_modules/bootflat/fonts/'));
// make angular files accessible
app.use('/lib/angular/angular.js',express.static(__dirname+'/node_modules/angular/angular.js'));
app.use('/lib/angular-route/angular-route.js',express.static(__dirname+'/node_modules/angular-route/angular-route.js'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/list', listRoutes);
app.use('/todos', todosRoutes);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if(app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', { message : err.message, error : err });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', { message : err.message, error : {} });
});

module.exports = app;
