const Sequelize = require("sequelize");

const db = new Sequelize("messenger", "LouisaLathamJohnston", process.env.LOCAL_PASSWORD, {
  host: "127.0.0.1",
  dialect: "postgres"
})

module.exports = db;
