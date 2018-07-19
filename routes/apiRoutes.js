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

router.get("/api/userget/", function (req, res) {
    // db.Users.findAll({ include: [/*{ model:*/ 'Request' /*}*/, /*{ model:*/ 'RequestedBy' /*}*/] }).then(users => {
    // console.log("req.body.searchType: ", JSON.stringify(req.body.searchType));
    // console.log("req.body.searchTerm: ", JSON.stringify(req.body.userName)); //.searchTerm));
    // console.log("req.body: ", JSON.stringify(req.body));
    var tempDBPost, tempDBPost2, uID = "", reqArray = [], reqArray2 = [], uName, tempReqObj = {
        userName: "",
        requestName: "",
        // requestLanguage: "",
        requestContent: "",
        requestOpen: 0,
        requestCompleted: 0,
        requestPrice: 0,
        requestDueDate: Date,
        requestCompletedDate: Date
    };
    // tempDBPost = req.body;
    var tempDBPost3 = req.query;
    // tempDBPost2 = JSON.stringify(req.body);
    // console.log("tempDBPost: ", tempDBPost);
    // console.log("tempDBPost2: ", tempDBPost2);
    console.log("tempDBPost3: ", tempDBPost3);
    console.log("tempDBPost.userName: ", tempDBPost3.userName);
    // console.log("tempDBPost2.userName: ", tempDBPost2.)
    uID = tempDBPost3.userName;
    uName = tempDBPost3.userName;
    console.log("uID before finds: ", uID);
    // console.log("tempDBPost.searchType: ", tempDBPost.searchType);
    // console.log("tempDBPost.searchTerm: ", tempDBPost.searchTerm);
    //     db.Users.findAll({ include: [{ all: true /*, nested: true*/ }],  where: { /*userName: req.query.searchTerm*/ userName: tempDBPost3.userName } }).then(users => {
    //         // uID = users.userID; 
    //         // uID = tempDBPost3.userName;       
    //         console.log("JSON.stringify(users): ", JSON.stringify(users))
    //     console.log("uID after setting value: ", uID);
    //     // console.log(res.json(users));
    // }).then(db.RequestedBy.findAll({ include: [{ all: true /*, nested: true*/ }], where: { requestedByUser_userID: /*db.Users.userID*/ uID } }).then(requestedby => { console.log(JSON.stringify(requestedby)); }))
    db.Users.findOne({
        // include: [{ all: true, nested: true }],
        where: {
            userName: tempDBPost3.userName
        }
    })
        .then(users => {
            uID = users.userID;
            console.log("uID after uID = users.userID: ", uID);
            // res.json(users);
            // json(users);
        }).then(function () {

            db.RequestedBy.findAndCountAll({ //.findAll({
                // all: true,
                include: [{ all: true, nested: true }],
                where: {
                    requestedByUser_userID: uID
                }
            })
                .then((requestedby, users) => {
                    // console.log(requestedby);
                    // console.log(users);
                    // res.json(requestedby);
                    // reqArray.forEach(function ())
                    // forEach
                    // reqArray.forEach(element => {
                    //     console.log("element: ", element);
                    //     reqArray[element] = requestedID[element];
                    // });
                    // reqArray.forEach(element => {
                    //     console.log("reqArray[" + element + "]: ", reqArray[element]);
                    // });
                    console.log("requestedby.count: ", requestedby.count);
                    // console.log("requestedby.rows: ", requestedby.rows);
                    var tempCount = parseInt(requestedby.count);
                    console.log("the value of tempCount: ", tempCount);
                    for (var x = 0; x < tempCount; x++) {
                        console.log("the value of x is: ", x);
                        console.log("requestedID at position x: ", requestedby.rows[x].requestedID);
                        reqArray.push(requestedby.rows[x].requestedID);
                        // reqArray.push(requestedby.rows.RequestedBy.dataValues.requestedID);
                    };
                    // requestedby.rows.forEach(x => {
                    //     console.log("the value of x is: ", x);
                    // });
                })
                .then(function () {
                    console.log("reqArray.length: ", reqArray.length);
                    for (var y = 0; y < reqArray.length; y++) {
                        db.Requests.findAll({
                            include: [{ all: true, nested: true }], // [ db.RequestedBy ,  db.Users ],
                            all: true,
                            where: {
                                requestID: reqArray[y]
                                // requestID: reqArray.values
                            }
                        })

                            .then(requests => {
                                for (var z = 0; z < reqArray.length; z++) {
                                    console.log("requests: ", JSON.stringify(requests));//[y]));
                                    console.log("requests.count: ", requests.count);
                                    console.log("requests.rows: ", requests.rows);
                                    // reqArray2.push(requests);
                                    reqArray2.push(requests[z]);
                                    // var x;
                                    // reqArray2.forEach(x => {
                                    //     console.log(reqArray2[x]);
                                    // })
                                    console.log("JSON.stringify(reqArray2[" + z + "])", JSON.stringify(reqArray2[z])); //[x]));
                                    // res.json( reqArray2 ,  uName );
                                    // var tempReqObj = {};
                                    console.log("reqArray2.length: ", reqArray2.length);
                                    var tempReqName = "", tempReqContent = "", tempReqOpen = Boolean, tempReqCompleted = Boolean, tempReqPrice = Number, tempReqDueDate = Date, tempReqCompletedDate = Date, tempReqLang = "";
                                    tempReqName = reqArray2[z].requestName;
                                    console.log("tempReqName = reqArray2[" + z + "].requestName", tempReqName);
                                    tempReqContent = reqArray2[z].requestContent;
                                    console.log("tempReqContent = reqArray2[" + z + "].requestContent", tempReqContent);
                                    tempReqOpen = reqArray2[z].requestOpen;
                                    console.log("tempReqOpen = reqArray2[" + z + "].requestOpen", tempReqOpen);
                                    tempReqCompleted = reqArray2[z].requestCompleted;
                                    console.log("tempReqCompleted = reqArray2[" + z + "].requestCompleted", tempReqCompleted);
                                    tempReqPrice = reqArray2[z].requestPrice;
                                    console.log("tempReqPrice = reqArray2[" + z + "].requestPrice", tempReqPrice);
                                    tempReqDueDate = reqArray2[z].requestDueDate;
                                    console.log("tempReqDueDate = reqArray2[" + z + "].requestDueDate", tempReqDueDate);
                                    tempReqCompletedDate = reqArray2[z].requestCompletedDate;
                                    console.log("tempReqCompletedDate = reqArray2[" + z + "].requestCompletedDate", tempReqCompletedDate);
                                    // tempReqLang = reqArray2[z].reqeustLang;
                                    // console.log("tempReqName = reqArray2[" + z + "].requestName", tempReqName);
                                    tempReqObj = {
                                        userName: uName,
                                        requestName: tempReqName,
                                        requestContent: tempReqContent,
                                        requestOpen: tempReqOpen,
                                        requestCompleted: tempReqCompleted,
                                        requestPrice: tempReqPrice,
                                        requestDueDate: tempReqDueDate,
                                        requestCompletedDate: tempReqCompletedDate
                                    };
                                    // console.log("tempReqObj after setting value in foreach: ", tempReqObj.reqArray2.requests[z]);
                                    // res.json(reqArray2).append(uName);
                                    // res.json(tempReqObj);
                                    // });
                                    // // res.json( reqArray2 ,  uName );
                                    // var tempReqObj = {};
                                    // tempReqObj = {reqArray2, uName};
                                    // // res.json(reqArray2).append(uName);
                                    // res.json(tempReqObj);
                                    // console.log("tempReqObj JSON.stringify(tempReqObj: ", JSON.stringify(tempReqObj[z]));
                                    // res.flushHeaders;
                                    console.log("tempReqObj:       ", JSON.stringify(tempReqObj[z]));
                                    res.append(tempReqObj.userName[z]);
                                    res.append(tempReqObj.requestName[z]);
                                    res.append(tempReqObj.requestContent[z]);
                                    res.append(tempReqObj.requestOpen[z]);
                                    res.append(tempReqObj.requestCompleted[z]);
                                    res.append(tempReqObj.requestPrice[z]);
                                    res.append(tempReqObj.requestDueDate[z]);
                                    res.json(tempReqObj.requestCompletedDate[z]);
                                    // res.json(tempReqObj[z]);
                                }
                                // // res.json( reqArray2 ,  uName );
                                // var tempReqObj = {};
                                // tempReqObj = {reqArray2, uName};
                                // // res.json(reqArray2).append(uName);
                                // res.json(tempReqObj);
                                // console.log("tempReqObj JSON.stringify(tempReqObj: ", JSON.stringify(tempReqObj));
                                // res.flushHeaders;
                                // res.json(tempReqObj);
                            })
                        // res.json(tempReqObj);
                    }
                })
            // res.json(tempReqObj);
        })
    // res.json(tempReqObj);
});
// router.get("/api/userget/user" /*/:user*/, /*function*/ (req, res) => {
//     // console//.debug(req.body);
//     // .log("user get req.body: ", String.toString(req.body));
//     var uID = "";
//     // console.log("uID before userget: ", uID);
//     // var tempDBPost = req.body;
//     // console.log(/*"tempDBPost before userget: ",*/ tempDBPost);
//     // var uName = tempDBPost.userName;
//     // console.log("uName before userget: ", uName);
//     var tempDBPost = req.body;
//     console.log(tempDBPost);
//     var uName = tempDBPost.userName;
//     console.log("uName before userget: ", uName);
//     console.log("uID before userget: ", uID);
//     // db.Users.findOne({
//     //     where: {
//     //         // userName: req.params.userName
//     //         userName: uName
//     //     }
//     // })
//     // .then(users => {
//     //     uID = users.userID;
//     //     console.log("uID from userget: ", uID);
//     // })
//     // db.Users.findOne({
//     //     where: {
//     //         userName: uName
//     //     }
//     // })
//     // .then(users => {
//     //     console.log(users.userID);
//     //     uID = users.userID;
//     //     console.log("uID from userget: ", uID);
//     // })
//     db.Users.findAll({
//         where: {
//             userID: uName
//         }
//     })
//     .then(function (users) {
//         uID = users.userID;
//         console.log(res.json(users));
//         console.log("uID in Users finadAll: ", uID);
//     })
//     // .then(function () {
//     //     db.RequestedBy.findAll({
//     //         where: {
//     //             requestedByUser_userID: uID
//     //         }
//     //     })
//     //     .then(requestedby => {
//     //         reqID = requestedby.requestedID
//     //     })
//     //     .then(function () {
//     //         db.Requests.findAll({
//     //             where: {
//     //                 requestID: reqID
//     //             }
//     //         })
//     //         .then(requests => {
//     //             reqName = requests.requestName,
//     //             reqContent = requests.requestContent,
//     //             reqOpen = requests.requestOpen,
//     //             reqCompleted = requests.requestCompleted,
//     //             reqPrice = requests.requestPrice,
//     //             reqDueDate = requests.requestDueDate,
//     //             reqCompletedDate = requests.requestCompletedDate,
//     //             reqCreatedAt = requests.createdAt,
//     //             reqUpdatedAt = requests.updatedAt
//     //         })
//     //         .then(reqInfo => {
//     //             console.log(res.json(reqInfo));
//     //         })
//     //     })
//     // })
//     // db.findAll({
//         // where: {
//             // Users.user: 
//             // user: req.params.userName // userID
//         // }
//     // })
//         // .then(function (dbPost) {
//             // res.json(dbPost);
//         // });
// });

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