const Requests = sequelize.define("Request", {
    requestID: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
        defaultValue: UUIDv4
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
    requestCreated: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
    },
    requestUpdated: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW
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
    },
    requestedByUser_userID: {
        type: Sequelize.UUIDv4,
        allowNull: false,
        references: {
            model: User,
            key: userID
        }
    },
    requestedByUser_userName: {
        type: Sequelize.String,
        allowNull: false,
        references: {
            model: User,
            key: userName
        }
    },
    requestAcceptedBy_userID: {
        type: Sequelize.UUIDv4,
        allowNull: true,
        references: {
            model: User,
            key: userID
        }
    },
    requestAcceptedBy_userName: {
        type: Sequelize.STRING,
        allowNull: true,
        references: {
            model: User,
            key: userName
        }
    }
});

export default Requests;