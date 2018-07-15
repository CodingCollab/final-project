// Last Update by Kevin Glasow on 07/01/2018

// *********************************************************************************
// apiRoutes.js - contains routes to retrieve data from and update the database
// *********************************************************************************

// DEPENDENCIES
// =============================================================

const express = require("express");
const router = express.Router();
const db = require("../models");

// CREATE ROUTES
// =============================================================

// Route for a user to complete a new post by accept input from the NewRequestForm component
router.post("/api/reqpost", (req, res) => {
    console.log(req.body)

    let uName = req.body.userName, reqName = req.body.requestName, reqContent = req.body.requestContent, reqPrice = req.body.requestPrice, reqDueDate = req.body.requestDueDate, uID = "", reqID = "", tempDBPost = req.body;

    console.log("uName: ", uName);
    console.log("reqName: ", reqName);
    console.log("reqContent: ", reqContent);
    console.log("reqPrice: ", reqPrice);
    console.log("reqDueDate: ", reqDueDate);
    console.log("uID: ", uID);
    console.log("reqID: ", reqID);
    console.log("tempDBPost: \n", JSON.stringify(tempDBPost));
    db.Requests.create({
        userName: /*req.body.*/ tempDBPost.userName,
        requestName: /*req.body.*/ tempDBPost.requestName,
        requestContent: /*req.body.*/ tempDBPost.requestContent,
        requestPrice: /*req.body.*/ tempDBPost.requestPrice,
        requestDueDate: /*req.body.*/ tempDBPost.requestDueDate,
        requestOpen: 1
    })
        .then(function (dbPost2) {
            // res.json(dbPost2);
            reqID = dbPost2.requestID;
        });

    db.Users.findOne({
        where: {
            userName: uName
        }
    })
        // .then(function (dbPost) {
        //     uID = dbPost.userID;
        //     // tempDBPost = res.json(dbPost);
        //     res.json(dbPost);
        // });
        .then(users => {
            // console.log(res.json(users));
            console.log(users.userName);
            uID = users.userName;
            console.log("uID within the then statement: ", uID);
        })//;

        .then(function () {
            // console.log("after User findOne, uID: ", tempDBPost.uID);

            console.log("uID after leaving the findOne statement: ", uID);
            // db.RequedBies.create(tempDBPost, {
            //     requestedByUser_userID = tempDBPost.uID,
            //     requestedID = reqID
            // })
        }).then(function () {
            db.Requests.findOne({
                where: {
                    requestName: tempDBPost.requestName
                }
            });
        })
        .then(function () {
            reqID = requestID;
        }).then(function () {
            db.RequestedBy.create({
                requestedByUser_userID: uID,
                requestedID: reqID
            })
                .then(function (dbPost3) {
                    // console.log(res.json(dbPost3));
                    res.json(dbPost3);
                });
        });
});

// Route to create a new user
router.post("/api/userpost", (req, res) => {
    console.log(JSON.stringify(req.body));
    console.log("firstName:", req.body.firstName);
    db.Users.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        userPass: req.body.userPass,
        email: req.body.email
    })
        .then(function (dbPost) {
            res.json(dbPost);
        });
});

// Route to create a new language tag
router.post("/api/langpost", (req, res) => {
    console.log(JSON.stringify(req.body));
    console.log("langName: ", req.body.langName);
    db.Languages.create({
        langName: req.body.langName
    })
        .then(function (dbPost) {
            res.json(dbPost);
        });
});

// READ ROUTES
// =============================================================

// Route to get all postings from the db (should not be used often outside testing)
router.get("/api/posts", (req, res) => {
    // db.Post.findAll({}) commented out during merge
    db.Requests.findAll({})
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
router.delete("/api/posts/:requestID", function (req, res) {
    db.Post.destroy({
        where: {
            requestID: req.params.requestID
        }
    })
        .then(function (dbPost) {
            res.json(dbPost);
        });
});

module.exports = router;