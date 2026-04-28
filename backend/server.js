const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const registerRoute = require("./routes/register");
const loginRoutes = require("./routes/login")

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB Atlas
async function startServer() {
  try {
    console.log("MONGODB_URI:", process.env.MONGODB_URI); // adding this before connection (testing purposes)
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✅ Connected to MongoDB Atlas");

    app.use("/api", registerRoute);
    app.use("/api", loginRoutes);
    app.get("/", (req, res) => res.send("Hello World!"));
    app.listen(PORT, () => console.log(`🚀 App listening at http://localhost:${PORT}`));
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}

startServer();
