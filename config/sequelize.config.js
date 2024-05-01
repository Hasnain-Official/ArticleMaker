require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DBNAME,
    process.env.DBUSERNAME,
    process.env.DBPASSWORD, {
        host: process.env.DB_HOST,
        dialect: 'postgres',
        logging: false,
    }, {
        pool : {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
)

const connectDb = async function(app) {
    try {
        await sequelize.authenticate();
        app.emit('ready');
        console.log("Connection has been established successfully;")
    } catch(err) {
        console.log("Unable to connect to the database : ",  err);
        throw(err);
    }
}

module.exports = {
    sequelize, 
    connectDb
}