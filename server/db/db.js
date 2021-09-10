const Sequelize = require("sequelize");
require("dotenv").config();

// const db = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres',
//     protocol: 'postgres',
//     port: process.env.PORT,
//     host: process.env.DATABASE_HOST,
//     logging: true,
// })

// module.exports = db;

// const db = new Sequelize(process.env.DATABASE_URL, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {
//     dialect: 'postgres',
//     host: process.env.DATABASE_HOST
// })

const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    host: process.env.DATABASE_HOST,
    logging: console.log()
})

module.exports = db;
