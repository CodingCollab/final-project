'use strict'

const Requests = require("./requests");
const Languages = require("./languages");

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

    // Requests.hasMany(Languages, { /*as: req_id,*/ through: RequestLanguages, foreignKey: 'requestID' });
    // Languages.belongsToMany(Requests, { /*as: lang_id,*/ through: RequestLanguages, foreignKey: 'langID' });

    // Requests.addLanguages(Languages, { through: lang_id });

    return RequestLanguages;
};