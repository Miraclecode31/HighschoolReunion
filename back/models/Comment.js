const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  schoolId: { type: mongoose.Schema.Types.ObjectId, ref: "School", required: true },
  commentText: { type: String, required: true, trim: true },
  author: { type: String, required: true, trim: true },
  date: { type: Date, default: Date.now }
});

const Comment = mongoose.model("Comment", commentSchema);

module.exports = Comment;
