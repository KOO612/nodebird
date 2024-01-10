const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/user');

module.exports = () => {
  passport.use(
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: false,
      },
      async (email, passport, done) => {
        try {
          const exUser = await User.findOne({ where: { email } });
        } catch (error) {}
      }
    )
  );
};
