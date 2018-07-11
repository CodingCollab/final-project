import passport from "passport";
import { Strategy } from "passport-local";

import db from "./../models";

passport.use(new Strategy({
    usernameField: userName,
    passwordField: userPass
},
    function (username, password, done) {
        db.User.findOne({ username: username }, function (err, user) {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, { message: "Incorrect Username and/or Password" });
            }
            if (!user.validPassword(password)) {
                return done(null, false, { message: "Incorrect Username and/or Password" });
            }

            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, cb) {
    cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
});

module.exports = passport;