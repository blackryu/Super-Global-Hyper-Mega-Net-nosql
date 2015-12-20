// DBA Access for the users-collection
var User = require('../dbModels/users.js');
//cryp lib
var bCrypt = require('bcrypt-nodejs');
//localStrategy
var LocalStrategy = require('passport-local').Strategy;
var isValidPassword = function(user, password) { return bCrypt.compareSync(password, user.password); };

function registerStrategy(passport)
{

    passport.use('login',
                 new LocalStrategy({ passReqToCallback : true }, function(req, username, password, done) {
                     // check in mongo if a user with username exists or not
                     User.findOne({ '_name' : username }, function(err, user) {
                         // In case of any error, return using the done method
                         if(err){
                             console.log('error in login js');
                             return done(err);
                             }
                             
                         // Username does not exist, log error & redirect back
                         if(!user) {
                             console.log('User Not Found with username ' + username);
                             return done(null, false);
                         }
                         
                         console.log(user);
                         // User exists but wrong password, log the error
                         if(!isValidPassword(user, password)) {
                             console.log('Invalid Password');
                             return done(null, false);
                         } 
                         // User and password both match, return user from
                         // done method which will be treated like success
                         return done(null, user);
                     });
                 }));
}

module.exports = registerStrategy;