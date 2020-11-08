const express = require('express');
const bodyParser = require('body-parser');
const query_tbl = require('../models/dbHelpers');
const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development)

const router = express.Router();

router.post('/user/:id/order_create', (req, res) => {
    const { id } = req.params
    const order = req.body
    let date_func = new Date()

    order["date_time"] = ("0" + date_func.getDate()).slice(-2) + ("0" + date_func.getDate()).slice(-2)  + date_func.getFullYear() + "; "  + date_func.getHours() + ":" + date_func.getMinutes();
    console.log(order.date_time)
    if(!order.customer_id) {
        order["customer_id"] = parseInt(id, 10)
    }
    query_tbl.findPrice(order.menu_item)
        .then(price => {
            if (price) {
                order["price"] = price["price"]
            } else {
                res.status(404).json({message: "Item is not on the menu"})
            }
            query_tbl.findById("customerInfo", id)
                .then(info => {
                    if(!info) {
                        res.status(404).json({message: "Invalid customer ID"})
                    }
                    if(!order.menu_item || !order.price) {
                        res.status(400).json({message : "Must provide menu item and price"})
                    } else {
                        query_tbl.addOrder(order, id)
                            .then(new_order => {
                                if(new_order) {
                                    res.status(200).json(new_order)
                                }
                            })
                            .catch(error => {
                                res.status(500).json({message : error})
                            })
                        }
                })
                .catch(error => {
                    res.status(500).json({message : "Error finding the valid ID"})
                })
        })
        .catch(error => {
            res.status(500).json({message : "Something is wrong"})
    })
})

router.get('/find/user/:id', (req, res) => {
    query_tbl.findCustomerOrders(req.params.id)
    .then(info => {
        res.status(200).json(info)
    })
    .catch(error => {
        res.status(500).json({message: "Find was not complete"})
    })
})

router.get('/find', (req, res) => {
    query_tbl.find("orders")
    .then(info => {
        res.status(200).json(info)
    })
    .catch(error => {
        res.status(500).json({message: "Find was not complete"})
    })
})

router.get('/findbyid/:id', (req, res) => {
    query_tbl.findOrderById(req.params.id)
    .then(info => {
        if(info){
            res.status(200).json(info)
        } else {
            res.status(404).json({message: "Record not found"})
        }
    })
    .catch(error => {
        res.status(500).json({message: "FindById was not compelete"})
    })
})


router.delete('/delete/:id', (req, res) => {
    const { id } = req.params
    query_tbl.remove(id)
    .then(info => {
        if(info > 0){
            res.status(200).json(info)
        } else {
            res.status(404).json(({message : "Record not found"}))
        }
    })
    .catch(error => {
        res.status(500).json({message : "Delete was not complete"})
    })
})

router.patch('/update/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body
    query_tbl.update(id, changes)
    .then((change) => {
        console.log(change)
        if(change){
            res.status.json(change)
        } else {
            res.status(404).json({message : "Record is not found"})
        }
    })
    .catch(error => {
        res.status(500).json({message : "Update was not complete"})
    })

})


module.exports = router;