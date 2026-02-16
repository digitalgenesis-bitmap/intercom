const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 3000;

app.use(express.static("public"));

app.get("/api/price/:coin", async (req, res) => {
  try {
    const coin = req.params.coin;

    const response = await axios.get(
      `https://api.coingecko.com/api/v3/coins/${coin}/market_chart`,
      {
        params: {
          vs_currency: "usd",
          days: 7
        }
      }
    );

    res.json({
      prices: response.data.prices
    });

  } catch (err) {
    res.status(500).json({ error: "Coin not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Severy Crypto Live Price running at http://localhost:${PORT}`);
});
