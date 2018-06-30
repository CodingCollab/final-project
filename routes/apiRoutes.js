const express = require ("express");
const router = express.Router();
const db = require("../models")

// create
router.post("/api/posts", (req, res) => {
    console.log(req.body)
    db.Post.create({
        userName: req.body.userName,
        requestName: req.body.requestName,
        requestContent: req.body.requestContent,
        requestPrice: req.body.requestPrice,
        requestDueDate: req.body.requestDueDate
    })
        .then(function(dbPost){
            res.json(dbPost)
        });
});

// read
router.get("/api/job", (req, res) => {
    res.send("Hello")
});

// update
router.put("/api/job", (req, res) => {
    res.send(`changing ${req.body.was} to ${req.body.is}`)
})

// delete
router.delete("/api/job", (req, res) => {
    res.send(`${req.body} deleted`)
})

module.exports = router