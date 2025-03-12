const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to SQLite database
const db = new sqlite3.Database("./products.db", (err) => {
  if (err) {
    console.error("Error opening database:", err.message);
  } else {
    console.log("Connected to SQLite database.");
    db.run(
      `CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT
      )`
    );
  }
});

// CRUD Operations

// Create a Product
app.post("/products", (req, res) => {
  const { name, price, description } = req.body;
  db.run(
    "INSERT INTO products (name, price, description) VALUES (?, ?, ?)",
    [name, price, description],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).json({ id: this.lastID, name, price, description });
      }
    }
  );
});

// Read All Products
app.get("/products", (req, res) => {
  db.all("SELECT * FROM products", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Read Single Product
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM products WHERE id = ?", [id], (err, row) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (!row) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json(row);
    }
  });
});

// Update a Product
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  db.run(
    "UPDATE products SET name = ?, price = ?, description = ? WHERE id = ?",
    [name, price, description, id],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (this.changes === 0) {
        res.status(404).json({ error: "Product not found" });
      } else {
        res.json({ id, name, price, description });
      }
    }
  );
});

// Delete a Product
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM products WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else if (this.changes === 0) {
      res.status(404).json({ error: "Product not found" });
    } else {
      res.json({ message: "Product deleted successfully" });
    }
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
