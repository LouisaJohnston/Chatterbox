const Sequelize = require("sequelize");
require("dotenv").config();

const db = new Sequelize(process.env.DATABASE_URL, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
    dialect: 'postgres',
    host: process.env.DATABASE_HOST
})

module.exports = db;