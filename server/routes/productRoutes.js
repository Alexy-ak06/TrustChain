
import express from "express";

import {
  getProducts,
  getProductById,
  createProduct,
} from "../controllers/productcontroller.js";

import protectAdmin from "../middleware/authmiddleware.js";

const router = express.Router();


router.get("/", getProducts);


router.get("/:id", getProductById);

router.post("/", protectAdmin, createProduct);

export default router;

