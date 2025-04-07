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
