const Sequelize = require("sequelize");
require("dotenv").config();

const db = new Sequelize(process.env.DATABASE_URL, process.env.DATABASE_USER, {
    dialect: 'postgres'
})

module.exports = db;
