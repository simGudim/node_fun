const express = require('express');
const router = express.Router();
let Article = require('../models/article');
const {body, validationResult} = require('express-validator');
const flash = require('connect-flash');
const bodyParser = require('body-parser');



//Load edit form
router.get('/edit/:id', (req, res) => {
    Article.findById(req.params.id, (err, result) => {
        console.log(result)
        res.render('edit_article', {
            title: "Edit Article",
            article : result
        });
    });
});

//Submit edited article
router.post('/edit/:id', (req, res) => {
    let article = {};
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    let query = {_id:req.params.id}

    Article.update(query, article, (err) => {
        if(err) {
            console.log(err)
            return;
        } else {
            req.flash('success', 'Article Updated')
            res.redirect('/');
        }
    })

});




//Add route
router.get('/add', (req, res) => {
    res.render("add_article", {
        title: 'Add Article'
    });
});

//Add submit POST
router.post('/add', [
    body('title').not().isEmpty(),
    body('author').not().isEmpty(),
    body('body').not().isEmpty()
],(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        // console.log(errors.array())
        // return res.status(400).json({ errors: errors.array() });
        res.render('add_article', {
            title: 'Add Article',
            errors: errors
        })
    }
    let article = new Article();
    article.title = req.body.title;
    article.author = req.body.author;
    article.body = req.body.body;

    article.save((err) => {
        if(err) {
            console.log(err)
            return;
        } else {
            req.flash('success', 'Article Added')
            res.redirect('/');
        }
    })

});

router.delete('/:id', (req, res) => {
    let query = {_id: req.params.id};
    Article.remove(query, (e) => {
        if(e) {
            console.log(e);
        } else {
            res.send("Success");
        }
    })
})

//Get single article
router.get('/:id', (req, res) => {
    Article.findById(req.params.id, (err, result) => {
        res.render('article', {
            article : result
        })
    });
})

module.exports = router;
