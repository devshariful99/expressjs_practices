const sequelize = require("./database");
const Product = require("./models/Product");

// Sync DB (Equivalent to Laravel Migrations)
sequelize
  .sync({ force: false }) // Use { force: true } to drop and recreate tables
  .then(() => console.log("✅ Database & tables created!"))
  .catch((err) => console.error("❌ Error:", err));
