const express = require('express');
const bodyParser = require('body-parser');
const query_tbl = require('../models/dbHelpers');
const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development)
const name_func = require('node-random-name');

const router = express.Router();

module.exports = router;

const generateRandomDOB = ()  => {
    const random = getRandomDate(new Date('2018-02-12T01:57:45.271Z'), new Date('2020-02-12T01:57:45.271Z'))
    return random.toISOString();
};

//We are 24/7 kind of cafe here
function getRandomDate(from , to) {
    const fromTime = from.getTime();
    const toTime = to.getTime();
    return new Date(fromTime + Math.random() * (toTime - fromTime));
};

//Prepare the 10000 order simulation variables
const bill_type = ["per group", "per person", "with ratios"];
const order_ids = Array(10000).fill().map((_, idx) => 1 + idx);
const user_names = Array.from(new Set(Array.from({length: 200000}, () => name_func({first: true}))));
const tone = ["angry", "nice", "polite", "sad", "freaked out", "funny", "pregnant", "stoned", "physco", "bitchy"];
const num = Array(20).fill().map((_, idx) => 1 + idx);
const menu_items = ["beer", "weird soup", "toilet paper", "chips", 
                    "vodka", "whisky", "a bug", "mocktail whatever that is", 
                    "toffifee", "more toiler paper", "watermelon"];
const price = [14.5, 22.4, 90, 12.3, 532, 43, 11, 321, 12, 2, 3]
const order_times = Array.from({length: 7500}, () => generateRandomDOB());

let orders = [];

for (let i = 0; i < 10000; i++) {
    let item = menu_items[Math.floor(Math.random() * 11)]
    order = {
        "date_time" : order_times[i],
        "ord_id" : order_ids[i],
        "menu_item": item,
        "tone" : tone[Math.floor(Math.random() * tone.length)],
        "price" : price[menu_items.indexOf(item)],
        "bill_type": bill_type[Math.floor(Math.random() * 3)]
    }
    orders.push(order)
}


// for(let i =0; i < user_names.length; i++) {
//     cust = {

//     }
//     query_tbl.add("table", )
// }

// db("custonerInfo").add()

// router.post('/simulation/order', (req, res) => {
    
// })

