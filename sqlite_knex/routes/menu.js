const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const query_tbl = require('../models/dbHelpers');

router.get('/find', (req, res) => {
    query_tbl.find("menu")
    .then(info => {
        res.status(200).json(info)
    })
    .catch(error => {
        res.status(500).json({message: "Find was not complete"})
    })
})

router.get('/findbyid/:id', (req, res) => {
    query_tbl.findOrderById("menu", req.params.id)
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
    query_tbl.add("menu", req.body)
    .then(info => {
        res.status(200).json(info)
    })
    .catch(error => {
        res.status(500).json({message : "Create was not completed"})
    })
})

router.delete('/delete/:id', (req, res) => {
    const { id } = req.params
    query_tbl.remove("menu", id)
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
    query_tbl.update("menu", id, changes)
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