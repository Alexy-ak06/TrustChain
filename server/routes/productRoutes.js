
import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
} from "../controllers/productController.js";

import protectAdmin from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", getProducts);


router.get("/:id", getProductById);

router.post("/", protectAdmin, createProduct);

export default router;

