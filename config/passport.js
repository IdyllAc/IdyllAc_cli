const { configureLocalStrategy } = require('./passport-config');
const User = require('../models/User');

 function initializePassport(passport) {
     // Set up LocalStrategy
  configureLocalStrategy(passport);

    // Set up session support
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });


    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findByPk(id);
            done(null, user);
        } catch (err) {
            done(err);
        }
    });
}

module.exports = initializePassport;