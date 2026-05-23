
import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
} from "../controllers/productController.js";

import protectAdmin from "../middleware/authMiddleware.js";

const router = express.Router();

/* =========================================
   PRODUCT ROUTES
========================================= */

// Get all products
router.get("/", getProducts);

// Verify product by ID
router.get("/:id", getProductById);

// Create new blockchain product
router.post("/", protectAdmin, createProduct);

export default router;

