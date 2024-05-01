const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelize.config');

const User = sequelize.define('users', {
    id : {
        type : DataTypes.UUID,
        primaryKey : true,
        defaultValue : DataTypes.UUIDV4,
        comment : 'Unique Id for each user'
    },
    firstName : {
        type : DataTypes.STRING,
    },
    lastName : {
        type : DataTypes.STRING,
    },
    email : {
        type : DataTypes.STRING,
        validate : {
            isEmail : true,
        }
    },
    password : {
        type : DataTypes.STRING,
    },
    age : {
        type : DataTypes.INTEGER,
        defaultValue : 1
    }
}, {
    timestamps : true,
    createdAt : 'createdAt',
    updatedAt : 'updatedAt',
});

module.exports = User;