var express = require('express');
var router = express.Router();

/* If not logged-in redirect */
var isAuthenticated = function(req, res, next) {
    
    
    console.log('Authentication Status: ' + req.isAuthenticated() );
    if(req.isAuthenticated()) {

        return next();
    } 
    return res.redirect('/login');

};

function routeIndex(passport)
{

    
    /* Login page */
    router.get('/login', function(req, res) { res.render('login', { title : 'Please log in' }); });

    /* Handle log-in POST */
    router.post('/login', passport.authenticate('login', { failureRedirect : '/login#fail' }), function(req, res) {

        console.log('succesfully logged-in');
         
        res.redirect('/');

    });

    /* Handle Registration POST */
    router.post('/singup', passport.authenticate('singup', { failureRedirect : '/singup#fail' }), function(req, res) {

        console.log('succesfully registered');
         return res.redirect('/');

    });

    /* GET Registration Page */
    router.get('/singup', function(req, res) { res.render('singup', { title : 'Register' }); });

    /* GET home page. */
    router.get('/', isAuthenticated, function(req, res) {

        console.log('get home page');
        res.sendFile('public/index.html', {root: __dirname + '/../'});

    });
    
    /* logs-out */
    
    router.get('/logout',isAuthenticated, function(req, res){
        
      req.logout();
      res.redirect('/');
    });    
    

    return router;
}

module.exports = routeIndex;
