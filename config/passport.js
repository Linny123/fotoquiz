var passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy({
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
