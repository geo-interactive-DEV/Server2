require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const towerRoutes = require("./routes/towers");
const deviceRoutes = require("./routes/devices");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/towers", towerRoutes);
app.use("/api/devices", deviceRoutes);

// DB Connect & Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error("MongoDB error:", err));
