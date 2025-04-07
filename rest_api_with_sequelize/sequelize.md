Yes! In **Node.js**, you can use **Sequelize** as an ORM (Object-Relational Mapping) for **MySQL**, similar to **Eloquent in Laravel**.  

---

### **✅ Best ORM for MySQL in Node.js (Similar to Laravel Eloquent)**
1. **[Sequelize](https://sequelize.org/)** (Most Popular) – SQL-based ORM (similar to Laravel Eloquent)  
2. **[Prisma](https://www.prisma.io/)** – Modern ORM with TypeScript support  
3. **[TypeORM](https://typeorm.io/)** – Best for TypeScript projects  

For a Laravel-like experience, **Sequelize** is the best choice.

---

### **🎯 1. Install Sequelize with MySQL**
Run the following command in your Node.js project:

```sh
npm install sequelize mysql2
```

---

### **📌 2. Setup Sequelize Connection**
Create a new file `database.js`:

```javascript
const { Sequelize } = require("sequelize");

// MySQL Connection
const sequelize = new Sequelize("your_db_name", "your_db_user", "your_db_password", {
  host: "localhost",
  dialect: "mysql",
  logging: false, // Disable logging
});

// Test Connection
sequelize
  .authenticate()
  .then(() => console.log("✅ Database connected..."))
  .catch((err) => console.error("❌ Error: " + err.message));

module.exports = sequelize;
```

---

### **📌 3. Create a Model (Like Laravel's Eloquent)**
Create a file `models/Product.js`:

```javascript
const { DataTypes } = require("sequelize");
const sequelize = require("../database");

const Product = sequelize.define(
  "Product",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "products",
    timestamps: true, // Adds createdAt & updatedAt like Laravel
  }
);

module.exports = Product;
```

---

### **📌 4. Run Migrations (Create Table)**
In `server.js` or a separate migration file, sync Sequelize:

```javascript
const sequelize = require("./database");
const Product = require("./models/Product");

// Sync DB (Equivalent to Laravel Migrations)
sequelize
  .sync({ force: false }) // Use { force: true } to drop and recreate tables
  .then(() => console.log("✅ Database & tables created!"))
  .catch((err) => console.error("❌ Error:", err));
```

---

### **📌 5. Create Express.js CRUD Routes**
Create a file `routes/productRoutes.js`:

```javascript
const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// ✅ Create Product (POST)
router.post("/", async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = await Product.create({ name, price, description });
    res.status(201).json({ status: "success", data: product });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// ✅ Get All Products (GET)
router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json({ status: "success", data: products });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// ✅ Get Single Product (GET)
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ status: "error", message: "Product not found" });
    res.json({ status: "success", data: product });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// ✅ Update Product (PUT)
router.put("/:id", async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ status: "error", message: "Product not found" });

    await product.update({ name, price, description });
    res.json({ status: "success", message: "Product updated", data: product });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

// ✅ Delete Product (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ status: "error", message: "Product not found" });

    await product.destroy();
    res.json({ status: "success", message: "Product deleted" });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = router;
```

---

### **📌 6. Setup Express.js and Use Routes**
In `server.js`:

```javascript
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const productRoutes = require("./routes/productRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/products", productRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
```

---

### **📌 7. Start the Server**
Run:

```sh
node server.js
```

✅ Your CRUD API with Sequelize and MySQL is now running at:  
**http://localhost:3000/products**

---

### **🛠 Example API Requests**
#### **📌 Create a Product (POST)**
```sh
curl -X POST "http://localhost:3000/products" \
     -H "Content-Type: application/json" \
     -d '{"name":"Laptop","price":1000,"description":"A powerful laptop"}'
```

#### **📌 Get All Products (GET)**
```sh
curl -X GET "http://localhost:3000/products"
```

#### **📌 Get a Single Product (GET)**
```sh
curl -X GET "http://localhost:3000/products/1"
```

#### **📌 Update a Product (PUT)**
```sh
curl -X PUT "http://localhost:3000/products/1" \
     -H "Content-Type: application/json" \
     -d '{"name":"Updated Laptop","price":1200,"description":"Updated description"}'
```

#### **📌 Delete a Product (DELETE)**
```sh
curl -X DELETE "http://localhost:3000/products/1"
```

---

### **🎯 Why Use Sequelize?**
✅ **Laravel-like ORM** (Define models like Eloquent)  
✅ **Easy Querying** (`Product.findAll()` instead of raw SQL)  
✅ **Built-in Validation & Hooks**  
✅ **Supports Transactions & Relationships**  
✅ **Compatible with MySQL, PostgreSQL, SQLite, and MSSQL**  

---

### **📌 Summary**
🔹 **Install Sequelize & MySQL driver** (`mysql2`)  
🔹 **Setup Database Connection** (`database.js`)  
🔹 **Create a Model (`Product.js`)**  
🔹 **Create CRUD Routes (`productRoutes.js`)**  
🔹 **Run Server (`server.js`) & Test API**  

This setup gives you an **Eloquent-like experience in Node.js**. 🚀  
Would you like me to add authentication or relationships (e.g., categories)? 😊