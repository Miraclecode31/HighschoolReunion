const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const commentRoutes = require("./routes/commentRoutes");
const graduateRoutes = require("./routes/graduateRoutes");
const School = require("./models/school");
const Comment = require("./models/Comment");

dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', 
}));

app.use(express.json());

app.use("/api", commentRoutes);
app.use("/api", graduateRoutes);


app.post('/api/schools', async (req, res) => {
  try {
    const { name, location, address } = req.body;

    if (!name || !location || !address) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const newSchool = new School({ name, location, address });
    await newSchool.save();

    res.status(201).json(newSchool);
  } catch (error) {
    console.error('Error creating school:', error);
    res.status(500).json({ message: 'Failed to create school', error: 'Internal Server Error' });
  }
});

app.get('/api/schools/:schoolId/comments', async (req, res) => {
  const { schoolId } = req.params;

  console.log("Received schoolId:", schoolId);

  if (!mongoose.Types.ObjectId.isValid(schoolId)) {
    return res.status(400).json({ message: 'Invalid School ID' });
  }

  try {
    const comments = await Comment.find({ schoolId: new mongoose.Types.ObjectId(schoolId) });

    if (!comments || comments.length === 0) {
      return res.status(404).json({ message: 'No comments found for this school' });
    }

    res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: 'Error fetching comments', error: 'Internal Server Error' });
  }
});

app.post('/api/schools/:schoolId/comments', async (req, res) => {
  const { schoolId } = req.params;
  const { comment } = req.body;

  if (!mongoose.Types.ObjectId.isValid(schoolId)) {
    return res.status(400).json({ message: 'Invalid School ID' });
  }

  if (!comment || comment.trim() === '') {
    return res.status(400).json({ message: 'Comment is required' });
  }

  try {
    const newComment = new Comment({
      schoolId: new mongoose.Types.ObjectId(schoolId),
      commentText: comment.trim(), 
      author: "absara"
    });

    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    console.error('Error posting comment:', error);
    res.status(500).json({ message: 'Error posting comment', error: 'Internal Server Error' });
  }
});

const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => {
    console.error("MongoDB Connection Error:", err);
    process.exit(1); 
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
