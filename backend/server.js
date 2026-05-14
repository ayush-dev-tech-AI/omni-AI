require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");

const chatRoutes = require("./routes/chatRoutes");
const visionRoutes = require("./routes/visionRoutes");
const { exec } = require("child_process");
const os = require("os");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);
app.use("/api/vision", visionRoutes);

app.use(
  express.static(
    path.join(__dirname, "../frontend/dist")
  )
);

app.use((req, res) => {
  res.sendFile(
    path.join(__dirname, "../frontend/dist/index.html")
  );
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);

  const url = `http://localhost:${PORT}`;
  const platform = os.platform();

  let command = "";

  if (platform === "win32") {
    command = `start ${url}`;
  } else if (platform === "darwin") {
    command = `open ${url}`;
  } else {
    command = `xdg-open ${url}`;
  }

  exec(command, (err) => {
    if (err) {
      console.log("Browser auto-open failed:", err.message);
    }
  });
});