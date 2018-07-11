'use strict'

const Requests = require("./requests");

module.exports = (sequelize, Sequelize) => {
    const Language = sequelize.define("Language", {
        langID: {
            type: Sequelize.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            unique: true
        },
        langName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        }
    });

    return Language;
};