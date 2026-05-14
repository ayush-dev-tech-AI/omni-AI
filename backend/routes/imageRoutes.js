const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({
        error: "Prompt required"
      });
    }

    const imageUrl =
    `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=1024&height=1024&seed=${Date.now()}`

    res.json({
      imageUrl
    });

  } catch (err) {
    res.status(500).json({
      error: "Image generation failed"
    });
  }
});

module.exports = router;