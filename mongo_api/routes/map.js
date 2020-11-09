const express = require('express');
const router = express.Router();
let Article = require('../models/article');
let User = require('../models/user');
const {body, validationResult} = require('express-validator');
const flash = require('connect-flash');
const bodyParser = require('body-parser');


router.get('/get', EnsureAuth, (req, res) => {
    res.render("map")
});

function EnsureAuth(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        req.flash('danger', "Please login");
        res.redirect('/users/login');
    }
};

module.exports = router;
