'use strict'

const Requests = require("./requests");
const RequestLanguages = require("./requestLanguages");

module.exports = (sequelize, Sequelize) => {
    const Languages = sequelize.define("Languages", {
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

    // Languages.belongsToMany(Requests, { /*as: lang_id,*/ through: RequestLanguages, foreignKey: 'langID' });

    return Languages;
};