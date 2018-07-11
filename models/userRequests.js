// Likely removing this table completely as it is now likely redundant

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

        // Removing to limit overlapping duplication
        // user_name: {
            // type: Sequelize.STRING
        // },
        request_id: {
            type: Sequelize.CHAR(36),
            defaultValue: Sequelize.UUIDV4
        }
    });
    return UserRequests;

    // Commented out while trying to get correct sequilize recognition of associations
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