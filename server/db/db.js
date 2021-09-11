const Sequelize = require("sequelize");

if (process.env.DATABASE_URL) {
    const db = new Sequelize(process.env.DATABASE_URL)
    module.exports = db;
} else {
    const db = new Sequelize("messenger", process.env.LOCAL_USERNAME, process.env.LOCAL_PASSWORD, {
        host: "127.0.0.1",
        dialect: "postgres"
    })
    
    module.exports = db;
}
