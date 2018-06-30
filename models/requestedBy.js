'use strict'

const User = require("./users");
const Request = require("./requests");

module.exports = (sequelize, Sequelize) => {
    const RequestedBy = sequelize.define("RequestedBy", {
        requestedByID: {
            type: Sequelize.CHAR(36),
            allowNull: false,
            primaryKey: true,
            unique: true
        },
        requestedByUser_userID: {
            type: Sequelize.CHAR(36),
            allowNull: false
        },
        requestedID: {
            type: Sequelize.CHAR(36),
            allowNull: false
        }
    });

    return RequestedBy;
};