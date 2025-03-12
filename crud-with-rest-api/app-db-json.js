const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const dbFilePath = path.join(__dirname, "db.json");

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Helper function to read data from database.json
const readDataFromFile = () => {
  try {
    const data = fs.readFileSync(dbFilePath);
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading from file:", err.message);
    return { products: [] };
  }
};

// Helper function to write data to database.json
const writeDataToFile = (data) => {
  try {
    fs.writeFileSync(dbFilePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing to file:", err.message);
  }
};

// CRUD Operations

// Create a Product
app.post("/products", (req, res) => {
  const { name, price, description } = req.body;
  const data = readDataFromFile();
  const newProduct = {
    id: data.products.length + 1,
    name,
    price,
    description,
  };
  data.products.push(newProduct);
  writeDataToFile(data);

  res.status(201).json(newProduct);
});

// Read All Products
app.get("/products", (req, res) => {
  const data = readDataFromFile();
  res.json(data.products);
});

// Read Single Product
app.get("/products/:id", (req, res) => {
  const { id } = req.params;
  const data = readDataFromFile();
  const product = data.products.find((p) => p.id === parseInt(id));
  
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ error: "Product not found" });
  }
});

// Update a Product
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  const data = readDataFromFile();
  const productIndex = data.products.findIndex((p) => p.id === parseInt(id));

  if (productIndex === -1) {
    res.status(404).json({ error: "Product not found" });
  } else {
    const updatedProduct = {
      id: parseInt(id),
      name,
      price,
      description,
    };
    data.products[productIndex] = updatedProduct;
    writeDataToFile(data);

    res.json(updatedProduct);
  }
});

// Delete a Product
app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  const data = readDataFromFile();
  const productIndex = data.products.findIndex((p) => p.id === parseInt(id));

  if (productIndex === -1) {
    res.status(404).json({ error: "Product not found" });
  } else {
    data.products.splice(productIndex, 1);
    writeDataToFile(data);
    res.json({ message: "Product deleted successfully" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
