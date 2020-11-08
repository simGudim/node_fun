const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');
const config = require('../config/db');
const bcrypt = require('bcryptjs');

module.exports = (passport) => {
    //Local Startagy
    passport.use(new LocalStrategy((username, password, done) => {
        //Match username
        let query = { username:username};
        User.findOne(query, (err, user) => {
            if(err) throw err;
            if (!user) {
                return done(null, false, {message: "No user found"})
            }

            //Match passwork
            bcrypt.compare(password, user.password, (error, match) => {
                if(err) throw err;
                if(match) {
                    return done(null, user)
                } else {
                    return done(null, false, {message: "Wrong passport"})
                }
            });
        });
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id)
    })

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        })
    })
};