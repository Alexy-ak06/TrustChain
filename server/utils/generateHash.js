import SHA256 from "crypto-js/sha256.js";

const generateHash = (productData) => {
  return SHA256(
    productData.productId +
      productData.name +
      productData.manufacturer +
      productData.category +
      productData.status +
      productData.currentLocation +
      productData.batchNumber +
      JSON.stringify(productData.timeline) +
      productData.previousHash +
      productData.blockchainTimestamp
  ).toString();
};

export default generateHash;