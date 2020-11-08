const express = require('express');
const bodyParser = require('body-parser');
const customerInfo = require('../models/dbHelpers');


const router = express.Router();

router.get('/find', (req, res) => {
    customerInfo.find("customerInfo")
    .then(info => {
        res.status(200).json(info)
    })
    .catch(error => {
        res.status(500).json({message: "Find was not complete"})
    })
})

router.get('/findbyid/:id', (req, res) => {
    customerInfo.findById("customerInfo", req.params.id)
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

router.post('/create', (req, res) => {
    customerInfo.add("customerInfo", req.body)
    .then(info => {
        res.status(200).json(info)
    })
    .catch(error => {
        res.status(500).json({message : "Create was not completed"})
    })
})

router.delete('/delete/:id', (req, res) => {
    const { id } = req.params
    customerInfo.remove("customerInfo", id)
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

// Updates but there is a bug, tried async already!
router.patch('/update/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body
    customerInfo.update("customerInfo", id, changes)
        .then(info => {
            if(info) {
                res.status.json(info)
            } else {
                res.status(404).json({message : "Record is not found"})
            }
        })
        .catch(error => {
            res.status(500).json({message : "Update was not complete"})
    })
})


module.exports = router;