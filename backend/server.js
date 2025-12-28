const express = require("express");
const path = require("path");
const executeRoute = require("./execute.js");

const app = express();

// Middleware
app.use(express.json());

// Serve frontend
app.use(express.static(path.join(__dirname, "public")));

// API
app.use("/execute", executeRoute);

// Default route (frontend)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(3000, () => {
  console.log("Compiler running at http://localhost:3000");
});
