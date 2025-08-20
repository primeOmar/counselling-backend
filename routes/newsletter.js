const express = require("express");
const Subscriber = require("../models/Subscriber");
const router = express.Router();

// Subscribe
router.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Already subscribed" });
    }
    const subscriber = new Subscriber({ email });
    await subscriber.save();
    res.json({ message: "Subscribed successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Error subscribing" });
  }
});

module.exports = router;
