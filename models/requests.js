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
        }
    });
    request.associate(models => {
        request.belongsToMany(models.users)
    });

    return Request;
};
