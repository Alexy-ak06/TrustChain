export const askTrustChainAI = async (message) => {
  const q = message.toLowerCase();

  if (q.includes("fraud") || q.includes("risk") || q.includes("counterfeit")) {
    return "TrustChain AI analysis: Fraud risk is evaluated using QR fingerprint integrity, blockchain hash validation, route anomaly detection, duplicate signature monitoring, and product metadata consistency. High-risk products should be reviewed by admin immediately.";
  }

  if (q.includes("blockchain") || q.includes("ledger") || q.includes("hash")) {
    return "TrustChain AI analysis: Blockchain verification works by recalculating the product hash, comparing it with the stored block hash, checking previous block linkage, and validating immutable supply-chain records.";
  }

  if (q.includes("admin") || q.includes("security")) {
    return "TrustChain AI recommendation: Admins should monitor high-risk products, verify suspicious records, protect JWT credentials, review fraud alerts, and only register products with complete trusted metadata.";
  }

  if (q.includes("qr") || q.includes("scan")) {
    return "TrustChain AI analysis: QR scanning extracts the product identity, queries the backend registry, verifies blockchain integrity, and returns authenticity status with AI risk intelligence.";
  }

  return "TrustChain AI is online. I can help analyze product authenticity, blockchain integrity, counterfeit risk, QR verification, admin security, and supply-chain intelligence.";
};