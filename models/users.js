'Use Strict'

const bcrypt = require("bcrypt");
// const Request = require("./requests");
// const UserRequests = require("./userRequests");
module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("Users", {
        id: {
            type: Sequelize.INTEGER,
            unique: true,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
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
            type: Sequelize.CHAR(36),
            unique: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4
        },
        userPass: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        }
    });

    Users.prototype.validPassword = function (userPass) {
        return bcrypt.compareSync(userPass, this.userPass);
    };

    Users.hook("beforeCreate", function (user) {
        user.userPass = bcrypt.hashSync(user.userPass, bcrypt.genSaltSync(10), null);
    });

    // users.associate(models => {
    //     users.belongsToMany(models.request, {foreignKey: "requestID"})
    // });

    return Users;
};
