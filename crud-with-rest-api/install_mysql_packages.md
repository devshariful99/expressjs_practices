To connect to a **MySQL database** and create a **CRUD REST API for products** using **Express.js**, follow these steps:

---

## 🚀 **Step 1: Install Required Packages**
Run the following command to install the necessary dependencies:

```sh
npm install express mysql2 cors body-parser dotenv
```

- `express`: Web framework for Node.js  
- `mysql2`: MySQL client for Node.js  
- `cors`: Allows cross-origin requests  
- `body-parser`: Parses incoming request bodies  
- `dotenv`: Loads environment variables  

---

## 📌 **Step 2: Create a `.env` File**
Create a `.env` file in your project root and configure your MySQL database credentials:

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=yourdatabase
PORT=3000
```

---

## 📝 **Step 3: Create `server.js`**
Now, create a `server.js` file and add the following code:

```javascript
require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.message);
  } else {
    console.log("Connected to MySQL database.");
  }
});

// Create Products Table (If Not Exists)
db.query(
  `CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    description TEXT
  )`,
  (err) => {
    if (err) {
      console.error("Error creating table:", err.message);
    } else {
      console.log("Products table is ready.");
    }
  }
);

// CRUD Operations

// 📌 Create a Product
app.post("/products", (req, res) => {
  const { name, price, description } = req.body;
  const sql = "INSERT INTO products (name, price, description) VALUES (?, ?, ?)";
  db.query(sql, [name, price, description], (err, result) => {
    if (err) {
      res.status(500).json({ status: "error", message: err.message });
    } else {
      res.status(201).json({ status: "success", message: "Product added", data: { id: result.insertId, name, price, description } });
    }
  });
});

// 📌 Read All Products
app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      res.status(500).json({ status: "error", message: err.message });
    } else {
      res.json({ status: "success", message: "Products retrieved", data: results });
    }
  });
});

// 📌 Read Single Product
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM products WHERE id = ?", [id], (err, result) => {
    if (err) {
      res.status(500).json({ status: "error", message: err.message });
    } else if (result.length === 0) {
      res.status(404).json({ status: "error", message: "Product not found" });
    } else {
      res.json({ status: "success", message: "Product retrieved", data: result[0] });
    }
  });
});

// 📌 Update a Product
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  const sql = "UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?";
  db.query(sql, [name, price, description, id], (err, result) => {
    if (err) {
      res.status(500).json({ status: "error", message: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ status: "error", message: "Product not found" });
    } else {
      res.json({ status: "success", message: "Product updated", data: { id, name, price, description } });
    }
  });
});

// 📌 Delete a Product
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
    if (err) {
      res.status(500).json({ status: "error", message: err.message });
    } else if (result.affectedRows === 0) {
      res.status(404).json({ status: "error", message: "Product not found" });
    } else {
      res.json({ status: "success", message: "Product deleted" });
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
```

---

## 🔥 **Step 4: Run the Server**
Start the server with:

```sh
node server.js
```
or if you are using **nodemon** (for auto-restart on changes):

```sh
npx nodemon server.js
```

---

## 📌 **Step 5: Test Your API**
You can use **Postman** or **cURL** to test the API.

### ✅ **Create a Product (POST)**
```sh
curl -X POST http://localhost:3000/products \
-H "Content-Type: application/json" \
-d '{"name": "Laptop", "price": 999.99, "description": "High-performance laptop"}'
```

### ✅ **Get All Products (GET)**
```sh
curl -X GET http://localhost:3000/products
```

### ✅ **Get a Single Product (GET)**
```sh
curl -X GET http://localhost:3000/products/1
```

### ✅ **Update a Product (PUT)**
```sh
curl -X PUT http://localhost:3000/products/1 \
-H "Content-Type: application/json" \
-d '{"name": "Updated Laptop", "price": 1099.99, "description": "Updated high-performance laptop"}'
```

### ✅ **Delete a Product (DELETE)**
```sh
curl -X DELETE http://localhost:3000/products/1
```

---

## 🎯 **Key Features in This Setup**
✔ **Uses `mysql2` for better performance**  
✔ **Environment variables for database configuration (`dotenv`)**  
✔ **CRUD API with proper error handling**  
✔ **Supports JSON request bodies (`body-parser`)**  
✔ **CORS enabled for frontend access (`cors`)**  

This is a **scalable and production-ready setup** for a MySQL database with Express.js.

Let me know if you need any modifications! 🚀