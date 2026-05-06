const express = require("express");
const router = express.Router();
const { protectRoute } = require("../middleware/authMiddleware");
const Workshop = require("../models/Workshop");

router.post("/", protectRoute, async (req, res) => {
  try {
    const workshop = new Workshop({ ...req.body, hostedBy: req.user.id });
    await workshop.save();
    res.json(workshop);
  } catch (err) {
    res.status(500).json({ error: "Failed to save workshop" });
  }
});

router.get("/mine", protectRoute, async (req, res) => {
  try {
    const workshops = await Workshop.find({ hostedBy: req.user.id });
    res.json(workshops);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch workshops" });
  }
});

router.delete("/:id", protectRoute, async (req, res) => {
  try {
    const workshop = await Workshop.findOneAndDelete({ _id: req.params.id, hostedBy: req.user.id });
    if (!workshop) return res.status(404).json({ error: "Workshop not found" });
    res.json({ message: "Workshop deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete workshop" });
  }
});

module.exports = router;
