'use strict'
const RequestLanguages = require("./requestLanguages");
const Languages = require("./languages");
module.exports = (sequelize, Sequelize) => {
    const Request = sequelize.define("Requests", {
        id: {
            type: Sequelize.INTEGER,
            unique: true,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
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

    // Commented out while trying to get correct sequilize recognition of associations
    // Request.associate = function(models) {
    //     Request.belongsTo(models.User, {
    //         foreignKey: {
    //             allowNull: false
    //         }
    //     });
    // };

    // Request.belongsToMany(User, {
    //     through: {
    //         model: User,
    //         unique: true,
    //     },
    //     foreignKey: "userID"
    // });

    // Requests.hasMany(Languages, { /*as: req_id,*/ through: RequestLanguages, foreignKey: 'requestID' });

    return Request;
};