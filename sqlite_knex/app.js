const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const users = require('./routes/users');
app.use('/users', users);

const orders = require('./routes/orders');
app.use('/orders', orders);

const menu = require('./routes/menu');
app.use('/menu', menu);

const feedback = require('./routes/feedback');
app.use('/feedback', feedback);

const simulation = require('./routes/simulations');
app.use('/simulation', simulation);

app.set('views', path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get('/', (req, res) => {
    res.render('info')
    
});

app.listen(3000, () =>{
    "Serverr started on port 3000"
});
