import calculateRiskScore from "../utils/riskEngine.js";

export const analyzeProductRisk = (product, hashValid) => {
  return calculateRiskScore(product, hashValid);
};