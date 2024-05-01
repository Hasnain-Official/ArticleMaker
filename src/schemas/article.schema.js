const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/sequelize.config');
const User = require('./user.schema');

const Article = sequelize.define('articles', {
    id : {
        type : DataTypes.UUID,
        primaryKey : true,
        defaultValue : DataTypes.UUIDV4,
        comment : 'Unique Id for each user'
    },
    title : {
        type : DataTypes.STRING
    },
    context: {
        type : DataTypes.STRING
    },
    publishedDate : {
        type : DataTypes.DATE
    },
    userId : {
        type : DataTypes.UUID,
        validate : {
            isUUID : 4,
        }
    },
}, {
    timestamps : true,
    createdAt : 'createdAt',
    updatedAt : 'updatedAt',
});

Article.belongsTo(User, {
    as : 'user',
    foreignKey : 'userId',
    targetKey : 'id'
});

module.exports = Article;