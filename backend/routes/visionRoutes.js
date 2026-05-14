const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

router.post("/", upload.single("image"), async (req, res) => {
  try {
    const imageBuffer = fs.readFileSync(req.file.path);
    const base64Image = imageBuffer.toString("base64");

    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
  {
    role: "user",
    content: [
      {
        type: "text",
        text: `
Analyze this image and convert it into a professional AI image generation prompt.

Include:
- subject
- art style
- perspective / camera angle
- colors
- lighting
- clothing
- mood
- composition
- quality tags

Return ONLY the prompt text.
No explanation.
`
      },
      {
        type: "image_url",
        image_url: {
          url: `data:${req.file.mimetype};base64,${base64Image}`
        }
      }
    ]
  }
]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    fs.unlinkSync(req.file.path);

    res.json({
      reply: response.data.choices[0].message.content
    });

  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({
      error: "Vision failed"
    });
  }
});

module.exports = router;