const express = require('express');
const bodyParser = require('body-parser');
const query_tbl = require('../models/dbHelpers');

const router = express.Router();

router.post('/user/:user_id/order/:ord_id/feedback_create', (req, res) => {
    const user_id  = req.params.user_id
    const ord_id = req.params.ord_id
    const feedback = req.body

    if(!feedback.customer_id) {
        feedback["customer_id"] = parseInt(user_id, 10)
    }
    if(!feedback.order_id) {
        feedback["order_id"] = parseInt(ord_id, 10)
    }
    
    query_tbl.findById("customerInfo", user_id)
        .then(info => {
            if(!info) {
                res.status(404).json({message: "Invalid customer ID"})
            }
            if(!feedback.feedback) {
                res.status(400).json({message : "Must provide menu item and bill type"})
            } else {
                query_tbl.addFeedback(feedback, user_id, ord_id)
                    .then(new_feedback => {
                        console.log(new_feedback)
                        if(new_feedback) {
                            res.status(200).json(new_feedback)
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

router.get('/find', (req, res) => {
    query_tbl.find("feedback")
    .then(info => {
        res.status(200).json(info)
    })
    .catch(error => {
        res.status(500).json({message: "Find was not complete"})
    })
})

router.get('/findbyid/:id', (req, res) => {
    query_tbl.findById("feedback", req.params.id)
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
    query_tbl.remove("feedback", id)
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
    query_tbl.update("feedback", id, changes)
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