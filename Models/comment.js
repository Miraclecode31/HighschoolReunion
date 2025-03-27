const mongoose = require("mongoose");
const CommentSchema = new mongoose.Schema({
  message: { type: String, required: true },
}, { timestamps: true });