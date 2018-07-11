'use strict'

const User = require("./users");
const Request = require("./requests");

module.exports = (sequelize, Sequelize) => {
    const AcceptedBy = sequelize.define("AcceptedBy", {
        acceptedByID: {
            type: Sequelize.CHAR(36),
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        acceptedByUser_userID: {
            type: Sequelize.CHAR(36),
            allowNull: false
        },
        accepted_requestID: {
            type: Sequelize.CHAR(36),
            allowNull: false
        }
    });

    return AcceptedBy;
};