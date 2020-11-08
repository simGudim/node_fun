const express = require('express');
const router = express.Router();
let Article = require('../models/article');
let User = require('../models/user');
const {body, validationResult} = require('express-validator');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const passport = require('passport');


router.get('/register', (req, res) => {
    res.render('register');

})

//Register process
router.post('/register', [
    body('name').not().isEmpty(),
    body('email').not().isEmpty().isEmail(),
    body('username').not().isEmpty(),
    body('password').not().isEmpty(),
    body('password2').custom((value, { req }) => value === req.body.password)
],  (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const password2 = req.body.password2;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        // return res.status(400).json({ errors: errors.array() });
        res.render('register', {
            errors: errors
        })
    }

    let newUser = new User({
        name : name,
        username: username,
        email: email,
        password: password,
        password2: password2
    })

    bcrypt.genSalt(2, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) {
                console.log(err);
            }
            newUser.password = hash
            newUser.save((err) => {
                if(err) {
                    console.log(err)
                    return;
                } else {
                    req.flash('success', 'User Registered');
                    res.redirect('/users/login');
                }
            });
        });
    });
});

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('success', 'You are logged out');
    res.redirect('/users/login');
})

module.exports = router;