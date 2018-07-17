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
    console.log(req.body);
    
    var tempDBPost = req.body;
    console.log(tempDBPost);
    var uName = tempDBPost.userName;
    console.log("uName: ", uName);
    var reqName = tempDBPost.requestName;
    console.log("reqName: ", reqName);
    var reqContent = tempDBPost.requestContent;
    console.log("reqContent: ", reqContent);
    var reqPrice = tempDBPost.requestPrice;
    console.log("reqPrice: ", reqPrice);
    var reqDueDate = tempDBPost.requestDueDate;
    console.log("reqDueDate: ", reqDueDate);
    var reqLang = tempDBPost.requestLang;
    console.log("reqLang: ", reqLang);
    var uID = "", reqID = "", lID = "";
    
    console.log("uID: ", uID);
    console.log("reqID: ", reqID);
    console.log("lID: ", lID);

    db.Requests.create({
        userName: tempDBPost.userName,
        requestName: tempDBPost.requestName,
        requestContent: tempDBPost.requestContent,
        requestPrice: tempDBPost.requestPrice,
        requestDueDate: tempDBPost.requestDueDate,
        requestOpen: 1
    })
    .then(function (dbPost2) {
        reqID = dbPost2.requestID;
        console.log("reqID: ", reqID);
    })
    .then(function () {
        db.Users.findOne({
            where: {
                userName: uName
            }
        })
        .then(users => {
            console.log(users.userID);
            uID = users.userID;
            console.log("uID within the then statement: ", uID);
        })
        .then(function () {
            db.Requests.findOne({
                where: {
                    requestName: reqName
                }
            })
            .then(requests => {
                console.log(requests.requestID);
                reqID = requests.requestID;
                console.log("reqID within the then statement: ", reqID);
            })
            .then(function () {
                db.RequestedBy.create({
                    requestedByUser_userID: uID,
                    requestedID: reqID
                })
                .then(function (dbPost3) {
                    res.json(dbPost3);
                })
            })
            .then(function () {
                db.Languages.findOne({
                    where: {
                        langName: reqLang
                    }
                })
                .then(languages => {
                    console.log(languages.langID);
                    lID = languages.langID;
                    console.log("langID within the then statement: ", lID);
                })
                .then(function () {
                    db.RequestLanguages.create({
                        req_id: reqID,
                        lang_id: lID
                    })
                    .then(function (dbPost4) {
                        res.json(dbPost4);
                    })
                })
            })
        })
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
router.get("/api/userget/user" /*/:user*/, /*function*/ (req, res) => {
    // console//.debug(req.body);
    // .log("user get req.body: ", String.toString(req.body));
    var uID = "";
    // console.log("uID before userget: ", uID);
    // var tempDBPost = req.body;
    // console.log(/*"tempDBPost before userget: ",*/ tempDBPost);
    // var uName = tempDBPost.userName;
    // console.log("uName before userget: ", uName);
    var tempDBPost = req.body;
    console.log(tempDBPost);
    var uName = tempDBPost.userName;
    console.log("uName before userget: ", uName);
    console.log("uID before userget: ", uID);
    // db.Users.findOne({
    //     where: {
    //         // userName: req.params.userName
    //         userName: uName
    //     }
    // })
    // .then(users => {
    //     uID = users.userID;
    //     console.log("uID from userget: ", uID);
    // })
    // db.Users.findOne({
    //     where: {
    //         userName: uName
    //     }
    // })
    // .then(users => {
    //     console.log(users.userID);
    //     uID = users.userID;
    //     console.log("uID from userget: ", uID);
    // })
    db.Users.findAll({
        where: {
            userID: uName
        }
    })
    .then(function (users) {
        uID = users.userID;
        console.log(res.json(users));
        console.log("uID in Users finadAll: ", uID);
    })
    // .then(function () {
    //     db.RequestedBy.findAll({
    //         where: {
    //             requestedByUser_userID: uID
    //         }
    //     })
    //     .then(requestedby => {
    //         reqID = requestedby.requestedID
    //     })
    //     .then(function () {
    //         db.Requests.findAll({
    //             where: {
    //                 requestID: reqID
    //             }
    //         })
    //         .then(requests => {
    //             reqName = requests.requestName,
    //             reqContent = requests.requestContent,
    //             reqOpen = requests.requestOpen,
    //             reqCompleted = requests.requestCompleted,
    //             reqPrice = requests.requestPrice,
    //             reqDueDate = requests.requestDueDate,
    //             reqCompletedDate = requests.requestCompletedDate,
    //             reqCreatedAt = requests.createdAt,
    //             reqUpdatedAt = requests.updatedAt
    //         })
    //         .then(reqInfo => {
    //             console.log(res.json(reqInfo));
    //         })
    //     })
    // })
    // db.findAll({
        // where: {
            // Users.user: 
            // user: req.params.userName // userID
        // }
    // })
        // .then(function (dbPost) {
            // res.json(dbPost);
        // });
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

// Route to get one specific post by Request Name
router.get("/api/posts/:requestName", function (req, res) {
    db.Post.findOne({
        where: {
            requestName: req.params.requestName
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