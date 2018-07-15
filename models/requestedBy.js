'use strict'

const User = require("./users");
const Request = require("./requests");

module.exports = (sequelize, Sequelize) => {
    const RequestedBy = sequelize.define("RequestedBy", {
        requestedByID: {
            // type: Sequelize.CHAR(36),
            type: Sequelize.INTEGER,
            allowNull: false,
            primaryKey: true,
            unique: true,
            autoIncrement: true
        },
        // id: {
        //     type: Sequelize.INTEGER,
        //     allowNull: false,
        //     primaryKey: true,
        //     autoIncrement: true
        // },
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