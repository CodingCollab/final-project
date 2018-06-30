// Last Update by Kevin Glasow on 06/30/2018

// *********************************************************************************
// apiRoutes.js - contains routes to retrieve data from and update the database
// *********************************************************************************

// DEPENDENCIES
// =============================================================

const express = require("express");
const router = express.Router();
const db = require("../models")

// CREATE ROUTES
// =============================================================

// Route for a user to complete a new post by accept input from the NewRequestForm component
router.post("/api/posts", (req, res) => {
    console.log(req.body)
    db.Post.create({
            userName: req.body.userName,
            requestName: req.body.requestName,
            requestContent: req.body.requestContent,
            requestPrice: req.body.requestPrice,
            requestDueDate: req.body.requestDueDate
        })
        .then(function (dbPost) {
            res.json(dbPost)
        });
});

// READ ROUTES
// =============================================================

// Route to get all postings from the db (should not be used often outside testing)
router.get("/api/posts", (req, res) => {
    db.Post.findAll({})
        .then(function (dbPost) {
            res.json(dbPost);
        });
});

// Route to get all postings belonging to a particular language
// TBD

// Route to get all postings by a specific user
// TBD

// Route to get one specific post by ID
// TBD

// UPDATE ROUTES
// =============================================================

// Route to select post by ID and submit an update
router.put("/api/job", (req, res) => {
    res.send(`changing ${req.body.was} to ${req.body.is}`)
})

// DELETE ROUTES
// =============================================================

// Route to select and delete a post by ID
router.delete("/api/job", (req, res) => {
    res.send(`${req.body} deleted`)
})

module.exports = router