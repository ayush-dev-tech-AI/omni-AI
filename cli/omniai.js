#!/usr/bin/env node

const { exec } = require("child_process");
const path = require("path");

const root = path.resolve(__dirname, "..");

const frontendPath = path.join(root, "frontend");
const backendPath = path.join(root, "backend");

console.log("🔥 Summoning Omni AI...");

exec("npm run build", { cwd: frontendPath }, (buildErr) => {
  if (buildErr) {
    console.error("Frontend build failed:", buildErr.message);
    return;
  }

  console.log("Frontend ready 😼");

  exec("node server.js", {
    cwd: backendPath
  });
});