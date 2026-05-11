const express = require("express");
const router = express.Router();
const { protectRoute } = require("../middleware/authMiddleware");
const Workshop = require("../models/Workshop");

router.get("/", protectRoute, async (req, res) => {
  try {
    const workshops = await Workshop.find()
      .populate("hostedBy", "name profilePicture")
      .populate("attendees", "name profilePicture");
    res.json(workshops);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch workshops" });
  }
});

router.get("/mine", protectRoute, async (req, res) => {
  try {
    const workshops = await Workshop.find({ hostedBy: req.user.id })
      .populate("hostedBy", "name profilePicture");
    res.json(workshops);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch workshops" });
  }
});

router.get("/:id", protectRoute, async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id)
      .populate("hostedBy", "name profilePicture")
      .populate("attendees", "name profilePicture");
    if (!workshop) return res.status(404).json({ error: "Not found" });
    res.json(workshop);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch workshop" });
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

// Attend a workshop
router.post("/:id/attend", protectRoute, async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    if (!workshop) return res.status(404).json({ error: "Not found" });
    if (workshop.hostedBy.toString() === req.user.id)
      return res.status(403).json({ error: "You cannot attend your own workshop" });
    if (workshop.attendees.includes(req.user.id)) return res.status(400).json({ error: "Already attending" });
    workshop.attendees.push(req.user.id);
    await workshop.save();
    res.json(workshop);
  } catch (err) {
    res.status(500).json({ error: "Failed to attend" });
  }
});

// GET workshops user has registered for
router.get("/attending", protectRoute, async (req, res) => {
  try {
    const workshops = await Workshop.find({ attendees: req.user.id })
      .populate("hostedBy", "name profilePicture");
    res.json(workshops);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch workshops" });
  }
});

// Post a review
router.post("/:id/review", protectRoute, async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params.id);
    if (!workshop) return res.status(404).json({ error: "Not found" });
    if (workshop.hostedBy.toString() === req.user.id)
      return res.status(403).json({ error: "You cannot review your own workshop" });
    const { comment, rating } = req.body;
    workshop.reviews.push({ user: req.user.id, name: req.user.name, comment, rating });
    await workshop.save();
    res.json(workshop);
  } catch (err) {
    console.error("Review error:", err);
    res.status(500).json({ error: "Failed to post review" });
  }
});

module.exports = router;
