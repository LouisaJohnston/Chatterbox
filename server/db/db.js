const Sequelize = require("sequelize");
require("dotenv").config();

const db = new Sequelize(process.env.DATABASE_URL, process.env.DATABASE_USER, null, {
    dialect: 'postgres'
})

module.exports = db;
