const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

// Fetch all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: "Error fetching posts" });
  }
});

// Increment view count when a post is read
router.post("/:id/view", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { $inc: { views: 1 } },
      { new: true }
    );
    res.json({ views: post.views });
  } catch (err) {
    res.status(500).json({ error: "Error updating views" });
  }
});

module.exports = router;
