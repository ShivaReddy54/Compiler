const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");
const runCode = require("./executor.js");

const router = express.Router();

router.post("/", async (req, res) => {
  const { language, code } = req.body;
  if (!language || !code)
    return res.status(400).json({ error: "Language and code required" });

  const jobId = uuid();

  const extensions = {
    c: "main.c",
    cpp: "main.cpp",
    python: "main.py",
    java: "Main.java"
  };

  if (!extensions[language])
    return res.status(400).json({ error: "Unsupported language" });

  const tempDir = path.join(__dirname, "..", "temp");
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

  const filePath = path.join(tempDir, `${jobId}-${extensions[language]}`);
  fs.writeFileSync(filePath, code);

  // ✅ delete after 2 minutes
  setTimeout(() => {
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
  }, 120000);

  const result = await runCode(language, filePath);
  res.json(result);
});

module.exports = router;
