const calculateRiskScore = (product, hashValid = true) => {
  let score = 0;
  const reasons = [];

  const text = `${product.manufacturer} ${product.currentLocation} ${product.status} ${product.category}`.toLowerCase();

  if (!hashValid) {
    score += 40;
    reasons.push("Blockchain hash mismatch detected");
  }

  if (product.status !== "Authentic") {
    score += 30;
    reasons.push("Product status is not authentic");
  }

  if (
    text.includes("unknown") ||
    text.includes("unauthorized") ||
    text.includes("fake") ||
    text.includes("suspicious")
  ) {
    score += 25;
    reasons.push("Suspicious manufacturer or location detected");
  }

  if (!product.timeline || product.timeline.length < 3) {
    score += 15;
    reasons.push("Incomplete supply chain timeline");
  }

  if (product.riskLevel === "High Risk") {
    score += 20;
    reasons.push("Product already marked as high risk");
  }

  if (score > 100) score = 100;

  let aiRiskLevel = "Low Risk";

  if (score >= 70) aiRiskLevel = "Critical Risk";
  else if (score >= 40) aiRiskLevel = "High Risk";
  else if (score >= 20) aiRiskLevel = "Medium Risk";

  return {
    score,
    aiRiskLevel,
    reasons,
  };
};

export default calculateRiskScore;