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
