const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy;
//const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('../models/User');
const User = mongoose.model('Users');

module.exports = function(passport) {
  passport.use(
    new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => {
      User.findOne({
        email: email
      }).then(user => {
        if (!user) {
          return done(null, false, { message: 'Dont have a match' });
        } else console.log('have a match' + user);
        return done(null, user);
      });
    })
  );

  passport.serializeUser(function(user, done) {
    const logedUser = user;
    console.log(user);
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
