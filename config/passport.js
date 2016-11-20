// Passport local strategy for authentication

var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;


passport.use('local-login', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Username not found' });
      }
      if (user.password != password) {
          return done(null, false, {message: 'Password didn\'t match'});
          }
          return done(null, user, {message: 'Logged in successfully'});
    });
  }
));

passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, done) {
    User.findOne({ username:  username}, function(err, user){
        if (err) {return done(err);}
        if(user){
          return done(null, false, {message: 'Username already taken'});
        }
        else {        
          User.create({
            username: username,
            password: password,
            email: req.body.email
          }).exec(function (err, user){
          if(err){return done(err);}
          return done(null, user, {message: 'Signup successfull'});
          });
        }
    });
  }  
));
