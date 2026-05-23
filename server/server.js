
import dotenv from "dotenv";
dotenv.config();

import aiRoutes from "./routes/aiRoutes.js";
import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import connectDB from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

import {
  notFound,
  errorHandler,
} from "./middleware/errorMiddleware.js";

connectDB();

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.set("io", io);

app.use(cors());
app.use(express.json());

const liveEvents = [
  {
    type: "AI_SCAN",
    message: "AI counterfeit engine completed product anomaly scan",
  },
  {
    type: "NEW_BLOCK",
    message: "New blockchain validator node synchronized",
  },
  {
    type: "FRAUD_ALERT",
    message: "Suspicious supply-chain route deviation detected",
  },
  {
    type: "CONSENSUS",
    message: "Global ledger consensus verified across active nodes",
  },
  {
    type: "QR_SCAN",
    message: "QR fingerprint matched with blockchain registry",
  },
  {
    type: "MINING",
    message: "Product verification block mined successfully",
  },
];

io.on("connection", (socket) => {
  console.log("Client connected to TrustChain live network");

  socket.emit("live-event", {
    type: "SYSTEM_CONNECTED",
    message: "Connected to TrustChain real-time intelligence network",
    timestamp: new Date().toISOString(),
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected from TrustChain live network");
  });
});

setInterval(() => {
  const event =
    liveEvents[Math.floor(Math.random() * liveEvents.length)];

  io.emit("live-event", {
    ...event,
    timestamp: new Date().toISOString(),
  });
}, 5000);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "TrustChain Backend Running Successfully",
  });
});

app.use("/api/products", productRoutes);
app.use("/api/product", productRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ai", aiRoutes);


app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

