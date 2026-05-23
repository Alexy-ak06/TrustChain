import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    manufacturer: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
    },
    blockchainVerified: {
      type: Boolean,
      required: true,
    },
    currentLocation: {
      type: String,
      required: true,
      trim: true,
    },
    lastUpdated: {
      type: String,
      required: true,
      trim: true,
    },
    riskLevel: {
      type: String,
      required: true,
      trim: true,
    },
    batchNumber: {
      type: String,
      required: true,
      trim: true,
    },
    timeline: {
      type: [String],
      required: true,
    },
    blockHash: {
      type: String,
      required: true,
    },
    previousHash: {
      type: String,
      required: true,
      default: "GENESIS",
    },
    blockchainTimestamp: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;