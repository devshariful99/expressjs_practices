const express = require("express");
const db = require("../db"); // Import database connection

const router = express.Router();

// 📌 Create a Product
router.post("/", (req, res) => {
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
router.get("/", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      res.status(500).json({ status: "error", message: err.message });
    } else {
      res.json({ status: "success", message: "Products retrieved", data: results });
    }
  });
});

// 📌 Read Single Product
router.get("/:id", (req, res) => {
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
router.put("/:id", (req, res) => {
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
router.delete("/:id", (req, res) => {
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

module.exports = router;
