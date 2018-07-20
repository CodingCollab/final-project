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
    var uName = tempDBPost.userName;
    var reqName = tempDBPost.requestName;
    var reqContent = tempDBPost.requestContent;
    var reqPrice = tempDBPost.requestPrice;
    var reqDueDate = tempDBPost.requestDueDate;
    var reqLang = tempDBPost.requestLang;
    var uID = "", reqID = "", lID = "";

    // uses nested and chained database calls and then statements as workaround for sequelize associations not working correctly
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
        })
        .then(function () {
            db.Users.findOne({
                where: {
                    userName: uName
                }
            })
                .then(users => {
                    uID = users.userID;
                })
                .then(function () {
                    db.Requests.findOne({
                        where: {
                            requestName: reqName
                        }
                    })
                        .then(requests => {
                            reqID = requests.requestID;
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
                                    lID = languages.langID;
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
                    // for (var y = 0; y < reqArray.length; y++) {
                    db.Requests.findAll({
                        include: [{ all: true, nested: true }], // [ db.RequestedBy ,  db.Users ],
                        all: true,
                        // where: {
                        //     requestID: reqArray[y]
                        //     // requestID: reqArray.values
                        // }
                    })

                        .then(requests => {
                            // console.log("current value of y: ", y);
                            // for (var z = 0; z < reqArray.length; z++) {
                            console.log("JSON.stringify(requests) outside for loop: ", JSON.stringify(requests));//[y]));
                            // for (var y = 0; y < requests.length; y++) {
                                console.log("requests.length: ", requests.length);
                                var tempRequestsFoundIndexes = [{}];
                                // requests..foreach(x => {
                                for (var x = 0; x < requests.length; x++) {
                                    console.log("requests[" + x + "]: ", requests[x]);
                                    if (reqArray.includes(requests[x].requestID)) {
                                    // tempRequestsFoundIndexes.push(requests[x].findIndex(reqArray[x]));
                                    tempRequestsFoundIndexes.push(requests[x]);
                                    }
                                    var t;
                                    if (tempRequestsFoundIndexes.length > 0) {
                                        t = tempRequestsFoundIndexes.length
                                    }
                                    console.log("tempRequestsFoundIndexes[" + t + "]: ", tempRequestsFoundIndexes[t]);
                                }
                                console.log("current value of y", y);
                                console.log("JSON.stringify(requests) within for loop: ", JSON.stringify(requests));//[y]));
                                console.log("requests.count: ", requests.count); //.count);
                                console.log("requests.rows: ", requests.rows);
                                // reqArray2.push(requests);
                                reqArray2.push(requests[y]);
                                // var x;
                                // reqArray2.forEach(x => {
                                //     console.log(reqArray2[x]);
                                // })
                                console.log("JSON.stringify(reqArray2[" + y + "])", JSON.stringify(reqArray2[y])); //[x]));
                                // res.json( reqArray2 ,  uName );
                                // var tempReqObj = {};
                                console.log("reqArray2.length: ", reqArray2.length);
                                var tempReqName = "", tempReqContent = "", tempReqOpen = Boolean, tempReqCompleted = Boolean, tempReqPrice = Number, tempReqDueDate = Date, tempReqCompletedDate = Date, tempReqLang = "";
                                tempReqName = reqArray2[y].requestName;
                                console.log("tempReqName = reqArray2[" + y + "].requestName", tempReqName);
                                tempReqContent = reqArray2[y].requestContent;
                                console.log("tempReqContent = reqArray2[" + y + "].requestContent", tempReqContent);
                                tempReqOpen = reqArray2[y].requestOpen;
                                console.log("tempReqOpen = reqArray2[" + y + "].requestOpen", tempReqOpen);
                                tempReqCompleted = reqArray2[y].requestCompleted;
                                console.log("tempReqCompleted = reqArray2[" + y + "].requestCompleted", tempReqCompleted);
                                tempReqPrice = reqArray2[y].requestPrice;
                                console.log("tempReqPrice = reqArray2[" + y + "].requestPrice", tempReqPrice);
                                tempReqDueDate = reqArray2[y].requestDueDate;
                                console.log("tempReqDueDate = reqArray2[" + y + "].requestDueDate", tempReqDueDate);
                                tempReqCompletedDate = reqArray2[y].requestCompletedDate;
                                console.log("tempReqCompletedDate = reqArray2[" + y + "].requestCompletedDate", tempReqCompletedDate);
                                // tempReqLang = reqArray2[z].reqeustLang;
                                // console.log("tempReqName = reqArray2[" + z + "].requestName", tempReqName);
                                tempReqObj[y] = [{
                                    userName: uName,
                                    requestName: tempReqName,
                                    requestContent: tempReqContent,
                                    requestOpen: tempReqOpen,
                                    requestCompleted: tempReqCompleted,
                                    requestPrice: tempReqPrice,
                                    requestDueDate: tempReqDueDate,
                                    requestCompletedDate: tempReqCompletedDate
                                }];
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
                                console.log("tempReqObj:       ", JSON.stringify(tempReqObj));
                                res.append(tempReqObj.userName[y]), //;
                                    res.append(tempReqObj.requestName[y]), //;
                                    res.append(tempReqObj.requestContent[y]), //;
                                    res.append(tempReqObj.requestOpen[y]), //;
                                    res.append(tempReqObj.requestCompleted[y]), //;
                                    res.append(tempReqObj.requestPrice[y]), //;
                                    res.append(tempReqObj.requestDueDate[y]), //;
                                    res.json(tempReqObj.requestCompletedDate[y]);
                            })
                        
                })
            
        })
    })
// });
// res.json(tempReqObj[z]);
// }
// // res.json( reqArray2 ,  uName );
// var tempReqObj = {};
// tempReqObj = {reqArray2, uName};
// // res.json(reqArray2).append(uName);
// res.json(tempReqObj);
// console.log("tempReqObj JSON.stringify(tempReqObj: ", JSON.stringify(tempReqObj));
// res.flushHeaders;
// res.json(tempReqObj);
// })
// res.json(tempReqObj);
// }
// })
// res.json(tempReqObj);
// })
// res.json(tempReqObj);
// }) //;
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
            console.log(dbPost);
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
