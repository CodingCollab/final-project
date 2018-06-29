'use strict'

const User = require("./users");
const Request = require("./requests");

module.exports = (sequelize, Sequelize) => {
    const UserRequests = sequelize.define("UserRequests", {
        // started: Sequelize.BOOLEAN
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: Sequelize.CHAR(36),
            defaultValue: Sequelize.UUIDV4
        },
        user_name: {
            type: Sequelize.STRING
        },
        request_id: {
            type: Sequelize.CHAR(36),
            defaultValue: Sequelize.UUIDV4
        }
    });
    return UserRequests;

    // User.belongsToMany(Request, {
    //     through: {
    //         model: /*Request*/ UserRequests,
    //         unique: false
    //     },
    //     foreignKey: "request_ID"
    // });

    // Request.belongsToMany(User, {
    //     through: {
    //         model: /*User*/ UserRequests,
    //         unique: false,
    //     },
    //     foreignKey: "user_ID"
    // });

    // return UserRequests;
};