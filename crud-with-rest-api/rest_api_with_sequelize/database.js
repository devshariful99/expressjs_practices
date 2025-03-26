require("dotenv").config();
const { Sequelize } = require("sequelize");

// MySQL Connection
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  logging: false, // Disable logging
});

// Test Connection
sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected..."))
  .catch((err) => console.error("❌ Error: " + err.message));

module.exports = sequelize;