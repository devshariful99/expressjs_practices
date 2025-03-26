require("dotenv").config();
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Create MySQL Connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
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

db.query(
  `CREATE TABLE IF NOT EXISTS customers (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    address TEXT
  )`,
  (err) => {
    if (err) {
      console.error("Error creating customers table:", err.message);
    } else {
      console.log("Customers table is ready.");
    }
  }
);

db.query(
  `CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    total_price DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'completed', 'canceled') DEFAULT 'pending',
    FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE
  )`,
  (err) => {
    if (err) {
      console.error("Error creating orders table:", err.message);
    } else {
      console.log("Orders table is ready.");
    }
  }
);


db.query(
  `CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price DECIMAL(10,2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
  )`,
  (err) => {
    if (err) {
      console.error("Error creating order_items table:", err.message);
    } else {
      console.log("Order Items table is ready.");
    }
  }
);

db.query(
  `CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT
  )`,
  (err) => {
    if (err) {
      console.error("Error creating categories table:", err.message);
    } else {
      console.log("Categories table is ready.");
    }
  }
);

db.query(
  `ALTER TABLE products ADD COLUMN category_id INT,
   ADD FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL`,
  (err) => {
    if (err) {
      console.error("Error adding category_id to products table:", err.message);
    } else {
      console.log("Category relation added to products table.");
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
