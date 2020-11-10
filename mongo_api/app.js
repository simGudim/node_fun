const express = require('express');
const { lchmod } = require('fs');
const path = require('path');
const app = express();
const mongoose = require('mongoose');
let Article = require('./models/article');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const config = require('./config/db');
const passport = require('passport');
const file_upload = require('express-fileupload');



mongoose.connect(config.database);
// mongoose.connect('mongodb://localhost/nodekb');
let db = mongoose.connection;


db.once("open", () => {
    console.log("connected to mongo");
})

//Check for db errors
db.on('error', (err)=>{
    console.log(err)
});


app.set('views', path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// express session middleware
app.use(session({
    secret: "super_duper",
    resave: true,
    saveUnintitialized: true
}));
app.use(file_upload());

//Express message middleware
app.use(require('connect-flash')());
app.use(function(req, res, next) {
    res.locals.messages = require('express-messages')(req, res);
    next();
});

//Passport config and middleware
require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next) {
    res.locals.user = req.user || null;
    next();
})



app.get('/', (req, res) => {
    Article.find({}, (err, response) => {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {
                title: 'Hello',
                articles: response
            });
        }
    });
    
});

let articles = require('./routes/articles');
app.use('/articles', articles);

let users = require('./routes/users');
app.use('/users', users);

let map = require('./routes/map');
app.use('/map', map);

app.listen(3000, () =>{
    "Serverr started on port 3000"
});
