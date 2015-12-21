// DBA Access for the users-collection
var User = require('../dbModels/users.js');
// localStrategy
var LocalStrategy = require('passport-local').Strategy;
// cryp lib
var bCrypt = require('bcrypt-nodejs');
// Generates hash using bCrypt
var createHash = function(password) { return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null); };

function registerStrategy(passport)
{

    passport.use('singup',
                 new LocalStrategy({ passReqToCallback : true }, function(req, username, password, done) {
                     findOrCreateUser = function() {
                         // find a user in Mongo with provided username
                         User.findOne({ '_name' : username }, function(err, user) {
                             // In case of any error return
                             if(err) {
                                 console.log('Error in SignUp: ' + err);
                                 return done(err);
                             }
                             // already exists
                             if(user) {
                                 console.log('User already exists');
                                 return done(null, false);
                             } else {
                                 // if there is no user with that email
                                 // create the user
                                 var newUser = new User();
                                 // set the user's local credentials
                                 newUser._name = username;
                                 newUser.password = createHash(password);
                                 if(req.body.realName) {
                                     newUser.realName = req.param('realName');
                                 }
                                 // save the user
                                 newUser.save(function(err) {
                                     if(err) {
                                         console.log('Error in Saving user: ' + err);
                                         throw err;
                                     }
                                     console.log('User Registration succesful');
                                     return done(null, newUser);
                                 });
                             }
                         });
                     };

                     // Delay the execution of findOrCreateUser and execute
                     // the method in the next tick of the event loop
                     process.nextTick(findOrCreateUser);
                 }));
}

module.exports = registerStrategy;
