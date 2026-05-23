
import Product from "../models/Product.js";
import asyncHandler from "../utils/asyncHandler.js";
import {
  createBlockchainRecord,
  verifyBlockchainRecord,
} from "../services/Blockchainservice.js";
import { analyzeProductRisk } from "../services/airiskservice.js";

const clean = (value) => String(value || "").trim().toUpperCase();

export const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ createdAt: -1 });
  res.json(products);
});

export const getProductById = asyncHandler(async (req, res) => {
  const productId = clean(req.params.id);

  const product = await Product.findOne({ productId });

  if (!product) {
    res.status(404);
    throw new Error("Product not found in blockchain registry");
  }

  const blockchainVerification = verifyBlockchainRecord(product);
  const aiRisk = analyzeProductRisk(
    product,
    blockchainVerification.hashValid
  );

  const io = req.app.get("io");

  if (io) {
    io.emit("live-event", {
      type:
        aiRisk.aiRiskLevel === "High Risk" ||
        aiRisk.aiRiskLevel === "Critical Risk"
          ? "FRAUD_ALERT"
          : "NEW_BLOCK",
      message:
        aiRisk.aiRiskLevel === "High Risk" ||
        aiRisk.aiRiskLevel === "Critical Risk"
          ? `High-risk product detected: ${product.productId}`
          : `Product verified on blockchain: ${product.productId}`,
      timestamp: new Date().toISOString(),
    });
  }

  res.json({
    success: true,
    product: {
      ...product.toObject(),
      ...blockchainVerification,
      aiRisk,
    },
  });
});

export const createProduct = asyncHandler(async (req, res) => {
  const productId = clean(req.body.productId);

  const existingProduct = await Product.findOne({ productId });

  if (existingProduct) {
    return res.status(400).json({
      success: false,
      message: "Product ID already exists",
    });
  }

  const baseProductData = {
    productId,
    name: String(req.body.name || "").trim(),
    manufacturer: String(req.body.manufacturer || "").trim(),
    category: String(req.body.category || "").trim(),
    status: String(req.body.status || "Authentic").trim(),
    blockchainVerified: req.body.status === "Authentic",
    currentLocation: String(req.body.currentLocation || "").trim(),
    lastUpdated: String(req.body.lastUpdated || "").trim(),
    riskLevel: String(req.body.riskLevel || "Low Risk").trim(),
    batchNumber: String(req.body.batchNumber || "").trim(),
    timeline: Array.isArray(req.body.timeline)
      ? req.body.timeline
          .map((step) => String(step || "").trim())
          .filter(Boolean)
      : [],
  };

  const productWithBlockchain =
    await createBlockchainRecord(Product, baseProductData);

  const product = await Product.create(productWithBlockchain);

  const io = req.app.get("io");

  if (io) {
    io.emit("live-event", {
      type: "NEW_BLOCK",
      message: `New product block registered: ${product.productId}`,
      timestamp: new Date().toISOString(),
    });
  }

  res.status(201).json({
    success: true,
    message: "Product registered successfully with blockchain hash",
    product,
  });
});

