'use strict'

const Request = require("./requests");
const Language = require("./languages");

module.exports = (sequelize, Sequelize) => {
    const RequestLanguages = sequelize.define("RequestLanguages", {
        request_lang_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        req_id: {
            type: Sequelize.CHAR(36),
            allowNull: true,
            defaultValue: null
        },
        lang_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
            defaultValue: null
        }
    });

    return RequestLanguages;
};