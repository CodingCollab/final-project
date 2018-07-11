// import { Module } from "module";
'use strict'
const User = require("./users");
const UserRequest = require("./userRequests");

module.exports = (sequelize, Sequelize) => {
    const Request = sequelize.define("Requests", {
        requestID: {
            type: Sequelize.CHAR(36),
            unique: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        requestName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        requestContent: {
            type: Sequelize.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        requestOpen: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        requestCompleted: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        requestPrice: {
            type: Sequelize.DECIMAL(10,2),
            allowNull: false,
            defaultValue: 20.00
        },
        requestDueDate: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        requestCompletedDate: {
            type: Sequelize.DATE,
            allowNull: true
        // },

        // Reconfiguring to limit overlapping duplication
        // requestedByUser_userID: {
            // type: Sequelize.CHAR(36),
            // allowNull: false,
            // defaultValue: Sequelize.UUIDV4 //,
            // // references: {
            // //     model: User,
            // //     // key: /*"id"*/ "userID"
            // //     key: "userID"
            // // }
        // },
        // requestedByUser_userName: {
            // type: Sequelize.STRING,
            // allowNull: false //,
            // // references: {
            // //     model: User,
            // //     key: /*"id"*/ "userName"
            // // }
        // },
        // requestAcceptedBy_userID: {
            // type: Sequelize.CHAR(36),
            // allowNull: true,
            // defaultValue: Sequelize.UUIDV4 //,
            // // references: {
            // //     model: User,
            // //     key: /*"id"*/ "userID"
            // // }
        // },
        // requestAcceptedBy_userName: {
            // type: Sequelize.STRING,
            // allowNull: true //,
            // // references: {
            // //     model: User,
            // //     key: /*"id"*/ "userName"
            // // }
        }
    });

    // Commented out while trying to get correct sequilize recognition of associations
    // Request.associate = function(models) {
    //     Request.belongsTo(models.User, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    // Request.belongsToMany(User, {
    //     through: {
    //         model: User,
    //         unique: true,
    //     },
    //     foreignKey: "userID"
    // });

    return Request;
};
