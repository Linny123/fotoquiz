// Passport local strategy for authentication

var configAuth = require('./auth');
var passport = require('passport');
LocalStrategy = require('passport-local').Strategy;
FacebookStrategy = require('passport-facebook').Strategy;


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
}));

passport.use(new FacebookStrategy({
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        profileFields: ['id', 'email','name']
    },
    // facebook will send back the token and profile
    function(token, refreshToken, profile, done) {
        User.findOne({ FBID : profile.id }, function(err, user) {
           // if there is an error connecting to db, stop everything and return that
           if (err) {return done(err);}
           if (user) {return done(null, user);} // user found, return that user
           else {// if there is no user found with that facebook id, create them
              User.create({
              FBID: profile.id, 
              username: profile.name.familyName,
              email: profile.emails[0].value || null
              }).exec(function (err, user){
                if(err){return done(err);}
                return done(null, user);
                });
            }
        });
}));