// Last Update by Kevin Glasow on 07/01/2018

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

// Route to get all postings belonging to a particular language and sort by due date
// TODO - CONFIRM WITH LAWRENCE THAT SEARCHING FOR lang_id WILL RETURN RESULTS WITH THAT LANGUAGE
// TODO - CREATE SORT BY DUE DATE FEATURE
router.get("/api/posts/language/:language", function (req, res) {
    db.Post.findAll({
            where: {
                language: req.params.lang_id
            }
        })
        .then(function (dbPost) {
            res.json(dbPost);
        });
});

// Route to get all postings by a specific user and sort by due date
// TODO - CREATE SORT BY DUE DATE FEATURE
router.get("/api/posts/user/:user", function (req, res) {
    db.Post.findAll({
            where: {
                user: req.params.userID
            }
        })
        .then(function (dbPost) {
            res.json(dbPost);
        });
});

// Route to get one specific post by ID
router.get("/api/posts/:requestID", function (req, res) {
    db.Post.findOne({
            where: {
                requestID: req.params.requestID
            }
        })
        .then(function (dbPost) {
            res.json(dbPost);
        });
});

// UPDATE ROUTES
// =============================================================

// Route to select post by ID and submit an update
router.put("/api/posts", function (req, res) {
    db.Post.update(req.body, {
            where: {
                requestID: req.body.requestID
            }
        })
        .then(function (dbPost) {
            res.json(dbPost);
        });
});


// DELETE ROUTES
// =============================================================

// Route to select and delete a post by requestID
router.delete("/api/posts/:requestID", function(req, res) {
    db.Post.destroy({
      where: {
        requestID: req.params.requestID
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

module.exports = router