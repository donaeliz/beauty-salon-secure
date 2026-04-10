var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
const db = require('../database');

passport.serializeUser(function (user, done) {
  return done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  try {
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(id);
    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
});

passport.use(new LocalStrategy(
  { usernameField: 'username', passwordField: 'password' },
  function (username, password, done) {
    try {
      const user = db.prepare(
        'SELECT * FROM users WHERE email = ? AND password = ?'
      ).get(username, password);
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err);
    }
  }
));