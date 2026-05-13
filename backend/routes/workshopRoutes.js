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

router.post("/", protectRoute, async (req, res) => {
  try {
    const { name, date, time, description, location, imageUrl } = req.body;

    const newWorkshop = new Workshop({
      name,
      date,
      time,
      description,
      location,
      imageUrl,
      hostedBy: req.user._id, // Use _id here to match your /mine route
      attendees: [],
    });

    const savedWorkshop = await newWorkshop.save();
    res.status(201).json(savedWorkshop);
  } catch (err) {
    console.error("Error creating workshop:", err);
    res.status(500).json({ error: "Failed to create workshop" });
  }
});

router.get("/mine", protectRoute, async (req, res) => {
  try {
    const workshops = await Workshop.find({ hostedBy: req.user._id }).populate(
      "hostedBy",
      "name profilePicture",
    );
    res.json(workshops);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch workshops" });
  }
});

router.get("/:id", protectRoute, async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params._id)
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
    const workshop = await Workshop.findOneAndDelete({
      _id: req.params._id,
      hostedBy: req.user._id,
    });
    if (!workshop) return res.status(404).json({ error: "Workshop not found" });
    res.json({ message: "Workshop deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete workshop" });
  }
});

// Attend a workshop
router.post("/:id/attend", protectRoute, async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params._id);
    if (!workshop) return res.status(404).json({ error: "Not found" });
    if (workshop.hostedBy.toString() === req.user._id)
      return res.status(403).json({ error: "You cannot attend your own workshop" });
    if (workshop.attendees.includes(req.user._id))
      return res.status(400).json({ error: "Already attending" });
    workshop.attendees.push(req.user._id);
    await workshop.save();
    res.json(workshop);
  } catch (err) {
    res.status(500).json({ error: "Failed to attend" });
  }
});

// GET workshops user has registered for
router.get("/attending", protectRoute, async (req, res) => {
  try {
    const workshops = await Workshop.find({ attendees: req.user._id }).populate(
      "hostedBy",
      "name profilePicture",
    );
    res.json(workshops);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch workshops" });
  }
});

// Post a review
router.post("/:id/review", protectRoute, async (req, res) => {
  try {
    const workshop = await Workshop.findById(req.params._id);
    if (!workshop) return res.status(404).json({ error: "Not found" });
    if (workshop.hostedBy.toString() === req.user._id)
      return res.status(403).json({ error: "You cannot review your own workshop" });
    const { comment, rating } = req.body;
    workshop.reviews.push({ user: req.user._id, name: req.user.name, comment, rating });
    await workshop.save();
    res.json(workshop);
  } catch (err) {
    console.error("Review error:", err);
    res.status(500).json({ error: "Failed to post review" });
  }
});

module.exports = router;
