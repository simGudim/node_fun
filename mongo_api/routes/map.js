const express = require('express');
const router = express.Router();
let Article = require('../models/article');
let User = require('../models/user');
let geoJsonLayers = require('../models/geojson_files');
const {body, validationResult} = require('express-validator');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const fs = require('fs');




router.get('/get', EnsureAuth, (req, res) => {
    res.render("map")
});

router.post('/add', EnsureAuth, (req, res) => {
    if (req.files) {
        let data = JSON.parse(req.files.add_layer.data.toString('utf8'));
        let data_col = [];
        for(let i = 0; i < data.features.length; i++) {
            data.features[i]["name"] = req.body.name;
            data_col.push(data.features[i]);
        }
        
        
    }
    res.status(200)
    
    
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
