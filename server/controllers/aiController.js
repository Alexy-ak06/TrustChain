import { askTrustChainAI } from "../services/openaiService.js";

export const chatWithAI = async (req, res) => {
  try {
    const { message } = req.body;

    console.log("User message:", message);

    const reply = await askTrustChainAI(message);

    console.log("AI reply:", reply);

    res.json({
      success: true,
      reply,
    });
  } catch (error) {
    console.log("FULL AI ERROR:");
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};