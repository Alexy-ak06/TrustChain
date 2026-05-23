import calculateRiskScore from "../utils/riskengine.js";

export const analyzeProductRisk = (product, hashValid) => {
  return calculateRiskScore(product, hashValid);
};