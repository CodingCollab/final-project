// import { compareSync, hashSync, genSaltSync } from "bcrypt";
const bcrypt = require("bcrypt");
'use strict'
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {
        firstName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        lastName: {
            type: Sequelize.STRING,
            allowNull: false
        },
        userName: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        userID: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true
        },
        userPass: {
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        created: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        updated: {
            type: Sequelize.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }
    });

    User.prototype.validPassword = function (userPass) {
        return compareSync(userPass, this.userPass);
    };

    User.hook("beforeCreate", function (user) {
        user.userPass = hashSync(user.userPass, genSaltSync(10), null);
    });

    User.associate = function(models) {
        User.hasMany(models.Request, {
            onDelete: "cascade"
        });
    };

    return User;
};

// export default User;