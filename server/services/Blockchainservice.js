
import generateHash from "../utils/generateHash.js";

const getHashData = (product) => ({
  productId: product.productId,
  name: product.name,
  manufacturer: product.manufacturer,
  category: product.category,
  status: product.status,
  currentLocation: product.currentLocation,
  batchNumber: product.batchNumber,
  timeline: product.timeline,
  previousHash: product.previousHash,
  blockchainTimestamp: product.blockchainTimestamp,
});

export const createBlockchainRecord = async (Product, productData) => {
  const lastProduct = await Product.findOne({}).sort({ createdAt: -1 });

  const previousHash = lastProduct
    ? lastProduct.blockHash
    : "GENESIS_BLOCK";

  const blockchainTimestamp = new Date().toISOString();

  const dataWithBlockchain = {
    ...productData,
    previousHash,
    blockchainTimestamp,
  };

  const blockHash = generateHash(getHashData(dataWithBlockchain));

  return {
    ...dataWithBlockchain,
    blockHash,
  };
};

export const verifyBlockchainRecord = (product) => {
  const recalculatedHash = generateHash(getHashData(product));

  const hashValid = recalculatedHash === product.blockHash;

  return {
    hashValid,
    recalculatedHash,
  };
};

