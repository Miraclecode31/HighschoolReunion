const express = require("express");
const mongoose = require("mongoose");
const Comment = require("../models/Comment");

const router = express.Router();

router.post("/:schoolId/comments", async (req, res) => {
  const { schoolId } = req.params;
  const { commentText } = req.body;

  if (!commentText || commentText.trim() === "") {
    return res.status(400).json({ message: "Comment text cannot be empty" });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(schoolId)) {
      return res.status(400).json({ message: "Invalid School ID" });
    }

    const newComment = new Comment({ commentText, schoolId });
    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: 'Failed to add comment', error: error.message });
  }
});

router.get("/:schoolId/comments", async (req, res) => {
  const { schoolId } = req.params;

  if (!schoolId) {
    return res.status(400).json({ message: "School ID is required" });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(schoolId)) {
      return res.status(400).json({ message: "Invalid School ID" });
    }

    const comments = await Comment.find({ schoolId });

    if (!comments || comments.length === 0) {
      return res.status(404).json({ message: "No comments found for this school" });
    }

    res.status(200).json(comments); 
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Error fetching comments", error: error.message });
  }
});

module.exports = router;
