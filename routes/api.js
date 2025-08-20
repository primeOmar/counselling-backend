const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const Subscriber = require("../models/Subscriber");

// 📌 Get all posts
router.get("/posts", async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Get single post and increment views
router.get("/posts/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📌 Subscribe user
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;
  try {
    let subscriber = await Subscriber.findOne({ email });
    if (!subscriber) {
      subscriber = new Subscriber({ email });
      await subscriber.save();
    }
    res.json({ message: "✅ Subscribed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
