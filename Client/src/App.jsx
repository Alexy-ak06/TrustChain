




import ProductDNAPanel from "./components/ProductDNAPanel";
import GSAPReveal from "./components/GSAPReveal";
import ParticleTrails3D from "./components/ParticleTrails3D";
import GlobalNodeIntelligence from "./components/GlobalNodeIntelligence";
import HolographicGlobe3D from "./components/HolographicGlobe3D";
import AINeuralSphere3D from "./components/AINeuralSphere3D";
import BlockchainCore3D from "./components/BlockchainCore3D";
import ScanBeam from "./components/ScanBeam";
import EnergyPulse from "./components/EnergyPulse";
import TrustScoreMeter from "./components/TrustScoreMeter";
import HolographicTimeline from "./components/HolographicTimeline";
import SecurityScorePanel from "./components/SecurityScorePanel";
import BootLoader from "./components/BootLoader";
import MatrixRain from "./components/MatrixRain";
import ParticleBackground from "./components/ParticleBackground";

import AIVoiceAssistant, { speakTrustChain } from "./components/AIVoiceAssistant";
import AICommandTerminal from "./components/AICommandTerminal";


import ProductScannerConsole from "./components/ProductScannerConsole";
import NeuralBrain from "./components/NeuralBrain";
import CyberAttackSimulation from "./components/CyberAttackSimulation";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import QuantumVault from "./components/QuantumVault";
import GlobalCommandCenter from "./components/GlobalCommandCenter";
import NetworkVisualizer from "./components/NetworkVisualizer";
import { io } from "socket.io-client";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import { useEffect, useState } from "react";
import axios from "axios";
import { QRCodeCanvas } from "qrcode.react";
import { Scanner } from "@yudiel/react-qr-scanner";
import { motion } from "framer-motion";

const API = "https://trustchain-backend-9mrf.onrender.com/api";

const emptyForm = {
  productId: "",
  name: "",
  manufacturer: "",
  category: "",
  status: "Authentic",
  currentLocation: "",
  lastUpdated: "",
  riskLevel: "Low Risk",
  batchNumber: "",
  timeline: "",
};

const emptyLogin = {
  username: "",
  password: "",
};

function App() {
  const [productId, setProductId] = useState("");
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [showAdmin, setShowAdmin] = useState(false);
  const [showScanner, setShowScanner] = useState(false);

  const [form, setForm] = useState(emptyForm);
  const [adminMessage, setAdminMessage] = useState("");

  const [adminToken, setAdminToken] = useState(
    localStorage.getItem("trustchain_admin_token") || ""
  );
  const [adminUser, setAdminUser] = useState(
    localStorage.getItem("trustchain_admin_user") || ""
  );
  const [loginForm, setLoginForm] = useState(emptyLogin);
  const [authMode, setAuthMode] = useState("login");
const [liveEvents, setLiveEvents] = useState([]);

  const totalProducts = products.length;
  const authenticProducts = products.filter((p) => p.status === "Authentic").length;
  const counterfeitProducts = products.filter((p) => p.status !== "Authentic").length;
  const highRiskProducts = products.filter((p) => p.riskLevel === "High Risk").length;

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/products`);
      setProducts(res.data);
    } catch {
      console.log("Failed to load products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

useEffect(() => {
  const socket = io("https://trustchain-backend-9mrf.onrender.com");

  socket.on("live-event", (event) => {
    setLiveEvents((prev) => [event, ...prev].slice(0, 8));
  });

  return () => {
    socket.disconnect();
  };
}, []);


  const verifyProductById = async (id) => {
    try {
      setLoading(true);
      setError("");
      setProduct(null);

      const res = await axios.get(`${API}/product/${id}`);

      if (!res.data.success) {
        setError("Product not found in blockchain registry");
        return;
      }

      setProduct(res.data.product);
   



      if (res.data.product.riskLevel === "High Risk") {
  speakTrustChain("Warning. Supply chain trace failed cryptographic authentication check.");
} else {
  speakTrustChain("Supply chain trace successfully verified across five ledger layers.");

}
    } catch {
      setError("Backend server connection failed");
    } finally {
      setLoading(false);
    }
  };

  const handleTrackProduct = () => {
    if (!productId.trim()) {
      setError("Please enter a Product ID");
      setProduct(null);
      return;
    }

    verifyProductById(productId.trim().toUpperCase());
  };

  
const handleScanResult = async (result) => {
  

  if (!result || result.length === 0) return;

  const scannedText = result[0].rawValue;
  const scannedId = scannedText.split("/").pop().trim().toUpperCase();

  setProductId(scannedId);
  setShowScanner(false);
  verifyProductById(scannedId);
};

  const handleAdminAuth = async (e) => {
    e.preventDefault();
    setAdminMessage("");

    try {
      const endpoint = authMode === "login" ? "login" : "register";

      const res = await axios.post(`${API}/auth/${endpoint}`, loginForm);

      if (!res.data.success) {
        setAdminMessage(res.data.message || "Authentication failed");
        return;
      }

      if (authMode === "register") {
        setAdminMessage("Admin registered successfully. Now login.");
        setAuthMode("login");
        setLoginForm(emptyLogin);
        return;
      }

      localStorage.setItem("trustchain_admin_token", res.data.token);
      localStorage.setItem("trustchain_admin_user", res.data.username);

      setAdminToken(res.data.token);
      setAdminUser(res.data.username);
      setLoginForm(emptyLogin);
      setAdminMessage("Admin login successful");
    } catch (err) {
      setAdminMessage(err.response?.data?.message || "Authentication failed");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("trustchain_admin_token");
    localStorage.removeItem("trustchain_admin_user");
    setAdminToken("");
    setAdminUser("");
    setAdminMessage("Logged out successfully");
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setAdminMessage("");

    if (!adminToken) {
      setAdminMessage("Please login as admin first");
      return;
    }

    try {
      const payload = {
        ...form,
        productId: form.productId.toUpperCase(),
        blockchainVerified: form.status === "Authentic",
        timeline: form.timeline
          .split("\n")
          .map((step) => step.trim())
          .filter(Boolean),
      };

      const res = await axios.post(`${API}/products`, payload, {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (!res.data.success) {
        setAdminMessage(res.data.message || "Product registration failed");
        return;
      }

      setAdminMessage("Product registered successfully with blockchain hash");
      setForm(emptyForm);
      fetchProducts();
    } catch (err) {
      
      setAdminMessage(err.response?.data?.message || "Product registration failed");
    }
  };

  
   return (
  <>
  <BootLoader />
  <ParticleBackground />  
  <MatrixRain />
  <AIVoiceAssistant />


  <Navbar
      setShowScanner={setShowScanner}
      setShowAdmin={setShowAdmin}
      adminToken={adminToken}
      handleLogout={handleLogout}
    />

    <HeroSection />


<div className="relative z-10 min-h-screen overflow-x-hidden
          bg-gradient-to-br from-black/80 via-slate-950/80 to-blue-950/80 text-white">




<EnergyPulse />
     <section id="verify" className="relative px-6 py-20 text-center">
        <div className="absolute top-20 left-20 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>
        <div className="absolute bottom-10 right-20 w-72 h-72 bg-blue-500/20 blur-3xl rounded-full"></div>

        <p className="text-cyan-400 font-bold tracking-[0.3em] uppercase">
          Blockchain Anti-Counterfeit System
        </p>

        <h1 className="mt-6 text-5xl md:text-7xl font-black leading-tight">
          Verify Products With
          <span className="block text-cyan-400">Immutable Trust</span>
        </h1>

        <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300">
          Track product origin, supply chain journey, authenticity status, and
          counterfeit risk using blockchain-powered verification.
        </p>

        <div className="mt-14 max-w-5xl mx-auto bg-white/5 border border-white/10 rounded-[2rem] p-8 backdrop-blur-xl shadow-2xl">
          <div className="flex flex-col md:flex-row gap-4">
           
<input
  value={productId}
  onChange={(e) => setProductId(e.target.value)}
  onKeyDown={(e) => {
    if (e.key === "Enter") {
      handleTrackProduct();
    }
  }}
  placeholder="Try TRUST12345, NIKE5544, MEDI2026, or your added product"
  className="flex-1 px-6 py-4 rounded-2xl bg-black/50 border border-cyan-500/20 text-white text-lg outline-none focus:border-cyan-400"
/>



            <button
              onClick={handleTrackProduct}
              className="px-8 py-4 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold text-lg transition shadow-lg shadow-cyan-500/30"
            >
              Verify Product
            </button>
          </div>

          {showScanner && (
            <div className="mt-8 bg-black/40 border border-cyan-500/20 rounded-3xl p-6">
              <h2 className="text-3xl font-black text-cyan-400 mb-5">
                Live QR Scanner
              </h2>

              <div className="rounded-2xl overflow-hidden border border-cyan-400/30 bg-black">
                <Scanner
                  onScan={handleScanResult}
                  onError={() => setError("Camera scanner failed")}
                  constraints={{ facingMode: "environment" }}
                />
              </div>
            </div>
          )}

          {loading && (
            <p className="mt-6 text-cyan-300 text-lg">
              Fetching blockchain records...
            </p>
          )}

          {error && (
            <div className="mt-6 bg-red-500/20 border border-red-500/40 text-red-300 px-6 py-4 rounded-2xl font-semibold">
              {error}
            </div>
          )}

          {product && <ProductResult product={product} />}
        </div>

        {showAdmin && (
          <div className="mt-12 max-w-5xl mx-auto bg-black/40 border border-cyan-500/20 rounded-[2rem] p-8 backdrop-blur-xl text-left">
            {!adminToken ? (
              <form onSubmit={handleAdminAuth}>
                <h2 className="text-4xl font-black text-cyan-400 mb-6">
                  {authMode === "login" ? "Admin Login" : "Create Admin"}
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    required
                    value={loginForm.username}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, username: e.target.value })
                    }
                    placeholder="Admin Username"
                    className="px-5 py-4 rounded-2xl bg-black/50 border border-white/10 outline-none focus:border-cyan-400"
                  />

                  <input
                    required
                    type="password"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    placeholder="Admin Password"
                    className="px-5 py-4 rounded-2xl bg-black/50 border border-white/10 outline-none focus:border-cyan-400"
                  />
                </div>

                <button className="mt-5 px-8 py-4 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold shadow-lg shadow-cyan-500/30">
                  {authMode === "login" ? "Login" : "Register Admin"}
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setAuthMode(authMode === "login" ? "register" : "login")
                  }
                  className="ml-4 text-cyan-300 font-bold"
                >
                  {authMode === "login"
                    ? "Create first admin"
                    : "Back to login"}
                </button>

                {adminMessage && (
                  <p className="mt-4 text-cyan-300 font-bold">{adminMessage}</p>
                )}
              </form>
            ) : (
              <form onSubmit={handleAddProduct}>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-4xl font-black text-cyan-400">
                    Admin Product Registration
                  </h2>

                  <p className="text-green-300 font-bold">
                    Logged in as {adminUser}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    ["productId", "Product ID"],
                    ["name", "Product Name"],
                    ["manufacturer", "Manufacturer"],
                    ["category", "Category"],
                    ["currentLocation", "Current Location"],
                    ["lastUpdated", "Last Updated"],
                    ["batchNumber", "Batch Number"],
                  ].map(([key, label]) => (
                    <input
                      key={key}
                      required
                      value={form[key]}
                      onChange={(e) =>
                        setForm({ ...form, [key]: e.target.value })
                      }
                      placeholder={label}
                      className="px-5 py-4 rounded-2xl bg-black/50 border border-white/10 outline-none focus:border-cyan-400"
                    />
                  ))}

                  <select
                    value={form.status}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        status: e.target.value,
                        riskLevel:
                          e.target.value === "Authentic"
                            ? "Low Risk"
                            : "High Risk",
                      })
                    }
                    className="px-5 py-4 rounded-2xl bg-black/50 border border-white/10 outline-none focus:border-cyan-400"
                  >
                    <option>Authentic</option>
                    <option>Counterfeit Suspected</option>
                  </select>

                  <select
                    value={form.riskLevel}
                    onChange={(e) =>
                      setForm({ ...form, riskLevel: e.target.value })
                    }
                    className="px-5 py-4 rounded-2xl bg-black/50 border border-white/10 outline-none focus:border-cyan-400"
                  >
                    <option>Low Risk</option>
                    <option>Medium Risk</option>
                    <option>High Risk</option>
                  </select>
                </div>

                <textarea
                  required
                  value={form.timeline}
                  onChange={(e) =>
                    setForm({ ...form, timeline: e.target.value })
                  }
                  placeholder="Write each supply-chain step on a new line"
                  rows="6"
                  className="mt-4 w-full px-5 py-4 rounded-2xl bg-black/50 border border-white/10 outline-none focus:border-cyan-400"
                />

                <button className="mt-5 px-8 py-4 rounded-2xl bg-cyan-400 hover:bg-cyan-300 text-black font-extrabold shadow-lg shadow-cyan-500/30">
                  Register Product
                </button>

                {adminMessage && (
                  <p className="mt-4 text-cyan-300 font-bold">
                    {adminMessage}
                  </p>
                )}
              </form>
            )}
          </div>
        )}

        <Analytics
          totalProducts={totalProducts}
          authenticProducts={authenticProducts}
          counterfeitProducts={counterfeitProducts}
          highRiskProducts={highRiskProducts}
        />

<AIAnalyticsCharts products={products} />
<motion.div
  id="network"
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
>
  <BlockchainNetworkVisualizer />
  <NetworkVisualizer />
  <BlockchainCore3D />
 <ParticleTrails3D />
</motion.div>

<GSAPReveal>
  <LiveTransactionLogs liveEvents={liveEvents} />
</GSAPReveal>
<ProductScannerConsole />

<motion.div
  id="threats"
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
>
  <AIThreatRadar />
  <FraudHeatmap />
  <CyberAttackSimulation />
  <NeuralBrain />
  <AINeuralSphere3D />

</motion.div>

<GeoSupplyChainMap />

<HolographicGlobe3D />
<GlobalNodeIntelligence />
<AdminControlCenter
  products={products}
  adminUser={adminUser}
  adminToken={adminToken}
/>

<motion.div
  id="mining"
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
>
  <MiningSimulation />
</motion.div>

<motion.div
  id="command"
  initial={{ opacity: 0, y: 80 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  viewport={{ once: true }}
>
  <GlobalCommandCenter />
  <AICommandTerminal />
</motion.div>




        <div className="grid md:grid-cols-3 gap-8 mt-16 max-w-6xl mx-auto">
          {products.map((item) => (
            <Feature
              key={item._id}
              title={item.name}
              text={`${item.productId} • ${item.status} • ${item.riskLevel}`}
            />
          ))}
        </div>
        </section>
    </div>
  </>
  );
}

function ProductResult({ product }) {
  const isVerified = product?.blockchainVerified;
  const hashValid = product?.hashValid;

  return (
    <div className="mt-10 text-left">
    
<div
  className={`relative rounded-[2rem] p-8 border shadow-2xl overflow-hidden ${
    isVerified && hashValid
      ? "bg-green-500/5 border-green-500/30"
      : "bg-red-500/5 border-red-500/30"
  }`}
>
<ScanBeam />
  


        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h2 className="text-5xl font-black text-cyan-300">
              {product.name}
            </h2>

            <p className="mt-3 text-gray-400 text-lg">
              {product.category} • Batch {product.batchNumber}
            </p>
          </div>

          <div
            className={`px-6 py-3 rounded-full font-black tracking-wide ${
              isVerified && hashValid
                ? "bg-green-500/20 text-green-300 border border-green-400/30"
                : "bg-red-500/20 text-red-300 border border-red-400/30 animate-pulse"
            }`}
          >
            {isVerified && hashValid ? "BLOCKCHAIN VERIFIED" : "CHAIN ALERT"}
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-5 mt-10">
          <Stat title="Product ID" value={product.productId} />
          <Stat title="Manufacturer" value={product.manufacturer} />
          <Stat title="Location" value={product.currentLocation} />
          <Stat
            title="Risk Level"
            value={product.riskLevel}
            danger={product.riskLevel === "High Risk"}
          />
        </div>

        <BlockchainMonitor product={product} />
        <AIRiskPanel aiRisk={product.aiRisk} />
        <SecurityScorePanel product={product} />
        <TrustScoreMeter
  score={
    isVerified && hashValid
      ? 98
      : isVerified
      ? 72
      : 34
  }
/>
        
<HolographicTimeline
  timeline={product.timeline}
  verified={isVerified && hashValid}
/>

<BlockchainVisualizer product={product} />


<ProductDNAPanel
  product={product}
  verified={isVerified}
  hashValid={hashValid}
/>



<div className="grid lg:grid-cols-3 gap-6 mt-10">


          <div className="lg:col-span-2 bg-black/40 border border-white/10 rounded-3xl p-7">
            <h3 className="text-3xl font-extrabold text-cyan-400 mb-6">
              Supply Chain Timeline
            </h3>

            <div className="space-y-5">
              {product.timeline.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -40 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="flex gap-4 items-start"
                >
                  <div
                    className={`mt-2 w-5 h-5 rounded-full shadow-lg ${
                      isVerified && hashValid
                        ? "bg-cyan-400 shadow-cyan-400/50"
                        : "bg-red-400 shadow-red-400/50"
                    }`}
                  ></div>

                  <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4">
                    <p className="text-sm text-gray-400">Step {index + 1}</p>
                    <p className="text-lg font-semibold">{step}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <InfoCard
              title="Verification Status"
              value={product.status}
              danger={!isVerified}
            />

            <InfoCard
              title="Blockchain Record"
              value={
                isVerified && hashValid
                  ? "Valid immutable record found"
                  : "Record requires review"
              }
              danger={!isVerified || !hashValid}
            />

            <InfoCard title="Last Updated" value={product.lastUpdated} />

            <div className="bg-black/40 border border-white/10 rounded-3xl p-6 flex flex-col items-center">
              <h3 className="text-2xl font-extrabold text-cyan-400 mb-5">
                Verification QR
              </h3>

              <div className="bg-white p-4 rounded-2xl">
                <QRCodeCanvas
                  value={`http://localhost:5173/verify/${product.productId}`}
                  size={180}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H"
                  includeMargin={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

 
function BlockchainMonitor({ product }) {
  return (
    <div className="mt-10 bg-black/50 border border-cyan-400/20 rounded-3xl p-7">
      <h3 className="text-3xl font-extrabold text-cyan-400 mb-6">
        Blockchain Integrity Monitor
      </h3>

      <div className="grid lg:grid-cols-3 gap-5">
        <InfoCard
          title="Hash Integrity"
          value={product.hashValid ? "Valid Chain Hash" : "Hash Mismatch Detected"}
          danger={!product.hashValid}
        />

        <InfoCard
          title="Block Timestamp"
          value={product.blockchainTimestamp || "Unavailable"}
        />

        <InfoCard
          title="Previous Block"
          value={
            product.previousHash
              ? product.previousHash.slice(0, 18) + "..."
              : "GENESIS"
          }
        />
      </div>

      <div className="mt-6 bg-black/60 border border-white/10 rounded-2xl p-5">
        <p className="text-gray-400 text-sm mb-2">Current Block Hash</p>
        <p className="text-cyan-300 font-mono text-sm break-all">
          {product.blockHash || "Hash unavailable"}
        </p>
      </div>

      <div className="mt-4 bg-black/60 border border-white/10 rounded-2xl p-5">
        <p className="text-gray-400 text-sm mb-2">Recalculated Hash</p>
        <p
          className={`font-mono text-sm break-all ${
            product.hashValid ? "text-green-300" : "text-red-300"
          }`}
        >
          {product.recalculatedHash || "Hash unavailable"}
        </p>
      </div>
    </div>
  );
}
function AIRiskPanel({ aiRisk }) {
  if (!aiRisk) return null;

  const danger =
    aiRisk.aiRiskLevel === "Critical Risk" ||
    aiRisk.aiRiskLevel === "High Risk";

  return (
    <div className="mt-10 bg-black/50 border border-purple-400/20 rounded-3xl p-7">
      <h3 className="text-3xl font-extrabold text-purple-400 mb-6">
        AI Counterfeit Risk Engine
      </h3>

      <div className="grid md:grid-cols-2 gap-5">
        <InfoCard
          title="AI Risk Level"
          value={aiRisk.aiRiskLevel}
          danger={danger}
        />

        <InfoCard
          title="Risk Score"
          value={`${aiRisk.score}/100`}
          danger={danger}
        />
      </div>

      <div className="mt-6 bg-black/60 border border-white/10 rounded-2xl p-5">
        <p className="text-gray-400 text-sm mb-3">
          AI Detection Reasons
        </p>

        <div className="space-y-3">
          {aiRisk.reasons.length > 0 ? (
            aiRisk.reasons.map((reason, index) => (
              <p
                key={index}
                className="text-purple-300 font-semibold"
              >
                • {reason}
              </p>
            ))
          ) : (
            <p className="text-green-300 font-semibold">
              No suspicious signals detected
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function BlockchainVisualizer({ product }) {
  const blocks = [
    {
      title: "Genesis Block",
      hash: "GENESIS_BLOCK",
      color: "from-cyan-500 to-blue-600",
    },
    {
      title: "Previous Block",
      hash: product.previousHash?.slice(0, 35) || "GENESIS",
      color: "from-blue-500 to-indigo-600",
    },
    {
      title: "Product Block",
      hash: product.blockHash?.slice(0, 35) || "Unavailable",
      color: product.hashValid
        ? "from-green-500 to-emerald-600"
        : "from-red-500 to-pink-600",
    },
  ];

  return (
    <div className="mt-16">
      <h2 className="text-5xl font-black text-cyan-400 mb-10 text-center">
        Blockchain Network
      </h2>

      <div className="grid md:grid-cols-3 gap-8">
        {blocks.map((block, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.25 }}
            className={`relative overflow-hidden rounded-3xl bg-gradient-to-br ${block.color} p-[2px]`}
          >
            <div className="bg-black/90 rounded-3xl p-8 h-full">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-white">{block.title}</h3>
                <div className="w-5 h-5 rounded-full bg-cyan-400 animate-pulse"></div>
              </div>

              <div className="text-cyan-300 text-sm break-all font-mono">
                {block.hash}
              </div>

              <p className="text-gray-400 mt-6 text-sm">
                Immutable blockchain verification node
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function Analytics({
  totalProducts,
  authenticProducts,
  counterfeitProducts,
  highRiskProducts,
}) {
  return (
    <div className="mt-20 max-w-6xl mx-auto">
      <h2 className="text-5xl font-black text-cyan-400 mb-10 text-center">
        TrustChain Analytics
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        <AnalyticsCard title="Total Products" value={totalProducts} color="cyan" />
        <AnalyticsCard title="Authentic" value={authenticProducts} color="green" />
        <AnalyticsCard title="Counterfeit" value={counterfeitProducts} color="red" />
        <AnalyticsCard title="High Risk" value={highRiskProducts} color="yellow" />
      </div>
    </div>
  );
}

function Stat({ title, value, danger }) {
  return (
    <div className="bg-black/40 border border-white/10 rounded-2xl p-5">
      <p className="text-gray-400 text-sm">{title}</p>

      <h4
        className={`mt-2 text-xl font-extrabold ${
          danger ? "text-red-400" : "text-white"
        }`}
      >
        {value}
      </h4>
    </div>
  );
}

function InfoCard({ title, value, danger }) {
  return (
    <div className="bg-black/40 border border-white/10 rounded-3xl p-6">
      <p className="text-gray-400">{title}</p>

      <h4
        className={`mt-3 text-xl font-extrabold ${
          danger ? "text-red-400" : "text-cyan-300"
        }`}
      >
        {value}
      </h4>
    </div>
  );
}

function AnalyticsCard({ title, value, color }) {
  const colorMap = {
    cyan: "text-cyan-400 border-cyan-400/20",
    green: "text-green-400 border-green-400/20",
    red: "text-red-400 border-red-400/20",
    yellow: "text-yellow-400 border-yellow-400/20",
  };

  return (
    <div
      className={`bg-black/40 backdrop-blur-xl border rounded-3xl p-8 text-center shadow-xl ${colorMap[color]}`}
    >
      <p className="text-gray-400 text-lg">{title}</p>
      <h3 className="mt-4 text-5xl font-black">{value}</h3>
    </div>
  );
}

function AIAnalyticsCharts({ products }) {
  const riskData = [
    {
      name: "Authentic",
      value: products.filter((p) => p.status === "Authentic").length,
    },
    {
      name: "Counterfeit",
      value: products.filter((p) => p.status !== "Authentic").length,
    },
    {
      name: "High Risk",
      value: products.filter((p) => p.riskLevel === "High Risk").length,
    },
  ];

  const categoryMap = products.reduce((acc, product) => {
    acc[product.category] = (acc[product.category] || 0) + 1;
    return acc;
  }, {});

  const categoryData = Object.keys(categoryMap).map((category) => ({
    category,
    count: categoryMap[category],
  }));

  return (
    <div className="mt-16 max-w-6xl mx-auto">
      <h2 className="text-5xl font-black text-purple-400 mb-10 text-center">
        AI Analytics Dashboard
      </h2>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-black/40 border border-purple-400/20 rounded-3xl p-8">
          <h3 className="text-2xl font-black text-cyan-300 mb-6">
            Risk Distribution
          </h3>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={110}
                  label
                >
                  <Cell fill="#22d3ee" />
                  <Cell fill="#f87171" />
                  <Cell fill="#facc15" />
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-black/40 border border-purple-400/20 rounded-3xl p-8">
          <h3 className="text-2xl font-black text-cyan-300 mb-6">
            Category Intelligence
          </h3>

          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#22d3ee" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockchainNetworkVisualizer() {
  const nodes = [
    { x: "6%", y: "72%", size: "large", label: "Manufacturer" },
    { x: "12%", y: "38%", size: "small", label: "Node A" },
    { x: "20%", y: "18%", size: "medium", label: "Validator" },
    { x: "24%", y: "63%", size: "small", label: "Warehouse" },
    { x: "33%", y: "39%", size: "large", label: "Block 1" },
    { x: "42%", y: "17%", size: "small", label: "AI Check" },
    { x: "45%", y: "74%", size: "medium", label: "Route Sync" },
    { x: "54%", y: "48%", size: "large", label: "Block 2" },
    { x: "62%", y: "26%", size: "small", label: "Fraud Scan" },
    { x: "69%", y: "62%", size: "medium", label: "Retail Hub" },
    { x: "76%", y: "36%", size: "large", label: "Block 3" },
    { x: "83%", y: "14%", size: "small", label: "Validator" },
    { x: "88%", y: "54%", size: "medium", label: "QR Scan" },
    { x: "95%", y: "32%", size: "large", label: "Customer" },
  ];

  const connections = [
    [0, 1], [0, 3], [1, 2], [1, 4], [2, 4],
    [2, 5], [3, 4], [3, 6], [4, 5], [4, 6],
    [4, 7], [5, 7], [5, 8], [6, 7], [6, 9],
    [7, 8], [7, 9], [7, 10], [8, 10], [8, 11],
    [9, 10], [9, 12], [10, 11], [10, 12], [10, 13],
    [11, 13], [12, 13],
  ];

  const sizeMap = {
    small: "12px",
    medium: "18px",
    large: "26px",
  };

  return (
    <div className="mt-24 max-w-7xl mx-auto">
      <h2 className="text-6xl font-black text-center text-cyan-300 mb-4">
        Real-Time Blockchain Network
      </h2>

      <p className="text-center text-gray-400 text-lg mb-12">
        Live distributed ledger visualization with validator nodes, transaction flow, and AI fraud intelligence.
      </p>

      <div className="relative h-[650px] rounded-[48px] overflow-hidden border border-cyan-400/30 bg-gradient-to-br from-[#01040f] via-[#071a33] to-[#020617] shadow-[0_0_80px_rgba(34,211,238,0.18)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_45%)]"></div>

        <div className="absolute inset-0 opacity-20">
          {[...Array(240)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-cyan-200"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random(),
              }}
            />
          ))}
        </div>

        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="chainGlow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#67e8f9" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.15" />
            </linearGradient>
          </defs>

          {connections.map((connection, index) => {
            const start = nodes[connection[0]];
            const end = nodes[connection[1]];

            return (
              <motion.line
                key={index}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="url(#chainGlow)"
                strokeWidth="2"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.1 }}
                animate={{ pathLength: 1, opacity: [0.25, 0.8, 0.25] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.05,
                }}
              />
            );
          })}
        </svg>

        {nodes.map((node, index) => (
          <motion.div
            key={index}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: node.x, top: node.y }}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3 + (index % 4),
              repeat: Infinity,
              delay: index * 0.15,
            }}
          >
            <div
              className="rounded-full bg-cyan-300 shadow-[0_0_55px_#22d3ee] border border-white/60"
              style={{
                width: sizeMap[node.size],
                height: sizeMap[node.size],
              }}
            />

            <motion.div
              className="absolute inset-0 rounded-full border border-cyan-300"
              animate={{
                scale: [1, 2.8, 1],
                opacity: [0.7, 0, 0.7],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: index * 0.2,
              }}
            />

            {node.size === "large" && (
              <p className="absolute left-1/2 top-9 -translate-x-1/2 whitespace-nowrap text-xs font-bold text-cyan-200 tracking-widest">
                {node.label}
              </p>
            )}
          </motion.div>
        ))}

        {[
          {
            left: ["6%", "20%", "33%", "54%", "76%", "95%"],
            top: ["72%", "18%", "39%", "48%", "36%", "32%"],
            color: "bg-white shadow-[0_0_35px_white]",
            duration: 5,
          },
          {
            left: ["24%", "45%", "69%", "88%", "95%"],
            top: ["63%", "74%", "62%", "54%", "32%"],
            color: "bg-cyan-200 shadow-[0_0_30px_#67e8f9]",
            duration: 6.5,
          },
          {
            left: ["42%", "62%", "76%", "83%", "95%"],
            top: ["17%", "26%", "36%", "14%", "32%"],
            color: "bg-purple-300 shadow-[0_0_30px_#c084fc]",
            duration: 7,
          },
        ].map((packet, index) => (
          <motion.div
            key={index}
            className={`absolute w-4 h-4 rounded-full ${packet.color}`}
            animate={{
              left: packet.left,
              top: packet.top,
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: packet.duration,
              repeat: Infinity,
              ease: "linear",
              delay: index,
            }}
          />
        ))}

        <div className="absolute top-8 left-8 bg-black/40 border border-cyan-400/20 rounded-2xl px-5 py-4 backdrop-blur-xl">
          <p className="text-cyan-300 font-black tracking-widest">
            DISTRIBUTED LEDGER ACTIVE
          </p>
          <p className="text-gray-400 text-sm mt-1">14 nodes online • 27 links synced</p>
        </div>

        <div className="absolute bottom-8 right-8 bg-black/40 border border-green-400/20 rounded-2xl px-5 py-4 backdrop-blur-xl">
          <p className="text-green-300 font-black tracking-widest">
            LIVE CONSENSUS VERIFIED
          </p>
          <p className="text-gray-400 text-sm mt-1">Transaction packets flowing</p>
        </div>

        <div className="absolute bottom-8 left-8 bg-black/40 border border-purple-400/20 rounded-2xl px-5 py-4 backdrop-blur-xl">
          <p className="text-purple-300 font-black tracking-widest">
            AI FRAUD MONITORING
          </p>
          <p className="text-gray-400 text-sm mt-1">Anomaly scan active</p>
        </div>
      </div>
    </div>
  );
}

function LiveTransactionLogs({ liveEvents }) {
  const logs =
    liveEvents.length > 0
      ? liveEvents.map((event) => ({
          type: event.type,
          message: event.message,
          color:
            event.type === "FRAUD_ALERT"
              ? "text-red-300"
              : event.type === "NEW_BLOCK"
              ? "text-cyan-300"
              : event.type === "AI_SCAN"
              ? "text-purple-300"
              : event.type === "MINING"
              ? "text-yellow-300"
              : "text-green-300",
        }))
      : [
          {
            type: "BLOCK VERIFIED",
            message: "Product block hash matched ledger record",
            color: "text-green-300",
          },
        ];

  return (
    <div className="mt-20 max-w-7xl mx-auto">
      <h2 className="text-6xl font-black text-center text-cyan-300 mb-4">
        Live Transaction Logs
      </h2>

      <p className="text-center text-gray-400 text-lg mb-12">
        Real-time blockchain verification events and AI security signals.
      </p>

      <div className="relative overflow-hidden rounded-[40px] border border-cyan-400/30 bg-gradient-to-br from-[#01040f] via-[#071a33] to-[#020617] p-8 shadow-[0_0_80px_rgba(34,211,238,0.16)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.15),transparent_45%)]"></div>

        <div className="relative space-y-5">
          {logs.map((log, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className={`relative overflow-hidden flex items-center gap-5 rounded-3xl px-6 py-5 backdrop-blur-xl border transition-all duration-500 hover:scale-[1.03] ${
                log.type === "FRAUD_ALERT"
                  ? "bg-red-500/10 border-red-500/40 shadow-[0_0_45px_rgba(239,68,68,0.45)] animate-pulse"
                  : log.type === "NEW_BLOCK"
                  ? "bg-cyan-500/10 border-cyan-500/40 shadow-[0_0_45px_rgba(34,211,238,0.45)]"
                  : log.type === "AI_SCAN"
                  ? "bg-purple-500/10 border-purple-500/40 shadow-[0_0_45px_rgba(168,85,247,0.45)]"
                  : log.type === "MINING"
                  ? "bg-yellow-500/10 border-yellow-500/40 shadow-[0_0_45px_rgba(250,204,21,0.45)]"
                  : "bg-green-500/10 border-green-500/40 shadow-[0_0_45px_rgba(34,197,94,0.45)]"
              }`}
            >
              <motion.div
                className={`w-4 h-4 rounded-full ${
                  log.type === "FRAUD_ALERT"
                    ? "bg-red-400 shadow-[0_0_35px_#f87171]"
                    : log.type === "NEW_BLOCK"
                    ? "bg-cyan-300 shadow-[0_0_35px_#22d3ee]"
                    : log.type === "AI_SCAN"
                    ? "bg-purple-300 shadow-[0_0_35px_#c084fc]"
                    : log.type === "MINING"
                    ? "bg-yellow-300 shadow-[0_0_35px_#fde047]"
                    : "bg-green-400 shadow-[0_0_35px_#4ade80]"
                }`}
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />

              <div className="flex-1">
                <p className={`font-black tracking-widest ${log.color}`}>
                  {log.type}
                </p>

                <p className="text-gray-300 mt-1">
                  {log.message}
                </p>
              </div>

              <p className="text-xs text-gray-500 font-mono">
                {new Date().toLocaleTimeString()}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AIThreatRadar() {
  const threats = [
    { x: "30%", y: "35%", label: "Fake QR" },
    { x: "62%", y: "28%", label: "Route Drift" },
    { x: "72%", y: "64%", label: "High Risk" },
    { x: "42%", y: "70%", label: "Unknown Vendor" },
  ];

  return (
    <div className="mt-20 max-w-7xl mx-auto">
      <h2 className="text-6xl font-black text-center text-purple-300 mb-4">
        AI Threat Radar
      </h2>

      <p className="text-center text-gray-400 text-lg mb-12">
        Real-time anomaly scanning for counterfeit signals and supply-chain threats.
      </p>

      <div className="relative h-[620px] overflow-hidden rounded-[48px] border border-purple-400/30 bg-gradient-to-br from-[#050011] via-[#12002b] to-[#020617] shadow-[0_0_90px_rgba(192,132,252,0.18)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.22),transparent_45%)]"></div>

        <div className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-300/20"></div>
        <div className="absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-300/20"></div>
        <div className="absolute left-1/2 top-1/2 h-[190px] w-[190px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-purple-300/20"></div>

        <div className="absolute left-1/2 top-[13%] h-[74%] w-[1px] -translate-x-1/2 bg-purple-300/20"></div>
        <div className="absolute left-[13%] top-1/2 h-[1px] w-[74%] -translate-y-1/2 bg-purple-300/20"></div>

        <motion.div
          className="absolute left-1/2 top-1/2 h-[230px] w-[3px] origin-bottom rounded-full bg-gradient-to-t from-purple-400 to-transparent shadow-[0_0_30px_#c084fc]"
          style={{ transformOrigin: "bottom center" }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <motion.div
          className="absolute left-1/2 top-1/2 h-[460px] w-[460px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_0deg,rgba(192,132,252,0.32),transparent_35%,transparent_100%)]"
          animate={{ rotate: 360 }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {threats.map((threat, index) => (
          <motion.div
            key={index}
            className="absolute"
            style={{ left: threat.x, top: threat.y }}
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.75, 1, 0.75],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: index * 0.4,
            }}
          >
            <div className="relative">
              <div className="h-5 w-5 rounded-full bg-red-400 shadow-[0_0_30px_#f87171]"></div>

              <motion.div
                className="absolute inset-0 rounded-full border border-red-300"
                animate={{ scale: [1, 3, 1], opacity: [0.8, 0, 0.8] }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
              />

              <p className="absolute left-7 top-[-6px] whitespace-nowrap text-xs font-black tracking-widest text-red-300">
                {threat.label}
              </p>
            </div>
          </motion.div>
        ))}

        <div className="absolute top-8 left-8 rounded-2xl border border-purple-400/20 bg-black/40 px-5 py-4 backdrop-blur-xl">
          <p className="font-black tracking-widest text-purple-300">
            AI RADAR ACTIVE
          </p>
          <p className="mt-1 text-sm text-gray-400">4 anomalies tracked</p>
        </div>

        <div className="absolute bottom-8 right-8 rounded-2xl border border-red-400/20 bg-black/40 px-5 py-4 backdrop-blur-xl">
          <p className="font-black tracking-widest text-red-300">
            THREAT MONITORING
          </p>
          <p className="mt-1 text-sm text-gray-400">Counterfeit signals scanning</p>
        </div>
      </div>
    </div>
  );
}

function GeoSupplyChainMap() {
  const locations = [
    { x: "18%", y: "48%", label: "Manufacturer", city: "California" },
    { x: "42%", y: "55%", label: "Quality Hub", city: "Singapore" },
    { x: "58%", y: "45%", label: "Port Sync", city: "Mumbai" },
    { x: "70%", y: "52%", label: "Warehouse", city: "Delhi" },
    { x: "82%", y: "60%", label: "Retail Node", city: "Bhubaneswar" },
  ];

  return (
    <div className="mt-20 max-w-7xl mx-auto">
      <h2 className="text-6xl font-black text-center text-cyan-300 mb-4">
        Geo Supply Chain Map
      </h2>

      <p className="text-center text-gray-400 text-lg mb-12">
        Animated global product movement from manufacturer to final retailer.
      </p>

      <div className="relative h-[600px] overflow-hidden rounded-[48px] border border-cyan-400/30 bg-gradient-to-br from-[#020617] via-[#06203a] to-[#01040f] shadow-[0_0_90px_rgba(34,211,238,0.16)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,211,238,0.18),transparent_45%)]"></div>

        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-[10%] top-[30%] h-[180px] w-[260px] rounded-[50%] border border-cyan-300/30"></div>
          <div className="absolute left-[38%] top-[35%] h-[150px] w-[210px] rounded-[50%] border border-cyan-300/30"></div>
          <div className="absolute left-[55%] top-[38%] h-[170px] w-[260px] rounded-[50%] border border-cyan-300/30"></div>
          <div className="absolute left-[70%] top-[42%] h-[140px] w-[190px] rounded-[50%] border border-cyan-300/30"></div>
        </div>

        <svg className="absolute inset-0 h-full w-full">
          <motion.path
            d="M 18 48 C 30 30, 36 70, 42 55 S 52 30, 58 45 S 64 70, 70 52 S 78 40, 82 60"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="8 10"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 4,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {locations.map((location, index) => (
          <motion.div
            key={index}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            style={{ left: location.x, top: location.y }}
            animate={{
              y: [0, -8, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.25,
            }}
          >
            <div className="relative">
              <div className="h-7 w-7 rounded-full bg-cyan-300 shadow-[0_0_45px_#22d3ee] border border-white"></div>

              <motion.div
                className="absolute inset-0 rounded-full border border-cyan-300"
                animate={{
                  scale: [1, 3.2, 1],
                  opacity: [0.7, 0, 0.7],
                }}
                transition={{
                  duration: 2.5,
                  repeat: Infinity,
                  delay: index * 0.3,
                }}
              />

              <div className="absolute left-9 top-[-14px] whitespace-nowrap rounded-xl border border-cyan-400/20 bg-black/60 px-4 py-2 backdrop-blur-xl">
                <p className="text-xs font-black tracking-widest text-cyan-300">
                  {location.label}
                </p>
                <p className="text-xs text-gray-400">{location.city}</p>
              </div>
            </div>
          </motion.div>
        ))}

        <motion.div
          className="absolute h-5 w-5 rounded-full bg-white shadow-[0_0_35px_white]"
          animate={{
            left: ["18%", "42%", "58%", "70%", "82%"],
            top: ["48%", "55%", "45%", "52%", "60%"],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="absolute top-8 left-8 rounded-2xl border border-cyan-400/20 bg-black/40 px-5 py-4 backdrop-blur-xl">
          <p className="font-black tracking-widest text-cyan-300">
            ROUTE SYNC ACTIVE
          </p>
          <p className="mt-1 text-sm text-gray-400">
            5 logistics checkpoints verified
          </p>
        </div>

        <div className="absolute bottom-8 right-8 rounded-2xl border border-green-400/20 bg-black/40 px-5 py-4 backdrop-blur-xl">
          <p className="font-black tracking-widest text-green-300">
            SUPPLY CHAIN SECURE
          </p>
          <p className="mt-1 text-sm text-gray-400">
            No route manipulation detected
          </p>
        </div>
      </div>
    </div>
  );
}

function FraudHeatmap() {
  const hotspots = [
    {
      x: "22%",
      y: "34%",
      size: "140px",
      label: "Fake QR Cluster",
      intensity: "Critical",
    },
    {
      x: "48%",
      y: "58%",
      size: "190px",
      label: "Unauthorized Retail Zone",
      intensity: "High",
    },
    {
      x: "72%",
      y: "38%",
      size: "160px",
      label: "Route Tampering",
      intensity: "Medium",
    },
    {
      x: "82%",
      y: "70%",
      size: "120px",
      label: "Duplicate Scan Area",
      intensity: "High",
    },
  ];

  return (
    <div className="mt-20 max-w-7xl mx-auto">
      <h2 className="text-6xl font-black text-center text-red-300 mb-4">
        AI Fraud Heatmap
      </h2>

      <p className="text-center text-gray-400 text-lg mb-12">
        Live counterfeit intensity visualization across suspicious supply-chain zones.
      </p>

      <div className="relative h-[620px] overflow-hidden rounded-[48px] border border-red-400/30 bg-gradient-to-br from-[#110006] via-[#21050b] to-[#020617] shadow-[0_0_90px_rgba(248,113,113,0.18)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(248,113,113,0.18),transparent_45%)]"></div>

        <div className="absolute inset-0 opacity-15">
          {[...Array(180)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-red-200"
              style={{
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random(),
              }}
            />
          ))}
        </div>

        {hotspots.map((spot, index) => (
          <motion.div
            key={index}
            className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              left: spot.x,
              top: spot.y,
              width: spot.size,
              height: spot.size,
              background:
                "radial-gradient(circle, rgba(248,113,113,0.55), rgba(251,146,60,0.25), transparent 70%)",
            }}
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.55, 0.95, 0.55],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: index * 0.4,
            }}
          >
            <div className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-400 shadow-[0_0_35px_#f87171]"></div>

            <div className="absolute left-1/2 top-[58%] -translate-x-1/2 whitespace-nowrap rounded-xl border border-red-400/20 bg-black/60 px-4 py-2 backdrop-blur-xl">
              <p className="text-xs font-black tracking-widest text-red-300">
                {spot.label}
              </p>
              <p className="text-xs text-orange-300">
                {spot.intensity} Threat
              </p>
            </div>
          </motion.div>
        ))}

        <div className="absolute left-8 top-8 rounded-2xl border border-red-400/20 bg-black/40 px-5 py-4 backdrop-blur-xl">
          <p className="font-black tracking-widest text-red-300">
            FRAUD HEATMAP ACTIVE
          </p>
          <p className="mt-1 text-sm text-gray-400">
            4 counterfeit hotspots tracked
          </p>
        </div>

        <div className="absolute bottom-8 right-8 rounded-2xl border border-orange-400/20 bg-black/40 px-5 py-4 backdrop-blur-xl">
          <p className="font-black tracking-widest text-orange-300">
            AI RISK ZONES DETECTED
          </p>
          <p className="mt-1 text-sm text-gray-400">
            Live anomaly clustering enabled
          </p>
        </div>
      </div>
    </div>
  );
}

function MiningSimulation() {
  const miningSteps = [
    "Collecting product metadata",
    "Generating SHA-256 block hash",
    "Validating previous block reference",
    "Solving proof-of-work nonce",
    "Sealing product block",
    "Broadcasting to verification network",
  ];

  return (
    <div className="mt-20 max-w-7xl mx-auto">
      <h2 className="text-6xl font-black text-center text-green-300 mb-4">
        Blockchain Mining Simulation
      </h2>

      <p className="text-center text-gray-400 text-lg mb-12">
        Simulated proof-of-work engine sealing product records into immutable blockchain blocks.
      </p>

      <div className="relative overflow-hidden rounded-[48px] border border-green-400/30 bg-gradient-to-br from-[#001108] via-[#052417] to-[#020617] p-8 shadow-[0_0_90px_rgba(74,222,128,0.18)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(74,222,128,0.16),transparent_45%)]"></div>

        <div className="relative grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 rounded-3xl border border-green-400/20 bg-black/40 p-8 backdrop-blur-xl">
            <p className="text-gray-400 mb-3">Current Mining Status</p>

            <motion.h3
              className="text-5xl font-black text-green-300"
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
              }}
            >
              MINING
            </motion.h3>

            <div className="mt-8 rounded-2xl border border-white/10 bg-black/60 p-5">
              <p className="text-gray-400 text-sm">Nonce Counter</p>

              <motion.p
                className="mt-2 text-4xl font-mono font-black text-cyan-300"
                animate={{
                  opacity: [0.4, 1, 0.4],
                }}
                transition={{
                  duration: 0.8,
                  repeat: Infinity,
                }}
              >
                {Math.floor(Math.random() * 900000) + 100000}
              </motion.p>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/60 p-5">
              <p className="text-gray-400 text-sm">Difficulty</p>
              <p className="mt-2 text-3xl font-black text-yellow-300">
                0000****
              </p>
            </div>
          </div>

          <div className="lg:col-span-2 rounded-3xl border border-green-400/20 bg-black/40 p-8 backdrop-blur-xl">
            <h3 className="text-3xl font-black text-green-300 mb-8">
              Proof-of-Work Pipeline
            </h3>

            <div className="space-y-5">
              {miningSteps.map((step, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-5 rounded-2xl border border-white/10 bg-black/50 px-6 py-5"
                  initial={{ opacity: 0.3, x: -30 }}
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    x: [0, 10, 0],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: index * 0.35,
                  }}
                >
                  <div className="h-4 w-4 rounded-full bg-green-300 shadow-[0_0_25px_#86efac]"></div>

                  <p className="text-lg font-bold text-gray-200">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative mt-8 rounded-3xl border border-cyan-400/20 bg-black/50 p-6 backdrop-blur-xl">
          <p className="text-gray-400 text-sm mb-3">Generated Block Hash Stream</p>

          <motion.p
            className="font-mono text-cyan-300 break-all"
            animate={{
              opacity: [0.4, 1, 0.4],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          >
            0000a9f3c8e7b12d45f98c2ab77e31d90f5c8a442b1cc9e6fa21d7bb8c93ef42
          </motion.p>
        </div>
      </div>
    </div>
  );
}

function AdminControlCenter({ products, adminUser, adminToken }) {
  const total = products.length;
  const authentic = products.filter((p) => p.status === "Authentic").length;
  const counterfeit = products.filter((p) => p.status !== "Authentic").length;
  const highRisk = products.filter((p) => p.riskLevel === "High Risk").length;

  const systemCards = [
    {
      title: "Admin Status",
      value: adminToken ? "Authenticated" : "Guest Mode",
      color: adminToken ? "text-green-300" : "text-yellow-300",
    },
    {
      title: "Logged User",
      value: adminUser || "No active admin",
      color: "text-cyan-300",
    },
    {
      title: "Ledger Health",
      value: "Operational",
      color: "text-green-300",
    },
    {
      title: "AI Engine",
      value: "Active",
      color: "text-purple-300",
    },
  ];

  return (
    <div className="mt-20 max-w-7xl mx-auto">
      <h2 className="text-6xl font-black text-center text-cyan-300 mb-4">
        Admin Control Center
      </h2>

      <p className="text-center text-gray-400 text-lg mb-12">
        Enterprise-grade command panel for blockchain security, fraud monitoring, and product governance.
      </p>

      <div className="relative overflow-hidden rounded-[48px] border border-cyan-400/30 bg-gradient-to-br from-[#020617] via-[#071a33] to-[#01040f] p-8 shadow-[0_0_90px_rgba(34,211,238,0.16)]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.15),transparent_45%)]"></div>

        <div className="relative grid md:grid-cols-4 gap-6">
          {systemCards.map((card, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.12 }}
              className="rounded-3xl border border-white/10 bg-black/50 p-6 backdrop-blur-xl"
            >
              <p className="text-gray-400 text-sm">{card.title}</p>
              <h3 className={`mt-3 text-2xl font-black ${card.color}`}>
                {card.value}
              </h3>
            </motion.div>
          ))}
        </div>

        <div className="relative grid lg:grid-cols-3 gap-8 mt-8">
          <div className="rounded-3xl border border-cyan-400/20 bg-black/50 p-8 backdrop-blur-xl">
            <h3 className="text-3xl font-black text-cyan-300 mb-6">
              Product Governance
            </h3>

            <div className="space-y-5">
              <ControlMetric label="Total Products" value={total} color="text-cyan-300" />
              <ControlMetric label="Authentic Records" value={authentic} color="text-green-300" />
              <ControlMetric label="Counterfeit Records" value={counterfeit} color="text-red-300" />
              <ControlMetric label="High Risk Flags" value={highRisk} color="text-yellow-300" />
            </div>
          </div>

          <div className="rounded-3xl border border-purple-400/20 bg-black/50 p-8 backdrop-blur-xl">
            <h3 className="text-3xl font-black text-purple-300 mb-6">
              AI Security Center
            </h3>

            <div className="space-y-5">
              <ControlMetric label="Threat Radar" value="ONLINE" color="text-green-300" />
              <ControlMetric label="Fraud Heatmap" value="ACTIVE" color="text-red-300" />
              <ControlMetric label="Risk Engine" value="SCANNING" color="text-purple-300" />
              <ControlMetric label="Anomaly Watch" value="ENABLED" color="text-cyan-300" />
            </div>
          </div>

          <div className="rounded-3xl border border-green-400/20 bg-black/50 p-8 backdrop-blur-xl">
            <h3 className="text-3xl font-black text-green-300 mb-6">
              Blockchain Ops
            </h3>

            <div className="space-y-5">
              <ControlMetric label="Consensus" value="VERIFIED" color="text-green-300" />
              <ControlMetric label="Mining Engine" value="RUNNING" color="text-cyan-300" />
              <ControlMetric label="Hash Integrity" value="MONITORED" color="text-yellow-300" />
              <ControlMetric label="Ledger Sync" value="LIVE" color="text-purple-300" />
            </div>
          </div>
        </div>

        <div className="relative mt-8 rounded-3xl border border-red-400/20 bg-black/50 p-8 backdrop-blur-xl">
          <h3 className="text-3xl font-black text-red-300 mb-6">
            Fraud Alert Queue
          </h3>

          <div className="space-y-4">
            {products
              .filter((p) => p.status !== "Authentic" || p.riskLevel === "High Risk")
              .slice(0, 5)
              .map((product, index) => (
                <motion.div
                  key={product._id || index}
                  initial={{ opacity: 0, x: -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.15 }}
                  className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-red-400/20 bg-red-500/5 px-6 py-5"
                >
                  <div>
                    <p className="text-red-300 font-black tracking-widest">
                      {product.productId}
                    </p>
                    <p className="text-gray-300">
                      {product.name} • {product.manufacturer}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-yellow-300 font-bold">
                      {product.riskLevel}
                    </p>
                    <p className="text-gray-500 text-sm">
                      Requires admin review
                    </p>
                  </div>
                </motion.div>
              ))}

            {products.filter((p) => p.status !== "Authentic" || p.riskLevel === "High Risk").length === 0 && (
              <p className="text-green-300 font-bold">
                No active fraud alerts detected.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ControlMetric({ label, value, color }) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/40 px-5 py-4">
      <p className="text-gray-400">{label}</p>
      <p className={`font-black ${color}`}>{value}</p>
    </div>
  );
}


function Feature({ title, text }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md hover:scale-105 transition duration-300">
      <h3 className="text-3xl font-extrabold text-cyan-400">
        {title}
      </h3>

      <p className="mt-4 text-gray-300 text-lg">
        {text}
      </p>
    </div>
  );
}



export default App;