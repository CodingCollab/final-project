// import { Module } from "module";
'use strict'
const User = require("./users");

module.exports = (sequelize, Sequelize /*DataTypes*/) => {
    const Request = sequelize.define("Requests", {
        requestID: {
            type: Sequelize.STRING,
            // type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            defaultValue: Sequelize /*DataTypes*/.UUIDV4,
            primaryKey: true
        },
        requestName: {
            type: Sequelize.STRING,
            // type: DataTypes.STRING,
            allowNull: false
        },
        requestContent: {
            type: Sequelize.TEXT,
            // type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        requestCreated: {
            type: Sequelize.DATE,
            // type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize /*DataTypes*/.NOW
        },
        requestUpdated: {
            type: Sequelize.DATE,
            // type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize /*DataTypes*/.NOW
        },
        requestOpen: {
            type: Sequelize.BOOLEAN,
            // type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        requestCompleted: {
            type: Sequelize.BOOLEAN,
            // type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0
        },
        requestPrice: {
            type: Sequelize.DECIMAL(10,2),
            // type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            defaultValue: 20.00
        },
        requestDueDate: {
            type: Sequelize.DATE,
            // type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize /*DataTypes*/.NOW
        },
        requestCompletedDate: {
            type: Sequelize.DATE,
            // type: DataTypes.DATE,
            allowNull: true
        },
        requestedByUser_userID: {
            type: Sequelize /*DataTypes*/./*UUIDV4*/CHAR(36),
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            references: {
                model: User,
                key: /*"id"*/ "userID"
            }
        },
        requestedByUser_userName: {
            type: Sequelize /*DataTypes*/.STRING,
            allowNull: false,
            references: {
                model: User,
                key: /*"id"*/ "userName"
            }
        },
        requestAcceptedBy_userID: {
            type: Sequelize /*DataTypes*/./*UUIDV4*/CHAR(36),
            allowNull: true,
            defaultValue: Sequelize.UUIDV4,
            references: {
                model: User,
                key: /*"id"*/ "userID"
            }
        },
        requestAcceptedBy_userName: {
            type: Sequelize /*DataTypes*/.STRING,
            allowNull: true,
            references: {
                model: User,
                key: /*"id"*/ "userName"
            }
        }
    });

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

    return Request;
};

// export default Requests;
// module.exports = Requests;