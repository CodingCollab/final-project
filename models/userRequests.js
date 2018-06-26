module.exports = (sequelize, Sequelize) => {
    const UserRequests = sequelize.define("UserRequests", {
        started: Sequelize.BOOLEAN
    });
    return UserRequests;

    Request.belongsToMany(User, {
        through: {
            model: User,
            unique: true,
        },
        foreignKey: "userID"
    });

    User.belongsToMany(Request, {
        through: {
            model: Request,
            unique: false
        },
        foreignKey: "requestID"
    });


};