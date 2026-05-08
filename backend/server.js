require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const profileRoute = require("./routes/profile");
const registerCourseRoute = require("./routes/register"); // Course Registration
const authRoutes = require("./routes/authRoutes"); // User login/signup
const postsRoute = require("./routes/post");
const workshopRoutes = require("./routes/workshopRoutes");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use("/api/workshops", workshopRoutes);
app.use("/api/profile", require("./routes/profile"));

// Connect to MongoDB Atlas
async function startServer() {
  try {
    console.log("MONGODB_URI:", process.env.MONGODB_URI); // adding this before connection (testing purposes) - REMOVE FOR PROD
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("✅ Connected to MongoDB Atlas");

    app.use("/api/course", registerCourseRoute);
    app.use("/api/profile", profileRoute);
    app.use("/api/auth", authRoutes);
    app.use("/api/posts", postsRoute);
    app.get("/", (req, res) => res.send("Hello World!"));
    app.listen(PORT, () => console.log(`🚀 App listening at http://localhost:${PORT}`));
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
  }
}

startServer();
