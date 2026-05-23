
import dotenv from "dotenv";
import mongoose from "mongoose";

import Product from "./models/Product.js";
import { createBlockchainRecord } from "./services/Blockchainservice.js";

dotenv.config();

const rawProducts = [
  {
    productId: "TRUST12345",
    name: "iPhone 17 Pro",
    manufacturer: "Apple Inc.",
    category: "Electronics",
    status: "Authentic",
    blockchainVerified: true,
    currentLocation: "Mumbai Warehouse",
    lastUpdated: "17 May 2026",
    riskLevel: "Low Risk",
    batchNumber: "APL-IND-7781",
    timeline: [
      "Manufactured at Apple Facility, California",
      "Quality checked at Singapore Hub",
      "Shipped to Mumbai Distribution Center",
      "Stored at Mumbai Warehouse",
      "Ready for Retail Delivery",
    ],
  },

  {
    productId: "NIKE5544",
    name: "Nike Air Max Limited",
    manufacturer: "Unknown Supplier",
    category: "Footwear",
    status: "Counterfeit Suspected",
    blockchainVerified: false,
    currentLocation: "Unauthorized Retailer",
    lastUpdated: "18 May 2026",
    riskLevel: "High Risk",
    batchNumber: "NK-FAKE-5544",
    timeline: [
      "No verified manufacturing record found",
      "Suspicious warehouse entry detected",
      "Unauthorized supply chain movement",
      "Retail scan failed authenticity check",
    ],
  },

  {
    productId: "MEDI2026",
    name: "MediSafe Vaccine Pack",
    manufacturer: "MediCore Pharma",
    category: "Healthcare",
    status: "Authentic",
    blockchainVerified: true,
    currentLocation: "Bhubaneswar Medical Depot",
    lastUpdated: "19 May 2026",
    riskLevel: "Low Risk",
    batchNumber: "MED-VAC-2026",
    timeline: [
      "Manufactured at certified pharma facility",
      "Cold-chain verified during transport",
      "Quality approved by medical authority",
      "Arrived at Bhubaneswar Medical Depot",
      "Ready for hospital distribution",
    ],
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Product.deleteMany({});

    for (const rawProduct of rawProducts) {
      const blockchainProduct =
        await createBlockchainRecord(
          Product,
          rawProduct
        );

      await Product.create(blockchainProduct);
    }

    console.log(
      "TrustChain blockchain seeded successfully"
    );

    process.exit();
  } catch (error) {
    console.log("Seeding failed");
    console.log(error);

    process.exit(1);
  }
};

seedDatabase();

